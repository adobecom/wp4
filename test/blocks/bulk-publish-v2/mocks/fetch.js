import { readFile } from '@web/test-runner-commands';
import { stub } from 'sinon';

const [SHARE, TOPIC] = ['testshare', 'preview'];
const requests = {
  error: 'https://admin.hlx.page/preview/adobecom/milo/error/*',
  preview: 'https://admin.hlx.page/preview/adobecom/milo/main/*',
  prevstatus: 'https://admin.hlx.page/job/adobecom/milo/main/preview/job-2024-01-22t21-59-57-639z/details',
  publish: 'https://admin.hlx.page/live/adobecom/milo/main/*',
  pubstatus: 'https://admin.hlx.page/job/adobecom/milo/main/publish/job-2024-01-22t21-59-57-639z/details',
  delete: 'https://admin.hlx.page/preview/adobecom/milo/main/*',
  delstatus: 'https://admin.hlx.page/job/adobecom/milo/main/preview-remove/job-2024-01-24t23-16-20-377z/details',
  retry: 'https://admin.hlx.page/preview/adobecom/milo/main/tools/bulk-publish-v2-test',
  index: 'https://admin.hlx.page/index/adobecom/milo/main/tools/bulk-publish-v2-test',
  permissions: '/.milo/publish-permissions-config.json?limit=50000',
  sharestatus: 'https://admin.hlx.page/job/adobecom/milo/main/preview/testshare/details',
};

let shareQuery;

const getMocks = async () => {
  const mocks = await Promise.all(Object.keys(requests).map(async (request) => {
    const data = await readFile({ path: `./mocks/response/${request}.json` });
    return {
      request,
      data,
      url: requests[request],
      method: 'POST',
      status: request === 'error' ? 401 : 200,
    };
  }));
  return mocks;
};

export async function mockShare() {
  shareQuery = stub(URLSearchParams.prototype, 'get').callsFake((...args) => {
    if (args[0] === 'share-job') return SHARE;
    if (args[0] === 'share-topic') return TOPIC;
    return undefined;
  });
}

export async function mockFetch() {
  const mocks = await getMocks();
  stub(window, 'fetch').callsFake((...args) => {
    const headers = args[1]?.body ?? null;
    const body = headers ? JSON.parse(headers) : undefined;
    const [resource] = args;
    const response = mocks.find((mock) => (body?.delete ? mock.request === 'delete' : mock.url === resource));
    const { status, data } = response;
    return Promise.resolve({
      status,
      ok: status === 200,
      json: () => JSON.parse(data),
    });
  });
}

export function unmockFetch() {
  window.fetch.restore?.();
}

export function unmockShare() {
  shareQuery?.restore?.();
}
