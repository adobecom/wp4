import { expect } from '@esm-bundle/chai';

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

/* To update index.test.js.snap, inspect body > div, and run copy($0.outherHTML) in the js console, and paste it */
const snapshots = await fetch('test/price/__snapshots__/index.test.js.snap')
    .then((response) => response.text())
    .then(
        (text) =>
            new DOMParser().parseFromString(text, 'text/html').body
                .firstElementChild,
    );

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
    const snapshotEl = snapshots.querySelector(`#${id}`);
    expect(el.innerHTML).to.equal(snapshotEl.innerHTML);
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
                        const idPrefix = `${templateName}${Object.keys(context)[0]}${name.split(':')[0]}`;
                        renderText(
                            `${this.test.parent.parent.title} ${this.test.parent.title} ${this.test.title}: language = en`,
                        );
                        renderAndComparePrice(
                            `${idPrefix}1`,
                            template({ ...context, ...globals }, offer, {
                                'data-analytics-productinfo':
                                    '[{"test":"value"}]',
                            }),
                        );
                        renderAndComparePrice(
                            `${idPrefix}2`,
                            template(
                                {
                                    ...context,
                                    ...globals,
                                    literals,
                                    language: 'en',
                                },
                                offer,
                            ),
                        );
                    });
                });
            });
        });
    });
});
