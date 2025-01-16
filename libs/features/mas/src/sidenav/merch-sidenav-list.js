import { html, LitElement, css } from 'lit';
import { parseState, pushStateFromComponent } from '../deeplink.js';
import { headingStyles } from './merch-sidenav-heading.css.js';
import { debounce } from '../utils';
import { EVENT_MERCH_SIDENAV_SELECT } from '../constants.js';
export class MerchSidenavList extends LitElement {
    static properties = {
        sidenavListTitle: { type: String },
        label: { type: String },
        deeplink: { type: String, attribute: 'deeplink' },
        selectedText: {
            type: String,
            reflect: true,
            attribute: 'selected-text',
        },
        selectedValue: {
            type: String,
            reflect: true,
            attribute: 'selected-value',
        },
    };

    static styles = [
        css`
            :host {
                display: block;
                contain: content;
                padding-top: 16px;
            }
            .right {
                position: absolute;
                right: 0;
            }

            ::slotted(sp-sidenav.resources) {
                --mod-sidenav-item-background-default-selected: transparent;
                --mod-sidenav-content-color-default-selected: var(
                    --highcontrast-sidenav-content-color-default,
                    var(
                        --mod-sidenav-content-color-default,
                        var(--spectrum-sidenav-content-color-default)
                    )
                );
            }
        `,
        headingStyles,
    ];

    constructor() {
        super();
        this.handleClickDebounced = debounce(this.handleClick.bind(this));
    }

    selectElement(element, selected = true) {
        if (element.parentNode.tagName === 'SP-SIDENAV-ITEM') {
            this.selectElement(element.parentNode, false);
        }
        if (selected) {
            this.selectedElement = element;
            this.selectedText = element.label;
            this.selectedValue = element.value;
            setTimeout(() => {
                element.selected = true;
            }, 1);
            this.dispatchEvent(
                new CustomEvent(EVENT_MERCH_SIDENAV_SELECT, {
                    bubbles: true,
                    composed: true,
                    detail: {
                        type: 'sidenav',
                        value: this.selectedValue,
                        elt: this.selectedElement,
                    },
                }),
            );
        }
    }

    /*
     * set the state of the sidenav based on the URL
     */
    setStateFromURL() {
        const state = parseState();
        const value = state[this.deeplink] ?? 'all';
        if (value) {
            const element = this.querySelector(
                `sp-sidenav-item[value="${value}"]`,
            );
            if (!element) return;
            this.updateComplete.then(() => {
                const sideNavItemTagName = 'SP-SIDENAV-ITEM';
                if (element.firstElementChild?.tagName === sideNavItemTagName) {
                  element.expanded = true;
                }
                this.selectElement(element);
            });
        }
    }

    /**
     * click handler to manage first level items state of sidenav
     * @param {*} param
     */
    handleClick({ target: item }) {
        const { value, parentNode } = item;

        this.selectElement(item);

        if (parentNode && parentNode.tagName === 'SP-SIDENAV') {
            //swc does not consider, in multilevel, first level as a potential selection
            //and does not close other parents, we'll do that here
            pushStateFromComponent(this, value);
            item.selected = true;
            parentNode
                .querySelectorAll(
                    'sp-sidenav-item[expanded],sp-sidenav-item[selected]',
                )
                .forEach((item) => {
                    if (item.value !== value) {
                        item.expanded = false;
                        item.selected = false;
                    }
                });
        }
    }

    /**
     * leaf level item selection handler
     * @param {*} event
     */
    selectionChanged({ target: { value, parentNode } }) {
        this.selectElement(
            this.querySelector(`sp-sidenav-item[value="${value}"]`),
        );
        pushStateFromComponent(this, value);
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.handleClickDebounced);
        this.updateComplete.then(() => {
            this.setStateFromURL();
        });
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.handleClickDebounced);
    }

    render() {
        return html`<div
            aria-label="${this.label}"
            @change="${(e) => this.selectionChanged(e)}"
        >
            ${this.sidenavListTitle ? html`<h2>${this.sidenavListTitle}</h2>` : ''}
            <slot></slot>
        </div>`;
    }
}

customElements.define('merch-sidenav-list', MerchSidenavList);
