import { Defaults } from './defaults.js';
import { equalsCaseInsensitive } from './external.js';

/**
 * Method resolves price literals for the given language from the group of price literals.
 * That group is either imported from json file or it is received as a parameter (in case of unit tests).
 *
 * @param settings
 * @param priceLiterals
 */
export async function getPriceLiterals(settings, priceLiterals) {
    //we are expecting an array of objects with lang and literals
    const { data } = priceLiterals ? priceLiterals : await import('../price-literals.json');
    if (Array.isArray(data)) {
        const find = (language) =>
            data.find((candidate) =>
                equalsCaseInsensitive(candidate.lang, language),
            );
        const literals = find(settings.language) ?? find(Defaults.language);
        if (literals) return Object.freeze(literals);
    }
    return {};
}
