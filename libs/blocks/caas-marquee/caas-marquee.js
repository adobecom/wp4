/* eslint-disable no-shadow, consistent-return, max-len, quote-props, prefer-const */
import { createTag, getConfig, loadMartech, SLD } from '../../utils/utils.js';

const SEGMENTS_MAP = {
  attributes: {
    'acrobat': ['pdf', 'convert document', 'reader'],
    'adobecom': ['news', 'community', 'plan'],
    'apro-cart-abandoner': ['abandon'],
    'business': ['analytics', 'solution', 'adobe experience manager'],
    'cc-lapsed': ['lapsed'],
    'commerce': ['apps', 'digital design', 'photography'],
    'creative-cloud': ['apps', 'digital design', 'photography'],
    'express': ['create', 'quickactions', 'video'],
    'firefly': ['generative', 'artificial intelligence', 'images'],
    'helpx': ['knowledgebase', 'install', 'help'],
    'illustrator': ['drawing', 'vector', 'logo design'],
    'lightroom': ['photo editing', 'image adjust', 'enhancing color'],
    'photoshop': ['generative', 'image adjust', 'compositing'],
    'premiere': ['video editing', 'visual effects', 'motion graphics'],
    'sign': ['Pdf', 'signature', 'document'],
    'stock': ['images', 'vector', 'video'],
    'adobecom,commerce': ['accounts', 'legal', 'offer'],
    'adobecom,creative-cloud': ['creativecloud', 'apps', 'learn'],
    'adobecom,express': ['image', 'create', 'templates'],
    'adobecom,firefly': ['accounts', 'news', 'offer'],
    'adobecom,helpx': ['cloud', 'install', 'help'],
    'commerce,creative-cloud': ['discover', 'apps', 'business'],
    'creative-cloud,helpx': ['creativecloud', 'help', 'apps'],
    'adobecom,commerce,creative-cloud': ['business', 'apps', 'learn'],
    'adobecom,creative-cloud,helpx': ['creativecloud', 'help', 'support'],
    'creative-cloud,stock': ['discover', 'images', 'education'],
  },
  stage: {
    source: {
      '7344ee35-bcb8-4cf8-8254-b6849401c091': 'acrobat',
      'd990c795-ba6b-4e2c-bf71-e72285a8309a': 'adobecom',
      '6011a4ec-7583-461a-986c-9db89c831a20': 'apro-cart-abandoner',
      'e67ae60c-b45f-4941-ab80-30ae68bd3bc4': 'business',
      'f88d9441-c12e-4e9c-9eb7-5cbabc2ae6ba': 'cc-lapsed',
      '7bf58e8a-fc10-4c70-baa2-3340eb3c206c': 'commerce',
      '70816192-33ed-4196-919e-7599b5428667': 'creative-cloud',
      '07462c1a-bbf8-4453-9e1b-b4fe27ccddb1': 'express',
      'd55f0dd4-bc36-45f9-9ac7-7e37b5cafa30': 'firefly',
      '9a358206-7bab-4c20-bf91-f70710effb49': 'helpx',
      '83ed65cc-9720-440c-82d1-3f9ec0a6e6a9': 'illustrator',
      'f0d5997f-c6df-49b5-b8d9-ee53c3b75993': 'lightroom',
      '06d5772c-f769-49a1-a08e-aef4ca66a579': 'photoshop',
      'b0e015bc-2388-41a7-967d-93da36834d4d': 'premiere',
      'cd6eaf04-1e9f-4239-8366-6f37702c376e': 'sign',
      'cb151073-b006-451c-86bf-be69a11070d1': 'stock',
      '0668f6cf-a981-433e-af60-ec967ef90423': 'acrobat',
      '5fc172f1-0a4e-4281-b766-85312ecf30f2': 'adobecom',
      'c861a4fe-8b07-4d1b-9f6e-d8c5150166e6': 'apro-cart-abandoner',
      'dd2cbdc1-4e5a-43bb-bb18-762504ab4ac8': 'business',
      '451c1c66-24c3-4ce1-af54-200a03c2655e': 'cc-lapsed',
      '7199b3ea-600f-4035-ab62-86fe93dcafd5': 'commerce',
      '6841adaf-9eb8-4c8e-90ef-c0eb711e0e55': 'creative-cloud',
      'b790a4d3-c1eb-4ce5-8313-20e225b1c7a8': 'express',
      '510409d5-bf01-4ea9-a080-dd0b162ff854': 'firefly',
      'a9765398-b8e6-4086-a7f5-d80c7e0a3eb2': 'helpx',
      'ecbe1189-f9fe-4a89-9823-c5ae77e8bfd9': 'illustrator',
      '604da2f2-00f8-4a67-b42d-5b21107eeb93': 'lightroom',
      '28fc7790-6273-4803-a53e-641ea3aa0692': 'photoshop',
      'f6622923-afab-4f5e-a1fe-fcc4103e7906': 'premiere',
      '763a8323-2087-42fc-acd8-aac45dbf7532': 'sign',
      'fd3085a1-a77b-43fc-9f67-65092fc7bf49': 'stock',
    },
  },
  prod: {
    source: {
      'b446a9cf-a45c-40a7-ae67-33c2cf7f0bf7': 'acrobat',
      '389deb08-1522-46e5-ba26-1df898934f4f': 'adobecom',
      '079734f3-b593-4c58-8805-592d71f88d95': 'apro-cart-abandoner',
      '295bea12-8443-41c9-9da1-8f75df77dd80': 'business',
      '235a97a1-bf2e-4e92-bf18-13a9bfcf6ec9': 'cc-lapsed',
      'f6553238-548f-4e39-bfa4-b299caaca62e': 'commerce',
      'f569e4f9-f20a-4d6e-ba95-2abe4facdd1b': 'creative-cloud',
      '5114ecd1-d1ac-4caa-869c-5652ab83afed': 'express',
      '1d33382e-0c2c-4d24-8b1f-08be98cee22a': 'firefly',
      '3f27d856-bbdd-431b-9e8f-44f6fe0cfbd0': 'helpx',
      '5b88bec0-99f2-4736-b2d8-4809463b7fbd': 'illustrator',
      '3822c05b-8074-4629-b493-59cc12a78650': 'lightroom',
      '5b5c991e-2633-4390-8ee4-e58931da088e': 'photoshop',
      '395264bb-b584-45fa-af53-a4396e64838b': 'premiere',
      'c02e9190-cc42-47cd-85c0-421924c47f2b': 'sign',
      '9aba8c9e-dce9-427e-8122-a6c796ee2d03': 'stock',
    },
  },
};

