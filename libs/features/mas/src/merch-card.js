import { LitElement } from 'lit';
import { sizeStyles, styles } from './merch-card.css.js';
import { getVariantLayout, getVariantStyles } from './variants/variants.js';

import './global.css.js';
import {
    EVENT_AEM_LOAD,
    EVENT_MERCH_CARD_READY,
    EVENT_MERCH_OFFER_SELECT_READY,
    EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
    EVENT_MERCH_STORAGE_CHANGE,
    EVENT_MAS_READY,
    EVENT_AEM_ERROR,
    EVENT_MAS_ERROR,
} from './constants.js';
import { VariantLayout } from './variants/variant-layout.js';
import { hydrate, ANALYTICS_SECTION_ATTR } from './hydrate.js';

const MERCH_CARD = 'merch-card';
const MARK_START_SUFFIX = ':start';
const MARK_READY_SUFFIX = ':ready';

// if merch cards does not initialise in 10 seconds, it will dispatch mas:error event
const MERCH_CARD_LOAD_TIMEOUT = 10000;

const MARK_MERCH_CARD_PREFIX = 'merch-card:';

export class MerchCard extends LitElement {
    static properties = {
        name: { type: String, attribute: 'name', reflect: true },
        variant: { type: String, reflect: true },
        size: { type: String, attribute: 'size', reflect: true },
        badgeColor: { type: String, attribute: 'badge-color', reflect: true },
        borderColor: { type: String, attribute: 'border-color', reflect: true },
        badgeBackgroundColor: {
            type: String,
            attribute: 'badge-background-color',
            reflect: true,
        },
        backgroundImage: {
            type: String,
            attribute: 'background-image',
            reflect: true,
        },
        badgeText: { type: String, attribute: 'badge-text' },
        actionMenu: { type: Boolean, attribute: 'action-menu' },
        customHr: { type: Boolean, attribute: 'custom-hr' },
        consonant: { type: Boolean, attribute: 'consonant' },
        spectrum: { type: String, attribute: 'spectrum' }, /* css|swc */
        detailBg: { type: String, attribute: 'detail-bg' },
        secureLabel: { type: String, attribute: 'secure-label' },
        checkboxLabel: { type: String, attribute: 'checkbox-label' },
        selected: { type: Boolean, attribute: 'aria-selected', reflect: true },
        storageOption: { type: String, attribute: 'storage', reflect: true },
        stockOfferOsis: {
            type: Object,
            attribute: 'stock-offer-osis',
            converter: {
                fromAttribute: (value) => {
                    const [PUF, ABM, M2M] = value.split(',');
                    return { PUF, ABM, M2M };
                },
            },
        },
        filters: {
            type: String,
            reflect: true,
            converter: {
                fromAttribute: (value) => {
                    return Object.fromEntries(
                        value.split(',').map((filter) => {
                            const [key, order, size] = filter.split(':');
                            const value = Number(order);
                            return [
                                key,
                                {
                                    order: isNaN(value) ? undefined : value,
                                    size,
                                },
                            ];
                        }),
                    );
                },
                toAttribute: (value) => {
                    return Object.entries(value)
                        .map(([key, { order, size }]) =>
                            [key, order, size]
                                .filter((v) => v != undefined)
                                .join(':'),
                        )
                        .join(',');
                },
            },
        },
        types: {
            type: String,
            attribute: 'types',
            reflect: true,
        },
        merchOffer: { type: Object },
        analyticsId: { type: String, attribute: ANALYTICS_SECTION_ATTR, reflect: true },
    };

    static styles = [styles, getVariantStyles(), ...sizeStyles()];

    customerSegment;
    marketSegment;
    /**
     * @type {VariantLayout}
     */
    variantLayout;

    constructor() {
        super();
        this.filters = {};
        this.types = '';
        this.selected = false;
        this.spectrum = 'css';
        this.handleAemFragmentEvents = this.handleAemFragmentEvents.bind(this);
    }

    firstUpdated() {
        this.variantLayout = getVariantLayout(this, false);
        this.variantLayout?.connectedCallbackHook();
        this.aemFragment?.updateComplete.catch(() => {
            this.style.display = 'none';
        });
    }

    willUpdate(changedProperties) {
        if (changedProperties.has('variant') || !this.variantLayout) {
            this.variantLayout = getVariantLayout(this);
            this.variantLayout.connectedCallbackHook();
        }
    }

