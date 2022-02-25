import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthlyGoal } from '../../../domain/wod/monthly-goal';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MonthlyGoalService } from '../../../services/monthly-goal.service';

@Component({
  selector: 'app-monthly-goal-edit',
  templateUrl: './monthly-goal-edit.component.html',
  styleUrls: ['./monthly-goal-edit.component.css']
})
export class MonthlyGoalEditComponent implements OnInit {
  formEdit: FormGroup;
  sendForm: boolean;
  id: number;
  monthlyGoal: MonthlyGoal;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private monthlyGoalService: MonthlyGoalService, private customAlertService: CustomAlertService,
    private router: Router) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      goal: ['', Validators.required]
    })}

  ngOnInit() {
    this.getMonthlyGoal();
  }

  get f() {
    return this.formEdit.controls;
  }

  getMonthlyGoal() {
    this.monthlyGoalService.getById(this.id).subscribe(
      response => {
        console.log(response.result);
        this.monthlyGoal = response.result;
        this.toCompleteForm();
      },
      error => console.error(error)
    )
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      goal: this.monthlyGoal.goal
    })
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      this.monthlyGoal.goal = this.formEdit.value.goal;
      this.monthlyGoalService.update(this.monthlyGoal).subscribe(
        response => this.router.navigate(['/objetivos-mensuales-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Objetivos Mensuales", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Objetivos Mensuales", ["No se pudo modificar el objetivo."]);
          }
        })
    }
  }
}
