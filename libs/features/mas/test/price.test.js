import {
    ERROR_MESSAGE_OFFER_NOT_FOUND,
} from '../src/constants.js';
import { InlinePrice } from '../src/inline-price.js';
import { Price } from '../src/price.js';
import { getSettings } from '../src/settings.js';

import { mockFetch } from './mocks/fetch.js';
import { mockLana, unmockLana } from './mocks/lana.js';
import snapshots from './mocks/snapshots.js';
import { withWcs } from './mocks/wcs.js';
import {
    initMasCommerceService,
    expect,
    disableMasCommerceService,
} from './utilities.js';

/**
 * @param {string} wcsOsi
 * @param {Commerce.Price.AnyOptions} options
 * @returns {Commerce.Price.Placeholder}
 */
function mockInlinePrice(wcsOsi = '', options = {}, append = true) {
    const element = InlinePrice.createInlinePrice({ ...options, wcsOsi });
    if (append) document.body.append(element, document.createElement('br'));
    return element;
}

afterEach(() => {
    document.body.innerHTML = '';
    disableMasCommerceService();
    unmockLana();
});

beforeEach(async () => {
    await mockFetch(withWcs);
    mockLana();
});

describe('class "InlinePrice"', () => {
    it('renders price', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('puf');
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.price);
        expect(inlinePrice.value).to.be.not.empty;
        expect(inlinePrice.options).to.be.not.empty;
    });

    it('re-dispatches click event', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('puf');
        let targetIsInlinePrice = false;
        inlinePrice.addEventListener(
            'click',
            (event) => {
                targetIsInlinePrice = event.target === inlinePrice;
            },
            { once: true },
        );
        await inlinePrice.onceSettled();
        inlinePrice.firstElementChild.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            }),
        );
        expect(targetIsInlinePrice).to.be.true;
    });

    it('re-dispatches click event', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('puf');
        let targetIsInlinePrice = false;
        inlinePrice.addEventListener(
            'click',
            (event) => {
                targetIsInlinePrice = event.target === inlinePrice;
            },
            { once: true },
        );
        await inlinePrice.onceSettled();
        inlinePrice.firstElementChild.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            }),
        );
        expect(targetIsInlinePrice).to.be.true;
    });

    it('renders strikethrough price', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('puf');
        Object.assign(inlinePrice.dataset, { template: 'strikethrough' });
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.strikethrough);
    });

    it('renders optical price', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('puf');
        Object.assign(inlinePrice.dataset, {
            template: 'optical',
            displayPerUnit: true,
            displayTax: true,
        });
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.optical);
    });

    it('renders annual price', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('abm');
        Object.assign(inlinePrice.dataset, { template: 'annual' });
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.annual);
    });

    it('renders price with promo with strikethrough', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('abm-promo');
        inlinePrice.dataset.promotionCode = 'nicopromo';
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.promoStikethrough);
    });

    it('renders price with promo', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('abm-promo');
        inlinePrice.dataset.promotionCode = 'nicopromo';
        inlinePrice.dataset.displayOldPrice = 'false';
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.promo);
    });

    it('overrides price literals', async () => {
        const commerce = await initMasCommerceService();
        const disposer = commerce.providers.price((element, options) => {
            options.literals = {
                recurrenceLabel: 'every month',
            };
        });
        const inlinePrice = mockInlinePrice('abm');
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.customLiterals);
        disposer();
        inlinePrice.dataset.wcsOsi = 'puf'; // to force a re-render
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.price);
    });

    it('does not render failed price', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('xyz');
        inlinePrice.innerHTML = 'test';
        await expect(inlinePrice.onceSettled()).to.be.eventually.rejectedWith(
            'Bad WCS request: 404, url: https://www.adobe.com/web_commerce_artifact?offer_selector_ids=xyz&country=US&locale=en_US&landscape=PUBLISHED&api_key=wcms-commerce-ims-ro-user-milo&language=MULT'
        );
        expect(inlinePrice.innerHTML).to.be.empty;
    });

    it('does not render missing offer', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('no-offer');
        await expect(inlinePrice.onceSettled()).to.be.eventually.rejectedWith(
            ERROR_MESSAGE_OFFER_NOT_FOUND,
        );
        expect(inlinePrice.innerHTML).to.equal('');
    });

    it('renders perpetual offer', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('perpetual', { perpetual: true });
        await inlinePrice.onceSettled();
        // expect(inlinePrice.innerHTML).to.be.empty;
        expect(fetch.lastCall.args[0]).to.contain('language=EN');
        // no more perpetual offer
        inlinePrice.dataset.perpetual = 'false';
        await expect(inlinePrice.onceSettled()).to.be.eventually.rejectedWith(
            ERROR_MESSAGE_OFFER_NOT_FOUND,
        );
        expect(fetch.lastCall.args[0]).to.contain('language=MULT');
    });

    it('renders tax exclusive price', async () => {
        await initMasCommerceService({ 'force-tax-exclusive': true });
        const inlinePrice = mockInlinePrice('tax-exclusive');
        inlinePrice.dataset.promotionCode = 'nicopromo';
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.taxExclusive);
    });

    it('renders discount percentage', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('abm-promo');
        inlinePrice.dataset.template = 'discount';
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.discount);
    });

    it('renders no discount markup', async () => {
        await initMasCommerceService();
        const inlinePrice = mockInlinePrice('abm');
        inlinePrice.dataset.template = 'discount';
        await inlinePrice.onceSettled();
        expect(inlinePrice.innerHTML).to.be.html(snapshots.noDiscount);
    });

    describe('property "isInlinePrice"', () => {
        it('returns true', async () => {
            await initMasCommerceService();
            const inlinePrice = mockInlinePrice('abm');
            expect(inlinePrice.isInlinePrice).to.be.true;
        });
    });

    describe('method "renderOffers"', () => {
        it('fails placeholder if "orders" array is empty', async () => {
            await initMasCommerceService();
            const inlinePrice = mockInlinePrice('abm');
            inlinePrice.renderOffers(
                [],
                {},
                inlinePrice.masElement.togglePending(),
            );
            expect(inlinePrice.state).to.equal(InlinePrice.STATE_FAILED);
        });
    });

    describe('method "requestUpdate"', () => {
        it('has requestUpdate method', async () => {
            await initMasCommerceService();
            const inlinePrice = mockInlinePrice('abm');
            inlinePrice.requestUpdate();
        });
    });

    describe('method "updateOptions"', () => {
        it('updates element data attributes', async () => {
            await initMasCommerceService();
            const inlinePrice = InlinePrice.createInlinePrice({
                template: 'price',
                wcsOsi: 'abm',
            });
            const options = {
                displayOldPrice: true,
                displayPerUnit: true,
                displayRecurrence: true,
                displayTax: true,
                forceTaxExclusive: true,
                perpetual: true,
                promotionCode: 'promo',
                quantity: ['1', '2'],
                template: 'priceOptical',
                wcsOsi: ['m2m', 'puf'],
            };
            inlinePrice.updateOptions(options);
            const { dataset } = inlinePrice;
            expect(dataset.displayOldPrice).to.equal(
                String(options.displayOldPrice),
            );
            expect(dataset.displayPerUnit).to.equal(
                String(options.displayPerUnit),
            );
            expect(dataset.displayRecurrence).to.equal(
                String(options.displayRecurrence),
            );
            expect(dataset.displayTax).to.equal(String(options.displayTax));
            expect(dataset.forceTaxExclusive).to.equal(
                String(options.forceTaxExclusive),
            );
            expect(dataset.perpetual).to.equal(String(options.perpetual));
            expect(dataset.promotionCode).to.equal(
                String(options.promotionCode),
            );
            expect(dataset.quantity).to.equal(String(options.quantity));
            expect(dataset.template).to.equal(String(options.template));
            expect(dataset.wcsOsi).to.equal(String(options.wcsOsi));
        });
    });

    /*
    Commented out until issues in content with manually added tax labels are resolved

    describe('default display tax', () => {
        const SEGMENTS = ['individual', 'business', 'student', 'university'];
        const TESTS = [
            {
                locale: 'AE_ar',
                expected: [false, false, false, false],
            },
            {
                locale: 'AE_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'ZA_en',
                expected: [true, true, false, false],
            },
            {
                locale: 'AT_de',
                expected: [true, true, true, true],
            },
            {
                locale: 'BE_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'BE_fr',
                expected: [true, true, true, true],
            },
            {
                locale: 'BE_nl',
                expected: [true, true, true, true],
            },
            {
                locale: 'BG_bg',
                expected: [true, true, true, true],
            },
            {
                locale: 'CH_de',
                expected: [true, true, true, true],
            },
            {
                locale: 'CH_fr',
                expected: [true, true, true, true],
            },
            {
                locale: 'CH_it',
                expected: [true, true, true, true],
            },
            {
                locale: 'AZ_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'AZ_ru',
                expected: [false, false, false, false],
            },
            {
                locale: 'CZ_cs',
                expected: [true, true, true, true],
            },
            {
                locale: 'DE_de',
                expected: [true, true, true, true],
            },
            {
                locale: 'DK_da',
                expected: [true, true, true, true],
            },
            {
                locale: 'EE_et',
                expected: [true, true, true, true],
            },
            {
                locale: 'EG_ar',
                expected: [true, true, true, true],
            },
            {
                locale: 'EG_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'ES_es',
                expected: [true, true, true, true],
            },
            {
                locale: 'FI_fi',
                expected: [true, true, true, true],
            },
            {
                locale: 'FR_fr',
                expected: [true, true, true, true],
            },
            {
                locale: 'GR_el',
                expected: [true, true, true, true],
            },
            {
                locale: 'GR_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'HU_hu',
                expected: [true, true, true, true],
            },
            {
                locale: 'IE_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'IL_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'IL_iw',
                expected: [false, false, false, false],
            },
            {
                locale: 'IT_it',
                expected: [true, true, true, true],
            },
            {
                locale: 'KW_ar',
                expected: [false, false, false, false],
            },
            {
                locale: 'KW_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'LT_lt',
                expected: [true, true, true, false],
            },
            {
                locale: 'LU_de',
                expected: [true, true, true, true],
            },
            {
                locale: 'LU_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'LU_fr',
                expected: [true, true, true, true],
            },
            {
                locale: 'LV_lv',
                expected: [true, true, true, false],
            },
            {
                locale: 'DZ_ar',
                expected: [false, false, false, false],
            },
            {
                locale: 'DZ_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'NG_en',
                expected: [true, true, false, false],
            },
            {
                locale: 'NL_nl',
                expected: [true, true, true, true],
            },
            {
                locale: 'NO_nb',
                expected: [true, true, true, true],
            },
            {
                locale: 'PL_pl',
                expected: [true, true, true, true],
            },
            {
                locale: 'PT_pt',
                expected: [true, true, true, true],
            },
            {
                locale: 'QA_ar',
                expected: [false, false, false, false],
            },
            {
                locale: 'QA_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'RO_ro',
                expected: [true, true, true, true],
            },
            {
                locale: 'RU_ru',
                expected: [false, false, false, false],
            },
            {
                locale: 'SA_ar',
                expected: [true, false, false, false],
            },
            {
                locale: 'SA_en',
                expected: [true, false, true, false],
            },
            {
                locale: 'SE_sv',
                expected: [true, true, true, true],
            },
            {
                locale: 'SI_sl',
                expected: [true, true, true, true],
            },
            {
                locale: 'SK_sk',
                expected: [true, true, true, true],
            },
            {
                locale: 'TR_tr',
                expected: [true, true, true, true],
            },
            {
                locale: 'UA_uk',
                expected: [true, true, true, true],
            },
            {
                locale: 'ZA_en',
                expected: [true, true, false, false],
            },
            {
                locale: 'AU_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'HK_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'ID_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'ID_in',
                expected: [true, true, true, true],
            },
            {
                locale: 'IN_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'IN_hi',
                expected: [true, true, true, true],
            },
            {
                locale: 'JP_ja',
                expected: [true, true, true, true],
            },
            {
                locale: 'KR_ko',
                expected: [true, true, false, true],
            },
            {
                locale: 'MY_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'MY_ms',
                expected: [true, true, true, true],
            },
            {
                locale: 'NZ_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'PH_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'PH_fil',
                expected: [false, false, false, false],
            },
            {
                locale: 'SG_en',
                expected: [true, false, true, true],
            },
            {
                locale: 'TH_en',
                expected: [true, true, true, true],
            },
            {
                locale: 'TH_th',
                expected: [true, true, true, true],
            },
            {
                locale: 'VN_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'VN_vi',
                expected: [false, false, false, false],
            },
            {
                locale: 'AR_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'BR_pt',
                expected: [false, false, false, false],
            },
            {
                locale: 'CA_en',
                expected: [false, false, false, false],
            },
            {
                locale: 'CA_fr',
                expected: [false, false, false, false],
            },
            {
                locale: 'CL_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'CO_es',
                expected: [false, true, false, false],
            },
            {
                locale: 'CR_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'EC_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'GT_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'LA_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'MX_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'PE_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'PR_es',
                expected: [false, false, false, false],
            },
            {
                locale: 'US_en',
                expected: [false, false, false, false],
            },
        ];

        TESTS.forEach((test) => {
            SEGMENTS.forEach((segment, index) => {
                it(`renders price with tax info for "${test.locale}" and "${segment}"`, async () => {
                    const service = await init(config, true);
                    const inlinePrice = mockInlinePrice(segment);
                    inlinePrice.removeAttribute('data-display-tax');
                    await inlinePrice.onceSettled();
                    const priceTaxElement = inlinePrice.querySelector(
                        '.price-tax-inclusivity',
                    );
                    if (test.expected[index]) {
                        const taxExclusiveLabel =
                            service.literals.price.taxExclusiveLabel;
                        const taxLabel =
                            taxExclusiveLabel.match(/TAX \{(.*?)\}/)[1];
                        expect(priceTaxElement.textContent).to.equal(taxLabel);
                    } else {
                        expect(priceTaxElement.classList.contains('disabled'))
                            .to.be.true;
                    }
                });
            });
        });

        it('renders price with tax info for AE, default tax value', async () => {
            await initMasCommerceService();
            const inlinePrice = mockInlinePrice('abm-team-gov');
            inlinePrice.removeAttribute('data-display-tax');
            inlinePrice.dataset.country = 'AE';
            inlinePrice.dataset.language = 'en';
            await inlinePrice.onceSettled();
            expect(inlinePrice.textContent).equal('US$89.99/mo');
        });
    });
    */
});

