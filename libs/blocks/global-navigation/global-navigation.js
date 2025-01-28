/* eslint import/no-relative-packages: 0 */
/* eslint-disable no-async-promise-executor */
import {
  getConfig,
  getMetadata,
  loadIms,
  decorateLinks,
  loadScript,
  getGnavSource,
} from '../../utils/utils.js';
import {
  closeAllDropdowns,
  decorateCta,
  fetchAndProcessPlainHtml,
  getActiveLink,
  getAnalyticsValue,
  getExperienceName,
  isActiveLink,
  icons,
  isDesktop,
  isTangentToViewport,
  lanaLog,
  loadBaseStyles,
  loadDecorateMenu,
  rootPath,
  loadStyles,
  logErrorFor,
  selectors,
  setActiveDropdown,
  setCurtainState,
  setUserProfile,
  toFragment,
  trigger,
  yieldToMain,
  addMepHighlightAndTargetId,
  isDarkMode,
  darkIcons,
  setDisableAEDState,
  animateInSequence,
  transformTemplateToMobile,
  closeAllTabs,
  disableMobileScroll,
  enableMobileScroll,
  setAsyncDropdownCount,
} from './utilities/utilities.js';
import { getFedsPlaceholderConfig } from '../../utils/federated.js';

import { replaceKey, replaceKeyArray } from '../../features/placeholders.js';

const SIGNIN_CONTEXT = getConfig()?.signInContext;

function getHelpChildren() {
  const { unav } = getConfig();
  return unav?.unavHelpChildren || [
    { type: 'Support' },
    { type: 'Community' },
  ];
}

export const CONFIG = {
  icons: isDarkMode() ? darkIcons : icons,
  delays: {
    mainNavDropdowns: 800,
    loadDelayed: 3000,
    keyboardNav: 8000,
  },
  features: [
    'gnav-brand',
    'gnav-promo',
    'search',
    'profile',
    'app-launcher',
    'adobe-logo',
  ],
  universalNav: {
    components: {
      profile: {
        name: 'profile',
        attributes: {
          isSignUpRequired: false,
          componentLoaderConfig: {
            config: {
              enableLocalSection: true,
              miniAppContext: {
                onMessage: (name, payload) => {
                  if (name === 'System' && payload.subType === 'AppInitiated') {
                    window.adobeProfile?.getUserProfile()
                      .then((data) => { setUserProfile(data); })
                      .catch(() => { setUserProfile({}); });
                  }
                },
                logger: {
                  trace: () => {},
                  debug: () => {},
                  info: () => {},
                  warn: (e) => lanaLog({ message: 'Profile Menu warning', e, tags: 'errorType=warn,module=universalnav' }),
                  error: (e) => lanaLog({ message: 'Profile Menu error', e, tags: 'errorType=error,module=universalnav' }),
                },
              },
              ...getConfig().unav?.profile?.config,
            },
          },
          callbacks: {
            onSignIn: () => { window.adobeIMS?.signIn(SIGNIN_CONTEXT); },
            onSignUp: () => { window.adobeIMS?.signIn(SIGNIN_CONTEXT); },
          },
        },
      },
      appswitcher: { name: 'app-switcher' },
      notifications: {
        name: 'notifications',
        attributes: {
          notificationsConfig: {
            applicationContext: {
              appID: getConfig().unav?.uncAppId || 'adobecom',
              ...getConfig().unav?.uncConfig,
            },
          },
        },
      },
      help: {
        name: 'help',
        attributes: { children: getHelpChildren() },
      },
      jarvis: {
        name: 'jarvis',
        attributes: {
          appid: getConfig().jarvis?.id,
          callbacks: getConfig().jarvis?.callbacks,
        },
      },
    },
  },
};

export const osMap = {
  Mac: 'macOS',
  Win: 'windows',
  Linux: 'linux',
  CrOS: 'chromeOS',
  Android: 'android',
  iPad: 'iPadOS',
  iPhone: 'iOS',
};

export const LANGMAP = {
  cs: ['cz'],
  da: ['dk'],
  de: ['at'],
  en: ['africa', 'au', 'ca', 'ie', 'in', 'mt', 'ng', 'nz', 'sg', 'za'],
  es: ['ar', 'cl', 'co', 'cr', 'ec', 'gt', 'la', 'mx', 'pe', 'pr'],
  et: ['ee'],
  ja: ['jp'],
  ko: ['kr'],
  nb: ['no'],
  pt: ['br'],
  sl: ['si'],
  sv: ['se'],
  uk: ['ua'],
  zh: ['cn', 'tw'],
};

// signIn, decorateSignIn and decorateProfileTrigger can be removed if IMS takes over the profile
const signIn = (options = {}) => {
  if (typeof window.adobeIMS?.signIn !== 'function') {
    lanaLog({ message: 'IMS signIn method not available', tags: 'errorType=warn,module=gnav' });
    return;
  }
  window.adobeIMS.signIn(options);
};

const decorateSignIn = async ({ rawElem, decoratedElem }) => {
  const dropdownElem = rawElem.querySelector(':scope > div:nth-child(2)');
  const signInLabel = await replaceKey('sign-in', getFedsPlaceholderConfig());
  let signInElem;

  if (!dropdownElem) {
    signInElem = toFragment`<button daa-ll="${signInLabel}" class="feds-signIn">${signInLabel}</button>`;

    signInElem.addEventListener('click', (e) => {
      e.preventDefault();
      signIn(SIGNIN_CONTEXT);
    });
  } else {
    signInElem = toFragment`<button daa-ll="${signInLabel}" class="feds-signIn" aria-expanded="false" aria-haspopup="true">${signInLabel}</button>`;

    signInElem.addEventListener('click', (e) => trigger({ element: signInElem, event: e }));
    signInElem.addEventListener('keydown', (e) => e.code === 'Escape' && closeAllDropdowns());
    dropdownElem.addEventListener('keydown', (e) => e.code === 'Escape' && closeAllDropdowns());

    dropdownElem.classList.add('feds-signIn-dropdown');

    const dropdownSignInAnchor = dropdownElem.querySelector('[href$="?sign-in=true"]');
    if (dropdownSignInAnchor) {
      const dropdownSignInButton = toFragment`<button class="feds-signIn">${dropdownSignInAnchor.textContent}</button>`;
      dropdownSignInAnchor.replaceWith(dropdownSignInButton);
      dropdownSignInButton.addEventListener('click', (e) => {
        e.preventDefault();
        signIn(SIGNIN_CONTEXT);
      });
    } else {
      lanaLog({ message: 'Sign in link not found in dropdown.', tags: 'errorType=warn,module=gnav' });
    }

    decoratedElem.append(dropdownElem);
  }

  decoratedElem.prepend(signInElem);
};

