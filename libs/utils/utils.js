/* eslint-disable no-console */

const MILO_TEMPLATES = [
  '404',
  'featured-story',
];
const MILO_BLOCKS = [
  'accordion',
  'action-item',
  'action-scroller',
  'adobetv',
  'article-feed',
  'article-header',
  'aside',
  'author-header',
  'brick',
  'bulk-publish',
  'bulk-publish-v2',
  'caas',
  'caas-config',
  'caas-marquee',
  'caas-marquee-metadata',
  'card',
  'card-horizontal',
  'card-metadata',
  'carousel',
  'chart',
  'columns',
  'editorial-card',
  'faas',
  'featured-article',
  'figure',
  'form',
  'fragment',
  'featured-article',
  'global-footer',
  'global-navigation',
  'graybox',
  'footer',
  'gnav',
  'hero-marquee',
  'how-to',
  'icon-block',
  'iframe',
  'instagram',
  'locui',
  'locui-create',
  'marketo',
  'marquee',
  'marquee-anchors',
  'martech-metadata',
  'media',
  'merch',
  'merch-card',
  'merch-card-collection',
  'merch-offers',
  'mmm',
  'mnemonic-list',
  'mobile-app-banner',
  'modal',
  'modal-metadata',
  'notification',
  'pdf-viewer',
  'quote',
  'read-more',
  'recommended-articles',
  'region-nav',
  'review',
  'section-metadata',
  'slideshare',
  'preflight',
  'promo',
  'quiz',
  'quiz-entry',
  'quiz-marquee',
  'quiz-results',
  'tabs',
  'table-of-contents',
  'text',
  'timeline',
  'walls-io',
  'table',
  'table-metadata',
  'tags',
  'tag-selector',
  'tiktok',
  'twitter',
  'video',
  'vimeo',
  'youtube',
  'z-pattern',
  'share',
  'reading-time',
];
const AUTO_BLOCKS = [
  { adobetv: 'tv.adobe.com' },
  { gist: 'https://gist.github.com' },
  { caas: '/tools/caas' },
  { faas: '/tools/faas' },
  { fragment: '/fragments/', styles: false },
  { instagram: 'https://www.instagram.com' },
  { slideshare: 'https://www.slideshare.net', styles: false },
  { tiktok: 'https://www.tiktok.com', styles: false },
  { twitter: 'https://twitter.com' },
  { vimeo: 'https://vimeo.com' },
  { vimeo: 'https://player.vimeo.com' },
  { youtube: 'https://www.youtube.com' },
  { youtube: 'https://youtu.be' },
  { 'pdf-viewer': '.pdf', styles: false },
  { video: '.mp4' },
  { merch: '/tools/ost?' },
];
const DO_NOT_INLINE = [
  'accordion',
  'columns',
  'z-pattern',
];

const ENVS = {
  stage: {
    name: 'stage',
    ims: 'stg1',
    adobeIO: 'cc-collab-stage.adobe.io',
    adminconsole: 'stage.adminconsole.adobe.com',
    account: 'stage.account.adobe.com',
    edgeConfigId: '8d2805dd-85bf-4748-82eb-f99fdad117a6',
    pdfViewerClientId: '600a4521c23d4c7eb9c7b039bee534a0',
  },
  prod: {
    name: 'prod',
    ims: 'prod',
    adobeIO: 'cc-collab.adobe.io',
    adminconsole: 'adminconsole.adobe.com',
    account: 'account.adobe.com',
    edgeConfigId: '2cba807b-7430-41ae-9aac-db2b0da742d5',
    pdfViewerClientId: '3c0a5ddf2cc04d3198d9e48efc390fa9',
  },
};
ENVS.local = {
  ...ENVS.stage,
  name: 'local',
};

export const MILO_EVENTS = { DEFERRED: 'milo:deferred' };
const TARGET_TIMEOUT_MS = 4000;

const LANGSTORE = 'langstore';
const PREVIEW = 'target-preview';
const PAGE_URL = new URL(window.location.href);
export const SLD = PAGE_URL.hostname.includes('.aem.') ? 'aem' : 'hlx';

const PROMO_PARAM = 'promo';

export function getEnv(conf) {
  const { host } = window.location;
  const query = PAGE_URL.searchParams.get('env');

  if (query) return { ...ENVS[query], consumer: conf[query] };

  const { clientEnv } = conf;
  if (clientEnv) return { ...ENVS[clientEnv], consumer: conf[clientEnv] };

  if (host.includes('localhost')) return { ...ENVS.local, consumer: conf.local };
  /* c8 ignore start */
  if (host.includes(`${SLD}.page`)
    || host.includes(`${SLD}.live`)
    || host.includes('stage.adobe')
    || host.includes('corp.adobe')
    || host.includes('graybox.adobe')) {
    return { ...ENVS.stage, consumer: conf.stage };
  }
  return { ...ENVS.prod, consumer: conf.prod };
  /* c8 ignore stop */
}

export function getLocale(locales, pathname = window.location.pathname) {
  if (!locales) {
    return { ietf: 'en-US', tk: 'hah7vzn.css', prefix: '' };
  }
  const split = pathname.split('/');
  const localeString = split[1];
  let locale = locales[localeString] || locales[''];
  if ([LANGSTORE, PREVIEW].includes(localeString)) {
    const ietf = Object.keys(locales).find((loc) => locales[loc]?.ietf?.startsWith(split[2]));
    if (ietf) locale = locales[ietf];
    locale.prefix = `/${localeString}/${split[2]}`;
    return locale;
  }
  const isUS = locale.ietf === 'en-US';
  locale.prefix = isUS ? '' : `/${localeString}`;
  locale.region = isUS ? 'us' : localeString.split('_')[0];
  return locale;
}

export function getMetadata(name, doc = document) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = doc.head.querySelector(`meta[${attr}="${name}"]`);
  return meta && meta.content;
}

const handleEntitlements = (() => {
  const { martech } = Object.fromEntries(PAGE_URL.searchParams);
  if (martech === 'off') return () => { };
  let entResolve;
  const entPromise = new Promise((resolve) => {
    entResolve = resolve;
  });

  return (resolveVal) => {
    if (resolveVal !== undefined) {
      entResolve(resolveVal);
    }
    return entPromise;
  };
})();

