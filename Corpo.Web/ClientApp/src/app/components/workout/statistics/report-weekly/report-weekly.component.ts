import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { MemberView } from '../../../../domain/member-view';
import { WodMember } from '../../../../domain/wod-member';
import { PeriodizationWeek } from '../../../../domain/wod/periodization';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { MemberService } from '../../../../services/member.service';
import { PeriodizationService } from '../../../../services/wod/periodization.service';
import { WodMemberService } from '../../../../wod/wod-member.service';

@Component({
  selector: 'app-report-weekly',
  templateUrl: './report-weekly.component.html',
  styleUrls: ['./report-weekly.component.css']
})
export class ReportWeeklyComponent implements OnInit {
  id: number;
  periodizationWeek: PeriodizationWeek;
  member: MemberView;
  barChart: Chart;
  wods: WodMember[] = [];
  memberId: number;
  labels = [];
  dataRate = [];
  dataIntensity = [];
  requesting: boolean;
  @ViewChild('barCanvas1', { static: false }) barCanvas1;

  constructor(private route: ActivatedRoute,
    private periodizationService: PeriodizationService,
    private memberService: MemberService,
    private wodMemberService: WodMemberService,
    private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']),
      this.memberId = parseInt(params['memberId'])
    });
  
    this.getPeriodizationWeek() 

  }
  ngOnInit() {
    this.getPeriodizationWeek() 
  }

  getPeriodizationWeek() {
    this.requesting = true;
    this.periodizationService.getByPeriodizationWeek(this.id).subscribe(
      response => {
        this.requesting = false;
        console.log("periodizationWeek: ", response.result);
        this.periodizationWeek = response.result;
        this.getMember();
        this.getWods();

      },
      error => {
        this.requesting = false;
        console.error(error);
      }
    )
  }

  getMember() {
    this.memberService.getById(this.memberId).subscribe(
      response => {
        this.member = response.result;
      },
      error => {
        console.error(error);
      }
    )
  }

  getWods() {
    this.wodMemberService.getByPeriodizationId(this.periodizationWeek.periodizationId, parseInt(this.periodizationWeek.weekNumber))
      .subscribe(
        response => {
          console.log("wods: ", response.result);
          this.wods = response.result;
          this.wods.forEach(x => {
            this.labels.push("Wod Nº "+ x.wodNumber);
            this.dataRate.push(x.rate);
            if (x.intensityType == 2) {
              this.dataIntensity.push(x.intensity * 10 / 100);
            } else {
              this.dataIntensity.push(x.intensity);
            }
            
          });

          this.barChartMethod(this.barCanvas1, this.dataRate, 'esfuerzo percibido');
        },
        error => console.error(error)
      )
  }

  barChartMethod(canvas: ElementRef, data, label) {
    this.barChart = new Chart(canvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Esfuerzo percibido',
          data: this.dataRate,
          backgroundColor: [
            'rgba(255, 99, 132, 0.3)'
          ],
          borderColor: [
            'rgba(255,99,132,1)'
          ],
          borderWidth: 1
        }, {
          label: 'Esfuerzo planificado',
          data: this.dataIntensity,
          backgroundColor: [
            'rgba(111, 208, 71, 0.4)'
          ],
          borderColor: [
            'rgba(111, 208, 71, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true,
              precision: 0
            }
          }]
        }
      }
    });
  }

}
