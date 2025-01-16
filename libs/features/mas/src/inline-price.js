import {
    createMasElement,
    updateMasElement,
    MasElement,
} from './mas-element.js';
import { selectOffers, useService } from './utilities.js';

// countries where tax is displayed for all segments by default
const DISPLAY_ALL_TAX_COUNTRIES = [
    'GB_en',
    'AU_en',
    'FR_fr',
    'AT_de',
    'BE_en',
    'BE_fr',
    'BE_nl',
    'BG_bg',
    'CH_de',
    'CH_fr',
    'CH_it',
    'CZ_cs',
    'DE_de',
    'DK_da',
    'EE_et',
    'EG_ar',
    'EG_en',
    'ES_es',
    'FI_fi',
    'FR_fr',
    'GR_el',
    'GR_en',
    'HU_hu',
    'IE_en',
    'IT_it',
    'LU_de',
    'LU_en',
    'LU_fr',
    'NL_nl',
    'NO_nb',
    'PL_pl',
    'PT_pt',
    'RO_ro',
    'SE_sv',
    'SI_sl',
    'SK_sk',
    'TR_tr',
    'UA_uk',
    'ID_en',
    'ID_in',
    'IN_en',
    'IN_hi',
    'JP_ja',
    'MY_en',
    'MY_ms',
    'NZ_en',
    'TH_en',
    'TH_th',
];

// countries where tax is displayed for some segments only by default
const DISPLAY_TAX_MAP = {
    // individual
    INDIVIDUAL_COM: [
        'ZA_en',
        'LT_lt',
        'LV_lv',
        'NG_en',
        'SA_ar',
        'SA_en',
        'ZA_en',
        'SG_en',
        'KR_ko',
    ],
    // business
    TEAM_COM: ['ZA_en', 'LT_lt', 'LV_lv', 'NG_en', 'ZA_en', 'CO_es', 'KR_ko'],
    // student
    INDIVIDUAL_EDU: ['LT_lt', 'LV_lv', 'SA_en', 'SG_en'],
    // school and uni
    TEAM_EDU: ['SG_en', 'KR_ko'],
};

export class InlinePrice extends HTMLSpanElement {
    static is = 'inline-price';
    static tag = 'span';
    static get observedAttributes() {
        return [
            'data-display-old-price',
            'data-display-per-unit',
            'data-display-recurrence',
            'data-display-tax',
            'data-perpetual',
            'data-promotion-code',
            'data-tax-exclusive',
            'data-template',
            'data-wcs-osi',
        ];
    }