const decorateProfileTrigger = async ({ avatar }) => {
  const [label, profileAvatar] = await replaceKeyArray(
    ['profile-button', 'profile-avatar'],
    getFedsPlaceholderConfig(),
  );

  const buttonElem = toFragment`
    <button
      data-cs-mask
      class="feds-profile-button"
      aria-expanded="false"
      aria-controls="feds-profile-menu"
      aria-label="${label}"
      daa-ll="Account"
      aria-haspopup="true"
    >
      <img data-cs-mask class="feds-profile-img" src="${avatar}" alt="${profileAvatar}"></img>
    </button>
  `;

  return buttonElem;
};

let keyboardNav;
const setupKeyboardNav = async (newMobileWithLnav) => {
  keyboardNav = keyboardNav || new Promise(async (resolve) => {
    const { default: KeyboardNavigation } = await import('./utilities/keyboard/index.js');
    const instance = new KeyboardNavigation(newMobileWithLnav);
    resolve(instance);
  });
};

const getBrandImage = (image, brandImageOnly) => {
  // Return the default Adobe logo if an image is not available
  if (!image) return brandImageOnly ? CONFIG.icons.brand : CONFIG.icons.company;

  // Try to decorate image as PNG, JPG or JPEG
  const imgText = image?.textContent || '';
  const [source, alt] = imgText.split('|');
  if (source.trim().length) {
    const img = toFragment`<img src="${source.trim()}" />`;
    if (alt) img.alt = alt.trim();
    return img;
  }

  // Return the default Adobe logo if the image could not be decorated
  return brandImageOnly ? CONFIG.icons.brand : CONFIG.icons.company;
};

const closeOnClickOutside = (e, isLocalNav, navWrapper) => {
  if (isLocalNav && navWrapper.classList.contains('feds-nav-wrapper--expanded')) return;
  const newMobileNav = getMetadata('mobile-gnav-v2') !== 'false';
  if (!isDesktop.matches && !newMobileNav) return;

  const openElemSelector = `${selectors.globalNav} [aria-expanded = "true"], ${selectors.localNav} [aria-expanded = "true"]`;
  const isClickedElemOpen = [...document.querySelectorAll(openElemSelector)]
    .find((openItem) => openItem.parentElement.contains(e.target));

  if (!isClickedElemOpen) {
    closeAllDropdowns();
  }
};

export const getUniversalNavLocale = (locale) => {
  if (!locale.prefix || locale.prefix === '/') return 'en_US';
  const prefix = locale.prefix.replace('/', '');
  if (prefix.includes('_')) {
    const [lang, country] = prefix.split('_').reverse();
    return `${lang.toLowerCase()}_${country.toUpperCase()}`;
  }

  if (prefix === 'uk') return 'en_GB';
  const customLang = Object.keys(LANGMAP).find((key) => LANGMAP[key].includes(prefix));
  if (customLang) return `${customLang.toLowerCase()}_${prefix.toUpperCase()}`;

  return `${prefix.toLowerCase()}_${prefix.toUpperCase()}`;
};

const convertToPascalCase = (str) => str
  ?.split('-')
  .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
  .join(' ');

class Gnav {
  constructor({ content, block, newMobileNav } = {}) {
    this.content = content;
    this.block = block;
    this.customLinks = getConfig()?.customLinks?.split(',') || [];

    this.blocks = {
      profile: {
        rawElem: this.content.querySelector('.profile'),
        decoratedElem: toFragment`<div data-cs-mask class="feds-profile"></div>`,
      },
      search: { config: { icon: CONFIG.icons.search } },
      breadcrumbs: { wrapper: '' },
    };

    this.setupUniversalNav();
    this.elements = {};
    this.newMobileNav = newMobileNav;
  }

  // eslint-disable-next-line no-return-assign
  getOriginalTitle = (firstElem) => this.originalTitle ||= firstElem.textContent?.split('::');

  setupUniversalNav = () => {
    const meta = getMetadata('universal-nav')?.toLowerCase();
    this.universalNavComponents = meta?.split(',').map((option) => option.trim())
      .filter((component) => Object.keys(CONFIG.universalNav.components).includes(component) || component === 'signup');
    this.useUniversalNav = meta === 'on' || !!this.universalNavComponents?.length;
    if (this.useUniversalNav) {
      delete this.blocks.profile;
      this.blocks.universalNav = toFragment`<div class="feds-utilities"></div>`;
      this.blocks.universalNav.addEventListener('click', () => {
        if (this.isToggleExpanded()) this.toggleMenuMobile();
      }, true);
    }
  };

  init = () => logErrorFor(async () => {
    this.elements.curtain = toFragment`<div class="feds-curtain"></div>`;

    // Order is important, decorateTopnavWrapper will render the nav
    // Ensure any critical task is executed before it
    const tasks = [
      // decorateAside is the only async function that fires prior to rendering
      // (at time of writing). If there is no aside it returns sync -- no problem.
      // But if there is, we need those functions (import + decorate) to enter the event loop
      // before the delayed decorateDropdown function does.
      // the rest is taken care of by the 'await' semantics
      // We needn't worry about delays now since decorateAside
      // needed to run anyway prior to decorateTopNavWrapper
      this.decorateAside,
      this.decorateMainNav,
      this.decorateTopNav,
      this.decorateTopnavWrapper,
      loadBaseStyles,
      this.ims,
      this.addChangeEventListeners,
    ];
    const fetchKeyboardNav = () => {
      setupKeyboardNav(this.isLocalNav());
    };
    this.block.addEventListener('click', this.loadDelayed);
    this.block.addEventListener('keydown', fetchKeyboardNav);
    setTimeout(this.loadDelayed, CONFIG.delays.loadDelayed);
    setTimeout(fetchKeyboardNav, CONFIG.delays.keyboardNav);
    for (const task of tasks) {
      await yieldToMain();
      await task();
    }

    document.addEventListener('click', (e) => closeOnClickOutside(e, this.isLocalNav(), this.elements.navWrapper));
    isDesktop.addEventListener('change', closeAllDropdowns);
  }, 'Error in global navigation init', 'errorType=error,module=gnav');

