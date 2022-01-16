import { TransactionType } from "./balance-to-pay";
import { DetailsSale } from "./details-sale";

export class SaleDto {
  date: string;
  userId: number;
  memberId: number;
  detailsSale: DetailsSale[];
  total: number;
  status: number;
  pay: number;
  transaction: TransactionType;
  transactionId: number;
  balance: number;
  positiveBalance: number;
}
