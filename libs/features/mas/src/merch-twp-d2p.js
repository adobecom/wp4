import { LitElement, html } from 'lit';

import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

import { styles } from './merch-twp-d2p.css.js';
import { TABLET_DOWN } from './media.js';
import {
    EVENT_MERCH_CARD_READY,
    EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
    EVENT_OFFER_SELECTED,
    EVENT_MERCH_STORAGE_CHANGE,
} from './constants.js';
import { parseState } from './deeplink.js';

const TAG_NAME = 'merch-twp-d2p';
const TAB_INDIVIDUALS = 'individuals';
const TAB_BUSINESS = 'business';
const TAB_EDUCATION = 'education';

export class MerchTwpD2P extends LitElement {
    static styles = [styles];

    static properties = {
        individualsText: { type: String, attribute: 'individuals-text' },
        businessText: { type: String, attribute: 'business-text' },
        educationText: { type: String, attribute: 'education-text' },
        continueText: { type: String, attribute: 'continue-text' },
        ready: { type: Boolean },
        step: { type: Number },
        singleCard: { state: true },
        selectedTab: { type: String, attribute: 'selected-tab', reflect: true },
    };

    selectedTab = this.preselectedTab();

    #log;

    #cardIcons;
    #handleOfferSelected;
    #mobileAndTablet = new MatchMediaController(this, TABLET_DOWN);

    individualsText = 'Individuals';
    businessText = 'Business';
    educationText = 'Students and teachers';
    continueText = 'Continue';
    ready = false;

    constructor() {
        super();
        this.step = 1;
        this.#handleOfferSelected = this.handleOfferSelected.bind(this);
        this.handleWhatsIncludedClick = this.handleWhatsIncludedClick.bind(this);
    }

    /** @type {Commerce.Log.Instance} */
    get log() {
        if (!this.#log) {
            this.#log = document.head
                .querySelector('wcms-commerce')
                ?.Log.module('twp');
        }
        return this.#log;
    }

    get individualsTab() {
        if (this.cciCards.length === 0) return html``;
        return html`
            <sp-tab value="${TAB_INDIVIDUALS}" label=${this.individualsText}>
                <sp-icon-user slot="icon"></sp-icon-user>
            </sp-tab>
            <sp-tab-panel value="${TAB_INDIVIDUALS}">
                <div class="cards">
                    <slot name="individuals"></slot>
                    <slot name="cci-footer"></slot>
                </div>
            </sp-tab-panel>
        `;
    }

    get businessTab() {
        if (this.cctCards.length === 0) return html``;
        return html`
            <sp-tab value="${TAB_BUSINESS}" label=${this.businessText}>
                <sp-icon-user-group slot="icon"></sp-icon-user-group>
            </sp-tab>
            <sp-tab-panel value="${TAB_BUSINESS}">
                <div class="cards">
                    <slot name="business"></slot>
                    <slot name="cct-footer"></slot>
                </div>
            </sp-tab-panel>
        `;
    }

    get educationTab() {
        if (this.cceCards.length === 0) return html``;
        return html`
            <sp-tab value="${TAB_EDUCATION}" label=${this.educationText}>
                <sp-icon-book slot="icon"></sp-icon-book>
            </sp-tab>
            <sp-tab-panel value="${TAB_EDUCATION}">
            <div class="cards">
                <slot name="education"></slot>
                <slot name="cce-footer"></slot>
            </sp-tab-panel>
        `;
    }

    preselectedTab() {
        const params = new URLSearchParams(window.location.search);
        const plan = params.get('plan');
        if (
            plan === TAB_INDIVIDUALS ||
            plan === TAB_BUSINESS ||
            plan === TAB_EDUCATION
        ) {
            return plan;
        } else {
            return TAB_INDIVIDUALS;
        }
    }

    get selectedTabPanel() {
        return this.shadowRoot.querySelector('sp-tab-panel[selected]');
    }

    get firstCardInSelectedTab() {
        return this.selectedTabPanel
            ?.querySelector('slot')
            .assignedElements()[0]; // only cards
    }

    get tabs() {
        if (this.cards.length === 1) return html``;
        if (this.singleCard && this.step === 1) return html``;
        return html`
            <sp-tabs
                emphasized
                selected="${this.selectedTab}"
                @change=${this.tabChanged}
            >
                ${this.individualsTab} ${this.businessTab} ${this.educationTab}
            </sp-tabs>
        `;
    }

    async tabChanged(event) {
        this.selectedTab = event.target.selected;
        await event.target.updateComplete;
        this.selectCard(this.firstCardInSelectedTab);
    }

    /** the footer is displayed only in the step 1 */
    get singleCardFooter() {
        if (this.step !== 1) return;
        return html`
            <slot name="cci-footer"></slot>
            <slot name="cct-footer"></slot>
            <slot name="cce-footer"></slot>
        `;
    }

