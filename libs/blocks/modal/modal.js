/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import { createTag, getMetadata, localizeLink, loadStyle, getConfig } from '../../utils/utils.js';
import { decorateSectionAnalytics } from '../../martech/attributes.js';

const FOCUSABLES = 'a:not(.hide-video), button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]';
const CLOSE_ICON = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
  <g transform="translate(-10500 3403)">
    <circle cx="10" cy="10" r="10" transform="translate(10500 -3403)" fill="#707070"/>
    <line y1="8" x2="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
    <line x1="8" y1="8" transform="translate(10506 -3397)" fill="none" stroke="#fff" stroke-width="2"/>
  </g>
</svg>`;

let isDelayedModal = false;
let prevHash = '';
const dialogLoadingSet = new Set();

export function findDetails(hash, el) {
  const id = hash.replace('#', '');
  const a = el || document.querySelector(`a[data-modal-hash="${hash}"]`);
  const path = a?.dataset.modalPath || localizeLink(getMetadata(`-${id}`));
  return { id, path, isHash: hash === window.location.hash };
}

function fireAnalyticsEvent(event) {
  const data = {
    xdm: {},
    data: { web: { webInteraction: { name: event?.type } } },
  };
  if (event?.data) data.data._adobe_corpnew = { digitalData: event.data };
  window._satellite?.track('event', data);
}

export function sendAnalytics(event) {
  if (window._satellite?.track) {
    fireAnalyticsEvent(event);
  } else {
    window.addEventListener('alloy_sendEvent', () => {
      fireAnalyticsEvent(event);
    }, { once: true });
  }
}

export function closeModal(modal) {
  const { id } = modal;
  const closeEvent = new Event('milo:modal:closed');
  window.dispatchEvent(closeEvent);

  document.querySelectorAll(`#${id}`).forEach((mod) => {
    if (mod.classList.contains('dialog-modal')) {
      const modalCurtain = document.querySelector(`#${id}~.modal-curtain`);
      if (modalCurtain) {
        modalCurtain.remove();
      }
      mod.remove();
    }
    document.querySelector(`[data-modal-hash="#${mod.id}"]`)?.focus();
  });

  if (!document.querySelectorAll('.modal-curtain').length) {
    document.body.classList.remove('disable-scroll');
  }

  [...document.querySelectorAll('header, main, footer')]
    .forEach((element) => element.removeAttribute('aria-disabled'));

  const hashId = window.location.hash.replace('#', '');
  if (hashId === modal.id) window.history.pushState('', document.title, `${window.location.pathname}${window.location.search}`);
  isDelayedModal = false;
  if (prevHash) {
    window.location.hash = prevHash;
    prevHash = '';
  }
}

