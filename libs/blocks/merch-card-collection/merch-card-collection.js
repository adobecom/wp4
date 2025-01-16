import '../merch/merch.js';
import { overrideUrlOrigin } from '../../utils/helpers.js';
import {
  createTag, decorateLinks, getConfig, loadBlock, loadStyle, localizeLink,
} from '../../utils/utils.js';
import { replaceText } from '../../features/placeholders.js';

const DIGITS_ONLY = /^\/?\d+\/?$/;
const FILTER_REGEX = /(filter|\/filter\/)/;
const SEARCH_REGEX = /search|\/search\//;
export const OVERRIDE_PATHS = 'overrides';

const LITERAL_SLOTS = [
  'searchText',
  'filtersText',
  'sortText',
  'popularityText',
  'alphabeticallyText',
  'noResultText',
  'resultText',
  'resultsText',
  'searchResultText',
  'searchResultsText',
  'searchResultMobileText',
  'searchResultsMobileText',
  'noSearchResultsText',
  'noSearchResultsMobileText',
  'showMoreText',
];

// allows improve TBT by returning control to the main thread.
// eslint-disable-next-line no-promise-executor-return
const makePause = async (timeout = 0) => new Promise((resolve) => setTimeout(resolve, timeout));
const BLOCK_NAME = 'merch-card-collection';
const PROD_INDEX = 'query-index-cards.json';
const PREVIEW_INDEX = 'query-index-cards-preview.json';

const fail = (el, err = '') => {
  window.lana?.log(`Failed to initialize merch cards: ${err}`);
  el.innerHTML = '';
  return el;
};

/** Parse and prepare cards */
async function getCardsRoot(config, html) {
  const cards = `<div>${html}</div>`;
  const fragment = document.createRange().createContextualFragment(
    await replaceText(cards, config),
  );
  const cardsRoot = fragment.firstElementChild;
  const allBlockEls = [...cardsRoot.querySelectorAll(':scope > div')];
  const batchSize = 12;
  for (let i = 0; i < allBlockEls.length; i += batchSize) {
    const blockEls = allBlockEls.slice(i, i + batchSize);
    await Promise.all(blockEls.map((cardEl) => Promise.all(
      decorateLinks(cardEl).map(loadBlock),
    ).then(() => loadBlock(cardEl))));
    await makePause();
  }
  return cardsRoot;
}

const fetchOverrideCard = (action, config) => new Promise((resolve, reject) => {
  fetch(`${localizeLink(overrideUrlOrigin(action?.content))}.plain.html`).then((res) => {
    if (res.ok) {
      res.text().then((cardContent) => {
        const response = { path: action.content, cardContent: /^<div>(.*)<\/div>$/.exec(cardContent.replaceAll('\n', ''))[1] };
        if (config?.mep?.preview) response.manifestId = action.manifestId;
        resolve(response);
      });
    } else {
      reject(res.statusText
      /* c8 ignore next */
         || res.status);
    }
  }).catch((error) => {
    reject(error);
  });
});

async function overrideCards(root, overridePromises, config) {
  let overrideString = '';
  try {
    if (overridePromises?.length > 0) {
      // Wait for all override cards to be fetched
      const overrideData = await Promise.all(overridePromises);

      if (overrideData?.length > 0) {
        const overrideRoot = await getCardsRoot(config, overrideData?.map(({ cardContent }) => cardContent).join('\n'));
        const overrideMap = {};
        overrideRoot.querySelectorAll('merch-card').forEach((card) => { if (card.name) { overrideMap[card.name] = card; } });
        root.querySelectorAll('merch-card').forEach((card) => {
          if (card.name && overrideMap[card.name]) {
            card.replaceWith(overrideMap[card.name]);
          }
        });
        if (config.mep.preview) {
          overrideString = overrideData.map(({ manifestId, path }) => `${manifestId}:${path}`).join(',');
        }
      }
    }
  } catch (error) {
    /* c8 ignore next */
    window?.lana?.log('Failed to override cards', error);
  }
  return overrideString;
}

/**
 * Removes merch cards from the DOM if they are not meant to be displayed in this merch cards block.
 * @param {*} merchCardCollection merch-card-collection element
 */
