import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberView } from '../../../../domain/member-view';
import { TestExercise, TestType } from '../../../../domain/test/test-exercise';
import { TestExerciseMember } from '../../../../domain/test/test-exercise-member';
import { StatusTest, TestMember } from '../../../../domain/test/test-member';
import { TestTemplate } from '../../../../domain/test/test-template';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { MemberService } from '../../../../services/member.service';
import { TestMemberService } from '../../../../services/test-member.service';
import { TestTemplateService } from '../../../../services/test-template.service';

@Component({
  selector: 'app-test-assignment-create',
  templateUrl: './test-assignment-create.component.html',
  styleUrls: ['./test-assignment-create.component.css']
})
export class TestAssignmentCreateComponent implements OnInit {
  memberId: number;
  id: number;
  formCreate: FormGroup;
  sendExercise: boolean;
  testExercises: TestExercise[] = [];
  testExercisesMember: TestExerciseMember[] = [];
  selectedType: TestType;
  testTemplate: TestTemplate;
  exerciseId: number;
  addMode = true;
  send: boolean;
  member: MemberView;
  indexExercise: number;

  constructor(private route: ActivatedRoute,
    private memberService: MemberService,
    private formBuilder: FormBuilder,
    private testTemplateService: TestTemplateService,
    private customAlertService: CustomAlertService,
    private router: Router,
    private testMemberService: TestMemberService) {
    this.route.queryParams.subscribe(
      params => {
        this.id = parseInt(params['id']);
        this.getTestById();
        console.log("id: ", this.id);
        this.memberId = parseInt(params['memberId']);
        this.getMemberById();
        console.log("id socio: ", this.memberId);
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

  getMemberById() {
    this.memberService.getById(this.memberId).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response;
      },
      error => console.error(error)
    )
  }

  getTestById() {
    this.testTemplateService.getById(this.id).subscribe(
      response => {
        console.log(response.result);
        this.testTemplate = response.result;
        this.testExercises = this.testTemplate.testExercises;
        this.testExercises.forEach(x => {
          let exercise = new TestExerciseMember();
          exercise.name = x.name;
          exercise.testType = x.testType;
          exercise.minutes = x.minutes;
          exercise.seconds = x.seconds;
          exercise.video = x.video;
          exercise.status = StatusTest.pending;
          this.testExercisesMember.push(exercise);
        })
      },
      error => console.error(error)
    )
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
      minutes: exercise.minutes,
      seconds: exercise.seconds,
      video: exercise.video
    });
    this.addMode = false;
    this.exerciseId = exercise.id;
    this.selectType(exercise.testType.toString());
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
    this.sendExercise = false;
    this.selectType(0);
  }

  deleteExercise(i) {
    this.testExercisesMember.splice(i, 1);
  }


  createTestMember() {
    let test = new TestMember();
    test.name = this.testTemplate.name;
    test.memberId = this.memberId;
    test.testExercisesMember = this.testExercisesMember;
    test.testTemplateId = this.testTemplate.id;
    return test;
  }


  createExercise() {
    if (this.formCreate.valid && this.formCreate.value.type != 0) {
      let exercise = new TestExerciseMember();
      exercise.name = this.formCreate.value.name;
      exercise.testType = this.selectedType;
      exercise.status = StatusTest.pending;
      if (this.formCreate.value.minutes == undefined) { exercise.minutes = 0 } else { exercise.minutes = this.formCreate.value.minutes };
      if (this.formCreate.value.seconds == undefined) { exercise.seconds = 0 } else { exercise.seconds = this.formCreate.value.seconds };
      exercise.video = this.formCreate.value.video;
      console.log("ejercicio: ", exercise);
      this.sendExercise = false;
      return exercise;
    } else {
      return null;
    }
  
  }

  addExercise() {
    this.sendExercise = true;
    let exercise = this.createExercise();
    if (exercise != null) {
      let exerciseRepeatedName = this.testExercisesMember.find(x => x.name.toLowerCase() == exercise.name && x.testType == exercise.testType);
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
        this.testExercisesMember[this.indexExercise].testType = exercise.testType;
        this.testExercisesMember[this.indexExercise].minutes = exercise.minutes;
        this.testExercisesMember[this.indexExercise].seconds = exercise.seconds;
        this.testExercisesMember[this.indexExercise].status = exercise.status;
        this.editCancel();
      } else {
        this.customAlertService.displayAlert("Gestión de Test", ["Ejercicio ya agregado"]);
      }
    }
  }

  save() {
    this.send = true;
    if (this.testExercises.length > 0) {
      this.testMemberService.add(this.createTestMember()).subscribe(
        response => this.router.navigate(['/test-asignados-list'], { queryParams: { id: this.memberId } }),
        error => {
          console.error(error);
          if (error.status == 400) {
            this.customAlertService.displayAlert("Gestión de Test", error.error.errores);
          } if (error.status == 500) {
            this.customAlertService.displayAlert("Gestión de Test", ["Error al intentar asignar el test."]);
          }
        })
    }
  }

}
