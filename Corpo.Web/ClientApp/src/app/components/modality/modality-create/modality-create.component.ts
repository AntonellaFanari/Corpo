import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modality } from '../../../domain/wod/modality';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ModalityService } from '../../../services/modality.service';

@Component({
  selector: 'app-modality-create',
  templateUrl: './modality-create.component.html',
  styleUrls: ['./modality-create.component.css']
})
export class ModalityCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private modalityService: ModalityService,
    private router: Router, private customAlertService: CustomAlertService) {
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required],
      unit: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  get f() {
    return this.formCreate.controls;
  }

  createModality() {
    let modality = new Modality();
    modality.name = this.formCreate.value.name;
    modality.unit = this.formCreate.value.unit;
    return modality;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      let modality = this.createModality();
      console.log(modality);
      this.modalityService.add(modality).subscribe(
        response => {
          console.log(response);
          this.router.navigate(["/modalidades-list"]);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Modalidades", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Modalidades", ["No se pudo guardar la modalidad."]);
          }
        }
      )
    }
  }

}
