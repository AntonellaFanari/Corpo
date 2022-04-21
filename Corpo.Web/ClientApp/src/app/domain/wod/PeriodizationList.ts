import { IntensityType } from "./periodization";

export class PeriodizationList {
  memberId: number;
  month: number;
  year: number;
  periodizationWeeks: PeriodizationWeekList[] = [];
  goal?: string[];
  trainings: number;
  volume: string;
  trainingSystem: string;
}

export class PeriodizationWeekList {
  weekNumber: string;
  m: string;
  s: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  goals: string[];
  planned: string;
  volume: string;
  intensity: number;
  intensityType: IntensityType;
  trainingSystem: string;
  periodizationId: number
}
