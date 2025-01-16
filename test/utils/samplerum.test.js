/* eslint-disable no-unused-expressions */

import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';

describe('SampleRUM', () => {
  it('Collects RUM data', async () => {
    const sendBeacon = sinon.stub(navigator, 'sendBeacon');
    // turn on RUM
    window.history.pushState({}, '', `${window.location.href}&rum=on`);

    const { sampleRUM } = await import('../../libs/utils/samplerum.js');

    // auto collects the top checkpoint
    sampleRUM();
    expect(sendBeacon.called).to.be.true;
    sendBeacon.resetHistory();

    // sends cwv beacon
    window.hlx.rum.collector = sinon.stub();
    sampleRUM('cwv', { foo: 'bar' });
    expect(window.hlx.rum.collector.called).to.be.true;

    // // test error handling
    window.hlx.rum.collector.resetHistory();
    sampleRUM('error', { foo: 'bar' });
    expect(window.hlx.rum.collector.called).to.be.true;

    delete window.hlx;
    sendBeacon.restore();
  });
});
