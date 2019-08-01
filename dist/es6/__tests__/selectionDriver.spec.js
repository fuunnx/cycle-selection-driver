// tslint:disable:no-unused-expression
import { expect } from 'chai';
import { stub } from 'sinon';
import xstream, { Stream } from 'xstream';
import 'mocha';
import { selectionDriver, setDocument, setModifySelection } from '../selectionDriver';
describe('selectionDriver', function () {
    var doc = {};
    var modifySelectionStub;
    before(function () {
        setDocument(doc);
        modifySelectionStub = stub();
        setModifySelection(modifySelectionStub);
    });
    afterEach(function () {
        modifySelectionStub.reset();
    });
    it('returns an instance of ISelectionSource', function () {
        var sink$ = new Stream();
        var result = selectionDriver(sink$);
        expect(result).to.exist;
        expect(result).to.have.property('selections');
    });
    it('modifies the selection when an event with a single range is emitted', function () {
        var range = {};
        var sink$ = xstream.of(range);
        selectionDriver(sink$);
        expect(modifySelectionStub).to.have.been.calledOnce;
        var args = modifySelectionStub.firstCall.args;
        expect(args[0]).to.equal(doc);
        expect(args[1]).to.be.an('array').with.lengthOf(1);
        expect(args[1][0]).to.equal(range);
    });
    it('modifies the selection when an event with multiple ranges is emitted', function () {
        var ranges = [{}, {}];
        var sink$ = xstream.of(ranges);
        selectionDriver(sink$);
        expect(modifySelectionStub)
            .to.have.been.calledOnce.and.calledWithExactly(doc, ranges);
    });
});
//# sourceMappingURL=selectionDriver.spec.js.map