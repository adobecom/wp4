const AMCV_COOKIE = 'AMCV_9E1005A551ED61CA0A490D45@AdobeOrg';

/**
 * Generates a random UUIDv4 using cryptographically secure random values.
 * This implementation follows the RFC 4122 specification for UUIDv4.
 * It uses the `crypto` API for secure randomness without any bitwise operators.
 *
 * @returns {string} A random UUIDv4 string, e.g., 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
 * where:
 *  - 'x' is any hexadecimal digit (0-9, a-f)
 *  - 'y' is one of 8, 9, A, or B, ensuring that the UUID conforms to version 4.
 *
 * @example
 * const myUuid = generateUUIDv4();
 * console.log(myUuid);  // Outputs: 'e8b57e2f-8cb1-4d0f-804b-e1a45bce2d90'
 */
function generateUUIDv4() {
  // Generate an array of 16 random values using the crypto API for better randomness
  const randomValues = new Uint8Array(16);
  crypto.getRandomValues(randomValues);

  // Set the version (4) at the 13th position
  randomValues[6] = (randomValues[6] % 16) + 64; // '4' for version 4
  // Set the variant (8, 9, A, or B) at the 17th position
  randomValues[8] = (randomValues[8] % 16) + 128; // One of 8, 9, A, or B

  // Accumulate the UUID string in a separate variable (to avoid modifying the parameter directly)
  let uuid = '';

  // Convert the random values to a UUID string (xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
  randomValues.forEach((byte, index) => {
    const hex = byte.toString(16).padStart(2, '0'); // Convert byte to hex
    if (index === 4 || index === 6 || index === 8 || index === 10) {
      uuid += '-'; // Add dashes at appropriate positions
    }
    uuid += hex;
  });

  return uuid;
}

/**
 * Determines the Adobe Target property value based on the page's region.
 *
 * @param {string} env - The environment (e.g., 'prod' for production, 'dev' for development).
 * @returns {string} Adobe Target property value.
 */
function getTargetPropertyBasedOnPageRegion(env) {
  const { pathname } = window.location;

  if (env !== 'prod') return 'bc8dfa27-29cc-625c-22ea-f7ccebfc6231'; // Default for non-prod environments

  // EMEA & LATAM
  if (
    pathname.search(
      /(\/africa\/|\/be_en\/|\/be_fr\/|\/be_nl\/|\/cis_en\/|\/cy_en\/|\/dk\/|\/de\/|\/ee\/|\/es\/|\/fr\/|\/gr_en\/|\/ie\/|\/il_en\/|\/it\/|\/lv\/|\/lu_de\/|\/lu_en\/|\/lu_fr\/|\/hu\/|\/mt\/|\/mena_en\/|\/nl\/|\/no\/|\/pl\/|\/pt\/|\/ro\/|\/ch_de\/|\/si\/|\/sk\/|\/ch_fr\/|\/fi\/|\/se\/|\/ch_it\/|\/tr\/|\/uk\/|\/at\/|\/cz\/|\/bg\/|\/ru\/|\/cis_ru\/|\/ua\/|\/il_he\/|\/mena_ar\/|\/lt\/|\/sa_en\/|\/ae_en\/|\/ae_ar\/|\/sa_ar\/|\/ng\/|\/za\/|\/qa_ar\/|\/eg_en\/|\/eg_ar\/|\/kw_ar\/|\/eg_ar\/|\/qa_en\/|\/kw_en\/|\/gr_el\/|\/br\/|\/cl\/|\/la\/|\/mx\/|\/co\/|\/ar\/|\/pe\/|\/gt\/|\/pr\/|\/ec\/|\/cr\/)/,
    ) !== -1
  ) {
    return '488edf5f-3cbe-f410-0953-8c0c5c323772';
  }
  if ( // APAC
    pathname.search(
      /(\/au\/|\/hk_en\/|\/in\/|\/nz\/|\/sea\/|\/cn\/|\/hk_zh\/|\/tw\/|\/kr\/|\/sg\/|\/th_en\/|\/th_th\/|\/my_en\/|\/my_ms\/|\/ph_en\/|\/ph_fil\/|\/vn_en\/|\/vn_vi\/|\/in_hi\/|\/id_id\/|\/id_en\/)/,
    ) !== -1
  ) {
    return '3de509ee-bbc7-58a3-0851-600d1c2e2918';
  }
  // JP
  if (pathname.indexOf('/jp/') !== -1) {
    return 'ba5bc9e8-8fb4-037a-12c8-682384720007';
  }

  return '4db35ee5-63ad-59f6-cec6-82ef8863b22d'; // Default
}

