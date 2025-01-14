import '../../../deps/custom-elements.js';
const init = () => {
  const ENVS = {
    qa: 'qa-odin',
    stage: 'stage-odin',
    prod: 'odin',
  };
  const href = window.location.href;
  const envOverride = new URL(href).searchParams.get('aem.env');
  const env =
    envOverride && ENVS[envOverride]
      ? ENVS[envOverride]
      : ENVS.prod;
  const meta = document.createElement('meta');
  meta.name = 'aem-base-url';
  meta.content = `https://${env}.adobe.com`;
  document.head.appendChild(meta);
  import('../dist/mas.js');
  // theme
  const params = new URLSearchParams(document.location.search);
  const darkTheme = params?.get('theme')?.toLowerCase() === 'dark';
  const theme = document.createElement('script');
  theme.setAttribute('src', `../../spectrum-web-components/dist/themes/${darkTheme ? 'dark' : 'light'}.js`);
  theme.setAttribute('type', `module`);
  document.head.appendChild(theme);
  // mas-commerce-service
  const masCommerceService = document.createElement('mas-commerce-service');
  ['locale','language','env'].forEach((attribute) => {
    const value = params.get(attribute);
    if (value) masCommerceService.setAttribute(attribute, value);
  });
  masCommerceService.setAttribute('host-env', 'prod');
  masCommerceService.setAttribute('lana-tags', 'ccd');
  document.head.appendChild(masCommerceService);
}
export { init };