function setupMiloObj(config) {
  window.milo ||= {};
  window.milo.deferredPromise = new Promise((resolve) => {
    config.resolveDeferred = resolve;
  });
}

export const [setConfig, updateConfig, getConfig] = (() => {
  let config = {};
  return [
    (conf) => {
      const origin = conf.origin || window.location.origin;
      const pathname = conf.pathname || window.location.pathname;
      config = { env: getEnv(conf), ...conf };
      config.codeRoot = conf.codeRoot ? `${origin}${conf.codeRoot}` : origin;
      config.base = config.miloLibs || config.codeRoot;
      config.locale = pathname ? getLocale(conf.locales, pathname) : getLocale(conf.locales);
      config.autoBlocks = conf.autoBlocks ? [...AUTO_BLOCKS, ...conf.autoBlocks] : AUTO_BLOCKS;
      config.signInContext = conf.signInContext || {};
      config.doNotInline = conf.doNotInline
        ? [...DO_NOT_INLINE, ...conf.doNotInline]
        : DO_NOT_INLINE;
      const lang = getMetadata('content-language') || config.locale.ietf;
      document.documentElement.setAttribute('lang', lang);
      try {
        const dir = getMetadata('content-direction')
          || config.locale.dir
          || (config.locale.ietf && (new Intl.Locale(config.locale.ietf)?.textInfo?.direction))
          || 'ltr';
        document.documentElement.setAttribute('dir', dir);
      } catch (e) {
        console.log('Invalid or missing locale:', e);
      }
      config.locale.contentRoot = `${origin}${config.locale.prefix}${config.contentRoot ?? ''}`;
      config.useDotHtml = !PAGE_URL.origin.includes(`.${SLD}.`)
        && (conf.useDotHtml ?? PAGE_URL.pathname.endsWith('.html'));
      config.entitlements = handleEntitlements;
      config.consumerEntitlements = conf.entitlements || [];
      setupMiloObj(config);
      return config;
    },
    (conf) => (config = conf),
    () => config,
  ];
})();

export function isInTextNode(node) {
  return node.parentElement.firstChild.nodeType === Node.TEXT_NODE;
}

export function createTag(tag, attributes, html, options = {}) {
  const el = document.createElement(tag);
  if (html) {
    if (html instanceof HTMLElement
      || html instanceof SVGElement
      || html instanceof DocumentFragment) {
      el.append(html);
    } else if (Array.isArray(html)) {
      el.append(...html);
    } else {
      el.insertAdjacentHTML('beforeend', html);
    }
  }
  if (attributes) {
    Object.entries(attributes).forEach(([key, val]) => {
      el.setAttribute(key, val);
    });
  }
  options.parent?.append(el);
  return el;
}

function getExtension(path) {
  const pageName = path.split('/').pop();
  return pageName.includes('.') ? pageName.split('.').pop() : '';
}

export function localizeLink(
  href,
  originHostName = window.location.hostname,
  overrideDomain = false,
) {
  try {
    const url = new URL(href);
    const relative = url.hostname === originHostName;
    const processedHref = relative ? href.replace(url.origin, '') : href;
    const { hash } = url;
    if (hash.includes('#_dnt')) return processedHref.replace('#_dnt', '');
    const path = url.pathname;
    const extension = getExtension(path);
    const allowedExts = ['', 'html', 'json'];
    if (!allowedExts.includes(extension)) return processedHref;
    const { locale, locales, prodDomains } = getConfig();
    if (!locale || !locales) return processedHref;
    const isLocalizable = relative || (prodDomains && prodDomains.includes(url.hostname))
      || overrideDomain;
    if (!isLocalizable) return processedHref;
    const isLocalizedLink = path.startsWith(`/${LANGSTORE}`)
      || path.startsWith(`/${PREVIEW}`)
      || Object.keys(locales).some((loc) => loc !== '' && (path.startsWith(`/${loc}/`)
        || path.endsWith(`/${loc}`)));
    if (isLocalizedLink) return processedHref;
    const urlPath = `${locale.prefix}${path}${url.search}${hash}`;
    return relative ? urlPath : `${url.origin}${urlPath}`;
  } catch (error) {
    return href;
  }
}

