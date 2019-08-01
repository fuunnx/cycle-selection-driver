import { expect } from 'chai';
import 'mocha';
import * as index from '../index';
describe('src/util/index', function () {
    it('exports the expected items', function () {
        expect(Object.keys(index)).to.deep.equal([
            'getDescendantTextNodes',
            'getTargetTextNode',
        ]);
    });
});
//# sourceMappingURL=index.spec.js.map