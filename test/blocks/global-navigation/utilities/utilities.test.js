import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import {
  fetchAndProcessPlainHtml,
  toFragment,
  federatePictureSources,
  getAnalyticsValue,
  decorateCta,
  hasActiveLink,
  setActiveLink,
  getActiveLink,
  closeAllDropdowns,
  trigger,
  getExperienceName,
  logErrorFor,
  takeWhile,
  dropWhile,
  getGnavHeight,
} from '../../../../libs/blocks/global-navigation/utilities/utilities.js';
import { setConfig, getConfig } from '../../../../libs/utils/utils.js';
import { createFullGlobalNavigation, config } from '../test-utilities.js';
import mepInBlock from '../mocks/mep-config.js';
import { getFedsPlaceholderConfig } from '../../../../libs/utils/federated.js';

const baseHost = 'https://main--federal--adobecom.aem.page';
describe('global navigation utilities', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  it('fetchAndProcessPlainHtml with MEP', () => {
    expect(fetchAndProcessPlainHtml).to.exist;
    const mepConfig = getConfig();
    mepConfig.mep = mepInBlock;
    fetchAndProcessPlainHtml({ url: '/old/navigation' }).then((fragment) => {
      const inNewMenu = fragment.querySelector('#only-in-new-menu');
      expect(inNewMenu).to.exist;
      const newMenu = fragment.querySelector('a[href*="mep-large-menu-table"]');
      expect(newMenu).to.exist;
    });
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

  describe('federatePictureSources', () => {
    // The test scenarios tests decorated or non decorated links.
    // https://adobe.com/media.png
    // https://adobe.com/federal/media.png
    // https://adobe.com/ch_de/federal/globalnav/media.png
    // ./foo.png
    // ./federal/foo.png
    // ./ch_de/federal/globalnav/foo.png
    const getImageTemplate = ({ host = '', path = '', locale = '' }) => toFragment`<picture>
    <source
      type="image/webp"
      srcset="${host}${locale}${path}"
      media="(min-width: 600px)"/>
    <source
      type="image/webp"
      srcset="${host}${locale}${path}"/>
    <source
      type="image/png"
      srcset="${host}${locale}${path}"
      media="(min-width: 600px)"/>
    <img
      loading="lazy"
      alt=""
      type="image/png"
      src="${host}${locale}${path}"/>
  </picture>`;
    const verifyImageTemplate = ({ host = '', path = '', locale = '', template }) => {
      template.querySelectorAll('source, img').forEach((source) => {
        const attr = source.hasAttribute('src') ? 'src' : 'srcset';
        expect(source.getAttribute(attr)).to.equal(`${host}${locale}${path}`);
      });
    };

    it('shouldnt change non-federal absolute sources', async () => {
      const template = getImageTemplate({
        host: 'https://adobe.com',
        path: '/test/path/federal/media.png',
      });
      federatePictureSources({ section: template });
      verifyImageTemplate({
        host: 'https://adobe.com',
        path: '/test/path/federal/media.png',
        template,
      });
    });

    it('shouldnt change non-federal absolute localized sources', async () => {
      const localeUrlsTemplate = getImageTemplate({
        host: 'https://adobe.com',
        path: '/test/federal/media.png',
        locale: '/ch_de',
      });
      federatePictureSources({ section: localeUrlsTemplate });
      verifyImageTemplate({
        host: 'https://adobe.com',
        path: '/test/federal/media.png',
        locale: '/ch_de',
        template: localeUrlsTemplate,
      });
    });

    it('should change federal absolute sources', async () => {
      const template = getImageTemplate({
        host: 'https://adobe.com',
        path: '/federal/media.png',
      });
      federatePictureSources({ section: template });
      verifyImageTemplate({
        host: baseHost,
        path: '/federal/media.png',
        template,
      });
    });

    it('should change federal absolute localized sources', async () => {
      const template = getImageTemplate({
        host: 'https://adobe.com',
        path: '/federal/media.png',
        locale: '/ch_de',
      });
      federatePictureSources({ section: template });
      verifyImageTemplate({
        host: baseHost,
        path: '/federal/media.png',
        locale: '/ch_de',
        template,
      });
    });

    it('shouldnt change non-federal relative sources', async () => {
      const template = getImageTemplate({
        host: '.',
        path: '/test/path/federal/media.png',
      });
      federatePictureSources({ section: template });
      verifyImageTemplate({
        host: '.',
        path: '/test/path/federal/media.png',
        template,
      });
    });

    it('shouldnt change non-federal relative localized sources', async () => {
      const localeUrlsTemplate = getImageTemplate({
        host: '.',
        path: '/test/federal/media.png',
        locale: '/ch_de',
      });
      federatePictureSources({ section: localeUrlsTemplate });
      verifyImageTemplate({
        host: '.',
        path: '/test/federal/media.png',
        locale: '/ch_de',
        template: localeUrlsTemplate,
      });
    });

    it('should change federal relative sources', async () => {
      const template = getImageTemplate({
        host: '.',
        path: '/federal/media.png',
      });
      federatePictureSources({ section: template });
      verifyImageTemplate({
        host: baseHost,
        path: '/federal/media.png',
        template,
      });
    });

    it('should change federal relative localized sources', async () => {
      const template = getImageTemplate({
        host: '.',
        path: '/federal/media.png',
        locale: '/ch_de',
      });
      federatePictureSources({ section: template });
      verifyImageTemplate({
        host: baseHost,
        path: '/federal/media.png',
        locale: '/ch_de',
        template,
      });
    });

    it('should allow to force picture federation to /federal/media.png', async () => {
      const template = getImageTemplate({
        host: '.',
        path: '/media.png',
      });
      federatePictureSources({ section: template, forceFederate: true });
      verifyImageTemplate({
        host: baseHost,
        path: '/federal/media.png',
        template,
      });
    });
  });

  // No tests for using the the live url and .aem. urls
  // as mocking window.location.origin is not possible
  describe('getFedsPlaceholderConfig', () => {
    it('should return contentRoot for localhost', () => {
      const locale = { locale: { ietf: 'en-US', prefix: '' } };
      setConfig({ ...config, ...locale });
      const placeholderConfig = { useCache: false };
      const { locale: { ietf, prefix, contentRoot } } = getFedsPlaceholderConfig(placeholderConfig);
      expect(ietf).to.equal('en-US');
      expect(prefix).to.equal('');
      expect(contentRoot).to.equal(`${baseHost}/federal/globalnav`);
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
      expect(contentRoot).to.equal(`${baseHost}/fi/federal/globalnav`);
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
      const currentState = hasActiveLink() || false;
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

  describe('takeWhile functionality', () => {
    it('should take elements from the array while the predicate returns true', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = sinon.stub();
      predicate.withArgs(1).returns(true);
      predicate.withArgs(2).returns(true);
      predicate.withArgs(3).returns(false);

      const result = takeWhile(array, predicate);

      expect(result).to.deep.equal([1, 2]);
      expect(predicate.callCount).to.equal(3);
      expect(predicate.firstCall.args[0]).to.equal(1);
      expect(predicate.secondCall.args[0]).to.equal(2);
      expect(predicate.thirdCall.args[0]).to.equal(3);
    });

    it('should return an empty array if the predicate returns false for the first element', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = sinon.stub();
      predicate.withArgs(1).returns(false);

      const result = takeWhile(array, predicate);

      expect(result).to.deep.equal([]);
      expect(predicate.callCount).to.equal(1);
      expect(predicate.firstCall.args[0]).to.equal(1);
    });

    it('should return the entire array if the predicate always returns true', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = sinon.stub().returns(true);

      const result = takeWhile(array, predicate);

      expect(result).to.deep.equal(array);
      expect(predicate.callCount).to.equal(array.length);
      array.forEach((value, index) => {
        expect(predicate.getCall(index).args[0]).to.equal(value);
      });
    });
  });

  describe('dropWhile functionality', () => {
    it('should drop elements from the array while the predicate returns true', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = sinon.stub();
      predicate.withArgs(1).returns(true);
      predicate.withArgs(2).returns(true);
      predicate.withArgs(3).returns(false);
      const result = dropWhile(array, predicate);
      expect(result).to.deep.equal([3, 4, 5]);
      expect(predicate.callCount).to.equal(3);
      expect(predicate.firstCall.args[0]).to.equal(1);
      expect(predicate.secondCall.args[0]).to.equal(2);
      expect(predicate.thirdCall.args[0]).to.equal(3);
    });

    it('should return an empty array if the predicate returns true for all elements', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = sinon.stub().returns(true);
      const result = dropWhile(array, predicate);
      expect(result).to.deep.equal([]);
      expect(predicate.callCount).to.equal(array.length);
      array.forEach((value, index) => {
        expect(predicate.getCall(index).args[0]).to.equal(value);
      });
    });

    it('should return the original array if the predicate returns false for the first element', () => {
      const array = [1, 2, 3, 4, 5];
      const predicate = sinon.stub().returns(false);
      const result = dropWhile(array, predicate);
      expect(result).to.deep.equal(array);
      expect(predicate.callCount).to.equal(1);
      expect(predicate.firstCall.args[0]).to.equal(1);
    });

    it('should handle an empty array gracefully', () => {
      const array = [];
      const predicate = sinon.stub().returns(true);
      const result = dropWhile(array, predicate);
      expect(result).to.deep.equal([]);
      expect(predicate.callCount).to.equal(0);
    });

    it('should give correct top height when localnav is present', () => {
      const gnavSourceMeta = toFragment`<meta name="gnav-source" content="http://localhost:2000/ch_de/libs/feds/localnav-gnav">`;
      const enableMobileGnav = toFragment`<meta name="mobile-gnav-v2" content="on">`;
      document.head.append(gnavSourceMeta, enableMobileGnav);
      const gnav = toFragment`<header class="global-navigation"></header>`;
      const lnav = toFragment`<div class="feds-localnav"></div>`;
      document.body.append(gnav, lnav);
      const gnavHeight = getGnavHeight();
      expect(gnavHeight).to.equal(40);
    });
  });
});
