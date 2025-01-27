export default class Carousel {
  constructor(page) {
    this.page = page;
    // carousel types selectors
    this.carouselContainer = page.locator('.carousel.container');
    this.carouselLightbox = page.locator('.carousel.lightbox');
    this.carouselContainerShow2 = page.locator('.carousel.show-2.container');
    this.carousel = page.locator('.carousel');
    this.carouselJumpTo = page.locator('.carousel.jump-to');

    // carousel selectors
    this.slides = this.carousel.locator('.carousel-slides');
    this.activeSlide = this.slides.locator('.section.carousel-slide.active');
    this.slidesCount = this.slides.locator('.section.carousel-slide');
    this.indicator = this.carousel.locator('.carousel-indicators');
    this.indicatorCount = this.indicator.locator('.carousel-indicator');
    this.activeIndicator = this.indicator.locator('.carousel-indicator.active');
    this.nextButton = this.carousel.locator('.carousel-next');
    this.previousButton = this.carousel.locator('.carousel-previous');
    this.lightboxExpandButton = this.carouselLightbox.locator('.lightbox-button.carousel-expand');
    this.lightboxCloseButton = this.carouselLightbox.locator('.lightbox-button.carousel-close');
  }

  /**
 * Get the index of the current slide.
 * @return {Promise<number>}.
 */
  async getCurrentSlideIndex() {
    const currentIndex = await this.activeSlide.getAttribute('data-index');
    return currentIndex;
  }

  /**
 * Get the count of slides of carousel.
 * @return {Promise<number>}.
 */
  async getNumberOfSlides() {
    const numberOfSlides = await this.slidesCount.count();
    return numberOfSlides;
  }

  /**
 * Move to next slide .
 */
  async moveToNextSlide() {
    await this.nextButton.click();
  }

  /**
 * Move to previous slide .
 */
  async moveToPreviousSlide() {
    await this.previousButton.click();
  }

  /**
 * Move to nth  slide .
 */
  async moveToSlide(index) {
    await this.indicator.nth(index).click();
  }

  /**
 * Are carousel indictors are displayed.
 * @return {Promise<boolean>}.
 */
  async areIndicatorsDisplayed() {
    const isDisplayed = await this.indicator.isVisible();
    return isDisplayed;
  }

  /**
 * Get the active indictor index.
 * @return {Promise<number>}.
 */
  async getCurrentIndicatorIndex() {
    const currentIndex = await this.activeIndicator.getAttribute('tabindex');
    return currentIndex;
  }

  /**
 * Get the count of indicators of carousel.
 * @return {Promise<number>}.
 */
  async getNumberOfIndicators() {
    const numberOfIndicators = await this.indicatorCount.count();
    return numberOfIndicators;
  }

  /**
 * Move to nth slide by clicking nth indicator
 */
  async moveToIndicator(index) {
    await this.indicatorCount.nth(index).click();
  }

  /**
 * Check carousel <next> button is visible
 * @return {Promise<boolean>}.
 */
  async isNextButtonlVisible() {
    const isDisplayed = await this.nextButton.isVisible();
    return isDisplayed;
  }

  /**
 * Check carousel <previous> button is visible
 * @return {Promise<boolean>}.
 */
  async isPreviousButtonlVisible() {
    const isDisplayed = await this.previousButton.isVisible();
    return isDisplayed;
  }

  /**
 * Check carousel <lightbox expand> button is visible
 * @return {Promise<boolean>}.
 */
  async isLightboxExpandButtonVisible() {
    const isDisplayed = await this.lightboxExpandButton.isVisible();
    return isDisplayed;
  }

  /**
 * Check carousel <lightbox model close> button is visible
 * @return {Promise<boolean>}.
 */
  async isLightboxCloseButtonVisible() {
    const isDisplayed = await this.lightboxCloseButton.isVisible();
    return isDisplayed;
  }

  /**
 * Click carousel <lightbox expand> button
 */
  async expandLightboxModal() {
    await this.lightboxExpandButton.click();
  }

  /**
 * Click carousel <lightbox modal close> button
 */
  async closeLightboxModal() {
    await this.lightboxCloseButton.click();
  }

  /**
 * Gets the text content of a specified carousel slide.
 * @param {number} index - The index of the carousel slide to get the text from.
 * @param {string} tagOrClass - The tag name or class name of the element containing the text.
 * @returns {Promise<string>} The text content of the specified carousel slide.
 */
  async getSlideText(index, tagOrClass) {
    let slideSelector = `.carousel-slide:nth-child(${index}) `;
    if (tagOrClass.startsWith('.')) {
      slideSelector += tagOrClass;
    } else {
      slideSelector += `${tagOrClass}`;
    }
    await this.page.waitForSelector(slideSelector);
    const slide = await this.page.$(slideSelector);
    const text = await slide.textContent();
    return text;
  }

  /**
 * Gets the text content of a specified carousel slide.
 * @param {number} index - The index of the carousel slide to get the text from.
 * @param {string} tagOrClass - The tag name or class name of the element containing the text.
 * @param {string} expectedText - The text to be validated.
 * @returns {Promise<boolean>} .
 */
  async validateSlideText(index, tagOrClass, expectedText) {
    let slideSelector = `.carousel-slide:nth-child(${index}) `;
    if (tagOrClass.startsWith('.')) {
      slideSelector += tagOrClass;
    } else {
      slideSelector += `${tagOrClass}`;
    }
    await this.page.waitForSelector(slideSelector);
    const slide = await this.page.$(slideSelector);
    const slideText = await slide.textContent();
    if (slideText === expectedText) {
      return true;
    }
    return false;
  }

  /**
 * Check if the specified carousel type is displayed on the page.
 * @param {string} type - The type of carousel to check.
 * @return {Promise<boolean>} Returns a Promise that resolves to true or false.
 * @throws {Error} Throws an error if an invalid carousel type is provided.
 */
  async isCarouselDisplayed(type, timeout = 3000) {
    let isDisplayed;
    switch (type) {
      case 'carouselLightbox':
        await this.carouselLightbox.waitFor({ state: 'visible', timeout });
        isDisplayed = await this.carouselLightbox.isVisible();
        break;
      case 'carouselFullpage':
        await this.carouselFullpage.waitFor({ state: 'visible', timeout });
        isDisplayed = await this.carouselFullpage.isVisible();
        break;
      case 'carouselContainer':
        await this.carouselContainer.waitFor({ state: 'visible', timeout });
        isDisplayed = await this.carouselContainer.isVisible();
        break;
      case 'carouselShow-2':
        await this.carouselContainerShow2.waitFor({ state: 'visible', timeout });
        isDisplayed = await this.carouselContainerShow2.isVisible();
        break;
      case 'carousel':
        await this.carouselDefault.waitFor({ state: 'visible', timeout });
        isDisplayed = await this.carouselDefault.isVisible();
        break;
      case 'carouselJumpTo':
        await this.carouselJumpTo.waitFor({ state: 'visible', timeout });
        isDisplayed = await this.carouselJumpTo.isVisible();
        break;
      default:
        throw new Error(`Invalid carousel type: ${type}`);
    }
    return isDisplayed;
  }
}
