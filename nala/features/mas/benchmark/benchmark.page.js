export default class BenchmarkPage {
  constructor(page) {
    this.page = page;
  }

  getBenchmark(containerSelector) {
    return this.page.locator(`${containerSelector}`);
  }

  getMasks(containerSelector) {
    return this.page.locator(`${containerSelector} .benchmark-mask`);
  }
}
