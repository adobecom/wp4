/* media - consonant v6 */

import {
  decorateBlockBg,
  decorateBlockText,
  getBlockSize,
  decorateTextOverrides,
  applyHoverPlay,
  loadCDT,
} from '../../utils/decorate.js';
import { createTag, loadStyle, getConfig } from '../../utils/utils.js';

const blockTypeSizes = {
  small: ['xs', 's', 'm'],
  medium: ['m', 's', 'm'],
  'medium-compact': ['xl', 'm', 'l'],
  large: ['xl', 'm', 'l'],
  xlarge: ['xxl', 'm', 'l'],
};

function decorateAvatar(el) {
  // is the first row a picture only
  const childElements = el.children[0]?.children;
  if (childElements.length !== 1) return;
  [...childElements].forEach((e, i) => {
    if (e.localName !== null && e.localName === 'picture') childElements[i].classList.add('avatar');
  });
}

function decorateQr(el) {
  const text = el.querySelector('.text');
  if (!text) return;
  const appStore = text.children[(text.children.length - 1)]?.querySelector('a');
  const googlePlay = text.children[(text.children.length - 2)]?.querySelector('a');
  const qrImage = text.children[(text.children.length - 3)];
  if (!qrImage || !appStore || !googlePlay) return;
  [appStore, googlePlay].forEach(({ parentElement }) => {
    parentElement.classList.add('qr-button-container');
  });
  qrImage.classList.add('qr-code-img');
  appStore.classList.add('app-store');
  appStore.textContent = '';
  appStore.setAttribute('aria-label', 'Apple App Store');
  googlePlay.classList.add('google-play');
  googlePlay.textContent = '';
  googlePlay.setAttribute('aria-label', 'Google Play Store');
}

export default async function init(el) {
  if (el.className.includes('rounded-corners')) {
    const { miloLibs, codeRoot } = getConfig();
    const base = miloLibs || codeRoot;
    loadStyle(`${base}/styles/rounded-corners.css`);
  }
  el.classList.add('con-block');
  let rows = el.querySelectorAll(':scope > div');
  if (rows.length > 1) {
    el.classList.add('has-bg');
    const [head, ...tail] = rows;
    decorateBlockBg(el, head);
    rows = tail;
  }
  let blockType = null;
  const types = ['merch', 'qr-code'];
  [...types].forEach((type) => {
    if (!el.classList.contains(type)) return;
    blockType = type;
  });
  const size = getBlockSize(el);
  const container = createTag('div', { class: 'container foreground' });

  rows.forEach((row) => {
    row.classList.add('media-row');
    const header = row.querySelector('h1, h2, h3, h4, h5, h6');
    if (header) {
      const text = header.closest('div');
      text.classList.add('text');
      decorateAvatar(text);
      decorateBlockText(text, blockTypeSizes[size], blockType);
    }
    const image = row.querySelector(':scope > div:not([class])');
    image?.classList.add('image');
    const imageVideo = image?.querySelector('video');
    if (imageVideo) applyHoverPlay(imageVideo);

    // subcopy
    const actionArea = row.querySelector('p.action-area');
    if (actionArea?.nextElementSibling?.tagName === 'P') {
      actionArea.nextElementSibling.className = 'subcopy';
    }

    // subcopy with links
    if (actionArea?.nextElementSibling?.tagName === 'H3') {
      actionArea.nextElementSibling.classList.remove('heading-m', 'body-xl');
      actionArea.nextElementSibling.classList.add('heading-xs');
      const links = row.querySelectorAll('h3.heading-xs ~ p.body-s a, h3.heading-xs ~ p.icon-area a');
      links.forEach((link) => {
        link.parentElement.className = 'subcopy-link';
        link.className = 'body-xxs';
      });
    }
    const lastActionArea = el.querySelector('.action-area:last-of-type');
    if (lastActionArea) {
      const div = createTag('div', { class: 'cta-container' });
      lastActionArea.insertAdjacentElement('afterend', div);
      if (lastActionArea.previousElementSibling.className.includes('icon-stack-area')) {
        div.append(lastActionArea.previousElementSibling);
      }
      div.append(lastActionArea);
    }
    container.append(row);
  });

  if (blockType === 'qr-code') decorateQr(container);
  el.append(container);
  const mediaRowReversed = el.querySelector(':scope > .foreground > .media-row > div').classList.contains('text');
  if (mediaRowReversed) el.classList.add('media-reverse-mobile');
  decorateTextOverrides(el);

  if (el.classList.contains('countdown-timer')) {
    const textBlock = container.querySelector('.text');
    if (textBlock) await loadCDT(textBlock, el.classList);
  }
}
