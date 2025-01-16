import { expect, test } from '@playwright/test';
import { features } from './tabs.spec.js';
import TabBlock from './tabs.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let tab;

const miloLibs = process.env.MILO_LIBS || '';
const INTERVALS = Array(5).fill(1000);

test.describe('Milo Tab block feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    tab = new TabBlock(page);
  });

  // Test 0 : Tabs (xl-spacing)
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Tabs block feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify tabs content/specs', async () => {
      await expect(await tab.xlTab).toBeVisible();
      await expect(await tab.tabsCount).toHaveCount(data.tabsCount);
      // verify default tab contents
      await expect(await tab.tab2).toHaveAttribute('aria-selected', 'true');
      await expect(await tab.tab2Panel).toBeVisible();
      await expect(await tab.tab2Panel).toContainText(data.tab2Text);

      // click tabs and verify contents
      await expect(await tab.tab1).toHaveAttribute('aria-selected', 'false');
      await tab.tab1.click();
      await expect(await tab.tab1Panel).toBeVisible();
      await expect(await tab.tab1Panel).toContainText(data.tab1Text);

      await expect(await tab.tab3).toHaveAttribute('aria-selected', 'false');
      await tab.tab3.click();
      await expect(await tab.tab3Panel).toBeVisible();
      await expect(await tab.tab3Panel).toContainText(data.tab3Text);
    });

    await test.step('step-3: Verify the accessibility test on the Tabs (xl-spacing) block', async () => {
      await runAccessibilityTest({ page, testScope: tab.xlTab });
    });
  });

  // Test 1 : Tabs (Quiet, Dark, Center)
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Tabs block feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify tabs content/specs', async () => {
      await expect(await tab.queitDarkTab).toBeVisible();
      await expect(await tab.tabsCount).toHaveCount(data.tabsCount);
      // verify default tab contents
      await expect(await tab.tab2).toHaveAttribute('aria-selected', 'true');
      await expect(await tab.tab2Panel).toBeVisible();
      await expect(await tab.tab2Panel).toContainText(data.tab2Text);

      // click tabs and verify contents
      await expect(await tab.tab1).toHaveAttribute('aria-selected', 'false');
      await tab.tab1.click();
      await expect(await tab.tab1Panel).toBeVisible();
      await expect(await tab.tab1Panel).toContainText(data.tab1Text);

      await expect(await tab.tab3).toHaveAttribute('aria-selected', 'false');
      await tab.tab3.click();
      await expect(await tab.tab3Panel).toBeVisible();
      await expect(await tab.tab3Panel).toContainText(data.tab3Text);
    });

    await test.step('step-3: Verify the accessibility test on the Tabs (Quiet, Dark, Center) block', async () => {
      await runAccessibilityTest({ page, testScope: tab.queitDarkTab });
    });
  });

  // Test 2 : Tabs (Tabs scrolling)
  test(`[Test Id - ${features[0].tcid}] ${features[2].tags}`, async ({ page, baseURL, isMobile }) => {
    console.log(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
    await page.waitForLoadState('networkidle');

    await test.step('checking the setup', async () => {
      await expect(tab.tab1).toBeVisible();
      await expect(tab.tab1Panel).toBeVisible();
      await expect(tab.tab9).toBeVisible();
      await expect(tab.tab9Panel).not.toBeVisible();
      await expect(tab.tab1).toBeInViewport();
      await expect(tab.tab9).not.toBeInViewport();
      await expect(await tab.tab1.getAttribute('aria-selected')).toBe('true');
      await expect(await tab.tab9.getAttribute('aria-selected')).toBe('false');
    });

    await test.step('select the right tab arrow to get to the last tab', async () => {
      if (isMobile) {
        await expect(async () => {
          await tab.rightArrow.click();
          await expect(tab.tab9).toBeInViewport({ timeout: 1000 });
          await expect(tab.leftArrow).toBeVisible({ timeout: 1000 });
        }).toPass({ intervals: INTERVALS });
      } else {
        await tab.rightArrow.click();
        await expect(tab.tab9).toBeInViewport();
        await expect(tab.leftArrow).toBeVisible();
      }
      await tab.tab9.click();

      await expect(await tab.tab1.getAttribute('aria-selected')).toBe('false');
      await expect(await tab.tab9.getAttribute('aria-selected')).toBe('true');
      await expect(tab.tab1).not.toBeInViewport();
      await expect(tab.tab9).toBeInViewport();
      await expect(tab.tab1Panel).not.toBeVisible();
      await expect(tab.tab9Panel).toBeVisible();
    });

    await test.step('select the left tab arrow to get back to the first tab', async () => {
      if (isMobile) {
        await expect(async () => {
          await tab.leftArrow.click();
          await expect(tab.tab1).toBeInViewport({ timeout: 1000 });
          await expect(tab.rightArrow).toBeVisible({ timeout: 1000 });
        }).toPass({ intervals: INTERVALS });
      } else {
        await tab.leftArrow.click();
        await expect(tab.tab1).toBeInViewport();
        await expect(tab.rightArrow).toBeVisible();
      }

      await tab.tab1.click();

      await expect(await tab.tab1.getAttribute('aria-selected')).toBe('true');
      await expect(await tab.tab9.getAttribute('aria-selected')).toBe('false');
      await expect(tab.tab1).toBeInViewport();
      await expect(tab.tab9).not.toBeInViewport();
      await expect(tab.tab1Panel).toBeVisible();
      await expect(tab.tab9Panel).not.toBeVisible();
    });
  });
});