describe('commerce service', () => {
    const offers = [
        {
            priceDetails: {
                price: 32.98,
                priceWithoutTax: 29.99,
                usePrecision: true,
                formatString: "'A$'#,##0.00",
                taxDisplay: 'TAX_INCLUSIVE_DETAILS',
                taxTerm: 'GST',
            },
            planType: 'ABM'
        }
    ];
    describe('function "buildPriceHTML"', () => {
        it('returns empty string if no orders provided', async () => {
            const { buildPriceHTML } = await initMasCommerceService();
            expect(buildPriceHTML([])).to.be.empty;
        });

        it('returns empty string if no orders provided - AU with promo', async () => {
            const { buildPriceHTML } = await initMasCommerceService();
            const options = {
                country: 'AU',
                promotionCode: 'promo'
            };
            expect(buildPriceHTML(offers, options)).to.be.html(snapshots.auAbmAnnual);
        });

        it('returns empty string if no orders provided - AU no promo', async () => {
            const { buildPriceHTML } = await initMasCommerceService();
            const options = {
                country: 'AU'
            };
            expect(buildPriceHTML(offers, options)).to.be.html(snapshots.auAbmAnnual);
        });
    });
    describe('function "direct price calls"', () => {
      it('works as expected', async () => {
          const service = await initMasCommerceService();
          const { collectPriceOptions, buildPriceHTML } = new Price({
            literals: { price: {} }, providers: { price: [(p,o) => {/*nop*/} ]}, settings: getSettings(service.config)});
          const inlinePrice1 = mockInlinePrice('abm');
          const options = collectPriceOptions({}, inlinePrice1);
          expect(options).not.to.be.empty;
          buildPriceHTML({ priceDetails:{} }, { template: 'discount', ...options } );
          buildPriceHTML({ priceDetails:{} }, { template: 'strikethrough', ...options });
          buildPriceHTML({ priceDetails:{} }, { template: 'optical', ...options });
          buildPriceHTML({ priceDetails:{} }, { template: 'annual', ...options });
          buildPriceHTML(offers, { country: 'US' });
          buildPriceHTML(offers, { country: 'US', promotionCode: 'promo' });
          buildPriceHTML(offers, { country: 'AU' });
          buildPriceHTML(offers, { country: 'AU', promotionCode: 'promo' });
      });
  });
});
