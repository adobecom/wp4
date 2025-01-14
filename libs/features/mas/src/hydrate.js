import { createTag } from './utils.js';

const DEFAULT_BADGE_COLOR = '#000000';
const DEFAULT_BADGE_BACKGROUND_COLOR = '#F8D904';
const CHECKOUT_LINK_STYLE_PATTERN =
    /(accent|primary|secondary)(-(outline|link))?/;
export const ANALYTICS_TAG = 'mas:product_code/';
export const ANALYTICS_LINK_ATTR = 'daa-ll';
export const ANALYTICS_SECTION_ATTR = 'daa-lh';
const SPECTRUM_BUTTON_SIZES = ['XL', 'L', 'M', 'S'];

export function processMnemonics(fields, merchCard, mnemonicsConfig) {
    const mnemonics = fields.mnemonicIcon?.map((icon, index) => ({
        icon,
        alt: fields.mnemonicAlt[index] ?? '',
        link: fields.mnemonicLink[index] ?? '',
    }));

    mnemonics?.forEach(({ icon: src, alt, link: href }) => {
        if (href && !/^https?:/.test(href)) {
            try {
                href = new URL(`https://${href}`).href.toString();
            } catch (e) {
                /* c8 ignore next 2 */
                href = '#';
            }
        }

        const attrs = {
            slot: 'icons',
            src,
            size: mnemonicsConfig?.size ?? 'l',
        };
        if (alt) attrs.alt = alt;
        if (href) attrs.href = href;
        const merchIcon = createTag('merch-icon', attrs);
        merchCard.append(merchIcon);
    });
}

function processBadge(fields, merchCard) {
    if (fields.badge) {
        merchCard.setAttribute('badge-text', fields.badge);
        merchCard.setAttribute(
            'badge-color',
            fields.badgeColor || DEFAULT_BADGE_COLOR,
        );
        merchCard.setAttribute(
            'badge-background-color',
            fields.badgeBackgroundColor || DEFAULT_BADGE_BACKGROUND_COLOR,
        );
    }
}

export function processSize(fields, merchCard, allowedSizes) {
    if (allowedSizes?.includes(fields.size)) {
        merchCard.setAttribute('size', fields.size);
    }
}

export function processTitle(fields, merchCard, titleConfig) {
    if (fields.cardTitle && titleConfig) {
        merchCard.append(
            createTag(
                titleConfig.tag,
                { slot: titleConfig.slot },
                fields.cardTitle,
            ),
        );
    }
}

export function processSubtitle(fields, merchCard, subtitleConfig) {
    if (fields.subtitle && subtitleConfig) {
        merchCard.append(
            createTag(
                subtitleConfig.tag,
                { slot: subtitleConfig.slot },
                fields.subtitle,
            ),
        );
    }
}

export function processBackgroundImage(
    fields,
    merchCard,
    backgroundImageConfig,
) {
    if (backgroundImageConfig?.tag && fields.backgroundImage) { 
        const imgAttributes = {
            loading: 'lazy',
            src: fields.backgroundImage,
        };
        if (fields.backgroundImageAltText) {
            imgAttributes.alt = fields.backgroundImageAltText;
        } else {
            imgAttributes.role = 'none';
        }
        merchCard.append(
            createTag(
                backgroundImageConfig.tag,
                { slot: backgroundImageConfig.slot },
                createTag('img', imgAttributes),
            ),
        );
    }
    if (backgroundImageConfig?.attribute) {
        merchCard.setAttribute(backgroundImageConfig.attribute, fields.backgroundImage);
    }
}

export function processPrices(fields, merchCard, pricesConfig) {
    if (fields.prices && pricesConfig) {
        const headingM = createTag(
            pricesConfig.tag,
            { slot: pricesConfig.slot },
            fields.prices,
        );
        merchCard.append(headingM);
    }
}

function processDescription(fields, merchCard, descriptionConfig) {
    if (fields.description && descriptionConfig) {
        const body = createTag(
            descriptionConfig.tag,
            { slot: descriptionConfig.slot },
            fields.description,
        );
        merchCard.append(body);
    }
}

function createSpectrumCssButton(cta, aemFragmentMapping, isOutline, variant) {
    const size = aemFragmentMapping.ctas.size ?? 'M';
    const variantClass = `spectrum-Button--${variant}`;
    const treatmentClass = isOutline ? ' spectrum-Button--outline' : '';
    cta.classList.add('spectrum-Button-label');
    const sizeClass = SPECTRUM_BUTTON_SIZES.includes(size)
        ? ` spectrum-Button--size${size}`
        : ' spectrum-Button--sizeM';
    const spectrumClass = `spectrum-Button ${variantClass}${treatmentClass}${sizeClass}`;
    const spectrumCta = createTag(
        'button',
        {
            class: spectrumClass,
            tabIndex: 0,
        },
        cta,
    );

    spectrumCta.addEventListener('click', (e) => {
        if (e.target !== cta) {
            /* c8 ignore next 3 */
            e.stopPropagation();
            cta.click();
        }
    });

    return spectrumCta;
}