const ALLOY_TIMEOUT = 750;

const WIDTHS = {
  split: 1199,
  mobile: 1440,
  tablet: 2048,
  desktop: 2400,
};

const HEIGHTS = {
  split: 828,
  mobile: 992,
  tablet: 520,
  desktop: 813,
};

const LANA_OPTIONS = { tags: 'caasMarquee' };

const API_CONFIGS = {
  spectra: {
    prod: 'https://cchome.adobe.io/int/v1/models',
    stage: 'https://cchome-dev.adobe.io/int/v1/models',
  },
  caas: {
    prod: 'https://www.adobe.com/chimera-api/sm-collection',
    stage: 'https://14257-chimera.adobeioruntime.net/api/v1/web/chimera-0.0.1/sm-collection',
  },
};

const MAX_NUM_CTAS = 2;
const CTA_STYLES = {
  STRONG: 'blue',
  EM: 'outline',
};
function getCtaStyle(tagName) {
  return CTA_STYLES[tagName] || '';
}

function getUrl(ctaLink) {
  if (!ctaLink) {
    return '';
  }
  const modalPath = ctaLink.getAttribute('data-modal-path');
  const modalHash = ctaLink.getAttribute('data-modal-hash');
  const target = ctaLink.target ? `#${ctaLink.target}` : '';
  if (modalPath && modalHash) {
    return `${modalPath}${modalHash}`;
  }
  return `${ctaLink.href}${target}`;
}
function parseCtas(el) {
  const ctas = {};
  const ctaLinks = el.querySelectorAll('a');

  for (let i = 1; i <= MAX_NUM_CTAS; i += 1) {
    const ctaLink = ctaLinks[i - 1] || '';
    ctas[`cta${i}url`] = getUrl(ctaLink);
    ctas[`cta${i}text`] = ctaLink.textContent?.trim() || '';
    ctas[`cta${i}style`] = getCtaStyle(ctaLink.parentNode?.tagName);
  }
  return ctas;
}

