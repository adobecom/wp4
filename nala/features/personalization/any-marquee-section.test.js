// to run the test: npm run nala stage any-marquee-section.test.js

import { expect, test } from '@playwright/test';
import { features } from './any-marquee-section.spec.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0: verify the selector "any-marquee-section"
test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const defaultURL = `${baseURL}${features[0].data.defaultURL}${miloLibs}`;
  const pznURL = `${baseURL}${features[0].path}${miloLibs}`;
  const PZNUpdateLocator = '[data-manifest-id="any-marquee-section.json"]';
  const marqueeLocator = '.marquee';
  const heroMarqueeLocator = '.hero-marquee';

  await test.step('step-1: verify default test page', async () => {
    console.info(`[Test Page]: ${defaultURL}`);
    await page.goto(defaultURL);
    await expect(page.locator(PZNUpdateLocator)).toHaveCount(0);
    await expect(page.locator(marqueeLocator)).toHaveCount(18);
    await expect(page.locator(heroMarqueeLocator)).toHaveCount(3);
  });

  await test.step('step-2: verify personalized page substitutions', async () => {
    console.info(`[Test Page]: ${pznURL}`);
    await page.goto(pznURL);
    await expect(page.locator(PZNUpdateLocator)).toHaveCount(21);
    await expect(page.locator(marqueeLocator)).toHaveCount(0);
    await expect(page.locator(heroMarqueeLocator)).toHaveCount(0);
  });
});
