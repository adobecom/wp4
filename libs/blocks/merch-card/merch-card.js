import { decorateButtons, decorateBlockHrs } from '../../utils/decorate.js';
import { getConfig, createTag, loadStyle } from '../../utils/utils.js';
import { getMetadata } from '../section-metadata/section-metadata.js';
import { processTrackingLabels } from '../../martech/attributes.js';
import '../../deps/mas/merch-card.js';
import '../../deps/lit-all.min.js';

const TAG_PATTERN = /^[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-].*$/;

const SEGMENT = 'segment';
const SPECIAL_OFFERS = 'special-offers';
const PLANS = 'plans';
const CATALOG = 'catalog';
const PRODUCT = 'product';
const MINI_COMPARE_CHART = 'mini-compare-chart';
const TWP = 'twp';
const CARD_TYPES = [
  SEGMENT,
  SPECIAL_OFFERS,
  PLANS,
  CATALOG,
  PRODUCT,
  'inline-heading',
  'image',
  MINI_COMPARE_CHART,
  TWP,
];

const CARD_SIZES = ['wide', 'super-wide'];

const SLOT_MAP_DEFAULT = {
  H5: 'promo-text',
  H4: 'body-xxs',
  H3: 'heading-xs',
  H2: 'heading-m',
};

const SLOT_MAP = { 'special-offers': { H5: 'detail-m' } };

const HEADING_MAP = {
  'special-offers': {
    H5: 'H4',
    H3: 'H3',
  },
};

const INNER_ELEMENTS_SELECTOR = 'h2, h3, h4, h5, h6, p, ul, em';

const MULTI_OFFER_CARDS = [PLANS, PRODUCT, MINI_COMPARE_CHART, TWP];
// Force cards to refresh once they become visible so that the footer rows are properly aligned.
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target.clientHeight === 0) return;
    intersectionObserver.unobserve(entry.target);
    entry.target.requestUpdate();
  });
});

const getPodType = (styles) => styles?.find((style) => CARD_TYPES.includes(style));

const isHeadingTag = (tagName) => /^H[2-5]$/.test(tagName);
const isParagraphTag = (tagName) => tagName === 'P';

const appendSlot = (slotEls, slotName, merchCard, nodeName = 'p') => {
  if (slotEls.length === 0 || merchCard.variant !== MINI_COMPARE_CHART) return;
  const newEl = createTag(
    nodeName,
    { slot: slotName, class: slotName },
  );
  slotEls.forEach((e) => {
    newEl.innerHTML += e.innerHTML;
  });
  merchCard.append(newEl);
};

export async function loadMnemonicList(foreground) {
  try {
    const { base } = getConfig();
    const stylePromise = new Promise((resolve) => {
      loadStyle(`${base}/blocks/mnemonic-list/merch-mnemonic-list.css`, resolve);
    });
    const loadModule = import(`${base}/blocks/mnemonic-list/mnemonic-list.js`)
      .then(({ decorateMnemonicList }) => decorateMnemonicList(foreground));
    await Promise.all([stylePromise, loadModule]);
  } catch (err) {
    window.lana?.log(`Failed to load mnemonic list module: ${err}`);
  }
}

function extractQuantitySelect(el) {
  const quantitySelectConfig = [...el.querySelectorAll('ul')]
    .find((ul) => ul.querySelector('li')?.innerText?.includes('Quantity'));
  const configMarkup = quantitySelectConfig?.querySelector('ul');
  if (!configMarkup) return null;
  const config = configMarkup.children;
  if (config.length !== 2) return null;
  const attributes = {};
  attributes.title = config[0].textContent.trim();
  const values = config[1].textContent.split(',')
    .map((value) => value.trim())
    .filter((value) => /^\d*$/.test(value))
    .map((value) => (value === '' ? undefined : Number(value)));
  quantitySelectConfig.remove();
  if (![3, 4, 5].includes(values.length)) return null;
  import('../../deps/mas/merch-quantity-select.js');
  [attributes.min, attributes.max, attributes.step, attributes['default-value'], attributes['max-input']] = values;
  const quantitySelect = createTag('merch-quantity-select', attributes);
  return quantitySelect;
}

