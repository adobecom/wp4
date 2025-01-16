import { createTag, SLD } from '../../utils/utils.js';

const LIBRARY_PATH = '/docs/library/library.json';

async function loadBlocks({ content, list, query, type }) {
  const { default: blocks } = await import('./lists/blocks.js');
  blocks(content, list, query, type);
}

async function loadTemplates({ content, list, query, type }) {
  const { default: templates } = await import('./lists/templates.js');
  templates(content, list, query, type);
}

async function loadPlaceholders(content, list) {
  const { default: placeholders } = await import('./lists/placeholders.js');
  placeholders(content, list);
}

async function loadIcons(content, list) {
  const { default: icons } = await import('./lists/icons.js');
  icons(content, list);
}

async function loadAssets(content, list) {
  const { default: assets } = await import('./lists/assets.js');
  assets(content, list);
}

async function loadPersonalization(content, list) {
  const { default: personalization } = await import('./lists/personalization.js');
  personalization(content, list);
}

function addSearch({ content, list, type }) {
  const skLibrary = list.closest('.sk-library');
  const header = skLibrary.querySelector('.sk-library-header');
  let search = skLibrary.querySelector('.sk-library-search');
  if (!search) {
    search = createTag('div', { class: 'sk-library-search' });
    const searchInput = createTag('input', { class: 'sk-library-search-input', placeholder: 'Search...' });
    const clear = createTag('div', { class: 'sk-library-search-clear is-hidden' });

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if (query === '') {
        clear.classList.add('is-hidden');
      } else {
        clear.classList.remove('is-hidden');
      }

      switch (type) {
        case 'blocks':
          loadBlocks({ content, list, query, type });
          break;
        case 'templates':
          loadTemplates({ content, list, query, type });
          break;
        default:
      }
    });
    clear.addEventListener('click', (e) => {
      e.target.classList.add('is-hidden');
      e.target.closest('.sk-library-search').querySelector('.sk-library-search-input').value = '';
      const query = e.target.value;

      switch (type) {
        case 'blocks':
          loadBlocks({ content, list, query, type });
          break;
        case 'templates':
          loadTemplates({ content, list, query, type });
          break;
        default:
      }
    });
    search.append(searchInput);
    search.append(clear);
    header.append(search);
  } else {
    search.classList.remove('is-hidden');
  }
}

async function loadList(type, content, list) {
  list.innerHTML = '';
  const query = list.closest('.sk-library').querySelector('.sk-library-search-input')?.value;
  switch (type) {
    case 'blocks':
      addSearch({ content, list, type });
      loadBlocks({ content, list, query, type });
      break;
    case 'templates':
      addSearch({ content, list, type });
      loadTemplates({ content, list, query, type });
      break;
    case 'placeholders':
      loadPlaceholders(content, list);
      break;
    case 'icons':
      loadIcons(content, list);
      break;
    case 'assets':
      loadAssets(content, list);
      break;
    case 'MEP_personalization':
      loadPersonalization(content, list);
      break;
    default:
      await import('../../utils/lana.js');
      window.lana?.log(`Library type not supported: ${type}`, { clientId: 'milo' });
  }
}

async function fetchLibrary(domain, suppliedLibrary) {
  const library = suppliedLibrary || `${domain}${LIBRARY_PATH}`;
  try {
    const resp = await fetch(library);
    if (!resp.ok) return null;
    return resp.json();
  } catch {
    return null;
  }
}

async function getSuppliedLibrary() {
  const { searchParams } = new URL(window.location.href);
  const repo = searchParams.get('repo');
  const owner = searchParams.get('owner');
  const library = searchParams.get('library');
  if (!repo || !owner) return null;
  return fetchLibrary(`https://main--${repo}--${owner}.${SLD}.live`, library);
}

async function fetchAssetsData(path) {
  if (!path) return null;
  const resp = await fetch(path);
  if (!resp.ok) return null;

  const json = await resp.json();
  const assetHrefs = json.entities.map((entity) => entity.links[0].href);
  return assetHrefs;
}

async function combineLibraries(base, supplied) {
  const url = new URL(window.location.href);

  const assetsPath = url.searchParams.get('assets');

  const library = {
    assets: await fetchAssetsData(assetsPath),
    blocks: base.blocks.data,
    templates: base.templates?.data,
    icons: base.icons?.data,
    MEP_personalization: base.personalization?.data,
    placeholders: base.placeholders?.data,
  };

  if (supplied) {
    if (supplied.blocks.data.length > 0) {
      library.blocks.push(...supplied.blocks.data);
    }

    if (supplied.placeholders.data.length > 0) {
      library.placeholders = supplied.placeholders.data;
    }

    if (supplied.templates?.data.length > 0) {
      library.templates.push(...supplied.templates.data);
    }
  }

  return library;
}

function createList(libraries) {
  const container = createTag('div', { class: 'con-container' });

  const libraryList = createTag('ul', { class: 'sk-library-list' });
  container.append(libraryList);

  Object.keys(libraries).forEach((type) => {
    if (!libraries[type] || libraries[type].length === 0) return;

    const item = createTag('li', { class: 'content-type' }, type.replace('_', ' '));
    libraryList.append(item);

    const list = document.createElement('ul');
    list.classList.add('con-type-list', `con-${type}-list`);
    container.append(list);

    item.addEventListener('click', (e) => {
      const skLibrary = e.target.closest('.sk-library');
      skLibrary.querySelector('.sk-library-title-text').textContent = type.replace('_', ' ');
      libraryList.classList.add('inset');
      list.classList.add('inset');
      skLibrary.classList.add('allow-back');
      loadList(type, libraries[type], list);
    });
  });

  return container;
}

function createHeader() {
  const nav = createTag('button', { class: 'sk-library-logo' }, 'Franklin Library');
  const title = createTag('div', { class: 'sk-library-title' }, nav);
  title.append(createTag('p', { class: 'sk-library-title-text' }, 'Pick a library'));
  const header = createTag('div', { class: 'sk-library-header' }, title);

  nav.addEventListener('click', (e) => {
    const skLibrary = e.target.closest('.sk-library');
    skLibrary.querySelector('.sk-library-search')?.classList.add('is-hidden');
    skLibrary.querySelector('.sk-library-title-text').textContent = 'Pick a library';
    const insetEls = skLibrary.querySelectorAll('.inset');
    insetEls.forEach((el) => {
      el.classList.remove('inset');
    });
    skLibrary.classList.remove('allow-back');

    // Remove library search if it's been added
    const search = skLibrary.querySelector('.sk-library-search');
    if (search) search.remove();
  });
  return header;
}

function detectContext() {
  if (window.self === window.top) {
    document.body.classList.add('in-page');
  }
}

export default async function init(el) {
  el.querySelector('div').remove();
  detectContext();

  // Get the data
  const base = await fetchLibrary(window.location.origin);
  const supplied = await getSuppliedLibrary();
  const libraries = await combineLibraries(base, supplied);

  // Create the UI
  const skLibrary = createTag('div', { class: 'sk-library' });

  const header = createHeader();
  skLibrary.append(header);

  const list = createList(libraries);
  skLibrary.append(list);

  el.append(skLibrary);
}
