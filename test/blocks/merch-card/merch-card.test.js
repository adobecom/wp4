import { expect } from '@esm-bundle/chai';
import { decorateLinks, loadStyle, setConfig } from '../../../libs/utils/utils.js';
import { mockFetch, readMockText } from '../merch/mocks/fetch.js';

const { default: init } = await import('../../../libs/blocks/merch-card/merch-card.js');
const delay = (duration = 100) => new Promise((resolve) => { setTimeout(resolve, duration); });

const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
const conf = { locales };
setConfig(conf);

loadStyle('/libs/blocks/merch-card/merch-card.css');

/**
 * runs list of assertions on the card to make card test smaller and more readable
 * @param {*} card already initiated card
 * @param {*} assertions 1. elements is an array of object that can contains selector
 * (if not assertion is run against the card), attribute (object with name and value
 * to be validated against selected element) and textContent (to be validated against
 * selected element's text content)
 * buttons is list of expected buttons in that order
 */
const expectToValidateHTMLAssertions = (card, assertions = {}) => {
  expect(card).to.exist;
  const { elements, buttons: expectedButtons } = assertions;
  elements.forEach(({ selector, attribute, textContent }) => {
    const el = typeof selector === 'string' ? card.querySelector(selector) : card;
    expect(el, selector).to.exist;
    if (attribute) {
      const { name, value } = attribute;
      expect(el.getAttribute(name), `attribute ${name}`).to.be.equal(value);
    }
    if (textContent) {
      expect(el.textContent, `text content ${textContent}`).to.be.equal(textContent);
    }
  });
  const footer = card.querySelector('div[slot="footer"]');
  if (expectedButtons) {
    const buttons = footer.querySelectorAll('.con-button');
    expect(buttons.length).to.be.equal(expectedButtons.length);
    expectedButtons.forEach((expectedButton, index) => {
      expect(buttons[index].textContent).to.be.equal(expectedButton);
    });
  }
};

mockFetch();

