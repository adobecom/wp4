/* eslint-disable no-restricted-syntax */
import { expect } from '@esm-bundle/chai';
import {
  createFullGlobalNavigation,
  selectors,
  isElementVisible,
  unavVersion,
  addMetaDataV2,
} from './test-utilities.js';
import globalNavigationCrossCloud from './mocks/global-navigation-cross-cloud.plain.js';

describe('Cross Cloud Menu', () => {
  before(() => {
    document.head.innerHTML = `<link rel="icon" href="/libs/img/favicons/favicon.ico" size="any">
    <script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>
    <script src="https://stage.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js" type="javascript/blocked" data-loaded="true"></script>
    `;
  });

  describe('desktop', () => {
    it('should render the Cross Cloud Menu', async () => {
      document.head.appendChild(addMetaDataV2('off'));
      await createFullGlobalNavigation({ globalNavigation: globalNavigationCrossCloud });
      const crossCloudMenu = document.querySelector(selectors.crossCloudMenuWrapper);

      expect(crossCloudMenu).to.exist;
      expect(isElementVisible(crossCloudMenu)).to.equal(false);

      document.querySelector(`${selectors.largeMenu} ${selectors.navLink}`).click();

      crossCloudMenu.querySelectorAll(selectors.navLink).forEach((el) => {
        expect(isElementVisible(el)).to.equal(true);
      });
    });

    it('should not render Cross Cloud Menu if not authored', async () => {
      await createFullGlobalNavigation();
      expect(document.querySelector(selectors.crossCloudMenuWrapper)).to.not.exist;
    });
  });

  describe('small desktop', () => {
    it('should not render the Cross Cloud Menu', async () => {
      await createFullGlobalNavigation({ globalNavigation: globalNavigationCrossCloud, viewport: 'smallDesktop' });
      document.querySelector(`${selectors.largeMenu} ${selectors.navLink}`).click();

      expect(isElementVisible(document.querySelector(selectors.crossCloudMenuWrapper)))
        .to.equal(false);
    });
  });

  describe('mobile', () => {
    it('should not render the Cross Cloud Menu', async () => {
      await createFullGlobalNavigation({ viewport: 'mobile' });
      document.querySelector(`${selectors.largeMenu} ${selectors.navLink}`).click();

      expect(isElementVisible(document.querySelector(selectors.crossCloudMenuWrapper)))
        .to.equal(false);
    });
  });
});
