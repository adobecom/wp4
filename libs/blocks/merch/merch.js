import {
  createTag, getConfig, loadArea, loadScript, loadStyle, localizeLink, SLD,
} from '../../utils/utils.js';
import { replaceKey } from '../../features/placeholders.js';

export const CHECKOUT_LINK_CONFIG_PATH = '/commerce/checkout-link.json'; // relative to libs.

export const PRICE_TEMPLATE_DISCOUNT = 'discount';
export const PRICE_TEMPLATE_OPTICAL = 'optical';
export const PRICE_TEMPLATE_REGULAR = 'price';
export const PRICE_TEMPLATE_STRIKETHROUGH = 'strikethrough';
export const PRICE_TEMPLATE_ANNUAL = 'annual';

const PRICE_TEMPLATE_MAPPING = new Map([
  ['priceDiscount', PRICE_TEMPLATE_DISCOUNT],
  [PRICE_TEMPLATE_DISCOUNT, PRICE_TEMPLATE_DISCOUNT],
  ['priceOptical', PRICE_TEMPLATE_OPTICAL],
  [PRICE_TEMPLATE_OPTICAL, PRICE_TEMPLATE_OPTICAL],
  ['priceStrikethrough', PRICE_TEMPLATE_STRIKETHROUGH],
  [PRICE_TEMPLATE_STRIKETHROUGH, PRICE_TEMPLATE_STRIKETHROUGH],
  ['priceAnnual', PRICE_TEMPLATE_ANNUAL],
  [PRICE_TEMPLATE_ANNUAL, PRICE_TEMPLATE_ANNUAL],
]);

export const PLACEHOLDER_KEY_DOWNLOAD = 'download';

export const CC_SINGLE_APPS = [
  ['3D_TEXTURING'],
  ['3DI'],
  ['ACROBAT', 'ACROBAT_STOCK_BUNDLE'],
  ['AFTEREFFECTS', 'AFTER_EFFECTS_STOCK_BUNDLE'],
  ['AUDITION', 'AUDITION_STOCK_BUNDLE'],
  ['CC_EXPRESS'],
  ['FLASH', 'FLASH_STOCK_BUNDLE'],
  ['DREAMWEAVER', 'DREAMWEAVER_STOCK_BUNDLE'],
  ['EDGE_ANIMATE'],
  ['ILLUSTRATOR', 'ILLUSTRATOR_STOCK_BUNDLE'],
  ['INCOPY', 'INCOPY_STOCK_BUNDLE'],
  ['INDESIGN', 'INDESIGN_STOCK_BUNDLE'],
  ['PHOTOGRAPHY', 'PHOTOGRAPHY_STOCK_BUNDLE'],
  ['PHOTOSHOP_LIGHTROOM'],
  ['PHOTOSHOP', 'PHOTOSHOP_STOCK_BUNDLE'],
  ['PREMIERE', 'PREMIERE_STOCK_BUNDLE'],
  ['RUSH'],
  ['XD'],
];

