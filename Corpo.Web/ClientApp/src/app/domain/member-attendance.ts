import { StatusAttendance } from "./status-attendance";

export class MemberAttendance {
  id: number;
  memberId: number;
  name: string;
  remainingCredit: number;
  expiration: string;
  creditId: number;
  status: StatusAttendance;
  attended: boolean
}
