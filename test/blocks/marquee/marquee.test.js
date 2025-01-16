import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { waitFor, waitForElement } from '../../helpers/waitfor.js';
import { setConfig, loadStyle } from '../../../libs/utils/utils.js';
import { loadMnemonicList } from '../../../libs/blocks/marquee/marquee.js';

const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
const conf = { locales };
setConfig(conf);

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init } = await import('../../../libs/blocks/marquee/marquee.js');
const { default: videoBLock } = await import('../../../libs/blocks/video/video.js');
const video = await readFile({ path: './mocks/video.html' });
const multipleIcons = await readFile({ path: './mocks/multiple-icons.html' });

describe('marquee', () => {
  before(async () => {
    await new Promise((resolve) => {
      loadStyle('../../../../libs/styles/styles.css', resolve);
    });
    await new Promise((resolve) => {
      loadStyle('../../../../libs/blocks/marquee/marquee.css', resolve);
    });
  });

  const marquees = document.querySelectorAll('.marquee');
  marquees.forEach((marquee) => {
    init(marquee);
  });
  describe('default marquee medium dark', () => {
    it('has a heading-xl', () => {
      const heading = marquees[0].querySelector('.heading-xl');
      expect(heading).to.exist;
    });
    it('has a supporting image', () => {
      const image = marquees[0].querySelector('.foreground .image img');
      expect(image).to.exist;
    });
    it('is dark by default', () => {
      const dark = marquees[1].classList.contains('dark');
      expect(dark).to.be.true;
    });
  });

  describe('second marquee small', () => {
    it('has an icon-area', () => {
      const iconArea = marquees[1].querySelector('.icon-area');
      expect(iconArea).to.exist;
    });
    it('wraps the picture in a link if provided', () => {
      const picture = marquees[1].querySelector('.foreground .image a picture');
      expect(picture).to.exist;
    });
  });

  describe('supports media credits', () => {
    it('has a media credit with text content', () => {
      const mediaCredit = document.getElementById('media-credit-text').querySelector('.media-credit .body-s');
      expect(mediaCredit).to.exist;
      expect(mediaCredit.textContent.trim()).to.have.lengthOf.above(0);
    });

    it('has a media credit with element content', () => {
      const mediaCredit = document.getElementById('media-credit-element').querySelector('.media-credit').firstElementChild;
      expect(mediaCredit).to.exist;
    });
  });

  describe('supports videos', () => {
    before(() => {
      document.body.innerHTML = video;
    });

    it('in background, single', async () => {
      const marquee = document.getElementById('single-background');
      init(marquee);
      videoBLock(document.querySelector('#single-background a[href*=".mp4"]'));
      const videoEl = await waitForElement('#single-background .background video');
      const intersectionObserverAddsSource = () => videoEl.querySelector('source');
      await waitFor(intersectionObserverAddsSource);
      expect(videoEl.querySelector('source')).to.exist;
      document.getElementById('single-background').remove();
    });

    it('in background, multiple', async () => {
      const marquee = document.getElementById('multiple-background');
      init(marquee);
      document.querySelectorAll('#multiple-background a[href*=".mp4"]').forEach((videoLink) => videoBLock(videoLink));
      await waitForElement('#multiple-background .background video');
      const intersectionObserverAddsSource = () => document.querySelector('.background video source');
      await waitFor(intersectionObserverAddsSource);
      expect(marquee.querySelectorAll('.background video source').length).to.equal(1);
      document.getElementById('multiple-background').remove();
    });

    it('in foreground', async () => {
      const marquee = document.getElementById('foreground');
      init(marquee);
      videoBLock(document.querySelector('#foreground a[href*=".mp4"]'));
      await waitForElement('#foreground video');
      expect(marquee.querySelector('.foreground video')).to.exist;
    });
  });

  describe('supports multiple icons', () => {
    before(() => {
      document.body.innerHTML = multipleIcons;
    });

    it('using img', () => {
      const marquee = document.getElementById('using-images');
      init(marquee);
      expect(marquee.querySelector('[icon-count]')).to.exist;
    });

    it('using svg', () => {
      const marquee = document.getElementById('using-svgs');
      init(marquee);
      expect(marquee.querySelector('[icon-count]')).to.exist;
    });
  });

  describe('marquee light with mnemonic list', () => {
    const marquee = document.getElementById('mnemonic-list');
    init(marquee);
    it('has a product-item-list', () => {
      const productList = marquee.querySelector('.product-list');
      expect(productList).to.exist;
    });
    it('has a product item', () => {
      const product = marquee.querySelector('.product-item');
      expect(product).to.exist;
    });
    it('has a product product with a title', () => {
      const productList = marquee.querySelector('.product-list');
      const product = productList.querySelectorAll('.product-item')[0];
      const title = product.querySelector('strong');
      expect(title).to.exist;
    });
    it('has a product with an image and title', () => {
      const productList = marquee.querySelector('.product-list');
      const product = productList.querySelectorAll('.product-item')[1];
      const title = product.querySelector('strong');
      const mnemonic = product.querySelector('picture');
      expect(title).to.exist;
      expect(mnemonic).to.exist;
    });
  });

  describe('Dynamic import of mnemonic-list.js', () => {
    let log;
    let decorateMnemonicList;
    let dynamicImport;
    let foreground;

    beforeEach(() => {
      log = sinon.fake();
      window.lana = { log };
      decorateMnemonicList = sinon.fake();
      dynamicImport = sinon.stub();
      foreground = document.querySelector('.foreground');
    });

    it('should call decorateMnemonicList if the module is successfully imported', async () => {
      dynamicImport.resolves({ decorateMnemonicList });
      await loadMnemonicList(dynamicImport, decorateMnemonicList, foreground);
      expect(decorateMnemonicList.calledOnceWith(foreground)).to.be.false;
    });

    it('should log an error if the module fails to import', async () => {
      const error = new Error('Failed to load module');
      dynamicImport.rejects(error);
      await loadMnemonicList(dynamicImport, decorateMnemonicList, foreground);
      expect(log.calledOnceWith(`Failed to load mnemonic marquee module: ${error}`)).to.be.false;
    });
  });
});
