import { expect } from '@esm-bundle/chai';
import sinon, { stub } from 'sinon';
import { readFile } from '@web/test-runner-commands';
import {
  allElementsVisible,
  visibleSelectorsDesktop,
  visibleSelectorsMobile,
  createFullGlobalFooter,
  insertDummyElementOnTop,
  waitForFooterToDecorate,
  allSelectors,
} from './test-utilities.js';
import baseFooter from './mocks/base-footer.js';
import fetchedFooter from './mocks/fetched-footer.js';
import icons from './mocks/icons.js';
import { isElementVisible, mockRes } from '../global-navigation/test-utilities.js';
import placeholders from '../global-navigation/mocks/placeholders.js';
import { logErrorFor } from '../../../libs/blocks/global-navigation/utilities/utilities.js';

describe('global footer', () => {
  let clock = null;
  beforeEach(async () => {
    document.body.innerHTML = baseFooter;
    clock = sinon.useFakeTimers({
      toFake: ['setTimeout'],
      shouldAdvanceTime: true,
    });

    stub(window, 'fetch').callsFake(async (url) => {
      if (url.includes('/footer')) {
        return mockRes({
          payload: fetchedFooter(
            { regionPickerHash: '/fragments/regions#langnav' },
          ),
        });
      }
      if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
      if (url.includes('icons.svg')) return mockRes({ payload: icons });
      if (url.includes('/regions.plain.html')) return mockRes({ payload: await readFile({ path: '../region-nav/mocks/regions.html' }) });
      return null;
    });
  });

  afterEach(() => {
    sinon.restore();
    document.body.innerHTML = '';
  });

  describe('wide screen', async () => {
    it('should render the footer on wide screen', async () => {
      await createFullGlobalFooter({ waitForDecoration: true, viewport: 'wide' });

      Object.keys(allSelectors).forEach((key) => expect(
        document.querySelector(allSelectors[key]) instanceof HTMLElement,
      ).to.equal(true));

      expect(allElementsVisible(
        visibleSelectorsDesktop,
        document.querySelector(allSelectors.container),
      )).to.equal(true);
    });
  });

  describe('desktop', () => {
    describe('basic sanity tests', () => {
      it('should have footer', async () => {
        await createFullGlobalFooter({ waitForDecoration: true });
        expect(document.querySelector('footer')).to.exist;

        Object.keys(allSelectors).forEach((key) => expect(
          document.querySelector(allSelectors[key]) instanceof HTMLElement,
        ).to.equal(true));

        expect(allElementsVisible(
          visibleSelectorsDesktop,
          document.querySelector(allSelectors.container),
        )).to.equal(true);
      });

      it('should handle failed fetch for footer content', async () => {
        window.fetch.restore();
        stub(window, 'fetch').callsFake((url) => {
          if (url.includes('/footer')) {
            return mockRes({
              payload: null,
              ok: false,
              status: 400,
            });
          }
          if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
          if (url.includes('icons.svg')) return mockRes({ payload: icons });
          return null;
        });

        const globalFooter = await createFullGlobalFooter({ waitForDecoration: false });
        expect(await globalFooter.decorateContent()).to.equal(undefined);
      });

      it('should handle missing elements', async () => {
        const globalFooter = await createFullGlobalFooter({ waitForDecoration: true });
        globalFooter.body = document.createElement('div');
        expect(await globalFooter.decorateGrid()).to.equal('');
        expect(await globalFooter.decorateProducts()).to.equal('');
        expect(await globalFooter.decorateRegionPicker()).to.equal('');
        expect(await globalFooter.decorateSocial()).to.equal('');
        expect(await globalFooter.decoratePrivacy()).to.equal('');
      });
    });

    describe('conditional render tests', () => {
      const { container, ...childSelectors } = allSelectors;
      it('should render the footer when in viewport', async () => {
        await createFullGlobalFooter({ waitForDecoration: true });

        Object.keys(allSelectors).forEach((key) => expect(
          document.querySelector(allSelectors[key]) instanceof HTMLElement,
        ).to.equal(true));

        expect(allElementsVisible(
          visibleSelectorsDesktop,
          document.querySelector(allSelectors.container),
        )).to.equal(true);
      });

      it('should render the footer after 3s when outside of the 300px range of the viewport', async () => {
        insertDummyElementOnTop({ height: window.innerHeight + 400 });

        await createFullGlobalFooter({ waitForDecoration: false });

        Object.keys(childSelectors).forEach((key) => expect(
          document.querySelector(allSelectors[key]) instanceof HTMLElement,
        ).to.equal(false));

        clock.tick(3000);
        await waitForFooterToDecorate();

        Object.keys(allSelectors).forEach((key) => expect(
          document.querySelector(allSelectors[key]) instanceof HTMLElement,
        ).to.equal(true));
      });

      it('should render the footer when outside of the viewport, but within 300px range', async () => {
        insertDummyElementOnTop({ height: window.innerHeight + 200 });
        const startTime = performance.now();
        await createFullGlobalFooter({ waitForDecoration: true });
        const endTime = performance.now();
        const timeDiff = endTime - startTime;

        Object.keys(allSelectors).forEach((key) => expect(
          document.querySelector(allSelectors[key]) instanceof HTMLElement,
        ).to.equal(true));
        // footer decoration should take less than 3s if within 300px range of viewport
        expect(timeDiff < 3000).to.equal(true);
      });

      it('should render the footer when outside of the 300px viewport range, but scrolled into view earlier than 3s', async () => {
        insertDummyElementOnTop({ height: window.innerHeight + 400 });
        const startTime = performance.now();
        await createFullGlobalFooter({ waitForDecoration: false });

        Object.keys(childSelectors).forEach((key) => expect(
          document.querySelector(allSelectors[key]) instanceof HTMLElement,
        ).to.equal(false));

        window.scrollBy(0, window.innerHeight);
        await waitForFooterToDecorate();

        Object.keys(allSelectors).forEach((key) => expect(
          document.querySelector(allSelectors[key]) instanceof HTMLElement,
        ).to.equal(true));

        const endTime = performance.now();
        const timeDiff = endTime - startTime;
        // footer decoration should take less than 3s when scrolled into view
        expect(timeDiff < 3000).to.equal(true);

        expect(allElementsVisible(
          visibleSelectorsDesktop,
          document.querySelector(allSelectors.container),
        )).to.equal(true);
      });
    });

    describe('region picker tests', () => {
      it('should handle non-empty hash', async () => {
        await createFullGlobalFooter({ waitForDecoration: true });

        const regionPickerElem = document.querySelector(allSelectors.regionPicker);
        regionPickerElem.dispatchEvent(new Event('click'));
        const regionNavModal = document.createElement('div');
        regionNavModal.classList.add('region-nav'); // pretend that the modal was added to the body
        // since clicking on the regionpicker elem apparently doesnt set the hash
        document.body.append(regionNavModal);
        window.dispatchEvent(new Event('milo:modal:loaded'));

        expect(regionPickerElem.getAttribute('href') === '#langnav').to.equal(true);
        expect(regionPickerElem.getAttribute('aria-expanded')).to.equal('true');

        window.dispatchEvent(new Event('milo:modal:closed'));
        expect(regionPickerElem.getAttribute('aria-expanded')).to.equal('false');
      });

      it('should handle empty hash', async () => {
        window.fetch.restore();
        stub(window, 'fetch').callsFake(async (url) => {
          if (url.includes('/footer')) {
            return mockRes({
              payload: fetchedFooter(
                { regionPickerHash: '' },
              ),
            });
          }
          if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
          if (url.includes('icons.svg')) return mockRes({ payload: icons });
          return null;
        });

        await createFullGlobalFooter({ waitForDecoration: true });
        const regionPickerElem = document.querySelector(allSelectors.regionPicker);
        expect(regionPickerElem.getAttribute('href') === '#').to.equal(true);

        regionPickerElem.dispatchEvent(new Event('click'));
        expect(regionPickerElem.getAttribute('aria-expanded')).to.equal('true');

        document.body.dispatchEvent(new Event('click', { bubbles: true }));
        expect(regionPickerElem.getAttribute('aria-expanded')).to.equal('false');
      });

      it('should render the footer when region picker is missing', async () => {
        window.fetch.restore();
        stub(window, 'fetch').callsFake(async (url) => {
          if (url.includes('/footer')) {
            return mockRes({
              payload: fetchedFooter(
                { hasRegionPicker: false },
              ),
            });
          }
          if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
          if (url.includes('icons.svg')) return mockRes({ payload: icons });
          if (url.includes('/regions.plain.html')) return mockRes({ payload: await readFile({ path: '../region-nav/mocks/regions.html' }) });
          return null;
        });

        await createFullGlobalFooter({ waitForDecoration: false });
        const { regionPicker, regionPickerWrapper, ...decorationSelectors } = allSelectors;
        const {
          regionPicker: visibleRegionPicker,
          regionPickerWrapper: visibleRegionPickerWrapper,
          ...visibleSelectors
        } = visibleSelectorsDesktop;
        await waitForFooterToDecorate({ ...decorationSelectors });

        expect(document.querySelector(allSelectors.regionPicker)).to.equal(null);
        expect(allElementsVisible(
          visibleSelectors,
          document.querySelector(allSelectors.container),
        )).to.equal(true);
      });
    });

    describe('social links tests', () => {
      it('should render the footer when social links are missing', async () => {
        window.fetch.restore();
        stub(window, 'fetch').callsFake(async (url) => {
          if (url.includes('/footer')) {
            return mockRes({
              payload: fetchedFooter(
                { hasSocialLinks: false },
              ),
            });
          }
          if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
          if (url.includes('icons.svg')) return mockRes({ payload: icons });
          if (url.includes('/regions.plain.html')) return mockRes({ payload: await readFile({ path: '../region-nav/mocks/regions.html' }) });
          return null;
        });

        await createFullGlobalFooter({ waitForDecoration: false });
        const { social, socialItem, ...decorationSelectors } = allSelectors;
        const {
          social: visibleSocial,
          socialItem: visibleSocialItem,
          ...visibleSelectors
        } = visibleSelectorsDesktop;
        await waitForFooterToDecorate({ ...decorationSelectors });

        expect(document.querySelector(allSelectors.social)).to.equal(null);
        expect(allElementsVisible(
          visibleSelectors,
          document.querySelector(allSelectors.container),
        )).to.equal(true);
      });
    });
  });

  describe('small desktop', async () => {
    it('should render the footer on small desktop', async () => {
      await createFullGlobalFooter({ waitForDecoration: true, viewport: 'smallDesktop' });

      Object.keys(allSelectors).forEach((key) => expect(
        document.querySelector(allSelectors[key]) instanceof HTMLElement,
      ).to.equal(true));

      expect(allElementsVisible(
        visibleSelectorsDesktop,
        document.querySelector(allSelectors.container),
      )).to.equal(true);
    });
  });

  describe('mobile', () => {
    it('should render the footer on mobile', async () => {
      await createFullGlobalFooter({ waitForDecoration: true, viewport: 'mobile' });

      Object.keys(allSelectors).forEach((key) => expect(
        document.querySelector(allSelectors[key]) instanceof HTMLElement,
      ).to.equal(true));

      expect(allElementsVisible(
        visibleSelectorsMobile,
        document.querySelector(allSelectors.container),
      )).to.equal(true);
    });

    it('should open/close dropdowns on click', async () => {
      await createFullGlobalFooter({ waitForDecoration: true, viewport: 'mobile' });

      for (const dropdown of Array.from(document.getElementsByClassName('feds-menu-section'))) {
        const header = dropdown.querySelector('.feds-menu-headline');
        const links = Array.from(dropdown.getElementsByClassName('feds-navLink'));

        // open the dropdown
        header.dispatchEvent(new Event('click'));
        for (const link of links) {
          expect(isElementVisible(link)).to.equal(true);
        }
        // close the dropdown
        header.dispatchEvent(new Event('click'));
        for (const link of links) {
          expect(isElementVisible(link)).to.equal(false);
        }
      }
    });
  });

  describe('LANA logging tests', () => {
    beforeEach(async () => {
      window.lana.log = sinon.spy();
    });

    it('should send log on error', async () => {
      const erroneousFunction = async () => {
        throw new Error('error');
      };

      const logMessage = 'test message';
      const logTags = 'global-footer';
      await logErrorFor(erroneousFunction, logMessage, logTags);

      expect(window.lana.log.calledOnce).to.be.true;

      const firstCallArguments = window.lana.log.getCall(0).args;

      expect(firstCallArguments[0].includes(logMessage)).to.equal(true);
      expect(firstCallArguments[1].tags === logTags).to.equal(true);
    });

    it('should send log when footer cannot be fetched', async () => {
      window.fetch.restore();
      stub(window, 'fetch').callsFake((url) => {
        if (url.includes('/footer')) {
          return mockRes({
            payload: null,
            ok: false,
            status: 400,
          });
        }
        if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
        if (url.includes('icons.svg')) return mockRes({ payload: icons });
        return null;
      });
      await createFullGlobalFooter({ waitForDecoration: false });
      await clock.runAllAsync();
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Failed to fetch footer content')));
      expect(window.lana.log.getCalls().find((c) => c.args[1].tags.includes('global-footer')));
    });

    it('should send log when could not create URL for region picker', async () => {
      const globalFooter = await createFullGlobalFooter({ waitForDecoration: true });
      sinon.restore();
      stub(window, 'URL').callsFake(() => {
        throw new Error('mocked error');
      });
      try {
        await globalFooter.decorateRegionPicker();
      } catch (e) {
        // should throw error
      }
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Could not create URL for region picker')));
      expect(window.lana.log.getCalls().find((c) => c.args[1].tags.includes('global-footer')));
    });

    it('should send log when footer cannot be instantiated ', async () => {
      sinon.stub(window, 'DOMParser').callsFake(() => ({ parseFromString: sinon.stub().throws(new Error('Parsing error')) }));
      await createFullGlobalFooter({ waitForDecoration: false });
      await clock.runAllAsync();
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Footer could not be instantiated')));
      expect(window.lana.log.getCalls().find((c) => c.args[1].tags.includes('global-footer')));
    });

    it('should send LANA log when icons.svg has some network issue', async () => {
      window.fetch.restore();
      stub(window, 'fetch').callsFake(async (url) => {
        if (url.includes('/footer')) {
          return mockRes({
            payload: fetchedFooter(
              { regionPickerHash: '' },
            ),
          });
        }
        if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
        if (url.includes('icons.svg')) return mockRes({ payload: null, ok: false, status: 400 });
        return null;
      });
      await createFullGlobalFooter({ waitForDecoration: true });
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Issue with loadIcons')));
    });
  });

  describe('dark mode footer', async () => {
    it('should not contain dark theme class if dark theme is not configured', async () => {
      await createFullGlobalFooter({ waitForDecoration: true });
      expect(document.querySelector('footer').classList.contains('feds--dark')).to.be.false;
    });
    it('should contain dark theme class if dark theme is configured', async () => {
      await createFullGlobalFooter({ waitForDecoration: true, customConfig: { theme: 'dark' } });
      expect(document.querySelector('footer').classList.contains('feds--dark')).to.be.true;
    });
  });
  describe('standalone footer', async () => {
    it('should still load the regionnav if it\'s a standalone footer', async () => {
      await createFullGlobalFooter({
        waitForDecoration: true,
        customConfig: { standaloneGnav: true },
      });

      const regionPickerElem = document.querySelector(allSelectors.regionPicker);
      regionPickerElem.dispatchEvent(new Event('click'));
      const regionNavModal = document.createElement('div');
      regionNavModal.classList.add('region-nav'); // pretend that the modal was added to the body
      regionNavModal.setAttribute('data-failed', 'true');
      // since clicking on the regionpicker elem apparently doesnt set the hash
      document.body.append(regionNavModal);
      window.dispatchEvent(new Event('milo:modal:loaded'));

      expect(regionPickerElem.getAttribute('href') === '#langnav').to.equal(true);
      expect(regionPickerElem.getAttribute('aria-expanded')).to.equal('true');

      window.dispatchEvent(new Event('milo:modal:closed'));
      expect(regionPickerElem.getAttribute('aria-expanded')).to.equal('false');
    });
  });
});
