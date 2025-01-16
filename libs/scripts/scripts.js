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
  loadArea,
  loadLana,
  setConfig,
  getMetadata,
} from '../utils/utils.js';
import locales from '../utils/locales.js';

// Production Domain
const prodDomains = ['milo.adobe.com', 'business.adobe.com', 'www.adobe.com'];

const stageDomainsMap = {
  'www.stage.adobe.com': {
    'www.adobe.com': 'origin',
    'helpx.adobe.com': 'helpx.stage.adobe.com',
  },
  '--bacom--adobecom.hlx.live': {
    'business.adobe.com': 'origin',
    'news.adobe.com': 'main--news--adobecom.hlx.live',
  },
  '--blog--adobecom.hlx.page': {
    'blog.adobe.com': 'origin',
    'business.adobe.com': 'main--bacom--adobecom.hlx.page',
  },
  '.business-graybox.adobe.com': { 'business.adobe.com': 'origin' },
  '^https://.*--milo--.*.(hlx|aem).page': {
    '^https://www.adobe.com/acrobat': 'https://main--dc--adobecom.hlx.page',
    '^https://business.adobe.com(?!/blog)': 'https://business.stage.adobe.com',
    '^https://business.adobe.com/blog': 'https://main--bacom-blog--adobecom.hlx.page',
    '^https://www.adobe.com': 'origin',
  },
};

const config = {
  geoRouting: 'on',
  fallbackRouting: 'on',
  links: 'on',
  imsClientId: 'milo',
  codeRoot: '/libs',
  locales,
  prodDomains,
  stageDomainsMap,
  jarvis: {
    id: 'milo',
    version: '1.0',
    onDemand: false,
  },
  privacyId: '7a5eb705-95ed-4cc4-a11d-0cc5760e93db', // valid for *.adobe.com
  breadcrumbs: 'on',
  // taxonomyRoot: '/your-path-here',
};

const eagerLoad = (img) => {
  img?.setAttribute('loading', 'eager');
  img?.setAttribute('fetchpriority', 'high');
};

(async function loadLCPImage() {
  const firstDiv = document.querySelector('body > main > div:nth-child(1) > div');
  if (firstDiv?.classList.contains('marquee')) {
    firstDiv.querySelectorAll('img').forEach(eagerLoad);
  } else {
    eagerLoad(document.querySelector('img'));
  }
}());

(async function loadPage() {
  if (getMetadata('template') === '404') window.SAMPLE_PAGEVIEWS_AT_RATE = 'high';
  performance.mark('loadpage');
  setConfig(config);
  loadLana({ clientId: 'milo' });
  await loadArea();
}());