const parseTwpContent = async (el, merchCard) => {
  const quantitySelect = extractQuantitySelect(el);
  if (quantitySelect) {
    merchCard.append(quantitySelect);
  }
  let allElements = el?.children[0]?.children[0]?.children;
  if (!allElements?.length) return;
  allElements = [...allElements];
  const contentGroups = allElements.reduce((acc, curr) => {
    if (curr.tagName.toLowerCase() === 'p' && curr.textContent.trim() === '--') {
      acc.push([]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [[]]);

  contentGroups.forEach((group, index) => {
    if (index === 0) { // Top section
      const headings = group.filter((e) => e.tagName.toLowerCase() === 'h3');
      const topBody = group.filter((e) => e.tagName.toLowerCase() === 'p');
      appendSlot(headings, 'heading-xs', merchCard);
      appendSlot(topBody, 'body-xs-top', merchCard);
    } else if (index === 1) { // Body section
      const content = group.filter((e) => e.tagName.toLowerCase() === 'p' || e.tagName.toLowerCase() === 'ul');
      const bodySlot = createTag('div', { slot: 'body-xs' }, content);
      merchCard.append(bodySlot);

      const whatsIncludedLink = bodySlot.querySelector('a[href*="merch-whats-included"]');
      if (whatsIncludedLink) {
        whatsIncludedLink.classList.add('merch-whats-included');
      }
    } else if (index === 2) { // Footer section
      const footerContent = group.filter((e) => ['h5', 'p'].includes(e.tagName.toLowerCase()));
      const footer = createTag('div', { slot: 'footer' }, footerContent);
      merchCard.append(footer);
    }
  });

  const offerSelection = el.querySelector('ul');
  if (offerSelection) {
    const { initOfferSelection } = await import('./merch-offer-select.js');
    await initOfferSelection(merchCard, offerSelection);
  }
};

const appendPaymentDetails = (element, merchCard) => {
  if (element.firstChild?.nodeType !== Node.TEXT_NODE) return;
  const paymentDetails = createTag('div', { class: 'payment-details' }, element.innerHTML);
  const headingM = merchCard.querySelector('h4[slot="heading-m"]');
  headingM?.append(paymentDetails);
};

const appendCalloutContent = (element, merchCard) => {
  if (element.firstElementChild?.tagName !== 'EM') return;
  let calloutSlot = merchCard.querySelector('div[slot="callout-content"]');
  let calloutContainer = calloutSlot?.querySelector('div');
  if (!calloutContainer) {
    calloutSlot = createTag('div', { slot: 'callout-content' });
    calloutContainer = createTag('div');
    calloutSlot.appendChild(calloutContainer);
    merchCard.appendChild(calloutSlot);
  }

  const calloutContentWrapper = createTag('div');
  const calloutContent = createTag('div');
  const emElement = element.firstElementChild;
  const fragment = document.createDocumentFragment();
  let imgElement = null;

  emElement.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'A' && child.innerText.trim().toLowerCase() === '#icon') {
      const [imgSrc, tooltipText] = child.getAttribute('href')?.split('#') || [];
      imgElement = createTag('img', {
        src: imgSrc,
        title: decodeURIComponent(tooltipText),
        class: 'callout-icon',
      });
    } else {
      const clone = child.cloneNode(true);
      fragment.appendChild(clone);
    }
  });

  calloutContent.appendChild(fragment);
  calloutContentWrapper.appendChild(calloutContent);

  if (imgElement) {
    calloutContentWrapper.appendChild(imgElement);
  }
  calloutContainer.appendChild(calloutContentWrapper);
};

