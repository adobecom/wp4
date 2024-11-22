import{html as k,css as H,LitElement as P}from"/libs/deps/lit-all.min.js";var r=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};import{css as A}from"/libs/deps/lit-all.min.js";var c=A`
    h2 {
        font-size: 11px;
        font-style: normal;
        font-weight: 500;
        height: 32px;
        letter-spacing: 0.06em;
        padding: 0 12px;
        line-height: 32px;
        color: #747474;
    }
`;import{html as R,LitElement as N}from"/libs/deps/lit-all.min.js";function d(s,e){let t;return function(){let o=this,i=arguments;clearTimeout(t),t=setTimeout(()=>s.apply(o,i),e)}}var x="merch-search:change";var v="merch-sidenav:select";var g="hashchange";function n(s=window.location.hash){let e=[],t=s.replace(/^#/,"").split("&");for(let o of t){let[i,l=""]=o.split("=");i&&e.push([i,decodeURIComponent(l.replace(/\+/g," "))])}return Object.fromEntries(e)}function a(s,e){if(s.deeplink){let t={};t[s.deeplink]=e,L(t)}}function L(s){let e=new URLSearchParams(window.location.hash.slice(1));Object.entries(s).forEach(([i,l])=>{l?e.set(i,l):e.delete(i)}),e.sort();let t=e.toString();if(t===window.location.hash)return;let o=window.scrollY||document.documentElement.scrollTop;window.location.hash=t,window.scrollTo(0,o)}function b(s){let e=()=>{if(window.location.hash&&!window.location.hash.includes("="))return;let t=n(window.location.hash);s(t)};return e(),window.addEventListener(g,e),()=>{window.removeEventListener(g,e)}}var p=class extends N{static properties={deeplink:{type:String}};get search(){return this.querySelector("sp-search")}constructor(){super(),this.handleInput=()=>{a(this,this.search.value),this.search.value&&this.dispatchEvent(new CustomEvent(x,{bubbles:!0,composed:!0,detail:{type:"search",value:this.search.value}}))},this.handleInputDebounced=d(this.handleInput.bind(this))}connectedCallback(){super.connectedCallback(),this.search&&(this.search.addEventListener("input",this.handleInputDebounced),this.search.addEventListener("submit",this.handleInputSubmit),this.updateComplete.then(()=>{this.setStateFromURL()}),this.startDeeplink())}disconnectedCallback(){super.disconnectedCallback(),this.search.removeEventListener("input",this.handleInputDebounced),this.search.removeEventListener("submit",this.handleInputSubmit),this.stopDeeplink?.()}setStateFromURL(){let t=n()[this.deeplink];t&&(this.search.value=t)}startDeeplink(){this.stopDeeplink=b(({search:e})=>{this.search.value=e??""})}handleInputSubmit(e){e.preventDefault()}render(){return R`<slot></slot>`}};customElements.define("merch-search",p);import{html as C,LitElement as D,css as M}from"/libs/deps/lit-all.min.js";var m=class extends D{static properties={sidenavListTitle:{type:String},label:{type:String},deeplink:{type:String,attribute:"deeplink"},selectedText:{type:String,reflect:!0,attribute:"selected-text"},selectedValue:{type:String,reflect:!0,attribute:"selected-value"}};static styles=[M`
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
        `,c];constructor(){super(),this.handleClickDebounced=d(this.handleClick.bind(this))}selectElement(e,t=!0){e.parentNode.tagName==="SP-SIDENAV-ITEM"&&this.selectElement(e.parentNode,!1),e.firstElementChild?.tagName==="SP-SIDENAV-ITEM"&&(e.expanded=!0),t&&(this.selectedElement=e,this.selectedText=e.label,this.selectedValue=e.value,setTimeout(()=>{e.selected=!0},1),this.dispatchEvent(new CustomEvent(v,{bubbles:!0,composed:!0,detail:{type:"sidenav",value:this.selectedValue,elt:this.selectedElement}})))}setStateFromURL(){let t=n()[this.deeplink]??"all";if(t){let o=this.querySelector(`sp-sidenav-item[value="${t}"]`);if(!o)return;this.updateComplete.then(()=>{this.selectElement(o)})}}handleClick({target:e}){let{value:t,parentNode:o}=e;this.selectElement(e),o&&o.tagName==="SP-SIDENAV"&&(a(this,t),e.selected=!0,o.querySelectorAll("sp-sidenav-item[expanded],sp-sidenav-item[selected]").forEach(i=>{i.value!==t&&(i.expanded=!1,i.selected=!1)}))}selectionChanged({target:{value:e,parentNode:t}}){this.selectElement(this.querySelector(`sp-sidenav-item[value="${e}"]`)),a(this,e)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleClickDebounced),this.updateComplete.then(()=>{this.setStateFromURL()})}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleClickDebounced)}render(){return C`<div
            aria-label="${this.label}"
            @change="${e=>this.selectionChanged(e)}"
        >
            ${this.sidenavListTitle?C`<h2>${this.sidenavListTitle}</h2>`:""}
            <slot></slot>
        </div>`}};customElements.define("merch-sidenav-list",m);import{html as V,LitElement as O,css as I}from"/libs/deps/lit-all.min.js";var u=class extends O{static properties={sidenavCheckboxTitle:{type:String},label:{type:String},deeplink:{type:String},selectedValues:{type:Array,reflect:!0},value:{type:String}};static styles=I`
        :host {
            display: block;
            contain: content;
            border-top: 1px solid var(--color-gray-200);
            padding: 12px;
        }
        h3 {
            font-size: 14px;
            font-style: normal;
            font-weight: 700;
            height: 32px;
            letter-spacing: 0px;
            padding: 0px;
            line-height: 18.2px;
            color: var(--color-gray-600);
            margin: 0px;
        }
        .checkbox-group {
            display: flex;
            flex-direction: column;
        }
    `;setStateFromURL(){this.selectedValues=[];let{types:e}=n();e&&(this.selectedValues=e.split(","),this.selectedValues.forEach(t=>{let o=this.querySelector(`sp-checkbox[name=${t}]`);o&&(o.checked=!0)}))}selectionChanged(e){let{target:t}=e,o=t.getAttribute("name");if(o){let i=this.selectedValues.indexOf(o);t.checked&&i===-1?this.selectedValues.push(o):!t.checked&&i>=0&&this.selectedValues.splice(i,1)}a(this,this.selectedValues.join(","))}connectedCallback(){super.connectedCallback(),this.updateComplete.then(async()=>{this.setStateFromURL()})}render(){return V`<div aria-label="${this.label}">
            <h3>${this.sidenavCheckboxTitle}</h3>
            <div
                @change="${e=>this.selectionChanged(e)}"
                class="checkbox-group"
            >
                <slot></slot>
            </div>
        </div>`}};customElements.define("merch-sidenav-checkbox-group",u);var y="(max-width: 700px)";var S="(max-width: 1199px)";var _=/iP(ad|hone|od)/.test(window?.navigator?.platform)||window?.navigator?.platform==="MacIntel"&&window.navigator.maxTouchPoints>1,E=!1,h,T=s=>{s&&(_?(document.body.style.position="fixed",s.ontouchmove=e=>{e.targetTouches.length===1&&e.stopPropagation()},E||(document.addEventListener("touchmove",e=>e.preventDefault()),E=!0)):(h=document.body.style.overflow,document.body.style.overflow="hidden"))},w=s=>{s&&(_?(s.ontouchstart=null,s.ontouchmove=null,document.body.style.position="",document.removeEventListener("touchmove",e=>e.preventDefault()),E=!1):h!==void 0&&(document.body.style.overflow=h,h=void 0))};var f=class extends P{static properties={sidenavTitle:{type:String},closeText:{type:String,attribute:"close-text"},modal:{type:Boolean,attribute:"modal",reflect:!0}};#e;constructor(){super(),this.modal=!1}static styles=[H`
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
        `,c];mobileDevice=new r(this,y);mobileAndTablet=new r(this,S);get filters(){return this.querySelector("merch-sidenav-list")}get search(){return this.querySelector("merch-search")}render(){return this.mobileAndTablet.matches?this.asDialog:this.asAside}get asDialog(){if(this.modal)return k`
            <sp-theme theme="spectrum" color="light" scale="medium">
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
                                >${this.closeText||"Close"}</sp-link
                            >
                        </div>
                    </div>
                </sp-dialog-base>
            </sp-theme>
        `}get asAside(){return k`<sp-theme theme="spectrum" color="light" scale="medium"
            ><h2>${this.sidenavTitle}</h2>
            <slot></slot
        ></sp-theme>`}get dialog(){return this.shadowRoot.querySelector("sp-dialog-base")}closeModal(e){e.preventDefault(),this.dialog?.close(),document.body.classList.remove("merch-modal")}openModal(){this.updateComplete.then(async()=>{T(this.dialog),document.body.classList.add("merch-modal");let e={trigger:this.#e,notImmediatelyClosable:!0,type:"auto"},t=await window.__merch__spectrum_Overlay.open(this.dialog,e);t.addEventListener("close",()=>{this.modal=!1,document.body.classList.remove("merch-modal"),w(this.dialog)}),this.shadowRoot.querySelector("sp-theme").append(t)})}updated(){this.modal&&this.openModal()}showModal({target:e}){this.#e=e,this.modal=!0}};customElements.define("merch-sidenav",f);export{f as MerchSideNav};
//# sourceMappingURL=merch-sidenav.js.map
