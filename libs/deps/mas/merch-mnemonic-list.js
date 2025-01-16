var o=Object.defineProperty;var r=(e,t,s)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var n=(e,t,s)=>r(e,typeof t!="symbol"?t+"":t,s);import{html as l,css as p,LitElement as a}from"../lit-all.min.js";var i=class extends a{constructor(){super()}render(){return l`
            <slot name="icon"></slot>
            <slot name="description">${this.description}</slot>
        `}};n(i,"styles",p`
        :host {
            display: flex;
            flex-direction: row;
            gap: 5px;
            margin-bottom: 5px;
            margin-right: 10px;
            align-items: flex-end;
        }

        ::slotted([slot='icon']) {
            display: flex;
            justify-content: center;
            align-items: center;
            height: max-content;
        }

        ::slotted([slot='description']) {
            font-size: 14px;
            line-height: 21px;
            margin: 0;
        }

        :host .hidden {
            display: none;
        }
    `),n(i,"properties",{description:{type:String,attribute:!0}});customElements.define("merch-mnemonic-list",i);export{i as MerchMnemonicList};
