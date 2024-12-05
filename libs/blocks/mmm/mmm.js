import { createTag, customFetch, loadStyle } from '../../utils/utils.js';
import { fetchData, DATA_TYPE } from '../../features/personalization/personalization.js';
import { getMepPopup } from '../../features/personalization/preview.js';

const API_DOMAIN = 'https://jvdtssh5lkvwwi4y3kbletjmvu0qctxj.lambda-url.us-west-2.on.aws';
const API_URLS = {
  pageList: `${API_DOMAIN}/get-pages`,
  pageDetails: `${API_DOMAIN}/get-page?id=`,
};

function buildShareableLink() {
  const urlLoc = window.location;
  const shareableLinkParams = {};
  shareableLinkParams.type = document.querySelector('.tab-list-container button[aria-selected="true"]').innerHTML;
  if (shareableLinkParams.type === 'Dropdown') {
    shareableLinkParams.geo = document.querySelector('select#mmm-search-geo').value;
    shareableLinkParams.topPage = document.querySelector('select#mmm-search-page').value;
  } else {
    shareableLinkParams.q = document.querySelector('#mmm-search-input').value;
    shareableLinkParams.tab = 'mmm-options-2'; // could be dynamic based if the tabindex worked
  }
  const shareableLinkNew = new URL(window.location.pathname, urlLoc.protocol + urlLoc.host);
  shareableLinkNew.search = new URLSearchParams(shareableLinkParams).toString();
  document.querySelectorAll('button.copy-to-clipboard').forEach((button) => {
    button.dataset.destination = shareableLinkNew.toString();
  });
  console.log(`newest shareable link: ${shareableLinkNew.toString()}`);
}
function searchFromWindowParameters() {
  const searchParams = new URLSearchParams(decodeURIComponent(window.location.search));
  const newValuesToBuild = {};
  if (searchParams.has('tab')) {
    newValuesToBuild.q = searchParams.get('q');
  } else {
    newValuesToBuild.geo = searchParams.get('geo');
    newValuesToBuild.topPage = searchParams.get('topPage');
  }
  return Object.keys(newValuesToBuild).length ? newValuesToBuild : null;
}

async function toggleDrawer(target, dd) {
  const el = target.closest('button');
  const expanded = el.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    el.setAttribute('aria-expanded', 'false');
    dd.setAttribute('hidden', '');
  } else {
    el.setAttribute('aria-expanded', 'true');
    dd.removeAttribute('hidden');
    const loading = dd.querySelector('.loading');
    if (dd.classList.contains('placeholder-resolved') || !loading) return;
    const { pageId } = dd.dataset;
    const pageData = await fetchData(`${API_URLS.pageDetails}${pageId}`, DATA_TYPE.JSON);
    const { page, activities } = pageData;
    if (!page.prefix) page.prefix = 'en-us';
    activities.map((activity) => {
      activity.variantNames = activity.variantNames.split('||');
      activity.source = activity.source.split(',');
      return activity;
    });
    loading.replaceWith(getMepPopup(activities, page, true));
    dd.classList.add('placeholder-resolved');
  }
}

function createButtonDetailsPair(mmmEl, page) {
  const { url, pageId } = page;
  const geoOptions = [
    'jp',
    'ca',
    'ca_fr',
    'au',
    'nz',
    'kr',
    'mx',
    'br',
  ];

  const pageUrl = new URL(url);
  let path = pageUrl.pathname;
  const pathFolders = path.split('/');
  if (geoOptions.includes(pathFolders[1])) {
    pathFolders.splice(1, 1);
    path = pathFolders.join('/');
  }
  page.path = path;
  const triggerId = `mmm-trigger-${pageId}`;
  const panelId = `mmm-content-${pageId}`;
  const icon = createTag('span', { class: 'mmm-icon' });
  const hTag = createTag('h5', false, url);
  const button = createTag('button', {
    type: 'button',
    id: triggerId,
    class: 'mmm-trigger tracking-header',
    'aria-expanded': 'false',
    'aria-controls': panelId,
  }, hTag);
  button.append(icon);

  // const para = panel?.querySelector('p');
  // const text = para ? para.textContent : panel?.textContent;
  const dtHtml = hTag ? createTag(hTag.tagName, { class: 'mmm-heading' }, button) : button;
  const dt = createTag('dt', false, dtHtml);
  const loading = createTag(
    'div',
    { class: 'loading' },
    `<svg version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
        <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
          <animateTransform attributeName="transform" dur="1s" type="translate" values="0 15 ; 0 -15; 0 15" repeatCount="indefinite" begin="0.1"></animateTransform>
        </circle>
        <circle fill="currentColor" stroke="none" cx="30" cy="50" r="6">
          <animateTransform attributeName="transform" dur="1s" type="translate" values="0 10 ; 0 -10; 0 10" repeatCount="indefinite" begin="0.2"></animateTransform>
        </circle>
        <circle fill="currentColor" stroke="none" cx="54" cy="50" r="6">
          <animateTransform attributeName="transform" dur="1s" type="translate" values="0 5 ; 0 -5; 0 5" repeatCount="indefinite" begin="0.3"></animateTransform>
        </circle>
      </svg>`,
  );
  const dd = createTag('dd', { id: panelId, hidden: true }, loading);
  Object.keys(page).forEach((key) => {
    const val = page[key] || 'us';
    dt.dataset[key] = val;
    dd.dataset[key] = val;
  });
  button.addEventListener('click', (e) => { toggleDrawer(e.target, dd, pageId, 'mmm'); });
  mmmEl.append(dt, dd);
}

