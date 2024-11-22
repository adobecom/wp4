import{LitElement as h,html as e,css as s}from"../lit-all.min.js";var t=class extends h{static properties={size:{type:String,attribute:!0},src:{type:String,attribute:!0},alt:{type:String,attribute:!0},href:{type:String,attribute:!0}};constructor(){super(),this.size="m",this.alt=""}render(){let{href:i}=this;return i?e`<a href="${i}">
                  <img src="${this.src}" alt="${this.alt}" loading="lazy" />
              </a>`:e` <img src="${this.src}" alt="${this.alt}" loading="lazy" />`}static styles=s`
        :host {
            --img-width: 32px;
            --img-height: 32px;
            display: block;
            width: var(--img-width);
            height: var(--img-height);
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
            width: var(--img-width);
            height: var(--img-height);
        }
    `};customElements.define("merch-icon",t);export{t as default};
//# sourceMappingURL=merch-icon.js.map
