const PROJECT_NAME = 'milo--adobecom';
const PRODUCTION_DOMAINS = ['milo.adobe.com'];
const LCP_BLOCKS = ['hero', 'home', 'marquee', 'section-metadata'];
const AUTO_BLOCKS = [
  { adobetv: 'https://video.tv.adobe.com' },
  { youtube: 'https://www.youtube.com' },
  { gist: 'https://gist.github.com' },
  { caas: '/tools/caas' },
  { faas: '/tools/faas' },
  { fragment: '/fragments/' },
];
const ICON_BLOCKS = ['media', 'z-pattern'];

export function getEnv() {
  const { hostname, href } = window.location;
  const location = new URL(href);
  const env = location.searchParams.get('env');

  /* c8 ignore start */
  if (env) {
    return env;
  }
  if (hostname.includes('localhost')) return 'local';
  if (hostname.includes('hlx.page') || hostname.includes('hlx.live')) return 'stage';

  return 'prod';
  /* c8 ignore stop */
}

export function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = document.head.querySelector(`meta[${attr}="${name}"]`);
  return meta && meta.content;
}

export default function createTag(tag, attributes, html) {
  const el = document.createElement(tag);
  if (html) {
    if (html instanceof HTMLElement) {
      el.append(html);
    } else {
      el.insertAdjacentHTML('beforeend', html);
    }
  }
  if (attributes) {
    Object.entries(attributes).forEach(([key, val]) => {
      el.setAttribute(key, val);
    });
  }
  return el;
}

export function makeRelative(href) {
  const fixedHref = href.replace(/\u2013|\u2014/g, '--');
  const hosts = [`${PROJECT_NAME}.hlx.page`, `${PROJECT_NAME}.hlx.live`, ...PRODUCTION_DOMAINS];
  const url = new URL(fixedHref);
  const relative = hosts.some((host) => url.hostname.includes(host))
    || url.hostname === window.location.hostname;
  return relative ? `${url.pathname}${url.search}${url.hash}` : href;
}

