// to run tests:
// npm run nala stage tag=mepact1 mode=headed

import { expect, test } from '@playwright/test';
import { features } from './mep-actions.spec.js';
import TextBlock from '../../blocks/text/text.page.js';
import MarqueeBlock from '../../blocks/marquee/marquee.page.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0: confirm the default page
test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const textBlock1 = new TextBlock(page, 1);
  const textBlock7 = new TextBlock(page, 7);
  const URL = `${baseURL}${features[0].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);
  await expect(textBlock1.headlineAlt).toHaveText('Base page text. Section 2');
  await expect(textBlock7.headlineAlt).toHaveText('Base page text fragment');
});

// Test 1: confirm various MEP actions on the personalized page
test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  const textBlock1 = new TextBlock(page, 1);
  const textBlock2 = new TextBlock(page, 2);
  const textBlock3 = new TextBlock(page, 3);
  const textBlock4 = new TextBlock(page, 4);
  const textBlock5 = new TextBlock(page, 5);
  const textBlock6 = new TextBlock(page, 6);
  const textBlock7 = new TextBlock(page, 7);
  const textBlock8 = new TextBlock(page, 8);
  const textBlock9 = new TextBlock(page, 9);
  const textBlock10 = new TextBlock(page, 10);
  const textBlock11 = new TextBlock(page, 11);
  const textBlock12 = new TextBlock(page, 12);
  const textBlock13 = new TextBlock(page, 13);
  const URL = `${baseURL}${features[1].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);
  await expect(textBlock1.headlineAlt).toHaveText('Inserted after the marquee');
  await expect(textBlock2.headlineAlt).toHaveText('Inserted before section2 text');
  await expect(textBlock3.headlineAlt).toHaveText('Base page text. Section 2');
  await expect(textBlock4.headlineAlt).toHaveText('Base page text. Section 3');
  await expect(textBlock5.headlineAlt).toHaveText('Appended to 3');
  await expect(textBlock6.headlineAlt).toHaveText('Prepended to 4');
  await expect(textBlock7.headlineAlt).toHaveText('Base page text. Section 4');
  await expect(textBlock8.headlineAlt).not.toBeVisible();
  await expect(textBlock9.headlineAlt).toHaveText('Section 6 replacement');
  await expect(textBlock10.headlineAlt).toHaveText('Base page text. Section 7');
  await expect(textBlock11.headlineAlt).toHaveText('Replaced basepage fragment');
  await expect(textBlock12.headlineAlt).toHaveText('Inserted after basepage fragment');
  await expect(textBlock13.headlineAlt).toHaveText('Inserted after replaced fragment');
});

// Test 2: confirm insertScript (make text orange)
test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
  const textBlock0 = new TextBlock(page, 0);
  const URL = `${baseURL}${features[2].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);
  await expect(textBlock0.introHeadlineAlt).toHaveCSS('color', 'rgb(255, 165, 0)');
});

// Test 3: update metadata
test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
  const metaLoc = 'meta[name="viewport"]';
  const URL = `${baseURL}${features[3].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);
  await expect(page.locator(metaLoc)).toHaveAttribute('content', 'this is test content');
});

// Test 4: verify useBlockCode
test(`[Test Id - ${features[4].tcid}] ${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
  const pznURL = `${baseURL}${features[4].path}${miloLibs}`;
  const defaultURL = `${baseURL}${features[4].data.defaultURL}${miloLibs}`;
  const marquee = new MarqueeBlock(page);

  await test.step('step-1: verify the default', async () => {
    console.info(`[Test Page]: ${defaultURL}`);
    await page.goto(defaultURL);
    await expect(marquee.marquee).toBeVisible();
    await expect(page.getByText('Marquee code was replaced MEP and the content was overwritten.')).toHaveCount(0);
  });
  await test.step('step-2: Verify useBlockCode', async () => {
    console.info(`[Test Page]: ${pznURL}`);
    await page.goto(pznURL);
    await expect(page.getByText('Marquee code was replaced MEP and the content was overwritten.')).toHaveCount(1);
    await expect(page.getByText('Marquee code was replaced MEP and the content was overwritten.')).toHaveCSS('color', 'rgb(128, 0, 128)'); // purple
  });
});
