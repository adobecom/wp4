import sinon from 'sinon';
import { expect } from '@esm-bundle/chai';
import loadDelayed, { loadPrivacy, loadJarvisChat, loadGoogleLogin } from '../../libs/scripts/delayed.js';
import { getMetadata, getConfig, setConfig, loadIms } from '../../libs/utils/utils.js';

describe('Delayed', () => {
  const loadScript = sinon.stub().returns(() => new Promise((resolve) => { resolve(); }));
  const loadStyle = sinon.stub().returns(() => new Promise((resolve) => { resolve(); }));

  it('should load privacy feature', async () => {
    expect(loadPrivacy).to.exist;
    setConfig({ privacyId: '7a5eb705-95ed-4cc4-a11d-0cc5760e93db' });
    document.body.innerHTML = '<footer><a href="https://www.adobe.com/#openPrivacy" id="privacy-link">Cookie preferences</a></footer>';
    await loadPrivacy(getConfig, loadScript);
    window.adobePrivacy = { showPreferenceCenter: sinon.stub() };
    document.getElementById('privacy-link')?.click();
    expect(window.adobePrivacy.showPreferenceCenter.called).to.be.true;
  });

  it('should load jarvis feature', async () => {
    setConfig({ jarvis: { id: 'test', version: '1.0' } });
    const tag = document.createElement('meta');
    tag.setAttribute('name', 'jarvis-chat');
    tag.setAttribute('content', 'on');
    document.head.appendChild(tag);
    expect(loadJarvisChat).to.exist;
    window.AdobeMessagingExperienceClient = { initialize: sinon.stub() };
    window.adobePrivacy = { activeCookieGroups: sinon.stub() };
    loadJarvisChat(getConfig, getMetadata, loadScript, loadStyle);
    document.head.removeChild(tag);
  });

  it('should load google login feature', async () => {
    const tag = document.createElement('meta');
    tag.setAttribute('name', 'google-login');
    tag.setAttribute('content', 'on');
    document.head.appendChild(tag);
    expect(loadGoogleLogin).to.exist;
    await loadGoogleLogin(getMetadata, loadIms, loadScript);
  });

  it('should load interlinks logic', async () => {
    const clock = sinon.useFakeTimers({ toFake: ['setTimeout'] });
    document.querySelector('head')?.insertAdjacentHTML('beforeend', '<meta name="interlinks" content="on">');
    loadDelayed([getConfig, getMetadata, loadScript, loadStyle, loadIms])
      .then((module) => {
        expect(typeof module === 'object').to.equal(true);
      });
    await clock.runAllAsync();
    clock.restore();
  });

  it('should skip load interlinks logic when metadata is off', async () => {
    const clock = sinon.useFakeTimers({ toFake: ['setTimeout'] });
    document.head.querySelector('meta[name="interlinks"]')?.remove();
    loadDelayed([getConfig, getMetadata, loadScript, loadStyle, loadIms])
      .then((module) => {
        expect(module == null).to.equal(true);
      });
    await clock.runAllAsync();
    clock.restore();
  });
});
