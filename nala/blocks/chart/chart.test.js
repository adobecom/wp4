import { expect, test } from '@playwright/test';
import { features } from './chart.spec.js';
import ChartBlock from './chart.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let chart;
const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Chart feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    chart = new ChartBlock(page);
  });

  // Test 0 : Chart (area, green, border)
  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Chart feature test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify chart content/specs', async () => {
      await expect(await chart.chart).toBeVisible();
      await expect(await chart.title).toContainText(data.titleH3);
      await expect(await chart.subTitle).toContainText(data.subTitle);
      expect(await chart.type.getAttribute('class')).toContain(data.chartType);
      await expect(await chart.footNote).toContainText(data.footNote);
    });

    await test.step('step-3: Verify the accessibility test on the chart block', async () => {
      await runAccessibilityTest({ page, testScope: chart.chart, skipA11yTest: true });
    });
  });

  // Test 1 : Chart (bar, border)
  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Chart feature test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify chart content/specs', async () => {
      await expect(await chart.chart).toBeVisible();
      await expect(await chart.title).toContainText(data.titleH3);
      await expect(await chart.subTitle).toContainText(data.subTitle);
      expect(await chart.type.getAttribute('class')).toContain(data.chartType);
      await expect(await chart.legendChrome).toBeVisible();
      await expect(await chart.legendFirefox).toBeVisible();
      await expect(await chart.legendEdge).toBeVisible();

      await expect(await chart.footNote).toContainText(data.footNote);
    });

    await test.step('step-3: Verify the accessibility test on the chart block', async () => {
      await runAccessibilityTest({ page, testScope: chart.chart, skipA11yTest: true });
    });
  });

  // Test 2 : Chart (column, border)
  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Chart feature test page', async () => {
      await page.goto(`${baseURL}${features[2].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify chart content/specs', async () => {
      await expect(await chart.chart).toBeVisible();
      await expect(await chart.title).toContainText(data.titleH3);
      await expect(await chart.subTitle).toContainText(data.subTitle);
      expect(await chart.type.getAttribute('class')).toContain(data.chartType);

      await expect(await chart.x_axisMonday).toBeVisible();
      await expect(await chart.x_axisTuesday).toBeVisible();
      await expect(await chart.x_axisSunday).toBeVisible();

      await expect(await chart.y_axis100K).toBeVisible();
      await expect(await chart.y_axis250K).toBeVisible();
      await expect(await chart.y_axis300K).toBeVisible();

      await expect(await chart.legendChrome).toBeVisible();
      await expect(await chart.legendFirefox).toBeVisible();
      await expect(await chart.legendSafari).toBeVisible();

      await expect(await chart.footNote).toContainText(data.footNote);
    });

    await test.step('step-3: Verify the accessibility test on the chart block', async () => {
      await runAccessibilityTest({ page, testScope: chart.chart, skipA11yTest: true });
    });
  });

  // Test 3 : Chart (donut, border)
  test(`${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to Chart feature test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify chart content/specs', async () => {
      await expect(await chart.chart).toBeVisible();
      await expect(await chart.title).toContainText(data.titleH3);
      await expect(await chart.subTitle).toContainText(data.subTitle);
      expect(await chart.type.getAttribute('class')).toContain(data.chartType);

      await expect(await chart.donutTitle).toBeVisible();
      await expect(await chart.x_axisMonday).toBeVisible();
      await expect(await chart.x_axisTuesday).toBeVisible();
      await expect(await chart.x_axisSunday).toBeVisible();

      await expect(await chart.footNote).toContainText(data.footNote);
    });

    await test.step('step-3: Verify the accessibility test on the chart block', async () => {
      await runAccessibilityTest({ page, testScope: chart.chart, skipA11yTest: true });
    });
  });

  // Test 4 : Chart (line, border)
  test(`${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to Chart feature test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify chart content/specs', async () => {
      await expect(await chart.chart).toBeVisible();
      await expect(await chart.title).toContainText(data.titleH3);
      await expect(await chart.subTitle).toContainText(data.subTitle);
      expect(await chart.type.getAttribute('class')).toContain(data.chartType);

      await expect(await chart.x_axisMonday).toBeVisible();
      await expect(await chart.x_axisTuesday).toBeVisible();
      await expect(await chart.x_axisSunday).toBeVisible();

      await expect(await chart.legendChromeAndroid).toBeVisible();
      await expect(await chart.legendFirefoxAndroid).toBeVisible();
      await expect(await chart.legendSafariIos).toBeVisible();

      await expect(await chart.footNote).toContainText(data.footNote);
    });

    await test.step('step-3: Verify the accessibility test on the chart block', async () => {
      await runAccessibilityTest({ page, testScope: chart.chart, skipA11yTest: true });
    });
  });

  // Test 5 : Chart (oversized-number, border)
  test(`${features[5].name},${features[5].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[5].path}${miloLibs}`);
    const { data } = features[5];

    await test.step('step-1: Go to Chart feature test page', async () => {
      await page.goto(`${baseURL}${features[5].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[5].path}${miloLibs}`);
    });

    await test.step('step-2: Verify chart content/specs', async () => {
      await expect(await chart.chart).toBeVisible();
      await expect(await chart.title).toContainText(data.titleH3);
      await expect(await chart.subTitle).toContainText(data.subTitle);

      expect(await chart.type.getAttribute('class')).toContain(data.chartType);
      expect(await chart.svgImg.getAttribute('viewBox')).toContain(chart.attributes.svgViewBox.viewBox);

      await expect(await chart.svgImgCircleNumber).toContainText(data.circleNumber);
      await expect(await chart.svgImgCircleSubTitle).toContainText(data.circleSubTitle);

      await expect(await chart.footNote).toContainText(data.footNote);
    });

    await test.step('step-3: Verify the accessibility test on the chart block', async () => {
      await runAccessibilityTest({ page, testScope: chart.chart, skipA11yTest: true });
    });
  });

  // Test 6 : Chart (pie, border)
  test(`${features[6].name},${features[6].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[6].path}${miloLibs}`);
    const { data } = features[6];

    await test.step('step-1: Go to Chart feature test page', async () => {
      await page.goto(`${baseURL}${features[6].path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[6].path}${miloLibs}`);
    });

    await test.step('step-2: Verify chart content/specs', async () => {
      await expect(await chart.chart).toBeVisible();
      await expect(await chart.title).toContainText(data.titleH3);
      await expect(await chart.subTitle).toContainText(data.subTitle);

      await expect(await chart.pieChartLabelAdobeSign).toBeVisible();
      await expect(await chart.pieChartLabelAdobePhotoshop).toBeVisible();
      await expect(await chart.pieChartLabelAdobePremier).toBeVisible();

      await expect(await chart.legendAdobeAcrobat).toBeVisible();
      await expect(await chart.legendAdobeExperienceManager).toBeVisible();

      await expect(await chart.footNote).toContainText(data.footNote);
    });

    await test.step('step-3: Verify the accessibility test on the chart block', async () => {
      await runAccessibilityTest({ page, testScope: chart.chart, skipA11yTest: true });
    });
  });
});
