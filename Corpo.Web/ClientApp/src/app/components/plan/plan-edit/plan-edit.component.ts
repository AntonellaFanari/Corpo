import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from '../../../domain/plan';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { PlanService } from '../../../services/plan.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { Class } from '../../../domain/class';
import { ClassService } from '../../../services/class.service';

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit {
  formEdit: FormGroup;
  sendForm: boolean = false;
  plan: Plan;
  id: number;
  classes: Class[] = []
  dropdownList = [];
  classDropdownSettings: IDropdownSettings = {};
  requesting = false;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private planService: PlanService,
    private router: Router, private customAlertService: CustomAlertService, private classService: ClassService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      credits: ['', Validators.required],
      price: ['', Validators.required],
      classes: ['']
    })
  }

  ngOnInit() {
    this.getPlan();

  }

  getPlan() {
    this.requesting = true;
    this.planService.getById(this.id).subscribe(
      result => {
        console.log(result);
        this.plan = result;
        this.getAllClasses();
        this.classDropdownSettings = {
          idField: 'id',
          textField: 'name',
          enableCheckAll: true,
          selectAllText: "Seleccionar todos",
          unSelectAllText: "Deseleccionar todos",
        };
        this.toCompleteForm();
      },
      error => this.requesting = false
    )
  }

  getAllClasses() {
    this.classService.getAll().subscribe(
      result => {
        console.log(result);
        this.classes = result;
        this.requesting = false;
      },
      error => this.requesting = false
    )
  }

  get f() {
    return this.formEdit.controls;
  }

  selectType(event) {
    this.formEdit.value.type = event;
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      name: this.plan.name,
      type: this.plan.type,
      credits: this.plan.credits,
      price: this.plan.price,
      classes: this.plan.classes
    })
  }

  updatePlan() {
    var planEdit = new Plan();
    planEdit.name = this.formEdit.value.name;
    planEdit.type = this.formEdit.value.type;
    planEdit.credits = this.formEdit.value.credits;
    planEdit.price = this.formEdit.value.price;
    var selectedClass = this.formEdit.value.classes;
    for (var i = 0; i < selectedClass.length; i++) {
      let id = selectedClass[i].id;
      console.log(id);
      let clas = this.classes.find(x => x.id == id);
      planEdit.classes.push(clas);
    };
    return planEdit;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      var planEdit = this.updatePlan();
      this.planService.update(this.id, planEdit).subscribe(
        result => {
          console.log(result);
          this.router.navigate(["/plan-list"]);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Planes", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Planes", ["No se pudo modificar el plan."]);
          }
        })
    }
  }
}
