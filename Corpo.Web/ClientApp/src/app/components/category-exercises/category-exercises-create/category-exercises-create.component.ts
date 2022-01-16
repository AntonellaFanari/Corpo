import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryExercises } from '../../../domain/category-exercises';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-category-exercises-create',
  templateUrl: './category-exercises-create.component.html',
  styleUrls: ['./category-exercises-create.component.css']
})
export class CategoryExercisesCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private customAlertService: CustomAlertService,
    private router: Router, private exerciseService: ExerciseService, private location: Location) {
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
      var newCategory = new CategoryExercises();
      newCategory.name = this.formCreate.value.name;
      this.exerciseService.addCategory(newCategory).subscribe(
        result => {
          console.log(result);
          this.return();
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Categorias", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Categorias", ["No se pudo guardar la categoria."]);
          }
        })
    }
  }

  return() {
    this.location.back();
  }

}
