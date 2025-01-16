import { expect } from '@esm-bundle/chai';
import {
    createPriceTemplate,
    createPromoPriceTemplate,
    createPriceWithAnnualTemplate,
    createPromoPriceWithAnnualTemplate,
} from '../../src/price/template.js';

const context = {
    country: 'US',
    language: 'en',
};
const value = {
    formatString: '#0',
    price: 100,
};

const valueAbm = {
    formatString: '#0',
    price: 100,
    commitment: 'YEAR',
    term: 'MONTHLY',
};

const valueDiscount = {
    formatString: '#0',
    price: 80,
    priceWithoutDiscount: 100,
};

const valueDiscountAbm = {
    formatString: '#0',
    price: 80,
    priceWithoutDiscount: 100,
    commitment: 'YEAR',
    term: 'MONTHLY',
};

const valueNotApplicableDiscount = {
    formatString: '#0',
    price: 100,
    priceWithoutDiscount: 100,
};

const root = document.createElement('div');
document.body.append(root);

/* To update index.test.js.snap, inspect body > div, and run copy($0.outherHTML) in the js console, and paste it */
const snapshots = await fetch('test/price/__snapshots__/template.test.js.snap')
    .then((response) => response.text())
    .then(
        (text) =>
            new DOMParser().parseFromString(text, 'text/html').body
                .firstElementChild,
    );

function renderAndComparePrice(id, html) {
    const el = document.createElement('div', { id });
    el.setAttribute('id', id);
    el.innerHTML = html;
    root.append(el);
    const snapshotEl = snapshots.querySelector(`#${id}`);
    expect(el.innerHTML).to.equal(snapshotEl?.innerHTML);
}

describe('function "createPriceTemplate"', () => {
    describe('argument "attributes"', () => {
        it('renders custom attributes having allowed types', function () {
            const template = createPriceTemplate();
            renderAndComparePrice(
                'createPriceTemplate1',
                template(context, value, {
                    string: 's',
                    json: '{ "foo" : "bar" }',
                    number: 1,
                    truthy: true,
                    falsy: false,
                    null: null,
                    undefined: undefined,
                    array: [1, 2, 3],
                    object: { foo: 'bar' },
                }),
            );
        });

        it('does not throw if attributes are missing', () => {
            const template = createPriceTemplate();
            expect(() => template(context, value)).to.not.throw();
        });
    });
});

describe('function "createPromoPriceTemplate"', () => {
    it('displays both new & old prices', function () {
        const template = createPromoPriceTemplate();
        renderAndComparePrice(
            'createPromoPriceTemplate1',
            template(context, valueDiscount, {
                string: 's',
                json: '{ "foo" : "bar" }',
                number: 1,
                truthy: true,
                falsy: false,
                null: null,
                undefined: undefined,
                array: [1, 2, 3],
                object: { foo: 'bar' },
            }),
        );
    });
    it('displays only new price in case old is the same than new', function () {
        const template = createPromoPriceTemplate();
        renderAndComparePrice(
            'createPromoPriceTemplate2',
            template(context, valueNotApplicableDiscount, {
                string: 's',
                json: '{ "foo" : "bar" }',
                number: 1,
                truthy: true,
                falsy: false,
                null: null,
                undefined: undefined,
                array: [1, 2, 3],
                object: { foo: 'bar' },
            }),
        );
    });
});

describe('function "createPriceWithAnnualTemplate"', function () {
    it('displays ABM with annual price', () => {
        const template = createPriceWithAnnualTemplate();
        renderAndComparePrice(
            'createPriceWithAnnualTemplate1',
            template(context, valueAbm, {}),
        );
    });
});

describe('function "createPromoPriceWithAnnualTemplate"', function () {
    it('displays ABM with annual price and old price', () => {
        const template = createPromoPriceWithAnnualTemplate();
        renderAndComparePrice(
            'createPromoPriceWithAnnualTemplate1',
            template(context, valueDiscountAbm, {}),
        );
    });
});
