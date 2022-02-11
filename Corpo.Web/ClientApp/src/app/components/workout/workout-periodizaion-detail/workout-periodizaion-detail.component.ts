import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Periodization } from 'src/app/domain/wod/periodization';
import { PeriodizationService } from 'src/app/services/wod/periodization.service';

@Component({
  selector: 'app-workout-periodizaion-detail',
  templateUrl: './workout-periodizaion-detail.component.html',
  styleUrls: ['./workout-periodizaion-detail.component.css']
})
export class WorkoutPeriodizaionDetailComponent implements OnInit {

  
  periodization: Periodization;
  @Input() memberId: number;

  constructor(private periodizationService: PeriodizationService, private route: ActivatedRoute) {
  //  this.route.queryParams.subscribe(params => { this.memberId = parseInt(params['memberId']) });
  }

  ngOnInit() {
    this.periodizationService.getById(this.memberId).subscribe(data => {
      console.log(data.result)
      this.periodization = data.result;
    })
  }

}
