import sinon from 'sinon';
import { expect } from '@esm-bundle/chai';
import { readFile, setViewport } from '@web/test-runner-commands';
import initGoogleLogin from '../../../libs/features/google-login.js';
import { viewports } from '../../blocks/global-navigation/test-utilities.js';
import { getConfig } from '../../../libs/utils/utils.js';

describe('Google Login', () => {
  let initializeSpy;
  let promptSpy;
  let clock;
  beforeEach(async () => {
    clock = sinon.useFakeTimers();
    document.body.innerHTML = await readFile({ path: './mocks/google-login.html' });
    window.google = window.google || {
      accounts: {
        id: {
          initialize: () => {},
          prompt: () => {},
        },
      },
    };
    initializeSpy = sinon.spy(window.google.accounts.id, 'initialize');
    promptSpy = sinon.spy(window.google.accounts.id, 'prompt');
    window.adobeid = {
      client_id: 'milo',
      scope: 'gnav',
    };
  });

  afterEach(() => {
    document.body.innerHTML = '';
    initializeSpy.restore();
    promptSpy.restore();
    delete window.adobeid;
    delete window.google;
    clock.restore();
  });

  it('should create a placeholder to inject DOM markup', async () => {
    await initGoogleLogin(sinon.stub(), sinon.stub(), sinon.stub(), getConfig);
    expect(document.getElementById('feds-googleLogin')).to.exist;
  });

  it('should initialize and render the login element', async () => {
    await initGoogleLogin(sinon.stub(), sinon.stub(), sinon.stub(), getConfig);
    expect(initializeSpy.called).to.be.true;
    expect(promptSpy.called).to.be.true;
    expect(initializeSpy.getCall(0).args[0].prompt_parent_id).to.equal('feds-googleLogin');
  });

  it('should exchange tokens with adobeIMS after login', async () => {
    window.adobeIMS = window.adobeIMS || {
      socialHeadlessSignIn: () => {},
      isSignedInUser: () => false,
      signInWithSocialProvider: () => {},
    };

    // No account
    const socialHeadlessSignInStub = sinon.stub(window.adobeIMS, 'socialHeadlessSignIn')
      .returns(new Promise((resolve, reject) => { reject(); }));
    const signInWithSocialProviderSpy = sinon.spy(window.adobeIMS, 'signInWithSocialProvider');
    await initGoogleLogin(sinon.stub(), sinon.stub(), sinon.stub(), getConfig);
    let onToken = initializeSpy.getCall(0).args[0].callback;
    await onToken(sinon.stub(), sinon.stub(), getConfig);
    expect(signInWithSocialProviderSpy.called).to.be.true;

    // Existing account
    socialHeadlessSignInStub.returns(new Promise((resolve) => { resolve(); }));
    await initGoogleLogin(sinon.stub(), sinon.stub(), sinon.stub(), getConfig);
    onToken = initializeSpy.getCall(0).args[0].callback;
    window.DISABLE_PAGE_RELOAD = true;
    signInWithSocialProviderSpy.resetHistory();
    await onToken(sinon.stub(), sinon.stub());
    expect(signInWithSocialProviderSpy.called).not.to.be.true;
    expect(document.getElementById('feds-googleLogin')).to.exist;
    signInWithSocialProviderSpy.restore();
    socialHeadlessSignInStub.restore();
    delete window.DISABLE_PAGE_RELOAD;
  });

  it('should not initialize if IMS is not ready or user is already logged-in', async () => {
    window.adobeIMS = window.adobeIMS || { isSignedInUser: () => {} };
    const loggedInStub = sinon.stub(window.adobeIMS, 'isSignedInUser').returns(() => true);
    await initGoogleLogin(sinon.stub(), sinon.stub(), sinon.stub(), getConfig);
    expect(document.getElementById('feds-googleLogin')).not.to.exist;
    await initGoogleLogin(Promise.reject, sinon.stub(), sinon.stub(), getConfig);
    expect(document.getElementById('feds-googleLogin')).not.to.exist;
    loggedInStub.restore();
  });

  describe('desktop', () => {
    before(async () => {
      await setViewport(viewports.desktop);
    });

    it('should load yolo metadata set to "desktop"', async () => {
      const { loadGoogleLogin } = await import('../../../libs/scripts/delayed.js');
      loadGoogleLogin(sinon.stub().returns('desktop'), sinon.stub(), sinon.stub());
      await clock.runAllAsync();
      expect(initializeSpy.called).to.be.true;
    });

    it('should not load yolo with metadata set to "mobile"', async () => {
      const { loadGoogleLogin } = await import('../../../libs/scripts/delayed.js');
      loadGoogleLogin(sinon.stub().returns('mobile'), sinon.stub(), sinon.stub());
      await clock.runAllAsync();
      expect(initializeSpy.called).to.be.false;
    });
  });

  describe('tablet', () => {
    before(async () => {
      await setViewport(viewports.smallDesktop);
    });

    it('should load yolo with metadata set to "desktop"', async () => {
      const { loadGoogleLogin } = await import('../../../libs/scripts/delayed.js');
      loadGoogleLogin(sinon.stub().returns('desktop'), sinon.stub(), sinon.stub());
      await clock.runAllAsync();
      expect(initializeSpy.called).to.be.true;
    });

    it('should not load yolo with metadata set to "mobile"', async () => {
      const { loadGoogleLogin } = await import('../../../libs/scripts/delayed.js');
      loadGoogleLogin(sinon.stub().returns('mobile'), sinon.stub(), sinon.stub());
      await clock.runAllAsync();
      expect(initializeSpy.called).to.be.false;
    });
  });

  describe('mobile', () => {
    before(async () => {
      await setViewport(viewports.mobile);
    });

    it('should load yolo metadata set to "mobile"', async () => {
      const { loadGoogleLogin } = await import('../../../libs/scripts/delayed.js');
      loadGoogleLogin(sinon.stub().returns('mobile'), sinon.stub(), sinon.stub());
      await clock.runAllAsync();
      expect(initializeSpy.called).to.be.true;
    });

    it('should not load yolo with metadata set to "desktop"', async () => {
      const { loadGoogleLogin } = await import('../../../libs/scripts/delayed.js');
      loadGoogleLogin(sinon.stub().returns('desktop'), sinon.stub(), sinon.stub());
      await clock.runAllAsync();
      expect(initializeSpy.called).to.be.false;
    });
  });
});
