/**
 * Common namespace prefix for CSS classes and DOM event types.
 * @see https://git.corp.adobe.com/wcms/team/discussions/27
 */
export const NAMESPACE = 'merch';
/**
 * This CSS class name is used to:
 * - show only selected offer on a card connected to a subscription panel
 * - TBD
 */
export const CLASS_NAME_HIDDEN = 'hidden';
/**
 * Event type dispatched by the commenrce service whenever it is ready.
 * Should be in sync with `packages/commerce/src/constants.js`.
 */
export const EVENT_TYPE_READY = 'wcms:commerce:ready';
/**
 * Tag name of the commerce service component.
 * Should be in sync with `packages/commerce/src/constants.js`.
 */
export const TAG_NAME_SERVICE = 'mas-commerce-service';

/** Event to dispatch when a merch-offer is ready */
export const EVENT_MERCH_OFFER_READY = 'merch-offer:ready';

/** Event to dispatch when all the offers of a merch-offer-select sont ready */
export const EVENT_MERCH_OFFER_SELECT_READY = 'merch-offer-select:ready';

/** Event to dispatch when a merch-card is ready */
export const EVENT_MERCH_CARD_READY = 'merch-card:ready';

export const EVENT_MERCH_CARD_ACTION_MENU_TOGGLE =
    'merch-card:action-menu-toggle';

export const EVENT_OFFER_SELECTED = 'merch-offer:selected';

export const EVENT_MERCH_STOCK_CHANGE = 'merch-stock:change';

export const EVENT_MERCH_STORAGE_CHANGE = 'merch-storage:change';

export const EVENT_MERCH_QUANTITY_SELECTOR_CHANGE =
    'merch-quantity-selector:change';

export const EVENT_MERCH_SEARCH_CHANGE = 'merch-search:change';

export const EVENT_MERCH_CARD_COLLECTION_SORT = 'merch-card-collection:sort';

export const EVENT_MERCH_CARD_COLLECTION_SHOWMORE =
    'merch-card-collection:showmore';

export const EVENT_MERCH_SIDENAV_SELECT = 'merch-sidenav:select';

export const EVENT_AEM_LOAD = 'aem:load';
export const EVENT_AEM_ERROR = 'aem:error';
export const EVENT_MAS_READY = 'mas:ready';
export const EVENT_MAS_ERROR = 'mas:error';

export const CLASS_NAME_FAILED = 'placeholder-failed';
export const CLASS_NAME_PENDING = 'placeholder-pending';
export const CLASS_NAME_RESOLVED = 'placeholder-resolved';

export const ERROR_MESSAGE_BAD_REQUEST = 'Bad WCS request';
export const ERROR_MESSAGE_OFFER_NOT_FOUND = 'Commerce offer not found';
export const ERROR_MESSAGE_MISSING_LITERALS_URL = 'Literals URL not provided';

export const EVENT_TYPE_FAILED = 'mas:failed';
export const EVENT_TYPE_PENDING = 'mas:pending';
export const EVENT_TYPE_RESOLVED = 'mas:resolved';

export const LOG_NAMESPACE = 'mas/commerce';

export const PARAM_ENV = 'commerce.env';
export const PARAM_LANDSCAPE = 'commerce.landscape';
export const PARAM_AOS_API_KEY = 'commerce.aosKey';
export const PARAM_WCS_API_KEY = 'commerce.wcsKey';

export const WCS_PROD_URL = 'https://www.adobe.com/web_commerce_artifact';
export const WCS_STAGE_URL =
    'https://www.stage.adobe.com/web_commerce_artifact_stage';

export const STATE_FAILED = 'failed';
export const STATE_PENDING = 'pending';
export const STATE_RESOLVED = 'resolved';

export const Landscape = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
};
