import './job-process.js';
import { LitElement, html, nothing } from '../../../deps/lit-all.min.js';
import { getSheet } from '../../../../tools/utils/utils.js';
import { authenticate, startJob, stopJob, getSharedJob, getPublishable } from '../services.js';
import { getConfig } from '../../../utils/utils.js';
import {
  delay,
  editEntry,
  FORM_MODES,
  getJobErrorText,
  getProcessedCount,
  isValidUrl,
  processJobResult,
  PROCESS_TYPES,
  sticky,
  isDelete,
} from '../utils.js';

const { miloLibs, codeRoot } = getConfig();
const base = miloLibs || codeRoot;

const styleSheet = await getSheet(`${base}/blocks/bulk-publish-v2/components/bulk-publisher.css`);
const loaderSheet = await getSheet(`${base}/blocks/bulk-publish-v2/components/loader.css`);
const checkmarkIcon = `${base}/blocks/bulk-publish-v2/img/checkmark.svg`;
const clearJobsIcon = `${base}/blocks/bulk-publish-v2/img/remove.svg`;

class BulkPublish2 extends LitElement {
  static properties = {
    mode: { state: true },
    urls: { state: true },
    process: { state: true },
    disabled: { state: true },
    editing: { state: true },
    processing: { state: true },
    jobs: { state: true },
    openJobs: { state: true },
    jobErrors: { state: true },
    user: { state: true },
    share: { state: true },
    errorShare: { state: true },
  };

  constructor() {
    super();
    this.mode = sticky().get('mode');
    this.urls = [];
    this.process = 'choose';
    this.disabled = true;
    this.editing = false;
    this.processing = false;
    this.jobs = [];
    this.openJobs = false;
    this.jobErrors = false;
    this.user = null;
    this.share = null;
    this.errorShare = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.renderRoot.adoptedStyleSheets = [styleSheet, loaderSheet];
    authenticate(this);
    const resumes = sticky().get('resume');
    /* c8 ignore next 9 */
    if (resumes.length) {
      this.jobs = [...resumes];
      await delay(1000);
      this.openJobs = true;
      this.processing = 'resumed';
    }
  }

  async updated() {
    const prefs = sticky();
    if (prefs.get('mode') !== this.mode) {
      prefs.set('mode', this.mode);
    }
    if (this.jobs.length) {
      const resumeable = this.jobs.filter((job) => !job.status);
      prefs.set('resume', resumeable);
    }
    const textarea = this.renderRoot.querySelector('#Urls');
    /* c8 ignore next 3 */
    if (this.urls.length && textarea?.value === '') {
      textarea.value = this.urls.join('\r\n');
    }
    if (this.user?.profile?.email && !this.share) {
      this.share = await getSharedJob();
      if (this.share.error) {
        /* c8 ignore next 1 */
        this.errorShare = this.share;
      } else if (this.share.length) {
        this.jobs = [...this.jobs, ...this.share];
      }
    }
  }

  setProcess(event) {
    if (event.target.value !== this.process) {
      this.process = event.target.value;
    }
  }

  setUrls(event) {
    const urls = event.target.value.replace(/\n/g, ' ')
      .replace(/(?=http)/g, ' ').split(' ').filter((ur) => (ur.length));
    this.urls = [...new Set(urls)];
    this.validateUrls();
  }

  setJobErrors(jobErrors, authErrors) {
    const errors = [...jobErrors, ...authErrors];
    const urls = [];
    errors.forEach((error) => {
      const matched = this.urls.filter((url) => {
        if (Array.isArray(error.href)) return error.href.includes(url);
        /* c8 ignore next 1 */
        return url.includes(error.href);
      });
      matched.forEach((match) => urls.push(match));
    });
    const textarea = this.renderRoot.querySelector('#Urls');
    textarea.value = urls.join('\r\n');
    /* c8 ignore next 3 */
    if (['delete', 'unpublish'].includes(this.process)) {
      this.urls = urls;
    }
    this.disabled = urls;
    this.jobErrors = { urls, messages: errors.map((error) => (error.message)) };
  }

