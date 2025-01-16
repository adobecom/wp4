import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { assert, stub } from 'sinon';
import { getConfig, setConfig } from '../../../libs/utils/utils.js';
import {
  handleFragmentCommand, applyPers,
  init, matchGlob, createContent, combineMepSources, buildVariantInfo,
} from '../../../libs/features/personalization/personalization.js';
import mepSettings from './mepSettings.js';
import mepSettingsPreview from './mepPreviewSettings.js';

document.head.innerHTML = await readFile({ path: './mocks/metadata.html' });
document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });

const getFetchPromise = (data, type = 'json') => new Promise((resolve) => {
  resolve({
    ok: true,
    [type]: () => data,
  });
});

const setFetchResponse = (data, type = 'json') => {
  window.fetch = stub().returns(getFetchPromise(data, type));
};

async function loadManifestAndSetResponse(manifestPath) {
  let manifestJson = await readFile({ path: manifestPath });
  manifestJson = JSON.parse(manifestJson);
  setFetchResponse(manifestJson);
}

// Note that the manifestPath doesn't matter as we stub the fetch
describe('Functional Test', () => {
  before(() => {
    // Add custom keys so tests doesn't rely on real data
    const config = getConfig();
    config.env = { name: 'prod' };
    config.consumerEntitlements = {
      '11111111-aaaa-bbbb-6666-cccccccccccc': 'my-special-app',
      '22222222-xxxx-bbbb-7777-cccccccccccc': 'fireflies',
    };
  });

  it('Invalid selector should not fail page render and rest of items', async () => {
    await loadManifestAndSetResponse('./mocks/manifestInvalid.json');

    expect(document.querySelector('.marquee')).to.not.be.null;
    expect(document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertafter2"]')).to.be.null;
    await init(mepSettings);
    const fragment = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertafter2"]');
    expect(fragment).to.not.be.null;
    expect(fragment.parentElement.previousElementSibling.className).to.equal('marquee');
    // TODO: add check for after3
  });

  it('Can select elements using block-#', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });
    await loadManifestAndSetResponse('./mocks/manifestBlockNumber.json');

    const firstMarquee = document.getElementsByClassName('marquee')[0];
    const secondMarquee = document.getElementsByClassName('marquee')[1];
    expect(firstMarquee).to.not.be.null;
    expect(secondMarquee).to.not.be.null;
    expect(document.querySelector('a[href="/fragments/replace/marquee/r2c1"]')).to.be.null;
    expect(document.querySelector('a[href="/fragments/replace/marquee-2/r3c2"]')).to.be.null;

    await init(mepSettings);

    const fragment = document.querySelector('a[href="/fragments/replace/marquee/r2c1"]');
    const secondFrag = document.querySelector('a[href="/fragments/replace/marquee-2/r2c2"]');
    expect(fragment).to.not.be.null;
    expect(secondFrag).to.not.be.null;

    const firstMarqueeReplacedCell = firstMarquee.querySelector('p > a');
    const secondMarqueeReplacedCell = secondMarquee.querySelector('p > a');
    expect(firstMarqueeReplacedCell.href).to.equal(fragment.href);
    expect(secondMarqueeReplacedCell.href).to.equal(secondFrag.href);
  });

  it('Can select blocks using section and block indexs', async () => {
    await loadManifestAndSetResponse('./mocks/manifestSectionBlock.json');

    expect(document.querySelector('.custom-block-1')).to.not.be.null;
    expect(document.querySelector('.custom-block-2')).to.not.be.null;

    await init(mepSettings);

    expect(document.querySelector('.custom-block-1')).to.be.null;
    expect(document.querySelector('.custom-block-2')).to.be.null;
  });

  it('scheduled manifest should apply changes if active (bts)', async () => {
    const config = getConfig();
    config.mep = {
      handleFragmentCommand,
      preview: false,
      variantOverride: {},
      highlight: false,
      targetEnabled: false,
      experiments: [],
    };
    const promoMepSettings = [
      {
        manifestPath: '/promos/bts/manifest.json',
        disabled: false,
        event: { name: 'bts', start: new Date('2023-11-24T13:00:00+00:00'), end: new Date('2222-11-24T13:00:00+00:00') },
      },
    ];
    let manifestJson = await readFile({ path: './mocks/manifestScheduledActive.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);
    expect(document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertafter3"]')).to.be.null;
    await applyPers(promoMepSettings);

    const fragment = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertafter3"]');
    expect(fragment).to.not.be.null;

    expect(fragment.parentElement.previousElementSibling.className).to.equal('marquee');
  });

  it('scheduled manifest should not apply changes if not active (blackfriday)', async () => {
    const config = getConfig();
    config.mep = {
      handleFragmentCommand,
      preview: false,
      variantOverride: {},
      highlight: false,
      targetEnabled: false,
      experiments: [],
    };
    const promoMepSettings = [
      {
        manifestPath: '/promos/blackfriday/manifest.json',
        disabled: true,
        event: { name: 'blackfriday', start: new Date('2022-11-24T13:00:00+00:00'), end: new Date('2022-11-24T13:00:00+00:00') },
      },
    ];
    await loadManifestAndSetResponse('./mocks/manifestScheduledInactive.json');
    expect(document.querySelector('a[href="/fragments/insertafter4"]')).to.be.null;
    await applyPers(promoMepSettings);

    const fragment = document.querySelector('a[href="/fragments/insertafter4"]');
    expect(fragment).to.be.null;
  });

  it('test or promo manifest', async () => {
    let config = getConfig();
    config.mep = {};
    await loadManifestAndSetResponse('./mocks/manifestTestOrPromo.json');
    config = getConfig();
    await init(mepSettings);
    expect(config.mep?.martech).to.be.undefined;
  });

  it('should choose chrome & logged out', async () => {
    await loadManifestAndSetResponse('./mocks/manifestWithAmpersand.json');
    await init(mepSettings);
    const config = getConfig();
    expect(config.mep?.martech).to.equal('|chrome & logged|ampersand');
  });

  it('should choose not firefox', async () => {
    await loadManifestAndSetResponse('./mocks/manifestWithNot.json');
    await init(mepSettings);
    const config = getConfig();
    expect(config.mep?.martech).to.equal('|not firefox|not');
  });

  it('should read and use entitlement data', async () => {
    setConfig(getConfig());
    const config = getConfig();
    config.consumerEntitlements = { 'consumer-defined-entitlement': 'fireflies' };
    config.entitlements = () => Promise.resolve(['indesign-any', 'fireflies', 'after-effects-any']);

    await loadManifestAndSetResponse('./mocks/manifestUseEntitlements.json');
    await init(mepSettings);
    expect(getConfig().mep?.martech).to.equal('|fireflies|manifest');
  });

  it('should resolve variants correctly with entitlements and tags exist', async () => {
    expect(buildVariantInfo(['cc-all-apps-any & desktop'])).to.deep.equal({
      allNames: [
        'cc-all-apps-any',
        'desktop',
      ],
      'cc-all-apps-any & desktop': [
        'cc-all-apps-any & desktop',
      ],
    });
    expect(buildVariantInfo(['desktop & cc-all-apps-any'])).to.deep.equal({
      allNames: [
        'desktop',
        'cc-all-apps-any',
      ],
      'desktop & cc-all-apps-any': [
        'desktop & cc-all-apps-any',
      ],
    });
    expect(buildVariantInfo(['cc-all-apps-any'])).to.deep.equal({
      allNames: [
        'cc-all-apps-any',
      ],
      'cc-all-apps-any': [
        'cc-all-apps-any',
      ],
    });
    expect(buildVariantInfo(['phone, cc-all-apps-any'])).to.deep.equal({
      allNames: [
        'phone',
        'cc-all-apps-any',
      ],
      'phone, cc-all-apps-any': [
        'phone',
        'cc-all-apps-any',
      ],
    });
    expect(buildVariantInfo(['cc-all-apps-any, not desktop'])).to.deep.equal({
      allNames: [
        'cc-all-apps-any',
        'desktop',
      ],
      'cc-all-apps-any, not desktop': [
        'cc-all-apps-any',
        'not desktop',
      ],
    });
    expect(buildVariantInfo(['phone & not cc-all-apps-any'])).to.deep.equal({
      allNames: [
        'phone',
        'cc-all-apps-any',
      ],
      'phone & not cc-all-apps-any': [
        'phone & not cc-all-apps-any',
      ],
    });
    expect(buildVariantInfo(['not phone & not cc-all-apps-any'])).to.deep.equal({
      allNames: [
        'phone',
        'cc-all-apps-any',
      ],
      'not phone & not cc-all-apps-any': [
        'not phone & not cc-all-apps-any',
      ],
    });
    expect(buildVariantInfo(['not cc-free & not cc-all-apps-any'])).to.deep.equal({
      allNames: [
        'cc-free',
        'cc-all-apps-any',
      ],
      'not cc-free & not cc-all-apps-any': [
        'not cc-free & not cc-all-apps-any',
      ],
    });
    expect(buildVariantInfo(['not cc-free, not cc-all-apps-any'])).to.deep.equal({
      allNames: [
        'cc-free',
        'cc-all-apps-any',
      ],
      'not cc-free, not cc-all-apps-any': [
        'not cc-free',
        'not cc-all-apps-any',
      ],
    });
    expect(buildVariantInfo(['not cc-free, not cc-all-apps-any', 'desktop & cc-paid, ios'])).to.deep.equal({
      allNames: [
        'cc-free',
        'cc-all-apps-any',
        'desktop',
        'cc-paid',
        'ios',
      ],
      'not cc-free, not cc-all-apps-any': [
        'not cc-free',
        'not cc-all-apps-any',
      ],
      'desktop & cc-paid, ios': [
        'desktop & cc-paid',
        'ios',
      ],
    });
  });

  it('invalid selector should output error to console in preview mode', async () => {
    window.console.log = stub();
    await loadManifestAndSetResponse('./mocks/manifestInvalidSelector.json');
    await init(mepSettingsPreview);
    assert.calledWith(window.console.log, 'Invalid selector: ');
    window.console.log.reset();
  });

  it('invalid selector should not output error to console if not in preview mode', async () => {
    window.console.log = stub();
    await loadManifestAndSetResponse('./mocks/manifestInvalidSelector.json');
    await init(mepSettings);
    assert.neverCalledWith(window.console.log, 'Invalid selector: ');
    window.console.log.reset();
  });

  it('missing selector should output error to console if in preview mode', async () => {
    window.console.log = stub();
    await loadManifestAndSetResponse('./mocks/manifestEmptyAction.json');
    await init(mepSettingsPreview);
    assert.calledWith(window.console.log, 'Row found with empty action field: ');
    window.console.log.reset();
  });

  it('updateMetadata should be able to add and change metadata', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestUpdateMetadata.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    const geoMetadata = document.querySelector('meta[name="georouting"]');
    expect(geoMetadata.content).to.equal('off');

    expect(document.querySelector('meta[name="mynewmetadata"]')).to.be.null;
    expect(document.querySelector('meta[property="og:title"]').content).to.equal('milo');
    expect(document.querySelector('meta[property="og:image"]')).to.be.null;

    await init(mepSettings);

    expect(geoMetadata.content).to.equal('on');
    expect(document.querySelector('meta[name="mynewmetadata"]').content).to.equal('woot');
    expect(document.querySelector('meta[property="og:title"]').content).to.equal('New Title');
    expect(document.querySelector('meta[property="og:image"]').content).to.equal('https://adobe.com/path/to/image.jpg');
  });
});

