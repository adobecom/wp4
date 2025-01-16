import { VariantLayout } from "./variant-layout";
import { html, css } from 'lit';
import { CSS } from './plans.css.js';

export class Plans extends VariantLayout {
  constructor(card) {
    super(card);
  }

  getGlobalCSS() {
    return CSS;
  }
  
  postCardUpdateHook() {
    this.adjustTitleWidth();
  }

  get stockCheckbox() {
    return this.card.checkboxLabel
        ? html`<label id="stock-checkbox">
                <input type="checkbox" @change=${this.card.toggleStockOffer}></input>
                <span></span>
                ${this.card.checkboxLabel}
            </label>`
        : '';
  }

  renderLayout() {
    return html` ${this.badge}
        <div class="body">
            <slot name="icons"></slot>
            <slot name="heading-xs"></slot>
            <slot name="heading-m"></slot>
            <slot name="body-xxs"></slot>
            ${!this.promoBottom ? html`<slot name="promo-text"></slot><slot name="callout-content"></slot> ` : ''}
            <slot name="body-xs"></slot>
            ${this.promoBottom ? html`<slot name="promo-text"></slot><slot name="callout-content"></slot> ` : ''}  
            ${this.stockCheckbox}
        </div>
        <slot name="quantity-select"></slot>
        ${this.secureLabelFooter}`;
  }

  static variantStyle = css`
    :host([variant='plans']) {
      min-height: 348px;
    }
      
    :host([variant='plans']) ::slotted([slot='heading-xs']) {
      max-width: var(--consonant-merch-card-heading-xs-max-width, 100%);
    }
  `;
}
