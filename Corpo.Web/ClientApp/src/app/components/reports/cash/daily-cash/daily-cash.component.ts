import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cash } from '../../../../domain/cash';
import { CashService } from '../../../../services/cash.service';

@Component({
  selector: 'app-daily-cash',
  templateUrl: './daily-cash.component.html',
  styleUrls: ['./daily-cash.component.css']
})
export class DailyCashComponent implements OnInit {
  cashs: Cash[] = [];
  from: string;
  to: string;

  constructor(private cashService: CashService, private dp: DatePipe) {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.from);
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 30), 'yyyy-MM-dd');
    console.log(this.to);
  }

  ngOnInit() {
    this.getAllCashCurrentMonth();
  }

  getAllCashCurrentMonth() {
    this.cashService.getCashCurrentMonth().subscribe(
      result => {
        console.log(result);
        this.cashs = result.result;
        for (var i = 0; i < this.cashs.length; i++) {
          this.cashs[i].opening = this.cashs[i].opening.substr(5, 2) +" de "  + this.getMonth(this.cashs[i].opening);
        }
      },
      error => console.error(error)
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
    this.cashService.getCash(this.from, this.to).subscribe(
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
