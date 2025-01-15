import { expect, test } from '@playwright/test';
import { features } from './nested-placeholders.spec.js';
import MarqueeBlock from '../../blocks/marquee/marquee.page.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0 : check ul selectors (skipping ol selectors)
test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const pznUrl = `${baseURL}${features[0].path}${miloLibs}`;
  const defaultUrl = `${baseURL}${features[0].data.defaultURL}${miloLibs}`;
  const marquee = new MarqueeBlock(page);

  await test.step('step-1: verify the default page text', async () => {
    console.info(`[Test Page]: ${defaultUrl}`);
    await page.goto(defaultUrl);
    await expect(marquee.headingXL).toHaveText('Heading XL Marquee standard medium left');
    await expect(marquee.bodyM).toContainText('Body M Lorem ipsum ');
  });

  await test.step('step-2: Verify appropriate placeholder text on the personalized page', async () => {
    console.info(`[Test Page]: ${pznUrl}`);
    await page.goto(pznUrl);
    await expect(marquee.headingXL).toHaveText('Buy now and save 50% off CC All Apps.');
    await expect(marquee.bodyM).toContainText('For just US$49.99');
  });
});
