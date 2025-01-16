var N=Object.defineProperty;var y=(s,e,t)=>e in s?N(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var E=(s,e,t)=>y(s,typeof e!="symbol"?e+"":e,t);import{html as l,LitElement as O}from"../lit-all.min.js";var f=class{constructor(e,t){this.key=Symbol("match-media-key"),this.matches=!1,this.host=e,this.host.addController(this),this.media=window.matchMedia(t),this.matches=this.media.matches,this.onChange=this.onChange.bind(this),e.addController(this)}hostConnected(){var e;(e=this.media)==null||e.addEventListener("change",this.onChange)}hostDisconnected(){var e;(e=this.media)==null||e.removeEventListener("change",this.onChange)}onChange(e){this.matches!==e.matches&&(this.matches=e.matches,this.host.requestUpdate(this.key,!this.matches))}};var x="hashchange";function L(s=window.location.hash){let e=[],t=s.replace(/^#/,"").split("&");for(let o of t){let[n,i=""]=o.split("=");n&&e.push([n,decodeURIComponent(i.replace(/\+/g," "))])}return Object.fromEntries(e)}function d(s){let e=new URLSearchParams(window.location.hash.slice(1));Object.entries(s).forEach(([n,i])=>{i?e.set(n,i):e.delete(n)}),e.sort();let t=e.toString();if(t===window.location.hash)return;let o=window.scrollY||document.documentElement.scrollTop;window.location.hash=t,window.scrollTo(0,o)}function T(s){let e=()=>{if(window.location.hash&&!window.location.hash.includes("="))return;let t=L(window.location.hash);s(t)};return e(),window.addEventListener(x,e),()=>{window.removeEventListener(x,e)}}var g="merch-card-collection:sort",S="merch-card-collection:showmore";var A="(max-width: 1199px)",R="(min-width: 768px)",C="(min-width: 1200px)";import{css as M,unsafeCSS as w}from"../lit-all.min.js";var b=M`
    #header,
    #resultText,
    #footer {
        grid-column: 1 / -1;
        justify-self: stretch;
        color: var(--merch-color-grey-80);
    }

    sp-theme {
        display: contents;
    }

    sp-action-menu {
      z-index: 1;
    }

    #header {
        order: -2;
        display: grid;
        justify-items: top;
        grid-template-columns: auto max-content;
        grid-template-rows: auto;
        row-gap: var(--consonant-merch-spacing-m);
        align-self: baseline;
    }

    #resultText {
        min-height: 32px;
    }

    merch-search {
        display: contents;
    }

    #searchBar {
        grid-column: 1 / -1;
        width: 100%;
        max-width: 302px;
    }

    #filtersButton {
        width: 92px;
        margin-inline-end: var(--consonant-merch-spacing-xxs);
    }

    #sortButton {
        justify-self: end;
    }

    sp-action-button {
        align-self: baseline;
    }

    sp-menu sp-action-button {
        min-width: 140px;
    }

    sp-menu {
        min-width: 180px;
    }

    #footer {
        order: 1000;
    }

    /* tablets */
    @media screen and ${w(R)} {
        #header {
            grid-template-columns: 1fr fit-content(100%) fit-content(100%);
        }

        #searchBar {
            grid-column: span 1;
        }

        #filtersButton {
            grid-column: span 1;
        }

        #sortButton {
            grid-column: span 1;
        }
    }

    /* Laptop */
    @media screen and ${w(C)} {
        #resultText {
            grid-column: span 2;
            order: -3;
        }

        #header {
            grid-column: 3 / -1;
            display: flex;
            justify-content: end;
        }
    }
