import { expect } from '@esm-bundle/chai';
import { getFederatedUrl, getFederatedContentRoot } from '../../libs/utils/federated.js';

const baseHost = 'https://main--federal--adobecom.aem.page';

describe('Federated navigation utilities', () => {
  describe('getFederatedContentRoot', () => {
    it('should return the federated content root', () => {
      expect(getFederatedContentRoot('https://adobe.com/federel/footer')).to.equal(baseHost);
    });
  });

  describe('getFederatedUrl', () => {
    it('should return the url if its not federated', () => {
      expect(getFederatedUrl('https://adobe.com/foo-fragment.html')).to.equal('https://adobe.com/foo-fragment.html');

      expect(getFederatedUrl('/foo-fragment.html')).to.equal('/foo-fragment.html');

      expect(getFederatedUrl('/lu_de/foo-fragment.html')).to.equal(
        '/lu_de/foo-fragment.html',
      );
    });

    it('should return the federated url', () => {
      expect(getFederatedUrl('https://adobe.com/federal/foo-fragment.html')).to.equal(`${baseHost}/federal/foo-fragment.html`);
      expect(
        getFederatedUrl('https://adobe.com/lu_de/federal/gnav/foofooter.html'),
      ).to.equal(`${baseHost}/lu_de/federal/gnav/foofooter.html`);
    });

    it('should return the federated url for a relative link', () => {
      expect(getFederatedUrl('/federal/foo-fragment.html')).to.equal(
        `${baseHost}/federal/foo-fragment.html`,
      );
    });

    it('should return the federated url for a relative link including hashes and search params', () => {
      expect(
        getFederatedUrl('/federal/foo-fragment.html?foo=bar#test'),
      ).to.equal(`${baseHost}/federal/foo-fragment.html?foo=bar#test`);
    });

    it('should return the url for invalid urls', () => {
      expect(getFederatedUrl('en-US/federal/')).to.equal('en-US/federal/');
      expect(getFederatedUrl(null)).to.equal(null);
      expect(getFederatedUrl(123121)).to.equal(123121);
    });
  });
});
