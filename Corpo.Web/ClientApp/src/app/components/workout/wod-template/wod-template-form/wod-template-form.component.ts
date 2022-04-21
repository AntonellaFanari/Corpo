
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { fi } from 'date-fns/locale';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryExercises } from 'src/app/domain/category-exercises';
import { Exercise } from 'src/app/domain/exercise';
import { Tag } from 'src/app/domain/tag';
import { ExerciseItem, Wod, WodGroup, WodTemplate } from 'src/app/domain/wod';
import { Modality } from 'src/app/domain/wod/modality';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WodMemberService } from 'src/app/wod/wod-member.service';
import { WodTemplateService } from 'src/app/wod/wod-template.service';
import { WodMember } from '../../../../domain/wod-member';
import { WeeklyGoal } from '../../../../domain/wod/weekly-goal';
import { ModalityService } from '../../../../services/modality.service';
import { WeeklyGoalService } from '../../../../services/weekly-goal.service';

@Component({
  selector: 'app-wod-template-form',
  templateUrl: './wod-template-form.component.html',
  styleUrls: ['./wod-template-form.component.css']
})

export class WodTemplateFormComponent implements OnInit {

  filterExercise = "";
  exercises: Exercise[] = [];
  exercisesSelect: Array<any> = [];
  tags: Tag[] = [];
  checkboxToTags = [];
  categories: CategoryExercises[] = [];
  sendForm: boolean = false;
  modalities: Modality[] = []

  activeWodGroup: number = 0;
  selectedExercise: any;
  selectedModality: number;
  units: string;
  name: string
  detail: string;
  editDetail: boolean;
  mode = "None";
  value: number;
  goal: string;
  weeklyGoals: WeeklyGoal[] = [];
  weeklyGoalsDropdownSettings: IDropdownSettings = {};
  weeklyGoalsList: WeeklyGoal[] = [];
  selectedWeeklyGoals = [];
  checkedKgs: boolean;
  checkedPercentage: boolean;
  checkedRPE: boolean;
  checkedRPEs: boolean;
  checkedNone = true;
  validatorsRequiredModality: boolean;
  validatorsRequiredExercise: boolean;
  saved: boolean;
  modeEdit: boolean;
  intensityType = 0;
  intensity = 0;
  hidePercentageIntensity = true;
  validatorsIntensity: boolean;
  validatorsIntensityPercentage: boolean;
  validatorsIntensityNumber: boolean;

  constructor(private exerciseService: ExerciseService,
    private wodTemplateService: WodTemplateService,
    private wodMemberService: WodMemberService,
    private router: Router,
    private weeklyGoalService: WeeklyGoalService,
    private modalityService: ModalityService) {
  }

  @Input() wod: Wod;
  @Input() modeCreate: boolean;
  @Input() memberId: number;
  @Input() date: string;
  @Input() wodTemplateId: number;
  @Input() weekNumber: number;
  @Input() wodNumber: number;
  @Input() periodizationId: number;
  @Output() goBackEvent = new EventEmitter();
  @Output() saveEvent = new EventEmitter();
  @Output() updateWeek = new EventEmitter();


  ngOnInit() {
    console.log(this.wod);
    this.name = this.wod.name;
    this.goal = this.wod.goal;
    this.intensityType = this.wod.intensityType;
    this.intensity = this.wod.intensity;

    console.log(this.wod);
    this.checkedNone = true;
    this.mode = "None";
     
    console.log(this.weeklyGoalsList);
    this.getAll();
    this.getWeeklyGoals();
    this.getAllModalities();

  }

  ngOnChanges() {
    /**********THIS FUNCTION WILL TRIGGER WHEN PARENT COMPONENT UPDATES 'someInput'**************/
    //Write your code here  
  }

  getAllModalities() {
    this.modalityService.getAll().subscribe(
      response => {
        console.log(response);
        this.modalities = response.result
      },
      error => console.error(error)
    )
  }

  selectIntensityType(type) {

    this.intensityType = type;
    this.hidePercentageIntensity = this.hidePercentage(type);

  }

  hidePercentage(type) {
    if (type == 1) { return true } else { return false };
  }

