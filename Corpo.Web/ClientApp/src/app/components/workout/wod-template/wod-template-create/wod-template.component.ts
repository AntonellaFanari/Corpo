import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import id from 'date-fns/esm/locale/id/index.js';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryExercises } from 'src/app/domain/category-exercises';
import { Exercise } from 'src/app/domain/exercise';
import { Tag } from 'src/app/domain/tag';
import { ExerciseItem, Wod, WodGroup, WodTemplate } from 'src/app/domain/wod';
import { Modality } from 'src/app/domain/wod/modality';
import { CustomAlertService } from 'src/app/services/custom-alert.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { WodTemplateService } from 'src/app/wod/wod-template.service';
import { WeeklyGoal } from '../../../../domain/wod/weekly-goal';
import { ModalityService } from '../../../../services/modality.service';
import { WeeklyGoalService } from '../../../../services/weekly-goal.service';
import { AmrapComponent } from '../../wod-modality/amrap/amrap.component';
import { EmomComponent } from '../../wod-modality/emom/emom.component';
import { RestTimeComponent } from '../../wod-modality/rest-time/rest-time.component';
import { ShortestPossibleTimeComponent } from '../../wod-modality/shortest-possible-time/shortest-possible-time.component';
import { StaggeredComponent } from '../../wod-modality/staggered/staggered.component';
import { TimersComponent } from '../../wod-modality/timers/timers.component';



@Component({
  selector: 'app-wod-template',
  templateUrl: './wod-template.component.html',
  styleUrls: ['./wod-template.component.css']
})
export class WodTemplateComponent implements OnInit {

  filterExercise = "";
  exercises: Exercise[] = [];
  exercisesSelect: Array<any> = [];
  tags: Tag[] = [];
  checkboxToTags = [];
  categories: CategoryExercises[] = [];
  sendForm: boolean = false;
  modalities: Modality[] = []
  wod: Wod = new Wod();
  activeWodGroup: number = 0;
  selectedExercise: any;
  selectedModality: number;
  units: string;
  name: string;
  detail: string;
  editDetail: boolean;
  value: number;
  validationError: boolean;
  mode: string = "None";
  weeklyGoalsDropdownSettings: IDropdownSettings = {};
  weeklyGoals: WeeklyGoal[] = [];
  weeklyGoalsList: WeeklyGoal[] = [];
  goal = "";
  selectedCategory: any;
  checkedTags: any[] = [];
  validatorsRequiredExercise: boolean;
  validatorsRequiredModality: boolean;
  validatorsRequiredName: boolean;
  validatorsRequiredGoal: boolean;
  checkedKgs: boolean;
  checkedPercentage: boolean;
  checkedRPE: boolean;
  checkedRPEs: boolean;
  checkedNone = true;
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
  modeWodMember = false;
  modeEditStaggered = false;

  @ViewChild(ShortestPossibleTimeComponent, { static: false }) modalityShortesPossibleTime: ShortestPossibleTimeComponent;
  @ViewChild(AmrapComponent, { static: false }) modalityAmrap: AmrapComponent;
  @ViewChild(EmomComponent, { static: false }) modalityEmom: EmomComponent;
  @ViewChild(StaggeredComponent, { static: false }) modalityStaggered: StaggeredComponent;
  @ViewChild(TimersComponent, { static: false }) modalityTimers: TimersComponent;
  @ViewChild(RestTimeComponent, { static: false }) modalityRestTime: RestTimeComponent;

  constructor(private exerciseService: ExerciseService,
    private wodTemplateService: WodTemplateService,
    private modalityService: ModalityService,
    private weeklyGoalService: WeeklyGoalService,
    private router: Router,
    private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requesting = true;
    this.checkedNone = true;
    this.mode = "None";
    this.getAll();
    this.getModalities();
    //this.wod.addGroup(new WodGroup(this.createGuid()));
    this.getWeeklyGoals();
    this.weeklyGoalsDropdownSettings = {
      idField: 'id',
      textField: 'goal',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      allowSearchFilter: true,
      searchPlaceholderText: "Buscar",
      noDataAvailablePlaceholderText: "No hay objetivos"
    };
  }

