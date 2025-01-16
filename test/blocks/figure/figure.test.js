import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { setConfig } from '../../../libs/utils/utils.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const ogDocument = document.body.innerHTML;
const { default: init } = await import('../../../libs/blocks/figure/figure.js');
setConfig({});

describe('init', () => {
  afterEach(() => {
    document.body.innerHTML = ogDocument;
  });

  const sections = document.querySelectorAll('.section');

  it('should add the correct classes to the block element when multiple pictures are present', () => {
    const blockEl = sections[1].querySelector('.figure');
    init(blockEl);

    expect(blockEl.classList.contains('figure-list')).to.be.true;
    expect(blockEl.classList.contains('figure-list-2')).to.be.true;
  });

  it('should add the correct classes to the block element when only one picture is present', () => {
    const blockEl = sections[2].querySelector('.figure');
    init(blockEl);

    expect(blockEl.classList.contains('figure-list')).to.be.false;
    expect(blockEl.classList.contains('figure-list-1')).to.be.false;
  });

  it('should add the correct classes to the block element with caption', () => {
    const blockEl = sections[0].querySelector('.figure');
    init(blockEl);

    expect(blockEl.classList.contains('figure-list')).to.be.false;
    expect(blockEl.classList.contains('figure-list-1')).to.be.false;
  });

  it('should create picture and video figure blocks wrapped in A tag', () => {
    const blockEl = sections[3].querySelector('.figure');
    init(blockEl);

    const figures = blockEl.querySelectorAll('.figure');
    expect(figures[0].querySelector('a > picture')).to.exist;
    expect(figures[1].querySelector('a > video')).to.exist;
    expect(figures[1].querySelector('a > video > source')).to.exist;
  });

  it('should not add any classes to the block element when no pictures are present', () => {
    const blockEl = document.createElement('div');

    init(blockEl);

    expect(blockEl.classList.length).to.equal(0);
  });

  it('should have play button', () => {
    const blockEl = sections[4].querySelector('.figure');
    init(blockEl);
    expect(sections[4].querySelector('span.modal-img-link')).to.exist;
  });

  it('anchor tag should end in .mp4 and have videoPoster data attribute', () => {
    const blockEl = sections[5].querySelector('.figure');
    init(blockEl);
    expect(sections[5].querySelector('.figure a[href*=".mp4"]')).to.exist;
    expect(sections[5].querySelector('.figure a').hasAttribute('videoPoster')).to.exist;
  });
});