export function filterMerchCards(merchCardCollection, filtered) {
  [...merchCardCollection.children].filter((child) => child.tagName === 'MERCH-CARD')
    .forEach((card) => {
      if (!Object.prototype.hasOwnProperty.call(card.filters, filtered)) {
        card.remove();
      }
    });
}

/** parse card preferences for each category filter */
export function parsePreferences(elements) {
  return [...elements].map((el) => {
    let size;
    if (el?.firstElementChild?.tagName === 'STRONG') {
      size = 'wide';
      if (el.firstElementChild.firstElementChild?.tagName === 'U') {
        size = 'super-wide';
      }
    }
    return [el.textContent?.trim(), size];
  });
}

/** Retrieve cards from query-index  */
async function fetchCardsData(config, endpointElement, type, el) {
  let cardsData;
  el.querySelector(`a[href*="${PROD_INDEX}"]`)?.remove();
  el.querySelector(`a[href*="${PREVIEW_INDEX}"]`)?.remove();
  let queryIndexCardPath = localizeLink(endpointElement.getAttribute('href'), config);
  if (/\.json$/.test(queryIndexCardPath)) {
    queryIndexCardPath = `${queryIndexCardPath}?sheet=${type}`;
  }
  const res = await fetch(queryIndexCardPath);
  if (res.ok) {
    cardsData = await res.json();
  } else {
    throw new Error(res.statusText
      /* c8 ignore next */
      || res.status);
  }
  return cardsData;
}

async function initMerchCards(filtered, preferences, cardsRoot) {
  if (filtered) {
    filterMerchCards(cardsRoot, filtered);
  }
  // re-order cards, update card filters
  [...cardsRoot.children].filter((card) => card.tagName === 'MERCH-CARD').forEach((merchCard) => {
    merchCard.style.display = 'none';
    const filters = { ...merchCard.filters };
    Object.keys(filters).forEach((key) => {
      const preference = preferences[key];
      if (!preference) return;
      preference
        .forEach(([sortKey, cardSize], index) => {
          if (merchCard.name === sortKey || merchCard.title === sortKey) {
            filters[key] = { order: index + 1, size: cardSize };
          }
        });
    });
    merchCard.filters = filters;
  });
  return cardsRoot;
}

