module.exports = {
  name: 'MEP actions: Allow HTML',
  features: [
    {
      tcid: '0',
      name: '@check default page -- allow HTML update',
      desc: 'check default page',
      path: '/drafts/nala/features/personalization/allowhtml/allowhtml?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Fallowhtml%2Fallowhtml.json--default',
      data: {},
      tags: '@pzn @allowhtml0 @smoke @regression @milo',
    },
    {
      tcid: '1',
      name: '@check personalized page -- allow HTML update -- check text boxes and marquees',
      desc: 'Various fixes from PR 2683: allow HTML as a replacement value; allow text as a replacement value, add #_href locator',
      path: '/drafts/nala/features/personalization/allowhtml/allowhtml',
      data: {},
      tags: '@pzn @allowhtml1 @smoke @regression @milo',
    },
  ],
};
