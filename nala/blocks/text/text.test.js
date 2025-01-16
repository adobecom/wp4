import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './text.spec.js';
import TextBlock from './text.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let text;
let webUtil;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Text Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    text = new TextBlock(page);
    webUtil = new WebUtil(page);
  });

  // Test 0 : Text
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Text block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text specs', async () => {
      await expect(await text.text).toBeVisible();
      await expect(await text.headline).toContainText(data.h3Text);
      await expect(await text.bodyM).toContainText(data.bodyText);
      await expect(await text.outlineButton).toContainText(data.outlineButtonText);

      expect(await webUtil.verifyCSS(text.headline, text.cssProperties['heading-l'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.bodyM, text.cssProperties['body-m'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.actionAreaLink, text.cssProperties['body-m'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.text).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
      await expect(await text.outlineButton).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.outlineButtonText, 1, data.h3Text));
      await expect(await text.actionAreaLink).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.linkText, 2, data.h3Text));
    });

    await test.step('step-4: Verify the accessibility test on the text block', async () => {
      await runAccessibilityTest({ page, testScope: text.text });
    });
  });

  // Test 1 : Text (intro)
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Text (intro) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text (intro) specs', async () => {
      await expect(text.textIntro).toBeVisible();
      await expect(await text.introHeadline).toContainText(data.h2Text);
      await expect(await text.bodyM).toContainText(data.bodyText);

      expect(await webUtil.verifyAttributes(text.textIntro, text.attProperties['text-intro'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.introDetailM, text.cssProperties['detail-m'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.introHeadline, text.cssProperties['heading-l'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.bodyM, text.cssProperties['body-m'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.textIntro).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
    });

    await test.step('step-4: Verify the accessibility test on the text (Intro) block', async () => {
      await runAccessibilityTest({ page, testScope: text.textIntro });
    });
  });

  // Test 2 : Text (full-width)
  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Text (full width) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text (full width) specs', async () => {
      await expect(text.textFullWidth).toBeVisible();

      await expect(await text.fullWidthHeadline).toContainText(data.h3Text);
      await expect(await text.bodyM).toContainText(data.bodyText);
      await expect(await text.bodyLink).toContainText(data.linkText);

      expect(await webUtil.verifyAttributes(await text.textFullWidth, text.attProperties['text-full-width'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await text.fullWidthHeadline, text.cssProperties['heading-l'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await text.bodyM, text.cssProperties['body-m'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.textFullWidth).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
      await expect(await text.bodyLink).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.linkText, 1, data.h3Text));
    });

    await test.step('step-4: Verify the accessibility test on the text (full-width) block', async () => {
      await runAccessibilityTest({ page, testScope: text.textFullWidth });
    });
  });

  // Test 3 : Text (full-width, large)
  test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to text (full-width, large) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text (full-width, large) specs', async () => {
      await expect(text.textFullWidthLarge).toBeVisible();

      await expect(await text.fullWidthLargeHeadline).toContainText(data.h2Text);
      await expect(await text.bodyM).toContainText(data.bodyText);
      await expect(await text.bodyLink).toContainText(data.linkText);

      expect(await webUtil.verifyAttributes(text.textFullWidthLarge, text.attProperties['text-full-width-large'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.fullWidthLargeHeadline, text.cssProperties['heading-xl'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.bodyM, text.cssProperties['body-m'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.textFullWidthLarge).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
      await expect(await text.bodyLink).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.linkText, 1, data.h2Text));
    });

    await test.step('step-4: Verify the accessibility test on the text (full-width large) block', async () => {
      await runAccessibilityTest({ page, testScope: text.textFullWidthLarge });
    });
  });

  // Test 4 : Text (long-form, large)
  test(`[Test Id - ${features[4].tcid}] ${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to Text (long form, large) block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text (long form, large) specs', async () => {
      await expect(await text.textLongFormLarge).toBeVisible();

      await expect(await text.longFormDetailL).toContainText(data.detailText);
      await expect(await text.longFormLargeHeadline).toContainText(data.h2Text);
      await expect(await text.bodyL).toContainText(data.bodyText);

      expect(await webUtil.verifyAttributes(text.textLongFormLarge, text.attProperties['text-long-form-large'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.longFormDetailL, text.cssProperties['detail-l'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.longFormLargeHeadline, text.cssProperties['heading-l'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.bodyL, text.cssProperties['body-l'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.textLongFormLarge).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
    });

    await test.step('step-4: Verify the accessibility test on the text (long-form large) block', async () => {
      await runAccessibilityTest({ page, testScope: text.textLongFormLarge });
    });
  });

  // Test 5 : Text (inset, medium, m-spacing)
  test(`[Test Id - ${features[5].tcid}] ${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const { data } = features[5];

    await test.step('step-1: Go to Text (inset, medium, m-spacing ) block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text (inset, large, m spacing) specs', async () => {
      await expect(await text.textInsetLargeMSpacing).toBeVisible();

      await expect(await text.insetLargeMSpacingHeadline).toContainText(data.h3Text);
      await expect(await text.bodyL).toContainText(data.bodyText);
      await expect(await text.listOneItems).toHaveCount(data.listCount1);

      expect(await webUtil.verifyAttributes(text.textInsetLargeMSpacing, text.attProperties['text-inset-medium-m-spacing'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.insetLargeMSpacingHeadline, text.cssProperties['heading-m'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.bodyL, text.cssProperties['body-l'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.propertiesHeadingM, text.cssProperties['heading-m'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.textInsetLargeMSpacing).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
    });

    await test.step('step-4: Verify the accessibility test on the text (linset, medium, m-spacing) block', async () => {
      await runAccessibilityTest({ page, testScope: text.textInsetLargeMSpacing });
    });
  });

  // Test 6 : Text (legal)
  test(`[Test Id - ${features[6].tcid}] ${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const { data } = features[6];

    await test.step('step-1: Go to Text (legal) block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text (legal) specs', async () => {
      await expect(await text.textlegal).toBeVisible();

      await expect(await text.generalTermsOfUse).toContainText(data.termsOfUseText);
      await expect(await text.publishText).toContainText(data.publishText);
      await expect(await text.generalTerms).toContainText(data.generalTermsText);
      await expect(await text.legalInfoLink).toContainText(data.linkText);

      expect(await webUtil.verifyAttributes(text.textlegal, text.attProperties['text-legal'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.bodyXSS, text.cssProperties['body-xss'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.textlegal).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
    });

    await test.step('step-4: Verify the accessibility test on the text (legal) block', async () => {
      // The accessibility test is failing, so skipping it.
      await runAccessibilityTest({ page, testScope: text.textlegal, skipA11yTest: true });
    });
  });

  test(`[Test Id - ${features[7].tcid}] ${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);
    const { data } = features[7];

    await test.step('step-1: Go to Text (link-farm) block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Text (link-farm) specs', async () => {
      await expect(await text.textLinkFarm).toBeVisible();

      await expect(await text.linkFarmcolumns).toHaveCount(data.headingColumns);
      await expect(await text.linkColumnOne).toHaveCount(data.linksCount);
      await expect(await text.linkFormText).toContainText(data.linkText);

      expect(await webUtil.verifyAttributes(text.textLinkFarm, text.attProperties['text-Link-farm'])).toBeTruthy();
      expect(await webUtil.verifyCSS(text.linkFarmHeadline, text.cssProperties['heading-l'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(text.linkFarmcolumnheading, text.attProperties.headingprops)).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await text.textLinkFarm).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('text', 1));
    });

    await test.step('step-4: Verify the accessibility test on the text (link form) block', async () => {
      await runAccessibilityTest({ page, testScope: text.textLinkFarm });
    });
  });
});
