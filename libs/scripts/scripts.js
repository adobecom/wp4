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

import {
  decorateArea,
  decorateNavs,
  loadLCP,
  loadArea,
  loadDelayed,
  loadStyle,
  loadTemplate,
  setConfig,
} from '../utils/utils.js';

const config = {
  imsClientId: 'milo',
  projectRoot: `${window.location.origin}/libs`,
};

async function loadPage() {
  setConfig(config);
  const blocks = decorateArea();
  const navs = decorateNavs();
  await loadLCP({ blocks });
  loadStyle('/fonts/fonts.css');
  await loadArea({ blocks: [...navs, ...blocks] });
  const { default: loadModals } = await import('../blocks/modals/modals.js');
  loadModals();
  await loadTemplate();
  loadDelayed();
}
await loadPage();
