import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import '../../spectrum-web-components/dist/button.js';
import mas from './mas.js';
import {
    hydrate,
    processMnemonics,
    processTitle,
    processSize,
    processPrices,
    processBackgroundImage,
    processCTAs,
    processSubtitle,
    processAnalytics,
    ANALYTICS_TAG,
    ANALYTICS_LINK_ATTR,
    ANALYTICS_SECTION_ATTR,
} from '../src/hydrate.js';
import { AEM_FRAGMENT_MAPPING } from '../src/variants/ccd-slice.js';

import { mockFetch } from './mocks/fetch.js';
import { withWcs } from './mocks/wcs.js';

const mockMerchCard = () => {
    const merchCard = document.createElement('div');
    document.body.appendChild(merchCard);
    const originalAppend = merchCard.append;
    merchCard.append = sinon.spy(function () {
        return originalAppend.apply(this, arguments);
    });
    return merchCard;
};

await mas();
await mockFetch(withWcs);

document.head.appendChild(document.createElement('mas-commerce-service'));

describe('processMnemonics', async () => {
    it('should process mnemonics', async () => {
        const fields = {
            mnemonicIcon: ['www.adobe.com/icons/photoshop.svg'],
            mnemonicAlt: [],
            mnemonicLink: ['www.adobe.com'],
        };
        const merchCard = mockMerchCard();
        const mnemonicsConfig = { size: 'm' };
        processMnemonics(fields, merchCard, mnemonicsConfig);
        expect(merchCard.outerHTML).to.equal(
            '<div><merch-icon slot="icons" src="www.adobe.com/icons/photoshop.svg" size="m" href="https://www.adobe.com/"></merch-icon></div>',
        );
    });
});

describe('processTitle', async () => {
    it('should process use tag and slot metadata', async () => {
        const fields = { cardTitle: 'Photoshop' };
        const merchCard = mockMerchCard();
        const titleConfig = { tag: 'h2', slot: 'title' };
        processTitle(fields, merchCard, titleConfig);
        expect(merchCard.outerHTML).to.equal(
            '<div><h2 slot="title">Photoshop</h2></div>',
        );
    });
});

describe('processSize', async () => {
    it('should apply size', async () => {
        const fields = { size: 'wide' };
        const merchCard = mockMerchCard();
        processSize(fields, merchCard, ['wide']);
        expect(merchCard.outerHTML).to.equal('<div size="wide"></div>');
    });
});

describe('processPrices', async () => {
    it('should process prices', async () => {
        const fields = {
            prices: '<span>$9.99</span>',
        };
        const merchCard = mockMerchCard();
        const pricesConfig = { tag: 'p', slot: 'prices' };
        processPrices(fields, merchCard, pricesConfig);
        expect(merchCard.outerHTML).to.equal(
            '<div><p slot="prices"><span>$9.99</span></p></div>',
        );
    });

    it('should preserve white spaces', async () => {
        const fields = {
            prices: 'Starting at  <span is="inline-price" data-template="price" data-wcs-osi="nTbB50pS4lLGv_x1l_UKggd-lxxo2zAJ7WYDa2mW19s"></span>',
        };
        const merchCard = mockMerchCard();
        const pricesConfig = { tag: 'p', slot: 'price' };
        processPrices(fields, merchCard, pricesConfig);
        await merchCard.querySelector('span[is="inline-price"]').onceSettled();
        expect(merchCard.textContent).to.equal('Starting at  US$22.19/mo');
    });
});

