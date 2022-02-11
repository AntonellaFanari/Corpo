import { Week } from "src/app/components/workout/workout-periodization/workout-periodization.component";

export class Periodization {
    memberId: number;
    month: number;
    year: number;
    periodizationWeeks: PeriodizationWeek[] = [];
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


    constructor(week: Week) {
        this.weekNumber = week.weekNumber;
        this.m = week.m;
        this.s = week.s;
        this.monday = week.monday;
        this.tuesday = week.tuesday;
        this.wednesday = week.wednesday;
        this.thursday = week.thursday;
        this.friday = week.friday;
        this.saturday = week.saturday;
        this.sunday = week.sunday;
    }
}