export function loadLink(href, { as, callback, crossorigin, rel, fetchpriority } = {}) {
  let link = document.head.querySelector(`link[href="${href}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    if (as) link.setAttribute('as', as);
    if (crossorigin) link.setAttribute('crossorigin', crossorigin);
    if (fetchpriority) link.setAttribute('fetchpriority', fetchpriority);
    link.setAttribute('href', href);
    if (callback) {
      link.onload = (e) => callback(e.type);
      link.onerror = (e) => callback(e.type);
    }
    document.head.appendChild(link);
  } else if (callback) {
    callback('noop');
  }
  return link;
}

export function loadStyle(href, callback) {
  return loadLink(href, { rel: 'stylesheet', callback });
}

export function appendHtmlToCanonicalUrl() {
  const { useDotHtml } = getConfig();
  if (!useDotHtml) return;
  const canonEl = document.head.querySelector('link[rel="canonical"]');
  if (!canonEl) return;
  const canonUrl = new URL(canonEl.href);
  if (canonUrl.pathname.endsWith('/') || canonUrl.pathname.endsWith('.html')) return;
  const pagePath = PAGE_URL.pathname.replace('.html', '');
  if (pagePath !== canonUrl.pathname) return;
  canonEl.setAttribute('href', `${canonEl.href}.html`);
}

export function appendSuffixToTitles() {
  const appendage = getMetadata('title-append');
  if (!appendage) return;
  document.title = `${document.title} ${appendage}`;
  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  if (ogTitleEl) ogTitleEl.setAttribute('content', document.title);
  const twitterTitleEl = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitleEl) twitterTitleEl.setAttribute('content', document.title);
}

export function appendHtmlToLink(link) {
  const { useDotHtml } = getConfig();
  if (!useDotHtml) return;
  const href = link.getAttribute('href');
  if (!href?.length) return;

  const { autoBlocks = [], htmlExclude = [] } = getConfig();

  const HAS_EXTENSION = /\..*$/;
  let url = { pathname: href };

  try { url = new URL(href, PAGE_URL); } catch (e) { /* do nothing */ }

  if (!(href.startsWith('/') || href.startsWith(PAGE_URL.origin))
    || url.pathname?.endsWith('/')
    || href === PAGE_URL.origin
    || HAS_EXTENSION.test(href.split('/').pop())
    || htmlExclude?.some((excludeRe) => excludeRe.test(href))) {
    return;
  }

  const relativeAutoBlocks = autoBlocks
    .map((b) => Object.values(b)[0])
    .filter((b) => b.startsWith('/'));
  const isAutoblockLink = relativeAutoBlocks.some((block) => href.includes(block));
  if (isAutoblockLink) return;

  try {
    const linkUrl = new URL(href.startsWith('http') ? href : `${PAGE_URL.origin}${href}`);
    if (linkUrl.pathname && !linkUrl.pathname.endsWith('.html')) {
      linkUrl.pathname = `${linkUrl.pathname}.html`;
      link.setAttribute('href', href.startsWith('/')
        ? `${linkUrl.pathname}${linkUrl.search}${linkUrl.hash}`
        : linkUrl.href);
    }
  } catch (e) {
    window.lana?.log(`Error while attempting to append '.html' to ${link}: ${e}`);
  }
}

export const loadScript = (url, type, { mode } = {}) => new Promise((resolve, reject) => {
  let script = document.querySelector(`head > script[src="${url}"]`);
  if (!script) {
    const { head } = document;
    script = document.createElement('script');
    script.setAttribute('src', url);
    if (type) {
      script.setAttribute('type', type);
    }
    if (['async', 'defer'].includes(mode)) script.setAttribute(mode, true);
    head.append(script);
  }

  if (script.dataset.loaded) {
    resolve(script);
    return;
  }

  const onScript = (event) => {
    script.removeEventListener('load', onScript);
    script.removeEventListener('error', onScript);

    if (event.type === 'error') {
      reject(new Error(`error loading script: ${script.src}`));
    } else if (event.type === 'load') {
      script.dataset.loaded = true;
      resolve(script);
    }
  };

  script.addEventListener('load', onScript);
  script.addEventListener('error', onScript);
});

export async function loadTemplate() {
  const template = getMetadata('template');
  if (!template) return;
  const name = template.toLowerCase().replace(/[^0-9a-z]/gi, '-');
  document.body.classList.add(name);
  const { miloLibs, codeRoot } = getConfig();
  const base = miloLibs && MILO_TEMPLATES.includes(name) ? miloLibs : codeRoot;
  const styleLoaded = new Promise((resolve) => {
    loadStyle(`${base}/templates/${name}/${name}.css`, resolve);
  });
  const scriptLoaded = new Promise((resolve) => {
    (async () => {
      try {
        await import(`${base}/templates/${name}/${name}.js`);
      } catch (err) {
        console.log(`failed to load module for ${name}`, err);
      }
      resolve();
    })();
  });
  await Promise.all([styleLoaded, scriptLoaded]);
}

function getBlockData(block) {
  const name = block.classList[0];
  const { miloLibs, codeRoot, mep } = getConfig();
  const base = miloLibs && MILO_BLOCKS.includes(name) ? miloLibs : codeRoot;
  let path = `${base}/blocks/${name}`;
  if (mep?.blocks?.[name]) path = mep.blocks[name];
  const blockPath = `${path}/${name}`;
  const hasStyles = AUTO_BLOCKS.find((ab) => Object.keys(ab).includes(name))?.styles ?? true;

  return { blockPath, name, hasStyles };
}

export async function loadBlock(block) {
  if (block.classList.contains('hide-block')) {
    block.remove();
    return null;
  }
  const { name, blockPath, hasStyles } = getBlockData(block);
  const styleLoaded = hasStyles && new Promise((resolve) => {
    loadStyle(`${blockPath}.css`, resolve);
  });
  const scriptLoaded = new Promise((resolve) => {
    (async () => {
      try {
        const { default: init } = await import(`${blockPath}.js`);
        await init(block);
        block.dataset.blockStatus = 'loaded';
      } catch (err) {
        console.log(`Failed loading ${name}`, err);
        const config = getConfig();
        if (config.env.name !== 'prod') {
          const { showError } = await import('../blocks/fallback/fallback.js');
          showError(block, name);
        }
      }
      resolve();
    })();
  });

  await Promise.all([styleLoaded, scriptLoaded]);
  return block;
}

export function decorateSVG(a) {
  const { textContent, href } = a;
  if (!(textContent.includes('.svg') || href.includes('.svg'))) return a;
  try {
    // Mine for URL and alt text
    const splitText = textContent.split('|');
    const authoredUrl = new URL(splitText.shift().trim());
    const altText = splitText.join('|').trim();

    // Relative link checking
    const hrefUrl = a.href.startsWith('/')
      ? new URL(`${window.location.origin}${a.href}`)
      : new URL(a.href);

    const src = (authoredUrl.hostname.includes('.hlx.') || authoredUrl.hostname.includes('.aem.'))
      ? authoredUrl.pathname
      : authoredUrl;

    const img = createTag('img', { loading: 'lazy', src, alt: altText || '' });
    const pic = createTag('picture', null, img);

    if (authoredUrl.pathname === hrefUrl.pathname) {
      a.parentElement.replaceChild(pic, a);
      return pic;
    }
    a.textContent = '';
    a.append(pic);
    return a;
  } catch (e) {
    console.log('Failed to create SVG.', e.message);
    return a;
  }
}

export function decorateImageLinks(el) {
  const images = el.querySelectorAll('img[alt*="|"]');
  if (!images.length) return;
  [...images].forEach((img) => {
    const [source, alt, icon] = img.alt.split('|');
    try {
      const url = new URL(source.trim());
      const href = url.hostname.includes(`.${SLD}.`) ? `${url.pathname}${url.hash}` : url.href;
      if (alt?.trim().length) img.alt = alt.trim();
      const pic = img.closest('picture');
      const picParent = pic.parentElement;
      if (href.includes('.mp4')) {
        const a = createTag('a', { href: url, 'data-video-poster': pic.outerHTML });
        a.innerHTML = url;
        pic.replaceWith(a);
      } else {
        const aTag = createTag('a', { href, class: 'image-link' });
        picParent.insertBefore(aTag, pic);
        if (icon) {
          import('./image-video-link.js').then((mod) => mod.default(picParent, aTag, icon));
        } else {
          aTag.append(pic);
        }
      }
    } catch (e) {
      console.log('Error:', `${e.message} '${source.trim()}'`);
    }
  });
}

export function decorateAutoBlock(a) {
  const config = getConfig();
  const { hostname } = window.location;
  let url;
  try {
    url = new URL(a.href);
  } catch (e) {
    window.lana?.log(`Cannot make URL from decorateAutoBlock - ${a?.href}: ${e.toString()}`);
    return false;
  }

  const href = hostname === url.hostname
    ? `${url.pathname}${url.search}${url.hash}`
    : a.href;

  return config.autoBlocks.find((candidate) => {
    const key = Object.keys(candidate)[0];
    const match = href.includes(candidate[key]);
    if (!match) return false;

    if (key === 'pdf-viewer' && !a.textContent.includes('.pdf')) {
      a.target = '_blank';
      return false;
    }

    const hasExtension = a.href.split('/').pop().includes('.');
    const mp4Match = a.textContent.match('media_.*.mp4');
    if (key === 'fragment' && (!hasExtension || mp4Match)) {
      if (a.href === window.location.href) {
        return false;
      }

      const isInlineFrag = url.hash.includes('#_inline');
      if (url.hash === '' || isInlineFrag) {
        const { parentElement } = a;
        const { nodeName, innerHTML } = parentElement;
        const noText = innerHTML === a.outerHTML;
        if (noText && nodeName === 'P') {
          const div = createTag('div', null, a);
          parentElement.parentElement.replaceChild(div, parentElement);
        }
      }

      // previewing a fragment page with mp4 video
      if (mp4Match) {
        a.className = 'video link-block';
        return false;
      }

      // Modals
      if (url.hash !== '' && !isInlineFrag) {
        a.dataset.modalPath = url.pathname;
        a.dataset.modalHash = url.hash;
        a.href = url.hash;
        a.className = `modal link-block ${[...a.classList].join(' ')}`;
        return true;
      }
    }

    // slack uploaded mp4s
    if (key === 'video' && !a.textContent.match('media_.*.mp4')) {
      return false;
    }

    a.className = `${key} link-block`;
    return true;
  });
}

const decorateCopyLink = (a, evt) => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /android|iphone|mobile/.test(userAgent) && !/ipad/.test(userAgent);
  if (!isMobile || !navigator.share) {
    a.remove();
    return;
  }
  const link = a.href.replace(evt, '');
  const isConButton = ['EM', 'STRONG'].includes(a.parentElement.nodeName)
    || a.classList.contains('con-button');
  if (!isConButton) a.classList.add('static', 'copy-link');
  a.href = '';
  a.addEventListener('click', async (e) => {
    e.preventDefault();
    if (navigator.share) await navigator.share({ title: link, url: link });
  });
};

export function convertStageLinks({ anchors, config, hostname, href }) {
  const { env, stageDomainsMap, locale } = config;
  if (env?.name === 'prod' || !stageDomainsMap) return;
  const matchedRules = Object.entries(stageDomainsMap)
    .find(([domain]) => (new RegExp(domain)).test(href));
  if (!matchedRules) return;
  const [, domainsMap] = matchedRules;
  [...anchors].forEach((a) => {
    const hasLocalePrefix = a.pathname.startsWith(locale.prefix);
    const noLocaleLink = hasLocalePrefix ? a.href.replace(locale.prefix, '') : a.href;
    const matchedDomain = Object.keys(domainsMap)
      .find((domain) => (new RegExp(domain)).test(noLocaleLink));
    if (!matchedDomain) return;
    const convertedLink = noLocaleLink.replace(
      new RegExp(matchedDomain),
      domainsMap[matchedDomain] === 'origin'
        ? `${matchedDomain.includes('https') ? 'https://' : ''}${hostname}`
        : domainsMap[matchedDomain],
    );
    const convertedUrl = new URL(convertedLink);
    convertedUrl.pathname = `${hasLocalePrefix ? locale.prefix : ''}${convertedUrl.pathname}`;
    a.href = convertedUrl.toString();
    if (/(\.page|\.live).*\.html(?=[?#]|$)/.test(a.href)) a.href = a.href.replace(/\.html(?=[?#]|$)/, '');
  });
}

export function decorateLinks(el) {
  const config = getConfig();
  decorateImageLinks(el);
  const anchors = el.getElementsByTagName('a');
  const { hostname, href } = window.location;
  const links = [...anchors].reduce((rdx, a) => {
    appendHtmlToLink(a);
    a.href = localizeLink(a.href);
    decorateSVG(a);
    if (a.href.includes('#_blank')) {
      a.setAttribute('target', '_blank');
      a.href = a.href.replace('#_blank', '');
    }
    if (a.href.includes('#_nofollow')) {
      a.setAttribute('rel', 'nofollow');
      a.href = a.href.replace('#_nofollow', '');
    }
    if (a.href.includes('#_dnb')) {
      a.href = a.href.replace('#_dnb', '');
    } else {
      const autoBlock = decorateAutoBlock(a);
      if (autoBlock) {
        rdx.push(a);
      }
    }
    // Custom action links
    const loginEvent = '#_evt-login';
    if (a.href.includes(loginEvent)) {
      a.href = a.href.replace(loginEvent, '');
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const { signInContext } = config;
        window.adobeIMS?.signIn(signInContext);
      });
    }
    const copyEvent = '#_evt-copy';
    if (a.href.includes(copyEvent)) {
      decorateCopyLink(a, copyEvent);
    }
    // Append aria-label
    const pipeRegex = /\s?\|([^|]*)$/;
    if (pipeRegex.test(a.textContent) && !/\.[a-z]+/i.test(a.textContent)) {
      const node = [...a.childNodes].reverse()[0];
      const ariaLabel = node.textContent.match(pipeRegex)[1];
      node.textContent = node.textContent.replace(pipeRegex, '');
      a.setAttribute('aria-label', ariaLabel.trim());
    }

    return rdx;
  }, []);
  convertStageLinks({ anchors, config, hostname, href });
  return links;
}

function decorateContent(el) {
  const children = [el];
  let child = el;
  while (child) {
    child = child.nextElementSibling;
    if (child && child.nodeName !== 'DIV') {
      children.push(child);
    } else {
      break;
    }
  }
  const block = document.createElement('div');
  block.className = 'content';
  block.append(...children);
  block.dataset.block = '';
  return block;
}

function decorateDefaults(el) {
  const firstChild = ':scope > *:not(div):first-child';
  const afterBlock = ':scope > div + *:not(div)';
  const children = el.querySelectorAll(`${firstChild}, ${afterBlock}`);
  children.forEach((child) => {
    const prev = child.previousElementSibling;
    const content = decorateContent(child);
    if (prev) {
      prev.insertAdjacentElement('afterend', content);
    } else {
      el.insertAdjacentElement('afterbegin', content);
    }
  });
}

function decorateHeader() {
  const breadcrumbs = document.querySelector('.breadcrumbs');
  breadcrumbs?.remove();
  const header = document.querySelector('header');
  if (!header) return;
  const headerMeta = getMetadata('header');
  if (headerMeta === 'off') {
    document.body.classList.add('nav-off');
    header.remove();
    return;
  }
  header.className = headerMeta || 'global-navigation';
  const metadataConfig = getMetadata('breadcrumbs')?.toLowerCase()
    || getConfig().breadcrumbs;
  if (metadataConfig === 'off') return;
  const baseBreadcrumbs = getMetadata('breadcrumbs-base')?.length;

  const autoBreadcrumbs = getMetadata('breadcrumbs-from-url') === 'on';
  const dynamicNavActive = getMetadata('dynamic-nav') === 'on'
    && window.sessionStorage.getItem('gnavSource') !== null;
  if (!dynamicNavActive && (baseBreadcrumbs || breadcrumbs || autoBreadcrumbs)) header.classList.add('has-breadcrumbs');
  if (breadcrumbs) header.append(breadcrumbs);
  const promo = getMetadata('gnav-promo-source');
  if (promo?.length) header.classList.add('has-promo');
}

async function decorateIcons(area, config) {
  const icons = area.querySelectorAll('span.icon');
  if (icons.length === 0) return;
  const { base } = config;
  loadStyle(`${base}/features/icons/icons.css`);
  loadLink(`${base}/img/icons/icons.svg`, { rel: 'preload', as: 'fetch', crossorigin: 'anonymous' });
  const { default: loadIcons } = await import('../features/icons/icons.js');
  await loadIcons(icons, config);
}

export async function customFetch({ resource, withCacheRules }) {
  const options = {};
  if (withCacheRules) {
    const params = new URLSearchParams(window.location.search);
    options.cache = params.get('cache') === 'off' ? 'reload' : 'default';
  }
  return fetch(resource, options);
}

const findReplaceableNodes = (area) => {
  const regex = /{{(.*?)}}|%7B%7B(.*?)%7D%7D/g;
  const walker = document.createTreeWalker(area, NodeFilter.SHOW_ALL);
  const nodes = [];
  let node = walker.nextNode();
  while (node !== null) {
    let matchFound = false;
    if (node.nodeType === Node.TEXT_NODE) {
      matchFound = regex.test(node.nodeValue);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute('href')) {
      const hrefValue = node.getAttribute('href');
      matchFound = regex.test(hrefValue);
    }
    if (matchFound) {
      nodes.push(node);
      regex.lastIndex = 0;
    }
    node = walker.nextNode();
  }
  return nodes;
};

let placeholderRequest;
export async function decoratePlaceholders(area, config) {
  if (!area) return;
  const nodes = findReplaceableNodes(area);
  if (!nodes.length) return;
  area.dataset.hasPlaceholders = 'true';
  const placeholderPath = `${config.locale?.contentRoot}/placeholders.json`;
  placeholderRequest = placeholderRequest
    || customFetch({ resource: placeholderPath, withCacheRules: true })
      .catch(() => ({}));
  const { decoratePlaceholderArea } = await import('../features/placeholders.js');
  await decoratePlaceholderArea({ placeholderPath, placeholderRequest, nodes });
}

async function loadFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  const footerMeta = getMetadata('footer');
  if (footerMeta === 'off') {
    footer.remove();
    return;
  }
  footer.className = footerMeta || 'global-footer';
  await loadBlock(footer);
}

export function filterDuplicatedLinkBlocks(blocks) {
  if (!blocks?.length) return [];
  const uniqueModalKeys = new Set();
  const uniqueBlocks = [];
  for (const obj of blocks) {
    if (obj.className.includes('modal')) {
      const key = `${obj.dataset.modalHash}-${obj.dataset.modalPath}`;
      if (!uniqueModalKeys.has(key)) {
        uniqueModalKeys.add(key);
        uniqueBlocks.push(obj);
      }
    } else {
      uniqueBlocks.push(obj);
    }
  }
  return uniqueBlocks;
}

function decorateSection(section, idx) {
  let links = decorateLinks(section);
  decorateDefaults(section);
  const blocks = section.querySelectorAll(':scope > div[class]:not(.content)');

  const { doNotInline } = getConfig();
  const blockLinks = [...blocks].reduce((blkLinks, block) => {
    const blockName = block.classList[0];
    links.filter((link) => block.contains(link))
      .forEach((link) => {
        if (link.classList.contains('fragment')
          && MILO_BLOCKS.includes(blockName) // do not inline consumer blocks (for now)
          && !doNotInline.includes(blockName)) {
          if (!link.href.includes('#_inline')) {
            link.href = `${link.href}#_inline`;
          }
          blkLinks.inlineFrags.push(link);
        } else if (link.classList.contains('link-block')) {
          blkLinks.autoBlocks.push(link);
        }
      });
    return blkLinks;
  }, { inlineFrags: [], autoBlocks: [] });

  const embeddedLinks = [...blockLinks.inlineFrags, ...blockLinks.autoBlocks];
  if (embeddedLinks.length) {
    links = links.filter((link) => !embeddedLinks.includes(link));
  }
  section.className = 'section';
  section.dataset.status = 'decorated';
  section.dataset.idx = idx;
  return {
    blocks: [...links, ...blocks],
    el: section,
    idx,
    preloadLinks: filterDuplicatedLinkBlocks(blockLinks.autoBlocks),
  };
}

