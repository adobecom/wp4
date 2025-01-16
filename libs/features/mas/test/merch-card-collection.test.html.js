import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';

import { pushState } from '../src/deeplink.js';

import { appendMiloStyles, delay, toggleLargeDesktop } from './utils.js';

import '../src/sidenav/merch-sidenav.js';
import '../src/merch-card-collection.js';

import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';

const searchParams = new URLSearchParams(document.location.search);

const prepareTemplate = (
    id,
    updateSearch = true,
    content = document.getElementById('content'),
) => {
    content.innerHTML = '';
    const template = document.getElementById(id);
    const templateContent = template.content.cloneNode(true);
    return [
        templateContent.querySelector('merch-card-collection'),
        () => {
            content.appendChild(templateContent);
            if (updateSearch && id !== searchParams.get('template')) {
                searchParams.set('template', id);
                document.location.search = searchParams.toString();
            }
        },
    ];
};

window['prepareTemplate'] = prepareTemplate;

const sidenav = document.getElementById('sidenav');
if (sidenav) {
    const templates = [...document.getElementsByTagName('template')].map(
        ({ id, title }) =>
            `<button onclick="(prepareTemplate('${id}')[1])()">${title}</button>`,
    );
    sidenav.appendChild(
        document.createRange().createContextualFragment(templates.join('\n')),
    );
    const currentTemplate = searchParams.get('template');
    if (currentTemplate) {
        const [, render] = prepareTemplate(currentTemplate);
        render();
    }
}
const visibleCards = (index) => {
    const cards = Array.from(document.querySelectorAll('merch-card'))
        .filter((card) => card.style.display !== 'none')
        .sort((a, b) => Number(a.style.order) - Number(b.style.order));
    if (isNaN(index)) {
        return cards;
    } else {
        return cards[index];
    }
};

let merchCards;
const shouldSkipTests = sessionStorage.getItem('skipTests') ? 'true' : 'false';
runTests(async () => {
    let render;
    appendMiloStyles();
    mockLana();
    await mockFetch(withWcs);
    await mas();
    if (shouldSkipTests === 'true') return;
    describe('merch-card-collection web component on phones and tablets', () => {
        beforeEach(async () => {
            [merchCards, render] = prepareTemplate('catalogCards', false);
        });

        it('sets the class for modal when opening filters in a modal', async () => {
            render();
            await delay(100);
            expect(document.body.classList.contains('merch-modal')).to.be.false;
            merchCards.shadowRoot.querySelector('#filtersButton').click();
            await delay(100);
            expect(document.body.classList.contains('merch-modal')).to.be.true;
            document.querySelector('merch-sidenav').removeAttribute('modal');
            document.body.classList.remove('merch-modal');
        });

        it('removes the class for modal when closing the filters modal by clicking the "Close" button', async () => {
            render();
            await delay(100);
            merchCards.shadowRoot.querySelector('#filtersButton').click();
            await delay(100);
            document
                .querySelector('merch-sidenav')
                .shadowRoot.querySelector('#sidenav')
                .querySelector('sp-link')
                .click();
            expect(document.body.classList.contains('merch-modal')).to.be.false;
            document.querySelector('merch-sidenav').removeAttribute('modal');
        });

        it('removes the class for modal when closing the filters modal by clicking outside the modal', async () => {
            render();
            await delay(100);
            merchCards.shadowRoot.querySelector('#filtersButton').click();
            await delay(100);
            document
                .querySelector('merch-sidenav')
                .shadowRoot.querySelector('sp-overlay')
                .dispatchEvent(new CustomEvent('close'));
            await delay(100);
            expect(document.body.classList.contains('merch-modal')).to.be.false;
            document.querySelector('merch-sidenav').removeAttribute('modal');
        });
    });

    describe('merch-card-collection web component on desktop', () => {
        beforeEach(async () => {
            await toggleLargeDesktop();
            document.location.hash = '';
            [merchCards, render] = prepareTemplate('catalogCards', false);
        });

        it('renders merch-card-collection element', async () => {
            document.location.hash = '';
            render();
            await delay(100);
            expect(visibleCards().length).to.equal(93);
        });

        it('observes/applies deep link parameters', async () => {
            document.location.hash = 'filter=photo';
            render();
            await delay(100);
            expect(visibleCards().length).to.equal(5);
            expect(visibleCards(0).size).to.equal('super-wide');
            document.location.hash = 'filter=photo&types=web';
            await delay(100);
            expect(visibleCards().length).to.equal(4);
            document.location.hash = 'filter=photo&types=web,desktop';
            await delay(100);
            expect(visibleCards().length).to.equal(5);
        });

        it('should make single_app card the second card', async () => {
            document.location.hash = 'single_app=illustrator';
            render();
            await delay(100);
            expect(visibleCards(1).name).to.equal('illustrator');
        });

        it('should display a Show More button', async () => {
            merchCards.setAttribute('limit', 16);
            merchCards.setAttribute('page', 1);
            render();
            await delay(100);
            expect(visibleCards().length).to.equal(16);
            const showMoreButton =
                merchCards.shadowRoot.querySelector('#footer sp-button');
            expect(showMoreButton.isConnected).to.be.true;
            showMoreButton.click();
            await delay(100);
            showMoreButton.click();
            await delay(100);
            expect(visibleCards().length).to.equal(48);
            pushState({ page: 6 });
            await delay(100);
            expect(showMoreButton.isConnected).to.be.false;
        });

        it('should refine result on search with multiple words', async () => {
            document.location.hash = '';
            render();
            await delay(100);
            pushState({ search: 'All Apps' });
            await delay(100);
            expect(visibleCards().length).to.equal(1);
            expect(merchCards.resultTextSlotName).to.equal('searchResultText');
        });

        it('should refine result on search', async () => {
            document.location.hash = '';
            render();
            await delay(100);
            pushState({ search: 'acrobat' });
            await delay(100);
            expect(visibleCards().length).to.equal(10);
            expect(merchCards.resultTextSlotName).to.equal('searchResultsText');
            pushState({ search: 'stager' });
            await delay(100);
            expect(visibleCards().length).to.equal(1);
            expect(merchCards.resultTextSlotName).to.equal('searchResultText');
            pushState({ search: 'cafebabe' });
            await delay(100);
            expect(visibleCards().length).to.equal(0);
            expect(merchCards.resultTextSlotName).to.equal(
                'noSearchResultsText',
            );
        });
    });
});

document.getElementById('showMore').addEventListener('click', () => {
    document.location.hash = '';
    const [merchCards, render] = prepareTemplate('catalogCards');
    merchCards.setAttribute('limit', 16);
    merchCards.setAttribute('page', 1);
    render();
});
