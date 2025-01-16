import {
    ERROR_MESSAGE_BAD_REQUEST,
    ERROR_MESSAGE_OFFER_NOT_FOUND,
} from './constants.js';
import {
    Env,
    WcsCommitment,
    WcsPlanType,
    WcsTerm,
    applyPlanType,
} from './external.js';
import { Log } from './log.js';

/**
 * @typedef {Map<string, {
 *  resolve: (offers: Commerce.Wcs.Offer[]) => void,
 *  reject: (reason: Error) => void
 * }>} WcsPromises
 */
/**
 * @param {{ settings: Commerce.Wcs.Settings }} params
 * @returns {Commerce.Wcs.Client}
 */
export function Wcs({ settings }) {
    const log = Log.module('wcs');
    const { env, wcsApiKey: apiKey } = settings;
    /**
     * Cache of promises resolving to arrays of Wcs offers grouped by osi-based keys.
     * @type {Map<string, Promise<Commerce.Wcs.Offer[]>>}
     */
    const cache = new Map();
    /**
     * Queue of pending requests to Wcs grouped by locale and promo.
     * @type {Map<string, { options, promises: WcsPromises }>}
     */
    const queue = new Map();
    let timer;

    /**
     * Accepts list of OSIs having same locale and map of pending promises, grouped by OSI.
     * Sends one or more requests to WCS endpoint to provide required offers.
     * Resolves each pending promise with array of provided offers.
     * If WCS does not provide an offer for particular osi,
     * its pending promise will be rejected with "not found".
     * In case of any other Wcs/Network error, promises are rejected with "bad request".
     * @param options
     * @param {WcsPromises} promises
     * @param reject - used for recursion, prevents rejection of promises with missing offers
     */
    async function resolveWcsOffers(options, promises, reject = true) {
        let message = ERROR_MESSAGE_OFFER_NOT_FOUND;
        log.debug('Fetching:', options);
        let url = '';
        let response;
        const detailedMessage = (error, response, url) => `${error}: ${response?.status}, url: ${url.toString()}`;
        try {
            options.offerSelectorIds = options.offerSelectorIds.sort();
            url = new URL(settings.wcsURL);
            url.searchParams.set(
                'offer_selector_ids',
                options.offerSelectorIds.join(','),
            );
            url.searchParams.set('country', options.country);
            url.searchParams.set('locale', options.locale);
            url.searchParams.set(
                'landscape',
                env === Env.STAGE ? 'ALL' : settings.landscape,
            );
            url.searchParams.set('api_key', apiKey);
            // language can be undefined if its a UK offer
            if (options.language) {
                url.searchParams.set('language', options.language);
            }
            if (options.promotionCode) {
                url.searchParams.set('promotion_code', options.promotionCode);
            }
            /* c8 ignore next 3 */
            if (options.currency) {
                url.searchParams.set('currency', options.currency);
            }

            response = await fetch(url.toString(), {
                credentials: 'omit',
            });
            if (response.ok) {
                const data = await response.json();
                log.debug('Fetched:', options, data);
                let offers = data.resolvedOffers ?? [];
                offers = offers.map(applyPlanType);
                // resolve all promises that have offers
                promises.forEach(({ resolve }, offerSelectorId) => {
                    // select offers with current OSI
                    const resolved = offers
                        .filter(({ offerSelectorIds }) =>
                            offerSelectorIds.includes(offerSelectorId),
                        )
                        .flat();
                    // resolve current promise if at least 1 offer is present
                    if (resolved.length) {
                        promises.delete(offerSelectorId);
                        resolve(resolved);
                    }
                });
            }
            // in case of 404 WCS error caused by a request with multiple osis,
            // fallback to `fetch-by-one` strategy
            else if (
                response.status === 404 &&
                options.offerSelectorIds.length > 1
            ) {
                log.debug('Multi-osi 404, fallback to fetch-by-one strategy');
                await Promise.allSettled(
                    options.offerSelectorIds.map((offerSelectorId) =>
                        resolveWcsOffers(
                            { ...options, offerSelectorIds: [offerSelectorId] },
                            promises,
                            false, // do not reject promises for missing offers, this will be done below
                        ),
                    ),
                );
            } else {
                message = ERROR_MESSAGE_BAD_REQUEST;
            }
        } catch (e) {
            /* c8 ignore next 2 */
            message = ERROR_MESSAGE_BAD_REQUEST;
            log.error(message, options, e);
        }

        if (reject && promises.size) {
            // reject pending promises, their offers weren't provided by WCS
            log.debug('Missing:', { offerSelectorIds: [...promises.keys()] });
            promises.forEach((promise) => {
                promise.reject(new Error(detailedMessage(message, response, url)));
            });
        }
    }

    /**
     * Trigger resolution of all accumulated promises by requesting their associated OSIs.
     */
    function flushQueue() {
        clearTimeout(timer);
        const pending = [...queue.values()];
        queue.clear();
        pending.forEach(({ options, promises }) =>
            resolveWcsOffers(options, promises),
        );
    }

    /**
     * Flushes WCS cache
     */
    function flushWcsCache() {
        const size = cache.size;
        cache.clear();
        log.debug(`Flushed ${size} cache entries`);
    }

    /**
     * Resolves requested list of "Offer Selector Ids" (`osis`) from Wcs or local cache.
     * Returns one promise per osi, the promise resolves to array of product offers
     * associated with this osi.
     *
     * If `multiple` is set to false (this is default value), resolved array will contain only one
     * offer, selected by country/language-perpetual algorithm.
     * Otherwise. all responded offers are returned.
     *
     * If `forceTaxExclusive` is set to true (default value defined in settings),
     * then returned prices are transformed into tax exclusive variant.
     */
    function resolveOfferSelectors({
        country,
        language,
        perpetual = false,
        promotionCode = '',
        wcsOsi = [],
    }) {
        const locale = `${language}_${country}`;
        if (country !== 'GB') language = perpetual ? 'EN' : 'MULT';
        const groupKey = [country, language, promotionCode]
            .filter((val) => val)
            .join('-')
            .toLowerCase();

        return wcsOsi.map((osi) => {
            const cacheKey = `${osi}-${groupKey}`;
            if (!cache.has(cacheKey)) {
                const promise = new Promise((resolve, reject) => {
                    let group = queue.get(groupKey);
                    if (!group) {
                        const options = {
                            country,
                            locale,
                            offerSelectorIds: [],
                        };
                        if (country !== 'GB') options.language = language;
                        const promises = new Map();
                        group = { options, promises };
                        queue.set(groupKey, group);
                    }
                    if (promotionCode) {
                        group.options.promotionCode = promotionCode;
                    }
                    group.options.offerSelectorIds.push(osi);
                    group.promises.set(osi, {
                        resolve,
                        reject,
                    });
                    if (
                        group.options.offerSelectorIds.length >=
                        settings.wcsBufferLimit
                    ) {
                        flushQueue();
                    } else {
                        log.debug('Queued:', group.options);
                        if (!timer) {
                            timer = setTimeout(
                                flushQueue,
                                settings.wcsBufferDelay,
                            );
                        }
                    }
                });
                cache.set(cacheKey, promise);
            }
            return cache.get(cacheKey);
        });
    }

    return {
        WcsCommitment,
        WcsPlanType,
        WcsTerm,
        resolveOfferSelectors,
        flushWcsCache,
    };
}
