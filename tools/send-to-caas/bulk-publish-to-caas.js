/* eslint-disable no-continue */
import { loadScript, loadStyle } from '../../libs/utils/utils.js';
import { getImsToken } from '../utils/utils.js';
import {
  loadTingleModalFiles,
  showAlert,
  showConfirm,
} from './send-to-caas.js';
import {
  getCardMetadata,
  getCaasProps,
  loadCaasTags,
  postDataToCaaS,
  getConfig,
  setConfig,
} from './send-utils.js';
import comEnterpriseToCaasTagMap from './comEnterpriseToCaasTagMap.js';

const LS_KEY = 'bulk-publish-caas';
const FIELDS = ['host', 'repo', 'owner', 'excelFile', 'caasEnv', 'urls', 'contentType', 'publishToFloodgate'];
const FIELDS_CB = ['draftOnly', 'usePreview', 'useHtml'];
const DEFAULT_VALUES = {
  caasEnv: 'Prod',
  contentType: 'caas:content-type/article',
  excelFile: '',
  host: 'business.adobe.com',
  owner: 'adobecom',
  repo: 'bacom',
  urls: '',
  publishToFloodgate: 'default',
};
const DEFAULT_VALUES_CB = {
  draftOnly: false,
  usePreview: false,
  useHtml: true,
};

const fetchExcelJson = async (url) => {
  const resp = await fetch(url);
  if (resp.ok) {
    const json = await resp.json();
    return json.data;
  }
  return [];
};

const checkIms = async () => {
  const accessToken = await getImsToken(loadScript);
  if (!accessToken) {
    const shouldLogIn = await showConfirm(
      'You must be logged in with an Adobe ID in order to publish to CaaS.\nDo you want to log in?',
    );
    if (shouldLogIn) {
      const { signInContext } = getConfig();
      window.adobeIMS.signIn(signInContext);
    }
    return false;
  }
  return accessToken;
};

const getPageDom = async (url) => {
  try {
    const resp = await fetch(url);
    if (!resp.ok) return { error: `${resp.status}: ${resp.statusText}` };
    const html = await resp.text();
    const dp = new DOMParser();
    const dom = dp.parseFromString(html, 'text/html');
    return { dom, lastModified: resp.headers.get('last-modified') };
  } catch (err) {
    return { error: err.message };
  }
};

const updateTagsFromSheetData = (tags, sheetTagsStr) => {
  const sheetTags = sheetTagsStr.split(',');
  const tagSet = new Set(tags.map((t) => t.id));

  sheetTags.forEach((sheetTag) => {
    if (sheetTag.startsWith('caas:')) {
      tagSet.add(sheetTag);
      return;
    }
    const newTag = comEnterpriseToCaasTagMap[sheetTag];
    if (newTag) {
      tagSet.add(newTag);
    }
  });

  return [...tagSet].map((t) => ({ id: t }));
};

