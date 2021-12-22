import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OutflowType } from '../../../domain/outflowType';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { OutflowService } from '../../../services/outflow.service';

@Component({
  selector: 'app-outflow-type-edit',
  templateUrl: './outflow-type-edit.component.html',
  styleUrls: ['./outflow-type-edit.component.css']
})
export class OutflowTypeEditComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;
  id: number;
  outflowType: OutflowType;

  constructor(private outflowService: OutflowService, private formBuilder: FormBuilder,
    private router: Router, private customAlertService: CustomAlertService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id'])
    });
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.outflowService.getOutflowTypeById(this.id).subscribe(
      result => {
        console.log(result);
        this.outflowType = result;
        this.toCompleteForm();
      },
      error => console.error(error)
    )
  }

  toCompleteForm() {
    this.formCreate.patchValue({
      name: this.outflowType.name
    })
  }

  get f() {
    return this.formCreate.controls;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      this.outflowType.name = this.formCreate.value.name;
      this.outflowService.updateOutflowType(this.id, this.outflowType).subscribe(
        result => this.router.navigate(['/egresos-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Egresos", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Egresos", ["No se pudo modificar el egreso."]);
          }
        })
    }
  }


}
