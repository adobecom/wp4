import { getMetadata, handleStyle } from '../section-metadata/section-metadata.js';

export default async function init(el) {
  const modal = el.closest('.dialog-modal');
  if (!modal) return;
  const metadata = getMetadata(el);
  if (metadata.style) handleStyle(metadata.style.text, modal);
  if (metadata.curtain?.text === 'off') modal.classList.add('curtain-off');
  if (modal.classList.contains('tall-video')) {
    const { handleBackground } = await import('../section-metadata/section-metadata.js');
    if (metadata.background) handleBackground(metadata, modal);
  }
}
