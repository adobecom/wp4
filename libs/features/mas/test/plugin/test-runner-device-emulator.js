import { devices } from '@web/test-runner-chrome';

const mapping = {
    mobile: devices['iPhone 12 Pro'],
    tablet: devices['iPad Mini'],
};

export function testRunnerDeviceEmulator() {
    return {
        name: 'test-runner-device-emulator',

        async executeCommand({ command, payload, session }) {
            if (command === 'emulate') {
                // handle specific behavior for puppeteer
                if (session.browser.type === 'puppeteer') {
                    const emulator = mapping[payload];
                    const page = session.browser.getPage(session.id);
                    if (emulator) {
                        await page.emulate(emulator);
                    } else {
                        await page.emulate({
                            userAgent:
                                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
                            viewport: {
                                width: 1200,
                                height: 900,
                            },
                        });
                    }
                    return true;
                }
                throw new Error('Toggle is supported only with puppeteer');
            }
            return undefined;
        },
    };
}
