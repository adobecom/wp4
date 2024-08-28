/* eslint-disable */
/* Generated by Milo */

var f=Object.defineProperty;var g=Object.getOwnPropertyDescriptor;var b=Object.getOwnPropertyNames;var E=Object.prototype.hasOwnProperty;var S=(r,e)=>{for(var n in e)f(r,n,{get:e[n],enumerable:!0})},h=(r,e,n,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of b(e))!E.call(r,s)&&s!==n&&f(r,s,{get:()=>e[s],enumerable:!(t=g(e,s))||t.enumerable});return r},m=(r,e,n)=>(h(r,e,"default"),n&&h(n,e,"default"));var o={};S(o,{ElementSizes:()=>D,SizedMixin:()=>N,SpectrumElement:()=>l,SpectrumMixin:()=>z});import{LitElement as k}from"/libs/deps/lit-all.min.js";var x="0.46.0";var p=new Set,A=()=>{let r=document.documentElement.dir==="rtl"?document.documentElement.dir:"ltr";p.forEach(e=>{e.setAttribute("dir",r)})},I=new MutationObserver(A);I.observe(document.documentElement,{attributes:!0,attributeFilter:["dir"]});var w=r=>typeof r.startManagingContentDirection<"u"||r.tagName==="SP-THEME";function z(r){class e extends r{get isLTR(){return this.dir==="ltr"}hasVisibleFocusInTree(){let t=((s=document)=>{var c;let i=s.activeElement;for(;i!=null&&i.shadowRoot&&i.shadowRoot.activeElement;)i=i.shadowRoot.activeElement;let u=i?[i]:[];for(;i;){let a=i.assignedSlot||i.parentElement||((c=i.getRootNode())==null?void 0:c.host);a&&u.push(a),i=a}return u})(this.getRootNode())[0];if(!t)return!1;try{return t.matches(":focus-visible")||t.matches(".focus-visible")}catch{return t.matches(".focus-visible")}}connectedCallback(){if(!this.hasAttribute("dir")){let t=this.assignedSlot||this.parentNode;for(;t!==document.documentElement&&!w(t);)t=t.assignedSlot||t.parentNode||t.host;if(this.dir=t.dir==="rtl"?t.dir:this.dir||"ltr",t===document.documentElement)p.add(this);else{let{localName:s}=t;s.search("-")>-1&&!customElements.get(s)?customElements.whenDefined(s).then(()=>{t.startManagingContentDirection(this)}):t.startManagingContentDirection(this)}this._dirParent=t}super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this._dirParent&&(this._dirParent===document.documentElement?p.delete(this):this._dirParent.stopManagingContentDirection(this),this.removeAttribute("dir"))}}return e}var l=class extends z(k){};l.VERSION=x;import{property as y}from"/libs/deps/lit-all.min.js";var C=Object.defineProperty,_=Object.getOwnPropertyDescriptor,M=(r,e,n,t)=>{for(var s=t>1?void 0:t?_(e,n):e,c=r.length-1,i;c>=0;c--)(i=r[c])&&(s=(t?i(e,n,s):i(s))||s);return t&&s&&C(e,n,s),s},D={xxs:"xxs",xs:"xs",s:"s",m:"m",l:"l",xl:"xl",xxl:"xxl"};function N(r,{validSizes:e=["s","m","l","xl"],noDefaultSize:n,defaultSize:t="m"}={}){class s extends r{constructor(){super(...arguments),this._size=t}get size(){return this._size||t}set size(i){let u=n?null:t,a=i&&i.toLocaleLowerCase(),d=e.includes(a)?a:u;if(d&&this.setAttribute("size",d),this._size===d)return;let v=this._size;this._size=d,this.requestUpdate("size",v)}update(i){!this.hasAttribute("size")&&!n&&this.setAttribute("size",this.size),super.update(i)}}return M([y({type:String})],s.prototype,"size",1),s}m(o,H);import*as H from"/libs/deps/lit-all.min.js";var P=o.css`
    .spectrum-UIIcon-Asterisk75{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-75)}.spectrum-UIIcon-Asterisk100{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-100)}.spectrum-UIIcon-Asterisk200{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-200)}.spectrum-UIIcon-Asterisk300{--spectrum-icon-size:var(--spectrum-asterisk-icon-size-300)}
`,G=P;export{G as default};