function decorateSections(el, isDoc) {
  const selector = isDoc ? 'body > main > div' : ':scope > div';
  return [...el.querySelectorAll(selector)].map(decorateSection);
}

export async function decorateFooterPromo(doc = document) {
  const footerPromoTag = getMetadata('footer-promo-tag', doc);
  const footerPromoType = getMetadata('footer-promo-type', doc);
  if (!footerPromoTag && footerPromoType !== 'taxonomy') return;

  const { default: initFooterPromo } = await import('../features/footer-promo.js');
  await initFooterPromo(footerPromoTag, footerPromoType, doc);
}

const getMepValue = (val) => {
  const valMap = { on: true, off: false, postLCP: 'postlcp' };
  const finalVal = val?.toLowerCase().trim();
  if (finalVal in valMap) return valMap[finalVal];
  return finalVal;
};

const getMdValue = (key) => {
  const value = getMetadata(key);
  if (value) {
    return getMepValue(value);
  }
  return false;
};

const getPromoMepEnablement = () => {
  const mds = [
    'apac_manifestnames',
    'emea_manifestnames',
    'americas_manifestnames',
    'jp_manifestnames',
    'manifestnames',
  ];
  const mdObject = mds.reduce((obj, key) => {
    const val = getMdValue(key);
    if (val) {
      obj[key] = val;
    }
    return obj;
  }, {});
  if (Object.keys(mdObject).length) {
    return mdObject;
  }
  return false;
};

