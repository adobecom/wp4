export default class Merchcard {
  constructor(page, nth = 0) {
    this.page = page;

    // merch card locators
    this.merchCard = this.page.locator('.merch-card').nth(nth);
    this.segment = this.page.locator('.merch-card.segment').nth(nth);
    this.specialOffers = this.page.locator('.merch-card.special-offers').nth(nth);
    this.plans = this.page.locator('.merch-card.plans').nth(nth);
    this.catalog = this.page.locator('.merch-card.catalog').nth(nth);

    // inline price and strikethrough price
    this.inlinePrice1 = this.merchCard.locator('span.placeholder-resolved').nth(0);
    this.inlinePrice2 = this.merchCard.locator('span.placeholder-resolved').nth(1);
    this.price = this.inlinePrice1.locator('.price');
    this.priceCurrencySymbol = this.inlinePrice1.locator('.price-currency-symbol');
    this.priceInteger = this.inlinePrice1.locator('.price-integer');
    this.priceDecimalDelimiter = this.inlinePrice1.locator('.price-decimals-delimiter');
    this.priceDecimals = this.inlinePrice1.locator('.price-decimals');
    this.priceRecurrence = this.inlinePrice1.locator('.price-recurrence');

    this.strikethroughPrice = this.inlinePrice2.locator('.price');
    this.strikethroughPriceCurrencySymbol = this.inlinePrice2.locator('.price-currency-symbol');
    this.strikethroughPriceInteger = this.inlinePrice2.locator('.price-integer');
    this.strikethroughPriceDecimalDelimiter = this.inlinePrice2.locator('.price-decimals-delimiter');
    this.strikethroughPriceDecimals = this.inlinePrice2.locator('.price-decimals');
    this.strikethroughPriceRecurrence = this.inlinePrice2.locator('.price-recurrence');

    // merch-card segment locators
    this.segmentRibbon = this.merchCard.locator('.segment-badge');
    this.segmentTitle = this.segment.locator('h3[slot="heading-xs"]').nth(0);
    this.segmentDescription1 = this.segment.locator('div[slot="body-xs"] p').nth(0);
    this.segmentDescription2 = this.segment.locator('div[slot="body-xs"] p').nth(1);

    this.linkText1 = this.segmentDescription2.locator('a').nth(0);
    this.linkText2 = this.segmentDescription2.locator('a').nth(1);

    // merch-card special offers
    this.specialOffersImage = this.specialOffers.locator('div[slot="bg-image"] img');
    this.specialOffersRibbon = this.merchCard.locator('.special-offers-badge');
    this.specialOffersDetailM = this.specialOffers.locator('p[slot="detail-m"]').nth(0);
    this.specialOffersTitlePromoText = this.specialOffers.locator('p[slot="body-xxs"]');
    this.specialOffersTitleHeading = this.specialOffers.locator('h3[slot="heading-xs"]').nth(0);

    this.specialOffersDescription1 = this.specialOffers.locator('div[slot="body-xs"] p').nth(1);
    this.specialOffersDescription2 = this.specialOffers.locator('div[slot="body-xs"] p').nth(2);
    this.specialOffersDescription3 = this.specialOffers.locator('div[slot="body-xs"] p').nth(3);
    this.specialOffersLinkText3 = this.specialOffersDescription3.locator('a').nth(0);

    this.seeTermsTextLink = this.merchCard.locator('a:has-text("See terms")');

    // merch-card plans locators
    this.productIcon = this.plans.locator('img');
    this.plansRibbon = this.plans.locator('.plans-badge');
    this.plansCardTitleHeadingXS = this.plans.locator('h3[slot="heading-xs"]');
    this.plansCardTitleBodyXXS = this.plans.locator('p[slot="body-xxs"]');
    this.plansCardDescription1 = this.plans.locator('div[slot="body-xs"] p').nth(1);
    this.plansCardDescription2 = this.plans.locator('div[slot="body-xs"] p').nth(2);
    this.plansCardDescription3 = this.plans.locator('div[slot="body-xs"] p').nth(3);
    this.seePlansTextLink = this.merchCard.locator('a:has-text("See plan & pricing details")');

    // merch-card catalog
    this.catalogProductIcon = this.catalog.locator('#shadow-root div.icons');
    this.catalogRibbon = this.catalog.locator('.catalog-badge');
    this.catalogActionMenu = this.catalog.locator('div[slot="action-menu-content"]');
    this.catalogActionMenuList = this.catalogActionMenu.locator('ul li');
    this.catalogActionMenuPText1 = this.catalogActionMenu.locator('p').nth(0);
    this.catalogActionMenuPText2 = this.catalogActionMenu.locator('p').nth(1);
    this.catalogActionMenuPText3 = this.catalogActionMenu.locator('p').nth(2);
    this.catalogActionMenuPText4 = this.catalogActionMenu.locator('p').nth(3);
    this.catalogActionMenuPText5 = this.catalogActionMenu.locator('p ').nth(4);
    this.systemRequirementTextLink = this.merchCard.locator('a:has-text("See system requirements")');

    this.catalogCardTitleHeadingXS = this.catalog.locator('h3[slot="heading-xs"]');
    this.catalogCardTitleH4 = this.catalog.locator('p[slot="body-xxs"]');
    this.catalogCardDescription2 = this.catalog.locator('div[slot="body-xs"] p').nth(2);
    this.seeWhatsIncludedTextLink = this.merchCard.locator('a:has-text("See what’s included")');
    this.learnMoreTextLink = this.merchCard.locator('a:has-text("Learn more")');

    // merch-card footer sections
    this.footer = this.merchCard.locator('div[slot="footer"]');
    this.footerCheckbox = this.page.locator('#stock-checkbox input[type="checkbox"]');
    this.footerCheckboxLabel = this.merchCard.locator('#stock-checkbox');
    this.secureTransactionIcon = this.merchCard.locator('.secure-transaction-icon');
    this.secureTransactionLabel = this.merchCard.locator('.secure-transaction-label');
    this.footerOutlineButton = this.merchCard.locator('a.con-button.outline');
    this.footerOutlineButton2 = this.merchCard.locator('a.con-button.outline').nth(1);
    this.footerBlueButton = this.merchCard.locator('a.con-button.blue').nth(0);
    this.footerBlueButton2 = this.merchCard.locator('a.con-button.blue').nth(1);

    // merch-card attributes
    this.attributes = {
      segmentRibbon: { style: /background-color:\s*#EDCC2D;\s*color:\s*#000000;\s*/ },
      specialOfferRibbon: { style: /background-color:\s* #F68D2E;\s*color:\s*#000000;\s*/ },
      plansRibbon: { style: /background-color:\s*#EDCC2D;\s*color:\s*#000000;\s*/ },
    };
  }
}
