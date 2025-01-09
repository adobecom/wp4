/* eslint-disable no-plusplus */
import { createTag, MILO_EVENTS } from '../../utils/utils.js';
import { decorateButtons } from '../../utils/decorate.js';
import { debounce } from '../../utils/action.js';

const DESKTOP_SIZE = 900;
const MOBILE_SIZE = 768;
const tableHighlightLoadedEvent = new Event('milo:table:highlight:loaded');
let tableIndex = 0;
const isMobileLandscape = () => (window.matchMedia('(orientation: landscape)').matches && window.innerHeight <= MOBILE_SIZE);
function defineDeviceByScreenSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= DESKTOP_SIZE) {
    return 'DESKTOP';
  }
  if (screenWidth <= MOBILE_SIZE) {
    return 'MOBILE';
  }
  return 'TABLET';
}

export function isStickyHeader(el) {
  return el.classList.contains('sticky')
    || (el.classList.contains('sticky-desktop-up') && defineDeviceByScreenSize() === 'DESKTOP')
    || (el.classList.contains('sticky-tablet-up') && defineDeviceByScreenSize() !== 'MOBILE' && !isMobileLandscape());
}

function handleHeading(table, headingCols) {
  const isPriceBottom = table.classList.contains('pricing-bottom');
  headingCols.forEach((col, i) => {
    col.classList.add('col-heading');
    if (!col.innerHTML) return;

    const elements = col.children;
    if (!elements.length) {
      col.innerHTML = `<p class="tracking-header">${col.innerHTML}</p>`;
    } else {
      let textStartIndex = 0;
      const iconTile = elements[0]?.querySelector('img');
      if (iconTile) {
        textStartIndex += 1;
        if (!(table.classList.contains('merch'))) iconTile.closest('p').classList.add('header-product-tile');
      }
      elements[textStartIndex]?.classList.add('tracking-header');
      const pricingElem = elements[textStartIndex + 1];
      const bodyElem = elements[textStartIndex + 2];

      if (pricingElem) {
        pricingElem.classList.add('pricing');
      }
      if (bodyElem) {
        bodyElem.classList.add('body');
      }

      decorateButtons(col, 'button-l');
      const buttonsWrapper = createTag('div', { class: 'buttons-wrapper' });
      col.append(buttonsWrapper);
      const buttons = col.querySelectorAll('.con-button');

      buttons.forEach((btn) => {
        const btnWrapper = btn.closest('P');
        buttonsWrapper.append(btnWrapper);
      });

      const headingContent = createTag('div', { class: 'heading-content' });
      const headingButton = createTag('div', { class: 'heading-button' });

      [...elements].forEach((e) => {
        if (e.classList.contains('pricing') && isPriceBottom) headingButton.appendChild(e);
        else headingContent.appendChild(e);
      });

      headingButton.appendChild(buttonsWrapper);
      col.append(headingContent, headingButton);
    }

    const trackingHeader = col.querySelector('.tracking-header');
    const nodeToApplyRoleScope = trackingHeader ?? col;

    if (trackingHeader) {
      const trackingHeaderID = `t${tableIndex + 1}-c${i + 1}-header`;
      trackingHeader.setAttribute('id', trackingHeaderID);

      const headerBody = col.querySelector('.body:not(.action-area)');
      headerBody?.setAttribute('id', `${trackingHeaderID}-body`);

      const headerPricing = col.querySelector('.pricing');
      headerPricing?.setAttribute('id', `${trackingHeaderID}-pricing`);

      const describedBy = `${headerBody?.id ?? ''} ${headerPricing?.id ?? ''}`.trim();
      trackingHeader.setAttribute('aria-describedby', describedBy);

      col.removeAttribute('role');
    }

    nodeToApplyRoleScope.setAttribute('role', 'columnheader');
    nodeToApplyRoleScope.setAttribute('scope', 'col');
  });
}

