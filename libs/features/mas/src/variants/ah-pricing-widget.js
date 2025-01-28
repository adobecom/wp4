import { html, css } from 'lit';
import { VariantLayout } from './variant-layout.js';
import { CSS } from './ah-pricing-widget.css.js';

const AEM_FRAGMENT_MAPPING = {
  mnemonics: { size: 's' },
  title: { tag: 'h3', slot: 'heading-xxxs', maxCount: 40 },
  description: { tag: 'div', slot: 'body-xxs', maxCount: 200 },
  prices: { tag: 'p', slot: 'price' },
  ctas: { slot: 'cta', size: 'S' },
  backgroundImage: { tag: 'div', slot: 'image' },
  allowedColors: ['gray'],
  allowedSizes: ['single', 'double']
};

export class AHPricingWidget extends VariantLayout {
  getGlobalCSS() {
    return CSS;
  }

  /* c8 ignore next 3 */
  get aemFragmentMapping() {
    return AEM_FRAGMENT_MAPPING;
  }

  renderLayout() {
    return html`
      <div class="content">
        <div class="header">
    		    <slot name="icons"></slot>
            <slot name="heading-xxxs"></slot>
        </div>
        <slot name="body-xxs"></slot>
        <slot name="price"></slot>
        <div class="footer">
          <slot name="cta"></slot>
        </div>
      </div>
      ${this.card.size === 'single' ? html`<slot name="image"></slot>` : ''}
      <slot></slot>
    `;
  }

  static variantStyle = css`
    :host([variant='ah-pricing-widget']) {
        --merch-card-ah-pricing-widget-width: 132px;
        --merch-card-ah-pricing-widget-min-width: 132px;
        --merch-card-ah-pricing-widget-content-max-width: 245px;
        --merch-card-ah-pricing-widget-height: 206px;
        --merch-card-ah-pricing-widget-header-min-height: 36px;
        --merch-card-ah-pricing-widget-gray-background: rgba(248, 248, 248);
        --merch-card-ah-pricing-widget-text-color: rgba(19, 19, 19);
        --merch-card-ah-pricing-widget-price-line-height: 17px;
        width: var(--merch-card-ah-pricing-widget-width);
        min-width: var(--merch-card-ah-pricing-widget-min-width);
        min-height: var(--merch-card-ah-pricing-widget-height);
        background-color: var(--consonant-merch-card-background-color);
        color: var(--consonant-merch-card-heading-xxxs-color);
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        padding: 12px !important;
        gap: 16px;
        box-sizing: content-box !important;
        border: none;
    }

    :host([variant='ah-pricing-widget'][size='single']) {
        --merch-card-ah-pricing-widget-width: 460px;
    }

    :host([variant='ah-pricing-widget'][size='double']) {
        --merch-card-ah-pricing-widget-width: 214px;
    }

    :host([variant='ah-pricing-widget'][background-color='gray']) {
        background-color: var(--merch-card-ah-pricing-widget-gray-background);
    }

    :host([variant='ah-pricing-widget']) .content {
        display: flex;
        flex-direction: column;
        width: var(--merch-card-ah-pricing-widget-content-max-width);
    }

    :host([variant='ah-pricing-widget']) .header {
        display: flex;
        min-height: var(--merch-card-ah-pricing-widget-header-min-height);
        flex-direction: row;
        align-items: center;
        gap: var(--consonant-merch-spacing-xxs);
        margin-bottom: 4px;
    }


    :host([variant='ah-pricing-widget']) ::slotted([slot='price']) {
        margin-left: var(--spacing-xs);
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        justify-content: end;
        font-size: var(--consonant-merch-card-detail-s-font-size);
        font-style: italic;
        line-height: var(--merch-card-ah-pricing-widget-price-line-height);
        color: var(--consonant-merch-card-heading-xxxs-color);
    }

    :host([variant='ah-pricing-widget']) .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 24px;
    }

    :host([variant='ah-pricing-widget']) ::slotted([slot='cta']) {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 8px;
    }

    :host([variant='ah-pricing-widget']) ::slotted([slot='image']) {
        width: 199px;
        overflow: hidden;
    }
  `;
}

customElements.define('ah-pricing-widget', AHPricingWidget);
