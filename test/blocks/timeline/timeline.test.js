import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { setConfig } from '../../../libs/utils/utils.js';

const config = { codeRoot: '/libs' };
setConfig(config);

const { default: init } = await import('../../../libs/blocks/timeline/timeline.js');

describe('Timeline', () => {
  beforeEach(async () => {
    document.body.innerHTML = await readFile({ path: './mocks/body.html' });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('has 3 headers', async () => {
    const timelineEl = document.querySelector('.timeline');
    init(timelineEl);
    const headers = timelineEl.querySelectorAll('.timeline h3');
    expect(headers[0].textContent).to.equal('Day 1');
    expect(headers[1].textContent).to.equal('Day 8');
    expect(headers[2].textContent).to.equal('Day 21');
  });
  it('has 3 descriptions', async () => {
    const timelineEl = document.querySelector('.timeline');
    init(timelineEl);
    const descriptions = timelineEl.querySelectorAll('.timeline h3 + p');

    expect(descriptions[0].textContent).to.equal('If you start your free trial today');
    expect(descriptions[1].textContent).to.equal('Your subscription starts and billing begins');
    expect(descriptions[2].textContent).to.equal('Full refund period ends');
  });
  it('has a payment period and a refund period section ', async () => {
    const timelineEl = document.querySelector('.timeline');
    init(timelineEl);
    const trialPeriod = timelineEl.querySelector('.row .left .period');
    const refundPeriod = timelineEl.querySelector('.row .right .period');

    expect(trialPeriod.textContent).to.equal('7-day free trial');
    expect(refundPeriod.textContent).to.equal('14-day full refund period');
    expect(trialPeriod.style.background.includes('to right')).to.be.true;
  });
  it('it sets bar background colors based on colors in free trial and refund period section', async () => {
    const timelineEl = document.querySelector('.timeline');
    init(timelineEl);
    const bars = timelineEl.querySelectorAll('.bar');

    expect(bars[0].style.backgroundColor).to.equal('rgb(230, 56, 136)');
    expect(bars[1].style.backgroundColor).to.equal('rgb(233, 116, 154)');
    expect(bars[2].style.backgroundColor).to.equal('rgb(255, 206, 46)');
  });
  it('updates background linear gradient for rtl', async () => {
    const timelineEl = document.querySelector('.timeline');
    timelineEl.parentElement.setAttribute('dir', 'rtl');
    init(timelineEl);
    const trialPeriod = timelineEl.querySelector('.row .left .period');
    expect(trialPeriod.style.background.includes('to left')).to.be.true;
  });
  describe('rtl ', () => {
    beforeEach(async () => {
      document.body.innerHTML = await readFile({ path: './mocks/switchcolors.html' });
    });
    afterEach(() => {
      document.body.innerHTML = '';
    });
    it('updates linear-gradient for rtl', async () => {
      const timelineEl = document.querySelector('.timeline');
      init(timelineEl);
      const refundPeriod = timelineEl.querySelector('.row .right .period');
      expect(refundPeriod.textContent).to.equal('14-day full refund period');
      expect(refundPeriod.style.background.includes('to left')).to.be.true;
    });
  });
  describe('segment classes', () => {
    beforeEach(async () => {
      document.body.innerHTML = await readFile({ path: './mocks/segmentclasses.html' });
    });
    afterEach(() => {
      document.body.innerHTML = '';
    });
    it('adds classes to handle center text alignment', async () => {
      const timelineEl = document.querySelector('.timeline');
      init(timelineEl);
      const leftCenter = timelineEl.querySelector('.row .left-center');
      const rightCenter = timelineEl.querySelector('.row .right-center');
      expect(rightCenter).to.exist;
      expect(leftCenter).to.exist;
    });
  });
  describe('broken segment classes', () => {
    beforeEach(async () => {
      document.body.innerHTML = await readFile({ path: './mocks/brokensegmentclass.html' });
    });
    afterEach(() => {
      document.body.innerHTML = '';
    });
    it('replaces broken segment class width segment-timeline-6-6', async () => {
      const timelineEl = document.querySelector('.timeline');
      init(timelineEl);
      expect(timelineEl.classList.contains('segment-timeline-6-6')).to.be.true;
    });
  });
});
