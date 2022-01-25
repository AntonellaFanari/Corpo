"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Attendance = void 0;
var Attendance = /** @class */ (function () {
    function Attendance() {
    }
    return Attendance;
}());
exports.Attendance = Attendance;
var Status;
(function (Status) {
    Status[Status["reserved"] = 1] = "reserved";
    Status[Status["cancelled"] = 2] = "cancelled";
})(Status = exports.Status || (exports.Status = {}));
//# sourceMappingURL=attendance.js.map