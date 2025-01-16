import { expect } from '@esm-bundle/chai';
import { stub } from 'sinon';
import { getConfig } from '../../../libs/utils/utils.js';
import { getEntitlements } from '../../../libs/features/personalization/personalization.js';

const config = getConfig();
config.env = { name: 'prod' };
config.mep = {};

const getFetchPromise = (data, type = 'json') => new Promise((resolve) => {
  resolve({
    ok: true,
    [type]: () => data,
  });
});

const setFetchResponse = () => {
  const response = {
    data: [
      {
        tagname: 'photoshop-any',
        id: 'photoshop-guid-id',
      },
      {
        tagname: 'illustrator-any',
        id: 'illustrator-guid-id',
      },
      {
        tagname: 'indesign-any',
        id: 'indesign-guid-id',
      },
      {
        tagname: 'after-effects-any',
        id: 'after-effects-guid-id',
      },
    ],
  };
  window.fetch = stub().returns(getFetchPromise(response, 'json'));
};
setFetchResponse();

describe('entitlements', () => {
  beforeEach(() => {
    config.mep.entitlementMap = undefined;
  });
  it('Should return any entitlements that match the id', async () => {
    const destinations = [
      {
        segments: [
          {
            id: '11111111-aaaa-bbbb-6666-cccccccccccc',
            namespace: 'ups',
          },
          {
            id: 'photoshop-guid-id',
            namespace: 'ups',
          },
          {
            id: 'illustrator-guid-id',
            namespace: 'ups',
          },
        ],
      },
    ];

    const expectedEntitlements = ['photoshop-any', 'illustrator-any'];
    const entitlements = await getEntitlements(destinations);
    expect(entitlements).to.deep.equal(expectedEntitlements);
  });

  it('Should not return any entitlements if there is no match', async () => {
    const destinations = [
      {
        segments: [
          {
            id: 'x1111111-aaaa-bbbb-6666-cccccccccccc',
            namespace: 'ups',
          },
          {
            id: 'y2222222-xxxx-bbbb-7777-cccccccccccc',
            namespace: 'ups',
          },
        ],
      },
    ];

    const expectedEntitlements = [];
    const entitlements = await getEntitlements(destinations);
    expect(entitlements).to.deep.equal(expectedEntitlements);
  });

  it('Should be able to use consumer defined entitlements in the config', async () => {
    config.consumerEntitlements = { 'consumer-defined-entitlement': 'consumer-defined' };
    const destinations = [
      {
        segments: [
          {
            id: 'photoshop-guid-id',
            namespace: 'ups',
          },
          {
            id: '11111111-aaaa-bbbb-6666-cccccccccccc',
            namespace: 'ups',
          },
          {
            id: 'consumer-defined-entitlement',
            namespace: 'ups',
          },
        ],
      },
    ];

    const expectedEntitlements = ['photoshop-any', 'consumer-defined'];
    const entitlements = await getEntitlements(destinations);
    expect(entitlements).to.deep.equal(expectedEntitlements);
  });

  it('Should return previously retrieved entitlements map if available', async () => {
    config.mep.entitlementMap = {
      'photoshop-guid-id2': 'photoshop-any',
      'illustrator-guid-id2': 'illustrator-any',
    };
    const destinations = [
      {
        segments: [
          {
            id: 'photoshop-guid-id2',
            namespace: 'ups',
          },
          {
            id: 'illustrator-guid-id2',
            namespace: 'ups',
          },
        ],
      },
    ];

    const expectedEntitlements = ['photoshop-any', 'illustrator-any'];
    const entitlements = await getEntitlements(destinations);
    expect(entitlements).to.deep.equal(expectedEntitlements);
  });
});
