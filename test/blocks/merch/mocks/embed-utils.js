import { stub } from 'sinon';

let config = {};

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

const PAGE_URL = new URL(window.location.href);
export const SLD = PAGE_URL.hostname.includes('.aem.') ? 'aem' : 'hlx';

export const getConfig = () => config;

export const setConfig = (c) => { config = c; };

export const customFetch = stub();

export const loadArea = stub();

export const loadScript = stub();

export const loadStyle = stub();

export const getMetadata = stub();

export const localizeLink = stub();

export const reloadPage = stub();