function getImageOrVideo(el) {
  const img = el?.querySelector('img');
  const video = el?.querySelector('.video');
  let val = img ? new URL(img.src).pathname : '';
  val = video ? new URL(video.href).pathname : val;
  return val;
}

function parseBrick(el) {
  const [headingEl, descriptionEl, ctaEl, imageEl] = el?.querySelectorAll('p') || [];
  const brick = {
    heading: headingEl?.querySelector('strong')?.textContent || '',
    description: descriptionEl?.innerHTML || '',
    ...parseCtas(ctaEl),
    image: getImageOrVideo(imageEl),
  };

  return btoa(JSON.stringify(brick));
}

function getMetadata(el) {
  let metadata = {};
  for (const row of el.children) {
    const key = row.children[0].textContent.trim().toLowerCase() || '';
    let val = row.children[1]?.innerHTML || '';
    if (key.startsWith('image')) {
      val = getImageOrVideo(row.children[1]);
    }
    if (key.includes('cta')) {
      metadata = { ...metadata, ...parseCtas(row.children[1]) };
    }
    if (key.includes('brick')) {
      val = parseBrick(row.children[1]);
    }
    if (key.includes('variant')) {
      val = val.replaceAll(',', '');
    }
    metadata[key] = val;
  }
  return metadata;
}

function isProd() {
  const { host } = window.location;
  return !(host.includes(`${SLD}.page`)
    || host.includes(`${SLD}.live`)
    || host.includes('localhost')
    || host.includes('stage.adobe')
    || host.includes('corp.adobe'));
}

const BUTTON_STYLES = ['blue', 'outline'];
const prod = isProd();
const urlParams = new URLSearchParams(window.location.search);
const debug = urlParams.get('debug');

function log(...args) {
  if (!prod || debug) {
    // eslint-disable-next-line no-console
    console.log(...args);
  } else {
    window.lana?.log(...args);
  }
}

const REQUEST_TIMEOUT = isProd() ? 1500 : 10000;

const TEXT = {
  small: 'm',
  medium: 'm',
  large: 'xl',
  xlarge: 'xl',
};

const HEADING = {
  small: 'xl',
  medium: 'xl',
  large: 'xxl',
  xlarge: 'xxl',
};

const IMAGE_EXTENSIONS = /^.*\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff|ico|avif|jfif)$/;
const VIDEO_EXTENSIONS = /^.*\.(mp4|mpeg|mpg|mov|wmv|avi|webm|ogg)$/;
const VALID_MODAL_RE = /fragments(.*)#[a-zA-Z0-9_-]+$/;

let segments = [];
let marquee;
let marquees = [];
let selectedId = '';
let metadata;
let loaded = false;

const waitForEventOrTimeout = (eventName, timeout, timeoutVal) => new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    if (timeoutVal !== undefined) {
      resolve(timeoutVal);
    } else {
      reject(new Error(`Timeout waiting for ${eventName} after ${timeout}ms`));
    }
  }, timeout);

  window.addEventListener(eventName, (event) => {
    clearTimeout(timer);
    resolve(event);
  }, { once: true });
});

function getCombinations(arr, data, start, end, index, r, ans) {
  if (!arr.length) {
    return;
  }
  if (index === r) {
    ans.push(data.slice(0, r));
  }

  for (let i = start; i <= end && end - i + 1 >= r - index; i += 1) {
    data[index] = arr[i];
    getCombinations(arr, data, i + 1, end, index + 1, r, ans);
  }
}

function check(key, s) {
  const linkToValues = SEGMENTS_MAP.attributes;
  if (linkToValues[key]) {
    const attributes = linkToValues[key];
    for (let attribute of attributes) {
      s.add(attribute);
    }
  }
}

