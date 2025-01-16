import { Defaults } from '../src/defaults.js';
import { Wcs } from '../src/wcs.js';

import { mockFetch } from './mocks/fetch.js';
import { withWcs } from './mocks/wcs.js';
import { expect } from './utilities.js';

describe('resolveOfferSelectors', () => {
    it('falls into fetch-by-one strategy if Wcs responds with 404 to a multi-osi request', async () => {
        await mockFetch(withWcs);
        const client = Wcs({
            settings: {
                ...Defaults,
                locale: 'en_US',
                wcsBufferLimit: 4,
            },
        });
        const results = await Promise.allSettled(
            client.resolveOfferSelectors({
                wcsOsi: ['abm', 'no-offer', 'stock-abm', 'void'],
            }),
        );
        expect(results[0].status).to.equal('fulfilled');
        expect(results[1].status).to.equal('rejected');
        expect(results[1].reason.message).to.equal('Commerce offer not found: 404, url: https://www.adobe.com/web_commerce_artifact?offer_selector_ids=abm%2Cno-offer%2Cstock-abm%2Cvoid&country=undefined&locale=undefined_undefined&landscape=PUBLISHED&api_key=wcms-commerce-ims-ro-user-milo&language=MULT');
        expect(results[2].status).to.equal('fulfilled');
        expect(results[3].status).to.equal('rejected');
        expect(results[3].reason.message).to.equal('Commerce offer not found: 404, url: https://www.adobe.com/web_commerce_artifact?offer_selector_ids=abm%2Cno-offer%2Cstock-abm%2Cvoid&country=undefined&locale=undefined_undefined&landscape=PUBLISHED&api_key=wcms-commerce-ims-ro-user-milo&language=MULT');
    });

    it('groups WCS requests by promotion code', async () => {
        await mockFetch(withWcs);
        const client = Wcs({
            settings: {
                ...Defaults,
                locale: 'en_US',
                wcsBufferLimit: 2,
            },
        });
        await Promise.allSettled([
            ...client.resolveOfferSelectors({
                wcsOsi: ['abm', 'm2m'],
            }),
            ...client.resolveOfferSelectors({
                wcsOsi: ['abm', 'm2m'],
            }),
        ]);
        expect(fetch.callCount).to.equal(1);
        await Promise.allSettled([
            ...client.resolveOfferSelectors({
                wcsOsi: ['abm-promo', 'm2m-promo'],
                promotionCode: 'promo1',
            }),
            ...client.resolveOfferSelectors({
                wcsOsi: ['abm-promo', 'm2m-promo'],
                promotionCode: 'promo2',
            }),
        ]);
        expect(fetch.callCount).to.equal(3);
    });

    it('flushes WCS cache', async () => {
        await mockFetch(withWcs);
        const client = Wcs({
            settings: {
                ...Defaults,
                locale: 'en_US',
            },
        });
        await client.resolveOfferSelectors({ wcsOsi: ['abm'] });
        await client.resolveOfferSelectors({ wcsOsi: ['abm'] });
        expect(fetch.callCount).to.equal(1);
        await client.flushWcsCache();
        await client.resolveOfferSelectors({ wcsOsi: ['abm'] });
        expect(fetch.callCount).to.equal(2);
    });
});
