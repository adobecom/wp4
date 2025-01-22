import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './marquee-anchors.spec.js';
import MarqueeAnchors from './marquee-anchors.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let webUtil;
let marquee;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Marquee Anchors test suite', () => {
  test.beforeEach(async ({ page }) => {
    webUtil = new WebUtil(page);
    marquee = new MarqueeAnchors(page);
  });

  // Test 0 : Marquee anchors
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Marquee anchors block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify marquee anchors specs', async () => {
      await expect(await marquee.marqueeAnchors).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.outlineButton).toContainText(data.outlineButtonText);
      await expect(await marquee.blueButton).toContainText(data.blueButtonText);

      await expect(await marquee.foregroundImage).toBeVisible();

      // verify marquee anchors links
      await expect(marquee.anchorLinks).toHaveCount(data.anchors.linkCount);
      await expect(marquee.anchorHeader).toContainText(data.anchors.headerText);

      await expect(marquee.anchorLink.howTo.link).toContainText(data.anchors.howTo.linkText);
      await expect(marquee.anchorLink.howTo.linkHeader).toContainText(data.anchors.howTo.h4Text);
      await expect(marquee.anchorLink.howTo.link).toHaveAttribute('href', data.anchors.howTo.href);
      await expect(marquee.anchorLink.howTo.icon).toBeVisible();

      await expect(marquee.anchorLink.text.link).toContainText(data.anchors.text.linkText);
      await expect(marquee.anchorLink.text.linkHeader).toContainText(data.anchors.text.h4Text);
      await expect(marquee.anchorLink.text.link).toHaveAttribute('href', data.anchors.text.href);
      await expect(marquee.anchorLink.text.icon).toBeVisible();

      await expect(marquee.anchorLink.media.link).toContainText(data.anchors.media.linkText);
      await expect(marquee.anchorLink.media.linkHeader).toContainText(data.anchors.media.h4Text);
      await expect(marquee.anchorLink.media.link).toHaveAttribute('href', data.anchors.media.href);
      await expect(marquee.anchorLink.media.icon).toBeVisible();

      await expect(marquee.anchorLink.linkToAdobe.link).toContainText(data.anchors.linkToAdobe.linkText);
      await expect(marquee.anchorLink.linkToAdobe.linkHeader).toContainText(data.anchors.linkToAdobe.h4Text);
      await expect(marquee.anchorLink.linkToAdobe.link).toHaveAttribute('href', data.anchors.linkToAdobe.href);
      await expect(marquee.anchorLink.linkToAdobe.icon).toBeVisible();

      await expect(marquee.anchorFooter).toContainText(data.anchors.footerText);
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await marquee.marqueeAnchors).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('marquee-anchors', 1));

      await expect(await marquee.outlineButton).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.outlineButtonText, 1, data.h2Text));
      await expect(await marquee.blueButton).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.blueButtonText, 2, data.h2Text));

      await expect(await marquee.anchorLink.howTo.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.howTo.h4Text} ${data.anchors.howTo.linkText}`, 3, data.anchors.headerText));
      await expect(await marquee.anchorLink.text.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.text.h4Text} ${data.anchors.text.linkText}`, 4, data.anchors.howTo.h4Text));
      await expect(await marquee.anchorLink.media.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.media.h4Text} ${data.anchors.media.linkText}`, 5, data.anchors.text.h4Text));
      await expect(await marquee.anchorLink.linkToAdobe.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.linkToAdobe.h4Text} ${data.anchors.linkToAdobe.linkText}`, 6, data.anchors.media.h4Text));
    });

    await test.step('step-4: Verify the accessibility test on the marquee anchors block', async () => {
      await runAccessibilityTest({ page, testScope: marquee.marqueeAnchors });
    });
  });

  // Test 1 : Marquee anchors (transparent)
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Marquee anchors (Transparent) block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify marquee anchors (Transparent) specs', async () => {
      await expect(await marquee.marqueeAnchorsTransparent).toBeVisible();

      await expect(await marquee.detailM).toContainText(data.detailText);
      await expect(await marquee.headingL).toContainText(data.h2Text);
      await expect(await marquee.bodyM).toContainText(data.bodyText);
      await expect(await marquee.outlineButton).toContainText(data.outlineButtonText);
      await expect(await marquee.blueButton).toContainText(data.blueButtonText);

      await expect(await marquee.foregroundImage).toBeVisible();

      // verify marquee anchors links
      await expect(marquee.anchorLinks).toHaveCount(data.anchors.linkCount);
      await expect(marquee.anchorHeader).toContainText(data.anchors.headerText);

      await expect(marquee.anchorLink.howTo.link).toContainText(data.anchors.howTo.linkText);
      await expect(marquee.anchorLink.howTo.linkHeader).toContainText(data.anchors.howTo.h4Text);
      await expect(marquee.anchorLink.howTo.link).toHaveAttribute('href', data.anchors.howTo.href);
      await expect(marquee.anchorLink.howTo.icon).toBeVisible();

      await expect(marquee.anchorLink.text.link).toContainText(data.anchors.text.linkText);
      await expect(marquee.anchorLink.text.linkHeader).toContainText(data.anchors.text.h4Text);
      await expect(marquee.anchorLink.text.link).toHaveAttribute('href', data.anchors.text.href);
      await expect(marquee.anchorLink.text.icon).toBeVisible();

      await expect(marquee.anchorLink.media.link).toContainText(data.anchors.media.linkText);
      await expect(marquee.anchorLink.media.linkHeader).toContainText(data.anchors.media.h4Text);
      await expect(marquee.anchorLink.media.link).toHaveAttribute('href', data.anchors.media.href);
      await expect(marquee.anchorLink.media.icon).toBeVisible();

      await expect(marquee.anchorLink.linkToAdobe.link).toContainText(data.anchors.linkToAdobe.linkText);
      await expect(marquee.anchorLink.linkToAdobe.linkHeader).toContainText(data.anchors.linkToAdobe.h4Text);
      await expect(marquee.anchorLink.linkToAdobe.link).toHaveAttribute('href', data.anchors.linkToAdobe.href);
      await expect(marquee.anchorLink.linkToAdobe.icon).toBeVisible();

      await expect(marquee.anchorFooter).toContainText(data.anchors.footerText);
    });

    await test.step('step-3: Verify analytics attributes', async () => {
      await expect(await marquee.marqueeAnchorsTransparent).toHaveAttribute('daa-lh', await webUtil.getBlockDaalh('marquee-anchors', 1));
      await expect(await marquee.outlineButton).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.outlineButtonText, 1, data.h2Text));
      await expect(await marquee.blueButton).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(data.blueButtonText, 2, data.h2Text));

      await expect(await marquee.anchorLink.howTo.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.howTo.h4Text} ${data.anchors.howTo.linkText}`, 3, data.anchors.headerText));
      await expect(await marquee.anchorLink.text.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.text.h4Text} ${data.anchors.text.linkText}`, 4, data.anchors.howTo.h4Text));
      await expect(await marquee.anchorLink.media.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.media.h4Text} ${data.anchors.media.linkText}`, 5, data.anchors.text.h4Text));
      await expect(await marquee.anchorLink.linkToAdobe.link).toHaveAttribute('daa-ll', await webUtil.getLinkDaall(`${data.anchors.linkToAdobe.h4Text} ${data.anchors.linkToAdobe.linkText}`, 6, data.anchors.media.h4Text));
    });

    await test.step('step-4: Verify the accessibility test on the marquee anchors (transparent) block', async () => {
      await runAccessibilityTest({ page, testScope: marquee.marqueeAnchorsTransparent });
    });
  });
});