function createSpectrumSwcButton(cta, aemFragmentMapping, isOutline, variant) {
    let treatment = 'fill';

    if (isOutline) {
        treatment = 'outline';
    }
    const spectrumCta = createTag(
        'sp-button',
        {
            treatment,
            variant,
            tabIndex: 0,
            size: aemFragmentMapping.ctas.size ?? 'm',
        },
        cta,
    );

    spectrumCta.addEventListener('click', (e) => {
        if (e.target !== cta) {
            /* c8 ignore next 3 */
            e.stopPropagation();
            cta.click();
        }
    });

    return spectrumCta;
}

function processConsonantButton(cta, strong) {
    cta.classList.add('con-button');
    if (strong) {
        cta.classList.add('blue');
    }
    return cta;
}

export function processCTAs(fields, merchCard, aemFragmentMapping, variant) {
    if (fields.ctas) {
        const { slot } = aemFragmentMapping.ctas;
        const footer = createTag('div', { slot }, fields.ctas);

        const ctas = [...footer.querySelectorAll('a')].map((cta) => {
            const strong = cta.parentElement.tagName === 'STRONG';
            if (merchCard.consonant) return processConsonantButton(cta, strong);
            const checkoutLinkStyle =
                CHECKOUT_LINK_STYLE_PATTERN.exec(cta.className)?.[0] ??
                'accent';
            const isAccent = checkoutLinkStyle.includes('accent');
            const isPrimary = checkoutLinkStyle.includes('primary');
            const isSecondary = checkoutLinkStyle.includes('secondary');
            const isOutline = checkoutLinkStyle.includes('-outline');
            const isLink = checkoutLinkStyle.includes('-link');
            if (isLink) {
                return cta;
            }
            let variant;
            if (isAccent || strong) {
                variant = 'accent';
            } else if (isPrimary) {
                variant = 'primary';
            } else if (isSecondary) {
                variant = 'secondary';
            }
            cta.tabIndex = -1;
            if (merchCard.spectrum === 'swc')
                return createSpectrumSwcButton(
                    cta,
                    aemFragmentMapping,
                    isOutline,
                    variant,
                );
            return createSpectrumCssButton(
                cta,
                aemFragmentMapping,
                isOutline,
                variant,
            );
        });

        footer.innerHTML = '';
        footer.append(...ctas);
        merchCard.append(footer);
    }
}

export function processAnalytics(fields, merchCard) {
    const { tags } = fields;
    const cardAnalyticsId = tags
        ?.find((tag) => tag.startsWith(ANALYTICS_TAG))
        ?.split('/')
        .pop();
    if (!cardAnalyticsId) return;
    merchCard.setAttribute(ANALYTICS_SECTION_ATTR, cardAnalyticsId);
    merchCard
        .querySelectorAll(`a[data-analytics-id]`)
        .forEach((link, index) => {
            link.setAttribute(
                ANALYTICS_LINK_ATTR,
                `${link.dataset.analyticsId}-${index + 1}`,
            );
        });
}

function updateLinks(merchCard) {
    [
        ['primary-link', 'primary'],
        ['secondary-link', 'secondary'],
    ].forEach(([className, variant]) => {
        merchCard.querySelectorAll(`a.${className}`).forEach((link) => {
            link.classList.remove(className);
            link.classList.add('spectrum-Link', `spectrum-Link--${variant}`);
        });
    });
}

export async function hydrate(fragment, merchCard) {
    const { fields } = fragment;
    const { variant } = fields;
    if (!variant) return;
    merchCard.id = fragment.id;
    // remove all previous slotted content except the default slot
    merchCard.querySelectorAll('[slot]').forEach((el) => {
        el.remove();
    });

    merchCard.removeAttribute('background-image');
    merchCard.removeAttribute('badge-background-color');
    merchCard.removeAttribute('badge-color');
    merchCard.removeAttribute('badge-text');
    merchCard.removeAttribute('size');
    merchCard.classList.remove('wide-strip');
    merchCard.classList.remove('thin-strip');
    merchCard.removeAttribute(ANALYTICS_SECTION_ATTR);

    merchCard.variant = variant;
    await merchCard.updateComplete;

    const { aemFragmentMapping } = merchCard.variantLayout;
    if (!aemFragmentMapping) return;

    processMnemonics(fields, merchCard, aemFragmentMapping.mnemonics);
    processBadge(fields, merchCard);
    processSize(fields, merchCard, aemFragmentMapping.allowedSizes);
    processTitle(fields, merchCard, aemFragmentMapping.title);
    processSubtitle(fields, merchCard, aemFragmentMapping.subtitle);
    processPrices(fields, merchCard, aemFragmentMapping.prices);
    processBackgroundImage(
        fields,
        merchCard,
        aemFragmentMapping.backgroundImage,
        variant,
    );
    processDescription(fields, merchCard, aemFragmentMapping.description);
    processCTAs(fields, merchCard, aemFragmentMapping, variant);
    processAnalytics(fields, merchCard);
    updateLinks(merchCard);
}
