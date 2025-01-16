import {
  decorateBlockBg,
  decorateBlockHrs,
  decorateBlockText,
  decorateTextOverrides,
  decorateButtons,
  handleObjectFit,
  loadCDT,
} from '../../utils/decorate.js';
import { createTag, loadStyle, getConfig } from '../../utils/utils.js';

const contentTypes = ['list', 'qrcode', 'lockup', 'text', 'bgcolor', 'supplemental'];
const rowTypeKeyword = 'con-block-row-';
const breakpointThemeClasses = ['dark-mobile', 'light-mobile', 'dark-tablet', 'light-tablet', 'dark-desktop', 'light-desktop'];
const textDefault = ['xxl', 'm', 'l']; // heading, body, detail

const { miloLibs, codeRoot } = getConfig();
const base = miloLibs || codeRoot;

function distillClasses(el, classes) {
  const taps = ['-heading', '-body', '-detail', '-button'];
  classes?.forEach((elClass) => {
    const elTaps = taps.filter((tap) => elClass.endsWith(tap));
    if (!elTaps.length) return;
    const parts = elClass.split('-');
    el.classList.add(`${parts[1]}-${parts[0]}`);
    el.classList.remove(elClass);
  });
}

function decorateList(el, classes) {
  el.classList.add('body-l');
  const listItems = el.querySelectorAll('li');
  if (listItems.length) {
    const firstDiv = el.querySelector(':scope > div');
    firstDiv.classList.add('foreground');
    [...listItems].forEach((item) => {
      const firstElemIsIcon = item.children[0]?.classList.contains('icon');
      if (firstElemIsIcon) item.classList.add('icon-item');
      if (!item.parentElement.classList.contains('icon-list')) item.parentElement.classList.add('icon-list');
    });
  }
  distillClasses(el, classes);
}

function decorateQr(el) {
  const text = el.querySelector(':scope > div');
  /* c8 ignore next */
  if (!text) return;
  const classes = ['qr-code-img', 'google-play', 'app-store'];
  [...text.children].forEach((e, i) => {
    e.classList.add(classes[i]);
  });
}

async function loadIconography() {
  await new Promise((resolve) => { loadStyle(`${base}/styles/iconography.css`, resolve); });
}

async function decorateLockupFromContent(el) {
  const rows = el.querySelectorAll(':scope > p');
  const firstRowImg = rows[0]?.querySelector('img');
  if (!firstRowImg) return;
  await loadIconography();
  rows[0].classList.add('lockup-area');
  rows[0].childNodes.forEach((node) => {
    if (node.nodeType === 3 && node.nodeValue?.trim()) {
      const newSpan = createTag('span', { class: 'lockup-label' }, node.nodeValue);
      node.parentElement.replaceChild(newSpan, node);
    }
  });
}

async function decorateLockupRow(el, classes) {
  const child = el.querySelector(':scope > div');
  await loadIconography();
  child?.classList.add('lockup-area');
  const iconSizeClass = classes?.find((c) => c.endsWith('-icon'));
  const lockupSizeClass = classes?.find((c) => c.endsWith('-lockup'));
  const usedLockupClass = iconSizeClass || lockupSizeClass;
  if (usedLockupClass) {
    el.classList.remove(usedLockupClass);
  }
  el.classList.add(`${usedLockupClass?.split('-')[0] || 'l'}-lockup`);
}

function decorateBg(el) {
  const block = el.closest('.hero-marquee');
  block.style.background = el.textContent.trim();
  el.remove();
}

function wrapInnerHTMLInPTag(el) {
  const innerDiv = el.querySelector(':scope > div');
  const containsPTag = [...innerDiv.childNodes].some((node) => node.nodeName === 'P');
  if (!containsPTag) {
    const pTag = createTag('p');
    while (innerDiv.firstChild) pTag.appendChild(innerDiv.firstChild);
    innerDiv.appendChild(pTag);
  }
}

function decorateText(el, classes) {
  el.classList.add('norm');
  wrapInnerHTMLInPTag(el);
  const btnClass = classes?.find((c) => c.endsWith('-button'));
  if (btnClass) {
    const [theme, size] = btnClass.split('-').reverse();
    el.classList.remove(btnClass);
    decorateButtons(el, `${theme}-${size}`);
  } else {
    decorateButtons(el, 'button-xl');
  }
  decorateBlockText(el, textDefault);
  decorateTextOverrides(el, ['-heading', '-body', '-detail']);
}

function decorateSup(el, classes) {
  el.classList.add('norm');
  distillClasses(el, classes);
}

function extendButtonsClass(copy) {
  const buttons = copy.querySelectorAll('.con-button');
  if (buttons.length === 0) return;
  buttons.forEach((button) => {
    button.classList.add('button-xl', 'button-justified-mobile');
  });
}
function parseKeyString(str) {
  const regex = /^(\w+)\s*\((.*)\)$/;
  const match = str.match(regex);
  if (!match) return { key: str };
  const key = match[1];
  const classes = match[2].split(',').map((c) => c.trim());
  const result = { key, classes };
  return result;
}

