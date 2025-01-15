/* eslint-disable no-restricted-syntax */
import { expect } from '@esm-bundle/chai';
import { readFile, sendKeys, setViewport } from '@web/test-runner-commands';
import { loadStyle } from '../../../../libs/utils/utils.js';
import KeyboardNavigation from '../../../../libs/blocks/global-navigation/utilities/keyboard/index.js';
import { selectors, isElementVisible, getNextVisibleItemPosition, getPreviousVisibleItemPosition } from '../../../../libs/blocks/global-navigation/utilities/keyboard/utils.js';

const isOpen = (element) => element.getAttribute('aria-expanded') === 'true'
  && element.hasAttribute('daa-lh', 'header|Close');
const isClosed = (element) => element.getAttribute('aria-expanded') === 'false'
  && element.hasAttribute('daa-lh', 'header|Open');
const getPopup = (element) => element.parentElement.querySelector(selectors.popup);
const getNavLinks = (trigger) => [...getPopup(trigger).querySelectorAll(`${selectors.navLink}, ${selectors.promoLink}, ${selectors.imagePromo}`)];
let mainNavItems;
let otherNavItems;
let keyboardNavigation;
let allNavItems;

const loadStyles = (path) => new Promise((resolve) => {
  loadStyle(`../../../../libs/${path}`, resolve);
});

