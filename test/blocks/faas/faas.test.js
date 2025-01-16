import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { waitForElement } from '../../helpers/waitfor.js';
import { setConfig } from '../../../libs/utils/utils.js';
import { getModal } from '../../../libs/blocks/modal/modal.js';

const config = {
  imsClientId: 'milo',
  codeRoot: '/libs',
  locales: { '': { ietf: 'en-US', tk: 'hah7vzn.css' } },
  faasCloseModalAfterSubmit: 'on',
};
setConfig(config);

const { afterSubmitCallback } = await import('../../../libs/blocks/faas/utils.js');
document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init } = await import('../../../libs/blocks/faas/faas.js');

describe('Faas', () => {
  beforeEach(() => {
    sinon.spy(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  const a = document.querySelector('a');

  it('FaaS Initiation', async () => {
    await init(a);
    const faas = await waitForElement('.faas-form-wrapper');
    expect(faas).to.exist;
  });

  a.textContent = 'no-lazy';
  it('FaaS no-lazy Initiation', async () => {
    await init(a);
    const faas = await waitForElement('.faas-form-wrapper');
    expect(faas).to.exist;
  });

  it('FaaS closes dialog if config set', async () => {
    const dialogModal = await getModal(null, { id: 'dialog-modal', closeEvent: 'close', content: a });
    await init(a);
    await waitForElement('.dialog-modal .faas-form-wrapper');
    const closeBtn = dialogModal.querySelector('.dialog-close');
    const closeClickSpy = sinon.spy(closeBtn, 'click');
    afterSubmitCallback({ success: true });
    const overlay = await waitForElement('.faas-form-confirm-overlay');

    expect(overlay).to.exist;
    expect(overlay.querySelector('img.checkmark-green')).to.exist;

    // Simulate animationend
    const checkIcon = overlay.querySelector('img.checkmark-green');
    const animationEndEvent = new Event('animationend');
    const awaitAnimationEnd = new Promise((resolve) => {
      checkIcon.addEventListener('animationend', () => {
        resolve();
      });
    });

    checkIcon.dispatchEvent(animationEndEvent);

    await awaitAnimationEnd;
    expect(closeClickSpy.calledOnce).to.be.true;
  });
});
