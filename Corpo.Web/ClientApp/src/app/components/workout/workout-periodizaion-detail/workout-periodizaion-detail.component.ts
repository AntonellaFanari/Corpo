import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Periodization } from 'src/app/domain/wod/periodization';
import { PeriodizationService } from 'src/app/services/wod/periodization.service';
import { PeriodizationList, PeriodizationWeekList } from '../../../domain/wod/PeriodizationList';

@Component({
  selector: 'app-workout-periodizaion-detail',
  templateUrl: './workout-periodizaion-detail.component.html',
  styleUrls: ['./workout-periodizaion-detail.component.css']
})
export class WorkoutPeriodizaionDetailComponent implements OnInit {


  periodization: PeriodizationList;
  @Input() memberId: number;

  constructor(private periodizationService: PeriodizationService, private route: ActivatedRoute) {
    //  this.route.queryParams.subscribe(params => { this.memberId = parseInt(params['memberId']) });
  }

  ngOnInit() {
    this.periodizationService.getById(this.memberId).subscribe(data => {
      console.log(data.result)
      let periodization = data.result as Periodization;
      if (periodization != null) {
        this.periodization = new PeriodizationList();
        this.periodization.memberId = periodization.memberId;
        this.periodization.month = periodization.month;
        this.periodization.year = periodization.year;
        this.periodization.goal = periodization.goal.split("-");
        this.periodization.periodizationWeeks = [];
        for (var i = 0; i < periodization.periodizationWeeks.length; i++) {
          this.periodization.periodizationWeeks[i] = new PeriodizationWeekList();
          this.periodization.periodizationWeeks[i].m = periodization.periodizationWeeks[i].m;
          this.periodization.periodizationWeeks[i].s = periodization.periodizationWeeks[i].s;
          this.periodization.periodizationWeeks[i].monday = periodization.periodizationWeeks[i].monday;
          this.periodization.periodizationWeeks[i].thursday = periodization.periodizationWeeks[i].thursday;
          this.periodization.periodizationWeeks[i].tuesday = periodization.periodizationWeeks[i].tuesday;
          this.periodization.periodizationWeeks[i].wednesday = periodization.periodizationWeeks[i].wednesday;
          this.periodization.periodizationWeeks[i].friday = periodization.periodizationWeeks[i].friday;
          this.periodization.periodizationWeeks[i].saturday = periodization.periodizationWeeks[i].saturday;
          this.periodization.periodizationWeeks[i].sunday = periodization.periodizationWeeks[i].sunday;
          this.periodization.periodizationWeeks[i].weekNumber = periodization.periodizationWeeks[i].weekNumber;
          this.periodization.periodizationWeeks[i].goals = periodization.periodizationWeeks.find(x => x.weekNumber == (i + 1).toString()).goal.split("-");
      }
      }
    })
  }

}
