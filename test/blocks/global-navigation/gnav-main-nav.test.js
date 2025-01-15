/* eslint-disable no-restricted-syntax */
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { setViewport } from '@web/test-runner-commands';
import {
  createFullGlobalNavigation,
  selectors,
  isElementVisible,
  viewports,
  unavVersion,
  addMetaDataV2,
} from './test-utilities.js';
import { isDesktop, setActiveLink, toFragment } from '../../../libs/blocks/global-navigation/utilities/utilities.js';
import globalNavigationActiveMock from './mocks/global-navigation-active.plain.js';

describe('main nav', () => {
  before(() => {
    document.head.innerHTML = `<link rel="icon" href="/libs/img/favicons/favicon.ico" size="any">
    <script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>
    <script src="https://stage.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js" type="javascript/blocked" data-loaded="true"></script>
    `;
  });

  describe('desktop', () => {
    it('should render the main nav', async () => {
      await createFullGlobalNavigation();

      [...document.querySelectorAll(selectors.navItem)].forEach((el) => {
        expect(isElementVisible(el)).to.equal(true);
      });
    });

    it('should open a popup on click', async () => {
      const clock = sinon.useFakeTimers({
        toFake: ['setTimeout'],
        shouldAdvanceTime: true,
      });

      await createFullGlobalNavigation();

      const navItem = document.querySelector(selectors.navItem);
      const navLink = navItem.querySelector(selectors.navLink);
      const popup = navItem.querySelector(selectors.popup);

      expect(navLink.getAttribute('aria-expanded')).to.equal('false');
      expect(navLink.getAttribute('daa-lh')).to.equal('header|Open');
      expect(isElementVisible(popup)).to.equal(false);

      navLink.click();
      await clock.runAllAsync();

      expect(navLink.getAttribute('aria-expanded')).to.equal('true');
      expect(navItem.classList.contains('feds-dropdown--active')).to.equal(true);
      expect(isElementVisible(popup)).to.equal(true);
      expect(navLink.getAttribute('daa-lh')).to.equal('header|Close');
    });

    it('should close a popup on click', async () => {
      await createFullGlobalNavigation();

      const navItem = document.querySelector(selectors.navItem);
      const navLink = navItem.querySelector(selectors.navLink);
      const popup = navItem.querySelector(selectors.popup);

      navLink.click();

      expect(navLink.getAttribute('aria-expanded')).to.equal('true');
      expect(isElementVisible(popup)).to.equal(true);
      expect(navItem.classList.contains('feds-dropdown--active')).to.equal(true);

      navLink.click();

      expect(navLink.getAttribute('aria-expanded')).to.equal('false');
      expect(isElementVisible(popup)).to.equal(false);
      expect(navItem.classList.contains('feds-dropdown--active')).to.equal(false);
    });

    it(
      'should be able to click all links with popups and at most have 1 open popup at a time',
      async () => {
        await createFullGlobalNavigation();

        const navLinks = document.querySelectorAll(`${selectors.navLink}[aria-haspopup='true']`);

        [...navLinks].forEach((link) => {
          const navItem = link.parentElement;
          const popup = navItem.querySelector(selectors.popup);

          link.click();

          expect(document.querySelectorAll(`${selectors.navLink}[aria-expanded='true']`).length).to.equal(1);
          expect(link.getAttribute('aria-expanded')).to.equal('true');
          expect(isElementVisible(popup)).to.equal(true);
        });
      },
    );

    it('should close popups when clicking outside of the header', async () => {
      await createFullGlobalNavigation();

      const navItem = document.querySelector(selectors.navItem);
      const navLink = navItem.querySelector(selectors.navLink);
      const popup = navItem.querySelector(selectors.popup);

      navLink.click();

      expect(navLink.getAttribute('aria-expanded')).to.equal('true');
      expect(isElementVisible(popup)).to.equal(true);

      document.body.click();

      expect(navLink.getAttribute('aria-expanded')).to.equal('false');
      expect(isElementVisible(popup)).to.equal(false);
    });

    it('should not decorate breadcrumbs when has-breadcrumbs class is not present', async () => {
      const gnav = await createFullGlobalNavigation({ hasBreadcrumbs: false });
      expect(await gnav.decorateBreadcrumbs()).to.be.null;
    });
  });

  describe('small desktop', () => {
    it('should render the main nav', async () => {
      await createFullGlobalNavigation({ viewport: 'smallDesktop' });

      [...document.querySelectorAll(selectors.navItem)].forEach((el) => {
        expect(isElementVisible(el)).to.equal(true);
      });
    });
  });

  describe('mobile', () => {
    it('should render the main nav only on click', async () => {
      await createFullGlobalNavigation({ viewport: 'mobile' });

      [...document.querySelectorAll(selectors.navItem)].forEach((el) => {
        expect(isElementVisible(el)).to.equal(false);
      });

      document.querySelector(selectors.mainNavToggle).click();

      [...document.querySelectorAll(selectors.navItem)].forEach((el) => {
        expect(isElementVisible(el)).to.equal(true);
      });
    });
  });

  describe('sets an active item', () => {
    beforeEach(() => {
      setActiveLink(false);
    });

    it('marks simple link as active', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      const targetSelector = '#simple-link';
      const template = toFragment`<div></div>`;
      template.innerHTML = globalNavigationActiveMock;
      const templateActiveElem = template.querySelector(targetSelector);
      templateActiveElem.setAttribute('href', window.location.href);
      await createFullGlobalNavigation({ globalNavigation: template.innerHTML });
      const markupActiveElem = document.querySelector(targetSelector);
      expect(markupActiveElem.getAttribute('role')).to.equal('link');
      expect(markupActiveElem.getAttribute('aria-disabled')).to.equal('true');
      expect(markupActiveElem.getAttribute('aria-current')).to.equal('page');
      expect(markupActiveElem.closest(selectors.activeNavItem) instanceof HTMLElement).to.be.true;
    });

    it('marks item with sync dropdown containing active link', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      const targetSelector = '#link-in-dropdown';
      const template = toFragment`<div></div>`;
      template.innerHTML = globalNavigationActiveMock;
      const templateActiveElem = template.querySelector(targetSelector);
      templateActiveElem.setAttribute('href', window.location.href);
      await createFullGlobalNavigation({ globalNavigation: template.innerHTML });
      const markupActiveElem = document.querySelector(targetSelector);
      expect(markupActiveElem.closest(selectors.activeNavItem) instanceof HTMLElement).to.be.true;
    });

    it('marks item from a nav with a single async dropdown containing active link', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      await createFullGlobalNavigation({ globalNavigation: globalNavigationActiveMock });
      const sections = document.querySelectorAll('section.feds-navItem--section');
      expect(sections.length).to.equal(1);
      expect(sections[0].matches(selectors.activeNavItem)).to.be.true;
    });

    it('marks item from a nav with multiple async dropdowns containing active link', async () => {
      const template = toFragment`<div></div>`;
      template.innerHTML = globalNavigationActiveMock;
      // Duplicate cloud menu and add it to the template
      const toDuplicate = template.querySelector('#cloud-menu-wrapper');
      const duplicated = toDuplicate.cloneNode(true);
      duplicated.id = `${duplicated.id}-duplicate`;
      const duplicatedCloudMenuElem = duplicated.querySelector('a#cloud-menu');
      duplicatedCloudMenuElem.id = `${duplicatedCloudMenuElem.id}-duplicate`;
      toDuplicate.after(duplicated);
      await createFullGlobalNavigation({ globalNavigation: template.innerHTML });
      // There should be two sections, one of which is active
      const sections = document.querySelectorAll('.feds-navItem--section');
      expect(sections.length).to.equal(2);
      const activeSections = document.querySelectorAll(`.feds-navItem--section${selectors.activeNavItem}`);
      expect(activeSections.length).to.equal(1);
      // A special class needs to be added in this case
      const activeSection = document.querySelector(selectors.activeNavItem);
      expect(activeSection.matches(selectors.deferredActiveNavItem)).to.be.true;
      // The special class should be removed is switching to mobile/tablet
      await setViewport(viewports.mobile);
      isDesktop.dispatchEvent(new Event('change'));
      expect(activeSection.matches(selectors.deferredActiveNavItem)).to.be.false;
    });

    it('marks a single item as active if multiple links match URL', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      const targetSelector1 = '#simple-link';
      const targetSelector2 = '#link-in-dropdown';
      const template = toFragment`<div></div>`;
      template.innerHTML = globalNavigationActiveMock;
      const templateActiveElem1 = template.querySelector(targetSelector1);
      templateActiveElem1.setAttribute('href', window.location.href);
      const templateActiveElem2 = template.querySelector(targetSelector2);
      templateActiveElem2.setAttribute('href', window.location.href);
      await createFullGlobalNavigation({ globalNavigation: template.innerHTML });
      const activeSections = document.querySelectorAll('section.feds-navItem--section');
      expect(activeSections.length).to.equal(1);
    });
  });
});
