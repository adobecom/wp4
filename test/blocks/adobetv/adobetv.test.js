import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { waitForElement } from '../../helpers/waitfor.js';
import { setConfig } from '../../../libs/utils/utils.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
setConfig({});
const { default: init } = await import('../../../libs/blocks/adobetv/adobetv.js');

describe('adobetv autoblock', () => {
  it('creates video block', async () => {
    const wrapper = document.body.querySelector('.adobe-tv');
    const a = wrapper.querySelector(':scope > a');

    await init(a);
    const iframe = await waitForElement('.adobe-tv iframe');
    expect(wrapper.querySelector(':scope > a')).to.be.null;
    expect(iframe).to.be.exist;
  });

  it('adobetv as bg', async () => {
    const wrapper = document.body.querySelector('#adobetvAsBg');
    const a = wrapper.querySelector(':scope a[href*=".mp4"]');

    await init(a);
    const video = await waitForElement('#adobetvAsBg video');
    expect(wrapper.querySelector(':scope a[href*=".mp4"]')).to.be.null;
    expect(video).to.be.exist;
  });
});
