import { createTag, getConfig, MILO_EVENTS } from '../../utils/utils.js';
import { decorateAnchorVideo, syncPausePlayIcon } from '../../utils/decorate.js';

const { miloLibs, codeRoot } = getConfig();
const base = miloLibs || codeRoot;

const ARROW_NEXT_IMG = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
<title>Next slide arrow</title>
<path d="M19.2214 10.8918C19.3516 10.5773 19.3516 10.2226 19.2214 9.90808C19.1562 9.75098 19.0621 9.60895 18.9435 9.49041L12.9241 3.47092C12.4226 2.96819 11.6076 2.96819 11.1061 3.47092C10.604 3.97239 10.604 4.78743 11.1061 5.2889L14.9312 9.11399H2.4314C1.72109 9.11399 1.146 9.69036 1.146 10.4C1.146 11.1097 1.72109 11.6861 2.4314 11.6861H14.9312L11.1061 15.5112C10.604 16.0126 10.604 16.8277 11.1061 17.3291C11.3568 17.5805 11.6863 17.7062 12.0151 17.7062C12.3439 17.7062 12.6733 17.5805 12.9241 17.3291L18.9436 11.3097C19.0622 11.1911 19.1562 11.0491 19.2214 10.8918Z"/>
</svg>`;

const ARROW_PREVIOUS_IMG = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21">
<title>Previous slide arrow</title>
<path d="M19.2214 10.8918C19.3516 10.5773 19.3516 10.2226 19.2214 9.90808C19.1562 9.75098 19.0621 9.60895 18.9435 9.49041L12.9241 3.47092C12.4226 2.96819 11.6076 2.96819 11.1061 3.47092C10.604 3.97239 10.604 4.78743 11.1061 5.2889L14.9312 9.11399H2.4314C1.72109 9.11399 1.146 9.69036 1.146 10.4C1.146 11.1097 1.72109 11.6861 2.4314 11.6861H14.9312L11.1061 15.5112C10.604 16.0126 10.604 16.8277 11.1061 17.3291C11.3568 17.5805 11.6863 17.7062 12.0151 17.7062C12.3439 17.7062 12.6733 17.5805 12.9241 17.3291L18.9436 11.3097C19.0622 11.1911 19.1562 11.0491 19.2214 10.8918Z"/>
</svg>`;
const LIGHTBOX_ICON = `<img class="expand-icon" alt="Expand carousel to full screen" src="${base}/blocks/carousel/img/expand.svg" height="14" width="20">`;
const CLOSE_ICON = `<img class="expand-icon" alt="Expand carousel to full screen" src="${base}/blocks/carousel/img/close.svg" height="20" width="20">`;

const KEY_CODES = {
  SPACE: 'Space',
  END: 'End',
  HOME: 'Home',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
};

function decorateNextPreviousBtns() {
  const previousBtn = createTag(
    'button',
    {
      class: 'carousel-button carousel-previous is-delayed',
      'aria-label': 'Previous slide',
      'data-toggle': 'previous',
    },
    ARROW_PREVIOUS_IMG,
  );

  const nextBtn = createTag(
    'button',
    {
      class: 'carousel-button carousel-next is-delayed',
      'aria-label': 'Next slide',
      'data-toggle': 'next',
    },
    ARROW_NEXT_IMG,
  );
  return [previousBtn, nextBtn];
}

function decorateLightboxButtons() {
  const expandBtn = createTag(
    'button',
    {
      class: 'lightbox-button carousel-expand is-delayed',
      'aria-label': 'Open in full screen',
    },
    LIGHTBOX_ICON,
  );
  const closeBtn = createTag(
    'button',
    {
      class: 'lightbox-button carousel-close is-delayed',
      'aria-label': 'Close full screen carousel',
    },
    CLOSE_ICON,
  );
  return [expandBtn, closeBtn];
}