function handleEqualHeight(table, tag) {
  const height = [];
  const element = table.querySelector(tag);
  const columns = [...element.children];
  columns.forEach(({ children }) => {
    [...children].forEach((row, i) => {
      row.style.height = 'auto';
      if (!height[i] || row.offsetHeight > height[i]) {
        height[i] = row.offsetHeight;
      }
    });
  });
  columns.forEach(({ children }) => {
    [...children].forEach((row, i) => {
      row.style.height = height[i] > 0 ? `${height[i]}px` : 'auto';
    });
  });
}

function handleAddOnContent(table) {
  const addOnKey = 'ADDON';
  const addOns = [...table.querySelectorAll('.section-row-title')]
    .filter((row) => row.innerText.toUpperCase().includes(addOnKey));
  if (!addOns.length) return;
  table.classList.add('has-addon');
  addOns.forEach((addOn) => {
    const addOnRow = addOn.parentElement;
    addOnRow.remove();
    const [position, order, style] = addOn.innerText.split('-')
      .filter((key) => key.toUpperCase() !== addOnKey).map((key) => key.toLowerCase());
    if (!position || !order) return;
    const dataIndex = 'data-col-index';
    [...table.querySelector('.row-heading').children].forEach((headCol) => {
      headCol.querySelector('.heading-content')?.classList.add('content');
      const colIndex = headCol.getAttribute(dataIndex);
      if (colIndex <= 1) return; // skip the key column
      const tagName = `${position}-${order}`;
      const column = [...addOnRow.children].find((el) => el.getAttribute(dataIndex) === colIndex);
      let content = column.childNodes;
      const icon = column.querySelector('.icon');
      if (style === 'label' && icon) {
        const text = [...content].filter((node) => !node.classList?.contains('icon'));
        content = [createTag('span', null, text), icon];
      }
      const tag = createTag('div', { class: tagName }, [...content].map((node) => node));
      if (style) tag.classList.add(`addon-${style}`);
      const el = headCol.querySelector(`.${position}`);
      el?.classList.add(`has-${tagName}`);
      el?.insertAdjacentElement(order === 'before' ? 'beforebegin' : 'afterend', tag);
    });
  });
  setTimeout(() => handleEqualHeight(table, '.row-heading'), 0);
  table.addEventListener('mas:resolved', debounce(() => { handleEqualHeight(table, '.row-heading'); }));
}

function handleHighlight(table) {
  const isHighlightTable = table.classList.contains('highlight');
  const firstRow = table.querySelector('.row-1');
  const firstRowCols = firstRow.querySelectorAll('.col');
  const secondRow = table.querySelector('.row-2');
  const secondRowCols = secondRow.querySelectorAll('.col');
  let headingCols = null;

  if (isHighlightTable) {
    firstRow.classList.add('row-highlight');
    secondRow.classList.add('row-heading');
    secondRowCols.forEach((col) => col.classList.add('col-heading'));
    headingCols = secondRowCols;

    firstRowCols.forEach((col, i) => {
      col.classList.add('col-highlight');
      if (col.innerText) {
        headingCols[i]?.classList.add('no-rounded');
      } else {
        col.classList.add('hidden');
      }
    });
  } else {
    headingCols = firstRowCols;
    firstRow.classList.add('row-heading');
  }

  handleHeading(table, headingCols);
  handleAddOnContent(table);
  table.dispatchEvent(tableHighlightLoadedEvent);
}

function handleExpand(e) {
  const sectionHead = e.closest('.row');
  let nextElement = sectionHead.nextElementSibling;
  const expanded = e.getAttribute('aria-expanded') === 'false';
  e.setAttribute('aria-expanded', expanded.toString());
  while (nextElement && !nextElement.classList.contains('divider')) {
    if (expanded) {
      sectionHead.classList.remove('section-head-collaped');
      nextElement.classList.remove('hidden');
    } else {
      sectionHead.classList.add('section-head-collaped');
      nextElement.classList.add('hidden');
    }
    nextElement = nextElement.nextElementSibling;
  }
}

