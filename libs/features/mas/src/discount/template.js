import { isPositiveFiniteNumber } from '@dexter/tacocat-core';

const getDiscount = (price, priceWithoutDiscount) => {
    if (
        !isPositiveFiniteNumber(price) ||
        !isPositiveFiniteNumber(priceWithoutDiscount)
    )
        return;
    return Math.floor(
        ((priceWithoutDiscount - price) / priceWithoutDiscount) * 100,
    );
};

/**
 * Renders the discount markup
 * @param {PriceContext & PromoPriceContext} context
 * @param {PriceData} value
 * @param {PriceAttributes} attributes
 !* @returns {string} the discount markup
 !*/
const createDiscountTemplate = () => (context, value) => {
    const { price, priceWithoutDiscount } = value;
    const discount = getDiscount(price, priceWithoutDiscount);
    return discount === undefined
        ? `<span class="no-discount"></span>`
        : `<span class="discount">${discount}%</span>`;
};

export { getDiscount, createDiscountTemplate };
