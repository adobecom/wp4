/*
 * Marquee - v6.0
 */

import { decorateButtons, getBlockSize, decorateBlockBg, loadCDT } from '../../utils/decorate.js';
import { createTag, getConfig, loadStyle } from '../../utils/utils.js';

// [headingSize, bodySize, detailSize]
const blockTypeSizes = {
  marquee: {
    small: ['xl', 'm', 'm'],
    medium: ['xl', 'm', 'm'],
    large: ['xxl', 'xl', 'l'],
    xlarge: ['xxl', 'xl', 'l'],
  },
};

function decorateText(el, size) {
  const headings = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const heading = headings[headings.length - 1];
  const config = blockTypeSizes.marquee[size];
  const decorate = (headingEl, typeSize) => {
    headingEl.classList.add(`heading-${typeSize[0]}`);
    headingEl.nextElementSibling?.classList.add(`body-${typeSize[1]}`);
    const sib = headingEl.previousElementSibling;
    if (sib) {
      const className = sib.querySelector('img, .icon') ? 'icon-area' : `detail-${typeSize[2]}`;
      sib.classList.add(className);
      sib.previousElementSibling?.classList.add('icon-area');
    }
  };
  decorate(heading, config);
}

function decorateMultipleIconArea(iconArea) {
  let count = 0;
  iconArea.querySelectorAll(':scope picture').forEach((picture) => {
    count += 1;
    const src = picture.querySelector('img')?.getAttribute('src');
    const a = picture.nextElementSibling;
    if (count > 1) iconArea.setAttribute('icon-count', count);
    if (src?.endsWith('.svg') || a?.tagName !== 'A') return;
    if (!a.querySelector('img')) {
      a.innerHTML = '';
      a.className = '';
      a.appendChild(picture);
    }
  });
}

function extendButtonsClass(text) {
  const buttons = text.querySelectorAll('.con-button');
  if (buttons.length === 0) return;
  buttons.forEach((button) => { button.classList.add('button-justified-mobile'); });
}

const decorateImage = (media) => {
  media.classList.add('image');

  const imageLink = media.querySelector('a');
  const picture = media.querySelector('picture');

  if (imageLink && picture && !imageLink.parentElement.classList.contains('modal-img-link')) {
    imageLink.textContent = '';
    imageLink.append(picture);
  }
};

export async function loadMnemonicList(foreground) {
  try {
    const { base } = getConfig();
    const stylePromise = new Promise((resolve) => {
      loadStyle(`${base}/blocks/mnemonic-list/mnemonic-list.css`, resolve);
    });
    const loadModule = import('../mnemonic-list/mnemonic-list.js')
      .then(({ decorateMnemonicList }) => decorateMnemonicList(foreground));
    await Promise.all([stylePromise, loadModule]);
  } catch (err) {
    window.lana?.log(`Failed to load mnemonic list module: ${err}`);
  }
}

function decorateSplit(el, foreground, media) {
  if (foreground && media) {
    media.classList.add('bleed');
    foreground.insertAdjacentElement('beforebegin', media);
  }

  let mediaCreditInner;
  const txtContent = media?.lastChild?.textContent?.trim();
  if (txtContent?.match(/^http.*\.mp4/) || media?.lastChild?.tagName === 'VIDEO' || media.querySelector('.video-holder video')) return;
  if (txtContent) {
    mediaCreditInner = createTag('p', { class: 'body-s' }, txtContent);
  } else if (media.lastElementChild?.tagName !== 'PICTURE') {
    mediaCreditInner = media.lastElementChild;
  }

  if (mediaCreditInner) {
    const mediaCredit = createTag('div', { class: 'media-credit container' }, mediaCreditInner);
    el.appendChild(mediaCredit);
    el.classList.add('has-credit');
    media?.lastChild?.remove();
  }
}

export default async function init(el) {
  const excDark = ['light', 'quiet'];
  if (!excDark.some((s) => el.classList.contains(s))) el.classList.add('dark');
  const children = el.querySelectorAll(':scope > div');
  const foreground = children[children.length - 1];
  if (children.length > 1) {
    children[0].classList.add('background');
    decorateBlockBg(el, children[0], { useHandleFocalpoint: true });
  }
  foreground.classList.add('foreground', 'container');
  const headline = foreground.querySelector('h1, h2, h3, h4, h5, h6');
  const text = headline.closest('div');
  text.classList.add('text');
  const media = foreground.querySelector(':scope > div:not([class])');

  if (media) {
    media.classList.add('asset');
    if (!media.querySelector('video, a[href*=".mp4"]')) decorateImage(media);
  }

  const firstDivInForeground = foreground.querySelector(':scope > div');
  if (firstDivInForeground?.classList.contains('asset')) el.classList.add('row-reversed');

  const size = getBlockSize(el);
  decorateButtons(text, size === 'large' ? 'button-xl' : 'button-l');
  decorateText(text, size);
  const iconArea = text.querySelector('.icon-area');
  if (iconArea?.childElementCount > 1) decorateMultipleIconArea(iconArea);
  extendButtonsClass(text);
  if (el.classList.contains('split')) decorateSplit(el, foreground, media);

  const promiseArr = [];
  if (el.classList.contains('mnemonic-list') && foreground) {
    promiseArr.push(loadMnemonicList(foreground));
  }

  if (el.classList.contains('countdown-timer')) {
    promiseArr.push(loadCDT(text, el.classList));
  }

  await Promise.all(promiseArr);
}
