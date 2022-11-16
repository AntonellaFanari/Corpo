import { Component, OnInit } from '@angular/core';
import { WeeklyGoal } from '../../../domain/wod/weekly-goal';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { WeeklyGoalService } from '../../../services/weekly-goal.service';

@Component({
  selector: 'app-weekly-goal-list',
  templateUrl: './weekly-goal-list.component.html',
  styleUrls: ['./weekly-goal-list.component.css']
})
export class WeeklyGoalListComponent implements OnInit {
  weeklyGoals: WeeklyGoal[] = [];
  requestingList: boolean;
  filterName = "";

  constructor(private weeklyGoalService: WeeklyGoalService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requestingList = true;
    this.weeklyGoalService.getAll().subscribe(
      response => {
        this.requestingList = false;
        console.log(response.result);
        this.weeklyGoals = response.result;
      },
      error => {
        console.error(error);
        this.requestingList = false
      }
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Objetivos Semanales", ["¿Está seguro que desea eliminar este objetivo?"], () => {
      this.requestingList = true;
      this.weeklyGoalService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Objetivos Semanales", ["Error al intentar eliminar el objetivo."])
        })
    }, true)
  }


}
