import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';

import { checkUrl, getKeyValPairs, getOrigin, setConfig } from '../../../tools/send-to-caas/send-utils.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });

describe('checkUrl function', () => {
  it('should return a flattened URL when given a URL with "href="', () => {
    const cardMetadataLinks = document.querySelectorAll('.card-metadata div a');
    const htmlLink = cardMetadataLinks[0].toString();
    const result = checkUrl(htmlLink, 'Error message');
    expect(result).to.equal(htmlLink);
  });

  it('should return the original URL when not containing "href="', () => {
    const inputUrl = 'https://milo.adobe.com/index.html';
    const result = checkUrl(inputUrl, 'Error message');
    expect(result).to.equal(inputUrl);
  });

  it('should return consumer mapping when set', () => {
    setConfig({ project: 'dc' });
    const result = getOrigin('someFloodgateColor');
    expect(result).to.equal('doccloud');
  });

  it('should send arbitrary fields as key-value pairs when set', () => {
    const authoredPairs = 'mpcVideoId:mpcVideoIdGM,thumbnailUrl: thumbnailUrlGM';
    const result = getKeyValPairs(authoredPairs);
    expect(JSON.stringify(result)).to.equal('[{"mpcVideoId":"mpcVideoIdGM"},{"thumbnailUrl":"thumbnailUrlGM"}]');
  });
});
