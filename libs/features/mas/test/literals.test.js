import { Defaults } from '../src/commerce.js';
import { getPriceLiterals } from '../src/literals.js';
import { expect } from './utilities.js';
import { readFile } from '@web/test-runner-commands';

describe('function "getPriceLiterals"', () => {
    it('returns literals', async () => {
        const priceLiterals = await (readFile({ path: '../price-literals.json' }));
        const literals = await getPriceLiterals({
            language: 'en',
        }, JSON.parse(priceLiterals));
        expect(literals.lang).to.equal(Defaults.language);
    });

    it('returns literals for default language if requested does not exist', async () => {
      const priceLiterals = await (readFile({ path: '../price-literals.json' }));
        const literals = await getPriceLiterals({
            language: 'test',
        }, JSON.parse(priceLiterals));
        expect(literals.lang).to.equal(Defaults.language);
    });

    it('returns "price literals" object', async () => {
        const priceLiterals = await (readFile({ path: '../price-literals.json' }));
        const literals = await getPriceLiterals({
          language: 'en',
        }, JSON.parse(priceLiterals));
        [
            'alternativePriceAriaLabel',
            'freeAriaLabel',
            'freeLabel',
            'perUnitAriaLabel',
            'perUnitLabel',
            'recurrenceAriaLabel',
            'recurrenceLabel',
            'strikethroughAriaLabel',
            'taxExclusiveLabel',
            'taxInclusiveLabel',
        ].forEach((key) => {
            const literal = literals[key];
            expect(literal).to.be.string;
            expect(literal).to.not.be.empty;
        });
    });

});
