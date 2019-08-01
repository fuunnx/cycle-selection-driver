import { modifySelection as originalModifySelection } from './modifySelection';
import { SelectionSource } from './SelectionSource';
var document;
var modifySelection = originalModifySelection;
export function selectionDriver(sink$) {
    /* istanbul ignore if */
    if (document === undefined) {
        document = window.document;
    }
    sink$.addListener({
        next: function (event) {
            var ranges = event instanceof Array ? event : [event];
            modifySelection(document, ranges);
        },
    });
    return new SelectionSource(document);
}
export function setDocument(doc) {
    document = doc;
}
export function setModifySelection(newModifySelection) {
    modifySelection = newModifySelection;
}
export default selectionDriver;
//# sourceMappingURL=selectionDriver.js.map