import { delay } from '../../src/external.js';

const { adobeIMS } = window;

async function mockIms(countryCode) {
    window.adobeIMS = {
        initialized: true,
        isSignedInUser: () => !!countryCode,
        async getProfile() {
            await delay(1);
            return { countryCode };
        },
    };
}

function unmockIms() {
    window.adobeIMS = adobeIMS;
}

export { mockIms, unmockIms };