function decorateSlideIndicators(slides, jumpTo) {
  const indicatorDots = [];

  for (let i = 0; i < slides.length; i += 1) {
    const li = createTag('li', {
      class: 'carousel-indicator',
      'data-index': i,
    });

    if (jumpTo) {
      li.setAttribute('role', 'tab');
      li.setAttribute('tabindex', -1);
      li.setAttribute('aria-selected', false);
      li.setAttribute('aria-labelledby', `Viewing Slide ${i + 1}`);
    }

    // Set inital active state
    if (i === 0) {
      li.classList.add('active');
      if (jumpTo) li.setAttribute('tabindex', 0);
    }
    indicatorDots.push(li);
  }
  return indicatorDots;
}

function handleNext(nextElement, elements) {
  if (nextElement.nextElementSibling) {
    return nextElement.nextElementSibling;
  }
  return elements[0];
}

function handlePrevious(previousElment, elements) {
  if (previousElment.previousElementSibling) {
    return previousElment.previousElementSibling;
  }
  return elements[elements.length - 1];
}

function handleLightboxButtons(lightboxBtns, el, slideWrapper) {
  const curtain = createTag('div', { class: 'carousel-curtain' });

  [...lightboxBtns].forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      if (button.classList.contains('carousel-expand')) {
        el.classList.add('lightbox-active');
        slideWrapper.append(curtain);
      }

      if (button.classList.contains('carousel-close')) {
        el.classList.remove('lightbox-active');
        curtain.remove();
      }
    }, true);
  });

  // Handle click outside of Carousel
  curtain.addEventListener('click', (event) => {
    event.preventDefault();
    el.classList.remove('lightbox-active');
    curtain.remove();
  }, true);
}

function jumpToDirection(activeSlideIndex, jumpToIndex, slideContainer) {
  if (activeSlideIndex < jumpToIndex) {
    slideContainer.classList.remove('is-reversing');
  } else {
    slideContainer.classList.add('is-reversing');
  }
}

function checkSlideForVideo(activeSlide) {
  const video = activeSlide.querySelector('video');
  /* c8 ignore start */
  if (video?.played.length > 0 && !video?.paused) {
    video.pause();
    syncPausePlayIcon(video);
  }
  /* c8 ignore end */
}

// Sets a muliplyer variable, used by CSS, to move the indicator dots.
function setIndicatorMultiplyer(carouselElements, activeSlideIndicator, event) {
  const { slides, direction } = carouselElements;
  const maxViewableIndicators = 6;
  if (slides.length <= maxViewableIndicators) return;

  const { currentTarget, key } = event;
  const eventDirection = currentTarget.dataset.toggle || direction;
  const keyNavDirection = key === KEY_CODES.ARROW_RIGHT || undefined;
  const multiplyerOffset = (eventDirection === 'next' || eventDirection === 'left')
    || keyNavDirection ? 4 : 3;
  const activeSlideIndex = Number(activeSlideIndicator.dataset.index);
  if (activeSlideIndex > multiplyerOffset && activeSlideIndex <= slides.length) {
    /*
      * Stop adding to the multiplyer if it equals the difference
      * between the slides length and maxViewableIndicators
    */
    const multiplyer = activeSlideIndex - multiplyerOffset >= slides.length - maxViewableIndicators
      ? slides.length - maxViewableIndicators
      : activeSlideIndex - multiplyerOffset;
    activeSlideIndicator.parentElement.classList.add('move-indicators');
    activeSlideIndicator.parentElement.style = `--indicator-multiplyer: ${multiplyer}`;
  } else {
    const multiplyer = 0;
    activeSlideIndicator.parentElement.style = `--indicator-multiplyer: ${multiplyer}`;
  }
}