  validateUrls() {
    let errors = [];
    const invalids = this.jobErrors?.urls?.length
      ? this.urls.filter((url) => this.jobErrors.urls.includes(url))
      : this.urls.filter((url) => !isValidUrl(url) && url.length);

    if (invalids?.length) {
      errors = [...errors, ...invalids];
    }
    if (errors.length === 0) {
      errors = this.urls.length === 0;
    }
    this.disabled = errors;
    this.editing = false;
  }

  getErrorEditor() {
    const textarea = this.renderRoot.getElementById('Urls');
    let text = 'Invalid Url';
    if (this.jobErrors) {
      text = getJobErrorText(this.jobErrors, this.process);
    }
    return {
      text,
      startEdit: (clicked = null) => {
        this.editing = !this.editing;
        if (clicked) {
          /* c8 ignore next 3 */
          if (this.jobErrors.length === 1) {
            this.jobErrors = false;
          } else {
            Object.keys(this.jobErrors).forEach((key) => this.jobErrors[key].shift());
          }
          this.validateUrls();
        } else {
          editEntry(textarea, this.disabled[0]);
        }
      },
    };
  }

  renderErrorBar() {
    if (typeof this.disabled === 'boolean') return '';
    const { text, startEdit } = this.getErrorEditor();
    startEdit();
    const count = this.disabled.length;
    const btnText = this.editing ? 'Next' : 'Select';
    return html`
      <div class="errors">
        <span>Error: <strong>${text}</strong></span>
        <div class="error-btns">
          ${count >= 1 ? html`
            <div class="fix-btn" @click=${() => startEdit(true)}>
              ${btnText}
            </div>` : ''}
          <div class="clear-btn" @click=${() => this.reset()}>
            Clear
          </div>
        </div>
      </div>
    `;
  }

  selectingProcess(event) {
    const select = this.shadowRoot.querySelector('#ProcessSelect');
    if (event.altKey === true) {
      if (![...select.options].find((opt) => opt.value === 'index')) {
        const indexOpt = document.createElement('option');
        indexOpt.setAttribute('id', 'indexOption');
        indexOpt.value = 'index';
        indexOpt.text = 'index';
        select.add(indexOpt);
      }
    } else {
      select.querySelector('option[value="index"')?.remove();
    }
  }

  getProcess = (type) => {
    const userPermissions = this.user?.permissions[type];
    const needsBulk = isDelete(type) && userPermissions?.useBulk === false;
    /* c8 ignore next 3 */
    if (needsBulk || userPermissions?.canUse === false) {
      return html`<option disabled value=${type}>${type}</option>`;
    }
    return html`<option value=${type}>${type}</option>`;
  };

  renderJobForm() {
    if (this.openJobs && this.mode === 'full') {
      return html`
        <div id="FormPanel" class="panel-title" @click=${() => { this.openJobs = false; }}>
          <span class="title">
            <strong>+</strong>
            Start New Job
          </span>
        </div>`;
    }
    const exUrl = window.location.href.replace(window.location.pathname, '')
      .replace(window.location.search, '');
    return html`
      <div class="process">
        <div class="processor">
          <select 
            id="ProcessSelect"
            name="select"
            value=${this.process}
            @change=${this.setProcess}
            @click=${this.selectingProcess}>
            <option disabled selected value="choose">Choose Process</option>
            ${PROCESS_TYPES.filter((pt) => pt !== 'index').map((type) => (this.getProcess(type)))}
          </select>
          <button
            id="RunProcess"
            disable=${this.isDisabled()} 
            @click=${this.submit}>
            Run Job
            <span class="loader${this.processing === 'started' ? '' : ' hide'}"></span>
          </button>
        </div>
        <label class="process-title" for="Urls">
          <strong>PAGE URLs</strong>
        </label>
      </div>
      <div class="urls${typeof this.disabled !== 'boolean' ? ' invalid' : ''}">
        <div class="error-bar">${this.renderErrorBar()}</div>
        <div class="checkmark${this.disabled ? '' : ' show'}">
          <img src=${checkmarkIcon} alt="Checkmark Icon" title="Valid Page Urls" />
        </div>
        <div class="entered-count${this.urls.length ? ' show' : ''}">${this.urls.length}</div>
        <textarea 
          id="Urls"
          wrap="off"
          placeholder="Example: ${exUrl}/path/to/page"
          @blur=${this.setUrls}
          @change=${this.setUrls}></textarea>
      </div>
    `;
  }

