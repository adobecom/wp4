/* global $ */

import {
  loadStyle,
  loadScript,
  getConfig,
  createTag,
  localizeLink,
} from '../../utils/utils.js';

const { env, miloLibs, codeRoot } = getConfig();
let state = {};

export const getFaasHostSubDomain = (environment) => {
  const { searchParams } = new URL(window.location.href);
  const faasEnv = environment ?? searchParams.get('faas-env');
  if (env.name === 'prod' || faasEnv === 'prod') {
    return '';
  }
  if (faasEnv === 'stage') {
    return 'staging.';
  }
  if (faasEnv === 'dev') {
    return 'dev.';
  }
  if (faasEnv === 'qa') {
    return 'qa.';
  }
  return 'qa.';
};

const base = miloLibs || codeRoot;
export const faasHostUrl = `https://${getFaasHostSubDomain()}apps.enterprise.adobe.com`;
const faasCurrentJS = base.includes('localhost') ? `${base}/deps/jquery.faas-current.js` : `${faasHostUrl}/faas/service/jquery.faas-current.js`;
export const loadFaasFiles = () => {
  loadStyle(`${base}/blocks/faas/faas.css`);
  return Promise.all([
    loadScript(`${base}/deps/jquery-3.6.0.min.js`).then(() => loadScript(faasCurrentJS)),
  ]);
};

export const defaultState = {
  id: 40,
  l: 'en_us',
  d: '',
  as: true,
  ar: true,
  pc: {
    1: 'js',
    2: 'faas_submission',
    3: 'sfdc',
    4: 'demandbase',
    5: '',
  },
  q: {},
  p: {
    js: {
      36: '',
      39: '',
      77: 1,
      78: 1,
      79: 1,
      90: 'FAAS',
      92: '2846',
      93: '2848',
      94: '',
    },
  },
  e: {},
  title_align: 'center',
  title_size: 'h3',
  pc1: true,
  pc2: true,
  pc3: true,
  pc4: true,
};