  validate() {
    if (this.intensityType == 1) {
      if (this.intensity > 10 || this.intensity < 0) {
        this.validatorsIntensityNumber = true;
      } else {
        this.validatorsIntensityNumber = false;
      }
    } else {
      if (this.intensity > 100 || this.intensity < 0) {
        this.validatorsIntensityPercentage = true;
      } else {
        this.validatorsIntensityPercentage = false;
      }
    }
  }

  getWeeklyGoals() {
    this.weeklyGoalService.getAll().subscribe(
      response => {
        this.weeklyGoals = response.result;
        let goalsList = this.wod.goal.split("-");
        for (var i = 0; i < goalsList.length; i++) {
          let goal = this.weeklyGoals.find(x => x.goal == goalsList[i]);
          if (goal) {
            this.weeklyGoalsList.push(goal);
            this.selectedWeeklyGoals = this.weeklyGoalsList;
          }
          console.log(this.weeklyGoalsList);
        }

        this.weeklyGoalsDropdownSettings = {
          idField: 'id',
          textField: 'goal',
          enableCheckAll: true,
          selectAllText: "Seleccionar todos",
          unSelectAllText: "Deseleccionar todos",
          allowSearchFilter: true,
          closeDropDownOnSelection: true,
          searchPlaceholderText: "Buscar"
        };
      },
      error => console.error(error))
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  addExercise() {

    if (this.wod.wodGroups.length == 0) {
      this.addwodGroup();
    }

    if (this.selectedExercise !== null && this.selectedExercise != undefined && this.selectedExercise !== "" && this.selectedModality !== null) {
      var exercise = this.exercises.find(x => x.id == this.selectedExercise);
      var exerciseItem = new ExerciseItem();
      exerciseItem.exercise = exercise;
      exerciseItem.modality = this.modalities.find(x => x.id == this.selectedModality);
      exerciseItem.units = this.units;
      if (this.mode == null) {
        exerciseItem.mode = "None";
      } else {
        exerciseItem.mode = this.mode;
      }

      exerciseItem.value = this.value;

      this.wod.wodGroups[this.activeWodGroup].addExercise(exerciseItem);

      this.selectedModality = null;
      this.selectedExercise = "";
      this.units = null;
      this.selectMode("None");
      this.value = 0;
    } else {
      if (this.selectedExercise == null || this.selectedExercise == "") {
        this.validatorsRequiredExercise = true;
      } if (this.selectedModality == null) {
        this.validatorsRequiredModality = true;
      }
    }
    
  }

  selectExercise() {
    this.validatorsRequiredExercise = false;
  }

  selectModality() {
    this.validatorsRequiredModality = false;
  }

  selectMode(mode) {
    console.log(mode);
    this.mode = mode;
    switch (mode) {
      case "Kgs":
        this.checkedKgs = true;
        break;
      case "%":
        this.checkedPercentage = true;
        break;
      case "RPE":
        this.checkedRPE = true;
        break;
      case "RPEs":
        this.checkedRPEs = true;
        break;
      case "None":
        this.checkedKgs = false;
        this.checkedNone = true;
        break;
      default:
    }
  }

  changeValue() {
  }

  addwodGroupModal() {
    console.log("lksdjflds")
    document.getElementById("group-name-modal").click();
  }

  addwodGroup() {
    this.wod.addGroup(new WodGroup(this.createGuid(), this.detail))
    this.activeWodGroup = this.wod.wodGroups.length - 1;
    this.detail = "";
  }

  editwodGroup() {
    this.wod.wodGroups[this.activeWodGroup].detail = this.detail;
    this.editDetail = false;
  }

  editGroupDetail(detail) {
    this.editDetail = true;
    this.detail = detail;
    document.getElementById("group-name-modal").click();
  }

  deleteItem(groupIndex, exerciseIndex) {
    this.wod.wodGroups[groupIndex].exercises.splice(exerciseIndex, 1);
  }

  setActiveWodGroup(index: number) {
    this.activeWodGroup = index;
    console.log(index)
    return;
  }

  deleteGroup(index) {
    this.wod.wodGroups.splice(index, 1);
    if (this.activeWodGroup == index)
      this.activeWodGroup = 0;
  }

  save() {
      var wod = this.getWod(this.wod);
      wod.id = this.wod.id;
      this.wodMemberService.update(wod).subscribe(
        response => {
          console.log(response);
          console.log("success");
          this.saved = true;
          this.checkedKgs = false;
          this.checkedPercentage = false;
          this.checkedRPE = false;
          this.checkedRPEs = false;
          this.checkedNone = true;
        }, error => {
          console.log(error)
        })
   
  }


  getWod(wod) {
    var wodMember = new WodMember();
    wod.wodGroups.forEach(g => {
      g.exercises.forEach(e => {
        wodMember.wodGroupsMember.push({
          detail: g.detail,
          groupIndex: g.groupIndex,
          exerciseId: e.exercise.id,
          modalityId: e.modality.id,
          units: e.units,
          mode: e.mode,
          value: e.value
        })
      })
    })
    wodMember.goal = this.goal;
    wodMember.periodizationId = this.periodizationId;
    wodMember.weekNumber = this.weekNumber;
    wodMember.wodNumber = this.wodNumber;
    wodMember.memberId = this.memberId;
    wodMember.attended = "false";
    wodMember.intensityType = this.intensityType;
    wodMember.intensity = this.intensity;
    return wodMember;
  }

  goBack() {
    this.goBackEvent.emit()
  }

  getAll() {
    this.exerciseService.getAll().subscribe(
      result => {
        this.exercises = result;
        this.exercisesSelect = this.exercises.map(x => ({ label: x.name, value: x.id }));
      },
      error => console.error(error)
    )
    this.exerciseService.getAllTags().subscribe(
      result => {
        this.tags = result;
        for (let i = 0; i < this.tags.length; i++) {
          let tagCheck: { tag: string, checked: boolean, id: number } = { tag: '', checked: false, id: 0 };
          tagCheck.tag = this.tags[i].name;
          tagCheck.checked = false;
          tagCheck.id = this.tags[i].id;
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

  onItemSelect(goal) {
    this.weeklyGoalsList.push(goal);
    this.getGoal();
  }

  onSelectAll(goals) {
    this.weeklyGoalsList = [];
    this.goal = "";
    for (var i = 0; i < goals.length; i++) {
      this.weeklyGoalsList.push(goals[i]);
    };
    this.getGoal();
    console.log(this.weeklyGoalsList);
  }

  onItemDeSelect(goal) {
    let index1 = this.weeklyGoalsList.findIndex(x => x.id == goal.id);
    this.weeklyGoalsList.splice(index1, 1);
    this.getGoal();

  }

  onDeSelectAll() {
    this.weeklyGoalsList = [];
    this.getGoal();
  }

  getGoal() {
    this.goal = "";
    for (var i = 0; i < this.weeklyGoalsList.length; i++) {
      if (i == 0) {
        this.goal = this.weeklyGoalsList[i].goal;
      } else {
        this.goal = this.goal + "-" + this.weeklyGoalsList[i].goal;
      }
      this.wod.goal = this.goal;
    }
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

  drop(event: CdkDragDrop<string[]>) {
    console.log("dfdsf")
    console.log("sdfd", event)
    var previousIndex = this.wod.wodGroups[this.activeWodGroup].groupIndex;
    moveItemInArray(this.wod.wodGroups, event.previousIndex, event.currentIndex);
    if (event.previousIndex == this.activeWodGroup)
      this.activeWodGroup = event.currentIndex;

    else {
      this.activeWodGroup = this.wod.wodGroups.findIndex(x => x.groupIndex == previousIndex)
    }
    return;
  }
  increaseUnit(groupIndex, exerciseIndex) {
    var units = (parseInt(this.wod.wodGroups[groupIndex].exercises[exerciseIndex].units) - 1);
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].units = (units > 0) ? units.toString() : "0"
  }

  dencreaseUnit(groupIndex, exerciseIndex) {
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].units = (parseInt(this.wod.wodGroups[groupIndex].exercises[exerciseIndex].units) + 1).toString()
  }


  updateUnits(groupIndex, exerciseIndex, event) {
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].units = event.target.innerHTML;
  }

  updateValue(groupIndex, exerciseIndex, event) {
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].value = parseInt(event.target.innerHTML);
  }


  increaseValue(groupIndex, exerciseIndex) {
    var value = (this.wod.wodGroups[groupIndex].exercises[exerciseIndex].value - 1);
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].value = (value > 0) ? value : 0
  }

  dencreaseValue(groupIndex, exerciseIndex) {
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].value = (this.wod.wodGroups[groupIndex].exercises[exerciseIndex].value + 1)
  }
  
}

