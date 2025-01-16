/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const loading = document.getElementById('loading');
const STATUS_LEVELS = ['level-0', 'level-4'];
const MAX_RETRIES = 5;
let urlInfo;

export function createTag(name, attrs) {
  const el = document.createElement(name);
  if (typeof attrs === 'object') {
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  }
  return el;
}

export function getPathFromUrl(url) {
  return new URL(url).pathname;
}

export function setStatus(msg, level = 'level-4') {
  const status = document.getElementById('status');
  status.classList.remove(STATUS_LEVELS.filter((l) => l !== level));
  status.classList.add(level);
  status.innerHTML = msg;
}

export function loadingON(txt) {
  loading.classList.remove('hidden');
  setStatus(txt);
}

export function loadingOFF() {
  loading.classList.add('hidden');
}

export function stripExtension(path) {
  return path.substring(0, path.lastIndexOf('.'));
}

export function getDocPathFromUrl(url) {
  let path = getPathFromUrl(url);
  if (!path) {
    return undefined;
  }
  if (path.endsWith('.json')) return path.replace(/\.json$/, '.xlsx');
  if (path.endsWith('/')) {
    path += 'index';
  } else if (path.endsWith('.html')) {
    path = path.slice(0, -5);
  }
  return `${path}.docx`;
}

export function getUrlInfo() {
  if (urlInfo) {
    return urlInfo;
  }
  const location = new URL(document.location.href);
  function getParam(name) {
    return location.searchParams.get(name);
  }
  const projectName = getParam('project');
  const sub = projectName ? projectName.split('--') : [];

  const sp = getParam('referrer');
  const owner = getParam('owner') || sub[1];
  const repo = getParam('repo') || sub[0];
  const ref = getParam('ref') || 'main';

  urlInfo = {
    sp,
    owner,
    repo,
    ref,
    origin: `https://${ref}--${repo}--${owner}.hlx.page`, // TODO ADD HLX5 SUPPORT
    isValid() {
      return sp && owner && repo && ref;
    },
  };
  return urlInfo;
}

export async function simulatePreview(path, retryAttempt = 1, isFloodgate, fgColor) {
  const previewStatus = { success: true, path };
  try {
    getUrlInfo();
    const repo = isFloodgate ? `${urlInfo.repo}-${fgColor}` : urlInfo.repo;
    const previewUrl = `https://admin.hlx.page/preview/${urlInfo.owner}/${repo}/${urlInfo.ref}${path}`;
    const response = await fetch(
      `${previewUrl}`,
      { method: 'POST' },
    );
    if (!response.ok && retryAttempt <= MAX_RETRIES) {
      await simulatePreview(path, retryAttempt + 1, isFloodgate, fgColor);
    }
    previewStatus.responseJson = await response.json();
  } catch (error) {
    previewStatus.success = false;
  }
  return previewStatus;
}

export function getAnchorHtml(url, text) {
  return `<a href="${url}" target="_new">${text}</a>`;
}

function getLinkedPagePath(spShareUrl, pagePath) {
  return getAnchorHtml(spShareUrl.replace('<relativePath>', pagePath), pagePath);
}

export function getLinkOrDisplayText(spViewUrl, docStatus) {
  const pathOrMsg = docStatus.msg;
  return docStatus.hasSourceFile ? getLinkedPagePath(spViewUrl, pathOrMsg) : pathOrMsg;
}

export function showButtons(buttonIds) {
  buttonIds.forEach((buttonId) => {
    document.getElementById(buttonId).classList.remove('hidden');
  });
}

export function hideButtons(buttonIds) {
  buttonIds.forEach((buttonId) => {
    document.getElementById(buttonId).classList.add('hidden');
  });
}

export async function fetchProjectFile(url, retryAttempt) {
  const response = await fetch(url);
  if (!response.ok && retryAttempt <= MAX_RETRIES) {
    await fetchProjectFile(url, retryAttempt + 1);
  }
  return response;
}
