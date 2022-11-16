import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WithdrawalName } from '../../../domain/withdrawal-name';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { WithdrawalService } from '../../../services/withdrawal.service';

@Component({
  selector: 'app-withdrawal-name-edit',
  templateUrl: './withdrawal-name-edit.component.html',
  styleUrls: ['./withdrawal-name-edit.component.css']
})
export class WithdrawalNameEditComponent implements OnInit {
  formEdit: FormGroup;
  sendForm: boolean = false;
  id: number;
  withdrawalName: WithdrawalName;
  requesting = false;

  constructor(private withdrawalService: WithdrawalService, private formBuilder: FormBuilder,
    private router: Router, private customAlertService: CustomAlertService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getWithdrawalName();

  }

  getWithdrawalName() {
    this.requesting = true;
    this.withdrawalService.getWithdrawalNameById(this.id).subscribe(
      result => {
        console.log(result);
        this.withdrawalName = result.result;
        this.toCompleteForm();
      },
      error => this.requesting = false
    )
  }

  toCompleteForm() {
    this.formEdit.patchValue({ name: this.withdrawalName.name });
    this.requesting = false;
  }

  get f() {
    return this.formEdit.controls;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      let withdrawalName = new WithdrawalName();
      withdrawalName.name = this.formEdit.value.name;
      this.withdrawalService.updateWithdrawalName(this.id, withdrawalName).subscribe(
        result => this.router.navigate(['/retiros-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Retiros", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Retiros", ["No se pudo modificar el retiro."]);
          }
        })
    }
  }

}
