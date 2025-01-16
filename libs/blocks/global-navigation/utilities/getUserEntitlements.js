/* eslint import/no-relative-packages: 0 */
/* eslint-disable camelcase */
import { getConfig } from '../../../utils/utils.js';

const API_WAIT_TIMEOUT = 10000;
const FORMAT_RAW = 'raw';
let entitlements = {};

const getAcceptLanguage = (locale = 'en-US') => [
  `${locale}`,
  `${locale.split('-')[0]};q=0.9`,
  'en;q=0.8',
].join(',');

const getQueryParameters = (params) => {
  const query = [];
  if (Array.isArray(params) && params.length) {
    params.forEach((parameter = {}) => {
      const { name, value } = parameter;
      if (typeof name === 'string' && name.length) {
        query.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
      }
    });
  }

  return query.length ? `?${query.join('&')}` : '';
};

const emptyEntitlements = (format) => (format === FORMAT_RAW ? [] : ({
  clouds: {},
  arrangement_codes: {},
  fulfilled_codes: {},
  offer_families: {},
  offers: {},
  list: { fulfilled_codes: [] },
}));
const CREATIVE_CLOUD = 'creative_cloud';
const DOCUMENT_CLOUD = 'document_cloud';
const EXPERIENCE_CLOUD = 'experience_cloud';

/**
 * Breaks JIL offers(subscriptions) into easily addressable flat data structure.
 * @param {*} allOffers
 */
const mapSubscriptionCodes = (allOffers) => {
  if (!Array.isArray(allOffers)) {
    return emptyEntitlements();
  }

  const {
    clouds,
    arrangement_codes,
    fulfilled_codes,
    offer_families,
    offers,
    list,
  } = emptyEntitlements();

  allOffers.forEach(({ fulfilled_items, offer = {} }) => {
    const cloud = offer.product_arrangement?.cloud;
    clouds[CREATIVE_CLOUD] = clouds[CREATIVE_CLOUD] || cloud === 'CREATIVE';
    clouds[DOCUMENT_CLOUD] = clouds[DOCUMENT_CLOUD] || cloud === 'DOCUMENT';
    clouds[EXPERIENCE_CLOUD] = clouds[EXPERIENCE_CLOUD] || cloud === 'EXPERIENCE';

    const family = offer.product_arrangement?.family;
    if (family) {
      offer_families[family.toLowerCase()] = true;
    }

    if (offer.product_arrangement_code) {
      arrangement_codes[offer.product_arrangement_code] = true;
    }

    if (Array.isArray(fulfilled_items)) {
      fulfilled_items.forEach(({ code }) => {
        if (code && list.fulfilled_codes.indexOf(code) === -1) {
          fulfilled_codes[code] = true;
          list.fulfilled_codes.push(code);
        }
      });
    }

    if (offer.offer_id) {
      const { offer_id, ...rest } = offer;
      offers[offer_id] = rest;
    }
  });

  return {
    clouds,
    arrangement_codes,
    fulfilled_codes,
    offer_families,
    offers,
    list,
  };
};

const getSubscriptions = async ({ queryParams }, format) => {
  const config = getConfig();
  const profile = await window.adobeIMS.getProfile();
  const apiUrl = config.env.name === 'prod'
    ? `https://www.adobe.com/aos-api/users/${profile.userId}/subscriptions`
    : `https://www.stage.adobe.com/aos-api/users/${profile.userId}/subscriptions`;
  const res = await fetch(`${apiUrl}${queryParams}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'same-origin',
    // TODO: refactor to not use AbortSignal.timeout() as it's not supported for Safari 14
    /* eslint-disable-next-line */
    signal: AbortSignal.timeout(API_WAIT_TIMEOUT),
    headers: {
      Authorization: `Bearer ${window.adobeIMS.getAccessToken().token}`,
      'X-Api-Key': window.adobeIMS.adobeIdData.client_id,
      'Accept-Language': getAcceptLanguage(config.locale.ietf),
    },
  })
    .then((response) => (response.status === 200 ? response.json() : emptyEntitlements(format)));
  return res;
};

/**
 * @description Return the JIL User Entitlements
 * @param {object} object required params
 * @param {array} object.params array of name value query parameters [{name: 'Q', value: 'PARAM'}]
 * @param {string} object.format format function, raw or default
 * @returns {object} JIL Entitlements
 */
const getUserEntitlements = async ({ params, format } = {}) => {
  if (!window.adobeIMS?.isSignedInUser()) {
    entitlements = {};
    return Promise.resolve(emptyEntitlements(format));
  }

  const queryParams = getQueryParameters(params);
  if (entitlements[queryParams]) {
    return format === FORMAT_RAW
      ? entitlements[queryParams]
      : entitlements[queryParams]
        .then((res) => mapSubscriptionCodes(res))
        .catch(() => emptyEntitlements(format));
  }

  entitlements[queryParams] = entitlements[queryParams]
   || new Promise((resolve) => {
     getSubscriptions({ queryParams }, format)
       .then((data) => resolve(data))
       .catch(() => resolve(emptyEntitlements(format)));
   });

  return format === FORMAT_RAW
    ? entitlements[queryParams]
    : entitlements[queryParams]
      .then((res) => mapSubscriptionCodes(res))
      .catch(() => emptyEntitlements(format));
};

export default getUserEntitlements;
