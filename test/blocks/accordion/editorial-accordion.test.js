import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { setConfig } from '../../../libs/utils/utils.js';

const accordionFuncs = {};
const mockRes = ({ payload, status = 200, ok = true } = {}) => new Promise((resolve) => {
  resolve({
    status,
    ok,
    json: () => payload,
    text: () => payload,
  });
});
const placeholders = {
  total: 2,
  offset: 0,
  limit: 2,
  data: [
    { key: 'expand-all', value: 'Expand All', link: '' },
    { key: 'collapse-all', value: 'Collapse All', link: '' },
  ],
  ':type': 'sheet',
};

setConfig({});
document.body.innerHTML = await readFile({ path: './mocks/editorial-body.html' });
describe('Accordion', () => {
  before(async () => {
    const module = await import('../../../libs/blocks/accordion/accordion.js');
    Object.keys(module).forEach((func) => {
      accordionFuncs[func] = module[func];
    });

    sinon.stub(window, 'fetch').callsFake(async (url) => {
      if (url.includes('/placeholders')) return mockRes({ payload: placeholders });
      return null;
    });

    const accordions = document.body.querySelectorAll('.accordion');
    accordions.forEach((accordion) => {
      module.default(accordion);
    });
  });

  after(() => {
    sinon.restore();
  });

  it('Load editorial body', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/editorial-body.html' });
    const accordionDl = document.querySelector('dl.accordion');
    expect(accordionDl).to.exist;
  });

  it('Runs all basic functions of the accordion', async () => {
    // handleClick()
    const firstAccordionButton = document.body.querySelector('dt button');
    expect(firstAccordionButton.getAttribute('aria-expanded')).to.equal('true');
    firstAccordionButton.click();
    expect(firstAccordionButton.getAttribute('aria-expanded')).to.equal('false');

    // handleClick() => expanded = true.
    firstAccordionButton.click();
    expect(firstAccordionButton.getAttribute('aria-expanded')).to.equal('true');
  });

  describe('with Expand All Button', () => {
    const el = document.querySelector('#accordion-expand-all');

    it('shows first image when rich media is all expanded', () => {
      const btn = el.querySelector('.expand-btn');
      btn.click();
      expect(el.querySelector('.accordion-media > div:first-of-type').classList.contains('expanded')).to.be.true;
    });

    it('shows shows next available image if visible image panel is closed', () => {
      const panel1Btn = el.querySelector('.accordion dt:first-of-type button');
      panel1Btn.click();
      expect(el.querySelector('.accordion-media > div:nth-of-type(2)').classList.contains('expanded')).to.be.true;
    });

    it('shows last selected image when rich media is all collapsed', () => {
      const collapseBtn = el.querySelector('.collapse-btn');
      collapseBtn.click();
      const panel2Btn = el.querySelector('.accordion dt:nth-of-type(2) button');
      panel2Btn.click();
      const panel2Image = el.querySelector('.accordion-media > div:nth-of-type(2)');
      expect(panel2Image.classList.contains('expanded')).to.be.true;
      collapseBtn.click();
      expect(panel2Image.classList.contains('expanded')).to.be.true;
    });
  });
});