export const getMepEnablement = (mdKey, paramKey = false) => {
  const paramValue = PAGE_URL.searchParams.get(paramKey || mdKey);
  if (paramValue) return getMepValue(paramValue);
  if (PROMO_PARAM === paramKey) return getPromoMepEnablement();
  return getMdValue(mdKey);
};

let imsLoaded;
export async function loadIms() {
  imsLoaded = imsLoaded || new Promise((resolve, reject) => {
    const {
      locale, imsClientId, imsScope, env, base, adobeid, imsTimeout,
    } = getConfig();
    if (!imsClientId) {
      reject(new Error('Missing IMS Client ID'));
      return;
    }
    const [unavMeta, ahomeMeta] = [getMetadata('universal-nav')?.trim(), getMetadata('adobe-home-redirect')];
    const defaultScope = `AdobeID,openid,gnav${unavMeta && unavMeta !== 'off' ? ',pps.read,firefly_api,additional_info.roles,read_organizations' : ''}`;
    const timeout = setTimeout(() => reject(new Error('IMS timeout')), imsTimeout || 5000);
    window.adobeid = {
      client_id: imsClientId,
      scope: imsScope || defaultScope,
      locale: locale?.ietf?.replace('-', '_') || 'en_US',
      redirect_uri: ahomeMeta === 'on'
        ? `https://www${env.name !== 'prod' ? '.stage' : ''}.adobe.com${locale.prefix}` : undefined,
      autoValidateToken: true,
      environment: env.ims,
      useLocalStorage: false,
      onReady: () => {
        resolve();
        clearTimeout(timeout);
      },
      onError: reject,
      ...adobeid,
    };
    const path = PAGE_URL.searchParams.get('useAlternateImsDomain')
      ? 'https://auth.services.adobe.com/imslib/imslib.min.js'
      : `${base}/deps/imslib.min.js`;
    loadScript(path);
  }).then(() => {
    if (getMepEnablement('xlg') === 'loggedout') {
      /* c8 ignore next */
      getConfig().entitlements();
    } else if (!window.adobeIMS?.isSignedInUser()) {
      getConfig().entitlements([]);
    }
  }).catch((e) => {
    getConfig().entitlements([]);
    throw e;
  });

  return imsLoaded;
}

