import { expect } from '@esm-bundle/chai';

import { mockOstDeps, unmockOstDeps } from './mocks/ost-utils.js';
import { CheckoutWorkflow, CheckoutWorkflowStep } from '../../../libs/deps/mas/commerce.js';
import { DEFAULT_CTA_TEXT, createLinkMarkup } from '../../../libs/blocks/ost/ost.js';

const perpM2M = {
  offer_id: 'aeb0bf53517d46e89a1b039f859cf573',
  commitment: 'PERPETUAL',
  name: 'Stock',
  planType: 'M2M',
};
const defaults = {
  checkoutWorkflow: 'UCv3',
  checkoutWorkflowStep: 'email',
};
const osi = 'cea462e983f649bca2293325c9894bdd';
const promo = 'test-promo';
const texts = {
  buy: DEFAULT_CTA_TEXT,
  try: 'free-trial',
};
const types = {
  checkoutUrl: 'checkoutUrl',
  price: 'price',
  opticalPrice: 'opticalPrice',
};

function assertLink(link, offer, params, text = texts.buy) {
  const { searchParams } = new URL(link.href);
  Object.entries(params).forEach(([key, value]) => {
    expect(searchParams.get(key)).to.equal(String(value));
  });
  if (params.type === types.checkoutUrl) {
    expect(searchParams.get('text')).to.equal(text);
    expect(link.text).to.equal(`CTA {{${text}}}`);
  } else {
    expect(link.text).to.equal(`PRICE - ${offer.planType} - ${offer.name}`);
  }
}

function createLink(params = {}) {
  return createLinkMarkup(
    defaults,
    params.osi ?? osi,
    params.type,
    perpM2M,
    params,
    params.promo,
  );
}

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  unmockOstDeps();
});

describe('OST: loadOstEnv', async () => {
  it('fetches and returns page status and metadata', async () => {
    const {
      options: { country, language, workflow },
      params,
    } = mockOstDeps({ mockToken: true });

    const {
      AOS_API_KEY,
      CHECKOUT_CLIENT_ID,
      WCS_ENV,
      WCS_API_KEY,
      loadOstEnv,
    } = await import('../../../libs/blocks/ost/ost.js');

    expect(await loadOstEnv()).to.include({
      aosAccessToken: params.token,
      aosApiKey: AOS_API_KEY,
      checkoutClientId: CHECKOUT_CLIENT_ID,
      workflow,
      country,
      environment: WCS_ENV,
      language,
      wcsApiKey: WCS_API_KEY,
    });
  });

  it('tolerates page metadata request fail', async () => {
    const { options: { country, language } } = mockOstDeps({ failMetadata: true });

    const {
      AOS_API_KEY,
      CHECKOUT_CLIENT_ID,
      WCS_ENV,
      WCS_API_KEY,
      loadOstEnv,
    } = await import('../../../libs/blocks/ost/ost.js');

    expect(await loadOstEnv()).to.include({
      aosAccessToken: null,
      aosApiKey: AOS_API_KEY,
      checkoutClientId: CHECKOUT_CLIENT_ID,
      country,
      environment: WCS_ENV,
      language,
      wcsApiKey: WCS_API_KEY,
    });
  });

  it('tolerates page status request fail', async () => {
    mockOstDeps({ failStatus: true });

    const {
      AOS_API_KEY,
      CHECKOUT_CLIENT_ID,
      WCS_ENV,
      WCS_API_KEY,
      loadOstEnv,
    } = await import('../../../libs/blocks/ost/ost.js');

    expect(await loadOstEnv()).to.include({
      aosAccessToken: null,
      aosApiKey: AOS_API_KEY,
      checkoutClientId: CHECKOUT_CLIENT_ID,
      country: 'US',
      environment: WCS_ENV,
      language: 'en',
      wcsApiKey: WCS_API_KEY,
    });
  });
});

