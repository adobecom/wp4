import { getFederatedContentRoot } from '../../utils/federated.js';

let config;
let createTag;
let getMetadata;
let loadBlock;
let loadStyle;
let sendAnalyticsFunc;

const createTabsContainer = (tabNames) => {
  const ol = createTag('ol');
  tabNames.forEach((name) => {
    const li = createTag('li', null, name);
    ol.appendChild(li);
  });
  const olDiv = createTag('div', null, ol);
  const outerDiv = createTag('div', null, olDiv);
  const divTabs = createTag('div', { class: 'tabs quiet' }, outerDiv);
  return createTag('div', { class: 'section tabs-background-transparent' }, divTabs);
};

const createTab = (content, tabName) => {
  const divTab = createTag('div', null, 'tab');
  const divTagName = createTag('div', null, tabName);
  const tab = createTag('div');
  tab.appendChild(divTab);
  tab.appendChild(divTagName);
  const sectionMeta = createTag('div', { class: 'section-metadata' }, tab);
  const topDiv = createTag('div', { class: 'section' });
  topDiv.append(content);
  topDiv.append(sectionMeta);
  return topDiv;
};

export const getCookie = (name) => document.cookie
  .split('; ')
  .find((row) => row.startsWith(`${name}=`))
  ?.split('=')[1];

const getAkamaiCode = () => new Promise((resolve, reject) => {
  const urlParams = new URLSearchParams(window.location.search);
  const akamaiLocale = urlParams.get('akamaiLocale') || sessionStorage.getItem('akamai');
  if (akamaiLocale !== null) {
    resolve(akamaiLocale.toLowerCase());
  } else {
    /* c8 ignore next 5 */
    fetch('https://geo2.adobe.com/json/', { cache: 'no-cache' }).then((resp) => {
      if (resp.ok) {
        resp.json().then((data) => {
          const code = data.country.toLowerCase();
          sessionStorage.setItem('akamai', code);
          resolve(code);
        });
      } else {
        reject(new Error(`Something went wrong getting the akamai Code. Response status text: ${resp.statusText}`));
      }
    }).catch((error) => {
      reject(new Error(`Something went wrong getting the akamai Code. ${error.message}`));
    });
  }
});

// Determine if any of the locales can be linked to.
async function getAvailableLocales(locales) {
  const fallback = getMetadata('fallbackrouting') || config.fallbackRouting;

  const { prefix } = config.locale;
  let path = window.location.href.replace(`${window.location.origin}`, '');
  if (path.startsWith(prefix)) path = path.replace(prefix, '');

  const availableLocales = [];
  const pagesExist = [];
  locales.forEach((locale, index) => {
    const locPrefix = locale.prefix ? `/${locale.prefix}` : '';
    const localePath = `${locPrefix}${path}`;

    const pageExistsRequest = fetch(localePath, { method: 'HEAD' }).then((resp) => {
      if (resp.ok) {
        locale.url = localePath;
        availableLocales[index] = locale;
      } else if (fallback !== 'off') {
        locale.url = `${locPrefix}`;
        availableLocales[index] = locale;
      }
    });
    pagesExist.push(pageExistsRequest);
  });
  if (pagesExist.length > 0) await Promise.all(pagesExist);

  return availableLocales.filter((a) => !!a);
}

function getGeoroutingOverride() {
  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('georouting');
  const georouting = param || getCookie('georouting');
  if (param === 'off') {
    const domain = window.location.host.endsWith('.adobe.com') ? 'domain=adobe.com' : '';
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `georouting=${georouting};${expires};path=/;${domain}`;
  } else if (param === 'on') document.cookie = 'georouting=; expires= Thu, 01 Jan 1970 00:00:00 GMT';
  return georouting === 'off';
}

function decorateForOnLinkClick(link, urlPrefix, localePrefix, eventType = 'Switch') {
  const modCurrPrefix = localePrefix || 'us';
  const modPrefix = urlPrefix || 'us';
  const eventName = `${eventType}:${modPrefix.split('_')[0]}-${modCurrPrefix.split('_')[0]}|Geo_Routing_Modal`;
  link.setAttribute('daa-ll', eventName);
  link.addEventListener('click', () => {
    // set cookie so legacy code on adobecom still works properly.
    const domain = window.location.host === 'adobe.com'
      || window.location.host.endsWith('.adobe.com') ? 'domain=adobe.com' : '';
    document.cookie = `international=${modPrefix};path=/;${domain}`;
    link.closest('.dialog-modal').dispatchEvent(new Event('closeModal'));
  });
}

