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

const BODY = document.body;
const SIGNEDIN_EL = BODY.querySelector('.status-signed-in');
const SIGNEDOUT_EL = BODY.querySelector('.status-signed-out');

const LS_KEY = 'bulk-publish-caas';
const FIELDS = ['presetSelector', 'host', 'repo', 'owner', 'caasEnv', 'urls', 'contentType', 'publishToFloodgate'];
const FIELDS_CB = ['draftOnly', 'useHtml', 'usePreview'];
const DEFAULT_VALUES = {
  preset: 'default',
  caasEnv: 'prod',
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
  useHtml: false,
};

// Hold the selected preset data
let selectedPreset = {};

const fetchExcelJson = async (url) => {
  const resp = await fetch(url);
  if (resp.ok) {
    const json = await resp.json();
    return json.data;
  }
  return [];
};

const checkIms = async (prompt = true) => {
  const accessToken = await getImsToken(loadScript);
  if (!accessToken && prompt) {
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

const getPageDom = async (url, now) => {
  try {
    const resp = await fetch(`${url}?timestamp=${now.getTime()}`);
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

const showClearResultsTables = () => {
  const clearResultsButton = document.querySelector('.clear-results');
  clearResultsButton.style.display = 'block';
};

const resetResultsTables = () => {
  const successTable = document.querySelector('.success-table');
  const successTBody = successTable.querySelector('tbody');
  successTBody.innerHTML = '';
  successTable.style.display = 'none';
  const errorTable = document.querySelector('.error-table');
  const errorTBody = errorTable.querySelector('tbody');
  errorTBody.innerHTML = '';
  errorTable.style.display = 'none';
};

const showSuccessTable = (successArr) => {
  showClearResultsTables();
  const env = getConfig().caasEnv === 'prod' ? '' : `-${getConfig().caasEnv}`;
  const chimeraEndpoint = `https://14257-chimera${env}.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection?debug=1&featuredCards=`;
  const successTable = document.querySelector('.success-table');
  const tableBody = successTable.querySelector('tbody');
  successTable.style.display = 'block';
  let index = 0;
  /* eslint-disable no-plusplus */
  successArr.forEach(([pageUrl, response]) => {
    tableBody.innerHTML += `<tr>
      <td>${++index}</td>
      <td class="ok">OK</td>
      <td><a href="${pageUrl}" title="View page">${pageUrl}</a></td>
      <td class="entityid"><a target="_blank" href="${chimeraEndpoint}${response}" title="View Card JSON">${response}</a></td>
    </tr>`;
  });
  /* eslint-enable no-plusplus */
};

const showErrorTable = (errorArr) => {
  showClearResultsTables();
  const errorTable = document.querySelector('.error-table');
  const tableBody = errorTable.querySelector('tbody');
  errorTable.style.display = 'block';
  let index = 0;
  /* eslint-disable no-plusplus */
  errorArr.forEach(([pageUrl, response]) => {
    index += 1;
    const message = response.error ? response.error.replace(/:.*/, '') : response;
    tableBody.innerHTML += `<tr>
      <td>${index}</td>
      <td class="error">Failed</td>
      <td><a href="${pageUrl}">${pageUrl}</a></td>
      <td>${message}</td>
    </tr>`;
  });
  /* eslint-enable no-plusplus */
};

const processData = async (data, accessToken) => {
  const errorArr = [];
  const successArr = [];
  let index = 0;
  let keepGoing = true;
  const now = new Date();

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
    showAlert('You must select a Preset, or use the Advanced option to enter the necessary information.', { error: true });
    if (statusModal.modal) statusModal.close();
    return;
  }

  let domain = `https://${host}`;

  if (usePreview) {
    domain = `https://stage--${repo}--${owner}.hlx.page`;
  } else if (publishToFloodgate !== 'default') {
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

      const { dom, error, lastModified } = await getPageDom(pageUrl, now);
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
      errorArr.push(['Error:', e.message]);
    }
  }

  if (statusModal.modal) statusModal.close();

  SIGNEDIN_EL.style.display = 'none';
  SIGNEDOUT_EL.style.display = 'none';
  resetResultsTables();
  if (successArr.length) {
    showSuccessTable(successArr);
  }
  if (errorArr.length) {
    showErrorTable(errorArr);
  }

  showAlert(`Successfully published ${successArr.length} pages. \n\n Failed to publish ${errorArr.length} pages.`);
};

const bulkPublish = async () => {
  const accessToken = await checkIms();
  if (!accessToken) return;

  const { urls } = getConfig();

  if (!urls) {
    await showAlert('Enter a URL or list of URLs, each on a separate line, to be sent to CaaS.', { error: true });
  }

  const data = urls ? urls.split('\n') : '';

  await processData(data, accessToken);
};

const loadFromLS = () => {
  BODY.classList = '';
  const ls = localStorage.getItem(LS_KEY);
  if (!ls || !ls.includes('presetSelector')) return;
  try {
    setConfig(JSON.parse(ls));
    const config = getConfig();
    FIELDS.forEach((field) => {
      document.getElementById(field).value = config[field] ?? DEFAULT_VALUES[field];
      if (field === 'presetSelector' && config[field] === 'advanced') {
        BODY.classList = 'advanced';
      } else if (field === 'presetSelector' && config[field] !== 'default') {
        BODY.classList = 'preset';
      }
    });
    FIELDS_CB.forEach((field) => {
      document.getElementById(field).checked = config[field] ?? DEFAULT_VALUES_CB[field];
    });

    /* c8 ignore next */
  } catch (e) { /* do nothing */ }
};

const publishWarning = document.querySelector('.publish-warning');
const checkCaasEnv = () => {
  // eslint-disable-next-line no-undef
  if (caasEnv.value === 'prod' && !draftOnly.checked) {
    publishWarning.style.height = '30px';
  } else {
    publishWarning.style.height = '0';
  }
};

// presets options
const presetsJsonPath = 'https://milo.adobe.com/drafts/caas/bppresets.json';
let presetsData = {};
const getPresetsData = async () => {
  fetchExcelJson(presetsJsonPath).then((presets) => {
    const separator = document.querySelector('.separator');
    const parent = separator.parentElement;
    presetsData = presets;
    presets.forEach((preset) => {
      const option = document.createElement('option');
      option.value = preset.repo;
      option.text = `${preset.name} (${preset.repo})`;
      parent.insertBefore(option, separator);
    });
  });
};

const resetAdvancedOptions = () => {
  /* eslint-disable no-undef */
  caasEnv.value = 'prod';
  contentType.value = 'auto';
  draftOnly.checked = false;
  useHtml.checked = false;
  usePreview.checked = false;
  publishToFloodgate.value = 'default';
  /* eslint-enable no-undef */
};

const setTheme = () => {
  const theme = localStorage.getItem('bp-theme');
  const useDarkTheme = theme === 'dark'
    || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (useDarkTheme) {
    document.querySelector('.bulk-publisher').classList.add('dark');
    document.querySelector('#option-dark').checked = true;
  } else {
    document.querySelector('#option-light').checked = true;
  }
};

// eslint-disable-next-line no-undef
presetSelector.addEventListener('change', () => {
  // eslint-disable-next-line no-undef
  const { value } = presetSelector;
  selectedPreset = presetsData.find((item) => item.id === value) || {};
  BODY.classList = '';

  if (value === 'advanced') {
    BODY.classList.add('advanced');
    return;
  }
  if (value === 'default') {
    BODY.classList = '';
  } else {
    BODY.classList.add('preset');
  }

  resetAdvancedOptions();
  const ls = localStorage.getItem(LS_KEY);
  const config = ls ? JSON.parse(ls) : {};
  config.presetSelector = selectedPreset.id || 'default';
  // eslint-disable-next-line no-undef
  config.caasEnv = caasEnv.value;
  config.host = selectedPreset.host || '';
  config.owner = selectedPreset.owner || '';
  config.repo = selectedPreset.repo || '';
  config.useHtml = selectedPreset.useHtml === 'true';
  if (selectedPreset.contentType === '' || selectedPreset.contentType?.toLowerCase() === 'auto') {
    config.contentType = 'auto';
  } else {
    config.contentType = selectedPreset.contentType;
  }

  setConfig(config);
  window.localStorage.setItem(LS_KEY, JSON.stringify(getConfig()));

  loadFromLS();
  checkCaasEnv();
});

const clearResultsButton = document.querySelector('.clear-results');
clearResultsButton.addEventListener('click', () => {
  resetResultsTables();
  clearResultsButton.style.display = 'none';
  SIGNEDIN_EL.style.display = 'block';
});

// eslint-disable-next-line no-undef
caasEnv.addEventListener('change', () => {
  checkCaasEnv();
});

// eslint-disable-next-line no-undef
draftOnly.addEventListener('change', () => {
  checkCaasEnv();
});

const checkUserStatus = async () => {
  const accessToken = await checkIms(false);
  if (accessToken) {
    document.querySelector('.status-checking').style.display = 'none';
    SIGNEDIN_EL.style.display = 'block';
  } else {
    document.querySelector('.status-checking').style.display = 'none';
    SIGNEDOUT_EL.style.display = 'block';
  }
  return true;
};

const feecbackButton = document.querySelector('.feedback');
feecbackButton.addEventListener('click', () => {
  showAlert(`<p><b>Feedback and Comments</b></p>
    <p>Feedback for this tool is always welcome.</p>
    <p>For reporting issues or sharing comments, please use the <b>#javelin-friends</b> channel on Slack</p>
    <p><i>The Javelin Team</i></p>`);
});

const helpButtons = document.querySelectorAll('.help');
helpButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const el = e.target.classList[1];
    switch (el) {
      case 'host':
        showAlert(`<p><b>Host</b><p>Enter the host of the site you are publishing content to.</p>
          <p>
           <tt>&nbsp; milo.adobe.com</tt> <br>
           <tt>&nbsp; blog.adobe.com</tt> <br>
           <tt>&nbsp; business.adobe.com</tt>.</p>`);
        break;

      case 'repo':
        showAlert(`<p><b>Repo</b></p>
          <p>The <b>Repo</b> is the name of the repository where the content will be published.</p>
          <p>For example:</p>
          <p><tt>https://main--<b>{repo}</b>--{owner}.hlx.live</tt>`);
        break;

      case 'owner':
        showAlert(`<p><b>Repo Owner</b></p>
          <p>The <b>Repo Owner</b> is the owner of the repository where the content will be published. For example:</p>
          <p><tt>https://main--{repo}--<b>{owner}</b>.hlx.live</tt>`);
        break;

      case 'content-type-fallback':
        showAlert(`<p><b>ContentType Fallback</b></p>
          <p>This is the <b>content-type</b> tag that will be applied to all cards that do not have
          a specific <b>content-type</b> tag included in their metadata.</p>`);
        break;

      case 'caas-env':
        showAlert(`<p><b>CaaS Enviroment</b></p>
          <p>This is the CaaS environment where the content will be published.</p>`);
        break;

      case 'floodgate':
        showAlert(`<p><b>FloodGate</b></p>
          <p>Use this option to select the <b>FloodGate</b> color for the content.</p>`);
        break;

      case 'publish-to-draft':
        showAlert(`<p><b>Publish to CaaS DRAFT only</b></p>
          <p>When this is option checked, the content will be sent to the CaaS <b>DRAFT</b> container <i>only</i>. </p>
          <p>With this option unchecked, the content is sent to both, the CaaS <b>LIVE</b> and <b>DRAFT</b> containers.</p>`);
        break;

      case 'use-html':
        showAlert(`<p><b>Add HTML to Links</b></p>
          <p>When this option is checked, the bulkpublisher will add the <b>.html</b> extension to the CTA links.</p>`);
        break;

      case 'use-preview':
        showAlert(`<p><b>Use Preview Content</b>
          <p>When this option is checked, the tool will publish content from:
          <p><tt>https://stage--{repo}--{owner}.hlx.<b>page</b></tt>
          <p>This can be useful for testing before publishing to production.</p>`);
        break;

      default:
        showAlert(`<p><b>Help</b><p>Help for "${el}" is on its way! Stay tuned.</p>`);
        break;
    }
  });
});

const themeOptions = document.querySelectorAll('.theme-options');
themeOptions.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.value === 'dark') {
      document.querySelector('.bulk-publisher').classList.add('dark');
      localStorage.setItem('bp-theme', 'dark');
    } else {
      document.querySelector('.bulk-publisher').classList.remove('dark');
      localStorage.setItem('bp-theme', 'light');
    }
  });
});

const init = async () => {
  setTheme();
  await getPresetsData();
  await loadTingleModalFiles(loadScript, loadStyle);
  await loadCaasTags();
  loadFromLS();
  checkCaasEnv();
  checkUserStatus();

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
      caasEnv: document.getElementById('caasEnv').value || 'prod',
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
