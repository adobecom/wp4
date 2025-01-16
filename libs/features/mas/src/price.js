import { Defaults } from './defaults.js';
import {
    price,
    pricePromo,
    priceOptical,
    priceStrikethrough,
    priceAnnual,
    priceWithAnnual,
    pricePromoWithAnnual,
    omitProperties,
    toBoolean,
    discount,
    computePromoStatus,
} from './external.js';
import { InlinePrice } from './inline-price.js';
import { toOfferSelectorIds, toQuantity } from './utilities.js';

export function Price({ literals, providers, settings }) {
    function collectPriceOptions(overrides, placeholder) {
        const {
            country: defaultCountry,
            displayOldPrice: defaultDisplayOldPrice,
            displayPerUnit: defaultDisplayPerUnit,
            displayRecurrence: defaultDisplayRecurrence,
            displayTax: defaultDisplayTax,
            forceTaxExclusive: defaultForceTaxExclusive,
            language: defaultLanguage,
            promotionCode: defaultPromotionCode,
            quantity: defaultQuantity,
        } = settings;
        const {
            displayOldPrice = defaultDisplayOldPrice,
            displayPerUnit = defaultDisplayPerUnit,
            displayRecurrence = defaultDisplayRecurrence,
            displayTax = defaultDisplayTax,
            forceTaxExclusive = defaultForceTaxExclusive,
            country = defaultCountry,
            language = defaultLanguage,
            perpetual,
            promotionCode = defaultPromotionCode,
            quantity = defaultQuantity,
            template,
            wcsOsi,
            ...rest
        } = Object.assign({}, placeholder?.dataset ?? {}, overrides ?? {});
        const options = omitProperties({
            ...rest,
            country,
            displayOldPrice: toBoolean(displayOldPrice),
            displayPerUnit: toBoolean(displayPerUnit),
            displayRecurrence: toBoolean(displayRecurrence),
            displayTax: toBoolean(displayTax),
            forceTaxExclusive: toBoolean(forceTaxExclusive),
            language,
            perpetual: toBoolean(perpetual),
            promotionCode: computePromoStatus(promotionCode).effectivePromoCode,
            quantity: toQuantity(quantity, Defaults.quantity),
            template,
            wcsOsi: toOfferSelectorIds(wcsOsi),
        });
        if (placeholder) {
            for (const provider of providers.price) {
                provider(placeholder, options);
            }
        }
        return options;
    }

    function buildPriceHTML(offers, options) {
        if (!Array.isArray(offers) || !offers.length || !options) {
            return '';
        }
        /* c8 ignore next 20 */
        const { template } = options;
        let method;
        switch (template) {
            // TODO: use price template name constants, export them from `consonant-templates`
            case 'discount':
                method = discount;
                break;
            case 'strikethrough':
                method = priceStrikethrough;
                break;
            case 'optical':
                method = priceOptical;
                break;
            case 'annual':
                method = priceAnnual;
                break;
            default:
                if (options.country === 'AU' && offers[0].planType === 'ABM') {
                    method = options.promotionCode
                        ? pricePromoWithAnnual
                        : priceWithAnnual;
                } else {
                    method = options.promotionCode ? pricePromo : price;
                }
        }

        const context = collectPriceOptions(options);
        context.literals = Object.assign(
            {},
            literals.price,
            omitProperties(options.literals ?? {}),
        );
        let [offer] = offers;
        offer = { ...offer, ...offer.priceDetails };
        return method(context, offer);
    }

     const createInlinePrice = InlinePrice.createInlinePrice;

    return {
        InlinePrice,
        buildPriceHTML,
        collectPriceOptions,
        createInlinePrice,
    };
}