  getJobState() {
    const state = {
      showList: this.mode === 'half' || this.openJobs,
      showClear: this.jobs.length && this.processing === false,
      loading: this.processing !== false,
    };
    Object.keys(state).forEach((key) => (state[key] = `${state[key] ? '' : ' hide'}`));
    state.count = this.jobs.reduce((count, { result }) => {
      const paths = result?.job?.data?.paths?.length ?? 0;
      return count + paths;
    }, 0);
    return state;
  }

  setJobStopped(event) {
    const status = event.detail;
    const jobProcess = this.jobs.find(({ result }) => result.job.name === status.name);
    if (jobProcess) jobProcess.status = status;
    if (this.jobs.filter((job) => !job.status).length === 0) {
      this.processing = false;
      sticky().set('resume', []);
      const progressCount = this.renderRoot.querySelector('#progress');
      if (progressCount) progressCount.innerHTML = 0;
    }
  }

  setJobProgress(event) {
    const { name, progress } = event.detail;
    const jobProcess = this.jobs.find(({ result }) => result.job.name === name);
    if (jobProcess) jobProcess.progress = progress;
    const progressCount = this.renderRoot.querySelector('#progress');
    if (progressCount) progressCount.innerHTML = getProcessedCount(this.jobs);
  }

  clearJobs = () => {
    this.jobs = [];
    if (this.mode === 'full') this.openJobs = false;
  };

  async cancelJob(job) {
    /* c8 ignore next 3 */
    if (!job.status?.stopTime) {
      await stopJob(job);
    }
    const { name } = job.result.job;
    this.jobs = this.jobs.filter(({ result }) => result.job.name !== name);
    this.requestUpdate();
    if (this.mode === 'full' && !this.jobs.length) this.openJobs = false;
  }

  /* c8 ignore next 14 */
  async reworkErrors(job) {
    if (this.mode === 'full') {
      this.openJobs = false;
      await delay(300);
    }
    const { data, name } = job;
    const { origin } = this.jobs.find((item) => item.result.job.name === name);
    const errored = data.resources?.filter((path) => path.status !== 200);
    if (errored.length) {
      const textarea = this.renderRoot.querySelector('#Urls');
      textarea.focus();
      textarea.value = errored.map((error) => (`${origin}${error.path}`)).join('\r\n');
    }
  }

  renderResults() {
    const { showList, showClear, loading, count } = this.getJobState();
    const handleToggle = () => {
      if (!this.openJobs) {
        this.openJobs = !!this.jobs.length;
      }
    };
    return html`
      <div
        id="ResultPanel"
        class="panel-title"
        @click=${handleToggle}>
        <span class="title">
          ${this.jobs.length ? html`<strong>${this.jobs.length}</strong>` : ''}
          Job Result${this.jobs.length > 1 ? 's' : ''}
        </span>
        <div class="jobs-tools${showList}">
          <div 
            class="clear-jobs${showClear}"
            @click=${this.clearJobs}>
            <img src=${clearJobsIcon} alt="Clear List Icon" title="Clear Job List" />
          </div>
          <div class="job-progress${loading}">
            <span id="progress">0</span>/${count}
          </div>
          <div class="loading-jobs${loading}">
            <div class="loader pink"></div>
          </div>
        </div>
      </div>
      <div class="job${showList}">
        <div class="job-head">
          <div class="job-url">JOB${this.jobs.length > 1 ? 'S' : ''}</div>
          <div class="job-meta">
            <span>STATUS</span>
          </div>
        </div>
        <div class="job-list">
          ${this.jobs.map((job) => html`
            <job-process 
              .job=${job}
              .reworkErrors=${(errors) => this.reworkErrors(errors)}
              .cancelJob=${() => this.cancelJob(job)}
              @progress="${this.setJobProgress}"
              @stopped="${this.setJobStopped}">
            </job-process>
          `)}
        </div>
      </div>
    `;
  }

