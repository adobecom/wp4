// to run the test: npm run nala stage target-on.test.js
// Note: this test deliberately skips checking for the global metadata spreadsheet because one does not exist in the milo repository

import { expect, test } from '@playwright/test';
import { features } from './target-on.spec.js';
import MarqueeBlock from '../../blocks/marquee/marquee.page.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0: check the default page
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const defaultURL = `${baseURL}${features[0].path}${miloLibs}`;
  const marquee = new MarqueeBlock(page);
  console.info(`[Test Page]: ${defaultURL}`);
  await page.goto(defaultURL);
  await expect(marquee.headingXL).toHaveText('Heading XL Marquee standard medium left');
});

// Test 1: check for Target enablement via page metadata
test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  const metadataURL = `${baseURL}${features[1].path}${miloLibs}`;
  const marquee = new MarqueeBlock(page);
  console.info(`[Test Page]: ${metadataURL}`);
  await page.goto(metadataURL);
  await expect(marquee.headingXL).toHaveText('Target is running');
});

// Test 2: check for Target enablement via URL parameter
test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
  const parameterURL = `${baseURL}${features[2].path}${miloLibs}`;
  const marquee = new MarqueeBlock(page);
  console.info(`[Test Page]: ${parameterURL}`);
  await page.goto(parameterURL);
  await expect(marquee.headingXL).toHaveText('Target is running');
});
