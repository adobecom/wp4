/* eslint import/no-relative-packages: 0 */
import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { stub, useFakeTimers, restore, spy } from 'sinon';
import loadBlock from '../../libs/navigation/bootstrapper.js';
import fetchedFooter from '../blocks/global-footer/mocks/fetched-footer.js';
import placeholders from '../blocks/global-navigation/mocks/placeholders.js';
import { setConfig } from '../../libs/utils/utils.js';
import { mockRes } from '../blocks/global-navigation/test-utilities.js';

const blockConfig = {
  footer: {
    name: 'global-footer',
    targetEl: 'footer',
    appendType: 'append',
  },
  header: {
    name: 'global-navigation',
    targetEl: 'header',
    appendType: 'prepend',
    unav: { unavComponents: 'profile' },
  },
};

const miloLibs = 'http://localhost:2000/libs';

describe('Bootstrapper', async () => {
  let openMessagingWindowSpy;
  beforeEach(async () => {
    document.body.innerHTML = await readFile({ path: './mocks/body.html' });
    stub(window, 'fetch').callsFake(async (url) => {
      if (url.includes('/footer')) {
        return mockRes({
          payload: fetchedFooter(
            { regionPickerHash: '/fragments/regions#langnav' },
          ),
        });
      }
      if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
      if (url.includes('/footer.plain.html')) return mockRes({ payload: await readFile({ path: '../blocks/region-nav/mocks/regions.html' }) });
      if (url.includes('/gnav.plain.html')) return mockRes({ payload: await readFile({ path: './mocks/gnav.html' }) });

      return null;
    });
    window.AdobeMessagingExperienceClient = window.AdobeMessagingExperienceClient
      || {
        openMessagingWindow: () => {},
        isAdobeMessagingClientInitialized: () => {},
        getMessagingExperienceState: () => {},
      };
    openMessagingWindowSpy = spy(window.AdobeMessagingExperienceClient, 'openMessagingWindow');
    setConfig({ miloLibs, contentRoot: '/federal/dev' });
  });

  afterEach(() => {
    document.body.innerHTML = '';
    restore();
  });

  it('Renders the footer block', async () => {
    const { default: init } = await import('../../libs/blocks/global-footer/global-footer.js');
    await loadBlock(init, blockConfig.footer);
    const clock = useFakeTimers({
      toFake: ['setTimeout'],
      shouldAdvanceTime: true,
    });
    clock.tick(3000);
    const el = document.getElementsByTagName('footer');
    expect(el).to.exist;
  });

  it('Renders the header block', async () => {
    const { default: init } = await import('../../libs/blocks/global-navigation/global-navigation.js');
    await loadBlock(init, blockConfig.header);
    const el = document.getElementsByTagName('header');
    expect(el).to.exist;
  });

  it('Renders the header with full width', async () => {
    blockConfig.header.layout = 'fullWidth';
    const { default: init } = await import('../../libs/blocks/global-navigation/global-navigation.js');
    await loadBlock(init, blockConfig.header);
    const el = document.querySelector('header');
    expect(el.classList.contains('feds--full-width')).to.be.true;
  });

  it('Renders the header with no border bottom', async () => {
    blockConfig.header.noBorder = true;
    const { default: init } = await import('../../libs/blocks/global-navigation/global-navigation.js');
    await loadBlock(init, blockConfig.header);
    const el = document.querySelector('header');
    expect(el.classList.contains('feds--no-border')).to.be.true;
  });

  it('Renders the localnav', async () => {
    blockConfig.header.isLocalNav = true;
    blockConfig.header.mobileGnavV2 = true;
    const { default: init } = await import('../../libs/blocks/global-navigation/global-navigation.js');
    await loadBlock(init, blockConfig.header);
    const el = document.querySelector('header');
    expect(el.nextElementSibling.classList.contains('feds-localnav')).to.be.true;
  });

  it('should call openMessagingWindow when click on jarvis enabled button', async () => {
    blockConfig.header.jarvis = { id: '1.1' };
    stub(window.AdobeMessagingExperienceClient, 'isAdobeMessagingClientInitialized').returns(true);
    stub(window.AdobeMessagingExperienceClient, 'getMessagingExperienceState').returns({ windowState: 'hidden' });
    const { default: init } = await import('../../libs/blocks/global-navigation/global-navigation.js');
    await loadBlock(init, blockConfig.header);
    const el = document.querySelector('.feds-cta[href*="#open-jarvis-chat"]');
    const event = new CustomEvent('click', { bubbles: true });
    el.dispatchEvent(event);
    expect(openMessagingWindowSpy.called).to.be.true;
  });

  it('should not call openMessagingWindow when chat dialog is already open', async () => {
    stub(window.AdobeMessagingExperienceClient, 'isAdobeMessagingClientInitialized').returns(true);
    stub(window.AdobeMessagingExperienceClient, 'getMessagingExperienceState').returns({ windowState: 'docked' });
    const { default: init } = await import('../../libs/blocks/global-navigation/global-navigation.js');
    await loadBlock(init, blockConfig.header);
    const el = document.querySelector('.feds-cta[href*="#open-jarvis-chat"]');
    const event = new CustomEvent('click', { bubbles: true });
    el.dispatchEvent(event);
    expect(openMessagingWindowSpy.called).to.be.false;
  });
});