function moveSlides(event, carouselElements, jumpToIndex) {
  const {
    slideContainer,
    slides,
    nextPreviousBtns,
    slideIndicators,
    controlsContainer,
    direction,
    jumpTo,
  } = carouselElements;

  let referenceSlide = slideContainer.querySelector('.reference-slide');
  let activeSlide = slideContainer.querySelector('.active');
  let activeSlideIndicator = controlsContainer.querySelector('.active');
  const activeSlideIndex = activeSlideIndicator.dataset.index;

  checkSlideForVideo(activeSlide);

  // Track reference slide - last slide initially
  if (!referenceSlide) {
    referenceSlide = slides[slides.length - 1];
    referenceSlide.classList.add('reference-slide');
    referenceSlide.style.order = '1';
  }

  // Remove class/attributes after being tracked
  referenceSlide.classList.remove('reference-slide');
  referenceSlide.style.order = null;
  activeSlide.classList.remove('active');
  activeSlide.querySelectorAll('a, video').forEach((focusableElement) => focusableElement.setAttribute('tabindex', -1));
  activeSlideIndicator.classList.remove('active');
  if (jumpTo) activeSlideIndicator.setAttribute('tabindex', -1);

  /*
   * If indicator dot buttons are clicked update:
   * reference slide, active indicator dot, and active slide
  */
  if (jumpToIndex >= 0) {
    if (jumpToIndex === 0) {
      referenceSlide = slides[slides.length - 1];
    } else if (jumpToIndex === slides.length - 1) {
      referenceSlide = slides[slides.length - 2];
    } else {
      referenceSlide = slides[jumpToIndex - 1];
    }
    referenceSlide.classList.add('reference-slide');
    referenceSlide.style.order = '1';
    activeSlideIndicator = slideIndicators[jumpToIndex];
    activeSlide = slides[jumpToIndex];
    jumpToDirection(activeSlideIndex, jumpToIndex, slideContainer);
  }

  // Next arrow button, swipe, keyboard navigation
  if ((event.currentTarget).dataset.toggle === 'next'
    || event.key === KEY_CODES.ARROW_RIGHT
    || (direction === 'left' && event.type === 'touchend')) {
    nextPreviousBtns[1].focus();
    referenceSlide = handleNext(referenceSlide, slides);
    activeSlideIndicator = handleNext(activeSlideIndicator, slideIndicators);
    activeSlide = handleNext(activeSlide, slides);
    slideContainer?.classList.remove('is-reversing');
  }

  // Previous arrow button, swipe, keyboard navigation
  if ((event.currentTarget).dataset.toggle === 'previous'
    || event.key === KEY_CODES.ARROW_LEFT
    || (direction === 'right' && event.type === 'touchend')) {
    nextPreviousBtns[0].focus();
    referenceSlide = handlePrevious(referenceSlide, slides);
    activeSlideIndicator = handlePrevious(activeSlideIndicator, slideIndicators);
    activeSlide = handlePrevious(activeSlide, slides);
    slideContainer.classList.add('is-reversing');
  }

  // Update reference slide attributes
  referenceSlide.classList.add('reference-slide');
  referenceSlide.style.order = '1';

  // Update active slide and indicator dot attributes
  activeSlide.classList.add('active');
  const indexOfActive = [...activeSlide.parentElement.children]
    .findIndex((ele) => activeSlide.isSameNode(ele));
  const IndexOfShowClass = [...carouselElements.el.classList].findIndex((ele) => ele.includes('show-'));
  const tempSlides = [...slides.slice(indexOfActive), ...slides.slice(0, indexOfActive)];
  if (IndexOfShowClass >= 0) {
    const show = parseInt(carouselElements.el.classList[IndexOfShowClass].split('-')[1], 10);
    tempSlides.forEach((slide, index) => {
      let tabIndex = -1;
      if (index < show) {
        tabIndex = 0;
      }
      slide.querySelectorAll('a,:not(.video-container, .pause-play-wrapper) > video')
        .forEach((focusableElement) => { focusableElement.setAttribute('tabindex', tabIndex); });
    });
  } else {
    activeSlide.querySelectorAll('a,:not(.video-container, .pause-play-wrapper) > video')
      .forEach((focusableElement) => { focusableElement.setAttribute('tabindex', 0); });
  }
  activeSlideIndicator.classList.add('active');
  if (jumpTo) activeSlideIndicator.setAttribute('tabindex', 0);
  setIndicatorMultiplyer(carouselElements, activeSlideIndicator, event);

  // Loop over all slide siblings to update their order
  for (let i = 2; i <= slides.length; i += 1) {
    referenceSlide = handleNext(referenceSlide, slides);
    referenceSlide.style.order = i;
  }

  /*
   * Activates slide animation.
   * Delay time matches animation time for next/previous controls.
   * JumpToInidex uses a shorter delay that better supports
   * non-linear slide navigation.
  */
  const slideDelay = 25;
  slideContainer.classList.remove('is-ready');
  return setTimeout(() => slideContainer.classList.add('is-ready'), slideDelay);
}

