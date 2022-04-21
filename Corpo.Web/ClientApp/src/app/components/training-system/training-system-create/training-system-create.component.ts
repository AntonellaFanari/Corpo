import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainingSystem } from '../../../domain/wod/training-system';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { TrainingSystemService } from '../../../services/wod/training-system.service';

@Component({
  selector: 'app-training-system-create',
  templateUrl: './training-system-create.component.html',
  styleUrls: ['./training-system-create.component.css']
})
export class TrainingSystemCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private trainingSystemService: TrainingSystemService,
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
      var trainingSystem = new TrainingSystem();
      trainingSystem.up = this.formCreate.value.up;
      trainingSystem.down = this.formCreate.value.down;
      this.trainingSystemService.add(trainingSystem).subscribe(
        result => {
          this.router.navigate(['/sistemas-entrenamiento-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Sistemas de Entrenamiento", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Sistemas de Entrenamiento", ["No se pudo guardar el sistema de entrenamiento."]);
          }
        })
    }
  }

}