/* c8 ignore start */
const afterYiiLoadedCallback = () => {
  const wr = document.querySelector('.faas-form');
  function editMessages(mutations) {
    const firstmut = mutations[0].addedNodes;
    const text = firstmut[firstmut.length - 1].nodeValue;
    const sibs = mutations[0].target.parents('.checkbox').querySelector('.checkbox.error');
    let i = 0;
    do {
      sibs[i].style.height = '4em';
      sibs[i].querySelector('.errorMessage').innerHTML = text;
      i += 1;
    } while (sibs[i]);
  }

  function changeSelectionElement() {
    if (state.multicampaignradiostyle) {
      const inputs = wr.querySelectorAll('.checkboxlist input');
      inputs.forEach((input) => {
        if (input.type === 'checkbox') {
          input.type = 'radio';
        }
      });
    }
  }

  function hideDisplay(elms = []) {
    $.each(elms, (i, elm) => {
      elm.style.display = 'none';
    });
  }

  function placeHolders() {
    function iterator(els) {
      $.each(els, (i, el) => {
        const textHolder = $(el).siblings('label')[0];
        const text = textHolder instanceof HTMLElement ? textHolder.textContent : '';
        if (text !== '') {
          el.setAttribute('placeholder', text);
        }
      });
    }

    iterator($('.faas-form input[type="text"]'));
    iterator($('.faas-form textarea'));
  }

  function removeRequired() {
    const requireds = $('span.required');
    $.each(requireds, (i, req) => {
      $(req).remove();
    });
  }

  function requireNote() {
    const notearr = $('p.note');
    const RMTEXT = [
      'Required fields',
      'Povinná pole',
      'Pflichtfelder',
      'Skal udfyldes',
      'Champs obligatoires',
      'Pakolliset kentät',
      'Campi obbligatori',
      '必須フィールド',
      'Verplichte velden',
      'Obligatoriske felt',
      'Campos obligatorios',
      'Obligatoriska fält',
      'Pola wymagane',
      'Обязательные поля',
      'Os campos obrigatórios',
      '필수 입력란',
      '为必填项',
      '為必填項',
      'Zorunlu alanlar',
    ];
    const validnote = $.each(notearr, (i, note) => {
      const text = note.textContent;
      const notematch = RMTEXT.indexOf(text);
      if (notematch >= 0) {
        return note;
      }
      return undefined;
    });

    return validnote;
  }

  function childListMutation(cb) {
    return new MutationObserver((mutations) => {
      cb(mutations, this);
    });
  }

  function setMutationObserver(mutation, elms = []) {
    $.each(elms, (i, elm) => {
      mutation.observe(elm, { childList: true });
    });
  }

  function removeExtraColumnDivForNext() {
    const columnsDivs = document.querySelectorAll('.columns > .row.next > div');
    columnsDivs.forEach((colDiv) => {
      if (!colDiv.innerHTML) {
        colDiv.remove();
      }
    });
  }

  changeSelectionElement();
  removeRequired();
  placeHolders();

  const errorMessages = $('.hash-window .checkbox .errorMessage');
  const faasform = $('.faas-form');
  const note = requireNote();

  if (note) {
    note.remove();
  }

  if (state.hidePrepopulated) {
    const prepop = $('.prepopulated', wr);
    hideDisplay(prepop);
  }

  $.each(faasform, (i, form) => {
    $(form).on('change', () => {
      const elements = $('span.required', form);
      hideDisplay(elements);
    });
  });

  $('.faas-form').on('submit', (event) => {
    removeExtraColumnDivForNext();
    const nextFirstInput = document.querySelector('.faas-form.next input:not([type=hidden])');
    if (nextFirstInput && !nextFirstInput.value) {
      nextFirstInput.parentElement.classList.add('error');
      if (!nextFirstInput.parentElement.querySelector('.errorMessage').textContent) {
        nextFirstInput.parentElement.querySelector('.errorMessage').textContent = 'Business email cannot be blank.';
      }
    }
    const firstError = event.target.querySelector('.error [name]');
    if (firstError) {
      firstError.focus();
    }
  });
  removeExtraColumnDivForNext();
  setMutationObserver(childListMutation(editMessages), errorMessages);
};
/* c8 ignore stop */

/* c8 ignore start */
const beforeSubmitCallback = () => {
  // Adobe Analytics Sandbox
  if (window.location.search?.includes('faas-post-submit=aa-sandbox')) {
    const firstName = document.querySelector('.FaaS-8 input');
    const lastName = document.querySelector('.FaaS-9 input');
    const email = document.querySelector('.FaaS-1 input');
    const country = document.querySelector('.FaaS-14 select');

    fetch('https://us-central1-adobe---aa-university.cloudfunctions.net/register', {
      method: 'POST',
      body: JSON.stringify({
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value,
        university: 'none',
        country: country.value,
      }),
    })
      .catch((error) => {
        window.lana.log(`AA Sandbox Error: ${error.reason || error.error || error.message || error}`, { tags: 'faas', errorType: 'i' });
      });
  }
};
/* c8 ignore stop */

export const afterSubmitCallback = (e) => {
  const config = getConfig();
  if (!e.success || !(config.faasCloseModalAfterSubmit === 'on')) return;
  const faasForms = document.querySelectorAll('.dialog-modal .faas');
  if (faasForms.length !== 1) return;
  const faas = faasForms[0];
  const dialogModal = faas.closest('.dialog-modal');
  if (!dialogModal) return;
  const closeBtn = dialogModal.querySelector('.dialog-close');
  const faasFormWrapper = dialogModal.querySelector('.faas-form-wrapper');
  if (!faasFormWrapper) return;
  const overlay = createTag('div', { class: 'faas-form-confirm-overlay' });
  const checkIcon = createTag('img', {
    class: 'icon-milo checkmark-green',
    src: `${config.miloLibs || config.codeRoot}/ui/img/checkmark-green.svg`,
    alt: 'checkmark-green',
  });
  overlay.append(checkIcon);
  faasFormWrapper.append(overlay);

  checkIcon.addEventListener('animationend', () => {
    if (faas.reset) faas.reset();
    if (closeBtn) closeBtn.click();
  }, { passive: true, once: true });
};

