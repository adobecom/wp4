import chaiAsPromised from '@esm-bundle/chai-as-promised';
import { expect, use } from '@esm-bundle/chai';
import sinon from 'sinon';

import { equalsCaseInsensitive } from '../src/external.js';

import { TAG_NAME_SERVICE } from '../src/mas-commerce-service.js';

use(chaiAsPromised);

use((chai) => {
    function normalise(val) {
        return String(val)
            .trim()
            .replace(/>\s*</g, '><')
            .replace(/>\s*/g, '>')
            .replace(/\s*</g, '<')
            .replace(/"\s*>/g, '">')
            .replace(/"\s*\/>/g, '/>')
            .replace(/\s+/g, ' ');
    }

    chai.Assertion.addMethod('html', function assertHtml(snapshot) {
        const normAct = normalise(this._obj);
        const normExp = normalise(snapshot);
        this.assert(
            equalsCaseInsensitive(normAct, normExp),
            'expected to match html snapshot',
            'expected not to match html snapshot',
            normAct,
            normExp,
        );
    });
});

const initMasCommerceService = async (attributes, checkoutAction) => {
  const el = document.createElement(TAG_NAME_SERVICE);
  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      el.setAttribute(key, attributes[key]);
    })
  }
  if (checkoutAction) {
    el.registerCheckoutAction(checkoutAction);
  }
  document.head.appendChild(el);
  await el.readyPromise;
  return el;
}

const disableMasCommerceService = () => {
  document.querySelector(TAG_NAME_SERVICE)?.remove();
}

export { expect, sinon, initMasCommerceService, disableMasCommerceService };
