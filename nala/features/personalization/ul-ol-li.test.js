import { expect, test } from '@playwright/test';
import { features } from './ul-ol-li.spec.js';

const miloLibs = process.env.MILO_LIBS || '';

// Test 0 : check ul selectors (skipping ol selectors)
test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
  const pznUrl = `${baseURL}${features[0].path}${miloLibs}`;
  const defaultUrl = `${baseURL}${features[0].data.defaultURL}${miloLibs}`;
  const pznUpdateLocator = '[data-manifest-id="ul-selector.json"]';
  const defaultUlLocator = 'ul.icon-list';

  await test.step('step-1: verify the default test page has a regular ul list with 3 bullets', async () => {
    console.info(`[Test Page]: ${defaultUrl}`);
    await page.goto(defaultUrl);
    await expect(page.locator(pznUpdateLocator)).toHaveCount(0);
    await expect(page.locator(defaultUlLocator)).toHaveCount(1);
    const element = page.locator(defaultUlLocator);
    await expect(element.locator('li')).toHaveCount(3);
  });

  await test.step('step-2: Verify personalized page has a text replacement for the ul list', async () => {
    console.info(`[Test Page]: ${pznUrl}`);
    await page.goto(pznUrl);
    const element = page.locator(pznUpdateLocator);
    const innerHtml = await element.innerHTML();
    await expect(page.locator(pznUpdateLocator)).toHaveCount(1);
    await expect(page.locator(defaultUlLocator)).toHaveCount(0);
    await expect(innerHtml).toEqual('replacement for the ul');
  });
});

// Test 1 : check li selectors
test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
  const pznUrl = `${baseURL}${features[1].path}${miloLibs}`;
  const defaultUrl = `${baseURL}${features[1].data.defaultURL}${miloLibs}`;
  const pznUpdateLocator = 'li[data-manifest-id="li-selectors.json"]';
  const defaultUlLocator = 'ul.icon-list';

  await test.step('step-1: verify the default test page has a regular ul list with 3 bullets', async () => {
    console.info(`[Test Page]: ${defaultUrl}`);
    await page.goto(defaultUrl);
    await expect(page.locator(pznUpdateLocator)).toHaveCount(0);
    await expect(page.locator(defaultUlLocator)).toHaveCount(1);
    const element = page.locator(defaultUlLocator);
    await expect(element.locator('li')).toHaveCount(3);
  });

  await test.step('step-2: Verify that the personalized page has 3 replacements for the line items', async () => {
    console.info(`[Test Page]: ${pznUrl}`);
    await page.goto(pznUrl);
    const element = page.locator(pznUpdateLocator).first();
    const innerHtml = await element.innerHTML();
    await expect(page.locator(pznUpdateLocator)).toHaveCount(3);
    await expect(innerHtml).toEqual('replace all line items');
  });
});
