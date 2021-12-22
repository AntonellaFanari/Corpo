import { DetailPurchase } from "./detail-purchase";

export class Purchase {
  id: number;
  date: string;
  supplier: string;
  userId: number;
  total: number;
  detailPurchase: DetailPurchase[];
}