// TODO properly instantiate the whole global nav to get all the event listeners
// disabled tests should then run again.
describe('keyboard navigation', () => {
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

  beforeEach(async () => {
    document.dir = 'ltr';
    setViewport({ width: 1500, height: 1500 });
    document.body.innerHTML = await readFile({ path: './mocks/global-nav.html' });
    keyboardNavigation = new KeyboardNavigation();
    allNavItems = [
      ...document.querySelectorAll(`
     ${selectors.mainNavToggle},
     ${selectors.brand},
     ${selectors.searchTrigger},
     ${selectors.mainNavItems},
     ${selectors.searchField},
     ${selectors.signIn},
     ${selectors.profileButton},
     ${selectors.logo},
     ${selectors.breadCrumbItems}
     `),
    ];
    mainNavItems = [...document.querySelectorAll(selectors.mainNavItems)];
    otherNavItems = [
      ...document.querySelectorAll(`
     ${selectors.mainNavToggle},
     ${selectors.brand},
     ${selectors.searchTrigger},
     ${selectors.searchField},
     ${selectors.signIn},
     ${selectors.profileButton},
     ${selectors.logo},
     ${selectors.breadCrumbItems}
     `),
    ];
    keyboardNavigation.mainNav.popup.desktop = { matches: true };
  });

  describe('mainNav', () => {
    describe('Tab', () => {
      it('shifts focus', async () => {
        await sendKeys({ press: 'Tab' });
        expect(document.activeElement).to.equal(allNavItems[1]);
        await sendKeys({ press: 'Tab' });
        expect(document.activeElement).to.equal(allNavItems[2]);
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        expect(document.activeElement).to.equal(allNavItems[4]);
      });

      it('does not open a popup', async () => {
        const trigger = mainNavItems[0];
        trigger.focus();
        await sendKeys({ press: 'Tab' });
        expect(isClosed(trigger)).to.equal(true);
      });
    });

    describe('Shift+Tab', () => {
      it('goes back on shift tab', async () => {
        allNavItems[6].focus();
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ up: 'Shift' });
        expect(document.activeElement).to.equal(allNavItems[5]);
      });

      it("On the first item, closes the popup if it's open and shifts focus", async () => {
        const trigger = mainNavItems[0];
        trigger.focus();
        keyboardNavigation.mainNav.open();
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ up: 'Shift' });
        expect(isClosed(trigger)).to.equal(true);
        expect(document.activeElement).to.equal(allNavItems[1]);
      });
    });

    describe('ArrowRight', () => {
      it('shifts focus', async () => {
        mainNavItems[0].focus();
        for await (const element of mainNavItems) {
          expect(document.activeElement).to.equal(element);
          await sendKeys({ press: 'ArrowRight' });
          expect(element.attributes['aria-expanded']?.value || 'false').to.equal('false');
        }
        // does not go further to the right on the last element
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement).to.equal(mainNavItems[mainNavItems.length - 1]);
      });

      it('shifts focus with rtl', async () => {
        document.dir = 'rtl';
        mainNavItems[mainNavItems.length - 1].focus();
        const reversedMainNavItems = mainNavItems
          .slice()
          .reverse();
        for await (const element of reversedMainNavItems) {
          expect(document.activeElement).to.equal(element);
          await sendKeys({ press: 'ArrowRight' });
          expect(element.attributes['aria-expanded']?.value || 'false').to.equal('false');
        }
        // does not go further to the left on the first element
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement).to.equal(mainNavItems[0]);
      });

      it('if a popup is open, it opens the next popup', async () => {
        const triggerOne = mainNavItems[0];
        const triggerTwo = mainNavItems[1];
        triggerOne.focus();
        keyboardNavigation.mainNav.open();
        expect(isOpen(triggerOne)).to.equal(true);
        await sendKeys({ press: 'ArrowRight' });
        expect(isClosed(triggerOne)).to.equal(true);
        expect(isOpen(triggerTwo)).to.equal(true);
      });

      it('if a popup is open, but the next link has no popup - it closes the popup', async () => {
        const triggerTwo = mainNavItems[1];
        const triggerPrimaryCTA = mainNavItems[2];
        triggerTwo.focus();
        keyboardNavigation.mainNav.open();
        await sendKeys({ press: 'ArrowRight' });
        expect(isClosed(triggerTwo)).to.equal(true);
        expect(isOpen(triggerPrimaryCTA)).to.equal(false);
      });
    });

    describe('ArrowLeft', () => {
      it('shifts focus', async () => {
        mainNavItems[mainNavItems.length - 1].focus();
        const reversedMainNavItems = mainNavItems
          .slice()
          .reverse();
        for await (const element of reversedMainNavItems) {
          expect(document.activeElement).to.equal(element);
          await sendKeys({ press: 'ArrowLeft' });
          expect(element.attributes['aria-expanded']?.value || 'false').to.equal('false');
        }
        // does not go further to the left on the first element
        await sendKeys({ press: 'ArrowLeft' });
        expect(document.activeElement).to.equal(mainNavItems[0]);
      });

      it('shifts focus with rtl', async () => {
        document.dir = 'rtl';
        mainNavItems[0].focus();
        for await (const element of mainNavItems) {
          expect(document.activeElement).to.equal(element);
          await sendKeys({ press: 'ArrowLeft' });
          expect(element.attributes['aria-expanded']?.value || 'false').to.equal('false');
        }
        // does not go further to the right on the last element
        await sendKeys({ press: 'ArrowLeft' });
        expect(document.activeElement).to.equal(mainNavItems[mainNavItems.length - 1]);
      });

      it('if a popup is open, it opens the previous popup', async () => {
        const triggerOne = mainNavItems[0];
        const triggerTwo = mainNavItems[1];
        triggerTwo.focus();
        keyboardNavigation.mainNav.open();
        expect(isOpen(triggerTwo)).to.equal(true);
        await sendKeys({ press: 'ArrowLeft' });
        expect(isClosed(triggerTwo)).to.equal(true);
        expect(isOpen(triggerOne)).to.equal(true);
      });

      it('if first link has an open popup, it opens', async () => {
        const trigger = mainNavItems[0];
        trigger.focus();
        keyboardNavigation.mainNav.open();
        expect(isOpen(trigger)).to.equal(true);
        await sendKeys({ press: 'ArrowLeft' });
        expect(isOpen(trigger)).to.equal(true);
      });
    });

    describe('ArrowUp', () => {
      it('cycles through', async () => {
        mainNavItems[mainNavItems.length - 1].focus();
        const reversed = mainNavItems
          .slice()
          .reverse();
        for await (const element of reversed) {
          expect(document.activeElement).to.equal(element);
          await sendKeys({ press: 'ArrowUp' });
          expect(
            element.attributes['aria-expanded']?.value || 'false',
          ).to.equal('false');
        }
        // does not go further to the left on the first element
        await sendKeys({ press: 'ArrowUp' });
        expect(document.activeElement).to.equal(mainNavItems[0]);
      });

      it('if first link has an open popup, it closes', async () => {
        const triggerOne = mainNavItems[0];
        triggerOne.focus();
        keyboardNavigation.mainNav.open();
        expect(isOpen(triggerOne)).to.equal(true);
        await sendKeys({ press: 'ArrowUp' });
        expect(isClosed(triggerOne)).to.equal(true);
      });

      it('if second link has an open popup, it opens the previous popup and focusses the last item', async () => {
        const triggerOne = mainNavItems[0];
        const triggerTwo = mainNavItems[1];
        triggerTwo.focus();
        keyboardNavigation.mainNav.open();
        expect(isOpen(triggerTwo)).to.equal(true);
        await sendKeys({ press: 'ArrowUp' });
        expect(isClosed(triggerTwo)).to.equal(true);
        expect(isOpen(triggerOne)).to.equal(true);
        expect(document.activeElement).to.not.equal(triggerOne);

        // focus shifted to last item of the popup
        const navLinks = [
          ...triggerOne.parentElement.querySelectorAll(`
        ${selectors.navLink},
        ${selectors.promoLink},
        ${selectors.imagePromo}
      `),
        ];
        const lastNavLink = navLinks[navLinks.length - 1];
        expect(lastNavLink).to.equal(document.activeElement);
      });
    });

    describe('ArrowDown', () => {
      it('without a popup, focusses the next element', async () => {
        const cta = mainNavItems[2];
        cta.focus();
        await sendKeys({ press: 'ArrowDown' });
        expect(mainNavItems[3]).to.equal(document.activeElement);
      });

      it('last item without popup, does nothing', async () => {
        const cta = mainNavItems[mainNavItems.length - 1];
        cta.focus();
        await sendKeys({ press: 'ArrowDown' });
        expect(cta).to.equal(document.activeElement);
        expect(cta.attributes['aria-expanded']?.value || 'false').to.equal(
          'false',
        );
      });

      it('opens a popup', async () => {
        const trigger = mainNavItems[0];
        trigger.focus();
        await sendKeys({ press: 'ArrowDown' });
        expect(isOpen(trigger)).to.equal(true);
        const navLinks = getNavLinks(trigger);
        const firstPopupItem = navLinks[0];
        expect(firstPopupItem).to.equal(document.activeElement);
      });
    });

    describe('Space', () => {
      it.skip('opens and closes a popup', async () => {
        const trigger = mainNavItems[0];
        trigger.focus();
        await sendKeys({ press: 'Space' });
        expect(isOpen(trigger)).to.equal(true);
        await sendKeys({ press: 'Space' });
        expect(isClosed(trigger)).to.equal(true);
      });

      it('emits a click event on links and CTAs', (done) => {
        const cta = mainNavItems[2];
        cta.focus();
        cta.addEventListener('click', (e) => {
          e.preventDefault();
          done();
        });
        sendKeys({ press: 'Space' });
      });
    });

    describe('Enter', () => {
      it.skip('opens and closes a popup', async () => {
        const trigger = mainNavItems[0];
        trigger.focus();
        await sendKeys({ press: 'Enter' });
        expect(isOpen(trigger)).to.equal(true);
        await sendKeys({ press: 'Enter' });
        expect(isClosed(trigger)).to.equal(true);
      });

      it('emits a click event on links and CTAs', (done) => {
        const cta = mainNavItems[2];
        cta.focus();
        cta.addEventListener('click', (e) => {
          e.preventDefault();
          done();
        });
        sendKeys({ press: 'Enter' });
      });
    });

    describe('Escape', () => {
      it('closes a popup', async () => {
        const trigger = mainNavItems[0];
        trigger.focus();
        keyboardNavigation.mainNav.open();
        expect(isOpen(trigger)).to.equal(true);
        await sendKeys({ press: 'Escape' });
        expect(isClosed(trigger)).to.equal(true);
      });
    });
  });

  describe('navigation that is not mainNav or popup', () => {
    describe('Tab', () => {
      it('cycles through the navigation if the search is open', async () => {
        const search = document.querySelector(selectors.searchTrigger);
        search.setAttribute('aria-expanded', 'true');
        const withoutBreadcrumbs = [
          ...document.querySelectorAll(`
        ${selectors.mainNavToggle},
        ${selectors.brand},
        ${selectors.mainNavItems},
        ${selectors.searchTrigger},
        ${selectors.searchField},
        ${selectors.signIn},
        ${selectors.profileButton},
        ${selectors.logo}
        `),
        ];
        const first = getNextVisibleItemPosition(-1, withoutBreadcrumbs);
        const last = getPreviousVisibleItemPosition(withoutBreadcrumbs.length, withoutBreadcrumbs);

        withoutBreadcrumbs[last].focus();
        await sendKeys({ press: 'Tab' });
        expect(document.activeElement).to.equal(withoutBreadcrumbs[first]);
      });
    });

    describe('Shift + Tab', () => {
      it('cycles through the navigation if the search is open', async () => {
        const search = document.querySelector(selectors.searchTrigger);
        search.setAttribute('aria-expanded', 'true');
        const withoutBreadcrumbs = [
          ...document.querySelectorAll(`
        ${selectors.mainNavToggle},
        ${selectors.brand},
        ${selectors.mainNavItems},
        ${selectors.searchTrigger},
        ${selectors.searchField},
        ${selectors.signIn},
        ${selectors.profileButton},
        ${selectors.logo}
        `),
        ];
        const first = getNextVisibleItemPosition(-1, withoutBreadcrumbs);
        const last = getPreviousVisibleItemPosition(withoutBreadcrumbs.length, withoutBreadcrumbs);

        withoutBreadcrumbs[first].focus();
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ up: 'Shift' });
        expect(document.activeElement).to.equal(withoutBreadcrumbs[last]);
      });
    });

    describe('ArrowRight', () => {
      it('does nothing', async () => {
        for await (const element of otherNavItems) {
          if (isElementVisible(element)) {
            element.focus();
            await sendKeys({ press: 'ArrowRight' });
            expect(document.activeElement).to.equal(element);
          }
        }
      });
    });

    describe('ArrowLeft', () => {
      it('does nothing', async () => {
        for await (const element of otherNavItems) {
          if (isElementVisible(element)) {
            element.focus();
            await sendKeys({ press: 'ArrowLeft' });
            expect(document.activeElement).to.equal(element);
          }
        }
      });
    });

    describe('ArrowUp', () => {
      it('does nothing', async () => {
        for await (const element of otherNavItems) {
          if (isElementVisible(element)) {
            element.focus();
            await sendKeys({ press: 'ArrowUp' });
            expect(document.activeElement).to.equal(element);
          }
        }
      });
    });

    describe('ArrowDown', () => {
      it('nothing', async () => {
        for await (const element of otherNavItems) {
          if (isElementVisible(element)) {
            element.focus();
            await sendKeys({ press: 'ArrowDown' });
            expect(document.activeElement).to.equal(element);
          }
        }
      });
    });

    describe('Space', () => {
      it('emits a click event on links and CTAs', (done) => {
        const search = document.querySelector(selectors.searchTrigger);
        search.focus();
        search.addEventListener('click', (e) => {
          e.preventDefault();
          done();
        });
        sendKeys({ press: 'Space' });
      });
    });

    describe('Enter', () => {
      it('emits a click event on links and CTAs', (done) => {
        const search = document.querySelector(selectors.searchTrigger);
        search.focus();
        search.addEventListener('click', (e) => {
          e.preventDefault();
          done();
        });
        sendKeys({ press: 'Enter' });
      });
    });
  });

  describe('popup', () => {
    let navLinks;
    let trigger;
    let triggerTwo;
    let firstPopupItem;
    beforeEach(async () => {
      [trigger, triggerTwo] = mainNavItems;
      trigger.focus();
      keyboardNavigation.mainNav.open();
      navLinks = getNavLinks(trigger);
      [firstPopupItem] = navLinks;
      firstPopupItem.focus();
    });

    describe('Shift+Tab', () => {
      it('shifts focus to the previous item', async () => {
        navLinks[1].focus();
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ up: 'Shift' });
        expect(document.activeElement).to.equal(navLinks[0]);
      });
      it('shifts focus from the first popup item back to the trigger', async () => {
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ up: 'Shift' });
        expect(document.activeElement).to.equal(trigger);
      });
    });

    describe('Shift', () => {
      it('shifts focus to the next item', async () => {
        await sendKeys({ press: 'Tab' });
        expect(document.activeElement).to.equal(navLinks[1]);
      });

      it('shifts focus from the last popup item, to the next trigger', async () => {
        navLinks[navLinks.length - 1].focus();
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
    });

    describe('ArrowRight', () => {
      it('shifts focus to the next column', async () => {
        expect(document.activeElement.innerText).to.equal('first-column-first-section-first-item');
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement.innerText).to.equal('second-column-first-section-first-item');
      });

      it('shifts focus from the last popup item back to the trigger', async () => {
        navLinks[navLinks.length - 1].focus();
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement).to.equal(trigger);
      });

      it('shifts focus to the previous column on RTL', async () => {
        document.dir = 'rtl';
        await sendKeys({ press: 'ArrowLeft' });
        expect(document.activeElement.innerText).to.equal('second-column-first-section-first-item');
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement.innerText).to.equal('first-column-first-section-first-item');
      });

      it('shifts focus from the first popup item back to the trigger on RTL', async () => {
        document.dir = 'rtl';
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement).to.equal(trigger);
      });

      it('shifts focus from the second popup item back to the trigger on RTL', async () => {
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
      it('shifts focus to the previous column', async () => {
        await sendKeys({ press: 'ArrowRight' });
        expect(document.activeElement.innerText).to.equal('second-column-first-section-first-item');
        await sendKeys({ press: 'ArrowLeft' });
        expect(document.activeElement.innerText).to.equal('first-column-first-section-first-item');
      });

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

      it('shifts focus to the next column on RTL', async () => {
        document.dir = 'rtl';
        expect(document.activeElement.innerText).to.equal('first-column-first-section-first-item');
        await sendKeys({ press: 'ArrowLeft' });
        expect(document.activeElement.innerText).to.equal('second-column-first-section-first-item');
      });

      it('shifts focus from the last popup item back to the trigger on RTL', async () => {
        document.dir = 'rtl';
        navLinks[navLinks.length - 1].focus();
        await sendKeys({ press: 'ArrowLeft' });
        expect(document.activeElement).to.equal(trigger);
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
    });

    describe('ArrowDown', () => {
      it('shifts focus to the next item', async () => {
        await sendKeys({ press: 'ArrowDown' });
        expect(document.activeElement).to.equal(navLinks[1]);
      });

      it('shifts focus from the last popup item, to the next trigger', async () => {
        navLinks[navLinks.length - 1].focus();
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

    describe('Escape', () => {
      it('closes the popup', async () => {
        expect(isOpen(trigger)).to.equal(true);
        await sendKeys({ press: 'Escape' });
        expect(isClosed(trigger)).to.equal(true);
      });
    });

    describe('Enter', () => {
      it('Emits a click event when pressing space', (done) => {
        firstPopupItem.addEventListener('click', (e) => {
          e.preventDefault();
          done();
        });
        sendKeys({ press: 'Enter' });
      });
    });

    describe('Space', () => {
      it('Emits a click event when pressing space', (done) => {
        firstPopupItem.addEventListener('click', (e) => {
          e.preventDefault();
          done();
        });
        sendKeys({ press: 'Space' });
      });
    });
  });

  describe('mobile', () => {
    let navLinks;
    let trigger;
    let triggerTwo;
    let firstPopupItem;
    beforeEach(async () => {
      setViewport({ width: 600, height: 600 });
      document.body.innerHTML = await readFile({ path: './mocks/global-nav-mobile.html' });
      keyboardNavigation = new KeyboardNavigation();
      allNavItems = [
        ...document.querySelectorAll(`
       ${selectors.mainNavToggle},
       ${selectors.brand},
       ${selectors.searchTrigger},
       ${selectors.mainNavItems},
       ${selectors.searchField},
       ${selectors.signIn},
       ${selectors.profileButton},
       ${selectors.logo},
       ${selectors.breadCrumbItems}
       `),
      ];
      mainNavItems = [...document.querySelectorAll(selectors.mainNavItems)];
      otherNavItems = [
        ...document.querySelectorAll(`
       ${selectors.mainNavToggle},
       ${selectors.brand},
       ${selectors.searchTrigger},
       ${selectors.searchField},
       ${selectors.signIn},
       ${selectors.profileButton},
       ${selectors.logo},
       ${selectors.breadCrumbItems}
       `),
      ];
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

  describe('footer', () => {
    it('Shifts focus using Tab', async () => {
      const footerElements = [...document.querySelector(selectors.globalFooter)
        .querySelectorAll(selectors.popupItems)];
      expect(footerElements.length).to.equal(48);

      footerElements[0].focus();
      for await (const element of footerElements) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'Tab' });
      }

      footerElements[footerElements.length - 1].focus();
      for await (const element of [...footerElements].reverse()) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ up: 'Shift' });
      }
    });

    it('Shifts focus using arrow keys', async () => {
      const footerElements = [...document.querySelector(selectors.globalFooter)
        .querySelectorAll(selectors.popupItems)];

      footerElements[0].focus();
      for await (const element of footerElements) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'ArrowDown' });
      }

      footerElements[footerElements.length - 1].focus();
      for await (const element of [...footerElements].reverse()) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'ArrowUp' });
      }
    });

    it('Shifts focus out of the footer', async () => {
      const footerElements = [...document.querySelector(selectors.globalFooter)
        .querySelectorAll(selectors.popupItems)];

      footerElements[0].focus();
      await sendKeys({ down: 'Shift' });
      await sendKeys({ press: 'Tab' });
      await sendKeys({ up: 'Shift' });
      expect(document.activeElement.closest(selectors.globalFooter)).to.equal(null);

      footerElements[footerElements.length - 1].focus();
      await sendKeys({ press: 'Tab' });
      expect(document.activeElement.closest(selectors.globalFooter)).to.equal(null);
    });

    it('Shifts focus through footer sections', async () => {
      const firstSectionItems = [...document.querySelectorAll(`${selectors.globalFooter} ${selectors.column} ${selectors.section}:first-of-type li:first-of-type > a`)];
      firstSectionItems[0].focus();
      for await (const element of firstSectionItems) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'ArrowRight' });
      }

      firstSectionItems[firstSectionItems.length - 1].focus();
      for await (const element of firstSectionItems.reverse()) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'ArrowLeft' });
      }
    });

    // we have a lot of individual tests for the popup
    // so this is just a sanity check to make sure the footer keyboard nav is working
    it('Opens headlines on mobile', async () => {
      // setup mobile and close navigation
      setViewport({ width: 600, height: 600 });
      document.body.innerHTML = await readFile({ path: './mocks/global-nav-mobile.html' });
      keyboardNavigation = new KeyboardNavigation();
      [...document.querySelectorAll('.is-open')].forEach((el) => {
        el.classList.remove('is-open');
      });
      const footerElements = [...document.querySelector(selectors.globalFooter)
        .querySelectorAll(selectors.popupItems)]
        .filter((el) => isElementVisible(el));

      document
        .querySelector(`${selectors.globalFooter} ${selectors.headline}`)
        .setAttribute('aria-expanded', true);

      footerElements[0].focus();
      for await (const element of footerElements) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'Tab' });
      }

      footerElements[footerElements.length - 1].focus();
      for await (const element of [...footerElements].reverse()) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ up: 'Shift' });
      }

      const firstSectionItems = [...document.querySelectorAll(`${selectors.globalFooter} ${selectors.column} ${selectors.section} li:first-of-type > a`)];
      firstSectionItems[0].focus();
      for await (const element of firstSectionItems) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'ArrowRight' });
      }

      firstSectionItems[firstSectionItems.length - 1].focus();
      for await (const element of firstSectionItems.reverse()) {
        expect(document.activeElement).to.equal(element);
        await sendKeys({ press: 'ArrowLeft' });
      }
    });
  });

  describe('new mobile GNAV redesign', () => {
    describe('Without localnav', () => {
      beforeEach(async () => {
        setViewport({ width: 600, height: 600 });
        document.body.innerHTML = await readFile({ path: './mocks/global-new-nav-mobile.html' });
        keyboardNavigation = new KeyboardNavigation();
        keyboardNavigation.mainNav.popup.desktop = { matches: false };
      });

      it('shift focus on tab for links on level 1 screen', async () => {
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        const allMainMenuLinks = document.querySelectorAll('.feds-nav section > button');
        expect(document.activeElement).to.equal(allMainMenuLinks[2]);
      });

      it('shift focus on Escape to trigger element', async () => {
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Escape' });
        const toggle = document.querySelector('header.new-nav .feds-toggle');
        expect(document.activeElement).to.equal(toggle);
      });
    });

    describe('With localnav', () => {
      beforeEach(async () => {
        setViewport({ width: 600, height: 600 });
        document.body.innerHTML = await readFile({ path: './mocks/global-new-nav-mobile-localnav.html' });
        keyboardNavigation = new KeyboardNavigation(true);
        keyboardNavigation.mainNav.popup.desktop = { matches: false };
      });

      it('shift focus on tab for links on level 2 screen', async () => {
        const firstTab = document.querySelector('header .feds-nav .tabs .tab');
        firstTab.focus();
        const allNavLinks = document.querySelectorAll('header .feds-nav section .feds-popup .tab-content > div:not([hidden="true"]) .feds-navLink');
        await sendKeys({ press: 'Tab' });
        expect(document.activeElement).to.equal(allNavLinks[0]);
      });

      it('shift focus on Escape to trigger element', async () => {
        const firstTab = document.querySelector('header .feds-nav .tabs .tab');
        firstTab.focus();
        await sendKeys({ press: 'Escape' });
        const toggle = document.querySelector('header.new-nav .feds-toggle');
        expect(document.activeElement).to.equal(toggle);
      });
    });

    describe('Local Nav keyboard navigation', () => {
      beforeEach(async () => {
        setViewport({ width: 600, height: 600 });
        document.body.innerHTML = await readFile({ path: './mocks/localnav-mock.html' });
        keyboardNavigation = new KeyboardNavigation(true);
        keyboardNavigation.mainNav.popup.desktop = { matches: false };
      });

      it('Should open the section on Space', async () => {
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Space' });
        const headline = document.querySelector('.feds-localnav .feds-menu-headline');
        expect(document.activeElement).to.equal(headline);
      });

      it('Should focus back to localnav title after navigating to all the visible links of local nav', async () => {
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        const localnavTitle = document.querySelector('.feds-localnav-title');
        expect(document.activeElement).to.equal(localnavTitle);
      });
      it('closes when escape is pressed', async () => {
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Tab' });
        await sendKeys({ press: 'Space' });
        await sendKeys({ press: 'Escape' });
        expect(document.querySelector('feds-localnav--active')).to.not.exist;
      });
    });
  });
});
