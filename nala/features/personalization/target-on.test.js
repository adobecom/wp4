// to run the test: npm run nala stage target-on.test.js

// Note: this test deliberately skips checking for the global metadata spreadsheet because one does not exist in the milo repository

import { expect, test } from '@playwright/test';
import { features } from './target-on.spec.js';
import MarqueeBlock from '../../blocks/marquee/marquee.page.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0: check for running Target tests
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const defaultURL = `${baseURL}${features[0].data.defaultURL}${miloLibs}`;
  const metadataURL = `${baseURL}${features[0].data.metadataURL}${miloLibs}`;
  const parameterURL = `${baseURL}${features[0].data.parameterURL}${miloLibs}`;
  const marquee = new MarqueeBlock(page);

  await test.step('step-1: verify default test page', async () => {
    console.info(`[Test Page]: ${defaultURL}`);
    await page.goto(defaultURL);
    await expect(marquee.headingXL).toHaveText('Heading XL Marquee standard medium left');
  });

  await test.step('step-2: verify metadata test page', async () => {
    console.info(`[Test Page]: ${metadataURL}`);
    await page.goto(metadataURL);
    await expect(marquee.headingXL).toHaveText('Target is running');
  });

  await test.step('step-3: verify parameter test page', async () => {
    console.info(`[Test Page]: ${parameterURL}`);
    await page.goto(parameterURL);
    await expect(marquee.headingXL).toHaveText('Target is running');
  });
});