describe('Merch Card', () => {
  it('Shows segment card', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/segment-card.html');
    const merchCard = await init(document.querySelector('.segment'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'h3[slot="heading-xs"]', textContent: 'Lorem ipsum dolor sit amet' },
        { selector: 'p[slot="promo-text"]', textContent: 'this promo is great see terms' },
        { selector: 'div[slot="body-xs"]', textContent: 'Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim.See what\'s included | Learn more' },
        { attribute: { name: 'variant', value: 'segment' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
  });

  it('Supports Special Offers card', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/special-offers.html');
    const merchCard = await init(document.querySelector('.special-offers'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'div[slot="body-xs"]', textContent: 'Create gorgeous images, rich graphics, and incredible art. Save 10% for the first year. Ends Mar 20.See terms' },
        { attribute: { name: 'variant', value: 'special-offers' } }, { attribute: { name: 'badge-background-color', value: '#EDCC2D' } }, { attribute: { name: 'badge-color', value: '#000000' } },
        { attribute: { name: 'badge-text', value: 'LOREM IPSUM DOLOR' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
  });
});

describe('Plans Card', () => {
  it('Supports COM Plans card', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/plans-card.html');
    const merchCard = await init(document.querySelector('.merch-card.plans.icons.secure'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'p[slot="heading-m"]' }, { selector: 'h3[slot="heading-xs"]' },
        { selector: 'div[slot="body-xs"]', textContent: 'Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim.MaecenasSee terms about lorem ipsum' },
        { selector: 'p[slot="promo-text"]', textContent: 'this promo is great see terms' },
        { attribute: { name: 'variant', value: 'plans' } },
        { attribute: { name: 'badge-background-color', value: '#EDCC2D' } },
        { attribute: { name: 'badge-color', value: '#000000' } },
        { attribute: { name: 'badge-text', value: 'LOREM IPSUM DOLOR' } },
        { attribute: { name: 'checkbox-label', value: 'Add a 30-day free trial of Adobe Stock.*' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
  });

  it('Supports EDU Plans card with stock', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/plans-card.html');
    const merchCard = await init(document.querySelector('.merch-card.plans.edu.icons.secure'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'p[slot="heading-m"]' },
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'strong span' },
        { selector: 'div[slot="body-xs"]', textContent: 'Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim.MaecenasSee terms about lorem ipsum' },
        { attribute: { name: 'variant', value: 'plans' } },
        { attribute: { name: 'badge-background-color', value: '#EDCC2D' } },
        { attribute: { name: 'badge-color', value: '#000000' } },
        { attribute: { name: 'badge-text', value: 'LOREM IPSUM DOLOR' } },
        { attribute: { name: 'checkbox-label', value: 'Add a 30-day free trial of Adobe Stock.*' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
  });

  it('should skip ribbon and altCta creation', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/plans-card.html');
    const merchCard = await init(document.querySelector('.plans.icons.skip-ribbon.skip-altCta'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'p[slot="heading-m"]' },
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'div[slot="body-xs"]', textContent: 'Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim.See terms about lorem ipsum' },
        { attribute: { name: 'variant', value: 'plans' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
    expect(merchCard.getAttribute('badge')).to.not.exist;
  });

  it('does not display undefined if no content', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/plans-card.html');
    const el = document.querySelector('.merch-card.empty');
    await init(el);
    expect(el.outerHTML.includes('undefined')).to.be.false;
  });
});

describe('Catalog Card', () => {
  it('Decorates with mnemonic link', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/catalog.html');
    const el = document.getElementById('mnemonic-link');
    await decorateLinks(document.body);
    const merchCard = await init(el);
    const [icon1, icon2] = merchCard.querySelectorAll('merch-icon');
    expect(icon1.outerHTML).to.equal('<merch-icon slot="icons" src="http://localhost:2000/test/blocks/merch-card/mocks/photoshop.svg" alt="Photoshop" href="https://www.adobe.com/photoshop.html?source=icon1" size="l"></merch-icon>');
    expect(icon2.outerHTML).to.equal('<merch-icon slot="icons" src="http://localhost:2000/test/blocks/merch-card/mocks/photoshop.svg" alt="Photoshop" href="https://www.adobe.com/photoshop.html?source=icon2" size="l"></merch-icon>');
    expect(merchCard.titleElement.outerHTML).to.equal('<h3 class="card-heading" slot="heading-xs"><a href="https://www.adobe.com/photoshop.html" daa-ll="Photoshop-1--Photoshop">Photoshop</a></h3>');
  });

  it('Supports Catalog card', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/catalog.html');
    const merchCard = await init(document.querySelector('.merch-card.ribbon'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'p[slot="heading-m"]' },
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'p[slot="promo-text"]', textContent: 'this promo is great see terms' },
        { selector: 'div[slot="body-xs"]', textContent: 'Create gorgeous images, rich graphics, and incredible art. Save 10% for the first year. Ends Mar 20.See terms' },
        { attribute: { name: 'variant', value: 'catalog' } },
        { attribute: { name: 'badge-background-color', value: '#EDCC2D' } },
        { attribute: { name: 'badge-color', value: '#000000' } },
        { attribute: { name: 'badge-text', value: 'LOREM IPSUM DOLOR' } },
        { attribute: { name: 'action-menu', value: 'true' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
  });

  it('Supports Catalog card without badge', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/catalog.html');
    const merchCard = await init(document.querySelector('.merch-card.catalog.empty-badge'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'p[slot="heading-m"]' },
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'div[slot="body-xs"]', textContent: 'Create gorgeous images, rich graphics, and incredible art. Save 10% for the first year. Ends Mar 20.See terms' },
        { attribute: { name: 'variant', value: 'catalog' } },
        { attribute: { name: 'action-menu', value: 'true' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
    expect(merchCard.getAttribute('badge')).to.not.exist;
  });

  it('Supports Catalog card without badge and action-menu', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/catalog.html');
    const merchCard = await init(document.querySelector('.merch-card.catalog.empty-action-menu'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'p[slot="heading-m"]' },
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'div[slot="body-xs"]', textContent: 'Create gorgeous images, rich graphics, and incredible art. Save 10% for the first year. Ends Mar 20.See terms' },
        { attribute: { name: 'variant', value: 'catalog' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
    expect(merchCard.querySelector('div[slot="actionMenuContent"]')).to.not.exist;
    expect(merchCard.getAttribute('badge')).to.not.exist;
    expect(merchCard.getAttribute('action-menu')).to.not.exist;
  });

  it('Supports Catalog card with badge without action-menu', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/catalog.html');
    const merchCard = await init(document.querySelector('.merch-card.catalog.empty-badge.action-menu-exist'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'p[slot="heading-m"]' },
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'div[slot="body-xs"]', textContent: 'Create gorgeous images, rich graphics, and incredible art. Save 10% for the first year. Ends Mar 20.See terms' },
        { attribute: { name: 'variant', value: 'catalog' } },
        { attribute: { name: 'badge-background-color', value: '#EDCC2D' } },
        { attribute: { name: 'badge-color', value: '#000000' } },
        { attribute: { name: 'badge-text', value: 'LOREM IPSUM DOLOR' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
    expect(merchCard.getAttribute('action-menu')).to.not.exist;
    expect(merchCard.querySelector('div[slot="actionMenuContent"]')).to.not.exist;
  });

  it('Parses the filters and types', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/catalog.html');
    const merchCard = await init(document.querySelector('.merch-card.catalog.tags'));
    expect(merchCard.name).equal('photoshop');
    expect(merchCard.filters).to.be.deep.equal({
      all: { order: undefined, size: undefined },
      'creativity-design': { order: undefined, size: undefined },
      'graphic-design': { order: undefined, size: undefined },
      photo: { order: undefined, size: undefined },
    });
    expect(merchCard.types).to.equal('web,tablet,desktop');
  });

  it('Supports intro-pricing card', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/intro-pricing.html');
    const merchCard = await init(document.querySelector('.merch-card'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'h3[slot="heading-xs"]' },
        { selector: 'p[slot="heading-m"]' },
        { selector: 'div[slot="body-xs"]', textContent: 'Create gorgeous images, rich graphics, and incredible art. Save 10% for the first year. Ends Mar 20.' },
        { attribute: { name: 'variant', value: 'catalog' } },
        { attribute: { name: 'badge-background-color', value: '#EDCC2D' } },
        { attribute: { name: 'badge-color', value: '#000000' } },
        { attribute: { name: 'badge-text', value: 'LOREM IPSUM DOLOR' } },
      ],
      buttons: ['Learn More', 'Save now'],
    });
    expect(merchCard.classList.contains('intro-pricing')).to.be.true;
  });
});

describe('UAR Card', () => {
  it('handles decorated <hr>', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/uar-card.html');
    const cards = document.querySelectorAll('.merch-card');
    for (const card of cards) {
      await init(card);
    }
    const merchCard = document.querySelector('merch-card');
    expect(merchCard.classList.contains('has-divider')).to.be.true;
  });
});

describe('Mini Compare Chart Merch Card', () => {
  it('Supports Mini Compare Chart with footer rows', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/mini-compare-chart.html');
    const merchCard = await init(document.querySelector('.merch-card.mini-compare-chart'));
    document.querySelector('.section').removeAttribute('data-status');
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'h3[slot="heading-m"]', textContent: 'Illustrator' },
        { selector: 'div[slot="body-m"]', textContent: 'Get Illustrator on desktop and iPad as part of Creative Cloud. This is promo text' },
        { selector: 'p[slot="heading-m-price"]' },
        { selector: 'div[slot="footer"]' },
        { selector: 'div[slot="footer-rows"] picture.footer-row-icon' },
        { selector: 'div[slot="footer-rows"] .footer-row-cell-description' },
        { attribute: { name: 'variant', value: 'mini-compare-chart' } },
        { attribute: { name: 'badge-background-color', value: '#EDCC2D' } },
        { attribute: { name: 'badge-color', value: '#000000' } },
        { attribute: { name: 'badge-text', value: 'LOREM IPSUM DOLOR' } },
      ],
      buttons: ['Buy now', 'free trial'],
    });
    expect(merchCard.classList.contains('badge-card')).to.be.true;
  });

  it('Supports Mini Compare Chart with quantity select', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/mini-compare-chart.html');
    const merchCard = await init(document.querySelector('.merch-card.mini-compare-chart'));
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'merch-quantity-select', attribute: { name: 'title', value: 'Select a quantity:' } },
        { selector: 'merch-quantity-select', attribute: { name: 'min', value: '1' } },
        { selector: 'merch-quantity-select', attribute: { name: 'max', value: '10' } },
        { selector: 'merch-quantity-select', attribute: { name: 'step', value: '1' } },
      ],
    });
  });

  it('Supports Mini Compare Chart with offer select', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/mini-compare-chart.html');
    const merchCard = await init(document.querySelector('#mini-compare-offer-select'));
    const offerSelect = merchCard.querySelector('merch-offer-select');
    const merchOffer = offerSelect.querySelector('merch-offer');
    expect(offerSelect).to.exist;
    expect(merchOffer).to.exist;
    expect(merchOffer.getAttribute('text')).to.equal('20GB');
  });

  it('Supports Mini Compare Chart intersection observer', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/mini-compare-chart.html');
    const merchCard = await init(document.querySelector('#mini-compare-hidden-card'));
    merchCard.style.visibility = 'hidden';
    setTimeout(() => {
      merchCard.style.visibility = 'visible';
    }, 500);
  });

  it('Supports Mini Compare Chart with checkmarks footer rows', async () => {
    // Test for mobile
    window.matchMedia = (query) => ({
      matches: query.includes('(max-width: 767px)'),
      addListener: () => {},
      removeListener: () => {},
    });
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/mini-compare-chart-featured-list.html');
    const merchCards = document.querySelectorAll('.merch-card.mini-compare-chart');
    const merchCardChevonClose = await init(merchCards[0]);
    expectToValidateHTMLAssertions(merchCardChevonClose, {
      elements: [
        { selector: 'div[slot="footer-rows"] picture.footer-row-icon-checkmark' },
        { selector: 'div[slot="footer-rows"] .footer-row-cell-description' },
      ],
    });
    const hr = merchCardChevonClose.querySelector('hr');
    expect(hr).to.exist;
    expect(hr.style.backgroundColor).to.be.equals('rgb(232, 232, 232)');
    expect(merchCardChevonClose.querySelector('.checkmark-copy-container').classList.contains('close'));
    const footerRowsTitle = merchCardChevonClose.querySelector('.footer-rows-title');
    expect(footerRowsTitle).to.exist;
    const footerRowCellCheckmark = merchCardChevonClose.querySelectorAll('.footer-row-cell-checkmark');
    expect(footerRowCellCheckmark).to.exist;
    for (let i = 0; i < footerRowCellCheckmark.length; i += 1) {
      expect(footerRowCellCheckmark[i].querySelector('.footer-row-icon-checkmark')).to.exist;
    }

    // Test for the second merch card (chevron open)
    if (footerRowsTitle) {
      footerRowsTitle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(merchCardChevonClose.querySelector('.checkmark-copy-container').classList.contains('open')).to.be.false;
      expect(footerRowsTitle.querySelector('.chevron-icon').innerHTML).to.include('svg');
    }

    // Test for the second merch card (chevron open)
    const merchCardChevonOpen = await init(merchCards[1]);
    expectToValidateHTMLAssertions(merchCardChevonOpen, {
      elements: [
        { selector: 'div[slot="footer-rows"] picture.footer-row-icon-checkmark' },
        { selector: 'div[slot="footer-rows"] .footer-row-cell-description' },
      ],
    });
    expect(merchCardChevonOpen.querySelector('.checkmark-copy-container').classList.contains('open')).to.be.false;

    // Simulate click to test chevron toggle
    const footerRowsTitleOpen = merchCardChevonOpen.querySelector('.footer-rows-title');
    expect(footerRowsTitleOpen).to.exist;
    if (footerRowsTitleOpen) {
      footerRowsTitleOpen.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      expect(merchCardChevonOpen.querySelector('.checkmark-copy-container').classList.contains('open')).to.be.true;
      expect(footerRowsTitleOpen.querySelector('.chevron-icon').innerHTML).to.include('svg');
    }

    // Test for desktop
    window.matchMedia = (query) => ({
      matches: query.includes('(max-width: 600px)'),
      addListener: () => {},
      removeListener: () => {},
    });
    const merchCardDesktop = await init(merchCards[2]);
    expect(merchCardDesktop.querySelector('.checkmark-copy-container')).to.not.be.null;
    expect(merchCardChevonOpen.querySelector('.checkmark-copy-container').classList.contains('open')).to.be.true;
  });
});