describe('OST: init', () => {
  it('opens OST without waiting for IMS if query string includes token', async () => {
    const {
      options: { country, language, workflow },
      params: { token },
    } = mockOstDeps({ mockToken: true });

    const {
      AOS_API_KEY,
      CHECKOUT_CLIENT_ID,
      WCS_ENV,
      WCS_API_KEY,
      default: init,
    } = await import('../../../libs/blocks/ost/ost.js');
    await init(document.body.firstChild);

    expect(window.ost.openOfferSelectorTool.called).to.be.true;
    expect(window.ost.openOfferSelectorTool.getCall(0).args[0]).to.include({
      aosAccessToken: token,
      aosApiKey: AOS_API_KEY,
      checkoutClientId: CHECKOUT_CLIENT_ID,
      country,
      environment: WCS_ENV,
      language,
      wcsApiKey: WCS_API_KEY,
      workflow,
    });
  });

  it('waits for IMS callback to open OST if query string does not include token', async () => {
    const { options: { country, language, workflow } } = mockOstDeps({ mockToken: false });

    const token = 'test-token';
    const {
      AOS_API_KEY,
      CHECKOUT_CLIENT_ID,
      WCS_ENV,
      WCS_API_KEY,
      default: init,
    } = await import('../../../libs/blocks/ost/ost.js');
    await init(document.body.firstChild);

    expect(window.ost.openOfferSelectorTool.called).to.be.false;
    window.adobeid.onAccessToken({ token });

    expect(window.ost.openOfferSelectorTool.called).to.be.true;
    expect(window.ost.openOfferSelectorTool.getCall(0).args[0]).to.include({
      aosAccessToken: token,
      aosApiKey: AOS_API_KEY,
      checkoutClientId: CHECKOUT_CLIENT_ID,
      workflow,
      country,
      environment: WCS_ENV,
      language,
      wcsApiKey: WCS_API_KEY,
    });
  });

  it('forces IMS sign-in for anonymous user when IMS is ready', async () => {
    mockOstDeps({ failStatus: true });

    const { default: init } = await import('../../../libs/blocks/ost/ost.js');
    await init(document.body.firstChild);
    window.adobeid.onReady();
    expect(window.adobeIMS.signIn.called).to.be.true;
  });

  it('opens OST with overwritten WCS "landscape" and "env" values', async () => {
    const {
      options: { country, language, workflow },
      params: { token },
    } = mockOstDeps({ mockToken: true, overrideParams: { wcsLandscape: 'DRAFT', env: 'stage' } });

    const {
      AOS_API_KEY,
      CHECKOUT_CLIENT_ID,
      WCS_API_KEY,
      default: init,
    } = await import('../../../libs/blocks/ost/ost.js');
    await init(document.body.firstChild);

    expect(window.ost.openOfferSelectorTool.called).to.be.true;
    expect(window.ost.openOfferSelectorTool.getCall(0).args[0]).to.include({
      aosAccessToken: token,
      aosApiKey: AOS_API_KEY,
      checkoutClientId: CHECKOUT_CLIENT_ID,
      country,
      environment: 'stage',
      landscape: 'DRAFT',
      language,
      wcsApiKey: WCS_API_KEY,
      workflow,
    });
  });
});

describe('OST: merch link creation', () => {
  describe('checkout-link', () => {
    const type = types.checkoutUrl;

    it('with default params', async () => {
      const link = createLink({ type });
      assertLink(link, perpM2M, { osi, type });
      expect({ ...link.dataset }).to.eql({});
    });

    it('with promo and custom text', async () => {
      const ctaText = texts.try;
      const link = createLink({ ctaText, promo, type });
      assertLink(link, perpM2M, { osi, promo, type }, ctaText);
    });

    it('to UCv2 workflow', async () => {
      const workflow = CheckoutWorkflow.V2;
      const workflowStep = CheckoutWorkflowStep.CHECKOUT_EMAIL;
      const link = createLink({ type, workflow, workflowStep });
      assertLink(link, perpM2M, { osi, type, workflow, workflowStep });
    });
  });

  describe('inline-price', () => {
    const type = types.price;

    it('with default params', async () => {
      const link = createLink({ type });
      assertLink(link, perpM2M, { osi, type });
    });

    it('with default params from OST', async () => {
      const link = createLink({
        type,
        displayRecurrence: true,
        displayPerUnit: true,
        displayTax: false,
        displayOldPrice: false,
        forceTaxExclusive: false,
      });
      expect(link.href).to.eql('https://milo.adobe.com/tools/ost?osi=cea462e983f649bca2293325c9894bdd&type=price&perp=true');
    });

    it('with custom options', async () => {
      const displayRecurrence = true;
      const displayPerUnit = true;
      const displayTax = true;
      const forceTaxExclusive = true;
      const link = createLink({
        displayRecurrence,
        displayPerUnit,
        displayTax,
        forceTaxExclusive,
        type,
      });
      assertLink(link, perpM2M, {
        tax: displayTax,
        exclusive: forceTaxExclusive,
        osi,
        type,
      });
    });
  });
});
