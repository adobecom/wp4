const fs = require('fs');
const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright');
const chalk = require('chalk');
const generateA11yReport = require('./a11y-report.js');

/**
 * Run accessibility test for legal compliance (WCAG 2.0/2.1 A & AA)
 * @param {Object} page - The page object.
 * @param {string} [testScope='body'] - Optional scope for the accessibility test. Default is 'body'.
 * @param {string[]} [includeTags=['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']] - WCAG compliance tags.
 * @param {number} [maxViolations=0] - Maximum violations before test fails. Default is 0.
 * @returns {Object} - Results containing violations or success message.
 */
async function runAccessibilityTest(page, testScope = 'body', includeTags = [], maxViolations = 0) {
  const result = {
    url: page.url(),
    testScope,
    violations: [],
  };

  const wcagTags = includeTags.length > 0 ? includeTags : ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

  try {
    const testElement = testScope === 'body' ? 'body' : testScope;

    console.log(chalk.blue('Accessibility Test Scope:'), testScope);
    console.log(chalk.blue('WCAG Tags:'), wcagTags);

    const axe = new AxeBuilder({ page })
      .withTags(wcagTags)
      .include(testElement)
      .analyze();

    result.violations = (await axe).violations;
    const violationCount = result.violations.length;

    if (violationCount > maxViolations) {
      let violationsDetails = `${violationCount} accessibility violations found:\n`;
      result.violations.forEach((violation, index) => {
        violationsDetails += `
        ${chalk.red(index + 1)}. Violation: ${chalk.yellow(violation.description)}
           - Rule ID: ${chalk.cyan(violation.id)}
           - Severity: ${chalk.magenta(violation.impact)}
           - Fix: ${chalk.cyan(violation.helpUrl)}
        `;

        violation.nodes.forEach((node, nodeIndex) => {
          violationsDetails += `     Node ${nodeIndex + 1}: ${chalk.yellow(node.html)}\n`;
        });
      });

      throw new Error(violationsDetails);
    } else {
      console.info(chalk.green('No accessibility violations found.'));
    }
  } catch (err) {
    console.error(chalk.red(`Accessibility test failed: ${err.message}`));
  }

  return result;
}

/**
 * Opens a browser, navigates to a page, runs accessibility test, and returns results.
 * @param {string} url - The URL to test.
 * @param {Object} options - Test options (scope, tags, maxViolations).
 * @returns {Object} - Accessibility test results.
 */
async function runA11yTestOnPage(url, options = {}) {
  const { scope = 'body', tags, maxViolations = 0 } = options;
  const browser = await chromium.launch();
  const context = await browser.newContext({
    extraHTTPHeaders: {
      'sec-ch-ua': '"Chromium"',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
    },
  });

  const page = await context.newPage();
  let result;

  try {
    console.log(chalk.blue(`Testing URL: ${url}`));
    await page.goto(url, { timeout: 60000, waitUntil: 'domcontentloaded' });
    result = await runAccessibilityTest(page, scope, tags, maxViolations);
  } finally {
    await browser.close();
  }

  return result;
}

/**
 * Processes URLs from a file and generates accessibility report.
 * @param {string} filePath - Path to file with URLs.
 * @param {Object} options - Test options.
 */
async function processUrlsFromFile(filePath, options = {}) {
  const urls = fs.readFileSync(filePath, 'utf-8').split('\n').filter(Boolean);
  console.log(chalk.blue('Processing URLs from file:'), urls);
  const results = [];

  for (const url of urls) {
    const result = await runA11yTestOnPage(url, options);
    if (result && result.violations.length > 0) results.push(result);
  }

  await generateA11yReport(results, options.outputDir || './test-a11y-results');
}

/**
 * Processes URLs directly from command-line arguments and generates report.
 * @param {string[]} urls - Array of URLs.
 * @param {Object} options - Test options.
 */
async function processUrlsFromCommand(urls, options = {}) {
  console.log(chalk.blue('Processing URLs from command-line input:'), urls);
  const results = [];

  for (const url of urls) {
    const result = await runA11yTestOnPage(url, options);
    if (result && result.violations.length > 0) results.push(result);
  }

  await generateA11yReport(results, options.outputDir || './reports');
}

module.exports = {
  runA11yTestOnPage,
  processUrlsFromFile,
  processUrlsFromCommand,
};
