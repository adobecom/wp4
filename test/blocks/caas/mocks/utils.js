import { stub } from 'sinon';

export const getConfig = () => ({});

export const loadStyle = stub();

export const loadScript = stub();

export const localizeLink = (e) => e;

export const utf8ToB64 = (str) => window.btoa(unescape(encodeURIComponent(str)));

export const b64ToUtf8 = (str) => decodeURIComponent(escape(window.atob(str)));

export const customFetch = stub();

export function getMetadata(name, doc = document) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = doc.head.querySelector(`meta[${attr}="${name}"]`);
  return meta && meta.content;
}

export function createIntersectionObserver({ el, callback /* , once = true, options = {} */ }) {
  // fire immediately
  callback(el, { target: el });
}

const PAGE_URL = new URL(window.location.href);
export const SLD = PAGE_URL.hostname.includes('.aem.') ? 'aem' : 'hlx';

export const parseEncodedConfig = stub().returns({
  analyticsTrackImpression: false,
  analyticsCollectionName: '',
  andLogicTags: [],
  autoCountryLang: false,
  bookmarkIconSelect: '',
  bookmarkIconUnselect: '',
  cardStyle: 'half-height',
  cardHoverEffect: 'default',
  collectionBtnStyle: 'primary',
  collectionButtonStyle: 'primary',
  container: '1200MaxWidth',
  country: 'caas:country/us',
  contentTypeTags: [],
  disableBanners: false,
  draftDb: false,
  environment: '',
  endpoint: 'www.adobe.com/chimera-api/collection',
  excludedCards: [],
  fallbackEndpoint: '',
  featuredCards: [],
  gutter: '4x',
  headers: [],
  hideCtaIds: [],
  language: 'caas:language/en',
  layoutType: '4up',
  loadMoreBtnStyle: 'primary',
  onlyShowBookmarkedCards: false,
  orLogicTags: [],
  paginationAnimationStyle: 'paged',
  paginationEnabled: false,
  paginationQuantityShown: false,
  paginationUseTheme3: false,
  paginationType: '',
  placeholderUrl: '/my/placeholder.json',
  resultsPerPage: 5,
  searchFields: [],
  setCardBorders: false,
  showBookmarksFilter: false,
  showBookmarksOnCards: false,
  showFilters: false,
  filters: [],
  categories: [],
  secondarySource: '',
  secondaryTags: [],
  showSearch: false,
  showTotalResults: false,
  sortDefault: 'dateDesc',
  sortEnablePopup: false,
  sortEnableRandomSampling: false,
  sortReservoirSample: 3,
  sortReservoirPool: 1000,
  source: ['hawks'],
  targetActivity: '',
  targetEnabled: false,
  theme: 'lightest',
  totalCardsToShow: 10,
  useLightText: false,
  useOverlayLinks: false,
  userInfo: [],
});
