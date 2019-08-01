// tslint:disable:no-unused-expression
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chai", "sinon", "xstream", "mocha", "../selectionDriver"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chai_1 = require("chai");
    var sinon_1 = require("sinon");
    var xstream_1 = require("xstream");
    require("mocha");
    var selectionDriver_1 = require("../selectionDriver");
    describe('selectionDriver', function () {
        var doc = {};
        var modifySelectionStub;
        before(function () {
            selectionDriver_1.setDocument(doc);
            modifySelectionStub = sinon_1.stub();
            selectionDriver_1.setModifySelection(modifySelectionStub);
        });
        afterEach(function () {
            modifySelectionStub.reset();
        });
        it('returns an instance of ISelectionSource', function () {
            var sink$ = new xstream_1.Stream();
            var result = selectionDriver_1.selectionDriver(sink$);
            chai_1.expect(result).to.exist;
            chai_1.expect(result).to.have.property('selections');
        });
        it('modifies the selection when an event with a single range is emitted', function () {
            var range = {};
            var sink$ = xstream_1.default.of(range);
            selectionDriver_1.selectionDriver(sink$);
            chai_1.expect(modifySelectionStub).to.have.been.calledOnce;
            var args = modifySelectionStub.firstCall.args;
            chai_1.expect(args[0]).to.equal(doc);
            chai_1.expect(args[1]).to.be.an('array').with.lengthOf(1);
            chai_1.expect(args[1][0]).to.equal(range);
        });
        it('modifies the selection when an event with multiple ranges is emitted', function () {
            var ranges = [{}, {}];
            var sink$ = xstream_1.default.of(ranges);
            selectionDriver_1.selectionDriver(sink$);
            chai_1.expect(modifySelectionStub)
                .to.have.been.calledOnce.and.calledWithExactly(doc, ranges);
        });
    });
});
//# sourceMappingURL=selectionDriver.spec.js.map