describe('TWP Merch Card', () => {
  it('Supports TWP Merch card with Stock Option', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/twp.html');
    const merchCard = await init(document.querySelector('#stock'));
    await delay();

    const body = merchCard.querySelector('div[slot="body-xs"]');
    const footer = merchCard.querySelector('div[slot="footer"]');
    const offerSelect = footer.querySelector('merch-offer-select');
    const price = footer.querySelector('.merch-card-price [is="inline-price"]');

    expect(merchCard.classList.contains('add-stock')).to.be.true;
    expect(merchCard.getAttribute('variant')).to.equal('twp');
    expect(body.textContent).to.contains('What you get:');
    expect(price).to.exist;
    expect(offerSelect).to.exist;
    expect(offerSelect.getAttribute('stock')).to.exist;
    expect(offerSelect.querySelectorAll('merch-offer').length).to.equal(3);
  });

  it('Supports TWP Merch card with Quantity Select & no Stock', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/twp.html');
    const merchCard = await init(document.querySelector('#quantity-selector'));
    await delay();

    const body = merchCard.querySelector('div[slot="body-xs"]');
    const footer = merchCard.querySelector('div[slot="footer"]');
    const quantitySelect = merchCard.querySelector('merch-quantity-select');
    const price = footer.querySelector('.merch-card-price [is="inline-price"]');

    expect(merchCard.classList.contains('add-stock')).to.be.false;
    expect(merchCard.getAttribute('variant')).to.equal('twp');
    expect(body.textContent).to.contains('What you get:');
    expect(price).to.exist;
    expect(quantitySelect).to.exist;
    expect(quantitySelect.getAttribute('min')).to.equal('1');
    expect(quantitySelect.getAttribute('max')).to.equal('10');
    expect(quantitySelect.getAttribute('min')).to.equal('1');
  });
});

