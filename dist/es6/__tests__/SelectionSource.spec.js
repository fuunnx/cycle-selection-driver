// tslint:disable:no-unused-expression
import * as chai from 'chai';
import { noop } from 'lodash';
import { stub } from 'sinon';
import 'mocha';
import { SelectionSource } from '../SelectionSource';
var expect = chai.expect;
var sinonChai = require('sinon-chai'); // tslint:disable-line:no-var-requires
chai.use(sinonChai);
describe('SelectionSource', function () {
    describe('selections method', function () {
        it('should add a listener for the document selectionchange event', function () {
            var document = {
                addEventListener: stub(),
            };
            var selectionSource = new SelectionSource(document);
            selectionSource
                .selections()
                .addListener({
                complete: noop,
                error: noop,
                next: noop,
            });
            expect(document.addEventListener).to.have.been.calledWith('selectionchange');
        });
        it('should get the selection when the selectionchange event is emitted', function () {
            var document = {
                addEventListener: stub(),
                getSelection: stub(),
            };
            var selectionSource = new SelectionSource(document);
            var listener = {
                complete: noop,
                error: noop,
                next: noop,
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
                    addEventListener: stub(),
                    getSelection: stub(),
                };
                var selection1 = 'selection 1';
                var selection2 = 'selection 2';
                document.getSelection.onFirstCall().returns(selection1);
                document.getSelection.onSecondCall().returns(selection2);
                var selectionSource = new SelectionSource(document);
                var listener = {
                    complete: noop,
                    error: noop,
                    next: stub(),
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
//# sourceMappingURL=SelectionSource.spec.js.map