export const makeFaasConfig = (targetState) => {
  if (!targetState) {
    state = defaultState;
    return state;
  }

  const config = {
    multicampaignradiostyle: targetState.multicampaignradiostyle ?? false,
    hidePrepopulated: targetState.hidePrepopulated ?? false,
    id: targetState.id,
    l: targetState.l,
    d: localizeLink(targetState.d),
    as: targetState.as,
    ar: targetState.ar,
    pc: {
      1: targetState.pc1 ? 'js' : '',
      2: targetState.pc2 ? 'faas_submission' : '',
      3: targetState.pc3 ? 'sfdc' : '',
      4: targetState.pc4 ? 'demandbase' : '',
      5: targetState.pc5 ? 'clearbit' : '',
    },
    q: {},
    p: {
      js: {
        36: targetState.pjs36?.trim() || defaultState.p.js[36],
        39: targetState.pjs39 || defaultState.p.js[39],
        77: 1,
        78: 1,
        79: 1,
        90: 'FAAS',
        92: targetState.pjs92 || defaultState.p.js[92],
        93: targetState.pjs93 || defaultState.p.js[93],
        94: targetState.pjs94 || defaultState.p.js[94],
        149: '',
      },
    },
    e: {
      afterYiiLoadedCallback,
      beforeSubmitCallback,
      afterSubmitCallback,
    },
    style_backgroundTheme: targetState.style_backgroundTheme || 'white',
    style_layout: targetState.style_layout || 'column1',
    isGate: targetState.isGate ? 'gated' : '',
    pc1: targetState.pc1 || false,
    pc2: targetState.pc2 || false,
    pc3: targetState.pc3 || false,
    pc4: targetState.pc4 || false,
    pc5: targetState.pc5 || false,
  };

  // b2bpartners
  if (targetState[149]) {
    // eslint-disable-next-line prefer-destructuring
    config.p.js[149] = targetState[149];
  }
  // last asset
  if (targetState[172]) {
    // eslint-disable-next-line prefer-destructuring
    config.p.js[172] = targetState[172];
  }
  // Multiple Campaign Ids
  if (targetState.q103) {
    Object.assign(config.q, { 103: { c: targetState.q103 } });
  }

  return config;
};

export const initFaas = (config, targetEl) => {
  if (!targetEl || !config) return null;
  state = config;
  const appEl = targetEl.parentElement;
  const isNext = (state.pjs93 || state.p.js[93])?.toString() === '2847' && (state.pc5 || state.pc[5] === 'clearbit');
  const formWrapperEl = createTag('div', {
    class: `block faas
  ${state.style_backgroundTheme || 'white'}
  ${state.style_layout || 'column1'}
  ${state.isGate ? 'gated' : ''}
  ${isNext ? 'next' : ''}
  ${`faas-form-${state.id}` || ''}`,
  });

  const formTitleWrapperEl = createTag('div', { class: `faas-title text-${state.title_align || 'center'}` });
  if (state.title) {
    const formTitleEl = createTag(state.title_size || 'h3');
    formTitleEl.textContent = state.title;
    formTitleWrapperEl.append(formTitleEl);
  }

  if (window.location.pathname === '/tools/faas') {
    state.as = false;
    state.ar = false;
  }

  const formEl = createTag('div', { class: 'faas-form-wrapper' });
  if (state.complete) {
    if (state.js) {
      Object.keys(state.js).forEach((key) => {
        if (key === 'd') {
          state[key] = localizeLink(state.js[key]);
        } else {
          state[key] = state.js[key];
        }
      });
      delete state.js;
    }
    state.complete = false;
    state.e = { afterYiiLoadedCallback, beforeSubmitCallback };
    $(formEl).faas(state);
  } else {
    state = makeFaasConfig(state);
    $(formEl).faas(state);
  }

  formWrapperEl.append(formTitleWrapperEl, formEl);
  appEl.replaceChild(formWrapperEl, targetEl);

  return appEl;
};
