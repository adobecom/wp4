import { createTag, loadStyle, getConfig, createIntersectionObserver } from './utils.js';
import { getFederatedContentRoot, getFedsPlaceholderConfig } from './federated.js';

const { miloLibs, codeRoot } = getConfig();
const HIDE_CONTROLS = '_hide-controls';
let firstVideo = null;
let videoLabels = {
  playMotion: 'Play',
  pauseMotion: 'Pause',
  pauseIcon: 'Pause icon',
  playIcon: 'Play icon',
  hasFetched: false,
};
let videoCounter = 0;

export function decorateButtons(el, size) {
  const buttons = el.querySelectorAll('em a, strong a, p > a strong');
  if (buttons.length === 0) return;
  const buttonTypeMap = { STRONG: 'blue', EM: 'outline', A: 'blue' };
  buttons.forEach((button) => {
    let target = button;
    const parent = button.parentElement;
    const buttonType = buttonTypeMap[parent.nodeName] || 'outline';
    if (button.nodeName === 'STRONG') {
      target = parent;
    } else {
      parent.insertAdjacentElement('afterend', button);
      parent.remove();
    }
    target.classList.add('con-button', buttonType);
    if (size) target.classList.add(size); /* button-l, button-xl */
    const customClasses = target.href && [...target.href.matchAll(/#_button-([a-zA-Z-]+)/g)];
    if (customClasses) {
      customClasses.forEach((match) => {
        target.href = target.href.replace(match[0], '');
        if (target.dataset.modalHash) {
          target.setAttribute('data-modal-hash', target.dataset.modalHash.replace(match[0], ''));
        }
        target.classList.add(match[1]);
      });
    }
    const actionArea = button.closest('p, div');
    if (actionArea) {
      actionArea.classList.add('action-area');
      actionArea.nextElementSibling?.classList.add('supplemental-text', 'body-xl');
    }
  });
}

export function decorateIconStack(el) {
  const ulElems = el.querySelectorAll('ul');
  if (!ulElems.length) return;
  const stackEl = ulElems[ulElems.length - 1];
  stackEl.classList.add('icon-stack-area', 'body-s');
  el.classList.add('icon-stack');
  const items = stackEl.querySelectorAll('li');
  [...items].forEach((i) => {
    const links = i.querySelectorAll('a');
    if (links.length <= 1) return;
    const picIndex = links[0].querySelector('a picture') ? 0 : 1;
    const linkImg = links[picIndex];
    const linkText = links[1 - picIndex];
    const linkPic = linkImg.querySelector('picture');
    if (linkPic) {
      linkText.prepend(linkPic);
      linkImg.remove();
    }
  });
}

export function decorateIconArea(el) {
  const icons = el.querySelectorAll('.icon');
  icons.forEach((icon) => {
    icon.parentElement.classList.add('icon-area');
    if (icon.textContent.includes('persona')) icon.parentElement.classList.add('persona-area');
  });
}

function elContainsText(el) {
  return [...el.childNodes].some(({ nodeType, innerText, textContent }) => (
    (nodeType === Node.ELEMENT_NODE && innerText.trim() !== '')
    || (nodeType === Node.TEXT_NODE && textContent.trim() !== '')
  ));
}

export function decorateBlockText(el, config = ['m', 's', 'm'], type = null) {
  if (!el.classList.contains('default')) {
    let headings = el?.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings) {
      if (type === 'hasDetailHeading' && headings.length > 1) headings = [...headings].splice(1);
      headings.forEach((h) => h.classList.add(`heading-${config[0]}`));
      if (config[2]) {
        const prevSib = headings[0]?.previousElementSibling;
        prevSib?.classList.toggle(`detail-${config[2]}`, !prevSib.querySelector('picture'));
        decorateIconArea(el);
      }
    }
    const bodyStyle = `body-${config[1]}`;
    const emptyEls = el?.querySelectorAll(':is(p, ul, ol, div):not([class])');
    if (emptyEls.length) {
      [...emptyEls].filter(elContainsText).forEach((e) => e.classList.add(bodyStyle));
    } else if (!el.classList.length && elContainsText(el)) {
      el.classList.add(bodyStyle);
    }
  }
  const buttonSize = config.length > 3 ? `button-${config[3]}` : '';
  decorateButtons(el, buttonSize);
  if (type === 'merch') decorateIconStack(el);
}

export function handleFocalpoint(pic, child, removeChild) {
  const image = pic.querySelector('img');
  if (!child || !image) return;
  let text = '';
  if (child.childElementCount === 2) {
    const dataElement = child.querySelectorAll('p')[1];
    text = dataElement?.textContent;
    if (removeChild) dataElement?.remove();
  } else if (child.textContent) {
    text = child.textContent;
    const childData = child.childNodes;
    if (removeChild) childData.forEach((c) => c.nodeType === Node.TEXT_NODE && c.remove());
  }
  if (!text) return;
  const directions = text.trim().toLowerCase().split(',');
  const [x, y = ''] = directions;
  image.style.objectPosition = `${x} ${y}`;
}

export async function decorateBlockBg(block, node, { useHandleFocalpoint = false, className = 'background' } = {}) {
  const childCount = node.childElementCount;
  if (node.querySelector('img, video, a[href*=".mp4"]') || childCount > 1) {
    node.classList.add(className);
    const binaryVP = [['mobile-only'], ['tablet-only', 'desktop-only']];
    const allVP = [['mobile-only'], ['tablet-only'], ['desktop-only']];
    const viewports = childCount === 2 ? binaryVP : allVP;
    [...node.children].forEach((child, i) => {
      if (childCount > 1) child.classList.add(...viewports[i]);
      const pic = child.querySelector('picture');
      if (useHandleFocalpoint && pic
        && (child.childElementCount === 2 || child.textContent?.trim())) {
        handleFocalpoint(pic, child, true);
      }
      if (!child.querySelector('img, video, a[href*=".mp4"]')) {
        child.style.background = child.textContent;
        child.classList.add('expand-background');
        child.textContent = '';
      }
    });
  } else {
    block.style.background = node.textContent;
    node.remove();
  }
}

export function getBlockSize(el, defaultSize = 1) {
  const sizes = ['small', 'medium', 'large', 'xlarge', 'medium-compact'];
  if (defaultSize < 0 || defaultSize > sizes.length - 1) return null;
  return sizes.find((size) => el.classList.contains(size)) || sizes[defaultSize];
}

export const decorateBlockHrs = (el) => {
  const pTags = el.querySelectorAll('p');
  let hasHr = false;
  const decorateHr = ((tag) => {
    const hrTag = tag.textContent.trim().startsWith('---');
    if (!hrTag) return;
    hasHr = true;
    const bgStyle = tag.textContent.substring(3).trim();
    const hrElem = createTag('hr', { style: `background: ${bgStyle};` });
    tag.textContent = '';
    tag.appendChild(hrElem);
  });
  [...pTags].forEach((p) => {
    decorateHr(p);
  });
  const singleElementInRow = el.children[0].childElementCount === 0;
  if (singleElementInRow) {
    decorateHr(el.children[0]);
  }
  if (hasHr) el.classList.add('has-divider');
};

function applyTextOverrides(el, override, targetEl) {
  const parts = override.split('-');
  const type = parts[1];
  const scopeEl = (targetEl !== false) ? targetEl : el;
  const els = scopeEl.querySelectorAll(`[class^="${type}"]`);
  if (!els.length) return;
  els.forEach((elem) => {
    const replace = [...elem.classList].find((i) => i.startsWith(type));
    elem.classList.replace(replace, `${parts[1]}-${parts[0]}`);
  });
}

export function decorateTextOverrides(el, options = ['-heading', '-body', '-detail'], target = false) {
  const overrides = [...el.classList]
    .filter((elClass) => options.findIndex((ovClass) => elClass.endsWith(ovClass)) >= 0);
  if (!overrides.length) return;
  overrides.forEach((override) => {
    applyTextOverrides(el, override, target);
    el.classList.remove(override);
  });
}

function defineDeviceByScreenSize() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 600) {
    return 'mobile';
  }
  return 'desktop';
}

