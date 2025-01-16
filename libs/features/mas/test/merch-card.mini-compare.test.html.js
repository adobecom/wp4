// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';

import './utils.js';
import '../src/merch-offer.js';
import '../src/merch-offer-select.js';
import '../src/merch-quantity-select.js';

import { mockIms } from './mocks/ims.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';

runTests(async () => {
    mockIms();
    mockLana();
    await mockFetch(withWcs);
    await mas();
    describe('merch-card web component with mini-compare variant', () => {
        it('mini-compare-chart should have same body slot heights', async () => {
            const miniCompareCharts = document.querySelectorAll(
                'merch-card[variant="mini-compare-chart"]',
            );
            await Promise.all(
                [...miniCompareCharts].flatMap((card) => {
                    return [
                        card.updateComplete,
                        ...[...card.querySelectorAll('[data-wcs-osi]')].map(
                            (osi) => osi.onceSettled(),
                        ),
                    ];
                }),
            );
            const [card1Slots, card2Slots, card3Slots] = [
                ...miniCompareCharts,
            ].map((miniCompareChart) => {
                const heights = [
                    'slot[name="heading-m"]',
                    'slot[name="body-m"]',
                    'slot[name="heading-m-price"]',
                    'slot[name="body-xxs"]',
                    'slot[name="price-commitment"]',
                    'slot[name="offers"]',
                    'slot[name="promo-text"]',
                    'slot[name="callout-content"]',
                    'footer',
                ]
                    .map((selector) => {
                        const el =
                            miniCompareChart.shadowRoot.querySelector(selector);
                        if (!el) return 0;
                        return parseInt(window.getComputedStyle(el).height, 10);
                    })
                    .join(',');
                return heights;
            });
            expect(card1Slots).to.not.contain('auto');
            expect(card1Slots).to.equal(card2Slots);
            expect(card2Slots).to.equal(card3Slots);
        });

        it('mini-compare-chart should have same height footer rows', async () => {
            const miniCompareCharts = document.querySelectorAll(
                'merch-card[variant="mini-compare-chart"]',
            );
            await Promise.all(
                [...miniCompareCharts].map((card) => card.updateComplete),
            );
            const [card1Rows, card2Rows, card3Rows] = [
                ...miniCompareCharts,
            ].map((miniCompareChart) => {
                const heights = new Array(5)
                    .fill()
                    .map(
                        (_, i) =>
                            parseInt(
                                window.getComputedStyle(
                                    miniCompareChart.querySelector(
                                        `.footer-row-cell:nth-child(${i + 1})`,
                                    ),
                                ),
                                10,
                            ).height,
                    )
                    .join(',');
                return heights;
            });
            expect(card1Rows).to.not.contain('NaN');
            expect(card1Rows).to.equal(card2Rows);
            expect(card2Rows).to.equal(card3Rows);
        });

        it('mini-compare-chart should remove empty rows', async () => {
            const miniCompareChart = document.querySelector(
                'merch-card[variant="mini-compare-chart"]',
            );
            miniCompareChart?.variantLayout?.removeEmptyRows();
            expect(true, 'removing empty lines do not fail').to.be.true; // TODO improve the assertion
        });
    });
});
