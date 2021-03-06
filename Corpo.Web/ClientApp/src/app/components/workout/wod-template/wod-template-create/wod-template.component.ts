import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
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

  constructor(private exerciseService: ExerciseService,
    private wodTemplateService: WodTemplateService,
    private modalityService: ModalityService,
    private weeklyGoalService: WeeklyGoalService,
    private router: Router,
    private customAlertService: CustomAlertService) { }

  ngOnInit() {
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
      response => this.modalities = response.result)
  }

  selectCategory(id) {
      this.selectedCategory = id;
      this.filterByCategory();
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

  addExercise() {

    if (this.wod.wodGroups.length == 0) {
      this.addwodGroup();
    }
    if ((this.selectedExercise) && (this.selectedModality) && (this.units)) {
      this.validationError = false;
      var exercise = this.exercises.find(x => x.id == this.selectedExercise);
      var exerciseItem = new ExerciseItem();
      exerciseItem.exercise = exercise;
      exerciseItem.modality = this.modalities.find(x => x.id == this.selectedModality);
      exerciseItem.units = this.units;
      exerciseItem.mode = this.mode;
      exerciseItem.value = this.value;

      this.wod.wodGroups[this.activeWodGroup].addExercise(exerciseItem);

      this.selectedModality = null;
      this.selectedExercise = "";
      this.mode = "None";
      this.value = 0;
      this.units = null;
    }
    else {
      this.validationError = true;
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
    var wodTemplate = new WodTemplate(this.wod);
    wodTemplate.name = this.name;
    wodTemplate.goal = this.goal;
    /*    wodTemplate.goal = */
    console.log(wodTemplate);
    this.wodTemplateService.add(wodTemplate).subscribe(() => {
      this.router.navigate(['/plantillas-wod']);
    }, error => {
      console.error(error);
      if (error.status === 400) {
        this.customAlertService.displayAlert("Gesti??n de WOD", error.error.errores);
      }
      if (error.status === 500) {
        this.customAlertService.displayAlert("Gesti??n de WOD", ["No se pudo guardar la plantilla."]);
      }
    })
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

}

