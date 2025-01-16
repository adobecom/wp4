/*
 * Marquee Anchors
 */
import { createTag, getConfig } from '../../utils/utils.js';
import { decorateBlockText, getBlockSize, decorateBlockBg } from '../../utils/decorate.js';

// size: [heading, body, ...detail]
const blockTypeSizes = {
  default: {
    xsmall: ['xs', 'xs', 'xs'],
    small: ['m', 's', 's'],
    medium: ['l', 'm', 'm'],
    large: ['xl', 'm', 'l'],
    xlarge: ['xxl', 'l', 'xl'],
  },
};

const fetchedIcons = {};
function decorateAnchors(anchors) {
  const linkGroup = createTag('div', { class: 'links-group' });
  anchors[0].insertAdjacentElement('beforebegin', linkGroup);
  const { miloLibs, codeRoot } = getConfig();
  let base = miloLibs || codeRoot;
  if (!base) base = 'https://milo.adobe.com/libs';
  const iconList = ['arrow-down', 'link-external'];
  [...iconList].forEach((icon) => {
    if (!fetchedIcons[icon]) {
      const iconImg = createTag('img', {
        alt: icon,
        class: 'icon-milo',
        src: `${base}/img/ui/${icon}.svg`,
      });
      fetchedIcons[icon] = iconImg;
    }
  });
  const iconAnchor = createTag('span', { class: 'icon-ui anchor' }, fetchedIcons['arrow-down']);
  const iconExternal = createTag('span', { class: 'icon-ui external' }, fetchedIcons['link-external']);
  [...anchors].forEach((el) => {
    const hTags = el.querySelectorAll('h1, h2, h3, h4, h5, h6');
    [...hTags].forEach((h) => { h.id = `anchor-${h.id}`; });
    el.append(el.classList.contains('external') ? iconExternal.cloneNode(true) : iconAnchor.cloneNode(true));
    linkGroup.append(el);
  });
}

export default function init(el) {
  el.classList.add('con-block');
  const size = getBlockSize(el);
  const rows = el.querySelectorAll(':scope > div');
  const [background, copy, ...list] = [...rows];
  background.classList.add('background');
  copy.classList.add('copy');
  decorateBlockBg(el, background);
  decorateBlockText(copy, blockTypeSizes.default[size]);
  const links = createTag('div', { class: 'links' }, list);
  const foreground = createTag('div', { class: 'foreground' }, copy);
  foreground.append(links);
  el.append(foreground);

  [...list].forEach((i, index) => {
    decorateBlockText(i, blockTypeSizes.default.xsmall);
    const aTag = i.querySelector('a');
    if (aTag?.textContent.charAt(0) === '#') {
      const content = i.querySelector(':scope > div');
      const aTagText = aTag.textContent.toLowerCase();
      aTag.textContent = '';
      aTag.classList.add('anchor-link');
      i.parentElement.replaceChild(aTag, i);
      aTag.append(content);
      const hrefPathEqual = (aTag.href.split(/\?|#/)[0] === window.location.href.split(/\?|#/)[0]);
      if (hrefPathEqual) {
        aTag.href = aTagText;
      } else {
        aTag.classList.add('external');
      }
    } else {
      i.classList.add(`links-${index === 0 ? 'header' : 'footer'}`);
    }
  });

  const anchors = el.querySelectorAll('.anchor-link');
  if (anchors.length) decorateAnchors(anchors);
}
