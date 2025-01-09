import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { stub } from 'sinon';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const getFetchPromise = (data, type = 'json') => new Promise((resolve) => {
  resolve({
    ok: true,
    [type]: () => data,
  });
});

const setFetchResponse = (data, type = 'json') => {
  window.fetch = stub().returns(getFetchPromise(data, type));
};

async function loadJsonAndSetResponse(jsonPath) {
  let json = await readFile({ path: jsonPath });
  json = JSON.parse(json);
  setFetchResponse(json);
}

describe('MMM', () => {
  before(async () => {
    await loadJsonAndSetResponse('./mocks/get-pages.json');
    document.body.innerHTML = await readFile({ path: './mocks/body.html' });
    const module = await import('../../../libs/blocks/mmm/mmm.js');
    await module.default(document.querySelector('.mmm'));
  });

  it('Renders with mmm class', async () => {
    const mmmDl = document.querySelector('dl.mmm');
    expect(mmmDl).to.exist;
    const mmmDt = mmmDl.querySelectorAll('dt');
    expect(mmmDt.length).to.equal(5);
    expect(mmmDt[0].textContent).to.equal('https://www.adobe.com/1 Manifest(s) found');
    const mmmDd = mmmDl.querySelectorAll('dd');
    expect(mmmDd.length).to.equal(5);
    const loading = mmmDd[0].querySelector('.loading');
    expect(loading).to.exist;
  });

  it('Expand collapse', async () => {
    await loadJsonAndSetResponse('./mocks/get-page.json');
    const [firstMmmButton, secondMmmButton] = document.body.querySelectorAll('dt button');
    expect(firstMmmButton.getAttribute('aria-expanded')).to.equal('false');
    expect(secondMmmButton.getAttribute('aria-expanded')).to.equal('false');

    // open 1st
    firstMmmButton.click();
    expect(firstMmmButton.getAttribute('aria-expanded')).to.equal('true');
    expect(secondMmmButton.getAttribute('aria-expanded')).to.equal('false');

    // open 2nd
    secondMmmButton.click();
    expect(firstMmmButton.getAttribute('aria-expanded')).to.equal('false');
    expect(secondMmmButton.getAttribute('aria-expanded')).to.equal('true');

    // close 2nd
    secondMmmButton.click();
    expect(firstMmmButton.getAttribute('aria-expanded')).to.equal('false');
    expect(secondMmmButton.getAttribute('aria-expanded')).to.equal('false');

    // re-open 1st
    firstMmmButton.click();
    expect(firstMmmButton.getAttribute('aria-expanded')).to.equal('true');
    expect(secondMmmButton.getAttribute('aria-expanded')).to.equal('false');
  });

  it('Loads page details', async () => {
    const firstMmmButton = document.body.querySelector('dt button');
    await loadJsonAndSetResponse('./mocks/get-page.json');
    firstMmmButton.click();
    const firstMmmDd = document.body.querySelector('dd');
    const loading = firstMmmDd.querySelector('.loading');
    expect(loading).to.not.exist;
    const mmmPopup = firstMmmDd.querySelector('.mep-popup');
    expect(mmmPopup).to.exist;
    const mmmPopupHeader = mmmPopup.querySelector('.mep-popup-header');
    const h4 = mmmPopupHeader.querySelector('h4');
    expect(h4.textContent).to.equal('3 Manifest(s) found');
    expect(mmmPopupHeader.textContent).to.include('Target integration feature is on');
    expect(mmmPopupHeader.textContent).to.include('Personalization feature is on');
    expect(mmmPopupHeader.textContent).to.include('Page\'s Geo Folder is nothing (US)');
    expect(mmmPopupHeader.textContent).to.include('Page\'s Locale is en-us');
    expect(mmmPopupHeader.textContent).to.include('Last seen:');
    const mepManifestList = mmmPopup.querySelector('.mep-manifest-list');
    expect(mepManifestList).to.exist;
    const mepManifestListItems = mmmPopup.querySelectorAll('.mep-manifest-list > .mep-manifest-info');
    expect(mepManifestListItems.length).to.equal(4);
    const radios = mepManifestList.querySelectorAll('input[type="radio"]');
    expect(radios.length).to.equal(19);
    const checkboxes = mepManifestList.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).to.equal(2);
    const inputs = mepManifestList.querySelectorAll('input[type="text"]');
    expect(inputs.length).to.equal(1);
    const manifestTitle = mepManifestList.querySelector('.mep-manifest-title');
    expect(manifestTitle.textContent).to.include('1. hp-11-15-black-friday.json');
    expect(manifestTitle.textContent).to.include('PZN | US | Homepage | Logged Out - 11/15/24 - Blk-Frdy-Cybr-Mndy');
    expect(manifestTitle.textContent).to.include('Source: target');
    expect(manifestTitle.textContent).to.include('Last seen:');
    const editButton = manifestTitle.querySelector('.mep-edit-manifest');
    expect(editButton).to.exist;
    expect(editButton.href).to.equal('https://main--homepage--adobecom.hlx.page/homepage/fragments/mep/hp-11-15-black-friday.json');
    const previewButton = mmmPopup.querySelector('a[data-id="preview-button"]');
    expect(previewButton).to.exist;
  });

  it('Test preview button', async () => {
    const firstMmmButton = document.body.querySelector('dt button');
    await loadJsonAndSetResponse('./mocks/get-page.json');
    firstMmmButton.click();
    const firstMmmDd = document.body.querySelector('dd');
    const mmmPopup = firstMmmDd.querySelector('.mep-popup');
    const previewButton = mmmPopup.querySelector('a[data-id="preview-button"]');
    expect(previewButton).to.exist;
    expect(previewButton.href).to.include('https%3A%2F%2Fmain--homepage--adobecom.hlx.page%2Fhomepage%2Ffragments%2Fmep%2Fhp-11-15-black-friday.json--default');
    const radio = mmmPopup.querySelector('input[type="radio"][name="https://main--homepage--adobecom.hlx.page/homepage/fragments/mep/hp-11-15-black-friday.json4"][value="target-apro-twp-abdn"]');
    expect(radio).to.exist;
    radio.click();
    expect(previewButton.href).to.include('https%3A%2F%2Fmain--homepage--adobecom.hlx.page%2Fhomepage%2Ffragments%2Fmep%2Fhp-11-15-black-friday.json--target-apro-twp-abdn');
    const addHighlight = mmmPopup.querySelector('#mepHighlightCheckbox-4');
    expect(addHighlight).to.exist;
    addHighlight.click();
    expect(previewButton.href).to.include('mepHighlight=true');
    const toggleAdvancedContainer = mmmPopup.querySelector('.mep-advanced-container');
    expect(toggleAdvancedContainer).to.exist;
    expect(toggleAdvancedContainer.className).to.equal('mep-advanced-container');
    const toggleAdvanced = mmmPopup.querySelector('.mep-toggle-advanced');
    expect(toggleAdvanced).to.exist;
    toggleAdvanced.click();
    expect(toggleAdvancedContainer.className).to.equal('mep-advanced-container mep-advanced-open');
    const addButtonOff = document.querySelector('#mepPreviewButtonCheckbox-4');
    expect(addButtonOff).to.exist;
    addButtonOff.click();
    expect(previewButton.href).to.include('mepButton=off');
    const newManifest = mmmPopup.querySelector('.new-manifest');
    expect(newManifest).to.exist;
    newManifest.value = '/added-manifest.json';
    const event = new Event('change');
    newManifest.dispatchEvent(event);
    expect(previewButton.href).to.include('%2Fadded-manifest.json');
  });

  it('Test filters', async () => {
    const showSelector = 'dt:not(.filter-hide),dd:not(.filter-hide)';
    const copyButton = document.querySelector('.copy-to-clipboard');
    expect(copyButton).to.exist;
    const event = new Event('change');
    expect(document.querySelectorAll(showSelector).length).to.equal(10);
    expect(copyButton.dataset.destination).to.not.include('geo');
    expect(copyButton.dataset.destination).to.not.include('page');
    expect(copyButton.dataset.destination).to.not.include('tab');
    expect(copyButton.dataset.destination).to.not.include('query');
    const geoDropdown = document.querySelector('#mmm-dropdown-geo');
    geoDropdown.options[1].selected = true;
    geoDropdown.dispatchEvent(event);
    expect(document.querySelectorAll(showSelector).length).to.equal(8);
    expect(copyButton.dataset.destination).to.include('geo');
    expect(copyButton.dataset.destination).to.not.include('page');
    expect(copyButton.dataset.destination).to.not.include('tab');
    expect(copyButton.dataset.destination).to.not.include('query');
    const pageDropdown = document.querySelector('#mmm-dropdown-page');
    pageDropdown.options[2].selected = true;
    pageDropdown.dispatchEvent(event);
    expect(document.querySelectorAll(showSelector).length).to.equal(4);
    expect(copyButton.dataset.destination).to.include('geo');
    expect(copyButton.dataset.destination).to.include('page');
    expect(copyButton.dataset.destination).to.not.include('tab');
    expect(copyButton.dataset.destination).to.not.include('query');
    geoDropdown.options[0].selected = true;
    geoDropdown.dispatchEvent(event);
    expect(document.querySelectorAll(showSelector).length).to.equal(6);
    expect(copyButton.dataset.destination).to.not.include('geo');
    expect(copyButton.dataset.destination).to.include('page');
    expect(copyButton.dataset.destination).to.not.include('tab');
    expect(copyButton.dataset.destination).to.not.include('query');
    const filterTabs = document.querySelectorAll('.tab-list-container button');
    filterTabs[0].setAttribute('aria-selected', 'false');
    filterTabs[1].setAttribute('aria-selected', 'true');
    filterTabs[1].click();
    expect(document.querySelectorAll(showSelector).length).to.equal(10);
    expect(copyButton.dataset.destination).to.not.include('geo');
    expect(copyButton.dataset.destination).to.include('page');
    expect(copyButton.dataset.destination).to.include('tab');
    expect(copyButton.dataset.destination).to.not.include('query');
    const mmmSearchQuery = document.querySelector('#mmm-search-query');
    mmmSearchQuery.value = 'pricing';
    mmmSearchQuery.dispatchEvent(event);
    expect(document.querySelectorAll(showSelector).length).to.equal(2);
    expect(copyButton.dataset.destination).to.not.include('geo');
    expect(copyButton.dataset.destination).to.include('page');
    expect(copyButton.dataset.destination).to.include('tab');
    expect(copyButton.dataset.destination).to.include('query');
  });
});