const GeoMap = {
  ar: 'AR_es',
  be_en: 'BE_en',
  be_fr: 'BE_fr',
  be_nl: 'BE_nl',
  br: 'BR_pt',
  ca: 'CA_en',
  ch_de: 'CH_de',
  ch_fr: 'CH_fr',
  ch_it: 'CH_it',
  cl: 'CL_es',
  co: 'CO_es',
  la: 'DO_es',
  mx: 'MX_es',
  pe: 'PE_es',
  africa: 'MU_en',
  dk: 'DK_da',
  de: 'DE_de',
  ee: 'EE_et',
  eg_ar: 'EG_ar',
  eg_en: 'EG_en',
  es: 'ES_es',
  fr: 'FR_fr',
  gr_el: 'GR_el',
  gr_en: 'GR_en',
  ie: 'IE_en',
  il_he: 'IL_iw',
  it: 'IT_it',
  lv: 'LV_lv',
  lt: 'LT_lt',
  lu_de: 'LU_de',
  lu_en: 'LU_en',
  lu_fr: 'LU_fr',
  my_en: 'MY_en',
  my_ms: 'MY_ms',
  hu: 'HU_hu',
  mt: 'MT_en',
  mena_en: 'DZ_en',
  mena_ar: 'DZ_ar',
  nl: 'NL_nl',
  no: 'NO_nb',
  pl: 'PL_pl',
  pt: 'PT_pt',
  ro: 'RO_ro',
  si: 'SI_sl',
  sk: 'SK_sk',
  fi: 'FI_fi',
  se: 'SE_sv',
  tr: 'TR_tr',
  uk: 'GB_en',
  at: 'AT_de',
  cz: 'CZ_cs',
  bg: 'BG_bg',
  ru: 'RU_ru',
  ua: 'UA_uk',
  au: 'AU_en',
  in_en: 'IN_en',
  in_hi: 'IN_hi',
  id_en: 'ID_en',
  id_id: 'ID_in',
  nz: 'NZ_en',
  sa_ar: 'SA_ar',
  sa_en: 'SA_en',
  sg: 'SG_en',
  cn: 'CN_zh-Hans',
  tw: 'TW_zh-Hant',
  hk_zh: 'HK_zh-hant',
  jp: 'JP_ja',
  kr: 'KR_ko',
  za: 'ZA_en',
  ng: 'NG_en',
  cr: 'CR_es',
  ec: 'EC_es',
  pr: 'US_es', // not a typo, should be US
  gt: 'GT_es',
  cis_en: 'AZ_en',
  cis_ru: 'AZ_ru',
  sea: 'SG_en',
  th_en: 'TH_en',
  th_th: 'TH_th',
};

export function getMiloLocaleSettings(locale) {
  const localePrefix = locale?.prefix || 'US_en';
  const geo = localePrefix.replace('/', '') ?? '';
  let [country = 'US', language = 'en'] = (
    GeoMap[geo] ?? geo
  ).split('_', 2);

  country = country.toUpperCase();
  language = language.toLowerCase();

  return {
    language,
    country,
    locale: `${language}_${country}`,
  };
}

/* Optional checkout link params that are appended to checkout urls as is */
export const CHECKOUT_ALLOWED_KEYS = [
  'af',
  'ai',
  'apc',
  'appctxid',
  'cli',
  'co',
  'csm',
  'ctx',
  'ctxRtUrl',
  'DCWATC',
  'dp', // Enable digital payments for iframe context
  'fr', // represents the commerce app redirecting to UC
  'gsp',
  'ijt',
  'lang',
  'lo',
  'mal',
  'ms',
  'mv',
  'mv2',
  'nglwfdata',
  'ot',
  'otac',
  'pa',
  'pcid', // Unified Paywall configuration ID for analytics
  'promoid',
  'q',
  'rf',
  'sc',
  'scl',
  'sdid',
  'sid', // x-adobe-clientsession
  'spint',
  'svar',
  'th',
  'thm',
  'trackingid',
  'usid',
  'workflowid',
  'context.guid',
  'so.ca',
  'so.su',
  'so.tr',
  'so.va',
  // below keys are mapped to shorted versions.
  'quantity',
  'authCode',
  'checkoutPromoCode',
  'rurl',
  'curl',
  'ctxrturl',
  'country',
  'language',
  'clientId',
  'context',
  'productArrangementCode',
  'offerType',
  'marketSegment',
];

export const CC_SINGLE_APPS_ALL = CC_SINGLE_APPS.flatMap((item) => item);

export const CC_ALL_APPS = ['CC_ALL_APPS',
  'CC_ALL_APPS_STOCK_BUNDLE', 'CC_PRO'];

const NAME_LOCALE = 'LOCALE';
const NAME_PRODUCT_FAMILY = 'PRODUCT_FAMILY';
const FREE_TRIAL_PATH = 'FREE_TRIAL_PATH';
const BUY_NOW_PATH = 'BUY_NOW_PATH';
const FREE_TRIAL_HASH = 'FREE_TRIAL_HASH';
const BUY_NOW_HASH = 'BUY_NOW_HASH';
const OFFER_TYPE_TRIAL = 'TRIAL';
const LOADING_ENTITLEMENTS = 'loading-entitlements';

