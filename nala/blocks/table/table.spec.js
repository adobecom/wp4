/* eslint-disable object-curly-newline */
module.exports = {
  FeatureName: 'Table Block',
  features: [
    {
      tcid: '0',
      name: '@Table (default)',
      path: '/drafts/nala/blocks/table/table',
      data: {
        rowsCount: 9,
        headerRowColCount: 5,
        sectionRowCount: 8,
        headerRow: [
          {
            colIndex: 2,
            heading: 'Heading Title-2',
            pricingText: 'Pricing-2',
            buttons: [
              { text: 'Free trial', type: 'outline', justifycontent: 'center' },
              { text: 'Buy now', type: 'blue', justifycontent: 'center' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 2,
            columns: [
              {
                colIndex: 1,
                text: 'Row-1.1, Title',
                imageVisible: false,
                tooltip: true,
                tooltipPosition: 'none',
                tooltipText: 'Tooltip position set to none',
              },
              { colIndex: 2, text: 'Content', imageVisible: false },
            ],
          },
          {
            rowIndex: 3,
            columns: [
              {
                colIndex: 1,
                text: 'Row-1.2, Title',
                imageVisible: false,
                tooltip: true,
                tooltipPosition: 'top',
                tooltipText: 'Tooltip position set to top',
              },
              { colIndex: 2, text: '', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table-1 @smoke @regression @milo',
    },
    {
      tcid: '1',
      name: '@Table (highlight)',
      path: '/drafts/nala/blocks/table/table-hightlight',
      data: {
        rowsCount: 10,
        headerRowColCount: 5,
        sectionRowCount: 8,
        highlightRow: [
          { colIndex: 0, visibility: false, text: '' },
          { colIndex: 1, visibility: true, style: '', text: 'Highlight-2' },
          { colIndex: 2, visibility: true, style: '', text: 'Highlight-3' },
          { colIndex: 3, visibility: true, style: '', text: 'Highlight-4' },
          { colIndex: 4, visibility: false, style: '', text: '' },
        ],
        headerRow: [
          {
            colIndex: 3,
            heading: 'Heading Title-3',
            pricingText: 'Pricing-3',
            tooltip: {
              tooltip: true,
              tooltipPosition: 'left',
              tooltipText: 'Tooltip position set to left',
            },
            buttons: [
              { text: 'Free trial', type: 'outline', justifycontent: 'center' },
              { text: 'Buy now', type: 'blue', justifycontent: 'center' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 1,
            columns: [
              { colIndex: 1, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 2, text: '', imageVisible: false },
            ],
          },
          {
            rowIndex: 2,
            columns: [
              { colIndex: 1, text: 'Row-1.1, Title', imageVisible: false },
              { colIndex: 2, text: 'Content', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table @smoke @regression @milo',
    },
    {
      tcid: '2',
      name: '@Table (sticky)',
      path: '/drafts/nala/blocks/table/table-sticky',
      data: {
        rowsCount: 9,
        headerRowColCount: 5,
        sectionRowCount: 8,
        headerRow: [
          {
            colIndex: 4,
            heading: 'Heading Title-4',
            pricingText: 'Pricing-4',
            buttons: [
              { text: 'Free trial', type: 'outline', justifycontent: 'center' },
              { text: 'Buy now', type: 'blue', justifycontent: 'center' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 1,
            columns: [
              { colIndex: 1, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 2, text: '', imageVisible: false },
            ],
          },
          {
            rowIndex: 2,
            columns: [
              { colIndex: 1, text: 'Row-1.1, Title', imageVisible: false },
              { colIndex: 2, text: 'Content', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table @smoke @regression @milo',
    },
    {
      tcid: '3',
      name: '@Table (highlight, collapse, sticky)',
      path: '/drafts/nala/blocks/table/table-highlight-collapse-sticky',
      data: {
        rowsCount: 10,
        headerRowColCount: 5,
        sectionRowCount: 8,
        highlightRow: [
          { colIndex: 0, visibility: false, text: '' },
          { colIndex: 1, visibility: true, style: '', text: 'Highlight-2' },
          { colIndex: 2, visibility: true, style: '', text: 'Highlight-3' },
          { colIndex: 3, visibility: true, style: '', text: 'Highlight-4' },
          { colIndex: 4, visibility: false, style: '', text: '' },
        ],
        headerRow: [
          {
            colIndex: 3,
            heading: 'Heading Title-3',
            pricingText: 'Pricing-3',
            buttons: [
              { text: 'Free trial', type: 'outline', justifycontent: 'center' },
              { text: 'Buy now', type: 'blue', justifycontent: 'center' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 1,
            columns: [
              { colIndex: 1, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 2, text: '', imageVisible: false },
            ],
          },
          {
            rowIndex: 2,
            columns: [
              { colIndex: 1, text: 'Row-1.1, Title', imageVisible: false },
              { colIndex: 2, text: 'Content', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table @smoke @regression @milo',
    },
    {
      tcid: '4',
      name: '@Table (merch)',
      path: '/drafts/nala/blocks/table/table-merch',
      data: {
        rowsCount: 9,
        headerRowColCount: 3,
        sectionRowCount: 8,
        headerRow: [
          {
            colIndex: 1,
            heading: 'Heading Title-1',
            pricingText: 'Pricing-1',
            AdditionalText: 'Additional Text-1',
            imageVisible: true,
            buttons: [
              {
                text: 'Free trial',
                type: 'outline',
                justifycontent: 'flex-start',
              },
              { text: 'Buy now', type: 'blue', justifycontent: 'flex-start' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 1,
            columns: [
              { colIndex: 1, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 2, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 3, text: 'Section-1, Title', imageVisible: false },
            ],
          },
          {
            rowIndex: 2,
            columns: [
              { colIndex: 1, text: 'Section Content-1.1', imageVisible: true },
              { colIndex: 2, text: 'Section Content-1.1', imageVisible: false },
              { colIndex: 3, text: 'Section Content-1.1', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table @smoke @regression @milo',
    },
    {
      tcid: '5',
      name: '@Table (merch, highlight, sticky)',
      path: '/drafts/nala/blocks/table/table-merch-highlight-sticky1',
      data: {
        rowsCount: 10,
        highlightRowColCount: 3,
        headerRowColCount: 3,
        sectionRowCount: 8,
        highlightRow: [
          { colIndex: 0, visibility: false, text: '' },
          {
            colIndex: 1,
            visibility: true,
            style: 'background: green;',
            text: 'Highlight-2',
          },
          {
            colIndex: 2,
            visibility: true,
            style: 'background: rgb(53, 123, 235);',
            text: 'Highlight-2',
          },
        ],
        headerRow: [
          {
            colIndex: 1,
            heading: 'Heading Title-1',
            pricingText: 'Pricing-1',
            additionalText: 'Additional Text-1',
            tooltip: {
              tooltip: true,
              tooltipPosition: 'left',
              tooltipText: 'Tooltip position set to left',
            },
            buttons: [
              { text: 'Free trial', type: 'outline' },
              { text: 'Buy now', type: 'blue' },
            ],
          },
          {
            colIndex: 2,
            heading: 'Heading Title-2',
            pricingText: 'Pricing-2',
            additionalText: 'Additional Text-2',
            tooltip: {
              tooltip: true,
              tooltipPosition: 'top',
              tooltipText: 'Tooltip position set to top',
            },
            buttons: [
              {
                text: 'Free trial',
                type: 'outline',
                justifycontent: 'flex-start',
              },
              { text: 'Buy now', type: 'blue', justifycontent: 'flex-start' },
            ],
          },
          {
            colIndex: 3,
            heading: 'Heading Title-3',
            pricingText: 'Pricing-3',
            additionalText: 'Additional Text-3',
            buttons: [
              { text: 'Free trial', type: 'outline' },
              { text: 'Buy now', type: 'blue' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 1,
            columns: [
              { colIndex: 1, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 2, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 3, text: 'Section-1, Title', imageVisible: false },
            ],
          },
          {
            rowIndex: 2,
            columns: [
              { colIndex: 1, text: 'Section Content-1.1', imageVisible: true },
              { colIndex: 2, text: 'Section Content-1.1', imageVisible: false },
              { colIndex: 3, text: 'Section Content-1.1', imageVisible: false },
            ],
          },
          {
            rowIndex: 3,
            columns: [
              { colIndex: 1, text: 'Section Content-1.2', imageVisible: false },
              { colIndex: 2, text: 'Section Content-1.2', imageVisible: false },
              { colIndex: 3, text: 'Section Content-1.2', imageVisible: false },
            ],
          },
          {
            rowIndex: 4,
            columns: [
              { colIndex: 1, text: '', imageVisible: false },
              { colIndex: 2, text: '', imageVisible: false },
              { colIndex: 3, text: '', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table @smoke @regression @milo',
    },
    {
      tcid: '6',
      name: '@Table (merch, pricing-bottom)',
      path: '/drafts/nala/blocks/table/table-march-pricing-bottom',
      data: {
        rowsCount: 9,
        headerRowColCount: 3,
        sectionRowCount: 8,
        headerRow: [
          {
            colIndex: 1,
            imageVisible: true,
            heading: 'Heading Title-1',
            pricingText: 'Pricing-1',
            additionalText: 'Additional Text-1',
            buttons: [
              { text: 'Free trial', type: 'outline' },
              { text: 'Buy now', type: 'blue' },
            ],
          },
          {
            colIndex: 2,
            imageVisible: true,
            heading: 'Heading Title-2',
            pricingText: 'Pricing-2',
            additionalText: 'Additional Text-2',
            buttons: [
              { text: 'Free trial', type: 'outline' },
              { text: 'Buy now', type: 'blue' },
            ],
          },
          {
            colIndex: 3,
            imageVisible: true,
            heading: 'Heading Title-3',
            pricingText: 'Pricing-3',
            additionalText: 'Additional Text-3',
            buttons: [
              {
                text: 'Free trial',
                type: 'outline',
                justifycontent: 'flex-start',
              },
              { text: 'Buy now', type: 'blue', justifycontent: 'flex-start' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 1,
            columns: [
              { colIndex: 1, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 2, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 3, text: 'Section-1, Title', imageVisible: false },
            ],
          },
          {
            rowIndex: 2,
            columns: [
              { colIndex: 1, text: 'Section Content-1.1', imageVisible: true },
              { colIndex: 2, text: 'Section Content-1.1', imageVisible: false },
              { colIndex: 3, text: 'Section Content-1.1', imageVisible: false },
            ],
          },
          {
            rowIndex: 3,
            columns: [
              { colIndex: 1, text: 'Section Content-1.2', imageVisible: false },
              { colIndex: 2, text: 'Section Content-1.2', imageVisible: false },
              { colIndex: 3, text: 'Section Content-1.2', imageVisible: false },
            ],
          },
          {
            rowIndex: 4,
            columns: [
              { colIndex: 1, text: '', imageVisible: false },
              { colIndex: 2, text: '', imageVisible: false },
              { colIndex: 3, text: '', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table-6 @smoke @regression @milo',
    },
    {
      tcid: '7',
      name: '@Table (merch, button-right)',
      path: '/drafts/nala/blocks/table/table-merch-button-right',
      data: {
        rowsCount: 9,
        headerRowColCount: 3,
        sectionRowCount: 8,
        headerRow: [
          {
            colIndex: 1,
            imageVisible: true,
            heading: 'Heading Title-1',
            pricingText: 'Pricing-1',
            additionalText: 'Additional Text-1',
            buttons: [
              {
                text: 'Free trial',
                type: 'outline',
                justifycontent: 'flex-end',
              },
              { text: 'Buy now', type: 'blue', justifycontent: 'flex-end' },
            ],
          },
          {
            colIndex: 2,
            imageVisible: true,
            heading: 'Heading Title-2',
            pricingText: 'Pricing-2',
            additionalText: 'Additional Text-2',
            buttons: [
              { text: 'Free trial', type: 'outline' },
              { text: 'Buy now', type: 'blue' },
            ],
          },
          {
            colIndex: 3,
            imageVisible: true,
            heading: 'Heading Title-3',
            pricingText: 'Pricing-3',
            additionalText: 'Additional Text-3',
            buttons: [
              { text: 'Free trial', type: 'outline' },
              { text: 'Buy now', type: 'blue' },
            ],
          },
        ],
        sectionRows: [
          {
            rowIndex: 1,
            columns: [
              { colIndex: 1, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 2, text: 'Section-1, Title', imageVisible: false },
              { colIndex: 3, text: 'Section-1, Title', imageVisible: false },
            ],
          },
          {
            rowIndex: 2,
            columns: [
              { colIndex: 1, text: 'Section Content-1.1', imageVisible: true },
              { colIndex: 2, text: 'Section Content-1.1', imageVisible: false },
              { colIndex: 3, text: 'Section Content-1.1', imageVisible: false },
            ],
          },
          {
            rowIndex: 3,
            columns: [
              { colIndex: 1, text: 'Section Content-1.2', imageVisible: false },
              { colIndex: 2, text: 'Section Content-1.2', imageVisible: false },
              { colIndex: 3, text: 'Section Content-1.2', imageVisible: false },
            ],
          },
          {
            rowIndex: 4,
            columns: [
              { colIndex: 1, text: '', imageVisible: false },
              { colIndex: 2, text: '', imageVisible: false },
              { colIndex: 3, text: '', imageVisible: false },
            ],
          },
        ],
      },
      tags: '@table @smoke @regression @milo',
    },
  ],
};
