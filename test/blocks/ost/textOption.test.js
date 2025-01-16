import { expect } from '@esm-bundle/chai';
import ctaTextOption from '../../../libs/blocks/ost/ctaTextOption.js';

describe('test ctaTextOption', () => {
  it('get default text', async () => {
    const EXPECTED_DEFAULT_TEXT = 'buy-now';
    const defaultText = ctaTextOption.getDefaultText();
    expect(EXPECTED_DEFAULT_TEXT).to.equal(defaultText);
  });

  it('get texts', async () => {
    const EXPECTED_TEXTS = [{ id: 'buy-now', name: 'Buy now' },
      { id: 'free-trial', name: 'Free trial' },
      { id: 'start-free-trial', name: 'Start free trial' },
      { id: 'save-now', name: 'Save now' },
      { id: 'get-started', name: 'Get started' },
      { id: 'choose-a-plan', name: 'Choose a plan' },
      { id: 'learn-more', name: 'Learn more' },
      { id: 'change-plan-team-plans', name: 'Change Plan Team Plans' },
      { id: 'upgrade', name: 'Upgrade' },
      { id: 'change-plan-team-payment', name: 'Change Plan Team Payment' },
      { id: 'take-the-quiz', name: 'Take the quiz' },
      { id: 'see-more', name: 'See more' },
      { id: 'upgrade-now', name: 'Upgrade now' },
      { id: 'save-today', name: 'Save today' }];
    const texts = ctaTextOption.getTexts();
    expect(EXPECTED_TEXTS).to.deep.equal(texts);
  });

  it('get selected text', async () => {
    const EXPECTED_SELECTED_TEXT = 'buy-now';
    const selectedText = ctaTextOption.getSelectedText(new Map().set('text', 'buy-now'));
    expect(EXPECTED_SELECTED_TEXT).to.equal(selectedText);
  });
});
