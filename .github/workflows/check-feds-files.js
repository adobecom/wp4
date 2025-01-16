const { slackNotification, getLocalConfigs } = require('./helpers.js');

const fedsFolders = [
  'libs/blocks/global-navigation',
  'libs/blocks/global-footer',
  'libs/blocks/modal',
  'libs/navigation',
  'libs/scripts/delayed',
  'libs/utils/utils',
  'libs/utils/locales',
  'libs/utils/federated',
  'libs/martech/attributes',
];

const safely = (fn) => {
  return (...args) => {
    try {
      fn(...args);
    } catch (e) {
      console.error(e);
    }
  };
}

const main = safely(async ({ github, context }) => {
  const number = context.issue?.number || process.env.ISSUE;
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const { data: files } = await github.rest.pulls.listFiles({
    owner,
    repo,
    pull_number: number,
  });
  
  const affectedFedsFiles = files
    .map(({ filename }) => filename)
    .filter(filename => fedsFolders.some(x => filename.startsWith(x)));

  const message = `> PR <https://github.com/adobecom/milo/pull/${number}|#${number}> affects:\n> \`\`\`${affectedFedsFiles.join('\n')}\`\`\``;
  const webhook = process.env.FEDS_WATCH_HOOK;

  if (!affectedFedsFiles.length) {
    console.log("No affected Feds Files. Exiting");
    return;
  }
  slackNotification(message, webhook)
    .then((resp) => {
      if (resp.ok) console.log('message posted on slack');
      else throw new Error(resp);
    })
    .catch(console.error);
});

if (process.env.LOCAL_RUN) {
  const { github, context } = getLocalConfigs();
  main({
    github,
    context,
  });
}



module.exports = main
