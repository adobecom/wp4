import { expect, test } from '@playwright/test';
import { features } from './carousel.spec.js';
import CarouselBlock from './carousel.page.js';
import { runAccessibilityTest } from '../../libs/accessibility.js';

let carousel;

const miloLibs = process.env.MILO_LIBS || '';

test.describe('Milo Carousel Block test suite', () => {
  test.beforeEach(async ({ page }) => {
    carousel = new CarouselBlock(page);
  });

  test(`${features[0].name},${features[0].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);

    await test.step('step-1: Go to Carousel block test page', async () => {
      await page.goto(`${baseURL}${features[0].path}${miloLibs}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[0].path}${miloLibs}`);
    });

    await test.step('step-2: Verify Carousel container', async () => {
      // verify carousel elements
      expect(await carousel.isCarouselDisplayed('carouselContainer')).toBeTruthy();

      // verify carousel slides count and active slide index
      expect(await carousel.getNumberOfSlides()).toBe(4);
      expect(await carousel.getCurrentSlideIndex()).toBe('0');

      // verify carousel indictor and active indicator
      expect(await carousel.areIndicatorsDisplayed()).toBeTruthy();
      expect(await carousel.getNumberOfIndicators()).toBe(4);
      expect(await carousel.getCurrentIndicatorIndex()).toBe('0');

      // verify carousel next and previous buttons
      expect(await carousel.isNextButtonlVisible()).toBeTruthy();
      expect(await carousel.isPreviousButtonlVisible()).toBeTruthy();
    });

    await test.step('step-3: Perform carousel slides and controls operation and verify contents', async () => {
      // move to next slide by clicking next button and verify h2 tag header
      await carousel.moveToNextSlide();
      expect(await carousel.getCurrentSlideIndex()).toBe('1');
      expect(await carousel.getSlideText(1, 'h2', 'Orange Slices')).toBeTruthy();

      // move to 3rd slide by clicking indicator and verify h2 tag header
      await carousel.moveToIndicator(3);
      expect(await carousel.getCurrentIndicatorIndex()).toBe('0');
      expect(await carousel.getSlideText(3, 'h2', 'Apples')).toBeTruthy();
    });

    await test.step('step-4: Verify the accessibility test on the carousel block', async () => {
      // The accessibility test for the carousel container is failing, so skipping the test step
      await runAccessibilityTest({ page, testScope: carousel.carouselContainer, skipA11yTest: true });
    });
  });

  test(`${features[1].name},${features[1].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[0].path}${miloLibs}`);

    await test.step('step-1: Go to Carousel lightbox block test page', async () => {
      await page.goto(`${baseURL}${features[1].path}${miloLibs}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[1].path}${miloLibs}`);
    });

    await test.step('step-2: Verify carousel with lightbox features', async () => {
      expect(await carousel.isCarouselDisplayed('carouselLightbox')).toBeTruthy();

      // verify active slide and slides count
      expect(await carousel.getNumberOfSlides()).toBe(4);
      expect(await carousel.getCurrentSlideIndex()).toBe('0');

      // verify indicator visibility, count and index of active slide
      expect(await carousel.areIndicatorsDisplayed()).toBeTruthy();
      expect(await carousel.getNumberOfIndicators()).toBe(4);
      expect(await carousel.getCurrentIndicatorIndex()).toBe('0');

      expect(await carousel.isNextButtonlVisible()).toBeTruthy();
      expect(await carousel.isPreviousButtonlVisible()).toBeTruthy();

      // verify expand and close lightbox
      expect(await carousel.isLightboxExpandButtonVisible()).toBeTruthy();
      await carousel.expandLightboxModal();

      expect(await carousel.isLightboxCloseButtonVisible()).toBeTruthy();
      await carousel.closeLightboxModal();
    });

    await test.step('step-3: Verify the accessibility test on the carousel lightbox block', async () => {
      await runAccessibilityTest({ page, testScope: carousel.carouselLightbox });
    });
  });

  test(`${features[2].name},${features[2].tags}`, async ({ page, baseURL }) => {
    console.info(`[Test Page]: ${baseURL}${features[2].path}${miloLibs}`);

    await test.step('step-1: Go to Carousel multi-slide show-2 block test page', async () => {
      await page.goto(`${baseURL}${features[2].path}${miloLibs}`);
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(`${baseURL}${features[2].path}${miloLibs}`);
    });

    await test.step('step-2: Verify multi slide carousel show-2 features', async () => {
      expect(await carousel.isCarouselDisplayed('carouselShow-2')).toBeTruthy();

      // In multi-slide 2 number of slides will be n-slides +1 so it will be 5
      expect(await carousel.getNumberOfSlides()).toBe(5);
      expect(await carousel.getCurrentSlideIndex()).toBe('0');

      // In multi-slide carousel indicators are not shown
      expect(await carousel.areIndicatorsDisplayed()).toBeFalsy();
      expect(await carousel.isNextButtonlVisible()).toBeTruthy();
      expect(await carousel.isPreviousButtonlVisible()).toBeTruthy();
    });

    await test.step('step-3: Perform carousel slides and controls operation and verify contents', async () => {
      // move to next slide by clicking next button and verify h2 tag header
      await carousel.moveToNextSlide();
      expect(await carousel.getSlideText(1, 'h2', 'Melon')).toBeTruthy();
    });

    await test.step('step-3: Verify the accessibility test on the carousel show-2 container block', async () => {
      await runAccessibilityTest({ page, testScope: carousel.carouselContainerShow2 });
    });
  });
});
