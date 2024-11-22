import{LitElement as T,html as s}from"../lit-all.min.js";var r=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};import{css as C}from"../lit-all.min.js";var b=C`
    :host {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        max-width: 972px;
        background-color: #f8f8f8;
    }

    sp-theme {
        display: contents;
    }

    ::slotted(p) {
        margin: 0;
    }

    .cards {
        display: flex;
        gap: var(--consonant-merch-spacing-xs);
    }

    #backButton {
        position: absolute;
        border-width: 0;
    }

    ::slotted([slot='detail-xl']) {
        font-size: 18px;
        font-weight: bold;
        color: #2c2c2c;
        margin: 0;
    }

    ::slotted([slot='merch-whats-included']) {
        align-self: auto;
        width: 100%;
        position: absolute;
        background: #fff;
        height: 100%;
        padding: 30px;
        border-radius: 10px;
        box-sizing: border-box;
    }

    ::slotted([slot$='-footer']) {
        flex-basis: 100%;
    }

    ::slotted([slot='merch-whats-included'].hidden) {
        display: none;
    }

    /* Mobile */

    .mobile {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        max-height: 100vh;
        padding: 30px 30px 0 30px;
        width: 100vw;
        gap: 16px;
    }

    .mobile #backButton {
        top: 12px;
        left: 12px;
    }

    .mobile ::slotted([slot='detail-xl']) {
        max-width: 455px;
        width: 100%;
    }

    .mobile[data-step='2'] {
        padding-top: 54px;
        background-color: #f5f5f5; /* make a variable */
    }

    [data-step='2'] sp-tabs {
        display: none;
    }

    #card-icons-title {
        display: flex;
        align-items: center;
        gap: 8px;
        align-self: center;
        max-width: 400px;
        width: 100%;
    }

    #card-icons-title h3 {
        margin: 0;
        font-size: 18px;
    }

    .mobile sp-tabs {
        width: 100%;
        max-width: 455px;
    }

    .mobile sp-tab-panel {
        height: calc(100vh - 268px);
        flex: 1;
    }

    .mobile .cards {
        padding-top: 2px;
        align-items: center;
        flex: 1;
        flex-direction: column;
        overflow-y: auto;
        padding-bottom: 50px;
    }

    .mobile #continueButton {
        align-items: center;
        width: 100%;
        height: 120px;
        display: flex;
        gap: 16px;
        flex-direction: column;
        place-content: center;
        position: fixed;
        bottom: 0;
        box-shadow: 0px -8px 10px -5px rgba(112, 112, 112, 0.1);
        background-color: #fff;
        padding: 0 30px;
    }

    #continueButton sp-button {
        width: 80%;
        min-width: 110px;
        max-width: 300px;
    }

    .mobile ::slotted(merch-card) {
        width: 300px;
    }

    .mobile #content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 30px 30px 0 30px;
    }

    .desktop {
        display: flex;
        width: 972px;
        min-height: 680px;
        position: relative;
        flex: 1;
    }

    .desktop .cards {
        flex-wrap: wrap;
    }

    .desktop #content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 30px 30px 0 30px;
    }

    .desktop #content slot[name='single-card'] {
        display: block;
        margin-top: 24px;
        margin-bottom: 24px;
    }

    ::slotted(merch-card[slot='single-card']) {
        box-shadow: none;
    }

    .desktop ::slotted([slot='detail-xl']) {
        font-size: 20px;
    }

    .desktop aside {
        background-color: #f5f5f5;
        border-radius: 8px; /* not sure if necessary */
        display: flex;
        flex-direction: column;
        width: 360px;
        box-sizing: border-box;
        padding: 0 30px 0 30px;
    }

    .desktop sp-tabs {
        margin: 12px 0 30px 0;
    }

    sp-tab-panel {
        padding-top: 20px;
    }

    .desktop ::slotted(merch-card) {
        width: 268px;
    }

    .desktop ::slotted(merch-subscription-panel) {
        margin-top: 40px;
    }

    .desktop #continueButton {
        position: absolute;
        bottom: 30px;
        right: 30px;
    }

    .desktop #backButton {
        left: 30px;
        bottom: 30px;
    }
`;var x="(max-width: 1199px)";var h="merch-card:ready";var p="merch-offer:selected";var u="merch-storage:change",g="merch-quantity-selector:change";function f(d=window.location.hash){let e=[],t=d.replace(/^#/,"").split("&");for(let n of t){let[i,o=""]=n.split("=");i&&e.push([i,decodeURIComponent(o.replace(/\+/g," "))])}return Object.fromEntries(e)}var S="merch-twp-d2p",a="individuals",l="business",c="education",m=class extends T{static styles=[b];static properties={individualsText:{type:String,attribute:"individuals-text"},businessText:{type:String,attribute:"business-text"},educationText:{type:String,attribute:"education-text"},continueText:{type:String,attribute:"continue-text"},ready:{type:Boolean},step:{type:Number},singleCard:{state:!0},selectedTab:{type:String,attribute:"selected-tab",reflect:!0}};selectedTab=this.preselectedTab();#e;#s;#t;#i=new r(this,x);individualsText="Individuals";businessText="Business";educationText="Students and teachers";continueText="Continue";ready=!1;constructor(){super(),this.step=1,this.#t=this.handleOfferSelected.bind(this),this.handleWhatsIncludedClick=this.handleWhatsIncludedClick.bind(this)}get log(){return this.#e||(this.#e=document.head.querySelector("wcms-commerce")?.Log.module("twp")),this.#e}get individualsTab(){return this.cciCards.length===0?s``:s`
            <sp-tab value="${a}" label=${this.individualsText}>
                <sp-icon-user slot="icon"></sp-icon-user>
            </sp-tab>
            <sp-tab-panel value="${a}">
                <div class="cards">
                    <slot name="individuals"></slot>
                    <slot name="cci-footer"></slot>
                </div>
            </sp-tab-panel>
        `}get businessTab(){return this.cctCards.length===0?s``:s`
            <sp-tab value="${l}" label=${this.businessText}>
                <sp-icon-user-group slot="icon"></sp-icon-user-group>
            </sp-tab>
            <sp-tab-panel value="${l}">
                <div class="cards">
                    <slot name="business"></slot>
                    <slot name="cct-footer"></slot>
                </div>
            </sp-tab-panel>
        `}get educationTab(){return this.cceCards.length===0?s``:s`
            <sp-tab value="${c}" label=${this.educationText}>
                <sp-icon-book slot="icon"></sp-icon-book>
            </sp-tab>
            <sp-tab-panel value="${c}">
            <div class="cards">
                <slot name="education"></slot>
                <slot name="cce-footer"></slot>
            </sp-tab-panel>
        `}preselectedTab(){let t=new URLSearchParams(window.location.search).get("plan");return t===a||t===l||t===c?t:a}get selectedTabPanel(){return this.shadowRoot.querySelector("sp-tab-panel[selected]")}get firstCardInSelectedTab(){return this.selectedTabPanel?.querySelector("slot").assignedElements()[0]}get tabs(){return this.cards.length===1?s``:this.singleCard&&this.step===1?s``:s`
            <sp-tabs
                emphasized
                selected="${this.selectedTab}"
                @change=${this.tabChanged}
            >
                ${this.individualsTab} ${this.businessTab} ${this.educationTab}
            </sp-tabs>
        `}async tabChanged(e){this.selectedTab=e.target.selected,await e.target.updateComplete,this.selectCard(this.firstCardInSelectedTab)}get singleCardFooter(){if(this.step===1)return s`
            <slot name="cci-footer"></slot>
            <slot name="cct-footer"></slot>
            <slot name="cce-footer"></slot>
        `}get desktopLayout(){return this.singleCard?s`<div class="desktop" data-step="${this.step}">
                <div id="content">
                    <slot name="detail-xl"></slot>
                    ${this.tabs}
                    <slot name="single-card"></slot>
                    ${this.singleCardFooter} ${this.backButton}
                </div>
                <aside>
                    <slot name="panel"></slot>
                </aside>
            </div>`:s`
            <div class="desktop" data-step="${this.step}">
                <div id="content">
                    <slot name="detail-xl"></slot>
                    ${this.tabs}
                    <slot name="footer-link"></slot>
                </div>
                ${this.cciCards.length<3?s`<aside>
                          <slot name="panel"></slot>
                      </aside>`:""}
                ${this.continueButton}
            </div>
        `}get showSubscriptionPanelInStep1(){return this.#i.matches?!1:this.cciCards.length<3}get continueButton(){return this.showSubscriptionPanelInStep1?s``:s`
            <div id="continueButton">
                <sp-button
                    variant="cta"
                    size="large"
                    @click=${this.handleContinue}
                >
                    ${this.continueText}
                </sp-button>
            </div>
        `}selectSingleCard(e){e.setAttribute("data-slot",e.getAttribute("slot")),e.setAttribute("slot","single-card"),this.singleCard=e}unSelectSingleCard(){this.singleCard&&(this.singleCard.setAttribute("slot",this.singleCard.getAttribute("data-slot")),this.singleCard.removeAttribute("data-slot"),this.step=1,this.singleCard=void 0)}handleContinue(){this.step=2,this.selectSingleCard(this.cardToSelect),this.#s=[...this.singleCard.querySelectorAll("merch-icon")].map(e=>e.cloneNode(!0))}handleBack(){this.unSelectSingleCard()}get cardToSelect(){return this.selectedTabPanel?.card??this.querySelector("merch-card[aria-selected]")}get selectedCard(){return this.singleCard??this.selectedTabPanel.card}get mobileStepTwo(){return this.singleCard?s`
            ${this.backButton} ${this.stepTwoCardIconsAndTitle}
            <slot name="panel"></slot>
        `:s``}get stepTwoCardIconsAndTitle(){if(this.selectedCard)return s`<div id="card-icons-title">
            ${this.#s}
            <h3>${this.selectedCard.title}</h3>
        </div>`}get backButton(){return this.step!==2?s``:s`<sp-button
            id="backButton"
            treatment="outline"
            variant="secondary"
            size="s"
            @click=${this.handleBack}
        >
            <sp-icon-chevron-double-left
                slot="icon"
            ></<sp-icon-chevron-double-left></sp-icon-chevron-double-left
            > Back</sp-button>`}get mobileLayout(){return this.step===1?s`
                <div class="mobile" data-step="${this.step}">
                    <slot name="detail-xl"></slot>
                    <slot name="single-card"></slot>
                    ${this.tabs} ${this.continueButton}
                </div>
            `:s`
            <div class="mobile" data-step="${this.step}">
                <slot name="detail-xl"></slot>
                ${this.tabs}${this.mobileStepTwo}
            </div>
        `}render(){return this.ready?s`
            <sp-theme theme="spectrum" color="light" scale="large">
                ${this.#i.matches?this.mobileLayout:this.desktopLayout}
                <slot name="merch-whats-included"></slot>
            </div>
        `:s``}connectedCallback(){super.connectedCallback(),this.style.setProperty("--mod-tabs-font-weight",700),this.addEventListener(h,this.merchTwpReady),this.subscriptionPanel.addEventListener(p,this.#t),this.addEventListener(g,this.handleQuantityChange),this.whatsIncludedLink?.addEventListener("click",this.handleWhatsIncludedClick),this.addEventListener(u,this.handleStorageChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener(h,this.merchTwpReady),this.subscriptionPanel.removeEventListener(p,this.#t),this.whatsIncludedLink?.removeEventListener("click",this.handleWhatsIncludedClick),this.removeEventListener(u,this.handleStorageChange)}handleOfferSelected(e){this.log.debug("Selecting plan type",e.target.planType),this.selectedCard.selectMerchOffer(e.target.selectedOffer)}handleQuantityChange(e){this.selectedTabPanel&&(this.selectedCard.quantitySelect.defaultValue=e.detail.option,this.requestUpdate())}get whatsIncludedLink(){return this.querySelector("merch-card .merch-whats-included")}get whatsIncluded(){return this.querySelector('[slot="merch-whats-included"]')}setOfferSelectOnPanel(e){e.setAttribute("variant","subscription-options"),this.subscriptionPanel.offerSelect?.remove(),this.subscriptionPanel.appendChild(e)}handleStorageChange(e){let t=e.detail.offerSelect;t&&this.setOfferSelectOnPanel(t)}get preselectedCardId(){let e=f()["select-cards"]?.split(",").reduce((t,n)=>{let i=decodeURIComponent(n.trim().toLowerCase());return i&&t.push(i),t},[])||[];if(e.length&&this.selectedTab===a)return e[0];if(e.length>1&&this.selectedTab===l)return e[1];if(e.length>2&&this.selectedTab===c)return e[2]}get cardToBePreselected(){return this.selectedTabPanel?.querySelector("slot").assignedElements().find(e=>{let t=e.querySelector(".heading-xs")?.textContent.trim().toLowerCase()||"";return this.preselectedCardId&&t.includes(this.preselectedCardId)})}selectCard(e,t=!1){let n=this.selectedTabPanel,i=n?.card;(t||!i)&&(i&&(i.selected=void 0),i=this.cardToBePreselected||e,i.selected=!0,n?n.card=i:this.selectSingleCard(i)),i.focus(),this.subscriptionPanel.quantitySelect?.remove();let o=i.quantitySelect?.cloneNode(!0);o&&this.subscriptionPanel.appendChild(o);let E=i.offerSelect.cloneNode(!0);this.setOfferSelectOnPanel(E)}handleWhatsIncludedClick(e){e.preventDefault(),this.whatsIncluded?.classList.toggle("hidden")}async processCards(){let e=[...this.querySelectorAll("merch-card")];e.forEach((t,n)=>{let{customerSegment:i,marketSegment:o}=t.offerSelect;i==="INDIVIDUAL"?o==="COM"?t.setAttribute("slot","individuals"):o==="EDU"&&t.setAttribute("slot","education"):i==="TEAM"&&t.setAttribute("slot","business"),t.addEventListener("click",()=>this.selectCard(t,!0))}),this.ready=!0,this.requestUpdate(),await this.updateComplete,await this.tabElement?.updateComplete,this.selectCard(e.length===1?e[0]:this.firstCardInSelectedTab,!0)}merchTwpReady(){this.querySelector("merch-card merch-offer-select:not([plan-type])")||this.processCards()}get cards(){return this.querySelectorAll("merch-card[slot]")}get cciCards(){return this.querySelectorAll('merch-card[slot="individuals"]')}get cctCards(){return this.querySelectorAll('merch-card[slot="business"]')}get cceCards(){return this.querySelectorAll('merch-card[slot="education"]')}get subscriptionPanel(){return this.querySelector("merch-subscription-panel")}get tabElement(){return this.shadowRoot.querySelector("sp-tabs")}};window.customElements.define(S,m);export{m as MerchTwpD2P};
//# sourceMappingURL=merch-twp-d2p.js.map
