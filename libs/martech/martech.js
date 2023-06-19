const TARGET_TIMEOUT_MS = 2000;

const setDeep = (obj, path, value) => {
  const pathArr = path.split('.');
  let currentObj = obj;

  for (const key of pathArr.slice(0, -1)) {
    if (!currentObj[key] || typeof currentObj[key] !== 'object') {
      currentObj[key] = {};
    }
    currentObj = currentObj[key];
  }

  currentObj[pathArr[pathArr.length - 1]] = value;
};

const waitForEventOrTimeout = (eventName, timeout) => new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error(`Timeout waiting for ${eventName} after ${timeout}ms`));
  }, timeout);

  window.addEventListener(eventName, (event) => {
    clearTimeout(timer);
    resolve(event.detail);
  }, { once: true });
});

const getExpFromParam = (expParam) => {
  const lastSlash = expParam.lastIndexOf('/');
  return {
    experiments: [{
      experimentPath: expParam.substring(0, lastSlash),
      variantLabel: expParam.substring(lastSlash + 1),
    }],
  };
};

const handleAlloyResponse = (response) => {
  const items = (
    (response.propositions?.length && response.propositions)
    || (response.decisions?.length && response.decisions)
    || []
  ).map((i) => i.items).flat();

  if (!items?.length) return [];

  return items
    .map((item) => {
      const content = item?.data?.content;
      if (!content) return null;

      return {
        manifestPath: content.manifestLocation || content.manifestPath,
        manifestData: content.manifestContent?.data,
        name: item.meta['activity.name'],
        variantLabel: item.meta['experience.name'] && `target-${item.meta['experience.name']}`,
        meta: item.meta,
      };
    })
    .filter(Boolean);
};

const getTargetPersonalization = async () => {
  // TODO: do we need this?
  if (navigator.userAgent.match(/bot|crawl|spider/i)) {
    return {};
  }
  const params = new URL(window.location.href).searchParams;

  const experimentParam = params.get('experiment');
  if (experimentParam) return getExpFromParam(experimentParam);

  const timeout = parseInt(params.get('target-timeout'), 10) || TARGET_TIMEOUT_MS;

  let response;
  try {
    response = await waitForEventOrTimeout('alloy_sendEvent', timeout);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  let manifests = [];
  if (response) {
    manifests = handleAlloyResponse(response.result);
  }

  return manifests;
};

export default async function init({ persEnabled = false, persManifests, utils }) {
  const getDetails = (env) => ({
    edgeConfigId: env.consumer?.edgeConfigId || env.edgeConfigId,
    url:
      env.name === 'prod'
        ? 'https://assets.adobedtm.com/d4d114c60e50/a0e989131fd5/launch-5dd5dd2177e6.min.js'
        // TODO: This is a custom launch script for milo-target - update before merging to main
        : 'https://assets.adobedtm.com/d4d114c60e50/a0e989131fd5/launch-a27b33fc2dc0-development.min.js',
  });

  const config = utils.getConfig();

  const { url, edgeConfigId } = getDetails(config.env);
  utils.loadLink(url, { as: 'script', rel: 'preload' });

  setDeep(
    window,
    'alloy_all.data._adobe_corpnew.digitalData.page.pageInfo.language',
    config.locale.ietf,
  );
  setDeep(window, 'digitalData.diagnostic.franklin.implementation', 'milo');

  window.marketingtech = {
    adobe: {
      launch: { url, controlPageLoad: false },
      alloy: { edgeConfigId },
      target: false,
    },
  };
  window.edgeConfigId = edgeConfigId;

  await utils.loadScript(`${config.miloLibs || config.codeRoot}/deps/martech.main.standard.min.js`);
  // eslint-disable-next-line no-underscore-dangle
  window._satellite.track('pageload');

  if (persEnabled) {
    const targetManifests = await getTargetPersonalization(utils);
    if (targetManifests || persManifests?.length) {
      const { applyPersonalization } = await import('../features/personalization/personalization.js');
      await applyPersonalization({ persManifests, targetManifests }, utils);
    }
  }
}
