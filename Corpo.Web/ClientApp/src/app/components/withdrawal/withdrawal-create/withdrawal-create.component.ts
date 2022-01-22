import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Withdrawal } from '../../../domain/withdrawal';
import { WithdrawalName } from '../../../domain/withdrawal-name';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { WithdrawalService } from '../../../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-create',
  templateUrl: './withdrawal-create.component.html',
  styleUrls: ['./withdrawal-create.component.css']
})
export class WithdrawalCreateComponent implements OnInit {
  withdrawalsName: WithdrawalName[] = [];
  formCreate: FormGroup;
  userId: number;
  send: boolean = false;

  constructor(private withdrawalService: WithdrawalService, private formBuilder: FormBuilder,
    private accountService: AccountService, private router: Router, private customAlertService: CustomAlertService) {
    this.userId = this.accountService.getLoggedUser().id;
    this.formCreate = this.formBuilder.group({
      withdrawalNameId: ['', Validators.required],
      pay: [0, Validators.min(1)]
    })
  }

  ngOnInit() {
    this.withdrawalService.getAllWithdrawalName().subscribe(
      result => {
        console.log(result);
        this.withdrawalsName = result;
      },
      error => console.error(error)
    )
  }

  get f() {
    return this.formCreate.controls;
  }

  selectWithdrawalName(event) {
    this.formCreate.patchValue({
      withdrawalNameId: event
    })
  }


  createWithdrawal() {
    if (this.formCreate.valid) {
      let newWithdrawal = new Withdrawal();
      newWithdrawal.withdrawalNameId = this.formCreate.value.withdrawalNameId;
      newWithdrawal.pay = this.formCreate.value.pay;
      newWithdrawal.UserId = this.userId;
      return newWithdrawal;
    } else {
      return null;
    }

  }

  submit() {
    this.send = true;
    let newWithdrawal = this.createWithdrawal();
    if (newWithdrawal != null) {
      this.withdrawalService.addWithdrawal(newWithdrawal).subscribe(
        result => this.router.navigate(['/caja']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Retiros", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Retiros", ["Hubo un problema al intentar registar el retiro."]);
          }
        });
    }
  }

}