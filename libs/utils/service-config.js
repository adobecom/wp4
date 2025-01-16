/**
 * Get author-facing config options.
 */

import { getConfig, SLD } from './utils.js';

const DOT_MILO = '/.milo/config.json';

let config;

/* c8 ignore next 6 */
function getSiteOrigin() {
  const search = new URLSearchParams(window.location.search);
  const repo = search.get('repo');
  const owner = search.get('owner');
  return repo && owner ? `https://main--${repo}--${owner}.${SLD}.live` : window.location.origin;
}

/**
 * Get Service Config
 * @param {*} origin The origin of the site to pull the config from.
 * @param {*} envName The name of the environment to pull configs for.
 * @returns the config
 */
export default async function getServiceConfig(suppliedOrigin, envName) {
  if (config) return config;
  const origin = suppliedOrigin || getSiteOrigin();
  const utilsConfig = getConfig();
  const queryEnv = new URLSearchParams(window.location.search).get('env');
  const env = queryEnv || envName || utilsConfig.env.name;
  const resp = await fetch(`${origin}${DOT_MILO}`);
  if (!resp.ok) return { error: 'Could not fetch .milo/config.' };
  const json = await resp.json();
  const configs = {};
  json.configs.data.forEach((conf) => {
    const [confEnv, confService, confType] = conf.key.split('.');
    configs[confEnv] ??= {};
    configs[confEnv][confService] ??= {};
    configs[confEnv][confService][confType] = conf.value;
  });
  config = configs.prod;
  if (env === 'prod') return config;

  // Stage inheritance
  Object.keys(config).forEach((key) => {
    if (configs.stage && configs.stage[key]) {
      config[key] = { ...config[key], ...configs.stage[key] };
    }
  });
  if (env === 'stage') return config;

  // Local inheritance
  Object.keys(config).forEach((key) => {
    if (configs.local && configs.local[key]) {
      config[key] = { ...config[key], ...configs.local[key] };
    }
  });
  return config;
}
