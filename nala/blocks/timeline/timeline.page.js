export default class TimelineBlock {
  constructor(page, nth = 0) {
    this.page = page;
    // timeline locators

    this.timelineBlock = page.locator('.timeline').nth(nth);

    this.heading1 = this.timelineBlock.locator('h3').nth(0);
    this.heading2 = this.timelineBlock.locator('h3').nth(1);
    this.heading3 = this.timelineBlock.locator('h3').nth(2);
    this.text1 = this.timelineBlock.locator('h3+p').nth(0);
    this.text2 = this.timelineBlock.locator('h3+p').nth(1);
    this.text3 = this.timelineBlock.locator('h3+p').nth(2);
    this.banner1 = this.timelineBlock.locator('.period.body-s').nth(0);
    this.banner2 = this.timelineBlock.locator('.period.body-s').nth(1);

    this.bar1 = page.locator('.bar').nth(0);
    this.bar2 = page.locator('.bar').nth(1);
    this.bar3 = page.locator('.bar').nth(2);
  }
}
