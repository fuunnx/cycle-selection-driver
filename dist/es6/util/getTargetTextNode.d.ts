export interface IResult {
    node: Text;
    offset: number;
}
export declare function getTargetTextNode(document: Document, node: Node, offset: number): IResult;
export declare function mockGetDescendantTextNodes(mock: any): void;
export default getTargetTextNode;
