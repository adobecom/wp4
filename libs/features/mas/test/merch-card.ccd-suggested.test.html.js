// @ts-nocheck
import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';

import { mockLana } from './mocks/lana.js';
import { mockFetch } from './mocks/fetch.js';

import './spectrum.js';
import '../src/merch-offer.js';
import '../src/merch-offer-select.js';
import '../src/merch-quantity-select.js';

import { mockIms } from './mocks/ims.js';
import { withWcs } from './mocks/wcs.js';
import mas from './mas.js';


runTests(async () => {
    mockIms();
    mockLana();
    await mockFetch(withWcs);
    await mas();
    
    describe('merch-card web component', () => {
      it('should exist in the HTML document', async () => {
          expect(document.querySelector('merch-card[variant="ccd-suggested"]')).to.exist;
      });
  
      it('should have strip with size wide for the ccd-suggested wide card', async () => {
          const ccdSliceWideCard = document.querySelector('merch-card[variant="ccd-suggested"][background-image]');
          expect(ccdSliceWideCard.getAttribute('variant')).to.equal('ccd-suggested');
          expect(ccdSliceWideCard.getAttribute('background-image')).to.exist;
          expect(ccdSliceWideCard.className).to.equal('');

      });

     it('should have dark theme', async () => {
      const ccdSliceDarkCard = document.querySelector('merch-card[variant="ccd-suggested"].dark-theme');
      const theme = ccdSliceDarkCard.theme.color;
      expect(theme).to.equal('dark');
   });
    });

});
