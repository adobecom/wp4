import {
  toFragment,
  isDesktop,
  setCurtainState,
  trigger,
  closeAllDropdowns,
  logErrorFor,
} from '../../utilities/utilities.js';
import { replaceKeyArray } from '../../../../features/placeholders.js';
import { getConfig } from '../../../../utils/utils.js';
import { debounce } from '../../../../utils/action.js';
import { getFedsPlaceholderConfig } from '../../../../utils/federated.js';

const CONFIG = {
  suggestions: {
    scope: 'adobecom',
    apiKey: 'adobedotcom2',
  },
  selectors: {
    hasResults: 'has-results',
    inputIsPopulated: 'feds-search-input--isPopulated',
  },
};

const { locale } = getConfig();
const [, country = 'US'] = locale.ietf.split('-');

class Search {
  constructor(config) {
    this.icon = config.icon;
    this.trigger = config.trigger;
    this.parent = this.trigger.closest('.feds-nav-wrapper');
    const observer = new MutationObserver(() => {
      this.clearSearchForm();
    });
    observer.observe(this.trigger, { attributeFilter: ['aria-expanded'] });
    logErrorFor(this.init.bind(this), 'Search init has failed', 'errorType=error,module=gnav-search');
  }

  async init() {
    await this.getLabels();
    this.decorate();
    this.addEventListeners();
    this.toggleDropdown();
  }

  async getLabels() {
    this.labels = {};
    [this.labels.search, this.labels.clearResults, this.labels.tryAdvancedSearch] = await replaceKeyArray(['search', 'clear-results', 'try-advanced-search'], getFedsPlaceholderConfig());
  }

  decorate() {
    this.input = toFragment`<input placeholder="${this.labels.search}" aria-label="${this.labels.search}" class="feds-search-input" autocomplete="off" aria-autocomplete="list" aria-controls="feds-search-results" daa-ll="search-results:standard search" />`;
    this.resultsList = toFragment`<ul class="feds-search-results" id="feds-search-results" role="region" daa-ll="search-results:suggested-search:click"></ul>`;
    this.clearButton = toFragment`<button tabindex="0" class="feds-search-clear" aria-label="${this.labels.clearResults}"></button>`;
    this.searchBar = toFragment`
      <aside class="feds-search-dropdown">
        <div class="feds-search-bar">
          <div class="feds-search-field">
            ${this.input}
            <div class="feds-search-icons">
              ${this.icon}
              ${this.clearButton}
            </div>
          </div>
          ${this.resultsList}
        </div>
      </aside>`;

    this.trigger.after(this.searchBar);
  }

  clearSearchForm() {
    this.input.value = '';
    this.onSearchInput();
  }

  addEventListeners() {
    // Toggle the dropdown when the trigger is clicked
    this.trigger.addEventListener('click', () => {
      this.toggleDropdown();
    });

    this.input.addEventListener('input', () => {
      this.onSearchInput();
    });

    this.input.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        // Pressing ESC when input has value resets the results
        if (this.input.value.length) {
          this.clearSearchForm();
        } else if (isDesktop.matches) {
          closeAllDropdowns();
          this.trigger.focus();
        }
      }

