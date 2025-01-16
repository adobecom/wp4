// NOTE: this component should NOT be used in spectrum-free components like merch-card

import { LitElement, html } from 'lit';

import { styles } from './merch-secure-transaction.css.js';

const TAG_NAME = 'merch-secure-transaction';

export default class MerchSecureTransaction extends LitElement {
    static properties = {
        labelText: { attribute: 'label', type: String },
        showIcon: { attribute: 'icon', type: Boolean },
        tooltipText: { attribute: 'tooltip', type: String },
    };

    static styles = [styles];

    constructor() {
        super();
        this.labelText = '';
        this.showIcon = true;
        this.tooltipText = '';
    }

    render() {
        const { labelText, showIcon, tooltipText } = this;

        const label = html`
            <div class="${showIcon ? 'icon' : ''}" id="label" slot="trigger">
                ${labelText}
            </div>
        `;

        if (!tooltipText) return label;

        return html`
            <overlay-trigger placement="top-start" offset="4">
                ${label}
                <sp-tooltip id="tooltip" slot="hover-content" delayed
                    >${tooltipText}</sp-tooltip
                >
            </overlay-trigger>
        `;
    }
}

window.customElements.define(TAG_NAME, MerchSecureTransaction);
