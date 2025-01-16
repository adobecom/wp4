import { expect, test } from '@playwright/test';
import { features } from './icon.spec.js';
import IconBlock from './icon.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let icon;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Icon Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    icon = new IconBlock(page);
  });

  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);

    await test.step('step-1: Go to Icon block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Icon block content/specs', async () => {
      const { data } = features[0];
      expect(await icon.verifyIcon('icon block (fullwidth, medium)', data)).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Icon block block', async () => {
      await runAccessibilityTest({ page, testScope: icon.icon });
    });
  });

  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);

    await test.step('step-1: Go to Icon block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Icon block content/specs', async () => {
      const { data } = features[1];
      expect(await icon.verifyIcon('icon block (fullwidth, medium, intro)', data)).toBeTruthy();
    });
  });

  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);

    await test.step('step-1: Go to Icon block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Icon block content/specs', async () => {
      const { data } = features[2];
      expect(await icon.verifyIcon('icon block (fullwidth, large)', data)).toBeTruthy();
    });
  });
});
