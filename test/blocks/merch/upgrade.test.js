import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { setConfig } from '../../../libs/utils/utils.js';
import handleUpgradeOffer, { handleIFrameEvents, lanaLog } from '../../../libs/blocks/merch/upgrade.js';
import { CC_ALL_APPS, CC_SINGLE_APPS_ALL } from '../../../libs/blocks/merch/merch.js';

const CTA_PRODUCT_FAMILY = 'CC_ALL_APPS';
const UPGRADE_OFFER = { value: [{ offerId: '632B3ADD940A7FBB7864AA5AD19B8D28' }] };
const ENTITLEMENTS = [
  {
    offer: {
      offer_id: '5F2E4A8FD58D70C8860F51A4DE042E0C',
      product_arrangement: { family: 'ILLUSTRATOR' },
    },
    change_plan_available: true,
  },
];
const config = {
  codeRoot: '/libs',
  env: { name: 'prod' },
  placeholders: { 'upgrade-now': 'Upgrade Now' },
};
const EXPECTED_UPGRADE_URL_PROD = 'https://plan.adobe.com/?intent=switch&toOfferId=632B3ADD940A7FBB7864AA5AD19B8D28&fromOffer=5F2E4A8FD58D70C8860F51A4DE042E0C&language=en&surface=ADOBE_COM&ctx=if';
const EXPECTED_UPGRADE_URL_STAGE = 'https://stage.plan.adobe.com/?intent=switch&toOfferId=632B3ADD940A7FBB7864AA5AD19B8D28&fromOffer=5F2E4A8FD58D70C8860F51A4DE042E0C&language=en&surface=ADOBE_COM&ctx=if&promoCode=nicopromo';

