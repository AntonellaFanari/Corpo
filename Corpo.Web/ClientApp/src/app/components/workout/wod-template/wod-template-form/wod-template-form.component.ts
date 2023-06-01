
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
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
import { AmrapComponent } from '../../wod-modality/amrap/amrap.component';
import { EmomComponent } from '../../wod-modality/emom/emom.component';
import { RestTimeComponent } from '../../wod-modality/rest-time/rest-time.component';
import { ShortestPossibleTimeComponent } from '../../wod-modality/shortest-possible-time/shortest-possible-time.component';
import { StaggeredComponent } from '../../wod-modality/staggered/staggered.component';
import { TabataComponent } from '../../wod-modality/tabata/tabata.component';
import { TimersComponent } from '../../wod-modality/timers/timers.component';

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
 selectedExercise: any;
  activeWodGroup: number = 0;
 
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
  intensityType = 0;
  intensity = 0;
  hidePercentageIntensity = true;
  validatorsIntensity: boolean;
  validatorsIntensityPercentage: boolean;
  validatorsIntensityNumber: boolean;
  selectedExerciseView: any;
  modality: string;
  rounds: number;
  requesting = false;
  time: number;
  series: number;
  pauseBetweenRounds: number;
  pauseBetweenExercises: number;
  staggeredType: string;
  staggeredValue: number;
  previousActiveWodGroup: number;
  modeEditStaggered = false;

  @ViewChild(ShortestPossibleTimeComponent, { static: false }) modalityShortesPossibleTime: ShortestPossibleTimeComponent;
  @ViewChild(AmrapComponent, { static: false }) modalityAmrap: AmrapComponent;
  @ViewChild(EmomComponent, { static: false }) modalityEmom: EmomComponent;
  @ViewChild(StaggeredComponent, { static: false }) modalityStaggered: StaggeredComponent;
  @ViewChild(TimersComponent, { static: false }) modalityTimers: TimersComponent;
  @ViewChild(RestTimeComponent, { static: false }) modalityRestTime: RestTimeComponent;
  @ViewChild(TabataComponent, { static: false }) modalityTabata: TabataComponent;

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
  @Input() modeWodMember: boolean;
  @Input() modeQuery = false;
  @Input() planned: string;


  ngOnInit() {
    console.log(this.wod);
    this.name = this.wod.name;
    this.goal = this.wod.goal;
    this.intensityType = this.wod.intensityType;
    this.intensity = this.wod.intensity;

    console.log(this.wod);
     
    console.log(this.weeklyGoalsList);
    this.getAll();
    this.getWeeklyGoals();
    this.getAllModalities();

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("realizado:", this.planned);
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


  selectExercise() {
    this.validatorsRequiredExercise = false;
  }

  selectExerciseView(exercise) {
    console.log("ejercicio mostrar: ", exercise)
    this.selectedExerciseView = exercise;
  }

  selectModality() {
    this.validatorsRequiredModality = false;
    console.log("modalidad: ", this.selectedModality);
    this.modality = this.modalities.find(x => x.id == this.selectedModality).name;
    this.modeEditStaggered = false; 
    this.clearModality();
    this.addwodGroup();

  }

  clearModality() {
    switch (this.modality) {
      case 'Tiempo':
        this.modalityShortesPossibleTime.clearData();
        break;
      case 'AMRAP':
        this.modalityAmrap.clearData();
        break;
      case 'EMOM':
        this.modalityEmom.clearData();
        break;
      case 'Escalera':
        this.modalityStaggered.clearData();
        break;
      case 'Timers':
        this.modalityTimers.clearData();
        break;
      case 'Rest Time':
        this.modalityRestTime.clearData();
        break;
      case 'Rondas':
        this.modalityShortesPossibleTime.clearData();
        break;
      case 'Tabata':
        this.modalityTabata.clearData();
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
    this.clearModality();
    this.modeEditStaggered = false;
    console.log("modalidad seleccionada: ", this.selectedModality);
    if (this.selectedModality) {
      this.validatorsRequiredModality = false;
      this.detail = "Modalidad: " + this.modality;
      this.rounds = 0;
      this.resetInputs();
      let staggeredModality = this.modalities.find(x => x.name == "Escalera").id;
      this.wod.addGroup(new WodGroup(this.createGuid(),
        ((this.selectedModality == staggeredModality) ? "Modalidad: " + this.modality + " - " + "3 Series - Ascendente en 3" : this.detail),
        this.modality, this.selectedModality, this.rounds, this.series, this.time, this.staggeredType, this.staggeredValue, this.pauseBetweenRounds, this.pauseBetweenExercises));
      this.activeWodGroup = 0;
      this.detail = "";
    } else {
      this.validatorsRequiredModality = true;
    }

  }

  resetInputs() {
    this.rounds = 0;
    if (this.modality != "Escalera") {

      this.series = null;
      this.staggeredType = null;
      this.staggeredValue = null;
      this.time = null;
    }
    if (this.modality != "Rest Time") {
      this.pauseBetweenRounds = null;
      this.pauseBetweenExercises = null;
    }

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
    //if (this.wod.wodGroups.length == 1) this.activeWodGroup = 1;
    //this.previousActiveWodGroup = this.activeWodGroup;
    this.activeWodGroup = index;
    console.log(index);
    console.log("bloque activo: ", this.wod.wodGroups[index]);
    this.modality = this.wod.wodGroups[index].modality;
    this.getInformationWodGroupActive(index);
    this.selectedModality = this.modalities.find(x => x.name == this.modality).id;
    if (this.modality == 'Escalera') this.modeEditStaggered = true;
    //this.modalityShortesPossibleTime.rounds = activeWodGroup.rounds;
  }


  getInformationWodGroupActive(index) {
    switch (this.modality) {
      case 'Tiempo':
        this.modalityShortesPossibleTime.getRounds.emit(this.wod.wodGroups[index].rounds);
        this.modalityShortesPossibleTime.rounds = this.wod.wodGroups[index].rounds;
        break;
      case 'AMRAP':
        this.modalityAmrap.getTime.emit(this.wod.wodGroups[index].time);
        this.modalityAmrap.time = this.wod.wodGroups[index].time;
        break;
      case 'Escalera':
        let wodGroupStaggered = this.wod.wodGroups[index];
        let detailStaggered = { nSeries: wodGroupStaggered.series, staggeredType: wodGroupStaggered.staggeredType, staggeredValue: wodGroupStaggered.staggeredValue };
        this.modalityStaggered.getDetail.emit(detailStaggered);
        this.modalityStaggered.nSeries = this.wod.wodGroups[index].series;
        let staggeredType = this.modalityStaggered.staggeredTypes.find(x => x.type == this.wod.wodGroups[index].staggeredType).id;
        this.modalityStaggered.selectedStaggeredType = staggeredType;
        break;
      case 'Timers':
        this.modalityTimers.getRounds.emit(this.wod.wodGroups[index].rounds);
        this.modalityTimers.rounds = this.wod.wodGroups[index].rounds;
        break;
      case 'Rest Time':
        let wodGroupRestTime = this.wod.wodGroups[index];
        let detail = { rounds: wodGroupRestTime.rounds, pauseBetweenRounds: wodGroupRestTime.pauseBetweenRounds, pauseBetweenExercises: wodGroupRestTime.pauseBetweenExercises }; this.modalityStaggered.getDetail.emit(detail);
        this.modalityRestTime.pauseBetweenRounds = this.wod.wodGroups[index].pauseBetweenRounds;
        this.modalityRestTime.pauseBetweenExercises = this.wod.wodGroups[index].pauseBetweenExercises;
        break;
      default:
    }
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
          rounds: g.rounds,
          series: g.series,
          time: g.time,
          groupIndex: g.groupIndex,
          exerciseId: e.exercise.id,
          modalityId: g.modalityId,
          unitType: e.unitType,
          units: e.units,
          intensityType: e.intensityType,
          intensityValue: e.intensityValue,
          staggeredType: g.staggeredType,
          staggeredValue: g.staggeredValue,
          pauseBetweenRounds: g.pauseBetweenRounds,
          pauseBetweenExercises: g.pauseBetweenExercises,
          timeWork: e.timeWork,
          timeRest: e.timeRest
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
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].intensityValue = parseInt(event.target.innerHTML);
  }


  increaseValue(groupIndex, exerciseIndex) {
    var value = (this.wod.wodGroups[groupIndex].exercises[exerciseIndex].intensityValue - 1);
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].intensityValue = (value > 0) ? value : 0
  }

  dencreaseValue(groupIndex, exerciseIndex) {
    this.wod.wodGroups[groupIndex].exercises[exerciseIndex].intensityValue = (this.wod.wodGroups[groupIndex].exercises[exerciseIndex].intensityValue + 1)
  }



  getRounds(rounds) {
    console.log("rondas: ", rounds);
    this.rounds = rounds;
    this.wod.wodGroups[this.activeWodGroup].rounds = this.rounds;
    let modalityId = this.modalities.find(x => x.name == this.modality).id;
    this.wod.wodGroups[this.activeWodGroup].modalityId = modalityId;
    this.wod.wodGroups[this.activeWodGroup].modality = this.modality;
    this.wod.wodGroups[this.activeWodGroup].detail = "Modalidad: " + this.modality + " - " + this.rounds.toString() + " " + "Rondas";
  }

  getExercise(exercise) {
    console.log("ejercicio recibido: ", exercise);
    exercise.modality = this.modality;
    console.log("ejercicio recibido: ", exercise);
    this.wod.wodGroups[this.activeWodGroup].addExercise(exercise);
  }

  getTime(time) {
    this.time = time;
    this.wod.wodGroups[this.activeWodGroup].time = this.time;
    let modalityId = this.modalities.find(x => x.name == this.modality).id;
    this.wod.wodGroups[this.activeWodGroup].modalityId = modalityId;
    this.wod.wodGroups[this.activeWodGroup].modality = this.modality;
    this.wod.wodGroups[this.activeWodGroup].detail = "Modalidad: " + this.modality + " - " + this.time.toString() + " " + "Minutos";
  }

  getDetail(detail) {
    if (this.modality == "Escalera") {
      this.series = detail.nSeries;
      this.staggeredType = detail.staggeredType;
      this.staggeredValue = detail.staggeredValue;
      this.wod.wodGroups[this.activeWodGroup].series = this.series;
      this.wod.wodGroups[this.activeWodGroup].staggeredType = this.staggeredType;
      this.wod.wodGroups[this.activeWodGroup].staggeredValue = this.staggeredValue;
      let modalityId = this.modalities.find(x => x.name == this.modality).id;
      this.wod.wodGroups[this.activeWodGroup].modalityId = modalityId;
      this.wod.wodGroups[this.activeWodGroup].modality = this.modality;
      this.wod.wodGroups[this.activeWodGroup].detail = "Modalidad: " + this.modality + " - " + this.series.toString() + " Series - " + detail.staggeredType + ((detail.staggeredValue != 0) ? " en " + detail.staggeredValue : "");

    } else if (this.modality == "Rest Time") {
      this.rounds = detail.rounds;
      this.pauseBetweenRounds = detail.pauseBetweenRounds;
      this.pauseBetweenExercises = detail.pauseBetweenExercises;
      this.wod.wodGroups[this.activeWodGroup].rounds = this.rounds;
      this.wod.wodGroups[this.activeWodGroup].pauseBetweenRounds = this.pauseBetweenRounds;
      this.wod.wodGroups[this.activeWodGroup].pauseBetweenExercises = this.pauseBetweenExercises;
      let modalityId = this.modalities.find(x => x.name == this.modality).id;
      this.wod.wodGroups[this.activeWodGroup].modalityId = modalityId;
      this.wod.wodGroups[this.activeWodGroup].modality = this.modality;
      this.wod.wodGroups[this.activeWodGroup].detail = "Modalidad: " + this.modality + " - " + this.rounds.toString() + " Rondas - " + " Pausa entre rondas: " + detail.pauseBetweenRounds + "min. - Pausa entre ejercicios: " + detail.pauseBetweenExercises + "min.";

    }
  }

  editExerciseItem(exerciseItem, exerciseIndex, groupIndex) {
    this.setActiveWodGroup(groupIndex);

    switch (this.modality) {
      case 'Tiempo':
        this.modalityShortesPossibleTime.getEditExercise(exerciseItem);
        break;
      case 'AMRAP':
        this.modalityAmrap.getEditExercise(exerciseItem);
        break;
      case 'EMOM':
        this.modalityEmom.getEditExercise(exerciseItem);
        break;
      case 'Escalera':
        this.modalityStaggered.getEditExercise(exerciseItem);
        break;
      case 'Timers':
        this.modalityTimers.getEditExercise(exerciseItem);
        break;
      case 'Rest Time':
        this.modalityRestTime.getEditExercise(exerciseItem);
        break;
      case 'Rondas':
        this.modalityShortesPossibleTime.getEditExercise(exerciseItem);
        break;
      case 'Tabata':
        this.modalityTabata.getEditExercise(exerciseItem);
        break;
      default:
    }

    this.wod.wodGroups[this.activeWodGroup].exercises.splice(exerciseIndex, 1);
  }

  deleteClassSaved() {
    this.saved = false;
  }

  
}