  ims = async () => (window.adobeIMS?.initialized ? this.imsReady() : loadIms()
    .then(() => this.imsReady())
    .catch((e) => {
      if (e?.message === 'IMS timeout') {
        window.addEventListener('onImsLibInstance', () => this.imsReady());
        return;
      }
      lanaLog({ message: 'GNAV: Error with IMS', e, tags: 'errorType=info,module=gnav' });
    }));

  decorateProductEntryCTA = () => {
    const button = this.content.querySelector('.product-entry-cta a');
    if (!button) return null;
    const cta = decorateCta({ elem: button, type: this.getMainNavItemType(button) });
    cta.closest('.feds-cta-wrapper').classList.add('feds-product-entry-cta');
    return cta;
  };

  decorateTopNav = () => {
    this.elements.mobileToggle = this.decorateToggle();
    this.elements.topnav = toFragment`
      <nav class="feds-topnav" aria-label="Main">
        <div class="feds-brand-container">
          ${this.elements.mobileToggle}
          ${this.decorateBrand()}
        </div>
        ${this.elements.navWrapper}
        ${getMetadata('product-entry-cta')?.toLowerCase() === 'on' ? this.decorateProductEntryCTA() : ''}
        ${getConfig().searchEnabled === 'on' ? toFragment`<div class="feds-client-search"></div>` : ''}
        ${this.useUniversalNav ? this.blocks.universalNav : ''}
        ${(!this.useUniversalNav && this.blocks.profile.rawElem) ? this.blocks.profile.decoratedElem : ''}
        ${this.decorateLogo()}
      </nav>
    `;
  };

  decorateLocalNav = async () => {
    if (!this.isLocalNav()) return;
    const localNavItems = this.elements.navWrapper.querySelector('.feds-nav').querySelectorAll('.feds-navItem:not(.feds-navItem--section, .feds-navItem--mobile-only)');
    const firstElem = localNavItems[0]?.querySelector('a');
    if (!firstElem) {
      lanaLog({ message: 'GNAV: Incorrect authoring of localnav found.', tags: 'errorType=info,module=gnav' });
      return;
    }
    const [title, navTitle = ''] = this.getOriginalTitle(firstElem);
    let localNav = document.querySelector('.feds-localnav');
    if (!localNav) {
      lanaLog({
        message: 'GNAV: Localnav does not include \'localnav\' in its name.',
        tags: 'errorType=info,module=gnav',
      });
      localNav = toFragment`<div class="feds-localnav"/>`;
      this.block.after(localNav);
    }
    localNav.setAttribute('daa-lh', `${title}_localNav`);
    localNav.append(toFragment`<button class="feds-navLink--hoverCaret feds-localnav-title" aria-haspopup="true" aria-expanded="false" daa-ll="${title}_localNav|open"></button>`, toFragment` <div class="feds-localnav-curtain"></div>`, toFragment` <div class="feds-localnav-items"></div>`, toFragment`<a href="#" class="feds-sr-only feds-localnav-exit">.</a>`);

    const itemWrapper = localNav.querySelector('.feds-localnav-items');
    const titleLabel = await replaceKey('overview', getFedsPlaceholderConfig());

    localNavItems.forEach((elem, idx) => {
      const clonedItem = elem.cloneNode(true);
      const link = clonedItem.querySelector('a');

      if (idx === 0) {
        localNav.querySelector('.feds-localnav-title').innerText = title.trim();
        link.textContent = navTitle.trim() || titleLabel;
      }

      itemWrapper.appendChild(clonedItem);
    });

    localNav.querySelector('.feds-localnav-title').addEventListener('click', () => {
      localNav.classList.toggle('feds-localnav--active');
      const isActive = localNav.classList.contains('feds-localnav--active');
      localNav.querySelector('.feds-localnav-title').setAttribute('aria-expanded', isActive);
      localNav.querySelector('.feds-localnav-title').setAttribute('daa-ll', `${title}_localNav|${isActive ? 'close' : 'open'}`);
    });

    localNav.querySelector('.feds-localnav-curtain').addEventListener('click', (e) => {
      trigger({ element: e.currentTarget, event: e, type: 'localNav-curtain' });
    });
    const promo = document.querySelector('.feds-promo-aside-wrapper');
    if (promo) localNav.classList.add('has-promo');
    this.elements.localNav = localNav;
    localNavItems[0].querySelector('a').textContent = title.trim();
    const isAtTop = () => {
      const rect = this.elements.localNav.getBoundingClientRect();
      // note: ios safari changes between -0.34375, 0, and 0.328125
      return rect.top === 0;
    };
    window.addEventListener('scroll', () => {
      const classList = this.elements.localNav?.classList;
      if (isAtTop()) {
        if (!classList?.contains('is-sticky')) {
          classList?.add('is-sticky');
        }
      } else {
        classList?.remove('is-sticky');
      }
    });
  };

  decorateTopnavWrapper = async () => {
    const breadcrumbs = isDesktop.matches ? await this.decorateBreadcrumbs() : '';
    this.elements.topnavWrapper = toFragment`<div class="feds-topnav-wrapper">
        ${this.elements.topnav}
        ${breadcrumbs}
      </div>
      `;

    this.block.append(
      this.elements.curtain,
      this.elements.topnavWrapper,
    );
  };

