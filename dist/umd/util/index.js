(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./getDescendantTextNodes", "./getTargetTextNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getDescendantTextNodes_1 = require("./getDescendantTextNodes");
    exports.getDescendantTextNodes = getDescendantTextNodes_1.getDescendantTextNodes;
    var getTargetTextNode_1 = require("./getTargetTextNode");
    exports.getTargetTextNode = getTargetTextNode_1.getTargetTextNode;
});
//# sourceMappingURL=index.js.map