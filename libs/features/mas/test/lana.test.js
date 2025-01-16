import { Log } from '../src/log.js';
import { config, lanaAppender } from '../src/lana.js';
import { mockLana, unmockLana } from './mocks/lana.js';
import { expect } from './utilities.js';

describe('lana', () => {
    let lana;
    const originalHref = window.location.href;

    afterEach(() => {
        unmockLana();
        window.history.replaceState({}, '', originalHref);
    });

    beforeEach(() => {
        lana = mockLana();
    });

    it('calls `window.lana.log` with params', () => {
        Log.reset();

        window.history.replaceState({}, '', '/test/page');

        lanaAppender.append({
            level: Log.Level.ERROR,
            message: 'Test',
            namespace: 'test',
            params: [
                {
                    err: new Error('Houston'),
                    fn: window.open,
                    str: 'test',
                },
            ],
            source: 'testModule',
            timestamp: Date.now(),
        });

        expect(lana.log.firstCall.args).to.deep.equal([
            'Test¶page=/test/page¶facts=[{"err":"Houston","fn":"function open","str":"test"}]',
            {
                clientId: 'merch-at-scale',
                delimiter: '¶',
                ignoredProperties: ['analytics', 'literals'],
                isProdDomain: false,
                serializableTypes: ['Array', 'Object'],
                sampleRate: 1,
                tags: 'acom',
            },
        ]);
    });

    it('will trim page length if longer than 1k characters', () => {
      Log.reset();
      const page = new Array(1001).join( 'a' );
      window.history.replaceState({}, '', page);
      lanaAppender.append({
          level: Log.Level.ERROR,
          message: 'Failed to build price, osi 123: ',
          namespace: 'test',
          params: [
            new Error('Uncaught TypeError: Cannot read properties of null'),
          ],
          source: 'testModule',
          timestamp: Date.now(),
      });

      expect(lana.log.firstCall.args).to.deep.equal([
          'Failed to build price, osi 123:  Uncaught TypeError: Cannot read properties of null¶page=/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa<trunc>',
          {
              clientId: 'merch-at-scale',
              delimiter: '¶',
              ignoredProperties: ['analytics', 'literals'],
              isProdDomain: false,
              serializableTypes: ['Array', 'Object'],
              sampleRate: 1,
              tags: 'acom',
          },
      ]);
  });
});