  addChangeEventListeners = () => {
    // Ensure correct DOM order for elements between mobile and desktop
    isDesktop.addEventListener('change', () => {
      if (isDesktop.matches) {
        // On desktop, search is after nav
        if (this.elements.mainNav instanceof HTMLElement
          && this.elements.search instanceof HTMLElement) {
          this.elements.mainNav.after(this.elements.search);
        }

        // On desktop, breadcrumbs are below the whole nav
        if (this.elements.topnav instanceof HTMLElement
          && this.elements.breadcrumbsWrapper instanceof HTMLElement) {
          this.elements.topnav.after(this.elements.breadcrumbsWrapper);
        }
      } else {
        // On mobile, nav is after search
        if (this.elements.mainNav instanceof HTMLElement
          && this.elements.search instanceof HTMLElement) {
          this.elements.mainNav.before(this.elements.search);
        }

        // On mobile, breadcrumbs are before the search and nav
        if (this.elements.navWrapper instanceof HTMLElement
          && this.elements.breadcrumbsWrapper instanceof HTMLElement) {
          this.elements.navWrapper.prepend(this.elements.breadcrumbsWrapper);
        }
      }
    });

    // Add a modifier when the nav is tangent to the viewport and content is partly hidden
    const toggleContraction = () => {
      const isOverflowing = isTangentToViewport.matches
        && this.elements.topnav?.scrollWidth
        && this.elements.topnav.scrollWidth > document.body.clientWidth;

      this.elements.topnav.classList.toggle(selectors.overflowingTopNav.slice(1), isOverflowing);
      window.dispatchEvent(new CustomEvent('feds:navOverflow', { detail: { isOverflowing } }));
    };

    toggleContraction();
    isTangentToViewport.addEventListener('change', toggleContraction);
  };

  loadDelayed = async () => {
    this.ready = this.ready || new Promise(async (resolve) => {
      try {
        this.block.removeEventListener('click', this.loadDelayed);
        this.block.removeEventListener('keydown', this.loadDelayed);
        if (this.searchPresent()) {
          const [
            { default: Search },
          ] = await Promise.all([
            import('./features/search/gnav-search.js'),
            loadStyles(rootPath('features/search/gnav-search.css')),
          ]);
          this.Search = Search;
        }

        if (!this.useUniversalNav) {
          const [{ default: ProfileDropdown }] = await Promise.all([
            import('./features/profile/dropdown.js'),
            loadStyles(rootPath('features/profile/dropdown.css')),
          ]);
          this.ProfileDropdown = ProfileDropdown;
        }

        resolve();
      } catch (e) {
        lanaLog({ message: 'GNAV: Error within loadDelayed', e, tags: 'errorType=warn,module=gnav' });
        resolve();
      }
    });

    return this.ready;
  };

  imsReady = async () => {
    if (!window.adobeIMS.isSignedInUser() || !this.useUniversalNav) setUserProfile({});

    const tasks = [this.useUniversalNav ? this.decorateUniversalNav : this.decorateProfile];

    try {
      for await (const task of tasks) {
        await yieldToMain();
        await task();
      }
    } catch (e) {
      lanaLog({ message: 'GNAV: issues within onReady', e, tags: 'errorType=info,module=gnav' });
    }
  };

  decorateProfile = async () => {
    const { rawElem, decoratedElem } = this.blocks.profile;
    if (!rawElem) return;

    const isSignedInUser = window.adobeIMS.isSignedInUser();

    // If user is not signed in, decorate the 'Sign In' element
    if (!isSignedInUser) {
      await decorateSignIn({ rawElem, decoratedElem });
      return;
    }

    // If user is signed in, decorate the profile avatar
    const accessToken = window.adobeIMS.getAccessToken();
    const { env } = getConfig();
    const headers = new Headers({ Authorization: `Bearer ${accessToken.token}` });
    const profileData = await fetch(`https://${env.adobeIO}/profile`, { headers });

    if (profileData.status !== 200) {
      lanaLog({
        message: 'GNAV: decorateProfile has failed to fetch profile data',
        e: `${profileData.statusText} url: ${profileData.url}`,
        tags: 'errorType=info,module=gnav',
      });
      return;
    }

    const { sections, user: { avatar } } = await profileData.json();

    this.blocks.profile.buttonElem = await decorateProfileTrigger({ avatar });
    decoratedElem.append(this.blocks.profile.buttonElem);

    // Decorate the profile dropdown
    // after user interacts with button or after 3s have passed
    let decorationTimeout;

    const decorateDropdown = async (e) => {
      this.blocks.profile.buttonElem.removeEventListener('click', decorateDropdown);
      clearTimeout(decorationTimeout);
      await this.loadDelayed();
      this.blocks.profile.dropdownInstance = new this.ProfileDropdown({
        rawElem,
        decoratedElem,
        avatar,
        sections,
        buttonElem: this.blocks.profile.buttonElem,
        // If the dropdown has been decorated due to a click, open it
        openOnInit: e instanceof Event,
      });
    };

    this.blocks.profile.buttonElem.addEventListener('click', decorateDropdown);
    decorationTimeout = setTimeout(decorateDropdown, CONFIG.delays.loadDelayed);
  };

