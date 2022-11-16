import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberView } from '../../../domain/member-view';
import { ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-member-report-list',
  templateUrl: './member-report-list.component.html',
  styleUrls: ['./member-report-list.component.css']
})
export class MemberReportListComponent implements OnInit {
  reportType: string;
  members: MemberView[] = [];
  filterName = "";
  title = "";
  requesting = false;

  constructor(private route: ActivatedRoute, private reportService: ReportService) {
    this.route.queryParams.subscribe(params => {
      this.reportType = (params['reportType']);
      this.getTitle();
    });
  }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.requesting = true;
    this.reportService.getDetail(this.reportType).subscribe(
      result => {
        console.log(result.result);
        this.members = result.result;      
        this.requesting = false;
      },
      error => this.requesting = false
    )
  }

  getTitle() {
    switch (this.reportType) {
      case 'inactiveMembers':
        this.title = "Usuarios Inactivos";
        break;
      case 'active':
        this.title = "Usuarios Activos";
        break;
      case 'closeToInactive':
        this.title = "Próximos Usuarios Inactivos";
        break;
      case 'news':
        this.title = "Usuarios Nuevos";
        break;
      case 'fistMonthInactive':
        this.title = "Usuarios con un mes de ausencia";
        break;
      case 'secondMonthInactive':
        this.title = "Usuarios con dos meses de ausencia";
        break;
      case 'thirdMonthInactive':
        this.title = "Usuarios con mas de tres meses de ausencia";
        break;
      case 'reEntrants':
        this.title = "Usuarios reingresantes";
        break;
      default:
    }
  }
}
