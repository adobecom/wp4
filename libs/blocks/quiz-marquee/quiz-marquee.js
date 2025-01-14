import { decorateBlockBg, decorateBlockHrs, decorateBlockText } from '../../utils/decorate.js';
import { createTag } from '../../utils/utils.js';

function decorateBadge(el) {
  const regex = /\[\[(.*?)\]\]/g;
  const header = el.querySelector('h1, h2, h3, h4, h5, h6');
  const matches = header.innerHTML.match(regex);
  if (!matches) return;
  matches.forEach((match) => {
    const badgeText = match.substring(2, match.length - 2);
    /* c8 ignore next */
    if (!badgeText) return;
    const badge = createTag('span', { class: 'badge' }, badgeText);
    header.innerHTML = header.innerHTML.replace(regex, '');
    header.append(badge);
  });
}

export default async function init(el) {
  el.classList.add('con-block');
  let rows = el.querySelectorAll(':scope > div');
  const { default: quizResults } = await import('../quiz-results/quiz-results.js');

  if (rows.length > 1 && rows[0].textContent !== '') {
    el.classList.add('has-bg');
    const [head, ...tail] = rows;
    decorateBlockBg(el, head);
    rows = tail;
  }

  const foreground = rows[0];
  foreground.classList.add('foreground');
  const fRows = foreground.querySelectorAll(':scope > div');
  let copy = fRows[0];

  const anyTag = foreground.querySelector('p, h1, h2, h3, h4, h5, h6');
  const asset = foreground.querySelector('div > picture', 'div > video');
  copy = anyTag.closest('div');
  copy.classList.add('copy');

  if (asset) {
    asset.parentElement.classList.add('asset');
    foreground.classList.add('has-asset');
    if (el.classList.contains('split')) {
      el.appendChild(createTag('div', { class: 'background-split' }, asset));
    }
  } else {
    [...fRows].forEach((row) => {
      if (row.childElementCount === 0) {
        row.classList.add('empty-asset');
        foreground.classList.add('has-asset');
      }
    });
  }

  if (fRows.length === 1) foreground.classList.add('fw');
  decorateBlockText(copy, ['xxl', 'm', 'l']); // heading, body, detail
  const assetRow = foreground.querySelector(':scope > div').classList.contains('asset');
  if (assetRow) el.classList.add('asset-left');
  const staticCopy = createTag('div', { class: 'static' }, copy.innerHTML);
  decorateBadge(staticCopy);
  rows.shift();

  copy.innerHTML = '';
  copy.append(staticCopy);
  copy.append(...rows);

  [...rows].forEach(async (row) => {
    const cols = row.querySelectorAll(':scope > div');
    const isFragRow = cols[0].textContent.trim() === 'nested-fragments';
    const isList = cols[2]?.textContent?.trim() === 'list' || false;

    if (isFragRow) {
      const fragParent = cols[0].parentElement;
      fragParent?.classList.add('nested', cols[1]?.textContent?.trim());
      if (isList) fragParent.setAttribute('role', 'list');

      const wrapper = createTag('div', { class: 'copy-wrapper' });
      row.append(wrapper);
      wrapper.append(...cols);
      await quizResults(row);
    } else {
      row.classList.add('static');
      decorateBlockHrs(row);
    }
  });
}
