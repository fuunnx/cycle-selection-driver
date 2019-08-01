/* tslint:disable:no-unused-expression object-literal-sort-keys */
import { expect } from 'chai';
import { stub } from 'sinon';
import 'mocha';
import { modifySelection, setGetTargetTextNode } from '../modifySelection';
function getFakeNode() {
    return {
        nodeType: 1,
    };
}
describe('modifySelection', function () {
    var doc;
    var selection;
    var documentRange;
    var getTargetTextNode;
    var startTextNode = {
        node: 'start-text-node',
        offset: 0,
    };
    var endTextNode = {
        node: 'end-text-node',
        offset: 1,
    };
    beforeEach(function () {
        doc = {
            createRange: stub(),
            getSelection: stub(),
            querySelector: stub(),
        };
        selection = {
            addRange: stub(),
            removeAllRanges: stub(),
        };
        documentRange = {
            setStart: stub(),
            setEnd: stub(),
        };
        doc.getSelection.returns(selection);
        doc.createRange.returns(documentRange);
        getTargetTextNode = stub();
        getTargetTextNode.onFirstCall().returns(startTextNode);
        getTargetTextNode.onSecondCall().returns(endTextNode);
        setGetTargetTextNode(getTargetTextNode);
    });
    describe('when the ranges argument is empty', function () {
        it('clears the selection', function () {
            modifySelection(doc, []);
            expect(selection.removeAllRanges).to.have.been.calledOnce;
            expect(selection.addRange).not.to.have.been.called;
        });
    });
    describe('when a single range is specified', function () {
        describe('that uses node elements for start and end', function () {
            it('sets the selection based on those nodes', function () {
                var range = {
                    startNode: getFakeNode(),
                    startOffset: 0,
                    endNode: getFakeNode(),
                    endOffset: 1,
                };
                modifySelection(doc, [range]);
                expect(selection.removeAllRanges).to.have.been.calledOnce;
                expect(getTargetTextNode.firstCall)
                    .to.have.been.calledWith(doc, range.startNode, range.startOffset);
                expect(getTargetTextNode.secondCall)
                    .to.have.been.calledWith(doc, range.endNode, range.endOffset);
                expect(selection.addRange).to.have.been.calledOnce;
            });
        });
        describe('that uses selector strings for start and end', function () {
            it('sets the selection based on the nodes that match those selector strings', function () {
                var startNode = getFakeNode();
                var endNode = getFakeNode();
                doc.querySelector.onFirstCall().returns(startNode);
                doc.querySelector.onSecondCall().returns(endNode);
                var range = {
                    startNode: 'start',
                    startOffset: 0,
                    endNode: 'end',
                    endOffset: 1,
                };
                modifySelection(doc, [range]);
                expect(selection.removeAllRanges).to.have.been.calledOnce;
                expect(doc.querySelector.firstCall)
                    .to.have.been.calledWith(range.startNode);
                expect(doc.querySelector.secondCall)
                    .to.have.been.calledWith(range.endNode);
                expect(getTargetTextNode.firstCall)
                    .to.have.been.calledWith(doc, startNode, range.startOffset);
                expect(getTargetTextNode.secondCall)
                    .to.have.been.calledWith(doc, endNode, range.endOffset);
                expect(selection.addRange).to.have.been.calledOnce;
            });
            describe('and the start does not match any elements', function () {
                it('throws an error', function () {
                    var endNode = getFakeNode();
                    doc.querySelector.onFirstCall().returns(null);
                    doc.querySelector.onSecondCall().returns(endNode);
                    var range = {
                        startNode: 'start',
                        startOffset: 0,
                        endNode: 'end',
                        endOffset: 1,
                    };
                    expect(function () { return modifySelection(doc, [range]); })
                        .to.throw(range.startNode + " does not exist");
                });
            });
            describe('and the end does not match any elements', function () {
                it('throws an error', function () {
                    var startNode = getFakeNode();
                    doc.querySelector.onFirstCall().returns(startNode);
                    doc.querySelector.onSecondCall().returns(null);
                    var range = {
                        startNode: 'start',
                        startOffset: 0,
                        endNode: 'end',
                        endOffset: 1,
                    };
                    expect(function () { return modifySelection(doc, [range]); })
                        .to.throw(range.endNode + " does not exist");
                });
            });
        });
    });
});
//# sourceMappingURL=modifySelection.spec.js.map