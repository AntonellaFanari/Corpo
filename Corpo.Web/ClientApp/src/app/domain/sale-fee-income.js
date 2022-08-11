"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomeType = exports.SaleFeeIncome = void 0;
var SaleFeeIncome = /** @class */ (function () {
    function SaleFeeIncome() {
    }
    return SaleFeeIncome;
}());
exports.SaleFeeIncome = SaleFeeIncome;
var IncomeType;
(function (IncomeType) {
    IncomeType[IncomeType["sale"] = 1] = "sale";
    IncomeType[IncomeType["paySale"] = 2] = "paySale";
    IncomeType[IncomeType["fee"] = 3] = "fee";
    IncomeType[IncomeType["payFee"] = 4] = "payFee";
})(IncomeType = exports.IncomeType || (exports.IncomeType = {}));
//# sourceMappingURL=sale-fee-income.js.map