describe('matchGlob function', () => {
  it('should match page', async () => {
    const result = matchGlob('/products/special-offers', '/products/special-offers');
    expect(result).to.be.true;
  });

  it('should match page with HTML extension', async () => {
    const result = matchGlob('/products/special-offers', '/products/special-offers.html');
    expect(result).to.be.true;
  });

  it('should not match child page', async () => {
    const result = matchGlob('/products/special-offers', '/products/special-offers/free-download');
    expect(result).to.be.false;
  });

  it('should match child page', async () => {
    const result = matchGlob('/products/special-offers**', '/products/special-offers/free-download');
    expect(result).to.be.true;
  });

  it('should hide the wrapping <p> for the delayed modal anchor', async () => {
    const parent = document.createElement('div');
    const el = document.createElement('div');
    parent.appendChild(el);
    const wrapper = createContent(
      el,
      {
        content: '/fragments/promos/path-to-promo/#modal-hash:delay=1',
        manifestId: 'manifest',
        targetManifestId: '',
        action: 'insertAfter',
        modifiers: [],
      },
    );
    expect(wrapper.tagName).to.equal('P');
    expect(wrapper.classList.contains('hide-block')).to.be.true;
  });
});

describe('MEP Utils', () => {
  describe('combineMepSources', async () => {
    it('yields an empty list when everything is undefined', async () => {
      const manifests = await combineMepSources(undefined, undefined, undefined);
      expect(manifests.length).to.equal(0);
    });
    it('combines promos and personalization', async () => {
      document.head.innerHTML = await readFile({ path: '../../utils/mocks/mep/head-promo.html' });
      const promos = { manifestnames: 'pre-black-friday-global,black-friday-global' };
      const manifests = await combineMepSources('/pers/manifest.json', promos, undefined);
      expect(manifests.length).to.equal(3);
      expect(manifests[0].manifestPath).to.equal('/pers/manifest.json');
      expect(manifests[1].manifestPath).to.equal('/pre-black-friday.json');
      expect(manifests[2].manifestPath).to.equal('/black-friday.json');
    });
    it('combines promos and personalization and mep param', async () => {
      document.head.innerHTML = await readFile({ path: '../../utils/mocks/mep/head-promo.html' });
      const promos = { manifestnames: 'pre-black-friday-global,black-friday-global' };
      const manifests = await combineMepSources(
        '/pers/manifest.json',
        promos,
        '/pers/manifest.json--var1---/mep-param/manifest1.json--all---/mep-param/manifest2.json--all',
      );
      expect(manifests.length).to.equal(5);
      expect(manifests[0].manifestPath).to.equal('/pers/manifest.json');
      expect(manifests[1].manifestPath).to.equal('/pre-black-friday.json');
      expect(manifests[2].manifestPath).to.equal('/black-friday.json');
      expect(manifests[3].manifestPath).to.equal('/mep-param/manifest1.json');
      expect(manifests[4].manifestPath).to.equal('/mep-param/manifest2.json');
    });
  });
});