function getCodes(data) {
  return data.akamaiCodes.split(',').map((a) => a.toLowerCase().trim());
}

function getMatches(data, suppliedCode) {
  return data.reduce((rdx, locale) => {
    const localeCodes = getCodes(locale);
    if (localeCodes.some((code) => code === suppliedCode)) rdx.push(locale);
    return rdx;
  }, []);
}

function removeOnClickOutsideElement(element, event, button) {
  const func = (evt) => {
    if (event === evt) return; // ignore initial click event
    let targetEl = evt.target;
    while (targetEl) {
      if (targetEl === element) {
        // click inside
        return;
      }
      // Go up the DOM
      targetEl = targetEl.parentNode;
    }
    // This is a click outside.
    element.remove();
    button.setAttribute('aria-expanded', false);
    document.removeEventListener('click', func);
  };
  document.addEventListener('click', func);
}

function openPicker(button, locales, country, event, dir, currentPage) {
  if (document.querySelector('.locale-modal-v2 .picker')) {
    return;
  }
  const list = createTag('ul', { class: 'picker', dir });
  locales.forEach((l) => {
    const lang = config.locales[l.prefix]?.ietf ?? '';
    const a = createTag('a', { lang, href: l.url }, `${country} - ${l.language}`);
    decorateForOnLinkClick(a, l.prefix, currentPage.prefix);
    const li = createTag('li', {}, a);
    list.appendChild(li);
  });
  button.parentNode.insertBefore(list, button.nextSibling);
  const buttonRect = button.getBoundingClientRect();
  const spaceBelowButton = window.innerHeight - buttonRect.bottom;
  if (spaceBelowButton <= list.offsetHeight) {
    list.classList.add('top');
  }

  button.setAttribute('aria-expanded', true);
  removeOnClickOutsideElement(list, event, button);
}

function buildContent(currentPage, locale, geoData, locales) {
  const fragment = new DocumentFragment();
  const lang = config.locales[locale.prefix]?.ietf ?? '';
  const dir = config.locales[locale.prefix]?.dir ?? 'ltr';
  const geo = geoData.filter((c) => c.prefix === locale.prefix);
  const titleText = geo.length ? geo[0][currentPage.geo] : '';
  const title = createTag('h3', { lang, dir }, locale.title.replace('{{geo}}', titleText));
  const text = createTag('p', { class: 'locale-text', lang, dir }, locale.text);
  const flagFile = locale.globeGrid?.toLowerCase().trim() === 'on' ? 'globe-grid.png' : `flag-${locale.geo.replace('_', '-')}.svg`;
  const img = createTag('img', {
    class: 'icon-milo',
    width: 15,
    height: 15,
    alt: locale.button,
  });
  img.addEventListener(
    'error',
    () => (img.src = `${config.miloLibs || config.codeRoot}/features/georoutingv2/img/globe-grid.png`),
    { once: true },
  );
  img.src = `${config.miloLibs || config.codeRoot}/img/georouting/${flagFile}`;
  const span = createTag('span', { class: 'icon margin-inline-end' }, img);
  const mainAction = createTag('a', {
    class: 'con-button blue button-l', lang, role: 'button', 'aria-haspopup': !!locales, 'aria-expanded': false, href: '#',
  }, span);
  mainAction.append(locale.button);
  if (locales) {
    const downArrow = createTag('img', {
      class: 'icon-milo down-arrow',
      src: `${config.miloLibs || config.codeRoot}/ui/img/chevron.svg`,
      role: 'presentation',
      width: 15,
      height: 15,
    });
    span.appendChild(downArrow);
    mainAction.addEventListener('click', (e) => {
      e.preventDefault();
      openPicker(mainAction, locales, locale.button, e, dir, currentPage);
    });
  } else {
    mainAction.href = locale.url;
    decorateForOnLinkClick(mainAction, locale.prefix, currentPage.prefix);
  }

  const altAction = createTag('a', { lang, href: currentPage.url }, currentPage.button);
  decorateForOnLinkClick(altAction, currentPage.prefix, locale.prefix, 'Stay');
  const linkWrapper = createTag('div', { class: 'link-wrapper' }, mainAction);
  linkWrapper.appendChild(altAction);
  fragment.append(title, text, linkWrapper);
  return fragment;
}

