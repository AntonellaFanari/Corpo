import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MemberView } from '../../../../domain/member-view';
import { Periodization } from '../../../../domain/wod/periodization';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { PeriodizationService } from '../../../../services/wod/periodization.service';
import { MemberService } from '../../../../services/member.service';
import { WodMemberService } from '../../../../wod/wod-member.service';
import { CustomAlertService } from '../../../../services/custom-alert.service';

@Component({
  selector: 'app-report-monthly',
  templateUrl: './report-monthly.component.html',
  styleUrls: ['./report-monthly.component.css']
})
export class ReportMonthlyComponent implements OnInit {
  periodizationId: number;
  memberId: number;
  periodization: Periodization;
  member: MemberView;
  barChart: Chart;
  year: number;
  month: number;
  week: number;
  selectedMonth: number;
  attendances = [];
  months = [];
  @ViewChild('barCanvas1', { static: false }) barCanvas1;

  constructor(private route: ActivatedRoute,
    private periodizationService: PeriodizationService,
    private memberService: MemberService,
    private wodMemberService: WodMemberService,
    private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => { this.periodizationId = parseInt(params['id']) });
  

  }
  ngOnInit() {
    this.getPeriodization();
  }
  getMember() {
    this.memberService.getById(this.periodization.memberId).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response.result
      },
      error => console.error(error)
    )
  }

  getPeriodization() {
    this.periodizationService.getById(this.periodizationId).subscribe(
      response => {
        console.log("periodizacion: ", response.result);
        this.periodization = response.result;
   /*     this.resetClassWeek(this.periodization);*/
        this.getMember();
        this.getAttendances();
      },
      error => console.error(error))
  }

  //resetClassWeek(periodization) {
  //let week = document.getElementsByClassName("week");
  //  periodization.periodizationWeeks.forEach(x => {
  //    if (!x.planned) {
  //      week[parseInt(x.weekNumber) - 1].classList.remove("week-planned");
  //      week[parseInt(x.weekNumber) - 1].classList.add("week-not-planned");
  //    }
  //  })
  //}

  getMonth(month) {
    switch (month) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4: 
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
      default:
    }
  }


  getAttendances() {
    this.wodMemberService.getAttended(this.periodizationId, this.periodization.memberId).subscribe(
      response => {
        console.log("asistencias por semana: ", response.result);
        let attended = response.result;
        this.attendances = [0, 0, 0, 0];
        for (var i = 1; i < 5; i++) {
          let exist = attended.find(x => x.weekNumber == i);
          if (exist) {
            this.attendances[i - 1] = attended[i - 1].attendance;
          }

        }
        console.log("attendances: ", this.attendances);
        this.barChartMethod(this.barCanvas1, this.attendances, 'esfuerzo percibido');
      },
      error => console.error)
  }

  //ngAfterViewInit() {
  //  this.barChartMethod(this.barCanvas1, this.attendances, 'esfuerzo percibido');
  //}

  barChartMethod(canvas: ElementRef, data, label) {
    this.barChart = new Chart(canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Semana1', 'Semana2', 'Semana3', 'Semana4'],
        datasets: [{
          label: 'Asistencia a entrenamientos ' + this.getMonth(this.periodization.month),
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(255, 206, 86, 0.3)',
            'rgba(75, 192, 192, 0.3)',
            'rgba(115, 132, 154, 0.3)',
            'rgba(255, 159, 64, 0.3)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(115, 132, 154, 1)',
            'rgba(255, 159, 64, 1)'
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
          }]
        }
      }
    });
  }


}
