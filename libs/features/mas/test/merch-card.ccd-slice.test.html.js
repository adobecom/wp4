// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';

import './spectrum.js';

import { mockIms } from './mocks/ims.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';

const skipTests = sessionStorage.getItem('skipTests');

runTests(async () => {
    mockIms();
    mockLana();
    await mockFetch(withWcs);
    await mas();
    
    describe('merch-card web component', () => {
      it('should exist in the HTML document', async () => {
          expect(document.querySelector('merch-card[variant="ccd-slice"]')).to.exist;
      });

      it('should have correct attributes for the ccd-slice wide card', async () => {
          const ccdSliceWideCard = document.querySelector('merch-card[variant="ccd-slice"][size="wide"]');
          expect(ccdSliceWideCard.getAttribute('variant')).to.equal('ccd-slice');
          expect(ccdSliceWideCard.getAttribute('size')).to.equal('wide');
      });

      it('should render badge', async () => {
        const card = document.querySelector('merch-card#withBadge');
        const badge = card.shadowRoot?.querySelector('div#badge');
        expect(badge).to.exist;
        expect(badge.innerText).to.equal('Huge Savings');
        expect(badge.style?.backgroundColor).to.equal('rgb(248, 217, 4)');

        // should not change card border to badge colour
        expect(card.style?.border).to.equal('');
      });
    });

});
