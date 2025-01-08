import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import experiments from './mocks/preview.js';

document.body.innerHTML = await readFile({ path: './mocks/postPersonalization.html' });
const { default: decoratePreviewMode, parsePageAndUrl } = await import('../../../libs/features/personalization/preview.js');
const { setConfig, MILO_EVENTS } = await import('../../../libs/utils/utils.js');

const config = {
  miloLibs: 'https://main--milo--adobecom.hlx.live/libs',
  codeRoot: 'https://main--homepage--adobecom.hlx.live/homepage',
  locale: {
    ietf: 'en-US',
    tk: 'hah7vzn.css',
    prefix: '',
    region: 'us',
    contentRoot: 'https://main--cc--adobecom.hlx.page/cc-shared',
  },
  mep: {
    preview: true,
    override: '',
    highlight: true,
    experiments: [],
    targetEnabled: true,
    prefix: '',
  },
  stageDomainsMap: {
    'www.stage.adobe.com': {
      'www.adobe.com': 'origin',
      'business.adobe.com': 'business.stage.adobe.com',
      'helpx.adobe.com': 'helpx.stage.adobe.com',
      'blog.adobe.com': 'blog.stage.adobe.com',
      'developer.adobe.com': 'developer-stage.adobe.com',
      'news.adobe.com': 'news.stage.adobe.com',
      'firefly.adobe.com': 'firefly-stage.corp.adobe.com',
      'creativecloud.adobe.com': 'stage.creativecloud.adobe.com',
      'projectneo.adobe.com': 'stg.projectneo.adobe.com',
    },
    '--cc--adobecom.hlx.live': {
      'www.adobe.com': 'origin',
      'business.adobe.com': 'business.stage.adobe.com',
      'helpx.adobe.com': 'helpx.stage.adobe.com',
      'blog.adobe.com': 'blog.stage.adobe.com',
      'developer.adobe.com': 'developer-stage.adobe.com',
      'news.adobe.com': 'news.stage.adobe.com',
      'firefly.adobe.com': 'firefly-stage.corp.adobe.com',
      'creativecloud.adobe.com': 'stage.creativecloud.adobe.com',
      'projectneo.adobe.com': 'stg.projectneo.adobe.com',
    },
    '--cc--adobecom.hlx.page': {
      'www.adobe.com': 'origin',
      'business.adobe.com': 'business.stage.adobe.com',
      'helpx.adobe.com': 'helpx.stage.adobe.com',
      'blog.adobe.com': 'blog.stage.adobe.com',
      'developer.adobe.com': 'developer-stage.adobe.com',
      'news.adobe.com': 'news.stage.adobe.com',
      'firefly.adobe.com': 'firefly-stage.corp.adobe.com',
      'creativecloud.adobe.com': 'stage.creativecloud.adobe.com',
      'projectneo.adobe.com': 'stg.projectneo.adobe.com',
    },
  },
  env: { name: 'stage' },
};
setConfig(config);

