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
  totalPayment = true;
  partialPay = 0;
  totalBalance = 0;
  memberId: number;
  positiveBalance = 0;
  balancesMember: BalanceToPay[] = [];

  constructor(private balanceService: BalanceService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.balanceService.getAll().subscribe(
      result => {
        this.balancesToPay = result;
      },
      error => console.error(error)
    );
  }

  getAllBalancesByIdMember(id) {
    this.balanceService.getAllByIdMember(id).subscribe(
      result => {
        this.balancesMember = result;
        for (var i = 0; i < this.balancesMember.length; i++) {
          if (this.balancesMember[i].balance < 0) {
            this.positiveBalance += (this.balancesMember[i].balance * -1);
          }
        }
        },
        error => console.error(error)
    )
  }

  selectBalance(balance) {
    this.totalBalance = balance.balance;
    this.memberId = balance.idMember;
    this.getAllBalancesByIdMember(this.memberId);
  }

  checked() {
    this.totalPayment = !this.totalPayment;
  }

  submit() {
    let payCancelBalance = new PayCancelBalance();
    payCancelBalance.id = this.memberId;
    payCancelBalance.positiveBalance = this.positiveBalance;
    let pay = 0;
    if (this.totalPayment) {
      payCancelBalance.pay = this.totalBalance;
    } else {
      payCancelBalance.pay = this.partialPay;
    };
    this.balanceService.cancelBalance(payCancelBalance).subscribe(
      result => {
        this.getAll();
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
