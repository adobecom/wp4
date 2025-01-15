import { expect, test } from '@playwright/test';
import { features } from './masccd.spec.js';
import MerchCCD from './masccd.page.js';
import WebUtil from '../../../libs/webutil.js';

let CCD;
let webUtil;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('CCD Merchcard feature test suite', () => {
  test.beforeEach(async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'Not supported to run on multiple browsers.');

    CCD = new MerchCCD(page);
    webUtil = new WebUtil(page);
    if (browserName === 'chromium') {
      await page.setExtraHTTPHeaders({ 'sec-ch-ua': '"Chromium";v="123", "Not:A-Brand";v="8"' });
    }
  });

  // *** SUGGESTED CARDS: ***

  // @MAS-CCD-suggested-eyebrow : CCD suggested card with eyebrow, no legal link
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[0].path}${miloLibs}`;
    const { data } = features[0];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /content\/dam/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toContainText(data.eyebrow);
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[0].path}${features[0].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-suggested-strikethrough : CCD suggested card with eyebrow, legal link and strikethrough price
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[1].path}${miloLibs}`;
    const { data } = features[1];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', data.cardDaaLH);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /content\/dam/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toContainText(data.eyebrow);
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', data.linkAnalyticsId);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toHaveAttribute('daa-ll', data.linkDaaLL);
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.strikethroughPrice);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', data.ctaAnalyticsId);
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('daa-ll', data.ctaDaaLL);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'suggested'), CCD.suggestedCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPriceStrikethrough(data.id, 'suggested'), CCD.suggestedCssProp.strikethroughPrice.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[1].path}${features[1].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${features[1].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'suggested'), CCD.suggestedCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPriceStrikethrough(data.id, 'suggested'), CCD.suggestedCssProp.strikethroughPrice.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-suggested-noeyebrow-priceunit : CCD suggested card with no eyebrow, no legal link and price with unit text
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[2].path}${miloLibs}`;
    const { data } = features[2];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /content\/dam/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      expect(await (await CCD.getCardPrice(data.id, 'suggested')).locator('.price-unit-type').innerText()).not.toBe('');
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[2].path}${features[2].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${features[2].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-thin-suggested : CCD suggested card with eyebrow, no legal link and thin-strip background
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[3].path}${miloLibs}`;
    const { data } = features[3];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content/specs', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toContainText(data.eyebrow);
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('background-image', new RegExp(data.background));
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[0].path}${features[0].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${features[0].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-suggested-thin-seeterms : CCD suggested card with eyebrow, legal link and thin-strip background
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[4].path}${miloLibs}`;
    const { data } = features[4];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content/specs', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toContainText(data.eyebrow);
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText('Starting at');
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('background-image', new RegExp(data.background));
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'suggested'), CCD.suggestedCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[4].path}${features[4].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${features[4].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'suggested'), CCD.suggestedCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-suggested-thin-noeyebrow-priceunit : CCD suggested card with no eyebrow, no legal link and thin-strip background
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[5].path}${miloLibs}`;
    const { data } = features[5];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content/specs', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      expect(await (await CCD.getCardPrice(data.id, 'suggested')).locator('.price-unit-type').innerText()).not.toBe('');
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('background-image', new RegExp(data.background));
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[5].path}${features[5].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${features[5].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-suggested-wide-seeterms : CCD suggested card with eyebrow, legal link and wide-strip background
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[6].path}${miloLibs}`;
    const { data } = features[6];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content/specs', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).toContainText(data.eyebrow);
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('background-image', new RegExp(data.background));
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'suggested'), CCD.suggestedCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[6].path}${features[6].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${features[6].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardEyebrow(data.id, 'suggested'), CCD.suggestedCssProp.eyebrow.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'suggested'), CCD.suggestedCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-suggested-wide-noeyebrow-priceunit :
  // CCD suggested card with no eyebrow, no legal link, price with unit text and wide-strip background
  test(`${features[7].name},${features[7].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[7].path}${miloLibs}`;
    const { data } = features[7];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content/specs', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'suggested')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardTitle(data.id, 'suggested')).toContainText(data.title);
      await expect(await CCD.getCardEyebrow(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'suggested')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'suggested')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'suggested')).toContainText(data.price);
      expect(await (await CCD.getCardPrice(data.id, 'suggested')).locator('.price-unit-type').innerText()).not.toBe('');
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toHaveAttribute('class', /primary/);
      await expect(await CCD.getCardCTA(data.id, 'suggested')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'suggested')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'suggested')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCard(data.id, 'suggested')).toHaveAttribute('background-image', new RegExp(data.background));
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[7].path}${features[7].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[7].path}${features[7].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'suggested')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'suggested'), CCD.suggestedCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'suggested'), CCD.suggestedCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardTitle(data.id, 'suggested'), CCD.suggestedCssProp.title.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'suggested'), CCD.suggestedCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'suggested'), CCD.suggestedCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'suggested'), CCD.suggestedCssProp.cta.dark)).toBeTruthy();
    });
  });

  // *** SLICE SINGLE CARDS: ***

  // @MAS-CCD-slice-percentage : CCD single width slice card with mnemonic, badge and price
  test(`${features[8].name},${features[8].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[8].path}${miloLibs}`;
    const { data } = features[8];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice')).toHaveAttribute('daa-lh', data.cardDaaLH);
      await expect(await CCD.getCardIcon(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.description);
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.percentage);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice')).toHaveAttribute('data-analytics-id', data.ctaAnalyticsId);
      await expect(await CCD.getCardCTALink(data.id, 'slice')).toHaveAttribute('daa-ll', data.ctadDaaLL);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[8].path}${features[8].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[8].path}${features[8].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-mnemonics : CCD single width slice card 2 mnemonics
  test(`${features[9].name},${features[9].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[9].path}${miloLibs}`;
    const { data } = features[9];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice')).toHaveAttribute('daa-lh', /.*/);
      const cardIcons = await CCD.getCardIcon(data.id, 'slice');
      expect(await cardIcons.count()).toBe(2);
      expect(await cardIcons.nth(0)).toBeVisible();
      expect(await cardIcons.nth(0)).toHaveAttribute('src', /assets\/img/);
      expect(await cardIcons.nth(1)).toBeVisible();
      expect(await cardIcons.nth(1)).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toContainText(data.cta);
      await expect(((await CCD.getCardCTALink(data.id, 'slice'))).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      const cardIcons = await CCD.getCardIcon(data.id, 'slice');
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await cardIcons.nth(0), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await cardIcons.nth(1), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice'), CCD.sliceCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[9].path}${features[9].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[9].path}${features[9].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      const cardIcons = await CCD.getCardIcon(data.id, 'slice');
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await cardIcons.nth(0), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await cardIcons.nth(1), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice'), CCD.sliceCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-seeterms : CCD single width slice card with See terms link
  test(`${features[10].name},${features[10].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[10].path}${miloLibs}`;
    const { data } = features[10];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[10].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice'), CCD.sliceCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[10].path}${features[10].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[10].path}${features[10].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice'), CCD.sliceCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-percentage-seeterms : CCD single width slice card with percentage and See terms link
  test(`${features[11].name},${features[11].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[11].path}${miloLibs}`;
    const { data } = features[11];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[11].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.description);
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.percentage);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[11].path}${features[11].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[11].path}${features[11].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-without-mnemonic : CCD single width slice card without mnemonic and without price
  test(`${features[12].name},${features[12].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[12].path}${miloLibs}`;
    const { data } = features[12];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[12].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardBadge(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[12].path}${features[12].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[12].path}${features[12].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-badge : CCD single width slice card with mnemonic, badge and price
  test(`${features[13].name},${features[13].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[13].path}${miloLibs}`;
    const { data } = features[13];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[13].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardBadge(data.id, 'slice')).toContainText(data.badge);
      await expect(await CCD.getCardImage(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice')).not.toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardBadge(data.id, 'slice'), CCD.sliceCssProp.badge)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice'), CCD.sliceCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[13].path}${features[13].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[13].path}${features[13].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice'), CCD.sliceCssProp.singleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardBadge(data.id, 'slice'), CCD.sliceCssProp.badge)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice'), CCD.sliceCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // *** SLICE WIDE (DOUBLE) CARDS: ***

  // @MAS-CCD-slice-wide-seeterms : CCD double width slice card with See terms link
  test(`${features[14].name},${features[14].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[14].path}${miloLibs}`;
    const { data } = features[14];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[14].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice-wide')).toHaveAttribute('daa-lh', data.cardDaaLH);
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice-wide')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toContainText(data.description);
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).not.toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', data.linkAnalyticsId);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toHaveAttribute('daa-ll', data.linkDaaLL);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toContainText(data.cta);
      // await (expect(await CCD.getCardCTALink(data.id, "slice-wide")).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      // await expect(await CCD.getCardCTALink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
      // await expect(await CCD.getCardCTALink(data.id, 'slice-wide')).toHaveAttribute('daa-ll', data.ctaDaaLL);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[14].path}${features[14].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[14].path}${features[14].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-wide-badge : CCD double width slice card with mnemonic and badge
  test(`${features[15].name},${features[15].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[15].path}${miloLibs}`;
    const { data } = features[15];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[15].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice-wide')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardBadge(data.id, 'slice-wide')).toContainText(data.badge);
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).not.toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice-wide')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardBadge(data.id, 'slice-wide'), CCD.sliceCssProp.badge)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[15].path}${features[15].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[15].path}${features[15].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardBadge(data.id, 'slice-wide'), CCD.sliceCssProp.badge)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-wide-price : CCD double width slice card with price
  test(`${features[16].name},${features[16].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[16].path}${miloLibs}`;
    const { data } = features[16];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[16].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice-wide')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice-wide')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice-wide')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice-wide'), CCD.sliceCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[16].path}${features[16].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[16].path}${features[16].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice-wide'), CCD.sliceCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-wide-strikethrough : CCD double width slice card with strikethrough price
  test(`${features[17].name},${features[17].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[17].path}${miloLibs}`;
    const { data } = features[17];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[17].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice-wide')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).toHaveAttribute('src', /assets\/img/);
      await expect(await CCD.getCardBadge(data.id, 'slice-wide')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).toContainText(data.price);
      await expect(await CCD.getCardPriceStrikethrough(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardPriceStrikethrough(data.id, 'slice-wide')).toContainText(data.strikethroughPrice);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice-wide')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice-wide'), CCD.sliceCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPriceStrikethrough(data.id, 'slice-wide'), CCD.sliceCssProp.strikethroughPrice.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[17].path}${features[17].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[17].path}${features[17].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardIcon(data.id, 'slice-wide'), CCD.sliceCssProp.icon)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice-wide'), CCD.sliceCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPriceStrikethrough(data.id, 'slice-wide'), CCD.sliceCssProp.strikethroughPrice.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });

  // @MAS-CCD-slice-wide-without-mnemonic : CCD double width slice card without mnemonic
  test(`${features[18].name},${features[18].tags}`, async ({ page, baseURL }) => {
    const testPage = `${baseURL}${features[18].path}${miloLibs}`;
    const { data } = features[18];
    console.info('[Test Page]: ', testPage);

    await test.step('step-1: Go to CCD Merch Card feature test page', async () => {
      await page.goto(testPage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[18].path}`);
    });

    await test.step('step-2: Verify CCD Merch Card content', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCard(data.id, 'slice-wide')).toHaveAttribute('daa-lh', /.*/);
      await expect(await CCD.getCardIcon(data.id, 'slice-wide')).not.toBeVisible();
      await expect(await CCD.getCardBadge(data.id, 'slice-wide')).not.toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardImage(data.id, 'slice-wide')).toHaveAttribute('src', new RegExp(data.background));
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardDescription(data.id, 'slice-wide')).toContainText(data.description);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toContainText(data.linkText);
      await expect(await CCD.getCardLegalLink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardPrice(data.id, 'slice-wide')).toContainText(data.price);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toBeVisible();
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toHaveAttribute('class', /accent/);
      await expect(await CCD.getCardCTA(data.id, 'slice-wide')).toContainText(data.cta);
      await expect((await CCD.getCardCTALink(data.id, 'slice-wide')).evaluate((el) => el.href)).resolves.toMatch(new RegExp(`${data.offerid}`));
      await expect(await CCD.getCardCTALink(data.id, 'slice-wide')).toHaveAttribute('data-analytics-id', /.*/);
    });

    await test.step('step-3: Verify CCD Merch Card spec', async () => {
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice-wide'), CCD.sliceCssProp.price.light)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.light)).toBeTruthy();
    });

    await test.step('step-4: Go to CCD Merch Card feature test page in dark mode', async () => {
      const darkThemePage = `${baseURL}${features[18].path}${features[18].browserParams}`;
      await page.goto(darkThemePage);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[18].path}${features[18].browserParams}`);
    });

    await test.step('step-5: Verify CCD Merch Card spec', async () => {
      await expect(await CCD.getCard(data.id, 'slice-wide')).toBeVisible();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCard(data.id, 'slice-wide'), CCD.sliceCssProp.doubleSize)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardLegalLink(data.id, 'slice-wide'), CCD.sliceCssProp.legalLink.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardDescription(data.id, 'slice-wide'), CCD.sliceCssProp.description.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardPrice(data.id, 'slice-wide'), CCD.sliceCssProp.price.dark)).toBeTruthy();
      expect(await webUtil.verifyCSS(await CCD.getCardCTA(data.id, 'slice-wide'), CCD.sliceCssProp.cta.dark)).toBeTruthy();
    });
  });
});
