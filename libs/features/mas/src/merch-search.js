import { html, LitElement } from 'lit';
import { debounce } from './utils.js';
import { EVENT_MERCH_SEARCH_CHANGE } from './constants.js';
import {
    deeplink,
    pushStateFromComponent,
    parseState,
} from './deeplink.js';

export class MerchSearch extends LitElement {
    static properties = {
        deeplink: { type: String },
    };

    get search() {
        return this.querySelector(`sp-search`);
    }

    constructor() {
        super();

        this.handleInput = () => {
            pushStateFromComponent(this, this.search.value);
            if (this.search.value) {
                this.dispatchEvent(
                    new CustomEvent(EVENT_MERCH_SEARCH_CHANGE, {
                        bubbles: true,
                        composed: true,
                        detail: {
                            type: 'search',
                            value: this.search.value,
                        },
                    }),
                );
            }
        };
        this.handleInputDebounced = debounce(this.handleInput.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this.search) return;
        this.search.addEventListener('input', this.handleInputDebounced);
        this.search.addEventListener('submit', this.handleInputSubmit);
        this.updateComplete.then(() => {
            this.setStateFromURL();
        });
        this.startDeeplink();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.search.removeEventListener('input', this.handleInputDebounced);
        this.search.removeEventListener('submit', this.handleInputSubmit);
        this.stopDeeplink?.();
    }

    /*
     * set the state of the search based on the URL
     */
    setStateFromURL() {
        const state = parseState();
        const value = state[this.deeplink];
        if (value) {
            this.search.value = value;
        }
    }

    startDeeplink() {
        this.stopDeeplink = deeplink(({ search }) => {
            this.search.value = search ?? '';
        });
    }

    handleInputSubmit(event) {
        event.preventDefault();
    }

    render() {
        return html`<slot></slot>`;
    }
}

customElements.define('merch-search', MerchSearch);
