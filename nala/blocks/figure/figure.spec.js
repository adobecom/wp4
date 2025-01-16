module.exports = {
  FeatureName: 'Figure Block',
  features: [
    {
      tcid: '0',
      name: '@Image with caption',
      path: '/drafts/nala/blocks/figure/image-with-caption',
      data: { figCaption: '100 Orange Captions' },
      tags: '@figure @smoke @regression @milo',
    },
    {
      tcid: '1',
      name: '@Multiple images with caption',
      path: '/drafts/nala/blocks/figure/multiple-images-with-captions',
      data: {
        figBlockCount: 2,
        figCaption_1: 'Adobe Logo',
        figCaption_2: 'Adobe Products',
      },
      tags: '@figure @figure-with-mulitple-images @smoke @regression @milo',
    },
  ],
};
