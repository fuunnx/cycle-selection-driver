import { adapt } from '@cycle/run/lib/adapt';
import fromEvent from 'xstream/extra/fromEvent';
var SelectionSource = /** @class */ (function () {
    function SelectionSource(document) {
        this.document = document === undefined ? /* istanbul ignore next */ window.document : document;
    }
    SelectionSource.prototype.selections = function () {
        var _this = this;
        var selection$ = fromEvent(this.document, 'selectionchange')
            .map(function () { return _this.document.getSelection(); });
        return adapt(selection$);
    };
    return SelectionSource;
}());
export { SelectionSource };
export default SelectionSource;
//# sourceMappingURL=SelectionSource.js.map