    get desktopLayout() {
        if (this.singleCard) {
            /** single card is displayed in two cases:
             *  1. step 2 with 3 cards in step 1.
             *  Single card at step 1.
             */
            return html`<div class="desktop" data-step="${this.step}">
                <div id="content">
                    <slot name="detail-xl"></slot>
                    ${this.tabs}
                    <slot name="single-card"></slot>
                    ${this.singleCardFooter} ${this.backButton}
                </div>
                <aside>
                    <slot name="panel"></slot>
                </aside>
            </div>`;
        }
        return html`
            <div class="desktop" data-step="${this.step}">
                <div id="content">
                    <slot name="detail-xl"></slot>
                    ${this.tabs}
                    <slot name="footer-link"></slot>
                </div>
                ${this.cciCards.length < 3
                    ? html`<aside>
                          <slot name="panel"></slot>
                      </aside>`
                    : ''}
                ${this.continueButton}
            </div>
        `;
    }

    get showSubscriptionPanelInStep1() {
        if (this.#mobileAndTablet.matches) return false;
        return this.cciCards.length < 3;
    }

    get continueButton() {
        if (this.showSubscriptionPanelInStep1) return html``;
        return html`
            <div id="continueButton">
                <sp-button
                    variant="accent"
                    size="large"
                    @click=${this.handleContinue}
                >
                    ${this.continueText}
                </sp-button>
            </div>
        `;
    }

    selectSingleCard(card) {
        card.setAttribute('data-slot', card.getAttribute('slot'));
        card.setAttribute('slot', 'single-card');
        this.singleCard = card;
    }

    unSelectSingleCard() {
        if (!this.singleCard) return;
        this.singleCard.setAttribute(
            'slot',
            this.singleCard.getAttribute('data-slot'),
        );
        this.singleCard.removeAttribute('data-slot');
        this.step = 1;
        this.singleCard = undefined;
    }

    handleContinue() {
        this.step = 2;
        this.selectSingleCard(this.cardToSelect);
        this.#cardIcons = [
            ...this.singleCard.querySelectorAll('merch-icon'),
        ].map((el) => el.cloneNode(true));
    }

    handleBack() {
        this.unSelectSingleCard();
    }

    get cardToSelect() {
        return (
            this.selectedTabPanel?.card ??
            this.querySelector('merch-card[aria-selected]')
        );
    }

    // this.selectedTabPanel.card doesn't always exist, e.g. tab was switched but card wasn't selected yet
    // this.singleCard ?? this.querySelector('merch-card[aria-selected]')
    get selectedCard() {
        return this.singleCard ?? this.selectedTabPanel.card;
    }

    get mobileStepTwo() {
        if (!this.singleCard) return html``;
        return html`
            ${this.backButton} ${this.stepTwoCardIconsAndTitle}
            <slot name="panel"></slot>
        `;
    }

    get stepTwoCardIconsAndTitle() {
        if (!this.selectedCard) return;

        return html`<div id="card-icons-title">
            ${this.#cardIcons}
            <h3>${this.selectedCard.title}</h3>
        </div>`;
    }

    get backButton() {
        if (this.step !== 2) return html``;
        return html`<sp-button
            id="backButton"
            treatment="outline"
            variant="secondary"
            size="s"
            @click=${this.handleBack}
        >
            <sp-icon-chevron-double-left
                slot="icon"
            ></<sp-icon-chevron-double-left></sp-icon-chevron-double-left
            > Back</sp-button>`;
    }

    get mobileLayout() {
        if (this.step === 1) {
            return html`
                <div class="mobile" data-step="${this.step}">
                    <slot name="detail-xl"></slot>
                    <slot name="single-card"></slot>
                    ${this.tabs} ${this.continueButton}
                </div>
            `;
        }
        return html`
            <div class="mobile" data-step="${this.step}">
                <slot name="detail-xl"></slot>
                ${this.tabs}${this.mobileStepTwo}
            </div>
        `;
    }

