import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MembersActivesPlan } from '../../../../domain/members-actives-plan';
import { Plan } from '../../../../domain/plan';
import { PlanService } from '../../../../services/plan.service';
import { ReportService } from '../../../../services/report.service';

@Component({
  selector: 'app-segmented-statistics',
  templateUrl: './segmented-statistics.component.html',
  styleUrls: ['./segmented-statistics.component.css']
})
export class SegmentedStatisticsComponent implements OnInit {
  canvas: any;
  ctx: any;
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  values = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  membersActivesPlan: MembersActivesPlan[] = [];
  plans: Plan[] = [];
  planName: string;
  activeMembersChart: Chart;

  constructor(private reportService: ReportService, private planService: PlanService) { }

  ngOnInit() {
    this.getAllPlans();

  }

  getAllPlans() {
    this.planService.getAll().subscribe(
      response => {
        console.log(response);
        this.plans = response;
        this.resetValues();
        this.getActivesMembersByPlan(this.plans[0].name);

      },
      error => console.error(error)
    )
  }

  getActivesMembersByPlan(planName) {
    this.planName = planName;
    this.reportService.getActiveMemberByPlan(planName).subscribe(
      response => {
        console.log(response);
        this.membersActivesPlan = response.result;
        console.log(this.membersActivesPlan)
        for (var i = 0; i < this.membersActivesPlan.length; i++) {
          let month = parseInt(this.membersActivesPlan[i].month);
          this.values[month - 1] = this.membersActivesPlan[i].actives;
        };
        this.render(this.months, this.values, this.planName)
      },
      error => console.error(error)
    )
  }

  resetValues() {
    for (var i = 0; i < this.values.length; i++) {
      this.values[i] = 0;
    }
  }

  selectPlan(planName) {
    console.log("inicio", this.values);
    this.resetValues();
    this.planName = planName;
    this.getActivesMembersByPlan(planName);
    console.log("fin", this.values);
  }

  render(labels, values, title) {
    console.log("values:", values)
    var colors = this.getColors(labels);
    const data = {
      labels: labels,
      datasets: [{
        label: title,
        data: values,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 2
      }]
    };
    const config = {
      type: 'bar',
      data: data,
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
      //plugins: [ChartDataLabels]
    };
    console.log("grafico");
    this.canvas = document.getElementById('segmented-statistics');
    this.ctx = this.canvas.getContext('2d');
    if (this.activeMembersChart)
      this.activeMembersChart.destroy();
    this.activeMembersChart = new Chart(this.ctx, config);
    console.log("grafico");
  }

  getColors(colors: Array<string>) {
    return colors.map(x => this.addAlpha('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), 0.5));
  }

  addAlpha(color, opacity) {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
}
