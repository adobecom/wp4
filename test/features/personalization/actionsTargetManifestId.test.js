import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { stub } from 'sinon';
import { getConfig } from '../../../libs/utils/utils.js';
import initFragments from '../../../libs/blocks/fragment/fragment.js';
import { init, handleFragmentCommand, addMepAnalytics } from '../../../libs/features/personalization/personalization.js';
import mepSettings from './mepTargetSettings.js';

document.head.innerHTML = await readFile({ path: './mocks/metadata.html' });
document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });

// Add custom keys so tests doesn't rely on real data
const config = getConfig();
config.env = { name: 'prod' };

const getFetchPromise = (data, type = 'json') => new Promise((resolve) => {
  resolve({
    ok: true,
    [type]: () => data,
  });
});

const setFetchResponse = (data, type = 'json') => {
  window.fetch = stub().returns(getFetchPromise(data, type));
};

// Note that the manifestPath doesn't matter as we stub the fetch
describe('replace action', () => {
  it('with a CSS Selector, it should replace an element with a fragment', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestReplace.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);
    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/milo-replace-content-chrome-howto-h2"]');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
  });

  it('with a fragment selector, it should replace a fragment in the document', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });

    let manifestJson = await readFile({ path: './mocks/actions/manifestReplace.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/milo-replace-content-chrome-howto-h2"]');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
    const fragmentResp = await readFile({ path: './mocks/fragments/fragmentReplaced.plain.html' });
    const inlineFragmentResp = await readFile({ path: './mocks/fragments/inlineFragReplaced.plain.html' });
    window.fetch = stub();
    window.fetch.withArgs('http://localhost:2000/test/features/personalization/mocks/fragments/fragmentReplaced.plain.html')
      .returns(getFetchPromise(fragmentResp, 'text'));
    window.fetch.withArgs('http://localhost:2000/test/features/personalization/mocks/fragments/inlineFragReplaced.plain.html')
      .returns(getFetchPromise(inlineFragmentResp, 'text'));
    const replacemeFrag = document.querySelector('a[href="/fragments/replaceme"]');
    await initFragments(replacemeFrag);
    expect(document.querySelector('a[href="/fragments/replaceme"]')).to.be.null;
    expect(document.querySelector('div[data-path="/test/features/personalization/mocks/fragments/fragmentReplaced"]')).to.exist;

    const inlineReplacemeFrag = document.querySelector('a[href="/fragments/inline-replaceme#_inline"]');
    await initFragments(inlineReplacemeFrag);
    expect(document.querySelector('a[href="/fragments/inline-replaceme#_inline"]')).to.be.null;
    expect(document.querySelector('.inlinefragmentreplaced')).to.exist;
  });
});

describe('insertAfter action', async () => {
  it('insertContentAfter should add fragment after target content and fragment', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestInsertAfter.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertafter"]');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
  });
});

describe('insertBefore action', async () => {
  it('insertContentBefore should add fragment before target content and fragment', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestInsertBefore.json' });

    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertbefore"]');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
  });
});

describe('prependToSection action', async () => {
  it('appendToSection should add fragment to beginning of section', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestPrependToSection.json' });

    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    expect(document.querySelector('a[href="/test/features/personalization/mocks/fragments/prependToSection"]')).to.be.null;
    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/prependToSection"]');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
  });
});

describe('appendToSection action', async () => {
  it('appendToSection should add fragment to end of section', async () => {
    config.mep = { handleFragmentCommand };
    let manifestJson = await readFile({ path: './mocks/actions/manifestAppendToSection.json' });

    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/appendToSection"]');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
  });
});

describe('replace action with html/text instead of fragment', () => {
  it('should replace marquee content', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });
    let manifestJson = await readFile({ path: './mocks/actions/manifestTargetUpdate.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    const primaryCTA = document.querySelector('.marquee p strong a');
    const secondaryCTA = document.querySelector('.marquee p a');
    const header = document.querySelector('.marquee h2');
    const actionArea = document.querySelector('main div:nth-child(5) .marquee p:has(em a, strong a)');

    expect(header.dataset.adobeTargetTestid).not.to.exist;
    expect(primaryCTA.dataset.adobeTargetTestid).not.to.exist;
    expect(secondaryCTA.dataset.adobeTargetTestid).not.to.exist;
    expect(actionArea.dataset.adobeTargetTestid).not.to.exist;
    await init(mepSettings);
    expect(header.dataset.adobeTargetTestid).to.equal('manifest');
    expect(primaryCTA.dataset.adobeTargetTestid).to.equal('manifest');
    expect(secondaryCTA.dataset.adobeTargetTestid).to.equal('manifest');
    expect(actionArea.dataset.adobeTargetTestid).to.equal('manifest');
  });
});

describe('useBlockCode action', async () => {
  it('useBlockCode should override a current block with the custom block code provided', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestUseBlockCode.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    await addMepAnalytics(config);
    const el = document.querySelector('.promo');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
  });

  it('useBlockCode should be able to use a new type of block', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestUseBlockCode2.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    await addMepAnalytics(config);
    const el = document.querySelector('.myblock');
    expect(el.dataset.adobeTargetTestid).to.equal('manifest');
  });
});

describe('custom actions', async () => {
  it('should add a custom action configuration', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestCustomAction.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    expect(getConfig().mep.inBlock['my-block'].commands[0].targetManifestId).to.equal('manifest');
    expect(getConfig().mep.inBlock['my-block'].commands[1].targetManifestId).to.equal('manifest');
    expect(getConfig().mep.inBlock['my-block'].fragments['/fragments/sub-menu'].targetManifestId).to.equal('manifest');
    expect(getConfig().mep.inBlock['my-block'].fragments['/fragments/new-sub-menu'].targetManifestId).to.equal('manifest');
  });
});
