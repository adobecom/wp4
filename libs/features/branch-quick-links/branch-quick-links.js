import { getMetadata, loadStyle, getConfig, createTag } from '../../utils/utils.js';

function addLoader(elem, text) {
  const { base } = getConfig();
  loadStyle(`${base}/features/branch-quick-links/branch-quick-links.css`);
  const lbl = createTag('div', { class: 'pbar-label' });
  lbl.textContent = text;
  const tr = createTag('div', { class: 'pbar-value' });
  tr.style.display = 'block';
  const pb = createTag('div', { class: 'pbar' }, tr);
  pb.style.width = '100%';
  pb.style.height = '10px';
  pb.style.borderRadius = '5px';
  pb.style.backgroundColor = '#D5D5D5';
  pb.style.marginTop = '10px';
  pb.style.overflow = 'hidden';
  const container = createTag('div', { class: 'pbar-container' }, [lbl, pb]);
  elem.replaceWith(container);
  return container;
}

function removeLoader(elem, a) {
  elem.replaceWith(a);
}

async function decorateQuickLink(a, hasConsent) {
  if (!window.alloy) return;
  let ecid = null;
  try {
    const data = await window.alloy('getIdentity');
    ecid = data?.identity?.ECID;
  } catch (e) {
    window.lana.log(`Error fetching ECID: ${e}`, { tags: 'branch-quick-links' });
  }
  if (hasConsent && !a.href.includes('ecid')) {
    a.href = a.href.concat(`?ecid=${ecid}`);
  }
  window.location.href = a.href;
}

export default function processQL(a) {
  a.classList.add('quick-link');
  const isLoader = getMetadata('quick-link-loader');
  const loaderText = getMetadata('quick-link-loader-text');

  const getConsentStatus = () => {
    const cookieGrp = window.adobePrivacy?.activeCookieGroups();
    return cookieGrp?.includes('C0002') && cookieGrp?.includes('C0004');
  };

  function waitForConsent() {
    return new Promise((resolve) => {
      const fallbackTimeout = setTimeout(() => resolve(false), 30000);
      if (window.adobePrivacy) {
        clearTimeout(fallbackTimeout);
        resolve(getConsentStatus());
      }
      window.addEventListener('adobePrivacy:PrivacyConsent', () => {
        clearTimeout(fallbackTimeout);
        resolve(true);
      });
      window.addEventListener('adobePrivacy:PrivacyReject', () => {
        clearTimeout(fallbackTimeout);
        resolve(false);
      });
      window.addEventListener('adobePrivacy:PrivacyCustom', () => {
        clearTimeout(fallbackTimeout);
        resolve(getConsentStatus());
      });
    });
  }

  a.addEventListener('click', async (e) => {
    e.preventDefault();
    let pb;
    if (isLoader === 'on') pb = addLoader(a, loaderText);
    const hasConsent = await waitForConsent();
    if (pb) removeLoader(pb, a);
    decorateQuickLink(a, hasConsent);
  });
}