function handleTitleText(cell) {
  if (cell.querySelector('.table-title-text')) return;
  const textSpan = createTag('span', { class: 'table-title-text' });
  while (cell.firstChild) textSpan.append(cell.firstChild);

  const iconTooltip = textSpan.querySelector('.icon-info, .icon-tooltip, .milo-tooltip');
  if (iconTooltip) cell.append(iconTooltip.closest('em') || iconTooltip);

  const firstIcon = textSpan.querySelector('.icon:first-child');
  let nodeToInsert = textSpan;

  if (firstIcon) {
    const titleRowSpan = createTag('span', { class: 'table-title-row' });
    titleRowSpan.append(firstIcon, textSpan);
    nodeToInsert = titleRowSpan;
  }

  cell.insertBefore(nodeToInsert, cell.firstChild);
}

/**
 * @param {*} sectionParams that is from init()
 * @returns {boolean expandSection} that is the only variable get updated from sectionParams
 */

function handleSection(sectionParams) {
  const {
    row, index, allRows, rowCols, isMerch, isCollapseTable, isHighlightTable,
  } = sectionParams;
  let { expandSection } = sectionParams;

  const previousRow = allRows[index - 1];
  const nextRow = allRows[index + 1];
  const nextRowCols = Array.from(nextRow?.children || []);

  if (row.querySelector('hr') && nextRow) {
    row.classList.add('divider');
    row.removeAttribute('role');
    nextRow.classList.add('section-head');
    const sectionHeadTitle = nextRowCols?.[0];

    if (isMerch && nextRowCols.length) {
      nextRowCols.forEach((merchCol) => {
        merchCol.classList.add('section-head-title');
        merchCol.setAttribute('role', 'rowheader');
      });
    } else {
      handleTitleText(sectionHeadTitle);
      sectionHeadTitle.classList.add('section-head-title');
      sectionHeadTitle.setAttribute('role', 'rowheader');
    }

    if (isCollapseTable) {
      const iconTag = createTag('span', { class: 'icon expand' });
      sectionHeadTitle.appendChild(iconTag);

      if (expandSection) {
        iconTag.setAttribute('aria-expanded', 'true');
        expandSection = false;
      } else {
        iconTag.setAttribute('aria-expanded', 'false');
        nextRow.classList.add('section-head-collaped');
        let nextElement = row.nextElementSibling;
        while (nextElement && !nextElement.classList.contains('divider')) {
          nextElement.classList.add('hidden');
          nextElement = nextElement.nextElementSibling;
        }
      }
    }
  } else if (previousRow?.querySelector('hr') && nextRow) {
    nextRow.classList.add('section-row');
    if (!isMerch) {
      const sectionRowTitle = nextRowCols?.[0];
      sectionRowTitle.classList.add('section-row-title');
      sectionRowTitle.setAttribute('role', 'rowheader');
      sectionRowTitle.setAttribute('scope', 'row');
    }
  } else if (!row.classList.contains('row-1') && (!isHighlightTable || !row.classList.contains('row-2'))) {
    row.classList.add('section-row');
    if (isMerch && !row.classList.contains('divider')) {
      rowCols.forEach((merchCol) => {
        merchCol.classList.add('col-merch');
        const children = Array.from(merchCol.children);
        const merchContent = createTag('div', { class: 'col-merch-content' });
        if (children.length) {
          children.forEach((child) => {
            if (!child.querySelector('.icon')) {
              merchContent.append(child);
            }
          });
          merchCol.insertBefore(merchContent, merchCol.firstChild);
        } else if (merchCol.innerText) {
          const pTag = createTag('p', { class: 'merch-col-text' }, merchCol.innerText);
          merchCol.innerText = '';
          merchContent.append(pTag);
          merchCol.append(merchContent);
        }
      });
    } else {
      const sectionRowTitle = rowCols[0];
      handleTitleText(sectionRowTitle);
      sectionRowTitle.classList.add('section-row-title');
      sectionRowTitle.setAttribute('role', 'rowheader');
      sectionRowTitle.setAttribute('scope', 'row');
    }
  }
  return expandSection;
}

