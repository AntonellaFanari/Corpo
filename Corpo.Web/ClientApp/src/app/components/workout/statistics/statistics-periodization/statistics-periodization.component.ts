import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberView } from '../../../../domain/member-view';
import { Periodization } from '../../../../domain/wod/periodization';
import { Chart, registerables } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { PeriodizationService } from '../../../../services/wod/periodization.service';
import { MemberService } from '../../../../services/member.service';
import { WodMemberService } from '../../../../wod/wod-member.service';
import { CustomAlertService } from '../../../../services/custom-alert.service';

@Component({
  selector: 'app-statistics-periodization',
  templateUrl: './statistics-periodization.component.html',
  styleUrls: ['./statistics-periodization.component.css']
})
export class StatisticsPeriodizationComponent implements OnInit {
  memberId: number;
  periodization: Periodization;
  periodizations: Periodization[] = [];
  member: MemberView;
  barChart: Chart;
  year: number;
  month: number;
  week: number;
  selectedMonth: number;

  @ViewChild('barCanvas1', { static: false }) barCanvas1;

  constructor(private route: ActivatedRoute,
    private periodizationService: PeriodizationService,
    private memberService: MemberService,
    private wodMemberService: WodMemberService,
    private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => { this.memberId = parseInt(params['id']) });
    console.log(this.memberId);
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth() + 1;
    this.getMember();
    this.getPeriodizations();

  }
  ngOnInit() {
  }
  getMember() {
    this.memberService.getById(this.memberId).subscribe(
      response => this.member = response.result,
      error => console.error(error)
    )
  }

  selectYear() {
    this.getPeriodizations();
  }

  getPeriodizations() {
    this.periodizationService.getByYear(this.year, this.memberId).subscribe(
      response => {
        console.log("periodizaciones: ", response.result);
        this.periodizations = response.result;
        if (response.result.length > 0 && !this.selectedMonth) {
          let periodization = this.periodizations[this.periodizations.length - 1];
          this.month = periodization.month;
          this.getWeek(periodization.id);
        } else {
          this.customAlertService.displayAlert("Gestión de Estadisticas", ["No hay periodizaciones registradas para el año " + this.year]);
          this.periodization = undefined;
        }
      },
      error => console.error(error))
  }

  getWeek(id) {
    console.log("periodizacion id: ", id);
    this.periodization = this.periodizations.find(x => x.id == id);
    this.week = 1;
  }

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

  //getAttended() {
  //  let id = this.periodizations.find(x => x.month == this.month).id;
  //  this.wodMemberService.getAttended(id, this.memberId).subscribe(
  //    response => {
  //      console.log("asistencias por semana: ", response.result);
  //      let attended = response.result;
  //      this.attendances = [0, 0, 0, 0];
  //      for (var i = 1; i < 5; i++) {
  //        let exist = attended.find(x => x.weekNumber == i);
  //        if (exist) {
  //          this.attendances[i - 1] = attended[i - 1].attendance;
  //        }

  //      }
  //      console.log("attendances: ", this.attendances);
  //      this.barChartMethod(this.barCanvas1, this.attendances, 'esfuerzo percibido');
  //    },
  //    error => console.error)
  //}

  //ngAfterViewInit() {
  //  this.barChartMethod(this.barCanvas1, this.attendances, 'esfuerzo percibido');
  //}

  //barChartMethod(canvas: ElementRef, data, label) {
  //  this.barChart = new Chart(canvas.nativeElement, {
  //    type: 'bar',
  //    data: {
  //      labels: ['Semana1', 'Semana2', 'Semana3', 'Semana4'],
  //      datasets: [{
  //        label: 'Asistencia a entrenamientos',
  //        data: data,
  //        backgroundColor: [
  //          'rgba(255, 99, 132, 0.3)',
  //          'rgba(54, 162, 235, 0.3)',
  //          'rgba(255, 206, 86, 0.3)',
  //          'rgba(75, 192, 192, 0.3)',
  //          'rgba(115, 132, 154, 0.3)',
  //          'rgba(255, 159, 64, 0.3)'
  //        ],
  //        borderColor: [
  //          'rgba(255,99,132,1)',
  //          'rgba(54, 162, 235, 1)',
  //          'rgba(255, 206, 86, 1)',
  //          'rgba(75, 192, 192, 1)',
  //          'rgba(115, 132, 154, 1)',
  //          'rgba(255, 159, 64, 1)'
  //        ],
  //        borderWidth: 1
  //      }]
  //    },
  //    options: {
  //      scales: {
  //        yAxes: [{
  //          ticks: {
  //            beginAtZero: true,
  //            precision: 0
  //          }
  //        }]
  //      }
  //    }
  //  });
  //}

}