export async function loadMartech({
  persEnabled = false,
  persManifests = [],
  postLCP = false,
} = {}) {
  // eslint-disable-next-line no-underscore-dangle
  if (window.marketingtech?.adobe?.launch && window._satellite) {
    return true;
  }

  if (PAGE_URL.searchParams.get('martech') === 'off'
    || PAGE_URL.searchParams.get('marketingtech') === 'off'
    || getMetadata('martech') === 'off') {
    return false;
  }

  window.targetGlobalSettings = { bodyHidingEnabled: false };
  loadIms().catch(() => { });

  const { default: initMartech } = await import('../martech/martech.js');
  await initMartech({ persEnabled, persManifests, postLCP });

  return true;
}

/**
 * Checks if the user is signed out based on the server timing and navigation performance.
 *
 * @returns {boolean} True if the user is signed out, otherwise false.
 */
function isSignedOut() {
  const serverTiming = window.performance?.getEntriesByType('navigation')?.[0]?.serverTiming?.reduce(
    (acc, { name, description }) => ({ ...acc, [name]: description }),
    {},
  );

  return !Object.keys(serverTiming || {}).length || serverTiming?.sis === '0';
}

/**
 * Enables personalization (V2) for the page.
 *
 * @returns {boolean} True if personalization is enabled, otherwise false.
 */
export function enablePersonalizationV2() {
  const enablePersV2 = document.head.querySelector('meta[name="personalization-v2"]');
  return !!enablePersV2 && isSignedOut();
}