export function getImgSrc(pic) {
  let source = '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(pic, 'text/html');
  if (defineDeviceByScreenSize() === 'mobile') source = doc.querySelector('source[type="image/webp"]:not([media])');
  else source = doc.querySelector('source[type="image/webp"][media]');
  return source?.srcset ? `poster='${source.srcset}'` : '';
}

export function getVideoAttrs(hash, dataset) {
  const isAutoplay = hash?.includes('autoplay');
  const isAutoplayOnce = hash?.includes('autoplay1');
  const playOnHover = hash?.includes('hoverplay');
  const playInViewport = hash?.includes('viewportplay');
  const poster = getImgSrc(dataset.videoPoster);
  const globalAttrs = `playsinline ${poster}`;
  const autoPlayAttrs = 'autoplay muted';
  const playInViewportAttrs = playInViewport ? 'data-play-viewport' : '';

  if (isAutoplay && !isAutoplayOnce) {
    return `${globalAttrs} ${autoPlayAttrs} loop ${playInViewportAttrs}`;
  }
  if (playOnHover && isAutoplayOnce) {
    return `${globalAttrs} ${autoPlayAttrs} data-hoverplay`;
  }
  if (playOnHover) {
    return `${globalAttrs} muted data-hoverplay`;
  }
  if (isAutoplayOnce) {
    return `${globalAttrs} ${autoPlayAttrs} ${playInViewportAttrs}`;
  }
  return `${globalAttrs} controls`;
}

