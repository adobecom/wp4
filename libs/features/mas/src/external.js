// This file aliases and re-exports commonly used external dependencies
import {
    CheckoutType,
    WorkflowStep,
    buildCheckoutUrl,
} from '@pandora/commerce-checkout-url-builder';
import { Term, Commitment } from '@pandora/data-models-odm';

import {
    price,
    pricePromo,
    priceOptical,
    priceStrikethrough,
    priceAnnual,
    priceWithAnnual,
    pricePromoWithAnnual,
} from './price/index.js';

import { discount } from './discount/index.js';

import {
    computePromoStatus,
    delay,
    equalsCaseInsensitive,
    getParameter,
    ignore,
    isBoolean,
    isFunction,
    isNotEmptyString,
    isPositiveFiniteNumber,
    omitProperties,
    toBoolean,
    toEnumeration,
    toPositiveFiniteInteger,
    applyPlanType,
    forceTaxExclusivePrice,
    PlanType,
} from '@dexter/tacocat-core';

const { freeze } = Object;

/** @type {Commerce.Checkout.CheckoutWorkflow} */
const CheckoutWorkflow = freeze({ ...CheckoutType });
/** @type {Commerce.Checkout.CheckoutWorkflowStep} */
const CheckoutWorkflowStep = freeze({ ...WorkflowStep });
const Env = {
    STAGE: 'STAGE',
    PRODUCTION: 'PRODUCTION',
    LOCAL: 'LOCAL',
};
/** @type {Commerce.Wcs.WcsCommitment} */
const WcsCommitment = freeze({ ...Commitment });
/** @type {Commerce.Wcs.WcsPlanType} */
const WcsPlanType = freeze({ ...PlanType });
/** @type {Commerce.Wcs.WcsTerm} */
const WcsTerm = freeze({ ...Term });

export {
    CheckoutWorkflow,
    CheckoutWorkflowStep,
    Env,
    WcsCommitment,
    WcsTerm,
    WcsPlanType,
    applyPlanType,
    buildCheckoutUrl,
    computePromoStatus,
    delay,
    equalsCaseInsensitive,
    forceTaxExclusivePrice,
    getParameter,
    ignore,
    isBoolean,
    isFunction,
    isNotEmptyString,
    isPositiveFiniteNumber,
    omitProperties,
    price,
    pricePromo,
    priceOptical,
    priceStrikethrough,
    priceAnnual,
    priceWithAnnual,
    pricePromoWithAnnual,
    discount,
    toBoolean,
    toEnumeration,
    toPositiveFiniteInteger,
};
