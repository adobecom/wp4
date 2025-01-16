import {
  createTag,
  decorateSVG,
  decorateLinks,
  getConfig,
  getMetadata,
  loadIms,
  localizeLink,
} from '../../utils/utils.js';

import {
  analyticsDecorateList,
  analyticsGetLabel,
} from '../../martech/attributes.js';

const COMPANY_IMG = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 133.46 118.11"><defs><style>.cls-1{fill:#eb1000;}</style></defs><polygon class="cls-1" points="84.13 0 133.46 0 133.46 118.11 84.13 0"/><polygon class="cls-1" points="49.37 0 0 0 0 118.11 49.37 0"/><polygon class="cls-1" points="66.75 43.53 98.18 118.11 77.58 118.11 68.18 94.36 45.18 94.36 66.75 43.53"/></svg>';
const BRAND_IMG = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 234"><defs><style>.cls-1{fill:#eb1000;}.cls-2{fill:#fff;}</style></defs><rect class="cls-1" width="240" height="234" rx="42.5"/><path id="_256" data-name="256" class="cls-2" d="M186.617,175.95037H158.11058a6.24325,6.24325,0,0,1-5.84652-3.76911L121.31715,99.82211a1.36371,1.36371,0,0,0-2.61145-.034l-19.286,45.94252A1.63479,1.63479,0,0,0,100.92626,148h21.1992a3.26957,3.26957,0,0,1,3.01052,1.99409l9.2814,20.65452a3.81249,3.81249,0,0,1-3.5078,5.30176H53.734a3.51828,3.51828,0,0,1-3.2129-4.90437L99.61068,54.14376A6.639,6.639,0,0,1,105.843,50h28.31354a6.6281,6.6281,0,0,1,6.23289,4.14376L189.81885,171.046A3.51717,3.51717,0,0,1,186.617,175.95037Z"/></svg>';
const BRAND_LOGO_AS_TEXT = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" id="Layer_1" viewBox="0 0 64.57 35"><defs><style>.cls-1{fill: #eb1000;}</style></defs><path class="cls-1" d="M6.27,10.22h4.39l6.2,14.94h-4.64l-3.92-9.92-2.59,6.51h3.08l1.23,3.41H0l6.27-14.94ZM22.03,13.32c.45,0,.94.04,1.43.16v-3.7h3.88v14.72c-.89.4-2.81.89-4.73.89-3.48,0-6.47-1.98-6.47-5.93s2.88-6.13,5.89-6.13ZM22.52,22.19c.36,0,.65-.07.94-.16v-5.42c-.29-.11-.58-.16-.96-.16-1.27,0-2.45.94-2.45,2.92s1.2,2.81,2.47,2.81ZM34.25,13.32c3.23,0,5.98,2.18,5.98,6.02s-2.74,6.02-5.98,6.02-6-2.18-6-6.02,2.72-6.02,6-6.02ZM34.25,22.13c1.11,0,2.14-.89,2.14-2.79s-1.03-2.79-2.14-2.79-2.12.89-2.12,2.79.96,2.79,2.12,2.79ZM41.16,9.78h3.9v3.7c.47-.09.96-.16,1.45-.16,3.03,0,5.84,1.98,5.84,5.86,0,4.1-2.99,6.18-6.53,6.18-1.52,0-3.46-.31-4.66-.87v-14.72ZM45.91,22.17c1.34,0,2.56-.96,2.56-2.94,0-1.85-1.2-2.72-2.5-2.72-.36,0-.65.04-.91.16v5.35c.22.09.51.16.85.16ZM58.97,13.32c2.92,0,5.6,1.87,5.6,5.64,0,.51-.02,1-.09,1.49h-7.27c.4,1.32,1.56,1.94,3.01,1.94,1.18,0,2.27-.29,3.5-.82v2.97c-1.14.58-2.5.82-3.9.82-3.7,0-6.58-2.23-6.58-6.02s2.61-6.02,5.73-6.02ZM60.93,18.02c-.2-1.27-1.05-1.78-1.92-1.78s-1.58.54-1.87,1.78h3.79Z"/></svg>';
const SEARCH_ICON = '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" focusable="false"><path d="M14 2A8 8 0 0 0 7.4 14.5L2.4 19.4a1.5 1.5 0 0 0 2.1 2.1L9.5 16.6A8 8 0 1 0 14 2Zm0 14.1A6.1 6.1 0 1 1 20.1 10 6.1 6.1 0 0 1 14 16.1Z"></path></svg>';
const SEARCH_DEBOUNCE_MS = 300;
export const IS_OPEN = 'is-open';
const SEARCH_TYPE_CONTEXTUAL = 'contextual';

