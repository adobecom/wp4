/* eslint-disable class-methods-use-this */
import { selectors, getNextVisibleItemPosition, getPreviousVisibleItemPosition } from './utils.js';
import Popup from './popup.js';
import MobilePopup from './mobilePopup.js';
import { closeAllDropdowns, trigger, logErrorFor } from '../utilities.js';

class MainNavItem {
  constructor() {
    this.desktop = window.matchMedia('(min-width: 900px)');
    this.popup = new Popup({ mainNav: this });
    this.mobilePopup = new MobilePopup({ mainNav: this });
    this.addEventListeners();
  }

  addEventListeners() {
    document.querySelector(selectors.globalNav)
      .addEventListener('keydown', (e) => logErrorFor(() => {
        if (!e.target.closest(selectors.fedsNav) || e.target.closest(selectors.popup)) {
          return;
        }

        const newNav = !!document.querySelector('header.new-nav');

        switch (e.code) {
          case 'Tab': {
            if (newNav) {
              const activePopup = document.querySelector(selectors.activePopup);
              if (!activePopup) e.preventDefault();
              const items = [...document.querySelectorAll(`${selectors.mainMenuItems}, ${selectors.mainMenuLinks}, ${selectors.mainNavToggle}`)];
              const current = items.findIndex((x) => x === e.target);
              if (current > -1) {
                const next = current < items.length - 1 ? current + 1 : 0;
                const prev = current > 0 ? current - 1 : items.length - 1;
                if (e.shiftKey) items[prev].focus();
                else items[next].focus();
              } else items?.[0]?.focus();
              break;
            }

            if (e.shiftKey) {
              const { prev, openTrigger } = this.getState();
              if (openTrigger) {
                if (prev === -1) {
                  closeAllDropdowns();
                } else {
                  e.preventDefault();
                  this.focusPrev({ focus: 'last' });
                }
              }
            }
            break;
          }
          case 'Escape': {
            closeAllDropdowns();
            const activePopup = document.querySelector(selectors.activePopup);
            if (newNav && !activePopup) {
              const toggle = document.querySelector('header.new-nav .feds-toggle');
              toggle?.click();
              toggle?.focus();
            }
            break;
          }
          case 'ArrowLeft': {
            if (newNav) break;
            const { next, prev } = this.getState();
            if (document.dir !== 'rtl') {
              if (prev === -1) break;
              this.focusPrev({ focus: null });
            } else {
              if (next === -1) break;
              this.focusNext({ focus: null });
            }
            break;
          }
          case 'ArrowUp': {
            if (newNav) break;
            e.preventDefault();
            e.stopPropagation();
            this.focusPrev({ focus: 'last' });
            break;
          }
          case 'ArrowRight': {
            if (newNav) break;
            const { next, prev, openTrigger } = this.getState();
            if (document.dir !== 'rtl') {
              if (next === -1) break;
              this.focusNext();
            } else {
              if (prev === -1) break;
              this.focusPrev({ focus: null });
            }
            if (openTrigger) {
              this.open();
            }
            break;
          }
          case 'ArrowDown': {
            if (newNav) break;
            e.stopPropagation();
            e.preventDefault();
            const { items, curr } = this.getState();
            if (items[curr] && items[curr].hasAttribute('aria-haspopup')) {
              this.open({ focus: 'first' });
              return;
            }
            this.focusNext();
            break;
          }
          default:
            break;
        }
      }, `mainNav key failed ${e.code}`, 'gnav-keyboard', 'error'));
  }

  getState = () => {
    const items = [...document.querySelectorAll(selectors.mainNavItems)];
    const openTrigger = document.querySelector(selectors.expandedPopupTrigger);
    const currentEl = document.activeElement
      .closest(selectors.navItem)
      ?.querySelector(selectors.mainNavItems);
    const curr = items.findIndex((el) => el === currentEl);
    return {
      items,
      curr,
      prev: getPreviousVisibleItemPosition(curr, items),
      next: getNextVisibleItemPosition(curr, items),
      openTrigger,
    };
  };

  focusCurr = () => {
    const { items, curr } = this.getState();
    items[curr].focus();
  };

  focusPrev = ({ focus } = {}) => {
    const { items, prev } = this.getState();
    const open = document.querySelector(selectors.expandedPopupTrigger);
    closeAllDropdowns();
    if (prev === -1) return;
    items[prev].focus();
    if (open) {
      this.open({ focus });
    }
  };

  focusNext = () => {
    const { items, next } = this.getState();
    if (next === -1) return;
    closeAllDropdowns();
    items[next].focus();
  };

  open = ({ focus, triggerEl, e } = {}) => {
    const { items, curr } = this.getState();
    const triggerElement = triggerEl || items[curr];
    if (!triggerElement || !triggerElement.hasAttribute('aria-haspopup')) return;
    if (e) e.preventDefault();
    if (triggerElement.getAttribute('aria-expanded') === 'false') {
      trigger({ element: triggerElement });
    }
    const navItem = triggerElement.parentElement;
    const popupEl = navItem.querySelector(selectors.popup);
    if (popupEl) {
      if (this.desktop.matches) {
        this.popup.open({ focus });
      } else {
        this.mobilePopup.open({ focus });
      }
      return;
    }

    // We need to wait for the popup to be added to the DOM before we can open it.
    const observer = new MutationObserver(() => {
      observer.disconnect();
      if (this.desktop.matches) {
        this.popup.open({ focus });
      } else {
        this.mobilePopup.open({ focus });
      }
    });
    observer.observe(navItem, { childList: true });
  };
}

export default MainNavItem;