describe('Merch Card with Offer Selection', () => {
  it('Supports quantity select ', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/selection-cards.html');
    await init(document.querySelector('.quantity-select'));
    const merchCard = document.querySelector('merch-card');
    expectToValidateHTMLAssertions(merchCard, {
      elements: [
        { selector: 'merch-quantity-select', attribute: { name: 'title', value: 'Select a quantity:' } },
        { selector: 'merch-quantity-select', attribute: { name: 'min', value: '1' } },
        { selector: 'merch-quantity-select', attribute: { name: 'max', value: '3' } },
        { selector: 'merch-quantity-select', attribute: { name: 'step', value: '1' } },
      ],
    });
  });

  it('Change quantity select ', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/selection-cards.html');
    await init(document.querySelector('.quantity-select'));
    await delay();
    const merchCard = document.querySelector('merch-card');
    const quantitySelect = merchCard.querySelector('merch-quantity-select');
    const picker = quantitySelect.shadowRoot.querySelector('button');
    picker.click();
    await delay();
    const items = quantitySelect.shadowRoot.querySelectorAll('.item');
    items[2].click();
    await delay();
    const button = merchCard.querySelector('.con-button');
    expect(button.getAttribute('data-quantity')).to.equal('3');
  });

  it('Skip Change quantity select render ', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/selection-cards.html');
    await init(document.querySelector('.skip-quantity-select-render'));
    await delay();
    expect(document.querySelector('merch-quantity-select')).to.not.exist;
  });

  it('should handle callout-content with h6 and em tags', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/callout.html');

    const merchCards = document.querySelectorAll('.merch-card');
    const segmentCard = await init(merchCards[0]);
    await delay();

    // Assert
    const calloutSlot = segmentCard.querySelector('[slot="callout-content"]');
    expect(calloutSlot).to.exist;

    const calloutContentWrapper = calloutSlot.querySelector('div > div');
    expect(calloutContentWrapper).to.exist;

    const imgElement = calloutContentWrapper.querySelector('img.callout-icon');
    expect(imgElement).to.exist;
    expect(imgElement.title).to.equal('this is a dummy tooltip text');

    const calloutContent = calloutContentWrapper.querySelector('div > div');
    expect(calloutContent).to.exist;
    expect(calloutContent.textContent.trim()).to.equal('AI Assistant add-on available');

    // Assert that price-commitment slot is appended
    const miniCompareChart = await init(merchCards[1]);
    await delay();
    const priceCommitmentSlot = miniCompareChart.querySelector('[slot="price-commitment"]');
    expect(priceCommitmentSlot).to.exist;
  });
});

