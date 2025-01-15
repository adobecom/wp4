import { selectors as baseSelectors } from '../utilities.js';

const selectors = {
  ...baseSelectors,
  globalFooter: '.global-footer',
  mainNavItems:
    '.feds-navItem > a, .feds-navItem > button, .feds-navItem > .feds-cta-wrapper > .feds-cta',
  brand: '.feds-brand',
  mainNavToggle: '.feds-toggle',
  searchTrigger: '.feds-search-trigger',
  navWrapper: '.feds-nav-wrapper',
  navWrapperExpanded: '.feds-nav-wrapper--expanded',
  searchField: '.feds-search-input',
  signIn: '.feds-signIn',
  signInDropdown: '.feds-signIn-dropdown',
  profileButton: '.feds-profile-button, .feds-signIn',
  logo: '.feds-logo',
  profileMenu: '.feds-profile-menu',
  profile: '.feds-profile',
  breadCrumbItems: '.feds-breadcrumbs li > a',
  expandedPopupTrigger: '.feds-navLink[aria-expanded = "true"]',
  promoLink: '.feds-promo-link',
  imagePromo: 'a.feds-promo-image',
  fedsNav: '.feds-nav',
  popup: '.feds-popup',
  headline: '.feds-menu-headline',
  section: '.feds-menu-section',
  column: '.feds-menu-column:not(.feds-menu-column--group)',
  cta: '.feds-cta',
  openSearch: '.feds-search-trigger[aria-expanded = "true"]',
  regionPicker: '.feds-regionPicker',
  socialLink: '.feds-social-link',
  privacyLink: '.feds-footer-privacyLink',
  menuContent: '.feds-menu-content',
  /* mobile redesign popup selectors */
  mainMenuItems: 'header.new-nav section.feds-navItem > button',
  mainMenuLinks: 'header.new-nav .feds-navItem > a[href]',
  activePopup: 'header.new-nav section.feds-dropdown--active > .feds-popup',
  tab: 'button[role="tab"]',
  activeTabpanel: '.tab-content [role="tabpanel"]',
  activeLinks: '.tab-content [role="tabpanel"]:not([hidden="true"]) a',
  stickyCta: 'header.new-nav .feds-popup .sticky-cta a',
  topBarLinks: 'header.new-nav .feds-popup .top-bar a, header.new-nav .feds-popup .top-bar button',
  closeLink: 'header.new-nav .feds-popup .top-bar .close-icon',
  localNav: '.feds-localnav',
  localNavActive: '.feds-localnav--active',
  localNavTitle: '.feds-localnav-title',
  localNavExit: '.feds-localnav-exit',
};

selectors.profileDropdown = `
  ${selectors.signInDropdown} a[href],
  ${selectors.signInDropdown} button:not([disabled]),
  ${selectors.profileMenu} a[href],
  ${selectors.profileMenu} button:not([disabled])
`;

selectors.popupItems = `
  ${selectors.navLink},
  ${selectors.promoLink},
  ${selectors.imagePromo},
  ${selectors.cta},
  ${selectors.regionPicker},
  ${selectors.socialLink},
  ${selectors.privacyLink}
`;

// This method covers focusable elements only, so we aren’t interested in SVGs for example.
const isElementVisible = (elem) => !!(
  elem
    && elem instanceof HTMLElement
    && (elem.offsetWidth && elem.offsetHeight)
    && window.getComputedStyle(elem).getPropertyValue('visibility') !== 'hidden'
);

const getNextVisibleItemPosition = (position, items) => {
  for (let newPosition = position + 1; newPosition < items.length; newPosition += 1) {
    if (isElementVisible(items[newPosition])) return newPosition;
  }
  return -1;
};

const getPreviousVisibleItemPosition = (position, items) => {
  for (let newPosition = position - 1; newPosition >= 0; newPosition -= 1) {
    if (isElementVisible(items[newPosition])) return newPosition;
  }
  return -1;
};

const getOpenPopup = () => document.querySelector(selectors.expandedPopupTrigger)
  ?.parentElement.querySelector(selectors.popup);

export {
  isElementVisible,
  getNextVisibleItemPosition,
  getPreviousVisibleItemPosition,
  selectors,
  getOpenPopup,
};
