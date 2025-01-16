import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './modal.spec.js';
import ModalBlock from './modal.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let modal;
let webUtil;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Modal feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    modal = new ModalBlock(page);
    webUtil = new WebUtil(page);
  });

  // Test 0 : Modal with Text block
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);

    await test.step('step-1: Go to Modal feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Modal text fragment content/specs', async () => {
      const { data } = features[0];
      const modalLink = await modal.getModalLink(data.modalId);
      await expect(await modalLink).toBeVisible();
      await expect(await modalLink).toHaveAttribute('class', modal.attributes['modal-link'].class);

      // click the modal link
      await modalLink.click();
      await expect(await modal.dialog).toBeVisible();

      await expect(await modal.textBlock).toBeVisible();
      await expect(await modal.textBlockHeading).toContainText(data.h2Text);
      await expect(await modal.textBlockBodyM).toContainText(data.bodyText);

      expect(await WebUtil.isModalInViewport(modal.page, modal.modalSelector)).toBeTruthy();

      await test.step('step-2.1: Verify the accessibility test on Modal text fragment block', async () => {
        await runAccessibilityTest({ page, testScope: modal.dialog });
      });

      // click the modal close button
      await expect(await modal.dialogCloseButton).toBeVisible();
      await modal.dialogCloseButton.click();
    });
  });

  // Test 1 : Modal with Media block
  test(`[Test Id - ${features[1].tcid}] ${features[1].name}, ${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);

    await test.step('step-1: Go to Modal feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Modal media fragement content/specs', async () => {
      const { data } = features[1];
      // expect(await modal.verifyModal(modalData)).toBeTruthy();

      const modalLink = await modal.getModalLink(data.modalId);
      await expect(await modalLink).toBeVisible();
      await expect(await modalLink).toHaveAttribute('class', modal.attributes['modal-link'].class);

      // click the modal link
      await modalLink.click();
      await expect(await modal.dialog).toBeVisible();

      await expect(await modal.mediaBlock).toBeVisible();
      await expect(await modal.mediaBlockdetailM).toContainText(data.detailText);
      await expect(await modal.mediaBlockTextHeading).toContainText(data.h2Text);
      await expect(await modal.mediaBlockTextBodyS).toContainText(data.bodyText);

      expect(await WebUtil.isModalInViewport(modal.page, modal.modalSelector)).toBeTruthy();

      // close the modal using escape key press
      await expect(await modal.dialogCloseButton).toBeVisible();
      await modal.page.keyboard.press('Escape');
    });
  });

  // Test 2 : Modal with Video Autoplay
  test(`[Test Id - ${features[2].tcid}] ${features[2].name}, ${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);

    await test.step('step-1: Go to Modal feature test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Modal media fragement content/specs', async () => {
      const { data } = features[2];

      const modalLink = await modal.getModalLink(data.modalId);
      await expect(await modalLink).toBeVisible();
      await expect(await modalLink).toHaveAttribute('class', modal.attributes['modal-link'].class);

      // click the modal link and verify video autoplay
      await modalLink.click();
      await expect(await modal.dialog).toBeVisible();
      expect(await WebUtil.isModalInViewport(modal.page, modal.modalSelector)).toBeTruthy();

      await expect(await modal.video).toBeVisible();
      expect(await webUtil.verifyAttributes(await modal.video, modal.attributes['video.inline'])).toBeTruthy();

      // close the modal using escape key press
      await expect(await modal.dialogCloseButton).toBeVisible();
      await modal.page.keyboard.press('Escape');
    });
  });
});
