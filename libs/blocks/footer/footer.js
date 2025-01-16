import {
  createTag,
  decorateAutoBlock,
  decorateLinks,
  getConfig,
  getMetadata,
  loadBlock,
} from '../../utils/utils.js';

import { analyticsDecorateList } from '../../martech/attributes.js';

import { getSVGsfromFile } from '../share/share.js';

const { miloLibs, codeRoot, locale } = getConfig();
const base = miloLibs || codeRoot;

const GLOBE_IMG = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" focusable="false" class="footer-region-img" loading="lazy"><path d="M50 23.8c-0.2-3.3-1-6.5-2.4-9.5l0 0C43.7 5.9 35.4 0.4 26.2 0h-2.4C14.6 0.4 6.3 5.9 2.4 14.3l0 0c-1.4 3-2.2 6.2-2.4 9.5l0 0v2.4l0 0c0.2 3.3 1 6.5 2.4 9.5l0 0c4 8.4 12.2 13.9 21.4 14.3h2.4c9.2-0.4 17.5-5.9 21.4-14.3l0 0c1.4-3 2.2-6.2 2.4-9.5l0 0V23.8zM47.6 23.8h-9.5c0-3.2-0.4-6.4-1.2-9.5H45C46.6 17.2 47.5 20.5 47.6 23.8zM33.6 11.9h-7.4V2.6C29.3 3.3 31.9 7.1 33.6 11.9zM23.8 2.6v9.3h-7.4C18.1 7.1 20.7 3.3 23.8 2.6zM23.8 14.3v9.5h-9.5c0.1-3.2 0.6-6.4 1.4-9.5H23.8zM23.8 26.2v9.5h-8.1c-0.8-3.1-1.3-6.3-1.4-9.5H23.8zM23.8 38.1v9.3c-3.1-0.7-5.7-4.5-7.4-9.3H23.8zM26.2 47.4v-9.3h7.4C31.9 42.9 29.3 46.7 26.2 47.4zM26.2 35.7v-9.5h9.5c-0.1 3.2-0.6 6.4-1.4 9.5H26.2zM26.2 23.8v-9.5h8.1c0.8 3.1 1.3 6.3 1.4 9.5H26.2zM43.3 11.9h-7.1c-0.9-3.1-2.4-6.1-4.5-8.6C36.4 4.8 40.5 7.8 43.3 11.9zM18.6 3.3c-2.2 2.5-3.8 5.4-4.8 8.6H6.7C9.6 7.8 13.8 4.8 18.6 3.3zM5 14.3h8.1c-0.7 3.1-1.1 6.3-1.2 9.5H2.4C2.5 20.5 3.4 17.2 5 14.3zM2.4 26.2h9.5c0 3.2 0.4 6.4 1.2 9.5H5C3.4 32.8 2.5 29.5 2.4 26.2zM6.4 38.1h7.4c0.9 3.1 2.4 6.1 4.5 8.6 -4.7-1.5-8.8-4.5-11.7-8.6H6.4zM31.4 46.7c2.2-2.5 3.8-5.4 4.8-8.6h7.4C40.6 42.2 36.3 45.3 31.4 46.7zM45 35.7h-8.1c0.7-3.1 1.1-6.3 1.2-9.5h9.5C47.5 29.5 46.6 32.8 45 35.7z"></path></svg>';
const SPECTRUM_CHEVRON = '<svg aria-hidden="true" class="icon-chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><defs><style>.spectrum-chevron-down{fill:none;stroke-linecap:round;stroke-linejoin:round;}</style></defs><path stroke="currentColor" class="spectrum-chevron-down" d="M3.47,5.74l4.53,4.53,4.54-4.53"/></svg>';
const ADCHOICE_IMG = `<img class="footer-link-img" loading="lazy" alt="AdChoices icon" src="${base}/blocks/footer/adchoices-small.svg" height="9" width="9">`;
const SUPPORTED_SOCIAL = ['facebook', 'instagram', 'twitter', 'linkedin', 'pinterest', 'discord', 'behance', 'youtube', 'weibo', 'social-media'];

export class Footer {
  constructor(body, footerEl) {
    this.footerEl = footerEl;
    this.body = body;
    this.desktop = window.matchMedia('(min-width: 900px)');
  }

  init = async () => {
    this.desktop.addEventListener('change', this.onMediaChange);

    const wrapper = createTag('div', { class: 'footer-wrapper' });

    const grid = this.decorateGrid();
    if (grid) {
      wrapper.append(grid);
    }

    const infoRow = await this.createInfoRow();
    if (infoRow.hasChildNodes()) {
      wrapper.append(infoRow);
    }

    this.addAnalytics(wrapper);
    decorateLinks(wrapper);
    this.footerEl.append(wrapper);
  };

