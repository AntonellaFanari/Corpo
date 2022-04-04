import { Exercise } from "./exercise";
import { Modality } from "./wod/modality";

export class WodGroupMember {
  id?: number;
  exerciseId: number;
  modalityId: number;
  detail: string;
  units: string;
  groupIndex: number;
  mode?: string;
  value?: number;
/*  wodMemberId: number*/
}

export class WodGroupMemberResponse {
  exercise: Exercise;
  modality: Modality;
  units: string;
  groupIndex: string;
  detail: string;
  mode?: string;
  value?: number
}
