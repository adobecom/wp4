import { createTag, getMetadata, getConfig } from '../../utils/utils.js';
import { fetchIcons } from '../../features/icons/icons.js';

let copyText = 'Copied to clipboard';

async function validateAuthorUrl(url) {
  if (!url) return null;

  const resp = await fetch(`${url.toLowerCase()}.plain.html`);
  if (!resp?.ok) {
    /* c8 ignore next 3 */
    window.lana?.log(`Could not retrieve metadata for ${url}`, { tags: 'errorType=warn,module=article-header' });
    return null;
  }

  const html = await resp.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  return doc;
}

function openPopup(e) {
  const target = e.target.closest('a');
  const href = target.getAttribute('data-href');
  const type = target.getAttribute('data-type');
  window.open(
    href,
    type,
    'popup,top=233,left=233,width=700,height=467',
  );
}

async function buildAuthorInfo(authorEl, bylineContainer) {
  const { textContent } = authorEl;
  const link = authorEl.href || authorEl.dataset.authorPage;
  const config = getConfig();
  const base = config.miloLibs || config.codeRoot;
  const authorImg = createTag('div', { class: 'article-author-image' });
  authorImg.style.backgroundImage = `url(${base}/blocks/article-header/adobe-logo.svg)`;
  bylineContainer.prepend(authorImg);

  const doc = await validateAuthorUrl(link);
  if (!doc) {
    const p = createTag('p', null, textContent);
    authorEl.replaceWith(p);
    return;
  }

  const img = doc.querySelector('img');
  if (img) {
    img.setAttribute('alt', textContent);
    authorImg.append(img);
    if (!img.complete) {
      img.addEventListener('load', () => {
        authorImg.style.backgroundImage = 'none';
      });
      img.addEventListener('error', () => {
        /* c8 ignore next 1 */
        img.remove();
      });
    } else {
      authorImg.style.backgroundImage = 'none';
    }
  }
}

async function copyToClipboard(button, copyTxt) {
  try {
    await navigator.clipboard.writeText(window.location.href);
    button.setAttribute('title', copyTxt);
    button.setAttribute('aria-label', copyTxt);

    const tooltip = createTag('div', { role: 'status', 'aria-live': 'polite', class: 'copied-to-clipboard' }, copyTxt);
    button.append(tooltip);

    setTimeout(() => {
      /* c8 ignore next 1 */
      tooltip.remove();
    }, 3000);
    button.classList.remove('copy-failure');
    button.classList.add('copy-success');
  } catch (e) {
    button.classList.add('copy-failure');
    button.classList.remove('copy-success');
  }
}

async function updateShareText(shareBlock) {
  const { replaceKey } = await import('../../features/placeholders.js');
  const config = getConfig();
  const labels = [
    `${await replaceKey('share-twitter', config)}`,
    `${await replaceKey('share-linkedin', config)}`,
    `${await replaceKey('share-facebook', config)}`,
    `${await replaceKey('copy-to-clipboard', config)}`,
  ];
  const shareLinks = shareBlock.querySelectorAll('a');
  [...shareLinks].forEach((el, index) => el.setAttribute('aria-label', labels[index]));
  copyText = await replaceKey('copied-to-clipboard', config);
}

async function buildSharing() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.querySelector('h1').textContent);
  const description = encodeURIComponent(getMetadata('description'));
  const platformMap = {
    twitter: {
      'data-href': `https://www.twitter.com/share?&url=${url}&text=${title}`,
      'aria-label': 'share twitter',
      tabindex: '0',
    },
    linkedin: {
      'data-type': 'LinkedIn',
      'data-href': `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${description || ''}`,
      'aria-label': 'share linkedin',
      tabindex: '0',
    },
    facebook: {
      'data-type': 'Facebook',
      'data-href': `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      'aria-label': 'share facebook',
      tabindex: '0',
    },
    link: {
      id: 'copy-to-clipboard',
      'aria-label': 'copy to clipboard',
      tabindex: '0',
    },
  };

  const platforms = Object.keys(platformMap);
  const svgs = await fetchIcons(getConfig());
  const allAnchorTags = platforms.map((platform) => {
    const platformProperties = platformMap[platform];
    if (platformProperties) {
      return createTag('a', platformProperties, svgs[platform].cloneNode(true));
    }
    return null;
  }).filter(Boolean);

  const sharing = createTag('div', { class: 'article-byline-sharing' });
  allAnchorTags.forEach((anchorTag) => {
    const span = createTag('span', null, anchorTag);
    sharing.append(span);
  });

  sharing.querySelectorAll('[data-href]').forEach((link) => {
    link.addEventListener('click', openPopup);
  });
  const copyButton = sharing.querySelector('#copy-to-clipboard');
  copyButton.addEventListener('click', () => copyToClipboard(copyButton, copyText));

  return sharing;
}

function validateDate(date) {
  const { env } = getConfig();
  if (env?.name === 'prod') return;
  if (date && !/^[0-1]\d{1}-[0-3]\d{1}-[2]\d{3}$/.test(date.textContent.trim())) {
    date.classList.add('article-date-invalid');
    date.setAttribute('title', 'Invalid Date Format: Must be MM-DD-YYYY');
  }
}

function decorateFigure(el) {
  el.classList.add('article-feature-image');
  const picture = el.querySelector('picture');
  const caption = el.querySelector('em');
  const figure = document.createElement('figure');

  if (caption) {
    caption.classList.add('caption');
    const figcaption = document.createElement('figcaption');
    figcaption.append(caption);
    figure.append(figcaption);
  }

  figure.classList.add('figure-feature');
  figure.prepend(picture);
  el.prepend(figure);
  el.lastElementChild.remove();
}

export default async function init(blockEl) {
  const childrenEls = Array.from(blockEl.children);
  const categoryContainer = childrenEls[0];
  const categoryEl = categoryContainer.firstElementChild.firstElementChild;
  if (categoryEl?.textContent) {
    const { getTaxonomyModule, loadTaxonomy, getLinkForTopic } = await import('../article-feed/article-helpers.js');
    if (!getTaxonomyModule()) await loadTaxonomy();
    const categoryTag = getLinkForTopic(categoryEl.textContent);
    categoryEl.innerHTML = categoryTag;
  }
  categoryContainer.classList.add('article-category');

  const titleContainer = childrenEls[1];
  titleContainer.classList.add('article-title');

  const bylineContainer = childrenEls[2];
  bylineContainer.classList.add('article-byline');
  bylineContainer.firstElementChild.classList.add('article-byline-info');

  const authorContainer = bylineContainer.firstElementChild.firstElementChild;
  const authorEl = authorContainer.firstElementChild;
  authorContainer.classList.add('article-author');

  buildAuthorInfo(authorEl, bylineContainer);

  const date = bylineContainer.querySelector('.article-byline-info > p:last-child');
  date.classList.add('article-date');
  validateDate(date);

  const shareBlock = await buildSharing();
  bylineContainer.append(shareBlock);

  const featureImgContainer = childrenEls[3];
  decorateFigure(featureImgContainer);

  document.addEventListener('milo:deferred', () => updateShareText(shareBlock));
}
