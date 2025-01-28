import { CheckoutLink } from './checkout-link.js';
import {
    CheckoutWorkflow,
    CheckoutWorkflowStep,
    computePromoStatus,
    omitProperties,
    toBoolean,
    toEnumeration,
} from './external.js';
import { buildCheckoutUrl } from './buildCheckoutUrl.js';
import { Defaults } from './defaults.js';
import { toOfferSelectorIds, toQuantity } from './utilities.js';

/**
 * generate Checkout configuration
 */
export function Checkout({ providers, settings }) {
    function collectCheckoutOptions(overrides, placeholder) {
        const {
            checkoutClientId,
            checkoutWorkflow: defaultWorkflow,
            checkoutWorkflowStep: defaultWorkflowStep,
            country: defaultCountry,
            language: defaultLanguage,
            promotionCode: defaultPromotionCode,
            quantity: defaultQuantity,
        } = settings;
        const {
            checkoutMarketSegment,
            checkoutWorkflow = defaultWorkflow,
            checkoutWorkflowStep = defaultWorkflowStep,
            imsCountry,
            country = imsCountry ?? defaultCountry,
            language = defaultLanguage,
            quantity = defaultQuantity,
            entitlement,
            upgrade,
            modal,
            perpetual,
            promotionCode = defaultPromotionCode,
            wcsOsi,
            extraOptions,
            ...rest
        } = Object.assign({}, placeholder?.dataset ?? {}, overrides ?? {});
        const workflow = toEnumeration(
            checkoutWorkflow,
            CheckoutWorkflow,
            Defaults.checkoutWorkflow,
        );
        let workflowStep = CheckoutWorkflowStep.CHECKOUT;
        if (workflow === CheckoutWorkflow.V3) {
            workflowStep = toEnumeration(
                checkoutWorkflowStep,
                CheckoutWorkflowStep,
                Defaults.checkoutWorkflowStep,
            );
        }
        const options = omitProperties({
            ...rest,
            extraOptions,
            checkoutClientId,
            checkoutMarketSegment,
            country,
            quantity: toQuantity(quantity, Defaults.quantity),
            checkoutWorkflow: workflow,
            checkoutWorkflowStep: workflowStep,
            language,
            entitlement: toBoolean(entitlement),
            upgrade: toBoolean(upgrade),
            modal: toBoolean(modal),
            perpetual: toBoolean(perpetual),
            promotionCode: computePromoStatus(promotionCode).effectivePromoCode,
            wcsOsi: toOfferSelectorIds(wcsOsi),
        });
        if (placeholder) {
            for (const provider of providers.checkout) {
                provider(placeholder, options);
            }
        }
        return options;
    }

    /**
     * @param {*} offers
     * @param {*} options
     * @returns a checkout URL
     */
    function buildCheckoutURL(offers, options) {
      /* c8 ignore next 3 */
        if (!Array.isArray(offers) || !offers.length || !options) {
            return '';
        }
        const { env, landscape } = settings;
        const {
            checkoutClientId: clientId,
            checkoutMarketSegment: marketSegment,
            checkoutWorkflow: workflow,
            checkoutWorkflowStep: workflowStep,
            country,
            promotionCode: checkoutPromoCode,
            quantity,
            ...rest
        } = collectCheckoutOptions(options);
        const context = window.frameElement ? 'if' : 'fp';
        const data = {
            checkoutPromoCode,
            clientId,
            context,
            country,
            env,
            items: [],
            marketSegment,
            workflowStep,
            landscape,
            ...rest,
        };
        if (offers.length === 1) {
            const [{ offerId, offerType, productArrangementCode }] = offers;
            const {
                marketSegments: [marketSegment],
            } = offers[0];
            Object.assign(data, {
                marketSegment,
                offerType,
                productArrangementCode,
            });
            data.items.push(
                quantity[0] === 1
                    ? { id: offerId }
                    : { id: offerId, quantity: quantity[0] },
            );
        } else {
            /* c8 ignore next 7 */
            data.items.push(
                ...offers.map(({ offerId }, index) => ({
                    id: offerId,
                    quantity: quantity[index] ?? Defaults.quantity,
                })),
            );
        }
        return buildCheckoutUrl(data);
    }

    const { createCheckoutLink } = CheckoutLink;
    return {
      CheckoutLink,
      CheckoutWorkflow,
      CheckoutWorkflowStep,
      buildCheckoutURL,
      collectCheckoutOptions,
      createCheckoutLink,
    };
}
