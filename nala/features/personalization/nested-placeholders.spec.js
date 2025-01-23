module.exports = {
  name: 'Personalization Feature',
  features: [
    {
      tcid: '0',
      name: '@check nested placeholders',
      desc: 'Verify that nested placeholders work',
      path: '/drafts/nala/features/personalization/nested-placeholder/',
      data: { defaultURL: '/drafts/nala/features/personalization/nested-placeholder/?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Fnested-placeholder%2Fmanifest.json--default---%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Fnested-placeholder%2Fmanifest2.json--all' },
      tags: '@placeholder0 @smoke @regression @milo ',
    },
  ],
};
