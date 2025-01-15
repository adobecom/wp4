import { selectors } from './utils.js';
import { trigger } from '../utilities.js';

class LocalNavItem {
  constructor() {
    this.localNav = document.querySelector(selectors.localNav);
    this.localNavTrigger = this.localNav?.querySelector(selectors.localNavTitle);
    this.exitLink = this.localNav?.querySelector(selectors.localNavExit);
    this.addEventListeners();
  }

  handleKeyDown = (e) => {
    const { code, target } = e;
    const isHeadline = target.classList.contains(selectors.headline.slice(1));
    switch (code) {
      case 'Space':
      case 'Enter':
        if (isHeadline) {
          e.preventDefault(); // Prevent default scrolling behavior for Space key
          trigger({ element: target, event: e, type: 'headline' });
        }
        break;
      case 'Escape': // close on escape
        e.preventDefault();
        if (this.localNav.classList.contains(selectors.localNavActive.slice(1))) {
          this.localNavTrigger?.click();
          this.localNavTrigger?.focus();
        }
        break;
      default:
        break;
    }
  };

  addEventListeners = () => {
    this.localNav?.addEventListener('keydown', this.handleKeyDown);
    this.exitLink?.addEventListener('focus', (e) => {
      e.preventDefault();
      this.localNavTrigger?.focus();
    });
  };
}

export default LocalNavItem;
