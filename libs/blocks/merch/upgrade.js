import { createTag, getConfig, reloadPage } from '../../utils/utils.js';
import { replaceKey } from '../../features/placeholders.js';

const MANAGE_PLAN_MSG_SUBTYPE = {
  AppLoaded: 'AppLoaded',
  EXTERNAL: 'EXTERNAL',
  SWITCH: 'SWITCH',
  RETURN_BACK: 'RETURN_BACK',
  OrderComplete: 'OrderComplete',
  Error: 'Error',
  Close: 'Close',
};
const isProductFamily = (offer, pfs) => {
  const productFamily = offer?.offer?.product_arrangement?.family;
  return productFamily && pfs.includes(productFamily);
};
export const LANA_OPTIONS = {
  clientId: 'merch-at-scale',
  sampleRate: 10,
  tags: 'manage-plan',
};

export const lanaLog = async (msg, subType) => {
  const { userId } = await window.adobeIMS?.getProfile() ?? {};
  window.lana?.log(`ManagePlan/${subType}/${userId}: ${msg}`, LANA_OPTIONS);
};

let shouldRefetchEntitlements = false;

function buildUrl(upgradeOffer, upgradable, env) {
  const toOffer = upgradeOffer?.value[0].offerId;
  const fromOffer = upgradable?.offer?.offer_id;
  if (!toOffer || !fromOffer) return undefined;
  const url = new URL(env?.name === 'prod' ? 'https://plan.adobe.com' : 'https://stage.plan.adobe.com');
  url.searchParams.append('intent', 'switch');
  url.searchParams.append('toOfferId', toOffer);
  url.searchParams.append('fromOffer', fromOffer);
  url.searchParams.append('language', 'en'); // todo check where comes from
  url.searchParams.append('surface', 'ADOBE_COM');
  url.searchParams.append('ctx', 'if');
  url.searchParams.append('ctxRtUrl', encodeURIComponent(window.location.href));
  if (upgradeOffer.dataset?.promotionCode) {
    url.searchParams.append('promoCode', upgradeOffer.dataset.promotionCode);
  }
  return url.toString();
}

export const handleIFrameEvents = ({ data: msgData }) => {
  let parsedMsg = null;
  try {
    parsedMsg = JSON.parse(msgData);
  } catch (error) {
    return;
  }
  const { app, subType, data } = parsedMsg || {};

  if (app !== 'ManagePlan') return;
  switch (subType) {
    case MANAGE_PLAN_MSG_SUBTYPE.AppLoaded:
      document.querySelector('.upgrade-flow-content iframe')?.classList?.remove('loading');
      document.querySelector('.upgrade-flow-content sp-theme')?.remove();
      lanaLog('Showing modal', subType);
      break;
    case MANAGE_PLAN_MSG_SUBTYPE.EXTERNAL:
      if (!data?.externalUrl || !data.target) return;
      lanaLog('Opening external URL', subType);
      window.open(data.externalUrl, data.target);
      break;
    case MANAGE_PLAN_MSG_SUBTYPE.SWITCH:
      if (!data?.externalUrl || !data.target) return;
      lanaLog('Opening external URL (SWITCH)', subType);
      window.open(data.externalUrl, data.target);
      break;
    case MANAGE_PLAN_MSG_SUBTYPE.RETURN_BACK:
      if (!data?.externalUrl || !data.target) return;
      if (data.returnUrl) {
        window.sessionStorage.setItem('upgradeModalReturnUrl', data.returnUrl);
      }
      lanaLog('Opening external URL (RETURN_BACK)', subType);
      window.open(data.externalUrl, data.target);
      break;
    case MANAGE_PLAN_MSG_SUBTYPE.OrderComplete:
      shouldRefetchEntitlements = true;
      break;
    case MANAGE_PLAN_MSG_SUBTYPE.Error:
      break;
    case MANAGE_PLAN_MSG_SUBTYPE.Close:
      if (shouldRefetchEntitlements) {
        lanaLog('Reloading page to update entitlements', subType);
        reloadPage();
      }
      lanaLog('Closing modal', subType);
      document.querySelector('.dialog-modal.upgrade-flow-modal')?.dispatchEvent(new Event('closeModal'));
      break;
    default:
      break;
  }
};

export default async function handleUpgradeOffer(
  ctaPF,
  upgradeOffer,
  entitlements,
  SOURCE_PF,
  TARGET_PF,
) {
  if (!TARGET_PF.includes(ctaPF)) return undefined;

  const hasUpgradeTarget = entitlements?.find((offer) => isProductFamily(offer, TARGET_PF));
  if (hasUpgradeTarget) return undefined;

  const changePlanOffers = entitlements?.filter((offer) => offer.change_plan_available === true);
  const upgradable = changePlanOffers?.find((offer) => isProductFamily(offer, SOURCE_PF));
  if (!upgradable) return undefined;

  const { env, base } = getConfig();
  const upgradeUrl = buildUrl(upgradeOffer, upgradable, env);
  if (upgradeUrl) {
    window.addEventListener('message', handleIFrameEvents);
    const { getModal } = await import('../modal/modal.js');
    const showModal = async (e, hash) => {
      e.preventDefault();
      await Promise.all([
        import(`${base}/features/spectrum-web-components/dist/theme.js`),
        import(`${base}/features/spectrum-web-components/dist/progress-circle.js`),
      ]);
      const content = createTag('div', { class: 'upgrade-flow-content' });
      const iframe = createTag('iframe', {
        src: upgradeUrl,
        title: 'Upgrade modal',
        frameborder: '0',
        marginwidth: '0',
        marginheight: '0',
        allowfullscreen: 'true',
        loading: 'lazy',
        class: 'loading upgrade-flow-iframe',
      });
      const pCircle = createTag('sp-progress-circle', { label: 'progress circle', indeterminate: true, size: 'l' });
      const theme = createTag('sp-theme', { theme: 'spectrum', color: 'light', scale: 'medium', dir: 'ltr' });
      theme.append(pCircle);
      content.append(theme);
      content.append(iframe);
      if (hash) {
        const prevHash = window.location.hash.replace('#', '') === hash ? '' : window.location.hash;
        window.location.hash = hash;
        window.addEventListener('milo:modal:closed', () => {
          window.location.hash = prevHash;
        }, { once: true });
      }
      return getModal(null, { id: 'switch-modal', content, closeEvent: 'closeModal', class: ['upgrade-flow-modal'] });
    };
    const text = await replaceKey('upgrade-now', getConfig());
    return { text, className: 'upgrade', url: upgradeUrl, handler: showModal };
  }
  return undefined;
}
