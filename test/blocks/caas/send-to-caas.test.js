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

  it('should only accept valid key:value pairs as arbitrary fields', () => {
    const missingColon = 'key1 value1, key2: value2';
    const resultMissingColon = getKeyValPairs(missingColon);
    expect(JSON.stringify(resultMissingColon)).to.equal('[{"key2":"value2"}]');

    const multipeColons = 'key1: value1: extra, key2: value2';
    const resultMultipeColons = getKeyValPairs(multipeColons);
    expect(JSON.stringify(resultMultipeColons)).to.equal('[{"key1":"value1: extra"},{"key2":"value2"}]');

    const emptyKeyVal = ': value1, key2:, :, key3: value3';
    const resultEmptyKeyVal = getKeyValPairs(emptyKeyVal);
    expect(JSON.stringify(resultEmptyKeyVal)).to.equal('[{"key3":"value3"}]');
  });
});
