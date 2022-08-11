import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BalancePaid } from '../../../domain/balance-paid';
import { CancelBalancePaid } from '../../../domain/cancel-balance-paid';
import { DetailsSale } from '../../../domain/details-sale';
import { Fee } from '../../../domain/fee';
import { Sale } from '../../../domain/sale';
import { Status } from '../../../domain/status';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { BalancePaidService } from '../../../services/balance-paid.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { FeeService } from '../../../services/fee.service';
import { MemberService } from '../../../services/member.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';
import { SaleEditComponent } from '../../sale/sale-edit/sale-edit.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  userRegister: UserView;
  reasonCancel: string;
  date: string;
  member: string;
  userCancel: UserView;
  idUserCancel: number;
  @Output() updateSalesFees = new EventEmitter<string>();
  pay: BalancePaid;
  status: string;
  cancelStatus: boolean = false;
  cancelBalancePaid: CancelBalancePaid;
  sale: Sale;
  detailsSale: DetailsSale[] = [];
  userRegisterSale: UserView;
  displayDetail: boolean;
  fee: Fee;

  constructor(private customAlertService: CustomAlertService,
    private router: Router,
    private dp: DatePipe,
    private accountService: AccountService,
    private userService: UserService,
    private balancePaidService: BalancePaidService,
    private memberService: MemberService,
    private saleService: SaleService,
    private feeService: FeeService) { }

  ngOnInit() {
  }

  modalClick(id) {
    document.getElementById('modal-detail-pay').click();
    console.log("boton: ", document.getElementById('modal-detail-pay'))
    this.getPayById(id);
  }

  getPayById(id) {
    this.balancePaidService.getById(id).subscribe(
      response => {
        console.log("pago: ", response.result);
        this.pay = response.result;
        this.getUserRegister(this.pay.userId);
        this.date = this.pay.date;
        this.getMember(response.result.memberId);
        if (this.pay.pay < 0) { this.pay.pay *= (-1) }
        if (this.pay.status == Status.canceled) { this.getCancelBalancePaid(id);}        
      },
      error => console.error(error)
    )
  }

  getMember(id) {
    this.memberService.getById(id).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response.lastName + " " + response.name;
      },
      error => console.error(error)
    )
  }

  getUserRegister(userId) {
    this.userService.getById(userId).subscribe(
      result => {
        console.log(result);
        this.userRegister = result;
      },
      error => console.error(error)
    );
  }


  getCancelBalancePaid(id) {
    this.balancePaidService.getCancelBalancePaid(id).subscribe(
      result => {
        console.log("pago cancelado: ", result.result);
        this.cancelBalancePaid = result.result;
        this.idUserCancel = result.result.userId;
        this.getUserCancel(this.idUserCancel);
      },
      error => console.error(error)
    )
  }

  getUserCancel(userId) {
    this.userService.getById(userId).subscribe(
      result => {
        console.log("usuario que cancelo: ", result);
        this.userCancel = result;
      },
      error => console.error(error)
    );
  }

  createCancelBalancePaid() {
    var cancelBalancePaid = new CancelBalancePaid();
    cancelBalancePaid.reason = this.reasonCancel;
    cancelBalancePaid.balancePaidId = this.pay.id;
    cancelBalancePaid.pay = this.pay.pay;
    return cancelBalancePaid;
  }

  modalCancel() {
    document.getElementById('modal-cancel-pay').click();
  }

  cancel() {
    this.customAlertService.displayAlert("Gestión de Pagos", ["¿Está seguro que desea anular este pago?"], () => {
      var cancelPay = this.createCancelBalancePaid();
      this.balancePaidService.cancel(this.pay.id, cancelPay).subscribe(
        result => {
          this.modalClick(cancelPay.balancePaidId);
          this.updateSalesFeesCash();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Anulación", ["Error al intentar anular la venta."]);
        })
    })
  }


  updateSalesFeesCash() {
    this.updateSalesFees.emit();
  }

  modalClose() {
    document.getElementById('modal-detail-pay').click();
  }


  getSaleById(id) {
    this.fee = undefined;
    this.displayDetail = true;
    this.saleService.getSaleById(id).subscribe(
      response => {
        console.log("venta: ", response.result);
        this.sale = response.result;
        this.getUserRegisterSale(this.sale.userId);
        this.detailsSale = [];
        this.date = this.sale.date;
        this.member = response.result.member.lastName + " " + response.result.member.name;
        this.getDetailsSale();
      },
      error => console.error(error)
    )
  }

  getFeeById(id) {
    this.sale = undefined;
    this.displayDetail = true;
    this.feeService.getById(id).subscribe(
      response => {
        console.log("cuota: ", response.result);
        this.fee = response.result;
        this.getUserRegister(this.fee.userId);
        this.date = this.fee.date;
        this.member = response.result.member.lastName + " " + response.result.member.name;
      },
      error => console.error(error)
    )
  }



  getDetailsSale() {
    this.saleService.getDetailsSale(this.sale.id).subscribe(
      result => {
        console.log(result);
        this.detailsSale = result;
      },
      error => console.error(error)
    )
  }



  getUserRegisterSale(userId) {
    this.userService.getById(userId).subscribe(
      result => {
        console.log(result);
        this.userRegisterSale = result;
      },
      error => console.error(error)
    );
  }

  hideDetail() {
    this.displayDetail = false;
  }
 }
