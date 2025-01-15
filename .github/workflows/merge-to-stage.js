const {
  slackNotification,
  getLocalConfigs,
  isWithinRCP,
  pulls: { addLabels, addFiles, getChecks, getReviews },
} = require('./helpers.js');

// Run from the root of the project for local testing: node --env-file=.env .github/workflows/merge-to-stage.js
const PR_TITLE = '[Release] Stage to Main';
const SEEN = {};
const REQUIRED_APPROVALS = process.env.REQUIRED_APPROVALS ? Number(process.env.REQUIRED_APPROVALS) : 2;
const MAX_MERGES = process.env.MAX_PRS_PER_BATCH ? Number(process.env.MAX_PRS_PER_BATCH) : 8;
let existingPRCount = 0;
const STAGE = 'stage';
const PROD = 'main';
const LABELS = {
  highPriority: 'high priority',
  readyForStage: 'Ready for Stage',
  SOTPrefix: 'SOT',
  zeroImpact: 'zero-impact',
};
const TEAM_MENTIONS = [
  '@adobecom/bacom-sot',
  '@adobecom/creative-cloud-sot',
  '@adobecom/document-cloud-sot',
  '@adobecom/express-sot',
  '@adobecom/homepage-sot',
  '@adobecom/miq-sot',
];
const SLACK = {
  merge: ({ html_url, number, title, prefix = '' }) => `:merged: PR merged to stage: ${prefix} <${html_url}|${number}: ${title}>.`,
  openedSyncPr: ({ html_url, number }) => `:fast_forward: Created <${html_url}|Stage to Main PR ${number}>`,
};

let github;
let owner;
let repo;

let body = `
## common base root URLs
**Homepage :** https://www.stage.adobe.com/
**BACOM:** https://business.stage.adobe.com/fr/
**CC:** https://www.stage.adobe.com/creativecloud.html
**Blog:** https://blog.stage.adobe.com/
**Acrobat:** https://www.stage.adobe.com/acrobat/online/sign-pdf.html

**Milo:**
- Before: https://main--milo--adobecom.aem.live/?martech=off
- After: https://stage--milo--adobecom.aem.live/?martech=off
`;

const isHighPrio = (labels) => labels.includes(LABELS.highPriority);
const isZeroImpact = (labels) => labels.includes(LABELS.zeroImpact);

const hasFailingChecks = (checks) =>
  checks.some(
    ({ conclusion, name }) =>
      name !== 'merge-to-stage' &&
      (conclusion === 'in_progress' || conclusion === 'failure')
  );

const commentOnPR = async (comment, prNumber) => {
  console.log(comment); // Logs for debugging the action.
  const { data: comments } = await github.rest.issues.listComments({
    owner,
    repo,
    issue_number: prNumber,
  });

  const dayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const hasRecentComment = comments
    .filter(({ created_at }) => new Date(created_at) > dayAgo)
    .some(({ body }) => body === comment);
  if (hasRecentComment) return console.log('Comment exists for', prNumber);

  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: comment,
  });
};

const getPRs = async () => {
  let prs = await github.rest.pulls
    .list({ owner, repo, state: 'open', per_page: 100, base: STAGE })
    .then(({ data }) => data);
  await Promise.all(prs.map((pr) => addLabels({ pr, github, owner, repo })));
  prs = prs.filter((pr) => pr.labels.includes(LABELS.readyForStage));
  await Promise.all([
    ...prs.map((pr) => addFiles({ pr, github, owner, repo })),
    ...prs.map((pr) => getChecks({ pr, github, owner, repo })),
    ...prs.map((pr) => getReviews({ pr, github, owner, repo })),
  ]);

  prs = prs.filter(({ checks, reviews, number, title }) => {
    if (hasFailingChecks(checks)) {
      commentOnPR(`Skipped merging ${number}: ${title} due to failing or running checks`, number);
      return false;
    }

    const approvals = reviews.filter(({ state }) => state === 'APPROVED');
    if (approvals.length < REQUIRED_APPROVALS) {
      commentOnPR(
        `Skipped merging ${number}: ${title} due to insufficient approvals. Required: ${REQUIRED_APPROVALS} approvals`,
        number,
      );
      return false;
    }

    return true;
  });

  return prs.reverse().reduce(
    (categorizedPRs, pr) => {
      if (isZeroImpact(pr.labels)) {
        categorizedPRs.zeroImpactPRs.push(pr);
      } else if (isHighPrio(pr.labels)) {
        categorizedPRs.highImpactPRs.push(pr);
      } else {
        categorizedPRs.normalPRs.push(pr);
      }
      return categorizedPRs;
    },
    { zeroImpactPRs: [], highImpactPRs: [], normalPRs: [] },
  );
};