let log;
let upgradeOffer = null;

/**
 * Given a url, calculates the hostname of MAS platform.
 * Supports, www prod, stage, local and feature branches.
 * if params are missing, it will return the latest calculated or default value.
 * @param {string} hostname optional
 * @param {string} maslibs optional
 * @returns base url for mas platform
 */
export function getMasBase(hostname, maslibs) {
  let { baseUrl } = getMasBase;
  if (!baseUrl) {
    if (maslibs === 'stage') {
      baseUrl = 'https://www.stage.adobe.com/mas';
    } else if (maslibs === 'local') {
      baseUrl = 'http://localhost:9001';
    } else if (maslibs) {
      const extension = /.page$/.test(hostname) ? 'page' : 'live';
      baseUrl = `https://${maslibs}.${SLD}.${extension}`;
    } else {
      baseUrl = 'https://www.adobe.com/mas';
    }
    getMasBase.baseUrl = baseUrl;
  }
  return baseUrl;
}

export async function polyfills() {
  if (polyfills.promise) return polyfills.promise;
  let isSupported = false;
  document.createElement('div', {
    // eslint-disable-next-line getter-return
    get is() {
      isSupported = true;
    },
  });
  if (isSupported) {
    polyfills.promise = Promise.resolve();
  } else {
    const { base } = getConfig();
    polyfills.promise = await loadScript(`${base}/deps/custom-elements.js`);
  }
  return polyfills.promise;
}

export async function fetchEntitlements() {
  fetchEntitlements.promise = fetchEntitlements.promise ?? import('../global-navigation/utilities/getUserEntitlements.js')
    .then(({ default: getUserEntitlements }) => getUserEntitlements(
      {
        params:
          [
            { name: 'include', value: 'OFFER.PRODUCT_ARRANGEMENT' }],
        format: 'raw',
      },
    ));
  return fetchEntitlements.promise;
}

export async function fetchCheckoutLinkConfigs(base = '') {
  fetchCheckoutLinkConfigs.promise = fetchCheckoutLinkConfigs.promise
    ?? fetch(`${base}${CHECKOUT_LINK_CONFIG_PATH}`).catch((e) => {
      log?.error('Failed to fetch checkout link configs', e);
    }).then((mappings) => {
      if (!mappings?.ok) return { data: [] };
      return mappings.json();
    });
  return fetchCheckoutLinkConfigs.promise;
}

export async function getCheckoutLinkConfig(productFamily, productCode, paCode) {
  let { base } = getConfig();
  if (/\.page$/.test(document.location.origin)) {
    /* c8 ignore next 2 */
    base = base.replace('.live', '.page');
  }
  const checkoutLinkConfigs = await fetchCheckoutLinkConfigs(base);
  if (!checkoutLinkConfigs.data.length) return undefined;
  const { locale: { region } } = getConfig();

  const {
    paCodeConfigs,
    productCodeConfigs,
    productFamilyConfigs,
  } = checkoutLinkConfigs.data.reduce((acc, config) => {
    if (config[NAME_PRODUCT_FAMILY] === paCode) {
      acc.paCodeConfigs.push(config);
    } else if (config[NAME_PRODUCT_FAMILY] === productCode) {
      acc.productCodeConfigs.push(config);
    } else if (config[NAME_PRODUCT_FAMILY] === productFamily) {
      acc.productFamilyConfigs.push(config);
    }
    return acc;
  }, { paCodeConfigs: [], productCodeConfigs: [], productFamilyConfigs: [] });

  // helps to fallback to product family config
  // if no locale specific config is found below.
  const productCheckoutLinkConfigs = [
    ...paCodeConfigs, ...productCodeConfigs, ...productFamilyConfigs,
  ];

  if (!productCheckoutLinkConfigs.length) return undefined;
  const checkoutLinkConfig = productCheckoutLinkConfigs.find(
    ({ [NAME_LOCALE]: locale }) => locale === '',
  );
  const checkoutLinkConfigOverride = productCheckoutLinkConfigs.find(
    ({ [NAME_LOCALE]: locale }) => locale === region,
  ) ?? {};
  const overrides = Object.fromEntries(
    Object.entries(checkoutLinkConfigOverride).filter(([, value]) => value),
  );
  const finalConfig = { ...checkoutLinkConfig, ...overrides };
  Object.entries(finalConfig).forEach(([key, value]) => {
    if (value === 'X' || value === '❌') {
      finalConfig[key] = '';
    }
  });
  return finalConfig;
}

