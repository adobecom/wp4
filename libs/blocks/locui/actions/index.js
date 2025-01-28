/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import {
  heading,
  urls,
  languages,
  allowSyncToLangstore,
  allowSendForLoc,
  allowRollout,
  syncFragments,
  allowCancelProject,
  projectStatus,
  polling,
} from '../utils/state.js';
import { setExcelStatus, setStatus } from '../utils/status.js';
import { origin, preview } from '../utils/franklin.js';
import { createTag, decorateSections, decorateFooterPromo } from '../../../utils/utils.js';
import { getUrls, validateUrlsFormat, getLangstorePrefix, removeLangstorePrefix } from '../loc/index.js';
import updateExcelTable from '../../../tools/sharepoint/excel.js';
import { getItemId } from '../../../tools/sharepoint/shared.js';
import {
  createProject,
  startSync,
  startProject,
  getServiceUpdates,
  rolloutLang,
} from '../utils/miloc.js';
import { signal } from '../../../deps/htm-preact.js';
import Modal from './modal.js';
import { isUrl } from '../utils/url.js';

export const showRolloutOptions = signal(false);

async function updateExcelJson() {
  return new Promise((resolve) => {
    let count = 1;
    const excelUpdated = setInterval(async () => {
      setStatus('excel', 'info', `Refreshing project. Try #${count}`);
      const previewResp = await preview(`${heading.value.path}.json`);
      const resp = await fetch(previewResp.preview.url);
      const json = await resp.json();
      count += 1;
      if (count > 10 || json.urls.data.length === urls.value.length) {
        clearInterval(excelUpdated);
        setStatus('excel', 'info', 'Excel refreshed.', null, 1500);
        resolve();
      }
    }, 1000);
  });
}

async function fetchDocument(hlxPath) {
  const path = `${origin}${hlxPath}`;
  try {
    const resp = await fetch(path);
    if (!resp.ok) return null;
    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc;
  } catch (error) {
    setStatus('service', 'error', `${error.message} Fragment`, `There was an issue fetching ${path}`, 10000);
    return null;
  }
}

function findMetaFragments(doc) {
  let fragments = [];
  const metas = doc.getElementsByTagName('meta');
  if (metas.length) {
    fragments = [...metas]
      .filter((meta) => {
        const content = meta.getAttribute('content');
        const isOGUrl = meta.getAttribute('property') === 'og:url';
        return content?.includes('/fragments/') && isUrl(content) && !isOGUrl;
      })
      .map((meta) => new URL(meta.getAttribute('content')));
  }
  return fragments;
}

function findMatchingUrl(url) {
  return !urls.value.some((existing) => removeLangstorePrefix(existing.pathname) === url.pathname);
}

function removeDuplicateUrls(urlObjects) {
  const uniqueUrls = [];
  const filteredUrls = urlObjects.filter((url) => findMatchingUrl(url));
  filteredUrls.forEach((url) => {
    if (!uniqueUrls.some((unique) => unique.pathname === url.pathname)) {
      uniqueUrls.push(url);
    }
  });
  return uniqueUrls;
}

async function findPageFragments(path) {
  const page = path.split('/').pop();
  const isIndex = page === 'index' ? path.lastIndexOf('index') : 0;
  const hlxPath = isIndex > 0 ? path.substring(0, isIndex) : path;
  const doc = await fetchDocument(hlxPath);
  if (!doc) return undefined;
  // Decorate the doc, but don't load any blocks (i.e. do not use loadArea)
  decorateSections(doc, true);
  await decorateFooterPromo(doc);
  const fragments = [...doc.querySelectorAll('.fragment, .modal.link-block')];
  let fragmentUrls = fragments.reduce((acc, fragment) => {
    // Normalize the fragment path to support production urls.
    const originalUrl = fragment.dataset.modalPath || fragment.dataset.path || fragment.href;
    let pathname;
    try {
      pathname = new URL(originalUrl, origin).pathname.replace('.html', '');
    } catch (error) {
      setStatus('service', 'error', 'Invalid Fragment Path in files', originalUrl);
      return acc;
    }
    // Find dupes across current iterator as well as original url list
    const accDupe = acc.some((url) => url.pathname === pathname);
    const dupe = urls.value.some((url) => removeLangstorePrefix(url.pathname) === pathname);
    if (accDupe || dupe) return acc;
    const fragmentUrl = new URL(`${origin}${pathname}`);
    fragmentUrl.alt = fragment.textContent;
    acc.push(fragmentUrl);
    return acc;
  }, []);
  fragmentUrls = removeDuplicateUrls([...fragmentUrls, ...findMetaFragments(doc)]);
  if (fragmentUrls.length === 0) return [];
  return fragmentUrls;
}

function addFragmentPrefix(fragments, prefix) {
  return fragments ? fragments.map((url) => {
    url.pathname = url.pathname.startsWith(prefix) ? url.pathname : `${prefix}${url.pathname}`;
    return url;
  }) : undefined;
}

