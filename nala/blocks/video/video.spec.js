module.exports = {
  FeatureName: 'Video Block',
  features: [
    {
      tcid: '0',
      name: '@Video Default',
      path: '/drafts/nala/blocks/video/default-video',
      data: { h2Text: 'Default video' },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '1',
      name: '@Video autoplay loop',
      path: '/drafts/nala/blocks/video/video-autoplay-loop',
      data: { h2Text: 'Autoplay enabled video' },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '2',
      name: '@Video autoplay loop once',
      path: '/drafts/nala/blocks/video/autoplay-loop-once',
      data: { h2Text: 'Autoplay once enabled video' },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '3',
      name: '@Video hover play',
      path: '/drafts/nala/blocks/video/video-hover-play',
      data: { h2Text: 'Hover play enabled video (combined with #_autoplay1 for feature to work)' },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '4',
      name: '@MPC Video',
      path: '/drafts/nala/blocks/video/mpc-video',
      data: {
        h1Title: '1856730_Summit_2021_Marquee_1440x1028_v1.0.mp4',
        iframeTitle: 'Adobe Video Publishing Cloud Player',
        source: 'https://video.tv.adobe.com/v/332632',
      },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '5',
      name: '@MPC Video Autoplay Looping',
      path: '/drafts/nala/blocks/video/mpc-video-autoplay-looping',
      data: {
        iframeTitle: 'Adobe Video Publishing Cloud Player',
        source: 'https://video.tv.adobe.com/v/332632?autoplay=true&end=replay',
      },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '6',
      name: '@Youtube Video ',
      path: '/drafts/nala/blocks/video/youtube-video',
      data: {
        h1Text: 'YouTube video',
        playLabel: 'Adobe MAX Keynote 2022',
        source: 'https://www.youtube.com/embed/OfQKEzgPaBA?',
        videoId: 'OfQKEzgPaBA',
      },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '7',
      name: '@Fragment Modal video inline',
      path: '/drafts/nala/blocks/video/fragments-modal-video-autoplay',
      data:
      { source: 'https://main--milo--adobecom.aem.live/libs/media_1e798d01c6ddc7e7eadc8f134d69e4f8d7193fdbb.mp4' },
      tags: '@video @smoke @regression @milo',
    },
    {
      tcid: '8',
      name: '@Modal video with cards',
      path: '/drafts/nala/blocks/video/modal-video-with-cards',
      data: {
        cardsCount: 3,
        source: 'https://milo.adobe.com/libs/media_1e798d01c6ddc7e7eadc8f134d69e4f8d7193fdbb.mp4',
      },
      tags: '@video @smoke @regression @milo',
    },
  ],
};
