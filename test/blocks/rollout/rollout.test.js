import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import sinon from 'sinon';

const { default: init } = await import('../../../libs/blocks/rollout/rollout.js');

document.body.innerHTML = await readFile({ path: './mocks/body.html' });

const createTestParams = (
  referrer = 'https://main--bacom--adobecom.hlx.page/langstore/de/customer-success',
  host = 'milo.adobe.com',
  project = 'Milo',
) => {
  const searchParams = new URLSearchParams();
  searchParams.append('referrer', referrer);
  searchParams.append('host', host);
  searchParams.append('project', project);
  return searchParams;
};

describe('Rollout', () => {
  it('should initialize with valid preview URL', async () => {
    const el = document.querySelector('div');
    const searchParams = createTestParams();
    const result = await init(el, `?${searchParams.toString()}`);
    expect(result).to.be.true;
    expect(el.querySelector('.modal')).to.exist;
    expect(el.querySelector('.radio-group')).to.exist;
    expect(el.querySelector('.rollout-btn')).to.exist;
  });

  it('should show error for invalid URL format', async () => {
    const el = document.querySelector('div');
    const searchParams = createTestParams('invalid-url');
    const result = await init(el, `?${searchParams.toString()}`);
    expect(result).to.be.false;
    expect(el.innerHTML).to.equal('<div class="modal warning"><div class="warning-icon"></div><div class="warning-text">This page is not eligible for rollout<br><span class="warning-text-sub">Only pages under /langstore/ are eligible for rollout</span></div></div>');
  });

  it('should detect language code correctly', async () => {
    const el = document.querySelector('div');
    const searchParams = createTestParams();
    const windowOpenStub = sinon.stub(window, 'open');

    const result = await init(el, `?${searchParams.toString()}`);
    expect(result).to.be.true;

    // Trigger rollout button click
    const rolloutBtn = el.querySelector('.rollout-btn');
    rolloutBtn.click();

    expect(windowOpenStub.called).to.be.true;

    const lastUrl = new URL(windowOpenStub.firstCall.args[0]);
    expect(lastUrl.searchParams.get('language')).to.equal('de'); // Changed to 'de' since test URL has /de/

    // Restore original window.open
    windowOpenStub.restore();
  });

  it('should handle failed initialization gracefully', async () => {
    const el = null; // Force an error
    const result = await init(el);
    expect(result).to.be.false;
  });

  it('should handle missing required parameters', async () => {
    const el = document.querySelector('div');
    const searchParams = createTestParams('');
    const result = await init(el, `?${searchParams.toString()}`);
    expect(result).to.be.false;
    expect(el.innerHTML).to.equal('<div class="modal">Missing required parameters</div>');
  });
});
