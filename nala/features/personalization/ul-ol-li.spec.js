module.exports = {
  name: 'Personalization Feature',
  features: [
    {
      tcid: '0',
      name: '@check ul selector',
      desc: 'Verify that ul selectors work (skipping ol selectors)',
      path: '/drafts/nala/features/personalization/ul-ol-li/ul-selector',
      data: { defaultURL: '/drafts/nala/features/personalization/ul-ol-li/ul-selector?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Ful-ol-li%2Ful-selector.json--default' },
      tags: '@ul0 @smoke @regression @milo ',
    },
    {
      tcid: '1',
      name: '@check li selectors',
      desc: 'Verify that li selectors work',
      path: '/drafts/nala/features/personalization/ul-ol-li/li-selectors',
      data: { defaultURL: '/drafts/nala/features/personalization/ul-ol-li/li-selectors?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Ful-ol-li%2Fli-selectors.json--default' },
      tags: '@ul1 @smoke @regression @milo ',
    },
  ],
};
