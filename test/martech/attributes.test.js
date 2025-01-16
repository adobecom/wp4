import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { decorateSectionAnalytics, processTrackingLabels } from '../../libs/martech/attributes.js';
import { createTag } from '../../libs/utils/utils.js';

const expectedLinkValues = [
  'already-has-1',
  'Traditional Link-2--Second Traditional H',
  'Title Only Link-3--Tracking Header',
  'Traditional Link-5--Button Tracking Head',
  'After bold-1--Bold text',
  'After strong-2--Strong text',
];

describe('Analytics', async () => {
  it('should decorate attributes without pzn', async () => {
    document.body.outerHTML = await readFile({ path: './mocks/body.html' });
    document.querySelectorAll('main > div').forEach((section, idx) => decorateSectionAnalytics(section, idx, { mep: {} }));

    const main = document.querySelector('main');
    expect(main?.getAttribute('daa-im')).to.equal('true');
    const section = document.querySelector('main > div');
    expect(section?.getAttribute('daa-lh')).to.equal('s1');
    const block = section.querySelector(':scope > div')?.getAttribute('daa-lh');
    expect(block).to.equal('b1|text');

    section.querySelectorAll('a').forEach((link, idx) => {
      expect(link.getAttribute('daa-ll')).to.equal(expectedLinkValues[idx]);
    });

    const cardLink = document.querySelector('.milo-card-section a');
    expect(cardLink.getAttribute('daa-ll')).to.equal('Learn more AI for gr-1--Header for tiles bel');
    const nestedCard = document.querySelector('#test-header');
    expect(nestedCard.getAttribute('daa-lh')).to.equal('b1|t1abm--merch-card');
  });
  it('should decorate pzn with attributes', async () => {
    document.body.outerHTML = await readFile({ path: './mocks/body.html' });
    document.querySelectorAll('main > div').forEach((section, idx) => decorateSectionAnalytics(section, idx, { mep: { martech: '|smb|hp' } }));

    const main = document.querySelector('main');
    expect(main?.getAttribute('daa-im')).to.equal('true');
    const section = document.querySelector('main > div');
    expect(section?.getAttribute('daa-lh')).to.equal('s1');
    const block = section.querySelector(':scope > div')?.getAttribute('daa-lh');
    expect(block).to.equal('b1|text|smb|hp');

    section.querySelectorAll('a').forEach((link, idx) => {
      expect(link.getAttribute('daa-ll')).to.equal(expectedLinkValues[idx]);
    });
    const nestedCard = document.querySelector('#test-header');
    expect(nestedCard.getAttribute('daa-lh')).to.equal('b1|t1abm--merch-card|smb|hp');
  });
  it('should limit analytics header length to analytics-header-limit when this metadata value is set to a number', async () => {
    document.body.outerHTML = await readFile({ path: './mocks/body.html' });
    const analyticsHeaderLimit = 2;
    const meta = createTag('meta', { name: 'analytics-header-limit', content: analyticsHeaderLimit });
    document.querySelector('head')?.append(meta);
    document.querySelectorAll('main > div').forEach((section, idx) => decorateSectionAnalytics(section, idx, { mep: { martech: '|smb|hp' } }));
    const section = document.querySelector('main > div');
    section.querySelectorAll('a').forEach((link) => {
      const daall = link.getAttribute('daa-ll');
      const linkHeaderValue = daall.includes('--') && daall.split('--')[1];
      if (linkHeaderValue) {
        expect(linkHeaderValue.length).to.be.at.most(analyticsHeaderLimit);
      }
    });
  });
  it('should not limit analytics header length when metadata analytics-header-limit value set to off', async () => {
    document.body.outerHTML = await readFile({ path: './mocks/body.html' });
    const analyticsHeaderLimit = 'off';
    document.querySelector('meta[name="analytics-header-limit"]')?.setAttribute('content', analyticsHeaderLimit);
    document.querySelectorAll('main > div').forEach((section, idx) => decorateSectionAnalytics(section, idx, { mep: { martech: '|smb|hp' } }));
    const headerText = document.querySelector('#block-with-header h3:nth-of-type(2)')?.textContent.trim();
    const daall = document.querySelector('#block-with-header p:nth-of-type(2) a')?.getAttribute('daa-ll')?.split('--')[1];
    expect(headerText).to.equal(daall);
  });
  it('should limit analytics header length to default when analytics-header-limit metadata value is empty', async () => {
    const defaultValue = 20;
    document.body.outerHTML = await readFile({ path: './mocks/body.html' });
    const analyticsHeaderLimit = '';
    document.querySelector('meta[name="analytics-header-limit"]')?.setAttribute('content', analyticsHeaderLimit);
    document.querySelectorAll('main > div').forEach((section, idx) => decorateSectionAnalytics(section, idx, { mep: { martech: '|smb|hp' } }));
    const daall = document.querySelector('#block-with-header p:nth-of-type(2) a')?.getAttribute('daa-ll')?.split('--')[1];
    expect(daall.length).to.be.at.most(defaultValue);
  });
  it('should limit analytics header length to default when analytics-header-limit metadata value is incorrect', async () => {
    const defaultValue = 20;
    document.body.outerHTML = await readFile({ path: './mocks/body.html' });
    const analyticsHeaderLimit = 'offs';
    document.querySelector('meta[name="analytics-header-limit"]')?.setAttribute('content', analyticsHeaderLimit);
    document.querySelectorAll('main > div').forEach((section, idx) => decorateSectionAnalytics(section, idx, { mep: { martech: '|smb|hp' } }));
    const daall = document.querySelector('#block-with-header p:nth-of-type(2) a')?.getAttribute('daa-ll')?.split('--')[1];
    expect(daall.length).to.be.at.most(defaultValue);
  });
  it('should limit analytics header length to default when no metadata', async () => {
    const defaultValue = 20;
    document.body.outerHTML = await readFile({ path: './mocks/body.html' });
    document.querySelector('meta[name="analytics-header-limit"]').remove();
    document.querySelectorAll('main > div').forEach((section, idx) => decorateSectionAnalytics(section, idx, { mep: { martech: '|smb|hp' } }));
    const daall = document.querySelector('#block-with-header p:nth-of-type(2) a')?.getAttribute('daa-ll')?.split('--')[1];
    expect(daall.length).to.be.at.most(defaultValue);
  });
  it('should process tracking labels', () => {
    const longString = 'This is a long string that should be truncated';
    const processedString = processTrackingLabels(longString, { locale: { ietf: 'en-US' } }, 20);
    expect(processedString).to.equal('This is a long strin');
  });
  it('should process tracking labels with foreign locale', () => {
    const translatedString = 'Comprar ahora';
    const processedString = processTrackingLabels(translatedString, {
      locale: { ietf: 'es-ES' },
      analyticLocalization: { 'Comprar ahora': 'Buy now' },
    }, 20);
    expect(processedString).to.equal('Buy now');
  });
  it('should process tracking labels with foreign locale and MEP placeholder', () => {
    const translatedString = 'Comprar ahora';
    const processedString = processTrackingLabels(translatedString, {
      locale: { ietf: 'es-ES' },
      analyticLocalization: { 'Comprar ahora': 'Buy now' },
      mep: { analyticLocalization: { 'Comprar ahora': 'Buy right now' } },
    }, 20);
    expect(processedString).to.equal('Buy right now');
  });
});
