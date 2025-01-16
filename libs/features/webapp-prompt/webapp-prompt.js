import {
  getUserProfile,
  icons,
  lanaLog,
  toFragment,
} from '../../blocks/global-navigation/utilities/utilities.js';
import { getConfig, decorateSVG } from '../../utils/utils.js';
import { replaceKey, replaceText } from '../placeholders.js';
import { getFedsPlaceholderConfig } from '../../utils/federated.js';

export const DISMISSAL_CONFIG = {
  animationCount: 2,
  animationDuration: 2500,
  tooltipMessage: 'Use the App Switcher to quickly find apps.',
  tooltipDuration: 5000,
};

const CONFIG = {
  selectors: { prompt: '.appPrompt' },
  delay: 7000,
  loaderColor: '#EB1000',
  ...DISMISSAL_CONFIG,
};

const getElemText = (elem) => elem?.textContent?.trim();

const getMetadata = (el) => [...el.childNodes].reduce((acc, row) => {
  if (row.children?.length === 2) {
    const key = getElemText(row.children[0]);
    const val = getElemText(row.children[1]);
    if (key && val) acc[key] = val;
  }
  return acc;
}, {});

const getIcon = (content) => {
  const picture = content.querySelector('picture');
  if (picture) return picture;

  const svg = content.querySelector('a[href$=".svg"]');
  if (svg) return decorateSVG(svg);

  return icons.company;
};

const showTooltip = (
  element,
  message = CONFIG.tooltipMessage,
  time = CONFIG.tooltipDuration,
) => {
  element.setAttribute('data-pep-dismissal-tooltip', message);
  const cleanup = () => element.removeAttribute('data-pep-dismissal-tooltip');
  const timeoutID = setTimeout(cleanup, time);
  element.addEventListener('click', () => {
    cleanup();
    clearTimeout(timeoutID);
  }, { once: true });
};

const playFocusAnimation = (
  element,
  iterationCount = CONFIG.animationCount,
  animationDuration = CONFIG.animationDuration,
) => {
  element.classList.add('coach-indicator');
  element.style.setProperty('--animation-duration', `${animationDuration}ms`);
  const rings = [];
  const createRing = () => toFragment`
    <div
      class="coach-indicator-ring"
      style="animation-iteration-count: ${iterationCount};">
    </div>`;
  for (let i = 0; i < 3; i += 1) {
    const ring = createRing();
    element.insertAdjacentElement('afterbegin', ring);
    rings.push(ring);
  }
  // The cleanup function is added to the event queue
  // some time after the end of the animation because
  // the cleanup isn't high priority but it should be done
  // eventually. (Animation truly ends slightly after
  // animationDuration * iterationCount due to animation-delay)
  const cleanup = () => {
    rings.forEach((ring) => ring.remove());
    element.classList.remove('coach-indicator');
  };
  const timeoutID = setTimeout(cleanup, (iterationCount + 1) * animationDuration);
  element.addEventListener('click', () => {
    cleanup();
    clearTimeout(timeoutID);
  }, { once: true });
};

const modalsActive = () => !!document.querySelector('.dialog-modal');

const waitForClosedModalsThen = (loadPEP) => {
  if (modalsActive()) {
    setTimeout(() => waitForClosedModalsThen(loadPEP), 200);
    return;
  }
  loadPEP();
};

export class AppPrompt {
  constructor({ promptPath, entName, parent, getAnchorState } = {}) {
    this.promptPath = promptPath;
    this.entName = entName;
    this.parent = parent;
    this.getAnchorState = getAnchorState;
    this.id = this.promptPath.split('/').pop();
    this.elements = {};
    if (modalsActive()) {
      window.addEventListener(
        'milo:modal:closed',
        () => waitForClosedModalsThen(this.init),
        { once: true },
      );
      this.initializationQueued = true;
      return;
    }
    this.initializationQueued = false;
  }

