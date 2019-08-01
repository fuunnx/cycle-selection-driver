(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@cycle/run/lib/adapt", "xstream/extra/fromEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var adapt_1 = require("@cycle/run/lib/adapt");
    var fromEvent_1 = require("xstream/extra/fromEvent");
    var SelectionSource = /** @class */ (function () {
        function SelectionSource(document) {
            this.document = document === undefined ? /* istanbul ignore next */ window.document : document;
        }
        SelectionSource.prototype.selections = function () {
            var _this = this;
            var selection$ = fromEvent_1.default(this.document, 'selectionchange')
                .map(function () { return _this.document.getSelection(); });
            return adapt_1.adapt(selection$);
        };
        return SelectionSource;
    }());
    exports.SelectionSource = SelectionSource;
    exports.default = SelectionSource;
});
//# sourceMappingURL=SelectionSource.js.map