function formatMerchTable(table) {
  const rows = table.querySelectorAll('.row');
  const rowsNum = rows.length;
  const firstRow = rows[0];
  const colsInRow = firstRow.querySelectorAll('.col');
  const colsInRowNum = colsInRow.length;

  for (let i = colsInRowNum; i > 0; i--) {
    const cols = table.querySelectorAll(`.col-${i}`);
    for (let j = rowsNum - 1; j >= 0; j--) {
      const currentCol = cols[j];
      if (!currentCol?.innerText && currentCol?.children.length === 0) {
        currentCol.classList.add('no-borders');
      } else {
        currentCol?.classList.add('border-bottom');
        break;
      }
    }
  }
}

function removeHover(cols) {
  cols.forEach((col) => col.classList.remove('hover', 'no-top-border', 'hover-border-bottom'));
}

function handleHovering(table) {
  const row1 = table.querySelector('.row-1');
  const colsInRowNum = row1.childElementCount;
  const isMerch = table.classList.contains('merch');
  const startValue = isMerch ? 1 : 2;
  const isCollapseTable = table.classList.contains('collapse');
  const sectionHeads = table.querySelectorAll('.section-head');
  const lastSectionHead = sectionHeads[sectionHeads.length - 1];
  const lastExpandIcon = lastSectionHead?.querySelector('.icon.expand');

  for (let i = startValue; i <= colsInRowNum; i++) {
    const cols = table.querySelectorAll(`.col-${i}`);
    cols.forEach((e) => {
      e.addEventListener('mouseover', () => {
        removeHover(cols);
        const headingRow = table.querySelector('.row-heading');
        const colClass = `col-${i}`;
        const isLastRowCollapsed = lastExpandIcon?.getAttribute('aria-expanded') === 'false';
        cols.forEach((col) => {
          if (col.classList.contains('col-highlight') && col.innerText) {
            const matchingColsClass = Array.from(col.classList).find(
              (className) => className.startsWith(colClass),
            );
            const noTopBorderCol = headingRow.querySelector(`.${matchingColsClass}`);
            noTopBorderCol?.classList.add('no-top-border');
          }
          if (isCollapseTable && isLastRowCollapsed) {
            const lastSectionHeadCol = lastSectionHead.querySelector(`.col-${i}`);
            lastSectionHeadCol.classList.add('hover-border-bottom');
          }
          col.classList.add('hover');
        });
      });
      e.addEventListener('mouseout', () => removeHover(cols));
    });
  }
}

function handleScrollEffect(table) {
  const gnav = document.querySelector('header');
  const gnavHeight = gnav ? gnav.offsetHeight : 0;
  const highlightRow = table.querySelector('.row-highlight');
  const headingRow = table.querySelector('.row-heading');

  if (highlightRow) {
    highlightRow.style.top = `${gnavHeight}px`;
    highlightRow.classList.add('top-border-transparent');
  } else {
    headingRow.classList.add('top-border-transparent');
  }
  const topOffset = gnavHeight + (highlightRow ? highlightRow.offsetHeight : 0);
  headingRow.style.top = `${topOffset}px`;

  const intercept = table.querySelector('.intercept') || createTag('div', { class: 'intercept' });
  intercept.setAttribute('data-observer-intercept', '');
  headingRow.insertAdjacentElement('beforebegin', intercept);

  const observer = new IntersectionObserver(([entry]) => {
    headingRow.classList.toggle('active', !entry.isIntersecting);
  }, { rootMargin: `-${topOffset}px` });
  observer.observe(intercept);
}

