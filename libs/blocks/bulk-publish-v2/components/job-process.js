import './job-info.js';
import { LitElement, html } from '../../../deps/lit-all.min.js';
import { getStatusProps, updateJobUrls, isSuccess, isDelete, delay } from '../utils.js';
import { pollJobStatus, updateRetry } from '../services.js';
import { getSheet } from '../../../../tools/utils/utils.js';
import { getConfig } from '../../../utils/utils.js';

const { miloLibs, codeRoot } = getConfig();
const base = miloLibs || codeRoot;
const styleSheet = await getSheet(`${base}/blocks/bulk-publish-v2/components/job-process.css`);

class JobProcess extends LitElement {
  static get properties() {
    return {
      job: { type: Object },
      reworkErrors: { type: Function },
      jobStatus: { state: true },
      queue: { state: true },
    };
  }

  constructor() {
    super();
    this.jobStatus = undefined;
    this.queue = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    this.renderRoot.adoptedStyleSheets = [styleSheet];
    if (this.job?.useBulk && this.job?.status?.state !== 'stopped') {
      await pollJobStatus(this.job, (detail) => {
        if (detail.state === 'stopped') {
          this.jobStatus = detail;
        /* c8 ignore next 3 */
        } else {
          updateJobUrls(detail, this.renderRoot);
        }
        this.dispatchEvent(new CustomEvent('progress', { detail }));
      });
    } else {
      this.jobStatus = this.job.result.job;
    }
  }

  async updated() {
    const stopped = this.jobStatus?.state === 'stopped';
    if (stopped) {
      this.dispatchEvent(new CustomEvent('stopped', { detail: this.jobStatus }));
    }
    if (stopped && this.jobStatus?.progress?.failed > 0) {
      const timeouts = this.jobStatus?.data?.resources?.filter((job) => job.status === 503) ?? [];
      this.retry(timeouts);
    }
  }

  async retry(timeouts) {
    if (!timeouts.length) return;
    if (this.queue.length) {
      const queue = this.queue.filter(({ count, status }) => status === 503 && count <= 3);
      if (queue.length) {
        this.queue = await updateRetry({
          queue,
          urls: queue.map(({ path }) => `${this.job.origin}${path}`),
          process: this.jobStatus.topic,
        });
      }
    } else {
      this.queue = timeouts.map((item) => ({ ...item, count: 1 }));
    }
  }

  async onClick({ url, code, topic }, pathIndex) {
    const results = this.renderRoot.querySelectorAll('.result');
    const isPOST = !isDelete(topic);
    /* c8 ignore next 3 */
    if (this.jobStatus && isSuccess(code) && isPOST) {
      results[pathIndex].classList.add('opened');
      window.open(url, '_blank');
    } else {
      await navigator.clipboard.writeText(url);
      results[pathIndex].classList.add('copied', 'indicator');
      await delay(3000);
      results[pathIndex].classList.remove('indicator');
    }
  }

  getJob(path) {
    const jobData = this.jobStatus ?? this.job.result.job;
    const { topic, data } = jobData;
    const resource = data?.resources?.find((src) => src.path === path || src.webPath === path);
    let { status } = resource ?? jobData;

    const retry = this.queue?.find((item) => item.path === path);
    if (retry) status = retry.status;

    const origin = ['publish', 'index'].includes(topic) && isSuccess(status)
      ? this.job.origin.replace('.page', '.live')
      : this.job.origin;

    const statusProps = getStatusProps({
      status,
      topic,
      count: retry?.count,
      altText: jobData.error,
    });

    return {
      topic,
      status: statusProps,
      url: resource?.href ?? `${origin}${path}`,
    };
  }

  renderJobItem(path, pathIndex) {
    const jobPath = typeof path === 'object' ? path.path : path;
    const { status, topic, url } = this.getJob(jobPath);
    const link = isDelete(topic) ? '' : ' link';
    return html`
      <div
        job-item=${jobPath}
        class="${status.style}${link}"
        @click=${() => this.onClick({ url, code: status.code, topic }, pathIndex)}>
        <div class="process">
          <img 
            class="process-icon ${status.color}" 
            src=${status.icon} 
            alt="${status.text} Icon" 
            title="${status.text}" />
          <span class="url">${url}</span>
        </div>
        <div class="meta">
          <span class="status ${status.color}">
            ${status.text !== 'Working' ? status.text : ''}
          </span>
        </div>
      </div>
    `;
  }

  render() {
    const { job } = this.job.result;
    const jobData = this.jobStatus ?? this.job.result.job;
    return html`
      <div class="job-process">
        <job-info 
          .status=${jobData} 
          .reworkErrors=${() => this.reworkErrors(jobData)}
          .cancelJob=${() => this.cancelJob(jobData)}>
        </job-info>
        ${job.data.paths.map((path, pathIndex) => this.renderJobItem(path, pathIndex))}
      </div>
    `;
  }
}

customElements.define('job-process', JobProcess);
