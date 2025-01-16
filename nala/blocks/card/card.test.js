import { expect, test } from '@playwright/test';
import { features } from './card.spec.js';
import ConsonantCard from './card.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let card;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Consonant card feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    card = new ConsonantCard(page);
  });

  // Test 0 : Card
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Consonant Card feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Card content/specs', async () => {
      await expect(await card.oneHalfCard).toBeVisible();
      await expect(await card.oneHalfCardImage).toBeVisible();

      await expect(await card.oneHalfCardTitleH3).toContainText(data.titleH3);
      await expect(await card.oneHalfCardText).toContainText(data.text);

      await expect(await card.footer).toBeVisible();
      await expect(await card.footerOutlineButton).toBeVisible();
      await expect(await card.footerOutlineButton).toContainText(data.footerOutlineButtonText);

      await expect(await card.footerBlueButton).toBeVisible();
      await expect(await card.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-3: Verify the accessibility test on the Card block', async () => {
      await runAccessibilityTest({ page, testScope: card.oneHalfCard });
    });
  });

  // Test 1 : Card (half-card, border)
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Consonant Card feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Half Card with Boarder content/specs', async () => {
      await expect(await card.oneHalfCard).toBeVisible();

      expect(await card.oneHalfCard.getAttribute('class')).toContain('border');

      await expect(await card.oneHalfCardImage).toBeVisible();
      await expect(await card.oneHalfCardTitleH3).toContainText(data.titleH3);
      await expect(await card.oneHalfCardText).toContainText(data.text);

      await expect(await card.footer).toBeVisible();
      await expect(await card.footerOutlineButton).toBeVisible();
      await expect(await card.footerOutlineButton).toContainText(data.footerOutlineButtonText);

      await expect(await card.footerBlueButton).toBeVisible();
      await expect(await card.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-3: Verify the accessibility test on the Card (half-card, border) block', async () => {
      await runAccessibilityTest({ page, testScope: card.oneHalfCard });
    });
  });

  // Test 2 : card (double-width-card, border)
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-2: Go to Consonant Card feature test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify card (double-width-card, border) content/specs', async () => {
      await expect(await card.doubleWidthCard).toBeVisible();

      expect(await card.doubleWidthCard.getAttribute('class')).toContain('border');

      await expect(await card.doubleWidthCardImage).toBeVisible();
      await expect(await card.doubleWidthCardTitleH3).toContainText(data.titleH3);
      await expect(await card.doubleWidthCardText).toContainText(data.text);
    });
  });

  // Test 3 : Card (product-card, border)
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-2: Go to Consonant Card feature test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Card (product-card, border) content/specs', async () => {
      await expect(await card.productCard).toBeVisible();

      expect(await card.productCard.getAttribute('class')).toContain('border');

      await expect(await card.productCardTitleH3).toContainText(data.titleH3);
      await expect(await card.productCardText).toContainText(data.text);

      await expect(await card.footer).toBeVisible();
      await expect(await card.footerOutlineButton).toBeVisible();
      await expect(await card.footerOutlineButton).toContainText(data.footerOutlineButtonText);

      await expect(await card.footerBlueButton).toBeVisible();
      await expect(await card.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-3: Verify the accessibility test on the Card (product-card, border) block', async () => {
      await runAccessibilityTest({ page, testScope: card.productCard });
    });
  });

  // Test 4 : Card (half-height-card, border)
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-2: Go to Consonant Card feature test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Card (half-height-card, border) content/specs', async () => {
      await expect(await card.halfHeightCard).toBeVisible();

      expect(await card.halfHeightCard.getAttribute('class')).toContain('border');

      await expect(await card.halfHeightCardImage).toBeVisible();
      await expect(await card.halfHeightCardLink).toBeVisible();

      await expect(await card.halfHeightCardTitleH3).toContainText(data.titleH3);
    });

    await test.step('step-3: Verify the accessibility test on the Card (half-height-card, border) block', async () => {
      await runAccessibilityTest({ page, testScope: card.halfHeightCard });
    });
  });

  // Test 5 : Card-horizontal
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const { data } = features[5];

    await test.step('step-2: Go to Consonant Card feature test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Card-horizontal content/specs', async () => {
      await expect(await card.horizontalCard).toBeVisible();
      await expect(await card.horizontalCardImage).toBeVisible();

      expect(await card.horizontalCardImg.getAttribute('width')).toContain(data.imgWidth);
      expect(await card.horizontalCardImg.getAttribute('height')).toContain(data.imgHeight);

      await expect(await card.horizontalCardBodyXS).toContainText(data.bodyXS);
      await expect(await card.horizontalCardHeadingXS).toContainText(data.headingXS);
      await expect(await card.horizontalCardHeadingXSLink).toContainText(data.headingXS);
    });

    await test.step('step-3: Verify the accessibility test on the Card-horizontal block', async () => {
      await runAccessibilityTest({ page, testScope: card.horizontalCard });
    });
  });

  // Test 6 : Card-horizontal (tile)
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const { data } = features[6];

    await test.step('step-2: Go to Consonant Card feature test page', async () => {
      await page.goto(`${baseURL}${features[6].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Card-horizontal (tile) content/specs', async () => {
      await expect(await card.horizontalCard).toBeVisible();
      expect(await card.horizontalCard.getAttribute('class')).toContain('tile');

      await expect(await card.horizontalCardImage).toBeVisible();

      expect(await card.horizontalCardImg.getAttribute('width')).toContain(data.imgWidth);
      expect(await card.horizontalCardImg.getAttribute('height')).toContain(data.imgHeight);

      await expect(await card.horizontalCardBodyXS).toContainText(data.bodyXS);
      await expect(await card.horizontalCardHeadingXS).toContainText(data.headingXS);
      await expect(await card.horizontalCardHeadingXSLink).toContainText(data.headingXS);
    });

    await test.step('step-3: Verify the accessibility test on the Card-horizontal (tile) block', async () => {
      await runAccessibilityTest({ page, testScope: card.horizontalCard });
    });
  });
});