function getAttributes(mappedUserSegments) {
  let s = new Set();
  let len = mappedUserSegments.length;
  let singles = [];
  let pairs = [];
  let triplets = [];

  getCombinations(mappedUserSegments, new Array(1), 0, len, 0, 1, singles);
  getCombinations(mappedUserSegments, new Array(2), 0, len, 0, 2, pairs);
  getCombinations(mappedUserSegments, new Array(3), 0, len, 0, 3, triplets);

  for (let i = 0; i < singles.length; i += 1) {
    check(singles[i], s);
  }

  for (let i = 0; i < pairs.length; i += 1) {
    const pair = pairs[i].sort();
    check(`${pair[0]},${pair[1]}`, s);
  }

  for (let i = 0; i < triplets.length; i += 1) {
    const triplet = triplets[i].sort();
    check(`${triplet[0]},${triplet[1]},${triplet[2]}`, s);
  }
  return Array.from(s);
}

// See https://experienceleague.adobe.com/docs/experience-platform/destinations/catalog/personalization/custom-personalization.html?lang=en
// for more information on how to integrate with this API.
async function segmentApiEventHandler(e) {
  const SEGMENT_MAP = isProd() ? SEGMENTS_MAP.prod.source : SEGMENTS_MAP.stage.source;
  if (e.detail?.type === 'pageView') {
    const mappedUserSegments = [];
    const userSegments = e.detail?.result?.destinations?.[0]?.segments || [];
    for (const userSegment of userSegments) {
      if (SEGMENT_MAP[userSegment.id]) {
        mappedUserSegments.push(SEGMENT_MAP[userSegment.id]);
      }
    }
    if (mappedUserSegments.length) {
      try {
        segments = getAttributes(mappedUserSegments);
      } catch (e) {
        log(`${getAttributes}: Unable to parse mapped user segments: ${e} ${mappedUserSegments} `, LANA_OPTIONS);
      }
      // eslint-disable-next-line no-use-before-define
      selectedId = await getMarqueeId();
      // eslint-disable-next-line no-use-before-define
      return renderMarquee(marquee, marquees, selectedId, metadata);
    }
  }
  // eslint-disable-next-line no-use-before-define
  return loadFallback(marquee, metadata);
}

function fetchExceptionHandler(fnName, error) {
  log(`${fnName} fetch caught exception: ${error}`, LANA_OPTIONS);
  return null;
}

async function responseHandler(response, fnName) {
  try {
    if (!response || response?.status !== 200) {
      log(`${fnName}: Invalid response or status: response: ${response}, status: ${response?.status} `, LANA_OPTIONS);
      return [];
    }
    return await response?.json() || [];
  } catch (e) {
    log(`${fnName}: response handler exception: ${e} `, LANA_OPTIONS);
    return [];
  }
}

async function getAllMarquees(promoId, origin) {
  const endPoint = isProd() ? API_CONFIGS.caas.prod : API_CONFIGS.caas.stage;
  const payload = `originSelection=${origin}&promoId=${promoId}&language=en&country=US`;

  /* eslint-disable object-curly-newline */
  const response = await fetch(`${endPoint}?${payload}`, {
    // TODO: refactor to not use AbortSignal.timeout() as it's not supported for Safari 14
    /* eslint-disable-next-line */
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  }).catch((error) => fetchExceptionHandler('getAllMarquees', error));

  const json = await responseHandler(response, 'getAllMarquees');
  const marquees = await json?.cards;
  return Array.isArray(marquees) ? marquees : [];
}

/**
 * function getMarqueeId() : Eventually from Spectra API
 * @returns {string} id - currently marquee index (eventually will be marquee ID from Spectra)
 */
async function getMarqueeId() {
  const visitedLinks = [document.referrer];
  log(`Segments: ${segments} sent to Spectra AI`, LANA_OPTIONS);
  const endPoint = isProd() ? API_CONFIGS.spectra.prod : API_CONFIGS.spectra.stage;
  const response = await fetch(endPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'ChimeraAcom',
    },
    body: `{"endpoint":"acom-banner-recom-v1","contentType":"application/json","payload":{"data":{"visitedLinks": ${JSON.stringify(visitedLinks)}, "segment": ${JSON.stringify(segments)}}}}`,
    // TODO: refactor to not use AbortSignal.timeout() as it's not supported for Safari 14
    /* eslint-disable-next-line */
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  }).catch((error) => fetchExceptionHandler('getMarqueeId', error));

  const json = await responseHandler(response, 'getMarqueeId');
  return json?.data?.[0]?.content_id || '';
}

