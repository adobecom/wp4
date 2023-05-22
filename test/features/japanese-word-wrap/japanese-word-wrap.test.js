import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { setConfig, getConfig } from '../../../libs/utils/utils.js';

const {
  applyJapaneseLineBreaks,
  default: controlJapaneseLineBreaks,
} = await import('../../../libs/features/japanese-word-wrap.js');

const codeRoot = '/libs';
const conf = { codeRoot };
setConfig(conf);
const config = getConfig();

describe('Japanese Word Wrap', () => {
  beforeEach(async () => {
    document.head.innerHTML = await readFile({ path: './mocks/head.html' });
    document.body.innerHTML = await readFile({ path: './mocks/body.html' });
  });

  it('Apply JP word wrap to all headings (h1-h6)', async () => {
    await applyJapaneseLineBreaks(config);
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).to.equal(
        'keep-all',
        'JP word wrap should be applied',
      );
      expect(elem.innerHTML).include('<wbr>', '<wbr> should appear');
    });
  });

  it('Apply JP word wrap to all headings (h1-h6) under div#area', async () => {
    const scopeArea = document.getElementById('area');
    await applyJapaneseLineBreaks(config, { scopeArea });
    scopeArea.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).to.equal(
        'keep-all',
        'JP word wrap should be applied',
      );
      expect(elem.innerHTML).include('<wbr>', '<wbr> should appear');
    });
    const elem = document.querySelector('#h1-headline');
    expect(window.getComputedStyle(elem).wordBreak).not.equal(
      'keep-all',
      'JP word wrap should not be applied to this elem',
    );
  });

  it('Apply JP word wrap to H1', async () => {
    await applyJapaneseLineBreaks(config, {
      scopeArea: document,
      budouxSelector: 'h1',
    });
    document.querySelectorAll('h1').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).to.equal(
        'keep-all',
        'JP word wrap should be applied',
      );
      expect(elem.innerHTML).include('<wbr>', '<wbr> should appear');
    });
    document.querySelectorAll('h2').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).not.equal(
        'keep-all',
        'JP word wrap should not be applied',
      );
    });
  });

  it('Do not apply JP word wrap to paragraphs (p) as default', async () => {
    await applyJapaneseLineBreaks(config);
    document.querySelectorAll('p').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).not.equal(
        'keep-all',
        'JP word wrap should not be applied',
      );
      expect(elem.innerHTML).not.include('<wbr>', '<wbr> should not appear');
    });
  });

  it('Apply balance word wrap to H1', async () => {
    await applyJapaneseLineBreaks(config, {
      budouxSelector: 'h1',
      bwSelector: 'h1',
    });
    document.querySelectorAll('h1').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).to.equal(
        'keep-all',
        'JP word wrap should be applied',
      );
      expect(elem.innerHTML).include('jpn-balanced-wbr', 'Balance word wrap should be applied');
    });
    document.querySelectorAll('h2').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).not.equal(
        'keep-all',
        'JP word wrap should not be applied',
      );
    });
  });

  it('Prevent line break with specific patterns by using lineBreakNgPatterns option', async () => {
    await applyJapaneseLineBreaks(config, {
      budouxSelector: '#h1-headline',
      lineBreakNgPatterns: ['Miloは、#adobe.com', 'Franklinベースの#ウェブサイト'],
    });
    const elem = document.querySelector('#h1-headline');
    expect(elem.innerHTML).include('Franklinベースのウェブサイト', '<wbr> should not appear');
    expect(elem.innerHTML).include('Miloは、adobe.com', '<wbr> should not appear');
  });

  it('Allow line break with specific patterns by using lineBreakOkPatterns option', async () => {
    await applyJapaneseLineBreaks(config, {
      budouxSelector: '#h1-headline',
      lineBreakOkPatterns: ['共有#機能', 'ウェブ#サイト'],
    });
    const elem = document.querySelector('#h1-headline');
    expect(elem.innerHTML).include('共有<wbr>機能', '<wbr> should appear');
    expect(elem.innerHTML).include('ウェブ<wbr>サイト', '<wbr> should appear');
  });

  it('Work properly even when an invalid pattern is specified', async () => {
    await applyJapaneseLineBreaks(config, {
      budouxSelector: '#h1-headline',
      lineBreakOkPatterns: ['共有機能', '共#有機能'],
      lineBreakNgPatterns: ['共有', '共有##機能', 'ウェブ#サイト共有#機能'],
    });
    const elem = document.querySelector('#h1-headline');
    expect(window.getComputedStyle(elem).wordBreak).to.equal(
      'keep-all',
      'JP word wrap should be applied',
    );
    expect(elem.innerHTML).include('<wbr>', '<wbr> should appear');
  });

  it('Change budouxThres value correctly', async () => {
    await applyJapaneseLineBreaks(config, {
      budouxSelector: '#h1-headline',
      budouxThres: Number.MAX_VALUE,
    });
    const elem = document.querySelector('#h1-headline');
    expect(window.getComputedStyle(elem).wordBreak).to.equal(
      'keep-all',
      'JP word wrap should be applied',
    );
    expect(elem.innerHTML).not.include('<wbr>', '<wbr> should not appear');
  });

  it('Read options from metadata correctly', async () => {
    await controlJapaneseLineBreaks(config);
    document.querySelectorAll('p').forEach((elem) => {
      expect(window.getComputedStyle(elem).wordBreak).not.equal(
        'keep-all',
        'JP word wrap should not be applied to <p>',
      );
    });
    const elem = document.querySelector('#h1-headline');
    expect(window.getComputedStyle(elem).wordBreak).to.equal(
      'keep-all',
      'JP word wrap should be applied to #h1-headline',
    );
    expect(elem.innerHTML).include('<wbr>', '<wbr> should not appear');
  });
});
