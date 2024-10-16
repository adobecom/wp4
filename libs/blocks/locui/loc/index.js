import { getConfig, getLocale } from '../../../utils/utils.js';
import {
  heading,
  languages,
  urls,
  getSiteConfig,
  showLogin,
  telemetry,
  allowFindFragments,
  allowSyncToLangstore,
  canRefresh,
} from '../utils/state.js';
import { setStatus } from '../utils/status.js';
import { getStatus, preview } from '../utils/franklin.js';
import login from '../../../tools/sharepoint/login.js';
import { getServiceUpdates } from '../utils/miloc.js';

const LANG_ACTIONS = ['Translate', 'English Copy', 'Rollout'];
const MOCK_REFERRER = 'https%3A%2F%2Fadobe.sharepoint.com%2F%3Ax%3A%2Fr%2Fsites%2Fadobecom%2F_layouts%2F15%2FDoc.aspx%3Fsourcedoc%3D%257B94460FAC-CDEE-4B31-B8E0-AA5E3F45DCC5%257D%26file%3Dwesco-demo.xlsx';

const urlParams = new URLSearchParams(window.location.search);

let resourcePath;
let previewPath;

export function getUrls(jsonUrls, fgFlag = false) {
  if (jsonUrls.length === 0) return [];
  const { locales } = getConfig();
  // Assume all URLs will be the same locale as the first URL
  const locale = getLocale(locales, jsonUrls[0].pathname);
  const prefix = locale.prefix ? `/langstore${locale.prefix}` : '/langstore/en';
  const langstorePrefix = fgFlag ? '' : prefix;
  // Loop through each url to get langstore information
  return jsonUrls.map((url) => {
    url.langstore = {
      lang: locale.prefix ? locale.prefix.replace('/', '') : 'en',
      pathname: url.pathname.replace(locale.prefix, langstorePrefix),
    };
    return url;
  });
}

async function loadLocales() {
  const config = await getSiteConfig();
  languages.value = [...languages.value.map((language) => {
    const found = config.locales.data.find(
      (locale) => language.Language === locale.language,
    );
    if (found) language.code = found.languagecode;

    const locales = language.Locales || found?.livecopies;
    if (locales) {
      const localesTrim = locales.replaceAll(' ', '');
      language.locales = localesTrim.includes('\n') ? localesTrim.split('\n') : localesTrim.split(',');
    }
    return language;
  })];
}

async function loadProjectSettings(projSettings) {
  const settings = projSettings.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {});
  heading.value = { ...heading.value, env: settings.env, projectId: settings['Project ID'] };
  if (settings['Project ID']) {
    setStatus('service', 'info', 'Connecting to localiztion service.');
    await getServiceUpdates();
    setStatus('service');
  } else {
    canRefresh.value = true;
    allowFindFragments.value = true;
    allowSyncToLangstore.value = true;
  }
}

async function loadDetails() {
  setStatus('details', 'info', 'Loading languages and URLs.');
  try {
    const resp = await fetch(previewPath);
    const json = await resp.json();
    const jsonUrls = json.urls.data.map((item) => new URL(item.URL));
    const projectUrls = getUrls(jsonUrls);
    const projectLangs = json.languages.data.reduce((rdx, lang) => {
      if (LANG_ACTIONS.includes(lang.Action)) {
        lang.size = projectUrls.length;
        rdx.push(lang);
      }
      return rdx;
    }, []);
    languages.value = projectLangs;
    urls.value = projectUrls;
    if (json.settings) loadProjectSettings(json.settings.data);
    setStatus('details');
  } catch {
    setStatus('details', 'error', 'Error loading languages and URLs.');
  }
}

async function loadHeading() {
  setStatus('details', 'info', 'Getting latest project info.');
  const editUrl = urlParams.get('referrer') || MOCK_REFERRER;
  const json = await getStatus('', editUrl);
  resourcePath = json.resourcePath;
  previewPath = json.preview.url;
  const path = resourcePath.replace(/\.[^/.]+$/, '');
  setStatus('details');
  const projectName = json.edit.name.split('.').shift().replace('-', ' ');
  heading.value = { name: projectName, editUrl: json.edit.url, path };
  window.document.title = `${projectName} - LocUI`;
  await preview(`${path}.json`);
}

async function loginToSharePoint() {
  const scopes = ['files.readwrite', 'sites.readwrite.all'];
  await login({ scopes, telemetry });
}

export async function setup() {
  await loginToSharePoint();
  await loadHeading();
  await loadDetails();
  await loadLocales();
}

export async function autoSetup() {
  try {
    await setup();
  } catch {
    showLogin.value = true;
  }
}