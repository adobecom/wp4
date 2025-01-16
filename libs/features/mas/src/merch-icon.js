import { LitElement, html, css } from 'lit';

export default class MerchIcon extends LitElement {
    static properties = {
        size: { type: String, attribute: true },
        src: { type: String, attribute: true },
        alt: { type: String, attribute: true },
        href: { type: String, attribute: true },
    };

    constructor() {
        super();
        this.size = 'm';
        this.alt = '';
    }

    render() {
        const { href } = this;
        return href
            ? html`<a href="${href}">
                  <img src="${this.src}" alt="${this.alt}" loading="lazy" />
              </a>`
            : html` <img src="${this.src}" alt="${this.alt}" loading="lazy" />`;
    }

    static styles = css`
        :host {
            --img-width: 32px;
            --img-height: 32px;
            display: block;
            width: var(--mod-img-width, var(--img-width));
            height: var(--mod-img-height, var(--img-height));
        }

        :host([size='s']) {
            --img-width: 24px;
            --img-height: 24px;
        }

        :host([size='m']) {
            --img-width: 30px;
            --img-height: 30px;
        }

        :host([size='l']) {
            --img-width: 40px;
            --img-height: 40px;
        }

        img {
            width: var(--mod-img-width, var(--img-width));
            height: var(--mod-img-height, var(--img-height));
        }
    `;
}

customElements.define('merch-icon', MerchIcon);
