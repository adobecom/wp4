/* eslint-disable import/no-extraneous-dependencies */

const { devices } = require('@playwright/test');

const USER_AGENT_DESKTOP = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.18 Safari/537.36 NALA-Acom';
const USER_AGENT_MOBILE_CHROME = 'Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36 NALA-Acom';
const USER_AGENT_MOBILE_SAFARI = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1 NALA-Acom';

/**
 * @see https://playwright.dev/docs/test-configuration
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: './nala',
  outputDir: './test-results',
  globalSetup: './nala/utils/global.setup.js',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
  },
  testMatch: '**/*.test.js',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 7 : 3,
  /* Reporter to use. */
  reporter: process.env.CI
    ? [['github'], ['list'], ['./nala/utils/base-reporter.js']]
    : [
      ['html', { outputFolder: 'test-html-results' }],
      ['list'],
      ['./nala/utils/base-reporter.js'],
    ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 60000,

    trace: 'on-first-retry',
    baseURL:
      process.env.PR_BRANCH_LIVE_URL
      || process.env.LOCAL_TEST_LIVE_URL
      || 'https://main--milo--adobecom.aem.live',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'milo-live-chromium',
      use: {
        ...devices['Desktop Chrome'],
        userAgent: USER_AGENT_DESKTOP,
      },
    },

    {
      name: 'milo-live-firefox',
      use: {
        ...devices['Desktop Firefox'],
        userAgent: USER_AGENT_DESKTOP,
      },
    },
    {
      name: 'milo-live-webkit',
      use: {
        ...devices['Desktop Safari'],
        userAgent: USER_AGENT_DESKTOP,
      },
    },
    /* Test Against Mobile View ports */
    {
      name: 'mobile-chrome-pixel5',
      use: {
        ...devices['Pixel 5'],
        userAgent: USER_AGENT_MOBILE_CHROME,
      },
    },
    {
      name: 'mobile-safari-iPhone12',
      use: {
        ...devices['iPhone 12'],
        userAgent: USER_AGENT_MOBILE_SAFARI,
      },
    },
  ],
};

module.exports = config;
