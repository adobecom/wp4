import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockIms } from './mocks/ims.js';
import { mockFetch } from './mocks/fetch.js';

import '../src/global.css.js';
import '../src/merch-offer-select.js';
import '../src/merch-offer.js';
import '../src/merch-quantity-select.js';
import '../src/merch-stock.js';
import '../src/merch-secure-transaction.js';
import '../src/merch-subscription-panel.js';
import '../src/merch-whats-included.js';
import '../src/merch-mnemonic-list.js';
import '../src/merch-twp-d2p.js';
import './spectrum.js';

import {
    addStock,
    applyTemplate,
    gotoStep1,
    gotoStep2,
    hooverElement,
    selectPlanType,
    shouldSkipTests,
    verifyCheckoutUrl,
} from './merch-twp-d2p.utils.js';
import { appendMiloStyles, delay } from './utils.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';

const ABM = 'ABM';
const PUF = 'PUF';
const M2M = 'M2M';

runTests(async () => {
    appendMiloStyles();
    mockLana();
    await mockFetch(withWcs);
    await mockIms();
    await mas();

    if (shouldSkipTests) {
        const template = new URLSearchParams(window.location.hash.slice(1)).get(
            'template',
        );
        if (template) {
            await applyTemplate(template);
        }
        return;
    }

    describe.skip('merch-twp-d2p with 1 card', async () => {
        beforeEach(async function () {
            document.querySelector('merch-twp-d2p')?.remove();
            let payload = '';
            if (/mobile/.test(this.currentTest.title)) payload = 'mobile';
            else if (/tablet/.test(this.currentTest.title)) payload = 'tablet';

            await executeServerCommand(
                'emulate',
                payload,
                'test-runner-device-emulator',
            );
        });

        /** causes an infinit loop, skipping for now */
        it('renders on desktop', async () => {
            await applyTemplate('cci-footer,premiere', false);
            const merchCard = document.querySelector(
                'merch-card[aria-selected]',
            );
            expect(merchCard.title).to.equal('Premiere');
            const merchOffer = await selectPlanType(PUF);
            await hooverElement(merchOffer.shadowRoot.getElementById('info'));
            await addStock();
            verifyCheckoutUrl(
                'https://commerce.adobe.com/store/commitment?items%5B0%5D%5Bid%5D=9E618D5A589EF8D6364DFBE02FC2C264&items%5B0%5D%5Bq%5D=1&items%5B1%5D%5Bid%5D=E3171ADBB9D7A5359EC8128650B7710D&items%5B1%5D%5Bq%5D=1&cli=adobe_com&ctx=fp&co=US&lang=en',
            );
            await visualDiff(
                document.querySelector('merch-twp-d2p'),
                '1-card-premiere-cci-desktop',
            );
        });

        it('renders on tablet', async () => {
            await applyTemplate('cci-footer,premiere', false);
            await gotoStep2();
            await selectPlanType(M2M);
            verifyCheckoutUrl(
                'https://commerce.adobe.com/store/commitment?items%5B0%5D%5Bid%5D=257E1D82082387D152029F93C1030624&cli=adobe_com&ctx=fp&co=US&lang=en',
            );
            await visualDiff(
                document.querySelector('sp-dialog-base'),
                '1-card-premiere-cci-tablet-step-2',
            );
            await gotoStep1();
            await visualDiff(
                document.querySelector('sp-dialog-base'),
                '1-card-premiere-cci-tablet-step-1',
            );
        });

        it('renders on mobile', async () => {
            await applyTemplate('cci-footer,premiere', false);
            await gotoStep2();
            await selectPlanType(M2M);
            verifyCheckoutUrl(
                'https://commerce.adobe.com/store/commitment?items%5B0%5D%5Bid%5D=257E1D82082387D152029F93C1030624&cli=adobe_com&ctx=fp&co=US&lang=en',
            );
            await visualDiff(
                document.querySelector('sp-dialog-base'),
                '1-card-premiere-cci-mobile-step-2',
            );
            await gotoStep1();
            await visualDiff(
                document.querySelector('sp-dialog-base'),
                '1-card-premiere-cci-mobile-step-1',
            );
        });
    });

    describe.skip('merch-twp-d2p with Storage Options', async () => {
        it('renders Storage Options and selects default merch-offer-select', async () => {
            await applyTemplate(
                'all-apps,photography-storage,cci-footer,cct-footer,cce-footer',
            );
            await delay(50);
            const selectedCard = document.querySelector(
                'merch-card[aria-selected]',
            );
            const storageOptions =
                selectedCard?.querySelector('sp-radio-group');
            expect(storageOptions?.selected).to.eq('20GB');
            expect(selectedCard.offerSelect.getAttribute('storage')).to.eq(
                '20GB',
            );
        });

        it('switch Storage Option on click and update merch-offer-select', async () => {
            const panel = document.querySelector(
                'merch-twp-d2p merch-subscription-panel',
            );
            const selectedCard = document.querySelector(
                'merch-card[aria-selected]',
            );
            const storageOptions =
                selectedCard?.querySelector('sp-radio-group');
            storageOptions?.querySelector('sp-radio[value="1TB"]').click();
            await delay(100);

            expect(storageOptions?.selected).to.eq('1TB');
            expect(selectedCard.offerSelect.getAttribute('storage')).to.eq(
                '1TB',
            );
            expect(panel.offerSelect.getAttribute('storage')).to.eq('1TB');
        });

        it('preselects the card from hash', async () => {
            document.location.hash = 'select-cards=photoshop&creat&creati';
            await applyTemplate('cci-footer,preselect-card', false);
            const merchCard = document.querySelector(
                'merch-card[aria-selected]',
            );
            expect(merchCard.title).to.equal('Photoshop');
        });
    });
});