  decorateUniversalNav = async () => {
    const config = getConfig();
    const locale = getUniversalNavLocale(config.locale);
    const environment = config.env.name === 'prod' ? 'prod' : 'stage';
    const visitorGuid = window.alloy ? await window.alloy('getIdentity')
      .then((data) => data?.identity?.ECID).catch(() => undefined) : undefined;
    const experienceName = getExperienceName();

    const getDevice = () => {
      const agent = navigator.userAgent;
      for (const [os, osName] of Object.entries(osMap)) {
        if (agent.includes(os)) return osName;
      }
      return 'linux';
    };

    const unavVersion = new URLSearchParams(window.location.search).get('unavVersion') || '1.3';
    await Promise.all([
      loadScript(`https://${environment}.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js`),
      loadStyles(`https://${environment}.adobeccstatic.com/unav/${unavVersion}/UniversalNav.css`, true),
    ]);

    const getChildren = () => {
      const children = [CONFIG.universalNav.components.profile];
      // reset sign up value on change
      children[0].attributes.isSignUpRequired = false;

      this.universalNavComponents?.forEach((component) => {
        if (component === 'profile') return;
        if (component === 'signup') {
          children[0].attributes.isSignUpRequired = true;
          return;
        }

        children.push(CONFIG.universalNav.components[component]);
      });

      return children;
    };

    const onAnalyticsEvent = (data) => {
      if (!data) return;
      if (!data.event) data.event = { type: data.type, subtype: data.subtype };
      if (!data.source) data.source = { name: data.workflow?.toLowerCase().trim() };

      const getInteraction = () => {
        const {
          event: { type, subtype } = {},
          source: { name } = {},
          content: { name: contentName } = {},
        } = data;

        switch (`${name}|${type}|${subtype}${contentName ? `|${contentName}` : ''}`) {
          case 'profile|click|sign-in':
            return `Sign In|gnav|${experienceName}|unav`;
          case 'profile|render|component':
            return `Account|gnav|${experienceName}|unav`;
          case 'profile|click|account':
            return `View Account|gnav|${experienceName}|unav`;
          case 'profile|click|sign-out':
            return `Sign Out|gnav|${experienceName}|unav`;
          case 'app-switcher|render|component':
            return 'AppLauncher.appIconToggle';
          case `app-switcher|click|app|${contentName}`:
            return `AppLauncher.appClick.${convertToPascalCase(contentName)}`;
          case 'app-switcher|click|footer|adobe-home':
            return 'AppLauncher.adobe.com';
          case 'app-switcher|click|footer|all-apps':
            return 'AppLauncher.allapps';
          case 'app-switcher|click|footer|adobe-dot-com':
            return 'AppLauncher.adobe.com';
          case 'app-switcher|click|footer|see-all-apps':
            return 'AppLauncher.allapps';
          case 'unc|click|icon':
            return 'Open Notifications panel';
          case 'unc|click|link':
            return 'Open Notification';
          case 'unc|click|markRead':
            return 'Mark Notification as read';
          case 'unc|click|dismiss':
            return 'Dismiss Notifications';
          case 'unc|click|markUnread':
            return 'Mark Notification as unread';
          default:
            return null;
        }
      };
      const interaction = getInteraction();

      if (!interaction) return;
      // eslint-disable-next-line no-underscore-dangle
      window._satellite?.track('event', {
        xdm: {},
        data: { web: { webInteraction: { name: interaction } } },
      });
    };

    const getConfiguration = () => ({
      target: this.blocks.universalNav,
      env: environment,
      locale,
      imsClientId: window.adobeid?.client_id,
      theme: isDarkMode() ? 'dark' : 'light',
      analyticsContext: {
        consumer: {
          name: 'adobecom',
          version: '1.0',
          platform: 'Web',
          device: getDevice(),
          os_version: navigator.platform,
        },
        event: { visitor_guid: visitorGuid },
        onAnalyticsEvent,
      },
      children: getChildren(),
      isSectionDividerRequired: getConfig()?.unav?.showSectionDivider,
    });

    // Exposing UNAV config for consumers
    CONFIG.universalNav.universalNavConfig = getConfiguration();
    await window.UniversalNav(CONFIG.universalNav.universalNavConfig);
    this.decorateAppPrompt({ getAnchorState: () => window.UniversalNav.getComponent?.('app-switcher') });
    isDesktop.addEventListener('change', () => {
      window.UniversalNav.reload(CONFIG.universalNav.universalNavConfig);
    });
  };

  decorateAppPrompt = async ({ getAnchorState } = {}) => {
    const state = getMetadata('app-prompt')?.toLowerCase();
    const entName = getMetadata('app-prompt-entitlement')?.toLowerCase();
    const promptPath = getMetadata('app-prompt-path')?.toLowerCase();
    const hasMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Touch/i.test(navigator.userAgent);

    if (state === 'off'
      || !window.adobeIMS?.isSignedInUser()
      || !isDesktop.matches
      || hasMobileUA
      || !entName?.length
      || !promptPath?.length) return;

    const { base } = getConfig();
    const [
      webappPrompt,
    ] = await Promise.all([
      import('../../features/webapp-prompt/webapp-prompt.js'),
      loadStyles(`${base}/features/webapp-prompt/webapp-prompt.css`),
    ]);

    webappPrompt.default({ promptPath, entName, parent: this.blocks.universalNav, getAnchorState });
  };

  loadSearch = () => {
    const instanceAlreadyExists = !!this.blocks?.search?.instance;
    const searchNotInContent = !this.searchPresent();
    if (instanceAlreadyExists || searchNotInContent) return null;

    return this.loadDelayed().then(() => {
      this.blocks.search.instance = new this.Search(this.blocks.search.config);
    }).catch(() => { });
  };

  isToggleExpanded = () => this.elements.mobileToggle?.getAttribute('aria-expanded') === 'true';

  isLocalNav = () => this.newMobileNav && this
    .elements
    .navWrapper
    ?.querySelectorAll('.feds-nav > section.feds-navItem')
    ?.length <= 1;

  hasMegaMenu = () => this
    .elements
    .navWrapper
    ?.querySelectorAll('.feds-nav > section.feds-navItem')
    ?.length >= 1;

  toggleMenuMobile = () => {
    const toggle = this.elements.mobileToggle;
    const isExpanded = this.isToggleExpanded();
    if (!isExpanded && this.newMobileNav) {
      const sections = document.querySelectorAll('header.new-nav .feds-nav > section.feds-navItem > button.feds-navLink');
      animateInSequence(sections, 0.075);
      if (this.isLocalNav() && this.hasMegaMenu()) {
        disableMobileScroll();
        const section = sections[0];
        queueMicrotask(() => section.click());
      }
    } else if (isExpanded && this.isLocalNav()) {
      enableMobileScroll();
    }
    toggle?.setAttribute('aria-expanded', !isExpanded);
    document.body.classList.toggle('disable-scroll', !isExpanded);
    this.elements.navWrapper?.classList?.toggle('feds-nav-wrapper--expanded', !isExpanded);
    closeAllDropdowns();
    setCurtainState(!isExpanded);
    toggle?.setAttribute('daa-ll', `hamburgermenu|${isExpanded ? 'open' : 'close'}`);
  };

  decorateToggle = () => {
    if (!this.mainNavItemCount || (this.newMobileNav && !this.hasMegaMenu())) return '';

    const toggle = toFragment`<button
      class="feds-toggle"
      daa-ll="hamburgermenu|open"
      aria-expanded="false"
      aria-haspopup="true"
      aria-label="Navigation menu"
      aria-controls="feds-nav-wrapper"
      data-feds-preventAutoClose>
      </button>`;

    const setHamburgerPadding = () => {
      if (isDesktop.matches) {
        this.elements.mainNav.style.removeProperty('padding-bottom');
      } else {
        const offset = Math.ceil(this.elements.topnavWrapper.getBoundingClientRect().bottom);
        this.elements.mainNav.style.setProperty('padding-bottom', `${2 * offset}px`);
      }
    };

    const onToggleClick = async () => {
      this.toggleMenuMobile();

      if (this.blocks?.search?.instance) {
        this.blocks.search.instance.clearSearchForm();
      } else {
        await this.loadSearch();
      }

      if (this.isToggleExpanded()) setHamburgerPadding();
    };

    toggle.addEventListener('click', () => logErrorFor(onToggleClick, 'Toggle click failed', 'errorType=error,module=gnav'));

    const onDeviceChange = () => {
      if (isDesktop.matches) {
        toggle.setAttribute('aria-expanded', false);
        this.elements.navWrapper.classList.remove('feds-nav-wrapper--expanded');
        document.body.classList.remove('disable-scroll');
        setCurtainState(false);
        closeAllDropdowns();
        this.blocks?.search?.instance?.clearSearchForm();
      }
    };

    isDesktop.addEventListener('change', () => logErrorFor(onDeviceChange, 'Toggle logic failed on device change', 'errorType=error,module=gnav'));

    return toggle;
  };

