import { Component, OnInit } from '@angular/core';
import { BalanceToPay } from '../../../domain/balance-to-pay';
import { DetailsSale } from '../../../domain/details-sale';
import { Fee } from '../../../domain/fee';
import { MemberView } from '../../../domain/member-view';
import { Sale } from '../../../domain/sale';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { BalanceService } from '../../../services/balance.service';
import { FeeService } from '../../../services/fee.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-my-debts',
  templateUrl: './my-debts.component.html',
  styleUrls: ['./my-debts.component.css']
})
export class MyDebtsComponent implements OnInit {
  idMember: number;
  balances: BalanceToPay[] = [];
  sale: Sale;
  detailsSale: DetailsSale[] = [];
  member: MemberView;
  status: number;
  fee: Fee;

  constructor(private balanceService: BalanceService, private saleService: SaleService,
    private userService: UserService, private feeService: FeeService, private accountService: AccountService) {
    this.idMember = this.accountService.getLoggedUser().id;
  }

  ngOnInit() {
    this.balanceService.getAllByIdMember(this.idMember).subscribe(
      result => {
        console.log(result);
        this.balances = result;
      },
      error => console.error(error)
    )
  }


  modalClickSale() {
    document.getElementById('modal-detail').click();
  }

  modalClickFee() {
    document.getElementById('modal-fee-detail').click();
  }

  getTransaction(balance) {
    if (balance.transaction == 1) {
      this.getSale(balance.transactionId);
      this.modalClickSale();
    } else {
      this.getFee(balance.transactionId);
      this.modalClickFee();
    }
  }

  getSale(id) {
    this.saleService.getSaleById(id).subscribe(
      result => {
        console.log(result);
        this.sale = result.result;
        this.getDetailsSale(id);
        this.status = this.sale.status;
      },
      error => console.error(error)
    );
  }

  getDetailsSale(id) {
    this.saleService.getDetailsSale(id).subscribe(
      result => {
        console.log(result);
        this.detailsSale = result;
      },
      error => console.error(error)
    );
  }

  getFee(id) {
    this.feeService.getById(id).subscribe(
      result => {
        console.log(result);
        this.fee = result;
        console.log("fee", this.fee);
      },
      error => console.error(error)
    )
  }
}
