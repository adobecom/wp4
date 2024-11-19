import { EVENT_AEM_LOAD, EVENT_AEM_ERROR } from './constants.js';

const sheet = new CSSStyleSheet();
sheet.replaceSync(':host { display: contents; }');

const baseUrl =
    document.querySelector('meta[name="aem-base-url"]')?.content ??
    'https://odin.adobe.com';

const ATTRIBUTE_FRAGMENT = 'fragment';
const ATTRIBUTE_AUTHOR = 'author';
const ATTRIBUTE_IMS = 'ims';

/**
 * Get fragment by ID
 * @param {string} baseUrl the aem base url
 * @param {string} id fragment id
 * @param {string} author should the fragment be fetched from author endpoint
 * @param {Object} headers optional request headers
 * @returns {Promise<Object>} the raw fragment item
 */
export async function getFragmentById(baseUrl, id, author, headers) {
    const endpoint = author
        ? `${baseUrl}/adobe/sites/cf/fragments/${id}`
        : `https://qa-odin.adobe.com//adobe/sites/fragments/${id}`;
    const response = await fetch(endpoint, {
        cache: 'default',
        credentials: 'omit',
        headers,
    });
    if (!response.ok) {
        throw new Error(
            `Failed to get fragment: ${response.status} ${response.statusText}`,
        );
    }
    return response.json();
}

let headers;

class FragmentCache {
    #fragmentCache = new Map();

    clear() {
        this.#fragmentCache.clear();
    }

    add(...fragments) {
        fragments.forEach((fragment) => {
            const { id: fragmentId } = fragment;
            if (fragmentId) {
                this.#fragmentCache.set(fragmentId, fragment);
            }
        });
    }

    has(fragmentId) {
        return this.#fragmentCache.has(fragmentId);
    }

    get(fragmentId) {
        return this.#fragmentCache.get(fragmentId);
    }

    remove(fragmentId) {
        this.#fragmentCache.delete(fragmentId);
    }
}
const cache = new FragmentCache();

/**
 * Custom element representing an aem fragment.
 *
 * @attr {string} title - fragment title, optional.
 * @attr {string} fragment - fragment id.
 */
export class AemFragment extends HTMLElement {
    cache = cache;

    #rawData;
    #data;

    /**
     * @type {string} fragment id
     */
    #fragmentId;

    /**
     * @type {boolean} whether an access token should be used via IMS.
     */
    #ims = false;

    /**
     * Internal promise to track the readiness of the web-component to render.
     */
    #readyPromise;

    #author = false;

    static get observedAttributes() {
        return [ATTRIBUTE_FRAGMENT, ATTRIBUTE_AUTHOR];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.adoptedStyleSheets = [sheet];

        const ims = this.getAttribute(ATTRIBUTE_IMS);
        if (['', true, 'true'].includes(ims)) {
            this.#ims = true;
            if (!headers) {
                headers = {
                    Authorization: `Bearer ${window.adobeid?.authorize?.()}`,
                };
            }
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === ATTRIBUTE_FRAGMENT) {
            this.#fragmentId = newValue;
            this.refresh(false);
        }

        if (name === ATTRIBUTE_AUTHOR) {
            this.#author = ['', 'true'].includes(newValue);
        }
    }

    connectedCallback() {
        if (!this.#fragmentId) {
            this.#fail('Missing fragment id');
            return;
        }
    }

    async refresh(flushCache = true) {
        if (this.#readyPromise) {
            const ready = await Promise.race([
                this.#readyPromise,
                Promise.resolve(false),
            ]);
            if (!ready) return; // already fetching data
        }
        if (flushCache) {
            cache.remove(this.#fragmentId);
        }
        this.#readyPromise = this.fetchData()
            .then(() => {
                this.dispatchEvent(
                    new CustomEvent(EVENT_AEM_LOAD, {
                        detail: this.data,
                        bubbles: true,
                        composed: true,
                    }),
                );
                return true;
            })
            .catch((e) => {
                /* c8 ignore next 3 */
                this.#fail('Network error: failed to load fragment');
                this.#readyPromise = null;
                return false;
            });
        this.#readyPromise;
    }

    #fail(error) {
        this.classList.add('error');
        this.dispatchEvent(
            new CustomEvent(EVENT_AEM_ERROR, {
                detail: error,
                bubbles: true,
                composed: true,
            }),
        );
    }

    async fetchData() {
        this.#rawData = null;
        this.#data = null;
        let fragment = cache.get(this.#fragmentId);
        if (!fragment) {
            fragment = await getFragmentById(
                baseUrl,
                this.#fragmentId,
                this.#author,
                this.#ims ? headers : undefined,
            );
            cache.add(fragment);
        }
        this.#rawData = fragment;
    }

    get updateComplete() {
        return (
            this.#readyPromise ??
            Promise.reject(new Error('AEM fragment cannot be loaded'))
        );
    }

    get data() {
        if (this.#data) return this.#data;
        if (this.#author) {
            this.#transformAuthorData();
        } else {
            this.#transformPublishData();
        }
        return this.#data;
    }

    #transformAuthorData() {
        const { id, tags, fields } = this.#rawData;
        this.#data = fields.reduce(
            (acc, { name, multiple, values }) => {
                acc.fields[name] = multiple ? values : values[0];
                return acc;
            },
            { id, tags, fields: {} },
        );
    }

    #transformPublishData() {
        const { id, tags, fields } = this.#rawData;
        this.#data = Object.entries(fields).reduce(
            (acc, [key, value]) => {
                acc.fields[key] = value?.mimeType ? value.value : (value ?? '');
                return acc;
            },
            { id, tags, fields: {} },
        );
    }
}

customElements.define('aem-fragment', AemFragment);
