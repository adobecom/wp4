import { EVENT_TYPE_READY } from './constants.js';
import {
    forceTaxExclusivePrice,
    isNotEmptyString,
    isPositiveFiniteNumber,
    toPositiveFiniteInteger,
} from './external.js';

const MAS_COMMERCE_SERVICE = 'mas-commerce-service';
/**
 * Calls given `getConfig` every time new instance of the commerce service is activated,
 * passing new instance as the only argument.
 * @param {(commerce: Commerce.Instance) => void} getConfig
 * @param {{ once?: boolean; }} options
 * @returns {() => void}
 * A function, stopping notifications when called.
 */
export function discoverService(getConfig, { once = false } = {}) {
    let latest = null;
    function discover() {
        /** @type { Commerce.Instance } */
        const current = document.querySelector(MAS_COMMERCE_SERVICE);
        if (current === latest) return;
        latest = current;
        if (current) getConfig(current);
    }
    document.addEventListener(EVENT_TYPE_READY, discover, { once });
    setImmediate(discover);
    return () => document.removeEventListener(EVENT_TYPE_READY, discover);
}

/**
 * @param {Commerce.Wcs.Offer[]} offers
 * @param {Commerce.Options} options
 * @returns {Commerce.Wcs.Offer[]}
 */
export function selectOffers(
    offers,
    { country, forceTaxExclusive, perpetual },
) {
    let selected;
    if (offers.length < 2) selected = offers;
    else {
        const language = country === 'GB' || perpetual ? 'EN' : 'MULT';
        const [first, second] = offers;
        selected = [first.language === language ? first : second];
    }
    if (forceTaxExclusive) {
        selected = selected.map(forceTaxExclusivePrice);
    }
    return selected;
}

export const setImmediate = (getConfig) => window.setTimeout(getConfig);

/**
 * @param {any} value
 * @param {number} defaultValue
 * @returns {number[]}
 */
export function toQuantity(value, defaultValue = 1) {
    if (value == null) return [defaultValue];
    let quantity = (Array.isArray(value) ? value : String(value).split(','))
        .map(toPositiveFiniteInteger)
        .filter(isPositiveFiniteNumber);
    if (!quantity.length) quantity = [defaultValue];
    return quantity;
}

/**
 * @param {any} value
 * @returns {string[]}
 */
export function toOfferSelectorIds(value) {
    if (value == null) return [];
    const ids = Array.isArray(value) ? value : String(value).split(',');
    return ids.filter(isNotEmptyString);
}

/**
 * For internal use only.
 * This function expects an active instance of commerce service
 * to exist in the current DOM.
 * If commerce service has not been yet activated or was resetted, `null`.
 * @returns 
 */
export function useService() {
    return document.getElementsByTagName(MAS_COMMERCE_SERVICE)?.[0];
}
