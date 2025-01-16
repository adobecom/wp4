import { css, html, LitElement } from 'lit';
import {
    EVENT_MERCH_OFFER_READY,
    EVENT_MERCH_OFFER_SELECT_READY,
    EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
    EVENT_OFFER_SELECTED,
} from './constants.js';

class MerchOfferSelect extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
        }

        :host .horizontal {
            display: flex;
            flex-direction: row;
        }

        fieldset {
            display: contents;
        }

        :host([variant='subscription-options']) {
            display: flex;
            flex-direction: column;
            gap: var(--consonant-merch-spacing-xs);
        }
    `;

    static properties = {
        offers: { type: Array },
        selectedOffer: { type: Object },
        defaults: { type: Object },
        variant: { type: String, attribute: 'variant', reflect: true },
        planType: { type: String, attribute: 'plan-type', reflect: true },
        stock: { type: Boolean, reflect: true },
    };

    #handleOfferSelectionByQuantityFn;

    constructor() {
        super();
        this.defaults = {};
        this.variant = 'plans';
    }

    /** Returns the default values for the price, cta, and description slots.
     * These are the values coming from the container itself, not from the merch-offer elements.
     * E.g. initial merch-card description text. There is no default price or cta in the container.
     */
    saveContainerDefaultValues() {
        const container = this.closest(this.getAttribute('container'));
        const description = container
            ?.querySelector('[slot="description"]:not(merch-offer > *)')
            ?.cloneNode(true);
        const badgeText = container?.badgeText;
        return {
            description,
            badgeText,
        };
    }

    getSlottedElement(slotName, container) {
        const containerEl =
            container || this.closest(this.getAttribute('container'));
        return containerEl.querySelector(
            `[slot="${slotName}"]:not(merch-offer > *)`,
        );
    }

    updateSlot(slotName, container) {
        const slot = this.getSlottedElement(slotName, container);
        if (!slot) return;
        const node = this.selectedOffer.getOptionValue(slotName)
            ? this.selectedOffer.getOptionValue(slotName)
            : this.defaults[slotName];
        if (node) {
            slot.replaceWith(node.cloneNode(true));
        }
    }

    handleOfferSelection(e) {
        const newOffer = e.detail;
        this.selectOffer(newOffer);
    }

    handleOfferSelectionByQuantity(event) {
        const selected = event.detail.option;
        const selectedValue = Number.parseInt(selected);
        const newOffer = this.findAppropriateOffer(selectedValue);
        this.selectOffer(newOffer);
        const cta = this.getSlottedElement('cta');
        cta.setAttribute('data-quantity', selectedValue);
    }

    selectOffer(newOffer) {
        if (!newOffer) {
            return;
        }
        const previousOffer = this.selectedOffer;
        if (previousOffer) {
            previousOffer.selected = false;
        }
        newOffer.selected = true;
        this.selectedOffer = newOffer;
        this.planType = newOffer.planType;
        this.updateContainer();
        this.updateComplete.then(() => {
            this.dispatchEvent(
                new CustomEvent(EVENT_OFFER_SELECTED, {
                    detail: this,
                    bubbles: true,
                }),
            );
        });
    }

    findAppropriateOffer(selectedValue) {
        let previousOfferWithValue = null;
        const foundOffer = this.offers.find((offer) => {
            const offerAttribute = Number.parseInt(offer.getAttribute('value'));
            if (offerAttribute === selectedValue) {
                return true;
            } else if (offerAttribute > selectedValue) {
                return false;
            } else {
                previousOfferWithValue = offer;
            }
        });
        return foundOffer || previousOfferWithValue;
    }

    /**
     * If badge text is empty string - delete the badge.
     * If badge text is present - set the badge.
     * If badge text is null or undefined - set default badge. */
    updateBadgeText(container) {
        if (this.selectedOffer.badgeText === '') {
            container.badgeText = null;
        } else if (this.selectedOffer.badgeText) {
            container.badgeText = this.selectedOffer.badgeText;
        } else {
            container.badgeText = this.defaults.badgeText;
        }
    }

    /** Will update price, cta, and other slots/properties in parent container (e.g. merch-card or twp modal) */
    updateContainer() {
        const container = this.closest(this.getAttribute('container'));
        if (!container || !this.selectedOffer) return;

        this.updateSlot('cta', container);
        this.updateSlot('secondary-cta', container);
        this.updateSlot('price', container);
        if (this.manageableMode) return;
        this.updateSlot('description', container);
        this.updateBadgeText(container);
    }

    render() {
        return html`<fieldset><slot class="${this.variant}"></slot></fieldset>`;
    }

    connectedCallback() {
        super.connectedCallback();

        this.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('click', this.handleFocusin);

        this.addEventListener(
            EVENT_MERCH_OFFER_READY,
            this.handleOfferSelectReady,
        );

        const quantitySelect = this.closest('merch-quantity-select');
        this.manageableMode = quantitySelect;
        this.offers = [...this.querySelectorAll('merch-offer')];

        this.#handleOfferSelectionByQuantityFn =
            this.handleOfferSelectionByQuantity.bind(this);
        if (this.manageableMode) {
            quantitySelect.addEventListener(
                EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
                this.#handleOfferSelectionByQuantityFn,
            );
        } else {
            this.defaults = this.saveContainerDefaultValues();
        }
        this.selectedOffer = this.offers[0];
        if (this.planType) {
            // make sure that merch-offers are initialized.
            this.updateContainer();
        }
    }

    get miniCompareMobileCard() {
        return (
            this.merchCard?.variant === 'mini-compare-chart' && this.isMobile
        );
    }

    get merchCard() {
        return this.closest('merch-card');
    }

    get isMobile() {
        return window.matchMedia('(max-width: 767px)').matches;
    }

    disconnectedCallback() {
      super.disconnectedCallback();
        this.removeEventListener(
            EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
            this.#handleOfferSelectionByQuantityFn,
        );
        this.removeEventListener(
            EVENT_MERCH_OFFER_READY,
            this.handleOfferSelectReady,
        );
        this.removeEventListener('focusin', this.handleFocusin);
        this.removeEventListener('click', this.handleFocusin);
    }

    get price() {
        return this.querySelector(
            'merch-offer[aria-selected] [is="inline-price"]',
        );
    }

    get customerSegment() {
        return this.selectedOffer?.customerSegment;
    }

    get marketSegment() {
        return this.selectedOffer?.marketSegment;
    }

    handleFocusin(event) {
        if (event.target?.nodeName === 'MERCH-OFFER') {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.selectOffer(event.target);
        }
    }

    async handleOfferSelectReady() {
        if (this.planType) return;
        if (this.querySelector('merch-offer:not([plan-type])')) return;
        this.planType = this.selectedOffer.planType;
        await this.updateComplete;

        this.selectOffer(
            this.selectedOffer ??
                this.querySelector('merch-offer[aria-selected]') ??
                this.querySelector('merch-offer'),
        );

        this.dispatchEvent(
            new CustomEvent(EVENT_MERCH_OFFER_SELECT_READY, { bubbles: true }),
        );
    }
}

customElements.define('merch-offer-select', MerchOfferSelect);
