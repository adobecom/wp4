/* eslint-disable new-cap */
/* global tingle */
/* eslint-disable no-alert */
import { getImsToken } from '../utils/utils.js';

import {
  getCardMetadata,
  getCaasProps,
  isPagePublished,
  loadCaasTags,
  postDataToCaaS,
  setConfig,
  getConfig,
} from './send-utils.js';

const [setPublishingTrue, setPublishingFalse, isPublishing] = (() => {
  let publishing = false;
  return [
    () => { publishing = true; },
    () => { publishing = false; },
    () => publishing,
  ];
})();

// Tingle is the js library for displaying modals
const loadTingleModalFiles = async (loadScript, loadStyle) => {
  if (!window.tingle?.modal) {
    await Promise.all([
      loadScript('https://milo.adobe.com/libs/deps/tingle.js'),
      loadStyle('https://milo.adobe.com/libs/deps/tingle.css'),
    ]);
  }
};

const showAlert = (msg, { error = false, onClose, showBtn = true, btnText = 'OK' } = {}) => {
  const modal = new tingle.modal({
    footer: true,
    closeMethods: ['overlay', 'escape'],
    onClose() {
      if (onClose) { onClose(); }
      this.destroy();
    },
  });
  let msgContent = msg;
  if (error) { // show alert icon
    msgContent = `<div class="modal-error"><div class="modal-alert"></div><div>${msg}</div></div>`;
  }
  modal.setContent(msgContent);
  if (showBtn) {
    modal.addFooterBtn(btnText, 'tingle-btn tingle-btn--primary tingle-btn--pull-right', () => modal.close());
  }
  modal.open();
  return modal;
};

const showConfirm = (msg, {
  onClose,
  cssClass = [],
  ctaBtnType = 'primary',
  ctaText = 'OK',
  cancelBtnType = 'default',
  cancelText = 'Cancel',
  footerContent = '',
  initCode,
  leftButton,
} = {}) => new Promise((resolve) => {
  let ok = false;
  const modal = new tingle.modal({
    cssClass,
    footer: true,
    closeMethods: ['escape'],
    onClose() {
      if (onClose) onClose(this);
      this.destroy();
      resolve(ok);
    },
  });
  modal.setContent(msg);
  if (footerContent) {
    modal.setFooterContent(footerContent);
  }

  if (ctaText) {
    modal.addFooterBtn(ctaText, `tingle-btn tingle-btn--${ctaBtnType} tingle-btn--pull-right`, () => {
      ok = true;
      modal.close();
    });
  }

  modal.addFooterBtn(cancelText, `tingle-btn tingle-btn--${cancelBtnType} tingle-btn--pull-right`, () => {
    ok = false;
    modal.close();
  });
  if (leftButton) {
    modal.addFooterBtn(leftButton.text, 'tingle-btn tingle-btn--default tingle-btn--pull-left', () => {
      leftButton.callback?.();
    });
  }

  if (initCode) initCode(modal.modal);

  modal.open();
});

const displayPublishingModal = () => {
  const publishingModal = new tingle.modal({
    closeMethods: [],
    cssClass: ['modal-text-align-center'],
    onClose() {
      this.destroy();
    },
  });
  publishingModal.setContent('Publishing to CaaS...');
  publishingModal.open();
  return publishingModal;
};

