/* eslint-disable no-promise-executor-return */
/* eslint-disable import/prefer-default-export */
import sinon, { stub } from 'sinon';
import { setViewport } from '@web/test-runner-commands';
import initGnav, { LANGMAP } from '../../../libs/blocks/global-navigation/global-navigation.js';
import { setConfig, loadStyle } from '../../../libs/utils/utils.js';
import defaultPlaceholders from './mocks/placeholders.js';
import defaultProfile from './mocks/profile.js';
import largeMenuMock from './mocks/large-menu.plain.js';
import mockMegaMenu from './mocks/mock-megamenu.plain.js';
import largeMenuActiveMock from './mocks/large-menu-active.plain.js';
import largeMenuWideColumnMock from './mocks/large-menu-wide-column.plain.js';
import largeMenuCrossCloud from './mocks/large-menu-cross-cloud.plain.js';
import globalNavigationMock from './mocks/global-navigation.plain.js';
import correctPromoFragmentMock from './mocks/correctPromoFragment.plain.js';
import { isElementVisible, selectors as keyboardSelectors } from '../../../libs/blocks/global-navigation/utilities/keyboard/utils.js';
import { selectors as baseSelectors, toFragment } from '../../../libs/blocks/global-navigation/utilities/utilities.js';

export { isElementVisible };

export const selectors = {
  ...baseSelectors,
  ...keyboardSelectors,
  brandContainer: '.feds-brand-container',
  brandLabel: '.feds-brand-label',
  brandImage: '.feds-brand-image',
  largeMenu: '.feds-navItem--megaMenu',
  profile: '.feds-profile',
  profileMenu: '.feds-profile-menu',
  signInDropdown: '.feds-signIn-dropdown',
  navItem: '.feds-navItem',
  search: '.feds-search',
  searchDropdown: '.feds-search-dropdown',
  searchResults: '.feds-search-results',
  searchResult: '.feds-search-result',
  searchClear: '.feds-search-clear',
  navWrapper: '.feds-nav-wrapper',
  popupItems: '.feds-menu-items',
  promo: '.feds-promo',
  promoImage: '.feds-promo-image',
  topNavWrapper: '.feds-topnav-wrapper',
  topNav: '.feds-topnav',
  breadcrumbsWrapper: '.feds-breadcrumbs-wrapper',
  mainNav: '.feds-nav',
  imsSignIn: '.feds-signIn',
  crossCloudMenuWrapper: '.feds-crossCloudMenu-wrapper',
  customMobileLink: '.feds-navItem--mobile-only',
};

export const viewports = {
  mobile: { width: 899, height: 1024 },
  smallDesktop: { width: 901, height: 1024 },
  desktop: { width: 1200, height: 1024 },
  wide: { width: 1600, height: 1024 },
};

export const analyticsTestData = {
  'app-switcher|click|app|acrobat': 'AppLauncher.appClick.Acrobat',
  'app-switcher|click|app|acrobat-sign': 'AppLauncher.appClick.Acrobat Sign',
  'app-switcher|click|app|adobe-express': 'AppLauncher.appClick.Adobe Express',
  'app-switcher|click|app|adobe-firefly': 'AppLauncher.appClick.Adobe Firefly',
  'app-switcher|click|app|experience-cloud': 'AppLauncher.appClick.Experience Cloud',
  'app-switcher|click|app|fonts': 'AppLauncher.appClick.Fonts',
  'app-switcher|click|app|lightroom': 'AppLauncher.appClick.Lightroom',
  'app-switcher|click|app|photoshop': 'AppLauncher.appClick.Photoshop',
  'app-switcher|click|app|stock': 'AppLauncher.appClick.Stock',
  'app-switcher|click|footer|adobe-dot-com': 'AppLauncher.adobe.com',
  'app-switcher|click|footer|adobe-home': 'AppLauncher.adobe.com',
  'app-switcher|click|footer|all-apps': 'AppLauncher.allapps',
  'app-switcher|click|footer|see-all-apps': 'AppLauncher.allapps',
  'app-switcher|render|component': 'AppLauncher.appIconToggle',
  'profile|click|account': 'View Account|gnav|milo|unav',
  'profile|click|sign-in': 'Sign In|gnav|milo|unav',
  'profile|click|sign-out': 'Sign Out|gnav|milo|unav',
  'profile|render|component': 'Account|gnav|milo|unav',
  'unc|click|dismiss': 'Dismiss Notifications',
  'unc|click|icon': 'Open Notifications panel',
  'unc|click|link': 'Open Notification',
  'unc|click|markRead': 'Mark Notification as read',
  'unc|click|markUnread': 'Mark Notification as unread',
};

