export default [
  {
    variants: {
      'target-smb': {
        commands: [
          {
            action: 'replacecontent',
            selector: 'main>div:nth-of-type(1)',
            pageFilter: '',
            target: 'https://main--homepage--adobecom.hlx.page/homepage/fragments/loggedout/personalization/marquees/apro-twp-abandon',
          },
        ],
      },
    },
    variantNames: [
      'target-smb',
    ],
    manifestType: 'test or promo',
    manifestOverrideName: '',
    selectedVariantName: 'target-smb',
    selectedVariant: {
      commands: [
        {
          action: 'replacecontent',
          selector: '.marquee',
          pageFilter: '',
          target: '/mep/ace0763/marquee',
        },
      ],
      replacefragment: [
        {
          selector: '/drafts/vgoodrich/fragments/highlight-replace-fragment/original-fragment',
          val: '/fragments/fragmentreplaced',
        },
      ],
      useblockcode: [
        {
          selector: 'marquee',
          val: '/mep/ace0763/marquee',
        },
      ],
      updatemetadata: [
        {
          selector: 'gnav-source',
          val: '/mep/ace0763/gnav',
        },
      ],
    },
    manifest: 'https://main--cc--homepage.hlx.page/homepage/fragments/mep/selected-example.json',
    manifestUrl: 'https://main--milo--adobecom.hlx.page/drafts/vgoodrich/fragments/unit-tests/manifest.json',
  },
  {
    variants: {
      'target-smb': {
        commands: [
          {
            action: 'replacecontent',
            selector: 'main>div:nth-of-type(1)',
            pageFilter: '',
            target: 'https://main--homepage--adobecom.hlx.page/homepage/fragments/loggedout/personalization/marquees/apro-twp-abandon',
          },
        ],
      },
    },
    variantNames: [
      'target-smb',
    ],
    manifestType: 'personalization',
    manifestOverrideName: 'hp',
    selectedVariantName: 'default',
    selectedVariant: 'default',
    manifest: 'https://main--homepage--adobecom.hlx.live/homepage/fragments/mep/default-selected.json',
    manifestUrl: 'https://main--homepage--adobecom.hlx.live/homepage/fragments/mep/default-selected.json',
  },
  {
    variants: {
      all: {
        commands: [],
        replacefragment: [
          {
            selector: '/cc-shared/fragments/merch/products/photoshop/segment-blade/business/default',
            val: '/promos/2023/global/black-friday/fragments/products/photoshop/segment-card-business',
          },
        ],
      },
    },
    variantNames: [
      'all',
    ],
    manifestType: 'test or promo',
    manifestOverrideName: '2023-black-friday-global',
    run: true,
    selectedVariantName: 'all',
    selectedVariant: {
      commands: [],
      replacefragment: [
        {
          selector: '/cc-shared/fragments/merch/products/photoshop/segment-blade/business/default',
          val: '/promos/2023/global/black-friday/fragments/products/photoshop/segment-card-business',
        },
      ],
    },
    manifest: 'https://main--cc--adobecom.hlx.page/promos/2023/global/black-friday/black-friday-global.json',
    manifestUrl: 'https://main--cc--adobecom.hlx.page/promos/2023/global/black-friday/black-friday-global.json',
    disabled: false,
    event: {
      name: 'black-friday-global',
      start: new Date('2023-11-10T00:00:00.000Z'),
      end: new Date('2024-11-24T00:00:00.000Z'),
    },
  },
  {
    disabled: true,
    event: {
      name: 'cyber-monday-emea',
      start: new Date('2024-11-24T00:00:00.000Z'),
      end: new Date('2024-11-24T00:00:00.000Z'),
    },
    manifest: 'https://main--cc--adobecom.hlx.page/promos/2023/emea/cyber-monday/cyber-monday-emea.json',
    variantNames: [
      'all',
    ],
    selectedVariantName: 'default',
    selectedVariant: { commands: [] },
  },
];
