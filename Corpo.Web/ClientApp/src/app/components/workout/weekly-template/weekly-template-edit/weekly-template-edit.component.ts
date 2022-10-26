import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { WodTemplate } from '../../../../domain/wod';
import { WeeklyGoal } from '../../../../domain/wod/weekly-goal';
import { WeeklyTemplate } from '../../../../domain/wod/weekly-template';
import { WeeklyGoalService } from '../../../../services/weekly-goal.service';
import { WeeklyTemplateService } from '../../../../services/wod/weekly-template.service';
import { WodTemplateService } from '../../../../wod/wod-template.service';

@Component({
  selector: 'app-weekly-template-edit',
  templateUrl: './weekly-template-edit.component.html',
  styleUrls: ['./weekly-template-edit.component.css']
})
export class WeeklyTemplateEditComponent implements OnInit {
  weeklyTemplate: WeeklyTemplate;
  id: number;
  requesting = false;
  name = "";
  goal = "";
  weeklyGoals: WeeklyGoal[] = [];
  weeklyGoalsDropdownSettings: IDropdownSettings = {};
  weeklyGoalsList: WeeklyGoal[] = [];
  selectedGoals = [];
  wodTemplates: WodTemplate[] = [];
  selectedWod: number;
  templates = [];
  wodTemplatesDropdownSettings: IDropdownSettings = {};
  wodTemplatesList: WodTemplate[] = [];
  wods: any[] = [];
  selectedWodTemplates = [];

  constructor(private route: ActivatedRoute,
    private weeklyTemplateService: WeeklyTemplateService,
    private weeklyGoalService: WeeklyGoalService,
    private wodTemplateService: WodTemplateService  ) {
    this.route.queryParams.subscribe(
      params => {
        this.id = parseInt(params['id']);
        this.getById();
      }    )
  }

  ngOnInit() {
   
  }

  getById() {
    this.requesting = true;
    this.weeklyTemplateService.getById(this.id).subscribe(
      response => {
        this.requesting = false;
        console.log("plantilla semanal: ", response.result)
        this.weeklyTemplate = response.result;
        this.name = this.weeklyTemplate.name;
        this.goal = this.weeklyTemplate.goal;
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
      },
      error => {
        console.error(error);
        this.requesting = false;
      }    )
  }

  getWeeklyGoals() {
    this.weeklyGoalService.getAll().subscribe(
      response => {
        this.weeklyGoals = response.result;
        this.goal = this.weeklyTemplate.goal;
        let goalsList = this.weeklyTemplate.goal.split("-");
        for (var i = 0; i < goalsList.length; i++) {
          let goal = this.weeklyGoals.find(x => x.goal == goalsList[i]);
          this.weeklyGoalsList.push(goal);
        }
        this.selectedGoals = this.weeklyGoalsList;
        this.getWods();
      },
      error => console.error(error))
  }


  getWods() {
    this.requesting = true;
    this.wodTemplateService.getAll().subscribe(
      response => {
        this.requesting = false;
        console.log("wods: ", response.result);
        this.wodTemplates = response.result;
        console.log("templates diarios: ", this.weeklyTemplate.weeklyWodTemplates);
        this.weeklyTemplate.weeklyWodTemplates.forEach((x) => {
          let wod = this.wodTemplates.find(x => x.id == x.id)
          if (wod) this.wodTemplatesList.push(wod);
        })
        this.selectedWodTemplates = this.wodTemplatesList;
        this.templates = this.wodTemplates.map(x => ({ id: x.id, name: x.name + " - " + x.goal }));
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

      }, e => {
        this.requesting = false;
      })
  }

}