const verifyInfoModal = async (tags, tagErrors, showAllPropertiesAlert) => {
  let okToContinue = false;
  let draftOnly = false;
  let useHtml = false;
  let caasEnv;

  const seeAllPropsBtn = {
    text: 'See all properties',
    callback: showAllPropertiesAlert,
  };

  const footerOptions = `
    <div class="verify-info-footer">
      <div class="caas-env">
        <label for="caas-env-select">CaaS Env</label>
        <select name="1A" id="caas-env-select">
          <option>Prod</option>
          <option>Stage</option>
          <option>Dev</option>
        </select>
      </div>
      <div id="caas-draft-cb">
        <input type="checkbox" id="draftcb" name="draftcb">
        <label for="draftcb">Publish to Draft only</label>
      </div>
      <div id="caas-use-html-cb" class="field checkbox">
        <input type="checkbox" id="usehtml" name="usehtml">
        <label for="usehtml">Use .html extension</label>
      </div>
    </div>`;

  const onClose = () => {
    caasEnv = document.getElementById('caas-env-select')?.value?.toLowerCase();
    draftOnly = document.getElementById('draftcb')?.checked;
    useHtml = document.getElementById('usehtml')?.checked;
  };

  const modalInit = (modal) => {
    const caasEnvSelect = modal.querySelector('#caas-env-select');
    const caasEnvVal = caasEnvSelect.value?.toLowerCase();
    const useHtmlCb = modal.querySelector('#usehtml');
    if (caasEnvVal === 'prod') {
      useHtmlCb.checked = true;
    }
    caasEnvSelect.addEventListener('change', (e) => {
      useHtmlCb.checked = e.target.value?.toLowerCase() === 'prod';
    });
  };

  if (!tags.length) {
    const msg = '<div><p><b>No Tags found on page</b></p><p>Please add at least one tag to the Card Metadata</p></div>';
    okToContinue = await showConfirm(msg, {
      cssClass: ['verify-info-modal'],
      ctaText: '',
      cancelBtnType: 'danger',
      cancelText: 'Cancel Registration',
      footerContent: footerOptions,
      leftButton: seeAllPropsBtn,
      onClose,
    });
  } else if (tagErrors.length) {
    const msg = [
      '<div class="">',
      '<p><b>The following tags were not found:</b></p>',
      tagErrors.join('<br>'),
      '<p><b>Ok to publish without those tags defined?</b></p>',
      '<p>The following tags will be used:</p>',
      tags.join('<br>'),
      '</div>',
    ].join('');
    okToContinue = await showConfirm(msg, {
      cssClass: ['verify-info-modal'],
      ctaText: 'Publish with missing tags',
      cancelBtnType: 'grey',
      cancelText: 'Cancel Registration',
      ctaBtnType: 'danger',
      footerContent: footerOptions,
      initCode: modalInit,
      leftButton: seeAllPropsBtn,
      onClose,
    });
  } else {
    const msg = [
      '<div><p><b>The following tags will be used:</b></p>',
      tags.join('<br>'),
      '<p><b>Please verify that these are correct.</b></p></div>',
    ].join('');
    okToContinue = await showConfirm(msg, {
      cssClass: ['verify-info-modal'],
      cancelBtnType: 'grey',
      cancelText: 'Cancel Registration',
      ctaText: 'Continue with these tags',
      footerContent: footerOptions,
      initCode: modalInit,
      leftButton: seeAllPropsBtn,
      onClose,
    });
  }
  return {
    caasEnv,
    draftOnly,
    okToContinue,
    useHtml,
  };
};

const isUseHtmlChecked = () => document.getElementById('usehtml')?.checked;

const sortObjByPropName = (obj) => Object.keys(obj)
  // eslint-disable-next-line no-return-assign, no-sequences
  .sort().reduce((c, d) => (c[d] = obj[d], c), {});

const validateProps = async (prodHost, publishingModal) => {
  const { caasMetadata, errors, tags, tagErrors } = await getCardMetadata(
    { prodUrl: `${prodHost}${window.location.pathname}` },
  );

  const showAllPropertiesAlert = async () => {
    const { caasMetadata: cMetaData } = await getCardMetadata(
      { prodUrl: `${prodHost}${window.location.pathname}${isUseHtmlChecked() ? '.html' : ''}` },
    );
    const mdStr = JSON.stringify(sortObjByPropName(cMetaData), undefined, 4);
    showAlert(`<h3>All CaaS Properties</h3><pre id="json" style="white-space:pre-wrap;font-size:14px;">${mdStr}</pre>`);
  };

  const { draftOnly, caasEnv, okToContinue, useHtml } = await verifyInfoModal(
    tags,
    tagErrors,
    showAllPropertiesAlert,
  );

  if (!okToContinue) {
    setPublishingFalse();
    publishingModal.close();
    return false;
  }

  if (errors.length) {
    publishingModal.close();
    const msg = [
      '<p>There were problems with the following:</p>',
      errors.join('<br>'),
      '<p>Publishing to CaaS aborted, please fix errors and try again.</p>',
    ].join('');
    showAlert(msg, { error: true, onClose: setPublishingFalse });
    return false;
  }

  let metaWithUseHtml;
  if (useHtml) {
    ({ caasMetadata: metaWithUseHtml } = await getCardMetadata(
      { prodUrl: `${prodHost}${window.location.pathname}.html` },
    ));
  }

  return {
    caasEnv,
    caasMetadata: metaWithUseHtml || caasMetadata,
    draftOnly,
  };
};

