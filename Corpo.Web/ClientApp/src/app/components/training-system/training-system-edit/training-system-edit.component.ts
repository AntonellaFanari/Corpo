import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingSystem } from '../../../domain/wod/training-system';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { TrainingSystemService } from '../../../services/wod/training-system.service';

@Component({
  selector: 'app-training-system-edit',
  templateUrl: './training-system-edit.component.html',
  styleUrls: ['./training-system-edit.component.css']
})
export class TrainingSystemEditComponent implements OnInit {

  trainingSystem: TrainingSystem;
  formEdit: FormGroup;
  id: number;
  sendForm = false;

  constructor(private trainingSystemService: TrainingSystemService,
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
    this.trainingSystemService.getById(this.id).subscribe(
      response => {
        console.log(response);
        this.trainingSystem = response.result;
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
      up: this.trainingSystem.up,
      down: this.trainingSystem.down
    })
  }

  createTrainingSystem() {
    var trainingSystem = new TrainingSystem();
    trainingSystem.up = this.formEdit.value.up;
    trainingSystem.down = this.formEdit.value.down;
    return trainingSystem;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      var trainingSystem = this.createTrainingSystem();
      this.trainingSystemService.update(this.id, trainingSystem).subscribe(
        result => {
          this.router.navigate(['/sistemas-entrenamiento-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Sistemas de Entrenamiento", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Sistemas de Entrenamiento", ["No se pudo modificar el sistema de entrenamiento."]);
          }
        })
    }
  }


}
