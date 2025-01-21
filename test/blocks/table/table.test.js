import { readFile, sendMouse, sendKeys, resetMouse } from '@web/test-runner-commands';
import { expect } from 'chai';
import { getConfig, MILO_EVENTS, setConfig } from '../../../libs/utils/utils.js';
import { delay, waitForElement } from '../../helpers/waitfor.js';
import { replaceKey } from '../../../libs/features/placeholders.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init } = await import('../../../libs/blocks/table/table.js');
const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
const conf = { locales };
setConfig(conf);
const config = getConfig();

describe('table and tablemetadata', () => {
  beforeEach(() => {
    const tables = document.querySelectorAll('.table');
    tables.forEach((t) => init(t));
    window.dispatchEvent(new Event(MILO_EVENTS.DEFERRED));
  });

  afterEach(async () => {
    await resetMouse();
  });

  describe('standard table', () => {
    const table = document.querySelector('.table');

    it('row-heading', () => {
      expect(table.querySelector('.row-heading')).to.exist;
    });

    it('expand icon event by mouse click', () => {
      const expandIcon = table.querySelector('.icon.expand');
      expect(expandIcon.ariaExpanded).to.be.equal('true');
      expandIcon.parentElement.click();
      expect(expandIcon.ariaExpanded).to.be.equal('false');
    });

    it('expand icon event by keyboard', async () => {
      const expandIcon = table.querySelector('.icon.expand');
      expandIcon.parentElement.focus();
      await sendKeys({ type: 'Enter' });
      expect(expandIcon.ariaExpanded).to.be.equal('false');
      await sendKeys({ type: ' ' });
      expect(expandIcon.ariaExpanded).to.be.equal('true');
    });

    it('hovering-test', async () => {
      const headingCol = table.querySelector('.row-heading .col.col-2:not(.hidden)');
      const sectionHeads = table.querySelectorAll('.section-head');
      const lastSectionHead = sectionHeads[sectionHeads.length - 1];
      const lastExpandIcon = lastSectionHead.querySelector('.icon.expand');
      lastExpandIcon.setAttribute('aria-expanded', 'false');
      await sendMouse({
        type: 'move',
        position: [10, (headingCol?.offsetTop ?? 0) + 1],
      });
      expect(headingCol.classList.contains('hover')).to.be.true;
    });

    it('mobile test', async () => {
      window.innerWidth = 760;
      window.dispatchEvent(new Event('resize'));
      const filters = await waitForElement('.filters');
      const col5 = table.querySelector('.col-5');
      expect(filters).to.be.exist;
      expect(col5).to.be.null;
    });

    it('filter test: for case of both filter poiting same options', async () => {
      const filters = document.querySelectorAll('.filters select');
      const options = document.querySelectorAll('.filters select option');
      options[1].selected = true;
      filters[0].dispatchEvent(new Event('change', { bubbles: true }));
      await delay(500);
      expect(filters[0].value).to.equal('2');
    });

    it('filter test:for case of order change', async () => {
      const filters = document.querySelectorAll('.filters select');
      const options = document.querySelectorAll('.filters select option');
      options[3].selected = true;
      filters[0].dispatchEvent(new Event('change', { bubbles: true }));
      await delay(500);
      expect(filters[0].value).to.equal('4');
    });

    it('filter test: merch filter test', async () => {
      const filters = document.querySelectorAll('.filters select');
      const options = document.querySelectorAll('.filters select option');
      options[10].selected = true;
      filters[2].dispatchEvent(new Event('change', { bubbles: true }));
      await delay(500);
      expect(filters[2].value).to.equal('2');
    });

    it('filter test: no filter if only 2 columns', async () => {
      const tableWith2Columns = document.querySelector('.twocolumns');
      expect(tableWith2Columns.parentElement.querySelector('.filters')).to.be.null;
    });

    it('back to desktop test', async () => {
      window.innerWidth = 1200;
      window.dispatchEvent(new Event('resize'));
      const col5 = await waitForElement('.table .col-5');
      expect(col5).to.be.exist;
    });

    it('supports multi content section headings', () => {
      const multiContentHeading = document.querySelector('.multi-content-heading');
      expect(multiContentHeading.childNodes.length).to.equal(1);
    });

    it('supports tooltip', () => {
      const tooltipHeading = document.querySelector('.tooltip-heading');
      expect(tooltipHeading.childNodes.length).to.equal(2);
      expect(tooltipHeading.querySelector('.milo-tooltip, .icon-tooltip')).to.exist;
    });

    it('should apply aria-label to all selects within .filters on mobile', async () => {
      config.locale.contentRoot = '/test/blocks/table/mocks';
      window.innerWidth = 375;
      window.dispatchEvent(new Event('resize'));
      const ariaLabel = await replaceKey('choose-table-column', config);
      const selectElements = document.querySelectorAll('.filters select');

      selectElements.forEach((selectElement) => {
        expect(selectElement.getAttribute('aria-label')).to.equal(ariaLabel);
      });
    });
  });
});
