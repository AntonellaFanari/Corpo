import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BalancePaid } from '../../../domain/balance-paid';
import { CancelSale } from '../../../domain/cancel-sale';
import { DetailsSale } from '../../../domain/details-sale';
import { Product } from '../../../domain/product';
import { Sale } from '../../../domain/sale';
import { Status } from '../../../domain/status';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { BalancePaidService } from '../../../services/balance-paid.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sale-edit',
  templateUrl: './sale-edit.component.html',
  styleUrls: ['./sale-edit.component.css']
})
export class SaleEditComponent implements OnInit {
  userRegisterSale: UserView;
  titleModal: string;
  properties: string[] = [];
  detailsSale: DetailsSale[] = [];
  products: Product[] = [];
  date: string;
  member: string;
  sale: Sale;
  reasonCancel: string;
  currentDate: string;
  status: string;
  userCancelSale: UserView;
  idUserCancel: number;
  cancelStatus: boolean = false;
  cancelSale: CancelSale;
  @Output() updateSales = new EventEmitter<string>();
  requesting = false;


  constructor(private saleService: SaleService,
    private customAlertService: CustomAlertService,
    private router: Router,
    private dp: DatePipe,
    private accountService: AccountService,
    private userService: UserService) { }

  ngOnInit() {
    this.currentDate = this.dp.transform(new Date(), 'yyyy-MM-dd');
  }

  modalClick(id) {
    document.getElementById('modal-detail').click();
    console.log("boton: ", document.getElementById('modal-detail'));
    this.getSaleById(id);
  }

  getSaleById(id) {
    this.requesting = true;
    this.saleService.getSaleById(id).subscribe(
      response => {
        console.log("venta: ", response.result);
        this.sale = response.result;
        this.getUserRegisterSale(this.sale.userId);
        this.detailsSale = [];
        this.date = this.sale.date;
        this.member = response.result.member.lastName + " " + response.result.member.name;
        this.getDetailsSale();
        if (this.sale.status == Status.canceled) { this.getCancelSale(this.sale.id) }
      },
      error => this.requesting = false
    )
  }

 

  getDetailsSale() {
    this.saleService.getDetailsSale(this.sale.id).subscribe(
      result => {
        console.log(result);
        this.detailsSale = result;
        this.requesting = false
      },
      error => this.requesting = false
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


  getCancelSale(saleId) {
    this.saleService.getCancelSale(saleId).subscribe(
      result => {
        console.log(result.result);
        this.cancelSale = result.result;
        this.idUserCancel = result.result.userId;
        this.getUserCancelSale(this.idUserCancel);
      },
      error => console.error(error)
    )
  }


  getUserCancelSale(userId) {
    this.userService.getById(userId).subscribe(
      result => {
        console.log(result);
        this.userCancelSale = result;
      },
      error => console.error(error)
    );
  }

  createCancelSale() {
    var cancelSale = new CancelSale();
    cancelSale.date = this.currentDate;
    cancelSale.reason = this.reasonCancel;
    cancelSale.saleId = this.sale.id;
    cancelSale.total = this.sale.total;
    return cancelSale;
  }

  modalCancel() {
    document.getElementById('modal-cancel').click();
  }

  cancel() {
    this.customAlertService.displayAlert("Gestión de Ventas", ["¿Está seguro que desea anular esta venta?"], () => {
      var cancelSale = this.createCancelSale();
      this.modalClick(cancelSale.saleId);
      this.saleService.cancel(this.sale.id, cancelSale).subscribe(
        result => {
          this.updateSalesCash();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Anulación", ["Error al intentar anular la venta."]);
        })
    }, true);
  }

  updateSalesCash() {
    this.updateSales.emit();
  }
}
