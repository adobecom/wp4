const LANA_CLIENT_ID = 'pageperf';

let lanaSent;

function sendToLana(lanaData) {
  if (lanaSent) return;
  const ua = window.navigator.userAgent;

  Object.assign(lanaData, {
    chromeVer: ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)?.[1] || '',
    country: sessionStorage.getItem('akamai') || '',
    // eslint-disable-next-line compat/compat
    downlink: window.navigator?.connection?.downlink || '',
    loggedIn: window.adobeIMS?.isSignedInUser() || false,
    os: (ua.match(/Windows/) && 'win')
      || (ua.match(/Mac/) && 'mac')
      || (ua.match(/Android/) && 'android')
      || (ua.match(/Linux/) && 'linux')
      || '',
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    url: `${window.location.host}${window.location.pathname}`,
  });

  lanaData.cls ||= 0;
  const lanaDataStr = Object.entries(lanaData)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  window.lana.log(lanaDataStr, {
    clientId: LANA_CLIENT_ID,
    sampleRate: 100,
  });

  lanaSent = true;
}

function observeCLS(lanaData) {
  let cls = 0;
  /* c8 ignore start */
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) cls += entry.value;
    }
    lanaData.cls = cls.toPrecision(4);
  }).observe({ type: 'layout-shift', buffered: true });
}

function getElementInfo(el) {
  const elSrc = el.src || el.currentSrc || el.href || el.poster;
  if (elSrc) {
    try {
      const srcUrl = new URL(elSrc);
      return srcUrl.origin === window.location.origin ? srcUrl.pathname : srcUrl.href;
    } catch {
      // fall through
    }
  }
  const elHtml = el.outerHTML.replaceAll(',', '');
  if (elHtml.length <= 100) return elHtml;
  return `${el.outerHTML.substring(0, 100)}...`;
}

function isFragmentFromMep(fragPath, mep) {
  return mep.experiments?.some(({ selectedVariant }) => {
    const { commands = [], fragments = [] } = selectedVariant || {};

    return commands.some((cmd) => {
      try {
        return new URL(cmd.target).pathname === fragPath;
      } catch {
        return false;
      }
    }) || fragments.some((cmd) => cmd?.val === fragPath);
  });
}

const boolStr = (val) => `${!!val}`;

function observeLCP(lanaData, delay, mep) {
  const sectionOne = document.querySelector('main > div');
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1]; // Use the latest LCP candidate
    lanaData.lcp = parseInt(lastEntry.startTime, 10);
    const lcpEl = lastEntry.element;
    lanaData.lcpElType = lcpEl.nodeName.toLowerCase();
    lanaData.lcpEl = getElementInfo(lcpEl);
    lanaData.lcpSectionOne = boolStr(sectionOne.contains(lcpEl));
    const closestFrag = lcpEl.closest('.fragment');
    lanaData.isFrag = boolStr(closestFrag);
    if (closestFrag) {
      lanaData.isMep = boolStr(isFragmentFromMep(closestFrag.dataset.path, mep));
    } else {
      lanaData.isMep = 'false';
    }

    setTimeout(() => {
      sendToLana(lanaData);
    }, parseInt(delay, 10));
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  /* c8 ignore stop */
}

function logMepExperiments(lanaData, mep) {
  mep?.experiments?.forEach((exp, idx) => {
    // only log manifests that affect the page
    if (exp.selectedVariantName === 'default') return;
    lanaData[`manifest${idx + 1}path`] = exp.manifestPath;
    lanaData[`manifest${idx + 1}selected`] = exp.selectedVariantName;
  });
}

export default function webVitals(mep, { delay = 1000, sampleRate = 50 } = {}) {
  const isChrome = () => {
    const nav = window.navigator;
    return nav.userAgent.includes('Chrome') && nav.vendor.includes('Google');
  };
  if (!isChrome() || Math.random() * 100 > sampleRate) return;
  const getConsent = () => window.adobePrivacy?.activeCookieGroups().indexOf('C0002') !== -1;
  function handleEvent() {
    if (!getConsent()) return;
    const lanaData = {};
    logMepExperiments(lanaData, mep);
    observeCLS(lanaData);
    observeLCP(lanaData, delay, mep);
  }
  if (getConsent()) {
    handleEvent();
    return;
  }
  window.addEventListener('adobePrivacy:PrivacyConsent', handleEvent, { once: true });
  window.addEventListener('adobePrivacy:PrivacyCustom', handleEvent, { once: true });
}
