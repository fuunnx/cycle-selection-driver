import { Stream } from 'xstream';
import { IRange } from './IRange';
import { ISelectionSource } from './ISelectionSource';
export declare function selectionDriver(sink$: Stream<IRange[] | IRange>): ISelectionSource;
export declare function setDocument(doc: Document): void;
export declare function setModifySelection(newModifySelection: (document: Document, ranges: IRange[]) => void): void;
export default selectionDriver;
