/* eslint-disable */
/* Generated by Milo */

import{html as p,SizedMixin as k,SpectrumElement as b}from"/libs/features/spectrum-web-components/dist/base.js";import{property as g}from"/libs/features/spectrum-web-components/dist/base.js";import{css as l}from"/libs/features/spectrum-web-components/dist/base.js";var u=l`
    :host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium);--spectrum-divider-background-color:var(--spectrum-divider-background-color-medium);--spectrum-divider-background-color-small:var(--spectrum-gray-300);--spectrum-divider-background-color-medium:var(--spectrum-gray-300);--spectrum-divider-background-color-large:var(--spectrum-gray-800);--spectrum-divider-background-color-small-static-white:var(--spectrum-transparent-white-300);--spectrum-divider-background-color-medium-static-white:var(--spectrum-transparent-white-300);--spectrum-divider-background-color-large-static-white:var(--spectrum-transparent-white-800);--spectrum-divider-background-color-small-static-black:var(--spectrum-transparent-black-300);--spectrum-divider-background-color-medium-static-black:var(--spectrum-transparent-black-300);--spectrum-divider-background-color-large-static-black:var(--spectrum-transparent-black-800)}:host([size=s]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-small);--spectrum-divider-background-color:var(--spectrum-divider-background-color-small)}:host{--spectrum-divider-thickness:var(--spectrum-divider-thickness-medium);--spectrum-divider-background-color:var(--spectrum-divider-background-color-medium)}:host([size=l]){--spectrum-divider-thickness:var(--spectrum-divider-thickness-large);--spectrum-divider-background-color:var(--spectrum-divider-background-color-large)}@media (forced-colors:active){:host,:host([size=l]),:host,:host([size=s]){--spectrum-divider-background-color:CanvasText;--spectrum-divider-background-color-small-static-white:CanvasText;--spectrum-divider-background-color-medium-static-white:CanvasText;--spectrum-divider-background-color-large-static-white:CanvasText;--spectrum-divider-background-color-small-static-black:CanvasText;--spectrum-divider-background-color-medium-static-black:CanvasText;--spectrum-divider-background-color-large-static-black:CanvasText}}:host{block-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));inline-size:100%;border:none;border-width:var(--mod-divider-thickness,var(--spectrum-divider-thickness));border-radius:var(--mod-divider-thickness,var(--spectrum-divider-thickness));background-color:var(--mod-divider-background-color,var(--spectrum-divider-background-color));overflow:visible}:host([static=white][size=s]){--spectrum-divider-background-color:var(--mod-divider-background-color-small-static-white,var(--spectrum-divider-background-color-small-static-white))}:host([static=white]){--spectrum-divider-background-color:var(--mod-divider-background-color-medium-static-white,var(--spectrum-divider-background-color-medium-static-white))}:host([static=white][size=l]){--spectrum-divider-background-color:var(--mod-divider-background-color-large-static-white,var(--spectrum-divider-background-color-large-static-white))}:host([static=black][size=s]){--spectrum-divider-background-color:var(--mod-divider-background-color-small-static-black,var(--spectrum-divider-background-color-small-static-black))}:host([static=black]){--spectrum-divider-background-color:var(--mod-divider-background-color-medium-static-black,var(--spectrum-divider-background-color-medium-static-black))}:host([static=black][size=l]){--spectrum-divider-background-color:var(--mod-divider-background-color-large-static-black,var(--spectrum-divider-background-color-large-static-black))}:host([vertical]){inline-size:var(--mod-divider-thickness,var(--spectrum-divider-thickness));margin-block:var(--mod-divider-vertical-margin);block-size:var(--mod-divider-vertical-height,100%);align-self:var(--mod-divider-vertical-align)}:host{display:block}hr{border:none;margin:0}
`,o=u;var m=Object.defineProperty,v=Object.getOwnPropertyDescriptor,n=(c,r,a,t)=>{for(var e=t>1?void 0:t?v(r,a):r,d=c.length-1,s;d>=0;d--)(s=c[d])&&(e=(t?s(r,a,e):s(e))||e);return t&&e&&m(r,a,e),e},i=class extends k(b,{validSizes:["s","m","l"],noDefaultSize:!0}){constructor(){super(...arguments),this.vertical=!1}render(){return p``}firstUpdated(r){super.firstUpdated(r),this.setAttribute("role","separator")}updated(r){super.updated(r),r.has("vertical")&&(this.vertical?this.setAttribute("aria-orientation","vertical"):this.removeAttribute("aria-orientation"))}};i.styles=[o],n([g({type:Boolean,reflect:!0})],i.prototype,"vertical",2);import{defineElement as h}from"/libs/features/spectrum-web-components/dist/base.js";h("sp-divider",i);
