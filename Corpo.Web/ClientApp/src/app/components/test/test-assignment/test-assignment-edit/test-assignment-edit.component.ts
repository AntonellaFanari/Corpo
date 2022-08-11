import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExerciseFms } from '../../../../domain/test/exercise-fms';
import { TestExerciseMember, TestType } from '../../../../domain/test/test-exercise-member';
import { StatusTest, TestMember } from '../../../../domain/test/test-member';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { TestMemberService } from '../../../../services/test-member.service';
import { TestTemplateService } from '../../../../services/test-template.service';

@Component({
  selector: 'app-test-assignment-edit',
  templateUrl: './test-assignment-edit.component.html',
  styleUrls: ['./test-assignment-edit.component.css']
})
export class TestAssignmentEditComponent implements OnInit {
  name = "";
  formEdit: FormGroup;
  sendExercise: boolean;
  testExercisesMember: TestExerciseMember[] = [];
  selectedType: TestType;
  id: number;
  testMember: TestMember;
  exerciseId: number;
  addMode = true;
  send: boolean;
  indexExercise: number;
  exercisesFMS: ExerciseFms[] = [];
  exerciseFmsId: number;

  constructor(private formBuilder: FormBuilder,
    private testMemberService: TestMemberService,
    private router: Router,
    private customAlertService: CustomAlertService,
    private route: ActivatedRoute,
    private testTemplateService: TestTemplateService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
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
    this.getById();
    this.getExercisesFMS();
  }


  getExercisesFMS() {
    this.testTemplateService.getAllExercisesFMS().subscribe(
      response => this.exercisesFMS = response.result,
      error => console.error(error)
    )
  }

  getById() {
    this.testMemberService.getById(this.id).subscribe(
      response => {
        console.log(response.result);
        this.testMember = response.result;
        this.testExercisesMember = this.testMember.testExercisesMember;
      },
      error => console.error(error)
    )
  }


  get f() {
    return this.formEdit.controls;
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
      protocol: exercise.protocol,
      minutes: exercise.minutes,
      seconds: exercise.seconds,
      video: exercise.video,
      exerciseFmsId: exercise.exerciseFmsId
    });
    this.addMode = false;
    this.exerciseId = exercise.id;
    this.selectType(exercise.testType.toString());
  }


  createExercise() {
    if (this.formEdit.valid && this.formEdit.value.type != 0) {
      let exercise = new TestExerciseMember();
      exercise.name = this.formEdit.value.name;
      exercise.protocol = this.formEdit.value.protocol;
      exercise.testType = this.selectedType;
      exercise.status = StatusTest.pending;
      if (this.formEdit.value.minutes == undefined) { exercise.minutes = 0 } else { exercise.minutes = this.formEdit.value.minutes };
      if (this.formEdit.value.seconds == undefined) { exercise.seconds = 0 } else { exercise.seconds = this.formEdit.value.seconds };
      exercise.video = this.formEdit.value.video;
      if (this.formEdit.value.type == TestType.video) { exercise.exerciseFmsId = this.exerciseFmsId };
      console.log("ejercicio: ", exercise);
      this.sendExercise = false;
      return exercise;
    } else {
      return null
    }
    
  }

  selectExerciseFms(id) {
    let exercise = this.exercisesFMS.find(x => x.id == id);
    console.log("exercise-fms: ", exercise);
    this.formEdit.patchValue({ name: exercise.name });
    this.exerciseFmsId = exercise.id;
  }


  createTestTemplate() {
    let test = new TestMember();
    test.id = this.testMember.id;
    test.level = this.testMember.level;
    test.testExercisesMember = this.testExercisesMember;
    return test;
  }


  addExercise() {
    this.sendExercise = true;
    let exercise = this.createExercise();
    if (exercise != null) {
      let exerciseRepeatedName = this.testExercisesMember.find(x => x.name.toLowerCase() == exercise.name);
      if (exerciseRepeatedName == null) {
        this.testExercisesMember.push(exercise);
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
      let exerciseRepeatedName = this.testExercisesMember.find(x => x.name.toLowerCase() == exercise.name && x.testType == exercise.testType);
      if (!exerciseRepeatedName) {
        this.testExercisesMember[this.indexExercise].name = exercise.name;
        this.testExercisesMember[this.indexExercise].protocol = exercise.protocol;
        this.testExercisesMember[this.indexExercise].testType = exercise.testType;
        this.testExercisesMember[this.indexExercise].minutes = exercise.minutes;
        this.testExercisesMember[this.indexExercise].seconds = exercise.seconds;
        this.testExercisesMember[this.indexExercise].exerciseFmsId = exercise.exerciseFmsId;
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
      protocol: '',
      minutes: 0,
      seconds: 0,
      video: '',
      exerciseFmsId: 0
    });
    this.sendExercise = false;
    this.selectType(0);
  }

  deleteExercise(i) {
    this.testExercisesMember.splice(i, 1);
  }

  save() {
    this.send = true;
    this.testMemberService.update(this.createTestTemplate()).subscribe(
      response => {
        console.log("id socio: ", this.testMember.memberId);
        this.router.navigate(['/test-asignados-list'], { queryParams: { id: this.testMember.memberId } })
      },
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

