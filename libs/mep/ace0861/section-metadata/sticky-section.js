import { createTag } from '../../../utils/utils.js';
import { getMetadata, getDelayTime } from './section-metadata.js';
import { getGnavHeight } from '../../../blocks/global-navigation/utilities/utilities.js';

function handleTopHeight(section) {
  const topHeight = getGnavHeight();
  section.style.top = `${topHeight}px`;
}

function promoIntersectObserve(el, stickySectionEl, options = {}) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (el.classList.contains('close-sticky-section')) {
        window.removeEventListener('resize', handleTopHeight);
        observer.unobserve(entry.target);
        return;
      }
      const isPromoStart = entry.target === stickySectionEl;
      const abovePromoStart = (isPromoStart && entry.isIntersecting)
        || stickySectionEl?.getBoundingClientRect().y > 0;
      if (entry.isIntersecting || abovePromoStart) el.classList.add('hide-sticky-section');
      else el.classList.remove('hide-sticky-section');
    });
  }, options);
  return io;
}

function handleStickyPromobar(section, delay) {
  const main = document.querySelector('main');
  section.classList.add('promo-sticky-section', 'hide-sticky-section');
  if (section.querySelector('.promobar.popup')) section.classList.add('popup');
  let stickySectionEl = null;
  let hasScrollControl;
  if ((section.querySelector('.promobar').classList.contains('no-delay')) || (delay && section.classList.contains('popup'))) {
    hasScrollControl = true;
  }
  if (!hasScrollControl && main.children[0] !== section) {
    stickySectionEl = createTag('div', { class: 'section show-sticky-section' });
    section.parentElement.insertBefore(stickySectionEl, section);
  }
  const io = promoIntersectObserve(section, stickySectionEl);
  if (stickySectionEl) io.observe(stickySectionEl);
  io.observe(document.querySelector('footer'));
}

export default async function handleStickySection(sticky, section) {
  const main = document.querySelector('main');
  switch (sticky) {
    case 'sticky-top': {
      const { debounce } = await import('../../../utils/action.js');
      window.addEventListener('resize', debounce(() => handleTopHeight(section)));
      main.prepend(section);
      break;
    }
    case 'sticky-bottom': {
      if (section.querySelector('.promobar')) {
        const metadata = getMetadata(section.querySelector('.section-metadata'));
        const delay = getDelayTime(metadata.delay?.text);
        if (delay) setTimeout(() => { handleStickyPromobar(section, delay); }, delay);
        else handleStickyPromobar(section, delay);
      }
      main.append(section);
      break;
    }
    default:
      break;
  }
}