const merge = async ({ prs, type }) => {
  console.log(`Merging ${prs.length || 0} ${type} PRs that are ready... `);

  for await (const { number, files, html_url, title } of prs) {
    try {
      if (mergeLimitExceeded()) return;
      const fileOverlap = files.find((file) => SEEN[file]);
      if (fileOverlap) {
        commentOnPR(
          `Skipped ${number}: "${title}" due to file "${fileOverlap}" overlap. Merging will be attempted in the next batch`,
          number,
        );
        continue;
      }
      if (type !== LABELS.zeroImpact) {
        files.forEach((file) => (SEEN[file] = true));
      }

      if (!process.env.LOCAL_RUN) {
        await github.rest.pulls.merge({
          owner,
          repo,
          pull_number: number,
          merge_method: 'squash',
        });
      }
      existingPRCount++;
      console.log(`Current number of PRs merged: ${existingPRCount}`);
      const prefix = type === LABELS.zeroImpact ? ' [ZERO IMPACT]' : '';
      body = `-${prefix} ${html_url}\n${body}`;
      await slackNotification(
        SLACK.merge({
          html_url,
          number,
          title,
          prefix,
        }),
      ).catch(console.error);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    } catch (error) {
      files.forEach((file) => (SEEN[file] = false));
      commentOnPR(`Error merging ${number}: ${title} ${error.message}`, number);
    }
  }
};

const getStageToMainPR = () => github.rest.pulls
  .list({ owner, repo, state: 'open', base: PROD })
  .then(({ data } = {}) => data.find(({ title } = {}) => title === PR_TITLE))
  .then((pr) => pr && addLabels({ pr, github, owner, repo }))
  .then((pr) => pr && addFiles({ pr, github, owner, repo }))
  .then((pr) => {
    pr?.files.forEach((file) => (SEEN[file] = true));
    return pr;
  });

const openStageToMainPR = async () => {
  const { data: comparisonData } = await github.rest.repos.compareCommits({
    owner,
    repo,
    base: PROD,
    head: STAGE,
  });

  for (const commit of comparisonData.commits) {
    const { data: pullRequestData } = await github.rest.repos.listPullRequestsAssociatedWithCommit({
      owner,
      repo,
      commit_sha: commit.sha,
    });

    for (const pr of pullRequestData) {
      if (!body.includes(pr.html_url)) body = `- ${pr.html_url}\n${body}`;
    }
  }

  try {
    const { data: { html_url, number } } = await github.rest.pulls.create({
      owner,
      repo,
      title: PR_TITLE,
      head: STAGE,
      base: PROD,
      body,
    });

    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: `Testing can start ${TEAM_MENTIONS.join(' ')}`,
    });

    await slackNotification(SLACK.openedSyncPr({ html_url, number }));
    await slackNotification(
      SLACK.openedSyncPr({ html_url, number }),
      process.env.MILO_STAGE_SLACK_WH,
    );
  } catch (error) {
    if (error.message.includes('No commits between main and stage')) return console.log('No new commits, no stage->main PR opened');
    throw error;
  }
};

const mergeLimitExceeded = () => MAX_MERGES - existingPRCount < 0;

const main = async (params) => {
  github = params.github;
  owner = params.context.repo.owner;
  repo = params.context.repo.repo;
  if (isWithinRCP({ offset: process.env.STAGE_RCP_OFFSET_DAYS || 2, excludeShortRCP: true })) return console.log('Stopped, within RCP period.');

  try {
    const stageToMainPR = await getStageToMainPR();
    console.log('has Stage to Main PR:', !!stageToMainPR);
    if (stageToMainPR) body = stageToMainPR.body;
    existingPRCount = body.match(/https:\/\/github\.com\/adobecom\/milo\/pull\/\d+/g)?.length || 0;
    console.log(`Number of PRs already in the batch: ${existingPRCount}`);

    if (mergeLimitExceeded()) return console.log(`Maximum number of '${MAX_MERGES}' PRs already merged. Stopping execution`);

    const { zeroImpactPRs, highImpactPRs, normalPRs } = await getPRs();
    await merge({ prs: zeroImpactPRs, type: LABELS.zeroImpact });
    if (stageToMainPR?.labels.some((label) => label.includes(LABELS.SOTPrefix))) return console.log('PR exists & testing started. Stopping execution.');
    await merge({ prs: highImpactPRs, type: LABELS.highPriority });
    await merge({ prs: normalPRs, type: 'normal' });
    if (!stageToMainPR) await openStageToMainPR();
    if (stageToMainPR && body !== stageToMainPR.body) {
      console.log("Updating PR's body...");
      await github.rest.pulls.update({
        owner,
        repo,
        pull_number: stageToMainPR.number,
        body,
      });
    }
    console.log('Process successfully executed.');
  } catch (error) {
    console.error(error);
  }
};

if (process.env.LOCAL_RUN) {
  const { github, context } = getLocalConfigs();
  main({
    github,
    context,
  });
}

module.exports = main;
