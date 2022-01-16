"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionType = exports.FeeDto = void 0;
var FeeDto = /** @class */ (function () {
    function FeeDto() {
        this.membersPromotion = [];
    }
    return FeeDto;
}());
exports.FeeDto = FeeDto;
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["sale"] = 1] = "sale";
    TransactionType[TransactionType["fee"] = 2] = "fee";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
//# sourceMappingURL=fee-dto.js.map