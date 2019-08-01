(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./getDescendantTextNodes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getDescendantTextNodes_1 = require("./getDescendantTextNodes");
    var getDescendantTextNodes = getDescendantTextNodes_1.getDescendantTextNodes;
    function getTargetTextNode(document, node, offset) {
        var textNodes = getDescendantTextNodes(document, node);
        var found = false;
        var remainingOffset = offset;
        var currentIndex = 0;
        while (!found) {
            var textNode = textNodes[currentIndex];
            if (textNode.length > remainingOffset) {
                found = true;
            }
            else if (currentIndex + 1 === textNodes.length) {
                if (textNode.length === remainingOffset) {
                    found = true;
                }
                else {
                    throw new Error('Offset is out of bounds');
                }
            }
            else {
                remainingOffset -= textNode.length;
                currentIndex += 1;
            }
        }
        var result = {
            node: textNodes[currentIndex],
            offset: remainingOffset,
        };
        return result;
    }
    exports.getTargetTextNode = getTargetTextNode;
    function mockGetDescendantTextNodes(mock) {
        getDescendantTextNodes = mock;
    }
    exports.mockGetDescendantTextNodes = mockGetDescendantTextNodes;
    exports.default = getTargetTextNode;
});
//# sourceMappingURL=getTargetTextNode.js.map