  decorateGenericLogo = ({ selector, classPrefix, includeLabel = true, analyticsValue } = {}) => {
    const rawBlock = this.content.querySelector(selector);
    if (!rawBlock) return '';

    // Get all non-image links
    const imgRegex = /(\.png|\.jpg|\.jpeg)/;
    const blockLinks = [...rawBlock.querySelectorAll('a')];
    const link = blockLinks.find((blockLink) => !imgRegex.test(blockLink.href)
      && !imgRegex.test(blockLink.textContent));

    if (!link) return '';

    // Check which elements should be rendered
    const isBrandImage = rawBlock.matches(selectors.brandImageOnly);
    const renderImage = !rawBlock.matches('.no-logo');
    const renderLabel = !isBrandImage && includeLabel && !rawBlock.matches('.image-only');

    if (!renderImage && !renderLabel) return '';

    // Create image element
    const getImageEl = () => {
      if (isDarkMode()) {
        const allSvgImgs = rawBlock.querySelectorAll('picture img[src$=".svg"]');
        if (allSvgImgs.length === 2) return allSvgImgs[1];

        const images = blockLinks.filter((blockLink) => imgRegex.test(blockLink.href)
          || imgRegex.test(blockLink.textContent));
        if (images.length === 2) return getBrandImage(images[1], isBrandImage);
      }
      const svgImg = rawBlock.querySelector('picture img[src$=".svg"]');
      if (svgImg) return svgImg;

      const image = blockLinks.find((blockLink) => imgRegex.test(blockLink.href)
        || imgRegex.test(blockLink.textContent));
      return getBrandImage(image, isBrandImage);
    };

    const brandImageClass = isBrandImage ? ` ${selectors.brandImageOnly.slice(1)}` : '';
    const imageEl = renderImage
      ? toFragment`<span class="${classPrefix}-image${brandImageClass}">${getImageEl()}</span>`
      : '';

    // Create label element
    const labelEl = renderLabel
      ? toFragment`<span class="${classPrefix}-label">${link.textContent}</span>`
      : '';

    // Create final template
    const decoratedElem = toFragment`
      <a href="${link.href}" class="${classPrefix}" daa-ll="${analyticsValue}">
        ${imageEl}
        ${labelEl}
      </a>`;

    // Add accessibility attributes if just an image is rendered
    if (!renderLabel && link.textContent.length) decoratedElem.setAttribute('aria-label', link.textContent);

    return decoratedElem;
  };

  decorateAside = async () => {
    this.elements.aside = '';
    const promoPath = getMetadata('gnav-promo-source');
    const fedsPromoWrapper = document.querySelector('.feds-promo-aside-wrapper');

    if (!promoPath) {
      fedsPromoWrapper?.remove();
      this.block.classList.remove('has-promo');
      return this.elements.aside;
    }

    const { default: decorate } = await import('./features/aside/aside.js');
    if (!decorate) return this.elements.aside;
    this.elements.aside = await decorate({ headerElem: this.block, fedsPromoWrapper, promoPath });
    fedsPromoWrapper.append(this.elements.aside);
    return this.elements.aside;
  };

  decorateBrand = () => this.decorateGenericLogo({
    selector: '.gnav-brand',
    classPrefix: 'feds-brand',
    analyticsValue: 'Brand',
  });

  decorateLogo = () => this.decorateGenericLogo({
    selector: '.adobe-logo',
    classPrefix: 'feds-logo',
    includeLabel: false,
    analyticsValue: 'Logo',
  });

  decorateMainNav = async () => {
    const breadcrumbs = isDesktop.matches ? '' : await this.decorateBreadcrumbs();
    this.elements.mainNav = toFragment`<div class="feds-nav"></div>`;
    this.elements.navWrapper = toFragment`
      <div class="feds-nav-wrapper" id="feds-nav-wrapper">
        ${breadcrumbs}
        ${isDesktop.matches ? '' : this.decorateSearch()}
        ${this.elements.mainNav}
        ${isDesktop.matches ? this.decorateSearch() : ''}
      </div>
    `;

    // Get all main menu items, but exclude any that are nested inside other features
    const items = [...this.content.querySelectorAll('h2, p:only-child > strong > a, p:only-child > em > a')]
      .filter((item) => CONFIG.features.every((feature) => !item.closest(`.${feature}`)));

    // Save number of items to decide whether a hamburger menu is required
    this.mainNavItemCount = items.length;

    for await (const [index, item] of items.entries()) {
      await yieldToMain();
      const mainNavItem = this.decorateMainNavItem(item, index);
      if (mainNavItem) {
        this.elements.mainNav.appendChild(mainNavItem);
      }
    }
    if (this.newMobileNav) {
      await this.decorateLocalNav();
    }
    return this.elements.mainNav;
  };

  // eslint-disable-next-line class-methods-use-this
  getMainNavItemType = (item) => {
    const itemTopParent = item.closest('div');
    const isLinkGroup = !!item.closest('.link-group');
    const hasSyncDropdown = itemTopParent instanceof HTMLElement
      && !isLinkGroup && itemTopParent.childElementCount > 1;
    if (hasSyncDropdown) return 'syncDropdownTrigger';
    const hasAsyncDropdown = itemTopParent instanceof HTMLElement
      && itemTopParent.closest('.large-menu') instanceof HTMLElement;
    if (hasAsyncDropdown) return 'asyncDropdownTrigger';
    const isPrimaryCta = item.closest('strong') instanceof HTMLElement;
    if (isPrimaryCta) return 'primaryCta';
    const isSecondaryCta = item.closest('em') instanceof HTMLElement;
    if (isSecondaryCta) return 'secondaryCta';
    const isText = !(item.querySelector('a') instanceof HTMLElement);
    if (isText) return 'text';
    return 'link';
  };

