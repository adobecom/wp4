import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './quote.spec.js';
import QuoteBlock from './quote.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let quote;
let webUtil;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Quote Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    quote = new QuoteBlock(page);
  });

  // Test 0 : Quote default block
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Quote block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Quote block content/specs', async () => {
      await expect(await quote.quoteImage).toBeVisible();
      await expect(await quote.quoteCopy).toContainText(data.quoteCopy);
      await expect(await quote.quoteFigCaption).toContainText(data.figCaption);
      await expect(await quote.quoteFigCaptionCite).toContainText(data.cite);

      expect(await webUtil.verifyAttributes(await quote.quote, quote.attProperties.quote)).toBeTruthy();
      expect(await webUtil.verifyCSS(await quote.quote, quote.cssProperties.quote)).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Quote default block', async () => {
      await runAccessibilityTest({ page, testScope: quote.quote });
    });
  });

  // Test 1 : quote (contained)
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Quote block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Quote (contained) block content/specs', async () => {
      await expect(await quote.quoteImage).toBeVisible();
      await expect(await quote.quoteCopy).toContainText(data.quoteCopy);
      await expect(await quote.quoteFigCaption).toContainText(data.figCaption);
      await expect(await quote.quoteFigCaptionCite).toContainText(data.cite);

      expect(await webUtil.verifyAttributes(await quote.quote, quote.attProperties['quote-contained'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await quote.quote, quote.cssProperties['quote-contained'])).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the quote (contained) block', async () => {
      await runAccessibilityTest({ page, testScope: quote.quote });
    });
  });

  // Test 2 : Quote (inline,contained)
  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Quote (inline) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Quote (inline) block content/specs', async () => {
      await expect(await quote.quoteImage).toBeVisible();
      await expect(await quote.quoteCopy).toContainText(data.quoteCopy);
      await expect(await quote.quoteFigCaption).toContainText(data.figCaption);
      await expect(await quote.quoteFigCaptionCite).toContainText(data.cite);

      expect(await webUtil.verifyAttributes(await quote.quote, quote.attProperties['quote-inline'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await quote.quote, quote.cssProperties.quote)).toBeTruthy();
      expect(await webUtil.verifyCSS(await quote.quoteImage, quote.cssProperties['quote-inline-figure'])).toBeTruthy();
    });
  });

  // Test 3 : quote (borders)
  test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[MiloInfo] Checking page: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to Quote (borders) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Quote (borders) block content/specs', async () => {
      await expect(await quote.quoteImage).not.toBeVisible();
      await expect(await quote.quoteCopy).toContainText(data.quoteCopy);
      await expect(await quote.quoteFigCaption).toContainText(data.figCaption);
      await expect(await quote.quoteFigCaptionCite).toContainText(data.cite);

      expect(await webUtil.verifyAttributes(await quote.quote, quote.attProperties['quote-borders'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await quote.quote, quote.cssProperties.quote)).toBeTruthy();
    });
  });

  // Test 4 : quote (align-right)
  test(`[Test Id - ${features[4].tcid}] ${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to Quote (align-right) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Quote (align-right) block content/specs', async () => {
      await expect(await quote.quoteImage).toBeVisible();
      await expect(await quote.quoteCopy).toContainText(data.quoteCopy);
      await expect(await quote.quoteFigCaption).toContainText(data.figCaption);
      await expect(await quote.quoteFigCaptionCite).toContainText(data.cite);

      expect(await webUtil.verifyAttributes(await quote.quote, quote.attProperties['quote-align-right'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await quote.quote, quote.cssProperties['quote-align-right'])).toBeTruthy();
    });
  });

  // Test 5 : quote (xl-spaced)
  test(`[Test Id - ${features[5].tcid}] ${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const { data } = features[5];

    await test.step('step-1: Go to Quote (xl-spaced) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Quote (xl-spaced) block content/specs', async () => {
      await expect(await quote.sectionDark).toBeVisible();
      await expect(await quote.quoteImage).not.toBeVisible();
      await expect(await quote.quoteCopy).toContainText(data.quoteCopy);
      await expect(await quote.quoteFigCaption).toContainText(data.figCaption);
      await expect(await quote.quoteFigCaptionCite).toContainText(data.cite);

      expect(await webUtil.verifyAttributes(await quote.sectionDark, quote.attProperties['section-dark'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(await quote.quote, quote.attProperties['quote-xl-spacing'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await quote.quote, quote.cssProperties.quote)).toBeTruthy();
    });
  });
});
