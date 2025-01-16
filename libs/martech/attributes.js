import { getMetadata } from '../utils/utils.js';

const INVALID_CHARACTERS = /[^\u00C0-\u1FFF\u2C00-\uD7FF\w]+/g;
const LEAD_UNDERSCORES = /^_+|_+$/g;

export function processTrackingLabels(text, config, charLimit) {
  let analyticsValue = text?.replace(INVALID_CHARACTERS, ' ').replace(LEAD_UNDERSCORES, '').trim();
  if (config) {
    const { analyticLocalization, mep } = config;
    const mepLoc = mep?.analyticLocalization?.[analyticsValue];
    if (mepLoc) {
      analyticsValue = mepLoc;
    } else {
      const loc = analyticLocalization?.[analyticsValue];
      if (loc) analyticsValue = loc;
    }
  }
  if (charLimit) return analyticsValue.slice(0, charLimit);
  return analyticsValue;
}

function getHeaderCharLimit(str) {
  const defaultLimit = 20;
  if (!str) return defaultLimit;
  if (str === 'off') return false;
  if (!Number.isNaN(Number(str))) return parseInt(str, 10);
  return defaultLimit;
}
export function decorateDefaultLinkAnalytics(block, config) {
  if (block.classList.length
    && !block.className.includes('metadata')
    && !block.classList.contains('link-block')
    && !block.classList.contains('section')
    && block.nodeName === 'DIV') {
    let header = '';
    let linkCount = 1;

    const headerCharLimit = getHeaderCharLimit(getMetadata('analytics-header-limit'));
    const headerSelector = 'h1, h2, h3, h4, h5, h6';
    let analyticsSelector = `${headerSelector}, .tracking-header`;
    const headers = block.querySelectorAll(analyticsSelector);
    if (!headers.length) analyticsSelector = `${analyticsSelector}, b, strong`;
    block.querySelectorAll(`${analyticsSelector}, a:not(.video.link-block, .no-track), button:not(.no-track)`).forEach((item) => {
      if (item.nodeName === 'A' || item.nodeName === 'BUTTON') {
        if (item.classList.contains('tracking-header')) {
          header = processTrackingLabels(item.textContent, config, headerCharLimit);
        } else if (!header) {
          const section = block.closest('.section');
          if (section?.className.includes('-up') || section?.classList.contains('milo-card-section')) {
            const previousHeader = section?.previousElementSibling?.querySelector(headerSelector);
            if (previousHeader) {
              header = processTrackingLabels(previousHeader.textContent, config, headerCharLimit);
            }
          }
        }
        if (item.hasAttribute('daa-ll')) {
          const labelArray = item.getAttribute('daa-ll').split('-').map((part) => {
            if (part === '') return '';
            return processTrackingLabels(part, config, 20);
          });
          item.setAttribute('daa-ll', labelArray.join('-'));
        } else {
          let label = item.textContent?.trim();
          if (label === '') {
            label = item.getAttribute('title')
                || item.getAttribute('aria-label')
                || item.querySelector('img')?.getAttribute('alt')
                || 'no label';
          }
          label = processTrackingLabels(label, config, 20);
          item.setAttribute('daa-ll', `${label}-${linkCount}--${header}`);
        }
        linkCount += 1;
      } else {
        if (item.nodeName === 'STRONG' || item.nodeName === 'B') {
          item.classList.add('tracking-header');
        }
        header = processTrackingLabels(item.textContent, config, headerCharLimit);
      }
    });
  }
}

export async function decorateSectionAnalytics(section, idx, config) {
  const id = Number.isInteger(idx) ? `s${idx + 1}` : idx;
  document.querySelector('main')?.setAttribute('daa-im', 'true');
  section.setAttribute('daa-lh', id);
  section.querySelectorAll('[data-block]:has([data-block])').forEach((block) => {
    block.removeAttribute('data-block');
  });
  const mepMartech = config?.mep?.martech || '';
  section.querySelectorAll('[data-block]').forEach((block, blockIdx) => {
    const lhAtt = block.getAttribute('daa-lh');
    if (lhAtt) {
      block.setAttribute('daa-lh', `${lhAtt}${mepMartech}`);
    } else {
      const blockName = block.classList[0] || '';
      let closest = block;
      let nestedLH = '';
      while (closest) {
        closest = closest.parentNode?.closest('[data-nested-lh]');
        if (closest) {
          nestedLH = `${closest.getAttribute('data-nested-lh')}--${nestedLH}`;
        }
      }
      block.setAttribute('daa-lh', `b${blockIdx + 1}|${nestedLH}${blockName.slice(0, 15)}${mepMartech}`);
      decorateDefaultLinkAnalytics(block, config);
    }
    block.removeAttribute('data-block');
  });
}

// below functions are being sunset
export function decorateBlockAnalytics() { return false; }
export function decorateLinkAnalytics() { return false; }

const RE_ALPHANUM = /[^0-9a-z]/gi;
const RE_TRIM_UNDERSCORE = /^_+|_+$/g;
export const analyticsGetLabel = (txt) => txt.replaceAll('&', 'and')
  .replace(RE_ALPHANUM, '_')
  .replace(RE_TRIM_UNDERSCORE, '');

export const analyticsDecorateList = (li, idx) => {
  const link = li.firstChild?.nodeName === 'A' && li.firstChild;
  if (!link) return;

  const label = link.textContent || link.getAttribute('aria-label');
  if (!label) return;

  link.setAttribute('daa-ll', `${analyticsGetLabel(label)}-${idx + 1}`);
};
