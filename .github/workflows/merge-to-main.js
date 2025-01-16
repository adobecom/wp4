const {
  slackNotification,
  getLocalConfigs,
  isWithinRCP,
  pulls: { addLabels, addFiles, getChecks, getReviews },
} = require('./helpers.js');

// Run from the root of the project for local testing: node --env-file=.env .github/workflows/merge-to-main.js
const PR_TITLE = '[Release] Stage to Main';
const STAGE = 'stage';
const PROD = 'main';
const MIN_SOT_APPROVALS = process.env.MIN_SOT_APPROVALS ? Number(process.env.MIN_SOT_APPROVALS) : 4;

let github, owner, repo;

const getStageToMainPR = () =>
  github.rest.pulls
    .list({ owner, repo, state: 'open', base: PROD, head: STAGE })
    .then(({ data } = {}) => data.find(({ title } = {}) => title === PR_TITLE))
    .then((pr) => pr && addLabels({ pr, github, owner, repo }));

const workingHours = () => {
  const now = new Date();
  const day = now.getUTCDay();
  const hour = now.getUTCHours();
  const isSunday = day === 0;
  const isSaturday = day === 6;
  const isFriday = day === 5;
  return hour >= 8 && hour <= 20 && !isFriday && !isSaturday && !isSunday;
};

const main = async (params) => {
  github = params.github;
  owner = params.context.repo.owner;
  repo = params.context.repo.repo;

  if (isWithinRCP()) return console.log('Stopped, within RCP period.');
  if (!workingHours()) return console.log('Stopped, outside working hours.');

  try {
    const stageToMainPR = await getStageToMainPR();
    const signOffs = stageToMainPR?.labels.filter((l) => l.includes('SOT'));
    console.log(`${signOffs.length} SOT labels on PR ${stageToMainPR.number}`);
    if (signOffs.length >= MIN_SOT_APPROVALS) {
      console.log('Stage to Main  PR has all required labels. Merging...');
      await github.rest.pulls.merge({
        owner,
        repo,
        pull_number: stageToMainPR.number,
        merge_method: 'merge',
      });

      await slackNotification(
        `:rocket: Production release <${stageToMainPR.html_url}|${stageToMainPR.number}>`
      );

      await github.rest.repos.createDispatchEvent({
        owner,
        repo,
        event_type: 'merge-to-stage',
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