const getLocale = () => getConfig()?.locale?.ietf || 'en-US';
const getCountry = () => getLocale()?.split('-').pop() || 'US';
const isHeading = (el) => el?.nodeName.startsWith('H');
const childIndexOf = (el) => [...el.parentElement.children]
  .filter((e) => (e.nodeName === 'DIV' || e.nodeName === 'P'))
  .indexOf(el);

function getBlockClasses(className) {
  const trimDashes = (str) => str.replace(/(^\s*-)|(-\s*$)/g, '');
  const blockWithVariants = className.split('--');
  const name = trimDashes(blockWithVariants.shift());
  const variants = blockWithVariants.map((v) => trimDashes(v));
  return { name, variants };
}

class Gnav {
  constructor(body, el) {
    this.el = el;
    this.body = body;
    this.decorateBlocks();
    this.desktop = window.matchMedia('(min-width: 1200px)');
  }

  init = () => {
    this.state = {};
    this.curtain = createTag('div', { class: 'gnav-curtain' });
    const nav = createTag('nav', { class: 'gnav', 'aria-label': 'Main' });

    const brand = this.decorateBrand();
    if (brand) {
      nav.append(brand);
    }

    const scrollWrapper = createTag('div', { class: 'mainnav-wrapper' });

    const mainNav = this.decorateMainNav();
    if (mainNav && mainNav.childElementCount) {
      const mobileToggle = this.decorateToggle();
      nav.prepend(mobileToggle);
      scrollWrapper.append(mainNav);
    }

    const search = this.decorateSearch();
    if (search) {
      scrollWrapper.append(search);
    }

    if (scrollWrapper.children.length > 0) {
      nav.append(scrollWrapper);
    }

    const profile = this.decorateProfile();
    if (profile) {
      nav.append(profile);
    }

    const logo = this.decorateLogo();
    if (logo) {
      nav.append(logo);
    }

    const wrapper = createTag('div', { class: 'gnav-wrapper' }, nav);

    this.setBreadcrumbSEO();
    const breadcrumbs = this.decorateBreadcrumbs();
    if (breadcrumbs) {
      wrapper.append(breadcrumbs);
    }
    decorateLinks(wrapper);
    this.el.append(this.curtain, wrapper);
  };

  loadSearch = async () => {
    if (this.onSearchInput) return;

    const { onSearchInput, getHelpxLink } = await import('./gnav-search.js');
    this.getHelpxLink = getHelpxLink;

    const { debounce } = await import('../../utils/action.js');
    if (this.searchType === SEARCH_TYPE_CONTEXTUAL) {
      const { default: onContextualSearchInput } = await import('./gnav-contextual-search.js');
      this.onSearchInput = debounce(onContextualSearchInput, SEARCH_DEBOUNCE_MS);
    } else {
      this.onSearchInput = debounce(onSearchInput, SEARCH_DEBOUNCE_MS);
    }
  };