/**
 * Retrieves device-related information such as screen and viewport dimensions.
 *
 * @returns {Object} Object containing device and viewport information.
 */
function getDeviceInfo() {
  return {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    screenOrientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };
}

/**
 * Retrieves the value of a specific cookie by its key.
 *
 * @param {string} key - The cookie key.
 * @returns {string|null} The cookie value, or null if the cookie doesn't exist.
 */
function getCookie(key) {
  const cookie = document.cookie.split(';')
    .map((x) => decodeURIComponent(x.trim()).split(/=(.*)/s))
    .find(([k]) => k === key);

  return cookie ? cookie[1] : null;
}

/**
 * Sets a cookie with a specified expiration time (default 730 days).
 *
 * @param {string} key - The cookie key.
 * @param {string} value - The cookie value.
 * @param {Object} [options={}] - Optional settings for cookie properties.
 * Defaults to an expiration of 730 days.
 */
function setCookie(key, value, options = {}) {
  // Default expiration (24 months)
  const expires = options.expires || 730;
  const date = new Date();
  date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
  const expiresString = `expires=${date.toUTCString()}`;

  document.cookie = `${key}=${value}; ${expiresString}; path=/`;
}

/**
 * Retrieves the ECID (Experience Cloud ID) from the browser's cookies or
 * generates a new FPID (First Party ID) if the ECID is not found. Returns
 * the ID in a structured object, depending on which ID is available.
 *
 * @returns {Object} An object containing either the ECID or FPID.
 *   - If ECID is found, the object will be:
 *     { ECID: [{ id: string, authenticatedState: string, primary: boolean }] }
 *   - If ECID is not found, the object will be:
 *     { FPID: [{ id: string, authenticatedState: string, primary: boolean }] }
 */
function getOrGenerateUserId() {
  const amcvCookieValue = getCookie(AMCV_COOKIE);

  // If ECID is not found, generate and return FPID
  if (!amcvCookieValue || (amcvCookieValue.indexOf('MCMID|') === -1)) {
    const fpidValue = generateUUIDv4();
    return {
      FPID: [{
        id: fpidValue,
        authenticatedState: 'ambiguous',
        primary: true,
      }],
    };
  }

  return {
    ECID: [{
      id: amcvCookieValue.match(/MCMID\|([^|]+)/)?.[1],
      authenticatedState: 'ambiguous',
      primary: true,
    }],
  };
}

/**
 * Retrieves the page name for analytics, modified for the current locale.
 *
 * @param {Object} params - The parameters.
 * @param {Object} params.locale - The locale object containing
 * language/region info (e.g., { ietf: 'en-US', prefix: 'us' }).
 * @returns {string} The modified page name.
 */
function getPageNameForAnalytics({ locale }) {
  const { host, pathname } = new URL(window.location.href);
  const [modifiedPath] = pathname.split('/').filter((x) => x !== locale.prefix).join(':').split('.');
  return `${host.replace('www.', '')}:${modifiedPath}`;
}

/**
 * Creates the updated context for the request payload for analytics or personalization requests.
 *
 * @param {number} screenWidth - Screen width.
 * @param {number} screenHeight - Screen height.
 * @param {string} screenOrientation - Orientation of the screen.
 * @param {number} viewportWidth - Viewport width.
 * @param {number} viewportHeight - Viewport height.
 * @param {string} localTime - The local time in ISO format.
 * @param {number} timezoneOffset - The timezone offset.
 * @returns {Object} The updated context for the request payload.
 */
function getUpdatedContext({
  screenWidth, screenHeight, screenOrientation,
  viewportWidth, viewportHeight, localTime, timezoneOffset,
}) {
  return {
    device: {
      screenHeight,
      screenWidth,
      screenOrientation,
    },
    environment: {
      type: 'browser',
      browserDetails: {
        viewportWidth,
        viewportHeight,
      },
    },
    placeContext: {
      localTime,
      localTimezoneOffset: timezoneOffset,
    },
  };
}

