import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cash } from '../../../domain/cash';
import { CashService } from '../../../services/cash.service';
import { CustomAlertService } from '../../../services/custom-alert.service';

@Component({
  selector: 'app-cash-opening',
  templateUrl: './cash-opening.component.html',
  styleUrls: ['./cash-opening.component.css']
})
export class CashOpeningComponent implements OnInit {
  requesting = false;
  cash: Cash;
  monthlyCash = 0;

  constructor(private cashService: CashService,
    private customAlertService: CustomAlertService,
    private router: Router) { }

  ngOnInit() {
    this.getLastCash();
  }

  getLastCash() {
    this.requesting = true;
    this.cashService.getLastCash().subscribe(
      result => {
        this.cash = result.result;
        this.getMonthlyCash();
      },
      error => {
        this.requesting = false;
      }
    )
  }

  getMonthlyCash() {
    this.monthlyCash = 0;
    this.cashService.getMonthlyCash().subscribe(
      result => {
        if (result.result !== null) {
          this.monthlyCash = result.result.total;
        };

        this.requesting = false;
      },
      error => this.requesting = false
    );
  }

  openingCash() {
    this.cashService.toOpen().subscribe(
      result => {
        this.router.navigate(['/caja']);
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Caja", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Caja", ["Hubo un problema al intentar abrir la caja."]);
        }
      }
    )
  }

}
