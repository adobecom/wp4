import { expect, test } from '@playwright/test';
import { features } from './merchcard.spec.js';
import MerchCard from './merchcard.pages.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let merchCard;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Merchcard block test suite', () => {
  test.beforeEach(async ({ page, browserName }) => {
    merchCard = new MerchCard(page);
    if (browserName === 'chromium') {
      await page.setExtraHTTPHeaders({ 'sec-ch-ua': '"Chromium";v="123", "Not:A-Brand";v="8"' });
    }
  });

  // Test 0 : Merch Card (Segment)
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify Merch Card content/specs', async () => {
      await expect(await merchCard.segment).toBeVisible();
      await expect(await merchCard.segmentTitle).toContainText(data.title);
      // await expect(await merchCard.price).toContainText(data.price);
      // await expect(await merchCard.strikethroughPrice).toContainText(data.strikethroughPrice);

      await expect(await merchCard.segmentDescription1).toContainText(data.description);
      await expect(await merchCard.linkText1).toContainText(data.link1Text);
      await expect(await merchCard.linkText2).toContainText(data.link2Text);
      await expect(await merchCard.footer).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toContainText(data.footerOutlineButtonText);
      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-4: Verify the accessibility test on the Merch Card (Segment) block', async () => {
      await runAccessibilityTest({ page, testScope: merchCard.segment });
    });
  });

  // Test 1 : Merch Card (Segment) with Badge
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card with Badge content/specs', async () => {
      await expect(await merchCard.segment).toBeVisible();
      await expect(await merchCard.segmentTitle).toContainText(data.title);

      await expect(await merchCard.segmentRibbon).toBeVisible();
      await expect(await merchCard.segmentRibbon).toContainText(data.badgeText);

      // await expect(await merchCard.price).toContainText(data.price);
      // await expect(await merchCard.strikethroughPrice).toContainText(data.strikethroughPrice);

      await expect(await merchCard.segmentDescription1).toContainText(data.description);
      await expect(await merchCard.linkText1).toContainText(data.link1Text);
      await expect(await merchCard.linkText2).toContainText(data.link2Text);

      await expect(await merchCard.footer).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toContainText(data.footerOutlineButtonText);

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-3: Verify Merch Card attributes', async () => {
      await expect(await merchCard.segmentRibbon).toHaveAttribute('style', merchCard.attributes.segmentRibbon.style);
    });

    await test.step('step-4: Verify the accessibility test on the Merch Card (Segment) with Badge block', async () => {
      await runAccessibilityTest({ page, testScope: merchCard.segment });
    });
  });

  // Test 2 : Merch Card (Special Offers)
  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card special offers content/specs', async () => {
      await expect(await merchCard.specialOffers).toBeVisible();
      await expect(await merchCard.specialOffersImage).toBeVisible();

      await expect(await merchCard.specialOffersDetailM).toBeVisible();
      await expect(await merchCard.specialOffersDetailM).toContainText(data.titleH4);
      await expect(await merchCard.specialOffersTitleHeading).toContainText(data.titleH3);

      await expect(await merchCard.specialOffersDescription1).toContainText(data.description1);
      await expect(await merchCard.specialOffersDescription2).toContainText(data.description2);

      await expect(await merchCard.footer).toBeVisible();
      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-4: Verify the accessibility test on the Merch Card (Special Offers) block', async () => {
      await runAccessibilityTest({ page, testScope: merchCard.specialOffers });
    });
  });

  // Test 3 : Merch Card (Special Offers) with badge
  test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card special offers content/specs', async () => {
      await expect(await merchCard.specialOffers).toBeVisible();
      await expect(await merchCard.specialOffersImage).toBeVisible();

      await expect(await merchCard.specialOffersRibbon).toBeVisible();
      await expect(await merchCard.specialOffersRibbon).toContainText(data.badgeText);

      await expect(await merchCard.specialOffersTitleHeading).toContainText(data.titleH3);
      await expect(await merchCard.specialOffersDetailM).toContainText(data.titleH4);

      await expect(await merchCard.specialOffersDescription1).toContainText(data.description);
      await expect(await merchCard.seeTermsTextLink).toContainText(data.link1Text);

      await expect(await merchCard.footer).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toContainText(data.footerOutlineButtonText);

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-3: Verify Merch Card attributes', async () => {
      await expect(await merchCard.specialOffersRibbon).toHaveAttribute(
        'style',
        merchCard.attributes.specialOfferRibbon.style,
      );
    });
  });

  // Test 4 : Merch Card (plans)
  test(`[Test Id - ${features[4].tcid}] ${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card special offers content/specs', async () => {
      await expect(await merchCard.plans).toBeVisible();
      await expect(await merchCard.productIcon).toBeVisible();

      await expect(await merchCard.plansCardTitleHeadingXS).toContainText(data.titleH3);
      await expect(await merchCard.plansCardTitleBodyXXS).toContainText(data.titleH5);

      // await expect(await merchCard.price).toContainText(data.price);
      await expect(await merchCard.plansCardDescription1).toContainText(data.description);
      await expect(await merchCard.seePlansTextLink).toContainText(data.link1Text);

      await expect(await merchCard.footer).toBeVisible();

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButtonText);
    });
  });

  // Test 5 : Merch Card (plans) with badge
  test(`[Test Id - ${features[5].tcid}] ${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const { data } = features[5];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card special offers content/specs', async () => {
      await expect(await merchCard.plans).toBeVisible();
      await expect(await merchCard.productIcon).toBeVisible();

      await expect(await merchCard.plansRibbon).toBeVisible();
      await expect(await merchCard.plansRibbon).toContainText(data.badgeText);

      await expect(await merchCard.plansCardTitleHeadingXS).toContainText(data.titleH3);
      await expect(await merchCard.plansCardTitleBodyXXS).toContainText(data.titleH4);

      // await expect(await merchCard.price).toContainText(data.price);
      await expect(await merchCard.plansCardDescription2).toContainText(data.description);
      await expect(await merchCard.seePlansTextLink).toContainText(data.link1Text);

      await expect(await merchCard.footer).toBeVisible();

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButtonText);
    });

    await test.step('step-4: Verify the accessibility test on the Merch Card (plans) with badge block', async () => {
      await runAccessibilityTest({ page, testScope: merchCard.plans });
    });
  });

  // Test 6 : Merch Card (plans) with secure
  test(`[Test Id - ${features[6].tcid}] ${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const { data } = features[6];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[6].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card special offers content/specs', async () => {
      await expect(await merchCard.plans).toBeVisible();
      await expect(await merchCard.productIcon).toBeVisible();

      await expect(await merchCard.plansCardTitleHeadingXS).toContainText(data.titleH3);
      await expect(await merchCard.plansCardTitleBodyXXS).toContainText(data.titleH5);

      // await expect(await merchCard.price).toContainText(data.price);
      await expect(await merchCard.plansCardDescription1).toContainText(data.description);
      await expect(await merchCard.seePlansTextLink).toContainText(data.link1Text);

      await expect(await merchCard.footer).toBeVisible();

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButton1Text);

      await expect(await merchCard.secureTransactionLabel).toContainText(data.secureLabel);
    });
  });

  // Test 7 : Merch Card (plans, secure) with badge
  test(`[Test Id - ${features[7].tcid}] ${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[7].path}${miloLibs}`);
    const { data } = features[7];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[7].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card special offers content/specs', async () => {
      await expect(await merchCard.plans).toBeVisible();
      await expect(await merchCard.productIcon).toBeVisible();

      await expect(await merchCard.plansRibbon).toBeVisible();
      await expect(await merchCard.plansRibbon).toContainText(data.badgeText);

      await expect(await merchCard.plansCardTitleHeadingXS).toContainText(data.titleH3);
      await expect(await merchCard.plansCardTitleBodyXXS).toContainText(data.titleH5);

      // await expect(await merchCard.price).toContainText(data.price);
      await expect(await merchCard.plansCardDescription1).toContainText(data.description);
      await expect(await merchCard.seePlansTextLink).toContainText(data.link1Text);

      await expect(await merchCard.footer).toBeVisible();
      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButton1Text);

      await expect(await merchCard.secureTransactionLabel).toContainText(data.secureLabel);
    });
  });

  // Test 8 : Merch Card (catalog)
  test(`[Test Id - ${features[8].tcid}] ${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[8].path}${miloLibs}`);
    const { data } = features[8];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[8].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card catalog content/specs', async () => {
      await expect(await merchCard.catalog).toBeVisible();
      await expect(await merchCard.catalogCardTitleHeadingXS).toContainText(data.titleH3);
      await expect(await merchCard.catalogCardTitleH4).toContainText(data.titleH4);

      // await expect(await merchCard.price).toContainText(data.price);

      await expect(await merchCard.catalogCardDescription2).toContainText(data.description);
      await expect(await merchCard.seeWhatsIncludedTextLink).toContainText(data.link1Text);
      await expect(await merchCard.learnMoreTextLink).toContainText(data.link2Text);

      await expect(await merchCard.footer).toBeVisible();

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButton1Text);

      await expect(await merchCard.footerOutlineButton).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toContainText(data.footerOutlineButtonText);
    });
  });

  // Test 9 : Merch Card (catalog) with badge
  test(`[Test Id - ${features[9].tcid}] ${features[9].name},${features[9].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[9].path}${miloLibs}`);
    const { data } = features[9];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[9].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card catalog with badge content/specs', async () => {
      await expect(await merchCard.catalog).toBeVisible();

      await expect(await merchCard.catalog).toHaveAttribute('badge-background-color', data.badgeBgColor);
      await expect(await merchCard.catalog).toHaveAttribute('badge-color', data.badgeColor);
      await expect(await merchCard.catalog).toHaveAttribute('badge-text', data.badgeText);

      await expect(await merchCard.catalogCardTitleHeadingXS).toContainText(data.titleH3);
      await expect(await merchCard.catalogCardTitleH4).toContainText(data.titleH4);

      // await expect(await merchCard.price).toContainText(data.price);

      await expect(await merchCard.catalogCardDescription2).toContainText(data.description);
      await expect(await merchCard.seeWhatsIncludedTextLink).toContainText(data.link1Text);
      await expect(await merchCard.learnMoreTextLink).toContainText(data.link2Text);

      await expect(await merchCard.footer).toBeVisible();

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButton1Text);

      await expect(await merchCard.footerOutlineButton).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toContainText(data.footerOutlineButtonText);
    });

    await test.step('step-4: Verify the accessibility test on the Merch Card (catalog) with badge block', async () => {
      await runAccessibilityTest({ page, testScope: merchCard.catalog });
    });
  });

  // Test 10 : Merch Card (catalog) with more info and badge
  test(`[Test Id - ${features[10].tcid}] ${features[10].name},${features[10].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[10].path}${miloLibs}`);
    const { data } = features[10];

    await test.step('step-1: Go to Merch Card feature test page', async () => {
      await page.goto(`${baseURL}${features[10].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[10].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Merch Card catalog with badge content/specs', async () => {
      await expect(await merchCard.catalog).toBeVisible();

      await expect(await merchCard.catalog).toHaveAttribute('badge-background-color', data.badgeBgColor);
      await expect(await merchCard.catalog).toHaveAttribute('badge-color', data.badgeColor);
      await expect(await merchCard.catalog).toHaveAttribute('badge-text', data.badgeText);

      await expect(await merchCard.catalogCardTitleHeadingXS).toContainText(data.titleH3);
      await expect(await merchCard.catalogCardTitleH4).toContainText(data.titleH4);

      // await expect(await merchCard.price).toContainText(data.price);

      await expect(await merchCard.catalogCardDescription2).toContainText(data.description);
      await expect(await merchCard.seeWhatsIncludedTextLink).toContainText(data.link1Text);
      await expect(await merchCard.learnMoreTextLink).toContainText(data.link2Text);

      await expect(await merchCard.footer).toBeVisible();

      await expect(await merchCard.footerBlueButton).toBeVisible();
      await expect(await merchCard.footerBlueButton).toContainText(data.footerBlueButton1Text);

      await expect(await merchCard.footerOutlineButton).toBeVisible();
      await expect(await merchCard.footerOutlineButton).toContainText(data.footerOutlineButtonText);
    });

    await test.step('step-3: click more info link and verify action menu list', async () => {
      await merchCard.catalog.hover();
      await merchCard.catalog.click();
      await page.waitForTimeout(1000);

      await expect(await merchCard.catalogActionMenuList).toHaveCount(data.actionMenuListCount);
      await expect(await merchCard.catalogActionMenuPText1).toContainText(data.actionMenuText1);
      await expect(await merchCard.catalogActionMenuPText2).toContainText(data.actionMenuText2);
      await expect(await merchCard.catalogActionMenuPText3).toContainText(data.actionMenuText3);
    });

    await test.step('step-4: Verify the accessibility test on the Merch Card (catalog) with more info and badge block', async () => {
      await runAccessibilityTest({ page, testScope: merchCard.catalog });
    });
  });
});
