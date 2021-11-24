import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { CancelSale } from '../../../domain/cancel-sale';
import { DetailsSale } from '../../../domain/details-sale';
import { Product } from '../../../domain/product';
import { Sale } from '../../../domain/sale';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';
import { SaleDetailComponent } from '../../sale/sale-detail/sale-detail.component';
import { UserFormComponent } from '../../user/user-form/user-form.component';

@Component({
  selector: 'app-cash-form',
  templateUrl: './cash-form.component.html',
  styleUrls: ['./cash-form.component.css']
})
export class CashFormComponent implements OnInit {
  sales: Sale[] = [];
  totalSale = 0;
 
  @ViewChild(SaleDetailComponent, { static: true }) saleDetailComponent: SaleDetailComponent;

  constructor(private saleService: SaleService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
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
        this.calculateTotal();
      },
      error => console.error(error)
    );
  }

  calculateTotal() {
    for (var i = 0; i < this.sales.length; i++) {
      if (this.sales[i].status == 1) {
        this.totalSale = this.totalSale + this.sales[i].total;
      }
    }
  }

  getDetailsSale(sale) {
    this.saleDetailComponent.modalClick();
    this.saleDetailComponent.getDetailsSale(sale);
  }

}
