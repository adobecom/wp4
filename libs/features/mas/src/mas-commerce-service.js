import { Checkout } from './checkout.js';
import * as Constants from './constants.js';
import { EVENT_TYPE_READY } from './constants.js';
import { Defaults } from './defaults.js';
import { Ims } from './ims.js';
import { getPriceLiterals } from './literals.js';
import { Log } from './log.js';
import { Price } from './price.js';
import { getSettings } from './settings.js';
import { Wcs } from './wcs.js';
import { setImmediate } from './utilities.js';
import { updateConfig as updateLanaConfig } from './lana.js';

export const TAG_NAME_SERVICE = 'mas-commerce-service';


const MARK_START = 'mas:start';
const MARK_READY = 'mas:ready';

/**
 * Custom web component to provide active instance of commerce service
 * to consumers, appended to the head section of current document.
 */
export class MasCommerceService extends HTMLElement {
    static instance;
    promise = null;

    get #config() {
        const config = {
            hostEnv: { name: this.getAttribute('host-env') ?? 'prod' },
            commerce: { env: this.getAttribute('env') },
            lana: {
                tags: this.getAttribute('lana-tags'),
                sampleRate: parseInt(this.getAttribute('lana-sample-rate'), 10),
                isProdDomain: this.getAttribute('host-env') === 'prod',
            },
        };
        //root parameters
        ['locale', 'country', 'language'].forEach((attribute) => {
            const value = this.getAttribute(attribute);
            if (value) {
                config[attribute] = value;
            }
        });
        //commerce parameters
        [
            'checkout-workflow-step',
            'force-tax-exclusive',
            'checkout-client-id',
            'allow-override',
            'wcs-api-key',
        ].forEach((attribute) => {
            const value = this.getAttribute(attribute);
            if (value != null) {
                const camelCaseAttribute = attribute.replace(/-([a-z])/g, (g) =>
                    g[1].toUpperCase(),
                );
                config.commerce[camelCaseAttribute] = value;
            }
        });
        return config;
    }

    async registerCheckoutAction(action) {
        if (typeof action != 'function') return;
        this.buildCheckoutAction = async (offers, options, el) => {
            const checkoutAction = await action?.(
                offers,
                options,
                this.imsSignedInPromise,
                el,
            );
            if (checkoutAction) {
                return checkoutAction;
            }
            return null;
        };
    }

    async activate() {
        const config = this.#config;
        // Load settings and literals
        const settings = Object.freeze(getSettings(config));
        updateLanaConfig(config.lana);
        const log = Log.init(config.hostEnv).module('service');
        log.debug('Activating:', config);

        // Fetch price literals
        const literals = { price: {} };
        try {
            literals.price = await getPriceLiterals(
                settings,
                config.commerce.priceLiterals,
            );
        } catch (e) {}
        // Create checkout/price options providers registry
        const providers = {
            checkout: new Set(),
            price: new Set(),
        };
        const startup = { literals, providers, settings };
        // Extend web component object with service API
        Object.defineProperties(
            this,
            Object.getOwnPropertyDescriptors({
                // Activate modules and expose their API as combined flat object
                ...Checkout(startup),
                ...Ims(startup),
                ...Price(startup),
                ...Wcs(startup),
                ...Constants,
                // Defined serviceweb  component API
                Log,
                get defaults() {
                    return Defaults;
                },
                get log() {
                    return Log;
                },
                /* c8 ignore next 11 */
                get providers() {
                    return {
                        checkout(provider) {
                            providers.checkout.add(provider);
                            return () => providers.checkout.delete(provider);
                        },
                        price(provider) {
                            providers.price.add(provider);
                            return () => providers.price.delete(provider);
                        },
                    };
                },
                get settings() {
                    return settings;
                },
            }),
        );
        log.debug('Activated:', { literals, settings });
        setImmediate(() => {
            const event = new CustomEvent(EVENT_TYPE_READY, {
                bubbles: true,
                cancelable: false,
                detail: this,
            });
            performance.mark(MARK_READY);
            this.dispatchEvent(event);
        });
    }

    connectedCallback() {
        if (!this.readyPromise) {
            performance.mark(MARK_START);
            this.readyPromise = this.activate();
        }
    }

    disconnectedCallback() {
        this.readyPromise = null;
    }

    flushWcsCache() {
        /* c8 ignore next 3 */
        this.flushWcsCache();
        this.log.debug('Flushed WCS cache');
    }

    refreshOffers() {
        this.flushWcsCache();
        document
            .querySelectorAll('span[is="inline-price"],a[is="checkout-link"]')
            .forEach((el) => el.requestUpdate(true));
        this.log.debug('Refreshed WCS offers');
    }

    refreshFragments() {
        this.flushWcsCache();
        document.querySelectorAll('aem-fragment').forEach((el) => el.refresh());
        this.log.debug('Refreshed AEM fragments');
    }
}

// Register service component
if (!window.customElements.get(TAG_NAME_SERVICE)) {
    window.customElements.define(TAG_NAME_SERVICE, MasCommerceService);
}