async function loadContentType(el, key, classes) {
  if (classes !== undefined && classes.length) el.classList.add(...classes);
  switch (key) {
    case 'bgcolor':
      decorateBg(el);
      break;
    case 'lockup':
      await decorateLockupRow(el, classes);
      break;
    case 'qrcode':
      decorateQr(el);
      break;
    case 'list':
      decorateList(el, classes);
      break;
    case 'supplemental':
      decorateSup(el, classes);
      break;
    case 'text':
      decorateText(el, classes);
      break;
    default:
  }
}

function loadBreakpointThemes() {
  loadStyle(`${base}/styles/breakpoint-theme.css`);
}

export default async function init(el) {
  el.classList.add('con-block');
  let rows = el.querySelectorAll(':scope > div');
  if (rows.length > 1 && rows[0].textContent !== '') {
    el.classList.add('has-bg');
    const [head, ...tail] = rows;
    handleObjectFit(head);
    decorateBlockBg(el, head, { useHandleFocalpoint: true });
    rows = tail;
  }

  // get first row that's not a keyword key/value row
  const mainRowIndex = rows.findIndex((row) => {
    const firstColText = row.children[0].textContent.toLowerCase().trim();
    return !firstColText.includes(rowTypeKeyword);
  });
  const foreground = rows[mainRowIndex];
  const fRows = foreground.querySelectorAll(':scope > div');
  foreground.classList.add('foreground', `cols-${fRows.length}`);
  let copy = fRows[0];
  const anyTag = foreground.querySelector('p, h1, h2, h3, h4, h5, h6');
  const asset = foreground.querySelector('div > picture, :is(.video-container, .pause-play-wrapper), div > video, div > a[href*=".mp4"], div > a.image-link');
  const allRows = foreground.querySelectorAll('div > div');
  copy = anyTag.closest('div');
  copy.classList.add('copy');

  if (asset) {
    asset.parentElement.classList.add('asset');
    if (el.classList.contains('media-cover')) {
      el.appendChild(createTag('div', { class: 'foreground-media' }, asset));
    }
  } else {
    [...fRows].forEach((row) => {
      if (row.childElementCount === 0) {
        row.classList.add('empty-asset');
      }
    });
  }

  const assetUnknown = (allRows.length === 2
    && allRows[1].classList.length === 0)
    ? allRows[1]
    : null;
  if (assetUnknown) assetUnknown.classList.add('asset-unknown');

  decorateBlockText(copy, textDefault, 'hasDetailHeading');
  await decorateLockupFromContent(copy);
  extendButtonsClass(copy);

  /* c8 ignore next 2 */
  const containsClassFromArray = () => breakpointThemeClasses.some(
    (className) => el.classList.contains(className),
  );
  if (containsClassFromArray) loadBreakpointThemes();

  const assetRow = allRows[0].classList.contains('asset');
  if (assetRow) el.classList.add('asset-left');
  const lockupClass = [...el.classList].find((c) => c.endsWith('-lockup'));
  if (lockupClass) el.classList.remove(lockupClass);
  const buttonClass = [...el.classList].find((c) => c.endsWith('-button'));
  if (buttonClass) el.classList.remove(buttonClass);
  const classes = `main-copy ${lockupClass || 'l-lockup'} ${buttonClass || 'l-button'}`;
  const mainCopy = createTag('div', { class: classes });
  while (copy.childNodes.length > 0) {
    mainCopy.appendChild(copy.childNodes[0]);
  }
  rows.splice(mainRowIndex, 1);
  if (mainRowIndex > 0) {
    for (let i = 0; i < mainRowIndex; i += 1) {
      rows[i].classList.add('prepend');
    }
  }
  copy.append(mainCopy);
  [...rows].forEach((row) => {
    if (row.classList.contains('prepend')) {
      mainCopy.before(row);
    } else {
      copy.append(row);
    }
  });
  const promiseArr = [];
  [...rows].forEach(async (row) => {
    const cols = row.querySelectorAll(':scope > div');
    const firstCol = cols[0];
    const firstColText = firstCol.textContent.toLowerCase().trim();
    const isKeywordRow = firstColText.includes(rowTypeKeyword);
    if (isKeywordRow) {
      const keyValue = firstColText.replace(rowTypeKeyword, '').trim();
      const parsed = parseKeyString(keyValue);
      firstCol.parentElement.classList.add(`row-${parsed.key}`, 'con-block');
      firstCol.remove();
      cols[1].classList.add('row-wrapper');
      if (contentTypes.includes(parsed.key)) {
        promiseArr.push(loadContentType(row, parsed.key, parsed.classes));
      }
    } else {
      row.classList.add('norm');
      decorateBlockHrs(row);
      decorateButtons(row, 'button-xl');
    }
  });
  decorateTextOverrides(el, ['-heading', '-body', '-detail'], mainCopy);

  if (el.classList.contains('countdown-timer')) {
    promiseArr.push(loadCDT(copy, el.classList));
  }

  await Promise.all(promiseArr);
}
