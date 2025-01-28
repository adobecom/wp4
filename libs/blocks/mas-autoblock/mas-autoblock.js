import { createTag, getConfig } from '../../utils/utils.js';
import { initService } from '../merch/merch.js';

export default async function init(el) {
  const { hash } = new URL(el.href);
  const hashValue = hash.startsWith('#') ? hash.substring(1) : hash;
  const searchParams = new URLSearchParams(hashValue);
  const fragment = searchParams.get('fragment');

  if (!fragment) return;

  const { base } = getConfig();
  await Promise.all([
    import(`${base}/deps/mas/mas.js`),
    initService(),
  ]);
  const aemFragment = createTag('aem-fragment', { fragment });
  const merchCard = createTag('merch-card', { consonant: '' }, aemFragment);
  el.replaceWith(merchCard);
  await aemFragment.updateComplete;
  await merchCard.checkReady();
}
