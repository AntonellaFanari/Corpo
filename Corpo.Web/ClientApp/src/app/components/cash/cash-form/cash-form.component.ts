import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { CancelSale } from '../../../domain/cancel-sale';
import { Cash } from '../../../domain/cash';
import { DetailsSale } from '../../../domain/details-sale';
import { Fee } from '../../../domain/fee';
import { Income } from '../../../domain/income';
import { Outflow } from '../../../domain/outflow';
import { Product } from '../../../domain/product';
import { Sale } from '../../../domain/sale';
import { IncomeType, SaleFeeIncome } from '../../../domain/sale-fee-income';
import { UserView } from '../../../domain/user-view';
import { Withdrawal } from '../../../domain/withdrawal';
import { AccountService } from '../../../services/account.service';
import { BalancePaidService } from '../../../services/balance-paid.service';
import { CashService } from '../../../services/cash.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { FeeService } from '../../../services/fee.service';
import { IncomeService } from '../../../services/income.service';
import { OutflowService } from '../../../services/outflow.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';
import { WithdrawalService } from '../../../services/withdrawal.service';
import { PaymentDetailsComponent } from '../../debt/payment-details/payment-details.component';
import { FeeDetailComponent } from '../../fee/fee-detail/fee-detail.component';
import { IncomeDetailComponent } from '../../income/income-detail/income-detail.component';
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
  salesIncomes: SaleFeeIncome[] = [];
  saleTotalPay = 0;
  outflows: Outflow[] = [];
  outflowTotalPay = 0;
  feesIncomes: SaleFeeIncome[] = [];
  incomes: Income[] = [];
  feeTotalPay = 0;
  withdrawals: Withdrawal[] = [];
  withdrawalTotal = 0;
  incomeTotal = 0;
  date = new Date();
  currentCash = 0;
  startingBalance = 0;
  id: number;
  cash: Cash;
  openingView = true;
  monthlyCash = 0;
  requestingCash: boolean;
  requestingOpeningCash: boolean;

  @ViewChild(SaleEditComponent, { static: true }) saleDetailComponent: SaleEditComponent;
  @ViewChild(OutflowDetailComponent, { static: true }) outflowDetailComponent: OutflowDetailComponent;
  @ViewChild(FeeDetailComponent, { static: true }) feeDetailComponent: FeeDetailComponent;
  @ViewChild(WithdrawalDetailComponent, { static: true }) withdrawalDetailComponent: WithdrawalDetailComponent;
  @ViewChild(IncomeDetailComponent, { static: true }) incomeDetailComponent: IncomeDetailComponent;
  @ViewChild(PaymentDetailsComponent, { static: true }) payDetail: PaymentDetailsComponent;
  constructor(private saleService: SaleService,
    private outflowService: OutflowService,
    private feeService: FeeService,
    private withdrawalService: WithdrawalService,
    private incomeService: IncomeService,
    private cashService: CashService,
    private customAlertService: CustomAlertService,
    private balancePaidService: BalancePaidService) { }

  ngOnInit() {
    this.getLastCash();

  }

  getTotals() {
    this.requestingCash = false;
    this.getAllSale();
    this.getAllOutflow();
    this.getAllFee();
    this.getAllWithdrawal();
    this.getAllIncome();

  }

  getMonthlyCash() {
    this.monthlyCash = 0;
    this.cashService.getMonthlyCash().subscribe(
      result => {
        if (result.result !== null) {
          this.monthlyCash = result.result.total;
        };
      },
      error => console.error(error)
    );
  }

  getLastCash() {
    this.requestingCash = true;
    this.cashService.getLastCash().subscribe(
      result => {

        this.getMonthlyCash();
        if (result.result !== null) {
          this.cash = result.result;
          this.id = this.cash.id;
          if (this.cash.closing == null) {
            this.openingView = false;
            this.startingBalance = this.cash.startingBalance;
            this.getTotals();
            this.calculateCurrentCash();
          } else {
            this.requestingCash = false;
            this.openingView = true;
          }
        } else {
          this.openingView = true;
        }
      },
      error => {
        this.requestingCash = false;
        this.openingView == true;
      }
    )
  }

  getAllSalesFees() {
    this.getAllSale();
    this.getAllFee();
  }

  getCash() {
    this.cashService.getCashById(this.id).subscribe(
      result => {
        this.startingBalance = result.startingBalance;
      },
      error => console.error(error)
    )
  }

  getAllSale() {
    this.saleService.getAll(this.id).subscribe(
      result => {
        console.log("ingresos por ventas: ", result.result);
        this.salesIncomes = result.result;
        this.calculateTotalSales();
        this.calculateCurrentCash();
      },
      error => console.error(error)
    );
  }


  getAllOutflow() {
    this.outflowService.getAllOutflow(this.id).subscribe(
      result => {
        this.outflows = result;
        this.calculateTotalOutflow();
        this.calculateCurrentCash();
      },
      error => console.error(error)
    )
  }

  getAllFee() {
    this.feeService.getAll(this.id).subscribe(
      result => {
        console.log("ingresos por cuotas: ", result.result);
        this.feesIncomes = result.result;
        this.calculateTotalFee();
        this.calculateCurrentCash();
      },
      error => console.error(error)
    )
  }

  getAllWithdrawal() {
    this.withdrawalService.getAllWithdrawal(this.id).subscribe(
      result => {
        this.withdrawals = result;
        this.calculateTotalWithdrawal();
        this.calculateCurrentCash();
        this.getMonthlyCash();
      },
      error => console.error(error)
    )
  }

  getAllIncome() {
    this.incomeService.getAll(this.id).subscribe(
      result => {
        this.incomes = result;
        this.calculateTotalIncome();
        this.calculateCurrentCash();
        this.getMonthlyCash();
      },
      error => console.error(error)
    )
  }

  calculateCurrentCash() {
    this.currentCash = (this.cash.startingBalance + this.feeTotalPay + this.saleTotalPay + this.incomeTotal)
      - (this.outflowTotalPay + this.withdrawalTotal);
  }

  calculateTotalSales() {
    this.saleTotalPay = 0;
    if (this.salesIncomes.length > 0) {
      for (var i = 0; i < this.salesIncomes.length; i++) {
        if (this.salesIncomes[i].pay > 0) {
          this.saleTotalPay = this.saleTotalPay + this.salesIncomes[i].pay;
        }
      }
    }
  }

  calculateTotalOutflow() {
    this.outflowTotalPay = 0;
    if (this.outflows.length > 0) {
      for (var i = 0; i < this.outflows.length; i++) {
        this.outflowTotalPay = this.outflowTotalPay + this.outflows[i].pay;
      }
    }

  }

  calculateTotalFee() {
    this.feeTotalPay = 0
    if (this.feesIncomes.length > 0) {
      for (var i = 0; i < this.feesIncomes.length; i++) {
        if (this.feesIncomes[i].status != '2') {

          this.feeTotalPay = this.feeTotalPay + this.feesIncomes[i].pay;
        }
      }
    }
  }

  calculateTotalWithdrawal() {
    this.withdrawalTotal = 0;
    if (this.withdrawals.length > 0) {
      for (var i = 0; i < this.withdrawals.length; i++) {
        this.withdrawalTotal = this.withdrawalTotal + this.withdrawals[i].amount;
      }
    }
  }

  calculateTotalIncome() {
    this.incomeTotal = 0;
    if (this.incomes.length > 0) {
      for (var i = 0; i < this.incomes.length; i++) {
        this.incomeTotal = this.incomeTotal + this.incomes[i].amount;
      }
    }
  }

  getDetailsSaleIncome(sale) {
    if (sale.incomeType == IncomeType.sale) {
      this.saleDetailComponent.modalClick(sale.id);
      /*this.saleDetailComponent.getSaleById(sale.id);*/
    } else {
      this.payDetail.modalClick(sale.id, "cash");
    }
   
  }

  getDetailOutflow(outflow) {
    this.outflowDetailComponent.modalClick();
    this.outflowDetailComponent.getOutflow(outflow.id);
  }

  getDetailsFeeIncome(fee) {
    if (fee.incomeType == IncomeType.fee) {
      this.feeDetailComponent.modalClick(fee.id);
      /*this.saleDetailComponent.getSaleById(sale.id);*/
    } else {
      this.payDetail.modalClick(fee.id, "cash");
    }
  }

  getDetailWithdrawal(withdrawal) {
    this.withdrawalDetailComponent.modalClick();
    this.withdrawalDetailComponent.getWithdrawal(withdrawal.id);
  }

  getDetailIncome(income) {
    this.incomeDetailComponent.modalClick();
    this.incomeDetailComponent.getIncome(income.id);
  }


  toClose() {
    var cash = new Cash();
    cash.startingBalance = this.cash.startingBalance;
    cash.totalFee = this.feeTotalPay;
    cash.totalSale = this.saleTotalPay;
    cash.totalOutflow = this.outflowTotalPay;
    cash.totalWithdrawal = this.withdrawalTotal;
    cash.totalIncome = this.incomeTotal;
    this.cashService.toClose(this.cash.id, cash).subscribe(
      result => {
        this.openingView = true;
        this.getLastCash();
        this.getMonthlyCash();
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Caja", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Caja", ["Hubo un problema al intentar cerrar la caja."]);
        }
      })
  }

  openingCash() {
    this.cashService.toOpen().subscribe(
      result => {
        this.id = result.id;
        this.getCash();
        this.openingView = false;
        this.getLastCash();
        this.getMonthlyCash();
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Caja", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Caja", ["Hubo un problema al intentar abrir la caja."]);
        }
      }
    )
  }



}
