import {
    CLASS_NAME_DOWNLOAD,
    CLASS_NAME_UPGRADE,
} from '../src/checkout-mixin.js';
import { CheckoutLink } from '../src/checkout-link.js';
import { Checkout } from '../src/checkout.js';
import { getSettings } from '../src/settings.js';

import {
    CLASS_NAME_FAILED,
    ERROR_MESSAGE_OFFER_NOT_FOUND,
} from '../src/constants.js';
import {
    CheckoutWorkflow,
    CheckoutWorkflowStep,
    delay,
} from '../src/external.js';
import { mockFetch } from './mocks/fetch.js';
import { mockIms, unmockIms } from './mocks/ims.js';
import { mockLana, unmockLana } from './mocks/lana.js';
import { withWcs } from './mocks/wcs.js';
import {
    expect,
    sinon,
    initMasCommerceService,
    disableMasCommerceService,
} from './utilities.js';

const HREF = 'https://test.org/';

/**
 * @param {string} wcsOsi
 * @param {Record<string, any>} options
 * @returns {Commerce.Checkout.Placeholder}
 */
function mockCheckoutLink(wcsOsi, options = {}, append = true) {
    const element = CheckoutLink.createCheckoutLink(
        { wcsOsi, ...options },
        `Buy now: ${wcsOsi}`,
    );
    if (append) document.body.append(element, document.createElement('br'));
    return element;
}

afterEach(() => {
    disableMasCommerceService();
    unmockIms();
    unmockLana();
});

beforeEach(async () => {
    await mockFetch(withWcs);
    mockLana();
});

