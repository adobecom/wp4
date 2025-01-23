import { stub } from 'sinon';

export const parseEncodedConfig = stub().returns({
  'field visibility.phone': 'hidden',
  'field filters.job_role': 'all',
  'field filters.functional_area': 'all',
  'field filters.industry': 'all',
  'field filters.products': 'all',
  'field visibility.demo': 'visible',
  'program.copartnernames': '',
  'program.campaignids.external': '',
  'program.campaignids.retouch': '',
  'program.campaignids.onsite': '',
  'program.additional form_id': '',
  'form id': '1723',
  'marketo munckin': '360-KCI-804',
  'marketo host': 'engage.adobe.com',
  'form type': 'marketo_form',
  'form.subtype': 'whitepaper_form',
  'program.campaignids.sfdc': '7011p00000046jUAAQ',
  'program.poi': '',
  title: 'New Title',
  description: 'New Description',
});

export const loadScript = stub().returns(new Promise((resolve) => {
  const forms2Mock = {
    getFormElem: () => ({ get: () => document.querySelector('form') }),
    onValidate: stub(),
    onSuccess: stub(),
    loadForm: stub(),
    whenReady: stub().callsFake((fn) => fn(forms2Mock)),
  };

  window.MktoForms2 = forms2Mock;
  resolve();
}));

export function createTag(tag, attributes, html) {
  const el = document.createElement(tag);
  if (html) {
    if (html instanceof HTMLElement
      || html instanceof SVGElement
      || html instanceof DocumentFragment) {
      el.append(html);
    } else if (Array.isArray(html)) {
      el.append(...html);
    } else {
      el.insertAdjacentHTML('beforeend', html);
    }
  }
  if (attributes) {
    Object.entries(attributes).forEach(([key, val]) => {
      el.setAttribute(key, val);
    });
  }
  return el;
}

export function createIntersectionObserver({ el, callback /* , once = true, options = {} */ }) {
  // fire immediately
  callback(el, { target: el });
}

export const localizeLink = (href) => href;

export const loadLink = stub().returns(new Promise((resolve) => {
  resolve();
}));

export const customFetch = stub();

const PAGE_URL = new URL(window.location.href);
export const SLD = PAGE_URL.hostname.includes('.aem.') ? 'aem' : 'hlx';
export const MILO_EVENTS = { DEFERRED: 'milo:deferred' };

export const getConfig = () => ({ base: '' });
