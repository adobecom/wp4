import Sinon from 'sinon';

import '../../../utils/lana.js';
import { Defaults } from '../src/mas.js';
import { TAG_NAME_SERVICE } from '../src/mas-commerce-service.js';

import { mockFetch } from './mocks/fetch.js';
import { mockIms, unmockIms } from './mocks/ims.js';
import {
    expect,
    initMasCommerceService,
    disableMasCommerceService,
} from './utilities.js';
import { withWcs } from './mocks/wcs.js';

const calls = [];
class MockXMLHttpRequest {
    constructor() {
        calls.push(this);
    }

    send() {}

    open = Sinon.mock();
}

describe('commerce service', () => {
    window.XMLHttpRequest = MockXMLHttpRequest;
    before(async () => {
        window.lana.localhost = false;
        await mockFetch(withWcs);
    });

    afterEach(() => {
        disableMasCommerceService();
        unmockIms();
    });

    beforeEach(async () => {
        await mockIms();
    });

    describe(`component "${TAG_NAME_SERVICE}"`, () => {
        it('returns "Defaults" object', async () => {
            const instance = await initMasCommerceService();
            expect(instance.defaults).to.deep.equal(Defaults);
        });

        it('initialises service with milo configured locale', async () => {
            const { settings } = await initMasCommerceService({
                locale: 'en_DZ',
            });
            expect(settings).to.deep.contain({
                country: 'DZ',
                language: 'en',
            });
        });

        it('registers checkout action', async () => {
            const el = await initMasCommerceService();
            el.registerCheckoutAction((offers, options, imsPromise) => {
                /* nop for now */
            });
            expect(el.buildCheckoutAction).to.be.not.undefined;
            const nop = await el.buildCheckoutAction([{}], {});
            expect(nop).to.be.null;
            el.registerCheckoutAction((offers, options, imsPromise) => {
                return () => Promise.resolve();
            });
            const action = await el.buildCheckoutAction([{}], {});
            expect(action).to.be.not.undefined;
        });

        it('allows to flush WCS cache', async () => {
            const el = await initMasCommerceService();
            expect(el.flushWcsCache).to.be.a('function');
            el.flushWcsCache();
            //TODO: add more assertions
        });

        it('allows to refresh offers', async () => {
            const el = await initMasCommerceService();
            expect(el.refreshOffers).to.be.a('function');
            el.refreshOffers();
            //TODO: add more assertions
        });

        it('allows to refresh aem fragments & prices', async () => {
            const el = await initMasCommerceService();
            expect(el.refreshFragments).to.be.a('function');
            el.refreshFragments();
            expect(el.flushWcsCache).to.be.a('function');
            el.flushWcsCache();
        });

        describe('property "config"', () => {
            it('generates settings from attributes', async () => {
                const el = await initMasCommerceService({
                    env: 'stage',
                    locale: 'fr_CA',
                    language: 'es',
                    country: 'CA',
                    'checkout-client-id': 'foobar',
                    'checkout-workflow-step': 'stepone',
                    'force-tax-exclusive': true,
                    'wcs-api-key': 'wcsTest',
                });
                expect(el.settings).to.deep.contains({
                    locale: 'fr_CA',
                    language: 'es',
                    country: 'CA',
                    env: 'STAGE',
                    checkoutClientId: 'foobar',
                    checkoutWorkflowStep: 'email', // rejects invalid value
                    forceTaxExclusive: true,
                    wcsApiKey: 'wcsTest',
                });
            });

            it('generates some default with no attributes', async () => {
                const el = await initMasCommerceService({});
                expect(el.settings).to.deep.equal({
                    checkoutClientId: 'adobe_com',
                    checkoutWorkflow: 'UCv3',
                    checkoutWorkflowStep: 'email',
                    country: 'US',
                    displayOldPrice: true,
                    displayPerUnit: false,
                    displayRecurrence: true,
                    displayTax: false,
                    entitlement: false,
                    env: 'PRODUCTION',
                    extraOptions: {},
                    forceTaxExclusive: false,
                    landscape: 'PUBLISHED',
                    language: 'en',
                    locale: 'en_US',
                    modal: false,
                    promotionCode: '',
                    quantity: [1],
                    wcsApiKey: 'wcms-commerce-ims-ro-user-milo',
                    wcsBufferDelay: 1,
                    wcsBufferLimit: 1,
                    wcsURL: 'https://www.adobe.com/web_commerce_artifact',
                });
            });

            it('enables lana with custom tags', async () => {
                const el = await initMasCommerceService({
                    'lana-tags': 'ccd',
                    'lana-sample-rate': '100',
                    'host-env': 'stage',
                });
                el.log.error('test error');
                const [, url] = calls[0].open.lastCall.args;
                expect(
                    /https\:\/\/www.stage.adobe.com\/lana\/ll\?m=test%20error.*c=merch-at-scale&s=100&t=e&tags=ccd/.test(
                        url,
                    ),
                ).to.true;
            });
        });
    });
});
