import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';

const utils = {};

const config = {
  codeRoot: '/libs',
  locales: { '': { ietf: 'en-US', tk: 'hah7vzn.css' } },
};

describe('Utils - MEP GNav', () => {
  before(async () => {
    const module = await import('../../libs/utils/utils.js');
    module.setConfig(config);
    Object.keys(module).forEach((func) => {
      utils[func] = module[func];
    });
    window.hlx = { rum: { isSelected: false } };
  });

  after(() => {
    delete window.hlx;
  });

  describe('target set to gnav', async () => {
    const MANIFEST_JSON = {
      info: { total: 2, offset: 0, limit: 2, data: [{ key: 'manifest-type', value: 'Personalization' }, { key: 'manifest-override-name', value: '' }, { key: 'name', value: '1' }] }, placeholders: { total: 0, offset: 0, limit: 0, data: [] }, experiences: { total: 1, offset: 0, limit: 1, data: [{ action: 'insertContentAfter', selector: '.marquee', 'page filter (optional)': '/products/special-offers', chrome: 'https://main--milo--adobecom.hlx.page/drafts/mariia/fragments/personalizationtext' }] }, ':version': 3, ':names': ['info', 'placeholders', 'experiences'], ':type': 'multi-sheet',
    };
    function htmlResponse() {
      return new Promise((resolve) => {
        resolve({
          ok: true,
          json: () => MANIFEST_JSON,
        });
      });
    }

    it('have target be set to gnav and save in config', async () => {
      window.fetch = sinon.stub().returns(htmlResponse());
      document.head.innerHTML = await readFile({ path: './mocks/mep/head-target-postlcp.html' });
      await utils.loadArea();
      const resultConfig = utils.getConfig();
      expect(resultConfig.mep.targetEnabled).to.equal('postlcp');
    });
  });
});
