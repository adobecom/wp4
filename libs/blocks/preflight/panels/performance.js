import { html, signal, useEffect } from '../../../deps/htm-preact.js';
import { getMetadata } from '../../../utils/utils.js';

const icons = {
  pass: 'green',
  fail: 'red',
  empty: 'empty',
};
// TODO MEP/Personalization
// TODO mobile / tablet?
// TODO create ticket for PSI API
// TODO link to documentation directly within the sections
const text = {
  lcpEl: {
    key: 'lcpEl',
    title: 'Valid LCP',
    passed: { description: 'Valid LCP in the first section detected.' },
    failed: { description: 'No LCP image or video in the first section detected.' },
  },
  singleBlock: {
    key: 'singleBlock',
    title: 'Single Block',
    passed: { description: 'First section has exactly one block.' },
    failed: { description: 'First section has more than one block.' },
  },
  imageSize: {
    key: 'imageSize',
    title: 'Images size',
    empty: { description: 'No image as LCP element.' },
    passed: { description: 'LCP image is less than 100KB.' },
    failed: { description: 'LCP image is over 100KB.' },
  },
  videoPoster: {
    key: 'videoPoster',
    title: 'Videos',
    empty: { description: 'No video as LCP element.' },
    passed: { description: 'LCP video has a poster attribute' },
    failed: { description: 'LCP video has no poster attribute.' },
  },
  fragments: {
    key: 'fragments',
    title: 'Fragments',
    passed: { description: 'No fragments used within the LCP section.' },
    failed: { description: 'Fragments used within the LCP section.' },
  },
  personalization: {
    key: 'personalization',
    title: 'Personalization',
    passed: { description: 'Personalization is currently not enabled.' },
    failed: { description: 'MEP or Target enabled.' },
  },
  placeholders: {
    key: 'placeholders',
    title: 'Placeholders',
    passed: { description: 'No placeholders found within the LCP section.' },
    failed: { description: 'Placeholders found within the LCP section.' },
  },
  icons: {
    key: 'icons',
    title: 'Icons',
    passed: { description: 'No icons found within the LCP section.' },
    failed: { description: 'Icons found within the LCP section.' },
  },
};

export const config = {
  items: signal([
    ...Object.values(text).map(({ key, title }) => ({
      key,
      title,
      icon: icons.empty,
      description: 'Loading...',
    })),
  ]),
  lcp: null,
  cls: 0,
};

export const findItem = (key) => config.items.value.find((item) => item.key === key);
export const updateItem = ({ key, ...updates }) => {
  const { items } = config;
  items.value = items.value.map((item) => (item.key === key ? { ...item, ...updates } : item));
};

export function conditionalItemUpdate({ emptyWhen, failsWhen, key }) {
  const icon = (emptyWhen && icons.empty) || (failsWhen && icons.fail) || icons.pass;
  const descriptionKey = (emptyWhen && 'empty') || (failsWhen && 'failed') || 'passed';
  updateItem({
    key,
    icon,
    description: text[key][descriptionKey].description,
  });
}

// TODO do we also want to check the content-length header?
// https://www.w3.org/TR/largest-contentful-paint/#largest-contentful-paint-candidate-element
// candidate’s element is a text node, or candidate’s request's response's content length
// in bytes is >= candidate’s element's effective visual size * 0.004
export async function checkImageSize() {
  const { lcp } = config;
  let hasValidImage = lcp?.url && !lcp.url.match('media_.*.mp4');
  let blob;
  let isSizeValid;
  if (hasValidImage) {
    try {
      blob = await fetch(lcp.url).then((res) => res.blob());
      isSizeValid = blob.size / 1024 <= 100;
    } catch (error) {
      hasValidImage = false;
    }
  }

  conditionalItemUpdate({
    failsWhen: !isSizeValid,
    emptyWhen: !hasValidImage,
    key: text.imageSize.key,
  });
}

export function checkLCP() {
  const { lcp } = config;
  const firstSection = document.querySelector('main > div.section');
  const validLcp = lcp?.element && lcp?.url && firstSection?.contains(lcp.element);
  conditionalItemUpdate({
    failsWhen: !validLcp,
    key: text.lcpEl.key,
    description: text.lcpEl.passed.description,
  });
  return validLcp;
}

export const checkFragments = () => conditionalItemUpdate({
  failsWhen: config.lcp.element.closest('.fragment') || config.lcp.element.closest('.section')?.querySelector('[data-path*="fragment"]'),
  key: text.fragments.key,
});