function getArbitraryByKey(data, key) {
  return data.arbitrary?.find((item) => item.key === key)?.value || '';
}

function parseEncodedBrick(data) {
  let brick = {};
  const defaults = {
    image: '',
    heading: '',
    description: '',
    cta1text: '',
    cta1url: '',
    cta1style: '',
  };
  if (!data) {
    return defaults;
  }
  try {
    brick = JSON.parse(atob(data));
    brick = { ...defaults, ...brick };
  } catch (e) {
    log(`Exception: ${e} When trying to parse encoded brick`, LANA_OPTIONS);
    brick = defaults;
  }
  return brick;
}

/**
 * function normalizeData()
 * @param {*} data - marquee JSON data
 * @returns {Object} metadata - marquee data
 */
function normalizeData(data) {
  const images = {
    tablet: getArbitraryByKey(data, 'imageTablet'),
    desktop: getArbitraryByKey(data, 'imageDesktop'),
  };

  const metadata = {
    id: data.id || '',
    title: data.contentArea?.title || '',
    description: data.contentArea?.description || '',
    details: data.contentArea?.detailText || '',
    image: data.styles?.backgroundImage || '',
    imagetablet: images.tablet || data.styles?.backgroundImage || '',
    imagedesktop: images.desktop || data.styles?.backgroundImage || '',
    cta1url: data.footer[0].right[0]?.href || '',
    cta1text: data.footer[0]?.right[0]?.text || '',
    cta1style: data.footer[0]?.right[0]?.style || '',
    cta2url: data.footer[0]?.center[0]?.href || '',
    cta2text: data.footer[0]?.center[0]?.text || '',
    cta2style: data.footer[0]?.center[0]?.style || '',
  };

  const arbitrary = {};
  data.arbitrary?.forEach((item) => { arbitrary[item.key] = item.value; });
  metadata.variant = arbitrary.variant || 'dark, static-links';
  metadata.backgroundcolor = arbitrary.backgroundColor || '';
  metadata.leftbrick = parseEncodedBrick(arbitrary.leftBrick);
  metadata.rightbrick = parseEncodedBrick(arbitrary.rightBrick);

  return metadata;
}

function getDefaultMetadata() {
  return {
    id: '',
    title: '',
    description: '',
    details: '',
    image: '',
    imagetablet: '',
    imagedesktop: '',
    cta1url: '',
    cta1text: '',
    cta1style: '',
    cta2url: '',
    cta2text: '',
    cta2style: '',
    variant: '',
    backgroundcolor: '',
    promoid: '',
    origin: '',
    leftbrick: {
      image: '',
      heading: '',
      description: '',
      cta1text: '',
      cta1url: '',
      cta1style: '',
    },
    rightbrick: {
      image: '',
      heading: '',
      description: '',
      cta1text: '',
      cta1url: '',
      cta1style: '',
    },
  };
}

function getVideoHtml(src) {
  return `<video autoplay muted playsinline> <source src="${src}" type="video/mp4"></video>`;
}

function getImageHtml(src, screen, belowFold, style = '', width = '', height = '', classname = '') {
  const aboveFold = !belowFold;
  const usePng = ['desktop', 'split', 'brick'];
  const eager = ['split', 'brick'];
  const mobileAboveFold = (screen === 'mobile' && aboveFold);

  const format = (usePng.includes(screen) || belowFold) ? 'png' : 'jpeg';
  const fetchPriority = (mobileAboveFold || screen === 'brick') ? 'fetchpriority="high"' : '';
  const loadingType = (mobileAboveFold || eager.includes(screen)) ? 'eager' : 'lazy';
  /* eslint-disable-next-line no-param-reassign */
  width = width || WIDTHS[screen];
  /* eslint-disable-next-line no-param-reassign */
  height = height || HEIGHTS[screen];

  return `<picture class="${classname}">
        <source type="image/webp" srcset="${src}?width=2000&amp;format=webply&amp;optimize=medium" media="(min-width: 600px)">
        <source type="image/webp" srcset="${src}?width=750&amp;format=webply&amp;optimize=medium">
        <source type="image/${format}" srcset="${src}?width=2000&amp;format=${format}&amp;optimize=medium" media="(min-width: 600px)">
        <img loading="${loadingType}" alt src="${src}?width=750&amp;format=${format}&amp;optimize=medium" width="${width}" height="${height}" ${fetchPriority} style="${style}">
  </picture>`;
}