  decorateMainNavItem = (item, index) => {
    const itemType = this.getMainNavItemType(item);

    const itemHasActiveLink = ['syncDropdownTrigger', 'link'].includes(itemType)
      && getActiveLink(item.closest('div')) instanceof HTMLElement;
    const activeModifier = itemHasActiveLink ? ` ${selectors.activeNavItem.slice(1)}` : '';

    const makeTabActive = (popup) => {
      const tabbuttons = popup.querySelectorAll('.global-navigation .tabs button');
      const tabpanels = popup.querySelectorAll('.global-navigation .tab-content [role="tabpanel"]');
      closeAllTabs(tabbuttons, tabpanels);
      const { origin, pathname } = window.location;
      const url = `${origin}${pathname}`;
      setTimeout(() => {
        const activeLink = [
          ...popup.querySelectorAll('a:not([data-modal-hash])'),
        ].find((el) => (el.href === url || el.href.startsWith(`${url}?`) || el.href.startsWith(`${url}#`)));
        const tabIndex = activeLink ? +activeLink.parentNode.id : 0;
        const selectTab = popup.querySelectorAll('.tab')[tabIndex];
        const daallTab = selectTab.getAttribute('daa-ll');
        selectTab.setAttribute('daa-ll', `${daallTab.replace('click', 'open')}`);
        selectTab?.click();
        selectTab.setAttribute('daa-ll', `${daallTab.replace('open', 'click')}`);
        selectTab?.focus();
      }, 100);
    };

    function observeDropdown(dropdownTrigger) {
      const observer = new MutationObserver(() => {
        const isExpanded = dropdownTrigger.getAttribute('aria-expanded') === 'true';
        const analyticsValue = `header|${isExpanded ? 'Close' : 'Open'}`;
        dropdownTrigger.setAttribute('daa-lh', analyticsValue);
      });
      observer.observe(dropdownTrigger, { attributeFilter: ['aria-expanded'] });
    }

    // Copying dropdown contents to localNav items
    const decorateLocalNavItems = (navItem, template) => {
      const elements = [...document.querySelectorAll('.feds-localnav .feds-navItem')].find(
        (el) => el.textContent.trim() === navItem.textContent,
      );
      if (elements) {
        elements.innerHTML = template.innerHTML;
        // Reattach click events & mutation observers, as cloned elem don't retain event listeners
        elements.querySelector('.feds-localnav-items button')?.addEventListener('click', (e) => {
          trigger({ element: e.currentTarget, event: e, type: 'localNavItem' });
        });

        const dropdownTrigger = elements.querySelector('.feds-localnav-items button[aria-expanded]');
        if (dropdownTrigger) observeDropdown(dropdownTrigger);

        elements.querySelectorAll('.feds-menu-headline').forEach((elem) => {
          // Reattach click event listener to headlines
          elem?.setAttribute('role', 'button');
          elem?.setAttribute('tabindex', 0);
          elem?.removeAttribute('aria-level');
          elem?.setAttribute('aria-haspopup', true);
          elem?.setAttribute('aria-expanded', false);
          elem?.addEventListener('click', (e) => {
            trigger({ element: e.currentTarget, event: e, type: 'headline' });
          });
        });
      }
    };

    // All dropdown decoration is delayed
    const delayDropdownDecoration = ({ template } = {}) => {
      let decorationTimeout;

      const decorateDropdown = () => logErrorFor(async () => {
        template.removeEventListener('click', decorateDropdown);
        clearTimeout(decorationTimeout);

        const menuLogic = await loadDecorateMenu();

        await menuLogic.decorateMenu({
          item,
          template,
          type: itemType,
        });

        if (this.newMobileNav) {
          const popup = template.querySelector('.feds-popup');
          let originalContent = popup.innerHTML;

          if (!isDesktop.matches && popup) {
            originalContent = await transformTemplateToMobile(popup, item, this.isLocalNav());
            popup.querySelector('.close-icon')?.addEventListener('click', this.toggleMenuMobile);
          }
          isDesktop.addEventListener('change', async () => {
            enableMobileScroll();
            if (isDesktop.matches) {
              popup.innerHTML = originalContent;
              this.block.classList.remove('new-nav');
            } else {
              originalContent = await transformTemplateToMobile(popup, item, this.isLocalNav());
              popup.querySelector('.close-icon')?.addEventListener('click', this.toggleMenuMobile);
              this.block.classList.add('new-nav');
            }
          });
          if (this.isLocalNav()) {
            decorateLocalNavItems(item, template);
          }
        }
      }, 'Decorate dropdown failed', 'errorType=info,module=gnav');

      template.addEventListener('click', decorateDropdown);
      decorationTimeout = setTimeout(decorateDropdown, CONFIG.delays.mainNavDropdowns);
    };

    // Decorate item based on its type
    switch (itemType) {
      case 'syncDropdownTrigger':
      case 'asyncDropdownTrigger': {
        const dropdownTrigger = toFragment`<button
          class="feds-navLink feds-navLink--hoverCaret"
          aria-expanded="false"
          aria-haspopup="true"
          daa-ll="${getAnalyticsValue(item.textContent, index + 1)}"
          daa-lh="header|Open">
            ${item.textContent.trim()}
          </button>`;

        const isSectionMenu = item.closest('.section') instanceof HTMLElement;
        const tag = isSectionMenu ? 'section' : 'div';
        const sectionModifier = isSectionMenu ? ' feds-navItem--section' : '';
        const sectionDaaLh = isSectionMenu ? ` daa-lh='${getAnalyticsValue(item.textContent)}'` : '';
        const triggerTemplate = toFragment`
          <${tag} class="feds-navItem${sectionModifier}${activeModifier}" ${sectionDaaLh}>
            ${dropdownTrigger}
          </${tag}>`;

        // Toggle trigger's dropdown on click
        dropdownTrigger.addEventListener('click', (e) => {
          if (!isDesktop.matches && this.newMobileNav && isSectionMenu) {
            const popup = dropdownTrigger.nextElementSibling;
            // document.body.style.top should always be set
            // at this point by calling disableMobileScroll
            if (popup && this.isLocalNav()) {
              const y = window.scrollY;
              const iOSy = Math.abs(parseInt(document.body.style.top, 10));
              const offset = this.block.classList.contains('has-promo')
                ? 'var(--feds-height-nav) - var(--global-height-navPromo)'
                : 'var(--feds-height-nav)';
              popup.style = `top: calc(${iOSy || y || 0}px - ${offset} - 2px`;
            }
            makeTabActive(popup);
          } else if (isDesktop.matches && this.newMobileNav && isSectionMenu) {
            const popup = dropdownTrigger.nextElementSibling;
            if (popup) popup.style.removeProperty('top');
          }
          trigger({ element: dropdownTrigger, event: e, type: 'dropdown' });
          setActiveDropdown(dropdownTrigger);
        });

        // Update analytics value when dropdown is expanded/collapsed
        observeDropdown(dropdownTrigger);

        delayDropdownDecoration({ template: triggerTemplate });
        return addMepHighlightAndTargetId(triggerTemplate, item);
      }
      case 'primaryCta':
      case 'secondaryCta':
        // Remove its 'em' or 'strong' wrapper
        item.parentElement.replaceWith(item);

        return addMepHighlightAndTargetId(toFragment`<div class="feds-navItem feds-navItem--centered">
            ${decorateCta({ elem: item, type: itemType, index: index + 1 })}
          </div>`, item);
      case 'link': {
        let customLinkModifier = '';
        let removeCustomLink = false;
        const linkElem = item.querySelector('a');
        const customLinksSection = item.closest('.link-group');
        linkElem.className = 'feds-navLink';
        linkElem.setAttribute('daa-ll', getAnalyticsValue(linkElem.textContent, index + 1));

        if (customLinksSection) {
          const removeLink = () => {
            const url = new URL(linkElem.href);
            linkElem.setAttribute('href', `${url.origin}${url.pathname}${url.search}`);
            if (isActiveLink(linkElem)) {
              linkElem.removeAttribute('href');
            }
            const linkHash = url.hash.slice(2);
            return !this.customLinks.includes(linkHash);
          };
          [...customLinksSection.classList].splice(1).forEach((className) => {
            customLinkModifier = ` feds-navItem--${className}`;
          });
          removeCustomLink = removeLink();
        } else if (itemHasActiveLink) {
          linkElem.removeAttribute('href');
          linkElem.setAttribute('role', 'link');
          linkElem.setAttribute('aria-disabled', 'true');
          linkElem.setAttribute('aria-current', 'page');
          linkElem.setAttribute('tabindex', 0);
        }

        const linkTemplate = toFragment`
          <div class="feds-navItem${activeModifier}${customLinkModifier}">
            ${linkElem}
          </div>`;
        return removeCustomLink ? '' : addMepHighlightAndTargetId(linkTemplate, item);
      }
      case 'text':
        return addMepHighlightAndTargetId(toFragment`<div class="feds-navItem feds-navItem--centered">
            ${item.textContent}
          </div>`, item);
      default:
        /* c8 ignore next 3 */
        return addMepHighlightAndTargetId(toFragment`<div class="feds-navItem feds-navItem--centered">
            ${item}
          </div>`, item);
    }
  };

