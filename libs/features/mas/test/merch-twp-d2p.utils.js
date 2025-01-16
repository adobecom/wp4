import { sendMouse } from '@web/test-runner-commands';
import { delay } from './utils.js';
import { expect } from '@esm-bundle/chai';
import { getTemplateContent } from './utils.js';

const content = document.getElementById('content');
const sidenav = document.getElementById('sidenav');

sidenav.addEventListener('click', (e) => {
    applyTemplate(e.target.dataset.template);
});

const shouldSkipTests = true || sessionStorage.getItem('skipTests') === 'true';

async function applyTemplate(templates, deeplink = true) {
    const isMobileTablet = window.innerWidth < 1200;
    document.querySelector('merch-twp-d2p')?.remove();
    if (!templates) return;
    if (deeplink) {
        const hash = new URLSearchParams(window.location.hash.slice(1));
        hash.set('template', templates);
        document.location.hash = hash.toString();
    }
    content.innerHTML = '';
    await delay(50);
    const [spTheme] = getTemplateContent('merch-twp-d2p');
    const merchTwpD2P = spTheme.querySelector('merch-twp-d2p');

    const [subscriptionPanel] = getTemplateContent('subscription-panel');
    merchTwpD2P.appendChild(subscriptionPanel);

    templates.split(',').forEach((template) => {
        const templateContent = getTemplateContent(template);
        merchTwpD2P.prepend(...templateContent);
    });

    content.append(spTheme);

    const dialogBase = spTheme.querySelector('sp-dialog-base');
    if (isMobileTablet) {
        dialogBase.setAttribute('mode', 'fullscreenTakeover');
    }

    const overlay = await window.__merch__spectrum_Overlay.open(dialogBase, {
        trigger: undefined,
        type: 'modal',
    });
    spTheme.appendChild(overlay);
    await delay(500); // make sure that icons etc are properly loaded.
    return {
        merchTwpD2P,
        subscriptionPanel,
    };
}

function getMiddleOfElement(element) {
    const { x, y, width, height } = element.getBoundingClientRect();

    return {
        x: Math.floor(x + window.scrollX + width / 2),
        y: Math.floor(y + window.scrollX + height / 2),
    };
}

async function addStock() {
    const stock = document.querySelector('merch-stock');
    const { x, y } = getMiddleOfElement(stock);
    await sendMouse({
        type: 'click',
        position: [x, y],
    });
    await delay(500);
}

async function selectPlanType(
    planType,
    root = document.querySelector('merch-subscription-panel'),
) {
    const merchOffer = root.querySelector(
        `merch-offer[plan-type="${planType}"]`,
    );
    const { x, y } = getMiddleOfElement(merchOffer);
    await sendMouse({
        type: 'click',
        position: [x, y],
    });
    return merchOffer;
}

async function hooverElement(element) {
    const { x, y } = getMiddleOfElement(element);
    await sendMouse({
        type: 'move',
        position: [x, y],
    });
    await delay(2000);
}

async function clickElement(element) {
    const { x, y } = getMiddleOfElement(element);
    await sendMouse({
        type: 'click',
        position: [x, y],
    });
    await delay(200);
}

function verifyCheckoutUrl(expectedUrl) {
    const subscriptionPanel = document.querySelector(
        'merch-subscription-panel',
    );
    const checkoutLink = subscriptionPanel.shadowRoot.querySelector(
        'a[is="checkout-link"]',
    );
    expect(checkoutLink.href).to.equal(expectedUrl);
}

async function gotoStep1() {
    await clickElement(
        document
            .querySelector('merch-twp-d2p')
            .shadowRoot.getElementById('backButton'),
    );
}

async function gotoStep2() {
    await clickElement(
        document
            .querySelector('merch-twp-d2p')
            .shadowRoot.getElementById('continueButton'),
    );
}

export {
    addStock,
    applyTemplate,
    getMiddleOfElement,
    gotoStep1,
    gotoStep2,
    hooverElement,
    selectPlanType,
    shouldSkipTests,
    verifyCheckoutUrl,
};
