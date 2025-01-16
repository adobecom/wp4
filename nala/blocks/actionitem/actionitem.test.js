import { expect, test } from '@playwright/test';
import { features } from './actionitem.spec.js';
import ActionItem from './actionitem.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let actionItem;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Action-Item block test suite', () => {
  test.beforeEach(async ({ page }) => {
    actionItem = new ActionItem(page);
  });

  // Test 0 : Action-Item (Small)
  test(`0: @Action-item (small), ${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.small).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('min-height', data.imgMinHeight);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });

    await test.step('step-3: Verify the accessibility test on the Action-Item (Small) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.small });
    });
  });

  // Test 1 : Action-Item (Medium)
  test(`1: @Action-item (medium), ${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.medium).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('min-height', data.imgMinHeight);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });

    await test.step('step-3: Verify the accessibility test on the Action-Item (Medium) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.medium });
    });
  });

  // Test 2 : Action-Item (Large)
  test(`2: @Action-item (large), ${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.large).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('min-height', data.imgMinHeight);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });

    await test.step('step-3: Verify the accessibility test on the Action-Item (Large) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.large });
    });
  });

  // Test 3 : Action-Item (Center)
  test(`3: @Action-item (center), ${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.center).toBeVisible();
      await expect(await actionItem.image).toBeVisible();

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });

    await test.step('step-3: Verify the accessibility test on the Action-Item (Center) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.center });
    });
  });

  // Test 4 : Action-Item (Rounded)
  test(`4: @Action-item (rounded), ${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.rounded).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.image).toHaveCSS('border-radius', data.borderRadius);

      await expect(await actionItem.bodyTextLink).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });

    await test.step('step-3: Verify the accessibility test on the Action-Item (Rounded) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.rounded });
    });
  });

  // Test 5 : Action-Item (Float Button)
  test(`5: @Action-item (float-button), ${features[5].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[5].path}${miloLibs}`;
    console.info(`[Test Page]: ${testPage}`);
    const { data } = features[5];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.actionItemFloat).toBeVisible();
      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.floatOutlineButton).toBeVisible();
      await expect(await actionItem.floatOutlineButton).toContainText(data.floatButtonText);
    });

    await test.step('step-4: Verify the accessibility test on the Action-Item (Float Button) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.actionItemFloat });
    });
    await test.step('step-3: Click the float button', async () => {
      await actionItem.floatButton.click();
      expect(await page.url()).not.toBe(testPage);
    });
  });

  // Test 6 : Action-Item (scroller)
  test(`6: @Action-item (scroller), ${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const { data } = features[6];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[6].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.actionScroller).toBeVisible();
      await expect(await actionItem.scroller).toBeVisible();
      await expect(await actionItem.scrollerActionItems).toHaveCount(data.actionItemsCount);

      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);
    });

    await test.step('step-3: Verify the accessibility test on the Action-Item (scroller) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.actionScroller });
    });
  });

  // Test 7 : Action-Item (scroller)
  test(`7: @Action-item (scroller with navigation), ${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);
    const { data } = features[7];

    await test.step('step-1: Go to Action item block test page', async () => {
      await page.goto(`${baseURL}${features[7].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Action item content/specs', async () => {
      await expect(await actionItem.actionScroller).toBeVisible();
      await expect(await actionItem.scroller).toBeVisible();
      await expect(await actionItem.scrollerActionItems).toHaveCount(data.actionItemsCount);

      await expect(await actionItem.image).toBeVisible();
      await expect(await actionItem.bodyText).toContainText(data.bodyText);

      await expect(await actionItem.nextButton).toBeVisible({ timeout: 1000 });
      await actionItem.nextButton.click();
      await expect(await actionItem.previousButton).toBeVisible({ timeout: 1000 });
      await expect(await actionItem.navigationNext).toHaveAttribute('hide-btn', 'false');
    });

    await test.step('step-3: Verify the accessibility test on the Action-Item (scroller) block', async () => {
      await runAccessibilityTest({ page, testScope: actionItem.actionScroller });
    });
  });
});