export async function getDownloadAction(
  options,
  imsSignedInPromise,
  [{
    offerType,
    productArrangementCode,
    productArrangement: { productCode, productFamily: offerFamily } = {},
  }],
) {
  if (options.entitlement !== true) return undefined;
  const loggedIn = await imsSignedInPromise;
  if (!loggedIn) return undefined;
  const entitlements = await fetchEntitlements();
  if (!entitlements?.length) return undefined;
  const checkoutLinkConfig = await getCheckoutLinkConfig(
    offerFamily,
    productCode,
    productArrangementCode,
  );
  if (!checkoutLinkConfig?.DOWNLOAD_URL) return undefined;
  const offer = entitlements.find((
    { offer: { product_arrangement: { family: subscriptionFamily } } },
  ) => {
    if (CC_ALL_APPS.includes(subscriptionFamily)) return true; // has all apps
    if (CC_ALL_APPS.includes(offerFamily)) return false; // hasn't all apps and cta is all apps
    const singleAppFamily = CC_SINGLE_APPS // has single and and cta is single app
      .find((singleAppFamilies) => singleAppFamilies.includes(offerFamily));
    return singleAppFamily?.includes(subscriptionFamily);
  });
  if (!offer) return undefined;
  const config = getConfig();
  const text = await replaceKey(checkoutLinkConfig.DOWNLOAD_TEXT
      || PLACEHOLDER_KEY_DOWNLOAD, config);
  const url = localizeLink(checkoutLinkConfig.DOWNLOAD_URL);
  const type = offerType?.toLowerCase() ?? '';
  return { text, className: `download ${type}`, url };
}

export async function getUpgradeAction(
  options,
  imsSignedInPromise,
  [{ productArrangement: { productFamily: offerFamily } = {} }],
) {
  if (!options.upgrade) return undefined;
  const loggedIn = await imsSignedInPromise;
  if (!loggedIn) return undefined;
  const entitlements = await fetchEntitlements();
  if (upgradeOffer === null) {
    upgradeOffer = undefined;
    // will enter only once
    upgradeOffer = await document.querySelector('.merch-offers.upgrade [data-wcs-osi]');
  }
  await upgradeOffer?.onceSettled();
  if (upgradeOffer && entitlements?.length && offerFamily) {
    const { default: handleUpgradeOffer } = await import('./upgrade.js');
    const upgradeAction = await handleUpgradeOffer(
      offerFamily,
      upgradeOffer,
      entitlements,
      CC_SINGLE_APPS_ALL,
      CC_ALL_APPS,
    );
    return upgradeAction;
  }
  return undefined;
}

async function openFragmentModal(path, getModal) {
  const root = createTag('div');
  root.style.visibility = 'hidden';
  createTag('a', { href: `${path}` }, '', { parent: root });
  const modal = await getModal(null, {
    id: 'checkout-link-modal',
    content: root,
    closeEvent: 'closeModal',
    class: 'commerce-frame',
  });
  await loadArea(modal);
  root.style.visibility = '';
  return modal;
}

