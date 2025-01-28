import { expect } from '@esm-bundle/chai/esm/chai.js';
import { readFile, sendKeys, setViewport } from '@web/test-runner-commands';
import { loadStyle } from '../../../../libs/utils/utils.js';
import KeyboardNavigation from '../../../../libs/blocks/global-navigation/utilities/keyboard/index.js';
import { selectors } from '../../../../libs/blocks/global-navigation/utilities/keyboard/utils.js';

const isOpen = (element) => element.getAttribute('aria-expanded') === 'true'
  && element.hasAttribute('daa-lh', 'header|Close');
const isClosed = (element) => element.getAttribute('aria-expanded') === 'false'
  && element.hasAttribute('daa-lh', 'header|Open');
const getPopup = (element) => element.parentElement.querySelector(selectors.popup);
const getNavLinks = (trigger) => [...getPopup(trigger).querySelectorAll(`${selectors.navLink}, ${selectors.promoLink}, ${selectors.imagePromo}`)];
let mainNavItems;
let keyboardNavigation;
const loadStyles = (path) => new Promise((resolve) => {
  loadStyle(`../../../../libs/${path}`, resolve);
});

describe('mobile', () => {
  before(async () => {
    await Promise.all([
      loadStyles('styles/styles.css'),
      loadStyles('blocks/global-footer/global-footer.css'),
      loadStyles('blocks/global-navigation/base.css'),
      loadStyles('blocks/global-navigation/global-navigation.css'),
      loadStyles('blocks/global-navigation/features/search/gnav-search.css'),
      loadStyles('blocks/global-navigation/features/profile/dropdown.css'),
      loadStyles('blocks/global-navigation/utilities/menu/menu.css'),
    ]);
  });
  let navLinks;
  let trigger;
  let triggerTwo;
  let firstPopupItem;
  beforeEach(async () => {
    document.dir = 'ltr';
    setViewport({ width: 600, height: 600 });
    document.body.innerHTML = await readFile({ path: './mocks/global-nav-mobile.html' });
    keyboardNavigation = new KeyboardNavigation();
    mainNavItems = [...document.querySelectorAll(selectors.mainNavItems)];
    keyboardNavigation.mainNav.popup.desktop = { matches: false };
    [trigger, triggerTwo] = mainNavItems;
    trigger.focus();
    keyboardNavigation.mainNav.open();
    navLinks = getNavLinks(trigger);
    [firstPopupItem] = navLinks;
    firstPopupItem.focus();
  });
  describe('Shift+Tab', () => {
    it('shifts focus backwards', async () => {
      navLinks[1].focus();
      await sendKeys({ down: 'Shift' });
      await sendKeys({ press: 'Tab' });
      await sendKeys({ up: 'Shift' });
      expect(document.activeElement).to.equal(navLinks[0]);
      // further to the trigger from the first popup item
      await sendKeys({ down: 'Shift' });
      await sendKeys({ press: 'Tab' });
      await sendKeys({ up: 'Shift' });
      expect(document.activeElement).to.equal(trigger);
      // further to the search from the trigger
      await sendKeys({ down: 'Shift' });
      await sendKeys({ press: 'Tab' });
      await sendKeys({ up: 'Shift' });
      expect(document.activeElement.classList[0]).to.equal('feds-search-input');
    });
  });
  describe('Shift', () => {
    it('shifts focus to the next item', async () => {
      await sendKeys({ press: 'Tab' });
      expect(document.activeElement).to.equal(navLinks[1]);
    });
    it('shifts focus from the last popup item, to the next trigger', async () => {
      const section = navLinks[navLinks.length - 2].closest(selectors.section);
      const headline = section.querySelector(selectors.headline);
      headline.setAttribute('aria-expanded', true);
      navLinks[navLinks.length - 2].focus();
      await sendKeys({ press: 'Tab' });
      expect(document.activeElement).to.equal(triggerTwo);
    });
    it('shifts focus to the next item if it is not a popup', async () => {
      triggerTwo.focus();
      keyboardNavigation.mainNav.open();
      const navLinksTwo = getNavLinks(triggerTwo);
      navLinksTwo[navLinksTwo.length - 1].focus();
      await sendKeys({ press: 'Tab' });
      expect(document.activeElement.innerText).to.equal('Primary');
    });
    it('opens a headline', async () => {
      await sendKeys({ press: 'Tab' });
      await sendKeys({ press: 'Tab' });
      expect(document.activeElement.innerText).to.equal('first-column-second-section-first-item');
      const section = document.activeElement.closest(selectors.section);
      const headline = section.querySelector(selectors.headline);
      expect(headline.getAttribute('aria-expanded')).to.equal('true');
    });
  });
  describe('ArrowRight', () => {
    it('shifts focus to the next section', async () => {
      expect(document.activeElement.innerText).to.equal('first-column-first-section-first-item');
      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement.innerText).to.equal('first-column-second-section-first-item');
      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement.innerText).to.equal('second-column-first-section-first-item');
    });
    it('shifts focus from the last popup item to the next trigger', async () => {
      const section = navLinks[navLinks.length - 2].closest(selectors.section);
      const headline = section.querySelector(selectors.headline);
      headline.setAttribute('aria-expanded', true);
      navLinks[navLinks.length - 2].focus();
      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement).to.equal(triggerTwo);
    });
    it('shifts focus to the previous section', async () => {
      document.dir = 'rtl';
      await sendKeys({ press: 'ArrowLeft' });
      await sendKeys({ press: 'ArrowLeft' });
      expect(document.activeElement.innerText).to.equal('second-column-first-section-first-item');
      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement.innerText).to.equal('first-column-second-section-first-item');
      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement).to.equal(trigger);
    });
    it('shifts focus from the first popup item back to the trigger', async () => {
      document.dir = 'rtl';
      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement).to.equal(trigger);
    });
    it('shifts focus from the second popup item back to the trigger', async () => {
      document.dir = 'rtl';
      triggerTwo.focus();
      keyboardNavigation.mainNav.open();
      const navLinksTwo = getNavLinks(triggerTwo);
      navLinksTwo[1].focus();
      await sendKeys({ press: 'ArrowRight' });
      expect(document.activeElement).to.equal(triggerTwo);
    });
  });
  describe('ArrowLeft', () => {
    it('shifts focus from the first popup item back to the trigger', async () => {
      await sendKeys({ press: 'ArrowLeft' });
      expect(document.activeElement).to.equal(trigger);
    });
    it('shifts focus from the second popup item back to the trigger', async () => {
      triggerTwo.focus();
      keyboardNavigation.mainNav.open();
      const navLinksTwo = getNavLinks(triggerTwo);
      navLinksTwo[1].focus();
      await sendKeys({ press: 'ArrowLeft' });
      expect(document.activeElement).to.equal(triggerTwo);
    });
    it('shifts focus to the next section', async () => {
      document.dir = 'rtl';
      expect(document.activeElement.innerText).to.equal('first-column-first-section-first-item');
      await sendKeys({ press: 'ArrowLeft' });
      expect(document.activeElement.innerText).to.equal('first-column-second-section-first-item');
      await sendKeys({ press: 'ArrowLeft' });
      expect(document.activeElement.innerText).to.equal('second-column-first-section-first-item');
    });
    it('shifts focus from the last popup item to the next trigger', async () => {
      document.dir = 'rtl';
      const section = navLinks[navLinks.length - 2].closest(selectors.section);
      const headline = section.querySelector(selectors.headline);
      headline.setAttribute('aria-expanded', true);
      navLinks[navLinks.length - 2].focus();
      await sendKeys({ press: 'ArrowLeft' });
      expect(document.activeElement).to.equal(triggerTwo);
    });
  });
  describe('ArrowUp', () => {
    it('shifts focus from the first popup item back to the trigger', async () => {
      await sendKeys({ press: 'ArrowUp' });
      expect(document.activeElement).to.equal(trigger);
    });
    it('focusses the previous item', async () => {
      navLinks[1].focus();
      await sendKeys({ press: 'ArrowUp' });
      expect(document.activeElement).to.equal(navLinks[0]);
    });
    it('coming from trigger two, it will focus the last popup item of trigger one', async () => {
      triggerTwo.focus();
      keyboardNavigation.mainNav.open();
      await sendKeys({ press: 'ArrowUp' });
      expect(document.activeElement.innerText).to.equal('first-column-second-section-last-item');
    });
  });
  describe('ArrowDown', () => {
    it('shifts focus to the next item', async () => {
      await sendKeys({ press: 'ArrowDown' });
      expect(document.activeElement).to.equal(navLinks[1]);
    });
    it('shifts focus from the last popup item, to the next trigger', async () => {
      const section = navLinks[navLinks.length - 2].closest(selectors.section);
      const headline = section.querySelector(selectors.headline);
      headline.setAttribute('aria-expanded', true);
      navLinks[navLinks.length - 2].focus();
      await sendKeys({ press: 'ArrowDown' });
      expect(document.activeElement).to.equal(triggerTwo);
    });
    it('shifts focus to the next item if it is not a popup', async () => {
      triggerTwo.focus();
      keyboardNavigation.mainNav.open();
      const navLinksTwo = getNavLinks(triggerTwo);
      navLinksTwo[navLinksTwo.length - 1].focus();
      await sendKeys({ press: 'ArrowDown' });
      expect(document.activeElement.innerText).to.equal('Primary');
    });
  });
  describe('Space', () => {
    it.skip('opens a popup', async () => {
      trigger.focus();
      await sendKeys({ press: 'Space' });
      expect(trigger.attributes['aria-expanded'].value).to.equal('false');
      await sendKeys({ press: 'Space' });
      expect(trigger.attributes['aria-expanded'].value).to.equal('true');
    });
    it('emits a click event on links and CTAs', (done) => {
      firstPopupItem.addEventListener('click', (e) => {
        e.preventDefault();
        done();
      });
      sendKeys({ press: 'Space' });
    });
  });
  describe('Enter', () => {
    it.skip('opens a popup', async () => {
      trigger.focus();
      await sendKeys({ press: 'Enter' });
      expect(trigger.attributes['aria-expanded'].value).to.equal('false');
      await sendKeys({ press: 'Enter' });
      expect(trigger.attributes['aria-expanded'].value).to.equal('true');
    });
    it('emits a click event on links and CTAs', (done) => {
      firstPopupItem.addEventListener('click', (e) => {
        e.preventDefault();
        done();
      });
      sendKeys({ press: 'Enter' });
    });
  });
  describe('Escape', async () => {
    it('closes the popup', async () => {
      expect(isOpen(trigger)).to.equal(true);
      await sendKeys({ press: 'Escape' });
      expect(isClosed(trigger)).to.equal(true);
    });
  });
});
