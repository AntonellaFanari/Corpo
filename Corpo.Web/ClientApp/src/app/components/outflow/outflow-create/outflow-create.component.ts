import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Outflow } from '../../../domain/outflow';
import { OutflowType } from '../../../domain/outflowType';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { OutflowService } from '../../../services/outflow.service';

@Component({
  selector: 'app-outflow-create',
  templateUrl: './outflow-create.component.html',
  styleUrls: ['./outflow-create.component.css']
})
export class OutflowCreateComponent implements OnInit {
  outflowsTypes: OutflowType[] = [];
  formCreate: FormGroup;
  userId: number;
  send: boolean = false;

  constructor(private outflowService: OutflowService, private formBuilder: FormBuilder,
    private accountService: AccountService, private router: Router, private customAlertService: CustomAlertService) {
    this.userId = this.accountService.getLoggedUser().id;
    this.formCreate = this.formBuilder.group({
      outflowTypeId: ['', Validators.required],
      pay: [0, Validators.min(1)]
    })
  }

  ngOnInit() {
    this.outflowService.getAllOutflowType().subscribe(
      result => {
        console.log(result);
        this.outflowsTypes = result;
      },
      error => console.error(error)
    )
  }

  get f() {
    return this.formCreate.controls;
  }

  selectOutflowType(event) {
    this.formCreate.patchValue({
      outflowTypeId: event
    })
  }


  createOutflow() {
    if (this.formCreate.valid) {
      let newOutflow = new Outflow();
      newOutflow.outflowTypeId = this.formCreate.value.outflowTypeId;
      newOutflow.pay = this.formCreate.value.pay;
      newOutflow.UserId = this.userId;
      return newOutflow;
    } else {
      return null;
    }

  }

  submit() {
    this.send = true;
    let newOutflow = this.createOutflow();
    if (newOutflow != null) {
      this.outflowService.addOutflow(newOutflow).subscribe(
        result => this.router.navigate(['/caja']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Egresos", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Egresos", ["Hubo un problema al intentar registar el egreso."]);
          }
        });
    }
  }

}
