import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BalanceToPay } from '../../../domain/balance-to-pay';
import { DetailsSale } from '../../../domain/details-sale';
import { Fee } from '../../../domain/fee';
import { Member } from '../../../domain/member';
import { MemberView } from '../../../domain/member-view';
import { Sale } from '../../../domain/sale';
import { UserView } from '../../../domain/user-view';
import { BalanceService } from '../../../services/balance.service';
import { FeeService } from '../../../services/fee.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-debt-detail',
  templateUrl: './debt-detail.component.html',
  styleUrls: ['./debt-detail.component.css']
})
export class DebtDetailComponent implements OnInit {
  idMember: number;
  balances: BalanceToPay[] = [];
  sale: Sale;
  detailsSale: DetailsSale[] = [];
  member: MemberView;
  status: number;
  fee: Fee;
  viewDebts: boolean = false;
  requestingListBalances: boolean;
  requestingDetailSale: boolean;
  requestingDetailFee: boolean;

  constructor(private balanceService: BalanceService, private route: ActivatedRoute, private saleService: SaleService,
    private userService: UserService, private feeService: FeeService) {
    this.route.queryParams.subscribe(params => { this.idMember = parseInt(params['id']) });
  }

  ngOnInit() {
    this.requestingListBalances = true;
    if (!isNaN(this.idMember)) {
      this.balanceService.getAllByIdMember(this.idMember).subscribe(
        result => {
          this.requestingListBalances = false;
          console.log("saldos: ", result);
          this.balances = result;
          this.member = result[0].member;
        },
        error => this.requestingListBalances = false
      );
    }
    
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
    this.requestingDetailSale = true;
    this.saleService.getSaleById(id).subscribe(
      result => {
        this.sale = result.result;
        this.getDetailsSale(id);
        this.status = this.sale.status;
      },
      error => this.requestingDetailSale = false
    );
  }

  getDetailsSale(id) {
    this.saleService.getDetailsSale(id).subscribe(
      result => {
        this.detailsSale = result;
        this.requestingDetailSale = false;
      },
      error =>
        this.requestingDetailSale = false
    );
  }


  getFee(id) {
    this.requestingDetailFee = true;
    this.feeService.getById(id).subscribe(
      result => {
        this.requestingDetailFee = false;
        this.fee = result.result;
        console.log("fee", this.fee);
      },
      error => this.requestingDetailFee = false
    )
  }
}
