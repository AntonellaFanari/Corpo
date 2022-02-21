import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BalanceToPay } from '../../../domain/balance-to-pay';
import { Fee } from '../../../domain/fee';
import { Member } from '../../../domain/member';
import { MemberView } from '../../../domain/member-view';
import { Sale } from '../../../domain/sale';
import { UserView } from '../../../domain/user-view';
import { BalanceService } from '../../../services/balance.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { FeeService } from '../../../services/fee.service';
import { MemberService } from '../../../services/member.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-debt-edit',
  templateUrl: './debt-edit.component.html',
  styleUrls: ['./debt-edit.component.css']
})
export class DebtEditComponent implements OnInit {
  balance: BalanceToPay;
  userRegister: UserView;
  sale: Sale;
  fee: Fee;
  id: number;
  member: MemberView;
  balanceModify: number;
  total: number;

  constructor(private route: ActivatedRoute, private balanceService: BalanceService, private userService: UserService, private saleService: SaleService,
    private feeService: FeeService, private router: Router, private customAlertService: CustomAlertService, private memberService: MemberService) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id'])
    });
  }

  ngOnInit() {
    this.balanceService.getById(this.id).subscribe(
      result => {
        this.balance = result.result;
        this.getMember(this.balance.memberId);
        if (this.balance.balance < 0) {
          this.balanceModify = this.balance.balance * (-1);
        } else {
          this.balanceModify = this.balance.balance;
        }
        if (this.balance.transaction == 1) {
          this.getSale(this.balance.transactionId);
        } else {
          this.getFee(this.balance.transactionId);
        }
      },
      error => console.error(error)
    )
  }

  getMember(id) {
    this.memberService.getById(id).subscribe(
      result => {
        this.member = result;
      },
      error => console.error(error)
    )
  }

  getSale(id) {
    this.saleService.getSaleById(id).subscribe(
      result => {
        this.sale = result.result;
        this.total = this.sale.total;
        this.getUserRegister(this.sale.userId);
      },
      error => console.error(error)
    )
  }

  getFee(id) {
    this.feeService.getById(id).subscribe(
      result => {
        this.fee = result;
        this.total = this.fee.total;
        this.getUserRegister(this.fee.userId);
      },
      error => console.error(error)
    )
  }

  getUserRegister(userId) {
    this.userService.getById(userId).subscribe(
      result => {
        this.userRegister = result;
      },
      error => console.error(error)
    );
  }

  getAmountBalance() {
    if (this.balance.balance < 0) {
      this.balance.balance = this.balanceModify * (-1);
    } else {
      this.balance.balance = this.balanceModify;
    }
  }

  submit() {
    this.getAmountBalance();
    this.balanceService.update(this.id, this.balance).subscribe(
      result => {
        this.router.navigate(['/deudas-detalle'], { queryParams: { id: this.balance.memberId } });
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Deudas", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Deudas", ["No se pudo modificar el saldo."]);
        }
      })
  }
}
