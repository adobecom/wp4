import { createTag } from '../../utils/utils.js';

const urlData = {
  urlBranch: '',
  urlRepo: '',
  urlOwner: '',
  urlPathRemainder: '',
  currentPageLang: '',
  referrer: '',
  host: '',
  project: '',
};

/**
 * Extracts language code from URL path
 * @param {string} url - URL to parse
 * @returns {string|null} Language code or null if invalid
 */
const getLanguageCode = (url) => {
  if (!url) return null;

  try {
    const pathSegments = new URL(url).pathname.split('/').filter(Boolean);
    if (pathSegments[0] !== 'langstore') return null;

    const langPattern = /^[a-z]{2,3}(-[A-Za-z]{4})?(-[A-Za-z0-9]{2,3})?$/;
    return langPattern.test(pathSegments[1]) ? pathSegments[1] : null;
  } catch (err) {
    return null;
  }
};

/**
 * Parses URL and sets URL data
 * @param {string} url - URL to parse
 * @param {boolean} allowEmptyPaths - Whether to allow empty paths
 * @returns {Object|null} URL data object or null if invalid
 */
const setUrlData = (url, allowEmptyPaths = false) => {
  if (!url) return null;

  try {
    const urlParts = url.split('--');
    if (urlParts.length !== 3) {
      return null;
    }

    const hlxPageIndex = urlParts[2].indexOf('.hlx.page');
    const aemPageIndex = urlParts[2].indexOf('.aem.page');
    const pageIndex = hlxPageIndex >= 0 ? hlxPageIndex : aemPageIndex;
    const pageType = hlxPageIndex >= 0 ? '.hlx.page' : '.aem.page';

    const pathLengthCheck = allowEmptyPaths ? pageType.length - 1 : pageType.length;
    if (pageIndex < 0 || pageIndex + pathLengthCheck >= urlParts[2].length) {
      return null;
    }

    Object.assign(urlData, {
      urlBranch: urlParts[0].slice(8), // remove "https://"
      urlRepo: urlParts[1],
      urlOwner: urlParts[2].slice(0, pageIndex),
      urlPathRemainder: urlParts[2].slice(pageIndex + pageType.length),
      currentPageLang: getLanguageCode(url),
    });

    return urlData;
  } catch (err) {
    return null;
  }
};

/**
 * Creates and configures radio button element
 * @param {string} value - Radio button value
 * @param {boolean} checked - Whether radio is checked
 * @returns {HTMLElement} Label containing radio button
 */
const createRadioButton = (value, checked = false) => {
  const label = createTag('label');
  const radio = createTag('input', {
    type: 'radio',
    name: 'deployTarget',
    value,
    required: true,
    checked,
  });
  label.appendChild(radio);
  label.appendChild(document.createTextNode(value.charAt(0).toUpperCase() + value.slice(1)));
  return label;
};

/**
 * Builds UI elements
 * @param {HTMLElement} el - Container element
 * @param {string} previewUrl - Preview URL
 */
const buildUi = async (el, previewUrl) => {
  try {
    const modal = createTag('div', { class: 'modal' });
    const radioGroup = createTag('div', { class: 'radio-group' });
    const envLabel = createTag('div', { class: 'env-label' }, 'Environment');
    radioGroup.appendChild(envLabel);

    radioGroup.appendChild(createRadioButton('stage', true));
    radioGroup.appendChild(createRadioButton('prod'));

    const rolloutBtn = createTag('button', { class: 'rollout-btn' });
    rolloutBtn.append(
      createTag('span', { class: 'rollout-btn-text' }, 'Rollout'),
    );

    rolloutBtn.addEventListener('click', () => {
      const selectedEnv = document.querySelector('input[name="deployTarget"]:checked')?.value;
      if (!selectedEnv) return;

      const locV3ConfigUrl = new URL(
        'tools/locui-create',
        `https://${urlData.urlBranch}--${urlData.urlRepo}--${urlData.urlOwner}.hlx.page`,
      );

      const params = {
        milolibs: 'milostudio-stage',
        ref: urlData.urlBranch,
        repo: urlData.urlRepo,
        owner: urlData.urlOwner,
        host: urlData.host,
        project: urlData.project,
        env: selectedEnv,
        type: 'rollout',
        encodedUrls: previewUrl,
        language: urlData.currentPageLang,
      };

      Object.entries(params).forEach(([key, value]) => {
        if (value) locV3ConfigUrl.searchParams.append(key, value);
      });

      window.open(locV3ConfigUrl, '_blank');
    });

    const buttonGroup = createTag('div', { class: 'button-group' });
    modal.appendChild(radioGroup);
    buttonGroup.appendChild(rolloutBtn);
    modal.appendChild(buttonGroup);

    el.appendChild(modal);
  } catch (err) {
    el.innerHTML = '<div class="modal">Error building interface</div>';
  }
};

/**
 * Sets up the rollout interface
 * @param {HTMLElement} el - Container element
 * @param {string} previewUrl - Preview URL
 */
const setup = async (el, previewUrl) => {
  if (!el || !previewUrl) return;

  const data = setUrlData(previewUrl, true);
  if (!data) {
    el.innerHTML = '<div class="modal">Invalid URL format</div>';
    return;
  }
  el.innerHTML = '';
  await buildUi(el, previewUrl);
};

/**
 * Initializes the rollout tool
 * @param {HTMLElement} el - Container element
 * @param {string} search - Search params string
 * @returns {Promise<boolean>} Success status
 */
export default async function init(el, search = window.location.search) {
  if (!el) return false;

  try {
    const params = new URLSearchParams(search);
    const referrer = params?.get('referrer')?.trim();
    const host = params?.get('host')?.trim();
    const project = params?.get('project')?.trim();

    if (!referrer || !host || !project) {
      el.innerHTML = '<div class="modal">Missing required parameters</div>';
      return false;
    }

    if (!referrer.includes('/langstore/')) {
      el.innerHTML = '<div class="modal warning"><div class="warning-icon"></div><div class="warning-text">This page is not eligible for rollout<br><span class="warning-text-sub">Only pages under /langstore/ are eligible for rollout</span></div></div>';
      return false;
    }

    Object.assign(urlData, { referrer, host, project });
    await setup(el, referrer);
    return true;
  } catch (err) {
    el.innerHTML = '<div class="modal">Initialization failed</div>';
    return false;
  }
}
