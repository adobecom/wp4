/* eslint-disable no-restricted-syntax */
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import {
  createFullGlobalNavigation,
  selectors,
  isElementVisible,
  unavVersion,
  addMetaDataV2,
} from './test-utilities.js';
import { toFragment } from '../../../libs/blocks/global-navigation/utilities/utilities.js';
import globalNavigationMock from './mocks/global-navigation.plain.js';
import globalNavigationWideColumnMock from './mocks/global-navigation-wide-column.plain.js';

describe('main nav popups', () => {
  before(() => {
    document.head.innerHTML = `<link rel="icon" href="/libs/img/favicons/favicon.ico" size="any">
    <script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>
    <script src="https://stage.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js" type="javascript/blocked" data-loaded="true"></script>
    `;
  });

  describe('desktop', () => {
    it('should render a popup properly', async () => {
      await createFullGlobalNavigation();

      const navItem = document.querySelector(selectors.navItem);
      const navLink = navItem.querySelector(selectors.navLink);
      const popup = navItem.querySelector(selectors.popup);
      const columns = popup.querySelectorAll(selectors.column);
      const navLinks = popup.querySelectorAll(selectors.navLink);

      navLink.click();

      expect(columns.length).to.equal(4);
      expect(navLinks.length).to.equal(22);

      [...columns].forEach((column) => {
        expect(isElementVisible(column)).to.equal(true);
      });

      [...navLinks].forEach((link) => {
        expect(isElementVisible(link)).to.equal(true);
      });

      const hasLinkgroupModifier = document.querySelector(`${selectors.navLink}--blue`) instanceof HTMLElement;
      expect(hasLinkgroupModifier).to.equal(true);
    });

    it('should render popups with wide columns', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      await createFullGlobalNavigation({ globalNavigation: globalNavigationWideColumnMock });
      expect(document.querySelector('.feds-navItem--section .feds-menu-column--group .feds-menu-column + .feds-menu-column')).to.exist;
      expect(document.querySelector('.column-break')).to.not.exist;
    });

    it('should render the promo', async () => {
      await createFullGlobalNavigation();

      document.querySelector(selectors.mainNavToggle).click();
      document.querySelector(selectors.navLink).click();

      expect(isElementVisible(document.querySelector(selectors.promoImage))).to.equal(true);
    });

    it('should allow CTAs in Promo boxes', async () => {
      await createFullGlobalNavigation();
      expect(document.querySelector(`${selectors.promo}${selectors.promo}--dark ${selectors.cta}`)).to.exist;
    });

    it('should render promo elements in initial order', async () => {
      // Initial template order is text, then image
      await createFullGlobalNavigation();

      const imgAfterTxt = document.querySelector('.feds-promo-content + .feds-promo-image');
      expect(imgAfterTxt).to.exist;

      // Switch original order to be image, then text
      const template = toFragment`<div></div>`;
      template.innerHTML = globalNavigationMock;
      const templatePromo = template.querySelector('.gnav-promo');
      const templatePromoContent = templatePromo.firstElementChild;
      templatePromoContent.remove();
      templatePromo.append(templatePromoContent);
      await createFullGlobalNavigation({ globalNavigation: template.innerHTML });

      const txtAfterImg = document.querySelector('.feds-promo-image + .feds-promo-content');
      expect(txtAfterImg).to.exist;
    });
  });

  describe('small desktop', () => {
    it('should render a popup properly', async () => {
      await createFullGlobalNavigation({ viewport: 'smallDesktop' });

      const navItem = document.querySelector(selectors.navItem);
      const navLink = navItem.querySelector(selectors.navLink);
      const popup = navItem.querySelector(selectors.popup);
      const columns = popup.querySelectorAll(selectors.column);
      const navLinks = popup.querySelectorAll(selectors.navLink);

      navLink.click();

      expect(columns.length).to.equal(4);
      expect(navLinks.length).to.equal(22);

      [...columns].forEach((column) => {
        expect(isElementVisible(column)).to.equal(true);
      });

      [...navLinks].forEach((link) => {
        expect(isElementVisible(link)).to.equal(true);
      });

      const hasLinkgroupModifier = document.querySelector(`${selectors.navLink}--blue`) instanceof HTMLElement;
      expect(hasLinkgroupModifier).to.equal(true);
    });

    it('should render the promo', async () => {
      await createFullGlobalNavigation({ viewport: 'smallDesktop' });

      document.querySelector(selectors.mainNavToggle).click();
      document.querySelector(selectors.navLink).click();

      expect(isElementVisible(document.querySelector(selectors.promoImage))).to.equal(true);
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

    it('should open a popup and headline on click', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      await createFullGlobalNavigation({ viewport: 'mobile' });

      document.querySelector(selectors.mainNavToggle).click();

      const navItem = document.querySelector(selectors.navItem);
      const navLink = navItem.querySelector(selectors.navLink);
      const popup = navItem.querySelector(selectors.popup);
      const headline = popup.querySelector(selectors.headline);
      const headlinePopupItems = popup.querySelector(selectors.popupItems);

      expect(isElementVisible(popup.querySelector(selectors.navLink))).to.equal(false);
      expect(navLink.getAttribute('aria-expanded')).to.equal('false');
      expect(navLink.getAttribute('daa-lh')).to.equal('header|Open');
      expect(isElementVisible(popup)).to.equal(false);
      expect(headline.getAttribute('aria-expanded')).to.equal('false');
      expect(isElementVisible(headlinePopupItems)).to.equal(false);

      navLink.click();
      await clock.runAllAsync();

      expect(isElementVisible(popup.querySelector(selectors.navLink))).to.equal(true);
      expect(navLink.getAttribute('aria-expanded')).to.equal('true');
      expect(navLink.getAttribute('daa-lh')).to.equal('header|Close');
      expect(isElementVisible(popup)).to.equal(true);
      expect(headline.getAttribute('aria-expanded')).to.equal('false');
      expect(isElementVisible(headlinePopupItems)).to.equal(false);

      headline.click();

      expect(headline.getAttribute('aria-expanded')).to.equal('true');
      expect(isElementVisible(headlinePopupItems)).to.equal(true);
    });

    it('should not render the promo', async () => {
      await createFullGlobalNavigation({ viewport: 'mobile' });

      document.querySelector(selectors.mainNavToggle).click();
      document.querySelector(selectors.navLink).click();

      expect(isElementVisible(document.querySelector(selectors.promoImage))).to.equal(false);
    });
  });
});