  decorateToggle = () => {
    const toggle = createTag('button', { class: 'gnav-toggle', 'aria-label': 'Navigation menu', 'aria-expanded': false });
    let onMediaChange;
    const closeToggleOnDocClick = ({ target }) => {
      if (target !== toggle && !target.closest('.mainnav-wrapper')) {
        this.el.classList.remove(IS_OPEN);
        this.desktop.removeEventListener('change', onMediaChange);
        document.removeEventListener('click', closeToggleOnDocClick);
      }
    };
    onMediaChange = (e) => {
      if (e.matches) {
        this.el.classList.remove(IS_OPEN);
        document.removeEventListener('click', closeToggleOnDocClick);
      }
    };
    toggle.addEventListener('click', async () => {
      if (this.el.classList.contains(IS_OPEN)) {
        this.el.classList.remove(IS_OPEN);
        this.desktop.removeEventListener('change', onMediaChange);
        document.removeEventListener('click', closeToggleOnDocClick);
      } else {
        if (this.state.openMenu) {
          this.closeMenu();
        }
        this.el.classList.add(IS_OPEN);
        this.desktop.addEventListener('change', onMediaChange);
        document.addEventListener('click', closeToggleOnDocClick);
        this.loadSearch();
      }
    });
    return toggle;
  };

  decorateBrand = () => {
    const brandBlock = this.body.querySelector('[class^="gnav-brand"]');
    if (!brandBlock) return null;
    const isBrandImage = brandBlock.matches('.brand-image-only');
    const brandLinks = [...brandBlock.querySelectorAll('a')];
    const brand = brandLinks.pop();
    const brandTitle = brand.textContent;
    brand.className = brandBlock.className;
    const title = createTag('span', { class: 'gnav-brand-title' }, brandTitle);
    brand.setAttribute('aria-label', brand.textContent);
    brand.setAttribute('daa-ll', 'Brand');
    if (brand.textContent !== '') brand.textContent = '';
    if (brand.classList.contains('logo')) {
      if (brandLinks.length > 0) {
        decorateSVG(brandLinks[0]);
        brand.insertAdjacentElement('afterbegin', brandBlock.querySelector('img'));
      } else {
        const DEFAULT_IMAGE = isBrandImage ? BRAND_LOGO_AS_TEXT : BRAND_IMG;
        brand.insertAdjacentHTML('afterbegin', DEFAULT_IMAGE);
      }
    }
    if (!isBrandImage) brand.append(title);
    return brand;
  };

  decorateLogo = () => {
    const logo = this.body.querySelector('.adobe-logo a');
    if (!logo) return null;
    logo.classList.add('gnav-logo');
    logo.setAttribute('aria-label', logo.textContent);
    logo.setAttribute('daa-ll', 'Logo');
    logo.textContent = '';
    logo.insertAdjacentHTML('afterbegin', COMPANY_IMG);
    return logo;
  };

  decorateMainNav = () => {
    const mainNav = createTag('div', { class: 'gnav-mainnav' });
    const mainLinks = this.body.querySelectorAll('h2 > a, strong a');
    if (mainLinks.length > 0) {
      this.buildMainNav(mainNav, mainLinks);
    }
    return mainNav;
  };

  buildMainNav = (mainNav, navLinks) => {
    navLinks.forEach((navLink, idx) => {
      if (navLink.parentElement.nodeName === 'STRONG') {
        const cta = Gnav.decorateCta(navLink);
        mainNav.append(cta);
        return;
      }
      navLink.href = localizeLink(navLink.href);
      const navItem = createTag('div', { class: 'gnav-navitem' });
      const navBlock = navLink.closest('.large-menu');
      const menu = navLink.closest('div');

      menu.querySelector('h2').remove();
      navItem.appendChild(navLink);

      // All menu types
      if (menu.childElementCount > 0 || navBlock) {
        const id = `navmenu-${idx}`;
        menu.id = id;
        navItem.classList.add('has-menu');
        Gnav.setNavLinkAttributes(id, navLink);
      }
      // Small and medium menu types
      if (menu.childElementCount > 0) {
        const decoratedMenu = this.decorateMenu(navItem, navLink, menu);
        navItem.appendChild(decoratedMenu);
      }
      // Large Menus & Section Nav
      if (navBlock) {
        navItem.classList.add('large-menu');
        if (navBlock.classList.contains('section')) {
          navItem.classList.add('section-menu');
        }
        this.decorateLargeMenu(navLink, navItem, menu);
      }
      mainNav.appendChild(navItem);
    });
    return mainNav;
  };

