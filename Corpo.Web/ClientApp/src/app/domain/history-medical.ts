import { Injury } from "./injury";

export class HistoryMedical {
  id: number;
  gender: string;
  period: string;
  weight: string;
  allergies: string;
  heartDisease: string;
  respiratoryDisease: string;
  habitualMedication: string;
  surgicalIntervention: string;
  injury: Injury[];
  observations: string
}
