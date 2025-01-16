import { expect } from '@esm-bundle/chai';

const defaultTestOptions = {
  clientId: 'testClientId',
  endpoint: 'https://lana.adobeio.com/',
  errorType: 'e',
  sampleRate: 100,
  tags: '',
  implicitSampleRate: 100,
};

it('lana should load existing window.lana.options', async () => {
  window.lana = { options: defaultTestOptions };
  await import('../../libs/utils/lana.js');

  expect(window.lana.options).to.be.eql({
    clientId: 'testClientId',
    endpoint: 'https://lana.adobeio.com/',
    errorType: 'e',
    sampleRate: 100,
    tags: '',
    implicitSampleRate: 100,
    isProdDomain: false,
    endpointStage: 'https://www.stage.adobe.com/lana/ll',
    useProd: true,
  });
});
