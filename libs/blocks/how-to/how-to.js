import { createTag } from '../../utils/utils.js';
import { decorateTextOverrides } from '../../utils/decorate.js';

const getSrc = (image) => image.src || image.querySelector('[src]')?.src || image.href;

const getStepLd = (count, divId, image, step) => ({
  '@type': 'HowToStep',
  url: `${window.location.href}#${divId}`,
  name: `Step ${count}`,
  ...(image && { image: getSrc(image) }),
  itemListElement: [
    {
      '@type': 'HowToDirection',
      text: step.innerText?.trim(),
    },
  ],
});

const setJsonLd = (heading, description, mainImage, stepsLd) => {
  const jsonLd = {
    '@context': 'http://schema.org',
    '@type': 'HowTo',
    name: heading,
    description,
    publisher: {
      '@type': 'Organization',
      name: 'Adobe',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.adobe.com/content/dam/cc/icons/Adobe_Corporate_Horizontal_Red_HEX.svg',
      },
    },
    step: stepsLd,
  };

  if (mainImage) {
    jsonLd['@image'] = {
      '@type': 'ImageObject',
      url: getSrc(mainImage),
    };
  }

  const jsonLdScript = document.createElement('script');
  jsonLdScript.type = 'application/ld+json';
  jsonLdScript.text = JSON.stringify(jsonLd);
  document.getElementsByTagName('head')[0].appendChild(jsonLdScript);
};

const getImage = (el) => el.querySelector('picture') || el.querySelector('a[href$=".svg"');
const getVideo = (el) => el.querySelector('.video-container, .pause-play-wrapper, video, .milo-video');

const getHowToInfo = (el) => {
  const infoDiv = el.querySelector(':scope > div > div');
  if (!infoDiv) return {};

  const heading = infoDiv.firstElementChild;
  heading.classList.add('heading-xl');
  if (!heading.id) {
    heading.id = heading.textContent.replace(/\s+/g, '-').toLowerCase();
  }

  const image = getImage(infoDiv.lastElementChild);
  const video = getVideo(infoDiv.lastElementChild);

  const desc = infoDiv.childElementCount > 2 || (infoDiv.childElementCount === 2 && !image)
    ? infoDiv.children[1]
    : infoDiv.children[2] || '';

  const newParentEl = infoDiv.parentElement;
  infoDiv.remove();
  newParentEl.append(heading, desc);
  newParentEl.className = 'how-to-heading';

  return {
    heading,
    desc,
    mainImage: image,
    mainVideo: video,
  };
};

const getLegacyList = (rows) => {
  const rowArray = [...rows];
  rowArray.shift();
  const list = createTag('ol');
  rowArray.forEach((row) => {
    list.append(createTag('li', null, row.innerHTML));
  });
  Array.from(rows).forEach((row, idx) => { if (idx > 1) row.remove(); });
  return list;
};

const getHowToSteps = (el) => {
  const stepsDiv = el.children[1]?.firstElementChild;
  let list = stepsDiv?.querySelector('ol, ul');
  if (!list) list = getLegacyList(el.children);

  const steps = [...list.children].reduce(
    (stepInfo, step, idx) => {
      step.append(createTag('div', {}, [...step.childNodes]));
      stepInfo.steps.push(step);
      const img = getImage(step);
      if (img) {
        stepInfo.images[idx] = img;
        if (img.previousElementSibling.nodeName === 'BR') {
          img.previousElementSibling.remove();
        }
        step.insertBefore(img, step.firstElementChild);
      }
      return stepInfo;
    },
    { steps: [], images: {} },
  );

  el.children[1]?.remove();
  return steps;
};

export default function init(el) {
  el.classList.add('con-block');
  const isSeo = el.classList.contains('seo');
  const isLargeMedia = el.classList.contains('large-image') || el.classList.contains('large-media');

  const { desc, heading, mainImage, mainVideo } = getHowToInfo(el);
  const { steps, images } = getHowToSteps(el);

  const orderedList = document.createElement('ol');
  if (steps) orderedList.append(...steps);

  if (mainImage) {
    const imageClass = `how-to-media${isLargeMedia ? ' how-to-media-large' : ''}`;
    el.append(createTag('div', { class: imageClass }, mainImage));
  }

  if (mainVideo) {
    const videoClass = `how-to-media${isLargeMedia ? ' how-to-media-large video' : ''}`;
    el.append(createTag('div', { class: videoClass }, mainVideo));
  }

  if (isSeo) {
    const stepsLd = steps.map((step, idx) => getStepLd(idx + 1, heading.id, images[idx], step));
    setJsonLd(heading?.textContent, desc?.textContent, mainImage, stepsLd);
  }
  decorateTextOverrides(el);
  const rows = el.querySelectorAll(':scope > div');
  const foreground = createTag('div', { class: 'foreground' });
  if (mainImage) foreground.classList.add('has-image');
  if (mainVideo) foreground.classList.add('has-video');
  rows.forEach((row) => { foreground.appendChild(row); });
  foreground.appendChild(orderedList);
  el.appendChild(foreground);
}
