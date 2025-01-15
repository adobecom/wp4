export default class Tabs {
  constructor(page, nth = 0) {
    this.page = page;
    // tabs locators
    this.tab = this.page.locator('.tabs').nth(nth);
    this.xlTab = this.page.locator('.tabs.xl-spacing').nth(nth);
    this.queitDarkTab = this.page.locator('.tabs.quiet.dark.center').nth(nth);
    // tabs list
    this.tabList = this.tab.locator('.tabList');
    this.tabListContainer = this.tabList.locator('.tab-list-container');
    this.tabsCount = this.tabListContainer.locator('button[role="tab"]');
    this.tab1 = this.tabListContainer.locator('button[role="tab"]').nth(0);
    this.tab2 = this.tabListContainer.locator('button[role="tab"]').nth(1);
    this.tab3 = this.tabListContainer.locator('button[role="tab"]').nth(2);
    this.tab9 = this.tabListContainer.locator('button[role="tab"]:nth-child(9)');
    // tabs panel and content
    this.tabContent = this.tab.locator('.tab-content > .tab-content-container');
    this.tab1Panel = this.tabContent.locator('div[role="tabpanel"]:nth-child(1)');
    this.tab2Panel = this.tabContent.locator('div[role="tabpanel"]:nth-child(2)');
    this.tab3Panel = this.tabContent.locator('div[role="tabpanel"]:nth-child(3)');
    this.tab9Panel = this.tabContent.locator('div[role="tabpanel"]:nth-child(9)');

    this.leftArrow = this.tab.locator('.paddle-left');
    this.rightArrow = this.tab.locator('.paddle-right');
  }
}
