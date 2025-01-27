import { readFile, sendKeys, setViewport } from '@web/test-runner-commands';
import { expect } from 'chai';
import { delay } from '../../helpers/waitfor.js';
import { loadStyle } from '../../../libs/utils/utils.js';

const DESKTOP_WIDTH = 1200;
const MOBILE_WIDTH = 375;
const HEIGHT = 1500;

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init, getRedirectionUrl, assignLinkedTabs } = await import('../../../libs/blocks/tabs/tabs.js');
loadStyle('../../../libs/blocks/tabs/tabs.css');

describe('tabs', () => {
  const allTabs = document.querySelectorAll('.tabs');
  allTabs.forEach((tabs) => {
    init(tabs);
  });
  describe('default tabs', () => {
    it('has a tabList', () => {
      const tablist = allTabs[0].querySelector('div[role="tablist"]');
      expect(tablist).to.exist;
    });
  });

  it('clicks on a tabList button', async () => {
    const unSelectedBtn = allTabs[0].querySelector('div[role="tablist"] button[aria-selected="false"]');
    unSelectedBtn.click();
    expect(unSelectedBtn.ariaSelected).to.equal('true');
  });

  it('focus on tabList button, ArrowRight key to next tab and Enter key to select aria', async () => {
    const unSelectedBtn1 = allTabs[1].querySelector('div[role="tablist"] button[aria-selected="false"]');
    const unSelectedBtn2 = allTabs[2].querySelector('div[role="tablist"] button[aria-selected="false"]');
    unSelectedBtn1.focus();
    await sendKeys({ down: 'ArrowRight' });
    await sendKeys({ press: 'Enter' });
    expect(unSelectedBtn1.ariaSelected).to.equal('true');

    unSelectedBtn2.focus();
    await sendKeys({ down: 'ArrowLeft' });
    await sendKeys({ press: 'Space' });
    expect(unSelectedBtn2.ariaSelected).to.equal('false');
  });

  it('disables paddles when tabList is not scrollable', async () => {
    setViewport({ width: DESKTOP_WIDTH, height: HEIGHT });
    window.dispatchEvent(new Event('resize'));
    await delay(200);
    const leftPaddle = allTabs[0].querySelector('.paddle-left');
    const rightPaddle = allTabs[0].querySelector('.paddle-right');

    expect(leftPaddle.getAttribute('disabled')).to.equal('');
    expect(rightPaddle.getAttribute('disabled')).to.equal('');
  });

  it('right paddle is visible when tabList is scrollable', async () => {
    setViewport({ width: MOBILE_WIDTH, height: HEIGHT });
    window.dispatchEvent(new Event('resize'));
    const rightPaddle = allTabs[0].querySelector('.paddle-right');

    expect(rightPaddle.getAttribute('disabled')).to.equal('');
  });

  it('right paddle scrolls tabList', async () => {
    setViewport({ width: MOBILE_WIDTH, height: HEIGHT });
    window.innerWidth = MOBILE_WIDTH;
    window.dispatchEvent(new Event('resize'));
    const tabList = allTabs[3].querySelector('[role="tablist"]');
    const rightPaddle = allTabs[3].querySelector('.paddle-right');
    tabList.scrollLeft = 0;
    await delay(200);

    expect(tabList.scrollLeft).to.equal(0);
    expect(rightPaddle.getAttribute('disabled')).to.equal(null);
    rightPaddle.click();
    await delay(300);

    expect(tabList.scrollLeft).to.not.equal(0);
  });

  it('left paddle scrolls tabList', async () => {
    setViewport({ width: MOBILE_WIDTH, height: HEIGHT });
    window.innerWidth = MOBILE_WIDTH;
    window.dispatchEvent(new Event('resize'));
    const tabList = allTabs[3].querySelector('[role="tablist"]');
    const leftPaddle = allTabs[3].querySelector('.paddle-left');
    await delay(200);

    expect(tabList.scrollLeft).to.not.equal(0);
    expect(leftPaddle.getAttribute('disabled')).to.equal(null);
    leftPaddle.click();
    await delay(300);

    expect(tabList.scrollLeft).to.equal(0);
  });

  describe('stacked mobile variant', () => {
    it('scrolls the window to the selected tab content', async () => {
      setViewport({ width: MOBILE_WIDTH, height: HEIGHT });
      window.dispatchEvent(new Event('resize'));
      const oldPosition = window.scrollY;
      document.querySelector('#stacked-mobile .tabList button').click();
      await delay(50);
      const newPosition = window.scrollY;
      expect(newPosition).to.be.above(oldPosition);
    });
  });

  describe('Tabs linked to pages', () => {
    it('returns an empty string when targetId or linked page are not valid', () => {
      expect(getRedirectionUrl({ 'tab-1': '/testpage-1' }, '')).to.equal('');
      expect(getRedirectionUrl({ 'tab-1': '/testpage-1' }, 'id-without-linked-page')).to.equal('');
    });

    it('replaces window.location.pathname with the linked page url', () => {
      const url = getRedirectionUrl({ 'tab-1': '/testpage-1' }, 'tab-1');
      expect(url.pathname).to.equal('/testpage-1');
    });

    it('does not save any data to linkedTabs object if invalid input', () => {
      const linkedTabsList = {};
      assignLinkedTabs(linkedTabsList, {}, '', '');
      expect(linkedTabsList).to.deep.equal({});
      assignLinkedTabs(linkedTabsList, { link: '/testpage' }, '', '');
      expect(linkedTabsList).to.deep.equal({});
      assignLinkedTabs(linkedTabsList, { link: '/testpage' }, 'id', '');
      expect(linkedTabsList).to.deep.equal({});
      assignLinkedTabs(linkedTabsList, { link: 'invalid link' }, 'id', 'val');
      expect(linkedTabsList).to.deep.equal({});
    });

    it('saves tab id and tab link into linkedTabs object', () => {
      const linkedTabsList = {};
      const metaSettings = { link: '/testpage-1' };
      const id = '1';
      const val = 'demo';
      assignLinkedTabs(linkedTabsList, metaSettings, id, val);
      expect(linkedTabsList).to.deep.equal({ 'tab-1-demo': '/testpage-1' });
    });
  });
});
