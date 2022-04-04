import { Week } from "src/app/components/workout/workout-periodization/workout-periodization.component";

export class Periodization {
  id: number;
  memberId: number;
  month: number;
  year: number;
  periodizationWeeks: PeriodizationWeek[] = [];
  goal?: string;
  trainings: number;
  valid: string;
  volume: string;
  intensity: string
}

export class PeriodizationWeek {
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
  goal: string;
  planned: string;
  wodTemplateId: number;
  volume: string;
  intensity: string


  constructor(week: Week) {
    this.goal = week.goal;
    this.weekNumber = week.weekNumber;
    this.m = (week.m) ? week.m.toString().replace("%", "") : "0";
    this.s = (week.s) ? week.s.toString().replace("%", "") : "0";
    this.monday = week.monday;
    this.tuesday = week.tuesday;
    this.wednesday = week.wednesday;
    this.thursday = week.thursday;
    this.friday = week.friday;
    this.saturday = week.saturday;
    this.sunday = week.sunday;
    this.planned = week.planned;
    this.volume = week.volume;
    this.intensity = week.intensity
  }
}