  static setNavLinkAttributes = (id, navLink) => {
    navLink.setAttribute('role', 'button');
    navLink.setAttribute('aria-expanded', false);
    navLink.setAttribute('aria-controls', id);
    navLink.setAttribute('daa-ll', navLink.textContent);
    navLink.setAttribute('daa-lh', 'header|Open');
  };

  static decorateLinkGroups = (menu) => {
    const linkGroups = menu.querySelectorAll('.link-group');
    linkGroups.forEach((linkGroup) => {
      const image = linkGroup.querySelector('picture');
      const anchor = linkGroup.querySelector('a');
      const title = anchor?.textContent;
      const subtitle = linkGroup.querySelector('p:last-of-type') || '';
      const titleWrapper = createTag('div');
      titleWrapper.className = 'link-group-title';
      anchor.href = localizeLink(anchor.href);
      const link = createTag('a', { class: 'link-block', href: anchor.href });

      linkGroup.replaceChildren();
      titleWrapper.append(title, subtitle);
      const contents = image ? [image, titleWrapper] : [titleWrapper];
      link.append(...contents);
      linkGroup.appendChild(link);
    });
  };

  setMenuAnalytics = (el) => {
    switch (el.nodeName) {
      case 'DIV':
        if (el.classList.contains('link-group')) {
          const title = el.querySelector('.link-group-title')?.childNodes?.[0]?.textContent;
          if (title) {
            el.firstChild.setAttribute('daa-lh', `${analyticsGetLabel(title)}-${childIndexOf(el) + 1}`);
          }
        } else {
          [...el.children].forEach((childEl) => this.setMenuAnalytics(childEl));
        }
        break;
      case 'UL':
        if (isHeading(el.previousElementSibling)) {
          el.setAttribute('daa-lh', el.previousElementSibling.textContent);
        }
        [...el.children].forEach(analyticsDecorateList);
        break;
      default: {
        const a = el.querySelector('a');
        if (a) {
          a.setAttribute('daa-ll', `${analyticsGetLabel(a.textContent)}-${childIndexOf(el) + 1}`);
        }
      }
    }
  };

  decorateAnalytics = (menu) => [...menu.children].forEach((child) => this.setMenuAnalytics(child));

  static decorateButtons = (menu) => {
    const buttons = menu.querySelectorAll('strong a');
    buttons.forEach((btn) => {
      btn.classList.add('con-button', 'filled', 'blue', 'button-m');
    });
  };

