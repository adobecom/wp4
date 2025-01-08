import { html, signal, useEffect } from '../../../deps/htm-preact.js';
import userCanPublishPage from '../../../tools/utils/publish.js';

const DEF_NOT_FOUND = 'Not found';
const DEF_NEVER = 'Never';
const NOT_FOUND = {
  preview: { lastModified: DEF_NOT_FOUND },
  live: { lastModified: DEF_NOT_FOUND },
};
const DA_DOMAIN = 'da.live';

const content = signal({});

function getAdminUrl(url, type) {
  const project = url.hostname === 'localhost' ? 'main--milo--adobecom' : url.hostname.split('.')[0];
  const [branch, repo, owner] = project.split('--');
  const base = `https://admin.hlx.page/${type}/${owner}/${repo}/${branch}${url.pathname}`;
  return type === 'status' ? `${base}?editUrl=auto` : base;
}

async function getStatus(url) {
  const adminUrl = getAdminUrl(url, 'status');
  const resp = await fetch(adminUrl);
  if (!resp.ok) return {};
  const json = await resp.json();
  const preview = json.preview.lastModified || DEF_NEVER;
  const live = json.live.lastModified || DEF_NEVER;
  const publish = await userCanPublishPage(json, false);
  const { sourceLocation } = json.preview;
  const edit = json.edit?.url
    || (sourceLocation?.includes(DA_DOMAIN) && sourceLocation?.replace('markup:https://content.da.live', 'https://da.live/edit#'))
    || '';
  return { url, edit, preview, live, publish };
}

async function getStatuses() {
  Object.keys(content.value).forEach(async (key) => {
    content.value[key].items.forEach(async (item, idx) => {
      const status = await getStatus(item.url);
      content.value[key].items[idx] = status;
      content.value = { ...content.value };
    });
  });
}

function getUrl(el) {
  const { modalPath, modalHash, path: fragmentPath } = el.dataset;
  const dataPath = modalPath ? `${modalPath}${modalHash}` : fragmentPath;
  try {
    return new URL(dataPath);
  } catch {
    const elPath = el.href || (el.src && el.nodeName === 'IFRAME' ? el?.parentElement.dataset.pdfSrc : el.src);
    const path = dataPath ? `${window.location.origin}${dataPath}` : elPath;
    return new URL(path);
  }
}

function findLinks(selector) {
  const hrefs = [];
  return [...document.body.querySelectorAll(selector)]
    .reduce((links, el) => {
      const url = getUrl(el);
      if (!hrefs.includes(url.href)) {
        hrefs.push(url.href);
        links.push({ url, edit: null, preview: 'Fetching', live: 'Fetching' });
      }
      return links;
    }, []);
}

async function setContent() {
  if (content.value.page) return;

  content.value = {
    page: { items: [{ url: new URL(window.location.href), edit: null, preview: 'Fetching', live: 'Fetching' }] },
    fragments: { items: findLinks('main .fragment, a[data-modal-path], [data-path]') },
    links: { items: findLinks('main a[href^="/"') },
    svgs: { items: findLinks('img[src$=".svg"') },
    pdfs: { items: findLinks('main iframe') },
    nav: { items: findLinks('header a[href^="/"'), closed: true },
  };

  getStatuses();
  const sk = document.querySelector('aem-sidekick, helix-sidekick');
  sk?.addEventListener('statusfetched', async () => {
    getStatuses();
  });
}

async function handleAction(action) {
  Object.keys(content.value).map(async (key) => {
    content.value[key].items.forEach(async (item, idx) => {
      const checkPublish = action === 'live' ? (item.publish && !item.publish.canPublish) : false;
      if (!item.checked || checkPublish) return;
      content.value[key].items[idx].action = action;
      content.value = { ...content.value };
      const adminUrl = getAdminUrl(item.url, action);
      const resp = await fetch(adminUrl, { method: 'POST' });
      const json = resp.ok ? await resp.json() : NOT_FOUND;
      content.value[key].items[idx] = {
        ...item,
        action: null,
        preview: json.preview?.lastModified || item.preview,
        live: json.live?.lastModified || item.live,
      };
      content.value = { ...content.value };
    });
  });
}

function toggleSelect(checked) {
  const copy = { ...content.value };
  Object.keys(copy).forEach((key) => {
    if (copy[key].closed) return;
    copy[key].items.forEach((item) => { item.checked = !checked; });
  });
  content.value = copy;
}

function handleChange(target, name, idx) {
  if (target.nodeName === 'A') return;
  content.value[name].items[idx].checked = !content.value[name].items[idx].checked;
  content.value = { ...content.value };
}

