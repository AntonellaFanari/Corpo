"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusTest = exports.TestMember = void 0;
var TestMember = /** @class */ (function () {
    function TestMember() {
    }
    return TestMember;
}());
exports.TestMember = TestMember;
var StatusTest;
(function (StatusTest) {
    StatusTest[StatusTest["executed"] = 1] = "executed";
    StatusTest[StatusTest["pending"] = 2] = "pending";
})(StatusTest = exports.StatusTest || (exports.StatusTest = {}));
//# sourceMappingURL=test-member.js.map