  getWeeklyGoals() {
    this.weeklyGoalService.getAll().subscribe(
      response => this.weeklyGoals = response.result,
      error => console.error(error))
  }



  getModalities() {
    this.modalityService.getAll().subscribe(
      response => {
        this.requesting = false;
        this.modalities = response.result;
      },
      error => this.requesting = false
    )
  }

  selectCategory(id) {
    this.selectedCategory = id;
    this.filterByCategory();
  }

  selectExercise() {
    this.validatorsRequiredExercise = false;
  }

  selectModality() {
    this.validatorsRequiredModality = false;
    console.log("modalidad: ", this.selectedModality);
    this.modality = this.modalities.find(x => x.id == this.selectedModality).name;
    this.modeEditStaggered = false;
    this.clearModality();
    this.addWodGroup();

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
      default:
    }
  }


  selectIntensityType() { };

  selectUnitsTypes() { };

  onItemSelect(goal) {
    if (this.goal.length == 0) {
      this.goal = goal.goal;
    } else {
      this.goal = this.goal + "-" + goal.goal;
    }
    this.weeklyGoalsList.push(goal);
  }

  onSelectAll(goals) {
    this.weeklyGoalsList = [];
    this.goal = "";
    for (var i = 0; i < goals.length; i++) {
      this.weeklyGoalsList.push(goals[i]);
      if (this.goal.length == 0) {
        this.goal = this.weeklyGoalsList[i].goal;
      } else {
        this.goal = this.goal + "-" + this.weeklyGoalsList[i].goal;
      }
    };
    console.log(this.weeklyGoalsList);
  }

  onItemDeSelect(goal) {
    let index1 = this.weeklyGoalsList.findIndex(x => x.id == goal.id);
    this.weeklyGoalsList.splice(index1, 1);
  }

  onDeSelectAll() {
    this.weeklyGoalsList = [];
    this.goal = "";
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  //addExercise() {

  //  if (this.wod.wodGroups.length == 0) {
  //    this.addwodGroup();
  //  }

  //  if (this.selectedExercise !== null && this.selectedExercise != undefined && this.selectedExercise !== "" && this.selectedModality !== null) {
  //    var exercise = this.exercises.find(x => x.id == this.selectedExercise);
  //    var exerciseItem = new ExerciseItem();
  //    exerciseItem.exercise = exercise;
  //    exerciseItem.modality = this.modalities.find(x => x.id == this.selectedModality);
  //    exerciseItem.units = this.units;
  //    if (this.mode == null) {
  //      exerciseItem.mode = "None";
  //    } else {
  //      exerciseItem.mode = this.mode;
  //    }

  //    exerciseItem.value = this.value;

  //    this.wod.wodGroups[this.activeWodGroup].addExercise(exerciseItem);

  //    this.selectedModality = null;
  //    this.selectedExercise = "";
  //    this.units = null;
  //    this.selectMode("None");
  //    this.value = 0;
  //  } else {
  //    if (this.selectedExercise == null || this.selectedExercise == "") {
  //      this.validatorsRequiredExercise = true;
  //    } if (this.selectedModality == null) {
  //      this.validatorsRequiredModality = true;
  //    }
  //  }
  //}

  //selectMode(mode) {
  //  console.log(mode);
  //  this.mode = mode;
  //  switch (mode) {
  //    case "Kgs":
  //      this.checkedKgs = true;
  //      break;
  //    case "%":
  //      this.checkedPercentage = true;
  //      break;
  //    case "RPE":
  //      this.checkedRPE = true;
  //      break;
  //    case "RPEs":
  //      this.checkedRPEs = true;
  //      break;
  //    case "None":
  //      this.checkedKgs = false;
  //      this.checkedNone = true;
  //      break;
  //    default:
  //  }
  //}

  addwodGroupModal() {
    document.getElementById("group-name-modal").click();
  }

  addWodGroup() {
    this.clearModality();
    this.modeEditStaggered = false;
    console.log("modalidad seleccionada: ", this.selectedModality);
    if (this.selectedModality) {
      this.validatorsRequiredModality = false;
      this.detail = "Modalidad: " + this.modality;
      this.rounds = 0;
      this.resetInputs();
      this.wod.addGroup(new WodGroup(this.createGuid(),
        ((this.selectedModality == 5) ? "Modalidad: " + this.modality + " - " + "3 Series - Ascendente en 3" : this.detail),
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

    

    //if (this.modality != "Escalera") {
    //  this.series = null;
    //  this.staggeredType = null;
    //  this.staggeredValue = null;
    //  if (this.modality != "AMRAP") {
    //    this.time = null;
    //  } else if (this.modality != "Rest Time") {
    //    this.time
    //  }
    //}

    //}
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
    let activeWodGroup = this.wod.wodGroups[index];
    this.modality = this.wod.wodGroups[index].modality;
    this.selectedModality = this.modalities.find(x => x.name == this.modality).id;
    if (this.modality == "Escalera") this.modeEditStaggered = true;
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
    console.log("plantilla a enviar: ", this.wod);
    if (this.name !== "" || this.name !== undefined || this.goal !== "" || this.goal !== undefined) {
      this.requesting = true;
      var wodTemplate = new WodTemplate(this.wod);
      wodTemplate.name = this.name;
      wodTemplate.goal = this.goal;
      console.log("wod-template:", wodTemplate);
      this.wodTemplateService.add(wodTemplate).subscribe(() => {
        this.requesting = false;
        this.router.navigate(['/plantillas-wod']);
      }, error => {
        this.requesting = false;
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de WOD", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de WOD", ["No se pudo guardar la plantilla."]);
        }
      })
    } else {
      if (this.name == "" || this.name == undefined) {
        this.validatorsRequiredName = true;
      } if (this.goal == "" || this.goal == undefined) {
        this.validatorsRequiredGoal = true;
      }
    }

  }

  getAll() {
    this.exerciseService.getAll().subscribe(
      result => {
        this.exercises = result;
        this.exercisesSelect = this.exercises;
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

  checkTag(j) {
    console.log("exercises", this.exercises)
    let tag = this.checkboxToTags[j];
    tag.checked = !tag.checked;

    if (tag.checked) {
      this.checkedTags.push(tag.tag)
    }
    else {
      this.checkedTags = this.checkedTags.filter(x => x != tag.tag);
    }
    this.filterByCategory();
  }

  filterByCategory() {
    if (this.selectedCategory) {
      if (this.selectedCategory == 0) {
        var selected = this.exercises;
      } else {
        var selected = this.exercises.filter(x => x.categoryExerciseId == this.selectedCategory);
      }
      if (this.checkedTags.length > 0)
        this.exercisesSelect = this.filterExercises(selected);//.map(x => ({ label: x.name, value: x.id }));
      else {
        this.exercisesSelect = selected;
      }
    } else {
      if (this.checkedTags.length > 0) {
        this.exercisesSelect = this.filterExercises(this.exercises);//.map(x => ({ label: x.name, value: x.id }));
      }
      else {
        this.exercisesSelect = this.exercises;
      }
    }
  }

  filterExercises(selected): any {
    var filtered = [];

    selected.forEach(e => {

      e.tags.forEach(t => {
        if (this.checkedTags.includes(t.name)) {
          if (!filtered.find(x => x.name == e.name))
            filtered.push(e);

        }
      })

    })
    return filtered;
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // your code goes here after droping files or any
  }

  onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }



  drop(event: CdkDragDrop<string[]>) {
    var previousIndex = this.wod.wodGroups[this.activeWodGroup].groupIndex;
    moveItemInArray(this.wod.wodGroups, event.previousIndex, event.currentIndex);
    if (event.previousIndex == this.activeWodGroup)
      this.activeWodGroup = event.currentIndex;

    else {
      this.activeWodGroup = this.wod.wodGroups.findIndex(x => x.groupIndex == previousIndex)
    }
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
    if (this.modality != 'Timers') {
      exercise.timeWork = null;
      exercise.timeRest = null;
    }
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
      default:
    }

    this.wod.wodGroups[this.activeWodGroup].exercises.splice(exerciseIndex, 1);
  }

}


function input() {
  throw new Error('Function not implemented.');

}


