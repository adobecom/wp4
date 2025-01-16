import { createTag, getConfig } from '../../utils/utils.js';
import { handleStyle } from '../section-metadata/section-metadata.js';
import { getNormalizedMetadata, getLocalizedURL } from '../quiz/utils.js';
import { decorateSectionAnalytics } from '../../martech/attributes.js';

export const LOADING_ERROR = 'Could not load quiz results:';

async function loadFragments(el, experiences) {
  const { default: createFragment } = await import('../fragment/fragment.js');
  // eslint-disable-next-line no-restricted-syntax
  for (const href of experiences) {
    /* eslint-disable no-await-in-loop */
    const a = createTag('a', { href });
    el.append(a);
    await createFragment(a);
  }
  document.querySelectorAll('main > div, .quiz-results').forEach((quiz) => quiz.removeAttribute('daa-lh'));
  document.querySelectorAll('.quiz-results.basic > .fragment > .section').forEach((section, idx) => decorateSectionAnalytics(section, idx, getConfig()));
  if (el.getAttribute('role') === 'list') document.querySelectorAll('.nested[role=list] > .fragment').forEach((fragment) => fragment.setAttribute('role', 'listitem'));
}

function redirectPage(quizUrl, debug, message) {
  const url = quizUrl ? getLocalizedURL(quizUrl.text) : 'https://adobe.com';
  window.lana.log(message, { tags: 'quiz-results' });

  if (debug === 'quiz-results') {
    // eslint-disable-next-line no-console
    console.log(`${message}, redirecting to: ${url}`);
  } else {
    window.location = url;
  }
}

function setAnalytics(hashValue, debug) {
  /* eslint-disable no-underscore-dangle */
  window.alloy_load ??= {};
  window.alloy_load.data ??= {};
  window.alloy_all ??= {};
  window.alloy_all.data ??= {};
  window.alloy_all.data._adobe_corpnew ??= {};
  window.alloy_all.data._adobe_corpnew.digitalData ??= {};
  window.alloy_all.data._adobe_corpnew.digitalData.page ??= {};
  window.alloy_all.data._adobe_corpnew.digitalData.page.pageInfo ??= {};
  window.alloy_all.data._adobe_corpnew.digitalData.page.pageInfo.customHash = hashValue;
  if (debug === 'quiz-results') {
    // eslint-disable-next-line no-console
    console.log('Setting a custom hash for pageload to: ', hashValue);
  }
}

export default async function init(el, debug = null, localStoreKey = null) {
  const data = getNormalizedMetadata(el);
  const params = new URL(document.location).searchParams;
  const quizUrl = data.quizurl;
  const BASIC_KEY = 'basicFragments';
  const NESTED_KEY = 'nestedFragments';
  const HASH_KEY = 'pageloadHash';

  /* eslint-disable no-param-reassign */
  // handle these two query param values in this way to facilitate unit tests
  localStoreKey ??= params.get('quizkey');

  const { locale } = getConfig();
  localStoreKey = locale?.ietf ? `${localStoreKey}-${locale.ietf}` : localStoreKey;

  debug ??= params.get('debug');

  el.replaceChildren();

  let results = localStorage.getItem(localStoreKey);
  if (!results) {
    redirectPage(quizUrl, debug, `${LOADING_ERROR} local storage missing`);
    return;
  }

  try {
    results = JSON.parse(results);
  } catch (e) {
    redirectPage(quizUrl, debug, `${LOADING_ERROR} invalid JSON in local storage`);
    return;
  }

  if (data.nestedfragments && el.classList.contains('nested')) {
    const nested = results[NESTED_KEY][data.nestedfragments.text];
    if (nested) loadFragments(el, nested);
  } else if (el.classList.contains('basic')) {
    const basic = results[BASIC_KEY];
    const pageloadHash = results[HASH_KEY];

    if (!basic || basic.length === 0) {
      redirectPage(quizUrl, debug, `${LOADING_ERROR} Basic fragments are missing`);
      return;
    }

    if (pageloadHash) {
      setAnalytics(pageloadHash, debug);
    }

    loadFragments(el, basic);
  } else {
    window.lana.log(`${LOADING_ERROR} The quiz-results block is misconfigured`, { tags: 'quiz-results' });
    return;
  }

  if (data.style) {
    el.classList.add('section');
    handleStyle(data.style.text, el);
  }
  el.classList.add('show');
}
