/* eslint-disable compat/compat */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  createContext,
  html,
  render,
  useContext,
  useEffect,
  useReducer,
  useState,
} from '../../deps/htm-preact.js';
import {
  getConfig,
  parseEncodedConfig,
  loadStyle,
} from '../../utils/utils.js';
import Accordion from '../../ui/controls/Accordion.js';
import {
  decodeCompressedString,
  defaultState,
  initCaas,
  isValidHtmlUrl,
  isValidUuid,
  loadCaasFiles,
  loadCaasTags,
  loadStrings,
} from '../caas/utils.js';
import { Input as FormInput, Select as FormSelect } from '../../ui/controls/formControls.js';
import TagSelect from '../../ui/controls/TagSelector.js';
import MultiField from '../../ui/controls/MultiField.js';
import '../../utils/lana.js';

const LS_KEY = 'caasConfiguratorState';

const cloneObj = (obj) => JSON.parse(JSON.stringify(obj));

const updateObj = (obj, defaultObj) => {
  const ds = cloneObj(defaultObj);
  Object.keys(ds).forEach((key) => {
    if (obj[key] === undefined) obj[key] = ds[key];
  });
  return obj;
};

const getHashConfig = async () => {
  const { hash } = window.location;
  if (!hash) return null;
  window.location.hash = '';

  const encodedConfig = hash.startsWith('#') ? hash.substring(1) : hash;
  const config = encodedConfig.startsWith('~~')
    ? await decodeCompressedString(encodedConfig.substring(2))
    : parseEncodedConfig(encodedConfig);
  return config;
};

const caasFilesLoaded = loadCaasFiles();

const ConfiguratorContext = createContext();

const defaultOptions = {
  cardTitleAccessibilityLevel: {
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
  },
  cardStyle: {
    '1:2': '1/2 Card',
    '3:4': '3/4 Card',
    'half-height': '1/2 Height Card',
    'full-card': 'Full Card',
    'double-wide': 'Double Width Card',
    product: 'Product Card',
    'text-card': 'Text Card',
    'icon-card': 'Icon Card',
    'custom-card': 'Custom Card',
  },
  collectionBtnStyle: {
    primary: 'Primary',
    'call-to-action': 'Call To Action',
    link: 'Link',
    dark: 'Dark',
    hidden: 'Hide CTAs',
  },
  container: {
    '1200MaxWidth': '1200px Container',
    '1600MaxWidth': '1600px Container',
    '83Percent': '83% Container',
    '32Margin': '32 Margin Container',
    carousel: 'Carousel',
    categories: 'Product Categories',
  },
  ctaActions: {
    _blank: 'New Tab',
    _self: 'Same Tab',
  },
  draftDb: {
    false: 'Live',
    true: 'Draft',
  },
  endpoints: {
    'www.adobe.com/chimera-api/collection': 'www.adobe.com/chimera-api/collection',
    'business.adobe.com/chimera-api/collection': 'business.adobe.com/chimera-api/collection',
    'www.stage.adobe.com/chimera-api/collection': 'www.stage.adobe.com/chimera-api/collection',
    'business.stage.adobe.com/chimera-api/collection':
      'business.stage.adobe.com/chimera-api/collection',
    '14257-chimera.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection':
      '14257-chimera.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection',
    '14257-chimera-stage.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection':
      '14257-chimera-stage.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection',
    '14257-chimera-dev.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection':
      '14257-chimera-dev.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection',
    '14257-chimera-feature.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection':
      '14257-chimera-feature.adobeioruntime.net/api/v1/web/chimera-0.0.1/collection',
  },
  filterBuildPanel: {
    automatic: 'Automatic',
    custom: 'Custom',
  },
  filterEvent: {
    live: 'Live',
    upcoming: 'Upcoming',
    'on-demand': 'On Demand',
    'not-timed': 'Not Timed',
  },
  filterLocation: {
    left: 'Left',
    top: 'Top',
  },
  filterLogic: {
    or: 'Display cards that match any selected filter (or)',
    and: 'Display cards that match all selected filters (and)',
    xor: 'Get cards that match one filter at a time (xor)',
  },
  gutter: {
    '1x': '8px (1x)',
    '2x': '16px (2x)',
    '3x': '24px (3x)',
    '4x': '32px (4x)',
  },
  intraTagLogicOptions: {
    AND: 'AND',
    OR: 'OR',
  },
  layoutType: {
    '2up': '2up',
    '3up': '3up',
    '4up': '4up',
    '5up': '5up',
  },
  loadMoreBtnStyle: {
    primary: 'Primary',
    'over-background': 'Over Background',
  },
  paginationAnimationStyle: {
    paged: 'Paged',
    incremental: 'Incremental',
  },
  paginationType: {
    paginator: 'Paginator',
    loadMore: 'Load More',
  },
  search: {
    'contentArea.title': 'Card Titles',
    'contentArea.description': 'Card Descriptions',
    'contentArea.detailText': 'Card Details',
    'overlays.label.description': 'Card Labels',
    'overlays.banner.description': 'Banner Descriptions',
  },
  sort: {
    featured: 'Featured',
    dateDesc: 'Date: (Newest to Oldest)',
    dateAsc: 'Date: (Oldest to Newest)',
    modifiedDesc: 'Modified Date: (Newest to Oldest)',
    modifiedAsc: 'Modified Date: (Oldest to Newest)',
    eventSort: 'Events: (Live, Upcoming, OnDemand)',
    titleAsc: 'Title: (A - Z)',
    titleDesc: 'Title: (Z - A)',
    random: 'Random',
  },
  source: {
    bacom: 'Bacom',
    doccloud: 'DocCloud',
    events: 'Events',
    experienceleague: 'Experience League',
    hawks: 'Hawks',
    magento: 'Magento',
    marketo: 'Marketo',
    milo: 'Milo',
    northstar: 'Northstar',
    workfront: 'Workfront',
    'bacom-blog': 'Bacom Blog',
    news: 'Newsroom',
  },
  tagsUrl: 'https://www.adobe.com/chimera-api/tags',
  titleHeadingLevel: {
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
  },
  theme: {
    lightest: 'Lightest Theme',
    light: 'Light Theme',
    dark: 'Dark Theme',
    darkest: 'Darkest Theme',
  },
  detailsTextOption: {
    default: 'Default',
    createdDate: 'Created Date',
    modifiedDate: 'Modified Date',
  },
  cardHoverEffect: {
    default: 'Default',
    grow: 'Grow',
  },
  partialLoadEnabled: {
    true: 'Enabled',
    false: 'Disabled',
  },
};