describe('processCTAs', async () => {
    let merchCard;
    let aemFragmentMapping;

    beforeEach(async () => {
        merchCard = mockMerchCard();

        aemFragmentMapping = {
            ctas: {
                slot: 'footer',
                size: 'm',
            },
        };
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should not process CTAs when fields.ctas is falsy', async () => {
        const fields = { ctas: null };

        processCTAs(fields, merchCard, aemFragmentMapping);

        expect(merchCard.append.called).to.be.false;
    });

    it('should create spectrum css buttons by default', async () => {
        const fields = {
            ctas: '<a is="checkout-link" data-wcs-osi="abm" class="accent">Click me</a>',
        };

        processCTAs(fields, merchCard, aemFragmentMapping);

        const appendCall = merchCard.append.firstCall;
        expect(appendCall).to.exist;

        const footer = appendCall.args[0];
        expect(footer.getAttribute('slot')).to.equal('footer');

        const button = footer.firstChild;
        expect(button.tagName.toLowerCase()).to.equal('button');
        expect(button.className).to.equal(
            'spectrum-Button spectrum-Button--accent spectrum-Button--sizeM',
        );
    });

    it('should create spectrum wc buttons when merchCard.spectrum="swc"', async () => {
        const fields = {
            ctas: '<a is="checkout-link" data-wcs-osi="abm" class="accent">Click me</a>',
        };
        merchCard.spectrum = 'swc';
        processCTAs(fields, merchCard, aemFragmentMapping);

        const appendCall = merchCard.append.firstCall;
        expect(appendCall).to.exist;

        const footer = appendCall.args[0];
        expect(footer.getAttribute('slot')).to.equal('footer');

        const button = footer.firstChild;
        expect(button.tagName.toLowerCase()).to.equal('sp-button');
        expect(button.treatment).to.equal('fill');
        expect(button.variant).to.equal('accent');
        expect(button.getAttribute('tabindex')).to.equal('0');
        expect(button.size).to.equal('m');
    });

    it('should create consonant buttons when merchCard.consonant is true', async () => {
        // when a merch-card with a fields is rendered in a Milo page.
        merchCard.consonant = true;
        const fields = {
            ctas: '<a is="checkout-link" data-wcs-osi="abm" class="accent">Click me</a>',
        };

        processCTAs(fields, merchCard, aemFragmentMapping);

        const appendCall = merchCard.append.firstCall;
        expect(appendCall).to.exist;

        const footer = appendCall.args[0];
        const link = footer.firstChild;
        expect(link.classList.contains('con-button')).to.be.true;
        expect(link.classList.contains('accent')).to.be.true;
    });

    it('should handle multiple CTAs', async () => {
        const fields = {
            ctas: `
                <a is="checkout-link" data-wcs-osi="abm" class="accent">Accent</a>
                <a is="checkout-link" data-wcs-osi="abm" class="primary">Primary</a>
                <a is="checkout-link" data-wcs-osi="abm" class="secondary">Secondary</a>
            `,
        };

        processCTAs(fields, merchCard, aemFragmentMapping);

        const footer = merchCard.append.firstCall.args[0];
        const buttons = footer.children;
        expect(buttons).to.have.lengthOf(3);

        expect(buttons[0].className).to.equal(
            'spectrum-Button spectrum-Button--accent spectrum-Button--sizeM',
        );
        expect(buttons[1].className).to.equal(
            'spectrum-Button spectrum-Button--primary spectrum-Button--sizeM',
        );
        expect(buttons[2].className).to.equal(
            'spectrum-Button spectrum-Button--secondary spectrum-Button--sizeM',
        );
    });

    it('should handle strong wrapped CTAs', async () => {
        const fields = {
            ctas: '<strong><a is="checkout-link" data-wcs-osi="abm" class="accent">Strong CTA</a></strong>',
        };

        processCTAs(fields, merchCard, aemFragmentMapping);

        const footer = merchCard.append.firstCall.args[0];
        const button = footer.firstChild;
        expect(button.className).to.equal(
            'spectrum-Button spectrum-Button--accent spectrum-Button--sizeM',
        );
    });

    it('should handle outline CTAs', async () => {
        const fields = {
            ctas: '<a is="checkout-link" data-wcs-osi="abm" class="accent-outline">Outline CTA</a>',
        };

        processCTAs(fields, merchCard, aemFragmentMapping);

        const footer = merchCard.append.firstCall.args[0];
        const button = footer.firstChild;
        expect(button.className).to.equal(
            'spectrum-Button spectrum-Button--accent spectrum-Button--outline spectrum-Button--sizeM',
        );
    });

    it('should handle link-style CTAs', async () => {
        const fields = {
            ctas: `<a is="checkout-link" data-wcs-osi="abm" class="primary-link">Link Style</a>
            <a is="checkout-link" data-wcs-osi="abm">Link Style</a>`,
        };

        processCTAs(fields, merchCard, aemFragmentMapping, 'ccd-suggested');

        const footer = merchCard.append.firstCall.args[0];
        const link = footer.firstChild;
        expect(link.tagName.toLowerCase()).to.equal('a');
        expect(link.classList.contains('primary-link')).to.be.true;
    });

    it('should handle click events on spectrum buttons', async () => {
        const fields = {
            ctas: '<a is="checkout-link" href="#" data-wcs-osi="abm" class="accent"><span>Click me</span></a>',
        };

        processCTAs(fields, merchCard, aemFragmentMapping);

        const footer = merchCard.append.firstCall.args[0];
        const button = footer.firstChild;
        const link = button.firstChild;
        const span = link.firstChild;

        let target;
        link.addEventListener('click', (e) => {
            target = e.target;
            e.preventDefault(); // prevent infinite loop
        });

        const customEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
        });
        span.dispatchEvent(customEvent);
        expect(target).to.equal(link);
    });
});

