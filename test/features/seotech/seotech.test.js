import { expect } from '@esm-bundle/chai';
import { stub } from 'sinon';
import { waitForElement } from '../../helpers/waitfor.js';

import { getConfig, createTag } from '../../../libs/utils/utils.js';
import {
  appendScriptTag,
  sha256,
  REGEX_ADOBETV,
  REGEX_YOUTUBE,
} from '../../../libs/features/seotech/seotech.js';

describe('REGEX_ADOBETV', () => {
  const testCases = [
    {
      url: 'https://video.tv.adobe.com/v/26535',
      expected: '26535',
    },
    {
      url: 'https://video.tv.adobe.com/v/26535/',
      expected: '26535',
    },
    {
      url: 'https://stage-video.tv.adobe.com/v/26535',
      expected: '26535',
    },
    {
      url: 'https://blah.com/26535',
      expected: null,
    },
  ];
  testCases.forEach(({ url, expected }) => {
    it(`should ${expected ? 'parse' : 'not parse'} adobetv url: ${url}`, () => {
      const match = url.match(REGEX_ADOBETV);
      if (expected) {
        expect(match[1]).to.equal(expected);
      } else {
        expect(match).to.be.null;
      }
    });
  });
});

describe('REGEX_YOUTUBE', () => {
  const testCases = [
    {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      expected: 'dQw4w9WgXcQ',
    },
    {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      expected: 'dQw4w9WgXcQ',
    },
    {
      url: 'https://youtu.be/dQw4w9WgXcQ',
      expected: 'dQw4w9WgXcQ',
    },
    {
      url: 'https://www.example.com/watch?v=dQw4w9WgXcQ',
      expected: null,
    },
  ];
  testCases.forEach(({ url, expected }) => {
    it(`should ${expected ? 'parse' : 'not parse'} youtube url: ${url}`, () => {
      const match = url.match(REGEX_YOUTUBE);
      if (expected) {
        expect(match[1]).to.equal(expected);
      } else {
        expect(match).to.be.null;
      }
    });
  });
});

describe('sha256', () => {
  it('should return a hash', async () => {
    const message = 'hello';
    const hash = await sha256(message);
    expect(hash).to.equal('2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824');
  });
});

describe('seotech', () => {
  describe('appendScriptTag + seotech-structured-data', () => {
    beforeEach(async () => {
      window.lana = { log: (s) => console.log(`LANA NOT STUBBED! ${s}`) };
    });
    afterEach(() => {
      window.fetch?.restore?.();
      window.lana?.restore?.();
    });

    it('should not append JSON-LD', async () => {
      const locationUrl = 'https://main--cc--adobecom.hlx.page/in/creativecloud/example2?foo=bar&seotech-env=stage';
      stub(window.lana, 'log');
      const getMetadata = stub().returns(null);
      getMetadata.withArgs('seotech-structured-data').returns('on');
      const getConfigStub = stub().returns({ imsClientId: 'adobedotcom-cc' });
      const fetchStub = stub(window, 'fetch');
      fetchStub.returns(Promise.resolve(Response.json(
        { error: 'ERROR!' },
        { status: 400 },
      )));
      await appendScriptTag(
        { locationUrl, getMetadata, getConfig: getConfigStub, createTag },
      );
      const expectedApiCall = 'https://www.adobe.com/seotech/api/structured-data/cc/3e2d1ce8ccf0e45d42d33e0f190fc306ab1ee0f2890c8ff5da27414f8014ceb2';
      expect(fetchStub.getCall(0)?.firstArg).to.equal(expectedApiCall);
    });

    it('should append JSON-LD', async () => {
      const locationUrl = 'https://main--cc--adobecom.hlx.page/in/creativecloud/example?foo=bar';
      const lanaStub = stub(window.lana, 'log');
      const fetchStub = stub(window, 'fetch');
      const getConfigStub = stub().returns({ imsClientId: 'adobedotcom-cc' });
      const getMetadata = stub().returns(null);
      getMetadata.withArgs('seotech-structured-data').returns('on');
      const expectedObject = {
        '@context': 'http://schema.org',
        '@type': 'VideoObject',
        name: 'fake',
      };
      fetchStub.returns(Promise.resolve(Response.json(
        { ...expectedObject },
        { status: 200 },
      )));
      await appendScriptTag(
        { locationUrl, getMetadata, getConfig: getConfigStub, createTag },
      );
      const expectedApiCall = 'https://www.adobe.com/seotech/api/structured-data/cc/f0f5cec5d8b70cf798b602c3586da39e93b9638d9b8001b3a4298605dc5f6ebe';
      expect(fetchStub.getCall(0)?.firstArg).to.equal(expectedApiCall);
      const el = await waitForElement('script[type="application/ld+json"]');
      const obj = JSON.parse(el.text);
      expect(obj).to.deep.equal(expectedObject);
      expect(lanaStub.called).to.be.false;
    });
  });

  describe('appendScriptTag + seotech-video-url', () => {
    beforeEach(async () => {
      window.lana = { log: () => console.log('LANA NOT STUBBED!') };
    });
    afterEach(() => {
      window.fetch?.restore?.();
      window.lana?.restore?.();
    });

    it('should not append JSON-LD if url is invalid', async () => {
      const lanaStub = stub(window.lana, 'log');
      const getMetadata = stub().returns(null);
      getMetadata.withArgs('seotech-video-url').returns('fake');
      await appendScriptTag(
        { locationUrl: window.location.href, getMetadata, getConfig, createTag },
      );
      expect(lanaStub.calledOnceWith('SEOTECH: Invalid video url: fake')).to.be.true;
    });

    it('should not append JSON-LD if url not found', async () => {
      const lanaStub = stub(window.lana, 'log');
      const getMetadata = stub().returns(null);
      getMetadata.withArgs('seotech-video-url').returns('https://youtu.be/fake');
      const fetchStub = stub(window, 'fetch');
      fetchStub.returns(Promise.resolve(Response.json(
        { error: 'ERROR!' },
        { status: 400 },
      )));
      await appendScriptTag(
        { locationUrl: window.location.href, getMetadata, getConfig, createTag },
      );
      expect(fetchStub.calledOnceWith(
        'https://www.adobe.com/seotech/api/json-ld/types/video-object/providers/youtube/fake',
      )).to.be.true;
      expect(lanaStub.calledOnceWith('SEOTECH: Failed to fetch video: ERROR!')).to.be.true;
    });

    it('should append JSON-LD', async () => {
      const lanaStub = stub(window.lana, 'log');
      const fetchStub = stub(window, 'fetch');
      const getMetadata = stub().returns(null);
      getMetadata.withArgs('seotech-video-url').returns('https://youtu.be/dQw4w9WgXcQ');
      const expectedVideoObject = {
        '@context': 'http://schema.org',
        '@type': 'VideoObject',
        name: 'fake',
      };
      fetchStub.returns(Promise.resolve(Response.json(
        { videoObject: expectedVideoObject },
        { status: 200 },
      )));
      await appendScriptTag(
        { locationUrl: window.location.href, getMetadata, getConfig, createTag },
      );
      expect(fetchStub.calledOnceWith(
        'https://www.adobe.com/seotech/api/json-ld/types/video-object/providers/youtube/dQw4w9WgXcQ',
      )).to.be.true;
      const el = await waitForElement('script[type="application/ld+json"]');
      const obj = JSON.parse(el.text);
      expect(obj).to.deep.equal(expectedVideoObject);
      expect(lanaStub.called).to.be.false;
    });
  });
});