const checkPublishStatus = async (publishingModal) => {
  if (!(await isPagePublished())) {
    publishingModal.close();
    showAlert(
      'Page must be published before it can be registered with CaaS.<br>Please publish the page and try again.',
      { error: true },
    );
    setPublishingFalse();
    return false;
  }
  return true;
};

const checkIms = async (publishingModal, loadScript) => {
  const accessToken = await getImsToken(loadScript);
  if (!accessToken) {
    publishingModal.close();
    const shouldLogIn = await showConfirm(
      'You must be logged in with an Adobe ID in order to publish to CaaS.\nDo you want to log in?',
    );
    if (shouldLogIn) {
      const { signInContext } = getConfig();
      window.adobeIMS.signIn(signInContext);
    }
    setPublishingFalse();
    return false;
  }
  return accessToken;
};

const postToCaaS = async ({ accessToken, caasEnv, caasProps, draftOnly, publishingModal }) => {
  try {
    const response = await postDataToCaaS({ accessToken, caasEnv, caasProps, draftOnly });

    publishingModal.close();

    if (response.success) {
      showAlert(
        `<p>Successfully published page to CaaS!<p><p>Card ID: ${caasProps.entityId}</p>`,
        { onClose: setPublishingFalse },
      );
    } else if (response.error?.startsWith('Invalid User: Not an Adobe employee')) {
      const msg = 'Please login with your Adobe company account.  Do you want to try logging in again?';
      const shouldLogIn = await showConfirm(msg, {
        cancelBtnType: 'grey',
        cancelText: 'Cancel',
        ctaText: 'Login',
      });
      setPublishingFalse();
      if (shouldLogIn) {
        const { signInContext } = getConfig();
        window.adobeIMS.signIn(signInContext);
      }
    } else {
      showAlert(
        response.message || response.error || JSON.stringify(response),
        { error: true, onClose: setPublishingFalse },
      );
    }
  } catch (e) {
    publishingModal.close();
    setPublishingFalse();
    showAlert(`Error posting to CaaS:<br>${e.message}`, { error: true });
  }
};

const noop = () => {};

const sendToCaaS = async ({ host = '', project = '', branch = '', repo = '', owner = '' } = {}, loadScript = noop, loadStyle = noop) => {
  if (isPublishing()) return;

  await loadTingleModalFiles(loadScript, loadStyle);
  if (window.adobeid?.environment !== 'prod') {
    showAlert(
      'Send to CaaS needs to reload the page with prod IMS setup.  Please try again after reload.',
      {
        onClose: () => {
          const url = new URL(window.location);
          url.searchParams.append('env', 'prod');
          window.location.assign(url);
        },
      },
    );
    return;
  }

  setConfig({
    host: host || window.location.host, project, branch, repo, owner, doc: document,
  });

  loadStyle('https://milo.adobe.com/tools/send-to-caas/send-to-caas.css');

  setPublishingTrue();
  const publishingModal = displayPublishingModal();

  try {
    if (!host) throw new Error('host must be specified');

    await loadCaasTags();
    const { caasEnv, caasMetadata, draftOnly } = await validateProps(host, publishingModal);
    if (!caasMetadata) return;

    const isPublished = await checkPublishStatus(publishingModal);
    if (!isPublished) return;

    const accessToken = await checkIms(publishingModal, loadScript);
    if (!accessToken) return;

    const caasProps = getCaasProps(caasMetadata);

    postToCaaS({ accessToken, caasEnv, caasProps, draftOnly, publishingModal });
  } catch (e) {
    setPublishingFalse();
    publishingModal.close();
    showAlert(`ERROR: ${e.message}`, { error: true });
  }
};

export {
  loadTingleModalFiles,
  sendToCaaS,
  showAlert,
  showConfirm,
};