function getContent(src, screen, style = '') {
  const isImage = IMAGE_EXTENSIONS.test(src);
  const isVideo = VIDEO_EXTENSIONS.test(src);
  let inner = '';
  if (isImage) {
    inner = getImageHtml(src, screen, false, style);
  }
  if (isVideo) {
    inner = getVideoHtml(src);
  }
  if (screen === 'split') {
    return `<div data-valign="middle" class="asset image bleed">${inner}</div>`;
  }
  return `<div class=${screen}-only>${inner}</div>`;
}

function addLoadingSpinner(marquee) {
  marquee.innerHTML = `<div class="lds-ring LOADING">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>`;
}

function getModalHtml(ctaUrl, classes, ctaText, html = '') {
  const [fragment, hash] = ctaUrl.split('#');
  const innerContent = html || ctaText;
  if (hash && hash !== '_blank') {
    return `<a href="#${hash}" data-modal-path="${fragment}" data-modal-hash="#${hash}"  daa-ll="${ctaText}" class="modal link-block ${classes}">${innerContent}</a>`;
  }
  return `<a href="${fragment}" daa-ll="${ctaText}" class="modal link-block ${classes}">${innerContent}</a>`;
}

const isValidModal = (u) => VALID_MODAL_RE.test(u);

function getCtaHtml(url, text, classes) {
  if (isValidModal(url)) {
    return getModalHtml(url, classes, text);
  }
  return url ? `<a class="${classes}" href="${url}" daa-ll="${text}"> ${text} </a>` : '';
}

function getCtaClasses(ctaStyle, size) {
  return BUTTON_STYLES.includes(ctaStyle) ? `con-button ${ctaStyle} button-${TEXT[size]} button-justified-mobile` : '';
}

function getSize(classList) {
  const sizes = ['small', 'medium', 'large'];
  for (const size of sizes) {
    if (classList.includes(size)) {
      return size;
    }
  }
  return 'xlarge';
}

function removeLoader(marquee) {
  marquee.innerHTML = '';
}

function addBackground(marquee, metadata) {
  if (metadata.backgroundcolor) {
    marquee.style.backgroundColor = metadata.backgroundcolor;
  }
}

function applyVariants(marquee, metadata, classList) {
  if (metadata.variant) {
    marquee.classList.add(...classList);
  }
}

function getFgContent(metadata, size, cta, cta2) {
  return `<div class="text">
    <p class="detail-l">${metadata.details}</p>
    <h1 class="heading-${HEADING[size]}">${metadata.title}</h1>
    <p class="body-${TEXT[size]}">${metadata.description}</p>
    <p class="action-area">
      ${cta}
      ${cta2}
      </p>
  </div>`;
}

function getReverseFiller() {
  return '<div data-valign="middle" class="media image"></div>';
}

function createBackground(splitContent) {
  const parser = new DOMParser();
  const el = parser.parseFromString(splitContent, 'text/html');
  return el?.body?.childNodes[0];
}

function addAnalytics(marquee, shouldRenderMarquee, contentId) {
  let label = shouldRenderMarquee ? contentId : 'fallback-marquee';
  marquee.setAttribute('daa-lh', `b1|marquee|${label}`);
}

function getClasses(variant) {
  return variant.split(/\s+|,/).map((c) => c.trim()).filter((i) => i !== '');
}

