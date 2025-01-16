import { VariantLayout } from "./variant-layout.js";
import { html } from 'lit';
import { CSS } from './image.css.js';

export class Image extends VariantLayout {
  constructor(card) {
    super(card);
  }

  getGlobalCSS() {
    return CSS;
  }

  renderLayout() {
    return html`${this.cardImage}
    <div class="body">
        <slot name="icons"></slot>
        <slot name="heading-xs"></slot>
        <slot name="body-xxs"></slot>
        ${this.promoBottom ? html`<slot name="body-xs"></slot><slot name="promo-text"></slot>` : html`<slot name="promo-text"></slot><slot name="body-xs"></slot>`}
    </div>
    ${this.evergreen
        ? html`
              <div
                  class="detail-bg-container"
                  style="background: ${this.card['detailBg']}"
              >
                  <slot name="detail-bg"></slot>
              </div>
          `
        : html`
              <hr />
              ${this.secureLabelFooter}
          `}`;
  }
}
