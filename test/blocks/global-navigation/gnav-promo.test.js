/* eslint-disable no-restricted-syntax */
import { expect } from '@esm-bundle/chai';
import { createFullGlobalNavigation, unavVersion } from './test-utilities.js';
import { toFragment } from '../../../libs/blocks/global-navigation/utilities/utilities.js';

describe('Promo', () => {
  before(() => {
    document.head.innerHTML = `<link rel="icon" href="/libs/img/favicons/favicon.ico" size="any">
    <script src="https://auth.services.adobe.com/imslib/imslib.min.js" type="javascript/blocked" data-loaded="true"></script>
    <script src="https://stage.adobeccstatic.com/unav/${unavVersion}/UniversalNav.js" type="javascript/blocked" data-loaded="true"></script>
    `;
  });

  it('doesn\'t exist if metadata is not defined', async () => {
    const nav = await createFullGlobalNavigation();
    expect(nav.block.querySelector('.aside.promobar')).to.equal(null);
  });

  it('doesn\'t exist if metadata is not referencing a fragment', async () => {
    const wrongPromoMeta = toFragment`<meta name="gnav-promo-source" content="http://localhost:2000/path/to/promo">`;
    document.head.append(wrongPromoMeta);
    const nav = await createFullGlobalNavigation({ hasPromo: true, hasBreadcrumbs: false });
    expect(nav.block.classList.contains('has-promo')).to.be.false;
    expect(document.body.querySelector('.aside.promobar')).to.equal(null);
    wrongPromoMeta.remove();
  });

  it('doesn\'t exist if fragment doesn\'t contain an aside block', async () => {
    const promoMeta = toFragment`<meta name="gnav-promo-source" content="http://localhost:2000/fragments/wrong-promo-fragment">`;
    document.head.append(promoMeta);
    const nav = await createFullGlobalNavigation({ hasPromo: true, hasBreadcrumbs: false });
    expect(nav.block.classList.contains('has-promo')).to.be.false;
    expect(document.body.querySelector('.aside.promobar')).to.equal(null);
    promoMeta.remove();
  });

  it('is available if set up correctly', async () => {
    const promoMeta = toFragment`<meta name="gnav-promo-source" content="http://localhost:2000/fragments/correct-promo-fragment">`;
    document.head.append(promoMeta);
    const nav = await createFullGlobalNavigation({
      hasPromo: true,
      imsInitialized: true,
      hasBreadcrumbs: false,
    });
    expect(nav.block.classList.contains('has-promo')).to.be.true;
    const asideElem = document.body.querySelector('.aside.promobar');
    expect(asideElem).to.exist;
    expect(asideElem.getAttribute('daa-lh')).to.equal('Promo');
    asideElem.querySelectorAll('a').forEach((linkElem) => {
      expect(linkElem.hasAttribute('daa-ll')).to.be.true;
    });
    promoMeta.remove();
  });
});
