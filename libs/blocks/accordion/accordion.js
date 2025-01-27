import { createTag, getConfig } from '../../utils/utils.js';
import { decorateButtons } from '../../utils/decorate.js';
import { processTrackingLabels } from '../../martech/attributes.js';
import { replaceKey } from '../../features/placeholders.js';

const faq = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [] };
const mediaCollection = {};

function setSEO(questions) {
  faq.mainEntity.push(questions.map(({ name, text }) => (
    { '@type': 'Question', name, acceptedAnswer: { text, '@type': 'Answer' } })));
  const script = createTag('script', { type: 'application/ld+json' }, JSON.stringify(faq));
  document.head.append(script);
}

/* c8 ignore next 8 */
function playVideo(video) {
  if (!video) return;
  if (video.getAttribute('autoplay') === null) return;
  const playBtn = video.nextElementSibling;
  const isPlaying = playBtn.getAttribute('aria-pressed') === 'true';
  if (isPlaying || video.readyState === 0) return;
  playBtn.click();
}

/* c8 ignore next 11 */
function pauseVideo(video) {
  if (!video) return;
  if (video.getAttribute('controls') !== null) {
    video.pause();
    return;
  }
  const pauseBtn = video.nextElementSibling;
  const isPlaying = pauseBtn?.getAttribute('aria-pressed') === 'true';
  if (!isPlaying || video.readyState === 0) return;
  pauseBtn.click();
}

function openPanel(el, dd) {
  const analyticsValue = el.getAttribute('daa-ll');
  el.setAttribute('aria-expanded', 'true');
  el.setAttribute('daa-ll', analyticsValue.replace(/open-/, 'close-'));
  dd.removeAttribute('hidden');
}

function closePanel(el, dd) {
  const analyticsValue = el.getAttribute('daa-ll');
  el.setAttribute('aria-expanded', 'false');
  el.setAttribute('daa-ll', analyticsValue.replace(/close-/, 'open-'));
  dd.setAttribute('hidden', '');
}

function displayMedia(displayArea, el, dd, clickedId, expanded) {
  const accordionId = el.getAttribute('aria-controls').split('-')[1];
  if (expanded) {
    closePanel(el, dd);
    const clickedMedia = displayArea.childNodes[clickedId - 1];
    const video = clickedMedia.querySelector('video');
    if (video) pauseVideo(video);
    const otherExpandedPanels = el.closest('.accordion').querySelectorAll('.accordion-trigger[aria-expanded="true"]');
    if (!otherExpandedPanels.length) return;
    clickedMedia.classList.remove('expanded');
    const newExpandedId = otherExpandedPanels[0].id.split('trigger-')[1] - 1;
    displayArea.childNodes[newExpandedId].classList.add('expanded');
    return;
  }
  [...mediaCollection[accordionId]].forEach((mediaCollectionItem, idx) => {
    const video = mediaCollectionItem.querySelector('video');
    if (idx === clickedId - 1) {
      openPanel(el, dd);
      displayArea.childNodes[idx].classList.add('expanded');
      if (video) playVideo(video);
      return;
    }
    mediaCollectionItem.classList.remove('expanded');
    const trigger = document.querySelector(`#accordion-${accordionId}-trigger-${idx + 1}`);
    const content = document.querySelector(`#accordion-${accordionId}-content-${idx + 1}`);
    closePanel(trigger, content);
    if (video) pauseVideo(video);
  });
}

function handleClick(el, dd, num) {
  const expandAllBtns = el.closest('.accordion-container')?.querySelectorAll('.accordion-expand-all button');
  if (expandAllBtns.length) {
    expandAllBtns.forEach((btn) => {
      btn.setAttribute('aria-pressed', 'mixed');
      btn.classList.remove('fill', 'disabled');
    });
  }

  const closestEditorial = el.closest('.editorial');
  const expanded = el.getAttribute('aria-expanded') === 'true';
  if (closestEditorial) {
    displayMedia(closestEditorial.querySelector('.accordion-media'), el, dd, num, expanded);
    return;
  }

  if (expanded) {
    closePanel(el, dd);
    return;
  }
  openPanel(el, dd);
}