export const unavVersion = '1.4';

export const addMetaDataV2 = (value) => {
  const metaTag = document.createElement('meta');
  metaTag.name = 'mobile-gnav-v2';
  metaTag.content = value;
  return metaTag;
};

export const unavLocalesTestData = Object.entries(LANGMAP).reduce((acc, curr) => {
  const result = [];
  const [locale, prefixes] = curr;
  prefixes.forEach((prefix) => (result.push({
    prefix,
    expectedLocale: `${locale.toLowerCase()}_${prefix.toUpperCase()}`,
  })));
  return [...acc, ...result];
}, [
  { prefix: 'ab_CD', expectedLocale: 'cd_AB' },
  { prefix: 'uk', expectedLocale: 'en_GB' },
  { prefix: 'ab', expectedLocale: 'ab_AB' },
]);

export const loadStyles = (path) => new Promise((resolve) => loadStyle(path, resolve));

export const mockRes = ({ payload, status = 200, ok = true } = {}) => new Promise((resolve) => {
  resolve({
    status,
    ok,
    json: () => payload,
    text: () => payload,
  });
});

export const waitForElement = (selector, parent) => new Promise((resolve, reject) => {
  if (parent.querySelector(selector)) {
    resolve();
    return;
  }

  const timeout = setTimeout(() => reject(new Error(`waitForElement took too long for: ${selector}`)), 1500);

  new MutationObserver((mutationRecords, observer) => {
    clearTimeout(timeout);
    resolve();
    observer.disconnect();
  })
    .observe(parent, { childList: true, subtree: true });
});

const ogFetch = window.fetch;
const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
export const config = {
  imsClientId: 'milo',
  codeRoot: '/libs',
  locales,
};

const defaultBreadcrumbsEl = () => toFragment`
  <div class="breadcrumbs">
    <div>
      <div>
        <ul>
          <li><a href="/drafts/osahin/document">Home</a></li>
          <li><a href="https://milo.adobe.com/">Drafts</a></li>
          <li>Marquee</li>
        </ul>
      </div>
    </div>
  </div>`;

/**
 *
 * @param {Object} param0
 * @param {String} param0.viewport Sets viewport: "mobile" | "smallDesktop" | "desktop"
 * @param {Object} param0.placeholders Supply custom placeholders - mocks/placeholders.js
 * @param {Boolean} param0.signedIn Set to false to simulate a signed out user
 * @param {Object} param0.customConfig Set a custom config; a default one is used if not specified
 * @param {Element} param0.breadcrumbsEl Use a custom breadcrumbs element
 * @param {String} param0.globalNavigation Render a gnav, default mocks/global-navigation.plain.js
 * @description Creates a full global navigation instance. CAUTION: Search is not fully created.
 * @returns global navigation instance
 */
