var y=Object.defineProperty;var u=o=>{throw TypeError(o)};var T=(o,e,t)=>e in o?y(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var h=(o,e,t)=>T(o,typeof e!="symbol"?e+"":e,t),C=(o,e,t)=>e.has(o)||u("Cannot "+t);var _=(o,e,t)=>(C(o,e,"read from private field"),t?t.call(o):e.get(o)),S=(o,e,t)=>e.has(o)?u("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(o):e.set(o,t);import{html as n,LitElement as g}from"../lit-all.min.js";var i=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};import{css as R}from"../lit-all.min.js";var x=R`
    :host {
        --merch-focused-outline: var(--merch-color-focus-ring) auto 1px;
        background-color: #f5f5f5;
        display: flex;
        flex-direction: column;
        gap: var(--consonant-merch-spacing-xs);
        width: 100%;
        min-width: 300px;
        max-width: 378px;
        visibility: hidden;
    }

    :host([ready]) {
        visibility: visible;
    }

    slot[name='header'] {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    ::slotted(h4),
    ::slotted(h5) {
        margin: 0;
    }

    ::slotted(h4) {
        font-size: 18px !important;
        font-weight: bold;
        line-height: 22px !important;
    }

    ::slotted(h5) {
        font-size: 14px !important;
        font-weight: normal;
        line-height: 17px !important;
    }

    #spinner {
        display: flex;
        justify-content: center;
    }

    #stock:focus-within {
        outline: var(--merch-focused-outline);
        outline-offset: 8px;
    }

    #footer {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    ::slotted(merch-secure-transaction) {
        order: 2;
    }

    sp-theme {
        display: contents;
    }

    sp-button {
        order: 3;
    }

    :host([layout='desktop']) ::slotted(merch-quantity-select) {
        width: 100%;
    }

    :host([layout='mobile']) sp-button {
        width: 80%;
        max-width: 300px;
    }

    ::slotted(merch-stock) {
        order: 1;
        max-width: 460px;
    }

    ::slotted(merch-quantity-select) {
        order: 1;
    }

    :host([layout='mobile']) #footer {
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 187px;
        display: flex;
        gap: 16px;
        flex-direction: column;
        flex-wrap: nowrap;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: 0px -8px 10px -5px rgba(112, 112, 112, 0.1);
        background-color: #fff;
        padding: 15px 30px;
        box-sizing: border-box;
    }

    ::slotted(merch-offer-select) {
        overflow-y: auto;
        max-height: calc(100vh - 420px);
    }

    a[is='checkout-link'] {
        display: none;
    }
`;var l="merch-offer-select:ready";var d="merch-offer:selected",E="merch-stock:change";var p="merch-quantity-selector:change";var A="(max-width: 1199px)";var c,r=class extends g{constructor(){super();S(this,c,new i(this,A));this.ready=!1,this.continueText="Continue"}get listLayout(){return n`
            <slot name="header"></slot>
            <slot name="offers"></slot>
            <div id="footer">
                <slot name="footer"></slot>
                <sp-button
                    variant="accent"
                    size="large"
                    @click=${this.handleContinue}
                >
                    ${this.continueText}
                </sp-button>
            </div>
            ${this.checkoutLink}
            <slot @slotchange=${this.handleSlotChange}></slot>
        `}get waitLayout(){return n`
            <div id="spinner">
                <sp-progress-circle indeterminate size="l" />
            </div>
            <slot @slotchange=${this.handleSlotChange}></slot>
        `}render(){return this.offerSelect?this.listLayout:this.waitLayout}connectedCallback(){super.connectedCallback(),_(this,c).matches?this.setAttribute("layout","mobile"):this.setAttribute("layout","desktop"),this.addEventListener(l,this.handleOfferSelectReady),this.checkOfferSelectReady(),this.addEventListener(d,this.handleOfferSelect),this.addEventListener(E,this.handleStockChange),this.addEventListener(p,this.handleQuantitySelectChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(l,this.handleOfferSelectReady),this.removeEventListener(d,this.handleOfferSelect),this.removeEventListener(E,this.handleStockChange),this.removeEventListener(p,this.handleQuantitySelectChange)}handleSlotChange(){this.initOfferSelect(),this.initQuantitySelect(),this.initStock(),this.secureTransaction?.setAttribute("slot","footer")}async checkOfferSelectReady(){this.offerSelect&&(await this.offerSelect.updateComplete,this.offerSelect.planType&&this.handleOfferSelectReady())}handleOfferSelectReady(){this.ready=!0,this.initStock(),this.requestUpdate()}handleOfferSelect(t){this.offerSelect?.stock&&(this.stock.planType=t.detail.planType),this.requestUpdate()}handleQuantitySelectChange(t){this.quantity=t.detail.option}handleStockChange(){this.requestUpdate()}handleContinue(){this.shadowRoot.getElementById("checkoutLink").click()}async initOfferSelect(){this.offerSelect&&(this.offerSelect.querySelectorAll("merch-offer").forEach(t=>t.type="subscription-option"),this.ready=!!this.offerSelect.planType,this.offerSelect.setAttribute("slot","offers"),await this.offerSelect.selectOffer(this.offerSelect.querySelector("merch-offer[aria-selected]")),await this.offerSelect.selectedOffer.price.onceSettled(),this.requestUpdate())}initStock(){this.stock&&(this.stock.setAttribute("slot","footer"),this.offerSelect?.stock?this.stock.planType=this.offerSelect.planType:this.stock.planType=null)}initQuantitySelect(){this.quantitySelect&&this.quantitySelect.setAttribute("slot","footer")}get offerSelect(){return this.querySelector("merch-offer-select")}get quantitySelect(){return this.querySelector("merch-quantity-select")}get stock(){return this.querySelector("merch-stock")}get secureTransaction(){return this.querySelector("merch-secure-transaction")}get checkoutLink(){if(!this.offerSelect?.selectedOffer?.price?.value)return;let[{offerSelectorIds:[t]}]=this.offerSelect.selectedOffer.price?.value;if(!t)return;let f=[t];if(this.stock){let s=this.stock.osi;s&&f.push(s)}let m=f.join(","),a=this.offerSelect.selectedOffer.cta;if(a&&a.value){let s=a?.cloneNode(!0);return s.setAttribute("id","checkoutLink"),s.setAttribute("data-wcs-osi",m),s.setAttribute("data-quantity",this.quantity),s.removeAttribute("target"),n`${s}`}return n`<a
            id="checkoutLink"
            is="checkout-link"
            data-wcs-osi="${m}"
            data-quantity="${this.quantity}"
            href="#"
        ></a>`}};c=new WeakMap,h(r,"styles",[x]),h(r,"properties",{continueText:{type:String,attribute:"continue-text"},quantity:{type:Number},ready:{type:Boolean,attribute:"ready",reflect:!0}});window.customElements.define("merch-subscription-panel",r);
