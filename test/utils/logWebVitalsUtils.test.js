/* eslint-disable no-use-before-define */
import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import { getConfig, loadDeferred } from '../../libs/utils/utils.js';

document.head.innerHTML = `
  <meta name="pageperf" content="on">';
  <meta name="pageperf-rate" content="100">';
  <meta name="pageperf-delay" content="0">';
`;

document.body.innerHTML = await readFile({ path: './mocks/body.html' });

describe('Log Web Vitals Utils', () => {
  let intervalId;
  before(() => {
    window.adobePrivacy = { activeCookieGroups: () => ['C0002'] };
    intervalId = setInterval(() => {
      window.dispatchEvent(new Event('adobePrivacy:PrivacyCustom'));
    }, 100);
  });

  after(() => {
    delete window.adobePrivacy;
    clearInterval(intervalId);
  });

  it('Logs data to lana', (done) => {
    window.lana = {
      log: (logStr, logOpts) => {
        const vitals = logStr.split(',').reduce((acc, pair) => {
          const [key, value] = pair.split('=');
          acc[key] = value;
          return acc;
        }, {});

        expect(vitals).to.have.property('chromeVer');
        const cls = parseFloat(vitals.cls);
        expect(cls).to.be.within(0, 1);
        expect(vitals).to.have.property('country');
        const downlink = parseFloat(vitals.downlink);
        expect(downlink).to.be.within(0, 10);
        expect(parseInt(vitals.lcp, 10)).to.be.greaterThan(1);

        expect(vitals).to.have.property('lcpEl');
        expect(vitals.lcpEl).to.be.a('string').that.is.not.empty;
        expect(vitals).to.have.property('lcpElType');
        expect(vitals.lcpElType).to.be.a('string').that.is.not.empty;
        expect(vitals.lcpSectionOne).to.equal('true');

        expect(vitals.loggedIn).to.equal('false');
        expect(vitals.os).to.be.oneOf(['mac', 'win', 'android', 'linux', '']);
        expect(vitals.url).to.equal('localhost:2000/');
        expect(parseInt(vitals.windowHeight, 10)).to.be.greaterThan(200);
        expect(parseInt(vitals.windowWidth, 10)).to.be.greaterThan(200);

        expect(logOpts.clientId).to.equal('pageperf');
        expect(logOpts.sampleRate).to.equal(100);

        done();
      },
    };
    loadDeferred(document, undefined, getConfig());
  }).timeout(5000);
});

// Sample log string:
// eslint-disable-next-line max-len
// chromeVer=127.0.6533.17,cls=0.1842,country=,downlink=10,lcp=82,loggedIn=false,manifest3path=/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/cci-all-apps-q3.json,manifest3selected=all,manifest4path=/cc-shared/fragments/tests/2024/q2/ace0875/ace0875.json,manifest4selected=target-var-marqueelink,os=mac,url=localhost:2000/,windowHeight=600,windowWidth=800');
