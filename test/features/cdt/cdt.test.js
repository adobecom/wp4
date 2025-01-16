import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { loadCDT } from '../../../libs/utils/decorate.js';
import { setConfig } from '../../../libs/utils/utils.js';

const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
const conf = { locales };
setConfig(conf);

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
describe('CDT test error case no metadata', () => {
  it('check for countdown-timer meta data', async () => {
    const container = document.getElementById('cdt-container');
    await loadCDT(container, container.classList);
    expect(container.querySelectorAll('.timer-label')).to.have.lengthOf(0);
  });
});

describe('CDT test error case invalid date', () => {
  before(() => {
    document.head.innerHTML = '<meta name="countdown-timer" content="2026-08-30 00:00:00 PST,invalid">';
  });
  it('check for countdown-timer meta data', async () => {
    const container = document.getElementById('cdt-container');
    await loadCDT(container, container.classList);
    expect(container.querySelectorAll('.timer-label')).to.have.lengthOf(0);
  });
});

describe('CDT test success case', () => {
  before(() => {
    document.head.innerHTML = '<meta name="countdown-timer" content="2024-08-26 12:00:00 PST,2026-08-30 00:00:00 PST">';
  });
  it('check for countdown-timer meta data', async () => {
    const container = document.getElementById('cdt-container');
    await loadCDT(container, container.classList);
    expect(container.querySelectorAll('.timer-label')).to.have.lengthOf(1);
    container.innerHTML = '';
  });
});

describe('CDT test error case invalid  cdt metdata format', () => {
  before(() => {
    document.head.innerHTML = '<meta name="countdown-timer" content="a,b,c">';
  });
  it('check for countdown-timer meta data', async () => {
    const container = document.getElementById('cdt-container');
    await loadCDT(container, container.classList);
    expect(container.querySelectorAll('.timer-label')).to.have.lengthOf(0);
  });
});

describe('CDT test start is equal to end date', () => {
  before(() => {
    document.head.innerHTML = '<meta name="countdown-timer" content="2024-08-26 12:00:00 PST,2024-08-26 12:00:00 PST">';
  });
  it('check for countdown-timer meta data', async () => {
    const container = document.getElementById('cdt-container');
    await loadCDT(container, container.classList);
    expect(container.querySelectorAll('.timer-label')).to.have.lengthOf(0);
  });
});

describe('CDT test start is equal to end date', () => {
  before(() => {
    document.head.innerHTML = '<meta name="manifestnames" content="black-friday-offer,twp-cct"><meta name="schedule" content=", black-friday-offer | 2024-03-22T05:00:00 | 2038-03-31T05:00:00 | https://main--milo--adobecom.hlx.page/drafts/nala/features/promotions/manifests/promo-with-fragments-insert.json |  | 2024-08-26T12:00:00 | 2026-08-30T00:00:00, mwpw-159157-delayed-modal-space-between | 2024-09-26T00:00:00 | 2026-11-30T00:00:00 | https://main--milo--adobecom.hlx.live/fragments/mirafedas/promos/2024/global/delayed-modal-promo/delayed-modal-promo.json |  |  |">';
  });
  it('check for countdown-timer meta data by MEP', async () => {
    const container = document.getElementById('cdt-container');
    await loadCDT(container, container.classList);
    expect(container.querySelectorAll('.timer-label')).to.have.lengthOf(1);
    container.innerHTML = '';
  });
});