  createInfoRow = async () => {
    const infoRow = createTag('div', { class: 'footer-info' });
    const infoColumnLeft = createTag('div', { class: 'footer-info-column' });
    const infoColumnRight = createTag('div', { class: 'footer-info-column' });

    const region = await this.decorateRegion();
    if (region) {
      infoColumnLeft.append(region);
      infoRow.classList.add('has-region');
    }

    const social = await this.decorateSocial();
    if (social) {
      infoColumnLeft.append(social);
      infoRow.classList.add('has-social');
    }

    const privacy = this.decoratePrivacy();
    if (privacy) {
      infoColumnRight.append(privacy);
      infoRow.classList.add('has-privacy');
    }

    if (infoColumnLeft.hasChildNodes()) {
      infoRow.append(infoColumnLeft);
    }
    if (infoColumnRight.hasChildNodes()) {
      infoRow.append(infoColumnRight);
    }

    return infoRow;
  };

  decorateGrid = () => {
    const navGrid = createTag('div', { class: 'footer-nav-grid' });
    const columns = [...this.body.querySelectorAll('body > div')]
      .filter((col) => col.firstElementChild?.nodeName === 'H2');

    if (!columns.length) {
      this.footerEl.classList.add('footer-small');
    }

    const titles = [];

    columns.forEach((column) => {
      column.classList.add('footer-nav-column');
      const headings = column.querySelectorAll('h2');
      headings.forEach((heading) => {
        const titleId = heading.textContent.trim().toLowerCase().replace(/ /g, '-');
        const title = createTag('p', { class: 'footer-nav-item-title', id: titleId });

        title.textContent = heading.textContent;

        const navItem = createTag('div', { class: 'footer-nav-item' });

        navItem.append(title);
        titles.push(title);

        const linksContainer = heading.nextElementSibling;
        linksContainer.classList = 'footer-nav-item-links';
        linksContainer.id = `${titleId}-menu`;
        const links = linksContainer.querySelectorAll('li');
        links.forEach((link) => {
          link.classList.add('footer-nav-item-link');
        });

        navItem.append(linksContainer);
        column.append(heading);
        heading.replaceWith(navItem);
      });
      navGrid.append(column);
    });

    if (!this.desktop.matches) {
      this.setMobileTitles(titles);
    }

    return navGrid;
  };

  decorateRegion = async () => {
    let regionButton = this.body.querySelector('.region-selector a');
    if (!regionButton) return null;

    const regionTextContent = regionButton.textContent;
    regionButton.textContent = '';
    const regionContainer = createTag('div', { class: 'footer-region' });
    const url = new URL(regionButton.href);
    if (url.hash !== '') {
      // if there is a hash, it is a modal-dialog
      decorateAutoBlock(regionButton);
      loadBlock(regionButton);
    } else {
      // if there is no hash, it is an inline-dialog
      const inlineDialogContainer = regionButton.cloneNode(false);
      regionButton = createTag('button', { type: 'button', 'aria-expanded': 'false' });
      regionContainer.append(inlineDialogContainer);
      decorateAutoBlock(inlineDialogContainer);
      loadBlock(inlineDialogContainer);
      regionButton.addEventListener('click', () => {
        regionButton.classList.toggle('inline-dialog-active');
        const ariaExpanded = regionButton.classList.contains('inline-dialog-active');
        regionButton.setAttribute('aria-expanded', ariaExpanded);
      });
      document.addEventListener('click', (e) => {
        if (regionButton.classList.contains('inline-dialog-active') && !e.target.closest('.footer-region')) {
          regionButton.setAttribute('aria-expanded', false);
          regionButton.classList.remove('inline-dialog-active');
        }
      });
    }
    regionButton.className = 'footer-region-button';
    regionButton.setAttribute('aria-haspopup', true);
    regionButton.setAttribute('aria-label', regionTextContent);
    regionButton.setAttribute('role', 'button');
    regionButton.setAttribute('tabindex', 0);
    const regionText = createTag('span', { class: 'footer-region-text' }, regionTextContent);
    regionButton.insertAdjacentHTML('afterbegin', GLOBE_IMG);
    regionButton.append(regionText);
    regionText.insertAdjacentHTML('afterend', SPECTRUM_CHEVRON);
    regionContainer.prepend(regionButton);
    return regionContainer;
  };

  decorateSocial = async () => {
    const block = this.body.querySelector('.social');
    if (!block) return null;
    const socialList = createTag('ul', { class: 'footer-social' });
    const svgEls = await getSVGsfromFile(`${base}/blocks/footer/footer-social.svg`, SUPPORTED_SOCIAL);
    if (!svgEls || svgEls.length === 0) return null;

    SUPPORTED_SOCIAL.forEach((platform) => {
      const a = block.querySelector(`a[href*="${platform}"]`);
      const svg = svgEls.find((el) => el.name === platform);
      if (!a || !svg) return;
      const icon = svg.svg;
      const li = createTag('li', { class: 'footer-social-icon' });
      icon.classList.add('footer-social-img');
      icon.setAttribute('alt', `${platform} logo`);
      icon.setAttribute('height', 20);
      icon.setAttribute('width', 20);
      a.setAttribute('aria-label', platform);
      a.textContent = '';
      a.append(icon);
      li.append(a);
      socialList.append(li);
    });

    return socialList;
  };

