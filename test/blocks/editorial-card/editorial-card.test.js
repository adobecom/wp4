import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { getLocale, setConfig } from '../../../libs/utils/utils.js';

const locales = { '': { ietf: 'en-US', tk: 'hah7vzn.css' } };
const config = {
  imsClientId: 'milo',
  codeRoot: '/libs',
  contentRoot: `${window.location.origin}${getLocale(locales).prefix}`,
  locales,
};

setConfig(config);

describe('editorial-card', () => {
  let editorialCards;

  beforeEach(async () => {
    document.body.innerHTML = await readFile({ path: './mocks/body.html' });
    const { default: init } = await import('../../../libs/blocks/editorial-card/editorial-card.js');
    editorialCards = document.querySelectorAll('.editorial-card');
    editorialCards.forEach((card) => {
      init(card);
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('w/ 1 row has a foreground', () => {
    const foreground = editorialCards[0].querySelector('.foreground');
    expect(foreground).to.exist;
  });

  it('w/ 4 rows has a footer', () => {
    const footer = editorialCards[3].querySelector('.card-footer');
    expect(footer).to.exist;
  });

  it('w/ lockup gets decorated', async () => {
    const lockup = editorialCards[4].classList.contains('m-lockup');
    expect(lockup).to.exist;
  });

  it('media takes full height if no foreground', () => {
    const editorialCardWithMediaOnly = editorialCards[8];
    expect(editorialCardWithMediaOnly.classList.contains('no-foreground')).to.be.true;
  });
});