function toggleGroup(name) {
  content.value[name].closed = !content.value[name].closed;
  content.value = { ...content.value };
}

function checkPublishing(item, isFetching) {
  if ((item.preview === DEF_NEVER && item.live === DEF_NEVER)
    || (item.preview === DEF_NOT_FOUND && item.live === DEF_NOT_FOUND)) {
    return ' not-found';
  }
  return isFetching;
}

function prettyDate(string) {
  if (Number.isNaN(Date.parse(string))) return string;

  const date = new Date(string);
  const localeDate = date.toLocaleString();
  const splitDate = localeDate.split(', ');

  return html`
    <span class=preflight-date>${splitDate[0]}</span>
    <span class=preflight-time>${splitDate[1]}</span>
  `;
}

function prettyPath(url) {
  if (url.pathname === window.location.pathname) return url.pathname;
  return url.hash ? `${url.pathname} (${url.hash})` : url.pathname;
}

function usePublishProps(item) {
  let disablePublish;
  if (item.publish && !item.publish.canPublish) {
    disablePublish = html`${item.publish.message}`;
  }
  return {
    publishText: html`${item.action === 'live' ? 'Publishing' : prettyDate(item.live)}`,
    disablePublish,
  };
}

function Item({ name, item, idx }) {
  const { publishText, disablePublish } = usePublishProps(item);
  const isChecked = item.checked ? ' is-checked' : '';
  const isFetching = item.edit ? '' : ' is-fetching';
  const editIcon = item.edit && item.edit.includes(DA_DOMAIN) ? 'da-icon' : 'sharepoint-icon';
  if (!item.url) return undefined;

  return html`
    <div class="preflight-group-row preflight-group-detail${isChecked}${checkPublishing(item, isFetching)}"
      onClick=${(e) => handleChange(e.target, name, idx)}>
      <p><a href=${item.url.pathname} target=_blank>${prettyPath(item.url)}</a></p>
      <p>${item.edit && html`<a href=${item.edit} class="preflight-edit ${editIcon}" target=_blank>EDIT</a>`}</p>
      <p class=preflight-date-wrapper>${item.action === 'preview' ? 'Previewing' : prettyDate(item.preview)}</p>
      <p class="preflight-date-wrapper">
        ${isChecked && disablePublish ? html`<span class=disabled-publish>${disablePublish}</span>` : publishText}
      </p>
    </div>`;
}

function ContentGroup({ name, group }) {
  if (group.items.length === 0) return null;
  const isClosed = group.closed ? ' is-closed' : '';

  return html`
    <div class="preflight-content-group${isClosed}">
      <div class="preflight-group-row preflight-group-heading" onClick=${() => toggleGroup(name)}>
        <div class="preflight-group-expand"></div>
        <p class=preflight-content-heading>${name}</p>
        ${name === 'page' && html`
          <p class="preflight-content-heading preflight-content-heading-edit">Edit</p>
          <p class=preflight-content-heading>Previewed</p>
          <p class=preflight-content-heading>Published</p>
        `}
      </div>
      <div class=preflight-group-items>
      ${group.items.map((item, idx) => html`<${Item} name=${name} idx=${idx} item=${item} />`)}
      </div>
    </div>`;
}

export default function General() {
  useEffect(() => { setContent(); }, []);

  const allChecked = Object.values(content.value)
    .flatMap((item) => item.items).filter((item) => item.checked);

  const checked = !!allChecked.length;
  const publishable = allChecked
    .filter((item) => item.checked && !!item.publish?.canPublish).length;

  const hasPage = content.value.page;
  const selectStyle = checked ? 'Select none' : 'Select all';

  const tooltip = allChecked.length !== publishable && 'Puplishing disabled pages will be ignored';

  return html`
    <div class=preflight-general-content>
      ${Object.keys(content.value).map((key) => html`<${ContentGroup} name=${key} group=${content.value[key]} />`)}
    </div>

    <div class=preflight-actions>
      ${hasPage && html`
        <div id=select-action class=preflight-action-wrapper>
          <button class=preflight-action onClick=${() => toggleSelect(checked)}>${selectStyle}</button>
        </div>
      `}
      ${checked && html`
        <div id=preview-action class=preflight-action-wrapper>
          <button class=preflight-action onClick=${() => handleAction('preview')}>Preview</button>
        </div>
        ${!!publishable && html`
          <div id=publish-action class="preflight-action-wrapper${tooltip ? ' tooltip' : ''}" data-tooltip=${tooltip}>
            <button class="preflight-action" onClick=${() => handleAction('live')}>
              Publish
            </button>
          </div>
        `}
      `}
    </div>
  `;
}
