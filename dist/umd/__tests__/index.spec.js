(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "chai", "mocha", "../index"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chai_1 = require("chai");
    require("mocha");
    var index = require("../index");
    describe('src/index', function () {
        it('exports the expected items', function () {
            chai_1.expect(Object.keys(index)).to.deep.equal([
                'IRange',
                'ISelectionSource',
                'selectionDriver',
                'SelectionSource',
            ]);
        });
    });
});
//# sourceMappingURL=index.spec.js.map