async function getDetails(currentPage, localeMatches, geoData) {
  const availableLocales = await getAvailableLocales(localeMatches);
  if (!availableLocales.length) return null;
  const georoutingWrapper = createTag('div', { class: 'georouting-wrapper fragment' });
  currentPage.url = window.location.hash ? document.location.href : '#';
  if (availableLocales.length === 1) {
    const content = buildContent(currentPage, availableLocales[0], geoData);
    georoutingWrapper.appendChild(content);
    return georoutingWrapper;
  }
  const sortedLocales = availableLocales.sort((a, b) => a.languageOrder - b.languageOrder);
  const tabsContainer = createTabsContainer(sortedLocales.map((l) => l.language));
  georoutingWrapper.appendChild(tabsContainer);

  sortedLocales.forEach((locale) => {
    const content = buildContent(currentPage, locale, geoData, sortedLocales);
    const tab = createTab(content, locale.language);
    georoutingWrapper.appendChild(tab);
  });
  return georoutingWrapper;
}

async function showModal(details) {
  const { miloLibs, codeRoot } = config;

  const tabs = details.querySelector('.tabs');
  const sectionMetaPath = `${miloLibs || codeRoot}/blocks/section-metadata/section-metadata.css`;
  const georoutingPath = `${miloLibs || codeRoot}/features/georoutingv2/georoutingv2.css`;
  const promises = [
    tabs ? loadBlock(tabs) : null,
    tabs ? new Promise((resolve) => { loadStyle(sectionMetaPath, resolve); }) : null,
    new Promise((resolve) => { loadStyle(georoutingPath, resolve); }),
    import('../../blocks/modal/modal.js'),
  ];
  const result = await Promise.all(promises);
  const { getModal, sendAnalytics } = result[3];
  sendAnalyticsFunc = sendAnalytics;
  return getModal(null, { class: 'locale-modal-v2', id: 'locale-modal-v2', content: details, closeEvent: 'closeModal' });
}

export default async function loadGeoRouting(
  conf,
  createTagFunc,
  getMetadataFunc,
  loadBlockFunc,
  loadStyleFunc,
) {
  if (getGeoroutingOverride()) return;
  config = conf;
  createTag = createTagFunc;
  getMetadata = getMetadataFunc;
  loadBlock = loadBlockFunc;
  loadStyle = loadStyleFunc;

  const urls = [
    `${config.contentRoot ?? ''}/georoutingv2.json`,
    `${config.contentRoot ?? ''}/georouting.json`,
    `${getFederatedContentRoot()}/federal/georouting/georoutingv2.json`,
  ];
  let resp;
  for (const url of urls) {
    resp = await fetch(url);
    if (resp.ok) {
      if (url.includes('georouting.json')) {
        const json = await resp.json();
        // eslint-disable-next-line import/no-cycle
        const { default: loadGeoRoutingOld } = await import('../georouting/georouting.js');
        loadGeoRoutingOld(config, createTag, getMetadata, json);
      }
      break;
    }
  }
  const json = await resp.json();
  const { locale } = config;

  const urlLocale = locale.prefix.replace('/', '');
  const storedInter = getCookie('international');
  const storedLocale = storedInter === 'us' ? '' : storedInter;

  const urlGeoData = json.georouting.data.find((d) => d.prefix === urlLocale);
  if (!urlGeoData) return;

  if (storedLocale || storedLocale === '') {
    const urlLocaleGeo = urlLocale.split('_')[0];
    const storedLocaleGeo = storedLocale.split('_')[0];
    // Show modal when url and cookie disagree
    if (urlLocaleGeo !== storedLocaleGeo) {
      const localeMatches = json.georouting.data.filter(
        (d) => d.prefix === storedLocale,
      );
      const details = await getDetails(urlGeoData, localeMatches, json.geos.data);
      if (details) {
        await showModal(details);
        sendAnalyticsFunc(
          new Event(`Load:${storedLocaleGeo || 'us'}-${urlLocaleGeo || 'us'}|Geo_Routing_Modal`),
        );
      }
    }
    return;
  }

  // Show modal when derived countries from url locale and akamai disagree
  try {
    let akamaiCode = await getAkamaiCode();
    if (akamaiCode && !getCodes(urlGeoData).includes(akamaiCode)) {
      const localeMatches = getMatches(json.georouting.data, akamaiCode);
      const details = await getDetails(urlGeoData, localeMatches, json.geos.data);
      if (details) {
        await showModal(details);
        if (akamaiCode === 'gb') akamaiCode = 'uk';
        sendAnalyticsFunc(
          new Event(`Load:${urlLocale || 'us'}-${akamaiCode || 'us'}|Geo_Routing_Modal`),
        );
      }
    }
  } catch (e) {
    window.lana?.log(e.message);
  }
}