export function getSwipeDistance(start, end) {
  if (end === 0) {
    const updateStart = 0;
    return Math.abs(updateStart - end);
  }
  return Math.abs(start - end);
}

export function getSwipeDirection(swipe, swipeDistance) {
  const { xDistance } = swipeDistance;

  if (xDistance !== swipe.xStart && xDistance > swipe.xMin) {
    return (swipe.xEnd > swipe.xStart) ? 'right' : 'left';
  }
  return undefined;
}

/**
  * Mobile swipe/touch direction detection
  */
function mobileSwipeDetect(carouselElements) {
  const { el } = carouselElements;
  const swipe = { xMin: 50 };
  /* c8 ignore start */
  el.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    swipe.xStart = touch.screenX;
  });

  el.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    swipe.xEnd = touch.screenX;
  });

  el.addEventListener('touchend', (event) => {
    const swipeDistance = {};
    swipeDistance.xDistance = getSwipeDistance(swipe.xStart, swipe.xEnd);
    carouselElements.direction = getSwipeDirection(swipe, swipeDistance);

    // reset end swipe values
    swipe.xStart = 0;
    swipe.xEnd = 0;

    if (swipeDistance.xDistance > swipe.xMin) {
      moveSlides(event, carouselElements);
    }
  });
  /* c8 ignore end */
}

function handleChangingSlides(carouselElements) {
  const { el, nextPreviousBtns, slideIndicators, jumpTo } = carouselElements;

  // Handle Next/Previous Buttons
  [...nextPreviousBtns].forEach((btn) => {
    btn.addEventListener('click', (event) => {
      moveSlides(event, carouselElements);
    });
  });

  // Handle keyboard navigation
  el.addEventListener('keydown', (event) => {
    if (event.key === KEY_CODES.ARROW_RIGHT
      || event.key === KEY_CODES.ARROW_LEFT) { moveSlides(event, carouselElements); }
  });

  // Handle slide indictors click
  if (jumpTo) {
    [...slideIndicators].forEach((li) => {
      li.addEventListener('click', (event) => {
        const jumpToIndex = Number(li.dataset.index);
        moveSlides(event, carouselElements, jumpToIndex);
      });
    });
  }

  // Swipe Events
  mobileSwipeDetect(carouselElements);
}

function convertMpcMp4(slides) {
  slides.forEach((slide) => {
    const a = slide.querySelector('a');
    if (a?.href.includes('images-tv.adobe')) {
      decorateAnchorVideo({
        src: a.href,
        anchorTag: a,
      });
    }
  });
}

function readySlides(slides, slideContainer) {
  slideContainer.classList.add('is-ready');
  slides.forEach((slide, idx) => {
    // Set last slide to be first in order and make reference.
    if (slides.length - 1 === idx) {
      slide.style.order = 1;
      slide.classList.add('reference-slide');
    } else {
      slide.style.order = idx + 2;
    }
  });
}

