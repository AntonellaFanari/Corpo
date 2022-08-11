import { Component, OnInit } from '@angular/core';
import { BalanceToPay } from '../../../domain/balance-to-pay';
import { BalanceToPayView } from '../../../domain/balance-to-pay-view';
import { PayCancelBalance } from '../../../domain/pay-cancel-balance';
import { BalanceService } from '../../../services/balance.service';
import { CustomAlertService } from '../../../services/custom-alert.service';

@Component({
  selector: 'app-debt-list',
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit {
  balancesToPay: BalanceToPayView[] = [];
  filterName = "";
  totalPayment = "true";
  partialPay = 0;
  totalBalance = 0;
  memberId: number;
  positiveBalance = 0;
  balancesMember: BalanceToPay[] = [];
  requestingList: boolean;
  checkedAll = true;
  hidePartialPay = true;

  constructor(private balanceService: BalanceService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.balanceService.getAll().subscribe(
      result => {
        this.requestingList = false;
        this.balancesToPay = result;
        console.log("balances de socios: ", this.balancesToPay);
      },
      error => this.requestingList = false
    );
  }

  selectBalance(balance) {
    this.partialPay = 0;
    this.totalBalance = balance.balance - balance.pay;
    this.memberId = balance.idMember;
  }

  checked(value) {
    console.log("value: ", value);
    console.log("totalPayment: ", this.totalPayment)
  }

  submit() {
    //let pay = 0;
    //if (this.totalPayment == "true") {
    //  pay = this.totalBalance;
    //} else {
    //  pay = this.partialPay;
    //};
    let pay = this.totalBalance;
    this.balanceService.cancelBalance(this.memberId, pay).subscribe(
      result => {
        this.getAll();
        this.totalPayment = "true";
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Deudas", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Deudas", ["No se pudo modificar el saldo."]);
        }
      }
    )
  }

}
