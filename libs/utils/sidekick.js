import stylePublish from './sidekick-decorate.js';

// loadScript and loadStyle are passed in to avoid circular dependencies
export default function init({ createTag, loadBlock, loadScript, loadStyle }) {
  // manifest v3
  const sendToCaasListener = async (e) => {
    const { host, project, ref: branch, repo, owner } = e.detail.data.config;
    // eslint-disable-next-line import/no-unresolved
    const { sendToCaaS } = await import('https://milo.adobe.com/tools/send-to-caas/send-to-caas.js');
    sendToCaaS({ host, project, branch, repo, owner }, loadScript, loadStyle);
  };

  const checkSchemaListener = async () => {
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema === null) return;
    const resultsUrl = 'https://search.google.com/test/rich-results?url=';
    window.open(`${resultsUrl}${encodeURIComponent(window.location.href)}`, 'check-schema');
  };

  const preflightListener = async () => {
    const preflight = createTag('div', { class: 'preflight' });
    const content = await loadBlock(preflight);

    const { getModal } = await import('../blocks/modal/modal.js');
    getModal(null, { id: 'preflight', content, closeEvent: 'closeModal' });
  };

  // Support for legacy manifest v2 - Delete once everyone is migrated to v3
  document.addEventListener('send-to-caas', async (e) => {
    const { host, project, branch, repo, owner } = e.detail;
    const { sendToCaaS } = await import('../../tools/send-to-caas/send-to-caas.js');
    sendToCaaS({ host, project, branch, repo, owner }, loadScript, loadStyle);
  });

  const sk = document.querySelector('aem-sidekick, helix-sidekick');

  // Add plugin listeners here
  sk.addEventListener('custom:send-to-caas', sendToCaasListener);
  sk.addEventListener('custom:check-schema', checkSchemaListener);
  sk.addEventListener('custom:preflight', preflightListener);

  // Color code publish button
  stylePublish(sk);
}