`;var u=(s,e)=>s.querySelector(`[slot="${e}"]`)?.textContent?.trim();var D="merch-card-collection",a={alphabetical:"alphabetical",authored:"authored"},v={filters:["noResultText","resultText","resultsText"],mobile:["noSearchResultsMobileText","searchResultMobileText","searchResultsMobileText"],desktop:["noSearchResultsText","searchResultText","searchResultsText"]},P=(s,e={})=>{s.querySelectorAll("span[data-placeholder]").forEach(t=>{let{placeholder:o}=t.dataset;t.innerText=e[o]??""})},B=(s,{filter:e})=>s.filter(t=>t.filters.hasOwnProperty(e)),H=(s,{types:e})=>e?(e=e.split(","),s.filter(t=>e.some(o=>t.types.includes(o)))):s,V=s=>s.sort((e,t)=>(e.title??"").localeCompare(t.title??"","en",{sensitivity:"base"})),I=(s,{filter:e})=>s.sort((t,o)=>o.filters[e]?.order==null||isNaN(o.filters[e]?.order)?-1:t.filters[e]?.order==null||isNaN(t.filters[e]?.order)?1:t.filters[e].order-o.filters[e].order),k=(s,{search:e})=>e?.length?(e=e.toLowerCase(),s.filter(t=>(t.title??"").toLowerCase().includes(e))):s,p=class extends O{constructor(){super();E(this,"mobileAndTablet",new f(this,A));this.filter="all",this.hasMore=!1,this.resultCount=void 0,this.displayResult=!1}render(){return l`${this.header}
            <slot></slot>
            ${this.footer}`}updated(t){if(!this.querySelector("merch-card"))return;let o=window.scrollY||document.documentElement.scrollTop,n=[...this.children].filter(r=>r.tagName==="MERCH-CARD");if(n.length===0)return;t.has("singleApp")&&this.singleApp&&n.forEach(r=>{r.updateFilters(r.name===this.singleApp)});let i=this.sort===a.alphabetical?V:I,h=[B,H,k,i].reduce((r,c)=>c(r,this),n).map((r,c)=>[r,c]);if(this.resultCount=h.length,this.page&&this.limit){let r=this.page*this.limit;this.hasMore=h.length>r,h=h.filter(([,c])=>c<r)}let m=new Map(h);n.forEach(r=>{if(m.has(r)){let c=m.get(r);r.style.order=c,r.setAttribute("tabindex",c+1),r.size=r.filters[this.filter]?.size,r.style.removeProperty("display"),r.requestUpdate()}else r.style.display="none",r.size=void 0,r.style.removeProperty("order")}),window.scrollTo(0,o),this.updateComplete.then(()=>{let r=this.shadowRoot.getElementById("resultText")?.firstElementChild?.assignedElements?.()?.[0];r&&P(r,{resultCount:this.resultCount,searchTerm:this.search,filter:this.sidenav?.filters.selectedText})})}connectedCallback(){super.connectedCallback(),this.filtered?(this.filter=this.filtered,this.page=1):this.startDeeplink(),this.sidenav=document.querySelector("merch-sidenav")}disconnectedCallback(){super.disconnectedCallback(),this.stopDeeplink?.()}get header(){if(!this.filtered)return l`<div id="header">
                <sp-theme  color="light" scale="medium">
                    ${this.searchBar} ${this.filtersButton} ${this.sortButton}
                </sp-theme>
            </div>
            <div id="resultText" aria-live="polite">
                ${this.displayResult?l`<slot name="${this.resultTextSlotName}"></slot>`:""}
            </div>`}get footer(){if(!this.filtered)return l`<div id="footer">
            <sp-theme  color="light" scale="medium">
                ${this.showMoreButton}
            </sp-theme>
        </div>`}get resultTextSlotName(){return v[this.search?this.mobileAndTablet.matches?"mobile":"desktop":"filters"][Math.min(this.resultCount,2)]}get showMoreButton(){if(this.hasMore)return l`<sp-button
            variant="secondary"
            treatment="outline"
            style="order: 1000;"
            @click="${this.showMore}"
        >
            <slot name="showMoreText"></slot>
        </sp-button>`}get filtersButton(){return this.mobileAndTablet.matches?l`<sp-action-button
                  id="filtersButton"
                  variant="secondary"
                  treatment="outline"
                  @click="${this.openFilters}"
                  ><slot name="filtersText"></slot
              ></sp-action-button>`:""}get searchBar(){let t=u(this,"searchText");return this.mobileAndTablet.matches?l`<merch-search deeplink="search">
                  <sp-search
                      id="searchBar"
                      @submit="${this.searchSubmit}"
                      placeholder="${t}"
                  ></sp-search>
              </merch-search>`:""}get sortButton(){let t=u(this,"sortText"),o=u(this,"popularityText"),n=u(this,"alphabeticallyText");if(!(t&&o&&n))return;let i=this.sort===a.alphabetical;return l`
            <sp-action-menu
                id="sortButton"
                size="m"
                @change="${this.sortChanged}"
                selects="single"
                value="${i?a.alphabetical:a.authored}"
            >
                <span slot="label-only"
                    >${t}:
                    ${i?n:o}</span
                >
                <sp-menu-item value="${a.authored}"
                    >${o}</sp-menu-item
                >
                <sp-menu-item value="${a.alphabetical}"
                    >${n}</sp-menu-item
                >
            </sp-action-menu>
        `}sortChanged(t){t.target.value===a.authored?d({sort:void 0}):d({sort:t.target.value}),this.dispatchEvent(new CustomEvent(g,{bubbles:!0,composed:!0,detail:{value:t.target.value}}))}async showMore(){this.dispatchEvent(new CustomEvent(S,{bubbles:!0,composed:!0}));let t=this.page+1;d({page:t}),this.page=t,await this.updateComplete}startDeeplink(){this.stopDeeplink=T(({category:t,filter:o,types:n,sort:i,search:_,single_app:h,page:m})=>{o=o||t,!this.filtered&&o&&o!==this.filter&&setTimeout(()=>{d({page:void 0}),this.page=1},1),this.filtered||(this.filter=o??this.filter),this.types=n??"",this.search=_??"",this.singleApp=h,this.sort=i,this.page=Number(m)||1})}openFilters(t){this.sidenav?.showModal(t)}};E(p,"properties",{filter:{type:String,attribute:"filter",reflect:!0},filtered:{type:String,attribute:"filtered"},search:{type:String,attribute:"search",reflect:!0},sort:{type:String,attribute:"sort",default:a.authored,reflect:!0},types:{type:String,attribute:"types",reflect:!0},limit:{type:Number,attribute:"limit"},page:{type:Number,attribute:"page",reflect:!0},singleApp:{type:String,attribute:"single-app",reflect:!0},hasMore:{type:Boolean},displayResult:{type:Boolean,attribute:"display-result"},resultCount:{type:Number},sidenav:{type:Object}}),E(p,"styles",[b]);p.SortOrder=a;customElements.define(D,p);export{p as MerchCardCollection,P as updateLiterals};
