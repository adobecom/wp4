import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { stub } from 'sinon';
import { getLocale, loadArea, setConfig } from '../../../libs/utils/utils.js';

window.lana = { log: stub() };

const decorateArea = (doc) => {
  doc.querySelector('picture.frag-image')?.classList.add('decorated');
};

const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
const config = {
  imsClientId: 'milo',
  codeRoot: '/libs',
  contentRoot: `${window.location.origin}${getLocale(locales).prefix}`,
  decorateArea,
  locales,
  placeholders: { placeholdercheck: 'hello world' },
  mep: {
    commands: [
      {
        action: 'remove',
        selector: 'aside.large p:nth-child(1):has(picture) #_include-fragments',
        pageFilter: '',
        content: 'true',
        selectorType: 'other',
        manifestId: 'manifest.json',
        targetManifestId: false,
        modifiers: ['include-fragments'],
      },
    ],
  },
};
setConfig(config);

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: getFragment } = await import('../../../libs/blocks/fragment/fragment.js');

describe('Fragments', () => {
  let paramsGetStub;

  before(() => {
    paramsGetStub = stub(URLSearchParams.prototype, 'get');
    paramsGetStub.withArgs('cache').returns('off');
  });

  after(() => {
    paramsGetStub.restore();
  });

  it('Loads a fragment', async () => {
    const a = document.querySelector('a');
    await getFragment(a);
    const h1 = document.querySelector('h1');
    expect(h1).to.exist;
    const p = document.querySelector('#placeholdercheck');
    expect(p).to.exist;
    expect(p.innerHTML).to.equal('hello world');
  });

  it('Loads a fragment with cache control', async () => {
    const a = document.querySelector('a.cache');
    await getFragment(a);
    const h1 = document.querySelector('h1.frag-cache');
    expect(h1).to.exist;
  });

  it('Doesnt load a fragment', async () => {
    const a = document.querySelector('a.bad');
    await getFragment(a);
    expect(window.lana.log.args[0][0]).to.equal('Could not get fragment: http://localhost:2000/test/blocks/fragment/mocks/fragments/bad.plain.html');
  });

  it('Doesnt create a malformed fragment', async () => {
    const a = document.querySelector('a.malformed');
    await getFragment(a);
    expect(window.lana.log.args[1][0]).to.equal('Could not make fragment: http://localhost:2000/test/blocks/fragment/mocks/fragments/malform.plain.html');
  });

  it('Doesnt infinitely load circular references', async () => {
    const a = document.querySelector('a.frag-a');
    await getFragment(a);
    expect(document.querySelector('h4')).to.exist;
    expect(window.lana.log.args[2][0]).to.equal('ERROR: Fragment Circular Reference loading http://localhost:2000/test/blocks/fragment/mocks/fragments/frag-a');
  });

  it('Inlines fragments inside a block', async () => {
    const marquee = document.querySelector('.marquee-section');
    await loadArea(marquee);
    expect(marquee.querySelector('.fragment')).to.not.exist;
    expect(marquee.innerHTML.includes('This marquee content is pulled from a fragment')).to.be.true;
  });

  it('Does not inline fragments inside a block in DO_NOT_INLINE list', async () => {
    const cols = document.querySelector('.columns-section');
    await loadArea(cols);
    expect(cols.querySelector('.fragment')).to.exist;
    expect(cols.querySelector('.aside').style.background).to.equal('rgb(238, 238, 238)');
    expect(cols.innerHTML.includes('Hello World!!!')).to.be.true;
  });

  it('Makes media relative to fragment', async () => {
    const section = document.querySelector('.default-section');
    await loadArea(section);
    expect(section.querySelector('source[srcset^="http://localhost:2000/test/blocks/fragment/mocks/fragments/media_15"]')).to.exist;
    expect(section.querySelector('img[src^="http://localhost:2000/test/blocks/fragment/mocks/fragments/media_15"]')).to.exist;
  });

  it('"decorated" class added by decorateArea()', async () => {
    const a = document.querySelector('a.frag-image');
    await getFragment(a);
    const pic = document.querySelector('picture.frag-image');
    expect(pic.classList.contains('decorated')).to.be.true;
  });

  it('only valid HTML should exist after resolving the fragments', async () => {
    const { body } = new DOMParser().parseFromString(await readFile({ path: './mocks/body.html' }), 'text/html');
    for (const a of body.querySelectorAll('a[href*="/fragment"]')) await getFragment(a);
    const innerHtml = body.innerHTML;
    // eslint-disable-next-line
    body.innerHTML = body.innerHTML; // after reassignment, the parser guarantees the presence of only valid HTML
    expect(innerHtml).to.equal(body.innerHTML);
  });

  it('should transfer all attributes when replacing a paragraph parent with a div parent', async () => {
    const a = document.querySelector('a.frag-p');
    const { attributes } = a.parentElement;
    await getFragment(a);
    const wrapper = document.querySelector('.frag-p-wrapper');
    for (const attr of attributes) {
      expect(wrapper.getAttribute(attr.name)).to.equal(attr.value);
    }
  });
});
