import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';

import './utils.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';

const shouldSkipTests = sessionStorage.getItem('skipTests') ?? false;

runTests(async () => {
    mockLana();
    await mockFetch(withWcs);
    await mas();
    if (shouldSkipTests !== 'true') {
        describe('plans-modal web component', () => {
            it('should fail', async () => {
                expect(true).to.equal(true);
            });
        });
    }
});