/**
 * Retrieves specific MarTech cookies by their keys.
 *
 * @returns {Array<Object>} List of MarTech cookies with each
 * object containing 'key' and 'value' properties.
 */
const getMarctechCookies = () => {
  const KNDCTR_COOKIE_KEYS = [
    'kndctr_9E1005A551ED61CA0A490D45_AdobeOrg_identity',
    'kndctr_9E1005A551ED61CA0A490D45_AdobeOrg_cluster',
  ];
  return document.cookie.split(';')
    .map((x) => x.trim().split('='))
    .filter(([key]) => KNDCTR_COOKIE_KEYS.includes(key))
    .map(([key, value]) => ({ key, value }));
};

/**
 * Creates the request payload for Adobe Analytics and Target.
 *
 * @param {Object} params - Parameters required to create the payload.
 * @param {Object} params.updatedContext - The updated context for the request.
 * @param {string} params.pageName - The page name for the analytics request.
 * @param {Object} params.locale - The locale object containing language/region info.
 * @param {string} params.env - The environment (e.g., 'prod' for production).
 * @returns {Object} The request payload for Adobe Analytics and Target.
 */
function createRequestPayload({ updatedContext, pageName, locale, env }) {
  const prevPageName = getCookie('gpv');

  const REPORT_SUITES_ID = env === 'prod' ? ['adbadobenonacdcprod'] : ['adbadobenonacdcqa'];
  const AT_PROPERTY_VAL = getTargetPropertyBasedOnPageRegion(env);

  return {
    event: {
      xdm: {
        ...updatedContext,
        identityMap: getOrGenerateUserId(),
        web: {
          webPageDetails: {
            URL: window.location.href,
            siteSection: 'www.adobe.com',
            server: 'www.adobe.com',
            isErrorPage: false,
            isHomePage: false,
            name: pageName,
            pageViews: { value: 0 },
          },
          webInteraction: {
            name: 'Martech-API',
            type: 'other',
            linkClicks: { value: 1 },
          },
          webReferrer: { URL: document.referrer },
        },
        timestamp: new Date().toISOString(),
        eventType: 'decisioning.propositionFetch',
      },
      data: {
        __adobe: {
          target: {
            is404: false, authState: 'loggedOut', hitType: 'propositionFetch', isMilo: true, adobeLocale: locale.ietf, hasGnav: true,
          },
        },
        _adobe_corpnew: {
          marketingtech: { adobe: { alloy: { approach: 'martech-API' } } },
          digitalData: {
            page: { pageInfo: { language: locale.ietf } },
            diagnostic: { franklin: { implementation: 'milo' } },
            previousPage: { pageInfo: { pageName: prevPageName } },
            primaryUser: { primaryProfile: { profileInfo: { authState: 'loggedOut', returningStatus: 'Repeat' } } },
          },
        },
      },
    },
    query: {
      identity: { fetch: ['ECID'] },
      personalization: {
        schemas: [
          'https://ns.adobe.com/personalization/default-content-item',
          'https://ns.adobe.com/personalization/html-content-item',
          'https://ns.adobe.com/personalization/json-content-item',
          'https://ns.adobe.com/personalization/redirect-item',
          'https://ns.adobe.com/personalization/dom-action',
        ],
        decisionScopes: ['__view__'],
      },
    },
    meta: {
      target: { migration: true },
      configOverrides: {
        com_adobe_analytics: { reportSuites: REPORT_SUITES_ID },
        com_adobe_target: { propertyToken: AT_PROPERTY_VAL },
      },
      state: {
        domain: 'localhost',
        cookiesEnabled: true,
        entries: getMarctechCookies(),
      },
    },
  };
}

/**
 * Extracts the ECID (Experience Cloud ID) from the API response data.
 *
 * @param {Object} data - The response data from the API.
 * @returns {string|null} The ECID value, or null if not found.
 */
function extractECIDFromResp(data) {
  return data.handle
    .flatMap((item) => item.payload)
    .find((p) => p.namespace?.code === 'ECID')?.id || null;
}

