import { LitElement, css, html } from 'lit';
import { EVENT_MERCH_STOCK_CHANGE } from './constants.js';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import { MOBILE_LANDSCAPE } from './media.js';

export class MerchStock extends LitElement {
    static styles = [
        css`
            ::slotted(div) {
                display: none;
            }

            :host(:not([plan-type])) {
                display: none;
            }

            :host([plan-type='ABM']) ::slotted([data-plan-type='ABM']),
            :host([plan-type='M2M']) ::slotted([data-plan-type='M2M']),
            :host([plan-type='PUF']) ::slotted([data-plan-type='PUF']) {
                display: block;
            }

            sp-checkbox {
                margin: 0;
                font-size: 12px;
                line-height: 15px;
            }
        `,
    ];

    static properties = {
        checked: { type: Boolean, attribute: 'checked', reflect: true },
        planType: { type: String, attribute: 'plan-type', reflect: true },
    };

    #mobile = new MatchMediaController(this, MOBILE_LANDSCAPE);

    constructor() {
        super();
        this.checked = false;
    }

    handleChange(event) {
        this.checked = event.target.checked;
        // dispatch event
        this.dispatchEvent(
            new CustomEvent(EVENT_MERCH_STOCK_CHANGE, {
                detail: {
                    checked: event.target.checked,
                    planType: this.planType,
                },
                bubbles: true,
            }),
        );
    }

    connectedCallback() {
        this.style.setProperty('--mod-checkbox-font-size', '12px');
        super.connectedCallback();
        this.updateComplete.then(() => {
            this.querySelectorAll('[is="inline-price"]').forEach(async (el) => {
                await el.onceSettled();
                el.parentElement.setAttribute(
                    'data-plan-type',
                    el.value[0].planType,
                );
            });
        });
    }

    render() {
        if (!this.planType) return;
        if (this.#mobile.matches) return;
        return html`
            <sp-checkbox
                size="s"
                @change=${this.handleChange}
                ?checked=${this.checked}
            >
                <slot></slot>
            </sp-checkbox>
        `;
    }

    get osi() {
        if (!this.checked) return;
        return this.querySelector(
            `div[data-plan-type="${this.planType}"] [is="inline-price"]`,
        )?.value?.[0].offerSelectorIds[0];
    }
}

window.customElements.define('merch-stock', MerchStock);