  decorateMenu = (navItem, navLink, menu) => {
    menu.className = 'gnav-navitem-menu';
    menu.setAttribute('daa-lh', `header|${navLink.textContent}`);
    const childCount = menu.childElementCount;
    if (childCount === 1) {
      menu.classList.add('small-Variant');
    } else if (childCount === 2) {
      menu.classList.add('medium-Variant');
    } else if (childCount >= 3) {
      menu.classList.add('large-Variant');
      const container = createTag('div', { class: 'gnav-menu-container' });
      container.append(...Array.from(menu.children));
      decorateLinks(container);
      menu.append(container);
    }
    Gnav.decorateLinkGroups(menu);
    this.decorateAnalytics(menu);
    navLink.addEventListener('focus', () => {
      window.addEventListener('keydown', this.toggleOnSpace);
    });
    navLink.addEventListener('blur', () => {
      window.removeEventListener('keydown', this.toggleOnSpace);
    });
    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleMenu(navItem);
    });
    Gnav.decorateButtons(menu);
    return menu;
  };

  decorateLargeMenu = (navLink, navItem, menu) => {
    let path = navLink.href;
    path = localizeLink(path);
    const promise = fetch(`${path}.plain.html`);
    promise.then(async (resp) => {
      if (resp.status === 200) {
        const text = await resp.text();
        menu.insertAdjacentHTML('beforeend', text);
        const links = menu.querySelectorAll('a');
        links.forEach((link) => {
          decorateSVG(link);
        });
        const decoratedMenu = this.decorateMenu(navItem, navLink, menu);
        const menuSections = decoratedMenu.querySelectorAll('.gnav-menu-container > div');
        menuSections.forEach((sec) => { sec.classList.add('section'); });
        const sectionMetas = decoratedMenu.querySelectorAll('.section-metadata');
        sectionMetas.forEach(async (meta) => {
          const { default: sectionMetadata } = await import('../section-metadata/section-metadata.js');
          sectionMetadata(meta);
        });
        navItem.appendChild(decoratedMenu);
      }
    });
  };

  static decorateCta = (cta) => {
    if (cta) {
      const { origin } = new URL(cta.href);
      if (origin !== window.location.origin) {
        cta.target = '_blank';
      }
      cta.classList.add('con-button', 'blue', 'button-m');
      cta.setAttribute('daa-ll', analyticsGetLabel(cta.textContent));
      cta.parentElement.classList.add('gnav-cta');
      return cta.parentElement;
    }
    return null;
  };

  decorateSearch = () => {
    const searchBlock = this.body.querySelector('.search');
    if (!searchBlock) return null;

    const isContextual = searchBlock.classList.contains(SEARCH_TYPE_CONTEXTUAL);
    if (isContextual) {
      this.searchType = SEARCH_TYPE_CONTEXTUAL;
    }

    const advancedSearchEl = searchBlock.querySelector('a:not([href$=".json"])');
    let advancedSearchWrapper = null;
    if (advancedSearchEl) {
      advancedSearchWrapper = createTag('li', null, advancedSearchEl);
    }

    const contextualConfig = {};
    [...searchBlock.children].forEach(({ children }, index) => {
      if (index === 0 || children.length !== 2) return;
      const key = children[0].textContent?.toLowerCase();
      const link = children[1].querySelector('a');
      const value = link ? link.href : children[1].textContent;
      contextualConfig[key] = value;
    });

    const label = searchBlock.querySelector('p').textContent;
    const searchEl = createTag('div', { class: `gnav-search ${isContextual ? SEARCH_TYPE_CONTEXTUAL : ''}` });
    const searchBar = this.decorateSearchBar(label, advancedSearchWrapper, contextualConfig);
    const searchButton = createTag(
      'button',
      {
        class: 'gnav-search-button',
        'aria-label': label,
        'aria-expanded': false,
        'aria-controls': 'gnav-search-bar',
        'daa-ll': 'Search',
      },
      SEARCH_ICON,
    );
    searchButton.addEventListener('click', () => {
      this.loadSearch();
      this.toggleMenu(searchEl);
    });
    searchEl.append(searchButton, searchBar);
    return searchEl;
  };

  decorateSearchBar = (label, advancedSearchEl, contextualConfig) => {
    const searchBar = createTag('aside', { id: 'gnav-search-bar', class: 'gnav-search-bar' });
    const searchField = createTag('div', { class: 'gnav-search-field' }, SEARCH_ICON);
    const searchInput = createTag('input', {
      class: 'gnav-search-input',
      placeholder: label,
      'daa-ll': 'search-results:standard search',
    });
    const searchResults = createTag('div', { class: 'gnav-search-results' });
    const searchResultsUl = createTag('ul');
    searchResults.append(searchResultsUl);
    const { locale } = getConfig();

    locale.geo = getCountry();

    searchInput.addEventListener('input', (e) => {
      this.onSearchInput?.({
        value: e.target.value,
        resultsEl: searchResultsUl,
        locale,
        searchInputEl: searchInput,
        advancedSearchEl,
        contextualConfig,
      });
    });

    searchInput.addEventListener('keydown', (e) => {
      if (advancedSearchEl && e.code === 'Enter') {
        window.open(this.getHelpxLink(e.target.value, locale.prefix, locale.geo));
      }
    });

    searchField.append(searchInput);
    searchBar.append(searchField, searchResults);
    return searchBar;
  };

  static getNoResultsEl = (advancedSearchEl) => createTag('li', null, advancedSearchEl);

  /* c8 ignore start */
  getAppLauncher = async (profileEl) => {
    const appLauncherBlock = this.body.querySelector('.app-launcher');
    if (!appLauncherBlock) return;

    const { default: appLauncher } = await import('./gnav-appLauncher.js');
    appLauncher(profileEl, appLauncherBlock, this.toggleMenu);
  };

  decorateProfile = () => {
    const blockEl = this.body.querySelector('.profile');
    if (!blockEl) return null;
    const profileEl = createTag('div', { class: 'gnav-profile' });
    if (blockEl.children.length > 1) profileEl.classList.add('has-menu');

    const { imsClientId } = getConfig();
    if (!imsClientId) return null;

    loadIms()
      .then(() => {
        this.imsReady(blockEl, profileEl);
      })
      .catch(() => {});

    return profileEl;
  };

  imsReady = async (blockEl, profileEl) => {
    const accessToken = window.adobeIMS.getAccessToken();
    if (accessToken) {
      const { env } = getConfig();
      const ioResp = await fetch(`https://${env.adobeIO}/profile`, { headers: new Headers({ Authorization: `Bearer ${accessToken.token}` }) });

      if (ioResp.status === 200) {
        const profile = await import('./gnav-profile.js');
        profile.default(blockEl, profileEl, this.toggleMenu, ioResp);
        this.getAppLauncher(profileEl);
      } else {
        this.decorateSignIn(blockEl, profileEl);
      }
    } else {
      this.decorateSignIn(blockEl, profileEl);
    }
  };

  decorateSignIn = (blockEl, profileEl) => {
    const dropDown = blockEl.querySelector(':scope > div:nth-child(2)');
    decorateLinks(blockEl);
    const signIn = blockEl.querySelector('a');

    signIn.classList.add('gnav-signin');
    signIn.setAttribute('daa-ll', 'Sign In');

    const signInEl = dropDown?.querySelector('li:last-of-type a') || profileEl;

    if (dropDown) {
      const id = `navmenu-${blockEl.className}`;

      dropDown.id = id;
      profileEl.classList.add('gnav-navitem');
      profileEl.insertAdjacentElement('beforeend', dropDown);

      this.decorateMenu(profileEl, signIn, dropDown);
      Gnav.setNavLinkAttributes(id, signIn);
    }
    signInEl.addEventListener('click', (e) => {
      e.preventDefault();
      const { signInContext } = getConfig();
      window.adobeIMS.signIn(signInContext);
    });
    profileEl.append(signIn);
  };

  setBreadcrumbSEO = () => {
    const seoEnabled = getMetadata('breadcrumb-seo') !== 'off';
    if (!seoEnabled) return;
    const breadcrumb = this.el.querySelector('.breadcrumbs');
    if (!breadcrumb) return;
    const breadcrumbSEO = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [] };
    const items = breadcrumb.querySelectorAll('ul > li');
    items.forEach((item, idx) => {
      const link = item.querySelector('a');
      breadcrumbSEO.itemListElement.push({
        '@type': 'ListItem',
        position: idx + 1,
        name: link ? link.innerHTML : item.innerHTML,
        item: link?.href,
      });
    });
    const script = createTag('script', { type: 'application/ld+json' }, JSON.stringify(breadcrumbSEO));
    document.head.append(script);
  };

  decorateBreadcrumbs = () => {
    const parent = this.el.querySelector('.breadcrumbs');
    if (parent) {
      const ul = parent.querySelector('ul');
      if (ul) {
        ul.querySelector('li:last-of-type')?.setAttribute('aria-current', 'page');
        const nav = createTag('nav', { class: 'breadcrumbs', 'aria-label': 'Breadcrumb' }, ul);
        parent.remove();
        return nav;
      }
    }
    return null;
  };
  /* c8 ignore stop */

  /**
   * Toggles menus when clicked directly
   * @param {HTMLElement} el the element to check
   */
  toggleMenu = (el) => {
    const isSearch = el.classList.contains('gnav-search');
    const sameMenu = el === this.state.openMenu;
    if (this.state.openMenu) {
      this.closeMenu();
    }
    if (!sameMenu) {
      this.openMenu(el, isSearch);
    }
  };

  closeMenu = () => {
    this.state.openMenu.classList.remove(IS_OPEN);
    this.curtain.classList.remove('is-open');
    this.curtain.classList.remove('is-quiet');
    document.removeEventListener('click', this.closeOnDocClick);
    window.removeEventListener('keydown', this.closeOnEscape);
    const menuToggle = this.state.openMenu.querySelector('[aria-expanded]');
    menuToggle.setAttribute('aria-expanded', false);
    menuToggle.setAttribute('daa-lh', 'header|Open');
    this.state.openMenu = null;
  };

  openMenu = (el, isSearch) => {
    el.classList.add(IS_OPEN);

    const menuToggle = el.querySelector('[aria-expanded]');
    menuToggle.setAttribute('aria-expanded', true);
    menuToggle.setAttribute('daa-lh', 'header|Close');

    document.addEventListener('click', this.closeOnDocClick);
    window.addEventListener('keydown', this.closeOnEscape);
    if (!isSearch) {
      const desktop = window.matchMedia('(min-width: 900px)');
      if (desktop.matches) {
        document.addEventListener('scroll', this.closeOnScroll, { passive: true });
        if (el.classList.contains('large-menu')) {
          this.curtain.classList.add('is-open', 'is-quiet');
        }
      }
    } else {
      this.curtain.classList.add('is-open');
      el.querySelector('.gnav-search-input').focus();
    }
    this.state.openMenu = el;
  };

  toggleOnSpace = (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      const parentEl = e.target.closest('.has-menu');
      this.toggleMenu(parentEl);
    }
  };

  closeOnScroll = () => {
    let scrolled;
    if (!scrolled) {
      if (this.state.openMenu) {
        this.toggleMenu(this.state.openMenu);
      }
      scrolled = true;
      document.removeEventListener('scroll', this.closeOnScroll);
    }
  };

  closeOnDocClick = (e) => {
    const closest = e.target.closest(`.${IS_OPEN}`);
    const isCurtain = e.target === this.curtain;
    if ((this.state.openMenu && !closest) || isCurtain) {
      this.toggleMenu(this.state.openMenu);
    }
    if (isCurtain) {
      this.curtain.classList.remove('is-open');
    }
  };

  closeOnEscape = (e) => {
    if (e.code === 'Escape') {
      this.toggleMenu(this.state.openMenu);
    }
  };

  decorateBlocks = () => {
    const variantBlocks = this.body.querySelectorAll('[class$="-"]');
    variantBlocks.forEach((block) => {
      const { name, variants } = getBlockClasses(block.className);
      block.classList.add(name, ...variants);
    });
  };
}

async function fetchGnav(url) {
  const resp = await fetch(`${url}.plain.html`);
  const html = await resp.text();
  return html;
}

export default async function init(header) {
  const { locale, imsClientId } = getConfig();
  const name = imsClientId ? `|${imsClientId}` : '';
  const url = getMetadata('gnav-source') || `${locale.contentRoot}/gnav`;
  const html = await fetchGnav(url);
  if (!html) return null;
  try {
    const initEvent = new Event('gnav:init');
    const parser = new DOMParser();
    const gnavDoc = parser.parseFromString(html, 'text/html');
    const gnav = new Gnav(gnavDoc.body, header);
    gnav.init();
    header.dispatchEvent(initEvent);
    header.setAttribute('daa-im', 'true');
    header.setAttribute('daa-lh', `gnav${name}`);
    return gnav;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Could not create global navigation:', e);
    return null;
  }
}