async function checkForPageMods() {
  const {
    mep: mepParam,
    mepHighlight,
    mepButton,
    martech,
  } = Object.fromEntries(PAGE_URL.searchParams);
  let targetInteractionPromise = null;
  if (mepParam === 'off') return;
  const pzn = getMepEnablement('personalization');
  const promo = getMepEnablement('manifestnames', PROMO_PARAM);
  const target = martech === 'off' ? false : getMepEnablement('target');
  const xlg = martech === 'off' ? false : getMepEnablement('xlg');

  if (!(pzn || target || promo || mepParam
    || mepHighlight || mepButton || mepParam === '' || xlg)) return;

  const enablePersV2 = enablePersonalizationV2();
  if ((target || xlg) && enablePersV2) {
    const params = new URL(window.location.href).searchParams;
    const calculatedTimeout = parseInt(params.get('target-timeout'), 10)
      || parseInt(getMetadata('target-timeout'), 10)
      || TARGET_TIMEOUT_MS;

    const { locale } = getConfig();
    targetInteractionPromise = (async () => {
      const { loadAnalyticsAndInteractionData } = await import('../martech/helpers.js');
      const now = performance.now();
      performance.mark('interaction-start');
      const data = await loadAnalyticsAndInteractionData(
        { locale, env: getEnv({})?.name, calculatedTimeout },
      );
      performance.mark('interaction-end');
      performance.measure('total-time', 'interaction-start', 'interaction-end');
      const respTime = performance.getEntriesByName('total-time')[0];

      return { targetInteractionData: data, respTime, respStartTime: now };
    })();

    const { init } = await import('../features/personalization/personalization.js');
    await init({
      mepParam,
      mepHighlight,
      mepButton,
      pzn,
      promo,
      target,
      targetInteractionPromise,
      calculatedTimeout,
    });
    return;
  }
  if (target || xlg) {
    loadMartech();
  } else if (pzn && martech !== 'off') {
    loadIms()
      .then(() => {
        /* c8 ignore next */
        if (window.adobeIMS?.isSignedInUser()) loadMartech();
      })
      .catch((e) => { console.log('Unable to load IMS:', e); });
  }

  const { init } = await import('../features/personalization/personalization.js');
  await init({
    mepParam, mepHighlight, mepButton, pzn, promo, target, targetInteractionPromise,
  });
}

async function loadPostLCP(config) {
  await decoratePlaceholders(document.body.querySelector('header'), config);
  const sk = document.querySelector('aem-sidekick, helix-sidekick');
  if (sk) import('./sidekick-decorate.js').then((mod) => { mod.default(sk); });
  if (config.mep?.targetEnabled === 'postlcp') {
    /* c8 ignore next 2 */
    const { init } = await import('../features/personalization/personalization.js');
    await init({ postLCP: true });
    if (enablePersonalizationV2()) {
      loadMartech();
    }
  } else {
    loadMartech();
  }

  const georouting = getMetadata('georouting') || config.geoRouting;
  if (georouting === 'on') {
    const { default: loadGeoRouting } = await import('../features/georoutingv2/georoutingv2.js');
    await loadGeoRouting(config, createTag, getMetadata, loadBlock, loadStyle);
  }
  const header = document.querySelector('header');
  if (header) {
    header.classList.add('gnav-hide');
    await loadBlock(header);
    header.classList.remove('gnav-hide');
  }
  loadTemplate();
  const { default: loadFonts } = await import('./fonts.js');
  loadFonts(config.locale, loadStyle);

  if (config?.mep) {
    import('../features/personalization/personalization.js')
      .then(({ addMepAnalytics }) => addMepAnalytics(config, header));
  }
}

export function scrollToHashedElement(hash) {
  if (!hash || /=/.test(hash)) return; // skip if hash is used for deeplinking.
  const elementId = decodeURIComponent(hash).slice(1);
  let targetElement;
  try {
    targetElement = document.querySelector(`#${elementId}:not(.dialog-modal)`);
  } catch (e) {
    window.lana?.log(`Could not query element because of invalid hash - ${elementId}: ${e.toString()}`);
  }
  if (!targetElement) return;
  const bufferHeight = document.querySelector('.global-navigation')?.offsetHeight || 0;
  const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: topOffset - bufferHeight,
    behavior: 'smooth',
  });
}

export async function loadDeferred(area, blocks, config) {
  area.dispatchEvent(new Event(MILO_EVENTS.DEFERRED));

  if (area !== document) {
    return;
  }

  config.resolveDeferred?.(true);

  if (config.links === 'on') {
    const path = `${config.contentRoot || ''}${getMetadata('links-path') || '/seo/links.json'}`;
    import('../features/links.js').then((mod) => mod.default(path, area));
  }

  if (config.locale?.ietf === 'ja-JP') {
    // Japanese word-wrap
    import('../features/japanese-word-wrap.js').then(({ default: controlJapaneseLineBreaks }) => {
      controlJapaneseLineBreaks(config, area);
    });
  }

  if (getMetadata('pageperf') === 'on') {
    import('./logWebVitals.js')
      .then((mod) => mod.default(getConfig().mep, {
        delay: getMetadata('pageperf-delay'),
        sampleRate: parseInt(getMetadata('pageperf-rate'), 10),
      }));
  }
  if (config.mep?.preview) {
    import('../features/personalization/preview.js')
      .then(({ default: decoratePreviewMode }) => decoratePreviewMode());
  }
  if (config?.dynamicNavKey && config?.env?.name !== 'prod') {
    const { miloLibs } = config;
    loadStyle(`${miloLibs}/features/dynamic-navigation/status.css`);
    const { default: loadDNStatus } = await import('../features/dynamic-navigation/status.js');
    loadDNStatus();
  }
}

function initSidekick() {
  const initPlugins = async () => {
    const { default: init } = await import('./sidekick.js');
    init({ createTag, loadBlock, loadScript, loadStyle });
  };

  if (document.querySelector('aem-sidekick, helix-sidekick')) {
    initPlugins();
  } else {
    document.addEventListener('sidekick-ready', () => {
      initPlugins();
    });
  }
}

function decorateMeta() {
  const { origin } = window.location;
  const contents = document.head.querySelectorAll('[content*=".hlx."], [content*=".aem."]');
  contents.forEach((meta) => {
    if (meta.getAttribute('property') === 'hlx:proxyUrl' || meta.getAttribute('name')?.endsWith('schedule')) return;
    try {
      const url = new URL(meta.content);
      const localizedLink = localizeLink(`${origin}${url.pathname}`);
      const localizedURL = localizedLink.includes(origin) ? localizedLink : `${origin}${localizedLink}`;
      meta.setAttribute('content', `${localizedURL}${url.search}${url.hash}`);
    } catch (e) {
      window.lana?.log(`Cannot make URL from metadata - ${meta.content}: ${e.toString()}`);
    }
  });

  // Event-based modal
  window.addEventListener('modal:open', async (e) => {
    const { miloLibs } = getConfig();
    const { findDetails, getModal } = await import('../blocks/modal/modal.js');
    loadStyle(`${miloLibs}/blocks/modal/modal.css`);
    const details = findDetails(e.detail.hash);
    if (details) getModal(details);
  });
}

