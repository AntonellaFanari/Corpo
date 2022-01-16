import { PromotionAnotherMember } from "./promotion-another-member";

export class Promotion {
  id: number;
  name: string;
  from: string;
  to: string;
  discountMainMember: number;
  promotionAnotherMember: PromotionAnotherMember[];
}
