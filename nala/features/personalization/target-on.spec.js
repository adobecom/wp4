module.exports = {
  name: 'check for Target enablement via page metadata and via URL parameter',
  features: [
    {
      tcid: '0',
      name: '@check the default page for its default text',
      desc: 'the default page should NOT say "Target is running"',
      path: '/drafts/nala/features/personalization/target-on/target-on?mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Ftarget-on%2Fmanifest.json--default',
      data: {},
      tags: '@targeton0 @smoke @regression @milo ',
    },
    {
      tcid: '1',
      name: '@check for Target enablement via page metadata',
      desc: 'Target should be enabled by page metadata',
      path: '/drafts/nala/features/personalization/target-on/target-on',
      data: {},
      tags: '@targeton1 @smoke @regression @milo ',
    },
    {
      tcid: '2',
      name: '@check for Target enablement via URL parameter',
      desc: 'Target should be enabled by a URL parameter',
      path: '/drafts/nala/features/personalization/target-on/target-on2?target=on',
      data: {},
      tags: '@targeton2 @smoke @regression @milo ',
    },
  ],
};
