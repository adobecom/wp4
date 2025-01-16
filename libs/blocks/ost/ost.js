import ctaTextOption from './ctaTextOption.js';
import { getConfig, getLocale, getMetadata, loadScript, loadStyle } from '../../utils/utils.js';

export const AOS_API_KEY = 'wcms-commerce-ims-user-prod';
export const CHECKOUT_CLIENT_ID = 'creative';
export const DEFAULT_CTA_TEXT = 'buy-now';
const IMS_COMMERCE_CLIENT_ID = 'aos_milo_commerce';
const IMS_SCOPE = 'AdobeID,openid';
const IMS_ENV = 'prod';
const IMS_PROD_URL = 'https://auth.services.adobe.com/imslib/imslib.min.js';
const OST_VERSION = '1.19.1';
const OST_BASE = `https://www.stage.adobe.com/special/tacocat/ost/lib/${OST_VERSION}`;
const OST_SCRIPT_URL = `${OST_BASE}/index.js`;
const OST_STYLE_URL = `${OST_BASE}/index.css`;
/** @see https://git.corp.adobe.com/PandoraUI/core/blob/master/packages/react-env-provider/src/component.tsx#L49 */
export const WCS_ENV = 'PROD';
export const WCS_API_KEY = 'wcms-commerce-ims-ro-user-cc';
export const WCS_LANDSCAPE = 'PUBLISHED';

/**
 * Maps Franklin page metadata to OST properties.
 * Only values present in this object will be provided to OST.
 * Each key of the object is metadata key.
 * Each value is OST property name.
 */
const METADATA_MAPPINGS = { 'checkout-workflow': 'workflow' };

const priceDefaultOptions = {
  term: true,
  seat: true,
  tax: false,
  old: false,
  exclusive: false,
};

const updateParams = (params, key, value) => {
  if (value !== priceDefaultOptions[key]) {
    params.set(key, value);
  }
};

document.body.classList.add('tool', 'tool-ost');

/**
 * @param {Commerce.Defaults} defaults
 */
export const createLinkMarkup = (
  defaults,
  offerSelectorId,
  type,
  offer,
  options,
  promo,
) => {
  const isCta = !!type?.startsWith('checkout');

  const createHref = () => {
    const params = new URLSearchParams([
      ['osi', offerSelectorId],
      ['type', type],
    ]);
    if (promo) params.set('promo', promo);
    if (offer.commitment === 'PERPETUAL') params.set('perp', true);

    if (isCta) {
      const { workflow, workflowStep } = options;
      params.set('text', options.ctaText ?? DEFAULT_CTA_TEXT);
      if (workflow && workflow !== defaults.checkoutWorkflow) {
        params.set('workflow', workflow);
      }
      if (workflowStep && workflowStep !== defaults.checkoutWorkflowStep) {
        params.set('workflowStep', workflowStep);
      }
    } else {
      const {
        displayRecurrence,
        displayPerUnit,
        displayTax,
        displayOldPrice,
        forceTaxExclusive,
      } = options;
      updateParams(params, 'term', displayRecurrence);
      updateParams(params, 'seat', displayPerUnit);
      updateParams(params, 'tax', displayTax);
      updateParams(params, 'old', displayOldPrice);
      updateParams(params, 'exclusive', forceTaxExclusive);
    }
    return `https://milo.adobe.com/tools/ost?${params.toString()}`;
  };

  const link = document.createElement('a');
  link.textContent = isCta
    ? `CTA {{${options.ctaText ?? DEFAULT_CTA_TEXT}}}`
    : `PRICE - ${offer.planType} - ${offer.name}`;
  link.href = createHref();
  return link;
};