export default async function init(el) {
  if (el.classList.length < 2) {
    return fail(el, 'Missing collection type');
  }
  const config = getConfig();
  const type = el.classList[1];

  const usePreviewIndex = config.env.name === 'stage' && !window.location.host.includes('.live');
  const endpointElement = el.querySelector(`a[href*="${usePreviewIndex ? PREVIEW_INDEX : PROD_INDEX}"]`)
                            ?? el.querySelector(`a[href*="${PROD_INDEX}"]`);
  if (!endpointElement) {
    return fail(el, 'No query-index endpoint provided');
  }

  let cardsData;
  let deps;
  let base;
  let mep;
  let merchStyles;
  let merchCardStyles;
  const merchCardCollectionDep = import(
    '../../deps/mas/merch-card-collection.js'
  );
  try {
    const cardsDataPromise = fetchCardsData(config, endpointElement, type, el);
    deps = [
      merchCardCollectionDep,
      import('../merch-card/merch-card.js'),
      import('../../deps/mas/merch-card.js'),
    ];

    ({ base, mep } = config);
    merchStyles = new Promise((resolve) => {
      loadStyle(`${base}/blocks/merch/merch.css`, resolve);
    });
    merchCardStyles = new Promise((resolve) => {
      loadStyle(`${base}/blocks/merch-card/merch-card.css`, resolve);
    });

    cardsData = await cardsDataPromise;
  } catch (error) {
    return fail(el, error);
  }

  const cardsRootPromise = getCardsRoot(config, cardsData.data.map(({ cardContent }) => cardContent).join('\n'));

  const attributes = { filter: 'all', class: `${el.className}` };
  const settingsEl = el.firstElementChild?.firstElementChild;

  const filtered = settingsEl.querySelector('p > strong') !== null;

  if (!el.matches('[class*="-merch-card"]') && !el.closest('main > .section[class*="-merch-card"]')) {
    el.closest('main > .section').classList.add('four-merch-cards', type);
  }

  deps = !filtered
    ? [
      ...deps,
      import(`${base}/features/spectrum-web-components/dist/theme.js`),
      import(`${base}/features/spectrum-web-components/dist/button.js`),
      import(`${base}/features/spectrum-web-components/dist/action-button.js`),
      import(`${base}/features/spectrum-web-components/dist/action-menu.js`),
      import(`${base}/features/spectrum-web-components/dist/search.js`),
      import(`${base}/features/spectrum-web-components/dist/menu.js`),
      import(`${base}/features/spectrum-web-components/dist/overlay.js`),
      import(`${base}/features/spectrum-web-components/dist/tray.js`),
    ] : [];

  const preferences = {};

  if (settingsEl) {
    const [filter, limit = 24] = settingsEl
      .textContent.split(',').map((s) => s.trim());

    settingsEl.parentElement.remove();

    if (filtered) {
      attributes.filtered = filter;
      preferences[filter] = parsePreferences(el.querySelectorAll('p'));
    } else {
      if (filter) {
        attributes.filter = filter;
      }
      [...el.children].forEach((filterElement) => {
        const filterName = filterElement.firstElementChild.textContent?.trim();
        const elements = [...filterElement.lastElementChild.querySelectorAll('p')];
        preferences[filterName] = parsePreferences(elements);
      });
    }

    if (limit) {
      attributes.limit = limit;
    }
  }

  // in case of search literals being fragments, data is marked with a data-path attribute,
  // and shallower
  const literalsEl = el.lastElementChild?.firstElementChild?.getAttribute('data-path') !== null
    ? el.lastElementChild : el.lastElementChild?.firstElementChild;
  // parse literals
  const literalSlots = [];
  if (literalsEl && FILTER_REGEX.test(literalsEl.querySelector('u')?.innerText)) {
    literalsEl.querySelectorAll('u').forEach((u) => {
      const text = u.innerText.trim();
      if (DIGITS_ONLY.test(text)) {
        u.outerHTML = '<span data-placeholder="resultCount"></span>';
      } else if (SEARCH_REGEX.test(text)) {
        u.outerHTML = '<span data-placeholder="searchTerm"></span>';
      } else if (FILTER_REGEX.test(text)) {
        u.outerHTML = '<span data-placeholder="filter"></span>';
      }
    });
    let index = 0;
    while (literalsEl?.firstElementChild) {
      const literalEl = literalsEl?.firstElementChild;
      let slot;
      if (literalEl.tagName === 'P') {
        slot = literalEl;
      } else if (literalEl.tagName === 'HR') {
        slot = createTag('div');
        while (literalEl.nextElementSibling && literalEl.nextElementSibling?.tagName !== 'HR') {
          slot.appendChild(literalEl.nextElementSibling);
        }
        literalEl.nextElementSibling?.remove?.();
      }
      literalEl.remove();
      if (slot) {
        slot.setAttribute('slot', LITERAL_SLOTS[index]);
        index += 1;
      }
      literalSlots.push(slot);
    }
  }

  await merchCardCollectionDep;
  performance.mark('merch-card-collection-render:start');
  const merchCardCollection = createTag('merch-card-collection', attributes);
  el.replaceWith(merchCardCollection);
  if (literalSlots.length > 0) {
    merchCardCollection.append(...literalSlots);
  } else if (!merchCardCollection.filtered) {
    merchCardCollection.filtered = 'all';
  }

  const cardsRoot = await cardsRootPromise;
  const overridePromises = mep?.inBlock?.[BLOCK_NAME]?.commands.map(
    (action) => fetchOverrideCard(action, config),
  );
  const overrides = await overrideCards(cardsRoot, overridePromises, config);
  await initMerchCards(attributes.filtered, preferences, cardsRoot);
  await Promise.all([merchStyles, merchCardStyles, ...deps]);

  merchCardCollection.append(...cardsRoot.children);

  merchCardCollection.displayResult = true;
  if (config?.mep?.preview && overrides) {
    merchCardCollection.dataset.overrides = overrides;
  }

  await merchCardCollection.updateComplete;
  performance.measure(
    'merch-card-collection-render',
    'merch-card-collection-render:start',
  );

  return merchCardCollection;
}