const parseContent = async (el, merchCard) => {
  let bodySlotName = `body-${merchCard.variant !== MINI_COMPARE_CHART ? 'xs' : 'm'}`;
  let headingMCount = 0;
  let headingXsCount = 0;

  if (merchCard.variant === MINI_COMPARE_CHART) {
    bodySlotName = 'body-m';
    const priceSmallType = el.querySelectorAll('h6');
    // Filter out any h6 elements that contain an <em> tag
    const filteredPriceSmallType = Array.from(priceSmallType).filter((h6) => !h6.querySelector('em'));
    if (filteredPriceSmallType.length > 0) appendSlot(filteredPriceSmallType, 'price-commitment', merchCard);
  }

  let headingSize = 3;
  const bodySlot = createTag('div', { slot: bodySlotName });
  const mnemonicList = el.querySelector('.mnemonic-list');
  if (mnemonicList) {
    await loadMnemonicList(mnemonicList);
  }
  const innerElements = [
    ...el.querySelectorAll(INNER_ELEMENTS_SELECTOR),
  ];

  innerElements.forEach((element) => {
    let { tagName } = element;
    if (isHeadingTag(tagName)) {
      let slotName = SLOT_MAP[merchCard.variant]?.[tagName] || SLOT_MAP_DEFAULT[tagName];
      if (slotName) {
        if (['H2', 'H3', 'H4', 'H5'].includes(tagName)) {
          if (tagName === 'H3') headingXsCount += 1;
          element.classList.add('card-heading');
          if (merchCard.badgeText) {
            element.closest('div[role="tabpanel"')?.classList.add('badge-merch-cards');
          }
          if (HEADING_MAP[merchCard.variant]?.[tagName]) {
            tagName = HEADING_MAP[merchCard.variant][tagName];
          } else {
            if (tagName === 'H2') {
              headingMCount += 1;
            }
            if (headingMCount === 2 && merchCard.variant === MINI_COMPARE_CHART) {
              slotName = 'heading-m-price';
            }
            tagName = `H${headingSize}`;
            headingSize += 1;
          }
        }
        element.setAttribute('slot', slotName);
        tagName = (headingXsCount === 1 && tagName === 'H3')
        || (merchCard.variant === MINI_COMPARE_CHART && slotName === 'heading-m') ? 'h3' : 'p';
        const newElement = createTag(tagName);
        Array.from(element.attributes).forEach((attr) => {
          newElement.setAttribute(attr.name, attr.value);
        });
        newElement.innerHTML = element.innerHTML;
        merchCard.append(newElement);
      }
      return;
    }
    if (tagName === 'H6') {
      appendPaymentDetails(element, merchCard);
      appendCalloutContent(element, merchCard);
    }
    if (isParagraphTag(tagName)) {
      bodySlot.append(element);
      merchCard.append(bodySlot);
    }
    if (mnemonicList) bodySlot.append(mnemonicList);
  });

  if (merchCard.variant === MINI_COMPARE_CHART && merchCard.childNodes[1]) {
    merchCard.insertBefore(bodySlot, merchCard.childNodes[1]);
  }
};

const getBadgeStyle = (badgeMetadata) => {
  const badgeStyleRegex = /^#[0-9a-fA-F]+, #[0-9a-fA-F]+(, #[0-9a-fA-F]+)?$/;
  if (!badgeStyleRegex.test(badgeMetadata[0]?.innerText)) return null;
  const style = badgeMetadata[0].innerText.split(',').map((s) => s.trim());
  if (style.length < 2) return null;
  const badgeBackgroundColor = style[0];
  const badgeColor = style[1];
  const borderColor = style[2] !== 'none' ? style[2] : null;
  const badgeWrapper = badgeMetadata[0].parentNode;
  const badgeText = badgeMetadata[1].innerText;
  badgeWrapper.remove();
  return { badgeBackgroundColor, badgeColor, badgeText, borderColor };
};

const getActionMenuContent = (el) => {
  const actionMenuContentWrapper = [...el.children].find((child) => child.querySelector('ul') && child.querySelector('h2') === null);
  if (!actionMenuContentWrapper) return undefined;
  actionMenuContentWrapper.remove();
  return actionMenuContentWrapper?.firstElementChild;
};

