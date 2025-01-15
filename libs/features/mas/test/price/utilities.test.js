import { expect } from '@esm-bundle/chai';

import { Term, Commitment } from '@pandora/data-models-odm';
import {
    formatAnnualPrice,
    formatOpticalPrice,
    isPromotionActive,
} from '../../src/price/utilities.js';

const OPTICAL_TEST_CASES = [
    [
        {
            commitment: Commitment.YEAR,
            formatString: "#,##0 '円'",
            term: Term.ANNUAL,
            usePrecision: false,
        },
        [
            [14604, '1,217 円'],
            [14605, '1,218 円'],
            [14608, '1,218 円'], // @see https://jira.corp.adobe.com/browse/MWPW-122393
            [14615, '1,218 円'],
            [14616, '1,218 円'],
            [14617, '1,219 円'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'CHF'#0.00",
            term: Term.ANNUAL,
            usePrecision: true,
        },
        [
            [23.7, 'CHF1.98'],
            [24.991, 'CHF2.08'],
            [24.77, 'CHF2.06'],
            [24.8899, 'CHF2.07'],
            [12000.24321, 'CHF1000.02'],
            [12000.489, 'CHF1000.04'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'EUR'#0.00",
            term: Term.ANNUAL,
            usePrecision: true,
        },
        [
            [23.7, 'EUR1.98'],
            [24.99, 'EUR2.08'],
            [24.77, 'EUR2.06'],
            [24.88, 'EUR2.07'],
            [12000.24, 'EUR1000.02'],
            [12000.48, 'EUR1000.04'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'US$'#0.00",
            term: Term.ANNUAL,
            usePrecision: true,
        },
        [
            [23.7, 'US$1.98'],
            [24.99, 'US$2.08'],
            [24.77, 'US$2.06'],
            [24.88, 'US$2.07'],
            [820.2, 'US$68.35'],
            [12000.24, 'US$1000.02'],
            [12000.48, 'US$1000.04'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'CHF' #,##0.00",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [
            [23.7, 'CHF 23.70'],
            [24.99, 'CHF 24.99'],
            [24.77, 'CHF 24.77'],
            [24.88, 'CHF 24.88'],
            [1200.24, 'CHF 1,200.24'],
            [1200.48, 'CHF 1,200.48'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "# ##0,00 'DKK'",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [
            [23.7, '23,70 DKK'],
            [24.99, '24,99 DKK'],
            [24.77, '24,77 DKK'],
            [24.88, '24,88 DKK'],
            [36.59, '36,59 DKK'],
            [1200.24, '1 200,24 DKK'],
            [1200.48, '1 200,48 DKK'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'MXN $'# ##0.00",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [
            [23.7, 'MXN $23.70'],
            [24.99, 'MXN $24.99'],
            [24.77, 'MXN $24.77'],
            [24.88, 'MXN $24.88'],
            [1200.24, 'MXN $1 200.24'],
            [1200.48, 'MXN $1 200.48'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'CAD $'#,##0.00",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [
            [23.7, 'CAD $23.70'],
            [24.99, 'CAD $24.99'],
            [24.77, 'CAD $24.77'],
            [24.88, 'CAD $24.88'],
            [1200.24, 'CAD $1,200.24'],
            [1200.48, 'CAD $1,200.48'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "# ##0,00'$ CAD'",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [
            [23.7, '23,70$ CAD'],
            [24.99, '24,99$ CAD'],
            [24.77, '24,77$ CAD'],
            [24.88, '24,88$ CAD'],
            [1200.24, '1 200,24$ CAD'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'US $'#,##0.00",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [
            [23.7, 'US $23.70'],
            [24.99, 'US $24.99'],
            [24.77, 'US $24.77'],
            [24.88, 'US $24.88'],
            [1200.24, 'US $1,200.24'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "# ##0,00'$ US'",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [
            [23.7, '23,70$ US'],
            [24.99, '24,99$ US'],
            [24.77, '24,77$ US'],
            [24.88, '24,88$ US'],
            [1200.24, '1 200,24$ US'],
        ],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'&#8377;'#,##,##0.00",
            term: Term.ANNUAL,
            usePrecision: true,
            isIndianPrice: true,
        },
        [[40600000, '&#8377;33,83,333.33']],
    ],
];

const ANNUAL_TEST_CASES = [
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'US $'#,##0.00",
            term: Term.MONTHLY,
            usePrecision: true,
        },
        [[59.99, 'US $719.88']],
    ],
    [
        {
            commitment: Commitment.YEAR,
            formatString: "'US $'#,##0.00",
            term: Term.ANNUAL,
            usePrecision: true,
        },
        [[659.88, 'US $659.88']],
    ],
];

describe('function "formatOpticalPrice"', () => {
    OPTICAL_TEST_CASES.forEach(([options, tests]) => {
        describe(`with options ${JSON.stringify(options)}`, () => {
            tests.forEach(([price, result]) => {
                it(`formats price ${price} as ${result}`, () => {
                    expect(
                        formatOpticalPrice({
                            ...options,
                            price,
                        }).accessiblePrice,
                    ).to.equal(result);
                });
            });
        });
    });
});

describe('function "formatAnnualPrice"', () => {
    ANNUAL_TEST_CASES.forEach(([options, tests]) => {
        describe(`with options ${JSON.stringify(options)}`, () => {
            tests.forEach(([price, result]) => {
                it(`formats price ${price} as ${result}`, () => {
                    expect(
                        formatAnnualPrice({
                            ...options,
                            price,
                        }).accessiblePrice,
                    ).to.equal(result);
                });
            });
        });
    });
});

describe('isPromotionActive', () => {
    const validPromotion = {
        start: '2024-01-01T00:00:00.000Z',
        end: '2024-12-31T23:59:59.999Z',
        outcomeType: 'PERCENTAGE_DISCOUNT',
        duration: 'P6M',
        amount: 25,
        minProductQuantity: 1,
    };
    it('promotion is active when date is within promotion period', () => {
        expect(
            isPromotionActive(validPromotion, '2024-06-15T12:00:00.000Z'),
        ).to.equal(true);
    });

    it('promotion is active when date matches start date exactly', () => {
        expect(
            isPromotionActive(validPromotion, '2024-01-01T00:00:00.000Z'),
        ).to.equal(true);
    });

    it('promotion is active when date matches end date exactly', () => {
        expect(
            isPromotionActive(validPromotion, '2024-12-31T23:59:59.999Z'),
        ).to.equal(true);
    });

    it('promotion is not active when date is before promotion period', () => {
        expect(
            isPromotionActive(validPromotion, '2023-12-31T23:59:59.999Z'),
        ).to.equal(false);
    });

    it('promotion is not active when date is after promotion period', () => {
        expect(
            isPromotionActive(validPromotion, '2025-01-01T00:00:00.000Z'),
        ).to.equal(false);
    });

    it('promotion is not active when promotion dates are missing', () => {
        const invalidPromotion = { start: null, end: null };
        expect(isPromotionActive(invalidPromotion)).to.equal(false);
    });

    it('promotion is not active when promotion is missing start date', () => {
        const invalidPromotion = {
            start: null,
            end: '2024-12-31T23:59:59.999Z',
        };
        expect(isPromotionActive(invalidPromotion)).to.equal(false);
    });

    it('promotion is not active when promotion is missing end date', () => {
        const invalidPromotion = {
            start: '2024-01-01T00:00:00.000Z',
            end: null,
        };
        expect(isPromotionActive(invalidPromotion)).to.equal(false);
    });
});

describe('formatAnnualPrice', () => {
    const promotion = {
        start: '2024-11-15T04:02:37.000Z',
        end: '2030-03-01T07:59:00.000Z',
        displaySummary: {
            outcomeType: 'PERCENTAGE_DISCOUNT',
            duration: 'P6M',
            amount: 25,
            minProductQuantity: 1,
        },
    };

    it.only('should format annual price when promotion details are provided', () => {
        expect(
            formatAnnualPrice({
                formatString: "'A$'#,##0.00",
                price: 23.23,
                originalPrice: 23.23,
                priceWithoutDiscount: 30.99,
                commitment: Commitment.YEAR,
                term: Term.MONTHLY,
                instant: '2024-12-01T00:00:00.000Z',
                promotion,
            }).accessiblePrice,
        ).to.equal('A$325.32');
    });

    it('should format annual price with regular price when min quantity is not met', () => {
        expect(
            formatAnnualPrice({
                formatString: "'A$'#,##0.00",
                price: 23.23,
                originalPrice: 23.23,
                priceWithoutDiscount: 30.99,
                commitment: Commitment.YEAR,
                term: Term.MONTHLY,
                promotion: {
                    ...promotion,
                    minProductQuantity: 2,
                },
            }).accessiblePrice,
        ).to.equal('A$371.88');
    });

    it('should format annual price with discount when promotion details are not provided', () => {
        expect(
            formatAnnualPrice({
                formatString: "'A$'#,##0.00",
                price: 23.23,
                originalPrice: 23.23,
                priceWithoutDiscount: 30.99,
                commitment: Commitment.YEAR,
                term: Term.MONTHLY,
            }).accessiblePrice,
        ).to.equal('A$278.76');
    });
});
