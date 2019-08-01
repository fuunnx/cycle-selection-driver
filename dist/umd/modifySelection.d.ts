import { IRange } from './IRange';
import { IResult } from './util/getTargetTextNode';
export declare function modifySelection(document: Document, ranges: IRange[]): void;
export declare function setGetTargetTextNode(newGetTargetTextNode: (document: Document, node: Node, offset: number) => IResult): void;
export default modifySelection;
