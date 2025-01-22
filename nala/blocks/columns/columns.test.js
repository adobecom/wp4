import { expect, test } from '@playwright/test';
import WebUtil from '../../libs/webutil.js';
import { features } from './columns.spec.js';
import ColumnsBlock from './columns.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let column;
let webUtil;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Columns Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    column = new ColumnsBlock(page);
    webUtil = new WebUtil(page);
  });

  // Test 0 : Column default block
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Columns block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Columns block content/specs', async () => {
      // verify colums visibility, rows count, columns count and text content
      await expect(await column.column).toBeVisible();

      await expect(await column.rows).toHaveCount(data.rows);
      await expect(await column.columns).toHaveCount(data.columns);

      await expect(await column.columns.nth(0)).toContainText(data.col0);
      await expect(await column.columns.nth(1)).toContainText(data.col1);
      await expect(await column.columns.nth(2)).toContainText(data.col2);

      // verify the css and attributes
      expect(await webUtil.verifyCSS(await column.rows.nth(0), column.cssProperties['.columns > .row'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(await column.column, column.attProperties.columns)).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Column default block', async () => {
      await runAccessibilityTest({ page, testScope: column.column });
    });
  });

  // Test 1 : Columns (contained) block
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Columns block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Columns(contained) block content/specs', async () => {
      // verify colums visibility, rows count, columns count and text content
      await expect(await column.column).toBeVisible();

      await expect(await column.rows).toHaveCount(data.rows);
      await expect(await column.columns).toHaveCount(data.columns);

      await expect(await column.columns.nth(0)).toContainText(data.col0);
      await expect(await column.columns.nth(1)).toContainText(data.col1);

      // verify the css and attributes
      expect(await webUtil.verifyCSS(await column.column, column.cssProperties['.columns.contained'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(await column.column, column.attProperties['columns-contained'])).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Columns(contained) block', async () => {
      await runAccessibilityTest({ page, testScope: column.column });
    });
  });

  // Test 2 : Columns (contained,middle) block
  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Columns block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Columns(contained,middle) block content/specs', async () => {
      // verify colums visibility, rows count, columns count and text content
      await expect(await column.column).toBeVisible();

      await expect(await column.rows).toHaveCount(data.rows);
      await expect(await column.columns).toHaveCount(data.columns);

      await expect(await column.columns.nth(0)).toContainText(data.col0);
      await expect(await column.columns.nth(1)).toContainText(data.col1);

      // verify the css and attributes
      expect(await webUtil.verifyCSS(await column.column, column.cssProperties['.columns.contained'])).toBeTruthy();
      expect(await webUtil.verifyAttributes(await column.column, column.attProperties['columns-contained-middle'])).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Columns(contained,middle) block', async () => {
      await runAccessibilityTest({ page, testScope: column.column });
    });
  });

  // Test 3 : Columns (table) block
  test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to Columns block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Columns(table) block content/specs', async () => {
      // verify colums visibility, rows count, columns count and text content
      await expect(await column.column).toBeVisible();

      await expect(await column.rows).toHaveCount(data.rows);
      await expect(await column.columns).toHaveCount(data.columns);

      await expect(await column.columns.nth(0)).toContainText(data.col0);
      await expect(await column.columns.nth(1)).toContainText(data.col1);
      await expect(await column.columns.nth(2)).toContainText(data.col2);
      await expect(await column.columns.nth(3)).toContainText(data.col3);

      // verify the css and attributes
      expect(await webUtil.verifyCSS(await column.rows.nth(0), column.cssProperties['.columns.table > .row:first-child'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await column.rows.nth(1), column.cssProperties['.columns.table > .row'])).toBeTruthy();

      expect(await webUtil.verifyAttributes(await column.column, column.attProperties['columns-table'])).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Columns(table) block', async () => {
      await runAccessibilityTest({ page, testScope: column.column });
    });
  });

  // Test 4 : Columns (contained,table) block
  test(`[Test Id - ${features[4].tcid}] ${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to Columns block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Columns(contained,table) block content/specs', async () => {
      // verify colums visibility, rows count, columns count and text content
      await expect(await column.column).toBeVisible();

      await expect(await column.rows).toHaveCount(data.rows);
      await expect(await column.columns).toHaveCount(data.columns);

      await expect(await column.columns.nth(0)).toContainText(data.col0);
      await expect(await column.columns.nth(1)).toContainText(data.col1);
      await expect(await column.columns.nth(2)).toContainText(data.col2);
      await expect(await column.columns.nth(3)).toContainText(data.col3);

      // verify the css and attributes
      expect(await webUtil.verifyCSS(await column.rows.nth(0), column.cssProperties['.columns.table > .row:first-child'])).toBeTruthy();
      expect(await webUtil.verifyCSS(await column.rows.nth(1), column.cssProperties['.columns.table > .row'])).toBeTruthy();

      expect(await webUtil.verifyAttributes(await column.column, column.attProperties['columns-contained-table'])).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the Columns(contained,table) block', async () => {
      await runAccessibilityTest({ page, testScope: column.column });
    });
  });
});