export function appendTabName(url) {
  const metaPreselectPlan = document.querySelector('meta[name="preselect-plan"]');
  if (!metaPreselectPlan?.content) return url;
  let urlWithPlan;
  try {
    urlWithPlan = new URL(url);
  } catch (err) {
    window.lana?.log(`Invalid URL ${url} : ${err}`);
    return url;
  }
  urlWithPlan.searchParams.set('plan', metaPreselectPlan.content);
  return urlWithPlan.href;
}

export function appendExtraOptions(url, extraOptions) {
  if (!extraOptions) return url;
  const extraOptionsObj = JSON.parse(extraOptions);
  let urlWithExtraOptions;
  try {
    urlWithExtraOptions = new URL(url);
  } catch (err) {
    window.lana?.log(`Invalid URL ${url} : ${err}`);
    return url;
  }
  Object.keys(extraOptionsObj).forEach((key) => {
    if (CHECKOUT_ALLOWED_KEYS.includes(key)) {
      urlWithExtraOptions.searchParams.set(key, extraOptionsObj[key]);
    }
  });
  return urlWithExtraOptions.href;
}

async function openExternalModal(url, getModal, extraOptions) {
  await loadStyle(`${getConfig().base}/blocks/iframe/iframe.css`);
  const root = createTag('div', { class: 'milo-iframe' });
  const urlWithTabName = appendTabName(url);
  const urlWithExtraOptions = appendExtraOptions(urlWithTabName, extraOptions);
  createTag('iframe', {
    src: urlWithExtraOptions,
    frameborder: '0',
    marginwidth: '0',
    marginheight: '0',
    allowfullscreen: 'true',
    loading: 'lazy',
  }, '', { parent: root });
  return getModal(null, {
    id: 'checkout-link-modal',
    content: root,
    closeEvent: 'closeModal',
    class: 'commerce-frame',
  });
}

const isInternalModal = (url) => /\/fragments\//.test(url);

export async function openModal(e, url, offerType, hash, extraOptions) {
  e.preventDefault();
  e.stopImmediatePropagation();
  const { getModal } = await import('../modal/modal.js');
  await import('../modal/modal.merch.js');
  const offerTypeClass = offerType === OFFER_TYPE_TRIAL ? 'twp' : 'crm';
  let modal;
  if (hash) {
    const prevHash = window.location.hash.replace('#', '') === hash ? '' : window.location.hash;
    window.location.hash = hash;
    window.addEventListener('milo:modal:closed', () => {
      window.history.pushState({}, document.title, `#${prevHash}`);
    }, { once: true });
  }
  if (isInternalModal(url)) {
    const fragmentPath = url.split(/(hlx|aem).(page|live)/).pop();
    modal = await openFragmentModal(fragmentPath, getModal);
  } else {
    modal = await openExternalModal(url, getModal, extraOptions);
  }
  if (modal) {
    modal.classList.add(offerTypeClass);
  }
}

export function setCtaHash(el, checkoutLinkConfig, offerType) {
  if (!(el && checkoutLinkConfig && offerType)) return undefined;
  const hash = checkoutLinkConfig[`${(offerType === OFFER_TYPE_TRIAL) ? FREE_TRIAL_HASH : BUY_NOW_HASH}`];
  if (hash) {
    el.setAttribute('data-modal-id', hash);
  }
  return hash;
}

const isProdModal = (url) => {
  try {
    return (new URL(url)).hostname.endsWith('.adobe.com');
  } catch (e) {
    return false;
  }
};

export async function getModalAction(offers, options, el) {
  const [{
    offerType,
    productArrangementCode,
    productArrangement: { productCode, productFamily: offerFamily } = {},
  }] = offers ?? [{}];
  if (options.modal !== true) return undefined;
  const checkoutLinkConfig = await getCheckoutLinkConfig(
    offerFamily,
    productCode,
    productArrangementCode,
  );
  if (!checkoutLinkConfig) return undefined;
  const columnName = (offerType === OFFER_TYPE_TRIAL) ? FREE_TRIAL_PATH : BUY_NOW_PATH;
  const hash = setCtaHash(el, checkoutLinkConfig, offerType);
  let url = checkoutLinkConfig[columnName];
  if (!url) return undefined;
  url = isInternalModal(url) || isProdModal(url)
    ? localizeLink(checkoutLinkConfig[columnName]) : checkoutLinkConfig[columnName];
  return { url, handler: (e) => openModal(e, url, offerType, hash, options.extraOptions) };
}

