import { Component, OnInit } from '@angular/core';
import { MemberReport } from 'src/app/domain/member-report';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrls: ['./member-report.component.css']
})
export class MemberReportComponent implements OnInit {
  reports: MemberReport;
  requesting = false;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getReports();
  }

  getReports() {
    this.requesting = true;
    this.reportService.getReports().subscribe(
      result => {
        console.log(result);
        this.reports = result.result;
        this.requesting = false;
      },
      error => this.requesting = false

    )
  }
}
