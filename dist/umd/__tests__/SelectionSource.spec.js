// tslint:disable:no-unused-expression
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chai", "lodash", "sinon", "mocha", "../SelectionSource"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chai = require("chai");
    var lodash_1 = require("lodash");
    var sinon_1 = require("sinon");
    require("mocha");
    var SelectionSource_1 = require("../SelectionSource");
    var expect = chai.expect;
    var sinonChai = require('sinon-chai'); // tslint:disable-line:no-var-requires
    chai.use(sinonChai);
    describe('SelectionSource', function () {
        describe('selections method', function () {
            it('should add a listener for the document selectionchange event', function () {
                var document = {
                    addEventListener: sinon_1.stub(),
                };
                var selectionSource = new SelectionSource_1.SelectionSource(document);
                selectionSource
                    .selections()
                    .addListener({
                    complete: lodash_1.noop,
                    error: lodash_1.noop,
                    next: lodash_1.noop,
                });
                expect(document.addEventListener).to.have.been.calledWith('selectionchange');
            });
            it('should get the selection when the selectionchange event is emitted', function () {
                var document = {
                    addEventListener: sinon_1.stub(),
                    getSelection: sinon_1.stub(),
                };
                var selectionSource = new SelectionSource_1.SelectionSource(document);
                var listener = {
                    complete: lodash_1.noop,
                    error: lodash_1.noop,
                    next: lodash_1.noop,
                };
                selectionSource
                    .selections()
                    .addListener(listener);
                var emitEvent = document.addEventListener.firstCall.args[1];
                emitEvent();
                expect(document.getSelection).to.have.been.calledOnce;
            });
            describe('returned stream', function () {
                it('should emit the updated selection when the selectionchange event is emitted', function () {
                    var document = {
                        addEventListener: sinon_1.stub(),
                        getSelection: sinon_1.stub(),
                    };
                    var selection1 = 'selection 1';
                    var selection2 = 'selection 2';
                    document.getSelection.onFirstCall().returns(selection1);
                    document.getSelection.onSecondCall().returns(selection2);
                    var selectionSource = new SelectionSource_1.SelectionSource(document);
                    var listener = {
                        complete: lodash_1.noop,
                        error: lodash_1.noop,
                        next: sinon_1.stub(),
                    };
                    selectionSource
                        .selections()
                        .addListener(listener);
                    var emitEvent = document.addEventListener.firstCall.args[1];
                    emitEvent();
                    emitEvent();
                    expect(listener.next).to.have.been.calledTwice;
                    expect(listener.next.firstCall.calledWithExactly(selection1)).to.be.true;
                    expect(listener.next.secondCall.calledWithExactly(selection2)).to.be.true;
                });
            });
        });
    });
});
//# sourceMappingURL=SelectionSource.spec.js.map