import { LitElement, html } from 'lit';

import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';

import styles from './plans-modal.css.js';
import { MOBILE_LANDSCAPE } from './media.js';

export default class PlansModal extends LitElement {
    static properties = {
        trigger: {},
        title: {},
        description: { attribute: 'description' },
        includesLimit: {
            type: Number,
            attribute: 'includes-limit',
            reflect: true,
        },
        includes: {
            type: Array,
        },
        extra: {
            type: Array,
        },
        recommended: {
            type: Array,
        },
        backText: { type: String, attribute: 'back-text' },
        ctaText: { type: String, attribute: 'cta-text' },
        extraText: { type: String, attribute: 'extra-text' },
        includesText: { type: String, attribute: 'includes-text' },
        recommendedText: { type: String, attribute: 'recommended-text' },
        seeMoreText: { type: String, attribute: 'see-more-text' },
    };

    mobileDevice = new MatchMediaController(this, MOBILE_LANDSCAPE);

    constructor() {
        super();
        this.includesLimit = 5;
        this.seeMoreText = ' + See more';
    }

    render() {
        return html`
            <sp-theme  color="light" scale="large">
                <sp-dialog-wrapper
                    slot="click-content"
                    title="${this.title}"
                    dismissable
                    underlay
                    no-divider
                    cancel-label="${this.backText}"
                    confirm-label="${this.ctaText}"
                    @close="${this.remove}"
                    @cancel="${this.remove}"
                    mode="${this.mobileDevice.matches
                        ? 'fullscreenTakeover'
                        : undefined}"
                >
                    <div id="container" part="container">
                        <div id="title">
                            <slot name="icon"></slot>
                            <h2>${this.title}</h2>
                        </div>
                        <div id="description">
                            <slot name="icon"></slot>
                            <p>${this.description}</p>
                        </div>
                        <div id="includes">
                            <h3>${this.includesText || 'Includes'}</h3>
                            <ul>
                                ${this.includes}
                            </ul>
                            ${this.seeMoreButton}
                        </div>
                        <div id="extra">
                            <h3>${this.extraText || 'Extra'}</h3>
                            <ul>
                                ${this.extra}
                            </ul>
                        </div>
                        <div id="recommended">
                            <h3>${this.recommendedText || 'Recommended'}</h3>
                            <ul>
                                ${this.recommended}
                            </ul>
                        </div>
                        <div id="actions">${this.subscriptionPanel}</div>
                    </div>
                </sp-dialog-wrapper>
            </sp-theme>
        `;
    }

    updated(changedProperties) {
        if (changedProperties.has('includesLimit')) {
            this.style.setProperty(
                '--consonant-plan-modal-includes-limit',
                this.includesLimit,
            );
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.updateComplete.then(async () => {
            this.prepareSlots();
            this.openModal();
        });
    }

    seeMore() {
        this.hideSeeMoreButton = true;
        this.includesLimit = this.includes.length;
        this.style.setProperty('--consonant-plan-modal-includes', 'auto');
    }

    get seeMoreButton() {
        return this.hideSeeMoreButton
            ? undefined
            : html`
                  <sp-button
                      id="seeMore"
                      size="s"
                      treatment="outline"
                      variant="secondary"
                      @click="${this.seeMore}"
                  >
                      ${this.seeMoreText}
                  </sp-button>
              `;
    }

    prepareSlots() {
        this.offers = this.querySelector('offer');
        this.subscriptionPanel = this.querySelector('merch-subscription-panel');
        this.includes = [...this.querySelectorAll('[slot="includes"] > li')];
        this.hideSeeMoreButton = this.includes.length <= this.includesLimit;

        this.extra = [...this.querySelectorAll('[slot="extra"] > li')];

        this.recommended = [
            ...this.querySelectorAll('[slot="recommended"] > li'),
        ];
    }

    async openModal() {
        const options = {
            offset: 0,
            placement: 'none',
            trigger: this.trigger,
            type: 'auto',
        };
        const overlay = await Overlay.open(
            this.shadowRoot.querySelector('sp-dialog-wrapper'),
            options,
        );
        this.shadowRoot.querySelector('sp-theme').append(overlay);
    }

    static styles = [styles];
}

customElements.define('plans-modal', PlansModal);
