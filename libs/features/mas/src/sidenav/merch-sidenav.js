import { html, css, LitElement } from 'lit';
import { MatchMediaController } from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import { headingStyles } from './merch-sidenav-heading.css.js';
import '../merch-search.js';
import './merch-sidenav-list.js';
import './merch-sidenav-checkbox-group.js';
import { SPECTRUM_MOBILE_LANDSCAPE, TABLET_DOWN } from '../media.js';
import { disableBodyScroll, enableBodyScroll } from '../bodyScrollLock.js';

export class MerchSideNav extends LitElement {
    static properties = {
        sidenavTitle: { type: String },
        closeText: { type: String, attribute: 'close-text' },
        modal: { type: Boolean, attribute: 'modal', reflect: true },
    };

    // modal target
    #target;

    constructor() {
        super();
        this.modal = false;
    }

    static styles = [
        css`
            :host {
                display: block;
                z-index: 2;
            }

            :host(:not([modal])) {
                --mod-sidenav-item-background-default-selected: #222;
                --mod-sidenav-content-color-default-selected: #fff;
            }

            #content {
                width: 100%;
                min-width: 300px;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: baseline;
            }

            :host([modal]) ::slotted(merch-search) {
                display: none;
            }

            #sidenav {
                display: flex;
                flex-direction: column;
                max-width: 248px;
                overflow-y: auto;
                place-items: center;
                position: relative;
                width: 100%;
                padding-bottom: 16px;
            }

            sp-dialog-base #sidenav {
                padding-top: 16px;
                max-width: 300px;
                max-height: 80dvh;
                min-height: min(500px, 80dvh);
                background: #ffffff 0% 0% no-repeat padding-box;
                box-shadow: 0px 1px 4px #00000026;
            }

            sp-link {
                position: absolute;
                top: 16px;
                right: 16px;
            }
        `,
        headingStyles,
    ];

    mobileDevice = new MatchMediaController(this, SPECTRUM_MOBILE_LANDSCAPE);
    mobileAndTablet = new MatchMediaController(this, TABLET_DOWN);

    get filters() {
        return this.querySelector('merch-sidenav-list');
    }

    get search() {
        return this.querySelector('merch-search');
    }

    render() {
        return this.mobileAndTablet.matches ? this.asDialog : this.asAside;
    }

    get asDialog() {
        if (!this.modal) return;
        return html`
            <sp-theme  color="light" scale="medium">
                <sp-dialog-base
                    slot="click-content"
                    dismissable
                    underlay
                    no-divider
                >
                    <div id="content">
                        <div id="sidenav">
                            <div>
                                <h2>${this.sidenavTitle}</h2>
                                <slot></slot>
                            </div>
                            <sp-link href="#" @click="${this.closeModal}"
                                >${this.closeText || 'Close'}</sp-link
                            >
                        </div>
                    </div>
                </sp-dialog-base>
            </sp-theme>
        `;
    }

    get asAside() {
        return html`<sp-theme  color="light" scale="medium"
            ><h2>${this.sidenavTitle}</h2>
            <slot></slot
        ></sp-theme>`;
    }

    get dialog() {
        return this.shadowRoot.querySelector('sp-dialog-base');
    }

    closeModal(e) {
        e.preventDefault();
        this.dialog?.close();
        document.body.classList.remove('merch-modal');
    }

    openModal() {
        this.updateComplete.then(async () => {
            disableBodyScroll(this.dialog);
            document.body.classList.add('merch-modal');
            const options = {
                trigger: this.#target,
                notImmediatelyClosable: true,
                type: 'auto',
            };
            const overlay = await window.__merch__spectrum_Overlay.open(
                this.dialog,
                options,
            );
            overlay.addEventListener('close', () => {
                this.modal = false;
                document.body.classList.remove('merch-modal');
                enableBodyScroll(this.dialog);
            });
            this.shadowRoot.querySelector('sp-theme').append(overlay);
        });
    }

    updated() {
        if (this.modal) this.openModal();
    }

    showModal({ target }) {
        this.#target = target;
        this.modal = true;
    }
}

customElements.define('merch-sidenav', MerchSideNav);
