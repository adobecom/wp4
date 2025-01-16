import { applyHoverPlay, decorateAnchorVideo, applyAccessibilityEvents, decoratePausePlayWrapper, isVideoAccessible } from '../../utils/decorate.js';
import { createTag } from '../../utils/utils.js';

function buildCaption(pEl) {
  const figCaptionEl = document.createElement('figcaption');
  pEl.classList.add('caption');
  figCaptionEl.append(pEl);
  return figCaptionEl;
}

function htmlToElement(html) {
  const template = document.createElement('template');
  const convertHtml = html.trim();
  template.innerHTML = convertHtml;
  return template.content.firstChild;
}

function decorateVideo(clone, figEl) {
  const videoTag = clone.querySelector('video');
  const anchorTag = clone.querySelector('a[href*=".mp4"]');
  if (anchorTag && !anchorTag.hash) anchorTag.hash = '#autoplay';
  if (anchorTag) decorateAnchorVideo({ src: anchorTag.href, anchorTag });
  if (videoTag) {
    videoTag.removeAttribute('data-mouseevent');
    if (videoTag.dataset?.videoSource) {
      videoTag.appendChild(
        createTag('source', {
          src: videoTag.dataset?.videoSource,
          type: 'video/mp4',
        }),
      );
    }
    applyHoverPlay(videoTag);
    if (!videoTag.controls && isVideoAccessible(anchorTag)) {
      applyAccessibilityEvents(videoTag);
      decoratePausePlayWrapper(videoTag, 'autoplay');
    }
    figEl.prepend(clone.querySelector('.video-container, .pause-play-wrapper, video'));
  }
}

export function buildFigure(blockEl) {
  const figEl = document.createElement('figure');
  figEl.classList.add('figure');
  Array.from(blockEl.children).forEach((child) => {
    const clone = child.cloneNode(true);
    // picture, video, or embed link is NOT wrapped in P tag
    const tags = ['PICTURE', 'VIDEO', 'A'];
    if (tags.includes(clone.nodeName) || (clone.nodeName === 'SPAN' && clone.classList.contains('modal-img-link'))) {
      if (clone.href?.includes('.mp4')) {
        const videoPlaceholderLink = `<p>${clone.outerHTML}</p>`;
        const videoLink = htmlToElement(videoPlaceholderLink);
        decorateVideo(videoLink, figEl);
      }
      figEl.prepend(clone);
    } else {
      // content wrapped in P tag(s)
      const imageVideo = clone.querySelector('.modal-img-link');
      if (imageVideo) {
        figEl.prepend(imageVideo);
      }
      const picture = clone.querySelector('picture');
      if (picture) {
        figEl.prepend(picture);
      }
      decorateVideo(clone, figEl);
      const caption = clone.querySelector('em');
      if (caption) {
        const figElCaption = buildCaption(caption);
        figEl.append(figElCaption);
      }
      const link = clone.querySelector('a');
      if (link) {
        const img = figEl.querySelector('picture') || figEl.querySelector('video');
        if (img && !link.classList.contains('pause-play-wrapper')) {
          // wrap picture or video in A tag
          link.textContent = '';
          link.append(img);
        }
        figEl.prepend(link);
      }
    }
  });
  return figEl;
}

export default function init(blockEl) {
  const children = blockEl.querySelectorAll(':scope > div > div');
  blockEl.innerHTML = '';

  const blockCount = children.length;
  if (!children.length) return;

  // For each child, creates a figure element using the buildFigure function
  // and adds it as a child of the given element
  children.forEach((pic) => {
    const figureEL = buildFigure(pic);
    blockEl.append(figureEL);
  });

  if (blockCount > 1) {
    blockEl.classList.add('figure-list', `figure-list-${blockCount}`);
  }
}
