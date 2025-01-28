/* eslint-disable no-restricted-syntax */
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import {
  createFullGlobalNavigation,
  selectors,
  isElementVisible,
  mockRes,
  viewports,
  unavLocalesTestData,
  analyticsTestData,
  unavVersion,
  addMetaDataV2,
} from './test-utilities.js';
import { setConfig, getLocale } from '../../../libs/utils/utils.js';
import initNav, { getUniversalNavLocale, osMap } from '../../../libs/blocks/global-navigation/global-navigation.js';
import { isDesktop, isTangentToViewport, toFragment } from '../../../libs/blocks/global-navigation/utilities/utilities.js';
import logoOnlyNav from './mocks/global-navigation-only-logo.plain.js';
import longNav from './mocks/global-navigation-long.plain.js';
import darkNav from './mocks/dark-global-navigation.plain.js';
import navigationWithCustomLinks from './mocks/navigation-with-custom-links.plain.js';
import globalNavigationMock from './mocks/global-navigation.plain.js';
import gnavWithlocalNav from './mocks/gnav-with-localnav.plain.js';
import noDropdownNav from './mocks/global-navigation-no-dropdown.plain.js';
import productEntryCTA from './mocks/global-navigation-product-entry-cta.plain.js';
import { getConfig } from '../../../tools/send-to-caas/send-utils.js';

// TODO
// - test localization

async function initGnav(block) {
  try {
    await initNav(block);
  } catch (e) {
    // should throw error
  }
}

