import { debounce } from '../../utils/action.js';

export const MOBILE_MAX = 599;
export const TABLET_MAX = 1199;

window.addEventListener('pageshow', (event) => {
  // if there is a commerce modal with an iframe open, reload the page to avoid bfcache issues.
  if (event.persisted && document.querySelector('.dialog-modal.commerce-frame iframe')) {
    window.location.reload();
  }
});

export function adjustModalHeight(contentHeight) {
  if (!(window.location.hash || document.getElementById('checkout-link-modal'))) return;
  let selector = '#checkout-link-modal';
  if (!/=/.test(window.location.hash)) selector = `${selector},div.dialog-modal.commerce-frame${window.location.hash},div.dialog-modal.dynamic-height${window.location.hash}`;
  const dialog = document.querySelector(selector);
  const iframe = dialog?.querySelector('iframe');
  const iframeWrapper = dialog?.querySelector('.milo-iframe');
  if (!contentHeight || !iframe || !iframeWrapper) return;
  if (contentHeight === '100%') {
    iframe.style.height = '100%';
    iframeWrapper.style.removeProperty('height');
    dialog.style.removeProperty('height');
  } else {
    const verticalMargins = 20;
    const clientHeight = document.documentElement.clientHeight - verticalMargins;
    if (clientHeight <= 0) return;
    const newHeight = contentHeight > clientHeight ? clientHeight : contentHeight;
    iframe.style.height = '100%';
    iframeWrapper.style.height = `${newHeight}px`;
    dialog.style.height = `${newHeight}px`;
  }
}

export function sendViewportDimensionsToIframe(source) {
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  source.postMessage({ mobileMax: MOBILE_MAX, tabletMax: TABLET_MAX, viewportWidth }, '*');
}

export function sendViewportDimensionsOnRequest(source) {
  sendViewportDimensionsToIframe(source);
  window.addEventListener('resize', debounce(() => sendViewportDimensionsToIframe(source), 10));
}

function reactToMessage({ data, source }) {
  if (data === 'viewportWidth' && source) {
    /* If the page inside iframe comes from another domain, it won't be able to retrieve
    the viewport dimensions, so it sends a request to receive the viewport dimensions
    from the parent window. */
    sendViewportDimensionsOnRequest(source);
  }

  if (data?.contentHeight) {
    /* If the page inside iframe sends the postMessage with its content height,
    we activate the height auto adjustment to eliminate the blank space at the bottom of the modal.
    For this we set the iframe height to 0% in CSS to let the page inside iframe
    to measure its content height properly.
    Then we set the modal height to be the same as the content height we received.
    For the modal height adjustment to work the following conditions must be met:
    1. The modal must have the class 'commerce-frame';
    2. The page inside iframe must send a postMessage with the contentHeight (in px, or '100%); */
    adjustModalHeight(data?.contentHeight);
  }
}

export function adjustStyles({ dialog, iframe }) {
  // matches e.g. https://www.adobe.com/mini-plans/photoshop.html?mid=ft&web=1 or https://www.adobe.com/creativecloud/whats-included/plans/*
  const isAutoHeightAdjustment = /\/mini-plans\/.*mid=ft.*web=1/.test(iframe.src) || /\/creativecloud\/whats-included\/plans\//.test(iframe.src);
  if (isAutoHeightAdjustment) {
    dialog.classList.add('height-fit-content');
    // fail safe.
    setTimeout(() => {
      const { height } = window.getComputedStyle(iframe);
      if (height === '0px') {
        iframe.style.height = '100%';
      }
    }, 2000);
  } else {
    iframe.style.height = '100%';
  }
}

export default async function enableCommerceFrameFeatures({ dialog, iframe }) {
  if (!dialog || !iframe) return;
  adjustStyles({ dialog, iframe });
  window.addEventListener('message', reactToMessage);
}
