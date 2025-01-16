import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { stub } from 'sinon';
import { getConfig, loadBlock } from '../../../libs/utils/utils.js';
import initFragments from '../../../libs/blocks/fragment/fragment.js';
import { init, handleCommands } from '../../../libs/features/personalization/personalization.js';
import mepSettings from './mepSettings.js';

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

    expect(document.querySelector('#features-of-milo-experimentation-platform')).to.not.be.null;
    expect(document.querySelector('.how-to')).to.not.be.null;
    const parentEl = document.querySelector('#features-of-milo-experimentation-platform')?.parentElement;

    await init(mepSettings);
    expect(document.querySelector('#features-of-milo-experimentation-platform')).to.be.null;
    const el = parentEl.firstElementChild.firstElementChild;
    expect(el.href)
      .to.equal('http://localhost:2000/test/features/personalization/mocks/fragments/milo-replace-content-chrome-howto-h2');
    const el2 = document.querySelector('a[href="/test/features/personalization/mocks/fragments/milo-replace-content-chrome-howto-h2"]');
    expect(el2.dataset.adobeTargetTestid).to.equal(undefined);
    // .how-to should not be changed as it is targeted to firefox
    expect(document.querySelector('.how-to')).to.not.be.null;
  });

  it('with a fragment selector, it should replace a fragment in the document', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });

    let manifestJson = await readFile({ path: './mocks/actions/manifestReplace.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    expect(document.querySelector('a[href="/fragments/replaceme"]')).to.exist;
    expect(document.querySelector('a[href="/fragments/inline-replaceme#_inline"]')).to.exist;
    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/milo-replace-content-chrome-howto-h2"]');
    expect(el.dataset.adobeTargetTestid).to.be.equal(undefined);

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

    expect(document.querySelector('a[href="/fragments/insertafter"]')).to.be.null;
    expect(document.querySelector('a[href="/fragments/insertafterfragment"]')).to.be.null;
    expect(document.querySelector('#insertafter').getAttribute('href')).to.equal('/my-page.html');
    expect(document.querySelector('#inserted-html')).to.be.null;
    await init(mepSettings);
    expect(getConfig().mep.commands[0].targetManifestId).to.equal(false);

    let fragment = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertafter"]');
    expect(fragment).to.not.be.null;

    expect(fragment.parentElement.previousElementSibling.className).to.equal('marquee');

    fragment = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertafterfragment"]');
    expect(fragment).to.not.be.null;

    expect(fragment.parentElement.previousElementSibling.querySelector('a[href="/fragments/insertaround"]')).to.exist;
    expect(document.querySelector('#insertafter').getAttribute('href')).to.equal('/my-page.html#modal');
    expect(document.querySelector('#inserted-html')).to.not.be.null;
  });
});

describe('insertBefore action', async () => {
  it('insertContentBefore should add fragment before target content and fragment', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestInsertBefore.json' });

    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    expect(document.querySelector('a[href="/fragments/insertbefore"]')).to.be.null;
    expect(document.querySelector('#insertbefore').getAttribute('href')).to.equal('/my-page.html');
    await init(mepSettings);
    expect(getConfig().mep.commands[0].targetManifestId).to.equal(false);

    let fragment = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertbefore"]');
    expect(fragment).to.not.be.null;

    expect(fragment.parentElement.parentElement.children[1].className).to.equal('marquee');

    fragment = document.querySelector('a[href="/test/features/personalization/mocks/fragments/insertbeforefragment"]');
    expect(fragment).to.not.be.null;

    expect(fragment.parentElement.nextElementSibling.querySelector('a[href="/fragments/insertaround"]')).to.exist;
    expect(document.querySelector('#insertbefore').getAttribute('href')).to.equal('/de/my-page.html');
  });
});

describe('prependToSection action', async () => {
  it('prependToSection should add fragment to beginning of section', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestPrependToSection.json' });

    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    expect(document.querySelector('a[href="/test/features/personalization/mocks/fragments/prependToSection"]')).to.be.null;
    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/prependToSection"]');
    expect(el.dataset.adobeTargetTestid).to.equal(undefined);

    const fragment = document.querySelector('main > div:nth-child(2) > div:first-child a[href="/test/features/personalization/mocks/fragments/prependToSection"]');
    expect(fragment).to.not.be.null;
  });
});

