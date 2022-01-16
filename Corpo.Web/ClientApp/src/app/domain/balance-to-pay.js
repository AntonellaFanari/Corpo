"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.BalanceToPay = void 0;
var BalanceToPay = /** @class */ (function () {
    function BalanceToPay() {
    }
    return BalanceToPay;
}());
exports.BalanceToPay = BalanceToPay;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["sale"] = 1] = "sale";
    TransactionType[TransactionType["fee"] = 2] = "fee";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
//# sourceMappingURL=balance-to-pay.js.map