export const checkPlaceholders = () => conditionalItemUpdate({
  failsWhen: config.lcp.element.closest('.section').dataset.hasPlaceholders === 'true',
  key: text.placeholders.key,
});

export const checkForPersonalization = () => conditionalItemUpdate({
  failsWhen: getMetadata('personalization') || getMetadata('target') === 'on',
  key: text.personalization.key,
});

export const checkVideosWithoutPosterAttribute = () => conditionalItemUpdate({
  failsWhen: !config.lcp.element.poster,
  emptyWhen: !config.lcp.url.match('media_.*.mp4'),
  key: text.videoPoster.key,
});

export const checkIcons = () => conditionalItemUpdate({
  failsWhen: config.lcp.element.closest('.section').querySelector('.icon-milo'),
  key: text.icons.key,
});

export function PerformanceItem({ icon, title, description }) {
  return html` <div class="preflight-item">
    <div class="result-icon ${icon}"></div>
    <div class="preflight-item-text">
      <p class="preflight-item-title">${title}</p>
      <p class="preflight-item-description">${description}</p>
    </div>
  </div>`;
}

export const checkForSingleBlock = () => conditionalItemUpdate({
  failsWhen: document.querySelector('main > div.section').childElementCount > 1,
  key: text.singleBlock.key,
});

export const createPerformanceItem = ({
  icon,
  title,
  description,
} = {}) => html`<${PerformanceItem}
  icon=${icon}
  title=${title}
  description=${description}
/>`;

let clonedLcpSection;
function highlightElement(event) {
  if (!config.lcp) return;
  const lcpSection = config.lcp?.element.closest('.section');
  const tooltip = document.querySelector('.lcp-tooltip-modal');
  const { offsetHeight, offsetWidth } = lcpSection;
  const scaleFactor = Math.min(500 / offsetWidth, 500 / offsetHeight);
  if (!clonedLcpSection) {
    clonedLcpSection = lcpSection.cloneNode(true);
    clonedLcpSection.classList.add('lcp-clone');
  }
  Object.assign(clonedLcpSection.style, {
    width: `${lcpSection.offsetWidth}px`,
    height: `${lcpSection.offsetHeight}px`,
    transform: `scale(${scaleFactor})`,
    transformOrigin: 'top left',
  });
  if (!tooltip.children.length) tooltip.appendChild(clonedLcpSection);
  const { top, left } = event.currentTarget.getBoundingClientRect();
  Object.assign(tooltip.style, {
    width: `${offsetWidth * scaleFactor}px`,
    height: `${offsetHeight * scaleFactor}px`,
    top: `${top + window.scrollY - offsetHeight * scaleFactor - 10}px`,
    left: `${left + window.scrollX}px`,
  });
  document.querySelector('.lcp-tooltip-modal').classList.add('show');
}

const removeHighlight = () => { document.querySelector('.lcp-tooltip-modal').classList.remove('show'); };

function observePerfMetrics() {
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    if (lastEntry) config.lcp = lastEntry;
    if (!checkLCP()) {
      Object.values(text).forEach(({ key }) => {
        if (key === 'lcpEl') return;
        updateItem({ key, description: 'No LCP element found.' });
      });
      return;
    }
    checkFragments();
    checkForPersonalization();
    checkVideosWithoutPosterAttribute();
    checkIcons();
    checkForSingleBlock();
    checkPlaceholders();
    Promise.all([checkImageSize()]);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry) => {
      if (!entry.hadRecentInput) {
        config.cls += entry.value;
      }
    });
    if (config.cls > 0) {
      // TODO - Lana log? We should not have any CLS.
    }
  }).observe({ type: 'layout-shift', buffered: true });
}

export function Panel() {
  useEffect(() => observePerfMetrics(), []);

  return html`
    <div class="preflight-columns">
      <div class="preflight-column">${config.items.value.slice(0, 4).map((item) => createPerformanceItem(item))}</div>
      <div class="preflight-column">${config.items.value.slice(4, 8).map((item) => createPerformanceItem(item))}</div>
      <div>Unsure on how to get this page fully into the green? Check out the <a class="performance-guidelines" href="https://milo.adobe.com/docs/authoring/performance/" target="_blank">Milo Performance Guidelines</a>.</div>
      <div> 
        <span class="performance-element-preview" onMouseEnter=${highlightElement} onMouseLeave=${removeHighlight}>
          Highlight the found LCP section
        </span> 
      </div>
      <div class="lcp-tooltip-modal"></div>
    </div>
  `;
}

export default Panel;
