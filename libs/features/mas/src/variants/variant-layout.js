import { html } from 'lit';

export class VariantLayout {
    static styleMap = {};

    card;

    #container;

    getContainer() {
        this.#container =
            this.#container ??
            this.card.closest('[class*="-merch-cards"]') ??
            this.card.parentElement;
        return this.#container;
    }

    insertVariantStyle() {
        if (!VariantLayout.styleMap[this.card.variant]) {
            VariantLayout.styleMap[this.card.variant] = true;
            const styles = document.createElement('style');
            styles.innerHTML = this.getGlobalCSS();
            document.head.appendChild(styles);
        }
    }

    updateCardElementMinHeight(el, name) {
        if (!el) return;
        const elMinHeightPropertyName = `--consonant-merch-card-${this.card.variant}-${name}-height`;
        const height = Math.max(
            0,
            parseInt(window.getComputedStyle(el).height) || 0,
        );
        const maxMinHeight =
            parseInt(
                this.getContainer().style.getPropertyValue(
                    elMinHeightPropertyName,
                ),
            ) || 0;

        if (height > maxMinHeight) {
            this.getContainer().style.setProperty(
                elMinHeightPropertyName,
                `${height}px`,
            );
        }
    }

    constructor(card) {
        this.card = card;
        this.insertVariantStyle();
    }

    get badge() {
        let additionalStyles;
        if (
            !this.card.badgeBackgroundColor ||
            !this.card.badgeColor ||
            !this.card.badgeText
        ) {
            return;
        }
        if (this.evergreen) {
            additionalStyles = `border: 1px solid ${this.card.badgeBackgroundColor}; border-right: none;`;
        }
        return html`
            <div
                id="badge"
                class="${this.card.variant}-badge"
                style="background-color: ${this.card.badgeBackgroundColor};
                color: ${this.card.badgeColor};
                ${additionalStyles}"
            >
                ${this.card.badgeText}
            </div>
        `;
    }

    get cardImage() {
        return html` <div class="image">
            <slot name="bg-image"></slot>
            ${this.badge}
        </div>`;
    }

    /* c8 ignore next 3 */
    getGlobalCSS() {
        return '';
    }

    /* c8 ignore next 3 */
    get theme() {
      return document.querySelector('sp-theme');
    }

    get evergreen() {
      return this.card.classList.contains('intro-pricing');
    }

    get promoBottom() {
        return this.card.classList.contains('promo-bottom');
    }

    get headingSelector() {
        return '[slot="heading-xs"]';
    }

    get secureLabelFooter() {
        const secureLabel = this.card.secureLabel
            ? html`<span class="secure-transaction-label"
                  >${this.card.secureLabel}</span
              >`
            : '';
        return html`<footer>${secureLabel}<slot name="footer"></slot></footer>`;
    }

    async adjustTitleWidth() {
        const cardWidth = this.card.getBoundingClientRect().width;
        const badgeWidth =
            this.card.badgeElement?.getBoundingClientRect().width || 0;
        if (cardWidth === 0 || badgeWidth === 0) return;
        this.card.style.setProperty(
            '--consonant-merch-card-heading-xs-max-width',
            `${Math.round(cardWidth - badgeWidth - 16)}px`, // consonant-merch-spacing-xs
        );
    }

    postCardUpdateHook() {
        //nothing to do by default
    }

    connectedCallbackHook() {
        //nothing to do by default
    }

    disconnectedCallbackHook() {
        //nothing to do by default
    }

    /* c8 ignore next 3 */
    renderLayout() {
        //nothing to do by default
    }

    /* c8 ignore next 4 */
    get aemFragmentMapping() {
        //nothing to do by default
        return undefined;
    }
}
