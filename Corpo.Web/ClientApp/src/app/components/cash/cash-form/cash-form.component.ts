import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { CancelSale } from '../../../domain/cancel-sale';
import { DetailsSale } from '../../../domain/details-sale';
import { Fee } from '../../../domain/fee';
import { Outflow } from '../../../domain/outflow';
import { Product } from '../../../domain/product';
import { Sale } from '../../../domain/sale';
import { UserView } from '../../../domain/user-view';
import { Withdrawal } from '../../../domain/withdrawal';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { FeeService } from '../../../services/fee.service';
import { OutflowService } from '../../../services/outflow.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';
import { WithdrawalService } from '../../../services/withdrawal.service';
import { FeeDetailComponent } from '../../fee/fee-detail/fee-detail.component';
import { OutflowDetailComponent } from '../../outflow/outflow-detail/outflow-detail.component';
import { SaleEditComponent } from '../../sale/sale-edit/sale-edit.component';
import { UserFormComponent } from '../../user/user-form/user-form.component';
import { WithdrawalDetailComponent } from '../../withdrawal/withdrawal-detail/withdrawal-detail.component';

@Component({
  selector: 'app-cash-form',
  templateUrl: './cash-form.component.html',
  styleUrls: ['./cash-form.component.css']
})
export class CashFormComponent implements OnInit {
  sales: Sale[] = [];
  saleTotalPay = 0;
  outflows: Outflow[] = [];
  outflowTotalPay = 0;
  fees: Fee[] = [];
  feeTotalPay = 0;
  withdrawals: Withdrawal[] = [];
  withdrawalTotalPay = 0;
  date = new Date();
 
  @ViewChild(SaleEditComponent, { static: true }) saleDetailComponent: SaleEditComponent;
  @ViewChild(OutflowDetailComponent, { static: true }) outflowDetailComponent: OutflowDetailComponent;
  @ViewChild(FeeDetailComponent, { static: true }) feeDetailComponent: FeeDetailComponent;
  @ViewChild(WithdrawalDetailComponent, { static: true }) withdrawalDetailComponent: WithdrawalDetailComponent;

  constructor(private saleService: SaleService, private outflowService: OutflowService, private feeService: FeeService, private withdrawalService: WithdrawalService) { }

  ngOnInit() {
    this.getAllSale();
    this.getAllOutflow();
    this.getAllFee();
    this.getAllWithdrawal();
  }

  getAllSale() {
    this.saleService.getAll().subscribe(
      result => {
        console.log(result);
        for (var i = 0; i < result.length; i++) {
          var sale = result[i];
          if (sale.status == 2) {
            sale.total = (-1) * sale.total;
          }
        }
        this.sales = result;
        this.calculateTotalSales();
      },
      error => console.error(error)
    );
  }

  getAllOutflow() {
    this.outflowService.getAllOutflow().subscribe(
      result => {
        console.log(result);
        this.outflows = result;
        this.calculateTotalOutflow();
      },
      error => console.error(error)
    )
  }

  getAllFee() {
    this.feeService.getAll().subscribe(
      result => {
        console.log(result);
        this.fees = result;
        this.calculateTotalFee();
      },
      error => console.error(error)
    )
  }

  getAllWithdrawal() {
    this.withdrawalService.getAllWithdrawal().subscribe(
      result => {
        console.log(result);
        this.withdrawals = result;
        this.calculateTotalWithdrawal();
      },
      error => console.error(error)
    )
  }

  calculateTotalSales() {
    if (this.sales.length > 0) {
      for (var i = 0; i < this.sales.length; i++) {
        if (this.sales[i].status == 1) {
          this.saleTotalPay = this.saleTotalPay + this.sales[i].pay;
        }
      }
    } else {
      this.saleTotalPay = 0
    }
   
  }

  calculateTotalOutflow() {
    if (this.outflows.length > 0) {
      for (var i = 0; i < this.outflows.length; i++) {
        this.outflowTotalPay = this.outflowTotalPay + this.outflows[i].pay;
      }
    } else {
      this.outflowTotalPay = 0;
    }
    
  }

  calculateTotalFee() {
    if (this.fees.length > 0) {
      for (var i = 0; i < this.fees.length; i++) {
        this.feeTotalPay = this.feeTotalPay + this.fees[i].pay;
      }
    } else {
      this.feeTotalPay = 0
    }
   
  }

  calculateTotalWithdrawal() {
    if (this.withdrawals.length > 0) {
      for (var i = 0; i < this.withdrawals.length; i++) {
        this.withdrawalTotalPay = this.withdrawalTotalPay + this.withdrawals[i].pay;
      }
    } else {
      this.withdrawalTotalPay = 0;
    }

  }

  getDetailsSale(sale) {
    this.saleDetailComponent.modalClick();
    this.saleDetailComponent.getDetailsSale(sale);
  }

  getDetailOutflow(outflow) {
    this.outflowDetailComponent.modalClick();
    this.outflowDetailComponent.getOutflow(outflow.id);
  }

  getDetailFee(fee) {
    this.feeDetailComponent.modalClick();
    this.feeDetailComponent.getFee(fee.id);
  }

  getDetailWithdrawal(withdrawal) {
    this.withdrawalDetailComponent.modalClick();
    this.withdrawalDetailComponent.getWithdrawal(withdrawal.id);
  }
}