export function syncPausePlayIcon(video) {
  if (!video.getAttributeNames().includes('data-hoverplay')) {
    const offsetFiller = video.closest('.video-holder').querySelector('.offset-filler');
    const anchorTag = video.closest('.video-holder').querySelector('a');
    offsetFiller?.classList.toggle('is-playing');
    const isPlaying = offsetFiller?.classList.contains('is-playing');
    const indexOfVideo = (anchorTag.getAttribute('video-index') === '1' && videoCounter === 1) ? '' : anchorTag.getAttribute('video-index');
    const changedLabel = `${isPlaying ? videoLabels?.pauseMotion : videoLabels?.playMotion}`;
    const oldLabel = `${!isPlaying ? videoLabels?.pauseMotion : videoLabels?.playMotion}`;
    const ariaLabel = `${changedLabel} ${indexOfVideo}`.trim();
    anchorTag?.setAttribute('aria-label', `${ariaLabel} `);
    anchorTag?.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    const daaLL = anchorTag.getAttribute('daa-ll');
    if (daaLL) anchorTag.setAttribute('daa-ll', daaLL.replace(oldLabel, changedLabel));
  }
}

export function addAccessibilityControl(videoString, videoAttrs, indexOfVideo, tabIndex = 0) {
  if (videoAttrs.includes('controls')) return videoString;
  const fedRoot = getFederatedContentRoot();
  if (videoAttrs.includes('hoverplay')) {
    return `<a class='pause-play-wrapper video-holder' tabindex=${tabIndex}>${videoString}</a>`;
  }
  return `
    <div class='video-container video-holder'>${videoString}
      <a class='pause-play-wrapper' role='button' tabindex=${tabIndex} aria-pressed=true video-index=${indexOfVideo}>
        <div class='offset-filler ${videoAttrs.includes('autoplay') ? 'is-playing' : ''}'>  
          <img class='accessibility-control pause-icon' src='${fedRoot}/federal/assets/svgs/accessibility-pause.svg'/>
          <img class='accessibility-control play-icon' src='${fedRoot}/federal/assets/svgs/accessibility-play.svg'/>
        </div>
      </a>
    </div>
  `;
}

export function handlePause(event) {
  event.stopPropagation();
  if (event.code !== 'Enter' && event.code !== 'Space' && !['focus', 'click', 'blur'].includes(event.type)) {
    return;
  }
  event.preventDefault();
  const video = event.target.closest('.video-holder').parentElement.querySelector('video');
  if (event.type === 'blur') {
    video.pause();
  } else if (video.paused || video.ended || event.type === 'focus') {
    video.play();
  } else {
    video.pause();
  }
  syncPausePlayIcon(video);
}

export function applyHoverPlay(video) {
  if (!video) return;
  if (video.hasAttribute('data-hoverplay')) {
    video.parentElement.addEventListener('focus', handlePause);
    video.parentElement.addEventListener('blur', handlePause);
    if (!video.hasAttribute('data-mouseevent')) {
      video.addEventListener('mouseenter', () => { video.play(); });
      video.addEventListener('mouseleave', () => { video.pause(); });
      video.addEventListener('ended', () => { syncPausePlayIcon(video); });
      video.setAttribute('data-mouseevent', true);
    }
  }
}

