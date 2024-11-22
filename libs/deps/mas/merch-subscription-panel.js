import{html as i,LitElement as m}from"../lit-all.min.js";var s=class{constructor(e,o){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(o),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};import{css as u}from"../lit-all.min.js";var f=u`
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
`;var n="merch-offer-select:ready";var c="merch-offer:selected",a="merch-stock:change";var h="merch-quantity-selector:change";var p="(max-width: 1199px)";var l=class extends m{static styles=[f];static properties={continueText:{type:String,attribute:"continue-text"},quantity:{type:Number},ready:{type:Boolean,attribute:"ready",reflect:!0}};continueText="Continue";#e=new s(this,p);constructor(){super(),this.ready=!1}get listLayout(){return i`
            <slot name="header"></slot>
            <slot name="offers"></slot>
            <div id="footer">
                <slot name="footer"></slot>
                <sp-button
                    variant="cta"
                    size="large"
                    @click=${this.handleContinue}
                >
                    ${this.continueText}
                </sp-button>
            </div>
            ${this.checkoutLink}
            <slot @slotchange=${this.handleSlotChange}></slot>
        `}get waitLayout(){return i`
            <div id="spinner">
                <sp-progress-circle indeterminate size="l" />
            </div>
            <slot @slotchange=${this.handleSlotChange}></slot>
        `}render(){return this.offerSelect?this.listLayout:this.waitLayout}connectedCallback(){super.connectedCallback(),this.#e.matches?this.setAttribute("layout","mobile"):this.setAttribute("layout","desktop"),this.addEventListener(n,this.handleOfferSelectReady),this.checkOfferSelectReady(),this.addEventListener(c,this.handleOfferSelect),this.addEventListener(a,this.handleStockChange),this.addEventListener(h,this.handleQuantitySelectChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(n,this.handleOfferSelectReady),this.removeEventListener(c,this.handleOfferSelect),this.removeEventListener(a,this.handleStockChange),this.removeEventListener(h,this.handleQuantitySelectChange)}handleSlotChange(){this.initOfferSelect(),this.initQuantitySelect(),this.initStock(),this.secureTransaction?.setAttribute("slot","footer")}async checkOfferSelectReady(){this.offerSelect&&(await this.offerSelect.updateComplete,this.offerSelect.planType&&this.handleOfferSelectReady())}handleOfferSelectReady(){this.ready=!0,this.initStock(),this.requestUpdate()}handleOfferSelect(e){this.offerSelect?.stock&&(this.stock.planType=e.detail.planType),this.requestUpdate()}handleQuantitySelectChange(e){this.quantity=e.detail.option}handleStockChange(){this.requestUpdate()}handleContinue(){this.shadowRoot.getElementById("checkoutLink").click()}async initOfferSelect(){this.offerSelect&&(this.offerSelect.querySelectorAll("merch-offer").forEach(e=>e.type="subscription-option"),this.ready=!!this.offerSelect.planType,this.offerSelect.setAttribute("slot","offers"),await this.offerSelect.selectOffer(this.offerSelect.querySelector("merch-offer[aria-selected]")),await this.offerSelect.selectedOffer.price.onceSettled(),this.requestUpdate())}initStock(){this.stock&&(this.stock.setAttribute("slot","footer"),this.offerSelect?.stock?this.stock.planType=this.offerSelect.planType:this.stock.planType=null)}initQuantitySelect(){this.quantitySelect&&this.quantitySelect.setAttribute("slot","footer")}get offerSelect(){return this.querySelector("merch-offer-select")}get quantitySelect(){return this.querySelector("merch-quantity-select")}get stock(){return this.querySelector("merch-stock")}get secureTransaction(){return this.querySelector("merch-secure-transaction")}get checkoutLink(){if(!this.offerSelect?.selectedOffer?.price?.value)return;let[{offerSelectorIds:[e]}]=this.offerSelect.selectedOffer.price?.value;if(!e)return;let o=[e];if(this.stock){let t=this.stock.osi;t&&o.push(t)}let d=o.join(","),r=this.offerSelect.selectedOffer.cta;if(r&&r.value){let t=r?.cloneNode(!0);return t.setAttribute("id","checkoutLink"),t.setAttribute("data-wcs-osi",d),t.setAttribute("data-quantity",this.quantity),t.removeAttribute("target"),i`${t}`}return i`<a
            id="checkoutLink"
            is="checkout-link"
            data-wcs-osi="${d}"
            data-quantity="${this.quantity}"
            href="#"
        ></a>`}};window.customElements.define("merch-subscription-panel",l);
//# sourceMappingURL=merch-subscription-panel.js.map
