export async function withWcs(originalFetch) {
    const offers = JSON.parse(
        await originalFetch('/test/mocks/offers.json').then((r) => r.text()),
    );
    return async ({ pathname, searchParams }) => {
        // mock Wcs responses
        if (pathname.endsWith('/web_commerce_artifact')) {
            const language = searchParams.get('language').toLowerCase();
            const buckets = searchParams
                .get('offer_selector_ids')
                .split(',')
                .map((osi) =>
                    offers[`${osi}-${language}`]?.map((offer) => ({
                        ...offer,
                        offerSelectorIds: [osi],
                    })),
                );

            // 404 if any of requested osis does not exist
            if (buckets.some((bucket) => bucket == null)) {
                return Promise.resolve({
                    ok: false,
                    status: 404,
                    json: async () => new Error(),
                    text: async () => 'Some osis were not found',
                });
            }

            // 200, all osis were found
            return Promise.resolve({
                ok: true,
                status: 200,
                json: async () => ({
                    resolvedOffers: buckets.flatMap((array) => array ?? []),
                }),
                text: async () => 'Unexpected error',
            });
        }
        return false;
    };
}
