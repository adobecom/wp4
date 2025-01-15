import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import processQL from '../../../libs/features/branch-quick-links/branch-quick-links.js';

describe('branch quick links', () => {
  beforeEach(async () => {
    window.adobePrivacy = {
      hasUserProvidedConsent: () => true,
      activeCookieGroups: () => ['C0002', 'C0004'],
    };
    document.head.innerHTML = await readFile({ path: '../../../test/utils/mocks/head.html' });
    document.body.innerHTML = await readFile({ path: '../../../test/utils/mocks/body.html' });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should add a class to the quick link', async () => {
    window.alloy = new Promise(() => {});
    const alloyS = sinon.stub(window, 'alloy');
    alloyS.resolves({ identity: { ECID: '123' } });
    const qL = document.querySelector('a');
    processQL(qL);
    await qL.click();
    window.dispatchEvent(new CustomEvent('adobePrivacy:PrivacyConsent'));
    window.dispatchEvent(new CustomEvent('adobePrivacy:PrivacyCustom'));
    window.dispatchEvent(new CustomEvent('adobePrivacy:PrivacyReject'));
    expect(qL.classList.contains('quick-link')).to.be.true;
    alloyS.restore();
  });

  it('should not add ecid if alloy is undefined', async () => {
    window.alloy = undefined;
    const qL = document.querySelector('a');
    processQL(qL);
    qL.click();
    expect(qL.href.includes('ecid')).to.be.false;
  });
});
