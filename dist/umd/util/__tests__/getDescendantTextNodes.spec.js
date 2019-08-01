// tslint:disable:no-unused-expression
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chai", "sinon", "mocha", "../getDescendantTextNodes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chai_1 = require("chai");
    var sinon_1 = require("sinon");
    require("mocha");
    var getDescendantTextNodes_1 = require("../getDescendantTextNodes");
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
                nextNode: sinon_1.stub(),
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
                createTreeWalker: sinon_1.stub().returns(treeWalker),
            };
            var root = {};
            var textNodes = getDescendantTextNodes_1.getDescendantTextNodes(document, root);
            chai_1.expect(document.createTreeWalker)
                .to.have.been.calledWithExactly(root, NodeFilter.SHOW_TEXT);
            chai_1.expect(treeWalker.nextNode).to.have.been.calledThrice;
            chai_1.expect(textNodes).to.deep.equal([
                textNode1,
                textNode2,
            ]);
        });
    });
});
//# sourceMappingURL=getDescendantTextNodes.spec.js.map