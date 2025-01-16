import { html, LitElement } from 'lit';
import { styles } from './merch-offer.css.js';
import { EVENT_MERCH_OFFER_READY } from './constants.js';

const TAG_NAME = 'merch-offer';
class MerchOffer extends LitElement {
    static properties = {
        text: { type: String },
        selected: { type: Boolean, attribute: 'aria-selected', reflect: true },
        badgeText: { type: String, attribute: 'badge-text' },
        type: { type: String, attribute: 'type', reflect: true }, // values: radio, subscription-option
        planType: { type: String, attribute: 'plan-type', reflect: true },
    };

    static styles = [styles];

    constructor() {
        super();
        this.type = 'radio';
        this.selected = false;
    }

    getOptionValue(slotName) {
        return this.querySelector(`[slot="${slotName}"]`);
    }

    // setting attributes can't be done in constructor, so using connectedCallback
    connectedCallback() {
        super.connectedCallback();
        this.initOffer();
        this.configuration = this.closest('quantity-selector');
        if (!this.hasAttribute('tabindex') && !this.configuration) {
            this.tabIndex = 0;
        }
        if (!this.hasAttribute('role') && !this.configuration) {
            this.role = 'radio';
        }
    }

    get asRadioOption() {
        return html` <div class="merch-Radio">
            <input tabindex="-1" type="radio" class="merch-Radio-input" />
            <span class="merch-Radio-button"></span>
            <span class="merch-Radio-label">${this.text}</span>
        </div>`;
    }

    get asSubscriptionOption() {
        return html`<slot name="commitment"></slot>
            <slot name="price"></slot>
            <slot name="teaser"></slot>
            <div id="condition">
                <slot name="condition"></slot>
                <span id="info">
                    <sp-icon-info-outline size="s"></sp-icon-info-outline
                ></span>
                <sp-overlay placement="top" trigger="info@hover" type="hint">
                    <sp-tooltip
                        ><slot name="condition-tooltip"></slot
                    ></sp-tooltip>
                </sp-overlay>
            </div>`;
    }

    render() {
        if (this.configuration) return '';
        if (!this.price) return '';

        if (this.type === 'subscription-option')
            return this.asSubscriptionOption;
        return this.asRadioOption;
    }

    get price() {
        return this.querySelector(
            'span[is="inline-price"]:not([data-template="strikethrough"])',
        );
    }

    get cta() {
        return this.querySelector('a[is="checkout-link"]');
    }

    get prices() {
        return this.querySelectorAll('span[is="inline-price"]');
    }

    get customerSegment() {
        return this.price?.value?.[0].customerSegment;
    }

    get marketSegment() {
        return this.price?.value?.[0].marketSegments[0];
    }

    async initOffer() {
        if (!this.price) return;
        this.prices.forEach((el) => el.setAttribute('slot', 'price'));
        await this.updateComplete;
        await Promise.all([...this.prices].map((price) => price.onceSettled()));
        const {
            value: [offer],
        } = this.price;
        this.planType = offer.planType;
        await this.updateComplete;
        this.dispatchEvent(
            new CustomEvent(EVENT_MERCH_OFFER_READY, { bubbles: true }),
        );
    }tr
}

customElements.define(TAG_NAME, MerchOffer);
