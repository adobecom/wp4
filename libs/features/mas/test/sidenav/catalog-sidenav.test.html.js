import { runTests } from '@web/test-runner-mocha';
import { expect } from '@esm-bundle/chai';
import {
    elementClick,
    delay,
    refreshElement,
    resetState,
    toggleLargeDesktop,
} from '../utils.js';
import '../../src/sidenav/merch-sidenav.js';
import '../../src/sidenav/merch-sidenav-list.js';
import '../../src/sidenav/merch-sidenav-checkbox-group.js';
import '../../src/merch-search.js';
import { pushState, parseState } from '../../src/deeplink.js';

const resetChecks = async () => {
    document.querySelectorAll('sp-checkbox').forEach((cb) => {
        cb.checked = false;
    });
    await resetState();
};

const getCategories = () => document.querySelector('merch-sidenav-list');
const getItems = () => getCategories().querySelectorAll('sp-sidenav-item');
const click = async (value) => {
    const node = getCategories().querySelector(
        `sp-sidenav-item[value=${value}]`,
    );
    await elementClick(node);
};
const expectedSelection = (expectedValue, expectedExpand = false) => {
    const item = getCategories().querySelector(
        `sp-sidenav-item[value=${expectedValue}]`,
    );
    expect(item).not.to.be.null;
    if (expectedExpand) {
        expect(item.getAttribute('expanded')).to.equal(
            '',
            `${expectedValue} should be expanded`,
        );
    }
    expect(item.getAttribute('selected')).to.equal(
        '',
        `${expectedValue} should be selected`,
    );
    expect(item.value).to.equal(expectedValue);
};

const shouldSkipTests = sessionStorage.getItem('skipTests') ?? false;

runTests(async () => {
    const container = document.getElementById('merch-sidenav');
    await toggleLargeDesktop();
    if (shouldSkipTests === 'true') {
        return;
    }

    beforeEach(() => {
        window.location.hash = '';
        container.innerHTML = '';
    });

    const render = async () => {
        container.append(
            document
                .getElementById('merch-sidenav-template')
                .content.cloneNode(true),
        );
        await delay(10);
    };

    describe('Catalog filters desktop sidenav', () => {
        it('renders navigation element', async () => {
            await render();
            expect(getCategories()).to.be.not.null;
        });

        it('renders navigation items element', async () => {
            await render();
            expect(getItems().length).to.be.greaterThan(5); //5 is a random small number
        });

        it('by default should be selected all', async () => {
            await render();
            expectedSelection('all');
        });

        it('clicking on a navigation item expands/fold the section and updates the URL', async () => {
            await render();
            await click('creativitydesign');
            expectedSelection('creativitydesign', true);
            expect(window.location.hash).to.equal('#filter=creativitydesign');
            await click('all');
            expectedSelection('all');
        });

        it('updates the navigation item depending of state', async () => {
            window.location.hash = 'filter=pdf';
            await render();
            await delay(100);
            expectedSelection('pdf', false);
        });
    });

    describe('Types desktop sidenav', async () => {
        beforeEach(async () => {
            window.location.hash = '';
            container.innerHTML = '';
            await render();
        });
        it('renders three items', async () => {
            const comps = document.querySelectorAll(
                'merch-sidenav-checkbox-group',
            );
            expect(comps.length).to.equal(1);
            const checkboxes = comps[0].querySelectorAll('sp-checkbox');
            expect(checkboxes.length).to.equal(3);
        });
        it('deep links to desktop for first click', async () => {
            //first click on desktop
            await resetChecks();
            const cbd = document.querySelector('sp-checkbox[name=desktop]');
            await elementClick(cbd);
            expect(parseState().types).to.equal('desktop');
        });
        it('does append mobile for second link', async () => {
            //then click on mobile
            const cbd = document.querySelector('sp-checkbox[name=desktop]');
            await elementClick(cbd);
            const cbm = document.querySelector('sp-checkbox[name=mobile]');
            await elementClick(cbm);
            expect(parseState().types).to.equal('desktop,mobile');
        });
        it('does remove desktop when clicked again', async () => {
            //click again on desktop
            const cbd = document.querySelector('sp-checkbox[name=desktop]');
            await elementClick(cbd);
            expect(parseState().types).to.equal('desktop');
            await elementClick(cbd);
            expect(parseState().types).to.undefined;
        });
        it('does remove everything when clicked again', async () => {
            //click again on mobile
            const cbm = document.querySelector('sp-checkbox[name=mobile]');
            await elementClick(cbm);
            await elementClick(cbm);
            expect(parseState().types).to.be.undefined;
        });
        it('updates the navigation item depending of state', async () => {
            resetChecks();
            pushState({ types: 'web,mobile' });
            await refreshElement(
                document.querySelector('merch-sidenav-checkbox-group')
                    .parentElement,
            );
            const web = document.querySelector('sp-checkbox[name=web]');
            expect(web.checked).to.be.true;
            const mobile = document.querySelector('sp-checkbox[name=mobile]');
            expect(mobile.checked).to.be.true;
        });
    });

    describe('Resource desktop sidenav', async () => {
        beforeEach(async () => {
            window.location.hash = '';
            container.innerHTML = '';
            await render();
        });
        it('renders 1 navigation element', async () => {
            expect(
                document
                    .querySelectorAll('merch-sidenav-list')[1]
                    .querySelectorAll('sp-sidenav-item').length,
            ).to.equal(1);
        });
    });

    describe('Search desktop sidenav', async () => {
        beforeEach(async () => {
            window.location.hash = '';
            container.innerHTML = '';
            await render();
        });
        it('renders 1 search element', async () => {
            expect(document.querySelectorAll('merch-search').length).to.equal(
                1,
            );
        });

        /*it('does deeplink to search', async () => {
            const search = document.querySelector('sp-search');
            search.setAttribute('value', 'test');
            await delay(20);
            expect(parseState().search).to.equal('test');
        });*/

        it('does refresh from url state', async () => {
            const search = document.querySelector('sp-search');
            const sidenavItemCD = document.querySelector('sp-sidenav-item[label="Creativity And Design"]');
            search.value = '';
            pushState({ search: 'photoshop', filter: 'creativitydesign' });
            await refreshElement(
                document.querySelector('merch-search').parentElement,
            );
            expect(search.value).to.equal('photoshop');
            expect(sidenavItemCD.expanded).to.be.true;
        });
    });
});
