export function getDescendantTextNodes(document, root) {
    var textNodes = [];
    var treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (treeWalker.nextNode()) {
        textNodes.push(treeWalker.currentNode);
    }
    return textNodes;
}
export default getDescendantTextNodes;
//# sourceMappingURL=getDescendantTextNodes.js.map