function applyStylesBasedOnScreenSize(table, originTable) {
  const isMerch = table.classList.contains('merch');
  const deviceBySize = defineDeviceByScreenSize();

  const setRowStyle = () => {
    if (isMerch) return;
    const sectionRow = Array.from(table.getElementsByClassName('section-row'));
    if (sectionRow.length) {
      const colsForTablet = sectionRow[0].children.length - 1;
      const percentage = 100 / colsForTablet;
      const templateColumnsValue = `repeat(auto-fit, ${percentage}%)`;
      sectionRow.forEach((row) => {
        if (deviceBySize === 'TABLET' || (deviceBySize === 'MOBILE' && !row.querySelector('.col-3'))) {
          row.style.gridTemplateColumns = templateColumnsValue;
        } else {
          row.style.gridTemplateColumns = '';
        }
      });
    }
  };

  const reAssignEvents = (tableEl) => {
    tableEl.dispatchEvent(tableHighlightLoadedEvent);
    tableEl.querySelectorAll('.icon.expand').forEach((icon) => {
      icon.parentElement.classList.add('point-cursor');
      icon.parentElement.addEventListener('click', () => handleExpand(icon));
      icon.parentElement.setAttribute('tabindex', 0);
      icon.parentElement.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (e.key === 'Enter' || e.key === ' ') handleExpand(icon);
      });
    });
    handleHovering(tableEl);
  };

  const mobileRenderer = () => {
    table.dispatchEvent(tableHighlightLoadedEvent);
    const headings = table.querySelectorAll('.row-heading .col');
    const headingsLength = headings.length;

    if (isMerch && headingsLength > 2) {
      table.querySelectorAll('.col:not(.col-1, .col-2)').forEach((col) => col.remove());
    } else if (headingsLength > 3) {
      table.querySelectorAll('.col:not(.col-1, .col-2, .col-3), .col.no-borders').forEach((col) => col.remove());
    }

    if ((!isMerch && !table.querySelector('.col-3'))
      || (isMerch && !table.querySelector('.col-2'))) return;

    const filterChangeEvent = () => {
      table.innerHTML = originTable.innerHTML;
      reAssignEvents(table);
      const filters = Array.from(table.parentElement.querySelectorAll('.filter')).map((f) => parseInt(f.value, 10));
      const rows = table.querySelectorAll('.row');

      if (isMerch) {
        table.querySelectorAll(`.col:not(.col-${filters[0] + 1}, .col-${filters[1] + 1})`).forEach((col) => col.remove());
      } else {
        table.querySelectorAll(`.col:not(.col-1, .col-${filters[0] + 1}, .col-${filters[1] + 1}), .col.no-borders`).forEach((col) => col.remove());
      }

      if (filters[0] > filters[1]) {
        if (isMerch) {
          rows.forEach((row) => row.querySelector('.col:not(.section-row-title)')
            .classList.add('force-last'));
        } else {
          rows.forEach((row) => row.querySelector('.col:not(.section-row-title, .col-1)')
            .classList.add('force-last'));
        }
      } else if (filters[0] === filters[1]) {
        rows.forEach((row) => {
          row.append(row.querySelector('.col:last-child').cloneNode(true));
        });
      }

      setRowStyle();

      if (table.matches('.sticky')) handleScrollEffect(table);
    };

    // Remove filter if table there are only 2 columns
    const filter = isMerch ? headingsLength > 2 : headingsLength > 3;
    if (!table.parentElement.querySelector('.filters') && filter) {
      const filters = createTag('div', { class: 'filters' });
      const filter1 = createTag('div', { class: 'filter-wrapper' });
      const filter2 = createTag('div', { class: 'filter-wrapper' });
      const colSelect0 = createTag('select', { class: 'filter' });
      const headingsFromOrigin = originTable.querySelectorAll('.col-heading');
      headingsFromOrigin.forEach((heading, index) => {
        const title = heading.querySelector('.tracking-header');
        if (!title || (!isMerch && title.closest('.col-1'))) return;

        const option = createTag('option', { value: index }, title.innerText);
        colSelect0.append(option);
      });
      const colSelect1 = colSelect0.cloneNode(true);
      colSelect0.dataset.filterIndex = 0;
      colSelect1.dataset.filterIndex = 1;
      const visibleCols = table.querySelectorAll(`.col-heading:not([style*="display: none"], .hidden${isMerch ? '' : ', .col-1'})`);
      colSelect0.querySelectorAll('option').item(visibleCols.item(0).dataset.colIndex - (isMerch ? 1 : 2)).selected = true;
      colSelect1.querySelectorAll('option').item(visibleCols.item(1).dataset.colIndex - (isMerch ? 1 : 2)).selected = true;
      filter1.append(colSelect0);
      filter2.append(colSelect1);
      filters.append(filter1, filter2);
      filter1.addEventListener('change', filterChangeEvent);
      filter2.addEventListener('change', filterChangeEvent);
      table.parentElement.insertBefore(filters, table);
      table.parentElement.classList.add(`table-${table.classList.contains('merch') ? 'merch-' : ''}section`);
      filterChangeEvent();
    }
  };

  // For Mobile (else: tablet / desktop)
  if (!isMerch && !table.querySelector('.row-heading .col-2')) {
    table.querySelector('.row-heading').style.display = 'block';
    table.querySelector('.row-heading .col-1').style.display = 'flex';
  }

  if (deviceBySize === 'MOBILE' || (isMerch && deviceBySize === 'TABLET')) {
    mobileRenderer();
  } else {
    table.innerHTML = originTable.innerHTML;
    reAssignEvents(table);
    table.parentElement.querySelectorAll('.filters select').forEach((select, index) => {
      select.querySelectorAll('option').item(index).selected = true;
    });
  }

  setRowStyle();
}

