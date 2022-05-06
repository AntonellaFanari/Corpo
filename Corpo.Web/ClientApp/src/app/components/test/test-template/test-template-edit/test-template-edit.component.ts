import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestExercise, TestType } from '../../../../domain/test/test-exercise';
import { TestTemplate } from '../../../../domain/test/test-template';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { TestTemplateService } from '../../../../services/test-template.service';

@Component({
  selector: 'app-test-template-edit',
  templateUrl: './test-template-edit.component.html',
  styleUrls: ['./test-template-edit.component.css']
})
export class TestTemplateEditComponent implements OnInit {
  name = "";
  formEdit: FormGroup;
  formTestName: FormGroup;
  sendExercise: boolean;
  testExercises: TestExercise[] = [];
  selectedType: TestType;
  id: number;
  testTemplate: TestTemplate;
  exerciseId: number;
  addMode = true;
  send: boolean;
  indexExercise: number;

  constructor(private formBuilder: FormBuilder,
    private testTemplateService: TestTemplateService,
    private router: Router,
    private customAlertService: CustomAlertService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formTestName = this.formBuilder.group({
      testName: ['', Validators.required],
    });
    this.formEdit = this.formBuilder.group({
      type: [0, Validators.required],
      name: ['', Validators.required],
      minutes: 0,
      seconds: 0,
      video: ''
    });
    this.selectType(0);
  }

  ngOnInit() {
    this.getById();
  }

  getById() {
    this.testTemplateService.getById(this.id).subscribe(
      response => {
        console.log(response.result);
        this.testTemplate = response.result;
        this.testExercises = this.testTemplate.testExercises;
        this.name = this.testTemplate.name;
        this.formTestName.patchValue({
          testName: this.testTemplate.name
        })
      },
      error => console.error(error)
    )
  }


  get f() {
    return this.formEdit.controls;
  }

  get g() {
    return this.formTestName.controls;
  }

  selectType(type) {
    console.log(this.formEdit.value.type);
    switch (type) {
      case 0:
        this.selectedType = type;
        this.formEdit.get('video').disable();
        this.formEdit.get('minutes').disable();
        this.formEdit.get('seconds').disable();
        break;
      case '1':
        this.selectedType = TestType.HeartRate;
        this.formEdit.get('video').disable();
        this.formEdit.get('minutes').disable();
        this.formEdit.get('seconds').disable();
        break;
      case '2':
        this.selectedType = TestType.Repetition;
        this.formEdit.get('video').disable();
        this.formEdit.get('minutes').enable();
        this.formEdit.get('seconds').enable();
        break;
      case '3':
        this.selectedType = TestType.video;
        this.formEdit.get('video').enable();
        this.formEdit.get('minutes').disable();
        this.formEdit.get('seconds').disable();
        break;
      default:
    }
  }

  completeFormEdit(exercise, i) {
    this.indexExercise = i;
    this.sendExercise = false;
    this.formEdit.patchValue({
      type: exercise.testType,
      name: exercise.name,
      minutes: exercise.minutes,
      seconds: exercise.seconds,
      video: exercise.video
    });
    this.addMode = false;
    this.exerciseId = exercise.id;
    this.selectType(exercise.testType.toString());
  }

  createExercise() {
    if (this.formEdit.valid && this.formEdit.value.type != 0) {
      let exercise = new TestExercise();
      exercise.name = this.formEdit.value.name;
      exercise.testType = this.selectedType;
      if (this.formEdit.value.minutes == undefined) { exercise.minutes = 0 } else { exercise.minutes = this.formEdit.value.minutes };
      if (this.formEdit.value.seconds == undefined) { exercise.seconds = 0 } else { exercise.seconds = this.formEdit.value.seconds };
      exercise.video = this.formEdit.value.video;
      console.log("ejercicio: ", exercise);
      /* this.sendExercise = false;*/
      return exercise;
    } else {
      return null;
    }
  
  }

  createTestTemplate() {
    let test = new TestTemplate();
    test.id = this.testTemplate.id;
    test.name = this.formTestName.value.testName;
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

  editExercise() {
    this.sendExercise = true;
    let exercise = this.createExercise();
    if (exercise != null) {
      let exerciseRepeatedName = this.testExercises.find(x => x.name.toLowerCase() == exercise.name && x.testType == exercise.testType);
      if (!exerciseRepeatedName) {
        this.testExercises[this.indexExercise].name = exercise.name;
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
    this.formEdit.patchValue({
      type: 0,
      name: '',
      minutes: 0,
      seconds: 0,
      video: ''
    });
    this.sendExercise = false;
    this.selectType(0);
  }

  deleteExercise(i) {
    this.testExercises.splice(i, 1);
  }

  save() {
    this.send = true;
    if (this.formTestName.valid) {
      this.testTemplateService.update(this.createTestTemplate()).subscribe(
        response => this.router.navigate(['/test-templates-list']),
        error => {
          console.error(error);
          if (error.status == 400) {
            this.customAlertService.displayAlert("Gestión de Test", error.error.errores);
          } if (error.status == 500) {
            this.customAlertService.displayAlert("Gestión de Test", ["Error al intentar modificar el test."]);
          }
        })
    }
  }

}