describe('appendToSection action', async () => {
  it('appendToSection should add fragment to end of section', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestAppendToSection.json' });

    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    expect(document.querySelector('a[href="/test/features/personalization/mocks/fragments/appendToSection"]')).to.be.null;
    await init(mepSettings);
    const el = document.querySelector('a[href="/test/features/personalization/mocks/fragments/appendToSection"]');
    expect(el.dataset.adobeTargetTestid).to.equal(undefined);

    const fragment = document.querySelector('main > div:nth-child(2) > div:last-child a[href="/test/features/personalization/mocks/fragments/appendToSection"]');
    expect(fragment).to.not.be.null;
  });
});

describe('addHash', async () => {
  it('if forceInline is true, addHash is called', async () => {
    config.mep.commands = [{
      action: 'replace',
      content: '/new-fragment',
      selector: 'h1',
    }];
    const rootEl = document.createElement('div');
    handleCommands(config.mep.commands, rootEl, true, true);
    console.log(config.mep.commands[0].content);
    expect(config.mep.commands[0].content).to.equal('/new-fragment#_inline');
    config.mep.commands[0].content = 'https://main--cc--adobecom.hlx.page/cc/fragments/new-fragment';
    handleCommands(config.mep.commands, rootEl, true, true);
    console.log(config.mep.commands[0].content);
    expect(config.mep.commands[0].content).to.equal('https://main--cc--adobecom.hlx.page/cc/fragments/new-fragment#_inline');
  });
});

describe('replace action with html/text instead of fragment', () => {
  it('should replace marquee content', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });
    let manifestJson = await readFile({ path: './mocks/actions/manifestUpdate.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    const primaryCTA = document.querySelector('.marquee p strong a');
    const secondaryCTA = document.querySelector('.marquee p a');
    const header = document.querySelector('.marquee h2');
    const actionArea = document.querySelector('main div:nth-child(5) .marquee p:has(em a, strong a)');

    expect(header.innerText).to.not.equal('updated text');
    expect(primaryCTA.innerText).to.not.equal('updated text');
    expect(primaryCTA.href).to.not.equal('updated text');
    expect(secondaryCTA.innerText).to.not.equal('updated text');
    expect(actionArea.innerHTML).to.not.equal('<p>updated text</p>');
    config.placeholders = { 'marquee-href': 'https://test.com/updated_href' };

    await init(mepSettings);
    config.placeholders = null;

    expect(header.innerText).to.equal('updated text');
    expect(primaryCTA.innerText).to.equal('updated text');
    expect(primaryCTA.href).to.equal('https://test.com/updated_href');
    expect(secondaryCTA.innerText).to.equal('updated text');
    expect(actionArea.innerHTML).to.equal('<p>updated text</p>');
  });
});

describe('remove action', () => {
  before(async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestRemove.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);
    mepSettings.mepButton = 'off';
    await init(mepSettings);
  });
  it('remove should remove content', async () => {
    expect(document.querySelector('.z-pattern')).to.be.null;
  });

  it('remove should remove fragment', async () => {
    const removeMeFrag = document.querySelector('a[href="/fragments/removeme"]');
    await initFragments(removeMeFrag);
    expect(document.querySelector('a[href="/fragments/removeme"]')).to.be.null;
  });

  it('removeContent should tag but not remove content in preview', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });

    let manifestJson = await readFile({ path: './mocks/actions/manifestRemove.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);
    delete config.mep;

    expect(document.querySelector('.z-pattern')).to.not.be.null;
    await init({
      mepParam: '',
      mepHighlight: false,
      mepButton: false,
      pzn: '/path/to/manifest.json',
      promo: false,
      target: false,
    });

    expect(document.querySelector('.z-pattern')).to.not.be.null;
    expect(document.querySelector('.z-pattern').dataset.removedManifestId).to.equal('manifest.json');

    const removeMeFrag = document.querySelector('a[href="/fragments/removeme"]');
    await initFragments(removeMeFrag);
    expect(document.querySelector('a[href="/fragments/removeme"]')).to.not.be.null;
    expect(document.querySelector('a[href="/fragments/removeme"]').dataset.removedManifestId).to.not.be.null;
  });
});

