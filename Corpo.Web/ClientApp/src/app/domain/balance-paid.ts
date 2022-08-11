import { Status } from "./status";

export class BalancePaid {
  id: number;
  date: string;
  pay: number;
  userId: number;
  memberId: number;
  status: Status
}
