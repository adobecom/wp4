/* eslint-disable no-async-promise-executor */
import {
  decorateAutoBlock,
  decorateLinks,
  getMetadata,
  getConfig,
  localizeLink,
  loadStyle,
} from '../../utils/utils.js';

import {
  getExperienceName,
  getAnalyticsValue,
  loadDecorateMenu,
  fetchAndProcessPlainHtml,
  loadBaseStyles,
  yieldToMain,
  lanaLog,
  logErrorFor,
  toFragment,
  federatePictureSources,
  isDarkMode,
} from '../global-navigation/utilities/utilities.js';

import { getFederatedUrl, getFedsPlaceholderConfig } from '../../utils/federated.js';

import { replaceKey } from '../../features/placeholders.js';

const { miloLibs, codeRoot, locale, mep } = getConfig();
const base = miloLibs || codeRoot;

const CONFIG = {
  socialPlatforms: ['facebook', 'instagram', 'twitter', 'linkedin', 'pinterest', 'discord', 'behance', 'youtube', 'weibo', 'social-media'],
  delays: { decoration: 3000 },
};

class Footer {
  constructor({ block } = {}) {
    this.block = block;
    this.elements = {};
    this.init();
  }

  init = () => logErrorFor(async () => {
    // We initialize the footer decoration logic when either 3s have passed
    // OR when the footer element is close to coming into view
    let decorationTimeout;

    // Set up intersection observer
    const intersectionOptions = { rootMargin: '300px 0px' };

    const observer = new window.IntersectionObserver((entries) => {
      const isIntersecting = entries.find((entry) => entry.isIntersecting === true);

      if (isIntersecting) {
        clearTimeout(decorationTimeout);
        observer.disconnect();
        this.decorateContent();
      }
    }, intersectionOptions);

    observer.observe(this.block);

    // Set timeout after which we load the footer automatically
    decorationTimeout = setTimeout(() => {
      observer.disconnect();
      this.decorateContent();
    }, CONFIG.delays.decoration);
  }, 'Error in global footer init', 'errorType=error,module=global-footer');

  decorateContent = () => logErrorFor(async () => {
    // Fetch footer content
    const url = getMetadata('footer-source') || `${locale.contentRoot}/footer`;
    this.body = await fetchAndProcessPlainHtml({
      url,
      shouldDecorateLinks: false,
    });

    if (!this.body) return;

    const [region, social] = ['.region-selector', '.social'].map((selector) => this.body.querySelector(selector));
    const [regionParent, socialParent] = [region?.parentElement, social?.parentElement];
    // We remove and add again the region and social elements from the body to make sure
    // they don't get decorated twice
    [regionParent, socialParent].forEach((parent) => parent?.replaceChildren());

    decorateLinks(this.body);

    regionParent?.appendChild(region);
    socialParent?.appendChild(social);

    const path = getFederatedUrl(url);
    federatePictureSources({ section: this.body, forceFederate: path.includes('/federal/') });

    // Order is important, decorateFooter makes use of elements
    // which have already been created in previous steps
    const tasks = [
      loadBaseStyles,
      this.decorateGrid,
      this.decorateProducts,
      this.loadIcons,
      this.decorateRegionPicker,
      this.decorateSocial,
      this.decoratePrivacy,
      this.decorateFooter,
    ];

    for await (const task of tasks) {
      await yieldToMain();
      await task();
    }

    const mepMartech = mep?.martech || '';
    this.block.setAttribute('daa-lh', `gnav|${getExperienceName()}|footer${mepMartech}`);

    this.block.append(this.elements.footer);
  }, 'Failed to decorate footer content', 'errorType=error,module=global-footer');

  loadMenuLogic = async () => {
    this.menuLogic = this.menuLogic || new Promise(async (resolve) => {
      const menuLogic = await loadDecorateMenu();
      this.decorateMenu = menuLogic.decorateMenu;
      this.decorateLinkGroup = menuLogic.decorateLinkGroup;
      resolve();
    });

    return this.menuLogic;
  };

  decorateGrid = async () => {
    this.elements.footerMenu = '';
    const columns = this.body.querySelectorAll(':scope > div > h2:first-child');

    if (!columns || !columns.length) return this.elements.footerMenu;

    this.elements.footerMenu = toFragment`<div class="feds-menu-content"></div>`;
    columns.forEach((column) => this.elements.footerMenu.appendChild(column.parentElement));

    await this.loadMenuLogic();

    await this.decorateMenu({
      item: this.elements.footerMenu,
      type: 'footerMenu',
    });

    this.elements.headlines = this.elements.footerMenu.querySelectorAll('.feds-menu-headline');

    return this.elements.footerMenu;
  };

