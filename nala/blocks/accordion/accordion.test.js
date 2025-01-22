import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './accordion.spec.js';
import AccordionBlock from './accordion.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let webUtil;
let accordion;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Accordion Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    accordion = new AccordionBlock(page);
  });

  // Test 0 : Accordion Container
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Accrodion block content/specs', async () => {
      await expect(await accordion.accordion).toBeVisible();

      // verify accordion headers, buttons, and icons count
      await expect(await accordion.accordionHeaders).toHaveCount(data.headers);
      await expect(await accordion.accordionButtons).toHaveCount(data.headers);
      await expect(await accordion.accordionButtonIcons).toHaveCount(data.headers);

      // verify accordion headers text content
      await expect(await accordion.accordionHeaders.nth(0)).toContainText(data.heading0);
      await expect(await accordion.accordionHeaders.nth(1)).toContainText(data.heading1);
      await expect(await accordion.accordionHeaders.nth(2)).toContainText(data.heading2);

      // verify accordion buttons open close clicks
      await expect(await accordion.accordionButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
      await accordion.accordionButtonIcons.nth(0).click();
      await expect(await accordion.accordionButtons.nth(0)).toHaveAttribute('aria-expanded', 'true');
      await accordion.accordionButtonIcons.nth(0).click();
      await expect(await accordion.accordionButtons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await accordion.section).toHaveAttribute('daa-lh', await webUtil.getSectionDaalh(1));
      await expect(await accordion.accordion).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('accordion-container', 1));
    });

    await test.step('step-4: Verify the accessibility test on the accordion block', async () => {
      await runAccessibilityTest({ page, testScope: accordion.accordion });
    });
  });

  // Test 1 : Accordion (seo)
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Accrodion seo block specs', async () => {
      await expect(await accordion.accordion).toBeVisible();

      const scriptContent = await page.evaluate(() => {
        const scriptElement = document.querySelector('script[type="application/ld+json"]');
        return scriptElement ? scriptElement.textContent : null;
      });
      expect(scriptContent).toBeTruthy();
      console.log('[SEO Script content]:', scriptContent);

      expect(await webUtil.verifyAttributes(accordion.accordion, accordion.attributes['accordion-container.seo'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await accordion.accordion).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('accordion-container', 1));
    });

    await test.step('step-4: Verify the accessibility test on the accordion block', async () => {
      await runAccessibilityTest({ page, testScope: accordion.accordion });
    });
  });

  // Test 2 : Accordion (quiet, max-width-12-desktop-large)
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Accordion block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Accrodion block content/specs', async () => {
      await expect(await accordion.accordion).toBeVisible();

      // verify accordion headers, buttons, and icons count
      await expect(await accordion.accordionHeaders).toHaveCount(data.headers);
      await expect(await accordion.accordionButtons).toHaveCount(data.headers);
      await expect(await accordion.accordionButtonIcons).toHaveCount(data.headers);

      // verify accordion headers text content
      await expect(await accordion.accordionHeaders.nth(0)).toContainText(data.heading0);
      await expect(await accordion.accordionHeaders.nth(1)).toContainText(data.heading1);
      await expect(await accordion.accordionHeaders.nth(2)).toContainText(data.heading2);

      expect(await webUtil.verifyAttributes(accordion.accordion, accordion.attributes['accordion-container-quiet-large'])).toBeTruthy();
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await accordion.accordion).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('accordion-container', 1));
    });

    await test.step('step-4: Verify the accessibility test on the accordion block', async () => {
      await runAccessibilityTest({ page, testScope: accordion.accordion });
    });
  });

  // Test 3 : Accordion seo editorial
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to accordion test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify accordion content/specs', async () => {
      // verify action area buttons, links and text visibility and content
      await expect(await accordion.outlineButton).toBeVisible();
      await expect(await accordion.blueButton).toBeVisible();
      await expect(await accordion.textLink).toBeVisible();

      await expect(await accordion.outlineButton).toContainText(data.outlineButtonText);
      await expect(await accordion.blueButton).toContainText(data.blueButtonText);
    });

    await test.step('step-4: Verify the accessibility test on the Accordion seo editorial block', async () => {
      await runAccessibilityTest({ page, testScope: accordion.accordion });
    });
  });
});
