import {
    createPriceTemplate,
    createPromoPriceTemplate,
    createPriceWithAnnualTemplate,
    createPromoPriceWithAnnualTemplate,
} from './template.js';

const price = createPriceTemplate();
const pricePromo = createPromoPriceTemplate();
const priceOptical = createPriceTemplate({
    displayOptical: true,
});
const priceStrikethrough = createPriceTemplate({
    displayStrikethrough: true,
});
const priceAnnual = createPriceTemplate({
    displayAnnual: true,
});
const priceWithAnnual = createPriceWithAnnualTemplate();
const pricePromoWithAnnual = createPromoPriceWithAnnualTemplate();

export {
    price,
    pricePromo,
    priceOptical,
    priceStrikethrough,
    priceAnnual,
    priceWithAnnual,
    pricePromoWithAnnual,
};
