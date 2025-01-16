import {
    CheckoutWorkflow,
    CheckoutWorkflowStep,
    Env,
} from './external.js';
import { Landscape } from './constants.js';

export const Defaults = Object.freeze({
    checkoutClientId: 'adobe_com',
    checkoutWorkflow: CheckoutWorkflow.V3,
    checkoutWorkflowStep: CheckoutWorkflowStep.EMAIL,
    country: 'US',
    displayOldPrice: true,
    displayPerUnit: false,
    displayRecurrence: true,
    displayTax: false,
    env: Env.PRODUCTION,
    forceTaxExclusive: false,
    language: 'en',
    entitlement: false,
    extraOptions: {},
    modal: false,
    promotionCode: '',
    quantity: 1,
    wcsApiKey: 'wcms-commerce-ims-ro-user-milo',
    wcsBufferDelay: 1,
    wcsURL: 'https://www.adobe.com/web_commerce_artifact',
    landscape: Landscape.PUBLISHED,
    wcsBufferLimit: 1,
});
