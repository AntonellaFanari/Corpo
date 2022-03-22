import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

  constructor(private cashService: CashService, private dp: DatePipe, private reportService: ReportService) {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.from);
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 30), 'yyyy-MM-dd');
    console.log(this.to);
  }

  ngOnInit() {
    this.getAllCashCurrentMonth();
    this.requestingList = true;
  }

  getAllCashCurrentMonth() {
    this.reportService.getCashCurrentMonth().subscribe(
      result => {
        console.log(result);
        this.requestingList = false;
        this.cashs = result.result;
        for (var i = 0; i < this.cashs.length; i++) {
          this.cashs[i].opening = this.cashs[i].opening.substr(5, 2) + " de " + this.getMonth(this.cashs[i].opening);
          this.totalStartingBalance = this.totalStartingBalance + this.cashs[i].startingBalance;
          this.totalFees = this.totalFees + this.cashs[i].totalFee;
          this.totalSales = this.totalSales + this.cashs[i].totalSale;
          this.totalIncomes = this.totalIncomes + this.cashs[i].totalIncome;
          this.totalOutflows = this.totalOutflows + this.cashs[i].totalOutflow;
          this.totalWithdrawals = this.totalWithdrawals + this.cashs[i].totalWithdrawal;
          this.totalEndingBalance = this.totalEndingBalance + this.cashs[i].endingBalance;
        
        }
      },
      error => this.requestingList = false
    )
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

  getDetail(cash) {
    console.log(cash)
  }

  getCashFromTo() {
    this.reportService.getCash(this.from, this.to).subscribe(
      result => {
        console.log(result.result);
        this.cashs = result.result;
        this.cashs = result.result;
        for (var i = 0; i < this.cashs.length; i++) {
          this.cashs[i].opening = this.cashs[i].opening.substr(5, 2) + " de " + this.getMonth(this.cashs[i].opening);
        }
      },
      error => console.error(error)
    )
  }

}
