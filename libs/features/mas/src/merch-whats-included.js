import { html, css, LitElement } from 'lit';

export class MerchWhatsIncluded extends LitElement {
    static styles = css`
        :host {
            display: inline-grid;
            place-items: end start;
            grid-auto-flow: row;
            width: auto;
            overflow: hidden;
            place-content: stretch start;
            box-sizing: border-box;
            align-self: baseline;
            margin-bottom: 16px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            grid-auto-rows: unset;
            height: inherit;
        }

        ::slotted([slot='heading']) {
            grid-column: 1 / -1;
            font-size: 18px;
            margin: 0;
            margin-bottom: 16px;
        }

        ::slotted([slot='content']) {
            display: contents;
        }

        .hidden {
            display: none;
        }

        .see-more {
            font-size: 14px;
            text-decoration: underline;
            color: var(--link-color-dark);
            margin-top: 16px;
        }
    `;

    static properties = {
        heading: { type: String, attribute: true },
        mobileRows: { type: Number, attribute: true },
    };

    updated() {
        this.hideSeeMoreEls();
    }

    hideSeeMoreEls() {
        if (this.isMobile) {
            this.rows.forEach((node, index) => {
                if (index >= 5) {
                    node.style.display = this.showAll ? 'flex' : 'none';
                }
            });
        }
    }

    constructor() {
        super();
        this.showAll = false;
        this.mobileRows = this.mobileRows === undefined ? 5 : this.mobileRows;
    }

    toggle() {
        this.showAll = !this.showAll;

        this.dispatchEvent(
            new CustomEvent('hide-see-more-elements', {
                bubbles: true,
                composed: true,
            })
        );
        this.requestUpdate();
    }

    render() {
        return html`<slot name="heading"></slot>
            <slot name="content"></slot>
            ${this.isMobile && this.rows.length > this.mobileRows
                ? html`<div @click=${this.toggle} class="see-more">
                      ${this.showAll ? '- See less' : '+ See more'}
                  </div>`
                : html``}`;
    }

    get isMobile() {
        return window.matchMedia('(max-width: 767px)').matches;
    }

    get rows() {
        return this.querySelectorAll('merch-mnemonic-list');
    }
}

customElements.define('merch-whats-included', MerchWhatsIncluded);
