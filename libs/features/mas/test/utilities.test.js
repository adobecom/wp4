import { selectOffers } from '../src/utilities.js';

import { expect } from './utilities.js';

describe('function "selectWcsOffers"', () => {
    it('returns second offer for perpetual if first is MULT', () => {
        const offers = selectOffers(
            [{ language: 'MULT' }, { language: 'DE' }],
            { perpetual: true },
        );
        expect(offers[0].language).to.equal('DE');
    });

    it('uses offer prices without taxes if "forceTaxExclusive" is set', () => {
        const offers = selectOffers(
            [
                {
                    priceDetails: {
                        price: 2,
                        priceWithoutTax: 1,
                        priceWithoutDiscount: 3,
                        priceWithoutDiscountAndTax: 4,
                        taxDisplay: 'TAX_INCLUSIVE_DETAILS',
                    },
                },
            ],
            { forceTaxExclusive: true },
        );
        expect(offers[0].priceDetails.price).to.equal(1);
        expect(offers[0].priceDetails.priceWithoutDiscount).to.equal(4);
    });
});
