export class SaleFeeIncome {
  id: number;
  date: string;
  incomeType: IncomeType;
  pay: number
}

export enum IncomeType {
  sale = 1,
  paySale = 2,
  fee = 3,
  payFee = 4
}
