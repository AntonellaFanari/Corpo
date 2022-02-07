import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cash } from '../../../../domain/cash';
import { RecordCash } from '../../../../domain/record-cash';
import { CashService } from '../../../../services/cash.service';

@Component({
  selector: 'app-cash-detail',
  templateUrl: './cash-detail.component.html',
  styleUrls: ['./cash-detail.component.css']
})
export class CashDetailComponent implements OnInit {
  cash: Cash;
  id: number;
  inflowsTotal: number;
  outflowsTotal: number;
  recordsCash: RecordCash[] = [];

  constructor(private cashService: CashService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']);

    })
  }

  ngOnInit() {
    this.getCash();
    
  }

  getCash() {
    this.cashService.getCashById(this.id).subscribe(
      result => {
        console.log(result.result);
        this.cash = result.result;
        this.calculateInflowsTotal();
        this.calculateOutflowsTotal();
        this.getCashDetailed(this.cash.opening, this.cash.closing);
      },
      error => console.error(error)
    )
  }

  getCashDetailed(opening, closing) {
    this.cashService.getCashDetailed(opening, closing).subscribe(
      result => {
        console.log(result);
        this.recordsCash = result.result;
      },
      error => console.error(error)
    )
  }

  calculateInflowsTotal() {
    this.inflowsTotal = this.cash.totalFee + this.cash.totalSale + this.cash.totalIncome;
  }

  calculateOutflowsTotal() {
    this.outflowsTotal = this.cash.totalOutflow + this.cash.totalWithdrawal;
  }
}