export async function getCheckoutAction(offers, options, imsSignedInPromise, el) {
  try {
    await imsSignedInPromise;
    const [downloadAction, upgradeAction, modalAction] = await Promise.all([
      getDownloadAction(options, imsSignedInPromise, offers),
      getUpgradeAction(options, imsSignedInPromise, offers),
      getModalAction(offers, options, el),
    ]);
    return downloadAction || upgradeAction || modalAction;
  } catch (e) {
    log?.error('Failed to resolve checkout action', e);
    return [];
  }
}

/**
 * Activates commerce service and returns a promise resolving to its ready-to-use instance.
 */
export async function initService(force = false, attributes = {}) {
  if (force) {
    initService.promise = undefined;
    document.head.querySelector('mas-commerce-service')?.remove();
    fetchEntitlements.promise = undefined;
    fetchCheckoutLinkConfigs.promise = undefined;
  }
  const { commerce, env: miloEnv, locale: miloLocale } = getConfig();

  const extraAttrs = [
    'checkout-workflow-step',
    'force-tax-exclusive',
    'checkout-client-id',
    'allow-override',
  ];

  extraAttrs.forEach((attr) => {
    const camelCaseAttr = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    // eslint-disable-next-line no-prototype-builtins
    if (commerce?.hasOwnProperty(camelCaseAttr)) {
      const value = commerce[camelCaseAttr];
      delete commerce[camelCaseAttr];
      commerce[attr] = value;
    }
  });
  initService.promise = initService.promise ?? polyfills().then(async () => {
    await import('../../deps/mas/commerce.js');
    const { language, locale, country } = getMiloLocaleSettings(miloLocale);
    let service = document.head.querySelector('mas-commerce-service');
    if (!service) {
      service = createTag('mas-commerce-service', {
        locale,
        language,
        ...attributes,
        ...commerce,
      });
      if (miloEnv?.name !== 'prod') {
        service.setAttribute('allow-override', '');
      }
      service.registerCheckoutAction(getCheckoutAction);
      document.head.append(service);
      await service.readyPromise;
      service.imsSignedInPromise?.then((isSignedIn) => {
        if (isSignedIn) fetchEntitlements();
      });
    }
    if (country === 'AU') {
      await loadStyle(`${getConfig().base}/blocks/merch/au-merch.css`);
    }
    return service;
  });
  return initService.promise;
}

export async function getCommerceContext(el, params) {
  const wcsOsi = params.get('osi');
  if (!wcsOsi) return null;
  const perpetual = params.get('perp') === 'true' || undefined;
  const promotionCode = (
    params.get('promo') ?? params.get('promotionCode') ?? el.closest('[data-promotion-code]')?.dataset.promotionCode
  ) || undefined;
  return { promotionCode, perpetual, wcsOsi };
}

/**
 * Checkout parameter can be set on the merch link,
 * code config (scripts.js) or be a default from tacocat.
 * To get the default, 'undefined' should be passed, empty string will trigger an error!
 *
 * clientId - code config -> default (adobe_com)
 * workflow - merch link -> metadata -> default (UCv3)
 * workflowStep - merch link -> default (email)
 * marketSegment - merch link -> default (COM)
 * @param {{params: URLSearchParams, service: {settings: object}}} context
 * @returns checkout context object required to build a checkout url
 */
