module.exports = {
  name: 'PR 2976 -- all elements',
  features: [
    {
      tcid: '0',
      name: '@insert before and after fragments',
      desc: 'insertBefore and insertAfter should work with fragment selectors',
      path: '/drafts/nala/features/personalization/all-elements/all-elements',
      data: { defaultURL: '/drafts/nala/features/personalization/all-elements/all-elements?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Fall-elements%2Fall-elements.json--default' },
      tags: '@all-elements0 @smoke @regression @milo ',
    },
    {
      tcid: '1',
      name: '@verify the #_all feature',
      desc: 'The #_all flag should change all matching elements',
      path: '/drafts/nala/features/personalization/all-elements/all-elements2',
      data: { defaultURL: '/drafts/nala/features/personalization/all-elements/all-elements2?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Fall-elements%2Fall-elements2.json--default' },
      tags: '@all-elements1 @smoke @regression @milo ',
    },
    {
      tcid: '2',
      name: '@verify the #_include-fragments flag',
      desc: 'the #_include-fragments flag should search within fragments',
      path: '/drafts/nala/features/personalization/all-elements/all-elements3',
      data: { defaultURL: '/drafts/nala/features/personalization/all-elements/all-elements3?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Fall-elements%2Fall-elements3.json--default' },
      tags: '@all-elements2 @smoke @regression @milo ',
    },
  ],
};
