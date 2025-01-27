import sinon from 'sinon';
import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { waitForElement } from '../../helpers/waitfor.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init } = await import('../../../libs/blocks/gist/gist.js');

describe('adobetv autoblock', () => {
  let createElementStub;
  let clock;
  let originalCreateElement;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
    originalCreateElement = document.createElement;

    createElementStub = sinon.stub(document, 'createElement').callsFake((tagName) => {
      if (tagName !== 'script') {
        return originalCreateElement.call(document, tagName);
      }
      const scriptMock = originalCreateElement.call(document, 'script');
      Object.defineProperty(scriptMock, 'src', {
        set(url) {
          const gistCb = url.match(/callback=([^&]+)/);
          if (!gistCb) return;
          const callbackName = gistCb[1];
          setTimeout(() => {
            if (window[callbackName]) {
              window[callbackName]({ div: '<div class="gist-data">Mock Gist Content</div>' });
            }
          }, 0);
        },
      });
      return scriptMock;
    });
  });

  afterEach(() => {
    createElementStub.restore();
    clock.restore();
  });

  it('creates gist block with mocked data', async () => {
    const gistLink = document.body.querySelector('a');
    init(gistLink);
    await clock.runAllAsync();
    const div = await waitForElement('div.gist-data');
    expect(div).to.exist;
    expect(div.innerHTML).to.contain('Mock Gist Content');
  });
});