    updated(changedProperties) {
        if (
            changedProperties.has('badgeBackgroundColor') ||
            changedProperties.has('borderColor')
        ) {
            this.style.setProperty('--consonant-merch-card-border', this.computedBorderStyle);
        }
        this.variantLayout?.postCardUpdateHook(changedProperties);
    }

    get theme() {
        return this.closest('sp-theme');
    }

    get dir() {
        return this.closest('[dir]')?.getAttribute('dir') ?? 'ltr';
    }

    get prices() {
        return Array.from(
            this.querySelectorAll('span[is="inline-price"][data-wcs-osi]'),
        );
    }

    render() {
        if (
            !this.isConnected ||
            !this.variantLayout ||
            this.style.display === 'none'
        )
            return;
        return this.variantLayout.renderLayout();
    }

    get computedBorderStyle() {
        if (!['twp', 'ccd-slice', 'ccd-suggested'].includes(this.variant)) {
            return `1px solid ${
                this.borderColor ? this.borderColor : this.badgeBackgroundColor
            }`;
        }
        return '';
    }

    get badgeElement() {
        return this.shadowRoot.getElementById('badge');
    }

    get headingmMSlot() {
        return this.shadowRoot
            .querySelector('slot[name="heading-m"]')
            .assignedElements()[0];
    }

    get footerSlot() {
        return this.shadowRoot
            .querySelector('slot[name="footer"]')
            ?.assignedElements()[0];
    }

    get price() {
        return this.headingmMSlot?.querySelector('span[is="inline-price"]');
    }

    get checkoutLinks() {
        return [
            ...(this.footerSlot?.querySelectorAll('a[is="checkout-link"]') ??
                []),
        ];
    }

    async toggleStockOffer({ target }) {
        if (!this.stockOfferOsis) return;
        const elements = this.checkoutLinks;
        if (elements.length === 0) return;
        for (const element of elements) {
            await element.onceSettled();
            const planType = element.value?.[0]?.planType;
            if (!planType) return;
            const stockOfferOsi = this.stockOfferOsis[planType];
            if (!stockOfferOsi) return;
            const osis = element.dataset.wcsOsi
                .split(',')
                .filter((osi) => osi !== stockOfferOsi);

            if (target.checked) {
                osis.push(stockOfferOsi);
            }
            element.dataset.wcsOsi = osis.join(',');
        }
    }

    handleQuantitySelection(event) {
        const elements = this.checkoutLinks;
        for (const element of elements) {
            element.dataset.quantity = event.detail.option;
        }
    }

    get titleElement() {
        return this.querySelector(
            this.variantLayout?.headingSelector || '.card-heading',
        );
    }

    get title() {
        return this.titleElement?.textContent?.trim();
    }

    /* c8 ignore next 3 */
    get description() {
        return this.querySelector('[slot="body-xs"]')?.textContent?.trim();
    }

    /**
     * If the card is the single app, set the order for all filters to 2.
     * If not, increment the order for all filters after the second card by 1.
     * @param {*} singleApp
     */
    updateFilters(singleApp) {
        const newFilters = { ...this.filters };
        Object.keys(newFilters).forEach((key) => {
            // if single app set the order for all filters to 2.
            if (singleApp) {
                newFilters[key].order = Math.min(newFilters[key].order || 2, 2);
                return;
            }
            const value = newFilters[key].order;
            // skip first card and cards without explicit order
            if (value === 1 || isNaN(value)) return;
            newFilters[key].order = Number(value) + 1;
        });
        this.filters = newFilters;
    }

    /* c8 ignore next 3 */
    includes(text) {
        return this.textContent.match(new RegExp(text, 'i')) !== null;
    }

