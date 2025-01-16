import { expect } from '@esm-bundle/chai';
import { getArticleTaxonomy } from '../../../libs/blocks/article-feed/article-helpers.js';

describe('adobetv autoblock', () => {
  it('Creates article taxonomy from strings', async () => {
    const article = {
      tags: 'hello, world',
      path: '/no/types/for/you',
    };
    const taxonomy = getArticleTaxonomy(article);
    expect(taxonomy.topics[0]).to.equal('hello');
  });

  it('Creates article taxonomy from an array of strings', async () => {
    const article = {
      tags: ['goodnight', 'moon'],
      path: '/no/types/for/you',
    };
    const taxonomy = getArticleTaxonomy(article);
    expect(taxonomy.topics[0]).to.equal('goodnight');
  });
});
