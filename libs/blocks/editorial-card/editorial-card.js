import { createTag, loadStyle, getConfig } from '../../utils/utils.js';
import { decorateBlockBg, decorateBlockText, decorateBlockHrs, decorateTextOverrides, applyHoverPlay } from '../../utils/decorate.js';

const { miloLibs, codeRoot } = getConfig();
const base = miloLibs || codeRoot;

async function loadIconography() {
  await new Promise((resolve) => { loadStyle(`${base}/styles/iconography.css`, resolve); });
}

async function decorateLockupFromContent(el) {
  const rows = el.querySelectorAll(':scope > div > p');
  const firstRowImg = rows[0]?.querySelector('img');
  if (!firstRowImg) return;
  await loadIconography();
  rows[0].classList.add('lockup-area');
  rows[0].childNodes.forEach((node) => {
    if (node.nodeType === 3 && node.nodeValue !== ' ') {
      const newSpan = createTag('span', { class: 'lockup-label' }, node.nodeValue);
      node.parentElement.replaceChild(newSpan, node);
    }
  });
}

const extendDeviceContent = (el) => {
  const detail = el.querySelector('[class^="detail-"]');
  const prevElem = detail?.previousElementSibling;
  if (!prevElem) return;
  const elBodyClass = [...prevElem.classList].find((c) => c.startsWith('body-'));
  prevElem.classList.remove(elBodyClass);
  prevElem.classList.add('device');
};

const decorateMedia = (el, media) => {
  if (!media) return;
  media.classList.add('media-area');
  const mediaVideo = media.querySelector('video');
  if (mediaVideo) {
    applyHoverPlay(mediaVideo);
  }
  if (media.children.length > 1) decorateBlockBg(el, media, { className: 'vp-media' });
};

const decorateForeground = async (el, rows) => {
  let isForegroundEmpty = true;

  rows.forEach((row, i) => {
    if (!row.textContent.trim()) {
      row.remove();
      return;
    }

    isForegroundEmpty = false;
    if (i === 0) {
      row.classList.add('foreground');
      decorateLockupFromContent(row);
    } else if (i === (rows.length - 1)) {
      row.classList.add('card-footer');
      if (!row.textContent.trim()) row.classList.add('empty');
    } else {
      row.classList.add('extra-row');
    }
    decorateBlockText(row, ['m', 'm', 'm']); // heading, body, detail
    decorateBlockHrs(row);
  });

  if (isForegroundEmpty) el.classList.add('no-foreground');
};

const decorateBgRow = (el, background, remove = false) => {
  const rows = background.querySelectorAll(':scope > div');
  const bgRowsEmpty = [...rows].every((row) => row.innerHTML.trim() === '');
  if (bgRowsEmpty || remove) {
    el.classList.add('no-bg');
    background.remove();
    return;
  }
  decorateBlockBg(el, background);
};

function handleClickableCard(el) {
  const links = el.querySelectorAll('a');
  if (el.classList.contains('click') && links) {
    el.addEventListener('click', (e) => {
      /* c8 ignore next 2 */
      if (e.target.tagName === 'A') return;
      (() => (links[0].target === '_blank' ? window.open(links[0].href) : window.location.assign(links[0].href)))();
    });
  }
}

const init = async (el) => {
  el.classList.add('con-block');
  const hasOpenClass = el.className.includes('open');
  if (hasOpenClass) el.classList.add('no-border', 'l-rounded-corners-image', 'static-links-copy');
  if (el.className.includes('rounded-corners')) loadStyle(`${base}/styles/rounded-corners.css`);
  if (![...el.classList].some((c) => c.endsWith('-lockup'))) el.classList.add('m-lockup');
  let rows = el.querySelectorAll(':scope > div');
  const [head, middle, ...tail] = rows;
  if (rows.length === 4) el.classList.add('equal-height');
  if (rows.length >= 1) {
    const count = rows.length >= 4 ? 'four-plus' : rows.length;
    switch (count) {
      case 'four-plus':
        // 4+ rows (0:bg, 1:media, 2:copy, ...3:static, last:card-footer)
        // 4+ rows.open (0:bg[removed], 1:media, 2:copy, ...3:static, last:card-footer)
        decorateBgRow(el, head, hasOpenClass);
        rows = tail;
        decorateMedia(el, middle);
        await decorateForeground(el, rows);
        break;
      case 3:
        // 3 rows (0:bg, 1:media, last:copy)
        // 3 rows.open (0:media, 1:copy, last:card-footer)
        if (hasOpenClass) {
          el.classList.add('no-bg');
          rows = [middle, tail[0]];
          decorateMedia(el, head);
        } else {
          rows = tail;
          decorateBgRow(el, head);
          decorateMedia(el, middle);
        }
        await decorateForeground(el, rows);
        break;
      case 2:
        // 2 rows (0:media, 1:copy)
        rows = [middle];
        decorateMedia(el, head);
        el.classList.add('no-bg');
        await decorateForeground(el, rows);
        break;
      case 1:
        // 1 row  (0:copy)
        rows = [head];
        el.classList.add('no-bg', 'no-media');
        await decorateForeground(el, rows);
        break;
      default:
    }
  }
  extendDeviceContent(el);
  decorateTextOverrides(el);
  handleClickableCard(el);
};

export default init;
