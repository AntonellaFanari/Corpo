import { ShiftList } from "./shift-list";
import { StatusAttendance } from "./status-attendance";

export class AttendanceReservation {
  id: number;
  dayShift: string;
  dateShift: string;
  shiftId: number;
  status: StatusAttendance;
  shift: ShiftList;
  dateReservation: string;
  dateCancellation: string;
  usingNegative: boolean;
  returnCredit: boolean;
}
