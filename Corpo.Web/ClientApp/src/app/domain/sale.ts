import { DetailsSale } from "./details-sale";

export class Sale {
  id: number;
  date: string;
  userName: string;
  userId: number;
  memberId: number;
  detailsSale: DetailsSale[];
  total: number;
  status: number;
  pay: number
}