export async function loadOstEnv() {
  /* c8 ignore next */
  const { Log, Defaults } = await import('../../deps/mas/commerce.js');
  const { getMiloLocaleSettings } = await import('../merch/merch.js');

  const searchParameters = new URLSearchParams(window.location.search);
  const ostSearchParameters = new URLSearchParams();

  const defaultPlaceholderOptions = Object.fromEntries([
    ['term', 'displayRecurrence', 'true'],
    ['seat', 'displayPerUnit', 'true'],
    ['tax', 'displayTax'],
    ['old', 'displayOldPrice'],
  ].map(([key, targetKey, defaultValue = false]) => {
    const value = searchParameters.get(key) ?? defaultValue;
    searchParameters.delete(key);
    return [targetKey, value === 'true'];
  }));

  // value inversed for legacy compatibility reasons.
  const exclusive = !(searchParameters.get('exclusive') === 'true');
  searchParameters.delete('exclusive');
  defaultPlaceholderOptions.forceTaxExclusive = exclusive;

  const searchOfferSelectorId = searchParameters.get('osi');
  searchParameters.delete('osi');

  [
    ['type'],
    ['text'],
    ['promo', 'storedPromoOverride', true],
    ['workflow', 'checkoutType'],
    ['workflowStep'],
  ].forEach(([key, targetKey, skip = false]) => {
    const value = searchParameters.get(key);
    if (value === null && skip) {
      return;
    }
    ostSearchParameters.set(targetKey ?? key, value);
    searchParameters.delete(key);
  });

  const workflowStep = ostSearchParameters.get('workflowStep');
  ostSearchParameters.set('workflowStep', workflowStep?.replace('/', '_'));

  let aosAccessToken = searchParameters.get('token');
  if (aosAccessToken) {
    sessionStorage.setItem('AOS_ACCESS_TOKEN', aosAccessToken);
    searchParameters.delete('token');
  } else {
    aosAccessToken = sessionStorage.getItem('AOS_ACCESS_TOKEN');
  }
  const search = searchParameters.toString();
  const newURL = `//${window.location.host}${window.location.pathname}${search ? `?${search}` : ''}`;
  window.history.replaceState({}, null, newURL);

  const environment = searchParameters.get('env') ?? WCS_ENV;
  const landscape = searchParameters.get('wcsLandscape') ?? WCS_LANDSCAPE;
  const owner = searchParameters.get('owner');
  const referrer = searchParameters.get('referrer');
  const repo = searchParameters.get('repo');

  let { country, language } = getMiloLocaleSettings();
  const { locales } = getConfig();
  const log = Log.module('ost');
  const metadata = {};
  let url;

  if (owner && referrer && repo) {
    try {
      const res = await fetch(`//admin.hlx.page/status/${owner}/${repo}/main?editUrl=${referrer}`);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json();
      url = new URL(json.preview.url);
      const locale = getLocale(locales, url.pathname);
      /* c8 ignore next 1 */
      ({ country, language } = getMiloLocaleSettings(locale));
    } catch (error) {
      log.error('Unable to fetch page status:', error);
    }

    if (url) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const parser = new DOMParser();
        const doc = parser.parseFromString(await res.text(), 'text/html');
        Object.entries(METADATA_MAPPINGS).forEach(
          ([key, value]) => {
            const content = getMetadata(key, doc);
            if (content) metadata[value] = content;
          },
        );
      } catch (error) {
        log.error('Unable to fetch page metadata:', error);
      }
    }
  }

  const onSelect = (
    offerSelectorId,
    type,
    offer,
    options,
    promoOverride,
  ) => {
    log.debug(offerSelectorId, type, offer, options, promoOverride);
    const link = createLinkMarkup(
      Defaults,
      offerSelectorId,
      type,
      offer,
      options,
      promoOverride,
    );

    log.debug(`Use Link: ${link.outerHTML}`);
    const linkBlob = new Blob([link.outerHTML], { type: 'text/html' });
    const textBlob = new Blob([link.href], { type: 'text/plain' });
    // eslint-disable-next-line no-undef
    const data = [new ClipboardItem({ [linkBlob.type]: linkBlob, [textBlob.type]: textBlob })];
    navigator.clipboard.write(data, log.debug, log.error);
  };

  return {
    ...metadata,
    aosAccessToken,
    aosApiKey: AOS_API_KEY,
    checkoutClientId: CHECKOUT_CLIENT_ID,
    onSelect,
    country,
    environment,
    landscape,
    language,
    searchParameters: ostSearchParameters,
    searchOfferSelectorId,
    defaultPlaceholderOptions,
    wcsApiKey: WCS_API_KEY,
    ctaTextOption,
  };
}

export default async function init(el) {
  el.innerHTML = '<div />';

  loadStyle(OST_STYLE_URL);
  loadStyle('https://use.typekit.net/pps7abe.css');

  const [ostEnv] = await Promise.all([
    loadOstEnv(),
    loadScript(OST_SCRIPT_URL),
  ]);

  function openOst() {
    window.ost.openOfferSelectorTool({
      ...ostEnv,
      rootElement: el.firstElementChild,
    });
  }

  if (ostEnv.aosAccessToken) {
    openOst();
  } else {
    window.adobeid = {
      client_id: IMS_COMMERCE_CLIENT_ID,
      environment: IMS_ENV,
      optimizations: { fastEvents: true },
      autoValidateToken: true,
      scope: IMS_SCOPE,
      onAccessToken: ({ token }) => {
        ostEnv.aosAccessToken = token;
        openOst();
      },
      onReady: () => {
        if (!window.adobeIMS.isSignedInUser()) {
          window.adobeIMS.signIn();
        }
      },
    };

    await loadScript(IMS_PROD_URL);
  }
}
