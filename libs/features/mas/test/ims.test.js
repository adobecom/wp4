import { imsCountry, imsReady } from '../src/ims.js';

import { mockIms, unmockIms } from './mocks/ims.js';
import { expect, sinon } from './utilities.js';

describe('IMS module', () => {
    afterEach(() => {
        unmockIms();
    });

    it('resolves to undefined for anonymous user', async () => {
        await mockIms();
        expect(await imsCountry(Promise.resolve(false))).to.be.null;
    });

    it('resolves to country set in IMS user profile', async () => {
        await mockIms('CH');
        window.adobeIMS = {
            initialized: true,
            isSignedInUser: () => true,
            getProfile: () => Promise.resolve({ countryCode: 'CH' }),
        };
        expect(await imsCountry(Promise.resolve(true))).to.equal('CH');
    });

    it('resolves to undefined by timeout if IMS was not detected', async () => {
        const interval = 1;
        const maxAttempts = 3;
        const promise = imsReady({ interval, maxAttempts });

        const clock = sinon.useFakeTimers();
        let attempt = -1;

        while (++attempt < maxAttempts) {
            clock.tick(interval);
            clock.runAll();
        }
        clock.restore();

        expect(await promise).to.be.undefined;
    });
});
