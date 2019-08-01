import { getDescendantTextNodes as originalGetDescendantTextNodes } from './getDescendantTextNodes';
var getDescendantTextNodes = originalGetDescendantTextNodes;
export function getTargetTextNode(document, node, offset) {
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
export function mockGetDescendantTextNodes(mock) {
    getDescendantTextNodes = mock;
}
export default getTargetTextNode;
//# sourceMappingURL=getTargetTextNode.js.map