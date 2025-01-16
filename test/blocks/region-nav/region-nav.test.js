import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { setConfig, getConfig, createTag } from '../../../libs/utils/utils.js';

import init, { decorateLink } from '../../../libs/blocks/region-nav/region-nav.js';

document.body.innerHTML = await readFile({ path: './mocks/regions.html' });

setConfig({ });

const getCookie = (name) => document.cookie
  .split('; ')
  .find((row) => row.startsWith(`${name}=`))
  ?.split('=')[1];

describe('Region Nav Block', () => {
  const block = document.body.querySelector('.region-nav');
  init(block);
  let clock;

  beforeEach(async () => {
    clock = sinon.useFakeTimers({
      toFake: ['setTimeout'],
      shouldAdvanceTime: true,
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('sets links correctly', () => {
    const { contentRoot } = getConfig().locale;
    window.location.hash = 'langnav';
    const path = window.location.href.replace(`${contentRoot}`, '').replace('#langnav', '');
    const links = document.body.querySelectorAll('a');
    expect(links[0].href).to.be.equal(`${origin}/ar${path}`);
    expect(links[links.length - 1].href).to.be.equal(`${origin}/kr${path}`);
  });

  it('handles mouseover event for 200 pages', async () => {
    sinon.stub(window, 'fetch').callsFake(() => new Promise((resolve) => {
      resolve({
        status: 200,
        ok: true,
      });
    }));
    sinon.stub(Element.prototype, 'matches').callsFake(() => true);
    const mouseoverEvent = new Event('mouseover');

    const auLink = document.querySelector('a[href*="/au/"]');
    const auLinkHref = auLink.href;
    auLink.dispatchEvent(mouseoverEvent);
    await clock.runAllAsync();
    expect(auLink.href).to.equal(auLinkHref);
  });

  it('handles mouseover event for 404 pages', async () => {
    sinon.stub(window, 'fetch').callsFake(() => new Promise((resolve) => {
      resolve({
        status: 404,
        ok: false,
      });
    }));
    sinon.stub(Element.prototype, 'matches').callsFake(() => true);
    const mouseoverEvent = new Event('mouseover');

    const brLink = document.querySelector('a[href*="/br/"]');
    brLink.dispatchEvent(mouseoverEvent);
    await clock.runAllAsync();
    expect(brLink.href).to.equal(`${origin}/br/`);
  });

  it('handles click event for 200 pages', async () => {
    sinon.stub(window, 'fetch').callsFake(() => new Promise((resolve) => {
      resolve({
        status: 200,
        ok: true,
      });
    }));
    sinon.stub(window, 'open').callsFake(() => {});

    const chdePrefix = 'ch_de';
    const chdeLink = document.querySelector(`a[href*="/${chdePrefix}/"]`);
    chdeLink.click();
    await clock.runAllAsync();
    expect(window.open.calledWith(chdeLink.href)).to.be.true;
    expect(getCookie('international')).to.equal(chdePrefix);
  });

  it('handles click event for 404 pages', async () => {
    sinon.stub(window, 'fetch').callsFake(() => new Promise((resolve) => {
      resolve({
        status: 404,
        ok: false,
      });
    }));
    sinon.stub(window, 'open').callsFake(() => {});

    const chfrPrefix = '/ch_fr/';
    const chfrLink = document.querySelector(`a[href*="${chfrPrefix}"]`);
    chfrLink.click();
    await clock.runAllAsync();
    expect(window.open.calledWith(chfrPrefix)).to.be.true;
  });

  it('replaces the prefix with the mapped value when prefix is NOT in locales but is in languageMap', () => {
    setConfig({
      languageMap: {
        ar: 'es',
        at: 'de',
      },
      locales: {
        '': { ietf: 'en-US', tk: 'hah7vzn.css' },
        africa: { ietf: 'en', tk: 'hah7vzn.css' },
        // Notice we do NOT include 'ar' or 'at' here so that prefix is considered "not in locales".
      },
    });

    const link = createTag('a', { href: 'https://adobe.com/ar/' });
    decorateLink(link, '/path/to/some/page');

    // Assert that the href has been transformed from '/ar/' to '/es/' due to languageMap
    expect(link.href).to.equal('https://adobe.com/es/path/to/some/page');
  });

  it('removes the prefix when prefix is NOT in locales and has an empty mapping in languageMap', () => {
    setConfig({
      languageMap: {
        ae_ar: '',
        ae_en: '',
        africa: '',
        ar: '',
      },
      locales: { '': { ietf: 'en-US', tk: 'hah7vzn.css' } },
    });

    const link = createTag('a', { href: 'https://adobe.com/ar/' });
    decorateLink(link, '/some-page');

    // Because `ar` is mapped to an empty string, the code replaces `"/ar"` with `""`
    expect(link.href).to.equal('https://adobe.com/some-page');
  });

  it('does NOT modify href if prefix is in locales (even if present in languageMap)', () => {
    setConfig({
      languageMap: { ar: 'es' },
      locales: { '': { ietf: 'en-US', tk: 'hah7vzn.css' }, ar: { ietf: 'ar', tk: 'lpk1hwn.css', dir: 'rtl' } }, // Now "ar" is a valid locale
    });

    const link = createTag('a', { href: 'https://adobe.com/ar/some-page' });
    decorateLink(link, '');

    // Since 'ar' is in locales, we should NOT transform
    expect(link.href).to.equal('https://adobe.com/ar/some-page');
  });

  it('does nothing if no languageMap is defined', () => {
    setConfig({ });

    const link = createTag('a', { href: 'https://adobe.com/ar/some-page' });
    decorateLink(link, '');

    // No languageMap means no transformation
    expect(link.href).to.equal('https://adobe.com/ar/some-page');
  });
});
