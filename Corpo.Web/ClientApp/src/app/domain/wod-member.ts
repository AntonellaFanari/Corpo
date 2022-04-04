import { WodGroupMember } from "./wod-group-member";

export class WodMember {
  id?: number;
  wodGroupsMember: WodGroupMember[]=[];
  memberId: number;
  detail: string;
  goal?: string;
  periodizationId: number;
  weekNumber: number;
  wodNumber: number;
  attended: string
}