  decoratePrivacy = () => {
    const copyrightEl = this.body.querySelector('div > p > em');
    if (!copyrightEl) return null;
    const container = copyrightEl.closest('div');
    const privacyWrapper = createTag('div', { class: 'footer-privacy' });
    const copyright = createTag('p', { class: 'footer-privacy-copyright' });
    const year = new Date().getFullYear();
    copyright.textContent = `Copyright © ${year} ${copyrightEl.textContent}`;
    privacyWrapper.append(copyright);

    const adchoice = container.querySelector('a[href*="#interest-based-ads"]');
    adchoice?.insertAdjacentHTML('afterbegin', ADCHOICE_IMG);

    const ulClass = 'footer-privacy-links';
    const liClass = 'footer-privacy-link';
    let ul = container.querySelector('ul');

    if (ul) {
      ul.classList.add(ulClass);
      const listItems = ul.querySelectorAll('li');
      [...listItems].forEach((item) => {
        item.classList.add(liClass);
      });
    } else {
      const links = container.querySelectorAll('a');
      if (!links) return null;
      ul = createTag('ul', { class: ulClass });
      links.forEach((link) => {
        const li = createTag('li', { class: liClass });
        li.append(link);
        ul.append(li);
      });
    }
    privacyWrapper.append(ul);

    const secondLine = container.querySelector('p:nth-of-type(2)');
    if (secondLine) {
      secondLine.classList.add('footer-copyright-second');
      privacyWrapper.append(secondLine);
    }

    return privacyWrapper;
  };

  addAnalytics = (el) => {
    if (el.nodeName === 'DIV' && el.childElementCount > 0) {
      [...el.children].forEach((child) => this.addAnalytics(child));
      return;
    }

    if (el.nodeName === 'UL') {
      if (el.previousElementSibling?.classList.contains('footer-nav-item-title')) {
        el.setAttribute('daa-lh', el.previousElementSibling.textContent);
      }

      [...el.children].forEach(analyticsDecorateList);
    }
  };

  toggleMenu = (e) => {
    const button = e.target.closest('[role=button]');
    const expanded = button.getAttribute('aria-expanded');
    if (expanded === 'true') {
      this.closeMenu(button);
    } else {
      this.openMenu(button);
    }
  };

  closeMenu = (el) => {
    if (el.id === 'region-button') {
      window.removeEventListener('keydown', this.closeOnEscape);
      window.removeEventListener('click', this.closeOnDocClick);
    }
    el.setAttribute('aria-expanded', false);
  };

  openMenu = (el) => {
    const type = el.classList[0];
    const expandedMenu = document.querySelector(`.${type}[aria-expanded=true]`);
    if (expandedMenu) { this.closeMenu(expandedMenu); }
    if (el.id === 'region-button') {
      window.addEventListener('keydown', this.closeOnEscape);
      window.addEventListener('click', this.closeOnDocClick);
    }
    el.setAttribute('aria-expanded', true);
  };

  toggleOnKey = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      this.toggleMenu(e);
    }
  };

  setDesktopTitles = (titles) => {
    titles?.forEach((title) => {
      title.removeAttribute('role');
      title.removeAttribute('tabindex');
      title.removeAttribute('aria-expanded');
      title.removeAttribute('aria-controls');

      window.removeEventListener('keydown', this.toggleOnKey);
      title.removeEventListener('click', this.toggleMenu);
    });
  };

  setMobileTitles = (titles) => {
    titles?.forEach((title) => {
      title.setAttribute('role', 'button');
      title.setAttribute('tabindex', 0);
      title.setAttribute('aria-expanded', false);
      title.setAttribute('aria-controls', `${title.id}-menu`);
      title.addEventListener('click', this.toggleMenu);

      title.addEventListener('focus', () => {
        window.addEventListener('keydown', this.toggleOnKey);
      });
      title.addEventListener('blur', () => {
        window.removeEventListener('keydown', this.toggleOnKey);
      });
    });
  };

  onMediaChange = (e) => {
    const footerTitles = document.querySelectorAll('.footer-nav-item-title');
    if (e.matches) {
      this.setDesktopTitles(footerTitles);
    } else {
      this.setMobileTitles(footerTitles);
    }
  };
}

async function fetchFooter(url) {
  const resp = await fetch(`${url}.plain.html`);
  const respText = await resp.text();

  if (!resp.ok) {
    return { error: respText }; // can pass additional Response info if needed
  }

  return { html: respText };
}

export default async function init(block) {
  const url = getMetadata('footer-source') || `${locale.contentRoot}/footer`;
  if (url) {
    const { html, error } = await fetchFooter(url);
    if (error) {
      console.log(`Could not create footer: ${error}`);
      return;
    }
    if (html) {
      try {
        const parser = new DOMParser();
        const footerDoc = parser.parseFromString(html, 'text/html');
        const footer = new Footer(footerDoc.body, block);
        footer.init();
      } catch {
        console.log('Could not create footer.');
      }
    }
  }
}
