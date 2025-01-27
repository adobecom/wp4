import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { waitForElement } from '../../helpers/waitfor.js';
import { setConfig } from '../../../libs/utils/utils.js';

const { default: init } = await import('../../../libs/blocks/aside/aside.js');
const standardBody = await readFile({ path: './mocks/standard.html' });
const splitBody = await readFile({ path: './mocks/split.html' });
const conf = { miloLibs: 'http://localhost:2000/libs' };

setConfig(conf);

describe('aside', () => {
  describe('standard', () => {
    before(() => {
      document.body.innerHTML = standardBody;
      const blocks = document.querySelectorAll('.aside');
      blocks.forEach((el) => init(el));
    });

    it('allows a background color', async () => {
      const el = await waitForElement('#test-default');
      expect(window.getComputedStyle(el)?.backgroundColor).to.be.oneOf(['rgb(249, 249, 249)', 'rgb(238, 238, 238)']);
    });

    it('allows a background image', async () => {
      const el = await waitForElement('#test-default-2 .background img');
      expect(el).to.exist;
    });

    it('allows an icon image', async () => {
      const el = await waitForElement('#test-default .icon-area img');
      expect(el).to.exist;
    });

    it('has Detail M by default', async () => {
      const el = await waitForElement('#test-default .detail-m');
      expect(el).to.exist;
    });

    it('has Heading XL by default', async () => {
      const el = await waitForElement('#test-default .heading-xl');
      expect(el).to.exist;
    });

    it('has Body S by default', async () => {
      const el = await waitForElement('#test-default p.body-s');
      expect(el).to.exist;
    });

    it('allows a cta', async () => {
      const el = await waitForElement('#test-default .action-area .con-button');
      expect(el).to.exist;
    });

    it('allows supplemental text', async () => {
      const el = await waitForElement('#test-default .supplemental-text');
      expect(el).to.exist;
    });

    it('allows a foreground image', async () => {
      const el = await waitForElement('#test-default .foreground .image img');
      expect(el).to.exist;
    });

    it('allows text overrides', async () => {
      const el = await waitForElement('#test-text-overrides');
      expect(el.querySelector('.detail-l')).to.exist;
      expect(el.querySelector('.heading-l')).to.exist;
      expect(el.querySelector('p.body-m')).to.exist;
    });

    it('allows Title L to override Detail', async () => {
      const el = await waitForElement('#test-title .detail-m.title-l');
      expect(el).to.exist;
    });

    it('allows an avatar', async () => {
      const el = await waitForElement('#test-avatar .avatar-area img');
      expect(el).to.exist;
    });

    it('allows a product lockup', async () => {
      const el = await waitForElement('#test-lockup .lockup-area img');
      expect(el).to.exist;
    });
  });

  describe('split', () => {
    before(() => {
      document.body.innerHTML = splitBody;
      const blocks = document.querySelectorAll('.aside');
      blocks.forEach((el) => init(el));
    });

    it('allows a background color', async () => {
      const el = await waitForElement('#test-default');
      expect(window.getComputedStyle(el)?.backgroundColor).to.equal('rgb(30, 30, 30)');
    });

    it('allows an icon image', async () => {
      const el = await waitForElement('#test-default .icon-area img');
      expect(el).to.exist;
    });

    it('has Detail M by default', async () => {
      const el = await waitForElement('#test-default .detail-m');
      expect(el).to.exist;
    });

    it('has Heading XL by default', async () => {
      const el = await waitForElement('#test-default .heading-xl');
      expect(el).to.exist;
    });

    it('has Body S by default', async () => {
      const el = await waitForElement('#test-default p.body-s');
      expect(el).to.exist;
    });

    it('allows icon stack', async () => {
      const el = await waitForElement('#test-default .icon-stack-area');
      expect(el).to.exist;
    });

    it('allows a cta', async () => {
      const el = await waitForElement('#test-default .action-area .con-button');
      expect(el).to.exist;
    });

    it('allows supplemental text', async () => {
      const el = await waitForElement('#test-default .supplemental-text');
      expect(el).to.exist;
    });

    it('allows a split image', async () => {
      const el = await waitForElement('#test-default .split-image img');
      expect(el).to.exist;
    });

    it('allows text overrides', async () => {
      const el = await waitForElement('#test-text-overrides');
      expect(el.querySelector('.detail-l')).to.exist;
      expect(el.querySelector('.heading-l')).to.exist;
      expect(el.querySelector('p.body-m')).to.exist;
    });

    it('allows Title L to override Detail', async () => {
      const el = await waitForElement('#test-title .detail-m.title-l');
      expect(el).to.exist;
    });

    it('allows an avatar', async () => {
      const el = await waitForElement('#test-avatar .avatar-area img');
      expect(el).to.exist;
    });

    it('allows a product lockup', async () => {
      const el = await waitForElement('#test-lockup .lockup-area img');
      expect(el).to.exist;
    });
  });
});
