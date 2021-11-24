import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CancelSale } from '../../../domain/cancel-sale';
import { DetailsSale } from '../../../domain/details-sale';
import { Product } from '../../../domain/product';
import { Sale } from '../../../domain/sale';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.css']
})
export class SaleDetailComponent implements OnInit {
  userRegisterSale: UserView;
  titleModal: string;
  properties: string[] = [];
  detailsSale: DetailsSale[] = [];
  products: Product[] = [];
  dateSale: string;
  memberSale: string;
  selectedSale: Sale;
  reasonCancel: string;
  currentDate: string;
  userId: number;
  status: string;
  userCancelSale: UserView;
  idUserCancel: number;
  cancelStatus: boolean = false;
  cancelSale: CancelSale;
  @Output() updateSales = new EventEmitter<string>();


  constructor(private saleService: SaleService, private customAlertService: CustomAlertService,
    private router: Router, private dp: DatePipe, private accountService: AccountService, private userService: UserService) { }

  ngOnInit() {
    this.currentDate = this.dp.transform(new Date(), 'yyyy-MM-dd');
    this.userId = this.accountService.getLoggedUser().id;
  }

  modalClick() {
    document.getElementById('modal-detail').click();
  }

  getDetailsSale(sale) {
    this.selectedSale = sale;
    this.getUserRegisterSale(sale.userId);
    console.log(this.userRegisterSale);
    this.getStatus(this.selectedSale);
    this.detailsSale = [];
    this.dateSale = this.selectedSale.date;
    this.memberSale = sale.member.lastName + " " + sale.member.name;
    this.saleService.getDetailsSale(sale.id).subscribe(
      result => {
        console.log(result);
        this.detailsSale = result;
      },
      error => console.error(error)
    )
  }

  getStatus(sale) {
    this.status = "";
    if (sale.status == 1) {
      this.status = "Vigente";
      this.cancelStatus = false;
    } else {
      this.status = "Cancelada";
      this.cancelStatus = true;
      console.log(sale.id);
      this.getCancelSale(sale.id);
      console.log(this.userCancelSale);
    };
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
    cancelSale.saleId = this.selectedSale.id;
    cancelSale.total = this.selectedSale.total;
    cancelSale.userId = this.userId;
    return cancelSale;
  }

  cancel() {
    this.customAlertService.displayAlert("Gestión de Ventas", ["¿Está seguro que desea anular esta venta?"], () => {
      var cancelSale = this.createCancelSale();
      this.saleService.cancel(this.selectedSale.id, cancelSale).subscribe(
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
