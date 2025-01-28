var _=Object.defineProperty;var i=(o,e,t)=>e in o?_(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var n=(o,e,t)=>(i(o,typeof e!="symbol"?e+"":e,t),t),m=(o,e,t)=>{if(!e.has(o))throw TypeError("Cannot "+t)};var E=(o,e,t)=>(m(o,e,"read from private field"),t?t.call(o):e.get(o)),a=(o,e,t)=>{if(e.has(o))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(o):e.set(o,t)};import{LitElement as d,css as l,html as A}from"../lit-all.min.js";var p="merch-stock:change";var s=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};var h="(max-width: 767px)";var r,c=class extends d{constructor(){super();a(this,r,new s(this,h));this.checked=!1}handleChange(t){this.checked=t.target.checked,this.dispatchEvent(new CustomEvent(p,{detail:{checked:t.target.checked,planType:this.planType},bubbles:!0}))}connectedCallback(){this.style.setProperty("--mod-checkbox-font-size","12px"),super.connectedCallback(),this.updateComplete.then(()=>{this.querySelectorAll('[is="inline-price"]').forEach(async t=>{await t.onceSettled(),t.parentElement.setAttribute("data-plan-type",t.value[0].planType)})})}render(){if(this.planType&&!E(this,r).matches)return A`
            <sp-checkbox
                size="s"
                @change=${this.handleChange}
                ?checked=${this.checked}
            >
                <slot></slot>
            </sp-checkbox>
        `}get osi(){if(this.checked)return this.querySelector(`div[data-plan-type="${this.planType}"] [is="inline-price"]`)?.value?.[0].offerSelectorIds[0]}};r=new WeakMap,n(c,"styles",[l`
            ::slotted(div) {
                display: none;
            }

            :host(:not([plan-type])) {
                display: none;
            }

            :host([plan-type='ABM']) ::slotted([data-plan-type='ABM']),
            :host([plan-type='M2M']) ::slotted([data-plan-type='M2M']),
            :host([plan-type='PUF']) ::slotted([data-plan-type='PUF']) {
                display: block;
            }

            sp-checkbox {
                margin: 0;
                font-size: 12px;
                line-height: 15px;
            }
        `]),n(c,"properties",{checked:{type:Boolean,attribute:"checked",reflect:!0},planType:{type:String,attribute:"plan-type",reflect:!0}});window.customElements.define("merch-stock",c);export{c as MerchStock};
