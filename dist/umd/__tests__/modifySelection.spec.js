/* tslint:disable:no-unused-expression object-literal-sort-keys */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chai", "sinon", "mocha", "../modifySelection"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chai_1 = require("chai");
    var sinon_1 = require("sinon");
    require("mocha");
    var modifySelection_1 = require("../modifySelection");
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
                createRange: sinon_1.stub(),
                getSelection: sinon_1.stub(),
                querySelector: sinon_1.stub(),
            };
            selection = {
                addRange: sinon_1.stub(),
                removeAllRanges: sinon_1.stub(),
            };
            documentRange = {
                setStart: sinon_1.stub(),
                setEnd: sinon_1.stub(),
            };
            doc.getSelection.returns(selection);
            doc.createRange.returns(documentRange);
            getTargetTextNode = sinon_1.stub();
            getTargetTextNode.onFirstCall().returns(startTextNode);
            getTargetTextNode.onSecondCall().returns(endTextNode);
            modifySelection_1.setGetTargetTextNode(getTargetTextNode);
        });
        describe('when the ranges argument is empty', function () {
            it('clears the selection', function () {
                modifySelection_1.modifySelection(doc, []);
                chai_1.expect(selection.removeAllRanges).to.have.been.calledOnce;
                chai_1.expect(selection.addRange).not.to.have.been.called;
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
                    modifySelection_1.modifySelection(doc, [range]);
                    chai_1.expect(selection.removeAllRanges).to.have.been.calledOnce;
                    chai_1.expect(getTargetTextNode.firstCall)
                        .to.have.been.calledWith(doc, range.startNode, range.startOffset);
                    chai_1.expect(getTargetTextNode.secondCall)
                        .to.have.been.calledWith(doc, range.endNode, range.endOffset);
                    chai_1.expect(selection.addRange).to.have.been.calledOnce;
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
                    modifySelection_1.modifySelection(doc, [range]);
                    chai_1.expect(selection.removeAllRanges).to.have.been.calledOnce;
                    chai_1.expect(doc.querySelector.firstCall)
                        .to.have.been.calledWith(range.startNode);
                    chai_1.expect(doc.querySelector.secondCall)
                        .to.have.been.calledWith(range.endNode);
                    chai_1.expect(getTargetTextNode.firstCall)
                        .to.have.been.calledWith(doc, startNode, range.startOffset);
                    chai_1.expect(getTargetTextNode.secondCall)
                        .to.have.been.calledWith(doc, endNode, range.endOffset);
                    chai_1.expect(selection.addRange).to.have.been.calledOnce;
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
                        chai_1.expect(function () { return modifySelection_1.modifySelection(doc, [range]); })
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
                        chai_1.expect(function () { return modifySelection_1.modifySelection(doc, [range]); })
                            .to.throw(range.endNode + " does not exist");
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=modifySelection.spec.js.map