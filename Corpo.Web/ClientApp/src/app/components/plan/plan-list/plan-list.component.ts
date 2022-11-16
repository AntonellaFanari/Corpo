import { Component, OnInit } from '@angular/core';
import { Plan } from '../../../domain/plan';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.css']
})
export class PlanListComponent implements OnInit {
  plans: Plan[] = [];
  filterPlan = "";
  requestingList: boolean;
  constructor(private planService: PlanService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.requestingList = true;
    this.getAll();
  }

  getAll() {
    this.planService.getAll().subscribe(
      result => {
        this.requestingList = false;
        console.log(result);
        this.plans = result;
      },
      error => this.requestingList = false
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Planes", ["¿Está seguro que desea eliminar este plan?"], () => {
      this.requestingList = true;
      this.planService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          this.requestingList = false;
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el plan."]);
        })
    }, true);
  }
}
