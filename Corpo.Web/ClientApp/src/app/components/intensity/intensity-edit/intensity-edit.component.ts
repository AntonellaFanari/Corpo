import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Intensity } from '../../../domain/wod/intensity';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { IntensityService } from '../../../services/intensity.service';

@Component({
  selector: 'app-intensity-edit',
  templateUrl: './intensity-edit.component.html',
  styleUrls: ['./intensity-edit.component.css']
})
export class IntensityEditComponent implements OnInit {
  intensity: Intensity;
  formEdit: FormGroup;
  id: number;
  sendForm: boolean = false;

  constructor(private intensityService: IntensityService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      up: ['', Validators.required],
      down: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.intensityService.getById(this.id).subscribe(
      response => {
        console.log(response);
        this.intensity = response.result;
        this.toCompleteForm();
      },
      error => console.error(error)
    );

  }

  get f() {
    return this.formEdit.controls;
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      up: this.intensity.up,
      down: this.intensity.down
    })
  }

  createIntensityEdit() {
    var intensityEdit = new Intensity();
    intensityEdit.up = this.formEdit.value.up;
    intensityEdit.down = this.formEdit.value.down;
    return intensityEdit;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      var intensityEdit = this.createIntensityEdit();
      this.intensityService.update(this.id, intensityEdit).subscribe(
        result => {
          this.router.navigate(['/intensidades-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Intensidades", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Intensidades", ["No se pudo modificar la intensidad."]);
          }
        })
    }
  }


}
