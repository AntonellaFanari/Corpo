import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberView } from '../../../../domain/member-view';
import { Periodization } from '../../../../domain/wod/periodization';
import { Chart, registerables } from 'chart.js';
import { PeriodizationService } from '../../../../services/wod/periodization.service';
import { MemberService } from '../../../../services/member.service';
import { WodMemberService } from '../../../../wod/wod-member.service';
import { CustomAlertService } from '../../../../services/custom-alert.service';

@Component({
  selector: 'app-statistics-wod-member',
  templateUrl: './statistics-wod-member.component.html',
  styleUrls: ['./statistics-wod-member.component.css']
})
export class StatisticsWodMemberComponent implements OnInit {
  memberId: number;
  periodizations: Periodization[] = [];
  member: MemberView;
  barChart: Chart;
  attendances = [0, 0, 0, 0];
  year: number;
  month: number;

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
        if (response.result.length > 0) {

          this.getAttended();
        } else {
          this.customAlertService.displayAlert("Gestión de Estadisticas", ["No hay periodizaciones registradas para el año "+ this.year]);
        }
      },
      error => console.error(error)   )
  }

 


  getAttended() {
    let id = this.periodizations.find(x => x.month == this.month).id;
    this.wodMemberService.getAttended(id, this.memberId).subscribe(
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

  ngAfterViewInit() {
    this.barChartMethod(this.barCanvas1, this.attendances, 'esfuerzo percibido');
  }

  barChartMethod(canvas: ElementRef, data, label) {
    this.barChart = new Chart(canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Semana1', 'Semana2', 'Semana3', 'Semana4'],
        datasets: [{
          label: 'Asistencia a entrenamientos',
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