export async function getCheckoutContext(el, params) {
  const context = await getCommerceContext(el, params);
  if (!context) return null;
  const { settings } = await initService();
  const { checkoutClientId } = settings;
  const checkoutMarketSegment = params.get('marketSegment');
  const checkoutWorkflow = params.get('workflow') ?? settings.checkoutWorkflow;
  const checkoutWorkflowStep = params?.get('workflowStep') ?? settings.checkoutWorkflowStep;
  const entitlement = params?.get('entitlement');
  const upgrade = params?.get('upgrade');
  const modal = params?.get('modal');

  const extraOptions = {};
  params.forEach((value, key) => {
    if (CHECKOUT_ALLOWED_KEYS.includes(key)) {
      extraOptions[key] = value;
    }
  });

  return {
    ...context,
    checkoutClientId,
    checkoutWorkflow,
    checkoutWorkflowStep,
    checkoutMarketSegment,
    entitlement,
    upgrade,
    modal,
    extraOptions: JSON.stringify(extraOptions),
  };
}

export async function getPriceContext(el, params) {
  const context = await getCommerceContext(el, params);
  if (!context) return null;
  const displayOldPrice = context.promotionCode ? params.get('old') : undefined;
  const displayPerUnit = params.get('seat');
  const displayRecurrence = params.get('term');
  const displayTax = params.get('tax');
  const forceTaxExclusive = params.get('exclusive');
  // The PRICE_TEMPLATE_MAPPING supports legacy OST links
  const template = PRICE_TEMPLATE_MAPPING.get(params.get('type')) ?? PRICE_TEMPLATE_REGULAR;
  return {
    ...context,
    displayOldPrice,
    displayPerUnit,
    displayRecurrence,
    displayTax,
    forceTaxExclusive,
    template,
  };
}

export function reopenModal(cta) {
  if (cta && cta.getAttribute('data-modal-id') === window.location.hash.replace('#', '')) {
    cta.click();
  }
}

export async function buildCta(el, params) {
  const large = !!el.closest('.marquee');
  const strong = el.firstElementChild?.tagName === 'STRONG' || el.parentElement?.tagName === 'STRONG';
  if (el.closest('.merch-offers.upgrade')) {
    params.append('entitlement', 'false');
  }
  const context = await getCheckoutContext(el, params);
  if (!context) return null;
  const service = await initService();
  const text = el.textContent?.replace(/^CTA +/, '');
  const cta = service.createCheckoutLink(context, text);
  if (el.href.includes('#_tcl')) {
    el.href = el.href.replace('#_tcl', '');
  } else {
    cta.classList.add('con-button');
    cta.classList.toggle('button-l', large);
    cta.classList.toggle('blue', strong);
  }
  if (context.entitlement !== 'false') {
    cta.classList.add(LOADING_ENTITLEMENTS);
    cta.onceSettled().finally(() => {
      cta.classList.remove(LOADING_ENTITLEMENTS);
      // after opening a modal, navigating to another page and back we need to reopen the modal
      reopenModal(cta);
    });
  }
  return cta;
}

async function buildPrice(el, params) {
  const context = await getPriceContext(el, params);
  if (!context) return null;
  const service = await initService();
  const price = service.createInlinePrice(context);
  return price;
}

export default async function init(el) {
  if (!el?.classList?.contains('merch')) return undefined;
  const { searchParams } = new URL(el.href);
  const isCta = searchParams.get('type') === 'checkoutUrl';
  const merch = await (isCta ? buildCta : buildPrice)(el, searchParams);
  const service = await initService();
  log = service.Log.module('merch');
  if (merch) {
    log.debug('Rendering:', { options: { ...merch.dataset }, merch, el });
    el.replaceWith(merch);
    return merch;
  }
  log.warn('Failed to get context:', { el });
  return null;
}

export async function handleHashChange() {
  const modalDialog = document.querySelector('.dialog-modal');
  if (window.location.hash) {
    const modalId = window.location.hash.replace('#', '');
    const cta = document.querySelector(`.con-button[data-modal-id="${modalId}"]`);
    if (!modalDialog) {
      reopenModal(cta);
    }
  } else if (modalDialog) {
    const { closeModal } = await import('../modal/modal.js');
    closeModal(modalDialog);
  }
}

window.addEventListener('hashchange', handleHashChange);
