/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/*
* Aside - v5.1
*/

import { decorateBlockText, decorateIconStack, applyHoverPlay, decorateBlockBg } from '../../../utils/decorate.js';
import { createTag } from '../../../utils/utils.js';

// standard/default aside uses same text sizes as the split
const variants = ['split', 'inline', 'notification'];
const sizes = ['extra-small', 'small', 'medium', 'large'];
const [split, inline, notification] = variants;
const [xsmall, small, medium, large] = sizes;
const blockConfig = {
  [split]: ['xl', 's', 'm'],
  [inline]: ['s', 'm'],
  [notification]: {
    [xsmall]: ['m', 'm'],
    [small]: ['m', 'm'],
    [medium]: ['s', 's'],
    [large]: ['l', 'm'],
  },
};
const FORMAT_REGEX = /^format:/i;
const closeSvg = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g transform="translate(-10500 3403)">
                      <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"></circle>
                      <line y1="8" x2="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"></line>
                      <line x1="8" y1="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"></line>
                    </g>
                  </svg>`;

const linkSectionToModuleStep = (el) => el.closest('.section').classList.add('hide-on-step-start');

function editCtaToModuleClick(el) {
  el.querySelectorAll('a').forEach((cta) => {
    if (cta.href.toLowerCase().includes('#module')) {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        document.querySelector('.CTAButtons')?.click();
      });
    }
  });
}

function getBlockData(el) {
  const variant = variants.find((variantClass) => el.classList.contains(variantClass));
  const size = sizes.find((sizeClass) => el.classList.contains(sizeClass));
  const blockData = variant ? blockConfig[variant] : blockConfig[Object.keys(blockConfig)[0]];
  return variant && size && !Array.isArray(blockData) ? blockData[size] : blockData;
}

function decorateStaticLinks(el) {
  if (!el.classList.contains('notification')) return;
  el.querySelectorAll('a:not([class])').forEach((link) => { link.classList.add('static'); });
}

function decorateMedia(el) {
  if (!(el.classList.contains('medium') || el.classList.contains('large'))) return;
  const allMedia = el.querySelectorAll('div > p video, div > p picture');
  [...allMedia].some((media) => {
    const parentP = media.closest('p');
    const siblingP = parentP?.nextElementSibling;
    if (!siblingP || siblingP.nodeName !== 'P') return false;
    const siblingText = siblingP.textContent;
    if (!FORMAT_REGEX.test(siblingText)) return false;
    const formats = siblingText.split(': ')[1]?.split(/\s+/);
    if (formats) {
      const formatClasses = [];
      formatClasses.push('format');
      if (formats.length === 3) formatClasses.push(`desktop-${formats[2]}`);
      if (formats.length >= 2) formatClasses.push(`tablet-${formats[1]}`);
      formatClasses.push(`mobile-${formats[0]}`);
      media.closest('div').classList.add(...formatClasses);
    }
    siblingP.remove();
    media.closest('div').insertBefore(media, parentP);
    parentP.remove();
    return true;
  });
}

function formatPromoButton(el) {
  if (!el.classList.contains('promobar')) return;
  el.querySelectorAll('.action-area').forEach((aa) => {
    aa.querySelectorAll('.con-button').forEach((btn) => {
      btn.classList.add('button-l');
      if (!el.classList.contains('popup')) return;
      if (!btn.classList.contains('outline')) btn.classList.add('fill');
    });
  });
}

function addCloseButton(el) {
  const closeBtn = createTag('button', { class: 'promo-close', 'aria-label': 'Close' }, closeSvg);
  el.querySelector('.foreground').appendChild(closeBtn);
  closeBtn.addEventListener('click', (e) => {
    e.target.closest('.section').classList.add('close-sticky-section');
  });
}

function addPromobar(sourceEl, parent) {
  parent.appendChild(sourceEl.cloneNode(true));
}

function checkViewportPromobar(foreground) {
  const { children, childElementCount: childCount } = foreground;
  if (childCount < 2) addPromobar(children[childCount - 1], foreground);
  if (childCount < 3) addPromobar(children[childCount - 1], foreground);
}

function combineTextBocks(textBlocks, iconArea, viewPort, variant) {
  const promobarConfig = {
    default: {
      'mobile-up': ['s', 's'],
      'tablet-up': ['s', 's'],
      'desktop-up': ['m', 'l'],
    },
    popup: {
      'mobile-up': ['s', 's'],
      'tablet-up': ['l', 'm'],
      'desktop-up': ['xxl', 'xl'],
    },
  };
  const textStyle = promobarConfig[variant][viewPort];
  const contentArea = createTag('p', { class: 'content-area' });
  const textArea = createTag('p', { class: 'text-area' });
  textBlocks[0].parentElement.prepend(contentArea);
  textBlocks.forEach((textBlock) => {
    textArea.appendChild(textBlock);
    if (textBlock.nodeName === 'P') {
      textBlock.classList.add(`body-${textStyle[1]}`);
    } else {
      textBlock.classList.add(`heading-${textStyle[0]}`);
    }
  });
  if (iconArea) {
    if (iconArea.innerText?.trim()) iconArea.classList.add('detail-xs');
    iconArea.classList.add('icon-area');
    contentArea.appendChild(iconArea);
  }
  contentArea.appendChild(textArea);
}

function decoratePromobar(el) {
  const viewports = ['mobile-up', 'tablet-up', 'desktop-up'];
  const foreground = el.querySelector('.foreground');
  const variant = el.classList.contains('popup') ? 'popup' : 'default';
  if (foreground.childElementCount !== 3) checkViewportPromobar(foreground);
  [...foreground.children].forEach((child, index) => {
    child.className = viewports[index];
    child.classList.add('promo-text');
    const textBlocks = [...child.children];
    const iconArea = child.querySelector('picture')?.closest('p');
    const actionArea = child.querySelectorAll('em a, strong a, p > a strong');
    if (iconArea) textBlocks.shift();
    if (actionArea.length) textBlocks.pop();
    if (!(textBlocks.length || iconArea || actionArea.length)) child.classList.add('hide-block');
    else if (textBlocks.length) combineTextBocks(textBlocks, iconArea, viewports[index], variant);
  });
  if (variant === 'popup' || el.classList.contains('frictionless')) addCloseButton(el);
  return foreground;
}

function decorateLayout(el) {
  const elems = el.querySelectorAll(':scope > div');
  if (elems.length > 1) {
    decorateBlockBg(el, elems[0]);
  }
  const foreground = elems[elems.length - 1];
  foreground.classList.add('foreground', 'container');
  if (el.classList.contains('promobar')) return decoratePromobar(el);
  if (el.classList.contains('split')) decorateMedia(el);
  const text = foreground.querySelector('h1, h2, h3, h4, h5, h6, p')?.closest('div');
  text?.classList.add('text');
  const media = foreground.querySelector(':scope > div:not([class])');
  if (media && !el.classList.contains('notification')) {
    media.classList.add('image');
    const video = media.querySelector('video');
    if (video) applyHoverPlay(video);
  }
  const picture = text?.querySelector('p picture');
  const iconArea = picture ? (picture.closest('p') || createTag('p', null, picture)) : null;
  iconArea?.classList.add('icon-area');
  const foregroundImage = foreground.querySelector(':scope > div:not(.text) img')?.closest('div');
  const bgImage = el.querySelector(':scope > div:not(.text):not(.foreground) img')?.closest('div');
  const foregroundMedia = foreground.querySelector(':scope > div:not(.text) video, :scope > div:not(.text) a[href*=".mp4"]')?.closest('div');
  const bgMedia = el.querySelector(':scope > div:not(.text):not(.foreground) video, :scope > div:not(.text):not(.foreground) a[href*=".mp4"]')?.closest('div');
  const image = foregroundImage ?? bgImage;
  const asideMedia = foregroundMedia ?? bgMedia ?? image;
  const isSplit = el.classList.contains('split');
  const hasMedia = foregroundImage ?? foregroundMedia ?? (isSplit && asideMedia);
  if (!hasMedia) el.classList.add('no-media');
  if (asideMedia && !asideMedia.classList.contains('text')) {
    asideMedia.classList.add(`${isSplit ? 'split-' : ''}image`);
    if (isSplit) {
      const position = [...asideMedia.parentNode.children].indexOf(asideMedia);
      el.classList.add(`split${!position ? '-right' : '-left'}`);
      foreground.parentElement.appendChild(asideMedia);
    }
  } else if (!iconArea) {
    foreground?.classList.add('no-image');
  }
  if (el.classList.contains('split')
      && (el.classList.contains('medium') || el.classList.contains('large'))) {
    decorateIconStack(el);
  }
  return foreground;
}

export default function init(el) {
  el.classList.add('con-block');
  const blockData = getBlockData(el);
  const blockText = decorateLayout(el);
  decorateBlockText(blockText, blockData);
  decorateStaticLinks(el);
  formatPromoButton(el);
  if (el.classList.contains('frictionless')) {
    if (document.querySelectorAll('.CTAButtons').length) {
      linkSectionToModuleStep(el);
      editCtaToModuleClick(el);
    } else el.closest('.section').classList.add('.sticky-banner-disable');
  }
}