export const createFullGlobalNavigation = async ({
  viewport = 'desktop',
  placeholders,
  signedIn = true,
  customConfig = config,
  breadcrumbsEl = defaultBreadcrumbsEl(),
  globalNavigation,
  hasPromo,
  hasBreadcrumbs = true,
  unavContent = null,
  imsInitialized = false,
} = {}) => {
  const clock = sinon.useFakeTimers({ shouldAdvanceTime: true });
  setConfig({ ...config, ...customConfig });
  await setViewport(viewports[viewport]);
  window.lana = { log: stub() };
  window.fetch = stub().callsFake((url) => {
    if (url.includes('profile')) { return mockRes({ payload: defaultProfile }); }
    if (url.includes('placeholders')) { return mockRes({ payload: placeholders || defaultPlaceholders }); }
    if (url.endsWith('large-menu.plain.html')) { return mockRes({ payload: largeMenuMock }); }
    if (url.endsWith('large-menu-cross-cloud.plain.html')) { return mockRes({ payload: largeMenuCrossCloud }); }
    if (url.endsWith('large-menu-active.plain.html')) { return mockRes({ payload: largeMenuActiveMock }); }
    if (url.endsWith('large-menu-wide-column.plain.html')) { return mockRes({ payload: largeMenuWideColumnMock }); }
    if (url.includes('https://main--federal--adobecom.aem.page')
      && url.endsWith('feds-menu.plain.html')) { return mockRes({ payload: largeMenuMock }); }
    if (url.includes('gnav')) { return mockRes({ payload: globalNavigation || globalNavigationMock }); }
    if (url.includes('correct-promo-fragment')) { return mockRes({ payload: correctPromoFragmentMock }); }
    if (url.includes('wrong-promo-fragment')) { return mockRes({ payload: '<div>Non-promo content</div>' }); }
    if (url.includes('UniversalNav')) { return mockRes({ payload: {} }); }
    if (url.includes('mock-megamenu')) { return mockRes({ payload: mockMegaMenu }); }
    return null;
  });
  window.adobeIMS = {
    initialized: imsInitialized,
    isSignedInUser: stub().returns(signedIn),
    getAccessToken: stub().returns('mock-access-token'),
    getProfile: stub().returns(
      new Promise((resolve) => {
        resolve({
          displayName: 'Mock User',
          email: 'Mock@adobe.com',
        });
      }),
    ),
  };

  const unavMeta = unavContent && toFragment`<meta name="universal-nav" content="${unavContent}">`;
  if (unavContent) document.head.append(unavMeta);

  document.body.replaceChildren(toFragment`
    <header class="global-navigation ${hasBreadcrumbs ? 'has-breadcrumbs' : ''}${hasPromo ? ' has-promo' : ''}" daa-im="true" daa-lh="gnav|milo">
      ${breadcrumbsEl}
    </header>`);

  if (hasPromo) {
    document.body.prepend(toFragment`<div class="feds-promo-aside-wrapper"></div>`);
  }

  await Promise.all([
    loadStyles('../../../../libs/styles/styles.css'),
    loadStyles(
      '../../../../libs/blocks/global-navigation/global-navigation.css',
    ),
  ]);
  const instancePromise = initGnav(document.body.querySelector('header'));
  await clock.runToLastAsync();
  clock.tick(1000);
  const instance = await instancePromise;
  const imsPromise = instance.imsReady();
  await clock.runToLastAsync();
  clock.tick(1000);
  // We restore the clock here, because waitForElement uses setTimeout
  clock.restore();

  // I'm not 100% sure why we need to wait for the large menu, profile
  // the clock.tickAsync should call all the setTimeouts immediately
  // waiting for async elements to actually be on the page
  // reduces flakiness though.
  const waitForElements = [];
  const profile = document.querySelector(selectors.profile);
  const signIn = document.querySelector(selectors.signIn);
  const largeMenu = document.querySelector(selectors.largeMenu);

  if (largeMenu) {
    waitForElements.push(waitForElement(selectors.popup, largeMenu));
  }
  // the sign in button is synchronous
  if (profile && !signIn) {
    waitForElements.push(waitForElement(selectors.profileMenu, profile));
  }

  if (hasBreadcrumbs) {
    waitForElements.push(waitForElement(selectors.breadcrumbsWrapper, document.body));
  }
  await Promise.all(waitForElements);
  await imsPromise;

  window.fetch = ogFetch;
  window.adobeIMS = undefined;
  window.adobeid = undefined;
  if (document.head.contains(unavMeta)) document.head.removeChild(unavMeta);
  return instance;
};
