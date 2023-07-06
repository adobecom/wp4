import { getConfig, getMetadata } from '../../utils/utils.js';

export const CTA_PREFIX = /^CTA +/;

export const omitNullValues = (target) => {
  if (target != null) {
    Object.entries(target).forEach(([key, value]) => {
      if (value == null) delete target[key];
    });
  }
  return target;
};

export function buildCta(el, commerce, options = {}) {
  const a = document.createElement('a', { is: 'checkout-link' });
  a.setAttribute('is', 'checkout-link');
  const classes = ['con-button'];
  if (document.querySelector('.marquee')) {
    if (el.closest('.marquee')) {
      classes.push('button-l');
    }
  }
  if (el.firstElementChild?.tagName === 'STRONG' || el.parentElement?.tagName === 'STRONG') {
    classes.push('blue');
  }
  a.setAttribute('class', classes.join(' '));
  Object.assign(a.dataset, options);
  a.textContent = el.textContent?.replace(CTA_PREFIX, '');
  commerce.ims.country
    .then((countryCode) => {
      if (countryCode) a.dataset.imsCountry = countryCode;
    })
    .catch(() => { /* do nothing */ });
  return a;
}

function buildPrice(el, commerce, options = {}) {
  const span = document.createElement('span', { is: 'inline-price' });
  span.setAttribute('is', 'inline-price');
  Object.assign(span.dataset, omitNullValues(options));
  return span;
}

/**
 * Checkout parameter can be set Merch link, code config (scripts.js) or be a default from tacocat.
 * To get the default, 'undefinded' should be passed, empty string will trigger an error!
 *
 * clientId - code config -> default (adobe_com)
 * workflow - merch link -> metadata -> default (UCv3)
 * workflowStep - merch link -> default (email)
 * marketSegment - merch link -> default (COM)
 * @param {URLSearchParams} searchParams link level overrides for checkout parameters
 * @returns checkout context object required to build a checkout url
 */
export function getCheckoutContext(commerce, searchParams) {
  const { checkoutClientId } = commerce.settings;
  const checkoutWorkflow = searchParams.get('workflow')
    ?? getMetadata('checkout-type')
    ?? commerce.settings.checkoutWorkflow;
  const checkoutWorkflowStep = searchParams
    ?.get('workflowStep')
    ?.replace('_', '/')
    ?? commerce.settings.checkoutWorkflowStep;
  const checkoutMarketSegment = searchParams.get('marketSegment');

  return {
    checkoutClientId,
    checkoutWorkflow,
    checkoutWorkflowStep,
    checkoutMarketSegment,
  };
}

export default async function init(el) {
  if (!el?.classList?.contains('merch')) return undefined;

  const { init: initCommerce, Log } = await import('../../deps/commerce.js');
  const log = Log.commerce.module('merch');
  const commerce = await initCommerce(getConfig);

  const { searchParams } = new URL(el.href);
  const osi = searchParams.get('osi');
  const type = searchParams.get('type');
  if (!(osi && type)) {
    el.textContent = '';
    el.setAttribute('aria-details', 'Invalid merch block');
    return undefined;
  }

  const promotionCode = (
    searchParams.get('promo') ?? el.closest('[data-promotion-code]')?.dataset.promotionCode
  ) || undefined;
  const perpetual = searchParams.get('perp') === 'true' || undefined;

  let build;
  let options;
  if (type === 'checkoutUrl') {
    build = buildCta;
    options = {
      promotionCode,
      perpetual,
      wcsOsi: osi,
      ...getCheckoutContext(commerce, searchParams),
    };
  } else {
    build = buildPrice;
    const displayRecurrence = searchParams.get('term');
    const displayPerUnit = searchParams.get('seat');
    const displayTax = searchParams.get('tax');
    const displayOldPrice = promotionCode ? searchParams.get('old') : undefined;
    options = {
      displayOldPrice,
      displayPerUnit,
      displayRecurrence,
      displayTax,
      perpetual,
      promotionCode,
      template: type === 'price' ? undefined : type,
      wcsOsi: osi,
    };
  }

  const node = build(el, commerce, omitNullValues(options));
  log.debug('Rendering:', { type, options, node });
  el.replaceWith(node);

  return node;
}
