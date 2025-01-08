import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import init from '../../../libs/blocks/locui-create/locui-create.js';

document.body.innerHTML = await readFile({ path: './mocks/body.html' });
const locuiCreate = document.querySelector('.locui-create');

describe('Locui-create', () => {
  before(() => {
    init(locuiCreate);
  });

  it('renders with locui create class', () => {
    const hasMissingDetails = locuiCreate.classList.contains('missing-details');
    expect(hasMissingDetails).to.be.true;
  });

  it('renders instructions correctly', () => {
    const header = locuiCreate.querySelector(':scope > h2').textContent;
    expect(header).to.equal('Missing project details');
    const paragraph = locuiCreate.querySelector(':scope > p').textContent;
    expect(paragraph).to.equal('The project details were removed after you logged in. To resolve this:');
  });
});
