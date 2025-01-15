import * as snapshots from './__snapshots__/index.snapshot.js';
import { expect } from '../utilities.js';

import {
    price,
    priceOptical,
    priceStrikethrough,
    priceAnnual,
    priceWithAnnual,
    pricePromoWithAnnual,
} from '../../src/price/index.js';

const globals = { country: 'US', language: 'en' };

const data = await fetch('/test/price/data.json').then((response) =>
    response.json(),
);

const defaultLiterals = await fetch('/price-literals.json')
    .then((response) => response.json())
    .then((literals) =>
        literals.data.find((literals) => literals.lang === 'en'),
    );

const literals = {
    ...defaultLiterals,
    recurrenceLabel:
        '{recurrenceTerm, select, MONTH {<p>/mo</p>} YEAR {<p>/yr</p>} other {}}',
};

const root = document.createElement('div');
document.body.append(root);

const renderText = (content, tag = 'p') => {
    const el = document.createElement(tag);
    el.textContent = content;
    root.append(el);
};

const renderAndComparePrice = (id, html) => {
    const el = document.createElement('div', { id });
    el.setAttribute('id', id);
    el.innerHTML = html;
    root.append(el);
    expect(el.innerHTML).to.be.html(snapshots[id]);
};

Object.entries({
    price,
    priceOptical,
    priceStrikethrough,
    priceAnnual,
    priceWithAnnual,
    pricePromoWithAnnual,
}).forEach(([templateName, template]) => {
    describe(`template "${templateName}"`, () => {
        [
            { displayPerUnit: true },
            { displayRecurrence: false },
            { displayTax: true },
            { forceTaxExclusive: false },
            { forceTaxExclusive: true },
        ].forEach((context) => {
            describe(`context "${JSON.stringify(context)}"`, () => {
                Object.entries(data).forEach(([name, offer]) => {
                    it(`renders "${name}"`, function () {
                        const idPrefix =
                            `${templateName}${Object.entries(context)[0].join('')}${name.split(':')[0]}`.replace(
                                /-/g,
                                '',
                            );
                        renderText(
                            `${this.test.parent.parent.title} ${this.test.parent.title} ${this.test.title}: language = en`,
                        );
                        renderAndComparePrice(
                            `${idPrefix}1`,
                            template({ ...context, ...globals }, offer, {}),
                        );
                    });
                });
            });
        });
    });
});
