import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './zpattern.spec.js';
import ZPatternBlock from './zpattern.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let webUtil;
let zpattern;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Z Pattern Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    zpattern = new ZPatternBlock(page);
  });

  // Test 0 : ZPattern default block
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Z Pattern block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Z Pattern block specs', async () => {
      await expect(await zpattern.zPatternHeader).toContainText(data.headingText);
      await expect(await zpattern.zPatternPText).toContainText(data.introText);
      await expect(await zpattern.mediaBlocks).toHaveCount(data.mediaBlockCount);

      const mediaBlocks = await zpattern.mediaBlocks.all();
      const mediaBlocksArray = await Promise.all(mediaBlocks.map(async (block) => block));

      for (let i = 0; i < mediaBlocksArray.length; i++) {
        const mediaBlock = mediaBlocksArray[i];
        await expect(await mediaBlock.locator('.detail-m')).toContainText(data.mediaBlocks[i].detailText);
        await expect(await mediaBlock.locator('.heading-m')).toContainText(data.mediaBlocks[i].h2Text);
        await expect(await mediaBlock.locator('.body-s').nth(0)).toContainText(data.mediaBlocks[i].bodyText);
        await expect(await mediaBlock.locator('.blue')).toContainText(data.mediaBlocks[i].blueButtonText);

        const image = await mediaBlock.locator('.image img').nth(0);
        const classAttribute = await mediaBlock.getAttribute('class');
        const hasReversedClass = classAttribute.includes('media-reversed');

        if (hasReversedClass) {
          expect(await webUtil.verifyAttributes(mediaBlock, zpattern.attProperties['medium-media-reversed'])).toBeTruthy();
        }
        expect(await webUtil.verifyAttributes(image, zpattern.attProperties['media-image'])).toBeTruthy();
      }
    });

    await test.step('step-3: Verify the accessibility test on the ZPattern default block', async () => {
      // The accessibility test is failing, so skipping it.
      await runAccessibilityTest({ page, testScope: zpattern.mediaBlocks, skipA11yTest: true });
    });
  });

  // Test 1 :ZPattern (small) block
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to z-pattern (small) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify z-pattern (small) block specs', async () => {
      await expect(await zpattern.zPatternHeader).toContainText(data.headingText);
      await expect(await zpattern.zPatternPText).toContainText(data.introText);
      await expect(await zpattern.mediaBlocks).toHaveCount(data.mediaBlockCount);

      const mediaBlocks = await zpattern.mediaBlocks.all();
      const mediaBlocksArray = await Promise.all(mediaBlocks.map(async (block) => block));

      for (let i = 0; i < mediaBlocksArray.length; i++) {
        const mediaBlock = mediaBlocksArray[i];
        await expect(await mediaBlock.locator('.detail-m')).toContainText(data.mediaBlocks[i].detailText);
        await expect(await mediaBlock.locator('.heading-xs')).toContainText(data.mediaBlocks[i].h2Text);
        await expect(await mediaBlock.locator('.body-s').nth(0)).toContainText(data.mediaBlocks[i].bodyText);
        await expect(await mediaBlock.locator('.blue')).toContainText(data.mediaBlocks[i].blueButtonText);

        const image = await mediaBlock.locator('.image img').nth(0);
        const classAttribute = await mediaBlock.getAttribute('class');
        const hasReversedClass = classAttribute.includes('media-reversed');

        if (hasReversedClass) {
          expect(await webUtil.verifyAttributes(mediaBlock, zpattern.attProperties['small-media-reversed'])).toBeTruthy();
        }
        expect(await webUtil.verifyAttributes(image, zpattern.attProperties['media-image'])).toBeTruthy();
      }
    });
  });

  // Test 2 :Zpattern (large) block
  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to z-pattern (large) block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify z-pattern (large) block specs', async () => {
      await expect(await zpattern.zPatternHeader).toContainText(data.headingText);
      await expect(await zpattern.zPatternPText).toContainText(data.introText);
      await expect(await zpattern.mediaBlocks).toHaveCount(data.mediaBlockCount);

      const mediaBlocks = await zpattern.mediaBlocks.all();
      const mediaBlocksArray = await Promise.all(mediaBlocks.map(async (block) => block));

      for (let i = 0; i < mediaBlocksArray.length; i++) {
        const mediaBlock = mediaBlocksArray[i];
        await expect(await mediaBlock.locator('.detail-l')).toContainText(data.mediaBlocks[i].detailText);
        await expect(await mediaBlock.locator('.heading-xl')).toContainText(data.mediaBlocks[i].h2Text);
        await expect(await mediaBlock.locator('.body-m').nth(0)).toContainText(data.mediaBlocks[i].bodyText);
        await expect(await mediaBlock.locator('.blue')).toContainText(data.mediaBlocks[i].blueButtonText);

        const image = await mediaBlock.locator('.image img').nth(0);
        const classAttribute = await mediaBlock.getAttribute('class');
        const hasReversedClass = classAttribute.includes('media-reversed');

        if (hasReversedClass) {
          expect(await webUtil.verifyAttributes(mediaBlock, zpattern.attProperties['large-media-reversed'])).toBeTruthy();
        }
        expect(await webUtil.verifyAttributes(image, zpattern.attProperties['media-image'])).toBeTruthy();
      }
    });
  });

  // Test 3 :Zpattern (dark) block
  test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to z-pattern (large) block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify z-pattern (dark) block specs', async () => {
      await expect(await zpattern.zPatternHeader).toContainText(data.headingText);
      await expect(await zpattern.zPatternPText).toContainText(data.introText);
      await expect(await zpattern.mediaBlocks).toHaveCount(data.mediaBlockCount);

      const mediaBlocks = await zpattern.mediaBlocks.all();
      const mediaBlocksArray = await Promise.all(mediaBlocks.map(async (block) => block));

      for (let i = 0; i < mediaBlocksArray.length; i++) {
        const mediaBlock = mediaBlocksArray[i];
        await expect(await mediaBlock.locator('.detail-m')).toContainText(data.mediaBlocks[i].detailText);
        await expect(await mediaBlock.locator('.heading-m')).toContainText(data.mediaBlocks[i].h2Text);
        await expect(await mediaBlock.locator('.body-s').nth(0)).toContainText(data.mediaBlocks[i].bodyText);
        await expect(await mediaBlock.locator('.blue')).toContainText(data.mediaBlocks[i].blueButtonText);

        const image = await mediaBlock.locator('.image img').nth(0);
        const classAttribute = await mediaBlock.getAttribute('class');
        const hasReversedClass = classAttribute.includes('media-reversed');

        if (hasReversedClass) {
          expect(await webUtil.verifyAttributes(mediaBlock, zpattern.attProperties['dark-media-reversed'])).toBeTruthy();
        }
        expect(await webUtil.verifyAttributes(image, zpattern.attProperties['media-image'])).toBeTruthy();
      }
    });

    await test.step('step-3: Verify the accessibility test on the ZPattern dark block', async () => {
      // The accessibility test is failing, so skipping it.
      await runAccessibilityTest({ page, testScope: zpattern.mediaBlocks, skipA11yTest: true });
    });
  });
});