function decorateDocumentExtras() {
  decorateMeta();
  decorateHeader();
}

async function documentPostSectionLoading(config) {
  decorateFooterPromo();
  if (getMetadata('seotech-structured-data') === 'on' || getMetadata('seotech-video-url')) {
    import('../features/seotech/seotech.js').then((module) => module.default(
      { locationUrl: window.location.href, getMetadata, createTag, getConfig },
    ));
  }
  const richResults = getMetadata('richresults');
  if (richResults) {
    const { default: addRichResults } = await import('../features/richresults.js');
    addRichResults(richResults, { createTag, getMetadata });
  }
  loadFooter();
  const { default: loadFavIcon } = await import('./favicon.js');
  loadFavIcon(createTag, getConfig(), getMetadata);
  if (config.experiment?.selectedVariant?.scripts?.length) {
    config.experiment.selectedVariant.scripts.forEach((script) => loadScript(script));
  }
  initSidekick();

  const { default: delayed } = await import('../scripts/delayed.js');
  delayed([getConfig, getMetadata, loadScript, loadStyle, loadIms]);

  import('../martech/attributes.js').then((analytics) => {
    document.querySelectorAll('main > div').forEach((section, idx) => analytics.decorateSectionAnalytics(section, idx, config));
  });

  document.body.appendChild(createTag('div', { id: 'page-load-ok-milo', style: 'display: none;' }));
}

export function partition(arr, fn) {
  return arr.reduce(
    (acc, val, i, ar) => {
      acc[fn(val, i, ar) ? 0 : 1].push(val);
      return acc;
    },
    [[], []],
  );
}

const preloadBlockResources = (blocks = []) => blocks.map((block) => {
  if (block.classList.contains('hide-block')) return null;
  const { blockPath, hasStyles, name } = getBlockData(block);
  if (['marquee', 'hero-marquee'].includes(name)) {
    loadLink(`${getConfig().base}/utils/decorate.js`, { rel: 'preload', as: 'script', crossorigin: 'anonymous' });
  }
  loadLink(`${blockPath}.js`, { rel: 'preload', as: 'script', crossorigin: 'anonymous' });
  return hasStyles && new Promise((resolve) => { loadStyle(`${blockPath}.css`, resolve); });
}).filter(Boolean);

async function resolveInlineFrags(section) {
  const inlineFrags = [...section.el.querySelectorAll('a[href*="#_inline"]')];
  if (!inlineFrags.length) return;
  const { default: loadInlineFrags } = await import('../blocks/fragment/fragment.js');
  const fragPromises = inlineFrags.map((link) => loadInlineFrags(link));
  await Promise.all(fragPromises);
  const newlyDecoratedSection = decorateSection(section.el, section.idx);
  section.blocks = newlyDecoratedSection.blocks;
  section.preloadLinks = newlyDecoratedSection.preloadLinks;
}

async function processSection(section, config, isDoc) {
  await resolveInlineFrags(section);
  const firstSection = section.el.dataset.idx === '0';
  const stylePromises = firstSection ? preloadBlockResources(section.blocks) : [];
  preloadBlockResources(section.preloadLinks);
  await Promise.all([
    decoratePlaceholders(section.el, config),
    decorateIcons(section.el, config),
  ]);
  const loadBlocks = [...stylePromises];
  if (section.preloadLinks.length) {
    const [modals, blocks] = partition(section.preloadLinks, (block) => block.classList.contains('modal'));
    await Promise.all(blocks.map((block) => loadBlock(block)));
    modals.forEach((block) => loadBlock(block));
  }

  section.blocks.forEach((block) => loadBlocks.push(loadBlock(block)));

  // Only move on to the next section when all blocks are loaded.
  await Promise.all(loadBlocks);

  delete section.el.dataset.status;
  if (isDoc && firstSection) await loadPostLCP(config);
  delete section.el.dataset.idx;
  return section.blocks;
}

export async function loadArea(area = document) {
  const isDoc = area === document;

  if (isDoc) {
    await checkForPageMods();
    appendHtmlToCanonicalUrl();
    appendSuffixToTitles();
  }
  const config = getConfig();

  if (isDoc) {
    decorateDocumentExtras();
  }

  const sections = decorateSections(area, isDoc);

  const areaBlocks = [];
  for (const section of sections) {
    const sectionBlocks = await processSection(section, config, isDoc);
    areaBlocks.push(...sectionBlocks);

    areaBlocks.forEach((block) => {
      if (!block.className.includes('metadata')) block.dataset.block = '';
    });
  }

  const currentHash = window.location.hash;
  if (currentHash) {
    scrollToHashedElement(currentHash);
  }

  if (isDoc) await documentPostSectionLoading(config);

  await loadDeferred(area, areaBlocks, config);
}

export function loadDelayed() {
  // TODO: remove after all consumers have stopped calling this method
}

export const utf8ToB64 = (str) => window.btoa(unescape(encodeURIComponent(str)));
export const b64ToUtf8 = (str) => decodeURIComponent(escape(window.atob(str)));

export function parseEncodedConfig(encodedConfig) {
  try {
    return JSON.parse(b64ToUtf8(decodeURIComponent(encodedConfig)));
  } catch (e) {
    console.log(e);
  }
  return null;
}

export function createIntersectionObserver({ el, callback, once = true, options = {} }) {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        if (once) observer.unobserve(entry.target);
        callback(entry.target, entry);
      }
    });
  }, options);
  io.observe(el);
  return io;
}

export function loadLana(options = {}) {
  if (window.lana) return;

  const lanaError = (e) => {
    window.lana?.log(e.reason || e.error || e.message, { errorType: 'i' });
  };

  window.lana = {
    log: async (...args) => {
      window.removeEventListener('error', lanaError);
      window.removeEventListener('unhandledrejection', lanaError);
      await import('./lana.js');
      return window.lana.log(...args);
    },
    debug: false,
    options,
  };

  window.addEventListener('error', lanaError);
  window.addEventListener('unhandledrejection', lanaError);
}

export const reloadPage = () => window.location.reload();
