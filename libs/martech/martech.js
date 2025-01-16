import {
  getConfig, loadIms, loadLink, loadScript, getMepEnablement, getMetadata,
} from '../utils/utils.js';

const ALLOY_SEND_EVENT = 'alloy_sendEvent';
const ALLOY_SEND_EVENT_ERROR = 'alloy_sendEvent_error';
const ENTITLEMENT_TIMEOUT = 3000;

const TARGET_TIMEOUT_MS = 4000;
const params = new URL(window.location.href).searchParams;
const timeout = parseInt(params.get('target-timeout'), 10)
  || parseInt(getMetadata('target-timeout'), 10)
  || TARGET_TIMEOUT_MS;

const setDeep = (obj, path, value) => {
  const pathArr = path.split('.');
  let currentObj = obj;

  for (const key of pathArr.slice(0, -1)) {
    if (!currentObj[key] || typeof currentObj[key] !== 'object') {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  }

  currentObj[pathArr[pathArr.length - 1]] = value;
};

// eslint-disable-next-line max-len
const waitForEventOrTimeout = (eventName, timeoutLocal, returnValIfTimeout) => new Promise((resolve) => {
  const listener = (event) => {
    // eslint-disable-next-line no-use-before-define
    clearTimeout(timer);
    resolve(event.detail);
  };

  const errorListener = () => {
    // eslint-disable-next-line no-use-before-define
    clearTimeout(timer);
    resolve({ error: true });
  };

  const timer = setTimeout(() => {
    window.removeEventListener(eventName, listener);
    if (returnValIfTimeout !== undefined) {
      resolve(returnValIfTimeout);
    } else {
      resolve({ timeout: true });
    }
  }, timeoutLocal);

  window.addEventListener(eventName, listener, { once: true });
  window.addEventListener(ALLOY_SEND_EVENT_ERROR, errorListener, { once: true });
});

function roundToQuarter(num) {
  return Math.ceil(num / 250) / 4;
}

function calculateResponseTime(responseStart) {
  const responseTime = Date.now() - responseStart;
  return roundToQuarter(responseTime);
}

export const getTargetPersonalization = async (
  { handleAlloyResponse, sendTargetResponseAnalytics },
) => {
  const responseStart = Date.now();
  window.addEventListener(ALLOY_SEND_EVENT, () => {
    const responseTime = calculateResponseTime(responseStart);
    try {
      window.lana.log(`target response time: ${responseTime}`, { tags: 'martech', errorType: 'i' });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error logging target response time:', e);
    }
  }, { once: true });

  let targetManifests = [];
  let targetPropositions = [];

  const response = await waitForEventOrTimeout(ALLOY_SEND_EVENT, timeout);
  if (response.error) {
    try {
      window.lana.log('target response time: ad blocker', { tags: 'martech', errorType: 'i' });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error logging target response time for ad blocker:', e);
    }
    return { targetManifests, targetPropositions };
  }
  if (response.timeout) {
    waitForEventOrTimeout(ALLOY_SEND_EVENT, 5100 - timeout)
      .then(() => sendTargetResponseAnalytics(true, responseStart, timeout));
  } else {
    sendTargetResponseAnalytics(false, responseStart, timeout);
    targetManifests = handleAlloyResponse(response.result);
    targetPropositions = response.result?.propositions || [];
  }

  return { targetManifests, targetPropositions };
};

const setupEntitlementCallback = () => {
  const setEntitlements = async (destinations) => {
    const { getEntitlements } = await import('../features/personalization/personalization.js');
    return getEntitlements(destinations);
  };

  const getEntitlements = (resolve) => {
    const handleEntitlements = (detail) => {
      if (detail?.result?.destinations?.length) {
        resolve(setEntitlements(detail.result.destinations));
      } else {
        resolve([]);
      }
    };
    waitForEventOrTimeout(ALLOY_SEND_EVENT, ENTITLEMENT_TIMEOUT, [])
      .then(handleEntitlements)
      .catch(() => resolve([]));
  };

  const { miloLibs, codeRoot, entitlements: resolveEnt } = getConfig();
  getEntitlements(resolveEnt);

  loadLink(
    `${miloLibs || codeRoot}/features/personalization/personalization.js`,
    { as: 'script', rel: 'modulepreload' },
  );
};

function isProxied() {
  return /^(www|milo|business|blog|news)(\.stage)?\.adobe\.com$/.test(window.location.hostname);
}

let filesLoadedPromise = false;
const loadMartechFiles = async (config) => {
  if (filesLoadedPromise) return filesLoadedPromise;

  filesLoadedPromise = async () => {
    if (getMepEnablement('xlg') === 'loggedout') {
      setupEntitlementCallback();
    } else {
      loadIms()
        .then(() => {
          if (window.adobeIMS.isSignedInUser()) setupEntitlementCallback();
        })
        .catch(() => { });
    }

    setDeep(
      window,
      'alloy_all.data._adobe_corpnew.digitalData.page.pageInfo.language',
      { locale: config.locale.prefix.replace('/', ''), langCode: config.locale.ietf },
    );
    setDeep(window, 'digitalData.diagnostic.franklin.implementation', 'milo');

    const launchUrl = config.env.consumer?.marTechUrl || (
      isProxied()
        ? '/marketingtech'
        : 'https://assets.adobedtm.com'
    ) + (
      config.env.name === 'prod'
        ? '/d4d114c60e50/a0e989131fd5/launch-5dd5dd2177e6.min.js'
        : '/d4d114c60e50/a0e989131fd5/launch-2c94beadc94f-development.min.js'
    );
    loadLink(launchUrl, { as: 'script', rel: 'preload' });

    window.marketingtech = {
      adobe: {
        launch: {
          url: launchUrl,
          controlPageLoad: true,
        },
        alloy: {
          edgeConfigId: config.env.consumer?.edgeConfigId || config.env.edgeConfigId,
          edgeDomain: (
            isProxied()
              ? window.location.hostname
              : 'sstats.adobe.com'
          ),
          edgeBasePath: (
            isProxied()
              ? 'experienceedge'
              : 'ee'
          ),
        },
        target: false,
      },
      milo: true,
    };
    window.edgeConfigId = config.env.edgeConfigId;

    await loadScript((
      isProxied()
        ? ''
        : 'https://www.adobe.com'
    ) + (
      config.env.name === 'prod'
        ? '/marketingtech/main.standard.min.js'
        : '/marketingtech/main.standard.qa.min.js'
    ));
    // eslint-disable-next-line no-underscore-dangle
    window._satellite.track('pageload');
  };

  await filesLoadedPromise();
  return filesLoadedPromise;
};

export default async function init() {
  const config = getConfig();
  const martechPromise = loadMartechFiles(config);
  return martechPromise;
}
