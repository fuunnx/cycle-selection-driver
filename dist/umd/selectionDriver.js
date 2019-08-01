(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./modifySelection", "./SelectionSource"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var modifySelection_1 = require("./modifySelection");
    var SelectionSource_1 = require("./SelectionSource");
    var document;
    var modifySelection = modifySelection_1.modifySelection;
    function selectionDriver(sink$) {
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
        return new SelectionSource_1.SelectionSource(document);
    }
    exports.selectionDriver = selectionDriver;
    function setDocument(doc) {
        document = doc;
    }
    exports.setDocument = setDocument;
    function setModifySelection(newModifySelection) {
        modifySelection = newModifySelection;
    }
    exports.setModifySelection = setModifySelection;
    exports.default = selectionDriver;
});
//# sourceMappingURL=selectionDriver.js.map