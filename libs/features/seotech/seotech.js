export const PROD_BASE_URL = 'https://www.adobe.com/seotech/api';

export const REGEX_ADOBETV = /(?:https?:\/\/)?(?:stage-)?video.tv.adobe.com\/v\/([\d]+)/;
export const REGEX_YOUTUBE = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]+)/;
export const VIDEO_OBJECT_PROVIDERS = [
  { provider: 'adobe', regex: REGEX_ADOBETV },
  { provider: 'youtube', regex: REGEX_YOUTUBE },
];

export function logError(msg) {
  window.lana?.log(`SEOTECH: ${msg}`, {
    debug: false,
    implicitSampleRate: 100,
    sampleRate: 100,
    tags: 'errorType=seotech',
  });
}

export function parseVideoUrl(url, providers = VIDEO_OBJECT_PROVIDERS) {
  for (const { regex, provider } of providers) {
    const match = url.match(regex);
    if (match) {
      return { provider, id: match[1] };
    }
  }
  return null;
}

export async function getVideoObject(url, { baseUrl = PROD_BASE_URL } = {}) {
  const parsedUrl = parseVideoUrl(url);
  if (!parsedUrl) {
    throw new Error(`Invalid video url: ${url}`);
  }
  const { provider, id } = parsedUrl;
  const videoObjectUrl = `${baseUrl}/json-ld/types/video-object/providers/${provider}/${id}`;
  const resp = await fetch(videoObjectUrl, { headers: { 'Content-Type': 'application/json' } });
  const body = await resp?.json();
  if (!resp.ok) {
    throw new Error(`Failed to fetch video: ${body?.error}`);
  }
  return body.videoObject;
}

// https://github.com/orgs/adobecom/discussions/2633
export function getRepoByImsClientId(imsClientId) {
  return {
    'adobedotcom-cc': 'cc',
    acrobatmilo: 'dc',
    bacom: 'bacom',
    homepage_milo: 'homepage',
    milo: 'milo',
  }[imsClientId];
}

export async function sha256(message) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function getStructuredData(bucket, id, { baseUrl = PROD_BASE_URL } = {}) {
  if (!bucket || !id) throw new Error('bucket and id are required');
  const url = `${baseUrl}/structured-data/${bucket}/${id}`;
  const resp = await fetch(url);
  if (!resp || !resp.ok) return null;
  const body = await resp.json();
  return body;
}

export async function appendScriptTag({ locationUrl, getMetadata, createTag, getConfig }) {
  const url = new URL(locationUrl);
  const params = new URLSearchParams(url.search);
  const baseUrl = params.get('seotech-api-base-url') || undefined;
  const append = (obj, className) => {
    if (!obj) return;
    const attributes = { type: 'application/ld+json' };
    if (className) attributes.class = className;
    const script = createTag('script', attributes, JSON.stringify(obj));
    document.head.append(script);
  };

  const promises = [];
  if (getMetadata('seotech-structured-data') === 'on') {
    const bucket = getRepoByImsClientId(getConfig()?.imsClientId);
    const id = await sha256(url.pathname?.replace('.html', ''));
    promises.push(getStructuredData(bucket, id, { baseUrl })
      .then((obj) => append(obj, 'seotech-structured-data'))
      .catch((e) => logError(e.message)));
  }
  const videoUrl = getMetadata('seotech-video-url');
  if (videoUrl) {
    promises.push(getVideoObject(videoUrl, { baseUrl })
      .then((videoObject) => append(videoObject, 'seotech-video-url'))
      .catch((e) => logError(e.message)));
  }
  return Promise.all(promises);
}

export default appendScriptTag;
