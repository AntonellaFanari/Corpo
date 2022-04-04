import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Intensity } from '../../../domain/wod/intensity';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { IntensityService } from '../../../services/intensity.service';

@Component({
  selector: 'app-intensity-create',
  templateUrl: './intensity-create.component.html',
  styleUrls: ['./intensity-create.component.css']
})
export class IntensityCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private intensityService: IntensityService,
    private customAlertService: CustomAlertService,
    private router: Router) {
    this.formCreate = this.formBuilder.group({
      up: ['', Validators.required],
      down: ['', Validators.required]
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
      var newIntensity = new Intensity();
      newIntensity.up = this.formCreate.value.up;
      newIntensity.down = this.formCreate.value.down;
      this.intensityService.add(newIntensity).subscribe(
        result => {
          this.router.navigate(['/intensidades-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Intensidades", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Intensidades", ["No se pudo guardar la intensidad."]);
          }
        })
    }
  }

}
