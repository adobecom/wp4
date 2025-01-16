// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';

import '../src/merch-offer.js';
import '../src/merch-offer-select.js';
import '../src/merch-quantity-select.js';

import { appendMiloStyles, delay } from './utils.js';
import { mockIms } from './mocks/ims.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';

const skipTests = sessionStorage.getItem('skipTests');

runTests(async () => {
    mockIms();
    mockLana();
    await mockFetch(withWcs);
    await mas();
    if (skipTests !== null) {
        appendMiloStyles();
        return;
    }
    describe('merch-card web component', () => {
        it('should exist in the HTML document', async () => {
            expect(document.querySelector('merch-card')).to.exist;
        });
        it('should exist special offers card in HTML document', async () => {
            expect(
                document.querySelector('merch-card[variant="special-offers"]'),
            ).to.exist;
        });
        it('should display a merch-badge', async () => {
            expect(
                document
                    .querySelector('merch-card[variant="special-offers"]')
                    .shadowRoot.querySelector('.special-offers-badge'),
            ).to.exist;
        });
    });

    it('should return title for special offer card', async () => {
        const title = document.querySelector(
            'merch-card[variant="special-offers"]',
        ).title;
        expect(title).to.equal('INDIVIDUALS');
    });
});
