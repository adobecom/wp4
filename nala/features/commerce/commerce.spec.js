module.exports = {
  name: 'Commerce',
  features: [
    {
      tcid: '0',
      name: '@Commerce-Price-Term',
      path: '/drafts/nala/features/commerce/prices-with-term',
      tags: '@commerce @smoke @regression',
    },
    {
      tcid: '1',
      name: '@Commerce-Price-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit',
      tags: '@commerce @smoke @regression',

    },
    {
      tcid: '2',
      name: '@Commerce-Price-Taxlabel-Unit-Term',
      path: '/drafts/nala/features/commerce/prices-with-term-unit-taxlabel',
      tags: '@commerce @smoke @regression',
    },
    {
      tcid: '3',
      name: '@Commerce-Promo',
      path: '/drafts/nala/features/commerce/promo-placeholders',
      data: {
        promo: 'UMRM2MUSPr501YOC',
        workflow: 'recommendation',
      },
      tags: '@commerce @smoke @regression',
    },
    {
      tcid: '4',
      name: '@Commerce-Upgrade-Entitlement',
      path: '/drafts/nala/features/commerce/checkout-links',
      data: { UpgradeCTATitle: 'Upgrade now' },
      tags: '@commerce @entitlement @smoke @regression @nopr',
    },
    {
      tcid: '5',
      name: '@Commerce-Download-Entitlement',
      path: '/drafts/nala/features/commerce/checkout-links',
      data: {
        DownloadCTATitle: 'Download',
        TrialCTATitle: 'Free trial',
        DownloadUrl: 'download/photoshop',
      },
      tags: '@commerce @entitlement @smoke @regression @nopr',
    },
    {
      tcid: '6',
      name: '@Commerce-KitchenSink-Smoke',
      path: '/docs/library/kitchen-sink/merch-card',
      tags: '@commerce @kitchensink @smoke @regression',
    },
    {
      tcid: '7',
      name: '@Commerce-DE',
      path: '/de/drafts/nala/features/commerce/promo-placeholders',
      data: {
        promo: 'PEMAP50AASTE2',
        CO: 'co=DE',
        lang: 'lang=de',
        workflow: 'recommendation',
      },
      tags: '@commerce @smoke @regression',
    },
    {
      tcid: '8',
      name: '@Commerce-Old-Promo',
      path: '/drafts/nala/features/commerce/promo-old-price',
      data: { promo: 'UMRM2MUSPr501YOC' },
      tags: '@commerce @smoke @regression',
    },
    {
      tcid: '9',
      name: '@Commerce-GB',
      path: '/uk/drafts/nala/features/commerce/promo-placeholders',
      data: {
        promo: 'UPWORK_CCSN_A23',
        CO: 'co=GB',
        lang: 'lang=en',
        workflow: 'recommendation',
      },
      tags: '@commerce @smoke @regression',
    },
  ],
};
