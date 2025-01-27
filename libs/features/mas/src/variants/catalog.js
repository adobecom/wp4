import { VariantLayout } from './variant-layout.js';
import { html, css } from 'lit';
import { isMobileOrTablet } from '../utils.js';
import { EVENT_MERCH_CARD_ACTION_MENU_TOGGLE } from '../constants.js';
import { CSS } from './catalog.css.js';

export const CATALOG_AEM_FRAGMENT_MAPPING = {
    badge: true,
    ctas: { slot: 'footer', size: 'm' },
    description: { tag: 'div', slot: 'body-xs' },
    mnemonics: { size: 'l' },
    prices: { tag: 'h3', slot: 'heading-xs' },
    size: ['wide', 'super-wide'],
    title: { tag: 'h3', slot: 'heading-xs' },
};

export class Catalog extends VariantLayout {
    constructor(card) {
        super(card);
    }

    /* c8 ignore next 3 */
    get aemFragmentMapping() {
        return CATALOG_AEM_FRAGMENT_MAPPING;
    }

    get actionMenu() {
        return this.card.shadowRoot.querySelector('.action-menu');
    }

    get actionMenuContentSlot() {
        return this.card.shadowRoot.querySelector('slot[name="action-menu-content"]');
    }

    renderLayout() {
        return html` <div class="body">
                <div class="top-section">
                    <slot name="icons"></slot> ${this.badge}
                    <div
                        class="action-menu
                ${isMobileOrTablet() && this.card.actionMenu
                            ? 'always-visible'
                            : ''}
                ${!this.card.actionMenu ? 'hidden' : 'invisible'}"
                        @click="${this.toggleActionMenu}"
                        @keypress="${this.toggleActionMenu}"
                        tabindex="0"
                        aria-expanded="false"
                        role="button"
                    >Action Menu</div>
                </div>
                <slot
                    name="action-menu-content"
                    class="action-menu-content
            ${!this.card.actionMenuContent ? 'hidden' : ''}"
                    @focusout="${this.hideActionMenu}"
                    >${this.card.actionMenuContent}
                </slot>
                <slot name="heading-xs"></slot>
                <slot name="heading-m"></slot>
                <slot name="body-xxs"></slot>
                ${!this.promoBottom
                    ? html`<slot name="promo-text"></slot
                          ><slot name="callout-content"></slot>`
                    : ''}
                <slot name="body-xs"></slot>
                ${this.promoBottom
                    ? html`<slot name="promo-text"></slot
                          ><slot name="callout-content"></slot>`
                    : ''}
            </div>
            ${this.secureLabelFooter}
            <slot></slot>`;
    }

    getGlobalCSS() {
        return CSS;
    }

    dispatchActionMenuToggle = () => {
      this.card.dispatchEvent(
        new CustomEvent(EVENT_MERCH_CARD_ACTION_MENU_TOGGLE, {
            bubbles: true,
            composed: true,
            detail: {
                card: this.card.name,
                type: 'action-menu',
            },
        }),
      );
    };

    toggleActionMenu = (e) => {
      if (!this.actionMenuContentSlot || !e || (e.type !== 'click' && e.code !== 'Space' && e.code !== 'Enter')) return;

      e.preventDefault();
      this.actionMenuContentSlot.classList.toggle('hidden');
      const isHidden = this.actionMenuContentSlot.classList.contains('hidden');
      if (!isHidden) this.dispatchActionMenuToggle();
      this.setAriaExpanded(this.actionMenu, (!isHidden).toString());
    };
    
    toggleActionMenuFromCard = (e) => {
        //beware this is an event on card, so this points to the card, not the layout
        const retract = e?.type === 'mouseleave' ? true : undefined;
        this.card.blur();
        this.actionMenu?.classList.remove('always-visible');
        if (!this.actionMenuContentSlot) return;

        if (!retract) this.dispatchActionMenuToggle();
        this.actionMenuContentSlot.classList.toggle('hidden', retract);
        this.setAriaExpanded(this.actionMenu, 'false');
    };
    
    hideActionMenu = (e) => {
      this.actionMenuContentSlot?.classList.add('hidden');
      this.setAriaExpanded(this.actionMenu, 'false');
    }
    
    focusEventHandler = (e) => {
        if (!this.actionMenu) return;

        this.actionMenu.classList.add('always-visible');
        if (e.relatedTarget?.nodeName === 'MERCH-CARD-COLLECTION'
            || (e.relatedTarget?.nodeName === 'MERCH-CARD' && e.target.nodeName !== 'MERCH-ICON')) {
            this.actionMenu.classList.remove('always-visible');
        }
    };

    setAriaExpanded(element, value) {
        element.setAttribute('aria-expanded', value);
    }

    connectedCallbackHook() {
        this.card.addEventListener('mouseleave', this.toggleActionMenuFromCard);
        this.card.addEventListener('focusout', this.focusEventHandler);
    }

    disconnectedCallbackHook() {
        this.card.removeEventListener('mouseleave', this.toggleActionMenuFromCard);
        this.card.removeEventListener('focusout', this.focusEventHandler);
    }

    static variantStyle = css`
        :host([variant='catalog']) {
            min-height: 330px;
            width: var(--consonant-merch-card-catalog-width);
        }

        .body .catalog-badge {
            display: flex;
            height: fit-content;
            flex-direction: column;
            width: fit-content;
            max-width: 140px;
            border-radius: 5px;
            position: relative;
            top: 0;
            margin-left: var(--consonant-merch-spacing-xxs);
            box-sizing: border-box;
        }
    `;
}
