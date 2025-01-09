import { createTag, getConfig, getMetadata, loadStyle } from '../../utils/utils.js';
import { US_GEO, getFileName, normalizePath } from './personalization.js';

const API_DOMAIN = 'https://jvdtssh5lkvwwi4y3kbletjmvu0qctxj.lambda-url.us-west-2.on.aws';
export const API_URLS = {
  pageList: `${API_DOMAIN}/get-pages`,
  pageDetails: `${API_DOMAIN}/get-page?id=`,
  save: `${API_DOMAIN}/save-mep-call`,
};

function updatePreviewButton(popup, pageId) {
  const selectedInputs = popup.querySelectorAll(
    'input[type="radio"]:checked, input[type="text"]',
  );
  const manifestParameter = [];

  selectedInputs.forEach((selected) => {
    let { value } = selected;
    if (selected.classList.contains('new-manifest')) {
      if (selected.value !== '') {
        try {
          const newManifest = new URL(value);
          if (newManifest) {
            value = newManifest.pathname;
          }
        } catch (e) {
          // do nothing
        }
        manifestParameter.push(value);
      }
    } else {
      value = `${selected.dataset.manifest}--${value}`;
      manifestParameter.push(value);
    }
  });

  const isMmm = pageId.length;
  const page = isMmm ? popup.closest('[data-url]').dataset.url : window.location.href;
  const simulateHref = new URL(page);
  simulateHref.searchParams.set('mep', manifestParameter.join('---'));

  const mepHighlightCheckbox = popup.querySelector(
    `input[type="checkbox"]#mepHighlightCheckbox${pageId}`,
  );

  document.body.dataset.mepHighlight = mepHighlightCheckbox.checked;
  if (mepHighlightCheckbox.checked) {
    simulateHref.searchParams.set('mepHighlight', true);
  } else {
    simulateHref.searchParams.delete('mepHighlight');
  }

  const mepPreviewButtonCheckbox = popup.querySelector(
    `input[type="checkbox"]#mepPreviewButtonCheckbox${pageId}`,
  );
  if (mepPreviewButtonCheckbox.checked) {
    simulateHref.searchParams.set('mepButton', 'off');
  } else {
    simulateHref.searchParams.delete('mepButton');
  }

  popup
    .querySelector('a.con-button')
    .setAttribute('href', simulateHref.href);
}
function addPillEventListeners(div) {
  div.querySelector('.mep-manifest.mep-badge').addEventListener('click', () => {
    div.classList.toggle('mep-hidden');
  });
  div.querySelector('.mep-close').addEventListener('click', () => {
    document.body.removeChild(document.querySelector('.mep-preview-overlay'));
  });
}
export function parsePageAndUrl(config, windowLocation, prefix) {
  const { stageDomainsMap, env } = config;
  const { pathname, origin } = windowLocation;
  const allowedHosts = [
    'business.stage.adobe.com',
    'www.stage.adobe.com',
    'milo.stage.adobe.com',
  ];
  if (env?.name === 'prod' || !stageDomainsMap
    || allowedHosts.includes(origin.replace('https://', ''))) {
    const domain = origin.replace('stage.adobe.com', 'adobe.com');
    return { page: pathname.replace(`/${prefix}/`, '/'), url: `${domain}${pathname}` };
  }
  let path = pathname;
  let domain = origin;
  const domainCheck = Object.keys(stageDomainsMap)
    .find((key) => {
      try {
        const { host } = new URL(`https://${key}`);
        return allowedHosts.includes(host);
      } catch (e) {
        /* c8 ignore next 2 */
        return false;
      }
    });
  if (domainCheck) domain = `https://${domainCheck}`;
  path = path.replace('/homepage/index-loggedout', '/');
  if (!path.endsWith('/') && !path.endsWith('.html') && !domain.includes('milo')) {
    path += '.html';
  }
  domain = domain.replace('stage.adobe.com', 'adobe.com');
  return { page: path.replace(`/${prefix}/`, '/'), url: `${domain}${path}` };
}
function parseMepConfig() {
  const config = getConfig();
  const { mep, locale } = config;
  const { experiments, targetEnabled, prefix, highlight } = mep;
  const activities = experiments.map((experiment) => {
    const {
      name, event, manifest, variantNames, selectedVariantName, disabled, analyticsTitle, source,
    } = experiment;
    let pathname = manifest;
    try { pathname = new URL(manifest).pathname; } catch (e) { /* do nothing */ }
    return {
      targetActivityName: name,
      variantNames,
      selectedVariantName,
      url: manifest,
      disabled,
      source,
      eventStart: event?.start,
      eventEnd: event?.end,
      pathname,
      analyticsTitle,
    };
  });
  const { page, url } = parsePageAndUrl(config, window.location, prefix);

  return {
    page: {
      url,
      page,
      target: targetEnabled ? 'on' : 'off',
      personalization: (getMetadata('personalization')) ? 'on' : 'off',
      geo: prefix === US_GEO ? '' : prefix,
      locale: locale.ietf,
      region: locale.region,
      highlight,
    },
    activities,
  };
}
function formatDate(dateTime, format = 'local') {
  if (!dateTime) return '';
  let dateObj = dateTime;
  if (typeof dateObj === 'string') dateObj = new Date(dateObj);
  if (format === 'iso') return dateObj.toISOString();
  const date = dateObj.toLocaleDateString(false, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const time = dateObj.toLocaleTimeString(false, { timeStyle: 'short' });
  return `${date} ${time}`;
}
function getManifestListDomAndParameter(mepConfig) {
  const { activities, page } = mepConfig;
  const { pageId = 1 } = page;
  let manifestList = '';
  const manifestParameter = [];
  activities?.forEach((manifest, mIdx) => {
    const {
      variantNames,
      manifestPath = manifest.url,
      selectedVariantName = manifest.selectedVariantName || 'default',
      manifestUrl,
      targetActivityName,
      source,
      analyticsTitle,
      eventStart,
      eventEnd,
      disabled,
    } = manifest;
    const editUrl = manifestUrl || manifestPath;
    const editPath = normalizePath(editUrl);
    let radio = '';
    const variantNamesArray = typeof variantNames === 'string' ? variantNames.split('||') : variantNames;
    variantNamesArray.forEach((variant) => {
      const checked = {
        attribute: '',
        class: '',
      };
      if (variant === selectedVariantName) {
        checked.attribute = 'checked="checked"';
        checked.class = 'class="mep-manifest-selected-variant"';
        manifestParameter.push(`${manifestPath}--${variant}`);
      }
      radio += `<div>
        <input type="radio" name="${editPath}${pageId}" value="${variant}" 
        id="${editPath}${pageId}--${variant}" data-manifest="${editPath}" ${checked.attribute}>
        <label for="${editPath}${pageId}--${variant}" ${checked.class}>${variant}</label>
      </div>`;
    });
    const checked = {
      attribute: '',
      class: '',
    };
    if (!variantNames.includes(selectedVariantName)) {
      checked.attribute = 'checked="checked"';
      checked.class = 'class="mep-manifest-selected-variant"';
      manifestParameter.push(`${editUrl}--default`);
    }
    radio += `<div>
      <input type="radio" name="${editPath}${pageId}" value="default" 
      id="${editPath}${pageId}--default" data-manifest="${editPath}" ${checked.attribute}>
      <label for="${editPath}${pageId}--default" ${checked.class}>Default (control)</label>
    </div>`;

    const scheduled = eventStart && eventEnd
      ? `<p class="promo-schedule-info">Scheduled - ${disabled ? 'inactive' : 'active'}</p>
         <p>On: ${formatDate(eventStart)} - <a target= "_blank" href="?instant=${formatDate(eventStart, 'iso')}">instant</a></p>
         <p>Off: ${formatDate(eventEnd)}</p>` : '';
    manifestList += `<div class="mep-manifest-info" title="Manifest location: ${editUrl}&#013;Analytics manifest name: ${analyticsTitle || 'N/A for this manifest type'}">
      <div class="mep-manifest-title">
        ${mIdx + 1}. ${getFileName(manifestPath)}
        <a class="mep-edit-manifest" href="${editUrl}" target="_blank" title="Open manifest">
          <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="16px" height="16px" fill-rule="nonzero"><g transform=""><g fill="currentColor" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(8.53333,8.53333)"><path d="M22.82813,3c-0.51175,0 -1.02356,0.19544 -1.41406,0.58594l-2.41406,2.41406l5,5l2.41406,-2.41406c0.781,-0.781 0.781,-2.04713 0,-2.82812l-2.17187,-2.17187c-0.3905,-0.3905 -0.90231,-0.58594 -1.41406,-0.58594zM17,8l-11.74023,11.74023c0,0 0.91777,-0.08223 1.25977,0.25977c0.342,0.342 0.06047,2.58 0.48047,3c0.42,0.42 2.64389,0.12436 2.96289,0.44336c0.319,0.319 0.29688,1.29688 0.29688,1.29688l11.74023,-11.74023zM4,23l-0.94336,2.67188c-0.03709,0.10544 -0.05623,0.21635 -0.05664,0.32813c0,0.55228 0.44772,1 1,1c0.11177,-0.00041 0.22268,-0.01956 0.32813,-0.05664c0.00326,-0.00128 0.00652,-0.00259 0.00977,-0.00391l0.02539,-0.00781c0.00196,-0.0013 0.00391,-0.0026 0.00586,-0.00391l2.63086,-0.92773l-1.5,-1.5z"></path></g></g></g></svg>
        </a>
        <div class="target-activity-name">${targetActivityName || ''}</div>
        <div>Source: ${source}</div>
        ${manifest.lastSeen ? `<div>Last seen: ${formatDate(new Date(manifest.lastSeen))}</div>` : ''}
        ${scheduled}
      </div>
      <div class="mep-manifest-variants">${radio}</div>
    </div>`;
  });
  return { manifestList, manifestParameter };
}
function addMepPopupListeners(popup, pageId) {
  popup.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', updatePreviewButton.bind(null, popup, pageId));
  });
  popup.querySelectorAll('input[type="text"]').forEach((input) => {
    input.addEventListener('keyup', updatePreviewButton.bind(null, popup, pageId));
    input.addEventListener('change', updatePreviewButton.bind(null, popup, pageId));
  });
  popup.querySelector('.mep-toggle-advanced').addEventListener('click', (e) => {
    e.target.closest('.mep-popup')?.querySelector('.mep-advanced-container')?.classList.toggle('mep-advanced-open');
  });
}
export function getMepPopup(mepConfig, isMmm = false) {
  const { activities, page } = mepConfig;
  const pageId = page?.pageId ? `-${page.pageId}` : '';
  const { manifestList } = getManifestListDomAndParameter(mepConfig);
  let mepHighlightChecked = '';
  if (page?.highlight) {
    mepHighlightChecked = 'checked="checked"';
    document.body.dataset.mepHighlight = true;
  }
  const PREVIEW_BUTTON_ID = 'preview-button';
  const pageUrl = isMmm ? page.url : new URL(window.location.href).href;
  const mepPopup = createTag('div', {
    class: `mep-popup${isMmm ? '' : ' in-page'}`,
    'data-url': pageUrl,
  });
  const mepPopupHeader = createTag('div', { class: 'mep-popup-header' });
  const listInfo = createTag('div', { class: 'mep-manifest-info' });
  const advancedOptions = createTag('div', { class: 'mep-advanced-container' });
  const mepManifestList = createTag('div', { class: 'mep-manifest-list' });

  listInfo.innerHTML = `
    <div class="mep-manifest-variants">
      <input type="checkbox" name="mepHighlight${pageId}"
        id="mepHighlightCheckbox${pageId}" ${mepHighlightChecked} value="true">
        <label for="mepHighlightCheckbox${pageId}">Highlight changes</label>
    </div>`;
  advancedOptions.innerHTML = `
    <div class="mep-toggle-advanced">Advanced options</div>
      <div class="mep-manifest-info mep-advanced-options">
        <div>Optional: new manifest location or path</div>
            <div class="mep-manifest-variants">
              <div>
                <input type="text" name="new-manifest${pageId}" class="new-manifest">
              </div>
            </div>
          </div>
          <div class="mep-manifest-info">
            <div class="mep-manifest-variants mep-advanced-options">
              <input type="checkbox" name="mepPreviewButtonCheckbox${pageId}"
                id="mepPreviewButtonCheckbox${pageId}" value="off">
                <label for="mepPreviewButtonCheckbox${pageId}">add mepButton=off to preview link</label>
            </div>
          </div>
        </div>`;

  const mepManifestPreviewButton = createTag('div', { class: `advanced-options${isMmm ? '' : ' dark'}` });
  mepManifestPreviewButton.innerHTML = `
    <a class="con-button outline button-l" data-id="${PREVIEW_BUTTON_ID}" title="Preview above choices" ${isMmm ? ' target="_blank"' : ''}>Preview</a>`;
  const targetOnText = page.target === 'postlcp' ? 'on post LCP' : page.target;
  mepPopupHeader.innerHTML = `
    <div>
      <h4>${activities?.length || 0} Manifest(s) found</h4>
        <span class="mep-close"></span>
        <div class="mep-manifest-page-info-title">Page Info:</div>
        <div>Target integration feature is ${targetOnText}</div>
        <div>Personalization feature is ${page.personalization}</div>
        <div>Page's Geo Folder is ${page.geo || 'nothing (US)'}</div>
        <div>Page's Locale is ${page.locale?.toLowerCase()}</div>
        ${page.lastSeen ? `<div>Last seen: ${formatDate(new Date(page.lastSeen))}</div>` : ''}
    </div>`;
  mepManifestList.innerHTML = manifestList;
  if (listInfo) mepManifestList.prepend(listInfo);
  if (advancedOptions) mepManifestList.append(advancedOptions);
  mepPopup.append(mepPopupHeader);
  mepPopup.append(mepManifestList);
  mepPopup.append(mepManifestPreviewButton);
  const previewButton = mepPopup.querySelector(`a[data-id="${PREVIEW_BUTTON_ID}"]`);
  if (previewButton) updatePreviewButton(mepPopup, pageId);
  addMepPopupListeners(mepPopup, pageId);
  return mepPopup;
}
function createPreviewPill() {
  const mepConfig = parseMepConfig();
  const { activities } = mepConfig;
  const overlay = createTag('div', { class: 'mep-preview-overlay static-links', style: 'display: none;' });
  const pill = document.createElement('div');
  pill.classList.add('mep-hidden');
  const mepBadge = createTag('div', { class: 'mep-manifest mep-badge' });
  mepBadge.innerHTML = `
   <span class="mep-open"></span>
      <div class="mep-manifest-count">${activities?.length || 0} Manifest(s) found</div>`;
  pill.append(mepBadge);
  pill.append(getMepPopup(mepConfig));
  overlay.append(pill);
  document.body.append(overlay);
  addPillEventListeners(pill);
}
function addHighlightData(manifests) {
  manifests.forEach(({ selectedVariant, manifest }) => {
    const manifestName = getFileName(manifest);

    const updateManifestId = (selector, prop = 'manifestId') => {
      document.querySelectorAll(selector).forEach((el) => (el.dataset[prop] = manifestName));
    };

    selectedVariant?.replacefragment?.forEach(
      ({ val }) => updateManifestId(`[data-path*="${val}"]`),
    );

    selectedVariant?.useblockcode?.forEach(({ selector }) => {
      if (selector) updateManifestId(`.${selector}`, 'codeManifestId');
    });

    selectedVariant?.updatemetadata?.forEach(({ selector }) => {
      if (selector === 'gnav-source') updateManifestId('header, footer');
    });

    // eslint-disable-next-line max-len
    document.querySelectorAll(`.section[class*="merch-cards"] .fragment[data-manifest-id="${manifestName}"] merch-card`)
      .forEach((el) => (el.dataset.manifestId = manifestName));
  });
}
export async function saveToMmm() {
  const data = parseMepConfig();
  const excludedStrings = ['/drafts/', '.stage.', '.page/', '.live/', '/fragments/', '/nala/'];
  if (excludedStrings.some((str) => data.page.url.includes(str))) return false;
  data.activities = data.activities.filter((activity) => {
    const { url, source } = activity;
    activity.source = source.filter((item) => item !== 'mep param');
    return (!!(activity.source?.length && !url.includes('/drafts/')));
  });
  data.activities = data.activities.map((activity) => {
    activity.variantNames = activity.variantNames?.join('||') || '';
    activity.source = activity.source?.join(',') || '';
    delete activity.selectedVariantName;
    return activity;
  });
  if (data.page.prefix === US_GEO) data.page.prefix = '';
  data.page.target = getMetadata('target') || 'off';
  delete data.page.highlight;
  return fetch(API_URLS.save, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const res = await response.json();
      if (response.ok) return res;
      /* c8 ignore next 1 */
      throw new Error(res.message || 'Network response failed');
    });
}
export default async function decoratePreviewMode() {
  const { miloLibs, codeRoot, mep } = getConfig();
  loadStyle(`${miloLibs || codeRoot}/features/personalization/preview.css`);
  createPreviewPill();
  if (mep?.experiments) addHighlightData(mep.experiments);
}
