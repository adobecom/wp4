import { expect } from '@esm-bundle/chai';
import { enablePersonalizationV2 } from '../../libs/utils/utils.js';

function mockPerformanceData(serverTimingData) {
  window.performance.getEntriesByType = () => [{ serverTiming: serverTimingData }];
}

describe('enablePersonalizationV2', () => {
  it('should return true when personalization-v2 meta tag is present and user is signed out', () => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'personalization-v2');
    metaTag.setAttribute('content', 'personalization-v2');
    document.head.appendChild(metaTag);

    mockPerformanceData([]);

    const result = enablePersonalizationV2();
    expect(result).to.be.true;
    metaTag.parentNode.removeChild(metaTag);
  });

  it('should return false when personalization-v2 meta tag is present and user is signed in', () => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'personalization-v2');
    metaTag.setAttribute('content', 'personalization-v2');
    document.head.appendChild(metaTag);
    mockPerformanceData([{ name: 'sis', description: '1' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.false;
    metaTag.parentNode.removeChild(metaTag);
  });

  it('should return false when personalization-v2 meta tag is absent', () => {
    const result = enablePersonalizationV2();
    expect(result).to.be.false;
  });

  it('should return true when serverTiming is empty (signed out)', () => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'personalization-v2');
    metaTag.setAttribute('content', 'personalization-v2');
    document.head.appendChild(metaTag);

    mockPerformanceData([]);

    const result = enablePersonalizationV2();
    expect(result).to.be.true;
    metaTag.parentNode.removeChild(metaTag);
  });

  it('should return false when serverTiming has `sis` other than `0` (signed in)', () => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'personalization-v2');
    metaTag.setAttribute('content', 'personalization-v2');
    document.head.appendChild(metaTag);

    mockPerformanceData([{ name: 'sis', description: '1' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.false;
    metaTag.parentNode.removeChild(metaTag);
  });

  it('should return true when serverTiming has `sis` equal to `0` (signed out)', () => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'personalization-v2');
    metaTag.setAttribute('content', 'personalization-v2');
    document.head.appendChild(metaTag);

    mockPerformanceData([{ name: 'sis', description: '0' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.true;
    metaTag.parentNode.removeChild(metaTag);
  });

  it('should return false when serverTiming has other data but `sis` is missing (signed in)', () => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('name', 'personalization-v2');
    metaTag.setAttribute('content', 'personalization-v2');
    document.head.appendChild(metaTag);

    mockPerformanceData([{ name: 'other', description: 'value' }]);

    const result = enablePersonalizationV2();
    expect(result).to.be.false;
    metaTag.parentNode.removeChild(metaTag);
  });
});
