import { Stream } from 'xstream';
import { ISelectionSource } from './ISelectionSource';
export declare class SelectionSource implements ISelectionSource {
    private document;
    constructor(document?: Document);
    selections(): Stream<Selection>;
}
export default SelectionSource;
