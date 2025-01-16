import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { stub } from 'sinon';
import { getConfig } from '../../../libs/utils/utils.js';
import { init } from '../../../libs/features/personalization/personalization.js';
import mepSettings from './mepSettings.js';

document.body.innerHTML = await readFile({ path: './mocks/personalization.html' });

it('replacePage should replace all of the main block', async () => {
  const config = getConfig();
  config.env = { name: 'prod' };

  let manifestJson = await readFile({ path: './mocks/actions/manifestReplacePage.json' });
  manifestJson = JSON.parse(manifestJson);
  const replacePageHtml = await readFile({ path: './mocks/fragments/replacePage.plain.html' });

  window.fetch = stub();
  window.fetch.onCall(0).returns(
    new Promise((resolve) => {
      resolve({
        ok: true,
        json: () => manifestJson,
      });
    }),
  );
  window.fetch.onCall(2).returns(
    new Promise((resolve) => {
      resolve({
        ok: true,
        text: () => replacePageHtml,
      });
    }),
  );

  expect(document.querySelector('.marquee')).to.not.be.null;
  expect(document.querySelector('.newpage')).to.be.null;

  await init(mepSettings);

  expect(document.querySelector('.marquee')).to.be.null;
  expect(document.querySelector('.newpage')).to.not.be.null;
});
