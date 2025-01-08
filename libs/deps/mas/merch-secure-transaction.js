var a=Object.defineProperty;var c=(e,t,o)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var n=(e,t,o)=>c(e,typeof t!="symbol"?t+"":t,o);import{LitElement as m,html as p}from"../lit-all.min.js";import{css as x}from"../lit-all.min.js";var l=x`
    #label {
        align-items: center;
        cursor: pointer;
        display: inline-flex;
        gap: var(--consonant-merch-spacing-xxxs);
        white-space: nowrap;
        font-size: 12px;
        line-height: 15px;
    }

    #label.icon::before {
        background-position: center;
        background-size: contain;
        background: var(--secure-icon) no-repeat;
        content: '';
        display: inline-block;
        height: 1em;
        width: 1em;
    }
`;var d="merch-secure-transaction",i=class extends m{constructor(){super(),this.labelText="",this.showIcon=!0,this.tooltipText=""}render(){let{labelText:t,showIcon:o,tooltipText:s}=this,r=p`
            <div class="${o?"icon":""}" id="label" slot="trigger">
                ${t}
            </div>
        `;return s?p`
            <overlay-trigger placement="top-start" offset="4">
                ${r}
                <sp-tooltip id="tooltip" slot="hover-content" delayed
                    >${s}</sp-tooltip
                >
            </overlay-trigger>
        `:r}};n(i,"properties",{labelText:{attribute:"label",type:String},showIcon:{attribute:"icon",type:Boolean},tooltipText:{attribute:"tooltip",type:String}}),n(i,"styles",[l]);window.customElements.define(d,i);export{i as default};