describe('useBlockCode action', async () => {
  it('useBlockCode should override a current block with the custom block code provided', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestUseBlockCode.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    expect(getConfig().mep.experiments[0].selectedVariant.useblockcode[0]
      .targetManifestId).to.equal(false);

    expect(getConfig().mep.blocks).to.deep.equal({ promo: 'http://localhost:2000/test/features/personalization/mocks/promo' });
    const promoBlock = document.querySelector('.promo');
    expect(promoBlock.textContent?.trim()).to.equal('Old Promo Block');
    await loadBlock(promoBlock);
    expect(promoBlock.textContent?.trim()).to.equal('New Promo!');
  });

  it('useBlockCode should be able to use a new type of block', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestUseBlockCode2.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    expect(getConfig().mep.experiments[0].selectedVariant.useblockcode[0]
      .targetManifestId).to.equal(false);

    expect(getConfig().mep.blocks).to.deep.equal({ myblock: 'http://localhost:2000/test/features/personalization/mocks/myblock' });
    const myBlock = document.querySelector('.myblock');
    expect(myBlock.textContent?.trim()).to.equal('This block does not exist');
    await loadBlock(myBlock);
    expect(myBlock.textContent?.trim()).to.equal('My New Block!');
  });
});

describe('custom actions', async () => {
  it('should not add custom configuration if not needed', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestReplace.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);
    await init(mepSettings);
    expect(getConfig().mep.custom).to.be.undefined;
  });

  it('should add a custom action configuration', async () => {
    let manifestJson = await readFile({ path: './mocks/actions/manifestCustomAction.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    await init(mepSettings);
    expect(getConfig().mep.inBlock).to.deep.equal({
      'my-block': {
        commands: [{
          action: 'replace',
          content: '/fragments/fragmentreplaced',
          manifestId: false,
          targetManifestId: false,
          pageFilter: '',
          // selector: 'in-block:my-block',
          selectorType: 'in-block:',
        },
        {
          action: 'replace',
          content: '/fragments/new-large-menu',
          manifestId: false,
          selector: '.large-menu',
          targetManifestId: false,
          pageFilter: '',
          selectorType: 'in-block:',
        }],
        fragments: {
          '/fragments/sub-menu': {
            action: 'replace',
            content: '/fragments/even-more-new-sub-menu',
            manifestId: false,
            targetManifestId: false,
            pageFilter: '',
            selectorType: 'in-block:',
          },
          '/fragments/new-sub-menu': {
            action: 'replace',
            content: '/fragments/even-more-new-sub-menu',
            manifestId: false,
            targetManifestId: false,
            pageFilter: '',
            selectorType: 'in-block:',
          },
          'https://main--federal--adobecom.aem.page/federal/fragments/new-sub-menu': {
            action: 'replace',
            pageFilter: '',
            content: 'https://main--federal--adobecom.aem.page/federal/fragments/even-more-new-sub-menu',
            selectorType: 'in-block:',
            manifestId: false,
            targetManifestId: false,
          },
        },
      },
    });
  });

  it('Only fragments in the first section should be preloaded', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });

    let manifestJson = await readFile({ path: './mocks/actions/manifestPreloadFrags.json' });
    manifestJson = JSON.parse(manifestJson);
    setFetchResponse(manifestJson);

    // This fragment is in the 1st section and should be preloaded
    const lcpLink = 'link[href^="/test/features/personalization/mocks/fragments/fragmentReplaced"]';

    // This fragment is in the 3rd section and should not be preloaded
    const notLcpLink = 'link[href^="/test/features/personalization/mocks/fragments/inlineFragReplaced"]';

    expect(document.querySelector(lcpLink)).not.to.exist;
    expect(document.querySelector(notLcpLink)).not.to.exist;

    await init(mepSettings);

    expect(document.querySelector(lcpLink)).to.exist;
    expect(document.querySelector(notLcpLink)).not.to.exist;
  });
});