describe('Section metadata rules', async () => {
  before(async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/card-section-metadata.html');
  });

  it('should not add default merch-card grid styles', async () => {
    const block = document.getElementById('with2ColumnsGrid');
    const merchCard = await init(block);
    expect(merchCard.parentElement.className).to.not.match(/three-merch-cards/);
  });

  it('should add default merch-card grid styles', async () => {
    const block = document.getElementById('withDefault3ColumnsGrid');
    const merchCard = await init(block);
    expect(merchCard.parentElement.className).to.match(/three-merch-cards/);
  });

  it('should add default merch-card grid styles with 2-up', async () => {
    const block = document.getElementById('with2Up');
    const merchCard = await init(block);
    expect(merchCard.parentElement.className).to.match(/section three-merch-cards product/);
  });
  it('Retains removed-manifest-id', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/mep.html');
    const merchCard = await init(document.querySelector('.merch-card'));
    expect(merchCard.dataset.removedManifestId).to.exist;
  });
});

describe('Viewport Responsiveness without Sinon', () => {
  let originalMatchMedia;

  beforeEach(() => {
    // Store the original window.matchMedia
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    // Restore the original window.matchMedia after each test
    window.matchMedia = originalMatchMedia;
  });

  it('Adjusts layout for desktop viewports', async () => {
    window.matchMedia = (query) => ({
      matches: query.includes('(max-width: 600px)'),
      addListener: () => {},
      removeListener: () => {},
    });

    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/plans-card.html');
    const merchCard = await init(document.querySelector('.merch-card.plans.edu.icons.secure'));
    const bigPrice = merchCard.querySelector('strong span[is="inline-price"]');
    expect(bigPrice).to.exist;
    expect(bigPrice.style.fontSize).to.equal('24px');
  });

  it('Maintains layout for mobile viewports', async () => {
    window.matchMedia = (query) => ({
      matches: !query.includes('(max-width: 600px)'),
      addListener: () => {},
      removeListener: () => {},
    });

    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/plans-card.html');
    const merchCard = await init(document.querySelector('.merch-card.plans.edu.icons.secure'));
    const bigPrice = merchCard.querySelector('strong span[is="inline-price"]');
    expect(bigPrice).to.exist;
    expect(bigPrice.style.fontSize).to.equal('16px');
  });
});

describe('Product Merch Card', () => {
  it('Supports Product Merch card with callout', async () => {
    document.body.innerHTML = await readMockText('/test/blocks/merch-card/mocks/product.html');
    const merchCard = await init(document.querySelector('.product'));

    const calloutSlot = merchCard.querySelector('[slot="callout-content"]');
    expect(calloutSlot).to.exist;

    const lowerBodySlot = merchCard.querySelector('[slot="body-lower"]');
    expect(lowerBodySlot).to.exist;
  });
});