export function applyAccessibilityEvents(videoEl) {
  const pausePlayWrapper = videoEl.parentElement.querySelector('.pause-play-wrapper') || videoEl.closest('.pause-play-wrapper');
  if (pausePlayWrapper?.querySelector('.accessibility-control')) {
    pausePlayWrapper.addEventListener('click', handlePause);
    pausePlayWrapper.addEventListener('keydown', handlePause);
  }
  if (videoEl.hasAttribute('autoplay')) {
    videoEl.addEventListener('ended', () => { syncPausePlayIcon(videoEl); });
  }
}

function setObjectFitAndPos(text, pic, bgEl, objFitOptions) {
  const backgroundConfig = text.split(',').map((c) => c.toLowerCase().trim());
  const fitOption = objFitOptions.filter((c) => backgroundConfig.includes(c));
  const focusOption = backgroundConfig.filter((c) => !fitOption.includes(c));
  if (fitOption) [pic.querySelector('img').style.objectFit] = fitOption;
  bgEl.innerHTML = '';
  bgEl.append(pic);
  bgEl.append(document.createTextNode(focusOption.join(',')));
}

export function handleObjectFit(bgRow) {
  const bgConfig = bgRow.querySelectorAll('div');
  [...bgConfig].forEach((r) => {
    const pic = r.querySelector('picture');
    if (!pic) return;
    let text = '';
    const pchild = [...r.querySelectorAll('p:not(:empty)')].filter((p) => p.innerHTML.trim() !== '');
    if (pchild.length > 2) text = pchild[1]?.textContent.trim();
    if (!text && r.textContent) text = r.textContent;
    if (!text) return;
    setObjectFitAndPos(text, pic, r, ['fill', 'contain', 'cover', 'none', 'scale-down']);
  });
}

function getVideoIntersectionObserver() {
  if (!window?.videoIntersectionObs) {
    window.videoIntersectionObs = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { intersectionRatio, target: video } = entry;
        const isHaveLoopAttr = video.getAttributeNames().includes('loop');
        const { playedOnce = false } = video.dataset;
        const isPlaying = video.currentTime > 0 && !video.paused && !video.ended
          && video.readyState > video.HAVE_CURRENT_DATA;

        if (intersectionRatio <= 0.8) {
          video.pause();
        } else if ((isHaveLoopAttr || !playedOnce) && !isPlaying) {
          video.play();
        }
      });
    }, { threshold: [0.8] });
  }
  return window.videoIntersectionObs;
}

function applyInViewPortPlay(video) {
  if (!video) return;
  if (video.hasAttribute('data-play-viewport')) {
    const observer = getVideoIntersectionObserver();
    video.addEventListener('ended', () => {
      video.dataset.playedOnce = true;
    });
    observer.observe(video);
  }
}

export function decorateMultiViewport(el) {
  const foreground = el.querySelector('.foreground');
  const cols = foreground.childElementCount;
  if (cols === 2 || cols === 3) {
    const viewports = [
      '(max-width: 599px)',
      '(min-width: 600px) and (max-width: 1199px)',
      '(min-width: 1200px)',
      '(min-width: 600px)',
    ].filter((v, i) => (cols === 2 ? [0, 3].includes(i) : i !== 3));
    [...foreground.children].forEach((child, index) => {
      const mq = window.matchMedia(viewports[index]);
      const setContent = () => mq.matches && foreground.replaceChildren(child);
      setContent();
      mq.addEventListener('change', setContent);
    });
  }
  return foreground;
}

export async function loadCDT(el, classList) {
  try {
    await Promise.all([
      loadStyle(`${miloLibs || codeRoot}/features/cdt/cdt.css`),
      import('../features/cdt/cdt.js')
        .then(({ default: initCDT }) => initCDT(el, classList)),
    ]);
  } catch (error) {
    window.lana?.log(`WARN: Failed to load countdown timer: ${error}`, { tags: 'errorType=warn,module=countdown-timer' });
  }
}

export function isVideoAccessible(anchorTag) {
  return !anchorTag?.hash.includes(HIDE_CONTROLS);
}