      if (e.code === 'Enter') {
        if (!this.query) return;
        window.location.href = Search.getHelpxLink(this.query);
      }
    });

    // If a search result is focused, return focus to input when ESC is pressed
    this.resultsList.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        this.input.focus();
      }
    });

    // Clicking the clear button resets the results
    this.clearButton.addEventListener('click', () => {
      this.clearSearchForm();
      this.input.focus();
    });

    // Switching between a mobile and a desktop view
    // should close the search dropdown
    isDesktop.addEventListener('change', () => {
      closeAllDropdowns();
    });
  }

  getSuggestions(query = this.query) {
    const { env } = getConfig();
    const subdomain = env === 'prod' ? 'adobesearch' : 'adobesearch-stage';
    const api = `https://${subdomain}.adobe.io/autocomplete/completions?q[locale]=${locale.ietf}&scope=${CONFIG.suggestions.scope}&q[text]=${encodeURIComponent(query)}`;

    return fetch(api, { headers: { 'x-api-key': CONFIG.suggestions.apiKey } })
      .then((data) => data.json())
      .catch(() => {
        // do nothing
      });
  }

  onSearchInput = debounce(() => {
    const query = this.getQuery();

    if (!query.length) {
      this.resultsList.replaceChildren();
      delete this.query;
      return;
    }

    // Avoid successive calls for the same input value
    if (query === this.query) {
      return;
    }

    this.query = query;

    this.getSuggestions()
      .then((data) => {
        const suggestions = data?.suggested_completions;

        if (!Array.isArray(suggestions)
          || !suggestions.length) {
          this.resultsList.replaceChildren(this.getNoResultsTemplate());
          if (this.parent instanceof HTMLElement) {
            this.parent.classList.remove(CONFIG.selectors.hasResults);
          }
          return;
        }

        this.resultsList.replaceChildren(this.getResultsTemplate(suggestions));
        if (this.parent instanceof HTMLElement) {
          this.parent.classList.add(CONFIG.selectors.hasResults);
        }
      })
      .catch(() => {
        this.resultsList.replaceChildren(this.getNoResultsTemplate());
        if (this.parent instanceof HTMLElement) {
          this.parent.classList.remove(CONFIG.selectors.hasResults);
        }
      });
  }, 150);

  getQuery() {
    const query = this.input.value.trim();

    if (!query.length) {
      this.input.classList.remove(CONFIG.selectors.inputIsPopulated);
      this.resultsList.replaceChildren();
      if (this.parent instanceof HTMLElement) {
        this.parent.classList.remove(CONFIG.selectors.hasResults);
      }
      return '';
    }

    this.input.classList.add(CONFIG.selectors.inputIsPopulated);

    return query;
  }

  getResultsTemplate(results) {
    const resultsTemplate = document.createDocumentFragment();

    // eslint-disable-next-line array-callback-return
    results.map((result) => {
      const resultLabel = result.name;

      if (!resultLabel.length) {
        return;
      }

      // A longest common substring match between the original prefix and suggestion must be made
      // for cases when special characters are used. Say the user searches for 'pho-',
      // then the prefix will be 'pho-', while the suggestion will be 'photoshop'.
      // The generated suggestion markup should look like `<b>pho</b>toshop`,
      // so we need to extract the part of the prefix that matches the current suggestion
      const matchPrefixToSuggestion = () => {
        let i = 0;
        const prefixLength = this.query.length;

        while (i < prefixLength && this.query[i].toLowerCase() === resultLabel[i].toLowerCase()) {
          i += 1;
        }

        return this.query.substring(0, i).trim();
      };

      // The matched prefix can't be cached to be used for all of the suggestions in the set
      // because there are edge cases when there are significant differences between suggestions.
      // For example, the query 'max 20' will yield the suggestions 'max 2016' and 'maximize',
      // thus the common part between the query and the suggestion differs:
      // * 'max 20' for the first suggestion
      // * 'max' for the second suggestion
      const matchedPrefix = matchPrefixToSuggestion();

      // Say the user searched for 'PhOtOsHoP' and the suggested result is 'Photoshop Trial';
      // We don't want the suggestion to be rendered as '<b>PhOtOsHoP</b> Trial',
      // rather '<b>Photoshop</b> Trial', like the original suggestion formatting.
      // First, define a capturing group Regexp;
      // in the example above this will be '/(PhOtOsHoP)/i'
      const prefixPattern = new RegExp(`(${matchedPrefix})`, 'i');
      let suggestionPrefix;
      // Remove the query from the suggestion and
      // save the matched prefix in its original formatting from the API
      const suggestionWithoutPrefix = resultLabel.replace(prefixPattern, (match) => {
        // Save the matched string (with the formatting suggested by the API) into a variable
        suggestionPrefix = match;
        // Remove the matched string
        return '';
      });

      const resultTemplate = toFragment`<li>
          <a href="${Search.getHelpxLink(resultLabel)}" class="feds-search-result" aria-label="${resultLabel}">
            <span>${suggestionPrefix}</span>${suggestionWithoutPrefix}
          </a>
        </li>`;

      resultsTemplate.appendChild(resultTemplate);
    });

    return resultsTemplate;
  }

  getNoResultsTemplate(query = this.query) {
    return toFragment`<li>
      <a href="${Search.getHelpxLink(query)}" class="feds-search-result"><span>${this.labels.tryAdvancedSearch}</span></a>
    </li>`;
  }

  focusInput() {
    if (isDesktop.matches) {
      this.input.focus();
    }
  }

  toggleDropdown() {
    if (!isDesktop.matches) return;

    const hasBeenOpened = trigger({ element: this.trigger });
    if (hasBeenOpened) {
      setCurtainState(true);
      this.focusInput();
    } else {
      this.clearSearchForm();
    }
  }

  static getHelpxLink(query) {
    return `https://helpx.adobe.com${locale.prefix}/globalsearch.html?q=${encodeURIComponent((query || '').trim())}&start_index=0&country=${country}`;
  }
}

export default Search;
