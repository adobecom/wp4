// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from '/test/mocks/lana.js';
import { mockFetch } from '/test/mocks/fetch.js';
import mas from './mas.js';

import '../src/merch-mnemonic-list.js';
import '../src/merch-whats-included.js';

import { appendMiloStyles } from './utils.js';
import { mockIms } from './mocks/ims.js';

const skipTests = sessionStorage.getItem('skipTests');

runTests(async () => {
    mockIms();
    mockLana();
    await mockFetch();
    await mas();
    if (skipTests !== null) {
        appendMiloStyles();
        return;
    }
    describe('merch whats included web component', () => {
        it('should exist in the HTML document', async () => {
            expect(document.querySelector('merch-whats-included')).to.exist;
        });
        it('should display merch mnemonic list', async () => {
            expect(document.querySelector('merch-mnemonic-list')).to.exist;
        });
    });
});