describe('global navigation', () => {
  before(() => {
    document.head.innerHTML = `<link rel="icon" href="/libs/img/favicons/favicon.ico" size="any">
    <script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>
    <script src="https://stage.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js" type="javascript/blocked" data-loaded="true"></script>
    `;
  });

  describe('LANA logging tests', () => {
    beforeEach(async () => {
      window.lana.log = sinon.spy();
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should send log when could not load IMS', async () => {
      const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
      await createFullGlobalNavigation({
        customConfig: {
          imsClientId: null,
          codeRoot: '/libs',
          contentRoot: `${window.location.origin}${getLocale(locales).prefix}`,
          locales,
        },
      });

      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Error with IMS'))).to.exist;
    });

    it('should send log when sign in link is not found', async () => {
      const mockWithWrongSignInHref = globalNavigationMock.replace('https://adobe.com?sign-in=true', 'https://adobe.com');
      await createFullGlobalNavigation({
        signedIn: false,
        globalNavigation: mockWithWrongSignInHref,
      });
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Sign in link not found in dropdown.'))).to.exist;
    });

    it('should render backup signInElem if no dropdown div is found', async () => {
      const ogIms = window.adobeIMS;
      const gnav = await createFullGlobalNavigation({
        signedIn: false,
        globalNavigation: noDropdownNav,
      });
      const signInElem = document.querySelector(selectors.imsSignIn);
      expect(isElementVisible(signInElem)).to.equal(true);

      let signInClicked = false;
      window.adobeIMS = { signIn: () => { signInClicked = true; }, isSignedInUser: () => false };
      await gnav.imsReady();
      signInElem.click();
      expect(signInClicked).to.be.true;
      window.adobeIMS = ogIms;
    });

    it("should log when there's issues within onReady", async () => {
      const ogIms = window.adobeIMS;
      const gnav = await createFullGlobalNavigation({});
      sinon.stub(gnav, 'decorateProfile').callsFake(() => {
        throw new Error('error');
      });
      window.adobeIMS = { isSignedInUser: () => true };
      await gnav.imsReady();
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('issues within onReady'))).to.exist;
      window.adobeIMS = ogIms;
    });

    it('should log when IMS signIn method is not available', async () => {
      const ogIms = window.adobeIMS;
      window.adobeIMS = { signIn: 'not-a-function' };
      await createFullGlobalNavigation({ signedIn: false });
      document.querySelector(`${selectors.signInDropdown} ${selectors.signIn}`).click();
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('IMS signIn method not available'))).to.exist;
      window.adobeIMS = ogIms;
    });

    it('should send LANA log when profile call in decorateProfile fails', async () => {
      const gnav = await createFullGlobalNavigation();
      sinon.restore();
      sinon.stub(window, 'fetch').callsFake((url) => {
        if (url.includes('/profile')) return mockRes({ payload: null, ok: false, status: 400 });
        return null;
      });
      window.adobeIMS = {
        isSignedInUser: () => true,
        getAccessToken: () => 'accessToken',
      };
      await gnav.decorateProfile();
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('decorateProfile has failed to fetch profile data'))).to.exist;
    });
  });

  describe('basic sanity tests', () => {
    it('should render the navigation on desktop', async () => {
      const nav = await createFullGlobalNavigation();

      expect(nav).to.exist;
      expect(isElementVisible(document.querySelector(selectors.globalNav))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.search))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.profile))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.logo))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.brandContainer))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(false);
      expect(document.querySelectorAll(selectors.navItem).length).to.equal(9);
    });

    it('should render the navigation on smallDesktop', async () => {
      await createFullGlobalNavigation({ viewport: 'smallDesktop' });

      expect(isElementVisible(document.querySelector(selectors.globalNav))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.search))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.profile))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.logo))).to.equal(false);
      expect(isElementVisible(document.querySelector(selectors.brandContainer))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(false);
      expect(document.querySelectorAll(selectors.navItem).length).to.equal(9);
    });

    it('should render the navigation on mobile', async () => {
      await createFullGlobalNavigation({ viewport: 'mobile' });

      expect(isElementVisible(document.querySelector(selectors.globalNav))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.search))).to.equal(false);
      expect(isElementVisible(document.querySelector(selectors.profile))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.logo))).to.equal(false);
      expect(isElementVisible(document.querySelector(selectors.brandContainer))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(true);
      expect(document.querySelectorAll(selectors.navItem).length).to.equal(9);
    });
  });

  describe('Gnav-toggle', () => {
    describe('desktop', () => {
      it('should be hidden', async () => {
        await createFullGlobalNavigation();

        expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(false);
      });
    });

    describe('smallDesktop', () => {
      it('should be hidden', async () => {
        await createFullGlobalNavigation({ viewport: 'smallDesktop' });

        expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(false);
      });
    });

    describe('mobile', () => {
      let clock;

      beforeEach(async () => {
        clock = sinon.useFakeTimers({
          toFake: ['setTimeout'],
          shouldAdvanceTime: true,
        });
      });

      afterEach(() => {
        clock.restore();
      });

      it('should be visible', async () => {
        await createFullGlobalNavigation({ viewport: 'mobile' });

        expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(true);
      });

      it('should open navigation on click', async () => {
        await createFullGlobalNavigation({ viewport: 'mobile' });

        const navWrapper = document.querySelector(selectors.navWrapper);
        const toggle = document.querySelector(selectors.mainNavToggle);
        const curtain = document.querySelector(selectors.curtain);

        expect(navWrapper.classList.contains('feds-nav-wrapper--expanded')).to.equal(false);
        expect(curtain.classList.contains('feds-curtain--open')).to.equal(false);
        expect(isElementVisible(document.querySelector(selectors.navWrapper))).to.equal(false);

        toggle.click();
        await clock.runAllAsync();

        expect(navWrapper.classList.contains('feds-nav-wrapper--expanded')).to.equal(true);
        expect(isElementVisible(document.querySelector(selectors.navWrapper))).to.equal(true);
      });

      it('should clear search results when closed', async () => {
        await createFullGlobalNavigation({ viewport: 'mobile' });
        const toggle = document.querySelector(selectors.mainNavToggle);
        // Clicking the toggle will load the search logic
        toggle.click();
        await new Promise((resolve) => { setTimeout(resolve, 0); });
        await clock.runAllAsync();
        // Expect the search input to be visible; focus on it and type
        const searchField = document.querySelector(selectors.searchField);
        expect(isElementVisible(searchField)).to.equal(true);

        window.fetch = sinon.stub().callsFake(() => mockRes({
          payload:
          { query_prefix: 'f', locale: 'en-US', suggested_completions: [{ name: 'framemaker', score: 578.15875, scope: 'learn' }, { name: 'fuse', score: 578.15875, scope: 'learn' }, { name: 'flash player', score: 578.15875, scope: 'learn' }, { name: 'framemaker publishing server', score: 578.15875, scope: 'learn' }, { name: 'fill & sign', score: 578.15875, scope: 'learn' }, { name: 'font folio', score: 578.15875, scope: 'learn' }, { name: 'free fonts for photoshop', score: 577.25055, scope: 'learn' }, { name: 'free lightroom presets', score: 577.25055, scope: 'learn' }, { name: 'frame', score: 577.25055, scope: 'learn' }, { name: 'frame for creative cloud', score: 577.25055, scope: 'learn' }], elastic_search_time: 1440.750028 },
        }));

        searchField.focus();
        await sendKeys({ type: 'f' });
        await clock.runAllAsync();
        expect(searchField.value).to.equal('f');
        // Clicking the toggle again should clear the search field
        toggle.click();
        expect(searchField.value).to.equal('');
      });
    });
  });

  describe('Gnav-logo', () => {
    describe('desktop', () => {
      it('renders the logo', async () => {
        await createFullGlobalNavigation({ });

        const logo = document.querySelector(selectors.logo);
        expect(isElementVisible(logo)).to.equal(true);
        expect(logo.getAttribute('daa-ll')).to.equal('Logo');
        expect(logo.getAttribute('aria-label')).to.equal('Adobe');
      });

      it('should only render the logo', async () => {
        await createFullGlobalNavigation({ globalNavigation: logoOnlyNav });

        expect(isElementVisible(document.querySelector(selectors.logo))).to.equal(true);
        expect(isElementVisible(document.querySelector(selectors.brandContainer))).to.equal(false);
        expect(isElementVisible(document.querySelector(selectors.search))).to.equal(false);
        expect(isElementVisible(document.querySelector(selectors.profile))).to.equal(false);
        expect(document.querySelectorAll(selectors.navItem).length).to.equal(0);
      });
    });

    describe('small desktop', () => {
      it('hides the logo', async () => {
        await createFullGlobalNavigation({ viewport: 'smallDesktop' });

        const logo = document.querySelector(selectors.logo);
        expect(isElementVisible(logo)).to.equal(false);
      });
    });

    describe('mobile', () => {
      it('does not render the logo', async () => {
        await createFullGlobalNavigation({ viewport: 'mobile' });

        const logo = document.querySelector(selectors.logo);
        expect(isElementVisible(logo)).to.equal(false);
      });
    });
  });

  describe('Viewport changes', () => {
    it('should render desktop -> small desktop -> mobile', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      const nav = await createFullGlobalNavigation();
      expect(nav).to.exist;
      expect(isElementVisible(document.querySelector(selectors.globalNav))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.search))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.profile))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.logo))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.brandContainer))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(false);
      expect(document.querySelectorAll(selectors.navItem).length).to.equal(9);
      expect([...document.querySelectorAll(selectors.headline)]
        .every((elem) => elem.getAttribute('daa-ll') === null))
        .to.be.true;

      await setViewport(viewports.smallDesktop);
      isDesktop.dispatchEvent(new Event('change'));

      expect(isElementVisible(document.querySelector(selectors.globalNav))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.search))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.profile))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.logo))).to.equal(false);
      expect(isElementVisible(document.querySelector(selectors.brandContainer))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(false);
      expect(document.querySelectorAll(selectors.navItem).length).to.equal(9);
      expect([...document.querySelectorAll(selectors.headline)]
        .every((elem) => elem.getAttribute('daa-ll') === null))
        .to.be.true;

      await setViewport(viewports.mobile);
      isDesktop.dispatchEvent(new Event('change'));
      expect(isElementVisible(document.querySelector(selectors.globalNav))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.search))).to.equal(false);
      expect(isElementVisible(document.querySelector(selectors.profile))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.logo))).to.equal(false);
      expect(isElementVisible(document.querySelector(selectors.brandContainer))).to.equal(true);
      expect(isElementVisible(document.querySelector(selectors.mainNavToggle))).to.equal(true);
      expect(document.querySelectorAll(selectors.navItem).length).to.equal(9);
      expect([...document.querySelectorAll(selectors.headline)]
        .every((elem) => elem.getAttribute('daa-ll') !== null))
        .to.be.true;
    });

    it('should change the DOM order to ensure correct TAB behavior for mobile|desktop', async () => {
      await createFullGlobalNavigation();

      expect(document.querySelector(selectors.mainNav).nextElementSibling)
        .to.equal(document.querySelector(selectors.search));
      expect(document.querySelector(selectors.topNavWrapper).lastElementChild)
        .to.equal(document.querySelector(selectors.breadcrumbsWrapper));

      await setViewport(viewports.mobile);
      isDesktop.dispatchEvent(new Event('change'));

      expect(document.querySelector(selectors.mainNav).previousElementSibling)
        .to.equal(document.querySelector(selectors.search));
      expect(document.querySelector(selectors.navWrapper).firstElementChild)
        .to.equal(document.querySelector(selectors.breadcrumbsWrapper));

      await setViewport(viewports.smallDesktop);
      isDesktop.dispatchEvent(new Event('change'));

      expect(document.querySelector(selectors.mainNav).nextElementSibling)
        .to.equal(document.querySelector(selectors.search));
      expect(document.querySelector(selectors.topNavWrapper).lastElementChild)
        .to.equal(document.querySelector(selectors.breadcrumbsWrapper));
    });

    it('should add a modifier class when nav content overflows', async () => {
      const getOverflowingTopnav = () => document.querySelector(selectors.overflowingTopNav);

      await createFullGlobalNavigation();
      expect(getOverflowingTopnav()).to.equal(null);

      await createFullGlobalNavigation({ globalNavigation: longNav });
      expect(getOverflowingTopnav() instanceof HTMLElement).to.be.true;

      await setViewport(viewports.wide);
      isTangentToViewport.dispatchEvent(new Event('change'));

      expect(getOverflowingTopnav()).to.equal(null);

      await setViewport(viewports.smallDesktop);
      isTangentToViewport.dispatchEvent(new Event('change'));

      expect(getOverflowingTopnav() instanceof HTMLElement).to.be.true;

      await setViewport(viewports.mobile);
      isTangentToViewport.dispatchEvent(new Event('change'));

      expect(getOverflowingTopnav()).to.equal(null);
    });
  });

  describe('Universal navigation', () => {
    const orgAlloy = window.alloy;
    let clock;
    beforeEach(async () => {
      clock = sinon.useFakeTimers({
        toFake: ['setTimeout'],
        shouldAdvanceTime: true,
      });
      window.UniversalNav = sinon.spy(() => Promise.resolve());
      window.UniversalNav.reload = sinon.spy(() => Promise.resolve());
      window.adobeProfile = { getUserProfile: sinon.spy(() => Promise.resolve({})) };
      // eslint-disable-next-line no-underscore-dangle
      window._satellite = { track: sinon.spy() };
      window.alloy = () => new Promise((resolve) => {
        resolve({ identity: { ECID: 'dummy-ECID' } });
      });
    });

    afterEach(() => {
      sinon.restore();
      window.alloy = orgAlloy;
    });

    describe('desktop', () => {
      it('should render the Universal navigation', async () => {
        await createFullGlobalNavigation({ unavContent: 'on' });
        const unavFirstCallItems = window.UniversalNav.getCall(0).args[0]?.children;

        expect(unavFirstCallItems[0]?.name === 'profile' && !unavFirstCallItems[1]).to.be.true;

        await createFullGlobalNavigation({ unavContent: 'profile, appswitcher, notifications, help' });
        const unavSecondCallItems = window.UniversalNav.getCall(1).args[0]?.children;

        expect(unavSecondCallItems.every((c) => ['profile', 'app-switcher', 'notifications', 'help'].includes(c.name)))
          .to.be.true;
      });

      it('should reload unav on viewport change', async () => {
        await createFullGlobalNavigation({ unavContent: 'on' });
        await setViewport(viewports.mobile);
        isDesktop.dispatchEvent(new Event('change'));
        await clock.runAllAsync();
        expect(window.UniversalNav.reload.getCall(0)).to.exist;
      });

      it('should handle message events correctly', async () => {
        // eslint-disable-next-line max-len
        const mockEvent = (name, payload) => ({ detail: { name, payload, executeDefaultAction: sinon.spy(() => Promise.resolve(null)) } });
        await createFullGlobalNavigation({ unavContent: 'on' });
        const messageEventListener = window.UniversalNav.getCall(0).args[0].children
          .map((c) => c.attributes.messageEventListener)
          .find((listener) => listener);

        const appInitiatedEvent = mockEvent('System', { subType: 'AppInitiated' });
        messageEventListener(appInitiatedEvent);
        expect(window.adobeProfile.getUserProfile.called).to.be.true;

        const signOutEvent = mockEvent('System', { subType: 'SignOut' });
        messageEventListener(signOutEvent);
        expect(signOutEvent.detail.executeDefaultAction.called).to.be.true;

        const profileSwitch = mockEvent('System', { subType: 'ProfileSwitch' });
        messageEventListener(profileSwitch);
        expect(profileSwitch.detail.executeDefaultAction.called).to.be.true;
      });

      it('should send the correct analytics events', async () => {
        await createFullGlobalNavigation({ unavContent: 'on' });
        const analyticsFn = window.UniversalNav.getCall(0)
          .args[0].analyticsContext.onAnalyticsEvent;

        for (const [eventData, interaction] of Object.entries(analyticsTestData)) {
          const [workflow, type, subtype, name] = eventData.split('|');
          analyticsFn({ workflow, type, subtype, content: { name } });

          // eslint-disable-next-line no-underscore-dangle
          expect(window._satellite.track.lastCall.calledWith('event', {
            xdm: {},
            data: { web: { webInteraction: { name: interaction } } },
          })).to.be.true;
        }

        expect(analyticsFn(null)).to.equal(undefined);
        expect(analyticsFn({
          event: { type: 'not', subtype: 'matching' },
          source: { name: 'anything' },
          content: { name: null },
        })).to.equal(undefined);
      });

      it('should send/not send visitor guid to unav when window.alloy is available/unavailable', async () => {
        await createFullGlobalNavigation({ unavContent: 'on' });
        expect(window.UniversalNav.getCall(0)
          .args[0].analyticsContext.event.visitor_guid).to.equal('dummy-ECID');

        delete window.alloy;
        await createFullGlobalNavigation({ unavContent: 'on' });
        expect(window.UniversalNav.getCall(1)
          .args[0].analyticsContext.event.visitor_guid).to.equal(undefined);
      });

      it('should send the correct device type', async () => {
        const gnav = await createFullGlobalNavigation({ unavContent: 'on' });
        window.UniversalNav.resetHistory();
        const map = { Test: 'linux', ...osMap };
        for (const [os, osName] of Object.entries(map)) {
          const userAgentStub = sinon.stub(navigator, 'userAgent').value(os !== 'Test' ? os : 'Random');
          await gnav.decorateUniversalNav();
          expect(window.UniversalNav.getCall(0)
            .args[0].analyticsContext.consumer.device).to.equal(osName);
          userAgentStub.restore();
          window.UniversalNav.resetHistory();
        }
      });

      it('should send the correct locale to unav', async () => {
        for (const data of unavLocalesTestData) {
          expect(getUniversalNavLocale({ prefix: data.prefix })).to.equal(data.expectedLocale);
        }
      });

      it('should pass enableProfileSwitcher to the profile component configuration', async () => {
        await createFullGlobalNavigation({ unavContent: 'on' });
        const profileConfig = window.UniversalNav.getCall(0).args[0].children
          .find((c) => c.name === 'profile').attributes.componentLoaderConfig.config;

        expect(profileConfig.enableProfileSwitcher).to.be.true;
      });
    });

    describe('small desktop', () => {
      it('should render the Universal navigation', async () => {
        await createFullGlobalNavigation({ viewport: 'smallDesktop', unavContent: 'on' });
        const unavFirstCallItems = window.UniversalNav.getCall(0).args[0]?.children;

        expect(unavFirstCallItems[0]?.name === 'profile' && !unavFirstCallItems[1]).to.be.true;

        await createFullGlobalNavigation({ viewport: 'smallDesktop', unavContent: 'profile, appswitcher, notifications, help, signup' });
        const unavSecondCallItems = window.UniversalNav.getCall(1).args[0]?.children;

        expect(unavSecondCallItems.every((c) => ['profile', 'app-switcher', 'notifications', 'help', 'signup'].includes(c.name)))
          .to.be.true;
      });
    });

    describe('mobile', () => {
      it('should render the Universal navigation', async () => {
        await createFullGlobalNavigation({ viewport: 'mobile', unavContent: 'on' });
        const unavFirstCallItems = window.UniversalNav.getCall(0).args[0]?.children;

        expect(unavFirstCallItems[0]?.name === 'profile' && !unavFirstCallItems[1]).to.be.true;

        await createFullGlobalNavigation({ viewport: 'mobile', unavContent: 'profile, appswitcher, notifications, help' });
        const unavSecondCallItems = window.UniversalNav.getCall(1).args[0]?.children;

        expect(unavSecondCallItems.every((c) => ['profile', 'app-switcher', 'notifications', 'help'].includes(c.name)))
          .to.be.true;
      });
    });
  });

  describe('content source', () => {
    const customPath = '/path/to/gnav';
    let fetchStub;

    beforeEach(() => {
      fetchStub = sinon.stub(window, 'fetch');
      setConfig({ locale: { ietf: 'en-US', prefix: '' } });
    });

    afterEach(() => {
      fetchStub = null;
      sinon.restore();
      document.head.replaceChildren();
      document.body.replaceChildren();
      document.head.innerHTML = '<script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>';
    });

    it('fetches default global navigation based on metadata', async () => {
      document.body.replaceChildren(toFragment`<header class="global-navigation"></header>`);
      await initGnav(document.body.querySelector('header'));
      expect(fetchStub.calledOnceWith('http://localhost:2000/gnav.plain.html')).to.be.true;
    });

    it('fetches centralized custom global navigation based on metadata', async () => {
      const gnavMeta = toFragment`<meta name="gnav-source" content="https://adobe.com/federal${customPath}">`;
      document.head.append(gnavMeta);
      document.body.replaceChildren(toFragment`<header class="global-navigation"></header>`);
      await initGnav(document.body.querySelector('header'));
      expect(
        fetchStub.calledOnceWith('https://main--federal--adobecom.aem.page/federal/path/to/gnav.plain.html'),
      ).to.be.true;
    });

    it('fetches a centralised custom global navigation based on a relative link', async () => {
      const gnavMeta = toFragment`<meta name="gnav-source" content="/federal${customPath}">`;
      document.head.append(gnavMeta);
      document.body.replaceChildren(toFragment`<header class="global-navigation"></header>`);
      await initGnav(document.body.querySelector('header'));
      expect(
        fetchStub.calledOnceWith('https://main--federal--adobecom.aem.page/federal/path/to/gnav.plain.html'),
      ).to.be.true;
    });

    it('fetches navigation saved in sessionStorage', async () => {
      const dynamicNavOn = toFragment`<meta name="dynamic-nav" content="on">`;
      const conf = getConfig();
      setConfig({ dynamicNavKey: 'milo', ...conf });
      document.head.append(dynamicNavOn);
      window.sessionStorage.setItem('dynamicNavKey', 'milo');
      window.sessionStorage.setItem('gnavSource', '/some-path');
      await initGnav(document.body.querySelector('header'));
      expect(
        fetchStub.calledOnceWith('/some-path.plain.html'),
      ).to.be.true;
    });

    it('does not fetch from sessionStorage url when dyanmicNavKey is not present', async () => {
      const dynamicNavOn = toFragment`<meta name="dynamic-nav" content="on">`;
      document.head.append(dynamicNavOn);
      document.body.replaceChildren(toFragment`<header class="global-navigation"></header>`);
      window.sessionStorage.setItem('dynamicNavKey', 'milo');
      window.sessionStorage.setItem('gnavSource', '/some-path');
      await initGnav(document.body.querySelector('header'));
      expect(
        fetchStub.calledOnceWith('http://localhost:2000/gnav.plain.html'),
      ).to.be.true;
    });

    it('disable AED(Active Element Detetction) if gnav-souce used with hash "#_noActiveItem" modifier', async () => {
      const gnavMeta = toFragment`<meta name="gnav-source" content="https://adobe.com/federal${customPath}#_noActiveItem">`;
      document.head.append(gnavMeta);
      document.body.replaceChildren(toFragment`<header class="global-navigation"></header>`);
      await initGnav(document.body.querySelector('header'));
      const isActiveElement = !!document.querySelector('.global-navigation .feds-navItem--active');
      expect(isActiveElement).to.be.false;
    });
  });

  describe('Dynamic nav', () => {
    describe('Breadcrumbs', () => {
      it('should not decorate breadcrumbs when dynamic nav is active', async () => {
        const dynamicNavOn = toFragment`<meta name="dynamic-nav" content="on">`;
        document.head.append(dynamicNavOn);
        document.body.replaceChildren(toFragment`<header class="global-navigation"></header>`);
        window.sessionStorage.setItem('dynamicNavKey', 'milo');
        window.sessionStorage.setItem('gnavSource', '/some-path');
        await initGnav(document.body.querySelector('header'));
        const breadcrumbs = document.querySelector('.feds-breadcrumbs');
        expect(breadcrumbs).to.be.null;
      });
    });
  });

  describe('decorateAppPrompt', () => {
    it('should not load webapp prompt resources', async () => {
      document.head.innerHTML = `<meta name="app-prompt" content="off" />
      <link rel="icon" href="/libs/img/favicons/favicon.ico" size="any" />
      <script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>
      <script src="https://stage.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js" type="javascript/blocked" data-loaded="true"></script>
      `;
      const gnav = await createFullGlobalNavigation({});
      gnav.decorateAppPrompt();
      const weAppPrompt = document.head.querySelector('link[href$="/webapp-prompt.css"]');
      expect(!!weAppPrompt).to.be.false;
    });

    it('should load webapp prompt resources', async () => {
      document.head.innerHTML = `<meta name="app-prompt" content="on" />
      <meta name="app-prompt-entitlement" content="firefly-web-usage" />
      <meta name="app-prompt-path" content="https://dismiss-pep--milo--adobecom.hlx.page/drafts/raghavs/pep-prompt-content"/>
      <link rel="icon" href="/libs/img/favicons/favicon.ico" size="any" />
      <script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>
      <script src="https://stage.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js" type="javascript/blocked" data-loaded="true"></script>
      `;
      const gnav = await createFullGlobalNavigation({});
      window.adobeIMS = { isSignedInUser: () => true };
      gnav.decorateAppPrompt();
      const weAppPrompt = document.head.querySelector('link[href$="/webapp-prompt.css"]');
      expect(!!weAppPrompt).to.be.true;
    });
  });

  describe('GNav Dark theme', () => {
    it('should not contain dark theme class if dark theme is not configured', async () => {
      await createFullGlobalNavigation();
      expect(document.querySelector(selectors.globalNav).classList.contains('feds--dark')).to.be.false;
    });
    it('should contain dark theme class if dark theme is configured', async () => {
      await createFullGlobalNavigation({ customConfig: { theme: 'dark' } });
      expect(document.querySelector(selectors.globalNav).classList.contains('feds--dark')).to.be.true;
    });
    it('should use first image if not dark theme', async () => {
      await createFullGlobalNavigation({ globalNavigation: darkNav });
      expect(document.querySelector(`${selectors.brandImage} img`).getAttribute('src')).to.equal('http://localhost:2000/test/blocks/global-navigation/mocks/adobe-logo.svg');
    });
    it('should use second image for dark theme', async () => {
      await createFullGlobalNavigation({ globalNavigation: darkNav, customConfig: { theme: 'dark' } });
      expect(document.querySelector(`${selectors.brandImage} img`).getAttribute('src')).to.equal('http://localhost:2000/test/blocks/global-navigation/mocks/adobe-dark-logo.svg');
    });
  });

  describe('Client search feature in global navigation', () => {
    it('should append the feds-client-search div when search is enabled', async () => {
      await createFullGlobalNavigation({ customConfig: { searchEnabled: 'on' } });
      expect(document.querySelector(selectors.topNav).classList.contains('feds-client-search')).to.exist;
    });
  });

  describe('Product Entry CTA feature in global navigation', () => {
    it('should not append the feds-product-entry-cta class when product entry cta is disabled', async () => {
      document.head.innerHTML = '<meta name="product-entry-cta" content="off"/>';
      const gnav = await createFullGlobalNavigation({ globalNavigation: productEntryCTA });
      gnav.decorateProductEntryCTA();
      expect(document.querySelector(selectors.topNav).querySelector('.feds-cta-wrapper.feds-product-entry-cta')).to.not.exist;
    });

    it('should append the feds-product-entry-cta class when product entry cta is enabled', async () => {
      document.head.innerHTML = '<meta name="product-entry-cta" content="on" />';
      const gnav = await createFullGlobalNavigation({ globalNavigation: productEntryCTA });
      gnav.decorateProductEntryCTA();
      expect(document.querySelector(selectors.topNav).querySelector('.feds-cta-wrapper.feds-product-entry-cta')).to.exist;
    });
  });

  describe('Custom Links for mobile hamburger menu', () => {
    it('Add custom links through Link Group block in parallel to large menu\'s', async () => {
      const customLinks = 'home,apps,learn';
      await createFullGlobalNavigation({
        viewport: 'mobile',
        globalNavigation: navigationWithCustomLinks,
        customConfig: { customLinks },
      });
      expect(
        document.querySelectorAll(selectors.customMobileLink).length,
      ).to.equal(customLinks.split(',').length);
    });
  });

  describe('local nav scenarios', () => {
    let clock;

    beforeEach(async () => {
      clock = sinon.useFakeTimers({
        toFake: ['setTimeout'],
        shouldAdvanceTime: true,
      });
    });

    afterEach(() => {
      clock.restore();
    });

    it('should load Local Nav', async () => {
      await createFullGlobalNavigation({ globalNavigation: gnavWithlocalNav });
      const localNav = document.querySelector(selectors.localNav);
      expect(!!localNav).to.be.true;
    });

    it('should open local nav on click of localnav title', async () => {
      await createFullGlobalNavigation({ globalNavigation: gnavWithlocalNav });
      const localNavTitle = document.querySelector(selectors.localNavTitle);
      localNavTitle.click();
      const localNav = document.querySelector(selectors.localNav);
      expect(localNav.classList.contains('feds-localnav--active')).to.be.true;
    });

    it('should remove is-sticky class to localnav on scroll less than localnav placement', async () => {
      await createFullGlobalNavigation({ globalNavigation: gnavWithlocalNav });
      const localNav = document.querySelector(selectors.localNav);
      sinon.stub(localNav, 'getBoundingClientRect').returns({ top: 20 });
      window.dispatchEvent(new Event('scroll'));
      const localNavAfterScroll = document.querySelector(selectors.localNav);
      expect(localNavAfterScroll.classList.contains('is-sticky')).to.be.false;
    });

    it('should add is-sticky class to localnav on scroll greater than localnav placement', async () => {
      await createFullGlobalNavigation({ globalNavigation: gnavWithlocalNav });
      const localNav = document.querySelector(selectors.localNav);
      sinon.stub(localNav, 'getBoundingClientRect').returns({ top: 0 });
      window.dispatchEvent(new Event('scroll'));
      const localNavAfterScroll = document.querySelector(selectors.localNav);
      expect(localNavAfterScroll.classList.contains('is-sticky')).to.be.true;
    });

    it('should open both screen if localnav is present but shows only level 2 screen', async () => {
      await createFullGlobalNavigation({ globalNavigation: gnavWithlocalNav, viewport: 'mobile' });
      const toggle = document.querySelector(selectors.mainNavToggle);
      toggle.click();
      await clock.runAllAsync();
      const fedsNavWrapper = document.querySelector(selectors.navWrapper);
      const largemenu = document.querySelector(selectors.largeMenu);
      expect(fedsNavWrapper.classList.contains('feds-nav-wrapper--expanded')).to.be.true;
      expect(largemenu.classList.contains('feds-dropdown--active')).to.be.true;
    });

    it('should expand nested dropdowm if click on headline', async () => {
      await createFullGlobalNavigation({ globalNavigation: gnavWithlocalNav, viewport: 'mobile' });
      const localNavTitle = document.querySelector(selectors.localNavTitle);
      localNavTitle.click();
      localNavTitle.focus();
      await sendKeys({ press: 'Tab' });
      await sendKeys({ press: 'Tab' });
      document.activeElement.click();
      expect(document.activeElement.getAttribute('aria-expanded')).to.equal('true');
      const headline = document.activeElement.parentElement.querySelector('.feds-menu-headline');
      headline.click();
      expect(headline.getAttribute('aria-expanded')).to.equal('true');
    });
    it('disables scroll for the popup but not for the localnav', async () => {
      Object.defineProperty(navigator, 'userAgent', { get: () => 'Safari' });
      await createFullGlobalNavigation({ globalNavigation: gnavWithlocalNav, viewport: 'mobile' });
      const localNavTitle = document.querySelector(selectors.localNavTitle);
      localNavTitle.click();
      const localNav = document.querySelector(selectors.localNav);
      const curtain = localNav.querySelector('.feds-localnav-curtain');
      expect(document.body.classList.contains('disable-ios-scroll')).to.equal(false);
      curtain.click();
      expect(document.body.classList.contains('disable-ios-scroll')).to.equal(false);
      const toggle = document.querySelector(selectors.mainNavToggle);
      toggle.click();
      expect(document.body.classList.contains('disable-ios-scroll')).to.equal(true);
      const close = document.querySelector('.close-icon');
      close.click();
      expect(document.body.classList.contains('disable-ios-scroll')).to.equal(false);
    });
  });
});
