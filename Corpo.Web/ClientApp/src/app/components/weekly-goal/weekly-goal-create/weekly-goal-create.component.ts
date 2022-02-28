import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeeklyGoal } from '../../../domain/wod/weekly-goal';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { WeeklyGoalService } from '../../../services/weekly-goal.service';

@Component({
  selector: 'app-weekly-goal-create',
  templateUrl: './weekly-goal-create.component.html',
  styleUrls: ['./weekly-goal-create.component.css']
})
export class WeeklyGoalCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean;
  constructor(private formBuilder: FormBuilder, private weeklyGoalService: WeeklyGoalService,
    private customAlertService: CustomAlertService, private router: Router) {
    this.formCreate = this.formBuilder.group({
      goal: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  get f() {
    return this.formCreate.controls;
  }

  createWeeklyGoal() {
    let monthlyGoal = new WeeklyGoal();
    monthlyGoal.goal = this.formCreate.value.goal;
    return monthlyGoal;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      this.weeklyGoalService.add(this.createWeeklyGoal()).subscribe(
        response => this.router.navigate(['/objetivos-semanales-list']),
        error => {
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Objetivos Semanales", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Objetivos Semanales", ["No se pudo guardar el objetivo."]);
          }
        })
    }
  }
}
