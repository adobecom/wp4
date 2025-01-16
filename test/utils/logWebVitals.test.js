/* eslint-disable no-use-before-define */
import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import logWebVitals from '../../libs/utils/logWebVitals.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });

window.adobePrivacy = { activeCookieGroups: () => ['C0002'] };
describe('Log Web Vitals', () => {
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
        expect(vitals.manifest3path).to.equal('/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/cci-all-apps-q3.json');
        expect(vitals.manifest3selected).to.equal('all');
        expect(vitals.manifest4path).to.equal('/cc-shared/fragments/tests/2024/q2/ace0875/ace0875.json');
        expect(vitals.manifest4selected).to.equal('target-var-marqueelink');
        expect(vitals.os).to.be.oneOf(['mac', 'win', 'android', 'linux', '']);
        expect(vitals.url).to.equal('localhost:2000/');
        expect(vitals.isMep).to.equal('false');
        expect(vitals.isFrag).to.equal('false');
        expect(parseInt(vitals.windowHeight, 10)).to.be.greaterThan(200);
        expect(parseInt(vitals.windowWidth, 10)).to.be.greaterThan(200);

        expect(logOpts.clientId).to.equal('pageperf');
        expect(logOpts.sampleRate).to.equal(100);

        done();
      },
    };
    logWebVitals(mepObject, { delay: 0, sampleRate: 100 });
    window.dispatchEvent(new Event('adobePrivacy:PrivacyCustom'));
  });
});

// Sample log string:
// eslint-disable-next-line max-len
// chromeVer=127.0.6533.17,cls=0.1842,country=,downlink=10,lcp=82,loggedIn=false,manifest3path=/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/cci-all-apps-q3.json,manifest3selected=all,manifest4path=/cc-shared/fragments/tests/2024/q2/ace0875/ace0875.json,manifest4selected=target-var-marqueelink,os=mac,url=localhost:2000/,windowHeight=600,windowWidth=800');

const mepObject = JSON.parse(`
{"preview":true,"variantOverride":{"/products/illustrator.json":"default","/cc-shared/fragments/promos/2024/americas/ste-back-to-school-q3/ste-back-to-school-q3.json":"default","/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/cci-all-apps-q3.json":"all","/cc-shared/fragments/tests/2024/q2/ace0875/ace0875.json":"target-var-marqueelink"},"highlight":false,"targetEnabled":true,"experiments":[{"variantNames":["target-edu_pzn","target-b2b_pzn","target-cpro_pzn","phone & cc-all-apps-any","cc-all-apps-any","illustrator-any"],"manifestOverrideName":"","manifestType":"personalization","executionOrder":"1-0","manifestPath":"/products/illustrator.json","selectedVariantName":"default","name":"PZN | US | Illustrator","manifest":"https://main--cc--adobecom.hlx.live/products/illustrator.json"},{"variantNames":["all"],"manifestOverrideName":"","manifestType":"promo","executionOrder":"1-1","manifestPath":"/cc-shared/fragments/promos/2024/americas/ste-back-to-school-q3/ste-back-to-school-q3.json","selectedVariantName":"default","selectedVariant":"default","manifest":"https://main--cc--adobecom.hlx.page/cc-shared/fragments/promos/2024/americas/ste-back-to-school-q3/ste-back-to-school-q3.json","disabled":true,"event":{"name":"ste-bts-americas","start":"2024-08-19T14:00:00.000Z","end":"2024-09-03T14:00:00.000Z"}},{"variantNames":["all"],"manifestOverrideName":"","manifestType":"promo","executionOrder":"1-1","manifestPath":"/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/cci-all-apps-q3.json","run":true,"selectedVariantName":"all","selectedVariant":{"commands":[{"action":"replace","selector":".marquee","pageFilter":"**/products/illustrator","target":"https://main--cc--adobecom.hlx.page/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/products/illustrator/marquee-gen-ai","selectorType":"css","manifestId":"cci-all-apps-q3.json","targetManifestId":false},{"action":"insertbefore","selector":"main > div","pageFilter":"**/products/illustrator","target":"https://main--cc--adobecom.hlx.page/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/shared/creativecloud/individual/modal#modal-hash:delay=1","selectorType":"css","manifestId":"cci-all-apps-q3.json","targetManifestId":false}],"fragments":[{"selector":"/cc-shared/fragments/merch/products/illustrator/mini-compare/creativecloud/individual/default","val":"/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/products/illustrator/creativecloud/individual/mini-compare","action":"replace","manifestId":"cci-all-apps-q3.json","targetManifestId":false}]},"manifest":"https://main--cc--adobecom.hlx.page/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/cci-all-apps-q3.json","disabled":false,"event":{"name":"cci-all-apps-q3","start":"2024-07-22T14:00:00.000Z","end":"2024-08-04T14:00:00.000Z"}},{"variantNames":["target-var-marqueelink"],"manifestOverrideName":"","manifestType":"test","executionOrder":"1-2","manifestPath":"/cc-shared/fragments/tests/2024/q2/ace0875/ace0875.json","run":true,"selectedVariantName":"target-var-marqueelink","selectedVariant":{"commands":[{"action":"replace","selector":".marquee","pageFilter":"","target":"https://www.adobe.com/cc-shared/fragments/tests/2024/q2/ace0875/ace0875","selectorType":"css","manifestId":"ace0875.json","targetManifestId":"ace0875"}],"fragments":[{"selector":"/cc-shared/fragments/tests/2024/q2/ace0758/illustrator/marquee-default","val":"/cc-shared/fragments/tests/2024/q2/ace0875/ace0875","action":"replace","manifestId":"ace0875.json","targetManifestId":"ace0875"}]},"manifest":"https://www.adobe.com/cc-shared/fragments/tests/2024/q2/ace0875/ace0875.json"}],"blocks":{},"fragments":{"/cc-shared/fragments/merch/products/illustrator/mini-compare/creativecloud/individual/default":{"action":"replace","fragment":"/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/products/illustrator/creativecloud/individual/mini-compare","selector":"/cc-shared/fragments/merch/products/illustrator/mini-compare/creativecloud/individual/default","manifestPath":"/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/cci-all-apps-q3.json","manifestId":"cci-all-apps-q3.json","targetManifestId":false},"/cc-shared/fragments/tests/2024/q2/ace0758/illustrator/marquee-default":{"action":"replace","fragment":"/cc-shared/fragments/tests/2024/q2/ace0875/ace0875","selector":"/cc-shared/fragments/tests/2024/q2/ace0758/illustrator/marquee-default","manifestPath":"/cc-shared/fragments/tests/2024/q2/ace0875/ace0875.json","manifestId":"ace0875.json","targetManifestId":"ace0875"}},"commands":[{"action":"replace","selector":".marquee","pageFilter":"**/products/illustrator","target":"https://main--cc--adobecom.hlx.page/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/products/illustrator/marquee-gen-ai","selectorType":"css","manifestId":"cci-all-apps-q3.json","targetManifestId":false},{"action":"insertbefore","selector":"main > div","pageFilter":"**/products/illustrator","target":"https://main--cc--adobecom.hlx.page/cc-shared/fragments/promos/2024/americas/cci-all-apps-q3/shared/creativecloud/individual/modal#modal-hash:delay=1","selectorType":"css","manifestId":"cci-all-apps-q3.json","targetManifestId":false},{"action":"replace","selector":".marquee","pageFilter":"","target":"https://www.adobe.com/cc-shared/fragments/tests/2024/q2/ace0875/ace0875","selectorType":"css","manifestId":"ace0875.json","targetManifestId":"ace0875"}],"martech":"|nopzn|illustrator"}
`);
