import { html, useState, useEffect } from '../../deps/htm-preact.js';
import { getSwipeDistance, getSwipeDirection } from '../carousel/carousel.js';
import { createTag } from '../../utils/utils.js';
import { removeLeftToRightMark } from '../quiz/utils.js';

export const OptionCard = ({
  text, title, image, icon, iconTablet, iconDesktop, options,
  disabled, selected, background, onClick,
}) => {
  const getOptionClass = () => {
    let className = 'no-track ';
    if (icon || iconTablet || iconDesktop) className += 'has-icon ';
    if (image) className += 'has-image ';
    if (background) className += 'has-background ';
    if (disabled) className += 'disabled ';
    if (selected) className += 'selected ';
    return className;
  };

  const getIconHtml = () => html`<div class="quiz-option-icon">
    <picture>
      ${iconDesktop && html`<source media="(min-width: 1024px)" srcset="${removeLeftToRightMark(iconDesktop)}" />`}
      ${iconTablet && html`<source media="(min-width: 600px)" srcset="${removeLeftToRightMark(iconTablet)}" />`}
      <img src="${removeLeftToRightMark(icon)}" alt="" loading="lazy" />
    </picture>
  </div>`;

  const imageHtml = image ? html`<div class="quiz-option-image" style="background-image: url('${removeLeftToRightMark(image)}'); background-size: cover" loading="lazy"></div>` : null;
  const titleHtml = title ? html`<p class="quiz-option-title">${title}</p>` : null;
  const textHtml = text ? html`<p class="quiz-option-text">${text}</p>` : null;

  return html`<button class="quiz-option ${getOptionClass()}" data-option-name="${options}" 
        role="checkbox" aria-checked="${selected ? 'true' : 'false'}" disabled="${disabled}" onclick=${onClick}>
        ${(icon || iconTablet || iconDesktop) && getIconHtml()}
        ${image && imageHtml}
        <div class="quiz-option-text-container">  
          ${title && titleHtml}
          ${text && textHtml}
        </div>
    </button>`;
};

export const GetQuizOption = ({
  options, maxSelections, selectedCards,
  onOptionClick, countSelectedCards, getOptionsValue,
  background, mlInputUsed,
}) => {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [slideWidth, setSlideWidth] = useState(0);

  setVisibleCount(window.innerWidth >= 600 ? 6 : 3);

  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

  /**
 * Resets focus to the top of the quiz-entry options for accessibility.
 * To ensure that the next keyboard tab after carousel navigation
 * will focus the first avaiable quiz option.
 */
  const resetFocus = () => {
    const quiz = document.querySelector('.quiz-options-container');
    const focuser = createTag('button', { tabindex: 0 });
    quiz.prepend(focuser);
    focuser.focus();
    quiz.removeChild(focuser);
  };

  const next = async () => {
    if (index + visibleCount < options.data.length) {
      setIndex(index + 1);
      resetFocus();
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
      resetFocus();
    }
  };

  useEffect(() => {
    const slide = document.querySelector('.quiz-option');
    if (slide) {
      setSlideWidth(slide.offsetWidth);
    }
  }, [options, slideWidth, setSlideWidth]);

  useEffect(() => {
    const handleResize = () => setVisibleCount(window.innerWidth >= 600 ? 6 : 3);
    const el = document.querySelector('.quiz-options-container');

    window.addEventListener('resize', handleResize);

    const swipe = { xMin: 50 };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      swipe.xStart = touch.screenX;
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];
      swipe.xEnd = touch.screenX;
    };

    const handleTouchEnd = () => {
      const swipeDistance = {};
      swipeDistance.xDistance = getSwipeDistance(swipe.xStart, swipe.xEnd);
      const direction = getSwipeDirection(swipe, swipeDistance);

      swipe.xStart = 0;
      swipe.xEnd = 0;

      if (swipeDistance.xDistance > swipe.xMin) {
        if (direction === 'left') {
          next();
        } else if (direction === 'right') {
          prev();
        }
      }
    };

    el.addEventListener('touchstart', handleTouchStart);
    el.addEventListener('touchmove', handleTouchMove);
    el.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('resize', handleResize);

      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchmove', handleTouchMove);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, visibleCount, options.data.length]);

  const handleKey = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (isRTL) {
        prev();
      } else {
        next();
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (isRTL) {
        next();
      } else {
        prev();
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (e.target && e.target.click) {
        e.target.click();
      }
    }
  };

  return html`
  <div class="quiz-options-container" role="group" aria-labelledby="question" tabindex="0" onkeydown=${handleKey}>
    ${index > 0 && html`<button onClick=${prev} class="carousel-arrow arrow-prev ${isRTL ? 'rtl' : ''}" aria-label="Previous"></button>`}
    <div class="carousel-slides ${index > 0 ? 'align-right' : ''}">
      ${options.data.slice(index + 1, index + visibleCount).map((option, idx) => html`
        <${OptionCard} 
          key=${idx}
          text=${option.text}
          title=${option.title} 
          icon=${getOptionsValue(option.options, 'icon')}
          iconTablet=${getOptionsValue(option.options, 'icon-tablet')}
          iconDesktop=${getOptionsValue(option.options, 'icon-desktop')}
          image=${getOptionsValue(option.options, 'image')}
          background=${background}
          options=${option.options}
          selected=${selectedCards[option.options] ? 'selected' : ''}
          disabled=${(countSelectedCards > 0 && !selectedCards[option.options] && countSelectedCards >= maxSelections) || mlInputUsed ? 'disabled' : ''}
          onClick=${onOptionClick(option)}
          />`)}
    </div>
    ${(index + visibleCount < options.data.length) && html`<button onClick=${next} class="carousel-arrow arrow-next ${isRTL ? 'rtl' : ''}" aria-label="Next"></button>`}
  </div>`;
};
