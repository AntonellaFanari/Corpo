import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MonthlyGoal } from '../../../domain/wod/monthly-goal';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MonthlyGoalService } from '../../../services/monthly-goal.service';

@Component({
  selector: 'app-monthly-goal-create',
  templateUrl: './monthly-goal-create.component.html',
  styleUrls: ['./monthly-goal-create.component.css']
})
export class MonthlyGoalCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean;
  constructor(private formBuilder: FormBuilder, private monthlyGoalService: MonthlyGoalService, private customAlertService: CustomAlertService,
    private router: Router) {
    this.formCreate = this.formBuilder.group({
      goal: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  get f() {
    return this.formCreate.controls;
  }

  createMonthlyGoal() {
    let monthlyGoal = new MonthlyGoal();
    monthlyGoal.goal = this.formCreate.value.goal;
    return monthlyGoal;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      this.monthlyGoalService.add(this.createMonthlyGoal()).subscribe(
        response => this.router.navigate(['/objetivos-mensuales-list']),
        error => {
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Objetivos Mensuales", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Objetivos Mensuales", ["No se pudo guardar el objetivo."]);
          }
        })
    }
  }
}
