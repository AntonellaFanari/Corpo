import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeeklyGoal } from '../../../domain/wod/weekly-goal';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { WeeklyGoalService } from '../../../services/weekly-goal.service';

@Component({
  selector: 'app-weekly-goal-edit',
  templateUrl: './weekly-goal-edit.component.html',
  styleUrls: ['./weekly-goal-edit.component.css']
})
export class WeeklyGoalEditComponent implements OnInit {
  formEdit: FormGroup;
  sendForm: boolean;
  id: number;
  weeklyGoal: WeeklyGoal;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private weeklyGoalService: WeeklyGoalService, private customAlertService: CustomAlertService,
    private router: Router) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      goal: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getWeeklyGoal();
  }

  get f() {
    return this.formEdit.controls;
  }

  getWeeklyGoal() {
    this.weeklyGoalService.getById(this.id).subscribe(
      response => {
        console.log(response.result);
        this.weeklyGoal = response.result;
        this.toCompleteForm();
      },
      error => console.error(error)
    )
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      goal: this.weeklyGoal.goal
    })
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      this.weeklyGoal.goal = this.formEdit.value.goal;
      this.weeklyGoalService.update(this.weeklyGoal).subscribe(
        response => this.router.navigate(['/objetivos-semanales-list']),
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Objetivos Semanales", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Objetivos Semanales", ["No se pudo modificar el objetivo."]);
          }
        })
    }
  }
}