describe('processSubtitle', () => {
    let merchCard;

    before(async () => {
        await mas();
        await mockFetch(withWcs);
    });

    beforeEach(() => {
        merchCard = mockMerchCard();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should not append subtitle when fields.subtitle is falsy', () => {
        const fields = { subtitle: null };
        const subtitleConfig = { tag: 'h3', slot: 'subtitle' };

        processSubtitle(fields, merchCard, subtitleConfig);

        expect(merchCard.append.called).to.be.false;
        expect(merchCard.outerHTML).to.equal('<div></div>');
    });

    it('should not append subtitle when subtitleConfig is falsy', () => {
        const fields = { subtitle: 'Test Subtitle' };
        const subtitleConfig = null;

        processSubtitle(fields, merchCard, subtitleConfig);

        expect(merchCard.append.called).to.be.false;
        expect(merchCard.outerHTML).to.equal('<div></div>');
    });

    it('should append subtitle with correct tag and slot', () => {
        const fields = { subtitle: 'Test Subtitle' };
        const subtitleConfig = { tag: 'h3', slot: 'subtitle' };

        processSubtitle(fields, merchCard, subtitleConfig);

        expect(merchCard.outerHTML).to.equal(
            '<div><h3 slot="subtitle">Test Subtitle</h3></div>',
        );
    });
});

describe('processBackgroundImage', () => {
    let merchCard;

    beforeEach(() => {
        merchCard = mockMerchCard();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should not process background image when fields.backgroundImage is falsy', () => {
        const fields = { backgroundImage: null, backgroundImageAltText: 'Test Image' };
        const backgroundImageConfig = { tag: 'div', slot: 'image' };
        const variant = 'ccd-slice';

        processBackgroundImage(
            fields,
            merchCard,
            backgroundImageConfig,
            variant,
        );

        expect(merchCard.append.called).to.be.false;
        expect(merchCard.outerHTML).to.equal('<div></div>');
    });

    it('should append background image for ccd-slice variant', () => {
        const fields = { backgroundImage: 'test-image.jpg', backgroundImageAltText: 'Test Image' };
        const backgroundImageConfig = { tag: 'div', slot: 'image' };
        const variant = 'ccd-slice';

        processBackgroundImage(
            fields,
            merchCard,
            backgroundImageConfig,
            variant,
        );

        expect(merchCard.outerHTML).to.equal(
            '<div><div slot="image"><img loading="lazy" src="test-image.jpg" alt="Test Image"></div></div>',
        );
    });

    it('should set background-image attribute for ccd-suggested variant', () => {
        const fields = { backgroundImage: 'test-image.jpg' };
        const backgroundImageConfig = { attribute: 'background-image' };
        const variant = 'ccd-suggested';

        processBackgroundImage(
            fields,
            merchCard,
            backgroundImageConfig,
            variant,
        );

        expect(merchCard.outerHTML).to.equal(
            '<div background-image="test-image.jpg"></div>',
        );
    });

    it('should not append background image for ccd-slice when backgroundImageConfig is falsy', () => {
        const fields = { backgroundImage: 'test-image.jpg' };
        const backgroundImageConfig = null;
        const variant = 'ccd-slice';

        processBackgroundImage(
            fields,
            merchCard,
            backgroundImageConfig,
            variant,
        );

        expect(merchCard.append.called).to.be.false;
        expect(merchCard.outerHTML).to.equal('<div></div>');
    });
});

