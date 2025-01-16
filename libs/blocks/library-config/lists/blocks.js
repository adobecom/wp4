import { createTag } from '../../../utils/utils.js';
import createCopy, { isMatching } from '../library-utils.js';
import { getMetadata } from '../../section-metadata/section-metadata.js';

const LIBRARY_METADATA = 'library-metadata';
const LIBRARY_CONTAINER_START = 'library-container-start';
const LIBRARY_CONTAINER_END = 'library-container-end';
const BLOCK_SPACING = '<br>';
// Block types:
const CONTAINER_START_BLOCK = 0;
const CONTAINER_END_BLOCK = 1;
const CONTAINER_INSIDE_BLOCK = 2;
const CONTAINER_OUTSIDE_BLOCK = 3;
const CONTAINER_OUTSIDE_AUTO_BLOCK = 4;

function getPreviousElement(container) {
  const firstBlock = container.elements?.[0];
  const previousElement = firstBlock?.previousElementSibling;
  if (!previousElement) return null;
  if (previousElement.classList.contains('library-container-start')) {
    return previousElement.previousElementSibling;
  }
  return previousElement;
}

function getAuthorName(container) {
  const previousElement = getPreviousElement(container);
  if (!previousElement) return null;
  if (['H2', 'H3'].includes(previousElement.nodeName)) {
    return previousElement.textContent;
  }
  return null;
}

function getBlockName(block) {
  const classes = block.className.split(' ');
  const name = classes.shift();
  return classes.length > 0 ? `${name} (${classes.join(', ')})` : name;
}

function getContainerName(container) {
  const firstBlock = container.elements?.[0];
  return getAuthorName(container) || getBlockName(firstBlock);
}

export function getTable(block, returnDom = false) {
  const name = getBlockName(block);
  const rows = [...block.children];
  const maxCols = rows.reduce((cols, row) => (
    row.children.length > cols ? row.children.length : cols), 0);
  const table = document.createElement('table');
  table.setAttribute('border', 1);
  table.setAttribute('style', 'width: 100%');
  const headerRow = document.createElement('tr');
  headerRow.append(createTag('th', { colspan: maxCols }, name));
  table.append(headerRow);
  rows.forEach((row) => {
    const tr = document.createElement('tr');
    [...row.children].forEach((col) => {
      const td = document.createElement('td');
      td.setAttribute('style', `width: ${100 / row.children.length}%`);
      if (row.children.length < maxCols) {
        td.setAttribute('colspan', maxCols);
      }
      td.innerHTML = col.innerHTML;
      tr.append(td);
    });
    table.append(tr);
  });
  if (returnDom) return table;
  return table.outerHTML;
}

export function handleLinks(element, path) {
  if (!element || !path) return;
  try {
    const url = new URL(path);
    element.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href.startsWith('/')) {
        a.setAttribute('href', `${url.origin}${href}`);
      }
    });
  } catch (e) {
    // leave links as is
  }
}

export function decorateImages(element, path) {
  if (!element || !path) return;
  try {
    const url = new URL(path);
    element.querySelectorAll('img').forEach((img) => {
      const srcSplit = img.src.split('/');
      const mediaPath = srcSplit.pop();
      img.src = `${url.origin}/${mediaPath}`;
      const { width, height } = img;
      const ratio = width > 200 ? 200 / width : 1;
      img.width = width * ratio;
      img.height = height * ratio;
    });
  } catch (e) {
    // leave images as is
  }
}

export function getHtml(container, path) {
  if (!container || !path) return '';
  return container.elements.reduce((acc, element) => {
    decorateImages(element, path);
    handleLinks(element, path);

    if (element.className === 'mock-metadata') {
      element.className = 'metadata';
    }

    const isBlock = element.nodeName === 'DIV' && element.className;
    const content = isBlock ? getTable(element) : element.outerHTML;
    return `${acc}${content}`;
  }, '');
}

export function getSearchTags(container) {
  if (!container || !container.elements) return '';
  const containerName = getContainerName(container);
  if (container[LIBRARY_METADATA]) {
    const libraryMetadata = getMetadata(container[LIBRARY_METADATA]);
    return libraryMetadata?.searchtags?.text
      ? `${libraryMetadata?.searchtags?.text} ${containerName}`
      : containerName;
  }
  return containerName;
}

function getBlockType(subSection, withinContainer) {
  if (subSection.className === LIBRARY_CONTAINER_START) return CONTAINER_START_BLOCK;
  if (subSection.className === LIBRARY_CONTAINER_END) return CONTAINER_END_BLOCK;
  if (withinContainer) return CONTAINER_INSIDE_BLOCK;
  if (subSection.nodeName === 'DIV' && subSection.className) return CONTAINER_OUTSIDE_BLOCK;
  return CONTAINER_OUTSIDE_AUTO_BLOCK;
}

