import sinon from 'sinon';

const { fetch: originalFetch } = window;

export async function mockFetch(...stubs) {
    const mocks = await Promise.all(stubs.map((stub) => stub(originalFetch)));
    mocks.forEach((mock) => {
        mock.count = 0;
    });
    const stub = sinon.stub().callsFake(async (...args) => {
        const { href, pathname, searchParams } = new URL(
            String(args[0]),
            window.location,
        );
        let found = false;
        for await (const mock of mocks) {
            found = await mock({ href, pathname, searchParams });
            if (found === false) continue;
            mock.count++;
            break;
        }
        if (found === false) {
            return originalFetch(...args);
        }
        return found;
    });
    window.fetch = stub;
    return mocks;
}
