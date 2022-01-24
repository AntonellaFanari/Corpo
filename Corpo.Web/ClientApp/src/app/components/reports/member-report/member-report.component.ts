import { Component, OnInit } from '@angular/core';
import { MemberReport } from 'src/app/domain/member-report';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrls: ['./member-report.component.css']
})
export class MemberReportComponent implements OnInit {

  report: MemberReport;

  constructor() { }

  ngOnInit() {
    this.report = {
      inactiveMembers: 12,
      active: 23,
      closeToInactive: 6,
      news: 5,
      fistMonthInactive: 20,
      secondMonthInactive: 30,
      thirdMonthInactive: 40,
      reEntrants: 5,
      birthday: 51,
    };

  }
}