    connectedCallback() {
        super.connectedCallback();
        const id = this.querySelector('aem-fragment')?.getAttribute('fragment');
        performance.mark(`${MARK_MERCH_CARD_PREFIX}${id}${MARK_START_SUFFIX}`);
        this.addEventListener(
            EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
            this.handleQuantitySelection,
        );
        this.addEventListener(
            EVENT_MERCH_OFFER_SELECT_READY,
            this.merchCardReady,
            { once: true },
        );
        this.updateComplete.then(() => {
            this.merchCardReady();
        });
        this.storageOptions?.addEventListener(
            'change',
            this.handleStorageChange,
        );

        // aem-fragment logic
        this.addEventListener(EVENT_AEM_ERROR, this.handleAemFragmentEvents);
        this.addEventListener(EVENT_AEM_LOAD, this.handleAemFragmentEvents);

        if (!this.aemFragment) {
            setTimeout(() => this.checkReady(), 0);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.variantLayout?.disconnectedCallbackHook();

        this.removeEventListener(
            EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
            this.handleQuantitySelection,
        );
        this.storageOptions?.removeEventListener(
            EVENT_MERCH_STORAGE_CHANGE,
            this.handleStorageChange,
        );
        this.removeEventListener(EVENT_AEM_ERROR, this.handleAemFragmentEvents);
        this.removeEventListener(EVENT_AEM_LOAD, this.handleAemFragmentEvents);
    }

    // custom methods
    async handleAemFragmentEvents(e) {
        if (e.type === EVENT_AEM_ERROR) {
            this.#fail('AEM fragment cannot be loaded');
        }
        if (e.type === EVENT_AEM_LOAD) {
            if (e.target.nodeName === 'AEM-FRAGMENT') {
                const fragment = e.detail;
                await hydrate(fragment, this);
                this.checkReady();
            }
        }
    }

    #fail(error) {
        this.dispatchEvent(
            new CustomEvent(EVENT_MAS_ERROR, {
                detail: error,
                bubbles: true,
                composed: true,
            }),
        );
    }

    async checkReady() {
        const successPromise = Promise.all(
            [
                ...this.querySelectorAll(
                    'span[is="inline-price"][data-wcs-osi],a[is="checkout-link"][data-wcs-osi]',
                ),
            ].map((element) => element.onceSettled().catch(() => element)),
        ).then((elements) =>
            elements.every((el) =>
                el.classList.contains('placeholder-resolved'),
            ),
        );
        const timeoutPromise = new Promise((resolve) =>
            setTimeout(() => resolve(false), MERCH_CARD_LOAD_TIMEOUT),
        );
        const success = await Promise.race([successPromise, timeoutPromise]);
        if (success === true) {
            performance.mark(`${MARK_MERCH_CARD_PREFIX}${this.id}${MARK_READY_SUFFIX}`);
            this.dispatchEvent(
                new CustomEvent(EVENT_MAS_READY, {
                    bubbles: true,
                    composed: true,
                }),
            );
            return;
        }
        this.#fail('Contains unresolved offers');
    }

    get aemFragment() {
        return this.querySelector('aem-fragment');
    }

    get storageOptions() {
        return this.querySelector('sp-radio-group#storage');
    }

    /* c8 ignore next 9 */
    get storageSpecificOfferSelect() {
        const storageOption = this.storageOptions?.selected;
        if (storageOption) {
            const merchOfferSelect = this.querySelector(
                `merch-offer-select[storage="${storageOption}"]`,
            );
            if (merchOfferSelect) return merchOfferSelect;
        }
        return this.querySelector('merch-offer-select');
    }

    get offerSelect() {
        return this.storageOptions
            ? this.storageSpecificOfferSelect
            : this.querySelector('merch-offer-select');
    }

    /* c8 ignore next 3 */
    get quantitySelect() {
        return this.querySelector('merch-quantity-select');
    }

    merchCardReady() {
        if (this.offerSelect && !this.offerSelect.planType) return;
        // add checks for other properties if needed
        this.dispatchEvent(
            new CustomEvent(EVENT_MERCH_CARD_READY, { bubbles: true }),
        );
    }

    // TODO enable with TWP //
    /* c8 ignore next 11 */
    handleStorageChange() {
        const offerSelect =
            this.closest('merch-card')?.offerSelect.cloneNode(true);
        if (!offerSelect) return;
        this.dispatchEvent(
            new CustomEvent(EVENT_MERCH_STORAGE_CHANGE, {
                detail: { offerSelect },
                bubbles: true,
            }),
        );
    }

    /* c8 ignore next 3 */
    get dynamicPrice() {
        return this.querySelector('[slot="price"]');
    }

    // TODO enable with TWP //
    /* c8 ignore next 16 */
    selectMerchOffer(offer) {
        if (offer === this.merchOffer) return;
        this.merchOffer = offer;
        const previousPrice = this.dynamicPrice;
        if (offer.price && previousPrice) {
            const newPrice = offer.price.cloneNode(true);
            if (previousPrice.onceSettled) {
                // do not remove before placeholder is settled, otherwise other listeners may be left hanging.
                previousPrice.onceSettled().then(() => {
                    previousPrice.replaceWith(newPrice);
                });
            } else {
                previousPrice.replaceWith(newPrice);
            }
        }
    }
}

customElements.define(MERCH_CARD, MerchCard);
