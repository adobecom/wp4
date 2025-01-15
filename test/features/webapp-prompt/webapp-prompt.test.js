import { expect } from '@esm-bundle/chai';
import sinon, { stub } from 'sinon';
import pepPromptContent from './mocks/pep-prompt-content.js';

describe('PEP', () => {
  let allSelectors;
  let defaultConfig;
  let mockRes;
  let initPep;

  beforeEach(async () => {
    // We need to import the utilities after mocking setTimeout to ensure
    // their setTimeout calls use Sinon's mocked implementation.
    // Importing before mocking would lead to a 5s PEP timeout, exceeding the 2s test limit.
    const { allSelectors: importedAllSelectors, defaultConfig: importedDefaultConfig, mockRes: importedMockRes } = await import('./test-utilities.js');
    allSelectors = importedAllSelectors;
    defaultConfig = importedDefaultConfig;
    mockRes = importedMockRes;
    initPep = (await import('./test-utilities.js')).initPep;
    document.body.innerHTML = `<div class="${allSelectors.fedsUtilities.replace('.', '')}" style="position:relative">
    <div id="${allSelectors.appSwitcher.replace('#', '')}" tabindex="0">App Switcher</div>
    </div>`;
    stub(window, 'fetch').callsFake(async (url) => {
      if (url.includes('pep-prompt-content.plain.html')) return mockRes({ payload: pepPromptContent({ ...defaultConfig }) });
      return null;
    });
  });

  afterEach(() => {
    sinon.restore();
    document.body.innerHTML = '';
    document.cookie = `${document.cookie};expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  });

  describe('PEP rendering tests', () => {
    it('should render PEP', async () => {
      await initPep({});
      expect(document.querySelector(allSelectors.pepWrapper)).to.exist;
    });

    it('should not render PEP when previously dismissed', async () => {
      document.cookie = 'dismissedAppPrompts=["pep-prompt-content.plain.html"]';
      await initPep({});
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should not render PEP when the entitlement does not match', async () => {
      await initPep({ entName: 'not-matching-entitlement' });
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should not render PEP when there is no prompt content', async () => {
      sinon.restore();
      stub(window, 'fetch').callsFake(async (url) => {
        if (url.includes('pep-prompt-content.plain.html')) {
          return mockRes({
            payload: null,
            ok: false,
            status: 400,
          });
        }
        return null;
      });
      await initPep({});
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should not render PEP when the redirect url or product name are not provided', async () => {
      sinon.restore();
      stub(window, 'fetch').callsFake(async (url) => {
        if (url.includes('pep-prompt-content.plain.html')) return mockRes({ payload: pepPromptContent({ ...defaultConfig, redirectUrl: false, productName: false }) });
        return null;
      });
      await initPep({});
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should not render PEP when the anchor element is open', async () => {
      await initPep({ isAnchorOpen: true });
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should not render PEP when the GRM is open', async () => {
      const clock = sinon.useFakeTimers();
      document.body.insertAdjacentHTML('afterbegin', '<div class="locale-modal-v2 dialog-modal"></div>');
      document.body.insertAdjacentHTML('afterbegin', '<div class="dialog-modal"></div>');

      await initPep({});

      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;

      const event = new CustomEvent('milo:modal:closed');
      window.dispatchEvent(event);

      document.querySelector('.locale-modal-v2')?.remove();
      document.querySelector('.dialog-modal')?.remove();

      await clock.tickAsync(300);

      expect(document.querySelector(allSelectors.pepWrapper)).to.exist;
      clock.uninstall();
    });
  });

  describe('PEP configuration tests', () => {
    it('should use config values when metadata loader color, duration, or dismissal options are not provided', async () => {
      sinon.restore();
      stub(window, 'fetch').callsFake(async (url) => {
        if (url.includes('pep-prompt-content.plain.html')) {
          return mockRes({
            payload: pepPromptContent({
              ...defaultConfig,
              color: false,
              loaderDuration: false,
              animationCount: false,
              animationDuration: false,
              tooltipMessage: false,
              tooltipDuration: false,
            }),
          });
        }
        return null;
      });
      const pep = await initPep({});
      const {
        'loader-color': pepColor,
        'loader-duration': pepDuration,
        'dismissal-animation-count': animCount,
        'dismissal-animation-duration': animDuration,
        'dismissal-tooltip-message': tooltipMessage,
        'dismissal-tooltip-duration': tooltipDuration,
      } = pep.options;
      const configPresent = [
        pepColor,
        pepDuration,
        animCount,
        animDuration,
        tooltipMessage,
        tooltipDuration,
      ].reduce((acc, x) => acc && !!x, true);
      expect(configPresent).to.equal(true);
    });
  });

  describe('PEP interaction tests', () => {
    it('should close PEP on Escape key', async () => {
      await initPep({});
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should close PEP on clicking the close icon', async () => {
      await initPep({});
      document.querySelector(allSelectors.closeIcon).click();
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should close PEP on clicking the CTA', async () => {
      await initPep({});
      document.querySelector(allSelectors.cta).click();
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('should close PEP on clicking the anchor element', async () => {
      await initPep({});
      document.querySelector(allSelectors.appSwitcher).click();
      expect(document.querySelector(allSelectors.pepWrapper)).to.not.exist;
    });

    it('stops the PEP timer when PEP content is hovered', async () => {
      const clock = sinon.useFakeTimers();
      await initPep({});
      document.querySelector(allSelectors.pepWrapper).dispatchEvent(new Event('mouseenter'));
      clock.tick(10000);
      expect(window.location.hash).to.not.equal('#soup');
      clock.uninstall();
    });

    it('redirects when the PEP timer runs out', async () => {
      const clock = sinon.useFakeTimers();
      await initPep({});

      expect(window.location.hash).to.not.equal('soup');

      clock.tick(10000);

      expect(window.location.hash).to.equal('#soup');

      clock.uninstall();
    });
  });

  describe('PEP focus tests', () => {
    it('should focus on the close icon on initial render', async () => {
      await initPep({});
      expect(document.activeElement).to.equal(document.querySelector(allSelectors.closeIcon));
    });

    it('should focus on the anchor element after closing', async () => {
      await initPep({});
      document.querySelector(allSelectors.closeIcon).click();
      expect(document.activeElement).to.equal(document.querySelector(allSelectors.appSwitcher));
    });
  });

  describe('PEP dismissal tests', () => {
    it('adds three rings to the app switcher and removes them after the required amount of time', async () => {
      const clock = sinon.useFakeTimers();
      await initPep({});

      document.querySelector(allSelectors.closeIcon).click();
      expect([...document.querySelectorAll(allSelectors.indicatorRing)].length).to.equal(3);
      clock.tick(7500);
      expect([...document.querySelectorAll(allSelectors.indicatorRing)].length).to.equal(0);
      clock.uninstall();
    });

    it('adds a data attribute to the app switcher with the correct data and removes it after the allotted time', async () => {
      const clock = sinon.useFakeTimers();
      await initPep({});

      document.querySelector(allSelectors.closeIcon).click();
      expect(document.querySelector(allSelectors.tooltip)).to.exist;

      clock.tick(5000);
      expect(document.querySelector(allSelectors.tooltip)).to.not.exist;
      clock.uninstall();
    });

    it('removes the dismissal animation and the tooltip upon clicking the anchor element', async () => {
      await initPep({});
      document.querySelector(allSelectors.closeIcon).click();
      expect(document.querySelector(allSelectors.tooltip)).to.exist;
      document.querySelector(allSelectors.appSwitcher).click();
      expect(document.querySelector(allSelectors.tooltip)).to.not.exist;
    });
  });

  describe('PEP logging tests', () => {
    beforeEach(() => {
      window.lana.log = sinon.spy();
    });

    it('should send log when not getting anchor state', async () => {
      await initPep({
        getAnchorStateMock: () => new Promise((resolve, reject) => {
          reject(new Error('Cannot get anchor state'));
        }),
      });
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Error on getting anchor state'))).to.exist;
      expect(window.lana.log.getCalls().find((c) => c.args[1].tags.includes('pep'))).to.exist;
    });

    it('should send log when cannot fetch content for prompt', async () => {
      sinon.restore();
      stub(window, 'fetch').callsFake(async (url) => {
        if (url.includes('pep-prompt-content.plain.html')) {
          return mockRes({
            payload: null,
            ok: false,
            status: 400,
          });
        }
        return null;
      });
      await initPep({});
      expect(window.lana.log.getCalls().find((c) => c.args[0].includes('Error fetching content for prompt'))).to.exist;
      expect(window.lana.log.getCalls().find((c) => c.args[1].tags.includes('pep'))).to.exist;
    });
  });
});
