import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Wod, WodGroup, WodTemplate } from '../../../../domain/wod';
import { WeeklyGoal } from '../../../../domain/wod/weekly-goal';
import { WeeklyTemplate } from '../../../../domain/wod/weekly-template';
import { WeeklyWodTemplate } from '../../../../domain/wod/weekly-wod-template';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { WeeklyGoalService } from '../../../../services/weekly-goal.service';
import { WeeklyTemplateService } from '../../../../services/wod/weekly-template.service';
import { WodTemplateService } from '../../../../wod/wod-template.service';

@Component({
  selector: 'app-weekly-template-create',
  templateUrl: './weekly-template-create.component.html',
  styleUrls: ['./weekly-template-create.component.css']
})
export class WeeklyTemplateCreateComponent implements OnInit {
  name = "";
  weeklyGoalsDropdownSettings: IDropdownSettings = {};
  weeklyGoals: WeeklyGoal[] = [];
  weeklyGoalsList: WeeklyGoal[] = [];
  goal = "";
  requesting = false;
  wodTemplates: WodTemplate[] = [];
  selectedWod: number;
  templates = [];
  wodTemplatesDropdownSettings: IDropdownSettings = {};
  wodTemplatesList: WodTemplate[] = [];
  wods: any[] = [];
  validatorsRequiredName = false;
  validatorsRequiredGoal = false;

  constructor(private wodTemplateService: WodTemplateService,
    private weeklyGoalService: WeeklyGoalService,
    private weeklyTemplateService: WeeklyTemplateService,
    private router: Router,
    private customAlertService: CustomAlertService) { }

  ngOnInit() {
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
    this.wodTemplatesDropdownSettings = {
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      allowSearchFilter: true,
      searchPlaceholderText: "Buscar",
      noDataAvailablePlaceholderText: "No hay plantillas wod"
    }
  }



  getWeeklyGoals() {
    this.requesting = true;
    this.weeklyGoalService.getAll().subscribe(
      response => {
        this.weeklyGoals = response.result;

        this.getWods();
      },
      error => console.error(error))
  }

  getWods() {
    this.wodTemplateService.getAll().subscribe(
      response => {
        this.requesting = false;
        console.log("wods: ", response.result);
        this.wodTemplates = response.result;
        this.templates = this.wodTemplates.map(x => ({ id: x.id, name: x.name + " - " + x.goal }));

      }, e => {
        this.requesting = false;
      })
  }

  getWod(wodTemplate): Wod {
    var wod = new Wod();
    wod.id = wodTemplate.id;
    var indexes = wodTemplate.wodGroups.map(x => x.groupIndex);
    indexes = indexes.filter((x, i, a) => a.indexOf(x) == i)
    wod.goal = wodTemplate.goal;
    wod.intensityType = wodTemplate.intensityType;
    wod.intensity = wodTemplate.intensity;

    indexes.forEach(i => {
      var wodGroup = new WodGroup();
      var exercises = wodTemplate.wodGroups.filter(x => x.groupIndex == i).map(e => {
        console.log("wodGroup: ", e);
        return {
          id: e.id,
          exercise: e.exercise,
          modality: e.modality.name,
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
      wodGroup.rounds = wodTemplate.wodGroups.find(x => x.groupIndex == i).rounds;
      wodGroup.series = wodTemplate.wodGroups.find(x => x.groupIndex == i).series;
      wodGroup.modality = wodTemplate.wodGroups.find(x => x.groupIndex == i).modality.name;
      wodGroup.modalityId = wodTemplate.wodGroups.find(x => x.groupIndex == i).modality.id;
      wodGroup.staggeredType = wodTemplate.wodGroups.find(x => x.groupIndex == i).staggeredType;
      wodGroup.staggeredValue = wodTemplate.wodGroups.find(x => x.groupIndex == i).staggeredValue;
      wodGroup.time = wodTemplate.wodGroups.find(x => x.groupIndex == i).time;
      wodGroup.pauseBetweenRounds = wodTemplate.wodGroups.find(x => x.groupIndex == i).pauseBetweenRounds;
      wodGroup.pauseBetweenExercises = wodTemplate.wodGroups.find(x => x.groupIndex == i).pauseBetweenExercises;
      wod.addGroup(wodGroup)
      // wod.wodNumber = wodMember.wodNumber;

    })
    return wod;
  }



  onItemSelectGoal(goal) {
    if (this.goal.length == 0) {
      this.goal = goal.goal;
    } else {
      this.goal = this.goal + "-" + goal.goal;
    }
    this.weeklyGoalsList.push(goal);
    this.getGoal();
  }

  onSelectAllGoals(goals) {
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
    this.getGoal();
    console.log(this.weeklyGoalsList);
  }

  onItemDeSelectGoal(goal) {
    let index1 = this.weeklyGoalsList.findIndex(x => x.id == goal.id);
    this.weeklyGoalsList.splice(index1, 1);
    this.getGoal();
  }

  onDeSelectAllGoals() {
    this.weeklyGoalsList = [];
    this.goal = "";
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
    }
  }

  onItemSelectWodTemplate(template) {
    console.log("wod: ", template);
    let wod = this.wodTemplates.find(x => x.id == template.id);
    this.wodTemplatesList.push(wod);
    this.wods = [];
    this.wodTemplatesList.forEach(w => {
      this.wods.push({
        wod: this.getWod(w),
        detail: w.name + " " + w.goal
      });
    })
    console.log("wods Seleccionados: ", this.wodTemplatesList);
  }

  onSelectAllWodTemplates(wods) {
    this.wodTemplatesList = [];
    wods.forEach(x => {
      let wod = this.wodTemplates.find(y => y.id == x.id);
      this.wodTemplatesList.push(wod);
      this.wods = [];
      this.wodTemplatesList.forEach(w => {
        this.wods.push({
          wod: this.getWod(w),
          detail: w.name + " " + w.goal
        });
      })
      console.log("wods Seleccionados: ", this.wodTemplatesList);
    })
  }

  onItemDeSelectWodTemplate(wod) {
    let indexWodTemplatesList = this.wodTemplatesList.findIndex(x => x.id == wod.id);
    this.wodTemplatesList.splice(indexWodTemplatesList, 1);
    console.log("wods Seleccionados: ", this.wodTemplatesList);
    let indexWod = this.wods.findIndex(x => x.id == wod.id);
    this.wods.splice(indexWod, 1);
  }

  onDeSelectAllWodTemplates() {
    this.wodTemplatesList = [];
    this.wods = [];
    console.log("wods Seleccionados: ", this.wodTemplatesList);
  }

  save() {
    if (this.name !== "" || this.name !== undefined || this.goal !== "" || this.goal !== undefined) {
      this.requesting = true;
      var weeklyTemplate = new WeeklyTemplate();
      weeklyTemplate.name = this.name;
      weeklyTemplate.goal = this.goal;
      this.wods.forEach(x => {
        let wodTemplate = new WeeklyWodTemplate();
        wodTemplate.wodTemplateId = x.wod.id;
        weeklyTemplate.weeklyWodTemplates.push(wodTemplate)
      });
      console.log("wod-template semanal:", weeklyTemplate);
      this.weeklyTemplateService.add(weeklyTemplate).subscribe(() => {
        this.requesting = false;
        this.router.navigate(['/plantillas-semanales']);
      }, error => {
        this.requesting = false;
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de WOD", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de WOD", ["No se pudo guardar la plantilla semanal."]);
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

}
