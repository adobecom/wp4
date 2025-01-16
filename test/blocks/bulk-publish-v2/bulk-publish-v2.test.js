import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';
import { readFile, sendKeys, sendMouse } from '@web/test-runner-commands';
import { waitForRemoval } from '../../helpers/waitfor.js';
import { mockFetch, mockShare, unmockFetch, unmockShare } from './mocks/fetch.js';
import { setConfig } from '../../../libs/utils/utils.js';
import './mocks/authentication.js';

const conf = { miloLibs: 'http://localhost:2000/libs' };
setConfig(conf);

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const { default: init } = await import('../../../libs/blocks/bulk-publish-v2/bulk-publish-v2.js');
const testPage = 'https://main--milo--adobecom.aem.page/tools/bulk-publish-v2-test';

Object.defineProperty(navigator, 'clipboard', { value: { writeText: async () => {} } });

const mouseEvent = async (el, type = 'click') => {
  if (!el) return;
  const rect = el?.getBoundingClientRect();
  await sendMouse({
    type,
    button: 'left',
    position: [
      parseInt((rect?.left ?? 0) + 1, 10),
      parseInt((rect?.top ?? 0) + 1, 10),
    ],
  });
};

const setProcess = async (el, type = 'preview', holdAlt = false) => {
  const select = el.querySelector('#ProcessSelect');
  if (holdAlt) {
    await sendKeys({ down: 'Alt' });
    await mouseEvent(select);
    await sendKeys({ up: 'Alt' });
    select.value = type;
    select.dispatchEvent(new Event('change'));
  } else {
    await mouseEvent(select);
    await sendKeys({ type });
  }
};

const setTextArea = async (el, type) => {
  const textarea = el.querySelector('#Urls');
  textarea.focus();
  textarea.value = type;
  textarea.blur();
};

