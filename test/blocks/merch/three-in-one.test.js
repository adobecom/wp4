import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { setConfig } from '../../../libs/utils/utils.js';
import openThreeInOneModal, { createContent, handle3in1IFrameEvents, LANA_OPTIONS, MSG_SUBTYPE } from '../../../libs/blocks/merch/threeInOne.js';

document.body.innerHTML = await readFile({ path: './mocks/threeInOne.html' });

const config = {
  codeRoot: '/libs',
  env: { name: 'prod' },
};

describe('Three-in-one modal', () => {
  before(async () => {
    setConfig(config);
  });

  it('should return undefined if no href or modal type', async () => {
    const checkoutLinkWithoutHref = document.querySelector('#no-href');
    const checkoutLinkWithoutModalType = document.querySelector('#no-modal-type');
    expect(await openThreeInOneModal(checkoutLinkWithoutHref)).to.be.undefined;
    expect(await openThreeInOneModal(checkoutLinkWithoutModalType)).to.be.undefined;
  });

  it('should open a modal with iframe', async () => {
    const twpLink = document.querySelector('#twp-link');
    const modal = await openThreeInOneModal(twpLink);
    expect(modal).to.exist;
    expect(modal.getAttribute('id')).to.equal('three-in-one');
    expect(modal.classList.contains('three-in-one')).to.be.true;
    const iframe = modal.querySelector('iframe');
    expect(iframe).to.exist;
    expect(iframe.src).to.equal('https://commerce.adobe.com/store/segmentation?ms=COM&ot=TRIAL&pa=phsp_direct_individual&cli=adobe_com&ctx=if&co=US&lang=en');
    const loader = modal.querySelector('sp-progress-circle');
    expect(loader).to.exist;
  });
});