const verifyUrl = (url, expectedUrl) => {
  const parsedUrl = new URL(url);
  const parsedExpectedUrl = new URL(expectedUrl);
  parsedUrl.searchParams.delete('ctxRtUrl');
  expect(parsedUrl.toString()).to.equal(parsedExpectedUrl.toString());
};
describe('Switch Modal (Upgrade Flow)', () => {
  before(async () => {
    setConfig(config);
  });
  describe('handleUpgradeOffer', () => {
    it('return an action that will show iframe in modal', async () => {
      const action = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      const { handler } = action;
      expect(handler).to.be.a('function');
      await handler(new Event('click'));
      const modal = document.querySelector('.dialog-modal.upgrade-flow-modal');
      expect(modal).to.exist;
      const iframe = modal.querySelector('iframe');
      expect(iframe.getAttribute('src').startsWith('https://plan.adobe.com/?intent=switch')).to.be.true;
      expect(iframe.classList.contains('loading')).to.be.true;
      expect(modal.querySelector('sp-progress-circle')).to.exist;
      modal?.dispatchEvent(new Event('closeModal'));
    });

    it('updates the hash when modal opens, and restores it when modal closes', async () => {
      const initialHash = window.location.hash;
      const { handler } = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      window.location.hash = '#prev-hash';
      await handler(new Event('click'), 'new-hash');
      expect(window.location.hash).to.equal('#new-hash');
      document.querySelector('.dialog-modal.upgrade-flow-modal').dispatchEvent(new Event('closeModal'));
      expect(window.location.hash).to.equal('#prev-hash');
      window.location.hash = initialHash;
    });

    it('should return an upgrade action for PROD', async () => {
      const result = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      expect(result.text).to.equal('Upgrade Now');
      verifyUrl(result.url, EXPECTED_UPGRADE_URL_PROD);
      const { handler } = result;
      expect(handler).to.be.a('function');
    });

    it('should return an upgrade action for STAGE and set promocode', async () => {
      setConfig(
        {
          ...config,
          env: { name: 'stage' },
        },
      );
      UPGRADE_OFFER.dataset = { promotionCode: 'nicopromo' };
      const result = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      verifyUrl(result.url, EXPECTED_UPGRADE_URL_STAGE);
    });

    it('should return undefined if CTA product family is not in the list of upgrade targets', async () => {
      const ctaPF = 'LIGHTROOM';
      const result = await handleUpgradeOffer(
        ctaPF,
        UPGRADE_OFFER,
        ENTITLEMENTS,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      expect(result).to.equal(undefined);
    });

    it('should return undefined if user has one of upgrade targets already', async () => {
      const ENTITLEMENTS_WITH_UPGRADE_TARGET = [
        {
          offer: {
            offer_id: '212E4A8FD58D70C8860F51A4DE042E0C',
            product_arrangement: { family: 'CC_ALL_APPS_STOCK_BUNDLE' },
          },
          change_plan_available: true,
        },
      ];

      const result = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS_WITH_UPGRADE_TARGET,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      expect(result).to.equal(undefined);
    });

    it('should return undefined if no change plan available in entitlements', async () => {
      const ENTITLEMENTS_NO_CP = [
        {
          offer: {
            offer_id: '5F2E4A8FD58D70C8860F51A4DE042E0C',
            product_arrangement: { family: 'ILLUSTRATOR' },
          },
          change_plan_available: false,
        },
      ];
      const result = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS_NO_CP,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      expect(result).to.equal(undefined);
    });

    it('should return undefined if entitlement offer is not in upgrade source offers', async () => {
      const ENTITLEMENTS_NO_CP = [
        {
          offer: {
            offer_id: '5F2E4A8FD58D70C8860F51A4DE042E0C',
            product_arrangement: { family: 'INVALID_PRODUCT' },
          },
          change_plan_available: true,
        },
      ];
      const result = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS_NO_CP,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      expect(result).to.equal(undefined);
    });

    it('should return undefined if failed to build upgrade url', async () => {
      const ENTITLEMENTS_NO_CP = [
        {
          offer: {
            offer_id: null,
            product_arrangement: { family: 'ILLUSTRATOR' },
          },
          change_plan_available: true,
        },
      ];
      const result = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS_NO_CP,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      expect(result).to.equal(undefined);
    });
  });

  describe('handleIFrameEvents', () => {
    const originalOpen = window.open;
    beforeEach(async () => {
      window.open = sinon.stub(window, 'open');
    });
    afterEach(() => {
      window.open = originalOpen;
    });

    it('should remove loading class and remove sp-theme if type AppLoaded', async () => {
      const action = await handleUpgradeOffer(
        CTA_PRODUCT_FAMILY,
        UPGRADE_OFFER,
        ENTITLEMENTS,
        CC_SINGLE_APPS_ALL,
        CC_ALL_APPS,
      );
      const { handler } = action;
      await handler(new Event('click'));
      const iframe = document.querySelector('.upgrade-flow-modal iframe');
      expect(iframe.classList.contains('loading')).to.be.true;
      expect(document.querySelector('.upgrade-flow-content sp-theme')).to.exist;

      handleIFrameEvents({ data: '{"app":"ManagePlan","subType":"AppLoaded","data":{"externalUrl":"https://www.google.com/maps","target":"_blank"}}' });
      expect(iframe.classList.contains('loading')).to.be.false;
      expect(document.querySelector('.upgrade-flow-content sp-theme')).not.to.exist;
    });

    it('should open external url if Type External', async () => {
      const message = { data: '{"app":"ManagePlan","subType":"EXTERNAL","data":{"externalUrl":"https://www.google.com/maps","target":"_blank"}}' };
      handleIFrameEvents(message);
      expect(window.open.calledOnceWith('https://www.google.com/maps', '_blank')).to.be.true;
    });

    it('should open external url if Type SWITCH', async () => {
      const message = { data: '{"app":"ManagePlan","subType":"SWITCH","data":{"externalUrl":"https://www.google.com/maps","target":"_blank"}}' };
      handleIFrameEvents(message);
      expect(window.open.calledOnceWith('https://www.google.com/maps', '_blank')).to.be.true;
    });

    it('should open external url and handle return back', async () => {
      const message = { data: '{"app":"ManagePlan","subType":"RETURN_BACK","data":{"externalUrl":"https://www.google.com/maps","target":"_blank","returnUrl":"https://www.adobe.com"}}' };
      handleIFrameEvents(message);
      const returnUrl = window.sessionStorage.getItem('upgradeModalReturnUrl');
      expect(window.open.calledOnceWith('https://www.google.com/maps', '_blank')).to.be.true;
      expect(returnUrl).to.equal('https://www.adobe.com');
    });

    it('should log lana message', async () => {
      const originalLana = window.lana;
      const originalAdobeIMS = window.adobeIMS;
      const log = sinon.stub();
      const getProfile = sinon.stub().callsFake(() => ({ userId: '123' }));
      window.adobeIMS = { getProfile };
      window.lana = { log };

      await lanaLog('Showing modal', 'AppLoaded');
      expect(log.calledOnce).to.be.true;
      window.lana = originalLana;
      window.adobeIMS = originalAdobeIMS;
    });

    [
      [{ data: {} }, 'should do nothing if message is not parseble'],
      [{ data: '{"app":"ManagePlan","subType":"Invalid","data":{"actionRequired":false}}' }, 'should do nothing if message type is not valid'],
      [{ data: '{"app":"ManagePlan","subType":"Error","data":{"actionRequired":false}}' }, 'should do nothing if message type is error'],
    ].forEach(([message, desc]) => {
      it(desc, () => {
        expect(() => { handleIFrameEvents(message); }).not.to.throw();
        expect(window.open.calledOnce).to.be.false;
      });
    });
  });
});
