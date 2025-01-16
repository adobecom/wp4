import sinon from 'sinon';

const ogFetch = window.fetch;
const ogUrl = window.location.href;

const getConfig = () => ({
  env: { name: 'local' },
  locales: {
    '': { prefix: '', ietf: 'en-US', tk: 'hah7vzn.css' },
    ch_de: { prefix: '/ch_de', ietf: 'de-CH', tk: 'vin7zsi.css' },
  },
});

const getLocale = (locales, pathname) => locales[pathname.split('/', 2)[1]?.toLowerCase()] || locales[''];

function getMetadata(name, doc = document) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = doc.head.querySelector(`meta[${attr}="${name}"]`);
  return meta && meta.content;
}

const loadScript = () => Promise.resolve();

const loadStyle = () => Promise.resolve();

const createTag = () => Promise.resolve();

const loadArea = () => Promise.resolve();

const localizeLink = () => Promise.resolve();

const mockRes = ({ payload, status = 200 } = {}) => new Promise((resolve) => {
  resolve({
    status,
    statusText: '',
    ok: status === 200,
    json: () => payload,
    text: () => payload,
  });
});
function mockOstDeps({ failStatus = false, failMetadata = false, mockToken, overrideParams } = {}) {
  const options = {
    country: 'CH',
    language: 'de',
    workflow: 'UCv2',
  };

  const defaultParams = {
    ref: 'main',
    repo: 'milo',
    owner: 'adobecom',
    host: 'milo.adobe.com',
    project: 'Milo',
    referrer: 'https://adobe.sharepoint.com/:w:/r/sites/adobecom/_layouts/15/Doc.aspx?sourcedoc=%7B341A5A28-4B2F-4BC0-B7D4-6467E22B275C%7D&file=index.docx&action=default&mobileredirect=true',
    token: mockToken ? 'aos-access-token' : undefined,
  };
  const params = { ...defaultParams, ...overrideParams };

  window.fetch = sinon.stub()
    .onFirstCall()
    .callsFake(
      () => (
        failStatus
          ? mockRes({ status: 500 })
          : mockRes({ payload: { preview: { url: `https://hlx.page/${options.country}_${options.language}/drafts/page` } } })
      ),
    )
    .onSecondCall()
    .callsFake(
      () => (
        failMetadata
          ? mockRes({ status: 500 })
          : mockRes({ payload: `<head><meta name="checkout-workflow" content="${options.workflow}"></head>` })
      ),
    );

  window.adobeIMS = {
    isSignedInUser: sinon.stub().returns(false),
    signIn: sinon.stub(),
  };
  window.ost = { openOfferSelectorTool: sinon.spy() };
  window.tacocat = {
    initLanaLogger: sinon.spy(),
    tacocat: sinon.spy(),
  };

  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  window.history.replaceState({}, '', url);

  document.body.innerHTML = '<main><div class="ost"><div /></div></main>';

  return { options, params };
}

function unmockOstDeps() {
  document.body.innerHTML = '';
  delete window.ost;
  delete window.tacocat;
  delete window.adobeid;
  delete window.adobeIMS;
  window.fetch = ogFetch;
  window.history.replaceState({}, '', ogUrl);
}

const customFetch = window.fetch;
const PAGE_URL = new URL(window.location.href);
const SLD = PAGE_URL.hostname.includes('.aem.') ? 'aem' : 'hlx';
export {
  createTag,
  getConfig,
  getLocale,
  getMetadata,
  loadArea,
  loadScript,
  loadStyle,
  localizeLink,
  mockOstDeps,
  unmockOstDeps,
  mockRes,
  customFetch,
  SLD,
};
