import { expect } from 'chai';
import 'mocha';
import * as index from '../index';
describe('src/index', function () {
    it('exports the expected items', function () {
        expect(Object.keys(index)).to.deep.equal([
            'IRange',
            'ISelectionSource',
            'selectionDriver',
            'SelectionSource',
        ]);
    });
});
//# sourceMappingURL=index.spec.js.map