function searchFilterByInput() {
  const searchFieldValue = document.querySelector('#mmm-search-input').value;
  const geoDropDownValue = document.querySelector('#mmm-search-geo').value;
  const pageDropDownValue = document.querySelector('#mmm-search-page').value;
  const mmmEntries = document.querySelectorAll('div.mmm-container > dl > *');
  const selectedGeos = geoDropDownValue.split(',');
  const selectedRadio = document.querySelector('.tab-list-container button[aria-selected="true"]');
  const filterType = selectedRadio?.getAttribute('id') === 'tab-mmm-options-2' ? 'search' : 'filter';

  if (!mmmEntries) return;
  mmmEntries.forEach((entry) => {
    const { url, path, prefix = 'en-US' } = entry.dataset;
    entry.classList.remove('filter-hide');
    if (filterType === 'search') {
      if (!url.includes(searchFieldValue)) entry.classList.add('filter-hide');
      return;
    }
    if (geoDropDownValue !== 'all' && !selectedGeos.some((item) => prefix === item)) {
      entry.classList.add('filter-hide');
    }
    if (pageDropDownValue !== 'all' && path !== pageDropDownValue) {
      entry.classList.add('filter-hide');
    }
  });
  buildShareableLink();
}

function addShareButtonListeners() {
  document.querySelectorAll('button.copy-to-clipboard').forEach((target) => {
    target.addEventListener('click', (e) => {
      /* c8 ignore next 6 */
      e.preventDefault();
      const button = e.target.closest('button');
      navigator.clipboard.writeText(button.dataset.destination).then(() => {
        button.classList.add('copy-to-clipboard-copied');
        setTimeout(() => document.activeElement.blur(), 500);
        setTimeout(
          () => button.classList.remove('copy-to-clipboard-copied'),
          2000,
        );
      });
    });
  });
}

async function createForms(sharedUrlSettings) {
  const resp = await customFetch({ resource: '/libs/blocks/mmm/form.html', withCacheRules: true })
    .catch(() => ({}));
  const html = await resp.text();
  if (!html) return;
  const doc = createTag('div', false, html);
  const dropdownContainer = document.querySelector('.section-metadata.dropdowns');
  dropdownContainer.parentNode.insertBefore(doc, dropdownContainer);
  // insert default for 2 dropdowns here
  if (sharedUrlSettings?.geo && sharedUrlSettings?.topPage) { // check this
    document.querySelector(`#mmm-search-geo [value="${sharedUrlSettings.geo}"]`).setAttribute('selected', 'selected');
    document.querySelector(`#mmm-search-page [value="${sharedUrlSettings.topPage}"]`).setAttribute('selected', 'selected');
  }
  doc.querySelectorAll('select').forEach((field) => {
    field.addEventListener('change', searchFilterByInput);
  });
  const searchContainer = document.querySelector('.section-metadata.search');
  const searchForm = document.querySelector('#mmm-search-input-container');
  searchContainer.parentNode.insertBefore(searchForm, searchContainer);
  // insert default for q value here
  if (sharedUrlSettings?.q) searchForm.querySelector('input').value = sharedUrlSettings.q;
  searchForm.addEventListener('keyup', searchFilterByInput);
  searchForm.addEventListener('change', searchFilterByInput);
  document.querySelectorAll('.tab-list-container button').forEach((button) => {
    button.addEventListener('click', searchFilterByInput);
  });
}

export default async function init(el) {
  if (window.location.search.length !== 0) {
    if (window.location.search.includes('tab=')) {
      document.querySelector('.tabs.radio > div:nth-child(2) > div:nth-child(2)').innerHTML = '2';
    }
    const urlParamSettings = searchFromWindowParameters();
    console.log(urlParamSettings);
    createForms(urlParamSettings);
  } else createForms();
  const mmmElContainer = createTag('div', { class: 'mmm-container max-width-12-desktop' });
  const mmmEl = createTag('dl', {
    class: 'mmm foreground',
    id: 'mmm',
    role: 'presentation',
  });
  mmmElContainer.append(mmmEl);
  const pageList = await fetchData(API_URLS.pageList, DATA_TYPE.JSON);
  pageList.map((page) => createButtonDetailsPair(mmmEl, page));
  el.remove();
  const section = createTag('div', { id: 'mep-section', class: 'section' });
  const main = document.querySelector('main');
  section.append(mmmElContainer);
  main.append(section);
  addShareButtonListeners();
  buildShareableLink();
  loadStyle('/libs/features/personalization/preview.css');
}
/*
todo:
createForm(el) - inserts content in front of el
form - type in search first, and go button. hide everything that's not applicable.
text field for form. overcomplicate later.

radio buttosn
filter or search

string search will never be with geo. it will be under 'search' always and but itself
on filter radio button:

decouple string search and geo/page filter.(need radio button).
if value = filter, then do drop down functions.
if search = just do the string pattern match.

no buttons just add to fire when
1. key up on search
2. change on dropdowns
3. radio button change (automatically runs the function to get same results)
*/
