import { FileInjury } from "./file";

export class Injury {
  id: number;
  name: string;
  historyMedicalId: number;
  file: FileInjury[];
}
