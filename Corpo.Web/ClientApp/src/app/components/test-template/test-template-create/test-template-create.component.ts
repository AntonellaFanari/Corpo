import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestExercise, TestType } from '../../../domain/test/test-exercise';
import { TestTemplate } from '../../../domain/test/test-template';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { TestTemplateService } from '../../../services/test-template.service';

@Component({
  selector: 'app-test-template-create',
  templateUrl: './test-template-create.component.html',
  styleUrls: ['./test-template-create.component.css']
})
export class TestTemplateCreateComponent implements OnInit {
  name = "";
  formCreate: FormGroup;
  formTestName: FormGroup;
  sendExercise: boolean;
  testExercises: TestExercise[] = [];
  selectedType: TestType;
  send: boolean;
  addMode = true;
  indexExercise: number;

  constructor(private formBuilder: FormBuilder,
    private testTemplateService: TestTemplateService,
    private router: Router,
    private customAlertService: CustomAlertService) {
    this.formTestName = this.formBuilder.group({
      testName: ['', Validators.required],
    });
    this.formCreate = this.formBuilder.group({
      type: [0, Validators.required],
      name: ['', Validators.required],
      minutes: 0,
      seconds: 0,
      video: ''
    });
    this.selectType(0);
  }

  ngOnInit() {

  }


  get f() {
    return this.formCreate.controls;
  }

  get g() {
    return this.formTestName.controls;
  }

  selectType(type) { 
    console.log(this.formCreate.value.type);
    switch (type) {
      case 0:
        this.selectedType = type;
        this.formCreate.get('video').disable();
        this.formCreate.get('minutes').disable();
        this.formCreate.get('seconds').disable();
        break;
      case '1':
        this.selectedType = TestType.HeartRate;
        this.formCreate.get('video').disable();
        this.formCreate.get('minutes').disable();
        this.formCreate.get('seconds').disable();
        break;
      case '2':
        this.selectedType = TestType.Repetition;
        this.formCreate.get('video').disable();
        this.formCreate.get('minutes').enable();
        this.formCreate.get('seconds').enable();
        break;
      case '3':
        this.selectedType = TestType.video;
        this.formCreate.get('video').enable();
        this.formCreate.get('minutes').disable();
        this.formCreate.get('seconds').disable();
        break;
      default:
    }
  }

  completeFormEdit(exercise, i) {
    this.indexExercise = i;
    this.formCreate.patchValue({
      type: exercise.testType,
      name: exercise.name,
      minutes: exercise.minutes,
      seconds: exercise.seconds,
      video: exercise.video
    });
    this.addMode = false;
    this.selectType(exercise.testType.toString());
  }

  editExercise() {
    let exercise = this.createExercise();
    this.testExercises[this.indexExercise].name = exercise.name;
    this.testExercises[this.indexExercise].testType = exercise.testType;
    this.testExercises[this.indexExercise].minutes = exercise.minutes;
    this.testExercises[this.indexExercise].seconds = exercise.seconds;
    this.editCancel();
  }

  editCancel() {
    this.addMode = true;
    this.formCreate.patchValue({
      type: 0,
      name: '',
      minutes: 0,
      seconds: 0,
      video: ''
    });
    this.selectType(0);
  }

  createExercise() {
    let exercise = new TestExercise();
    exercise.name = this.formCreate.value.name;
    exercise.testType = this.selectedType;
    if (this.formCreate.value.minutes == undefined) { exercise.minutes = 0 } else { exercise.minutes = this.formCreate.value.minutes };
    if (this.formCreate.value.seconds == undefined) { exercise.seconds = 0 } else { exercise.seconds = this.formCreate.value.seconds };
    exercise.video = this.formCreate.value.video;
    console.log("ejercicio: ", exercise);
    this.sendExercise = false;
    return exercise;
  }

  createTestTemplate() {
    let test = new TestTemplate();
    test.name = this.formTestName.value.testName;
    test.testExercises = this.testExercises;
    return test;
  }


  addExercise() {
    this.sendExercise = true;
    if (this.formCreate.valid) {
      this.testExercises.push(this.createExercise());
      this.formCreate.patchValue({
        type: 0,
        name: '',
        minutes: 0,
        seconds: 0,
        video: ''
      })
    }
  }

  deleteExercise(i) {
    this.testExercises.splice(i, 1);
  }

  save() {
    this.send = true;
    if (this.formTestName.valid && this.testExercises.length>0) {
      this.testTemplateService.add(this.createTestTemplate()).subscribe(
        response => this.router.navigate(['/test-templates-list']),
        error => {
          console.error(error);
          if (error.status == 400) {
            this.customAlertService.displayAlert("Gestión de Test", error.error.errores);
          } if (error.status == 500) {
            this.customAlertService.displayAlert("Gestión de Test", ["Error al intentar guardar el test."]);
          }
        })
    }
  }

}
