// resolves PR 2976 https://github.com/adobecom/milo/pull/2976
// command to run: npm run nala stage all-elements.test.js

import { expect, test } from '@playwright/test';
import { features } from './all-elements.spec.js';
import TextBlock from '../../blocks/text/text.page.js';

let pznUrl;
let defaultUrl;

const miloLibs = process.env.MILO_LIBS || '';

// Test 0 : insertBefore and insertAfter should work with fragment selectors
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  pznUrl = `${baseURL}${features[0].path}${miloLibs}`;
  defaultUrl = `${baseURL}${features[0].data.defaultURL}${miloLibs}`;
  const linkToAdobe = page.locator('a[href="https://www.adobe.com/"]');
  const linkToAcrobat = page.locator('a[href="https://acrobat.adobe.com/"]');
  const insertionBeforeRegularFragment = page.locator("[data-manifest-id='all-elements.json'] + div:has([data-path*='repeated-fragment'])");
  const insertionAfterRegularFragment = page.locator("div div:has([data-path*='repeat-fragment']) + [data-manifest-id='all-elements.json']");

  await test.step('step-1: Verify default test page', async () => {
    console.info(`[Test Page]: ${defaultUrl}`);
    await page.goto(defaultUrl);
    await expect(linkToAdobe).toHaveCount(0);
    await expect(linkToAcrobat).toHaveCount(0);
  });

  await test.step('step-2: Verify insertAfter and insertBefore with fragments', async () => {
    console.info(`[Test Page]: ${pznUrl}`);
    await page.goto(pznUrl);
    await expect(linkToAdobe).toHaveCount(6);
    await expect(linkToAcrobat).toHaveCount(2);
    await expect(insertionBeforeRegularFragment).toHaveCount(3);
    await expect(insertionAfterRegularFragment).toHaveCount(3);
  });
});

// Test 1 : #_all flag should change all matching elements
test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  pznUrl = `${baseURL}${features[1].path}${miloLibs}`;
  defaultUrl = `${baseURL}${features[1].data.defaultURL}${miloLibs}`;
  const textBlock0 = new TextBlock(page, 0);
  const textBlock1 = new TextBlock(page, 1);
  const textBlock2 = new TextBlock(page, 2);

  await test.step('step-1: Verify default test page', async () => {
    console.info(`[Test Page]: ${defaultUrl}`);
    await page.goto(defaultUrl);
    await expect(textBlock0.introHeadlineAlt).toHaveText('Text (intro)');
    await expect(textBlock1.introHeadlineAlt).toHaveText('Text (intro)');
    await expect(textBlock2.introHeadlineAlt).toHaveText('Text (intro)');
  });

  await test.step('step-2: Verify the new heading in the personalized page', async () => {
    console.info(`[Test Page]: ${pznUrl}`);
    await page.goto(pznUrl);
    await expect(textBlock0.introHeadlineAlt).toHaveText('THIS IS A NEW HEADING');
    await expect(textBlock1.introHeadlineAlt).toHaveText('THIS IS A NEW HEADING');
    await expect(textBlock2.introHeadlineAlt).toHaveText('THIS IS A NEW HEADING');
  });
});

// Test 2 : #_include-fragments should search within fragments
test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
  pznUrl = `${baseURL}${features[2].path}${miloLibs}`;
  defaultUrl = `${baseURL}${features[2].data.defaultURL}${miloLibs}`;
  const textBlock0 = new TextBlock(page, 0);
  const textBlock1 = new TextBlock(page, 1);
  const textBlock2 = new TextBlock(page, 2);

  await test.step('step-1: Verify default test page', async () => {
    console.info(`[Test Page]: ${defaultUrl}`);
    await page.goto(defaultUrl);
    await expect(textBlock0.introHeadlineAlt).toHaveText('This is an inline fragment!');
    await expect(textBlock1.introHeadlineAlt).toHaveText('This is an ordinary fragment');
    await expect(textBlock2.introHeadlineAlt).toHaveText('This is an ordinary fragment');
  });

  await test.step('step-2: Verify the new heading in the personalized page', async () => {
    console.info(`[Test Page]: ${pznUrl}`);
    await page.goto(pznUrl);
    await expect(textBlock0.introHeadlineAlt).toHaveText('NEW HEADING!');
    await expect(textBlock1.introHeadlineAlt).toHaveText('NEW HEADING!');
    await expect(textBlock2.introHeadlineAlt).toHaveText('NEW HEADING!');
  });
});
