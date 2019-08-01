import { getTargetTextNode as originalGetTargetTextNode } from './util/getTargetTextNode';
var getTargetTextNode = originalGetTargetTextNode;
export function modifySelection(document, ranges) {
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
export function setGetTargetTextNode(newGetTargetTextNode) {
    getTargetTextNode = newGetTargetTextNode;
}
export default modifySelection;
//# sourceMappingURL=modifySelection.js.map