const extractTags = (container) => [...container.querySelectorAll('p')]
  .map((tag) => tag.innerText?.trim())
  .filter((item) => TAG_PATTERN.test(item))
  .reduce((acc, item) => {
    const [, tag] = item.split(':');
    if (!tag) return acc;
    const parts = tag.split('/');
    if (!acc[parts[0]]) return acc;
    acc[parts[0]].push(parts.pop());
    return acc;
  }, { categories: ['all'], types: [] });

const addMerchCardGridIfMissing = (section, cardType) => {
  const el = section?.querySelector('.section-metadata');
  const directSection = section?.parentElement?.tagName === 'MAIN';
  if (el) {
    const metadata = getMetadata(el);
    let styleClasses = [];
    styleClasses = metadata?.style?.text?.split(',').map((token) => token.split(' ').join('-')) ?? [];
    if (!styleClasses.some((styleClass) => /-merch-card/.test(styleClass))) {
      if (styleClasses.some((styleClass) => /-up/.test(styleClass) || directSection)) {
        section.classList.add('three-merch-cards', cardType);
      }
    }
    section.classList.add(cardType);
    return true;
  }
  if (directSection) {
    section.classList.add('three-merch-cards', cardType);
  }
  return false;
};

const decorateMerchCardLinkAnalytics = (el) => {
  [...el.querySelectorAll('a')].forEach((link, index) => {
    const heading = el.querySelector('h3');
    const linkText = `${processTrackingLabels(link.textContent)}-${index + 1}`;
    const headingText = heading ? `${processTrackingLabels(heading.textContent)}` : '';
    const analyticsString = heading ? `${linkText}--${headingText}` : linkText;
    link.setAttribute('daa-ll', analyticsString);
  });
};

const addStock = (merchCard, styles) => {
  if (styles.includes('add-stock') && merchCard.variant !== TWP) {
    let stock;
    const selector = styles.includes('edu') ? '.merch-offers.stock.edu > *' : '.merch-offers.stock > *';
    const [label, ...rest] = [...document.querySelectorAll(selector)];
    if (label) {
      const offers = rest.filter(({ dataset: { wcsOsi } }) => wcsOsi);
      stock = { label: label?.innerText, offers: offers?.map((offer) => offer.dataset.wcsOsi).join(',') };
    }
    if (stock !== undefined) {
      merchCard.setAttribute('checkbox-label', stock.label);
      merchCard.setAttribute('stock-offer-osis', stock.offers);
    }
  }
};

const simplifyHrs = (el) => {
  const hrs = el.querySelectorAll('hr');
  hrs.forEach((hr) => {
    if (hr.parentElement.tagName === 'P') {
      hr.parentElement.replaceWith(hr);
    }
  });
  if (el.variant === PRODUCT) {
    const calloutContent = el.querySelector('div[slot="callout-content"]');
    const bodySlot = el.querySelector('div[slot="body-xs"]');
    if (calloutContent && bodySlot) {
      const bodyLowerContent = createTag('div', { slot: 'body-lower' });
      const elements = [...bodySlot.children];
      elements.forEach((element) => {
        if (element.tagName !== 'P') {
          bodyLowerContent.append(element);
        }
      });
      if (bodyLowerContent.childNodes.length > 0) {
        calloutContent.parentElement.appendChild(bodyLowerContent);
      }
    }
  }
};

const getMiniCompareChartFooterRows = (el) => {
  let footerRows = Array.from(el.children).slice(1);
  footerRows = footerRows.filter((row) => !row.querySelector('.footer-row-cell'));
  if (footerRows[0].firstElementChild.innerText === 'Alt-cta') {
    footerRows.splice(0, 2);
  }
  footerRows.forEach((row) => row.remove());
  return footerRows;
};

