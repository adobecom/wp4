import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import {
  toFragment,
  getFedsPlaceholderConfig,
  federatePictureSources,
  getFederatedContentRoot,
  getAnalyticsValue,
  decorateCta,
  hasActiveLink,
  setActiveLink,
  getActiveLink,
  closeAllDropdowns,
  trigger,
  getExperienceName,
  logErrorFor,
  getFederatedUrl,
} from '../../../../libs/blocks/global-navigation/utilities/utilities.js';
import { setConfig } from '../../../../libs/utils/utils.js';
import { createFullGlobalNavigation, config } from '../test-utilities.js';

describe('global navigation utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('toFragment', () => {
    expect(toFragment).to.exist;
    const fragment = toFragment`<div>test</div>`;
    expect(fragment.tagName).to.equal('DIV');
    expect(fragment.innerHTML).to.equal('test');
    // also renders nested fragments
    const fragment2 = toFragment`<span>${fragment}</span>`;
    expect(fragment2.innerHTML).to.equal('<div>test</div>');
    expect(fragment2.tagName).to.equal('SPAN');
  });

  // No tests for using the the live url and .hlx. urls
  // as mocking window.location.origin is not possible
  describe('getFedsContentRoot', () => {
    it('should return content source for localhost', () => {
      const contentSource = getFederatedContentRoot();
      expect(contentSource).to.equal('https://main--federal--adobecom.hlx.page');
    });
  });

  describe('federatePictureSources', () => {
    it('should use federated content root for image sources', async () => {
      const imgPath = 'test/blocks/global-navigation/mocks/media_medium_dropdown.png';
      const template = toFragment`<picture>
          <source
            type="image/webp"
            srcset="./${imgPath}"
            media="(min-width: 600px)"/>
          <source
            type="image/webp"
            srcset="./${imgPath}"/>
          <source
            type="image/png"
            srcset="/${imgPath}"
            media="(min-width: 600px)"/>
          <img
            loading="lazy"
            alt=""
            type="image/png"
            src="/${imgPath}"/>
        </picture>`;

      federatePictureSources(template);
      template.querySelectorAll('source, img').forEach((source) => {
        const attr = source.hasAttribute('src') ? 'src' : 'srcset';
        expect(source.getAttribute(attr)).to.equal(`https://main--federal--adobecom.hlx.page/${imgPath}`);
      });
    });
  });

  // No tests for using the the live url and .hlx. urls
  // as mocking window.location.origin is not possible
  describe('getFedsPlaceholderConfig', () => {
    it('should return contentRoot for localhost', () => {
      const locale = { locale: { ietf: 'en-US', prefix: '' } };
      setConfig({ ...config, ...locale });
      const placeholderConfig = { useCache: false };
      const { locale: { ietf, prefix, contentRoot } } = getFedsPlaceholderConfig(placeholderConfig);
      expect(ietf).to.equal('en-US');
      expect(prefix).to.equal('');
      expect(contentRoot).to.equal('https://main--federal--adobecom.hlx.page/federal/globalnav');
    });

    it('should return a config object for a specific locale', () => {
      const customConfig = {
        locales: {
          '': { ietf: 'en-US' },
          fi: { ietf: 'fi-FI' },
        },
        pathname: '/fi/',
      };
      setConfig({ ...config, ...customConfig });
      const placeholderConfig = { useCache: false };
      const { locale: { ietf, prefix, contentRoot } } = getFedsPlaceholderConfig(placeholderConfig);
      expect(ietf).to.equal('fi-FI');
      expect(prefix).to.equal('/fi');
      expect(contentRoot).to.equal('https://main--federal--adobecom.hlx.page/fi/federal/globalnav');
    });
  });

  it('getAnalyticsValue should return a string', () => {
    expect(getAnalyticsValue('test')).to.equal('test');
    expect(getAnalyticsValue('test test?')).to.equal('test test');
    expect(getAnalyticsValue('test test 1?', 2)).to.equal('test test 1-2');
  });

  describe('decorateCta', () => {
    it('should return a fragment for a primary cta', () => {
      const elem = toFragment`<a href="test">test</a>`;
      const el = decorateCta({ elem });
      expect(el.tagName).to.equal('DIV');
      expect(el.className).to.equal('feds-cta-wrapper');
      expect(el.children[0].tagName).to.equal('A');
      expect(el.children[0].className).to.equal('feds-cta feds-cta--primary');
      expect(el.children[0].getAttribute('href')).to.equal('test');
      expect(el.children[0].getAttribute('daa-ll')).to.equal('test');
      expect(el.children[0].textContent.trim()).to.equal('test');
    });

    it('should return a fragment for a secondary cta', () => {
      const elem = toFragment`<a href="test">test</a>`;
      const el = decorateCta({ elem, type: 'secondaryCta' });
      expect(el.tagName).to.equal('DIV');
      expect(el.className).to.equal('feds-cta-wrapper');
      expect(el.children[0].tagName).to.equal('A');
      expect(el.children[0].className).to.equal('feds-cta feds-cta--secondary');
      expect(el.children[0].getAttribute('href')).to.equal('test');
      expect(el.children[0].getAttribute('daa-ll')).to.equal('test');
      expect(el.children[0].textContent.trim()).to.equal('test');
    });
  });

  describe('active logic', () => {
    it('can have its state updated', () => {
      const currentState = hasActiveLink();
      setActiveLink(!currentState);
      expect(hasActiveLink()).to.equal(!currentState);
      setActiveLink(currentState);
      expect(hasActiveLink()).to.equal(currentState);
    });

    it('finds the active link from an area', () => {
      setActiveLink(false);

      const area = toFragment`<div>
          <a href="https://www.adobe.com/">Home</a>
        </div>`;

      expect(getActiveLink(area)).to.be.null;
      expect(hasActiveLink()).to.be.false;

      area.append(toFragment`<a href="${window.location.href}">Current</a>`);

      expect(getActiveLink(area) instanceof HTMLElement).to.be.true;
      expect(hasActiveLink()).to.be.true;
    });
  });

  it('closeAllDropdowns should close all dropdowns, respecting the globalNavSelector', async () => {
    // Build navigation
    await createFullGlobalNavigation({ });
    // Mark first element with dropdown as being expanded
    const firstNavItemWithDropdown = document.querySelector('.feds-navLink--hoverCaret');
    firstNavItemWithDropdown.setAttribute('aria-expanded', true);
    // Call method to close all dropdown menus
    closeAllDropdowns();
    // Expect aria-expanded value to have been reset
    expect(document.querySelectorAll('[aria-expanded="true"]').length).to.equal(0);
  });

  it('closeAllDropdowns doesn\'t close items with the "fedsPreventautoclose" attribute', async () => {
    // Build navigation
    await createFullGlobalNavigation({ });
    // Get first two elements with a dropdown and expand them
    const itemsWithDropdown = document.querySelectorAll('.feds-navLink--hoverCaret');
    const [firstNavItemWithDropdown, secondNavItemWithDropdown] = itemsWithDropdown;
    firstNavItemWithDropdown.setAttribute('aria-expanded', true);
    secondNavItemWithDropdown.setAttribute('aria-expanded', true);
    // Set the "data-feds-preventautoclose" attribute on the first item with a dropdown
    firstNavItemWithDropdown.setAttribute('data-feds-preventautoclose', '');
    // Expect that two dropdowns are expanded
    expect(document.querySelectorAll('[aria-expanded="true"]').length).to.equal(2);
    // Call method to close all dropdown menus
    closeAllDropdowns();
    // Expect aria-expanded value to not have been reset for the first item with a dropdown
    expect(firstNavItemWithDropdown.hasAttribute('aria-expanded')).to.be.true;
    expect(document.querySelectorAll('[aria-expanded="true"]').length).to.equal(1);
  });

  it('trigger manages the aria-expanded state of a global-navigation element', async () => {
    // Build navigation
    await createFullGlobalNavigation({ });
    // Get first element with a dropdown
    const element = document.querySelector('.feds-navLink--hoverCaret');
    // Calling 'trigger' should open the element
    expect(trigger({ element })).to.equal(true);
    expect(element.getAttribute('aria-expanded')).to.equal('true');
    // Calling 'trigger' again should close the element
    expect(trigger({ element })).to.equal(false);
    expect(element.getAttribute('aria-expanded')).to.equal('false');
  });

  it('getExperienceName defaults to imsClientId', () => {
    const experienceName = getExperienceName();
    expect(experienceName).to.equal(config.imsClientId);
  });

  it('getExperienceName replaces default experience name with client ID', () => {
    // If the experience name is the default one (gnav), the imsClientId should be used instead
    const gnavSourceMeta = toFragment`<meta name="gnav-source" content="http://localhost:2000/ch_de/libs/feds/gnav">`;
    document.head.append(gnavSourceMeta);
    let experienceName = getExperienceName();
    expect(experienceName).to.equal(config.imsClientId);
    // If the experience name is not the default one, the custom name should be used
    gnavSourceMeta.setAttribute('content', 'http://localhost:2000/ch_de/libs/feds/custom-gnav');
    experienceName = getExperienceName();
    expect(experienceName).to.equal('custom-gnav');
    gnavSourceMeta.remove();
  });

  it('getExperienceName is empty if no imsClientId is defined', () => {
    const ogImsClientId = config.imsClientId;
    delete config.imsClientId;
    setConfig(config);
    const experienceName = getExperienceName();
    expect(experienceName).to.equal('');
    config.imsClientId = ogImsClientId;
    setConfig(config);
  });

  describe('LANA logs', () => {
    it('should send LANA log on error', async () => {
      // Mock the global window.lana.log method
      const originalLanaLog = window.lana.log;
      const lanaLogSpy = sinon.spy();
      window.lana.log = lanaLogSpy;

      // The function that will throw an error.
      const erroneousFunction = async () => {
        throw new Error('error');
      };

      // Call logErrorFor.
      await logErrorFor(erroneousFunction, 'message', 'someTags');

      // Check if lanaLog (through window.lana.log) was called with expected parameters.
      expect(lanaLogSpy.calledOnce).to.be.true;

      // Restore the original window.lana.log method
      window.lana.log = originalLanaLog;
    });
  });

  describe('getFederatedUrl', () => {
    it('should return the url if its not federated', () => {
      expect(getFederatedUrl('https://adobe.com/foo-fragment.html')).to.equal(
        'https://adobe.com/foo-fragment.html',
      );

      expect(getFederatedUrl('/foo-fragment.html')).to.equal(
        '/foo-fragment.html',
      );

      expect(getFederatedUrl('/lu_de/foo-fragment.html')).to.equal(
        '/lu_de/foo-fragment.html',
      );
    });

    it('should return the federated url', () => {
      expect(
        getFederatedUrl('https://adobe.com/federal/foo-fragment.html'),
      ).to.equal(
        'https://main--federal--adobecom.hlx.page/federal/foo-fragment.html',
      );
      expect(
        getFederatedUrl('https://adobe.com/lu_de/federal/gnav/foofooter.html'),
      ).to.equal(
        'https://main--federal--adobecom.hlx.page/lu_de/federal/gnav/foofooter.html',
      );
    });

    it('should return the federated url for a relative link', () => {
      expect(
        getFederatedUrl('/federal/foo-fragment.html'),
      ).to.equal(
        'https://main--federal--adobecom.hlx.page/federal/foo-fragment.html',
      );
    });

    it('should return the federated url for a relative link including hashes and search params', () => {
      expect(
        getFederatedUrl('/federal/foo-fragment.html?foo=bar#test'),
      ).to.equal(
        'https://main--federal--adobecom.hlx.page/federal/foo-fragment.html?foo=bar#test',
      );
    });

    it('should return the url for invalid urls', () => {
      expect(getFederatedUrl('en-US/federal/')).to.equal('en-US/federal/');
      expect(getFederatedUrl(null)).to.equal(null);
      expect(getFederatedUrl(123121)).to.equal(123121);
    });
  });
});
