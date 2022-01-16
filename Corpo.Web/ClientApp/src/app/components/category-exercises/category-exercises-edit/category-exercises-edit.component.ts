import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryExercises } from '../../../domain/category-exercises';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-category-exercises-edit',
  templateUrl: './category-exercises-edit.component.html',
  styleUrls: ['./category-exercises-edit.component.css']
})
export class CategoryExercisesEditComponent implements OnInit {
  category: CategoryExercises;
  formEdit: FormGroup;
  id: number;
  sendForm: boolean = false;

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.exerciseService.getCategoryById(this.id).subscribe(
      result => {
        console.log(result.resul);
        this.category = result.result;
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
      name: this.category.name
    })
  }

  createCategoryEdit() {
    var categoryEdit = new CategoryExercises();
    categoryEdit.name = this.formEdit.value.name;
    return categoryEdit;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      var categoryEdit = this.createCategoryEdit();
      this.exerciseService.updateCategory(this.id, categoryEdit).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/categorias-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Categorias", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Categorias", ["No se pudo modificar la categoria."]);
          }
        })
    }
  }
}
