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

  constructor(private planService: PlanService, private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.planService.getAll().subscribe(
      result => {
        console.log(result);
        this.plans = result;
      },
      error => console.error(error)
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Planes", ["¿Está seguro que desea eliminar este plan?"], () => {
      this.planService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el plan."]);
        })
    }, true);
  }
}