describe('preview feature', () => {
  it('builds with 0 manifests', async () => {
    await decoratePreviewMode();
    const event = new Event(MILO_EVENTS.DEFERRED);
    document.dispatchEvent(event);
    expect(document.querySelectorAll('.mep-preview-overlay').length).to.equal(1);
    expect(document.querySelector('.mep-popup-header h4').textContent).to.equal('0 Manifest(s) found');
  });
  it('expand and close panel, expand and close advance, remove button', () => {
    expect(document.querySelector('.mep-preview-overlay > div').className).to.equal('mep-hidden');
    document.querySelector('.mep-badge').click();
    expect(document.querySelector('.mep-preview-overlay > div').className).to.equal('');
    document.querySelector('.mep-badge').click();
    expect(document.querySelector('.mep-preview-overlay > div').className).to.equal('mep-hidden');
    document.querySelector('.mep-toggle-advanced').click();
    expect(document.querySelector('.mep-advanced-container').classList.contains('mep-advanced-open')).to.be.true;
    document.querySelector('.mep-toggle-advanced').click();
    expect(document.querySelector('.mep-advanced-container').classList.contains('mep-advanced-open')).to.be.false;
    document.querySelector('.mep-close').click();
    expect(document.querySelectorAll('.mep-preview-overlay').length).to.equal(0);
  });
  it('builds with multiple manifests', async () => {
    config.mep.experiments = experiments;
    setConfig(config);
    await decoratePreviewMode();
    expect(document.querySelectorAll('.mep-preview-overlay').length).to.equal(1);
    expect(document.querySelector('.mep-popup-header h4').textContent).to.equal(`${config.mep.experiments.length} Manifest(s) found`);
  });
  it('adds highlights', () => {
    expect(document.querySelector('[data-path="/fragments/fragmentreplaced"]').getAttribute('data-manifest-id')).to.equal('selected-example.json');
    expect(document.querySelector('.marquee').getAttribute('data-code-manifest-id')).to.equal('selected-example.json');
    expect(document.querySelector('header').getAttribute('data-manifest-id')).to.equal('selected-example.json');
  });
  it('adjusts highlights for merch cards', () => {
    expect(document.querySelector('merch-card').getAttribute('data-manifest-id')).to.equal('selected-example.json');
  });
  it('preselects form inputs', () => {
    expect(document.querySelector('input[name*="/homepage/fragments/mep/selected-example.json"][value="target-smb"]').getAttribute('checked')).to.equal('checked');
    expect(document.querySelector('input[name*="/homepage/fragments/mep/default-selected.json"][value="default"]').getAttribute('checked')).to.equal('checked');
    expect(document.querySelector('input#mepHighlightCheckbox').getAttribute('checked')).to.equal('checked');
  });
  it('updates preview button', () => {
    expect(document.querySelector('a[title="Preview above choices"]').getAttribute('href')).to.contain('---');
    document.querySelector('.new-manifest').value = 'https://main--homepage--adobecom.hlx.live/homepage/fragments/mep/new-manifest.json';
    document.querySelector('input[name*="/homepage/fragments/mep/selected-example.json"][value="default"]').click();
    expect(document.querySelector('a[title="Preview above choices"]').getAttribute('href')).to.contain('new-manifest.json');
    expect(document.querySelector('a[title="Preview above choices"]').getAttribute('href')).to.contain('%2Fhomepage%2Ffragments%2Fmep%2Fselected-example.json--default');
    document.querySelector('input#mepHighlightCheckbox').click();
    expect(document.querySelector('a[title="Preview above choices"]').getAttribute('href')).to.not.contain('mepHighlight');
    document.querySelector('input#mepPreviewButtonCheckbox').click();
    expect(document.querySelector('a[title="Preview above choices"]').getAttribute('href')).to.contain('mepButton=off');
    expect(document.querySelector('a[title="Preview above choices"]').getAttribute('href')).to.contain('---');
  });
  it('parse url and page for stage', () => {
    const { url, page } = parsePageAndUrl(config, new URL('https://www.stage.adobe.com/fr/products/photoshop.html'), 'fr');
    expect(url).to.equal('https://www.adobe.com/fr/products/photoshop.html');
    expect(page).to.equal('/products/photoshop.html');
  });
  it('parse url and page for preview', () => {
    const { url, page } = parsePageAndUrl(config, new URL('https://main--cc--adobecom.aem.page/fr/products/photoshop'), 'fr');
    expect(url).to.equal('https://www.adobe.com/fr/products/photoshop.html');
    expect(page).to.equal('/products/photoshop.html');
  });
  it('parse url and page for homepage preview', () => {
    const { url, page } = parsePageAndUrl(config, new URL('https://main--homepage--adobecom.hlx.page/fr/homepage/index-loggedout'), 'fr');
    expect(url).to.equal('https://www.adobe.com/fr/');
    expect(page).to.equal('/');
  });
  it('parse url and page for bacom preview', () => {
    config.stageDomainsMap = { 'business.stage.adobe.com': {} };
    const { url, page } = parsePageAndUrl(config, new URL('https://main--bacom--adobecom.hlx.page/fr/products/real-time-customer-data-platform/rtcdp'), 'fr');
    expect(url).to.equal('https://business.adobe.com/fr/products/real-time-customer-data-platform/rtcdp.html');
    expect(page).to.equal('/products/real-time-customer-data-platform/rtcdp.html');
  });
  it('parse url and page for prod US', () => {
    config.env.name = 'prod';
    const { url, page } = parsePageAndUrl(config, new URL('https://www.adobe.com/products/photoshop.html'), '');
    expect(url).to.equal('https://www.adobe.com/products/photoshop.html');
    expect(page).to.equal('/products/photoshop.html');
  });
  it('parse url and page for prod non US', () => {
    const { url, page } = parsePageAndUrl(config, new URL('https://www.adobe.com/fr/products/photoshop.html'), 'fr');
    expect(url).to.equal('https://www.adobe.com/fr/products/photoshop.html');
    expect(page).to.equal('/products/photoshop.html');
  });
  it('opens manifest', () => {
    document.querySelector('a.mep-edit-manifest').click();
  });
});
