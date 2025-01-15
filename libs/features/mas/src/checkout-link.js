import { createCheckoutElement } from './checkout-mixin.js';
import { CheckoutMixin } from './checkout-mixin.js';

export class CheckoutLink extends CheckoutMixin(HTMLAnchorElement) {
    static is = 'checkout-link';
    static tag = 'a';

    static createCheckoutLink(options = {}, innerHTML = '') {
        return createCheckoutElement(CheckoutLink, options, innerHTML);
    }

    setCheckoutUrl(value) {
        this.setAttribute('href', value);
    }

    get isCheckoutLink() {
        return true;
    }

    clickHandler(e) {
        if (this.checkoutActionHandler) {
            this.checkoutActionHandler?.(e);
            return;
        }
    }
}

// Define custom DOM element
if (!window.customElements.get(CheckoutLink.is)) {
    window.customElements.define(CheckoutLink.is, CheckoutLink, {
        extends: CheckoutLink.tag,
    });
}
