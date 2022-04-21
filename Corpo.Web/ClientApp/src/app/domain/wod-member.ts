import { WodGroupMember } from "./wod-group-member";
import { IntensityType } from "./wod/periodization";

export class WodMember {
  id?: number;
  wodGroupsMember: WodGroupMember[]=[];
  memberId: number;
  detail: string;
  goal?: string;
  periodizationId: number;
  weekNumber: number;
  wodNumber: number;
  attended: string;
  rate: number;
  intensityType: IntensityType;
  intensity: number
}
