import { createTag, getConfig } from '../../utils/utils.js';

const { miloLibs, codeRoot } = getConfig();
const base = miloLibs || codeRoot;
const checkedIcon = `${base}/blocks/bulk-publish-v2/img/checked.svg`;
const crossedIcon = `${base}/blocks/bulk-publish-v2/img/crossed.svg`;
const indicatorIcon = `${base}/blocks/bulk-publish-v2/img/indicator.svg`;

const getHost = (host) => (host === 'localhost' ? 'main--milo--adobecom.aem.page' : host);

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return checkedIcon;
    case 'error':
      return crossedIcon;
    default:
      return indicatorIcon;
  }
};

const PREFS = 'bulk-pub-prefs';
const FORM_MODES = ['full', 'half'];
const DEFAULT_PREFS = { mode: FORM_MODES[0], resume: [] };
const PROCESS_TYPES = [
  'preview',
  'publish',
  'unpublish',
  'delete',
  'index',
];

const isSuccess = (status) => [200, 204].includes(status);
const isDelete = (type) => ['delete', 'unpublish', 'preview-remove', 'publish-remove'].includes(type);

const delay = (timeout = 3000) => new Promise((resolve) => {
  setTimeout(() => resolve(), timeout);
});

const sticky = () => {
  const store = localStorage.getItem(PREFS);
  const prefs = store ? JSON.parse(store) : DEFAULT_PREFS;
  return {
    get: (key) => (prefs[key] ?? DEFAULT_PREFS[key]),
    set: (key, value) => {
      prefs[key] = value;
      localStorage.setItem(PREFS, JSON.stringify(prefs));
    },
  };
};

const getAemUrl = (url) => url.hostname.split('.')[0].split('--');
const isValidUrl = (str) => {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  const [ref, repo, owner] = getAemUrl(url);
  return url.protocol === 'https:' && ref && repo && owner;
};

const editEntry = (el, str) => {
  if (el?.value) {
    const { offsetTop, value, scrollHeight, clientHeight } = el;
    const start = value.indexOf(str);
    const end = start + str.length;
    const position = offsetTop + (scrollHeight - clientHeight) * (start / value.length);
    el.setSelectionRange(start, end);
    el.focus();
    el.scrollTop = position;
  }
};

const frisk = (permissions, action) => !!permissions?.includes(action);

const getJobErrorText = (errors, process) => {
  const [message] = errors.messages;
  let text = message;
  if (['unpublish', 'delete'].includes(process) && message === 'Forbidden') {
    /* c8 ignore next 2 */
    text = `Failed to ${process} - has the SharePoint document been deleted?`;
  }
  return text;
};

const getErrorText = (code) => {
  const codes = [400, 401, 403, 404, 503, 414];
  const errorText = [
    'Invalid URL',
    'Unauthorized',
    'Forbidden',
    'Not Found',
    'Timed Out',
    'Request-URI Too Long',
  ];
  return errorText[codes.indexOf(code)];
};

// code color text icon style
const getStatusProps = ({ status, count, altText }) => {
  let code = status;
  let text = 'Working';
  let state = text.toLowerCase();
  if (count) {
    text = `${count}/3 Retry`;
    code = null;
  }
  if (code && code !== 0) {
    if (isSuccess(status)) {
      text = '';
      state = 'success';
    } else {
      text = getErrorText(code);
      state = 'error';
    }
  }
  return {
    code,
    style: `result ${state}`,
    color: state,
    text: altText ?? text,
    icon: getStatusIcon(state),
  };
};

/* c8 ignore next 28 */
// update job items without re-render
const updateJobUrls = (update, jobProcess) => {
  const jobInfo = jobProcess.querySelector('job-info');
  if (jobInfo) jobInfo.status = update;
  const resources = update.data?.resources?.filter((res) => res.status !== 0);
  if (resources) {
    resources.forEach(({ path, status }) => {
      const item = jobProcess.querySelector(`[job-item='${path}']`);
      if (item && !item.hasAttribute('updated')) {
        const { text, color, icon, style } = getStatusProps({ status });
        item.className = style;
        if (color === 'error') {
          const newStatus = createTag('span', { class: `status ${color}` }, text);
          const display = item.querySelector('.status');
          display.insertAdjacentElement('afterend', newStatus);
          display.setAttribute('has-update', '');
          item.setAttribute('updated', '');
        }
        const processIcon = item.querySelector('.process-icon');
        if (processIcon) {
          processIcon.src = icon;
          processIcon.classList.remove('working');
          processIcon.classList.add(color);
        }
      }
    });
  }
};

const displayDate = (newDate) => {
  const date = new Date(newDate);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  return isToday ? date.toLocaleTimeString() : date.toLocaleString().replace(',', '');
};

const processJobResult = (jobs) => jobs.reduce((result, job) => {
  result[!job.error ? 'complete' : 'error'].push(job);
  return result;
}, { complete: [], error: [] });

const getProcessedCount = (jobs) => jobs.reduce((count, { progress }) => {
  const processed = progress?.processed ?? 0;
  return count + processed;
}, 0);

const getElapsedTime = (date1, date2) => {
  const start = new Date(date1);
  const end = new Date(date2);
  const diff = Math.abs(end - start);
  return (diff / 1000) > 60 ? `${Math.round(diff / (1000 * 60))}m` : `${Math.round(diff / 1000)}s`;
};

const setJobTime = async (tool) => {
  await tool.updateComplete;
  const { state, createTime, startTime, stopTime } = tool.status;
  const timer = tool.renderRoot.querySelector('#TimerTime');
  let start = startTime;
  let end = new Date();
  if (state === 'created') start = createTime;
  if (state === 'stopped') end = stopTime;
  if (timer) {
    timer.innerText = getElapsedTime(start, end);
    if (state !== 'stopped') {
      /* c8 ignore next 4 */
      setInterval(() => {
        timer.innerText = getElapsedTime(start, new Date());
      }, 1000);
    }
  }
};

export {
  frisk,
  displayDate,
  editEntry,
  FORM_MODES,
  getErrorText,
  getJobErrorText,
  getAemUrl,
  getElapsedTime,
  getProcessedCount,
  getHost,
  isDelete,
  isSuccess,
  PROCESS_TYPES,
  processJobResult,
  getStatusProps,
  updateJobUrls,
  sticky,
  isValidUrl,
  delay,
  setJobTime,
};
