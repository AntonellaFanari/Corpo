import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WithdrawalName } from '../../../domain/withdrawal-name';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { WithdrawalService } from '../../../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-name-create',
  templateUrl: './withdrawal-name-create.component.html',
  styleUrls: ['./withdrawal-name-create.component.css']
})
export class WithdrawalNameCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;
  constructor(private withdrawalService: WithdrawalService, private formBuilder: FormBuilder,
    private router: Router, private customAlertService: CustomAlertService) {
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit() {

  }

  get f() {
    return this.formCreate.controls;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      let newWithdrawalName = new WithdrawalName();
      newWithdrawalName.name = this.formCreate.value.name;
      this.withdrawalService.addWithdrawalName(newWithdrawalName).subscribe(
        result => this.router.navigate(['/retiros-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Retiros", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Retiros", ["No se pudo guardar el retiro."]);
          }
        })
    }
  }



}
