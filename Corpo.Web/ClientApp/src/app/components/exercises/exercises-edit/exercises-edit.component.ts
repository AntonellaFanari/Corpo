import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryExercises } from '../../../domain/category-exercises';
import { Exercise } from '../../../domain/exercise';
import { Tag } from '../../../domain/tag';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-exercises-edit',
  templateUrl: './exercises-edit.component.html',
  styleUrls: ['./exercises-edit.component.css']
})
export class ExercisesEditComponent implements OnInit {
  tags: Tag[] = [];
  checkboxToTags = [];
  formEdit: FormGroup;
  categories: CategoryExercises[] = [];
  sendForm: boolean = false;
  id: number;
  exercise: Exercise;

  constructor(private formBuilder: FormBuilder, private exerciseService: ExerciseService,
    private router: Router, private customAlertService: CustomAlertService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required],
      categoryExerciseId: ['', Validators.required],
      video: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.exerciseService.getExerciseById(this.id).subscribe(
      result => {
        console.log(result);
        this.exercise = result.result;
        this.getTags();
        this.toCompleteForm();
      },
      error => console.error(error)
    );
    
    this.exerciseService.getAllCategories().subscribe(
      result => {
        console.log(result);
        this.categories = result;
      },
      error => console.error(error)
    );

  }

  getTags() {
    this.exerciseService.getAllTags().subscribe(
      result => {
        console.log(result);
        this.tags = result;
        for (let i = 0; i < this.tags.length; i++) {
          let tagCheck: { tag: string, checked: boolean } = { tag: '', checked: false };
          tagCheck.tag = this.tags[i].name;
          tagCheck.checked = false;
          this.checkboxToTags.push(tagCheck);
          console.log(this.checkboxToTags);
        };
        this.toCheckedCheckbox();

      },
      error => console.error(error)
    );
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      name: this.exercise.name,
      categoryExerciseId: this.exercise.categoryExerciseId,
      video: this.exercise.video
    });
  }

  toCheckedCheckbox() {
    for (var i = 0; i < this.exercise.tags.length; i++) {
      let checkbox = this.checkboxToTags.find(x => x.tag == this.exercise.tags[i].name);
      checkbox.checked = true;
    }
  }

  get f() {
    return this.formEdit.controls;
  }

  selectCategory(id) {
    this.formEdit.patchValue({
      categoryExcerciseId: id
    })
  }

  editExercise() {
    let editExercise = new Exercise();
    editExercise.name = this.formEdit.value.name;
    editExercise.categoryExerciseId = this.formEdit.value.categoryExerciseId;
    editExercise.video = this.formEdit.value.video;
    editExercise.tags = this.createListTags();
    console.log(editExercise);
    return editExercise;
  }

  createListTags() {
    let tags: Tag[] = [];
    console.log(this.checkboxToTags);
    for (var i = 0; i < this.checkboxToTags.length; i++) {
      console.log(this.checkboxToTags[i]);
      if (this.checkboxToTags[i].checked) {
        let tag = this.tags.find(x => x.name == this.checkboxToTags[i].tag);
        tags.push(tag);
      }
    };
    return tags;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      let editExercise = this.editExercise();
      this.exerciseService.updateExercise(this.id, editExercise).subscribe(
        result => this.router.navigate(['/ejercicios-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Ejercicios", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Ejercicios", ["Hubo un problema al intentar modificar el ejercicio."]);
          }
        })
    }

  }

}
