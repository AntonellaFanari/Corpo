import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryExercises } from '../../../domain/category-exercises';
import { Exercise } from '../../../domain/exercise';
import { Tag } from '../../../domain/tag';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-exercises-create',
  templateUrl: './exercises-create.component.html',
  styleUrls: ['./exercises-create.component.css']
})
export class ExercisesCreateComponent implements OnInit {
  tags: Tag[] = [];
  checkboxToTags = [];
  formCreate: FormGroup;
  categories: CategoryExercises[] = [];
  sendForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private exerciseService: ExerciseService,
    private router: Router, private customAlertService: CustomAlertService) {
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required],
      categoryExerciseId: ['', Validators.required],
      video: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.exerciseService.getAllTags().subscribe(
      result => {
        this.tags = result;
        for (let i = 0; i < this.tags.length; i++) {
          let tagCheck: { tag: string, checked: boolean } = {tag:'', checked:false};
          tagCheck.tag = this.tags[i].name;
          tagCheck.checked = false;
          this.checkboxToTags.push(tagCheck);
        }
      },
      error => console.error(error)
    );
    this.exerciseService.getAllCategories().subscribe(
      result => {
        this.categories = result;
      },
      error => console.error(error)
    );
   
  }

  get f() {
    return this.formCreate.controls;
  }

  selectCategory(id) {
    this.formCreate.patchValue({
      categoryExcerciseId: id
    })
  }

  createExercise() {
    let newExercise = new Exercise();
    newExercise.name = this.formCreate.value.name;
    newExercise.categoryExerciseId = this.formCreate.value.categoryExerciseId;
    newExercise.video = this.formCreate.value.video;
    newExercise.tags = this.createListTags();
    return newExercise;
  }

  createListTags() {
    let tags: Tag[] = [];
    for (var i = 0; i < this.checkboxToTags.length; i++) {
      if (this.checkboxToTags[i].checked) {
        let tag = this.tags.find(x => x.name == this.checkboxToTags[i].tag);
        tags.push(tag);
      }
    };
    return tags;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      let newExercise = this.createExercise();
      this.exerciseService.addExercise(newExercise).subscribe(
        result => this.router.navigate(['/ejercicios-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Ejercicios", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Ejercicios", ["Hubo un problema al intentar cargar el ejercicio."]);
          }
        })
    }
    
  }
}