    render() {
        if (!this.ready) return html``;
        return html`
            <sp-theme  color="light" scale="large">
                ${
                    this.#mobileAndTablet.matches
                        ? this.mobileLayout
                        : this.desktopLayout
                }
                <slot name="merch-whats-included"></slot>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.style.setProperty('--mod-tabs-font-weight', 700);
        this.addEventListener(EVENT_MERCH_CARD_READY, this.merchTwpReady);
        this.subscriptionPanel.addEventListener(
            EVENT_OFFER_SELECTED,
            this.#handleOfferSelected,
        );
        this.addEventListener(
            EVENT_MERCH_QUANTITY_SELECTOR_CHANGE,
            this.handleQuantityChange,
        );
        this.whatsIncludedLink?.addEventListener(
            'click',
            this.handleWhatsIncludedClick
        );
        this.addEventListener(
            EVENT_MERCH_STORAGE_CHANGE,
            this.handleStorageChange,
        );
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener(EVENT_MERCH_CARD_READY, this.merchTwpReady);
        this.subscriptionPanel.removeEventListener(
            EVENT_OFFER_SELECTED,
            this.#handleOfferSelected,
        );
        this.whatsIncludedLink?.removeEventListener('click', this.handleWhatsIncludedClick);
        this.removeEventListener(
            EVENT_MERCH_STORAGE_CHANGE,
            this.handleStorageChange,
        );
    }

    handleOfferSelected(event) {
        this.log.debug('Selecting plan type', event.target.planType);
        this.selectedCard.selectMerchOffer(event.target.selectedOffer);
    }

    handleQuantityChange(event) {
        if (!this.selectedTabPanel) return;
        this.selectedCard.quantitySelect.defaultValue = event.detail.option;
        this.requestUpdate();
    }

    get whatsIncludedLink() {
        return this.querySelector('merch-card .merch-whats-included');
    }

    get whatsIncluded() {
        return this.querySelector('[slot="merch-whats-included"]');
    }

    setOfferSelectOnPanel(offerSelect) {
        offerSelect.setAttribute('variant', 'subscription-options');
        this.subscriptionPanel.offerSelect?.remove();
        this.subscriptionPanel.appendChild(offerSelect);
    }

    handleStorageChange(event) {
        const offerSelect = event.detail.offerSelect;
        if (!offerSelect) return;
        this.setOfferSelectOnPanel(offerSelect);
    }

    get preselectedCardId() {
        const preselectedCardIds =
            parseState()
                ['select-cards']?.split(',')
                .reduce((res, item) => {
                    const formattedItem = decodeURIComponent(
                        item.trim().toLowerCase(),
                    );
                    formattedItem && res.push(formattedItem);
                    return res;
                }, []) || [];

        if (preselectedCardIds.length && this.selectedTab === TAB_INDIVIDUALS) {
            return preselectedCardIds[0];
        } else if (
            preselectedCardIds.length > 1 &&
            this.selectedTab === TAB_BUSINESS
        ) {
            return preselectedCardIds[1];
        } else if (
            preselectedCardIds.length > 2 &&
            this.selectedTab === TAB_EDUCATION
        ) {
            return preselectedCardIds[2];
        }
    }

    get cardToBePreselected() {
        return this.selectedTabPanel
            ?.querySelector('slot')
            .assignedElements()
            .find((cardEl) => {
                const cardTitle =
                    cardEl
                        .querySelector('.heading-xs')
                        ?.textContent.trim()
                        .toLowerCase() || '';
                return (
                    this.preselectedCardId &&
                    cardTitle.includes(this.preselectedCardId)
                );
            });
    }

    selectCard(card, force = false) {
        // todo make a stable this.selectedCard,
        // then add 'if (card === this.selectedCard) return;'
        const tabPanel = this.selectedTabPanel;
        let selectedCard = tabPanel?.card;
        if (force || !selectedCard) {
            // on tab change we select the card only if no card is selected already.
            if (selectedCard) {
                selectedCard.selected = undefined;
            }
            selectedCard = this.cardToBePreselected || card;
            selectedCard.selected = true;
            if (tabPanel) {
                tabPanel.card = selectedCard;
            } else {
                this.selectSingleCard(selectedCard);
            }
        }
        selectedCard.focus();

        this.subscriptionPanel.quantitySelect?.remove();
        const quantitySelect = selectedCard.quantitySelect?.cloneNode(true);
        if (quantitySelect) {
            this.subscriptionPanel.appendChild(quantitySelect);
        }
        const offerSelect = selectedCard.offerSelect.cloneNode(true);
        this.setOfferSelectOnPanel(offerSelect);
    }

    handleWhatsIncludedClick(event) {
        event.preventDefault();
        this.whatsIncluded?.classList.toggle('hidden');
    }

    async processCards() {
        const allCards = [...this.querySelectorAll('merch-card')];
        allCards.forEach((card, i) => {
            const { customerSegment, marketSegment } = card.offerSelect;
            if (customerSegment === 'INDIVIDUAL') {
                if (marketSegment === 'COM') {
                    card.setAttribute('slot', 'individuals');
                } else if (marketSegment === 'EDU') {
                    card.setAttribute('slot', 'education');
                }
            } else if (customerSegment === 'TEAM') {
                card.setAttribute('slot', 'business');
            }
            card.addEventListener('click', () => this.selectCard(card, true));
        });
        this.ready = true;
        this.requestUpdate();
        await this.updateComplete;
        await this.tabElement?.updateComplete;
        this.selectCard(
            allCards.length === 1 ? allCards[0] : this.firstCardInSelectedTab,
            true,
        );
    }

    merchTwpReady() {
        if (
            // wait for all merch-offer-selects to be ready
            this.querySelector('merch-card merch-offer-select:not([plan-type])')
        )
            return;
        this.processCards();
    }

    /** All the getters for DOM elements */
    get cards() {
        // only cards with a slot are considered valid.
        return this.querySelectorAll('merch-card[slot]');
    }

    get cciCards() {
        return this.querySelectorAll('merch-card[slot="individuals"]');
    }

    get cctCards() {
        return this.querySelectorAll('merch-card[slot="business"]');
    }

    get cceCards() {
        return this.querySelectorAll('merch-card[slot="education"]');
    }

    get subscriptionPanel() {
        return this.querySelector('merch-subscription-panel');
    }

    get tabElement() {
        return this.shadowRoot.querySelector('sp-tabs');
    }
}

window.customElements.define(TAG_NAME, MerchTwpD2P);
