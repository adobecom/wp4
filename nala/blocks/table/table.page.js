/* eslint-disable no-return-await */

import { expect } from '@playwright/test';

export default class Table {
  constructor(page, nth = 0) {
    this.page = page;
    // tabel locators
    this.table = this.page.locator('.table').nth(nth);
    this.highlightTable = this.page.locator('.table.highlight').nth(nth);
    this.stickyTable = this.page.locator('.table.sticky').nth(nth);
    this.collapseStickyTable = this.page.locator('.table.highlight.collapse.sticky').nth(nth);
    this.merchTable = this.page.locator('.table.merch').nth(nth);
    this.merchHighlightStickyTable = this.page.locator('.table.merch.highlight.sticky').nth(nth);
    this.merchPricingBottom = this.page.locator('.table.merch.pricing-bottom').nth(nth);
    this.merchButtonRight = this.page.locator('.table.merch.button-right').nth(nth);

    this.highlightRow = this.table.locator('.row-highlight');
    this.highlightRowColumns = this.highlightRow.locator('.col');

    this.headingRow = this.table.locator('.row-heading');
    this.headingRowColumns = this.headingRow.locator('.col');

    this.stickyRow = this.table.locator('.row-heading');

    this.rows = this.table.locator('.row');
    this.sectionRows = this.table.locator('.section-row');
  }

  // Verify Table Highlight Row
  async verifyHighlightRow(data) {
    for (const { colIndex, visibility, style, text } of data.highlightRow) {
      const highlightRowColumn = await this.highlightRow.locator('.col-highlight').nth(colIndex);
      if (visibility) {
        await expect(await highlightRowColumn).toContainText(text);
        if (style) {
          await expect(await highlightRowColumn).toHaveAttribute('style', style);
        }
      }
    }
  }

  // Verify Table Header Row
  async verifyHeaderRow(data, tableType = '') {
    for (const headerCell of data.headerRow) {
      const {
        colIndex, heading, pricingText, additionalText, tooltip, buttons,
      } = headerCell;

      const headerColumn = await this.headingRow.locator(`.col-${colIndex}`);

      await expect(await headerColumn.locator('.tracking-header')).toContainText(heading);
      await expect(await headerColumn.locator('.pricing')).toContainText(pricingText);

      // verify the additional text based on table type
      if (additionalText) {
        if (tableType === 'bottom-pricing') {
          await expect(await headerColumn.locator('p').nth(2)).toContainText(additionalText);
        } else {
          await expect(await headerColumn.locator('p').nth(3)).toContainText(additionalText);
        }
      }
      // verify tooltip information
      if (tooltip) {
        const headerColumnTooltip = await headerColumn.locator('.milo-tooltip');
        await expect(await headerColumnTooltip.locator('.icon-milo')).toBeVisible();
        await expect(await headerColumnTooltip).toHaveAttribute('data-tooltip', tooltip.tooltipText);
        await headerColumnTooltip.hover();
      }

      // verify buttons
      if (buttons && buttons.length > 0) {
        for (const button of buttons) {
          await expect(await headerColumn.locator(`.con-button.${button.type}`).nth(0)).toContainText(button.text);
          if (button.justifycontent) {
            await expect(await headerColumn.locator('.buttons-wrapper')).toHaveCSS('justify-content', button.justifycontent);
          }
        }
      }
    }
  }

  // Verify Table Section Rows
  async verifySectionRow(data) {
    for (const sectionRow of data.sectionRows) {
      const { rowIndex, columns } = sectionRow;
      const secRow = await this.table.locator('.section-row').nth(rowIndex);
      for (const column of columns) {
        const sectionRowColumn = await secRow.locator(`.col-${column.colIndex}`);
        await expect(await sectionRowColumn).toContainText(column.text);

        if (column.imageVisible) {
          await expect(await sectionRowColumn.locator('.col-merch-content img')).toBeVisible();
        }
        if (column.tooltip) {
          const tooltip = await sectionRowColumn.locator('.milo-tooltip');
          await expect(await tooltip.locator('.icon-milo')).toBeVisible();
          await expect(await tooltip).toHaveAttribute('data-tooltip', column.tooltipText);
          await tooltip.hover();
        }
      }
    }
  }
}