export default function init(el) {
  el.setAttribute('role', 'table');
  if (el.parentElement.classList.contains('section')) {
    el.parentElement.classList.add(`table-${el.classList.contains('merch') ? 'merch-' : ''}section`);
  }
  const rows = Array.from(el.children);
  const isMerch = el.classList.contains('merch');
  const isCollapseTable = el.classList.contains('collapse') && !isMerch;
  const isHighlightTable = el.classList.contains('highlight');
  let expandSection = true;

  rows.forEach((row, rdx) => {
    row.classList.add('row', `row-${rdx + 1}`);
    row.setAttribute('role', 'row');
    const cols = Array.from(row.children);
    const sectionParams = {
      row,
      index: rdx,
      allRows: rows,
      rowCols: cols,
      isMerch,
      isCollapseTable,
      expandSection,
      isHighlightTable,
    };

    cols.forEach((col, cdx) => {
      col.dataset.colIndex = cdx + 1;
      col.classList.add('col', `col-${cdx + 1}`);
      col.setAttribute('role', 'cell');
    });

    expandSection = handleSection(sectionParams);
  });

  handleHighlight(el);
  if (isMerch) formatMerchTable(el);

  let isDecorated = false;

  const handleTable = () => {
    if (isDecorated) return;
    let originTable;
    let visibleHeadingsSelector = '.col-heading:not(.hidden, .col-1)';
    if (isMerch) {
      visibleHeadingsSelector = '.col-heading:not(.hidden)';
    }
    if (el.querySelectorAll(visibleHeadingsSelector).length > 2) {
      originTable = el.cloneNode(true);
    } else {
      originTable = el;
    }

    const handleResize = () => {
      applyStylesBasedOnScreenSize(el, originTable);
      if (isStickyHeader(el)) handleScrollEffect(el);
    };
    handleResize();

    let deviceBySize = defineDeviceByScreenSize();
    window.addEventListener('resize', () => {
      if (el.classList.contains('has-addon')) {
        debounce(handleEqualHeight(el, '.row-heading'), 300);
      }
      if (deviceBySize === defineDeviceByScreenSize()) return;
      deviceBySize = defineDeviceByScreenSize();
      handleResize();
    });

    isDecorated = true;
  };

  window.addEventListener(MILO_EVENTS.DEFERRED, () => {
    handleTable();
  }, true);

  const observer = new window.IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      handleTable();
    }
  });

  observer.observe(el);

  tableIndex++;
}
