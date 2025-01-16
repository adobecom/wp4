import { VariantLayout } from "./variant-layout"
import { html, css } from 'lit';
import { CSS } from './segment.css.js';

export class Segment extends VariantLayout {
  constructor(card) {
    super(card);
  }

  getGlobalCSS() {
    return CSS;
  }

  postCardUpdateHook() {
    this.adjustTitleWidth();
  }

  renderLayout() {
    return html` ${this.badge}
    <div class="body">
        <slot name="heading-xs"></slot>
        <slot name="body-xxs"></slot>
        ${!this.promoBottom ? html`<slot name="promo-text"></slot><slot name="callout-content"></slot>` : ''}
        <slot name="body-xs"></slot>
        ${this.promoBottom ? html`<slot name="promo-text"></slot><slot name="callout-content"></slot>` : ''}
    </div>
    <hr />
    ${this.secureLabelFooter }`;
  }

  static variantStyle = css`
    :host([variant='segment']) {
      min-height: 214px;
    }
    :host([variant='segment']) ::slotted([slot='heading-xs']) {
      max-width: var(--consonant-merch-card-heading-xs-max-width, 100%);
    }
  `;
}