function defaultOpen(accordion) {
  handleClick(accordion.querySelector('.accordion-trigger'), accordion.querySelector('dd'), 1);
}

function createItem(accordion, id, heading, num, edit) {
  const triggerId = `accordion-${id}-trigger-${num}`;
  const panelId = `accordion-${id}-content-${num}`;
  const icon = createTag('span', { class: 'accordion-icon' });
  const hTag = heading.querySelector('h1, h2, h3, h4, h5, h6');
  const analyticsString = `open-${num}--${processTrackingLabels(heading.textContent)}`;
  const button = createTag('button', {
    type: 'button',
    id: triggerId,
    class: 'accordion-trigger tracking-header',
    'aria-expanded': 'false',
    'aria-controls': panelId,
    'daa-ll': analyticsString,
  }, heading.textContent);
  button.append(icon);

  const panel = heading.nextElementSibling?.firstElementChild;

  const para = panel?.querySelector('p');
  const text = para ? para.textContent : panel?.textContent;
  const dtAttrs = hTag ? {} : { role: 'heading', 'aria-level': 3 };
  const dtHtml = hTag ? createTag(hTag.tagName, { class: 'accordion-heading' }, button) : button;
  const dt = createTag('dt', dtAttrs, dtHtml);
  const dd = createTag('dd', { 'aria-labelledby': triggerId, id: panelId, hidden: true }, panel);
  const dm = createTag('div', { class: 'media-p' });

  if (edit) {
    const ogMedia = mediaCollection[id][num - 1];
    const mediaCopy = ogMedia.cloneNode(true);
    dm.append(mediaCopy);
    dd.prepend(dm);
  }

  button.addEventListener('click', (e) => { handleClick(e.target, dd, num, id); });
  accordion.append(dt, dd);

  return { name: heading.textContent, text, dt, dd };
}

function getUniqueId(el) {
  const accordions = document.querySelectorAll('.accordion');
  return [...accordions].indexOf(el) + 1;
}

function populateMedia(accordion, id, num, collection) {
  mediaCollection[id] = collection;
  accordion.append(mediaCollection[id][num]);
}

