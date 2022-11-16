import { Component, OnInit } from '@angular/core';
import { RecordCash } from '../../../../domain/record-cash';
import { ReportService } from '../../../../services/report.service';
import { Chart } from 'chart.js';
import { MonthlyCash } from '../../../../domain/monthly-cash';
import * as moment from 'moment';

@Component({
  selector: 'app-monthly-earning',
  templateUrl: './monthly-earning.component.html',
  styleUrls: ['./monthly-earning.component.css']
})
export class MonthlyEarningComponent implements OnInit {
  month: string;
  recordsCash: RecordCash[] = [];
  canvas: any;
  ctx: any;
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  monthlyCashs: MonthlyCash[] = [];
  monthlyEarning = [];
  viewChart = true;
  totalWithdrawals = 0;
  totalIncomes = 0;
  totalOutflows = 0;
  requesting = false;

  constructor(private reportService: ReportService) { }

  ngOnInit() {
    this.getAll();

  }


  render(labels, values) {
    console.log("values:", values)
    var colors = this.getColors(labels);
    const data = {
      labels: labels,
      datasets: [{
        label: 'Ganancias mensuales',
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
              beginAtZero: true
            }
          }]
        }
      }
      //plugins: [ChartDataLabels]
    };
    console.log("grafico");
    this.canvas = document.getElementById('monthly-earning');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, config);
    console.log("grafico");
  }

  getColors(colors: Array<string>) {
    return colors.map(x => this.addAlpha('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'), 0.5));
  }

  getAll() {
    this.reportService.getAllMonthlyCash().subscribe(
      response => {
        var report = response.result;
        this.monthlyCashs = report.map(x => ({ month: moment(x.date).month(), total: x.total, id: x.id }));
        for (var i = 0; i < 12; i++) {
          let existMonthlyCash = this.monthlyCashs.find(x => x.month == i)
          if (existMonthlyCash == null) {
            this.monthlyEarning.push(0);
          } else {
            this.monthlyEarning.push(existMonthlyCash.total)
          }
        };
/*        this.monthlyEarning = this.monthlyCashs.map(x => x.total);*/
        this.render(this.months, this.monthlyEarning);
      },
      error => console.error(error)
    )
  }

  selectMonth(i) {
    this.month = this.months[i];
    this.getRecordCashByMonth(i+1);
    this.viewChart = false;
  }

  getRecordCashByMonth(month) {
    this.requesting = true;
    this.reportService.getRecordsCashByMonth(month).subscribe(
      response => {
        console.log(response);
        this.requesting = false;
        this.recordsCash = response.result;
        this.totalWithdrawals = 0;
        this.totalIncomes = 0;
        this.totalOutflows = 0;
        for (var i = 0; i < this.recordsCash.length; i++) {
          let record = this.recordsCash[i];
          if (record.transaction == "Retiro") {
            this.totalWithdrawals = this.totalWithdrawals + record.amount;
          } if (record.transaction == "Ingreso") {
            this.totalIncomes = this.totalIncomes + record.amount;
          } if (record.transaction == "Egreso") {
            this.totalOutflows = this.totalOutflows + record.amount;
          }
        }
      },
      error => this.requesting = false
    )
  }

  addAlpha(color, opacity) {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  return() {
    this.viewChart = true;
    this.getAll();
  }
}
