import { Catalog } from './catalog.js';
import { Image } from './image.js';
import { InlineHeading } from './inline-heading.js';
import { MiniCompareChart } from './mini-compare-chart.js';
import { Plans } from './plans.js';
import { Product } from './product.js';
import { Segment } from './segment.js';
import { SpecialOffer } from './special-offer.js';
import { TWP } from './twp.js';
import { CCDSuggested } from './ccd-suggested.js';
import { CCDSlice } from './ccd-slice.js';

const getVariantLayout = (card, mustMatch = false) => {
    switch (card.variant) {
        case 'catalog':
            return new Catalog(card);
        case 'image':
            return new Image(card);
        case 'inline-heading':
            return new InlineHeading(card);
        case 'mini-compare-chart':
            return new MiniCompareChart(card);
        case 'plans':
            return new Plans(card);
        case 'product':
            return new Product(card);
        case 'segment':
            return new Segment(card);
        case 'special-offers':
            return new SpecialOffer(card);
        case 'twp':
            return new TWP(card);
        case 'ccd-suggested':
              return new CCDSuggested(card);
        case 'ccd-slice':
            return new CCDSlice(card);
        default:
            return mustMatch ? undefined : new Product(card);
    }
};

const getVariantStyles = () => {
    const styles = [];
    styles.push(Catalog.variantStyle);
    styles.push(MiniCompareChart.variantStyle);
    styles.push(Product.variantStyle);
    styles.push(Plans.variantStyle);
    styles.push(Segment.variantStyle);
    styles.push(SpecialOffer.variantStyle);
    styles.push(TWP.variantStyle);
    styles.push(CCDSuggested.variantStyle);
    styles.push(CCDSlice.variantStyle);
    return styles;
};

export { getVariantLayout, getVariantStyles };
