// Utilities copied from `@pandora/react-price` library
// https://git.corp.adobe.com/PandoraUI/commerce/tree/master/packages/react-price/src/js/utils/
//      price-util.ts
//      FormatStringHelpers.ts
import { Term, Commitment } from '@pandora/data-models-odm';
// import { RecurrenceTerm } from '@pandora/react-price';
import formatNumber from './numberFormat.js';

const DECIMAL_POINT = '.';
const DECIMAL_COMMA = ',';
const SPACE_START_PATTERN = /^\s+/;
const SPACE_END_PATTERN = /\s+$/;
const NBSP = '&nbsp;';

const getAnnualPrice = (price) => price * 12;

/**
 * Checks if a promotion is currently active.
 *
 * @param {Object} promotion - The promotion object.
 * @param {string} promotion.start - The start date of the promotion in ISO format.
 * @param {string} promotion.end - The end date of the promotion in ISO format.
 * @param {Object} promotion.displaySummary - The display summary of the promotion.
 * @param {number} promotion.displaySummary.amount - The amount of the promotion, (e.g: in percentage).
 * @param {number} promotion.displaySummary.duration - The duration of the promotion.
 * @param {number} promotion.displaySummary.minProductQuantity - The minimum product quantity for the promotion.
 * @param {string} promotion.displaySummary.outcomeType - The outcome type of the promotion.
 * @param {string} [instant] - An optional date string to use as the current date. If not provided, the current date is used.
 * @returns {boolean} - Returns true if the promotion is active, false otherwise.
 */
