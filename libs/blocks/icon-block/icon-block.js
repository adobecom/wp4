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
* Icon Block - v5.1
*/

import { decorateBlockText, getBlockSize } from '../../utils/decorate.js';

const variants = ['fullwidth', 'vertical', 'centered', 'bio'];
const iconBlocks = {
  small: {
    [variants[0]]: ['M', 'M'],
    [variants[1]]: ['S', 'M'],
    [variants[2]]: ['S', 'M'],
    [variants[3]]: ['S', 'S'],
  },
  medium: {
    [variants[0]]: ['L', 'M'],
    [variants[1]]: ['M', 'M'],
    [variants[2]]: ['M', 'M'],
    [variants[3]]: ['S', 'S'],
  },
  large: {
    [variants[0]]: ['XL', 'M'],
    [variants[1]]: ['M', 'M'],
    [variants[2]]: ['M', 'M'],
    [variants[3]]: ['S', 'S'],
  },
};

function decorateContent(el) {
  const block = el.querySelector(':scope > div:not([class])');
  block.classList.add('foreground');
  if (!block) return;
  const text = block.querySelector('h1, h2, h3, h4, h5, h6, p')?.closest('div');
  if (text) {
    text.classList.add('text-content');
    const image = block.querySelector(':scope img');
    if (image) image.closest('p').classList.add('icon-area');
    const size = getBlockSize(el, 2);
    const variant = [...variants].filter((v) => el.classList.contains(v))?.[0] ?? 'fullwidth';
    decorateBlockText(el, iconBlocks[size][variant]);
  }
}

export default function init(el) {
  if (el.classList.contains('intro')) el.classList.add('con-block', 'xxxl-spacing-top', 'intro-spacing-bottom');
  decorateContent(el);
}