const createFirstRow = async (firstRow, isMobile, checkmarkCopyContainer, defaultChevronState) => {
  const firstRowText = firstRow.querySelector('div > div:last-child').innerHTML;
  let firstRowTextParagraph;

  if (isMobile) {
    const { chevronDownSVG, chevronUpSVG } = await import('./img/chevron.js');
    const chevronIcon = createTag('span', { class: 'chevron-icon' }, chevronDownSVG);
    firstRowTextParagraph = createTag('div', { class: 'footer-rows-title' }, firstRowText);
    firstRowTextParagraph.appendChild(chevronIcon);

    if (defaultChevronState === 'open') {
      checkmarkCopyContainer.classList.add('open');
    }

    firstRowTextParagraph.addEventListener('click', () => {
      const isOpen = checkmarkCopyContainer.classList.toggle('open');
      chevronIcon.innerHTML = isOpen ? chevronUpSVG : chevronDownSVG;
    });
  } else {
    firstRowTextParagraph = createTag('div', { class: 'footer-rows-title' }, firstRowText);
    checkmarkCopyContainer.classList.add('open');
  }

  return firstRowTextParagraph;
};

const createFooterRowCell = (row, isCheckmark) => {
  const rowIcon = row.firstElementChild.querySelector('picture');
  const rowText = row.querySelector('div > div:nth-child(2)').innerHTML;
  const rowTextParagraph = createTag('div', { class: 'footer-row-cell-description' }, rowText);
  const footerRowCellClass = isCheckmark ? 'footer-row-cell-checkmark' : 'footer-row-cell';
  const footerRowIconClass = isCheckmark ? 'footer-row-icon-checkmark' : 'footer-row-icon';
  const footerRowCell = createTag('li', { class: footerRowCellClass });

  if (rowIcon) {
    rowIcon.classList.add(footerRowIconClass);
    footerRowCell.appendChild(rowIcon);
  }
  footerRowCell.appendChild(rowTextParagraph);

  return footerRowCell;
};

const decorateFooterRows = async (merchCard, footerRows) => {
  if (!footerRows) return;

  const footerRowsSlot = createTag('div', { slot: 'footer-rows' });
  const isCheckmark = merchCard.classList.contains('bullet-list');
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  const ulContainer = createTag('ul');
  if (isCheckmark) {
    const firstRow = footerRows[0];
    const firstRowContent = firstRow.querySelector('div > div:first-child').innerHTML.split(',');
    let bgStyle = '#E8E8E8';
    let defaultChevronState = 'close';

    firstRowContent.forEach((item) => {
      const trimmedItem = item.trim();
      if (trimmedItem.startsWith('#')) {
        bgStyle = trimmedItem;
      } else if (trimmedItem === 'open' || trimmedItem === 'close') {
        defaultChevronState = trimmedItem;
      }
    });

    const hrElem = createTag('hr', { style: `background: ${bgStyle};` });
    footerRowsSlot.appendChild(hrElem);
    merchCard.classList.add('has-divider');

    ulContainer.classList.add('checkmark-copy-container');
    const firstRowTextParagraph = await createFirstRow(
      firstRow,
      isMobile,
      ulContainer,
      defaultChevronState,
    );

    footerRowsSlot.appendChild(firstRowTextParagraph);

    footerRows.splice(0, 1);
    footerRowsSlot.style.padding = '0px var(--consonant-merch-spacing-xs)';
    footerRowsSlot.style.marginBlockEnd = 'var(--consonant-merch-spacing-xs)';
  }
  footerRowsSlot.appendChild(ulContainer);

  footerRows.forEach((row) => {
    const footerRowCell = createFooterRowCell(row, isCheckmark);
    ulContainer.appendChild(footerRowCell);
  });

  merchCard.appendChild(footerRowsSlot);
};

const setMiniCompareOfferSlot = (merchCard, offers) => {
  if (merchCard.variant !== MINI_COMPARE_CHART) return;
  const miniCompareOffers = merchCard.querySelector('div[slot="offers"]');
  if (offers) {
    miniCompareOffers.append(offers);
  } else {
    miniCompareOffers.appendChild(createTag('p'));
  }
  merchCard.appendChild(miniCompareOffers);
};