    static createInlinePrice(options) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const service = useService();
        if (!service) return null;
        const {
            displayOldPrice,
            displayPerUnit,
            displayRecurrence,
            displayTax,
            forceTaxExclusive,
            perpetual,
            promotionCode,
            quantity,
            template,
            wcsOsi,
        } = service.collectPriceOptions(options);
        const element = createMasElement(InlinePrice, {
            displayOldPrice,
            displayPerUnit,
            displayRecurrence,
            displayTax,
            forceTaxExclusive,
            perpetual,
            promotionCode,
            quantity,
            template,
            wcsOsi,
        });
        return element;
    }

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    get isInlinePrice() {
        return true;
    }

    masElement = new MasElement(this);

    attributeChangedCallback(name, _, value) {
        this.masElement.attributeChangedCallback(name, _, value);
    }

    connectedCallback() {
        this.masElement.connectedCallback();
        this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback() {
        this.masElement.disconnectedCallback();
        this.removeEventListener('click', this.handleClick);
    }

    handleClick(event) {
        /* c8 ignore next 4 */
        if (event.target === this) return;
        // re-dispatch click event from the price element
        event.stopImmediatePropagation();
        this.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            }),
        );
    }

    onceSettled() {
        return this.masElement.onceSettled();
    }

    get value() {
        return this.masElement.value;
    }

    get options() {
        return this.masElement.options;
    }

    requestUpdate(force = false) {
        return this.masElement.requestUpdate(force);
    }

    /**
     * Resolves default value of displayTax property, based on provided geo info and segments.
     * @returns {boolean}
     */
    /* c8 ignore next 26 */
    resolveDisplayTaxForGeoAndSegment(
        country,
        language,
        customerSegment,
        marketSegment,
    ) {
        const locale = `${country}_${language}`;
        if (
            DISPLAY_ALL_TAX_COUNTRIES.includes(country) ||
            DISPLAY_ALL_TAX_COUNTRIES.includes(locale)
        ) {
            return true;
        }

        const segmentConfig =
            DISPLAY_TAX_MAP[`${customerSegment}_${marketSegment}`];
        if (!segmentConfig) {
            return false;
        }

        if (segmentConfig.includes(country) || segmentConfig.includes(locale)) {
            return true;
        }

        return false;
    }

    /**
     * Resolves default value of displayTax property, based on provided geo info and segments extracted from offers object.
     * @returns {boolean}
     */
    /* c8 ignore next 15 */
    async resolveDisplayTax(service, options) {
        const [offerSelectors] = await service.resolveOfferSelectors(options);
        const offers = selectOffers(await offerSelectors, options);
        if (offers?.length) {
            const { country, language } = options;
            const offer = offers[0];
            const [marketSegment = ''] = offer.marketSegments;
            return this.resolveDisplayTaxForGeoAndSegment(
                country,
                language,
                offer.customerSegment,
                marketSegment,
            );
        }
    }

    /**
     * Resolves associated osi via Wcs and renders price offer.
     * @param {Record<string, any>} overrides
     */
    async render(overrides = {}) {
        if (!this.isConnected) return false;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const service = useService();
        if (!service) return false;
        const options = service.collectPriceOptions(overrides, this);
        if (!options.wcsOsi.length) return false;

        /*
        Commented out until issues in content with manually added tax labels are resolved

        if (!this.masElement.dataset.displayTax) {
            // set default value for displayTax if not set neither in OST nor in price URL
            options.displayTax =
                (await this.resolveDisplayTax(service, options)) || false;
        }
        */

        const version = this.masElement.togglePending(options);
        this.innerHTML = '';
        const [promise] = service.resolveOfferSelectors(options);
        return this.renderOffers(
            selectOffers(await promise, options),
            options,
            version,
        );
    }

    // TODO: can be extended to accept array of offers and compute subtotal price
    /**
     * Renders price offer as HTML of this component
     * using consonant price template functions
     * @param {Commerce.Wcs.Offer[]} offers
     * @param {Record<string, any>} overrides
     * Optional object with properties to use as overrides
     * over those collected from dataset of this component.
     */
    renderOffers(offers, overrides = {}, version = undefined) {
        if (!this.isConnected) return;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const service = useService();
        if (!service) return false;
        const options = service.collectPriceOptions(
            {
                ...this.dataset,
                ...overrides,
            },
            this,
        );
        version ??= this.masElement.togglePending(options);
        if (offers.length) {
            if (this.masElement.toggleResolved(version, offers, options)) {
                this.innerHTML = service.buildPriceHTML(offers, options);
                return true;
            }
        } else {
            const error = new Error(`Not provided: ${options?.wcsOsi ?? '-'}`);
            if (this.masElement.toggleFailed(version, error, options)) {
                this.innerHTML = '';
                return true;
            }
        }
        /* c8 ignore next 1 */
        return false;
    }

    updateOptions(options) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const service = useService();
        if (!service) return false;
        const {
            displayOldPrice,
            displayPerUnit,
            displayRecurrence,
            displayTax,
            forceTaxExclusive,
            perpetual,
            promotionCode,
            quantity,
            template,
            wcsOsi,
        } = service.collectPriceOptions(options);
        updateMasElement(this, {
            displayOldPrice,
            displayPerUnit,
            displayRecurrence,
            displayTax,
            forceTaxExclusive,
            perpetual,
            promotionCode,
            quantity,
            template,
            wcsOsi,
        });
        return true;
    }
}

// Define custom DOM element
if (!window.customElements.get(InlinePrice.is)) {
    window.customElements.define(InlinePrice.is, InlinePrice, {
        extends: InlinePrice.tag,
    });
}
