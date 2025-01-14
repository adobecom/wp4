const ctaTextOption = {
  ctaTexts: [
    { id: 'buy-now', name: 'Buy now' },
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
    { id: 'save-today', name: 'Save today' },
  ],

  getDefaultText() {
    return this.ctaTexts[0].id;
  },

  getTexts() {
    return this.ctaTexts;
  },

  getSelectedText(searchParameters) {
    const ctaLabel = searchParameters.get('text');
    return !!ctaLabel && this.ctaTexts.find((label) => label.id === ctaLabel)
      ? ctaLabel
      : this.getDefaultText();
  },
};

export default ctaTextOption;
