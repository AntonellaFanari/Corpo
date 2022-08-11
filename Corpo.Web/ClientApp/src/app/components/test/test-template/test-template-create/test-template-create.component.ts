import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExerciseFms } from '../../../../domain/test/exercise-fms';
import { TestExercise, TestType } from '../../../../domain/test/test-exercise';
import { TestTemplate } from '../../../../domain/test/test-template';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { TestTemplateService } from '../../../../services/test-template.service';

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
  exercisesFMS: ExerciseFms[] = [];
  exerciseFmsId: number;
  level: number;

  constructor(private formBuilder: FormBuilder,
    private testTemplateService: TestTemplateService,
    private router: Router,
    private customAlertService: CustomAlertService) {
    this.formTestName = this.formBuilder.group({
      level: ['', Validators.required],
    });
    this.formCreate = this.formBuilder.group({
      type: [0, Validators.required],
      name: ['', Validators.required],
      protocol: ['', Validators.required],
      minutes: 0,
      seconds: 0,
      video: '',
      exerciseFmsId: [0, Validators.required]
    });
    this.selectType(0);
  }

  ngOnInit() {
    this.getExercisesFMS();
  }


  getExercisesFMS() {
    this.testTemplateService.getAllExercisesFMS().subscribe(
      response => this.exercisesFMS = response.result,
      error => console.error(error)
    )
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
    this.sendExercise = false;
    this.indexExercise = i;
    this.formCreate.patchValue({
      type: exercise.testType,
      name: exercise.name,
      protocol: exercise.protocol,
      minutes: exercise.minutes,
      seconds: exercise.seconds,
      video: exercise.video,
      exerciseFmsId: exercise.exerciseFmsId
    });
    this.addMode = false;
    this.selectType(exercise.testType.toString());
  }

  editExercise() {
    this.sendExercise = true;
    let exercise = this.createExercise();
    if (exercise != null) {
      let exerciseRepeatedName = this.testExercises.find(x => x.name.toLowerCase() == exercise.name && x.testType == exercise.testType);
      if (!exerciseRepeatedName) {
        this.testExercises[this.indexExercise].name = exercise.name;
        this.testExercises[this.indexExercise].protocol = exercise.protocol;
        this.testExercises[this.indexExercise].testType = exercise.testType;
        this.testExercises[this.indexExercise].minutes = exercise.minutes;
        this.testExercises[this.indexExercise].seconds = exercise.seconds;
        this.editCancel();
      } else {
        this.customAlertService.displayAlert("Gestión de Test", ["Ejercicio ya agregado"]);
      }
    }
  }

  editCancel() {
    this.addMode = true;
    this.formCreate.patchValue({
      type: 0,
      name: '',
      protocol:'',
      minutes: 0,
      seconds: 0,
      video: ''
    });
    this.sendExercise = false;
    this.selectType(0);
  }

  selectExerciseFms(id) {
    let exercise = this.exercisesFMS.find(x => x.id == id);
    console.log("exercise-fms: ", exercise);
    this.formCreate.patchValue({ name: exercise.name });
    this.exerciseFmsId = exercise.id;
  }

  createExercise() {
    if (this.formCreate.valid && this.formCreate.value.type !=0) {
      let exercise = new TestExercise();
      exercise.name = this.formCreate.value.name;
      exercise.protocol = this.formCreate.value.protocol;
      exercise.testType = this.selectedType;
      if (this.formCreate.value.minutes == undefined) { exercise.minutes = 0 } else { exercise.minutes = this.formCreate.value.minutes };
      if (this.formCreate.value.seconds == undefined) { exercise.seconds = 0 } else { exercise.seconds = this.formCreate.value.seconds };
      exercise.video = this.formCreate.value.video;
      if (this.formCreate.value.type == TestType.video) { exercise.exerciseFmsId = this.exerciseFmsId };
      console.log("ejercicio: ", exercise);
      return exercise;
    } else {
      return null;
    }
    
  }

  createTestTemplate() {
    let test = new TestTemplate();
    test.level = this.formTestName.value.level;
    test.testExercises = this.testExercises;
    return test;
  }


  addExercise() {
    this.sendExercise = true;
    let exercise = this.createExercise();
    if (exercise != null) {
      let exerciseRepeatedName = this.testExercises.find(x => x.name.toLowerCase() == exercise.name && x.testType == exercise.testType);
      if (exerciseRepeatedName == null) {
        this.testExercises.push(exercise);
        this.editCancel();
      } else {
        this.customAlertService.displayAlert("Gestión de Test", ["Ejercicio ya agregado"]);
      }
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
