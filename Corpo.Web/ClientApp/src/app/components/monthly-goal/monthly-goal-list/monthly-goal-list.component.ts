import { Component, OnInit } from '@angular/core';
import { MonthlyGoal } from '../../../domain/wod/monthly-goal';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MonthlyGoalService } from '../../../services/monthly-goal.service';

@Component({
  selector: 'app-monthly-goal-list',
  templateUrl: './monthly-goal-list.component.html',
  styleUrls: ['./monthly-goal-list.component.css']
})
export class MonthlyGoalListComponent implements OnInit {
  monthlyGoals: MonthlyGoal[] = [];
  requestingList: boolean;
  filterName = "";

  constructor(private monthlyGoalService: MonthlyGoalService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.monthlyGoalService.getAll().subscribe(
      response => {
        this.requestingList = false;
        console.log(response.result);
        this.monthlyGoals = response.result;
      },
      error => {
        console.error(error);
        this.requestingList = false
      }
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Objetivos Mensuales", ["¿Está seguro que desea eliminar este objetivo?"], () => {
      this.monthlyGoalService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Gestión de Objetivos Mensuales", ["Error al intentar eliminar el objetivo."])
        })
    }, true)
  }

}