function getBrickFgContent(metadata, size, cta, cta2) {
  return `<div class="homepage-brick above-pods static-links" daa-lh="b1|homepage-brick|nopzn|hp">
            <div class="foreground">
                ${getFgContent(metadata, size, cta, cta2)}
            </div>
          </div>`;
}

function getBrickBackground(imgSrc, config) {
  const [mobileWidth, mobileHeight, mobileStyle] = config.mobile;
  const [tabletWidth, tabletHeight, tabletStyle] = config.tablet;
  const [desktopWidth, desktopHeight, desktopStyle] = config.desktop;
  return `<div class="background first-background">
            <div data-valign="middle" class="mobileOnly">
              ${getImageHtml(imgSrc, 'mobile', true, mobileStyle, mobileWidth, mobileHeight)}
            </div>
            <div data-valign="middle" class="tabletOnly">
              ${getImageHtml(imgSrc, 'tablet', true, tabletStyle, tabletWidth, tabletHeight)}
            </div>
            <div data-valign="middle" class="desktopOnly">
              ${getImageHtml(imgSrc, 'desktop', true, desktopStyle, desktopWidth, desktopHeight)}
            </div>
         </div>`;
}

function getBrickContent(heading, description, ctaText, ctaStyle) {
  return `<div data-valign="middle">
            <h3 class="heading-m">
                ${heading}
            </h3>
            <p class="body-m">
                ${description}
            </p>
            <p class="action-area">
                <div class="modal link-block con-button ${ctaStyle} button-l">
                    ${ctaText}
                </div>
            </p>
          </div>`;
}

function getBricks(metadata, size, cta, cta2) {
  const styleOne = 'object-position: center bottom; object-fit: contain;';
  const styleTwo = 'object-position: right bottom; object-fit: contain;';
  const styleThree = 'object-position: right bottom; object-fit: cover;';
  const brickOneConfigs = {
    mobile: ['608', '900', styleOne],
    tablet: ['608', '900', styleOne],
    desktop: ['1600', '907', styleTwo],
  };
  const brickTwoConfigs = {
    mobile: ['600', '1000', styleThree],
    tablet: ['608', '804', styleThree],
    desktop: ['1180', '1043', styleTwo],
  };

  const mainSectionImage = getImageHtml(metadata.image, 'brick', false, '', 1600, 718, 'section-background');
  const mainSectionContent = getBrickFgContent(metadata, size, cta, cta2);

  const brickOneBg = getBrickBackground(metadata.leftbrick.image, brickOneConfigs);
  const brickOneContent = getBrickContent(metadata.leftbrick.heading, metadata.leftbrick.description, metadata.leftbrick.cta1text, metadata.leftbrick.cta1style);
  const brickOneModal = getModalHtml(metadata.leftbrick.cta1url, 'outline foreground', metadata.leftbrick.cta1text, brickOneContent);

  const brickTwoBg = getBrickBackground(metadata.rightbrick.image, brickTwoConfigs);
  const brickTwoContent = getBrickContent(metadata.rightbrick.heading, metadata.rightbrick.description, metadata.rightbrick.cta1text, metadata.rightbrick.cta1style);
  const brickTwoModal = getModalHtml(metadata.rightbrick.cta1url, 'outline foreground', metadata.rightbrick.cta1text, brickTwoContent);

  return `<div class="section has-background" daa-lh="s1">
            ${mainSectionImage}
            ${mainSectionContent}
            <div class="section masonry masonry-up">
              <div class="homepage-brick semi-transparent two-thirds-grid click" daa-lh="b2|homepage-brick|pzn|hp">
                ${brickOneBg}
                ${brickOneModal}
              </div>
              <div class="homepage-brick semi-transparent click" daa-lh="b3|homepage-brick|pzn|hp">
                ${brickTwoBg}
                ${brickTwoModal}
              </div>
          </div>`;
}

/**
 * function renderMarquee()
 * @param {HTMLElement} marquee - marquee container
 * @param {Array} marquees - marquee data
 * @param {string} id - marquee id
 * @returns {void}
 */
