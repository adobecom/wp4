import { createTag, getConfig, getMetadata } from '../../utils/utils.js';
import { foundDisableValues } from './dynamic-navigation.js';

export const ACTIVE = 'active';
export const ENABLED = 'enabled';
export const INACTIVE = 'inactive';
export const tooltipInfo = {
  active: 'Displayed in green, this status appears when a user is on an entry page or a page with the Dynamic Nav enabled, indicating that the nav is fully functioning.',
  enabled: 'Displayed in yellow, this status indicates that the Dynamic Nav is set to "on," but the user has not yet visited an entry page.',
  inactive: 'Displayed in red, this status indicates that the Dynamic Nav is either not configured or has been disabled.',
};

const getCurrentSource = (status, storageSource, authoredSource) => {
  if (status === 'on') {
    return storageSource || authoredSource;
  }
  return authoredSource;
};

const getStatus = (status, disabled, storageSource) => {
  if (status === 'entry') return ACTIVE;

  if (disabled) return INACTIVE;

  if (status === 'on' && storageSource) return ACTIVE;

  if (status === 'on' && !storageSource) return ENABLED;

  return INACTIVE;
};

const processDisableValues = (valueStr, elem, foundValues = false) => {
  if (!valueStr || valueStr.length === 0) return;

  const disableValueList = valueStr.split(',');
  const table = createTag('table');
  const flatValues = Array.isArray(foundValues) && foundValues.flat();

  table.innerHTML = `
      <caption>Disable Values</caption>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Match?</th>
        </tr>
      </thead>
      <tbody>
      </tbody>`;

  const tBody = table.querySelector('tbody');

  disableValueList.forEach((pair) => {
    const itemRow = createTag('tr');
    const [key, value] = pair.split(';');
    const keyElem = createTag('td');
    const valElem = createTag('td');
    const matchElem = createTag('td');
    keyElem.innerText = key;
    valElem.innerText = value;
    matchElem.innerText = flatValues && flatValues.includes(value) ? 'yes' : 'no';

    itemRow.append(keyElem, valElem, matchElem);
    tBody.append(itemRow);
  });

  elem.append(table);
};

const returnPath = (url) => {
  if (!url.startsWith('https://')) return '';
  const sourceUrl = new URL(url);
  return sourceUrl.pathname;
};

const createStatusWidget = (dynamicNavKey) => {
  const storedSource = window.sessionStorage.getItem('gnavSource');
  const authoredSource = getMetadata('gnav-source') || 'Metadata not found: site gnav source';
  const dynamicNavSetting = getMetadata('dynamic-nav');
  const currentSource = getCurrentSource(dynamicNavSetting, storedSource, authoredSource);
  const dynamicNavDisableValues = getMetadata('dynamic-nav-disable');
  const foundValues = foundDisableValues();
  const groupMetaSetting = getMetadata('dynamic-nav-group') || 'Group not set';
  const storedDyanmicNavGroup = window.sessionStorage.getItem('dynamicNavGroup');
  const groupsMatch = storedDyanmicNavGroup
    && groupMetaSetting.toLowerCase() === storedDyanmicNavGroup.toLowerCase();
  const groupsMatchMessage = groupsMatch ? 'Yes' : 'No';
  const isDisabled = foundValues.length >= 1 || (!groupsMatch && groupMetaSetting !== 'Group not set');
  const status = getStatus(dynamicNavSetting, isDisabled, storedSource);
  const statusWidget = createTag('div', { class: 'dynamic-nav-status' });

  statusWidget.innerHTML = `
    <span class="title"><span class="dns-badge"></span>Dynamic Nav</span>
    <section class="details hidden">
      <span class="dns-close"></span>
      <div class="message additional-info">
        <p>Additional Info:
          <span>${tooltipInfo[status]}</span>
        </p>
      </div>
      <p class="status">Status: <span>${status}</span></p> 
      <p class="setting">Setting: <span>${dynamicNavSetting}</span></p>
      <p class="group">Group: <span>${groupMetaSetting}</span></p>
      <p class="group-match">Group matches stored group: <span>${groupsMatchMessage}</span></p>
      <p class="consumer-key">Consumer key: <span>${dynamicNavKey}</span></p>
      <div class="nav-source-info">
        <p>Authored and stored source match: <span>${authoredSource === currentSource}</span></p>
        <p>Authored Nav Source:
        <span>${returnPath(authoredSource)}</span></p>
        <p>Stored Nav Source:
        <span>${returnPath(currentSource)}</span></p>
      </div>
      <div class="disable-values">
      </div>
    </section>
  `;

  processDisableValues(dynamicNavDisableValues, statusWidget.querySelector('.disable-values'), foundValues);
  statusWidget.classList.add(status);

  statusWidget.addEventListener('click', () => {
    statusWidget.querySelector('.details').classList.toggle('hidden');
    statusWidget.querySelector('.dns-badge').classList.toggle('dns-open');
  });

  return statusWidget;
};

export default async function main() {
  const { dynamicNavKey } = getConfig();
  const statusWidget = createStatusWidget(dynamicNavKey);
  const topNav = document.querySelector('.feds-topnav');
  const fedsWrapper = document.querySelector('.feds-nav-wrapper');
  const dnsClose = statusWidget.querySelector('.dns-close');

  dnsClose.addEventListener('click', () => {
    topNav.removeChild(statusWidget);
  });

  fedsWrapper.after(statusWidget);
}
