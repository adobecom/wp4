import { Log } from './log.js';

export function imsReady({ interval = 200, maxAttempts = 25 } = {}) {
    const log = Log.module('ims');
    return new Promise((resolve) => {
        log.debug('Waing for IMS to be ready');
        let count = 0;
        /* c8 ignore next 10 */
        function poll() {
            if (window.adobeIMS?.initialized) {
                resolve();
            } else if (++count > maxAttempts) {
                log.debug('Timeout');
                resolve();
            } else {
                setTimeout(poll, interval);
            }
        }
        poll();
    });
}

export function imsSignedIn(imsReadyPromise) {
    return imsReadyPromise.then(
        () => window.adobeIMS?.isSignedInUser() ?? false,
    );
}

export function imsCountry(imsSignedInPromise) {
    const log = Log.module('ims');
    return imsSignedInPromise.then((signedIn) => {
        if (!signedIn) return null;
        return window.adobeIMS.getProfile().then(
            ({ countryCode }) => {
                log.debug('Got user country:', countryCode);
                return countryCode;
            },
            (error) => {
                /* c8 ignore next 2 */
                log.error('Unable to get user country:', error);
                return undefined;
            },
        );
    });
}

export function Ims({}) {
    const imsReadyPromise = imsReady();
    const imsSignedInPromise = imsSignedIn(imsReadyPromise);
    const imsCountryPromise = imsCountry(imsSignedInPromise);
    return { imsReadyPromise, imsSignedInPromise, imsCountryPromise };
}
