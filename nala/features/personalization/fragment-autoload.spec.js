module.exports = {
  FeatureName: 'test for automatic geo-specific fragment loading',
  features: [

    {
      tcid: '0',
      name: 'confirm the US personalized experience',
      path: '/drafts/nala/features/personalization/fragment-autoload/autofragbasepage',
      tags: '@mep @fragload0 @smoke @regression @milo',
    },

    {
      tcid: '1',
      name: 'confirm the FR personalized experience',
      path: '/fr/drafts/nala/features/personalization/fragment-autoload/autofragbasepage',
      data: {},
      tags: '@mep @fragload1 @smoke @regression @milo',
    },
  ],
};
