/* eslint-disable import/no-named-as-default-member */
import { expect } from 'chai';
import { html, render } from '../../../../../libs/deps/htm-preact.js';
import { mockFetch } from '../../../../helpers/generalHelpers.js';
import {
  config,
  updateItem,
  checkImageSize,
  findItem,
  checkLCP,
  checkFragments,
  checkPlaceholders,
  checkForPersonalization,
  conditionalItemUpdate,
  checkVideosWithoutPosterAttribute,
  checkForSingleBlock,
  PerformanceItem,
  createPerformanceItem,
  Panel,
} from '../../../../../libs/blocks/preflight/panels/performance.js';

const icons = {
  pass: 'green',
  fail: 'red',
  empty: 'empty',
};
const defaultItems = [...config.items.value];
describe('Preflight performance', () => {
  const { fetch } = window;

  afterEach(() => {
    document.body.innerHTML = '';
    document.head.innerHTML = '';
    window.fetch = fetch;
    config.lcp = null;
    config.cls = 0;
    config.items.value = defaultItems;
  });

  describe('updateItem', () => {
    it('updates an item', () => {
      const item = { key: 'lcpEl', description: 'foo-desc', icon: 'foo-icon', title: 'foo-title' };
      updateItem(item);
      Object.keys(item).forEach((key) => expect(findItem('lcpEl')[key]).to.equal(item[key]));
      const updatedItem = { key: 'lcpEl', description: 'foo-desc-update', icon: 'foo-icon-update', title: 'foo-title-update' };
      updateItem(updatedItem);
      Object.keys(updatedItem).forEach((key) => expect(findItem('lcpEl')[key]).to.equal(updatedItem[key]));
    });

    it('updating keeps unrelated items unchanged', () => {
      const unchangedItem = { key: 'unchangedItem', description: 'foo-desc', icon: 'foo-icon', title: 'foo-title' };
      const baseItem = { key: 'lcpEl', description: 'foo-desc' };
      config.items.value = [
        unchangedItem,
        baseItem,
      ];
      updateItem({ ...baseItem, description: 'foo-desc-update' });
      Object.keys(unchangedItem).forEach((key) => expect(findItem('unchangedItem')[key]).to.equal(unchangedItem[key]));
    });

    it('does not update non-existant items', () => {
      config.items.value = [{ key: 'lcpEl' }];
      updateItem({ key: 'new-item', description: 'new-desc' });
      expect(config.items.value.length).to.equal(1);
      expect(config.items.value[0].key).to.equal('lcpEl');
    });
  });

  describe('findItem', () => {
    it('finds an item', () => {
      const item = { key: 'lcpEl', description: 'foo-desc', icon: 'foo-icon', title: 'foo-title' };
      config.items.value = [item];
      Object.keys(item).forEach((key) => expect(findItem('lcpEl')[key]).to.equal(item[key]));
    });

    it('returns undefined if the item does not exist', () => {
      config.items.value = [];
      expect(findItem('lcpEl')).to.be.undefined;
    });
  });

  describe('conditionalItemUpdate', () => {
    it('updates an item, if the condition isnt met', () => {
      updateItem({ key: 'lcpEl', icon: icons.empty });
      conditionalItemUpdate({ failsWhen: false, key: 'lcpEl' });
      expect(findItem('lcpEl').icon).to.equal(icons.pass);
    });

    it('does not update an item if the condition is met', () => {
      updateItem({ key: 'lcpEl', icon: icons.empty });
      conditionalItemUpdate({ failsWhen: true, key: 'lcpEl' });
      expect(findItem('lcpEl').icon).to.equal(icons.fail);
    });
  });

  describe('Check image sizes', () => {
    it('shows an empty field if there is no LCP image', async () => {
      await checkImageSize();
      expect(findItem('imageSize').icon).to.equal(icons.empty);
    });

    it('Checks if an image is below 100 kb', async () => {
      config.lcp = { url: 'https://adobe.com/foo.jpg' };
      window.fetch = mockFetch({ payload: { size: 200 } });
      await checkImageSize();
      expect(findItem('imageSize').icon).to.equal(icons.pass);
    });

    it('Checks if an image is >100 kb', async () => {
      config.lcp = { url: 'https://example.com/foo.jpg' };
      window.fetch = mockFetch({ payload: { size: 200000 } });
      await checkImageSize();
      expect(findItem('imageSize').icon).to.equal(icons.fail);
    });
  });

  describe('Check if there is an LCP element', () => {
    it('fails if there is no LCP element', async () => {
      await checkLCP();
      expect(findItem('lcpEl').icon).to.equal(icons.fail);
    });

    it('fails if the LCP element is in the second section', async () => {
      document.body.innerHTML = '<main><div class="section"></div><div class="section"><img src=""></img></div></main>';
      config.lcp = {
        element: document.querySelector('img'),
        url: 'https://adobe.com/foo.jpg',
      };
      await checkLCP();
      expect(findItem('lcpEl').icon).to.equal(icons.fail);
    });

    it('succeeds if the LCP element is in the first section', async () => {
      document.body.innerHTML = '<main><div class="section"><img src=""></img></div></main>';
      config.lcp = {
        element: document.querySelector('img'),
        url: 'https://adobe.com/foo.jpg',
      };
      await checkLCP();
      expect(findItem('lcpEl').icon).to.equal(icons.pass);
    });
  });

  describe('Checking for fragments', () => {
    it('fails if there are fragments', async () => {
      document.body.innerHTML = '<main><div class="section"><div class="fragment"><img src="#fragment"></img></div></div></main>';
      config.lcp = { element: document.querySelector('img') };
      checkFragments();
      expect(findItem('fragments').icon).to.equal(icons.fail);
    });

    it('fails if there (inline) are fragments', async () => {
      document.body.innerHTML = '<main><div class="section"><div data-path="/fragments/marquee"><img src="#fragment"></img></div></div></main>';
      config.lcp = { element: document.querySelector('img') };
      checkFragments();
      expect(findItem('fragments').icon).to.equal(icons.fail);
    });

    it('succeeds if there are no fragments', async () => {
      document.body.innerHTML = '<main><div class="section"><div><img src="#fragment"></img></div></div></main>';
      config.lcp = { element: document.querySelector('img') };
      checkFragments();
      expect(findItem('fragments').icon).to.equal(icons.pass);
    });
  });

  describe('Checking for placeholders', () => {
    it('succeeds if there are no placeholders', async () => {
      document.body.innerHTML = '<main><div class="section"></div></main>';
      config.lcp = { element: document.querySelector('.section') };
      checkPlaceholders();
      expect(findItem('placeholders').icon).to.equal(icons.pass);
    });

    it('fails if there are placeholders', async () => {
      document.body.innerHTML = '<main><div class="section" data-has-placeholders="true"></div></main>';
      config.lcp = { element: document.querySelector('.section') };
      checkPlaceholders();
      expect(findItem('placeholders').icon).to.equal(icons.fail);
    });
  });

  describe('Checking for personalization', () => {
    it('fails if there is personalization', async () => {
      document.head.innerHTML = '<meta name="personalization" content="mep-fragment">';
      checkForPersonalization();
      expect(findItem('personalization').icon).to.equal(icons.fail);
    });

    it('fails if there is target', async () => {
      document.head.innerHTML = '<meta name="target" content="on">';
      checkForPersonalization();
      expect(findItem('personalization').icon).to.equal(icons.fail);
    });

    it('succeeds if there is no personalization', async () => {
      document.head.innerHTML = '<meta name="target" content="off">';
      checkForPersonalization();
      expect(findItem('personalization').icon).to.equal(icons.pass);
    });
  });

  describe('Check for video without poster attribute', () => {
    it('stays empty if there are no videos', async () => {
      document.body.innerHTML = '<main><div class="marquee"><img></img></div></main>';
      config.lcp = {
        element: document.querySelector('img'),
        url: 'https://adobe.com/media_.png',
      };
      checkVideosWithoutPosterAttribute();
      expect(findItem('videoPoster').icon).to.equal(icons.empty);
    });

    it('fails if there are videos without poster attribute', async () => {
      document.body.innerHTML = '<main><div class="marquee"><video></video></div></main>';
      config.lcp = {
        element: document.querySelector('video'),
        url: 'https://adobe.com/media_.mp4',
      };
      checkVideosWithoutPosterAttribute();
      expect(findItem('videoPoster').icon).to.equal(icons.fail);
    });

    it('succeeds if there are videos with poster attribute', async () => {
      document.body.innerHTML = '<main><div class="marquee"><video poster="/test/utils/mocks/media_.png"></video></div></main>';
      config.lcp = {
        element: document.querySelector('video'),
        url: 'https://adobe.com/media_.mp4',
      };
      checkVideosWithoutPosterAttribute();
      expect(findItem('videoPoster').icon).to.equal(icons.pass);
    });
  });

  describe('Check for multiple elements in the first section', () => {
    it('fails if there are multiple elements', async () => {
      document.body.innerHTML = '<main><div class="section"><div></div><div></div></div></main>';
      checkForSingleBlock();
      expect(findItem('singleBlock').icon).to.equal(icons.fail);
    });

    it('succeeds if there is only one element', async () => {
      document.body.innerHTML = '<main><div class="section"><div></div></div></main>';
      checkForSingleBlock();
      expect(findItem('singleBlock').icon).to.equal(icons.pass);
    });
  });

  describe('PerformanceItem', () => {
    it('renders an item', () => {
      const item = html`<${PerformanceItem} icon="foo-icon" title="foo-title" description="foo-desc" />`;
      render(item, document.body);
      const itemElement = document.querySelector('.preflight-item');
      expect(itemElement).to.exist;
      expect(itemElement.querySelector('.result-icon').classList.contains('foo-icon')).to.be.true;
      expect(itemElement.querySelector('.preflight-item-title').textContent).to.equal('foo-title');
      expect(itemElement.querySelector('.preflight-item-description').textContent).to.equal('foo-desc');
    });
  });

  describe('createPerformanceItem', () => {
    it('creates an item', () => {
      const item = createPerformanceItem({ icon: 'foo-icon', title: 'foo-title', description: 'foo-desc' });
      render(item, document.body);
      const itemElement = document.querySelector('.preflight-item');
      expect(itemElement).to.exist;
      expect(itemElement.querySelector('.result-icon').classList.contains('foo-icon')).to.be.true;
      expect(itemElement.querySelector('.preflight-item-title').textContent).to.equal('foo-title');
      expect(itemElement.querySelector('.preflight-item-description').textContent).to.equal('foo-desc');
    });
  });

  describe('Panel', () => {
    it('renders a panel with all the items', () => {
      const panel = html`<${Panel} />`;
      render(panel, document.body);
      const panelItems = document.querySelectorAll('.preflight-item');
      expect(panelItems.length).to.equal(config.items.value.length);
    });
  });
});
