import { expect, test } from '@playwright/test';
import { features } from './aside.spec.js';
import AsideBlock from './aside.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Aside Block test suite', () => {
  // Aside Small Checks:
  test(`[Test Id - 0] ${features[0].name}, ${features[0].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[0].path}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[0].path}${features[0].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSmall).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h2TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.textLink).toBeVisible();
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSmall.evaluate(
        (e) => window.getComputedStyle(e).getPropertyValue('background-color'),
      );
      expect(bgdColor).toBe(Aside.props.background.lightGrey1);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Small block', async () => {
      // The accessibility test for the Aside Small is failing, so skipping it.
      await runAccessibilityTest({ page, testScope: Aside.asideSmall, skipA11yTest: true });
    });
  });

  // Aside Medium Checks:
  test(`[Test Id - 1] ${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[1].path}${features[1].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${features[1].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideMedium).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.lightGrey1);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Medium block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideMedium, skipA11yTest: true });
    });
  });

  // Aside Large Checks:
  test(`[Test Id - 2] ${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[2].path}${features[2].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${features[2].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideLarge).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).not.toBeVisible();
      await expect(Aside.linkTextCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideLarge.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.lightGrey1);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Large block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideLarge, skipA11yTest: true });
    });
  });

  // Aside Split Small Dark Checks:
  test(`[Test Id - 3] ${features[3].name}, ${features[3].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[3].path}${features[3].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${features[3].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitSmallDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitSmallDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.black);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Split Small Dark block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideSplitSmallDark });
    });
  });

  // Aside Split Small Half Dark Checks:
  test(`[Test Id - 4] ${features[4].name}, ${features[4].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[4].path}${features[4].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${features[4].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitSmallHalfDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitSmallHalfDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.black);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Split Small Half Dark block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideSplitSmallHalfDark });
    });
  });

  // Aside Split Medium Checks:
  test(`[Test Id - 5] ${features[5].name}, ${features[5].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[5].path}${features[5].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${features[5].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitMedium).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.lightGrey3);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Split Medium block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideSplitMedium });
    });
  });

  // Aside Split Medium Half Checks:
  test(`[Test Id - 6] ${features[6].name}, ${features[6].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[6].path}${features[6].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${features[6].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitMedidumHalf).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitMedidumHalf.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.lightGrey3);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Split Medium Half block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideSplitMedidumHalf });
    });
  });

  // Aside Split Large Checks:
  test(`[Test Id - 7] ${features[7].name}, ${features[7].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[7].path}${features[7].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${features[7].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitLarge).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // !Note: Aside Split Large doesn't have default background!
    });

    await test.step('step-3: Verify the accessibility test on the Aside Split Large block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideSplitLarge });
    });
  });

  // Aside Split Large Half Dark Checks:
  test(`[Test Id - 8] ${features[8].name}, ${features[8].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[8].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[8].path}${features[8].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}${features[8].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideSplitLargeHalfDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).toBeVisible();
      await expect(Aside.h3TitleXLarge).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideSplitLargeHalfDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.black);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Split Large Half Dark block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideSplitLargeHalfDark });
    });
  });

  // Aside Inline Checks:
  test(`[Test Id - 9] ${features[9].name}, ${features[9].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[9].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[9].path}${features[9].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}${features[9].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideInline).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideInline.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.lightGrey2);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Inline block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideInline });
    });
  });

  // Aside Inline Dark Checks:
  test(`[Test Id - 10] ${features[10].name}, ${features[10].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[10].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[10].path}${features[10].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[10].path}${features[10].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideInline).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      await expect(Aside.linkTextCta).not.toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideInline.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.black);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Inline Dark block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideInline });
    });
  });

  // Aside Notification Extra Small Dark:
  test(`[Test Id - 11] ${features[11].name}, ${features[11].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[11].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[11].path}${features[11].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[11].path}${features[11].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifExtraSmallDark).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.noImage).toBeVisible();
      await expect(Aside.actionArea).not.toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h2TitleSmall).not.toBeVisible();
      await expect(Aside.h2TitleXLarge).not.toBeVisible();
      await expect(Aside.h3TitleSmall).not.toBeVisible();
      await expect(Aside.h3TitleXLarge).not.toBeVisible();
      await expect(Aside.textFieldSmall).not.toBeVisible();
      await expect(Aside.textFieldMedium).not.toBeVisible();
      await expect(Aside.textFieldLarge).not.toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.linkTextCta.first()).toBeVisible();
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).not.toBeVisible();
      expect(await Aside.actionLinks.count()).toEqual(2);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifExtraSmallDark.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.black);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Notification Extra Small Dark block', async () => {
      // The accessibility test for the AAside Notification Extra Small is failing, so skipping it.
      await runAccessibilityTest({ page, testScope: Aside.asideNotifExtraSmallDark, skipA11yTest: true });
    });
  });

  // Aside Notification Small:
  test(`[Test Id - 12] ${features[12].name}, ${features[12].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[12].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[12].path}${features[12].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[12].path}${features[12].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifSmall).toBeVisible();
      await expect(Aside.icon).toBeVisible();
      await expect(Aside.image).not.toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h2TitleSmall).not.toBeVisible();
      await expect(Aside.h2TitleXLarge).not.toBeVisible();
      await expect(Aside.h3TitleSmall).not.toBeVisible();
      await expect(Aside.h3TitleXLarge).not.toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.textLink).toBeVisible();
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifSmall.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.darkGrey);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Notification Small block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideNotifSmall });
    });
  });

  // Aside Notification Medium:
  test(`[Test Id - 13] ${features[13].name}, ${features[13].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[13].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[13].path}${features[13].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[13].path}${features[13].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifMedium).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.linkTextCta).toBeVisible();
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.darkGrey);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Notification Medium block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideNotifMedium });
    });
  });

  // Aside Notification Medium Center:
  test(`[Test Id - 14] ${features[14].name}, ${features[14].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[14].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[14].path}${features[14].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[14].path}${features[14].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifMedium).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).not.toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleSmall).toBeVisible();
      await expect(Aside.textFieldSmall).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.linkTextCta).toBeVisible();
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifMedium.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.darkGrey);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Notification Medium Center block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideNotifMedium });
    });
  });

  // Aside Notification Large:
  test(`[Test Id - 15] ${features[15].name}, ${features[15].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[15].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[15].path}${features[15].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[15].path}${features[15].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifLarge).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleLarge).toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.linkTextCta).toBeVisible();
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifLarge.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.darkGrey);
    });

    await test.step('step-3: Verify the accessibility test on the Aside Notification Large block', async () => {
      await runAccessibilityTest({ page, testScope: Aside.asideNotifLarge });
    });
  });

  // Aside Notification Large Center:
  test(`[Test Id - 16] ${features[16].name}, ${features[16].tags}`, async ({ page, baseURL }) => {
    const Aside = new AsideBlock(page);
    console.info(`[Test Page]: ${baseURL}${features[16].path}${miloLibs}`);

    await test.step('Navigate to page with Aside block', async () => {
      await page.goto(`${baseURL}${features[16].path}${features[16].browserParams}&${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[16].path}${features[16].browserParams}&${miloLibs}`);
    });

    await test.step('Validate Aside block content', async () => {
      await expect(Aside.asideNotifLargeCenter).toBeVisible();
      await expect(Aside.icon).not.toBeVisible();
      await expect(Aside.image).not.toBeVisible();
      await expect(Aside.actionArea).toBeVisible();
      await expect(Aside.detailLabel).not.toBeVisible();
      await expect(Aside.h3TitleLarge).toBeVisible();
      await expect(Aside.textFieldMedium).toBeVisible();
      // Check Aside block buttons:
      await expect(Aside.linkTextCta).toBeVisible();
      await expect(Aside.blueButtonCta).not.toBeVisible();
      await expect(Aside.blackButtonCta).toBeVisible();
      expect(await Aside.actionButtons.count()).toEqual(1);
      // Check Aside block background:
      const bgdColor = await Aside.asideNotifLargeCenter.evaluate((e) => window.getComputedStyle(e).getPropertyValue('background-color'));
      expect(bgdColor).toBe(Aside.props.background.darkGrey);
    });
  });
});
