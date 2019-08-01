(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chai", "sinon", "mocha", "../getTargetTextNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chai_1 = require("chai");
    var sinon_1 = require("sinon");
    require("mocha");
    var getTargetTextNode_1 = require("../getTargetTextNode");
    describe('getTargetTextNode', function () {
        var textNodes = [
            { length: 5 },
            { length: 4 },
        ];
        var getDescendantTextNodes = sinon_1.stub().returns(textNodes);
        var document = {};
        var node = {};
        before(function () {
            getTargetTextNode_1.mockGetDescendantTextNodes(getDescendantTextNodes);
        });
        afterEach(function () {
            getDescendantTextNodes.resetHistory();
        });
        it('gets the text node specified by the given node and offset', function () {
            var result = getTargetTextNode_1.getTargetTextNode(document, node, 8);
            chai_1.expect(getDescendantTextNodes).to.have.been.calledWithExactly(document, node);
            chai_1.expect(result).to.deep.equal({
                node: textNodes[1],
                offset: 3,
            });
        });
        it('throws an error if the offset is out of bounds', function () {
            chai_1.expect(function () { return getTargetTextNode_1.getTargetTextNode(document, node, 15); })
                .to.throw('Offset is out of bounds');
        });
        it('does not throw an error if the offset corresponds to the end of the node', function () {
            chai_1.expect(function () { return getTargetTextNode_1.getTargetTextNode(document, node, 9); })
                .not.to.throw();
        });
    });
});
//# sourceMappingURL=getTargetTextNode.spec.js.map