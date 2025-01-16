import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { delay } from '../../helpers/waitfor.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init, getMetadata } = await import('../../../libs/blocks/section-metadata/section-metadata.js');

describe('Section Metdata', () => {
  it('Gracefully dies', () => {
    const sec = document.querySelector('div');
    const sm = sec.querySelector('.section-metadata');
    init(sm);
    expect(sec.classList.length).to.equal(0);
  });

  it('Handles background image', async () => {
    const sec = document.querySelector('.section.image');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(sec.classList.contains('has-background')).to.be.true;
  });

  it('Handles background image focal point', async () => {
    const sec = document.querySelector('.section.image-focalpoint');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    const image = sec.querySelector('img');
    expect(image.style.objectPosition).to.equal('center bottom');
  });

  it('Handles background color', async () => {
    const sec = document.querySelector('.section.color');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(sec.style.background).to.equal('rgb(239, 239, 239)');
  });

  it('Handles background gradient', async () => {
    const sec = document.querySelector('.section.gradient.color');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(sec.style.background).to.equal('linear-gradient(red, yellow)');
  });

  it('Adds class based on layout input', async () => {
    const sec = document.querySelector('.section.layout');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(sec.classList.contains('grid-template-columns-1-2')).to.be.true;
  });

  it('Adds class based on masonry input', async () => {
    const sec = document.querySelector('.section.masonrysec');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(sec.classList.contains('masonry-layout')).to.be.true;
  });

  it('gets section metadata', () => {
    const metadata = getMetadata(document.querySelector('.section.color .section-metadata'));
    expect(metadata.background.text).to.equal('rgb(239, 239, 239)');
  });

  it('gets section metadata', async () => {
    const sec = document.querySelector('.section.sticky-bottom');
    const sm = sec.querySelector('.section-metadata');
    const main = document.querySelector('main');
    await init(sm);
    expect(main.lastElementChild).to.be.eql(sec);
  });

  it('add section to top', async () => {
    const sec = document.querySelector('.section.sticky-top');
    const sm = sec.querySelector('.section-metadata');
    const main = document.querySelector('main');
    await init(sm);
    expect(main.firstElementChild).to.be.eql(sec);
  });

  it('add promobar behaviour to section', async () => {
    const main = document.querySelector('main');
    const sec = document.querySelector('.section.sticky-bottom .promobar').closest('.section');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(main.lastElementChild.classList.contains('hide-sticky-section')).to.be.true;
  });

  it('Handles delay in loading the promobar', async () => {
    const sec = document.querySelector('.section.delay');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(sec.classList.contains('hide-sticky-section')).to.be.true;
    await delay(1000);
    expect(sec.classList.contains('hide-sticky-section')).not.to.be.true;
  });

  it('add promobar behaviour to be visible when no-delay', async () => {
    const main = document.querySelector('main');
    const sec = document.querySelector('.section.sticky-bottom-no-delay .promobar').closest('.section');
    const sm = sec.querySelector('.section-metadata');
    await init(sm);
    expect(main.lastElementChild.classList.contains('hide-sticky-section')).to.be.false;
  });

  it('should calculate the top position based on header height', async () => {
    const sec = document.querySelector('.section.sticky-top');
    const header = document.createElement('header');
    header.style.height = '44px';
    document.body.prepend(header);
    sec.style.top = `${header.offsetHeight}px`;

    window.dispatchEvent(new Event('resize'));
    header.style.height = '77px';

    await delay(700);
    expect(sec.style.top).to.be.eql('77px');
  });
});
