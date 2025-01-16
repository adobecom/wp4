import { expect } from '@esm-bundle/chai';
import { enablePersonalizationV2 } from '../../libs/utils/utils.js';

function mockPerformanceData(serverTimingData) {
  window.performance.getEntriesByType = () => [{ serverTiming: serverTimingData }];
}

describe('enablePersonalizationV2', () => {
  let originalQuerySelector;

  beforeEach(() => {
    originalQuerySelector = document.head.querySelector;
  });

  afterEach(() => {
    document.head.querySelector = originalQuerySelector;
  });

  it('should return true when personalization-v2 meta tag is present and user is signed out', () => {
    document.head.querySelector = () => ({ name: 'personalization-v2' });

    mockPerformanceData([]);

    const result = enablePersonalizationV2();
    expect(result).to.be.true;
  });

  it('should return false when personalization-v2 meta tag is present and user is signed in', () => {
    document.head.querySelector = () => ({ name: 'personalization-v2' });

    mockPerformanceData([{ name: 'sis', description: '1' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.false;
  });

  it('should return false when personalization-v2 meta tag is absent', () => {
    document.head.querySelector = () => null;

    const result = enablePersonalizationV2();
    expect(result).to.be.false;
  });

  it('should return true when serverTiming is empty (signed out)', () => {
    document.head.querySelector = () => ({ name: 'personalization-v2' });

    mockPerformanceData([]);

    const result = enablePersonalizationV2();
    expect(result).to.be.true;
  });

  it('should return false when serverTiming has `sis` other than `0` (signed in)', () => {
    document.head.querySelector = () => ({ name: 'personalization-v2' });

    mockPerformanceData([{ name: 'sis', description: '1' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.false;
  });

  it('should return true when serverTiming has `sis` equal to `0` (signed out)', () => {
    document.head.querySelector = () => ({ name: 'personalization-v2' });

    mockPerformanceData([{ name: 'sis', description: '0' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.true;
  });

  it('should return false when serverTiming has other data but `sis` is missing (signed in)', () => {
    document.head.querySelector = () => ({ name: 'personalization-v2' });

    mockPerformanceData([{ name: 'other', description: 'value' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.false;
  });
});