async function findDeepFragments(path) {
  const searched = [];
  const prefix = getLangstorePrefix(path);
  const fragments = addFragmentPrefix(await findPageFragments(path), prefix);
  if (!fragments) return [];
  while (fragments.length !== searched.length) {
    const needsSearch = fragments.filter((fragment) => !searched.includes(fragment.pathname));
    for (const search of needsSearch) {
      const nestedFragments = addFragmentPrefix(await findPageFragments(search.pathname), prefix);
      if (nestedFragments === undefined) {
        search.valid = 'not found';
      } else {
        const newFragments = nestedFragments.filter((nested) => !searched.includes(nested.pathname)
          && !fragments.find((fragment) => fragment.pathname === nested.pathname));
        if (newFragments?.length) fragments.push(...newFragments);
      }
      searched.push(search.pathname);
    }
  }
  return fragments.length ? getUrls(fragments) : [];
}

export async function findFragments() {
  const found = urls.value.map((url) => findDeepFragments(url.pathname));
  const pageFragments = await Promise.all(found);
  // For each page, loop through all the found fragments
  const foundFragments = pageFragments.reduce((acc, fragments) => {
    if (fragments.length > 0) {
      fragments.forEach((fragment) => {
        // De-dupe across pages that share fragments
        const dupe = acc.some((url) => url[0]?.pathname === fragment.pathname);
        if (!dupe) acc.push([fragment]);
      });
    }
    return acc;
  }, []);
  return validateUrlsFormat(foundFragments, true);
}

export async function syncToExcel(paths) {
  setStatus('fragments', 'info', `${paths.length} fragments found.`, null, 1500);
  setExcelStatus('Find fragments', `Found ${paths.length} fragments.`);
  if (paths.length > 0) {
    const newUrls = paths.map((path) => new URL(path[0]));
    urls.value = [...urls.value, ...getUrls(newUrls)];
    // Update language cards count
    languages.value = [...languages.value.map((lang) => {
      lang.size = urls.value.length;
      return lang;
    })];
    const itemId = getItemId();
    const resp = await updateExcelTable({ itemId, tablename: 'URL', values: paths });
    if (resp.status !== 201) {
      setStatus('fragments', 'error', 'Couldn\'t add to Excel.');
      return;
    }
    await updateExcelJson();
  }
}

export async function findAllFragments() {
  setStatus('fragments', 'info', 'Finding fragments.');
  const forExcel = await findFragments();
  await syncToExcel(forExcel);
}

export async function syncToLangstore() {
  // stop polling for updates until request is made
  polling.value = false;

  // Disable all langstore syncing, the project is being sent.
  allowSyncToLangstore.value = false;

  // Disable sending for loc as this is in progress.
  allowSendForLoc.value = false;

  // Disable cancel project
  allowCancelProject.value = false;

  if (!heading.value.projectId || projectStatus.value.projectStatus === 'draft') {
    const status = await createProject();
    setTimeout(async () => {
      if (status === 201) {
        await startSync();
        getServiceUpdates();
      } else {
        allowSyncToLangstore.value = true;
        allowSendForLoc.value = true;
        allowCancelProject.value = false;
      }
    }, 3000);
  } else {
    await startSync();
    getServiceUpdates();
  }
}

export async function startSyncToLangstore() {
  if (heading.value.projectId) {
    await syncToLangstore();
  } else {
    const { getModal } = await import('../../modal/modal.js');
    const div = createTag('div');
    const content = Modal(div, 'sync');
    getModal(null, { id: 'sync-modal', content, closeEvent: 'closeModal' });
  }
}

export function closeActionModal() {
  document.querySelector('.dialog-modal').dispatchEvent(new Event('closeModal'));
}

let isSyncing = false;
export async function syncFragsLangstore() {
  if (isSyncing) return;
  isSyncing = true;
  closeActionModal();
  if (syncFragments.value?.length) {
    await syncToExcel(syncFragments.value);
    syncFragments.value = [];
  }
  await syncToLangstore();
  isSyncing = false;
}

let isSending = false;
export async function sendForLoc() {
  if (isSending) return;
  isSending = true;

  // stop polling for updates until request is made
  polling.value = false;

  // Disable all langstore syncing, the project is being sent.
  allowSyncToLangstore.value = false;

  // Disable sending for loc as this is in progress.
  allowSendForLoc.value = false;

  // Disable cancel project
  allowCancelProject.value = false;

  // If no Project ID, create project first.
  if (!heading.value.projectId || projectStatus.value.projectStatus === 'draft') {
    const status = await createProject();
    if (status === 201) {
      // Give the service time to digest and error check creating a project
      setStatus('service', 'info', 'Starting project.');
    } else {
      allowSyncToLangstore.value = heading.value.projectType !== 'rollout';
      allowSendForLoc.value = true;
      allowCancelProject.value = false;
      return;
    }
  }

  await startProject({ skipSync: true });
  setStatus('service');
  // Start polling for updates since this has not been kicked off.
  getServiceUpdates();
  isSending = false;
}

export function showRollout() {
  showRolloutOptions.value = true;
}

export async function rolloutAll(e, reroll) {
  polling.value = false;
  showRolloutOptions.value = false;
  allowRollout.value = false;
  await rolloutLang('all', reroll);
  polling.value = true;
}

export async function cancelLocProject() {
  const { getModal } = await import('../../modal/modal.js');
  const div = createTag('div');
  const content = Modal(div, 'cancel');
  getModal(null, { id: 'cancel-modal', content, closeEvent: 'closeModal' });
}
