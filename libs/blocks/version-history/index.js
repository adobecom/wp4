import {
  origin,
  itemId,
  comment,
  versions,
  error,
  showLogin,
} from './state.js';
import { getVersions, createVersion } from '../../tools/sharepoint/version.js';

const TELEMETRY = { application: { appName: 'Adobe Version History' } };
const CREATE_ERROR = 'Error creating version.';

function getSiteOrigin() {
  const search = new URLSearchParams(window.location.search);
  const repo = search.get('repo');
  const owner = search.get('owner');
  // TODO ADD HLX5 SUPPORT
  return repo && owner ? `https://main--${repo}--${owner}.hlx.live` : window.location.origin;
}

function getItemId() {
  const referrer = new URLSearchParams(window.location.search).get('referrer');
  const sourceDoc = referrer?.match(/sourcedoc=([^&]+)/)[1];
  const sourceId = decodeURIComponent(sourceDoc);
  return sourceId.slice(1, -1);
}

export function onChangeComment(e) {
  comment.value = e.target.value;
}

export async function onClickCreateVersion() {
  const res = await createVersion(origin.value, itemId.value, comment.value);

  if (!res.ok) {
    const json = await res.json();
    error.value = json['odata.error']?.message?.value || CREATE_ERROR;
    throw new Error(CREATE_ERROR);
  }

  comment.value = '';
  versions.value = await getVersions(TELEMETRY, origin.value, itemId.value);
}

export async function setup() {
  origin.value = getSiteOrigin();
  itemId.value = getItemId();
  versions.value = await getVersions(TELEMETRY, origin.value, itemId.value);
  showLogin.value = false;
}

export async function autoSetup() {
  try {
    await setup();
  } catch {
    showLogin.value = true;
  }
}