  loadIcons = async () => {
    const file = await fetch(`${base}/blocks/global-footer/icons.svg`);
    if (!file.ok) {
      lanaLog({
        message: 'Issue with loadIcons',
        e: `${file.statusText} url: ${file.url}`,
        tags: 'errorType=info,module=global-footer',
      });
    }
    const content = await file.text();
    const elem = toFragment`<div class="feds-footer-icons">${content}</div>`;
    this.block.append(elem);
  };

  decorateProducts = async () => {
    this.elements.featuredProducts = '';

    // Get the featured products wrapper by looking for a link group's parent
    const featuredProductElem = this.body.querySelector('.link-group');
    if (!featuredProductElem) return this.elements.featuredProducts;

    const featuredProductsContent = featuredProductElem.parentElement;
    this.elements.featuredProducts = toFragment`<div class="feds-featuredProducts"></div>`;

    const [placeholder] = await Promise.all([
      replaceKey('featured-products', getFedsPlaceholderConfig()),
      this.loadMenuLogic(),
    ]);

    if (placeholder && placeholder.length) {
      this.elements.featuredProducts
        .append(toFragment`<span class="feds-featuredProducts-label">${placeholder}</span>`);
    }

    featuredProductsContent.querySelectorAll('.link-group').forEach((linkGroup) => {
      this.elements.featuredProducts.append(this.decorateLinkGroup(linkGroup));
    });

    return this.elements.featuredProducts;
  };

  decorateRegionPicker = async () => {
    this.elements.regionPicker = '';
    const regionSelector = this.body.querySelector('.region-selector a');
    if (!regionSelector) return this.elements.regionPicker;

    let url;

    try {
      url = new URL(regionSelector.href);
    } catch (e) {
      lanaLog({ message: `Could not create URL for region picker; href: ${regionSelector.href}`, tags: 'errorType=error,module=global-footer' });
      return this.elements.regionPicker;
    }

    const regionPickerClass = 'feds-regionPicker';
    const regionPickerTextElem = toFragment`<span class="feds-regionPicker-text">${regionSelector.textContent}</span>`;
    const regionPickerElem = toFragment`
      <a
        href="${regionSelector.href}"
        class="${regionPickerClass}"
        aria-expanded="false"
        aria-haspopup="true"
        role="button">
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="feds-regionPicker-globe" focusable="false">
          <use href="#footer-icon-globe" />
        </svg>
        ${regionPickerTextElem}
      </a>`;
    regionPickerElem.dataset.modalPath = `${url.pathname}#_inline`;
    regionPickerElem.dataset.modalHash = url.hash;
    const regionPickerWrapperClass = 'feds-regionPicker-wrapper';
    this.elements.regionPicker = toFragment`<div class="${regionPickerWrapperClass}">
        ${regionPickerElem}
      </div>`;

    const isRegionPickerExpanded = () => regionPickerElem.getAttribute('aria-expanded') === 'true';

    // Note: the region picker currently works only with Milo modals/fragments;
    // in the future we'll need to update this for non-Milo consumers
    if (url.hash !== '') {
      // Hash -> region selector opens a modal
      decorateAutoBlock(regionPickerElem); // add modal-specific attributes
      // TODO remove logs after finding the root cause for the region picker 404s -> MWPW-143627
      regionPickerElem.href = url.hash;
      if (regionPickerElem.classList[0] !== 'modal') {
        lanaLog({
          message: `Modal block class missing from region picker pre loading the block; locale: ${locale}; regionPickerElem: ${regionPickerElem.outerHTML}`,
          tags: 'errorType=warn,module=global-footer',
        });
      }
      loadStyle(`${base}/blocks/modal/modal.css`);
      const { default: initModal } = await import('../modal/modal.js');
      const modal = await initModal(regionPickerElem);

      const loadRegionNav = async () => {
        const block = document.querySelector('.region-nav');
        if (block && getConfig().standaloneGnav) {
          // on standalone the region-nav will fail to load automatically through
          // the modal calling fragment.js. In that case we will have data-failed=true
          // and we should manually load region nav
          // If that's not the case then we're not a standalone gnav
          // and we mustn't load region-nav twice.
          if (block.getAttribute('data-failed') !== 'true') return;
          block.classList.add('hide');
          loadStyle(`${base}/blocks/region-nav/region-nav.css`);
          const { default: initRegionNav } = await import('../region-nav/region-nav.js');
          initRegionNav(block);
          // decoratePlaceholders(block, getConfig());
          block.classList.remove('hide');
        }
      };

      if (modal) await loadRegionNav(); // just in case the modal is already open

      if (regionPickerElem.classList[0] !== 'modal') {
        lanaLog({
          message: `Modal block class missing from region picker post loading the block; locale: ${locale}; regionPickerElem: ${regionPickerElem.outerHTML}`,
          tags: 'errorType=warn,module=global-footer',
        });
      }
      regionPickerElem.addEventListener('click', () => {
        if (!isRegionPickerExpanded()) {
          regionPickerElem.setAttribute('aria-expanded', 'true');
          // wait for the modal to load before we load the region nav
          window.addEventListener('milo:modal:loaded', loadRegionNav, { once: true });
        }
      });
      // Set aria-expanded to false when region modal is closed
      window.addEventListener('milo:modal:closed', () => {
        if (isRegionPickerExpanded()) {
          regionPickerElem.setAttribute('aria-expanded', 'false');
        }
      });
    } else {
      // No hash -> region selector expands a dropdown
      regionPickerElem.href = '#'; // reset href value to not get treated as a fragment
      regionSelector.href = localizeLink(regionSelector.href);
      decorateAutoBlock(regionSelector); // add fragment-specific class(es)
      this.elements.regionPicker.append(regionSelector); // add fragment after regionPickerElem
      const { default: initFragment } = await import('../fragment/fragment.js');
      await initFragment(regionSelector); // load fragment and replace original link
      // Update aria-expanded on click
      regionPickerElem.addEventListener('click', (e) => {
        e.preventDefault();
        const isDialogActive = regionPickerElem.getAttribute('aria-expanded') === 'true';
        regionPickerElem.setAttribute('aria-expanded', !isDialogActive);
      });
      // Close region picker dropdown on outside click
      document.addEventListener('click', (e) => {
        if (isRegionPickerExpanded()
          && !e.target.closest(`.${regionPickerWrapperClass}`)) {
          regionPickerElem.setAttribute('aria-expanded', false);
        }
      });
    }

    return this.elements.regionPicker;
  };

