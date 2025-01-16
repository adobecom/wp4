import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

// Import mocks
import { mockFetch } from './mocks/fetch.js';
import { mockLana } from './mocks/lana.js';

import './spectrum.js';
import '../src/merch-quantity-select.js';
import '../src/merch-stock.js';
import '../src/merch-secure-transaction.js';
import '../src/merch-offer.js';
import '../src/merch-offer-select.js';
import '../src/merch-subscription-panel.js';

import { delay } from './utils.js';
import { mockIms } from './mocks/ims.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';
import { getTemplateContent } from './utils.js';

const content = document.getElementById('content');

runTests(async () => {
    before(async () => {
        // Activate mocks
        mockLana();
        await mockIms();
        await mockFetch(withWcs);
        await mas();
    });

    async function buildPanel(templates) {
        const [merchSubscriptionPanel] = getTemplateContent(
            'merch-subscription-panel',
        );
        const [merchSecureTransaction] = getTemplateContent(
            'merch-secure-transaction',
        );
        merchSubscriptionPanel.append(merchSecureTransaction);
        const promises = templates.map((template) => {
            const [content] = getTemplateContent(template);
            merchSubscriptionPanel.append(content);
            return content.updateComplete;
        });
        content.appendChild(merchSubscriptionPanel);
        await Promise.all([
            ...promises,
            merchSubscriptionPanel.updateComplete,
            merchSecureTransaction.updateComplete,
        ]);
        await delay(100);
        return merchSubscriptionPanel;
    }

    describe('component "merch-subscription-panel"', () => {
        it('renders a panel with the first offer', async () => {
            const panel = await buildPanel([
                'merch-offer-select-cci',
                'merch-stock',
            ]);
            await delay(100);
            const merchOfferSelect = panel.querySelector('merch-offer-select');
            expect(
                merchOfferSelect.querySelector('merch-offer').planType,
            ).to.eq('ABM');
        });

        it('renders a panel with monthly first and pre-selects ABM', async () => {
            const panel = await buildPanel([
                'merch-offer-select-cci-monthy-first',
            ]);
            const merchOfferSelect = panel.querySelector('merch-offer-select');

            expect(
                merchOfferSelect.querySelector('merch-offer').planType,
            ).to.eq('M2M');
            const [m2m, abm, puf] =
                merchOfferSelect.querySelectorAll('merch-offer');
            expect(m2m.selected).to.be.false;
            expect(abm.selected).to.be.true;
            puf.click();
            await delay(50);
            expect(m2m.selected).to.be.false;
            expect(abm.selected).to.be.false;
            expect(puf.selected).to.be.true;
        });

        it('renders with offer teaser', async () => {
            const panel = await buildPanel(['merch-offer-select-cct']);
            const merchOfferSelect = panel.querySelector('merch-offer-select');
            expect(
                merchOfferSelect
                    .querySelector('merch-offer[plan-type="PUF"]')
                    .shadowRoot.querySelector('slot[name="teaser"]')
                    .assignedElements()[0].innerText,
            ).to.eq('Save with the annual prepaid plan.');
        });

        it('renders team offers with tax text', async () => {
            const panel = await buildPanel(['merch-offer-select-cct-tax']);
            const merchOfferSelect = panel.querySelector('merch-offer-select');
            expect(merchOfferSelect.textContent).to.match(/excl. tax/);
        });

        it('renders with quantity selector', async () => {
            const [merchSubscriptionPanel] = getTemplateContent(
                'merch-subscription-panel',
            );
            const [merchOfferSelect] = getTemplateContent(
                'merch-offer-select-cct',
            );

            const [merchSecureTransaction] = getTemplateContent(
                'merch-secure-transaction',
            );

            const [merchQuantitySelect] = getTemplateContent(
                'merch-quantity-select',
            );

            merchSubscriptionPanel.append(
                merchOfferSelect,
                merchQuantitySelect,
                merchSecureTransaction,
            );

            content.appendChild(merchSubscriptionPanel);

            await Promise.all([
                merchOfferSelect.updateComplete,
                merchSubscriptionPanel.updateComplete,
                merchQuantitySelect.updateComplete,
                merchSecureTransaction.updateComplete,
            ]);

            await delay(100);

            expect(
                merchSubscriptionPanel.shadowRoot
                    .querySelector('slot[name="footer"]')
                    .assignedElements()[0],
            ).to.eq(merchQuantitySelect);
            merchQuantitySelect.defaultValue = 5;
            await delay(50);
            expect(
                decodeURI(
                    merchSubscriptionPanel.shadowRoot.querySelector(
                        '[is="checkout-link"]',
                    ).href,
                ),
            ).to.match(/items\[0\]\[q\]=5/);
        });

        it('renders cta with custom parameters', async () => {
            const CTA_URL_SEGMENTATION =
                'https://commerce.adobe.com/store/segmentation?ms=COM&ot=BASE&pa=ccsn_direct_individual&cli=adobe_com&ctx=fp&co=US&lang=en';
            const CTA_PROMO_COMMITMENT =
                'https://commerce.adobe.com/store/commitment?items%5B0%5D%5Bid%5D=257E1D82082387D152029F93C1030624&apc=blackfriday&cli=adobe_com&ctx=fp&co=US&lang=en';
            const CTA_PROMO_COMMITMENT_Q3 =
                'https://commerce.adobe.com/store/commitment?items%5B0%5D%5Bid%5D=257E1D82082387D152029F93C1030624&items%5B0%5D%5Bq%5D=3&apc=blackfriday&cli=adobe_com&ctx=fp&co=US&lang=en';
            const CTA_PROMO_STOCK =
                'https://commerce.adobe.com/store/commitment?items%5B0%5D%5Bid%5D=257E1D82082387D152029F93C1030624&items%5B0%5D%5Bq%5D=3&items%5B1%5D%5Bid%5D=3002E1908F4574F62C0A9ABA58196755&items%5B1%5D%5Bq%5D=1&apc=blackfriday&cli=adobe_com&ctx=fp&co=US&lang=en';
            const panel = await buildPanel([
                'merch-offer-select-promo',
                'merch-quantity-select',
                'merch-stock',
            ]);
            const merchOfferSelect = panel.querySelector('merch-offer-select');
            let cta = panel.shadowRoot.querySelector('a[is="checkout-link"]');
            //renders initially a link with segmentation step
            expect(cta?.href).to.eq(CTA_URL_SEGMENTATION);

            merchOfferSelect.querySelector('merch-offer:nth-child(2)')?.click();
            await delay(50);
            cta = panel.shadowRoot.querySelector('a[is="checkout-link"]');
            // after click changes link to commitment step with promo code
            expect(cta?.href).to.eq(CTA_PROMO_COMMITMENT);

            // changes quantity
            const qs = panel.querySelector('merch-quantity-select');
            qs.shadowRoot.querySelector('.picker-button').click();
            await delay(100);
            qs.shadowRoot
                .querySelector('.popover')
                ?.querySelector('div:nth-child(3)')
                .click();
            await delay(50);
            cta = panel.shadowRoot.querySelector('a[is="checkout-link"]');
            expect(cta?.href).to.eq(CTA_PROMO_COMMITMENT_Q3);

            //adds stock
            const stock = panel
                .querySelector('merch-stock')
                .shadowRoot.querySelector('sp-checkbox');
            stock.click();
            await delay(50);
            cta = panel.shadowRoot.querySelector('a[is="checkout-link"]');
            expect(cta?.href).to.eq(CTA_PROMO_STOCK);
        });
    });
});
