import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { getConfig } from '../../../libs/utils/utils.js';
import { init } from '../../../libs/features/personalization/personalization.js';

const mepSettings = {
  mepParam: '',
  mepHighlight: false,
  mepButton: false,
  pzn: '',
  promo: false,
  target: true,
};
const titleSelector = 'h2';
const activeTabSelector = '.tabs > div:nth-child(2) > div:nth-child(2)';
const htmlReset = await readFile({ path: './mocks/targetIntegration.html' });
const targetResponse = JSON.parse(await readFile({ path: './mocks/targetResponse.json' }));
const config = getConfig();

function mockTargetResponse(timeout = 50) {
  const event = new CustomEvent('alloy_sendEvent', { detail: targetResponse });
  setTimeout(() => {
    window.dispatchEvent(event);
  }, timeout);
}

describe('Target integration settings', () => {
  beforeEach(() => {
    document.body.innerHTML = htmlReset;
    config.mep = {};
  });
  it('makes 2 updates when Target is enabled', async () => {
    const title = document.querySelector(titleSelector);
    const activeTab = document.querySelector(activeTabSelector);
    expect(title.innerText).to.equal('Headline before Target update');
    expect(activeTab.innerText).to.equal('2');
    mockTargetResponse();
    await init(mepSettings);
    expect(title.innerText).to.equal('PZN title');
    expect(activeTab.innerText).to.equal('1');
  });
  it('makes 1 update when Target is postLCP', async () => {
    mepSettings.target = 'postlcp';
    const title = document.querySelector(titleSelector);
    const activeTab = document.querySelector(activeTabSelector);
    expect(title.innerText).to.equal('Headline before Target update');
    expect(activeTab.innerText).to.equal('2');
    mockTargetResponse();
    await init(mepSettings);
    expect(title.innerText).to.equal('Headline before Target update');
    expect(activeTab.innerText).to.equal('2');
    await init({ postLCP: true });
    expect(title.innerText).to.equal('Headline before Target update');
    expect(activeTab.innerText).to.equal('1');
  });
});