export function renderMarquee(marquee, marquees, id, fallback) {
  if (loaded) {
    return;
  }
  loaded = true;
  const found = marquees?.find((obj) => obj.id === id);
  const shouldRenderMarquee = marquees?.length && found;
  const metadata = shouldRenderMarquee ? normalizeData(found) : fallback;
  const classList = getClasses(metadata.variant);

  removeLoader(marquee);
  addBackground(marquee, metadata);
  applyVariants(marquee, metadata, classList);
  addAnalytics(marquee, shouldRenderMarquee, id);

  const isSplit = classList.includes('split');
  const isBrick = classList.includes('homepage-brick');
  const isReversed = classList.includes('row-reversed');
  const size = getSize(classList);
  const useReverseFiller = isReversed && !isSplit;

  const cta1Classes = getCtaClasses(metadata.cta1style, size);
  const cta2Classes = getCtaClasses(metadata.cta2style, size);
  const cta = getCtaHtml(metadata.cta1url, metadata.cta1text, cta1Classes);
  const cta2 = getCtaHtml(metadata.cta2url, metadata.cta2text, cta2Classes);

  if (isBrick) {
    marquee.innerHTML = getBricks(metadata, size, cta, cta2);
    marquee.classList.remove('marquee');
    return;
  }

  const mobileBgContent = getContent(metadata.image, 'mobile');
  const tabletBgContent = getContent(metadata.imagetablet, 'tablet');
  const desktopBgContent = getContent(metadata.imagedesktop, 'desktop', 'object-position: 32% center;');
  const splitImage = metadata.imageDesktop || metadata.imageTablet || metadata.image;
  const splitContent = getContent(splitImage, 'split');

  const bgContent = `${mobileBgContent}${tabletBgContent}${desktopBgContent}`;
  let background = createTag('div', { class: 'background' }, '');
  if (isSplit) {
    background = createBackground(splitContent);
  } else {
    background.innerHTML = bgContent;
  }

  const reversedFiller = useReverseFiller ? getReverseFiller() : '';
  const fgContent = `${reversedFiller}${getFgContent(metadata, size, cta, cta2)}`;
  const foreground = createTag('div', { class: 'foreground container' }, '');
  foreground.innerHTML = fgContent;

  marquee.append(background, foreground);
}

function loadFallback(marquee, metadata) {
  renderMarquee(marquee, [], '', metadata);
}

function shouldLoadFallback() {
  return urlParams.get('previewFallback') === 'true'
    || (urlParams.get('martech') === 'off' && !urlParams.get('marqueeId'));
}

function authorPreview() {
  return urlParams.get('marqueeId');
}

function handleAuthoringMistakes(authoredFields) {
  const safeMetadata = { ...getDefaultMetadata(), ...authoredFields };
  return safeMetadata;
}

/**
 * function init()
 * @param {*} el - element with metadata for marquee
 */
export default async function init(el) {
  metadata = getMetadata(el);
  metadata.leftbrick = parseEncodedBrick(metadata.leftbrick);
  metadata.rightbrick = parseEncodedBrick(metadata.rightbrick);
  metadata = handleAuthoringMistakes(metadata);
  const promoId = metadata.promoid;
  const origin = getConfig().chimeraOrigin || metadata.origin;
  marquee = createTag('div', { class: 'marquee' }, '');
  addLoadingSpinner(marquee);
  el.parentNode.prepend(marquee);

  if (shouldLoadFallback()) {
    return loadFallback(marquee, metadata);
  }

  const martechPromise = loadMartech();
  const marqueesPromise = getAllMarquees(promoId, origin);
  await Promise.all([martechPromise, marqueesPromise]);
  marquees = await marqueesPromise;

  let event;
  if (window.alloy_pageView) {
    // eslint-disable-next-line camelcase, no-undef
    const sent = await alloy_pageView.sent;
    if (sent?.destinations[0]?.segments) {
      event = { detail: { type: 'pageView', result: { destinations: sent.destinations } } };
    } else {
      return loadFallback(marquee, metadata);
    }
  } else {
    event = await waitForEventOrTimeout('alloy_sendEvent', ALLOY_TIMEOUT, new Event(''));
  }

  if (authorPreview()) {
    return renderMarquee(marquee, marquees, urlParams.get('marqueeId'), metadata);
  }

  await segmentApiEventHandler(event);
}