  init = async () => {
    if (this.isDismissedPrompt() || !this.parent) return;

    const skipEntitlements = new URLSearchParams(window.location.search).get('skipPepEntitlements');
    const entMatch = skipEntitlements || await this.doesEntitlementMatch();
    if (!entMatch) return;

    const content = await this.fetchContent();
    if (!content) return;

    await this.getData(content);
    if (!this.options['redirect-url'] || !this.options['product-name']) return;

    ({ id: this.anchorId, isOpen: this.isAnchorExpanded } = await this.getAnchorState()
      .catch((e) => {
        lanaLog({
          message: 'Error on getting anchor state',
          e,
          tags: 'errorType=error,module=pep',
        });
        return {};
      }));
    if (this.isAnchorExpanded) return;

    if (this.anchorId) this.anchor = document.querySelector(`#${this.anchorId}`);
    this.offset = this.anchor
      ? this.parent.offsetWidth - (this.anchor.offsetWidth + this.anchor.offsetLeft) : 0;
    this.template = this.decorate();

    this.addEventListeners();

    this.parent.prepend(this.template);
    this.elements.closeIcon.focus();

    this.redirectFn = this.initRedirect();
  };

  doesEntitlementMatch = async () => {
    const config = getConfig();
    const entitlements = await config.entitlements();
    const extraEnts = new URLSearchParams(window.location.search).get('mockPepEnts');
    extraEnts?.split(',').forEach((ent) => entitlements.push(ent.trim()));
    return entitlements?.length && entitlements.includes(this.entName);
  };

  fetchContent = async () => {
    const res = await fetch(`${this.promptPath}.plain.html`);

    if (!res.ok) {
      lanaLog({
        message: `Error fetching content for prompt: ${this.promptPath}.plain.html`,
        e: `Status ${res.status} when trying to fetch content for prompt`,
        tags: 'errorType=error,module=pep',
      });
      return '';
    }

    const text = await res.text();
    const content = await replaceText(text, getFedsPlaceholderConfig());
    const html = new DOMParser().parseFromString(content, 'text/html');

    return html;
  };

  getData = async (content) => {
    this.icon = getIcon(content);

    const selectors = {
      title: 'h2',
      subtitle: 'h3',
      cancel: 'em > a',
    };

    await Promise.all(Object.keys(selectors).map(async (key) => {
      const element = content.querySelector(selectors[key]);
      if (element?.innerText) this[key] = element.innerText;
      else {
        const label = await replaceKey(`pep-prompt-${key}`, getFedsPlaceholderConfig());
        this[key] = label === `pep prompt ${key}` ? '' : label;
      }
    }));

    await getUserProfile()
      .then((data) => {
        const requiredFields = ['display_name', 'email', 'avatar'];
        const hasRequiredFields = requiredFields.every((field) => !!data[field]);
        if (!hasRequiredFields) return;

        this.profile = data;
      }).catch((e) => {
        lanaLog({
          message: 'Error fetching user profile',
          e,
          tags: 'errorType=error,module=pep',
        });
      });

    const metadata = getMetadata(content.querySelector('.section-metadata'));
    metadata['loader-duration'] = parseInt(metadata['loader-duration'] || CONFIG.delay, 10);
    metadata['loader-color'] = metadata['loader-color'] || CONFIG.loaderColor;
    metadata['dismissal-animation-count'] = parseInt(metadata['dismissal-animation-count'] ?? CONFIG.animationCount, 10);
    metadata['dismissal-animation-duration'] = parseInt(metadata['dismissal-animation-duration'] ?? CONFIG.animationDuration, 10);
    metadata['dismissal-tooltip-message'] ??= CONFIG.tooltipMessage;
    metadata['dismissal-tooltip-duration'] = parseInt(metadata['dismissal-tooltip-duration'] ?? CONFIG.tooltipDuration, 10);
    this.options = metadata;
  };