  isDisabled() {
    return this.disabled === true
      || typeof this.disabled !== 'boolean'
      || this.process === 'choose';
  }

  reset() {
    this.disabled = true;
    this.jobErrors = false;
    this.urls = [];
    const urls = this.renderRoot.querySelector('#Urls');
    if (urls) urls.value = '';
    this.process = 'choose';
    const process = this.renderRoot.querySelector('#ProcessSelect');
    if (process) process.value = 'choose';
  }

  async submit() {
    if (!this.isDisabled()) {
      this.processing = 'started';
      const { authorized, unauthorized } = await getPublishable(this);
      const job = await startJob({
        urls: authorized,
        process: this.process.toLowerCase(),
        useBulk: this.user.permissions[this.process]?.useBulk ?? false,
      });
      const { complete, error } = processJobResult(job);
      this.jobs = [...this.jobs, ...complete];
      this.processing = complete.length ? 'job' : false;
      if (error.length || unauthorized.length) {
        this.setJobErrors(error, unauthorized);
      } else {
        if (this.mode === 'full') this.openJobs = true;
        this.reset();
      }
    }
  }

  getModeState() {
    return {
      full: this.mode === 'full' ? 'on' : 'off',
      half: this.mode === 'half' ? 'on' : 'off',
      toggleMode: (modeIndex) => { this.mode = FORM_MODES[modeIndex]; },
    };
  }

  renderPromptLoader() {
    setTimeout(() => {
      /* c8 ignore next 4 */
      const loader = this.renderRoot.querySelector('.load-indicator');
      const message = this.renderRoot.querySelector('.message');
      loader?.classList.add('hide');
      message?.classList.remove('hide');
    }, 4000);
    return html`
      <div class="load-indicator">
        <div class="loader"></div>
        Loading User Information
      </div>
    `;
  }

  renderLoginPrompt() {
    let message = 'Please open AEM sidekick to continue';
    if (this.user) {
      if (this.user?.profile) {
        const canUse = Object.values(this.user.permissions).filter((perms) => perms.canUse);
        if (canUse.length) return html``;
        message = 'Current user is not authorized to use Bulk Publishing Tool';
      /* c8 ignore next 3 */
      } else {
        message = 'Please sign in to AEM sidekick to continue';
      }
    }
    return html`
      <div class="login-prompt">
        <div class="prompt">
          ${this.renderPromptLoader()}
          <div class="message hide">
            ${message}
          </div>
        </div>
      </div>
    `;
  }

  /* c8 ignore next 14 */
  renderErrorShare() {
    if (!this.user?.profile || !this.errorShare) return nothing;
    return html`
      <div class="login-prompt">
        <div class="prompt">
          <div class="message share">
            <span>Sorry, shared job ( ${this.errorShare.share} )</span>
            <strong>${this.errorShare.error.message}</strong>
            <div class="close" @click=${() => { this.errorShare = null; }}>X</div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const { full, half, toggleMode } = this.getModeState();
    return html`
      ${this.renderLoginPrompt()}
      ${this.renderErrorShare()}
      <header id="Header">
        <h1>Bulk Publishing</h1>
        <div class="mode-switcher">
          <div title="Carousel View" class="switch full ${full}" @click=${() => toggleMode(0)}>
          </div>
          <div title="Panel View" class="switch half ${half}" @click=${() => toggleMode(1)}></div>
        </div>
      </header>
      <div id="BulkPublish" class="bulk-publisher ${this.mode}">
        <div active=${!this.openJobs} class="panel form">
          ${this.renderJobForm()}
        </div>
        <div active=${!!this.openJobs} class="panel results">
          ${this.renderResults()}
        </div>
      </div>
    `;
  }
}

customElements.define('bulk-publish', BulkPublish2);
