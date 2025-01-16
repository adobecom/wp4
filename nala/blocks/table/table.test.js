import { expect, test } from '@playwright/test';
import { features } from './table.spec.js';
import TableBlock from './table.page.js';

let table;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Table block feature test suite', () => {
  test.beforeEach(async ({ page }) => {
    table = new TableBlock(page);
  });

  // Test 0 : Table block (default)
  test(`[Test Id - ${features[0].tcid}] ${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);
    const { data } = features[0];

    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify table content/specs', async () => {
      await expect(await table.table).toBeVisible();
      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      // verify table header and section rows content
      await table.verifyHeaderRow(data);
      await table.verifySectionRow(data);
    });
  });

  // Test 1 : Table (highlight)
  test(`[Test Id - ${features[1].tcid}] ${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[1].path}${miloLibs}`);
    const { data } = features[1];

    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify table content/specs', async () => {
      await expect(await table.highlightTable).toBeVisible();
      await expect(await table.highlightRow).toBeVisible();

      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      // verify highlighter, header, and section rows content
      await table.verifyHighlightRow(data);
      await table.verifyHeaderRow(data);
      await table.verifySectionRow(data);
    });
  });

  // Test 2 : Table (sticky)
  test(`[Test Id - ${features[2].tcid}] ${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);
    const { data } = features[2];

    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify table content/specs', async () => {
      // verify table header row attributes ( class, position(sticky) and top )
      await expect(await table.stickyTable).toBeVisible();

      await expect(await table.stickyRow).toHaveAttribute('class', 'row row-1 row-heading top-border-transparent');
      await expect(await table.stickyRow).toHaveCSS('position', 'sticky');
      await expect(await table.stickyRow).toHaveCSS('top', '64px');

      // verify table row, column count
      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      // verify header and section rows content
      await table.verifyHeaderRow(data);
      await table.verifySectionRow(data);
    });
  });

  // Test 3 : Table (highlight, collapse, sticky)
  test(`[Test Id - ${features[3].tcid}] ${features[3].name},${features[3].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[3].path}${miloLibs}`);
    const { data } = features[3];

    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${features[3].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[3].path}${miloLibs}`);
    });

    await test.step('step-2: Verify table content/specs', async () => {
      // verify sticky table header and attributes
      await expect(await table.collapseStickyTable).toBeVisible();
      await expect(table.highlightRow).toHaveClass(/row.*row-1.*row-highlight/);
      await expect(table.stickyRow).toHaveClass(/row.*row-2.*row-heading/);
      await expect(await table.stickyRow).toHaveCSS('position', 'sticky');
      await expect(await table.stickyRow).toHaveCSS('top', '114px');

      // verify table rows and columns count
      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      // verify highlighter, header, and section rows content
      await table.verifyHighlightRow(data);
      await table.verifyHeaderRow(data);
      await table.verifySectionRow(data);
    });
  });

  // Test 4 : Table (merch)
  test(`[Test Id - ${features[4].tcid}] ${features[4].name},${features[4].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[4].path}${miloLibs}`);
    const { data } = features[4];

    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${features[4].path}${miloLibs}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${features[4].path}${miloLibs}`);
    });

    await test.step('step-2: Verify table content/specs', async () => {
      // verify merch table
      await expect(await table.merchTable).toBeVisible();

      // verify table rows and columns count
      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      // verify header and section rows content
      await table.verifyHeaderRow(data);
      await table.verifySectionRow(data);
    });
  });

  // Test 5 : Table (merch, highlight, sticky)
  test(`[Test Id - ${features[5].tcid}] ${features[5].name} ${features[5].tags}`, async ({ page, baseURL }) => {
    const { path, data } = features[5];
    console.info(`[Test Page]: ${baseURL}${path}`);

    // Step 1: Navigate to the test page
    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${path}`);
    });

    // Step 2: Verify table structure and content
    await test.step('step-2: Verify table content/specs', async () => {
      // Verify visibility and row/column counts
      await expect(await table.merchHighlightStickyTable).toBeVisible();
      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.highlightRowColumns).toHaveCount(data.highlightRowColCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      await table.verifyHighlightRow(data);
      await table.verifyHeaderRow(data);
      await table.verifySectionRow(data);
    });
  });

  // Test 6 : Table (merch, pricing-bottom)
  test(`[Test Id - ${features[6].tcid}] ${features[6].name} ${features[6].tags}`, async ({ page, baseURL }) => {
    const { path, data } = features[6];
    console.info(`[Test Page]: ${baseURL}${path}`);

    // Step 1: Navigate to the test page
    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${path}`);
    });

    await test.step('step-2: Verify table structure and content/specs', async () => {
      // Verify visibility and row/column counts
      await expect(await table.merchPricingBottom).toBeVisible();
      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      await table.verifyHeaderRow(data, 'bottom-pricing');
      await table.verifySectionRow(data);
    });
  });

  // Test 7 : Table (merch, button-right)
  test(`[Test Id - ${features[7].tcid}] ${features[7].name} ${features[7].tags}`, async ({ page, baseURL }) => {
    const { path, data } = features[7];
    console.info(`[Test Page]: ${baseURL}${path}`);

    // Step 1: Navigate to the test page
    await test.step('step-1: Go to Table block test page', async () => {
      await page.goto(`${baseURL}${path}`);
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveURL(`${baseURL}${path}`);
    });

    // Step 2: Verify table structure and content
    await test.step('step-2: Verify table content/specs', async () => {
      // Verify table visibility
      await expect(await table.merchButtonRight).toBeVisible();

      // verify table rows and coloumn content
      await expect(await table.rows).toHaveCount(data.rowsCount);
      await expect(await table.headingRowColumns).toHaveCount(data.headerRowColCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);
      await expect(await table.sectionRows).toHaveCount(data.sectionRowCount);

      // verify header and section row cells content
      await table.verifyHeaderRow(data);
      await table.verifySectionRow(data);
    });
  });
});
