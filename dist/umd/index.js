(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./selectionDriver", "./SelectionSource"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var selectionDriver_1 = require("./selectionDriver");
    exports.selectionDriver = selectionDriver_1.selectionDriver;
    var SelectionSource_1 = require("./SelectionSource");
    exports.SelectionSource = SelectionSource_1.SelectionSource;
});
//# sourceMappingURL=index.js.map