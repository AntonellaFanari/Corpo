import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Income } from '../../../domain/income';
import { CashService } from '../../../services/cash.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { IncomeService } from '../../../services/income.service';

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.component.html',
  styleUrls: ['./income-create.component.css']
})
export class IncomeCreateComponent implements OnInit {
  formCreate: FormGroup;
  send: boolean = false;
  monthlyCash = 0;

  constructor(private formBuilder: FormBuilder, private incomeService: IncomeService, private customAlertService: CustomAlertService,
    private router: Router, private cashService: CashService) {
    this.getMonthlyCash();
    console.log(this.monthlyCash);
    this.createForm();
  }

  ngOnInit() {
  
  }

  createForm() {
    this.formCreate = this.formBuilder.group({
      detail: '',
      amount: [0, [Validators.min(1), Validators.max(this.monthlyCash)]]
    })
  }

  getMonthlyCash() {
    this.cashService.getMonthlyCash().subscribe(
      result => {
        console.log(result);
        this.monthlyCash = result.result.total;
        this.createForm();

      },
      error => console.error(error)
    );
  }

  get f() {
    return this.formCreate.controls;
  }

  createIncome() {
    let income = new Income();
    income.detail = this.formCreate.value.detail;
    income.amount = this.formCreate.value.amount;
    return income;
  }

  submit() {
    this.send = true;
    if (this.formCreate.valid) {
      let income = this.createIncome();
      this.incomeService.add(income).subscribe(
        result => this.router.navigate(['/caja']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Ingresos", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Ingresos", ["Hubo un problema al intentar registar el ingreso."]);
          }
        });
    }
  }
}
