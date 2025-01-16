import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';

import '../src/merch-offer.js';
import '../src/merch-offer-select.js';
import '../src/merch-quantity-select.js';

import { delay } from './utils.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';

function getDynamicElements(merchCard, merchOfferSelect) {
    const price = merchOfferSelect.price;
    const cta = merchOfferSelect.getSlottedElement('cta');
    const description = merchOfferSelect.getSlottedElement('description');
    const badge = merchCard.shadowRoot.querySelector('div.plans-badge');
    return { price, cta, description, badge };
}

const main = document.querySelector('main');

const renderCard = async (id) => {
    const [merchCard] = document
        .getElementById(id)
        .content.cloneNode(true).children;
    main.append(merchCard);
    const merchOfferSelect = merchCard.querySelector('merch-offer-select');
    const merchQuantitySelect = merchCard.querySelector(
        'merch-quantity-select',
    );
    await merchCard.updateComplete;
    await merchOfferSelect?.updateComplete;
    await merchQuantitySelect?.updateComplete;
    const options = merchQuantitySelect?.shadowRoot.querySelectorAll('.item');
    const pickerButton =
        merchQuantitySelect?.shadowRoot.querySelector('.picker-button');
    await delay(100);
    return {
        merchCard,
        merchOfferSelect,
        merchQuantitySelect,
        options,
        pickerButton,
    };
};

runTests(async () => {
    mockLana();
    await mockFetch(withWcs);
    await mas();

    describe('merch-offer-select web component', async () => {
        it('should exist, autoselect first offer and render price and cta', async () => {
            const { merchCard, merchOfferSelect } = await renderCard('card1');
            await delay(100);
            const { price, cta, description, badge } = getDynamicElements(
                merchCard,
                merchOfferSelect,
            );
            expect(merchOfferSelect).to.exist;
            expect(price.innerText).to.equal('US$54.99/mo');
            expect(cta.getAttribute('data-wcs-osi')).to.equal('abm');
            expect(description.innerText).to.equal('Access advanced PDF.');
            expect(badge.innerText).to.equal('Recommended');
            const [offer1, offer2] =
                merchOfferSelect.querySelectorAll('merch-offer');
            expect(offer1.getAttribute('aria-selected')).to.exist;
            expect(offer2.getAttribute('aria-selected')).to.not.exist;
        });

        it('should update price, cta, description and badge', async () => {
            const { merchCard, merchOfferSelect } = await renderCard('card1');
            merchCard.querySelectorAll('merch-offer')[1].click();
            await delay(200);
            const { price, cta, description, badge } = getDynamicElements(
                merchCard,
                merchOfferSelect,
            );
            expect(price.innerText).to.equal('US$599.88/yr');
            expect(cta.dataset['wcsOsi']).to.equal('puf');
            expect(cta.dataset['checkoutWorkflowStep']).to.equal(
                'segmentation',
            );
            expect(description.innerText).to.equal('New Description text.');
            expect(badge.innerText).to.equal('Only today!');
            const offers = merchOfferSelect.querySelectorAll('merch-offer');
            expect(offers[0].getAttribute('aria-selected')).to.not.exist;
            expect(offers[1].getAttribute('aria-selected')).to.exist;
        });

        it('should remove badge', async () => {
            const { merchCard, merchOfferSelect } = await renderCard('card1');
            merchOfferSelect.querySelectorAll('merch-offer')[2].click();
            await delay();
            const { price, cta, description, badge } = getDynamicElements(
                merchCard,
                merchOfferSelect,
            );
            expect(price.innerText).to.equal('US$82.49/mo');
            expect(cta.dataset['wcsOsi']).to.equal('m2m');
            expect(description.innerText).to.equal('Access advanced PDF.');
            expect(badge).not.to.exist;
        });

        it('should set back default badge and description', async () => {
            const { merchCard, merchOfferSelect } = await renderCard('card1');
            merchOfferSelect.querySelector('merch-offer').click();
            await delay();
            const { price, cta, description, badge } = getDynamicElements(
                merchCard,
                merchOfferSelect,
            );
            expect(price.innerText).to.equal('US$54.99/mo');
            expect(cta.dataset['wcsOsi']).to.equal('abm');
            expect(description.innerText).to.equal('Access advanced PDF.');
            expect(badge.innerText).to.equal('Recommended');
        });

        it('should be able to remove event', async () => {
            const { merchCard, merchOfferSelect } = await renderCard('card1');
            merchOfferSelect.remove();
            expect(merchCard.querySelector('merch-offer-select')).not.to.exist;
            merchCard
                .querySelector('div[slot="body-xs"]')
                .appendChild(merchOfferSelect);
        });

        it('renders horizontally with multiple CTAs', async () => {
            const { merchCard, merchOfferSelect } = await renderCard('card3');
            const [firstInput, secondInput] =
                merchOfferSelect.querySelectorAll('merch-offer');
            expect(
                firstInput.getBoundingClientRect().y,
                'we are expecting horizontal options',
            ).to.equal(secondInput.getBoundingClientRect().y);
            firstInput.click();
            const footer = merchCard.querySelector('div[slot="footer"]');
            const cta = footer.querySelector('a[slot="cta"]');
            const secondaryCta = footer.querySelector(
                'a[slot="secondary-cta"]',
            );
            expect(cta.dataset['wcsOsi']).to.equal('20gb');
            expect(secondaryCta.dataset['wcsOsi']).to.equal('20gbtrial');
            // no need to retest all other options, we are expecting them to work with other tests.
        });
    });

    describe('merch-offers-select web component with quantity-selector', async () => {
        it('should exist, auto select first offer and render price and cta', async () => {
            const { merchCard, merchOfferSelect } = await renderCard('card2');
            await delay(100);
            const { price, cta } = getDynamicElements(
                merchCard,
                merchOfferSelect,
            );
            expect(merchOfferSelect).to.exist;
            expect(price.innerText).to.equal('US$54.99/mo');
            expect(cta.getAttribute('data-wcs-osi')).to.equal('abm');
            expect(cta.getAttribute('data-quantity')).to.equal('1');
        });

        it('should update price, cta', async () => {
            const { merchCard, merchOfferSelect, pickerButton, options } =
                await renderCard('card2');
            pickerButton.click();
            options[2].click();
            await delay(100);
            const { price, cta } = getDynamicElements(
                merchCard,
                merchOfferSelect,
            );
            expect(price.innerText).to.equal('US$82.49/mo');
            expect(cta.dataset['wcsOsi']).to.equal('puf');
            expect(cta.dataset['checkoutWorkflowStep']).to.equal(
                'segmentation',
            );
            expect(cta.getAttribute('data-quantity')).to.equal('3');
        });

        it('should update price, cta if offer without value should take closer from bottom', async () => {
            const { merchCard, merchOfferSelect, pickerButton, options } =
                await renderCard('card2');
            pickerButton.click();
            options[1].click();
            await delay(100);
            const { price, cta } = getDynamicElements(
                merchCard,
                merchOfferSelect,
            );
            expect(merchOfferSelect).to.exist;
            expect(price.innerText).to.equal('US$54.99/mo');
            expect(cta.getAttribute('data-wcs-osi')).to.equal('abm');
            expect(cta.getAttribute('data-quantity')).to.equal('2');
        });
    });
});