export default function init(el) {
  const carouselSection = el.closest('.section');
  if (!carouselSection) return;

  const keyDivs = el.querySelectorAll(':scope > div > div:first-child');
  const carouselName = keyDivs[0].textContent;
  const parentArea = el.closest('.fragment') || document;
  const candidateKeys = parentArea.querySelectorAll('div.section-metadata > div > div:first-child');
  const slides = [...candidateKeys].reduce((rdx, key) => {
    if (key.textContent === 'carousel' && key.nextElementSibling.textContent === carouselName) {
      const slide = key.closest('.section');
      slide.classList.add('carousel-slide');
      rdx.push(slide);
      slide.setAttribute('data-index', rdx.indexOf(slide));
    }
    return rdx;
  }, []);

  const jumpTo = el.classList.contains('jump-to');
  const fragment = new DocumentFragment();
  const nextPreviousBtns = decorateNextPreviousBtns();
  const nextPreviousContainer = createTag('div', { class: 'carousel-button-container' });
  const slideIndicators = decorateSlideIndicators(slides, jumpTo);
  const controlsContainer = createTag('div', { class: 'carousel-controls is-delayed' });

  convertMpcMp4(slides);
  fragment.append(...slides);
  const slideWrapper = createTag('div', { class: 'carousel-wrapper' });
  const slideContainer = createTag('div', { class: 'carousel-slides' }, fragment);
  const carouselElements = {
    el,
    nextPreviousBtns,
    slideContainer,
    slides,
    slideIndicators,
    controlsContainer,
    direction: undefined,
    jumpTo,
  };

  if (el.classList.contains('lightbox')) {
    const lightboxBtns = decorateLightboxButtons();
    slideWrapper.append(slideContainer, ...lightboxBtns);
    handleLightboxButtons(lightboxBtns, el, slideWrapper);
  } else {
    slideWrapper.append(slideContainer);
  }
  /*
   * Hinting center variant - Set slides order
   * before moveSlides is called for centering to work.
  */
  if (el.classList.contains('hinting-center-mobile')) {
    readySlides(slides, slideContainer);
  }

  el.textContent = '';
  el.append(slideWrapper);

  const dotsUl = createTag('ul', { class: 'carousel-indicators' });
  if (jumpTo) {
    dotsUl.setAttribute('role', 'tablist');
    dotsUl.setAttribute('tabindex', 0);
  }

  dotsUl.append(...slideIndicators);
  controlsContainer.append(dotsUl);
  nextPreviousContainer.append(...nextPreviousBtns, controlsContainer);
  el.append(nextPreviousContainer);

  function handleDeferredImages() {
    const images = el.querySelectorAll('img[loading="lazy"]');
    images.forEach((img) => {
      img.removeAttribute('loading');
    });
    parentArea.removeEventListener(MILO_EVENTS.DEFERRED, handleDeferredImages, true);
  }
  parentArea.addEventListener(MILO_EVENTS.DEFERRED, handleDeferredImages, true);

  slides[0].classList.add('active');
  const IndexOfShowClass = [...el.classList].findIndex((ele) => ele.includes('show-'));
  let NoOfVisibleSlides = 1;
  if (IndexOfShowClass >= 0) {
    NoOfVisibleSlides = parseInt(el.classList[IndexOfShowClass].split('-')[1], 10);
  }
  slides.slice(NoOfVisibleSlides).forEach((slide) => slide.querySelectorAll('a').forEach((focusableElement) => { focusableElement.setAttribute('tabindex', -1); }));
  handleChangingSlides(carouselElements);

  function handleLateLoadingNavigation() {
    [...el.querySelectorAll('.is-delayed')].forEach((item) => item.classList.remove('is-delayed'));
    parentArea.removeEventListener(MILO_EVENTS.DEFERRED, handleLateLoadingNavigation, true);
  }

  parentArea.addEventListener(MILO_EVENTS.DEFERRED, handleLateLoadingNavigation, true);
}
