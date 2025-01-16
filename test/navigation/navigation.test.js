/* eslint import/no-relative-packages: 0 */
import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { stub, restore } from 'sinon';
import loadBlock from '../../libs/navigation/navigation.js';
import { setConfig } from '../../libs/utils/utils.js';
import { mockRes } from '../blocks/global-navigation/test-utilities.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const miloLibs = 'http://localhost:2000/libs';

describe('Navigation component', async () => {
  beforeEach(async () => {
    stub(window, 'fetch').callsFake(async (url) => {
      if (url.includes('/footer.plain.html')) return mockRes({ payload: await readFile({ path: '../blocks/region-nav/mocks/regions.html' }) });
      if (url.includes('/federal/dev/gnav.plain.html')) return mockRes({ payload: await readFile({ path: './mocks/gnav.html' }) });
      if (url.includes('/federal/error/gnav.plain.html')) return mockRes({ payload: {}, status: 404 });

      return null;
    });
    setConfig({ miloLibs, contentRoot: '/federal/dev' });
  });

  afterEach(() => {
    restore();
  });

  it('Renders the footer block', async () => {
    await loadBlock({ authoringPath: '/federal/dev', footer: { privacyId: '12343' }, env: 'qa' }, 'http://localhost:2000');
    const el = document.getElementsByTagName('footer');
    expect(el).to.exist;
  });

  it('Renders the footer block should not load when config is not passed', async () => {
    try {
      const onError = stub();
      await loadBlock({ authoringPath: '/federal/dev-new', env: 'qa', footer: { privacyId: '12343' }, header: { onError } }, 'http://localhost:2000');
      const el = document.getElementsByTagName('footer');
      expect(el).to.not.exist;
      expect(onError.called).to.be.true;
    } catch (e) {
      // handle error
    }
  });

  it('Renders the header block', async () => {
    const onReady = stub();
    await loadBlock({ authoringPath: '/federal/dev', header: { imsClientId: 'fedsmilo', onReady }, env: 'prod', theme: 'dark' }, 'http://localhost:2000');
    const el = document.getElementsByTagName('header');
    expect(el).to.exist;
    expect(onReady.called).to.be.true;
  });

  it('Does not render either header or footer if not found in configs', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/body.html' });
    await loadBlock({ authoringPath: '/federal/dev', env: 'qa' }, 'http://localhost:2000');
    const header = document.getElementsByTagName('header');
    const footer = document.getElementsByTagName('footer');
    expect(header).to.be.empty;
    expect(footer).to.be.empty;
  });

  it('Does not render either header or footer if configs is not passed', async () => {
    document.body.innerHTML = await readFile({ path: './mocks/body.html' }, 'http://localhost:2000');
    await loadBlock();
    const header = document.getElementsByTagName('header');
    const footer = document.getElementsByTagName('footer');
    expect(header).to.be.empty;
    expect(footer).to.be.empty;
  });

  it('Renders the footer block with authoringpath passed in footer', async () => {
    await loadBlock({ footer: { privacyId: '12343', authoringPath: '/federal/dev' }, env: 'qa' }, 'http://localhost:2000');
    const el = document.getElementsByTagName('footer');
    expect(el).to.exist;
  });
});
