module.exports = {
  FeatureName: 'Tabs Block',
  features: [
    {
      tcid: '0',
      name: '@Tabs (xl-spacing)',
      path: '/drafts/nala/blocks/tabs/tabs-xl-spacing',
      data: {
        tabsCount: 3,
        activeTab: 2,
        tab1Text: 'Here is tab 1 content',
        tab2Text: 'Here is tab 2 content and it is active tab',
        tab3Text: 'Here is tab 3 content',
      },
      tags: '@tabs @smoke @regression @milo @t1',
    },
    {
      tcid: '1',
      name: '@Tabs (Quiet, Dark, Center)',
      path: '/drafts/nala/blocks/tabs/tabs-quiet-dark-center',
      data: {
        tabsCount: 3,
        activeTab: 2,
        tab1Text: 'Here is tab 1 content',
        tab2Text: 'Here is tab 2 content and it is active tab',
        tab3Text: 'Here is tab 3 content',
      },
      tags: '@tabs @smoke @t1 @regression @milo',
    },
    {
      tcid: '2',
      name: 'Tabs scrolling',
      path: '/drafts/nala/blocks/tabs/tabs-scrolling',
      tags: '@tabs @tabs-scrolling @smoke @regression @milo @bacom',
    },
    {
      tcid: '3',
      name: 'Tabs linked to pages',
      path: '/drafts/nala/blocks/tabs/linked-tabs/tabs-page-1',
      tags: '@tabs @tabs-linked @smoke @regression @milo',
    },
  ],
};