export function getContainers(doc) {
  /* A page describing blocks is assumed to have the following representation
  (e.g. the page at /docs/library/blocks/carousel.plain.html):
  <body>
    <div>
      <p>Single block container</p>
      <h2>...</h2>
      <div class="block1">
      <div class="block2">
      <div class="library-metadata">
    </div>
    <div>
      <h2>...</h2>
      <p>Multiple block container</p>
      <div class="library-container-start"></div>
      <p>...</p>
      <div class="block3"></div>
    </div>
    ...
    <div>
      <h2>...</h2>
      <p>...</p>
      <div class="block4"></div>
      <div class="library-container-end"></div>
      <div class="library-metadata">
      ...
    </div>
    ...
  </body>

  The page html is parsed into sections (div children of body) and
  sub-sections (children of section).
  Parsing the above html results in the following container array:
  [{
      elements: [<div class="block1">],
    }, {
      elements: [<div class="block2">],
      library-metadata: <div class="library-metadata">
    }, {
      elements: [<p>, <div class="block3">, <p>---</p>, ...,<h2>, <p>, <div class="block4">],
      library-metadata: <div class="library-metadata">
    },
    ...
  ]
   */
  if (!doc || !doc.body) return [];
  const sections = doc.body.children;
  if (sections.length === 0) return [];
  const containers = [];
  const sectionBreak = doc.createElement('p');
  sectionBreak.textContent = '---';
  let container = { elements: [] };
  let withinContainer = false;
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const subSections = section.children;
    // eslint-disable-next-line no-continue
    if (subSections.length === 0) continue;
    for (let j = 0; j < subSections.length; j += 1) {
      const subSection = subSections[j];
      const nextSubSection = subSections[j + 1];
      const type = getBlockType(subSection, withinContainer);
      switch (type) {
        case CONTAINER_START_BLOCK:
          withinContainer = true;
          break;
        case CONTAINER_END_BLOCK:
          if (nextSubSection && nextSubSection.className === LIBRARY_METADATA) {
            container[LIBRARY_METADATA] = nextSubSection;
            j += 1;
          }
          containers.push(container);
          container = { elements: [] };
          withinContainer = false;
          break;
        case CONTAINER_INSIDE_BLOCK:
          container.elements.push(subSection);
          break;
        case CONTAINER_OUTSIDE_BLOCK:
          // single block container
          container.elements.push(subSection);
          if (nextSubSection && nextSubSection.className === LIBRARY_METADATA) {
            container[LIBRARY_METADATA] = nextSubSection;
            j += 1;
          }
          containers.push(container);
          container = { elements: [] };
          break;
        default:
          break;
      }
    }
    // when the container has multiple elements: add a section break after each section
    if (withinContainer) {
      container.elements.push(sectionBreak);
    }
  }
  return containers;
}

export default async function loadBlocks(blocks, list, query, type) {
  list.textContent = '';
  blocks.forEach(async (block) => {
    const titleText = createTag('p', { class: 'item-title' }, block.name);
    const title = createTag('li', { class: 'block-group' }, titleText);
    if (query) {
      title.classList.add('is-hidden');
    }
    const previewButton = createTag('button', { class: 'preview-group' }, 'Preview');
    title.append(previewButton);
    list.append(title);

    const blockList = createTag('ul', { class: 'block-group-list' });
    list.append(blockList);

    title.addEventListener('click', () => {
      title.classList.toggle('is-open');
    });

    previewButton.addEventListener('click', (e) => {
      e.stopPropagation();
      window.open(block.path, '_blockpreview');
    });

    const resp = await fetch(`${block.path}.plain.html`);
    if (!resp.ok) return;

    const html = await resp.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const containers = getContainers(doc);
    let matchingContainerFound = false;

    containers.forEach((container) => {
      const item = document.createElement('li');
      const name = document.createElement('p');
      name.textContent = getContainerName(container);
      const copy = document.createElement('button');
      copy.id = `${getContainerName(container)}-block-copy`;
      copy.addEventListener('click', (e) => {
        const containerHtml = getHtml(container, block.path);
        e.target.classList.add('copied');
        setTimeout(() => { e.target.classList.remove('copied'); }, 3000);
        const blob = new Blob([`${BLOCK_SPACING}${containerHtml}${BLOCK_SPACING}`], { type: 'text/html' });
        createCopy(blob);
      });
      item.append(name, copy);

      if (query) {
        if (isMatching(container, query, type)) {
          matchingContainerFound = true;
        } else {
          item.classList.add('is-hidden');
        }
      }

      blockList.append(item);
    });
    if (query && matchingContainerFound) {
      title.classList.remove('is-hidden');
      title.classList.add('is-open');
    }
  });
}
