import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CategoryExercises } from '../../../../domain/category-exercises';
import { Exercise } from '../../../../domain/exercise';
import { Tag } from '../../../../domain/tag';
import { ExerciseItem, Wod, WodGroup, WodTemplate, wodTemplateResponse } from '../../../../domain/wod';
import { Modality } from '../../../../domain/wod/modality';
import { WeeklyGoal } from '../../../../domain/wod/weekly-goal';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { ExerciseService } from '../../../../services/exercise.service';
import { ModalityService } from '../../../../services/modality.service';
import { WeeklyGoalService } from '../../../../services/weekly-goal.service';
import { WodTemplateService } from '../../../../wod/wod-template.service';
import { AmrapComponent } from '../../wod-modality/amrap/amrap.component';
import { EmomComponent } from '../../wod-modality/emom/emom.component';
import { RestTimeComponent } from '../../wod-modality/rest-time/rest-time.component';
import { ShortestPossibleTimeComponent } from '../../wod-modality/shortest-possible-time/shortest-possible-time.component';
import { StaggeredComponent } from '../../wod-modality/staggered/staggered.component';
import { TabataComponent } from '../../wod-modality/tabata/tabata.component';
import { TimersComponent } from '../../wod-modality/timers/timers.component';

@Component({
  selector: 'app-wod-template-edit',
  templateUrl: './wod-template-edit.component.html',
  styleUrls: ['./wod-template-edit.component.css']
})
export class WodTemplateEditComponent implements OnInit {
  id: number;
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
  selectedGoals = [];
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
  requesting: boolean;
  modality: string;
  rounds: number;
  time: number;
  series: number;
  pauseBetweenRounds: number;
  pauseBetweenExercises: number;
  staggeredType: string;
  staggeredValue: number;
  previousActiveWodGroup: number;
  modeWodMember = false;
  modeEditStaggered = false;
  clone: boolean;

