import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './video.spec.js';
import VideoBlock from './video.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let webUtil;
let video;
const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Video Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    video = new VideoBlock(page);
  });

  // Test 0 : Video default
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      await expect(await webUtil.verifyAttributes(video.video, video.attributes['video.default'])).toBeTruthy();
      await expect(await webUtil.verifyAttributes(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Video default block', async () => {
      await runAccessibilityTest({ page, testScope: video.video });
    });
  });

  // Test 1 : Video autoplay loop
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      expect(await webUtil.verifyAttributes(video.video, video.attributes['video.autoplay'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });
  });

  // Test 2 : Video autoplay loop once
  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);

      expect(await webUtil.verifyAttributes(video.video, video.attributes['video.autoplay.once'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });
  });

  // Test 3 : Video hover play
  test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.video).toBeVisible();
      await expect(await video.content).toContainText(data.h2Text);
      await new Promise((resolve) => { setTimeout(resolve, 5000); });
      await video.video.hover({ force: true });

      expect(await webUtil.verifyAttributes(video.video, video.attributes['video.autoplay.once'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(video.videoSource, video.attributes['video.source'])).toBeTruthy();
    });
  });

  // Test 4 : MPC Video
  test(`[Test Id - ${features[4].tcid}] ${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.miloVideo).toBeVisible();
      await expect(await video.iframe).toBeVisible();

      await expect(await video.iframe).toHaveAttribute('title', data.iframeTitle);
      await expect(await video.iframe).toHaveAttribute('src', data.source);
      expect(await webUtil.verifyAttributes(video.iframe, video.attributes['iframe-mpc'])).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the MPC Video block', async () => {
      await runAccessibilityTest({ page, testScope: video.miloVideo, skipA11yTest: true });
    });
  });

  // Test 5 : MPC Video Autoplay Looping
  test(`[Test Id - ${features[5].tcid}] ${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const { data } = features[5];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.miloVideo).toBeVisible();
      await expect(await video.iframe).toHaveAttribute('title', data.iframeTitle);
      await expect(await video.iframe).toHaveAttribute('src', data.source);
      expect(await webUtil.verifyAttributes(video.iframe, video.attributes['iframe-mpc'])).toBeTruthy();
    });
  });

  // Test 6 : Youtube Video
  test(`[Test Id - ${features[6].tcid}] ${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const { data } = features[6];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.miloVideo).toBeVisible();
      await expect(await video.youtubePlayButton).toBeVisible();
      await expect(await video.youtubePlayButton).toHaveAttribute('type', 'button');

      await expect(await video.liteYoutube).toHaveAttribute('playlabel', data.playLabel);
      await expect(await video.liteYoutube).toHaveAttribute('videoid', data.videoId);
    });
  });

  // Test 7 : Modal Video default
  test(`[Test Id - ${features[7].tcid}] ${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);
    // const { data } = features[7];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${miloLibs}`);
    });

    await test.step('step-2: Verify video block content/specs', async () => {
      await expect(await video.modalVideo).toBeVisible();

      expect(await webUtil.verifyAttributes(video.modalVideo, video.attributes['video.autoplay'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(video.modalVideoSource, video.attributes['video.source'])).toBeTruthy();

      const srcAttributeValue = await video.modalVideoSource.getAttribute('src');
      console.log('[video source]:', srcAttributeValue);
      expect(srcAttributeValue).not.toBe('');
    });

    await test.step('step-3: Verify the accessibility test on the Modal Video block', async () => {
      await runAccessibilityTest({ page, testScope: video.modalVideo });
    });
  });

  // Test 8 : Modal video with cards
  test(`[Test Id - ${features[8].tcid}] ${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
    test.slow();
    console.info(`[Test Page]: ${baseURL}${features[8].path}${miloLibs}`);
    const { data } = features[8];

    await test.step('step-1: Go to video block test page', async () => {
      await page.goto(`${baseURL}${features[8].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}${miloLibs}`);
    });

    await test.step('step-2: Verify consonant cards with modal video block content/specs', async () => {
      await expect(await video.consonantCardsGrid).toBeVisible();
      await expect(await video.consonantCards.nth(0)).toBeVisible();
      await expect(await video.consonantCards).toHaveCount(data.cardsCount);

      await expect(await video.modalVideo).toBeVisible();
      expect(await webUtil.verifyAttributes(video.modalVideo, video.attributes['video.autoplay'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(video.modalVideoSource, video.attributes['video.source'])).toBeTruthy();

      const srcAttributeValue = await video.modalVideoSource.getAttribute('src');
      console.log('[video source]:', srcAttributeValue);
      expect(srcAttributeValue).not.toBe('');
    });

    await test.step('step-3: Verify the accessibility test on the Modal video with cards block', async () => {
      await runAccessibilityTest({ page, testScope: video.consonantCardsGrid });
    });
  });
});