  decorateBreadcrumbs = async () => {
    if (!this.block.classList.contains('has-breadcrumbs')) return null;
    if (this.elements.breadcrumbsWrapper) return this.elements.breadcrumbsWrapper;
    const breadcrumbsElem = this.block.querySelector('.breadcrumbs');
    // Breadcrumbs are not initially part of the nav, need to decorate the links
    if (breadcrumbsElem) decorateLinks(breadcrumbsElem);
    const { default: createBreadcrumbs } = await import('./features/breadcrumbs/breadcrumbs.js');
    this.elements.breadcrumbsWrapper = await createBreadcrumbs(breadcrumbsElem);
    return this.elements.breadcrumbsWrapper;
  };

  searchPresent = () => !!this.content.querySelector('.search');

  decorateSearch = () => {
    if (!this.searchPresent()) return null;

    this.blocks.search.config.trigger = toFragment`
      <button class="feds-search-trigger" aria-label="Search" aria-expanded="false" aria-controls="feds-search-bar" daa-ll="Search">
        ${this.blocks.search.config.icon}
        <span class="feds-search-close"></span>
      </button>`;

    this.elements.search = toFragment`
      <div class="feds-search">
        ${this.blocks.search.config.trigger}
      </div>`;

    // Replace the aria-label value once placeholder is fetched
    replaceKey('search', getFedsPlaceholderConfig()).then((placeholder) => {
      if (placeholder && placeholder.length) {
        this.blocks.search.config.trigger.setAttribute('aria-label', placeholder);
      }
    });

    this.blocks.search.config.trigger.addEventListener('click', async () => {
      await this.loadSearch();
    });

    return this.elements.search;
  };
}

export default async function init(block) {
  const { mep } = getConfig();
  const sourceUrl = await getGnavSource();
  let newMobileNav = new URLSearchParams(window.location.search).get('newNav');
  newMobileNav = newMobileNav ? newMobileNav !== 'false' : getMetadata('mobile-gnav-v2') !== 'off';
  const [url, hash = ''] = sourceUrl.split('#');
  if (hash === '_noActiveItem') {
    setDisableAEDState();
  }
  const content = await fetchAndProcessPlainHtml({ url });
  setAsyncDropdownCount(content.querySelectorAll('.large-menu').length);
  if (!content) {
    const error = new Error('Could not create global navigation. Content not found!');
    error.tags = 'errorType=error,module=gnav';
    error.url = url;
    lanaLog({ message: error.message, error, tags: 'errorType=error,module=gnav' });
    throw error;
  }
  const gnav = new Gnav({
    content,
    block,
    newMobileNav,
  });
  if (newMobileNav && !isDesktop.matches) block.classList.add('new-nav');
  await gnav.init();
  if (gnav.isLocalNav()) block.classList.add('local-nav');
  block.setAttribute('daa-im', 'true');
  const mepMartech = mep?.martech || '';
  block.setAttribute('daa-lh', `gnav|${getExperienceName()}${mepMartech}`);
  if (isDarkMode()) block.classList.add('feds--dark');
  block.classList.add('ready');
  return gnav;
}
