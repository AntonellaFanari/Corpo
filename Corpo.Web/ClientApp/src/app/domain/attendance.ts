export class Attendance {
  id: number;
  memberId: number;
  shiftId: number;
  status: Status;
}

export enum Status {
  reserved = 1,
  cancelled = 2
}
