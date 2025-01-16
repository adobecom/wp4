import { expect } from 'chai';
import { loadAnalyticsAndInteractionData } from '../../libs/martech/helpers.js';

describe('loadAnalyticsAndInteractionData', () => {
  beforeEach(() => {
    window.fetch = () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        handle: [
          {
            type: 'personalization:decisions',
            payload: [{ decisionId: '1', proposition: 'Test Proposition' }],
          },
        ],
      }),
    });
  });

  afterEach(() => {
    delete window.fetch;
  });

  it('should fetch and return the proposition data', async () => {
    const result = await loadAnalyticsAndInteractionData({
      locale: { ietf: 'en-US', prefix: 'us' },
      env: 'prod',
      calculatedTimeout: 10000,
    });

    expect(result).to.deep.equal({
      type: 'propositionFetch',
      result: { propositions: [{ decisionId: '1', proposition: 'Test Proposition' }] },
    });
  });

  it('should handle consent cookie being set to "out"', async () => {
    window.getCookie = () => 'general%3Dout';

    try {
      await loadAnalyticsAndInteractionData({
        locale: { ietf: 'en-US', prefix: 'us' },
        env: 'prod',
        calculatedTimeout: 10000,
      });
    } catch (err) {
      expect(err.message).to.equal('Consent Cookie doesnt allow interact');
    }
  });

  it('should handle fetch failure gracefully', async () => {
    window.fetch = () => Promise.reject(new Error('Network error'));

    try {
      await loadAnalyticsAndInteractionData({
        locale: { ietf: 'en-US', prefix: 'us' },
        env: 'prod',
        calculatedTimeout: 10000,
      });
    } catch (err) {
      expect(err.message).to.equal('Error: Network error');
    }
  });

  it('should handle timeout errors correctly', async () => {
    window.fetch = () => new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), 2000);
    });

    try {
      await loadAnalyticsAndInteractionData({
        locale: { ietf: 'en-US', prefix: 'us' },
        env: 'prod',
        calculatedTimeout: 1000,
      });
    } catch (err) {
      expect(err.message).to.equal('Error: Request timed out');
    }
  });

  it('should handle missing handle in the response', async () => {
    window.fetch = () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    });

    try {
      await loadAnalyticsAndInteractionData({
        locale: { ietf: 'en-US', prefix: 'us' },
        env: 'prod',
        calculatedTimeout: 10000,
      });
    } catch (err) {
      expect(err.message).to.be.string;
    }
  });

  it('should return the correct target property for non-prod environments', async () => {
    window.getCookie = () => null;

    const result = await loadAnalyticsAndInteractionData({
      locale: { ietf: 'en-US', prefix: 'us' },
      env: 'dev',
      calculatedTimeout: 10000,
    });

    expect(result.type).to.equal('propositionFetch');
    expect(result.result.propositions).to.have.lengthOf(1);
  });

  it('should return the correct target property for prod environment', async () => {
    window.getCookie = () => null;

    const result = await loadAnalyticsAndInteractionData({
      locale: { ietf: 'en-US', prefix: 'us' },
      env: 'prod',
      calculatedTimeout: 10000,
    });

    expect(result.type).to.equal('propositionFetch');
    expect(result.result.propositions).to.have.lengthOf(1);
  });

  it('should handle different screen orientations', async () => {
    window.getDeviceInfo = () => ({
      screenWidth: 1920,
      screenHeight: 1080,
      screenOrientation: 'portrait',
      viewportWidth: 800,
      viewportHeight: 600,
    });

    const result = await loadAnalyticsAndInteractionData({
      locale: { ietf: 'en-US', prefix: 'us' },
      env: 'prod',
      calculatedTimeout: 10000,
    });

    expect(result.type).to.equal('propositionFetch');
    expect(result.result.propositions).to.have.lengthOf(1);
  });

  it('should generate a new FPID when ECID is not present', async () => {
    window.innerWidth = 234;
    window.innerHeight = 1234;
    window.getCookie = () => null;
    const data = {
      handle: [
        {
          type: 'personalization:decisions',
          payload: [
            {
              id: '12345',
              namespace: { code: 'ECID' },
            },
            {
              id: '67890',
              namespace: { code: 'Other' },
            },
          ],
        },
        {
          type: 'user:profile',
          payload: [
            {
              id: '98765',
              namespace: { code: 'ECID' },
            },
            {
              id: '54321',
              namespace: { code: 'Other' },
            },
          ],
        },
        {
          type: 'session:info',
          payload: [
            {
              id: '11223',
              namespace: { code: 'ECID' },
            },
          ],
        },
      ],
    };
    window.fetch = () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(data),
    });

    const result = await loadAnalyticsAndInteractionData({
      locale: { ietf: 'en-US', prefix: 'us' },
      env: 'prod',
      calculatedTimeout: 10000,
    });

    expect(result.type).to.equal('propositionFetch');
    expect(result.result.propositions).to.have.lengthOf(2);
  });

  it('should handle targetResp.ok as false and throw an error', async () => {
    window.fetch = () => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({}),
    });
    try {
      await loadAnalyticsAndInteractionData({
        locale: { ietf: 'en-US', prefix: 'us' },
        env: 'prod',
        calculatedTimeout: 10000,
      });

      expect.fail('Some error');
    } catch (err) {
      expect(err.message).to.equal('Error: Failed to fetch interact call');
    }
  });

  it('should handle targetRespwhen no prepositions are there', async () => {
    window.fetch = () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        handle: [
          {
            type: 'personalization:decisions',
            payload: [],
          },
          {
            type: 'other:type',
            payload: [
              { decisionId: '3', proposition: 'Other Proposition' },
            ],
          },
        ],
      }),
    });
    try {
      await loadAnalyticsAndInteractionData({
        locale: { ietf: 'en-US', prefix: 'us' },
        env: 'prod',
        calculatedTimeout: 10000,
      });
    } catch (err) {
      expect(err.message).to.equal('Error: No propositions found');
    }
  });
  it('should throw error when cookie prohibits it', async () => {
    document.cookie = 'kndctr_9E1005A551ED61CA0A490D45_AdobeOrg_consent=general=out';
    window.getCookie = () => null;

    try {
      await loadAnalyticsAndInteractionData({
        locale: { ietf: 'en-US', prefix: 'us' },
        env: 'prod',
        calculatedTimeout: 1000,
      });
    } catch (err) {
      expect(err.message).to.equal('Consent Cookie doesnt allow interact');
    }
  });
});