  decorate = () => {
    this.elements.closeIcon = toFragment`<button daa-ll="Close Modal" aria-label="${this.cancel}" class="appPrompt-close"></button>`;
    this.elements.cta = toFragment`<button daa-ll="Stay on this page" class="appPrompt-cta appPrompt-cta--close">${this.cancel}</button>`;
    this.elements.profile = this.profile
      ? toFragment`<div class="appPrompt-profile">
        <div class="appPrompt-avatar">
          <img class="appPrompt-avatar-image" src="${this.profile.avatar}" />
        </div>
        <div class="appPrompt-user">
          <div class="appPrompt-name">${this.profile.display_name}</div>
          <div class="appPrompt-email">${this.profile.email}</div>
        </div>
      </div>`
      : '';

    return toFragment`<div
      daa-state="true" daa-im="true" daa-lh="PEP Modal_${this.options['product-name']?.toLowerCase()}"
      class="appPrompt" style="margin: 0 ${this.offset}px">
      ${this.elements.closeIcon}
      <div class="appPrompt-icon">
        ${this.icon}
      </div>
      <div class="appPrompt-title">${this.title}</div>
      ${this.elements.profile}
      <div class="appPrompt-footer">
        <div class="appPrompt-text">${this.subtitle}</div>
        ${this.elements.cta}
      </div>
      <div class="appPrompt-progressWrapper">
        <div class="appPrompt-progress" style="background-color: ${this.options['loader-color']}; animation-duration: ${this.options['loader-duration']}ms;"></div>
      </div>
    </div>`;
  };

  addEventListeners = () => {
    this.anchor?.addEventListener('click', () => this.close({ dismissalActions: false }));
    document.addEventListener('keydown', this.handleKeyDown);

    [this.elements.closeIcon, this.elements.cta]
      .forEach((elem) => elem.addEventListener('click', this.close));
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape') this.close();
  };

  static redirectTo(url) {
    window.location.assign(url);
  }

  initRedirect = () => setTimeout(() => {
    this.close({ saveDismissal: false, dismissalActions: false });
    AppPrompt.redirectTo(this.options['redirect-url']);
  }, this.options['loader-duration']);

  isDismissedPrompt = () => AppPrompt.getDismissedPrompts().includes(this.id);

  setDismissedPrompt = () => {
    const dismissedPrompts = new Set(AppPrompt.getDismissedPrompts());
    dismissedPrompts.add(this.id);
    document.cookie = `dismissedAppPrompts=${JSON.stringify([...dismissedPrompts])};path=/`;
  };

  close = ({ saveDismissal = true, dismissalActions = true } = {}) => {
    const appPromptElem = document.querySelector(CONFIG.selectors.prompt);
    appPromptElem?.remove();
    clearTimeout(this.redirectFn);
    if (saveDismissal) this.setDismissedPrompt();
    document.removeEventListener('keydown', this.handleKeyDown);
    this.anchor?.focus();
    this.anchor?.removeEventListener('click', this.close);

    if (dismissalActions) {
      playFocusAnimation(
        this.anchor,
        this.options['dismissal-animation-count'],
        this.options['dismissal-animation-duration'],
      );
      showTooltip(
        this.anchor,
        this.options['dismissal-tooltip-message'],
        this.options['dismissal-tooltip-duration'],
      );
    }
  };

  static getDismissedPrompts = () => {
    const cookie = document.cookie
      .split(';')
      .find((item) => item.trim().startsWith('dismissedAppPrompts='))
      ?.split('=')[1];

    return cookie ? JSON.parse(cookie) : [];
  };
}

export default async function init(config) {
  try {
    const appPrompt = new AppPrompt(config);
    if (!appPrompt.initializationQueued) await appPrompt.init();
    return appPrompt;
  } catch (e) {
    lanaLog({ message: 'Could not initialize PEP', e, tags: 'errorType=error,module=pep' });
    return null;
  }
}
