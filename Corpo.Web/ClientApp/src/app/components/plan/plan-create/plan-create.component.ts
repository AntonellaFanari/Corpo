import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from '../../../domain/class';
import { Plan } from '../../../domain/plan';
import { ClassService } from '../../../services/class.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { PlanService } from '../../../services/plan.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.css']
})
export class PlanCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;
  classes: Class[] = []
  dropdownList = [];
  classDropdownSettings: IDropdownSettings = {};
  constructor(private formBuilder: FormBuilder, private planService: PlanService, private router: Router, private customAlertService: CustomAlertService, private classService: ClassService) {
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      credits: ['', Validators.required],
      price: ['', Validators.required],
      classes: ['']
    })
  }

  ngOnInit() {
    this.classService.getAll().subscribe(
      result => {
        console.log(result);
        this.classes = result;
      },
      error => console.error(error)
    );
    this.classDropdownSettings = {
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
    };
  }

  get f() {
    return this.formCreate.controls;
  }

  selectType(event) {
    this.formCreate.value.type = event;
  }
  createPlan() {
    console.log(this.formCreate.value.classes);
    var newPlan = new Plan();
    newPlan.name = this.formCreate.value.name;
    newPlan.type = parseInt(this.formCreate.value.type);
    newPlan.credits = this.formCreate.value.credits;
    newPlan.price = this.formCreate.value.price;
    var selectedClass = this.formCreate.value.classes;
    for (var i = 0; i < selectedClass.length; i++) {
      let id = selectedClass[i].id;
      console.log(id);
      let clas = this.classes.find(x => x.id == id);
      newPlan.class.push(clas);
    };
    return newPlan;
  }

  selectClass(event) {
    console.log(event);
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      var newPlan = this.createPlan();
      console.log(newPlan);
      this.planService.add(newPlan).subscribe(
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
            this.customAlertService.displayAlert("Gestión de Planes", ["No se pudo guardar el plan."]);
          }
        }
          )
    } 
  }

}
