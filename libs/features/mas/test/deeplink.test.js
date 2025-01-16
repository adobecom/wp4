import { expect } from '@esm-bundle/chai';
import { deeplink, pushState } from '../src/deeplink.js';
import { delay } from './utils.js';

describe('Deep linking', () => {
    it('processes initial URL hash', async () => {
        const events = [];
        document.location.hash = 'filter=all&single_app=acrobat';
        await delay(1);
        const stop = deeplink(({ filter, single_app }) => {
            events.push({ filter, single_app });
        });
        stop();
        expect(events).to.deep.equal([
            { filter: 'all', single_app: 'acrobat' },
        ]);
    });

    it('observes and processes URL hash changes', async () => {
        const events = [];
        document.location.hash = '';
        await delay(1);
        const stop = deeplink(({ filter, types, sort, search, single_app }) => {
            events.push({ filter, types, sort, search, single_app });
        });
        document.location.hash = 'filter=all&single_app=acrobat&types=desktop';
        await delay(1);
        expect(events.length).to.equal(2);
        expect(events[1]).to.deep.equal({
            filter: 'all',
            search: undefined,
            single_app: 'acrobat',
            sort: undefined,
            types: 'desktop',
        });
        document.location.hash = 'filter=all&types=desktop%2Cmobile';
        pushState({
            single_app: undefined,
            types: 'desktop%2Cmobile',
        });
        await delay(1);
        expect(events[2]).to.deep.equal({
            filter: 'all',
            search: undefined,
            single_app: undefined,
            sort: undefined,
            types: 'desktop%2Cmobile',
        });
        pushState({
            types: undefined,
        });
        await delay(1);
        expect(events[4]).to.deep.equal({
            filter: 'all',
            search: undefined,
            single_app: undefined,
            sort: undefined,
            types: undefined,
        });
        document.location.hash = 'filter=all&types=&x=y';
        pushState({
            filter: 'all',
            x: 'y',
            types: undefined,
        });
        await delay(1);
        expect(events[4]).to.deep.equal({
            filter: 'all',
            types: undefined,
            sort: undefined,
            search: undefined,
            single_app: undefined,
        });
        stop();
        pushState({
            filter: 'all',
            x: 'y',
            types: 'desktop',
        });
        await delay(1);
        expect(events.length).to.equal(7);
    });
});
