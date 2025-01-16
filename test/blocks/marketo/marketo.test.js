import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon, { stub } from 'sinon';
import { delay } from '../../helpers/waitfor.js';
import { setConfig } from '../../../libs/utils/utils.js';
import init, { setPreferences, decorateURL, FORM_PARAM } from '../../../libs/blocks/marketo/marketo.js';

const innerHTML = await readFile({ path: './mocks/body.html' });
window.lana = { log: stub() };

describe('marketo', () => {
  beforeEach(() => {
    document.body.innerHTML = innerHTML;
  });

  afterEach(() => {
    window.mcz_marketoForm_pref = undefined;
  });

  it('hides form if no data url', async () => {
    document.body.innerHTML = innerHTML;
    const el = document.querySelector('.marketo');
    el.querySelector('a').remove();

    init(el);
    await delay(10);
    expect(el.style.display).to.equal('none');
  });

  it('sets preferences on the data layer', async () => {
    const formData = {
      'first.key': 'value1',
      'second.key': 'value2',
    };

    setPreferences(formData);

    expect(window.mcz_marketoForm_pref).to.have.property('first');
    expect(window.mcz_marketoForm_pref.first).to.have.property('key');
    expect(window.mcz_marketoForm_pref.first.key).to.equal('value1');
    expect(window.mcz_marketoForm_pref).to.have.property('second');
    expect(window.mcz_marketoForm_pref.second).to.have.property('key');
    expect(window.mcz_marketoForm_pref.second.key).to.equal('value2');
  });
});

describe('marketo decorateURL', () => {
  it('decorates absolute URL with local base URL', () => {
    const baseURL = new URL('http://localhost:6456/marketo-block');
    const result = decorateURL('https://main--milo--adobecom.hlx.page/marketo-block/thank-you', baseURL);
    expect(result).to.equal('http://localhost:6456/marketo-block/thank-you');
  });

  it('decorates relative URL with absolute base URL', () => {
    const baseURL = new URL('https://main--milo--adobecom.hlx.page/marketo-block');
    const result = decorateURL('/marketo-block/thank-you', baseURL);
    expect(result).to.equal('https://main--milo--adobecom.hlx.page/marketo-block/thank-you');
  });

  it('decorates absolute URL with matching base URL', () => {
    const baseURL = new URL('https://main--milo--adobecom.hlx.page/marketo-block');
    const result = decorateURL('https://main--milo--adobecom.hlx.page/marketo-block/thank-you', baseURL);
    expect(result).to.equal('https://main--milo--adobecom.hlx.page/marketo-block/thank-you');
  });

  it('decorates absolute URL with .html base URL', () => {
    const baseURL = new URL('https://business.adobe.com/marketo-block.html');
    const result = decorateURL('https://main--milo--adobecom.hlx.page/marketo-block/thank-you', baseURL);
    expect(result).to.equal('https://business.adobe.com/marketo-block/thank-you.html');
  });

  it('keeps identical absolute URL with .html base URL', () => {
    const baseURL = new URL('https://business.adobe.com/marketo-block.html');
    const result = decorateURL('https://business.adobe.com/marketo-block/thank-you.html', baseURL);
    expect(result).to.equal('https://business.adobe.com/marketo-block/thank-you.html');
  });

  it('returns null when provided a malformed URL', () => {
    const baseURL = new URL('https://business.adobe.com/marketo-block.html');
    const result = decorateURL('tps://business', baseURL);
    expect(result).to.be.null;
  });

  it('Does not add .html to ending slash', () => {
    const baseURL = new URL('https://business.adobe.com/marketo-block.html');
    const result = decorateURL('https://business.adobe.com/', baseURL);
    expect(result).to.equal('https://business.adobe.com/');
  });

  it('localizes URL with .html base URL', () => {
    setConfig({
      pathname: '/uk/marketo-block.html',
      locales: {
        '': {},
        uk: {},
      },
    });
    const baseURL = new URL('https://business.adobe.com/uk/marketo-block.html');
    const result = decorateURL('/marketo-block/thank-you', baseURL);
    expect(result).to.equal('https://business.adobe.com/uk/marketo-block/thank-you.html');
  });

  it('Does not decorate non-url text', () => {
    const baseURL = new URL('https://business.adobe.com/marketo-block.html');
    const result = decorateURL('Thank you for submitting the form', baseURL);
    expect(result).to.be.null;
  });
});

const onePage = await readFile({ path: './mocks/one-page-experience.html' });

describe('Marketo ungated one page experience', () => {
  let url;
  let clock;

  beforeEach(() => {
    url = new URL(window.location);
    url.searchParams.set(FORM_PARAM, 'off');
    window.history.pushState({}, '', url);
    document.body.innerHTML = onePage;
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    url.searchParams.delete(FORM_PARAM);
    window.history.pushState({}, '', url);
    clock.restore();
  });

  it('shows success section', () => {
    init(document.querySelector('.marketo'));
    expect(document.querySelector('.section.form-success').classList.contains('hide-block')).to.be.false;
  });

  it('shows success section that appears after marketo', () => {
    document.querySelector('#success-section').classList.remove('form-success');
    init(document.querySelector('.marketo'));
    expect(document.querySelector('#success-section').classList.contains('hide-block')).to.be.true;
    document.querySelector('#success-section').classList.add('form-success');
    clock.tick(500);
    expect(document.querySelector('#success-section').classList.contains('hide-block')).to.be.false;
  });

  it('logs error if success section is not provided', async () => {
    document.querySelector('#success-data').remove();
    init(document.querySelector('.marketo'));
    expect(window.lana.log.args[0][0]).to.equal('Error showing Marketo success section');
  });

  it('logs error if success section does not appear after maximum intervals', async () => {
    document.querySelector('#success-section').classList.remove('form-success');

    init(document.querySelector('.marketo'));
    expect(document.querySelector('#success-section').classList.contains('hide-block')).to.be.true;
    clock.runAll();
    expect(window.lana.log.args[0][0]).to.equal('Error showing Marketo success section');
  });
});
