(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./util/getTargetTextNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getTargetTextNode_1 = require("./util/getTargetTextNode");
    var getTargetTextNode = getTargetTextNode_1.getTargetTextNode;
    function modifySelection(document, ranges) {
        var selection = document.getSelection();
        selection.removeAllRanges();
        ranges
            .map(function (range) {
            var documentRange = document.createRange();
            var startNode = (range.startNode.hasOwnProperty('nodeType') ?
                range.startNode :
                document.querySelector(range.startNode));
            var endNode = (range.endNode.hasOwnProperty('nodeType') ?
                range.endNode :
                document.querySelector(range.endNode));
            if (startNode === null) {
                throw new Error(range.startNode + " does not exist");
            }
            if (endNode === null) {
                throw new Error(range.endNode + " does not exist");
            }
            var startTextNode = getTargetTextNode(document, startNode, range.startOffset);
            documentRange.setStart(startTextNode.node, startTextNode.offset);
            var endTextNode = getTargetTextNode(document, endNode, range.endOffset);
            documentRange.setEnd(endTextNode.node, endTextNode.offset);
            return documentRange;
        })
            .forEach(function (range) { return selection.addRange(range); });
    }
    exports.modifySelection = modifySelection;
    function setGetTargetTextNode(newGetTargetTextNode) {
        getTargetTextNode = newGetTargetTextNode;
    }
    exports.setGetTargetTextNode = setGetTargetTextNode;
    exports.default = modifySelection;
});
//# sourceMappingURL=modifySelection.js.map