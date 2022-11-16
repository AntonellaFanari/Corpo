import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cash } from '../../../../domain/cash';
import { CashService } from '../../../../services/cash.service';
import { ReportService } from '../../../../services/report.service';

@Component({
  selector: 'app-daily-cash',
  templateUrl: './daily-cash.component.html',
  styleUrls: ['./daily-cash.component.css']
})
export class DailyCashComponent implements OnInit {
  cashs: Cash[] = [];
  from: string;
  to: string;
  totalStartingBalance = 0;
  totalFees = 0;
  totalSales = 0;
  totalIncomes = 0;
  totalOutflows = 0;
  totalWithdrawals = 0;
  totalEndingBalance = 0;
  requestingList: boolean;
  filter: boolean;

  constructor(private cashService: CashService,
    private dp: DatePipe,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => this.filter = params['filter'] as boolean);
    console.log("filter: ", this.filter);
  }

  ngOnInit() {
    this.getFromGetTo();

  }

  getFromGetTo() {
    this.requestingList = true;
    if (this.filter) {
      this.from = localStorage.getItem('from');
      this.to = localStorage.getItem('to');
      console.log(this.from);
      console.log(this.to);
      this.getCashFromTo();
    } else {
      this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
      console.log(this.from);
      let to = new Date();
      this.to = this.dp.transform(to.setDate(to.getDate() + 30), 'yyyy-MM-dd');
      console.log(this.to);
      this.getAllCashCurrentMonth();
    }

  }

  getAllCashCurrentMonth() {
    this.reportService.getCashCurrentMonth().subscribe(
      result => {
        console.log("cajas del mes actual: ", result);
   
        this.cashs = result.result;
        this.getTotalCash(this.cashs);
        this.requestingList = false;
      },
      error => this.requestingList = false
    )
  }


  getTotalCash(cashs) {
    this.clearTotal();
    for (var i = 0; i < cashs.length; i++) {
      cashs[i].opening = cashs[i].opening.substr(8, 2) + " de " + this.getMonth(cashs[i].opening);
      this.totalStartingBalance = this.totalStartingBalance + cashs[i].startingBalance;
      this.totalFees = this.totalFees + cashs[i].totalFee;
      this.totalSales = this.totalSales + cashs[i].totalSale;
      this.totalIncomes = this.totalIncomes + cashs[i].totalIncome;
      this.totalOutflows = this.totalOutflows + cashs[i].totalOutflow;
      this.totalWithdrawals = this.totalWithdrawals + cashs[i].totalWithdrawal;
      this.totalEndingBalance = this.totalEndingBalance + cashs[i].endingBalance;

    }
  }

  clearTotal() {
    this.totalStartingBalance = 0;
    this.totalFees = 0;
    this.totalSales = 0;
    this.totalIncomes = 0;
    this.totalOutflows = 0;
    this.totalWithdrawals = 0;
    this.totalEndingBalance = 0;

  }

  getMonth(date) {
    let monthCash = '';
    const month = new Date(date).getMonth();
    switch (month) {
      case 0: monthCash = "Enero";
        break;
      case 1: monthCash = "Febrero";
        break;
      case 2: monthCash = "Marzo";
        break;
      case 3: monthCash = "Abril";
        break;
      case 4: monthCash = "Mayo";
        break;
      case 5: monthCash = "Junio";
        break;
      case 6: monthCash = "Julio";
        break;
      case 7: monthCash = "Agosto";
        break;
      case 8: monthCash = "Septiembre";
        break;
      case 9: monthCash = "Octubre";
        break;
      case 10: monthCash = "Noviembre";
        break;
      case 11: monthCash = "Diciembre";
        break;
      default:
    }
    return monthCash;
  }

  getDetailedCash(cash) {
    localStorage.setItem('from', this.from);
    localStorage.setItem('to', this.to);
    this.router.navigate(['/caja-detalle'], { queryParams: { id: cash.id } })
  }

  getCashFromTo() {
    this.requestingList = true;
    this.reportService.getCash(this.from, this.to).subscribe(
      result => {
        console.log("caja filtro: ", result.result);
        this.cashs = result.result;
        this.getTotalCash(this.cashs);
        this.requestingList = false;
      },
      error => this.requestingList = false
    )
  }

}
