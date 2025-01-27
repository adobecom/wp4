var g=Object.defineProperty;var a=(i,t,h)=>t in i?g(i,t,{enumerable:!0,configurable:!0,writable:!0,value:h}):i[t]=h;var r=(i,t,h)=>a(i,typeof t!="symbol"?t+"":t,h);import{LitElement as m,html as s,css as d}from"../lit-all.min.js";var e=class extends m{constructor(){super(),this.size="m",this.alt="",this.loading="lazy"}render(){let{href:t}=this;return t?s`<a href="${t}">
                  <img src="${this.src}" alt="${this.alt}" loading="${this.loading}" />
              </a>`:s` <img src="${this.src}" alt="${this.alt}" loading="${this.loading}" />`}};r(e,"properties",{size:{type:String,attribute:!0},src:{type:String,attribute:!0},alt:{type:String,attribute:!0},href:{type:String,attribute:!0},loading:{type:String,attribute:!0}}),r(e,"styles",d`
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
    `);customElements.define("merch-icon",e);export{e as default};