describe('Bulk Publish Tool', () => {
  let clock;

  before(async () => {
    await mockFetch();
    await mockShare();
    clock = sinon.useFakeTimers({
      toFake: ['setTimeout'],
      shouldAdvanceTime: true,
    });
  });

  after(() => {
    unmockFetch();
    clock.restore();
  });

  init(document.querySelector('.bulk-publish-v2'));
  const bulkPub = document.querySelector('bulk-publish');
  const rootEl = bulkPub.shadowRoot;

  it('can render bulk publish tool', () => {
    expect(bulkPub).to.exist;
  });

  it('can prompt user to open sidekick', () => {
    const prompt = rootEl.querySelector('.login-prompt');
    expect(prompt).to.exist;
    expect(prompt.innerText).to.equal('Loading User Information');
  });

  it('can close sign-in prompt', async () => {
    const sidekick = document.querySelector('helix-sidekick');
    sidekick.opened();
    sidekick.status();
    sidekick.loggedin();
    await waitForRemoval('.login-prompt');
    expect(rootEl.querySelector('.login-prompt')).to.not.exist;
  });

  it('can toggle ui mode', async () => {
    await mouseEvent(rootEl.querySelector('.switch.half'));
    const pub = rootEl.querySelector('.bulk-publisher');
    expect(pub).to.exist;
  });

  it('can render a shared job', async () => {
    expect(rootEl.querySelectorAll('job-process')).to.have.lengthOf(1);
    bulkPub?.clearJobs();
    await unmockShare();
  });

  it('can select process type', async () => {
    const process = 'preview';
    await setProcess(rootEl, process);
    expect(rootEl.querySelector('#ProcessSelect').value).to.equal(process);
  });

  it('can validate urls and disable form', async () => {
    await setTextArea(rootEl, 'not_a_url');
    const errors = rootEl.querySelector('.errors');
    expect(errors.querySelector('strong').innerText).to.equal('Invalid Url');
  });

  it('can handle api error response', async () => {
    await setTextArea(rootEl, 'https://error--milo--adobecom.aem.page/not/a/valid/path');
    await mouseEvent(rootEl.querySelector('#RunProcess'));
    const errors = rootEl.querySelector('.errors');
    expect(errors.querySelector('strong').innerText).to.equal('Unauthorized');
    await mouseEvent(rootEl.querySelector('.fix-btn'));
  });

  it('can trigger cannot publish config', async () => {
    await clock.runAllAsync();
    await setProcess(rootEl, 'publish');
    await setTextArea(rootEl, 'https://error--milo--adobecom.aem.page/not/a/valid/path');
    await mouseEvent(rootEl.querySelector('#RunProcess'));
    const errors = rootEl.querySelector('.errors');
    const errorText = errors?.querySelector('strong').innerText;
    expect(errorText).to.equal('Publishing disabled until the test is over');
    await mouseEvent(rootEl.querySelector('.fix-btn'));
  });

  it('can validate milo urls and enable form', async () => {
    await clock.runAllAsync();
    await setProcess(rootEl, 'publish');
    await setTextArea(rootEl, testPage);
    expect(rootEl.querySelector('#RunProcess').getAttribute('disable')).to.equal('false');
  });

  it('can submit valid bulk publish job', async () => {
    await clock.runAllAsync();
    await mouseEvent(rootEl.querySelector('.switch.full'));
    await setProcess(rootEl, 'publish');
    await setTextArea(rootEl, testPage);
    await mouseEvent(rootEl.querySelector('#RunProcess'));
    expect(rootEl.querySelectorAll('job-process')).to.have.lengthOf(1);
    await mouseEvent(rootEl.querySelector('.switch.half'));
  });

  it('can toggle job timing flyout', async () => {
    await clock.runAllAsync();
    const jobProcess = rootEl.querySelectorAll('job-process')[0];
    const jobInfo = jobProcess.shadowRoot.querySelector('job-info');
    const timerDetail = jobInfo.shadowRoot.querySelector('.timer');
    await mouseEvent(timerDetail);
    await clock.runAllAsync();
    await mouseEvent(timerDetail);
    expect(timerDetail.classList.contains('show-times')).to.be.false;
  });

  it('can submit valid bulk preview job', async () => {
    await clock.runAllAsync();
    await setProcess(rootEl, 'preview');
    await setTextArea(rootEl, testPage);
    await mouseEvent(rootEl.querySelector('#RunProcess'));
    expect(rootEl.querySelectorAll('job-process')).to.have.lengthOf(2);
  });

  it('can submit valid bulk delete job', async () => {
    await clock.runAllAsync();
    await setProcess(rootEl, 'delete');
    await setTextArea(rootEl, `${testPage}${testPage}1`);
    await mouseEvent(rootEl.querySelector('#RunProcess'));
    expect(rootEl.querySelectorAll('job-process')).to.have.lengthOf(3);
  });

  it('can copy result page url', async () => {
    await clock.runAllAsync();
    const deleteProcess = rootEl.querySelectorAll('job-process')[1];
    const deleteResult = deleteProcess?.shadowRoot.querySelector('.result');
    await mouseEvent(deleteResult);
    deleteResult.classList.add('copied');
    expect(deleteResult.classList.contains('copied')).to.be.true;
  });

  it('can copy a job invocation ID', async () => {
    await clock.runAllAsync();
    const doneJobProcess = rootEl.querySelectorAll('job-process')[0];
    const jobInfo = doneJobProcess?.shadowRoot.querySelector('job-info');
    const jobIdLink = jobInfo?.shadowRoot.querySelector('.job-id-link');
    await mouseEvent(jobIdLink);
    await clock.runAllAsync();
  });

  it('can share a job', async () => {
    const process = rootEl.querySelectorAll('job-process')[0];
    const jobInfo = process?.shadowRoot.querySelector('job-info');
    const shareIcon = jobInfo?.shadowRoot.querySelector('.share-link');
    await mouseEvent(shareIcon);
    await clock.runAllAsync();
  });

  it('can stop a job', async () => {
    const process = rootEl.querySelectorAll('job-process')[0];
    const jobInfo = process?.shadowRoot.querySelector('job-info');
    const cancelIcon = jobInfo?.shadowRoot.querySelector('.cancel-job');
    await mouseEvent(cancelIcon);
    await clock.runAllAsync();
  });

  it('can submit valid index job', async () => {
    await setProcess(rootEl, 'index', true);
    await setTextArea(rootEl, testPage);
    await clock.runAllAsync();
    await mouseEvent(rootEl.querySelector('#RunProcess'));
    expect(rootEl.querySelectorAll('job-process')).to.have.lengthOf(3);
  });

  it('can toggle view mode', async () => {
    await mouseEvent(rootEl.querySelector('.switch.full'));
    await clock.runAllAsync();
    await mouseEvent(rootEl.querySelector('#FormPanel'));
    await mouseEvent(rootEl.querySelector('#ResultPanel'));
    await clock.runAllAsync();
    expect(rootEl.querySelector('#BulkPublish.full')).to.exist;
  });

  it('can filter errors in job process', async () => {
    await clock.runAllAsync();
    const jobProcessWError = rootEl.querySelectorAll('job-process')[1];
    const jobInfo = jobProcessWError?.shadowRoot.querySelector('job-info');
    const timerDetail = jobInfo?.shadowRoot.querySelector('.count');
    await mouseEvent(timerDetail);
    await clock.runAllAsync();
    const closeErrors = jobInfo?.shadowRoot.querySelector('.close');
    await mouseEvent(closeErrors);
  });

  it('can open result page url', async () => {
    await mouseEvent(rootEl.querySelector('.switch.half'));
    await clock.runAllAsync();
    const openProcess = rootEl.querySelectorAll('job-process')[0];
    const openResult = openProcess.shadowRoot.querySelector('.result');
    await mouseEvent(openResult);
    openResult.classList.add('opened');
    expect(openResult.classList.contains('opened')).to.be.true;
  });

  it('can clear bulk jobs', async () => {
    await clock.runAllAsync();
    await mouseEvent(rootEl.querySelector('.clear-jobs'));
    expect(rootEl.querySelectorAll('job-process')).to.have.lengthOf(0);
  });
});
