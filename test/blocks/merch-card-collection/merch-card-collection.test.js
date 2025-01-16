import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { setConfig } from '../../../libs/utils/utils.js';

// eslint-disable-next-line no-promise-executor-return
const delay = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
const conf = { locales, miloLibs: '/libs' };
setConfig(conf);

const getVisibleCards = (merchCards) => [...merchCards.querySelectorAll('merch-card')]
  .filter((merchCard) => merchCard.style.display !== 'none')
  .sort((a, b) => Number(a.style.order) - Number(b.style.order));

describe('Merch Cards', async () => {
  let init;
  let pageContent;
  let overrideThrowError = false;
  let overrideRespondError = false;
  let queryIndexRespondError = false;

  let cards = [];

  before(async () => {
    window.lana = { log: sinon.stub() };
    const originalFetch = window.fetch;
    window.fetch = sinon.stub(window, 'fetch').callsFake((url) => {
      let data;
      const overrideUrl = /override-(.*).plain.html/;
      const overrideMatch = overrideUrl.exec(url);
      const queryIndexMatch = /-cards(-preview)?.json/.test(url);
      if ((overrideMatch && overrideRespondError) || (queryIndexMatch && queryIndexRespondError)) {
        return Promise.resolve({
          status: 500,
          statusText: 'Internal Server Error',
          ok: false,
          json: () => Promise.resolve({}),
        });
      }
      if (overrideMatch) {
        if (overrideThrowError) {
          return Promise.reject(new Error('fetch error'));
        }
        return new Promise((resolve) => {
          originalFetch(new URL(`./mocks/${overrideMatch[1]}-override.html`, import.meta.url).href)
            .then((r) => {
              resolve({
                status: 200,
                statusText: '',
                ok: true,
                text: () => Promise.resolve(r.text()),
              });
            });
        });
      }
      if (queryIndexMatch) {
        data = {
          total: 0,
          offset: 0,
          limit: 0,
          data: cards,
        };
      }
      return Promise.resolve({
        status: 200,
        statusText: '',
        ok: true,
        json: () => Promise.resolve(data),
      });
    });
    ({ default: init } = await import('../../../libs/blocks/merch-card-collection/merch-card-collection.js'));
    // this allows to run the test in the normal browser.
    pageContent = await originalFetch(new URL('./mocks/merch-card-collection.html', import.meta.url).href).then((r) => r.text());
  });

  beforeEach(async () => {
    document.location.hash = '';
    cards = [];
    document.body.innerHTML = pageContent;
    overrideThrowError = false;
    overrideRespondError = false;
    queryIndexRespondError = false;
    window.lana.log.reset();
    setConfig(conf);
  });

  it('should require a type', async () => {
    const el = document.getElementById('default');
    const merchCards = await init(el);
    expect(merchCards.tagName).to.equal('DIV');
  });

  it('should set "all" as default filter', async () => {
    const el = document.getElementById('defaultFilter');
    const merchCards = await init(el);
    expect(merchCards.tagName).to.equal('MERCH-CARD-COLLECTION');
    expect(merchCards.getAttribute('filter')).to.equal('all');
  });

  it('should parse "filter", "show more text" and default "limit"', async () => {
    const el = document.getElementById('filterShowMoreText');
    const merchCards = await init(el);
    expect(merchCards.getAttribute('filter')).to.equal('all');
    expect(merchCards.getAttribute('limit')).to.equal('24');
  });

  it('should parse the "limit"', async () => {
    const el = document.getElementById('filterShowMoreTextLimit');
    const merchCards = await init(el);
    expect(merchCards.getAttribute('filter')).to.equal('all');
    expect(merchCards.getAttribute('limit')).to.equal('9');
  });

  it('should freeze the filter', async () => {
    const el = document.getElementById('onlyPhoto');
    cards = [...document.querySelectorAll('#cards .merch-card')]
      .map((merchCardEl) => ({ cardContent: merchCardEl.outerHTML })); // mock cards

    const merchCards = await init(el);
    expect(merchCards.getAttribute('filtered')).to.equal('photo');

    document.location.hash = '#filter=video';
    await delay();
    expect(merchCards.filter).to.equal('photo');
    expect(merchCards.filtered).to.equal('photo');

    const [photoshop, cc, express] = getVisibleCards(merchCards);
    expect(photoshop.name).to.be.equal('photoshop');
    expect(cc.name).to.be.equal('all-apps');
    expect(express.name).to.be.equal('express');
  });

  it('should parse multiple filters', async () => {
    const el = document.getElementById('multipleFilters');
    cards = [...document.querySelectorAll('#cards .merch-card')]
      .map((merchCardEl) => ({ cardContent: merchCardEl.outerHTML })); // mock cards

    const merchCards = await init(el);
    expect(merchCards.filter).to.equal('all');
    await delay(500);
    let [cc, photoshop, express] = getVisibleCards(merchCards);
    expect(cc.size).to.be.equal('super-wide');
    expect(photoshop.name).to.be.equal('photoshop');
    expect(cc.name).to.be.equal('all-apps');
    expect(express.name).to.be.equal('express');
    document.location.hash = '#filter=photo';
    await delay(500);
    ([photoshop, cc, express] = getVisibleCards(merchCards));
    expect(photoshop.name).to.be.equal('photoshop');
    expect(cc.name).to.be.equal('all-apps');
    expect(cc.size).to.undefined;
    expect(express.name).to.be.equal('express');
  });

  it('should parse literals', async () => {
    const merchCards = await init(document.getElementById('literals'));
    await delay(500);
    expect(merchCards.outerHTML).to.equal(merchCards.nextElementSibling.outerHTML);
  });

  it('should parse fragmented literals', async () => {
    const merchCards = await init(document.getElementById('fragmented-literals'));
    await delay(500);
    expect(merchCards.outerHTML).to.equal(merchCards.nextElementSibling.outerHTML);
  });

  it('should parse literals 4 translation too', async () => {
    const merchCards = await init(document.getElementById('literals-4-translation'));
    await delay(500);
    expect(merchCards.outerHTML).to.equal(merchCards.nextElementSibling.outerHTML);
  });

  it('should override cards when asked to', async () => {
    const el = document.getElementById('multipleFilters');
    setConfig({
      ...conf,
      mep: {
        preview: true,
        inBlock: {
          'merch-card-collection': {
            commands: [
              {
                action: 'replace',
                manifestId: 'promo1.json',
                content: '/override-photoshop',
              },
              {
                action: 'replace',
                manifestId: 'promo2.json',
                content: '/override-express',
              },
            ],
          },
        },
      },
    });
    cards = [...document.querySelectorAll('#cards .merch-card')]
      .map((merchCardEl) => ({ cardContent: merchCardEl.outerHTML })); // mock cards
    const merchCards = await init(el);
    expect(merchCards.filter).to.equal('all');
    await delay(500);
    const photoshop = merchCards.querySelector('merch-card[name="photoshop"]');
    const express = merchCards.querySelector('merch-card[name="express"]');
    expect(photoshop.title.indexOf('PROMOTION') > 0).to.be.true;
    expect(express.title.indexOf('PROMOTION') > 0).to.be.true;
    expect(merchCards.dataset.overrides).to.equal('promo1.json:/override-photoshop,promo2.json:/override-express');
  });

  it('should localize the query-index url', async () => {
    setConfig({
      ...conf,
      pathname: '/fr/test.html',
      locales: { fr: { ietf: 'fr-FR' } },
      prodDomains: ['main--milo--adobecom.hlx.live'],
    });
    const el = document.getElementById('localizeQueryIndex');
    await init(el);
    expect(window.fetch.calledWith('https://main--milo--adobecom.hlx.live/fr/query-index-cards.json?sheet=catalog')).to.be.true;
  });

  it('should use preview query-index url if stage env and not hlx.live', async () => {
    setConfig({
      ...conf,
      env: { name: 'stage' },
    });
    const el = document.getElementById('previewQueryIndex');
    await init(el);
    expect(window.fetch.calledWith('https://main--milo--adobecom.hlx.live/query-index-cards-preview.json?sheet=catalog')).to.be.true;
  });

  it('should default to prod index if preview is missing', async () => {
    setConfig({
      ...conf,
      env: { name: 'stage' },
    });
    const el = document.getElementById('previewQueryIndexMissing');
    await init(el);
    expect(window.fetch.calledWith('https://main--milo--adobecom.hlx.live/query-index-cards.json?sheet=catalog')).to.be.true;
  });

  describe('error handling', async () => {
    it('fails gracefully if no query-index endpoint is provided ', async () => {
      const el = document.getElementById('noQueryIndexEndpoint');
      await init(el);
      expect(el.innerHTML).to.equal('');
      expect(window.lana.log.calledOnce).to.be.true;
      expect(window.lana.log.calledWith('Failed to initialize merch cards: No query-index endpoint provided')).to.be.true;
    });

    it('fails gracefully if query-index fetch fails ', async () => {
      queryIndexRespondError = true;
      const el = document.getElementById('queryIndexFail');
      await init(el);
      expect(el.innerHTML).to.equal('');
      expect(window.lana.log.calledOnce).to.be.true;
      expect(window.lana.log.calledWith('Failed to initialize merch cards: Error: Internal Server Error')).to.be.true;
    });

    it('should handle fetch errors while retrieving override cards', async () => {
      overrideThrowError = true;
      cards = [...document.querySelectorAll('#cards .merch-card')]
        .map((merchCardEl) => ({ cardContent: merchCardEl.outerHTML })); // mock cards

      const el = document.getElementById('handleFetchError1');
      el.dataset.overrides = '/override-photoshop';
      const merchCards = await init(el);
      const photoshop = merchCards.querySelector('merch-card[name="photoshop"]');
      expect(photoshop.title).to.equal('Photoshop');
      expect(photoshop.title.indexOf('PROMOTION') > 0).to.be.false;
    });

    it('should handle errors while retrieving override cards', async () => {
      overrideRespondError = true;
      cards = [...document.querySelectorAll('#cards .merch-card')]
        .map((merchCardEl) => ({ cardContent: merchCardEl.outerHTML })); // mock cards

      const el = document.getElementById('handleFetchError2');
      el.dataset.overrides = '/override-photoshop';
      const merchCards = await init(el);
      const photoshop = merchCards.querySelector('merch-card[name="photoshop"]');
      expect(photoshop.title).to.equal('Photoshop');
      expect(photoshop.title.indexOf('PROMOTION') > 0).to.be.false;
    });
  });
});