describe('class "CheckoutLink"', () => {
    it('renders link', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('abm');
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
        expect(checkoutLink.value).to.be.not.empty;
        expect(checkoutLink.options).to.be.not.empty;
    });

    it('renders link with workflow step from settings', async () => {
        await initMasCommerceService({
            'checkout-workflow-step': CheckoutWorkflowStep.SEGMENTATION,
        });
        const checkoutLink = mockCheckoutLink('abm');
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/segmentation?ms=COM&ot=BASE&pa=ccsn_direct_individual&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
    });

    it('renders link with workflow step from dataset', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('abm', {
            checkoutWorkflowStep: CheckoutWorkflowStep.SEGMENTATION,
        });
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/segmentation?ms=COM&ot=BASE&pa=ccsn_direct_individual&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
    });

    it('renders link with ims country', async () => {
        mockIms('CH');
        const service = await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('abm');
        await service.imsCountryPromise;
        await delay(1);
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&cli=adobe_com&ctx=fp&co=CH&lang=en',
        );
    });

    it('renders link with promo from dataset', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('abm-promo', {
            promotionCode: 'nicopromo',
        });
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&apc=nicopromo&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
        checkoutLink.dataset.promotionCode = 'testpromo';
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&apc=testpromo&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
    });

    it('renders multiple checkout links', async () => {
        await initMasCommerceService();
        const abm = mockCheckoutLink('abm');
        const puf = mockCheckoutLink('puf');
        const m2m = mockCheckoutLink('m2m');
        await Promise.all([
            abm.onceSettled(),
            puf.onceSettled(),
            m2m.onceSettled(),
        ]);
        expect([abm.href, puf.href, m2m.href]).to.deep.equal([
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&cli=adobe_com&ctx=fp&co=US&lang=en',
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=9E618D5A589EF8D6364DFBE02FC2C264&cli=adobe_com&ctx=fp&co=US&lang=en',
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=257E1D82082387D152029F93C1030624&cli=adobe_com&ctx=fp&co=US&lang=en',
        ]);
    });

    it('render link with multiple OSIs', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('abm,stock-abm', {
            quantity: '2,2',
        });
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&items%5B0%5D%5Bq%5D=2&items%5B1%5D%5Bid%5D=7164A328080BC96CC60FEBF33F64342D&items%5B1%5D%5Bq%5D=2&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
    });

    it('fails with missing offer', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('no-offer');
        await expect(checkoutLink.onceSettled()).eventually.be.rejectedWith(
            ERROR_MESSAGE_OFFER_NOT_FOUND,
        );
    });

    it('fails with bad request', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('xyz');
        await expect(checkoutLink.onceSettled()).eventually.be.rejectedWith(
            'Bad WCS request: 404, url: https://www.adobe.com/web_commerce_artifact?offer_selector_ids=xyz&country=US&locale=en_US&landscape=PUBLISHED&api_key=wcms-commerce-ims-ro-user-milo&language=MULT',
        );
    });

    it('renders link for perpetual offers', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('perpetual', {
            perpetual: 'true',
        });
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=C5AC20C8AAF4892B67DE2E89B26D8ACA&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
        expect(fetch.lastCall.args[0]).to.contain('language=EN');

        // no more perpetual offer
        checkoutLink.dataset.perpetual = 'false';
        const promise = checkoutLink.onceSettled();
        await expect(promise).eventually.be.rejectedWith(
            ERROR_MESSAGE_OFFER_NOT_FOUND,
        );
        expect(fetch.lastCall.args[0]).to.contain('language=MULT');
    });

    it('renders link with extra options and cleans up once unset', async () => {
        await initMasCommerceService();
        const checkoutLink = mockCheckoutLink('abm', {
            extraOptions: '{"mv":1, "mv2":2, "promoid": "abc"}',
        });
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&cli=adobe_com&ctx=fp&co=US&mv=1&mv2=2&promoid=abc&lang=en',
        );
        delete checkoutLink.dataset.extraOptions;
        await checkoutLink.onceSettled();
        expect(checkoutLink.href).to.equal(
            'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&cli=adobe_com&ctx=fp&co=US&lang=en',
        );
    });

    describe('property "isCheckoutLink"', () => {
        it('returns true', async () => {
            await initMasCommerceService();
            const checkoutLink = mockCheckoutLink('abm');
            expect(checkoutLink.isCheckoutLink).to.be.true;
        });
    });

    describe('method "render"', () => {
        it('returns false if element is not connected to DOM', async () => {
            await initMasCommerceService();
            const checkoutLink = mockCheckoutLink('no-offer', {}, false);
            expect(await checkoutLink.render()).to.be.false;
        });
    });

    describe('method "renderOffers"', () => {
        it('returns false and does not render href if element is not connected to DOM', async () => {
            await initMasCommerceService();
            const checkoutLink = mockCheckoutLink('no-offer', {}, false);
            checkoutLink.href = HREF;
            expect(await checkoutLink.renderOffers([])).to.be.false;
            expect(checkoutLink.href).to.be.equal(HREF);
        });

        it('returns false and renders failed placeholder if offers array is empty', async () => {
            await initMasCommerceService();
            const checkoutLink = mockCheckoutLink('no-offer', {});
            checkoutLink.href = HREF;
            expect(await checkoutLink.renderOffers([])).to.be.true;
            expect(checkoutLink.classList.contains(CLASS_NAME_FAILED)).to.be
                .true;
            expect(checkoutLink.getAttribute('href')).to.equal('#');
        });

        it('skips rendering if version has changed', async () => {
            await initMasCommerceService();
            const checkoutLink = mockCheckoutLink('no-offer', {}, false);
            checkoutLink.href = HREF;
            const version = checkoutLink.masElement.togglePending();
            checkoutLink.masElement.togglePending();
            expect(await checkoutLink.renderOffers([], {}, version)).to.be
                .false;
            expect(checkoutLink.href).to.equal(HREF);
        });
    });

    describe('method "updateOptions"', () => {
        it('updates element data attributes', async () => {
            await initMasCommerceService();
            const link = CheckoutLink.createCheckoutLink({
                quantity: ['1'],
                wcsOsi: 'abm',
                upgrade: 'true',
            });
            expect(link.dataset.upgrade).to.be.equal('true');
            const options = {
                checkoutMarketSegment: 'test',
                checkoutWorkflow: CheckoutWorkflow.V3,
                checkoutWorkflowStep: CheckoutWorkflowStep.EMAIL,
                perpetual: true,
                promotionCode: 'promo',
                quantity: ['1', '2'],
                wcsOsi: ['m2m', 'puf'],
                upgrade: 'false',
            };
            link.updateOptions(options);
            const { dataset } = link;
            expect(dataset.checkoutMarketSegment).to.equal(
                options.checkoutMarketSegment,
            );
            expect(dataset.checkoutWorkflow).to.equal(options.checkoutWorkflow);
            expect(dataset.checkoutWorkflowStep).to.equal(
                options.checkoutWorkflowStep,
            );
            expect(dataset.perpetual).to.equal(String(options.perpetual));
            expect(dataset.promotionCode).to.equal(
                String(options.promotionCode),
            );
            expect(dataset.quantity).to.equal(String(options.quantity));
            expect(dataset.wcsOsi).to.equal(String(options.wcsOsi));
            expect(dataset.upgrade).to.be.equal('false');
        });
    });

    describe('logged-in features', () => {
        it('renders download link', async () => {
            mockIms('US');
            await initMasCommerceService({}, () => {
                return {
                    text: 'Download',
                    className: CLASS_NAME_DOWNLOAD,
                    url: 'https://helpx.adobe.com/download-install.html',
                };
            });
            const checkoutLink = mockCheckoutLink('abm');
            await checkoutLink.onceSettled();
            expect(checkoutLink.textContent.trim()).to.equal('Download');
            expect(checkoutLink.classList.contains('download')).to.be.true;
            expect(checkoutLink.getAttribute('href')).to.equal(
                'https://helpx.adobe.com/download-install.html',
            );
        });

        it('renders upgrade button', async () => {
            mockIms('US');
            const handler = sinon.stub();
            await initMasCommerceService({}, () => {
                return {
                    text: 'Upgrade',
                    className: CLASS_NAME_UPGRADE,
                    handler,
                };
            });
            const checkoutLink = mockCheckoutLink('abm');
            await checkoutLink.onceSettled();
            expect(checkoutLink.classList.contains('upgrade')).to.be.true;
            checkoutLink.click();
            expect(checkoutLink.textContent.trim()).to.equal('Upgrade');
            sinon.assert.calledOnce(handler);
            expect(checkoutLink.getAttribute('href')).to.equal('#');
        });

        it('skips entitlements check', async () => {
            await initMasCommerceService();
            const checkoutLink = mockCheckoutLink('abm');
            checkoutLink.dataset.entitlement = 'false';
            await checkoutLink.onceSettled();
            expect(checkoutLink.textContent.trim()).to.equal('Buy now: abm');
            expect(checkoutLink.getAttribute('href')).to.equal(
                'https://commerce.adobe.com/store/email?items%5B0%5D%5Bid%5D=632B3ADD940A7FBB7864AA5AD19B8D28&cli=adobe_com&ctx=fp&co=US&lang=en',
            );
            checkoutLink.requestUpdate();
        });
    });
});

describe('commerce service', () => {
    describe('function "buildCheckoutURL"', () => {
        it('returns empty string if no offers provided', async () => {
            const service = await initMasCommerceService();
            expect(service.buildCheckoutURL([])).to.be.empty;
        });
    });
    describe('function "direct checkout calls"', () => {
        it('works as expected', async () => {
            const service = await initMasCommerceService();
            const { collectCheckoutOptions, buildCheckoutURL } = new Checkout({
                literals: { price: {} },
                providers: {
                    checkout: [
                        (p, o) => {
                            /*nop*/
                        },
                    ],
                },
                settings: getSettings(service.config),
            });
            const checkoutLink1 = mockCheckoutLink('abm');
            const options = collectCheckoutOptions({}, checkoutLink1);
            expect(options).not.to.be.empty;
            buildCheckoutURL(
                [{ offerid: 'a', marketSegments: ['COM'], priceDetails: {} }],
                options,
            );
        });
    });
});
