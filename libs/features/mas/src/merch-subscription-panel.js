import { html, LitElement } from 'lit';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import { styles } from './merch-subscription-panel.css.js';
import {
    EVENT_MERCH_OFFER_SELECT_READY,
    EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
    EVENT_MERCH_STOCK_CHANGE,
    EVENT_OFFER_SELECTED,
} from './constants.js';
import { TABLET_DOWN } from './media.js';

class MerchSubscriptionPanel extends LitElement {
    static styles = [styles];

    static properties = {
        continueText: { type: String, attribute: 'continue-text' },
        quantity: { type: Number },
        ready: { type: Boolean, attribute: 'ready', reflect: true },
    };

    #mobileAndTablet = new MatchMediaController(this, TABLET_DOWN);

    constructor() {
        super();
        this.ready = false;
        this.continueText = 'Continue';
    }

    /**
     * Renders subscription layout when connected to a card and has prices.
     */
    get listLayout() {
        return html`
            <slot name="header"></slot>
            <slot name="offers"></slot>
            <div id="footer">
                <slot name="footer"></slot>
                <sp-button
                    variant="accent"
                    size="large"
                    @click=${this.handleContinue}
                >
                    ${this.continueText}
                </sp-button>
            </div>
            ${this.checkoutLink}
            <slot @slotchange=${this.handleSlotChange}></slot>
        `;
    }

    /**
     * Renders loading spinner when disconnected from a card or waits for prices to resolve.
     */
    get waitLayout() {
        return html`
            <div id="spinner">
                <sp-progress-circle indeterminate size="l" />
            </div>
            <slot @slotchange=${this.handleSlotChange}></slot>
        `;
    }

    render() {
        return this.offerSelect ? this.listLayout : this.waitLayout;
    }

    connectedCallback() {
        super.connectedCallback();
        if (this.#mobileAndTablet.matches) {
            this.setAttribute('layout', 'mobile');
        } else {
            this.setAttribute('layout', 'desktop');
        }
        this.addEventListener(
            EVENT_MERCH_OFFER_SELECT_READY,
            this.handleOfferSelectReady,
        );
        this.checkOfferSelectReady();
        this.addEventListener(EVENT_OFFER_SELECTED, this.handleOfferSelect);
        this.addEventListener(EVENT_MERCH_STOCK_CHANGE, this.handleStockChange);
        this.addEventListener(
            EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
            this.handleQuantitySelectChange,
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(
            EVENT_MERCH_OFFER_SELECT_READY,
            this.handleOfferSelectReady,
        );
        this.removeEventListener(EVENT_OFFER_SELECTED, this.handleOfferSelect);
        this.removeEventListener(
            EVENT_MERCH_STOCK_CHANGE,
            this.handleStockChange,
        );
        this.removeEventListener(
            EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
            this.handleQuantitySelectChange,
        );
    }

    handleSlotChange() {
        this.initOfferSelect();
        this.initQuantitySelect();
        this.initStock();
        this.secureTransaction?.setAttribute('slot', 'footer');
    }

    /** if merch-offer-select was already ready before the this is connected to DOM */
    async checkOfferSelectReady() {
        if (!this.offerSelect) return;
        await this.offerSelect.updateComplete;
        if (this.offerSelect.planType) {
            this.handleOfferSelectReady();
        }
    }

    handleOfferSelectReady() {
        this.ready = true;
        this.initStock();
        this.requestUpdate();
    }

    handleOfferSelect(event) {
        if (this.offerSelect?.stock) {
            this.stock.planType = event.detail.planType;
        }
        this.requestUpdate();
    }

    handleQuantitySelectChange(event) {
        this.quantity = event.detail.option;
    }

    handleStockChange() {
        this.requestUpdate();
    }

    handleContinue() {
        this.shadowRoot.getElementById('checkoutLink').click();
    }

    async initOfferSelect() {
        if (!this.offerSelect) return;
        this.offerSelect
            .querySelectorAll('merch-offer')
            .forEach((el) => (el.type = 'subscription-option'));
        this.ready = !!this.offerSelect.planType;
        this.offerSelect.setAttribute('slot', 'offers');
        await this.offerSelect.selectOffer(
            this.offerSelect.querySelector('merch-offer[aria-selected]'),
        );
        await this.offerSelect.selectedOffer.price.onceSettled();
        this.requestUpdate();
    }

    initStock() {
        if (!this.stock) return;
        this.stock.setAttribute('slot', 'footer');
        if (this.offerSelect?.stock) {
            this.stock.planType = this.offerSelect.planType;
        } else {
            this.stock.planType = null;
        }
    }

    initQuantitySelect() {
        if (!this.quantitySelect) return;
        this.quantitySelect.setAttribute('slot', 'footer');
    }

    get offerSelect() {
        return this.querySelector('merch-offer-select');
    }

    get quantitySelect() {
        return this.querySelector('merch-quantity-select');
    }

    get stock() {
        return this.querySelector('merch-stock');
    }

    get secureTransaction() {
        return this.querySelector('merch-secure-transaction');
    }

    get checkoutLink() {
        if (!this.offerSelect?.selectedOffer?.price?.value) return;
        const [
            {
                offerSelectorIds: [osi],
            },
        ] = this.offerSelect.selectedOffer.price?.value;
        if (!osi) return;

        const osis = [osi];
        if (this.stock) {
            const stockOsi = this.stock.osi;
            if (stockOsi) osis.push(stockOsi);
        }
        const osisString = osis.join(',');
        const cta = this.offerSelect.selectedOffer.cta;
        if (cta && cta.value) {
            const node = cta?.cloneNode(true);
            node.setAttribute('id', 'checkoutLink');
            node.setAttribute('data-wcs-osi', osisString);
            node.setAttribute('data-quantity', this.quantity);
            node.removeAttribute('target');
            return html`${node}`;
        }
        return html`<a
            id="checkoutLink"
            is="checkout-link"
            data-wcs-osi="${osisString}"
            data-quantity="${this.quantity}"
            href="#"
        ></a>`;
    }
}

window.customElements.define(
    'merch-subscription-panel',
    MerchSubscriptionPanel,
);