describe('processAnalytics', () => {
    let merchCard;

    beforeEach(() => {
        merchCard = mockMerchCard();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should not set analytics attributes if no fields.tags', () => {
        const fields = {};
        processAnalytics(fields, merchCard);
        expect(merchCard.hasAttribute(ANALYTICS_SECTION_ATTR)).to.be.false;
        expect(
            merchCard.querySelectorAll(`a[${ANALYTICS_LINK_ATTR}]`).length,
        ).to.equal(0);
    });

    it(`should not set analytics attributes when no tags start with ${ANALYTICS_TAG}`, () => {
        const fields = { tags: ['mas:term/montly'] };
        processAnalytics(fields, merchCard);
        expect(merchCard.hasAttribute(ANALYTICS_SECTION_ATTR)).to.be.false;
        expect(
            merchCard.querySelectorAll(`a[${ANALYTICS_LINK_ATTR}]`).length,
        ).to.equal(0);
    });

    it('should set analytics-section attribute on merchCard', () => {
        const fields = { tags: ['mas:product_code/phsp'] };
        processAnalytics(fields, merchCard);
        expect(merchCard.getAttribute(ANALYTICS_SECTION_ATTR)).to.equal('phsp');
    });

    it('should set analytics-link attributes on links inside merchCard', () => {
        const fields = { tags: ['mas:term/montly', 'mas:product_code/ccsn'] };

        const seeTerms = document.createElement('a');
        seeTerms.setAttribute('data-analytics-id', 'see-terms');
        const buyNow = document.createElement('a');
        buyNow.setAttribute('data-analytics-id', 'buy-now');
        const noAnalytics = document.createElement('a');
        merchCard.appendChild(seeTerms);
        merchCard.appendChild(buyNow);
        merchCard.appendChild(noAnalytics);

        processAnalytics(fields, merchCard);
        expect(merchCard.getAttribute(ANALYTICS_SECTION_ATTR)).to.equal('ccsn');
        expect(seeTerms.getAttribute(ANALYTICS_LINK_ATTR)).to.equal(
            'see-terms-1',
        );
        expect(buyNow.getAttribute(ANALYTICS_LINK_ATTR)).to.equal('buy-now-2');
        // should handle only links with data-analytics-id attribute
        expect(
            merchCard.querySelectorAll(`a[${ANALYTICS_LINK_ATTR}]`).length,
        ).to.equal(2);
    });
});

describe('hydrate', () => {
    let merchCard;

    beforeEach(() => {
        merchCard = mockMerchCard();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should hydrate a ccd-slice merch card', async () => {
        const fragment = {
            fields: {
                variant: 'ccd-slice',
                mnemonicIcon: ['www.adobe.com/icons/photoshop.svg'],
                mnemonicAlt: [],
                mnemonicLink: ['www.adobe.com'],
                backgroundImage: 'test-image.jpg',
                ctas: '<a is="checkout-link" data-wcs-osi="abm" class="accent" data-analytics-id="buy-now">Click me</a>',
                tags: ['mas:term/montly', 'mas:product_code/ccsn'],
            },
        };
        merchCard.variantLayout = { aemFragmentMapping: AEM_FRAGMENT_MAPPING };
        await hydrate(fragment, merchCard);

        expect(merchCard.getAttribute(ANALYTICS_SECTION_ATTR)).to.equal('ccsn');
        expect(
            merchCard
                .querySelector(`a[data-analytics-id]`)
                .getAttribute('daa-ll'),
        ).to.equal('buy-now-1');
    });
});
