#!/usr/bin/env node
/* eslint-disable default-param-last */
const { Command } = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const { processUrlsFromCommand, processUrlsFromFile } = require('./a11y-bot.js');

const BASE_URLS = {
  local: 'http://localhost:3000',
  stage: 'http://stage--milo--adobecom.hlx.live',
  main: 'https://main--milo--adobecom.hlx.live',
};

const program = new Command();

program
  .name('nala-a11y-bot')
  .description('Nala Accessibility Testing Bot')
  .version('1.0.0');

program
  .command('a11y [env] [path]')
  .description('Run an accessibility test on an environment with optional path or a file with URLs')
  .option('-f, --file <filePath>', 'Specify a file with multiple URLs')
  .option('-s, --scope <scope>', 'Specify the test scope (default: body)', 'body')
  .option('-t, --tags <tags>', 'Specify the tags to include', (val) => val.split(','))
  .option('-m, --max-violations <maxViolations>', 'Set the maximum number of allowed violations before the test fails (default: 0)', (val) => parseInt(val, 10), 0)
  .option('-o, --output-dir <outputDir>', 'Specify the directory to save the HTML report (default: ./test-a11y-results)', './test-a11y-results')
  .action(async (env, path = '', options) => {
    const urls = [];

    try {
      if (options.file) {
        if (!fs.existsSync(options.file)) {
          console.error(chalk.red(`Error: The file path "${options.file}" does not exist.`));
          process.exit(1);
        }
        await processUrlsFromFile(options.file, options);
        return;
      }

      // Validate environment or URL input
      if (env && BASE_URLS[env]) {
        const fullUrl = `${BASE_URLS[env]}${path.startsWith('/') ? '' : '/'}${path}`;
        urls.push(fullUrl);
      } else if (env && (env.startsWith('http://') || env.startsWith('https://'))) {
        urls.push(env);
      } else if (env) {
        const branchUrl = `https://${env}--milo--adobecom.hlx.live${path.startsWith('/') ? '' : '/'}${path}`;
        urls.push(branchUrl);
      } else if (!options.file) {
        console.error(chalk.red('Error: Invalid environment, URL, or file provided.'));
        process.exit(1);
      }

      const validUrls = urls.filter((url) => url.startsWith('http://') || url.startsWith('https://'));

      if (validUrls.length > 0) {
        await processUrlsFromCommand(validUrls, options);
      }
    } catch (error) {
      console.error(chalk.red(`An error occurred during processing: ${error.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