  constructor(private exerciseService: ExerciseService,
    private wodTemplateService: WodTemplateService,
    private modalityService: ModalityService,
    private weeklyGoalService: WeeklyGoalService,
    private router: Router,
    private customAlertService: CustomAlertService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']);
      console.log("parametro clonar: ", params['clone']);
      this.clone = (params['clone'] == 'true' ? true : false);
    })
  }

  @ViewChild(ShortestPossibleTimeComponent, { static: false }) modalityShortesPossibleTime: ShortestPossibleTimeComponent;
  @ViewChild(AmrapComponent, { static: false }) modalityAmrap: AmrapComponent;
  @ViewChild(EmomComponent, { static: false }) modalityEmom: EmomComponent;
  @ViewChild(StaggeredComponent, { static: false }) modalityStaggered: StaggeredComponent;
  @ViewChild(TimersComponent, { static: false }) modalityTimers: TimersComponent;
  @ViewChild(RestTimeComponent, { static: false }) modalityRestTime: RestTimeComponent;
  @ViewChild(TabataComponent, { static: false }) modalityTabata: TabataComponent;


  ngOnInit() {
    if (this.clone) this.name = "";
    this.checkedNone = true;
    this.mode = "None";
    this.getWodTemplateById();
    //this.wod.addGroup(new WodGroup(this.createGuid()));

  }

  getWodTemplateById() {
    this.requesting = true;
    this.wodTemplateService.getById(this.id).subscribe(
      response => {
        console.log("wod template: ", response.result);
        this.wod = this.getWod(response.result);
        this.name = (this.clone)? "":this.wod.name;
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
        this.getAllExercises();
      },
      error => this.requesting = false
    )
  }

  getWeeklyGoals() {
    this.weeklyGoalService.getAll().subscribe(
      response => {
        this.weeklyGoals = response.result;
        this.goal = this.wod.goal;
        let goalsList = this.wod.goal.split("-");
        for (var i = 0; i < goalsList.length; i++) {
          let goal = this.weeklyGoals.find(x => x.goal == goalsList[i]);
          this.weeklyGoalsList.push(goal);
        }
        this.selectedGoals = this.weeklyGoalsList;
      },
      error => console.error(error))
  }



  getModalities() {
    this.modalityService.getAll().subscribe(
      response => {
        this.modalities = response.result;
        this.requesting = false;
      },
      error => console.error(error)
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
      case 'Rondas':
        this.modalityShortesPossibleTime.clearData();
        break;
      case 'Tabata':
        this.modalityTabata.clearData();
        break;
      default:
    }
  }


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
    this.goal = this.getGoal(this.weeklyGoalsList);
  }

  onDeSelectAll() {
    this.weeklyGoalsList = [];
    this.goal = "";
  }


  getGoal(goals) {
    let goal = "";
    for (var i = 0; i < goals.length; i++) {
      if (i == 0) {
        goal = goals[i].goal;
      } else {
        goal = goal + "-" + goals[i].goal;
      }
    }
    return goal;
  }

  createGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
      case 'Rondas':
        this.modalityShortesPossibleTime.getRounds.emit(this.wod.wodGroups[index].rounds);
        this.modalityShortesPossibleTime.rounds = this.wod.wodGroups[index].rounds;
        break;
      default:
    }
  }

  deleteGroup(index) {
    this.wod.wodGroups.splice(index, 1);
    if (this.activeWodGroup == index)
      this.activeWodGroup = 0;
  }

  saveEdition() {
    console.log("plantilla editada a enviar: ", this.wod);
    if (this.name !== "" && this.name !== undefined && this.goal !== "" && this.goal !== undefined) {
      var wodTemplate = new WodTemplate(this.wod);
      wodTemplate.name = this.name;
      wodTemplate.goal = this.goal;
      /*    wodTemplate.goal = */
      console.log(wodTemplate);
      this.wodTemplateService.update(wodTemplate).subscribe(() => {
        this.router.navigate(['/plantillas-wod']);
      }, error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de WOD", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de WOD", ["No se pudo modificar la plantilla."]);
        }
      })
    } else {
      if (this.name == "" || this.name == undefined) {
        this.validatorsRequiredName = true;
      }
      if (this.goal == "" || this.goal == undefined) {
        this.validatorsRequiredGoal = true;
      }
    }
  }

  saveClone() {
    console.log("plantilla clonada a enviar: ", this.wod);
    if (this.name !== "" || this.name !== undefined || this.goal !== "" || this.goal !== undefined) {
      this.requesting = true;
      var wodTemplate = new WodTemplate(this.wod);
      wodTemplate.id = undefined;
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

  save() {
    if (!this.clone) {
      this.saveEdition();
    } else {
      this.saveClone();
    }


  }

  getAllExercises() {
    this.exerciseService.getAll().subscribe(
      result => {
        this.exercises = result;
        this.exercisesSelect = this.exercises;
        this.getAllTags();
      },
      error => console.error(error)
    )


  }

  getAllTags() {
    this.exerciseService.getAllTags().subscribe(
      result => {
        this.tags = result;
        for (let i = 0; i < this.tags.length; i++) {
          let tagCheck: { tag: string, checked: boolean, id: number } = { tag: '', checked: false, id: 0 };
          tagCheck.tag = this.tags[i].name;
          tagCheck.checked = false;
          tagCheck.id = this.tags[i].id;
          this.checkboxToTags.push(tagCheck);
        };
        this.getAllCategories();
      },
      error => console.error(error)
    );
  }

  getAllCategories() {
    this.exerciseService.getAllCategories().subscribe(
      result => {
        this.categories = result;
        this.getModalities();
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


  getWod(wodTemplate: wodTemplateResponse): Wod {
    var wod = new Wod();
    wod.id = wodTemplate.id;
    wod.goal = wodTemplate.goal;
    var indexes = wodTemplate.wodGroups.map(x => x.groupIndex);
    indexes = indexes.filter((x, i, a) => a.indexOf(x) == i)
    wod.name = wodTemplate.name;

    indexes.forEach(i => {
      var wodGroup = new WodGroup();
      var exercises = wodTemplate.wodGroups.filter(x => x.groupIndex == i).map(e => {
        console.log("modality", e.modality)
        return {

          exercise: e.exercise,
          modality: e.modality,
          unitType: e.unitType,
          units: e.units,
          intensityType: e.intensityType,
          intensityValue: e.intensityValue,
          timeWork: e.timeWork,
          timeRest: e.timeRest
        }
      });
      wodGroup.exercises = exercises;
      wodGroup.detail = wodTemplate.wodGroups.find(x => x.groupIndex == i).detail;
      wodGroup.modality = wodTemplate.wodGroups.find(x => x.groupIndex == i).modality.name;
      wodGroup.modalityId = wodTemplate.wodGroups.find(x => x.groupIndex == i).modality.id;
      wodGroup.pauseBetweenExercises = wodTemplate.wodGroups.find(x => x.groupIndex == i).pauseBetweenExercises;
      wodGroup.pauseBetweenRounds = wodTemplate.wodGroups.find(x => x.groupIndex == i).pauseBetweenRounds;
      wodGroup.rounds = wodTemplate.wodGroups.find(x => x.groupIndex == i).rounds;
      wodGroup.time = wodTemplate.wodGroups.find(x => x.groupIndex == i).time;
      wodGroup.series = wodTemplate.wodGroups.find(x => x.groupIndex == i).series;
      wodGroup.staggeredType = wodTemplate.wodGroups.find(x => x.groupIndex == i).staggeredType;
      wodGroup.staggeredValue = wodTemplate.wodGroups.find(x => x.groupIndex == i).staggeredValue;
      wodGroup.groupIndex = wodTemplate.wodGroups.find(x => x.groupIndex == i).groupIndex;
      wod.addGroup(wodGroup);
    })
    return wod;
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
    };
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


  goClone() {
    this.requesting = true;
    const component = this;
    setTimeout(function () {
      console.log("function interval")
      component.clone = true;
      component.name = "";
      component.requesting = false
    }, 1000);
    


  }

  validateName(event) {
    console.log("validando nombre: ", this.name, event);
    if (this.name.length > 0) this.validatorsRequiredName = false;
  }

}