/**
 * Updates the AMCV cookie with the new ECID.
 *
 * @param {string} ECID - The Experience Cloud ID (ECID).
 */
function updateAMCVCookie(ECID) {
  const cookieValue = getCookie(AMCV_COOKIE);

  if (!cookieValue) {
    setCookie(encodeURIComponent(AMCV_COOKIE), `MCMID|${ECID}`);
  } else if (cookieValue.indexOf('MCMID|') === -1) {
    setCookie(encodeURIComponent(AMCV_COOKIE), `${cookieValue}|MCMID|${ECID}`);
  }
}

function getUrl() {
  const PAGE_URL = new URL(window.location.href);
  const { host } = window.location;
  const query = PAGE_URL.searchParams.get('env');
  const url = 'https://edge.adobedc.net/ee/v2/interact';

  /* c8 ignore start */
  if (query || host.includes('localhost') || host.includes('.page')
    || host.includes('.live')) {
    return url;
  }

  /* c8 ignore start */
  if (host.includes('stage.adobe')
    || host.includes('corp.adobe')
    || host.includes('graybox.adobe')) {
    return 'https://www.stage.adobe.com/experienceedge/v2/interact';
  }

  const { origin } = window.location;
  return `${origin}/experienceedge/v2/interact`;
}

/**
 * Loads analytics and interaction data based on the user and page context.
 * Sends the data to Adobe Analytics and Adobe Target for personalization.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Object} params.locale - The locale object containing language/region info.
 * @param {string} params.env - The environment (e.g., 'prod' for production).
 * @param {string} [params.calculatedTimeout] - timeout value for the request in milliseconds.
 *
 * @returns {Promise<Object>} A promise that resolves to the
 * personalization propositions fetched from Adobe Target.
 */
export const loadAnalyticsAndInteractionData = async ({ locale, env, calculatedTimeout }) => {
  const value = getCookie('kndctr_9E1005A551ED61CA0A490D45_AdobeOrg_consent');

  if (value === 'general=out') {
    return Promise.reject(new Error('Consent Cookie doesnt allow interact'));
  }

  // Define constants based on environment
  const DATA_STREAM_ID = env === 'prod' ? '5856abb0-95d8-4f9a-bb92-37f99d2bd492' : '87f9b644-5fd3-4015-81d5-f68ad81c3561';
  const TARGET_API_URL = getUrl();

  // Device and viewport information
  const {
    screenWidth, screenHeight,
    screenOrientation, viewportWidth, viewportHeight,
  } = getDeviceInfo();

  // Date and Time Constants
  const CURRENT_DATE = new Date();
  const LOCAL_TIME = CURRENT_DATE.toISOString();
  const LOCAL_TIMEZONE_OFFSET = CURRENT_DATE.getTimezoneOffset();

  const pageName = getPageNameForAnalytics({ locale });

  const updatedContext = getUpdatedContext({
    screenWidth,
    screenHeight,
    screenOrientation,
    viewportWidth,
    viewportHeight,
    LOCAL_TIME,
    LOCAL_TIMEZONE_OFFSET,
  });

  // Prepare the body for the request
  const requestBody = createRequestPayload({
    updatedContext,
    pageName,
    locale,
    env,
  });

  try {
    const targetResp = await Promise.race([
      fetch(`${TARGET_API_URL}?dataStreamId=${DATA_STREAM_ID}&requestId=${generateUUIDv4()}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }),
      new Promise((_, reject) => { setTimeout(() => reject(new Error('Request timed out')), calculatedTimeout); }),
    ]);

    if (!targetResp.ok) {
      throw new Error('Failed to fetch interact call');
    }
    const targetRespJson = await targetResp.json();
    const ECID = extractECIDFromResp(targetRespJson);

    // Update the AMCV cookie with ECID
    updateAMCVCookie(ECID);

    // Resolve or reject based on propositions
    const resultPayload = targetRespJson?.handle?.find((d) => d.type === 'personalization:decisions')?.payload;
    if (resultPayload.length === 0) throw new Error('No propositions found');
    return {
      type: 'propositionFetch',
      result: { propositions: resultPayload },
    };
  } catch (err) {
    throw new Error(err);
  }
};

export default { loadAnalyticsAndInteractionData };
