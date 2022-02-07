import { WodGroupMember } from "./wod-group-member";

export class WodMember {
  id: number;
  name: string;
  wodGroupsMember: WodGroupMember[];
  memberId: number;
  detail: string
}
