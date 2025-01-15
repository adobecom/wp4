import { createTag } from '../../utils/utils.js';
import { decorateButtons } from '../../utils/decorate.js';
import '../../deps/mas/merch-offer-select.js';

const TWP = 'twp';
const MINI_COMPARE_CHART = 'mini-compare-chart';

function createDynamicSlots(el, bodySlot) {
  const isTWP = el.variant === TWP;
  const pricePlaceholder = el.querySelector("span[is='inline-price']");
  if (pricePlaceholder) {
    pricePlaceholder.setAttribute('slot', 'price');
  } else {
    const priceSlot = createTag('p', { class: 'merch-card-price' });
    createTag('span', { slot: 'price', is: 'inline-price' }, null, { parent: priceSlot });
    bodySlot.append(priceSlot);
  }
  if (isTWP) return; // twp card do not display cta's
  const p = createTag('p', { class: 'action-area' });
  createTag('a', { slot: 'secondary-cta', is: 'checkout-link' }, null, { parent: p });
  createTag('a', { slot: 'cta', is: 'checkout-link' }, null, { parent: p });
  const footer = el.querySelector('div[slot="footer"]');
  footer.append(p);
  const descriptionSlot = bodySlot.querySelector('p');
  if (!descriptionSlot) return;
  descriptionSlot.setAttribute('slot', 'description');
}

function createMerchOffer(option, quantitySelector, variant) {
  const radioBtnText = Array.from(option.childNodes)?.find((childNode) => childNode.textContent.trim() !== '')?.textContent.trim();
  const merchOffer = createTag('merch-offer', { [quantitySelector ? 'value' : 'text']: radioBtnText });
  [...option.querySelector('ul').children].forEach((li, index) => {
    const override = li.childNodes[0];
    if (override.nodeName === '#text') {
      if (index === 0) {
        merchOffer.setAttribute('badge-text', override.textContent.trim());
      } else {
        const desc = createTag('p', { slot: 'description' });
        desc.textContent = override.textContent.trim();
        merchOffer.append(desc);
      }
    } else {
      merchOffer.append(override);
    }
  });
  if (variant === MINI_COMPARE_CHART) {
    decorateButtons(merchOffer, 'button-l');
  } else {
    decorateButtons(merchOffer);
  }
  return merchOffer;
}

const isHorizontal = (offerSelection) => [...offerSelection.querySelectorAll('merch-offer')].map((o) => o.text).every((t) => /^\d+.B$/.test(t));

export const initOfferSelection = (merchCard, offerSelection, quantitySelector) => {
  let merchOfferSlot;
  switch (merchCard.variant) {
    case 'mini-compare-chart':
      merchOfferSlot = merchCard.querySelector('div[slot="body-m"]');
      break;
    case 'twp':
      merchOfferSlot = merchCard.querySelector('[slot="footer"]');
      break;
    default:
      merchOfferSlot = merchCard.querySelector('div[slot="body-xs"]');
      break;
  }
  if (!merchOfferSlot) return;
  createDynamicSlots(merchCard, merchOfferSlot);
  const merchOfferSelect = createTag('merch-offer-select', { container: 'merch-card' });
  if (merchCard.classList.contains('add-stock')) {
    merchOfferSelect.setAttribute('stock', '');
  }
  [...offerSelection.children].forEach((option) => {
    merchOfferSelect.append(createMerchOffer(option, quantitySelector, merchCard.variant));
  });
  merchOfferSelect.querySelectorAll('a[is="checkout-link"]').forEach((link) => { link.setAttribute('slot', 'cta'); });
  if (isHorizontal(merchOfferSelect)) {
    merchOfferSelect.setAttribute('variant', 'horizontal');
  }
  merchOfferSelect.querySelectorAll('merch-offer').forEach((offer) => {
    const links = offer.querySelectorAll('a[is="checkout-link"]');
    if (links.length > 1) {
      links[0].setAttribute('slot', 'secondary-cta');
      links[1].setAttribute('slot', 'cta');
    } else if (links.length === 1) {
      links[0].setAttribute('slot', 'cta');
    }
  });
  merchOfferSelect.querySelectorAll('span[is="inline-price"]').forEach((price) => { price.setAttribute('slot', 'price'); });
  if (quantitySelector) {
    quantitySelector.append(merchOfferSelect);
  } else {
    merchOfferSlot.append(merchOfferSelect);
  }
};

export default initOfferSelection;
