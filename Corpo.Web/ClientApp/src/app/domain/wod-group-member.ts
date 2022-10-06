import { Exercise } from "./exercise";
import { Modality } from "./wod/modality";

export class WodGroupMember {
  id?: number;
  exerciseId: number;
  modalityId: number;
  detail: string;
  rounds?: number;
  series?: number;
  time?: number;
  unitType?: string;
  units?: string;
  groupIndex: number;
  intensityType?: string;
  intensityValue?: number;
  staggeredType?: string;
  staggeredValue?: number;
  pauseBetweenRounds?: number;
  pauseBetweenExercises?: number;
  timeWork?: number;
  timeRest?: number;

/*  wodMemberId: number*/
}

export class WodGroupMemberResponse {
  exercise: Exercise;
  modality: Modality;
  rounds?: number;
  series?: number;
  time?: number;
  unitType?: string;
  units?: string;
  groupIndex: number;
  intensityType?: string;
  intensityValue?: number;
  staggeredType?: string;
  staggeredValue?: number;
  pauseBetweenRounds?: number;
  pauseBetweenExercises?: number;
  timeWork?: number;
  timeRest?: number;
}