const getTagList = (root) => Object.entries(root).reduce((options, [, tag]) => {
  options[tag.tagID] = tag.title;
  return options;
}, {});

const getTagTree = (root) => {
  const options = Object.entries(root).reduce((opts, [, tag]) => {
    opts[tag.tagID] = {};

    if (Object.keys(tag.tags).length) {
      opts[tag.tagID].children = getTagTree(tag.tags);
    }

    opts[tag.tagID].label = tag.title;
    opts[tag.tagID].path = tag.path.replace('/content/cq:tags/caas/', '');

    return opts;
  }, {});
  return options;
};

const Select = ({ label, options, prop, sort = false }) => {
  const context = useContext(ConfiguratorContext);

  const onSelectChange = (val) => {
    context.dispatch({
      type: 'SELECT_CHANGE',
      prop,
      value: val,
    });
  };

  return html`
    <${FormSelect}
      label=${label}
      name=${prop}
      sort=${sort}
      onChange=${onSelectChange}
      options=${options}
      value=${context.state[prop]}
    />
  `;
};

const Input = ({
  label, type = 'text', prop, defaultValue = '', title, placeholder,
}) => {
  const context = useContext(ConfiguratorContext);

  const onInputChange = (val, e) => {
    const isCheckbox = type === 'checkbox';
    if (!isCheckbox && defaultValue && !e.target.value) {
      e.target.value = defaultValue;
    }
    context.dispatch({
      type: 'INPUT_CHANGE',
      prop,
      value: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  return html`
    <${FormInput}
      label=${label}
      name=${prop}
      type=${type}
      title=${title}
      onChange=${onInputChange}
      value=${context.state[prop]}
      placeholder=${placeholder}
    />
  `;
};

const DropdownSelect = ({ label, options, prop }) => {
  const { dispatch, state } = useContext(ConfiguratorContext);
  const onChange = (selections) => {
    dispatch({
      type: 'MULTI_SELECT_CHANGE',
      prop,
      value: selections,
    });
  };

  return html`
    <${TagSelect}
      id=${prop}
      options=${options}
      value=${state[prop]}
      label=${label}

      onChange=${onChange}
    />
  `;
};

const BasicsPanel = ({ tagsData }) => {
  const { state } = useContext(ConfiguratorContext);

  if (!tagsData) return '';

  const countryTags = getTagList(tagsData.country.tags);
  const languageTags = getTagList(tagsData.language.tags);

  // Manually correct for Chinese + Greece
  delete languageTags['caas:language/zh-Hans'];
  delete languageTags['caas:language/zh-Hant'];
  languageTags['caas:language/zh'] = 'Chinese';

  if (languageTags['caas:language/indonesian']) {
    languageTags['caas:language/id'] = languageTags['caas:language/indonesian'];
    delete languageTags['caas:language/indonesian'];
  }

  if (countryTags['caas:country/gr_en']) {
    countryTags['caas:country/gr'] = countryTags['caas:country/gr_en'];
    delete countryTags['caas:country/gr_en'];
  }

  const countryLangOptions = html`
    <${Select} options=${countryTags} prop="country" label="Country" sort />
    <${Select} options=${languageTags} prop="language" label="Language" sort />`;

  const partialLoadOptions = html`
    <${Input} label="Partial Load Count" prop="partialLoadCount" type="number" />`;

  return html`
  <${Input} label="Collection Name" placeholder="Only used in the author link" prop="collectionName" type="text" />
  <${Input} label="Collection Title" prop="collectionTitle" type="text" title="Enter a title, {placeholder}, or leave empty "/>
    <${Select} options=${defaultOptions.titleHeadingLevel} prop="titleHeadingLevel" label="Collection Title Level" />
    <${DropdownSelect} options=${defaultOptions.source} prop="source" label="Source" />
    <${Input} label="Results Per Page" prop="resultsPerPage" type="number" />
    <${Input} label="Total Cards to Show" prop="totalCardsToShow" type="number" />
    <${Input} label="Auto detect country & lang" prop="autoCountryLang" type="checkbox" />
    ${!state.autoCountryLang && countryLangOptions}
  <${Input} label="Partial Load Enabled" prop="partialLoadEnabled" options="${defaultOptions.partialLoadEnabled}" type="checkbox"  />
    ${state.partialLoadEnabled && partialLoadOptions}
  `;
};

const UiPanel = () => html`
  <${Input} label="Show Card Borders" prop="setCardBorders" type="checkbox" />
  <${Input} label="Show Footer Dividers" prop="showFooterDivider" type="checkbox" />
  <${Input} label="Disable Card Banners" prop="disableBanners" type="checkbox" />
  <${Input} label="Use Light Text" prop="useLightText" type="checkbox" />
  <${Input} label="Use Overlay Links" prop="useOverlayLinks" type="checkbox" />
  <${Input} label="Show total card count at top" prop="showTotalResults" type="checkbox" />
  <${Input} label="Hide date for on-demand content" prop="hideDateInterval" type="checkbox" />
  <${Input} label="Enable showing card badges (by default hidden)" prop="showCardBadges" type="checkbox" />
  <${Input} label="Show a different CTA for live events" prop="dynamicCTAForLiveEvents" type="checkbox" />
  <${Select} label="Card Style" prop="cardStyle" options=${defaultOptions.cardStyle} />
  <${Select} options=${defaultOptions.cardTitleAccessibilityLevel} prop="cardTitleAccessibilityLevel" label="Card Accessibility Title Level" />
  <${Select} label="Layout" prop="container" options=${defaultOptions.container} />
  <${Select} label="Layout Type" prop="layoutType" options=${defaultOptions.layoutType} />
  <${Select} label="Grid Gap (Gutter)" prop="gutter" options=${defaultOptions.gutter} />
  <${Select} label="Theme" prop="theme" options=${defaultOptions.theme} />
  <${Select} label="Details Text" prop="detailsTextOption" options=${defaultOptions.detailsTextOption} />
  <${Select}
    label="Card Hover Effect"
    prop="cardHoverEffect"
    options=${defaultOptions.cardHoverEffect}
  />
  <${Select}
    label="Collection Button Style"
    prop="collectionBtnStyle"
    options=${defaultOptions.collectionBtnStyle}
  />
  <${Select}
    label="Load More Button Style"
    prop="loadMoreBtnStyle"
    options=${defaultOptions.loadMoreBtnStyle}
  />
  <${Input} label="Custom Card HTML" prop="customCard" type="text" />
  <${Select}
    label="CTA Link Behavior"
    prop="ctaAction"
    options=${defaultOptions.ctaActions}
  />
`;

const TagsPanel = ({ tagsData }) => {
  const context = useContext(ConfiguratorContext);
  if (!tagsData) return '';
  const contentTypeTags = getTagList(tagsData['content-type'].tags);

  const allTags = getTagTree(tagsData);

  const onLogicTagChange = (prop) => (values) => {
    context.dispatch({
      type: 'SELECT_CHANGE',
      prop,
      value: values,
    });
  };

  const secondarySourcePanel = html`
    <${DropdownSelect} options=${defaultOptions.source} prop="secondarySource" label="Secondary Source" />
    <${DropdownSelect} options=${contentTypeTags} prop="secondaryTags" label="Secondary Content Type Tags" />`;

  return html`
    <${DropdownSelect}
      options=${contentTypeTags}
      prop="contentTypeTags"
      label="Content Type Tags"
    />
    <${DropdownSelect} options=${allTags} prop="includeTags" label="Tags to Include" />
    <${DropdownSelect} options=${allTags} prop="excludeTags" label="Tags to Exclude" />
    <label>Complex Queries (Include & Exclude)</label>
    <${MultiField}
      onChange=${onLogicTagChange('andLogicTags')}
      className="andLogicTags"
      values=${context.state.andLogicTags}
      title="AND logic Tags"
      subTitle=""
    >
      <${FormSelect}
        label="Intra Tag Logic"
        name="intraTagLogic"
        options=${defaultOptions.intraTagLogicOptions}
      />
      <${TagSelect} id="andTags" options=${allTags} label="Tags" />
    <//>
    <${MultiField}
      onChange=${onLogicTagChange('orLogicTags')}
      className="orLogicTags"
      values=${context.state.orLogicTags}
      title="OR logic Tags"
      subTitle=""
    >
      <${TagSelect} id="orTags" options=${allTags} label="Tags"
    /><//>
    <${MultiField}
      onChange=${onLogicTagChange('notLogicTags')}
      className="notLogicTags"
      values=${context.state.notLogicTags}
      title="NOT logic Tags"
      subTitle=""
    >
    <${FormSelect}
      label="Intra Tag Logic"
      name="intraTagLogicExclude"
      options=${defaultOptions.intraTagLogicOptions}
    />
    <${TagSelect} id="notTags" options=${allTags} label="Tags"
  /><//>
    <label>Advanced Tag Configurations</label>
    <${Input} label="Use a secondary source for some content types" prop="showSecondarySource" type="checkbox" />
    ${context.state.showSecondarySource && secondarySourcePanel}
  `;
};

const CardsPanel = ({ tagsData }) => {
  const context = useContext(ConfiguratorContext);

  const allTags = getTagTree(tagsData);

  const onChange = (prop) => (values) => {
    context.dispatch({
      type: 'SELECT_CHANGE',
      prop,
      value: values,
    });
  };

  return html`
    <${MultiField}
      onChange=${onChange('featuredCards')}
      className="featuredCards"
      values=${context.state.featuredCards}
      title="Featured Cards"
      subTitle="URLS or UUIDs for featured cards"
    >
      <${FormInput} name="contentId" onValidate=${(value) => isValidHtmlUrl(value) || isValidUuid(value)} />
    <//>
    <${MultiField}
      onChange=${onChange('excludedCards')}
      className="excludedCards"
      values=${context.state.excludedCards}
      title="Excluded Cards"
      subTitle="UUIDs for excluded cards"
    >
      <${FormInput} name="contentId" onValidate=${isValidUuid} />
    <//>
    <${MultiField}
      onChange=${onChange('hideCtaIds')}
      className="hideCtaIds"
      values=${context.state.hideCtaIds}
      title="Hidden CTAs"
      subTitle="UUIDs for cards no CTAs"
    >
      <${FormInput} name="contentId" onValidate${isValidUuid} />
    <//>
    <hr class="divider"/>
    <${DropdownSelect} options=${allTags} prop="hideCtaTags" label="Tags that should hide CTAS" />
  `;
};

const BookmarksPanel = () => html`
  <${Input} label="Show bookmark icon on cards" prop="showBookmarksOnCards" type="checkbox" />
  <${Input} label="Only show bookmarked cards" prop="onlyShowBookmarkedCards" type="checkbox" />
  <${Input}
    label="Show Bookmarks Filter"
    prop="showBookmarksFilter"
    type="checkbox"
  />
  <${Input} label="Icon Link for in 'My Bookmarks'" prop="bookmarkIconSelect" />
  <${Input} label="Icon Link for not in 'My Bookmarks'" prop="bookmarkIconUnselect" />
`;

const SortPanel = () => {
  const { state } = useContext(ConfiguratorContext);

  const RandomSampling = html`
    <${Input} label="Reservoir Sample" prop="sortReservoirSample" type="number" />
    <${Input} label="Reservoir Pool" prop="sortReservoirPool" type="number" />
  `;

  const SortOptions = html`
    <div>Sort options to display:</div>
    <div class="sort-options">
      <${Input} label="Featured Sort" prop="sortFeatured" type="checkbox" />
      <${Input} label="Date: (Newest to Oldest)" prop="sortDateDesc" type="checkbox" />
      <${Input} label="Date: (Oldest to Newest)" prop="sortDateAsc" type="checkbox" />
      <${Input} label="Modified Date: (Oldest to Newest)" prop="sortModifiedAsc" type="checkbox" />
      <${Input} label="Modified Date: (Newest to Oldest)" prop="sortModifiedDesc" type="checkbox" />
      <${Input} label="Events" prop="sortEventSort" type="checkbox" />
      <${Input} label="Title A-Z" prop="sortTitleAsc" type="checkbox" />
      <${Input} label="Title Z-A" prop="sortTitleDesc" type="checkbox" />
      <${Input} label="Random" prop="sortRandom" type="checkbox" />
    </div>

    <${Input} label="Customize Random Sample" prop="sortEnableRandomSampling" type="checkbox" />
    ${state.sortEnableRandomSampling && RandomSampling}
  `;

  return html`
    <${Select} label="Default Sort Order" prop="sortDefault" options=${defaultOptions.sort} />
    <${Input} label="Enable Sort Popup" prop="sortEnablePopup" type="checkbox" />
    ${state.sortEnablePopup && SortOptions}
  `;
};

const FilterPanel = ({ tagsData }) => {
  const context = useContext(ConfiguratorContext);
  const { state } = context;

  const allTags = getTagTree(tagsData);

  const onChange = (prop) => (values) => {
    context.dispatch({
      type: 'SELECT_CHANGE',
      prop,
      value: values,
    });
  };

  const updateEventFilters = (prop) => (selections) => {
    context.dispatch({
      type: 'MULTI_SELECT_CHANGE',
      prop,
      value: selections,
    });
    console.log(prop);
    console.log(selections);
  };

  const FilterOptions = html`
    <${Input} label="Show Empty Filters" prop="filtersShowEmpty" type="checkbox" />
    <${Select} label="Filter Location" prop="filterLocation" options=${defaultOptions.filterLocation} />
    <${Select} label="Filter logic within each tag panel" prop="filterLogic" options=${defaultOptions.filterLogic} />
    <${DropdownSelect} id="filterEvent" options=${defaultOptions.filterEvent} prop="filterEvent" label="Event Filter" />
    <${Select} label="Automatic or Custom Panel" prop="filterBuildPanel" options=${defaultOptions.filterBuildPanel} />
  `;

  const FilterBuildPanel = html`
    <${FilterOptions}>
    <${MultiField}
      onChange=${onChange('filters')}
      className="filters"
      values=${context.state.filters}
      title="Automatic Filters"
      subTitle=""
    >
      <${TagSelect} id="filterTag" options=${allTags} label="Main Tag" singleSelect />
      <${FormInput} label="Opened on load" name="openedOnLoad" type="checkbox" />
      <${FormInput} label="Icon Path" name="icon" />
      <${TagSelect} id="excludeTags" options=${allTags} label="Tags to Exclude" />
    <//>
  `;

  const FilterCustomBuildPanel = html`
    <${FilterOptions}>
    <${MultiField}
      onChange=${onChange('filtersCustom')}
      className="filtersCustom"
      values=${context.state.filtersCustom}
      title="Custom Filters"
      addBtnTitle="New Group"
      subTitle=""
    >
      <${FormInput} label="Group Name" name="group" />

      <!-- nested multifield  -->
      <${MultiField}
        className="filtersCustomItems"
        parentValues=${context.state.filtersCustom}
        title="Filters"
        subTitle=""
        addBtnLabel="+"
        addBtnTitle="New Filter"
        name="filtersCustomItems"
      >
        <${FormInput} label="Filter label" name="filtersCustomLabel"/>
        <${TagSelect} id="customFilterTag" options=${allTags} label="Filter Tag" singleSelect />
      <//>
      <!-- End nested multifield -->

      <${FormInput} label="Opened on load" name="openedOnLoad" type="checkbox" />
    <//>
  `;

  return html`
    <${Input} label="Show Filters" prop="showFilters" type="checkbox" />
    ${state.showFilters
      && (state.filterBuildPanel === 'custom'
        ? FilterCustomBuildPanel
        : FilterBuildPanel)}
  `;
};

const SearchPanel = () => html`
  <${Input} label="Show Search" prop="showSearch" type="checkbox" />
  <${DropdownSelect}
    options=${defaultOptions.search}
    prop="searchFields"
    label="Choose What To Search Through"
  />
`;

const PaginationPanel = () => {
  const { state } = useContext(ConfiguratorContext);
  const paginationOptions = html`
    <${Select}
      label="Load More Button Style"
      prop="loadMoreBtnStyle"
      options=${defaultOptions.loadMoreBtnStyle}
    />
    <${Select}
      label="Pagination Type"
      prop="paginationType"
      options=${defaultOptions.paginationType}
    />
    <${Select}
      label="Carousel Animation Style"
      prop="paginationAnimationStyle"
      options=${defaultOptions.paginationAnimationStyle}
    />
    <${Input} label="Use Theme 3" prop="paginationUseTheme3" type="checkbox" />
  `;

  return html`
    <${Input} label="Enable Pagination" prop="paginationEnabled" type="checkbox" />
    <${Input} label="Show Pagination Quantity" prop="paginationQuantityShown" type="checkbox" />
    ${state.paginationEnabled && paginationOptions}
  `;
};

const TargetPanel = () => html`
    <${Input} label="Target Enabled" prop="targetEnabled" type="checkbox" />
    <${Input} label="Last Viewed Session" prop="lastViewedSession" type="checkbox" />
    <${Input} label="Target Activity" prop="targetActivity" type="text" />
  `;

const AnalyticsPanel = () => html`<${Input} label="Track Impression" prop="analyticsTrackImpression" type="checkbox" />
  <${Input} label="Collection Name" prop="analyticsCollectionName" type="text" />`;

const AdvancedPanel = () => {
  const { dispatch } = useContext(ConfiguratorContext);
  const context = useContext(ConfiguratorContext);
  const onClick = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const onChange = (prop) => (values) => {
    context.dispatch({
      type: 'SELECT_CHANGE',
      prop,
      value: values,
    });
  };

  function getAdditionalQueryParams() {
    if (Array.isArray(context.state.additionalRequestParams)) {
      return context.state.additionalRequestParams;
    }
    return Object.entries(context.state.additionalRequestParams)
      .map(([key, value]) => ({ key, value }));
  }

  return html`
    <button class="resetToDefaultState" onClick=${onClick}>Reset to default state</button>
    <${Input} label="Preview Floodgate Cards" prop="fetchCardsFromFloodgateTree" type="checkbox" />
    <${Input} label="Show IDs (only in the configurator)" prop="showIds" type="checkbox" />
    <${Input} label="Do not lazyload" prop="doNotLazyLoad" type="checkbox" />
    <${Input} label="Collection Size (Defaults: Total Cards)" prop="collectionSize" type="text" />
    <${Select} label="CaaS Endpoint" prop="endpoint" options=${defaultOptions.endpoints} />
    <${Input}
      label="Fallback Endpoint"
      prop="fallbackEndpoint"
      type="text"}
    />
    <${Input} label="Map Text Strings From Word Doc" prop="placeholderUrl" type="text" />
    <${Input} label="Tags Url" prop="tagsUrl" defaultValue=${defaultState.tagsUrl} type="text" />
    <${MultiField}
      onChange=${onChange('additionalRequestParams')}
      className="additionalRequestParams"
      values=${getAdditionalQueryParams()}
      title="Additional Request Params"
      subTitle="Enter a key/value pair you want to include in a card's url."
    >
      <${FormInput} name="key" />
      <${FormInput} name="value" />
    <//>
  `;
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_CHANGE':
    case 'INPUT_CHANGE':
    case 'MULTI_SELECT_CHANGE':
      return { ...state, [action.prop]: action.value };
    case 'RESET_STATE':
      return cloneObj(defaultState);
    case 'SET_STATE':
      return cloneObj(action.value);
    /* c8 ignore next 2 */
    default:
      return state;
  }
};

const getInitialState = async () => {
  let state = await getHashConfig();
  // /* c8 ignore next 2 */
  if (!state) {
    const lsState = localStorage.getItem(LS_KEY);
    // For backwards compatibilty: Check that localStorage state exists
    // and it contains the new filtersCustom attribute before using it
    if (lsState?.includes('filtersCustom')) {
      try {
        state = JSON.parse(lsState);
        /* c8 ignore next */
      // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }

  if (!state) state = {};

  return updateObj(state, defaultState);
};

const saveStateToLocalStorage = (state) => {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
};

/**
 * Removes the JSON key "fetchCardsFromFloodgateTree" from the Copied URL to Caas.
 * Caas Collection will determine if the content should be served from floodgate
 * based on  metadata.xslx logic in caas-libs
 * @param {*} key jsonKey
 * @param {*} value jsonValue
 * @returns replacedJson
 */
const fgKeyReplacer = (key, value) => (key === 'fetchCardsFromFloodgateTree' ? undefined : value);

const getEncodedObject = async (obj, replacer = null) => {
  if (!window.CompressionStream) {
    await import('../../deps/compression-streams-pollyfill.js');
  }

  const objToStream = (data) => new Blob(
    [JSON.stringify(data, replacer)],
    { type: 'text/plain' },
  ).stream();

  const compressStream = async (stream) => new Response(
    // eslint-disable-next-line no-undef
    stream.pipeThrough(new CompressionStream('gzip')),
  );

  const responseToBuffer = async (res) => {
    const blob = await res.blob();
    return blob.arrayBuffer();
  };

  const b64encode = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));

  const stream = objToStream(obj);
  const compressedResponse = await compressStream(stream);
  const buffer = await responseToBuffer(compressedResponse);
  return b64encode(buffer);
};

/* c8 ignore start */
const CopyBtn = () => {
  const { state } = useContext(ConfiguratorContext);
  const [isError, setIsError] = useState();
  const [isSuccess, setIsSuccess] = useState();
  const [configUrl, setConfigUrl] = useState('');
  const [btnText, setBtnText] = useState('Copy');

  const setTempStatus = (setFn, status = true) => {
    setFn(status);
    setTimeout(() => {
      setFn(!status);
    }, 2000);
  };

  const removeDefaultsFromState = (fullState) => {
    const reducedState = {};
    Object.keys(fullState).forEach((key) => {
      if (JSON.stringify(fullState[key]) !== JSON.stringify(defaultState[key])) {
        reducedState[key] = fullState[key];
      }
    });
    return reducedState;
  };

  const getUrl = async () => {
    const url = new URL(window.location.href);
    url.search = '';
    const reducedState = removeDefaultsFromState(state);
    const hashStr = await getEncodedObject(reducedState, fgKeyReplacer);
    // starts with ~~ to differentiate from old hash format
    url.hash = `~~${hashStr}`;
    return url.href;
  };

  const copyConfig = async () => {
    const url = await getUrl();
    setConfigUrl(url);
    if (!navigator?.clipboard) {
      setTempStatus(setIsError);
      return;
    }

    const link = document.createElement('a');
    link.href = url;
    const dateStr = new Date().toLocaleString('us-EN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });
    const collectionName = state.collectionName ? `- ${state.collectionName} ` : '';
    link.textContent = `Content as a Service v3 ${collectionName}- ${dateStr}${state.doNotLazyLoad ? ' (no-lazy)' : ''}`;

    const blob = new Blob([link.outerHTML], { type: 'text/html' });
    const data = [new ClipboardItem({ [blob.type]: blob })];
    navigator.clipboard.write(data).then(
      () => {
        setTempStatus((status) => {
          if (status) {
            setBtnText('OK!');
          } else {
            setBtnText('Copy');
          }
          setIsSuccess(status);
        });
      },
      () => {
        setTempStatus((status) => {
          if (status) {
            setBtnText('Error');
          } else {
            setBtnText('Copy');
          }
          setIsError(status);
        });
      },
    );
  };

  return html` <textarea class=${`copy-text ${(!navigator?.clipboard) ? '' : 'hide'}`}>${configUrl}</textarea>
    <button
      class="copy-config ${isError === true ? 'is-error' : ''} ${isSuccess === true
  ? 'is-success'
  : ''}"
      onClick=${copyConfig}
    >
      ${btnText}
    </button>`;
};
/* c8 ignore stop */
const getPanels = (tagsData) => [
  {
    title: 'Basics',
    content: html`<${BasicsPanel} tagsData=${tagsData} />`,
  },
  {
    title: 'UI',
    content: html`<${UiPanel} />`,
  },
  {
    title: 'Tags',
    content: html`<${TagsPanel} tagsData=${tagsData} />`,
  },
  {
    title: 'Cards',
    content: html`<${CardsPanel} tagsData=${tagsData} />`,
  },
  {
    title: 'Sort',
    content: html`<${SortPanel} />`,
  },
  {
    title: 'Bookmarks',
    content: html`<${BookmarksPanel} />`,
  },
  {
    title: 'Filters',
    content: html`<${FilterPanel} tagsData=${tagsData} />`,
  },
  {
    title: 'Search',
    content: html`<${SearchPanel} />`,
  },
  {
    title: 'Pagination',
    content: html`<${PaginationPanel} />`,
  },
  {
    title: 'Target',
    content: html`<${TargetPanel} />`,
  },
  {
    title: 'Analytics',
    content: html`<${AnalyticsPanel} />`,
  },
  {
    title: 'Advanced',
    content: html`<${AdvancedPanel} />`,
  },
];

/* c8 ignore next 15 */
export const addIdOverlays = () => {
  document.querySelectorAll('.consonant-Card').forEach((card) => {
    if (!card.querySelector('.cardid')) {
      const idBtn = document.createElement('button');
      idBtn.classList.add('cardid');
      idBtn.innerText = card.id;

      idBtn.title = 'Click to copy this ID';

      idBtn.addEventListener('click', (e) => {
        const id = e.target.textContent;
        navigator.clipboard?.writeText(id);
      });
      card.appendChild(idBtn);
    }
  });
};

/* c8 ignore next 7 */
const idOverlayMO = () => {
  const mo = new MutationObserver(() => {
    setTimeout(() => addIdOverlays(), 500);
  });
  mo.observe(document.querySelector('.content-panel'), { attributes: true, childList: true, subtree: true });
  return mo;
};

const Configurator = ({ rootEl }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const [isCaasLoaded, setIsCaasLoaded] = useState(false);
  const [strings, setStrings] = useState();
  const [panels, setPanels] = useState([]);
  const [title] = useState(rootEl.querySelector('h1, h2, h3, h4, h5, h6, p'));
  const [error, setError] = useState();
  const [cardMutationObsv, setCardMutationObsv] = useState(null);

  useEffect(async () => {
    caasFilesLoaded
      .then(() => {
        setIsCaasLoaded(true);
      })
      .catch((e) => {
        /* c8 ignore next 2 */
        // eslint-disable-next-line no-console
        console.log('Error loading script: ', e);
      });
  }, []);

  useEffect(() => {
    const setInitialState = async () => {
      const initialState = await getInitialState();
      dispatch({ type: 'SET_STATE', value: initialState });
    };

    setInitialState();
  }, []);

  useEffect(() => {
    if (state.showIds && !cardMutationObsv) {
      /* c8 ignore next */
      setCardMutationObsv(idOverlayMO());
    } else {
      cardMutationObsv?.disconnect();
      setCardMutationObsv(null);
    }
  }, [state.showIds]);

  useEffect(async () => {
    const strs = await loadStrings(state.placeholderUrl);
    setStrings(strs);
  }, [state.placeholderUrl]);

  useEffect(async () => {
    if (!state.tagsUrl) return;
    const { tags, errorMsg } = await loadCaasTags(state.tagsUrl);
    setPanels(getPanels(tags));
    setError(errorMsg || '');
  }, [state.tagsUrl]);

  useEffect(async () => {
    if (isCaasLoaded && strings !== undefined) {
      await initCaas(state, strings);
      /* c8 ignore next 3 */
      if (state.showIds) {
        setTimeout(() => addIdOverlays(), 500);
      }
      saveStateToLocalStorage(state);
    }
  }, [isCaasLoaded, state, strings]);

  const toogleCollapsed = () => {
    document.body.classList.toggle('panel-collapsed');
  };

  return html`
    <${ConfiguratorContext.Provider} value=${{ state, dispatch }}>
    <div class="tool-header">
      <div class="tool-title">
          ${/* c8 ignore next */''}
          <h1>${title ? title.textContent : 'CaaS Configurator'}</h1>
        </div>
        <${CopyBtn} />
      </div>
      <div class="tool-content ${state.showIds && 'show-ids'}">
        <div class="config-panel">
          ${error && html`<div class="tool-error">${error}</div>`}
          <${Accordion} lskey=caasconfig items=${panels} alwaysOpen=${false} />
        </div>
        <div>
          <button class="collapse-panel" onClick=${() => toogleCollapsed()}>⇆</button>
        </div>
        <div class="content-panel">
          <div class="modalContainer"></div>
          <div id="caas" class="caas-preview"></div>
        </div>
      </div>
    </ConfiguratorContext.Provider>`;
};

const init = async (el) => {
  const { miloLibs, codeRoot } = getConfig();
  loadStyle(`${miloLibs || codeRoot}/ui/page/page.css`);
  loadStyle(`${miloLibs || codeRoot}/blocks/caas/caas.css`);

  const app = html` <${Configurator} rootEl=${el} /> `;

  render(app, el);
};

export {
  // eslint-disable-next-line no-restricted-exports
  init as default,
  cloneObj,
  getHashConfig,
  loadCaasTags,
  updateObj,
};