  decorateSocial = () => {
    this.elements.social = '';
    const socialBlock = this.body.querySelector('.social');
    if (!socialBlock) return this.elements.social;

    const socialElem = toFragment`<ul class="feds-social" daa-lh="Social"></ul>`;

    const sanitizeLink = (link) => link.replace('#_blank', '').replace('#_dnb', '');

    CONFIG.socialPlatforms.forEach((platform, index) => {
      const link = socialBlock.querySelector(`a[href*="${platform}"]`);
      if (!link) return;

      const iconElem = toFragment`<li class="feds-social-item">
          <a
            href="${sanitizeLink(link.href)}"
            class="feds-social-link"
            aria-label="${platform}"
            daa-ll="${getAnalyticsValue(platform, index + 1)}"
            target="_blank">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="feds-social-icon">
              <use href="#footer-icon-${platform}" />
            </svg>
          </a>
        </li>`;

      socialElem.append(iconElem);
    });

    this.elements.social = socialElem.childElementCount !== 0 ? socialElem : '';

    return this.elements.social;
  };

  decoratePrivacy = () => {
    this.elements.legal = '';
    // Get the legal links wrapper by looking for the copyright text's parent
    const copyrightElem = this.body.querySelector('div > p > em');
    if (!copyrightElem) return this.elements.legal;

    const privacyContent = copyrightElem.closest('div');

    // Decorate copyright element
    const currentYear = new Date().getFullYear();
    copyrightElem.replaceWith(toFragment`<span class="feds-footer-copyright">
        Copyright © ${currentYear} ${copyrightElem.textContent}
      </span>`);

    // Add Ad Choices icon
    const adChoicesElem = privacyContent.querySelector('a[href*="#interest-based-ads"]');
    adChoicesElem?.prepend(toFragment`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="feds-adChoices-icon" focusable="false">
        <use href="#footer-icon-adchoices" />
      </svg>`);

    this.elements.legal = toFragment`<div class="feds-footer-legalWrapper" daa-lh="Legal"></div>`;

    while (privacyContent.children.length) {
      const privacySection = privacyContent.firstElementChild;
      privacySection.classList.add('feds-footer-privacySection');
      privacySection.querySelectorAll('a').forEach((link, index) => {
        link.classList.add('feds-footer-privacyLink');
        link.setAttribute('daa-ll', getAnalyticsValue(link.textContent, index + 1));
      });
      this.elements.legal.append(privacySection);
    }

    return this.elements.legal;
  };

  decorateFooter = () => {
    this.elements.footer = toFragment`<div class="feds-footer-wrapper">
        ${this.elements.footerMenu}
        ${this.elements.featuredProducts}
        <div class="feds-footer-options">
          <div class="feds-footer-miscLinks">
            ${this.elements.regionPicker}
            ${this.elements.social}
          </div>
          ${this.elements.legal}
        </div>
      </div>`;

    return this.elements.footer;
  };
}

export default function init(block) {
  try {
    const footer = new Footer({ block });
    if (isDarkMode()) block.classList.add('feds--dark');
    return footer;
  } catch (e) {
    lanaLog({ message: 'Could not create footer', e });
    return null;
  }
}