const updateBigPrices = (merchCard) => {
  const prices = merchCard.querySelectorAll('strong > em > span[is="inline-price"]');
  const isMobile = window.matchMedia('(max-width: 1199px)').matches;
  prices.forEach((span) => {
    const strongTag = span.parentNode.parentNode;
    const emTag = span.parentNode;
    strongTag.replaceChild(span, emTag);
    if (!isMobile) {
      span.style.cssText = 'font-size: 24px; line-height: 22.5px;';
    } else {
      span.style.cssText = 'font-size: 16px; line-height: 24px;';
    }
  });
};

const addStartingAt = async (styles, merchCard) => {
  if (styles.includes('starting-at')) {
    const { replaceKey } = await import('../../features/placeholders.js');
    await replaceKey('starting-at', getConfig()).then((key) => {
      const startingAt = createTag('div', { class: 'starting-at' }, key);
      const price = merchCard.querySelector('span[is="inline-price"]');
      if (price) {
        price.parentNode.prepend(startingAt);
      }
    });
  }
};

export default async function init(el) {
  if (!el.querySelector(INNER_ELEMENTS_SELECTOR)) return el;
  const styles = [...el.classList];
  const cardType = getPodType(styles) || PRODUCT;
  if (!styles.includes(cardType)) {
    styles.push(cardType);
  }
  let section = el.closest('.section');
  if (section) {
    const merchCards = addMerchCardGridIfMissing(section, cardType);
    if (!merchCards) {
      if (section?.parentElement.classList.contains('fragment')) {
        const fragment = section.parentElement;
        const fragmentParent = fragment.parentElement;
        section.style.display = 'contents';
        fragment.style.display = 'contents';
        fragmentParent.style.display = fragmentParent.classList.contains('nested')
          ? fragmentParent.style.display
          : 'contents';
        section = fragmentParent.parentElement;
        addMerchCardGridIfMissing(section, cardType);
      }
    }
  }
  const merchCard = createTag('merch-card', { class: styles.join(' '), 'data-block': '' });
  merchCard.setAttribute('variant', cardType);
  merchCard.setAttribute('size', styles.find((style) => CARD_SIZES.includes(style)) || '');
  if (el.dataset.removedManifestId) {
    merchCard.dataset.removedManifestId = el.dataset.removedManifestId;
  }
  let tags = {};
  if (el.lastElementChild?.previousElementSibling?.querySelector('h3,h4,h5,h6')) {
    // tag section is available
    const nameSelector = 'h3,h4,h5,h6';
    const nameEl = el.lastElementChild.querySelector(nameSelector);
    if (nameEl) {
      merchCard.setAttribute('name', nameEl.textContent?.trim());
      nameEl.remove();
    }
    tags = extractTags(el.lastElementChild);
    if (tags.categories?.length > 1 || tags.types?.length > 0) {
    // this div contains tags, remove it from further processing.
      el.lastElementChild.remove();
    }
  }
  const { categories = ['all'], types = [] } = tags;
  if (el.firstElementChild) {
    const badgeMetadata = el.firstElementChild.querySelector('ul,h2') === null
  && el.firstElementChild.innerText.includes('#') ? el.firstElementChild : null;
    if (badgeMetadata !== null) {
      const badge = getBadgeStyle(badgeMetadata.children);
      if (badge !== null) {
        merchCard.setAttribute(
          'badge-background-color',
          badge.badgeBackgroundColor,
        );
        merchCard.setAttribute('badge-color', badge.badgeColor);
        merchCard.setAttribute('badge-text', badge.badgeText);
        if (badge.borderColor) merchCard.setAttribute('border-color', badge.borderColor);
        merchCard.classList.add('badge-card');
      } else if (badgeMetadata.children.length === 1) {
        const borderColor = badgeMetadata.children[0].innerText.trim();
        if (borderColor.startsWith('#')) merchCard.setAttribute('border-color', borderColor);
      }
    }
  }
  let footerRows;
  if ([MINI_COMPARE_CHART, PLANS, SEGMENT, PRODUCT].includes(cardType)) {
    intersectionObserver.observe(merchCard);
  }
  if (cardType === MINI_COMPARE_CHART) {
    footerRows = getMiniCompareChartFooterRows(el);
  }
  const allPictures = el.querySelectorAll('picture');
  const pictures = Array.from(allPictures).filter((picture) => !picture.closest('.mnemonic-list'));
  let image;
  const icons = [];
  pictures.forEach((img) => {
    const imgNode = img.querySelector('img');
    const { width, height } = imgNode;
    const isSquare = Math.abs(width - height) <= 10;
    if (img) {
      if (isSquare) {
        icons.push(img);
      } else {
        image = img;
      }
    }
  });
  const actionMenuContent = cardType === CATALOG
    ? getActionMenuContent(el)
    : null;
  if (actionMenuContent) {
    merchCard.setAttribute('action-menu', true);
    merchCard.append(
      createTag(
        'div',
        { slot: 'action-menu-content', tabindex: '0' },
        actionMenuContent.innerHTML,
      ),
    );
  }
  let ctas = el.querySelector('p > strong a, p > em a')?.closest('p');
  if (!ctas) {
    const candidate = el.querySelector('p:last-of-type');
    if (candidate?.querySelector('a')) {
      ctas = candidate;
    }
  }
  if (image !== undefined) {
    const imageSlot = createTag('div', { slot: 'bg-image' });
    imageSlot.appendChild(image);
    merchCard.appendChild(imageSlot);
  }
  if (!icons || icons.length > 0) {
    const iconImgs = Array.from(icons).map((icon) => {
      const img = {
        src: icon.querySelector('img').src,
        alt: icon.querySelector('img').alt,
        href: icon.closest('a')?.href ?? '',
      };
      return img;
    });
    iconImgs.forEach((icon) => {
      const merchIcon = createTag('merch-icon', { slot: 'icons', src: icon.src, alt: icon.alt, href: icon.href, size: 'l' });
      merchCard.appendChild(merchIcon);
    });
    icons.forEach((icon) => icon.remove());
  }

  addStock(merchCard, styles);
  if (styles.includes('secure')) {
    const { replaceKey } = await import('../../features/placeholders.js');
    await replaceKey('secure-transaction', getConfig()).then((key) => merchCard.setAttribute('secure-label', key));
  }
  merchCard.setAttribute('filters', categories.join(','));
  merchCard.setAttribute('types', types.join(','));

  if (merchCard.variant !== TWP) {
    parseContent(el, merchCard);

    const footer = createTag('div', { slot: 'footer' });
    if (ctas) {
      decorateButtons(ctas, (merchCard.variant === MINI_COMPARE_CHART) ? 'button-l' : undefined);
      footer.append(ctas);
    }
    merchCard.appendChild(footer);

    if (MULTI_OFFER_CARDS.includes(cardType)) {
      const quantitySelect = extractQuantitySelect(el);
      const offerSelection = el.querySelector('ul');
      if (merchCard.variant === MINI_COMPARE_CHART) {
        const miniCompareOffers = createTag('div', { slot: 'offers' });
        merchCard.append(miniCompareOffers);
      }
      if (offerSelection) {
        const { initOfferSelection } = await import('./merch-offer-select.js');
        setMiniCompareOfferSlot(merchCard, undefined);
        initOfferSelection(merchCard, offerSelection, quantitySelect);
      }
      if (quantitySelect) {
        if (merchCard.variant === MINI_COMPARE_CHART) {
          setMiniCompareOfferSlot(merchCard, quantitySelect);
        } else {
          const bodySlot = merchCard.querySelector('div[slot="body-xs"]');
          bodySlot.append(quantitySelect);
        }
      }
    }

    updateBigPrices(merchCard);
    await addStartingAt(styles, merchCard);
    decorateBlockHrs(merchCard);
    simplifyHrs(merchCard);
    if (merchCard.classList.contains('has-divider')) merchCard.setAttribute('custom-hr', true);
    await decorateFooterRows(merchCard, footerRows);
  } else {
    parseTwpContent(el, merchCard);
  }
  el.replaceWith(merchCard);
  decorateMerchCardLinkAnalytics(merchCard);
  return merchCard;
}
