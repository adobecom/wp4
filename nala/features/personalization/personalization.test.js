import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './personalization.spec.js';
import MarqueeBlock from '../../blocks/marquee/marquee.page.js';
import TextBlock from '../../blocks/text/text.page.js';
import Howto from '../../blocks/howto/howto.page.js';

let webUtil;
let howto;
let marquee;
let text;
let pznUrl;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Personalization feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
  });

  test.beforeAll(async ({ baseURL }) => {
    const skipOn = ['bacom', 'business'];

    skipOn.some((skip) => {
      if (baseURL.includes(skip)) test.skip(true, `Skipping the personalization tests for ${baseURL}`);
      return null;
    });
  });

  // Test 0 : Personalization (Replace content)
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];
    text = new TextBlock(page);
    marquee = new MarqueeBlock(page);
    pznUrl = `${baseURL}${features[0].path}${'?target='}${data.target}&${miloLibs}`;

    await test.step('step-1: Go to default test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify default test page content/specs', async () => {
      await expect(await marquee.marquee).toBeVisible();
    });

    await test.step('step-3: Navigate to personlized page and verify content/specs', async () => {
      await page.goto(pznUrl);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(pznUrl);
      console.info(`[Pzn Page]: ${pznUrl}`);

      await expect(await text.text).toBeVisible();
      await expect(await text.headline).toContainText(data.h3Text);

      const blockDll = await webUtil.getPznBlockDaalh('text', 1, data.pznExpName, data.pznFileName);
      await expect(await text.text).toHaveAttribute('daa-lh', blockDll);
    });
  });

  // Test 1 : Personalization (Insert Content Before)
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];
    text = new TextBlock(page);
    marquee = new MarqueeBlock(page);
    pznUrl = `${baseURL}${features[1].path}${'?target='}${data.target}&${miloLibs}`;

    await test.step('step-1: Go to default test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify default test page content/specs', async () => {
      await expect(await marquee.marquee).toBeVisible();
    });

    await test.step('step-3: Navigate to personlized page and verify content/specs', async () => {
      await page.goto(pznUrl);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(pznUrl);
      console.info(`[Pzn Page]: ${pznUrl}`);

      await expect(await text.text).toBeVisible();
      await expect(await text.headline).toContainText(data.h3Text);

      // text block Dll analytics
      const textBlockDll = await webUtil.getPznBlockDaalh('text', 1, data.pznExpName, data.pznFileName);
      await expect(await text.text).toHaveAttribute('daa-lh', textBlockDll);

      // Marquee block Dll analytics
      await expect(await marquee.marquee).toBeVisible();
      const marqueeBlockDll = await webUtil.getPznBlockDaalh('marquee', 2, data.pznExpName, data.pznFileName);
      await expect(await marquee.marquee).toHaveAttribute('daa-lh', marqueeBlockDll);
    });
  });

  // Test 2 : Personalization (Insert Content After)
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];
    text = new TextBlock(page);
    howto = new Howto(page);
    pznUrl = `${baseURL}${features[2].path}${'?target='}${data.target}&${miloLibs}`;

    await test.step('step-1: Go to default test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify default test page content/specs', async () => {
      await expect(await howto.howTo).toBeVisible();
    });

    await test.step('step-3: Navigate to personlized page and verify content/specs', async () => {
      await page.goto(pznUrl);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(pznUrl);
      console.info(`[Pzn Page]: ${pznUrl}`);

      await expect(await text.text).toBeVisible();
      await expect(await text.headline).toContainText(data.h3Text);

      // HowTo block Dll analytics
      await expect(await howto.howTo).toBeVisible();
      const howtoBlockDll = await webUtil.getPznBlockDaalh('how-to', 1, data.pznExpName, data.pznFileName);
      await expect(await howto.howTo).toHaveAttribute('daa-lh', howtoBlockDll);

      // text block Dll analytics
      const textBlockDll = await webUtil.getPznBlockDaalh('text', 2, data.pznExpName, data.pznFileName);
      await expect(await text.text).toHaveAttribute('daa-lh', textBlockDll);
    });
  });
  // Test 3 : Personalization (replaceFragment)
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    text = new TextBlock(page);
    marquee = new MarqueeBlock(page);
    const { data } = features[3];
    const pznURL = `${baseURL}${features[3].path}${miloLibs}`;
    const defaultURL = `${baseURL}${data.defaultURLpath}&${miloLibs}`;

    await test.step('step-1: Navigate to default page and verify content/specs', async () => {
      console.info(`[Test Page]: ${defaultURL}`);
      await page.goto(defaultURL);
      await expect(text.introHeadlineAlt).toContainText('This text block will be replaced');
      await expect(marquee.marquee).toHaveCount(0);
    });

    await test.step('step-2: Navigate to personalized page and verify content/specs', async () => {
      console.info(`[Test Page]: ${pznURL}`);
      await page.goto(pznURL);
      await expect(text.introHeadlineAlt).toHaveCount(0);
      await expect(marquee.marquee).toContainText('This is a new marquee, replacing the text block');
    });
  });

  // Test 4 : Personalization (remove content)
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    text = new TextBlock(page);
    const { data } = features[4];
    const pznURL = `${baseURL}${features[4].path}${miloLibs}`;
    const defaultURL = `${baseURL}${data.defaultURLpath}&${miloLibs}`;

    await test.step('step-1: Navigate to default page and verify content/specs', async () => {
      console.info(`[Test Page]: ${defaultURL}`);
      await page.goto(defaultURL);
      await expect(text.introHeadlineAlt).toContainText('This heading will be removed in the personalization');
      await expect(text.introHeadlineAlt).toBeVisible();
    });

    await test.step('step-2: Navigate to personalized page and verify content/specs', async () => {
      console.info(`[Test Page]: ${pznURL}`);
      await page.goto(pznURL);
      await expect(text.introHeadlineAlt).not.toBeVisible();
    });
  });
});
