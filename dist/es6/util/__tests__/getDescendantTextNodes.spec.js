// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { stub } from 'sinon';
import 'mocha';
import { getDescendantTextNodes } from '../getDescendantTextNodes';
describe('getDescendantTextNodes', function () {
    before(function () {
        global.NodeFilter = {
            SHOW_TEXT: 1,
        };
    });
    after(function () {
        delete global.NodeFilter;
    });
    it('returns all of the root node\'s descendant text nodes', function () {
        var textNode1 = 'text node 1';
        var textNode2 = 'text node 2';
        var treeWalker = {
            nextNode: stub(),
        };
        treeWalker.nextNode.onFirstCall().callsFake(function () {
            treeWalker.currentNode = textNode1;
            return true;
        });
        treeWalker.nextNode.onSecondCall().callsFake(function () {
            treeWalker.currentNode = textNode2;
            return true;
        });
        treeWalker.nextNode.onThirdCall().returns(false);
        var document = {
            createTreeWalker: stub().returns(treeWalker),
        };
        var root = {};
        var textNodes = getDescendantTextNodes(document, root);
        expect(document.createTreeWalker)
            .to.have.been.calledWithExactly(root, NodeFilter.SHOW_TEXT);
        expect(treeWalker.nextNode).to.have.been.calledThrice;
        expect(textNodes).to.deep.equal([
            textNode1,
            textNode2,
        ]);
    });
});
//# sourceMappingURL=getDescendantTextNodes.spec.js.map