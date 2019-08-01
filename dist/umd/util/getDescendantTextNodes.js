(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getDescendantTextNodes(document, root) {
        var textNodes = [];
        var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (treeWalker.nextNode()) {
            textNodes.push(treeWalker.currentNode);
        }
        return textNodes;
    }
    exports.getDescendantTextNodes = getDescendantTextNodes;
    exports.default = getDescendantTextNodes;
});
//# sourceMappingURL=getDescendantTextNodes.js.map