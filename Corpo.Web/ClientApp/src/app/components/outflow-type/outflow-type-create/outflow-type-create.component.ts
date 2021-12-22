import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutflowType } from '../../../domain/outflowType';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { OutflowService } from '../../../services/outflow.service';

@Component({
  selector: 'app-outflow-type-create',
  templateUrl: './outflow-type-create.component.html',
  styleUrls: ['./outflow-type-create.component.css']
})
export class OutflowTypeCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;
  constructor(private outflowService: OutflowService, private formBuilder: FormBuilder,
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
      let newOutflowType = new OutflowType();
      newOutflowType.name = this.formCreate.value.name;
      this.outflowService.addOutflowType(newOutflowType).subscribe(
        result => this.router.navigate(['/egresos-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Egresos", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Egresos", ["No se pudo guardar el egreso."]);
          }
        })
    }
  }



}
