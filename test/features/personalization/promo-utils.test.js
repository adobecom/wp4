import { expect } from '@esm-bundle/chai';
import { readFile } from '@web/test-runner-commands';
import getPromoManifests, { isDisabled } from '../../../libs/features/personalization/promo-utils.js';

describe('isDisabled', () => {
  it('should be enabled if current time is within range', () => {
    const event = {
      start: new Date('2000-11-01T00:00:00'),
      end: new Date('2300-11-01T00:00:00'),
    };
    expect(isDisabled(event, new URLSearchParams())).to.be.false;
  });

  it('should be enabled if current time is within range, and current locale corresponds to event locale', () => {
    const event = {
      start: new Date('2000-11-01T00:00:00'),
      end: new Date('2300-11-01T00:00:00'),
      locales: ['us'],
    };
    expect(isDisabled(event, new URLSearchParams())).to.be.false;
  });

  it('should be disabled if current time is within range, but current locale does not correspond to event locale', () => {
    const event = {
      start: new Date('2000-11-01T00:00:00'),
      end: new Date('2300-11-01T00:00:00'),
      locales: ['de'],
    };
    expect(isDisabled(event, new URLSearchParams())).to.be.true;
  });

  it('should be enabled if no event exist', () => {
    expect(isDisabled(null, new URLSearchParams())).to.be.false;
  });

  it('should be enabled if event has no dates', () => {
    expect(isDisabled({}, new URLSearchParams())).to.be.false;
  });

  it('should be disabled if current time is outside range', () => {
    const event = {
      start: new Date('2300-11-01T00:00:00'),
      end: new Date('2301-11-01T00:00:00'),
    };
    expect(isDisabled(event, new URLSearchParams())).to.be.true;
  });

  it('should be disabled if no start time defined', () => {
    const event = { end: new Date('2300-11-01T00:00:00') };
    expect(isDisabled(event, new URLSearchParams())).to.be.true;
  });

  it('should be disabled if no end time defined', () => {
    const event = { start: new Date('2000-11-01T00:00:00') };
    expect(isDisabled(event, new URLSearchParams())).to.be.true;
  });

  it('should be enabled if current time is outside range, but instant parameter is withing the range', () => {
    const searchParams = new URLSearchParams();
    searchParams.append('instant', '2300-12-14T05:00:00.000Z');
    const event = {
      start: new Date('2300-11-01T00:00:00'),
      end: new Date('2301-11-01T00:00:00'),
    };
    expect(isDisabled(event, searchParams)).to.be.false;
  });
});

describe('getPromoManifests', () => {
  it('should return an array of promo manifests', async () => {
    const expectedManifests = [
      {
        manifestPath: 'https://main--milo--adobecom.hlx.page/promos/2023/black-friday/bf-us.json',
        disabled: false,
        event: {
          name: 'bf-us',
          start: new Date('2000-11-01T00:00:00.000Z'),
          end: new Date('2300-12-15T00:00:00.000Z'),
          cdtEnd: undefined,
          cdtStart: undefined,
        },
        source: [
          'promo',
        ],
      },
      {
        manifestPath: 'https://main--milo--adobecom.hlx.page/promos/2023/black-friday/pre-black-friday/manifest-global.json',
        disabled: false,
        event: {
          name: 'pre-black-friday-global',
          start: new Date('2000-11-01T00:00:00.000Z'),
          end: new Date('2300-12-15T00:00:00.000Z'),
          cdtEnd: undefined,
          cdtStart: undefined,
        },
        source: [
          'promo',
        ],
      },
      {
        manifestPath: 'https://main--milo--adobecom.hlx.page/promos/2023/black-friday/black-friday/manifest-global.json',
        disabled: true,
        event: {
          name: 'black-friday-global',
          start: new Date('2000-12-15T00:00:00.000Z'),
          end: new Date('2000-12-31T00:00:00.000Z'),
          cdtEnd: '2026-08-30T00:00:00',
          cdtStart: '2024-08-26T12:00:00',
        },
        source: [
          'promo',
        ],
      },
    ];
    document.head.innerHTML = await readFile({ path: './mocks/head-schedule.html' });
    const manifestnames = 'pre-black-friday-global,black-friday-global,cyber-monday';
    const emea = 'bf-de';
    const americas = 'bf-us';
    const manifests = getPromoManifests(
      {
        manifestnames,
        emea_manifestnames: emea,
        americas_manifestnames: americas,
      },
      new URLSearchParams(),
    );
    expect(manifests).to.deep.eq(expectedManifests);
  });

  it('should return an empty array if no schedule', async () => {
    document.head.innerHTML = '';
    const manifestNames = 'pre-black-friday-global,black-friday-global,cyber-monday';
    expect(getPromoManifests(manifestNames, new URLSearchParams()).length).to.be.equal(0);
  });

  it('should return an empty array if no manifestnames', async () => {
    document.head.innerHTML = await readFile({ path: './mocks/head-schedule.html' });
    const manifestNames = '';
    expect(getPromoManifests(manifestNames, new URLSearchParams()).length).to.be.equal(0);
  });
});
