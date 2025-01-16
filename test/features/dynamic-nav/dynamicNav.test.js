import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { setConfig } from '../../../libs/utils/utils.js';
import dynamicNav from '../../../libs/features/dynamic-navigation/dynamic-navigation.js';

describe('Dynamic nav', () => {
  beforeEach(() => {
    const conf = { dynamicNavKey: 'bacom' };
    setConfig(conf);
    window.sessionStorage.setItem('gnavSource', 'some-source-string');
  });

  it('Saves the gnavSource and dynamicNavKey to session storage', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/entry.html' });
    window.sessionStorage.removeItem('gnavSource');
    dynamicNav('gnav/aem-sites', 'bacom');
    expect(window.sessionStorage.getItem('gnavSource')).to.equal('gnav/aem-sites');
    expect(window.sessionStorage.getItem('dynamicNavKey')).to.equal('bacom');
  });

  it('Returns the provided url when the dynamic nav metadata is not present', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/off.html' });
    const url = dynamicNav('gnav/aem-sites', 'nocom');
    expect(window.sessionStorage.getItem('gnavSource')).to.equal('some-source-string');
    expect(url).to.equal('gnav/aem-sites');
  });

  it('Returns the provided url with when the wrong dynamicNavKey is passed', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on.html' });
    const url = dynamicNav('gnav/aem-sites', 'nocom');
    expect(window.sessionStorage.getItem('gnavSource')).to.equal('some-source-string');
    expect(url).to.equal('gnav/aem-sites');
  });

  it('Returns the sessionStorage url if the item exists, the keys match, and dynamic nav is on', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on.html' });
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(window.sessionStorage.getItem('gnavSource')).to.equal('some-source-string');
    expect(url).to.equal('some-source-string');
  });

  it('Returns the provided url if it does not find an item in sessionStorage and dynamic nav is on', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on.html' });
    window.sessionStorage.removeItem('gnavSource');
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('gnav/aem-sites');
  });

  it('Returns the provided url if it finds a metadata that matches items in the ignore list', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on-ignore-match.html' });
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('gnav/aem-sites');
  });

  it('Returns the provided url when ignore items match some metadata but not all', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on-ignore-some-matches.html' });
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('gnav/aem-sites');
  });

  it('Returns the provided url when the group has not been set', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on.html' });
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('some-source-string');
  });

  it('Returns the provided url when the group does not match', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on.html' });
    const groupMeta = document.createElement('meta');
    groupMeta.setAttribute('name', 'dynamic-nav-group');
    groupMeta.setAttribute('content', 'test');
    document.head.appendChild(groupMeta);

    window.sessionStorage.setItem('dynamicNavGroup', 'no-test');
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('gnav/aem-sites');
  });

  it('Returns the sessionStorage url when dynamic nav ignore items are present but do not match the metadata', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on-ignore-does-not-match.html' });
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('some-source-string');
  });

  it('Returns the sessionStorage url when dynamic nav ignore metadata is not found', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on-ignore-misspelled.html' });
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('some-source-string');
  });

  it('Returns the sessionStorage url when dynamic nav ignore metadata content is empty', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on-ignore-no-content.html' });
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('some-source-string');
  });

  it('Returns the sessionStorage url when the groups match', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/on.html' });
    const groupMeta = document.createElement('meta');
    groupMeta.setAttribute('name', 'dynamic-nav-group');
    groupMeta.setAttribute('content', 'test');
    document.head.appendChild(groupMeta);

    window.sessionStorage.setItem('dynamicNavGroup', 'test');
    const url = dynamicNav('gnav/aem-sites', 'bacom');
    expect(url).to.equal('some-source-string');
  });
});