function isElementInView(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function getCustomModal(custom, dialog) {
  const { miloLibs, codeRoot } = getConfig();
  loadStyle(`${miloLibs || codeRoot}/blocks/modal/modal.css`);
  if (custom.id) dialog.id = custom.id;
  if (custom.class) dialog.classList.add(custom.class);
  if (custom.closeEvent) {
    dialog.addEventListener(custom.closeEvent, () => {
      closeModal(dialog);
    });
  }
  dialog.append(custom.content);
}

async function getPathModal(path, dialog) {
  let href = path;
  if (path.includes('/federal/')) {
    const { getFederatedUrl } = await import('../../utils/federated.js');
    href = getFederatedUrl(path);
  }
  const block = createTag('a', { href });
  dialog.append(block);

  // eslint-disable-next-line import/no-cycle
  const { default: getFragment } = await import('../fragment/fragment.js');
  await getFragment(block);
}

export async function getModal(details, custom) {
  if (!(details?.path || custom)) return null;
  const { id } = details || custom;

  dialogLoadingSet.add(id);
  const dialog = createTag('div', { class: 'dialog-modal', id });
  const loadedEvent = new Event('milo:modal:loaded');

  if (custom) getCustomModal(custom, dialog);
  if (details) await getPathModal(details.path, dialog);
  if (isDelayedModal) {
    dialog.classList.add('delayed-modal');
    const mediaBlock = dialog.querySelector('div.media');
    if (mediaBlock) {
      mediaBlock.classList.add('in-modal');
      const { miloLibs, codeRoot } = getConfig();
      const base = miloLibs || codeRoot;
      loadStyle(`${base}/styles/rounded-corners.css`);
    }
  }

  const localeModal = id?.includes('locale-modal') ? 'localeModal' : 'milo';
  const analyticsEventName = window.location.hash ? window.location.hash.replace('#', '') : localeModal;
  const close = createTag('button', {
    class: 'dialog-close',
    'aria-label': 'Close',
    'daa-ll': `${analyticsEventName}:modalClose:buttonClose`,
  }, CLOSE_ICON);

  const focusVisible = { focusVisible: true };
  const focusablesOnLoad = [...dialog.querySelectorAll(FOCUSABLES)];
  const titleOnLoad = dialog.querySelector('h1, h2, h3, h4, h5');
  let firstFocusable;

  if (focusablesOnLoad.length && isElementInView(focusablesOnLoad[0])) {
    firstFocusable = focusablesOnLoad[0]; // eslint-disable-line prefer-destructuring
  } else if (titleOnLoad) {
    titleOnLoad.setAttribute('tabIndex', 0);
    firstFocusable = titleOnLoad;
  } else {
    firstFocusable = close;
  }

  dialog.addEventListener('keydown', (event) => {
    const isShiftKey = event.shiftKey;
    const isTab = event.key === 'Tab';
    const isCloseActive = document.activeElement === close;

    if (!isShiftKey && isTab && isCloseActive) {
      event.preventDefault();
      firstFocusable.focus(focusVisible);
    }

    if (isTab && isShiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      close.focus(focusVisible);
    }
  });

  close.addEventListener('click', (e) => {
    closeModal(dialog);
    e.preventDefault();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal(dialog);
    }
  });
  decorateSectionAnalytics(dialog, `${id}-modal`, getConfig());
  dialog.append(close);
  document.body.append(dialog);
  dialogLoadingSet.delete(id);
  firstFocusable.focus({ preventScroll: true, ...focusVisible });
  window.dispatchEvent(loadedEvent);

  if (!dialog.classList.contains('curtain-off')) {
    document.body.classList.add('disable-scroll');
    const curtain = createTag('div', {
      class: 'modal-curtain is-open',
      'daa-ll': `${analyticsEventName}:modalClose:curtainClose`,
    });
    curtain.addEventListener('click', (e) => {
      if (e.target === curtain) closeModal(dialog);
    });
    dialog.insertAdjacentElement('afterend', curtain);
    [...document.querySelectorAll('header, main, footer')]
      .forEach((element) => element.setAttribute('aria-disabled', 'true'));
  }

  const iframe = dialog.querySelector('iframe');
  if (iframe) {
    if (dialog.classList.contains('commerce-frame') || dialog.classList.contains('dynamic-height')) {
      const { default: enableCommerceFrameFeatures } = await import('./modal.merch.js');
      await enableCommerceFrameFeatures({ dialog, iframe });
    } else {
      /* Initially iframe height is set to 0% in CSS for the height auto adjustment feature.
      The height auto adjustment feature is applicable only to dialogs
      with the `commerce-frame` or `dynamic-height` classes */
      iframe.style.height = '100%';
    }
  }

  return dialog;
}

export function getHashParams(hashStr) {
  if (!hashStr) return {};
  return hashStr.split(':').reduce((params, part) => {
    if (part.startsWith('#')) {
      params.hash = part;
    } else {
      const [key, val] = part.split('=');
      if (key === 'delay') {
        params.delay = parseInt(val, 10) * 1000;
      }
    }
    return params;
  }, {});
}

export function delayedModal(el) {
  const { hash, delay } = getHashParams(el?.dataset.modalHash);
  if (delay === undefined || !hash) return false;
  isDelayedModal = true;
  const modalOpenEvent = new Event(`${hash}:modalOpen`);
  const pagesModalWasShownOn = window.sessionStorage.getItem(`shown:${hash}`);
  el.dataset.modalHash = hash;
  el.href = hash;
  if (!pagesModalWasShownOn?.includes(window.location.pathname)) {
    setTimeout(() => {
      window.location.replace(hash);
      sendAnalytics(modalOpenEvent);
      window.sessionStorage.setItem(`shown:${hash}`, `${pagesModalWasShownOn || ''} ${window.location.pathname}`);
    }, delay);
  }
  return true;
}

// Deep link-based
export default function init(el) {
  const { modalHash, modalPath } = el.dataset;
  if (getConfig().mep?.fragments?.[modalPath]?.action === 'remove') return null;
  if (delayedModal(el) || window.location.hash !== modalHash || document.querySelector(`div.dialog-modal${modalHash}`)) return null;
  if (dialogLoadingSet.has(modalHash?.replace('#', ''))) return null; // prevent duplicate modal loading
  const details = findDetails(window.location.hash, el);
  return details ? getModal(details) : null;
}

// Click-based modal
window.addEventListener('hashchange', (e) => {
  if (!window.location.hash) {
    try {
      const url = new URL(e.oldURL);
      const dialog = document.querySelector(`.dialog-modal${url.hash}`);
      if (dialog) closeModal(dialog);
    } catch (error) {
      /* do nothing */
    }
  } else {
    const details = findDetails(window.location.hash, null);
    if (details) getModal(details);
    if (e.oldURL?.includes('#')) {
      prevHash = new URL(e.oldURL).hash;
    }
  }
});
