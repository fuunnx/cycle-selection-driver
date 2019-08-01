import { expect } from 'chai';
import { stub } from 'sinon';
import 'mocha';
import { getTargetTextNode, mockGetDescendantTextNodes } from '../getTargetTextNode';
describe('getTargetTextNode', function () {
    var textNodes = [
        { length: 5 },
        { length: 4 },
    ];
    var getDescendantTextNodes = stub().returns(textNodes);
    var document = {};
    var node = {};
    before(function () {
        mockGetDescendantTextNodes(getDescendantTextNodes);
    });
    afterEach(function () {
        getDescendantTextNodes.resetHistory();
    });
    it('gets the text node specified by the given node and offset', function () {
        var result = getTargetTextNode(document, node, 8);
        expect(getDescendantTextNodes).to.have.been.calledWithExactly(document, node);
        expect(result).to.deep.equal({
            node: textNodes[1],
            offset: 3,
        });
    });
    it('throws an error if the offset is out of bounds', function () {
        expect(function () { return getTargetTextNode(document, node, 15); })
            .to.throw('Offset is out of bounds');
    });
    it('does not throw an error if the offset corresponds to the end of the node', function () {
        expect(function () { return getTargetTextNode(document, node, 9); })
            .not.to.throw();
    });
});
//# sourceMappingURL=getTargetTextNode.spec.js.map