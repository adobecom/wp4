export const CSS = `
    merch-card[variant="ah-pricing-widget"] [slot="heading-xxxs"] {
        letter-spacing: normal;
        font-size: 12px;
        line-height: 18px;
        color: var(--merch-card-ah-pricing-widget-text-color);
    }

    merch-card[variant="ah-pricing-widget"] [slot="body-xxs"] {
        letter-spacing: normal;
        max-height: 54px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        display: -moz-box;
        -moz-box-orient: vertical;
        line-clamp: 3;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 12px;
        box-sizing: border-box;
        color: var(--merch-card-ah-pricing-widget-text-color);
    }

    merch-card[variant="ah-pricing-widget"] [slot="price"] a {
        color: var(--merch-card-ah-pricing-widget-text-color);
    }


    merch-card[variant="ah-pricing-widget"] [slot="price"] span[is="inline-price"] {
        font-size: 14px;
        line-height: 18px;
    }
`;