async function createExpandAllContainer(accordionItems, isEditorial, mediaEl) {
  const chevronIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd" d="M16.0001 12C16.0002 12.1745 15.9657 12.3474 15.8988 12.5086C15.8319 12.6698 15.7338 12.8162 15.6101 12.9393L10.2881 18.2593C10.1704 18.3991 10.0252 18.5131 9.8616 18.5944C9.69798 18.6757 9.51939 18.7225 9.33693 18.7319C9.15447 18.7413 8.97203 18.713 8.80092 18.649C8.62982 18.5849 8.4737 18.4864 8.34227 18.3595C8.21083 18.2326 8.10688 18.08 8.03686 17.9113C7.96684 17.7425 7.93225 17.5612 7.93524 17.3785C7.93822 17.1958 7.97872 17.0157 8.05422 16.8493C8.12971 16.683 8.2386 16.5339 8.37411 16.4113L8.40678 16.3787L12.7874 12L8.40611 7.62C8.17954 7.36922 8.05666 7.04176 8.06232 6.70383C8.06798 6.36591 8.20175 6.04274 8.43659 5.79969C8.67143 5.55664 8.98981 5.41183 9.32733 5.39457C9.66486 5.3773 9.99636 5.48885 10.2548 5.70667L10.2874 5.73933L15.6094 11.0593C15.7334 11.1826 15.8317 11.3292 15.8987 11.4906C15.9658 11.6521 16.0002 11.8252 16.0001 12Z"/></svg>';
  const closeIcon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="currentcolor" fill-rule="evenodd" clip-rule="evenodd" d="M13.6113 12L17.2647 8.34668C17.71 7.90186 17.71 7.18018 17.2647 6.73535C16.8193 6.29004 16.0986 6.29004 15.6533 6.73535L12 10.3887L8.34668 6.73535C7.90137 6.29004 7.18066 6.29004 6.73535 6.73535C6.29004 7.18017 6.29004 7.90185 6.73535 8.34668L10.3887 12L6.73535 15.6533C6.29004 16.0981 6.29004 16.8198 6.73535 17.2647C6.95801 17.4873 7.24951 17.5986 7.54101 17.5986C7.83251 17.5986 8.12402 17.4873 8.34667 17.2647L12 13.6113L15.6533 17.2647C15.876 17.4873 16.167 17.5986 16.459 17.5986C16.751 17.5986 17.042 17.4873 17.2646 17.2647C17.7099 16.8198 17.7099 16.0982 17.2646 15.6533L13.6113 12Z"/></svg>';
  const config = getConfig();
  const expandText = await replaceKey('expand-all', config);
  const collapseText = await replaceKey('collapse-all', config);
  const expandBtn = createTag('button', { class: 'expand-btn con-button button-l', 'aria-pressed': 'false' }, expandText);
  expandBtn.insertAdjacentHTML('beforeend', chevronIcon);
  const collapseBtn = createTag('button', { class: 'collapse-btn con-button button-l', 'aria-pressed': 'false' }, collapseText);
  collapseBtn.insertAdjacentHTML('beforeend', closeIcon);
  const container = createTag('div', { class: 'accordion-expand-all foreground' }, [expandBtn, collapseBtn]);
  const toggleAll = (targetBtn, action) => {
    if (targetBtn.getAttribute('aria-pressed') === 'true') return;
    targetBtn.setAttribute('aria-pressed', 'true');
    targetBtn.classList.remove('fill');
    targetBtn.classList.add('disabled');
    const siblingBtn = targetBtn.nextElementSibling || targetBtn.previousElementSibling;
    siblingBtn.setAttribute('aria-pressed', 'false');
    siblingBtn.classList.remove('disabled');
    siblingBtn.classList.add('fill');
    if (action === 'expand') {
      accordionItems.forEach(({ dt, dd }) => openPanel(dt.querySelector('button'), dd));
      if (!isEditorial) return;
      [...mediaEl.childNodes].forEach((node, idx) => {
        if (idx === 0) {
          node.classList.add('expanded');
          const video = node.querySelector('video');
          if (video) playVideo(node.querySelector('video'));
          return;
        }
        node.classList.remove('expanded');
      });
      return;
    }
    accordionItems.forEach(({ dt, dd }) => closePanel(dt.querySelector('button'), dd));
    if (!isEditorial) return;
    const video = mediaEl.querySelector('.expanded video');
    if (video) pauseVideo(video);
  };
  expandBtn.addEventListener('click', ({ currentTarget }) => toggleAll(currentTarget, 'expand'));
  collapseBtn.addEventListener('click', ({ currentTarget }) => toggleAll(currentTarget, 'collapse'));
  return container;
}

export default async function init(el) {
  const id = getUniqueId(el);
  const accordion = createTag('dl', { class: 'accordion', id: `accordion-${id}`, role: 'presentation' });
  const accordionMedia = createTag('div', { class: 'accordion-media', id: `accordion-media-${id}` });
  const isSeo = el.classList.contains('seo');
  const isEditorial = el.classList.contains('editorial');
  const hasExpandAll = el.classList.contains('expand-all-button');
  decorateButtons(el);

  if (isEditorial) {
    const editorialMedia = el.querySelectorAll(':scope > div:nth-child(3n)');
    [...editorialMedia].map(
      (media, idx, collection) => populateMedia(accordionMedia, id, idx, collection),
    );
  }

  const headings = el.querySelectorAll(':scope > div:nth-child(odd)');
  const items = [...headings].map(
    (heading, idx) => createItem(
      accordion,
      id,
      heading,
      idx + 1,
      isEditorial,
      accordionMedia,
    ),
  );

  if (isSeo) { setSEO(items); }
  el.innerHTML = '';
  el.className = `accordion-container ${el.className}`;
  el.classList.remove('accordion');
  const maxWidthClass = Array.from(el.classList).find((style) => style.startsWith('max-width-'));
  el.classList.add('con-block', maxWidthClass || 'max-width-10-desktop');
  accordion.classList.add('foreground');
  el.append(accordion);
  if (isEditorial) {
    el.append(accordionMedia);
    defaultOpen(el);
  }
  if (hasExpandAll) {
    const expandAllContainer = await createExpandAllContainer(items, isEditorial, accordionMedia);
    el.prepend(expandAllContainer);
  }
}
