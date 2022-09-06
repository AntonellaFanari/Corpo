import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
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

  constructor(private exerciseService: ExerciseService,
    private wodTemplateService: WodTemplateService,
    private modalityService: ModalityService,
    private weeklyGoalService: WeeklyGoalService,
    private router: Router,
    private customAlertService: CustomAlertService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) })
  }

  ngOnInit() {
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
        this.name = this.wod.name;
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
  }

  deleteGroup(index) {
    this.wod.wodGroups.splice(index, 1);
    if (this.activeWodGroup == index)
      this.activeWodGroup = 0;
  }

  save() {
    if (this.name !== "" || this.name !== undefined || this.goal !== "" || this.goal !== undefined) {
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
      } if (this.goal == "" || this.goal == undefined) {
        this.validatorsRequiredGoal = true;
      }
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
          units: e.units
        }
      });
      wodGroup.exercises = exercises;
      wodGroup.detail = wodTemplate.wodGroups.find(x => x.groupIndex == i).detail;
      wod.addGroup(wodGroup)

    })
    return wod;
  }

}
