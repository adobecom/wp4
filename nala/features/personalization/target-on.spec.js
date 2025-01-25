module.exports = {
  name: 'check for Target enablement via page metadata and via URL parameter',
  features: [
    {
      tcid: '0',
      name: '@check for running Target tests',
      desc: 'there should be 2 running Target tests, one enabled by a URL parameter and one enabled by page metadata',
      path: '',
      data: {
        defaultURL: '/drafts/nala/features/personalization/target-on/target-on2?target=on&mep=%2Fdrafts%2Fnala%2Ffeatures%2Fpersonalization%2Ftarget-on%2Fmanifest.json--default',
        metadataURL: '/drafts/nala/features/personalization/target-on/target-on',
        parameterURL: '/drafts/nala/features/personalization/target-on/target-on2?target=on',
      },
      tags: '@targeton0 @smoke @regression @milo ',
    },
  ],
};
