// to run tests:
// npm run nala stage fragment-autoload.test.js

import { expect, test } from '@playwright/test';
import { features } from './fragment-autoload.spec.js';
import TextBlock from '../../blocks/text/text.page.js';
import MarqueeBlock from '../../blocks/marquee/marquee.page.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0: confirm the US personalized page
test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const marquee = new MarqueeBlock(page);
  const text = new TextBlock(page, 1);
  const URL = `${baseURL}${features[0].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);
  await expect(marquee.headingXL).toHaveText('US frag');
  await expect(text.headlineAlt).toHaveText('Replacement text for US and French page');
});

// Test 1: confirm the FR personalized page
test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  const marquee = new MarqueeBlock(page);
  const text = new TextBlock(page, 1);
  const URL = `${baseURL}${features[1].path}${miloLibs}`;
  console.info(`[Test Page]: ${URL}`);
  await page.goto(URL);
  await expect(marquee.headingXL).toHaveText('FR fragment');
  await expect(text.headlineAlt).toHaveText('Replacement text for US and French page');
});
