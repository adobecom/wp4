import { expect } from '@esm-bundle/chai';
import { Tree } from '../../../libs/blocks/fragment/fragment.js';

describe('Tree Data Struct', () => {
  it('should create a tree with root node', () => {
    const t = new Tree('root');
    expect(t).not.to.be.undefined;
    expect(t.root).not.to.be.undefined;
  });

  it('should be able to add and remove nodes', () => {
    const t = new Tree('root');
    t.insert('root', 'first');
    t.insert('root', 'second');

    expect(t.find('root')).to.be.equal(t.root);
    expect(t.find('first')).to.be.equal(t.root.children[0]);
    expect(t.find('first').parent).to.be.equal(t.root);
    expect(t.find('second')).to.be.equal(t.root.children[1]);

    t.remove('first');
    expect(t.find('first')).to.be.undefined;
    expect(t.find('second')).to.be.equal(t.root.children[0]);
  });

  it('Will return false if it cant insert or remove a node', () => {
    const t = new Tree('root');
    t.insert('root', 'first');
    t.insert('root', 'second');
    const isInserted = t.insert('doesnt-exist', 'third');
    expect(isInserted).to.be.false;

    const isRemoved = t.remove('doesnt-exist');
    expect(isRemoved).to.be.false;
  });

  it('Can add child directly from a Node', () => {
    const t = new Tree('root');
    t.insert('root', 'first');
    t.insert('root', 'second');
    const firstNode = t.find('first');
    firstNode.addChild('third');
    expect(firstNode.children.length).to.be.equal(1);
    expect(firstNode.children[0].key).to.be.equal('third');

    // adding a duplicate key should not add a new child
    firstNode.addChild('third');
    expect(firstNode.children.length).to.be.equal(1);
  });
});
