import { expect, test } from '@playwright/test';
import { features } from './docs.spec.js';

const miloLibs = process.env.MILO_LIBS || '';

test.describe('MAS Docs feature test suite', () => {
  test.beforeEach(async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Not supported to run on multiple browsers.');

    if (browserName === 'chromium') {
      await page.setExtraHTTPHeaders({ 'sec-ch-ua': '"Chromium";v="123", "Not:A-Brand";v="8"' });
    }
  });

  // *** Checkout Link Page: ***

  // @MAS-DOCS-checkout-link
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[0].path}${miloLibs}`;
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to MAS Checkout Link Docs page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify on load pending & resolved events', async () => {
      const eventsLog = page.locator('#log');
      await expect(eventsLog).toHaveText('checkout-link resolvedcheckout-link resolved');
    });

    await test.step('step-3: Verify on click pending & resolved events', async () => {
      const btnRefresh = page.locator('#btnRefresh');
      const eventsLog = page.locator('#log');
      await btnRefresh.click();
      await expect(eventsLog).toHaveText('checkout-link resolvedcheckout-link resolvedcheckout-link resolvedcheckout-link resolved');
    });
  });
});
