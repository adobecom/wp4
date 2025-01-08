var r=Object.defineProperty;var n=(t,e,s)=>e in t?r(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var o=(t,e,s)=>n(t,typeof e!="symbol"?e+"":e,s);import{html as l,css as a,LitElement as h}from"../lit-all.min.js";var i=class extends h{updated(){this.hideSeeMoreEls()}hideSeeMoreEls(){this.isMobile&&this.rows.forEach((e,s)=>{s>=5&&(e.style.display=this.showAll?"flex":"none")})}constructor(){super(),this.showAll=!1,this.mobileRows=this.mobileRows===void 0?5:this.mobileRows}toggle(){this.showAll=!this.showAll,this.dispatchEvent(new CustomEvent("hide-see-more-elements",{bubbles:!0,composed:!0})),this.requestUpdate()}render(){return l`<slot name="heading"></slot>
            <slot name="content"></slot>
            ${this.isMobile&&this.rows.length>this.mobileRows?l`<div @click=${this.toggle} class="see-more">
                      ${this.showAll?"- See less":"+ See more"}
                  </div>`:l``}`}get isMobile(){return window.matchMedia("(max-width: 767px)").matches}get rows(){return this.querySelectorAll("merch-mnemonic-list")}};o(i,"styles",a`
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
    `),o(i,"properties",{heading:{type:String,attribute:!0},mobileRows:{type:Number,attribute:!0}});customElements.define("merch-whats-included",i);export{i as MerchWhatsIncluded};
