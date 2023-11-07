import { createTag, loadStyle, getConfig } from '../../utils/utils.js';
import { getMetadata, handleStyle } from '../section-metadata/section-metadata.js';

function getHref(urls) {
  let href = null;
  if (urls?.helpx !== '' || urls?.helpx !== null) {
    href = urls.helpx;
  } else if (urls?.helpx_iframe !== '' || urls?.helpx_iframe !== null) {
    href = urls.helpx_iframe;
  } else if (urls?.low_url !== '' || urls?.low_url !== null) {
    href = urls.low_url;
  }

  return href;
}

async function loadCards(el, tutorials) {
  for (const tutorial of tutorials) {
    const image = tutorial.metadata?.images?.thumbnail || 'https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg';
    const title = tutorial.metadata?.title || null;
    const descriptions = tutorial.metadata?.descriptions || {};
    const text = descriptions?.short || descriptions?.medium || descriptions?.long || null;
    const urls = tutorial.metadata?.urls || {};
    const href = getHref(urls);

    const card = createTag('div', { class: 'card consonant-Card consonant-OneHalfCard' });
    const cardImage = createTag('div', { class: 'consonant-OneHalfCard-img', style: `background-image: url(${image})` });
    const cardInner = createTag('div', { class: 'consonant-OneHalfCard-inner' });
    const cardInnerAlign = createTag('div', { dataValign: 'middle' });
    const heading = createTag('h3', { class: 'consonant-OneHalfCard-title' }, `${title}`);
    const desc = createTag('p', { class: 'consonant-OneHalfCard-text' }, `${text}`);
    const footer = createTag(
      'div',
      { class: 'consonant-CardFooter' },
      `<div class="consonant-CardFooter-row" data-cells="1">
      <div class="consonant-CardFooter-cell consonant-CardFooter-cell--left">
      <a href="${href}" class="con-button blue">Learn more</a>
      </div></div>`,
    );

    cardInner.append(cardInnerAlign);
    cardInnerAlign.append(heading);
    cardInnerAlign.append(desc);
    cardInner.append(footer);

    card.append(cardImage);
    card.append(cardInner);

    el.append(card);
    console.log(tutorial.metadata, image, title, text, href);
  }
}

async function loadTutorials(inputText, ficode, total) {
  const { default: getTutorials } = await import('./quiz-dynamic-tutorials-utils.js');
  return getTutorials(inputText, ficode, total);
}

export default async function init(el) {
  const { miloLibs, codeRoot } = getConfig();
  const base = miloLibs || codeRoot;
  loadStyle(`${base}/deps/caas.css`);

  const data = getMetadata(el);
  const tutorials = await loadTutorials(data.text.text, data.ficode.text, Number(data['total-tutorials'].text));

  el.replaceChildren();
  loadCards(el, tutorials.tutorials);

  if (data.style) {
    el.classList.add('section');
    handleStyle(data.style.text, el);
  }
  el.classList.add('show');
}