export function loadStyle(href, callback) {
  let link = document.head.querySelector(`link[href="${href}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
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

export async function loadBlock(block) {
  const { status } = block.dataset;
  if (!status === 'loaded') return block;
  block.dataset.status = 'loading';
  const blockName = block.classList[0];
  const styleLoaded = new Promise((resolve) => {
    loadStyle(`/libs/blocks/${blockName}/${blockName}.css`, resolve);
  });
  const scriptLoaded = new Promise((resolve) => {
    (async () => {
      try {
        const { default: init } = await import(`/libs/blocks/${blockName}/${blockName}.js`);
        await init(block);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`Failed loading ${blockName}`, err);
      }
      resolve();
    })();
  });
  await Promise.all([styleLoaded, scriptLoaded]);
  delete block.dataset.status;
  const section = block.closest('.section[data-status]');
  if (section) {
    const decoratedBlock = section.querySelector(':scope > [data-status]');
    if (!decoratedBlock) { delete section.dataset.status; }
  }
  return block;
}

export async function loadLCP({ blocks = [], lcpList = LCP_BLOCKS, loader = loadBlock }) {
  const lcpBlock = blocks.find((block) => lcpList.includes(block.classList[0]));
  if (lcpBlock) {
    const lcpIdx = blocks.indexOf(lcpBlock);
    blocks.splice(lcpIdx, 1);
    await loader(lcpBlock, true);
  }
}

export async function loadTokens(blocks, url = '/docs/library/tokens.json') {
  const iconBlock = blocks.find((block) => ICON_BLOCKS.includes(block.classList[0]));
  if (iconBlock) {
    const { getTokenLibrary, decorateIcons } = await import('../utils/decorate.js');
    const tokenLibrary = await getTokenLibrary(url);
    await decorateIcons(tokenLibrary);
  }
}

export function decorateSVG(a) {
  const { textContent, href } = a;
  const ext = textContent?.substr(textContent.lastIndexOf('.') + 1);
  if (ext !== 'svg') return;
  const img = document.createElement('img');
  img.src = makeRelative(textContent);
  const pic = document.createElement('picture');
  pic.append(img);
  if (img.src === href) {
    a.parentElement.replaceChild(pic, a);
  } else {
    a.textContent = '';
    a.append(pic);
  }
}

function decorateAutoBlock(a) {
  const { hostname } = window.location;
  const url = new URL(a.href);
  const href = hostname === url.hostname ? `${url.pathname}${url.search}${url.hash}` : a.href;
  return AUTO_BLOCKS.find((candidate) => {
    const key = Object.keys(candidate)[0];
    const match = href.includes(candidate[key]);
    if (match) {
      // Modals
      if (key === 'fragment' && url.hash !== '') {
        a.dataset.modalPath = url.pathname;
        a.dataset.modalHash = url.hash;
        a.href = url.hash;
        return false;
      }
      a.className = `${key} link-block`;
      return true;
    }
    return false;
  });
}

function decorateLinks(el) {
  const anchors = el.getElementsByTagName('a');
  return [...anchors].reduce((rdx, a) => {
    a.href = makeRelative(a.href);
    decorateSVG(a);
    const autoBLock = decorateAutoBlock(a);
    if (autoBLock) {
      rdx.push(a);
    }
    return rdx;
  }, []);
}

function decoratePictures(el) {
  const styledPictures = el.querySelectorAll('strong > picture, em > picture');
  styledPictures.forEach((picture) => {
    const styleEl = picture.parentElement;
    styleEl.parentElement.replaceChild(picture, styleEl);
  });
}

function decorateBlocks(el) {
  const blocks = el.querySelectorAll('div[class]');
  return [...blocks].map((block) => {
    block.dataset.status = 'decorated';
    return block;
  });
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

export function decorateNavs(el = document) {
  const selectors = [];
  if (getMetadata('nav') !== 'off') { selectors.push('header'); }
  if (getMetadata('footer') !== 'off') { selectors.push('footer'); }
  const navs = el.querySelectorAll(selectors.toString());
  return [...navs].map((nav) => {
    nav.className = nav.nodeName.toLowerCase();
    return nav;
  });
}

function decorateSections(el) {
  el.querySelectorAll('body > main > div').forEach((section) => {
    decorateDefaults(section);
    section.className = 'section';
    // Only mark as decorated if blocks are still loading inside
    const decoratedBlock = section.querySelector(':scope > [data-status]');
    if (decoratedBlock) { section.dataset.status = 'decorated'; }
  });
}

/**
 * Sanitizes a name for use as class name.
 * @param {string} name The unsanitized name
 * @returns {string} The class name
 */
export function toClassName(name) {
  return name && typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-')
    : '';
}

/**
 * Set template (page structure) and theme (page styles).
 */
export async function decorateTemplateAndTheme() {
  const template = getMetadata('template');
  const name = toClassName(template);
  if (template) document.body.classList.add(name);
  const theme = getMetadata('theme');
  if (theme) document.body.classList.add(toClassName(theme));
  if (template) {
    document.body.classList.add(name);
    const styleLoaded = new Promise((resolve) => {
      loadStyle(`/libs/templates/${name}/${name}.css`, resolve);
    });
    const scriptLoaded = new Promise((resolve) => {
      (async () => {
        try {
          await import(`/libs/templates/${name}/${name}.js`);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(`failed to load module for ${name}`, err);
        }
        resolve();
      })();
    });
    await Promise.all([styleLoaded, scriptLoaded]);
  }
}

export function decorateArea(el = document) {
  const linkBlocks = decorateLinks(el);
  const blocks = decorateBlocks(el);
  decoratePictures(el);
  decorateSections(el);
  return [...linkBlocks, ...blocks];
}

export async function loadArea({ blocks, area, loader, noFollowPath }) {
  const el = area || document;
  const blockLoader = loader || loadBlock;
  if (getMetadata('nofollow-links') === 'on') {
    const path = noFollowPath || '/seo/nofollow.json';
    const { default: nofollow } = await import('../features/nofollow.js');
    nofollow(path, el);
  }
  const loaded = blocks.map((block) => blockLoader(block));
  await Promise.all(loaded);
}

/**
 * Load everything that impacts performance later.
 */
export function loadDelayed(delay = 3000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      import('../scripts/delayed.js').then((mod) => {
        resolve(mod);
      });
    }, delay);
  });
}

export const loadScript = (url, type) => new Promise((resolve, reject) => {
  let script = document.querySelector(`head > script[src="${url}"]`);
  if (script) {
    resolve(script);
  } else {
    const { head } = document;
    script = document.createElement('script');
    script.setAttribute('src', url);
    if (type) {
      script.setAttribute('type', type);
    }
    script.onload = () => {
      resolve(script);
    };
    script.onerror = () => {
      reject(new Error('error loading script'));
    };
    head.append(script);
  }
});

/**
 * Load template (page structure and styles).
 */
export async function loadTemplate() {
  const template = getMetadata('template');
  if (!template) return;
  const name = template.toLowerCase().replace(/[^0-9a-z]/gi, '-');
  document.body.classList.add(name);
  const styleLoaded = new Promise((resolve) => {
    loadStyle(`/libs/templates/${name}/${name}.css`, resolve);
  });
  const scriptLoaded = new Promise((resolve) => {
    (async () => {
      try {
        await import(`/libs/templates/${name}/${name}.js`);
      }
      /* c8 ignore start */
      catch (err) {
        // eslint-disable-next-line no-console
        console.log(`failed to load module for ${name}`, err);
      }
      /* c8 ignore end */
      resolve();
    })();
  });
  await Promise.all([styleLoaded, scriptLoaded]);
}

export function utf8ToB64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export function b64ToUtf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

export function parseEncodedConfig(encodedConfig) {
  try {
    return JSON.parse(b64ToUtf8(decodeURIComponent(encodedConfig)));
  } catch (e) {
    console.log(e);
  }
  return null;
}

export function getHashConfig() {
  const { hash } = window.location;
  if (!hash) return null;
  window.location.hash = '';

  const encodedConfig = hash.startsWith('#') ? hash.substring(1) : hash;
  return parseEncodedConfig(encodedConfig);
}

export const isValidUuid = (id) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);

export const cloneObj = (obj) => JSON.parse(JSON.stringify(obj));

export function updateObj(obj, defaultObj) {
  const ds = cloneObj(defaultObj);
  Object.keys(ds).forEach((key) => {
    if (obj[key] === undefined) obj[key] = ds[key];
  });
  return obj;
}