const isPromotionActive = (promotion, instant) => {
    const {
        start,
        end,
        displaySummary: { amount, duration, minProductQuantity, outcomeType } = {},
    } = promotion;
    if (!(amount && duration && outcomeType && minProductQuantity)) {
        return false;
    }
    const now = instant ? new Date(instant) : new Date();
    if (!start || !end) {
        return false;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    return now >= startDate && now <= endDate;
};

// TODO: @pandora/react-price does not have "module" field in package.json and is bundled entirely by Webpack
const RecurrenceTerm = {
    MONTH: 'MONTH',
    YEAR: 'YEAR',
};

/**
 * Number of months in each commitment term.
 * Used to calculate per-month price for a given term.
 */
const opticalPriceDivisors = {
    [Term.ANNUAL]: 12,
    [Term.MONTHLY]: 1,
    [Term.THREE_YEARS]: 36,
    [Term.TWO_YEARS]: 24,
};

/**
 * Creates and returns a rule for rounding optical prices based on price characteristics.
 * @param { ({ price: number, divisor: number, usePrecision: boolean }) => boolean } accept
 * A function returning true if this rule should be applied to the price being rounded.
 * @param { ({ price: number, divisor: number, usePrecision: boolean }) => number } round
 * A function applying the rule to the price.
 */
const opticalPriceRoundingRule = (accept, round) => ({ accept, round });

/**
 * List of rules for rounding optical prices.
 * The first rule accepting the price will round it.
 */
const opticalPriceRoundingRules = [
    opticalPriceRoundingRule(
        // optical price for the term is a multiple of the initial price
        ({ divisor, price }) => price % divisor == 0,
        ({ divisor, price }) => price / divisor,
    ),
    opticalPriceRoundingRule(
        // round optical price up to 2 decimals
        ({ usePrecision }) => usePrecision,
        ({ divisor, price }) => Math.round((price / divisor) * 100.0) / 100.0,
    ),
    opticalPriceRoundingRule(
        // round optical price up to integer
        () => true,
        ({ divisor, price }) =>
            Math.ceil(Math.floor((price * 100) / divisor) / 100),
    ),
];

const recurrenceTerms = {
    [Commitment.YEAR]: {
        [Term.MONTHLY]: RecurrenceTerm.MONTH,
        [Term.ANNUAL]: RecurrenceTerm.YEAR,
    },
    [Commitment.MONTH]: {
        [Term.MONTHLY]: RecurrenceTerm.MONTH,
    },
};

/**
 * @param { string} formatString
 * @param { string } currencySymbol
 */
export const currencyIsFirstChar = (formatString, currencySymbol) =>
    formatString.indexOf(`'${currencySymbol}'`) === 0;

// Below implementation assumes that general numberMask start with `#` and end with `0` and decimal parts are only using `0`s.
// The return result should always contain both integer and decimal delimiters.
/**
 * @param { string } formatString
 * @param { boolean } usePrecision
 * @returns { string }
 */
const extractNumberMask = (formatString, usePrecision = true) => {
    let numberMask = formatString.replace(/'.*?'/, '').trim();
    const decimalsDelimiter = findDecimalsDelimiter(numberMask);
    const hasDecimalDelimiter = !!decimalsDelimiter;

    if (!hasDecimalDelimiter) {
        // Append the decimal delimiter to the string format `#.*0`. `$&` means the matched regex string.
        // As the formatString could be container non-symbol like `A #,##0.00 B` so using regex here.
        numberMask = numberMask.replace(
            /\s?(#.*0)(?!\s)?/,
            '$&' + getPossibleDecimalsDelimiter(formatString),
        );
    } else if (!usePrecision) {
        // Trim the 0s after the decimalsDelimiter. `#,##0.00` will become `#,##0.`
        numberMask = numberMask.replace(/[,\.]0+/, decimalsDelimiter);
    }

    return numberMask;
};

/**
 * Extracts the currency symbol from the specified format string and returns the
 * currency symbol along with other values indicating how it is to be displayed
 * (for example, so that it can be inserted into markup correctly)
 * @param formatString The currency format string (for example, "'US$ '#,##0.00")
 * @returns { {
 *  currencySymbol: string;
 *  isCurrencyFirst: boolean;
 *  hasCurrencySpace: boolean;
 * } }
 */
const getCurrencySymbolDetails = (formatString) => {
    const currencySymbol = findCurrencySymbol(formatString);
    const isCurrencyFirst = currencyIsFirstChar(formatString, currencySymbol);
    const formatStringWithoutSymbol = formatString.replace(/'.*?'/, '');
    const hasCurrencySpace =
        SPACE_START_PATTERN.test(formatStringWithoutSymbol) ||
        SPACE_END_PATTERN.test(formatStringWithoutSymbol);
    return { currencySymbol, isCurrencyFirst, hasCurrencySpace };
};

/**
 * Converts the spaces around the text to non-breaking spaces.
 * @param {string} text
 * @returns {string}
 */
const makeSpacesAroundNonBreaking = (text) => {
    return text
        .replace(SPACE_START_PATTERN, NBSP)
        .replace(SPACE_END_PATTERN, NBSP);
};

// When there is one delimiter in the formatString, it would be considered as a decimal delimiter by the library 'number-format.js' used in the package.
// But Adobe system would expect that only delimiter (used between #) be integer delimiter.
// This method determines what should be the decimal delimiter by checking the only (integer) delimiter.
// It should be called when findDecimalsDelimiter function couldn't find out a decimal delimiter.
// Note: This is based on the assumption that integer delimiter is used between `#`.
/**
 * @param { string } formatString
 * @returns { string }
 */
const getPossibleDecimalsDelimiter = (formatString) =>
    formatString.match(/#(.?)#/)?.[1] === DECIMAL_POINT
        ? DECIMAL_COMMA
        : DECIMAL_POINT;

/**
 * @param { string } formatString
 * @returns { string }
 */
const findCurrencySymbol = (formatString) =>
    formatString.match(/'(.*?)'/)?.[1] ?? '';

// This is based on the assumption that decimal delimiter is used between `0`
/**
 * @param { string } formatString
 * @returns { string }
 */
const findDecimalsDelimiter = (formatString) =>
    formatString.match(/0(.?)0/)?.[1] ?? '';

// Utilities, specific to tacocat needs.

/**
 * Formats a price according to the specified format string and currency rules.
 *
 * @param {object} options - The formatting options
 * @param {string} options.formatString - The currency format string (e.g., "'US$ '#,##0.00")
 * @param {number} options.price - The price value to format
 * @param {boolean} options.usePrecision - Whether to include decimal precision in the formatted price
 * @param {boolean} [options.isIndianPrice=false] - Whether to use Indian locale-specific formatting
 * @param {string} recurrenceTerm - The recurrence term (MONTH or YEAR) for the price
 * @param {function} [transformPrice=(price) => price] - Optional function to transform the price before formatting
 * @returns {{
 *   accessiblePrice: string,
 *   currencySymbol: string,
 *   decimals: string,
 *   decimalsDelimiter: string,
 *   hasCurrencySpace: boolean,
 *   integer: string,
 *   isCurrencyFirst: boolean,
 *   recurrenceTerm: string
 * }} Formatted price object containing the accessible price string and formatting details
 *
 */
function formatPrice(
    { formatString, price, usePrecision, isIndianPrice = false },
    recurrenceTerm,
    transformPrice = (formattedPrice) => formattedPrice,
) {
    const { currencySymbol, isCurrencyFirst, hasCurrencySpace } =
        getCurrencySymbolDetails(formatString);
    const decimalsDelimiter = usePrecision
        ? findDecimalsDelimiter(formatString)
        : '';
    const numberMask = extractNumberMask(formatString, usePrecision);
    const fractionDigits = usePrecision ? 2 : 0;
    const transformedPrice = transformPrice(price, { currencySymbol });
    const formattedPrice = isIndianPrice
        ? transformedPrice.toLocaleString('hi-IN', {
              minimumFractionDigits: fractionDigits,
              maximumFractionDigits: fractionDigits,
          })
        : formatNumber(numberMask, transformedPrice);
    const decimalIndex = usePrecision
        ? formattedPrice.lastIndexOf(decimalsDelimiter)
        : formattedPrice.length;
    const integer = formattedPrice.substring(0, decimalIndex);
    const decimals = formattedPrice.substring(decimalIndex + 1);
    const accessiblePrice = formatString
        .replace(/'.*?'/, 'SYMBOL')
        .replace(/#.*0/, formattedPrice)
        .replace(/SYMBOL/, currencySymbol);
    return {
        accessiblePrice,
        currencySymbol,
        decimals,
        decimalsDelimiter,
        hasCurrencySpace,
        integer,
        isCurrencyFirst,
        recurrenceTerm,
    };
}

/**
 * Formats optical price (as if it was billed monthly).
 * @param { import('./types').PriceData } data
 */
const formatOpticalPrice = (data) => {
    const { commitment, term, usePrecision } = data;
    const divisor = opticalPriceDivisors[term] ?? 1;
    return formatPrice(
        data,
        divisor > 1
            ? RecurrenceTerm.MONTH
            : recurrenceTerms[commitment]?.[term],
        (price) => {
            const priceData = {
                divisor,
                price,
                usePrecision,
            };
            const { round } = opticalPriceRoundingRules.find(({ accept }) =>
                accept(priceData),
            );
            if (!round)
                throw new Error(
                    `Missing rounding rule for: ${JSON.stringify(priceData)}`,
                );
            return round(priceData);
        },
    );
};

/**
 * Formats regular price.
 * @param { import('./types').PriceData } data
 */
const formatRegularPrice = ({ commitment, term, ...data }) =>
    formatPrice(data, recurrenceTerms[commitment]?.[term]);

/**
 * Creates a function that calculates the annual price with promotion applied.
 *
 * @param {object} data - The data object containing price and priceWithoutDiscount
 * @returns {function(number): number} A function that takes a monthly price and returns the calculated annual price with promotion
 *
 */
const formatAnnualPrice = (data) => {
    const {
        commitment,
        instant,
        price,
        originalPrice,
        priceWithoutDiscount,
        promotion,
        quantity = 1,
        term,
    } = data;
    if (commitment === Commitment.YEAR && term === Term.MONTHLY) {
        if (!promotion) {
            return formatPrice(data, RecurrenceTerm.YEAR, getAnnualPrice);
        }
        const {
            displaySummary: { outcomeType, duration, minProductQuantity } = {},
        } = promotion;
        switch (outcomeType) {
            case 'PERCENTAGE_DISCOUNT': {
                if (
                    quantity >= minProductQuantity &&
                    isPromotionActive(promotion, instant)
                ) {
                    const durationInMonths = parseInt(
                        duration.replace('P', '').replace('M', ''),
                    );
                    if (isNaN(durationInMonths)) return getAnnualPrice(price);
                    const discountPrice =
                        quantity * originalPrice * durationInMonths;
                    const regularPrice =
                        quantity *
                        priceWithoutDiscount *
                        (12 - durationInMonths);
                    const totalPrice =
                        Math.floor((discountPrice + regularPrice) * 100) / 100;
                    return formatPrice(
                        { ...data, price: totalPrice },
                        recurrenceTerms[commitment]?.[term],
                    );
                }
            }
            default:
                return formatPrice(data, RecurrenceTerm.YEAR, () =>
                    getAnnualPrice(priceWithoutDiscount ?? price),
                );
        }
    }
    return formatPrice(data, recurrenceTerms[commitment]?.[term]);
};

export {
    formatOpticalPrice,
    formatRegularPrice,
    formatAnnualPrice,
    makeSpacesAroundNonBreaking,
    isPromotionActive,
};
