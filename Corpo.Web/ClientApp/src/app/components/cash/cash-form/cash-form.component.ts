import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { CancelSale } from '../../../domain/cancel-sale';
import { DetailsSale } from '../../../domain/details-sale';
import { Outflow } from '../../../domain/outflow';
import { Product } from '../../../domain/product';
import { Sale } from '../../../domain/sale';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { OutflowService } from '../../../services/outflow.service';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';
import { OutflowDetailComponent } from '../../outflow/outflow-detail/outflow-detail.component';
import { SaleEditComponent } from '../../sale/sale-edit/sale-edit.component';
import { UserFormComponent } from '../../user/user-form/user-form.component';

@Component({
  selector: 'app-cash-form',
  templateUrl: './cash-form.component.html',
  styleUrls: ['./cash-form.component.css']
})
export class CashFormComponent implements OnInit {
  sales: Sale[] = [];
  totalSale = 0;
  outflows: Outflow[] = [];
  totalOutflow = 0;
 
  @ViewChild(SaleEditComponent, { static: true }) saleDetailComponent: SaleEditComponent;
  @ViewChild(OutflowDetailComponent, { static: true }) outflowDetailComponent: OutflowDetailComponent;

  constructor(private saleService: SaleService, private outflowService: OutflowService) { }

  ngOnInit() {
    this.getAllSale();
    this.getAllOutflow();
    console.log(this.outflowDetailComponent);
  }

  getAllSale() {
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
        this.calculateTotalSales();
      },
      error => console.error(error)
    );
  }

  getAllOutflow() {
    this.outflowService.getAllOutflow().subscribe(
      result => {
        console.log(result);
        this.outflows = result;
        this.calculateTotalOutflow();
      },
      error => console.error(error)
    )
  }

  calculateTotalSales() {
    for (var i = 0; i < this.sales.length; i++) {
      if (this.sales[i].status == 1) {
        this.totalSale = this.totalSale + this.sales[i].total;
      }
    }
  }

  calculateTotalOutflow() {
    if (this.outflows.length > 0) {
      for (var i = 0; i < this.outflows.length; i++) {
        this.totalOutflow = this.totalOutflow + this.outflows[i].pay;
      }
    } else {
      this.totalOutflow = 0;
    }
    
  }

  getDetailsSale(sale) {
    this.saleDetailComponent.modalClick();
    this.saleDetailComponent.getDetailsSale(sale);
  }

  fee() {

  }

  getDetailOutflow(outflow) {
    this.outflowDetailComponent.modalClick();
    this.outflowDetailComponent.getOutflow(outflow.id);
  }
}
