import { loadBlock, decorateAutoBlock } from '../../../../utils/utils.js';
import { toFragment, lanaLog } from '../../utilities/utilities.js';
import { processTrackingLabels } from '../../../../martech/attributes.js';

export default async function decorateAside({ headerElem, fedsPromoWrapper, promoPath } = {}) {
  const onError = () => {
    fedsPromoWrapper?.remove();
    headerElem?.classList.remove('has-promo');
    lanaLog({ message: 'Gnav Promo fragment not replaced, potential CLS' });
    return '';
  };

  const fragLink = toFragment`<a href="${promoPath}">${promoPath}</a>`;
  const fragTemplate = toFragment`<div>${fragLink}</div>`;
  decorateAutoBlock(fragLink);
  if (!fragLink.classList.contains('fragment')) return onError();
  await loadBlock(fragLink).catch(() => onError());
  const aside = fragTemplate.querySelector('.aside');
  if (fragTemplate.contains(fragLink) || !aside) return onError();

  aside.removeAttribute('data-block');
  aside.setAttribute('daa-lh', 'Promo');

  aside.querySelectorAll('a').forEach((link, index) => {
    link.setAttribute('daa-ll', `${processTrackingLabels(link.textContent)}--${index + 1}`);
  });

  return aside;
}
