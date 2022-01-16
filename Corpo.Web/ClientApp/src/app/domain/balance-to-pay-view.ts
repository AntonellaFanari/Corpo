export class BalanceToPayView {
  id: number;
  lastName: string;
  name: string;
  balance: number;
  idMember: number;
  statement: Statement;
  pay: number
}

export enum Statement {
  paid = 1,
  onpaid =2
}