function updateFirstVideo() {
  if (firstVideo != null && firstVideo?.controls === false && videoCounter > 1) {
    let videoHolder = document.querySelector('[video-index="1"]') || firstVideo.closest('.video-holder');
    if (videoHolder.nodeName !== 'A') videoHolder = videoHolder.querySelector('a.pause-play-wrapper');
    const firstVideoLabel = videoHolder.getAttribute('aria-label');
    videoHolder.setAttribute('aria-label', `${firstVideoLabel} 1`);
    firstVideo = null;
  }
}

function updateAriaLabel(videoEl, videoAttrs) {
  if (!videoEl.getAttributeNames().includes('data-hoverplay')) {
    const pausePlayWrapper = videoEl.parentElement.querySelector('.pause-play-wrapper') || videoEl.closest('.pause-play-wrapper');
    const pauseIcon = pausePlayWrapper.querySelector('.pause-icon');
    const playIcon = pausePlayWrapper.querySelector('.play-icon');
    const indexOfVideo = pausePlayWrapper.getAttribute('video-index');
    let ariaLabel = `${videoAttrs.includes('autoplay') ? videoLabels.pauseMotion : videoLabels.playMotion}`;
    ariaLabel = ariaLabel.concat(` ${indexOfVideo === '1' && videoCounter === 1 ? '' : indexOfVideo}`);
    pausePlayWrapper.setAttribute('aria-label', ariaLabel);
    pauseIcon.setAttribute('alt', videoLabels.pauseMotion);
    playIcon.setAttribute('alt', videoLabels.playMotion);
    updateFirstVideo();
  }
}

export function decoratePausePlayWrapper(videoEl, videoAttrs) {
  if (!videoLabels.hasFetched) {
    import('../features/placeholders.js').then(({ replaceKeyArray }) => {
      replaceKeyArray(['pause-motion', 'play-motion', 'pause-icon', 'play-icon'], getFedsPlaceholderConfig())
        .then(([pauseMotion, playMotion, pauseIcon, playIcon]) => {
          videoLabels = { playMotion, pauseMotion, pauseIcon, playIcon };
          videoLabels.hasFetched = true;
          updateAriaLabel(videoEl, videoAttrs);
        });
    });
  } else {
    updateAriaLabel(videoEl, videoAttrs);
  }
}

export function decorateAnchorVideo({ src = '', anchorTag }) {
  if (!src.length || !(anchorTag instanceof HTMLElement)) return;
  const accessibilityEnabled = isVideoAccessible(anchorTag);
  anchorTag.hash = anchorTag.hash.replace(`#${HIDE_CONTROLS}`, '');
  if (anchorTag.closest('.marquee, .aside, .hero-marquee, .quiz-marquee') && !anchorTag.hash) anchorTag.hash = '#autoplay';
  const { dataset, parentElement } = anchorTag;
  const attrs = getVideoAttrs(anchorTag.hash, dataset);
  const tabIndex = anchorTag.tabIndex || 0;
  const videoIndex = (tabIndex === -1) ? 'tabindex=-1' : '';
  let video = `<video ${attrs} data-video-source=${src} ${videoIndex}></video>`;
  if (!attrs.includes('controls') && !attrs.includes('hoverplay') && accessibilityEnabled) {
    videoCounter += 1;
  }
  const indexOfVideo = videoCounter;
  if (accessibilityEnabled) {
    video = addAccessibilityControl(video, attrs, indexOfVideo, tabIndex);
  }
  anchorTag.insertAdjacentHTML('afterend', video);
  const videoEl = parentElement.querySelector('video');
  if (indexOfVideo === 1) {
    firstVideo = videoEl;
  }
  createIntersectionObserver({
    el: videoEl,
    options: { rootMargin: '1000px' },
    callback: () => {
      videoEl?.appendChild(createTag('source', { src, type: 'video/mp4' }));
    },
  });
  if (accessibilityEnabled) {
    applyAccessibilityEvents(videoEl);
    if (!videoEl.controls) {
      decoratePausePlayWrapper(videoEl, attrs);
    }
  }
  applyHoverPlay(videoEl);
  applyInViewPortPlay(videoEl);
  anchorTag.remove();
}