const processData = async (data, accessToken) => {
  const errorArr = [];
  const successArr = [];
  let index = 0;
  let keepGoing = true;

  const statusModal = showAlert('', { btnText: 'Cancel', onClose: () => { keepGoing = false; } });
  const {
    caasEnv,
    draftOnly,
    host,
    owner,
    repo,
    useHtml,
    usePreview,
    publishToFloodgate,
  } = getConfig();

  if (!repo) {
    showAlert('You must enter a repo when choosing publish content to caas floodgate', { error: true });
    if (statusModal.modal) statusModal.close();
    return;
  }

  let domain = `https://${host}`;

  if (usePreview || publishToFloodgate !== 'default') {
    // TODO ADD HLX5 SUPPORT
    domain = `https://main--${repo}--${owner}.hlx.live`;
  }

  for (const page of data) {
    if (!keepGoing) break;

    try {
      const rawUrl = page.Path || page.path || page.url || page.URL || page.Url || page;

      const { pathname } = new URL(rawUrl);
      const pathnameNoHtml = pathname.replace('.html', '');
      const pageUrl = usePreview ? `${domain}${pathnameNoHtml}` : `${domain}${pathname}`;
      const prodUrl = `${host}${pathnameNoHtml}${useHtml ? '.html' : ''}`;

      index += 1;
      statusModal.setContent(`Publishing ${index} of ${data.length}:<br>${pageUrl}`);

      if (pageUrl === 'stop') break; // debug, stop on empty line

      const { dom, error, lastModified } = await getPageDom(pageUrl);
      if (error) {
        errorArr.push([pageUrl, error]);
        continue;
      }

      setConfig({ bulkPublish: true, doc: dom, pageUrl, lastModified });
      const { caasMetadata, errors } = await getCardMetadata({
        prodUrl,
        floodgatecolor: publishToFloodgate,
      });

      if (errors.length) {
        errorArr.push([pageUrl, errors]);
        continue;
      }

      const tagField = page['cq:tags'] || page.tags;
      if (tagField) {
        const updatedTags = updateTagsFromSheetData(caasMetadata.tags, tagField);
        caasMetadata.tags = updatedTags;
      }

      if (!caasMetadata.tags.length) {
        errorArr.push([pageUrl, 'No tags on page']);
        continue;
      }

      const caasProps = getCaasProps(caasMetadata);

      const response = await postDataToCaaS({
        accessToken,
        caasEnv: caasEnv?.toLowerCase(),
        caasProps,
        draftOnly,
      });

      if (response.success) {
        successArr.push([pageUrl, caasMetadata.entityid]);
      } else {
        errorArr.push([pageUrl, response]);
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`ERROR: ${e.message}`);
    }
  }

  if (statusModal.modal) statusModal.close();

  document.getElementById('errors').value = JSON.stringify(errorArr, null, 2);
  document.getElementById('success').value = JSON.stringify(successArr, null, 2);
  showAlert(`Successfully published ${successArr.length} pages. \n\n Failed to publish ${errorArr.length} pages.`);
};

const bulkPublish = async () => {
  const accessToken = await checkIms();
  if (!accessToken) return;

  const { excelFile, urls } = getConfig();

  if (!(excelFile || urls)) {
    await showAlert('Please enter urls or an excel json url.');
  }

  const data = urls
    ? urls.split('\n')
    : await fetchExcelJson(excelFile);

  await processData(data, accessToken);
};

const loadFromLS = () => {
  const ls = localStorage.getItem(LS_KEY);
  if (!ls) return;
  try {
    setConfig(JSON.parse(ls));
    const config = getConfig();
    FIELDS.forEach((field) => {
      document.getElementById(field).value = config[field] ?? DEFAULT_VALUES[field];
    });
    FIELDS_CB.forEach((field) => {
      document.getElementById(field).checked = config[field] ?? DEFAULT_VALUES_CB[field];
    });
    /* c8 ignore next */
  } catch (e) { /* do nothing */ }
};

const init = async () => {
  await loadTingleModalFiles(loadScript, loadStyle);
  await loadCaasTags();
  loadFromLS();

  window.addEventListener('beforeunload', () => {
    FIELDS.forEach((field) => {
      setConfig({ [field]: document.getElementById(field).value });
    });
    FIELDS_CB.forEach((field) => {
      setConfig({ [field]: document.getElementById(field).checked });
    });
    window.localStorage.setItem(LS_KEY, JSON.stringify(getConfig()));
  });

  const bulkPublishBtn = document.querySelector('#bulkpublish');
  bulkPublishBtn.addEventListener('click', () => {
    setConfig({
      host: document.getElementById('host').value,
      project: '',
      branch: 'main',
      caasEnv: document.getElementById('caasEnv').value,
      contentType: document.getElementById('contentType').value,
      repo: document.getElementById('repo').value,
      owner: document.getElementById('owner').value,
      urls: document.getElementById('urls').value,
      publishToFloodgate: document.getElementById('publishToFloodgate').value,
      draftOnly: document.getElementById('draftOnly').checked,
      useHtml: document.getElementById('useHtml').checked,
      usePreview: document.getElementById('usePreview').checked,
    });
    bulkPublish();
  });
};

export default init;
