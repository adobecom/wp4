import { readFile, sendKeys } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

const { default: init, getSwipeDirection, getSwipeDistance } = await import('../../../libs/blocks/carousel/carousel.js');
document.body.innerHTML = await readFile({ path: './mocks/body.html' });

describe('Carousel', () => {
  it('Carousel exsists', () => {
    const carousel = document.body.querySelector('.carousel');
    init(carousel);
    expect(carousel).to.exist;
  });

  it('Carousel has slides', () => {
    const slides = document.body.querySelectorAll('.carousel-slide');
    const activeSlide = slides[0].classList.contains('active');
    const slideIndicators = document.body.querySelectorAll('.carousel-indicator');
    const activeIndicator = slideIndicators[0].classList.contains('active');
    expect(slides).to.exist;
    expect(activeSlide).to.be.true;
    expect(slideIndicators).to.exist;
    expect(activeIndicator).to.be.true;
  });

  it('Carousel has navigation buttons', () => {
    const nextButton = document.body.querySelector('.carousel-next');
    const previousButton = document.body.querySelector('.carousel-previous');
    const slideIndicators = document.body.querySelectorAll('.carousel-indicator');
    expect(nextButton).to.exist;
    expect(previousButton).to.exist;
    expect(slideIndicators).to.exist;
  });

  it('Clicks on next and previoius slide buttons', () => {
    const nextButton = document.body.querySelector('.carousel-next');
    const previousButton = document.body.querySelector('.carousel-previous');
    const slides = document.body.querySelectorAll('.carousel-slide');
    const slideIndicators = document.body.querySelectorAll('.carousel-indicator');

    nextButton.click();
    let activeSlide = slides[1].classList.contains('active');
    let activeIndicator = slideIndicators[1].classList.contains('active');
    expect(activeSlide).to.be.true;
    expect(activeIndicator).to.be.true;

    previousButton.click();
    activeSlide = slides[0].classList.contains('active');
    activeIndicator = slideIndicators[0].classList.contains('active');
    expect(activeSlide).to.be.true;
    expect(activeIndicator).to.be.true;
  });

  it('Keyboard navigation to go to next and previous slide', async () => {
    const carouselContainer = document.body.querySelector('.carousel');
    carouselContainer.classList.add('show-2');
    const nextButton = document.body.querySelector('.carousel-next');
    const previousButton = document.body.querySelector('.carousel-next');
    const slides = document.body.querySelectorAll('.carousel-slide');
    const slideIndicators = document.body.querySelectorAll('.carousel-indicator');

    nextButton.focus();
    await sendKeys({ press: 'ArrowRight' });
    let activeSlide = slides[1].classList.contains('active');
    let activeIndicator = slideIndicators[1].classList.contains('active');
    expect(activeSlide).to.be.true;
    expect(activeIndicator).to.be.true;

    previousButton.focus();
    await sendKeys({ press: 'ArrowLeft' });
    activeSlide = slides[0].classList.contains('active');
    activeIndicator = slideIndicators[0].classList.contains('active');
    expect(activeSlide).to.be.true;
    expect(activeIndicator).to.be.true;
  });

  it('Carousel lightbox is enabled, lightbox open and close buttons clicked', async () => {
    const el = document.body.querySelector('.carousel');
    const lightboxEnabled = el.classList.contains('lightbox');
    const lightboxButton = el.querySelector('.carousel-expand');
    expect(lightboxEnabled).to.be.true;
    expect(lightboxButton).to.exist;

    // Click carousel-expand icon and open lightbox
    lightboxButton.click();
    let lightboxActive = el.classList.contains('lightbox-active');
    let curtain = el.querySelector('.carousel-curtain');
    expect(lightboxActive).to.be.true;
    expect(curtain).to.exist;

    // Click carousel-close icon and close lightbox
    const lightboxCloseButton = el.querySelector('.carousel-close');
    lightboxCloseButton.click();
    lightboxActive = el.classList.contains('lightbox-active');
    curtain = el.querySelector('.carousel-curtain');
    expect(lightboxActive).to.be.false;
    expect(curtain).to.not.exist;
  });

  it('Close lightbox by clicking on curtain', async () => {
    const el = document.body.querySelector('.carousel');
    const lightboxEnabled = el.classList.contains('lightbox');
    const lightboxButton = el.querySelector('.carousel-expand');
    expect(lightboxEnabled).to.be.true;
    expect(lightboxButton).to.exist;

    // Activate/open lightbox
    lightboxButton.click();
    let lightboxActive = el.classList.contains('lightbox-active');
    let curtain = el.querySelector('.carousel-curtain');
    expect(lightboxActive).to.be.true;
    expect(curtain).to.exist;

    // Close lightbox by clicking on curtain
    curtain.click();
    lightboxActive = el.classList.contains('lightbox-active');
    curtain = el.querySelector('.carousel-curtain');
    expect(lightboxActive).to.be.false;
    expect(curtain).to.not.exist;
  });

  it('Clicks on a carousel-indicator', () => {
    const el = document.body.querySelector('.carousel');
    const jumpToEnabled = el.classList.contains('jump-to');
    expect(jumpToEnabled).to.be.true;

    const unselectedInicator = document.body.querySelector('.jump-to .carousel-indicators li[tabindex="-1"]');
    const indicatorDot = document.body.querySelectorAll('.jump-to .carousel-indicator');
    const firstIndicator = indicatorDot[0];
    const lastIndicator = indicatorDot[indicatorDot.length - 1];
    let jumpToIndex;

    unselectedInicator.click();
    expect(unselectedInicator.classList.contains('active')).to.be.true;

    firstIndicator.click();
    jumpToIndex = Number(indicatorDot[0].dataset.index);
    expect(jumpToIndex).to.equal(Number(0));

    lastIndicator.click();
    jumpToIndex = Number(lastIndicator.dataset.index);
    expect(jumpToIndex).to.equal(Number(indicatorDot.length - 1));
  });

  it('Mobile swipe distance and direction capture', () => {
    const swipeDistance = {};
    const swipe = { xMin: 50, xStart: 2402, xEnd: 2284 };
    const swipeRight = { xMin: 50, xStart: 2284, xEnd: 2402 };
    swipeDistance.xDistance = getSwipeDistance(swipe.xStart, swipe.xEnd);
    const swipeDirection = getSwipeDirection(swipe, swipeDistance);
    const swipeRightDirection = getSwipeDirection(swipeRight, swipeDistance);
    expect(swipeDirection).to.equal('left');
    expect(swipeRightDirection).to.equal('right');
    expect(swipeDistance.xDistance).to.be.greaterThan(50);
  });

  it('Mobile swipe distance end is zero', () => {
    const swipeDistance = {};
    const swipe = { xMin: 50, xStart: 2402, xEnd: 0 };
    swipeDistance.xDistance = getSwipeDistance(swipe.xStart, swipe.xEnd);
    expect(swipeDistance.xDistance).to.equal(0);
  });
});
