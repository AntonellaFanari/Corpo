import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Class } from '../../../domain/class';
import { ClassService } from '../../../services/class.service';
import { CustomAlertService } from '../../../services/custom-alert.service';

@Component({
  selector: 'app-class-create',
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})
export class ClassCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private classService: ClassService, private customAlertService: CustomAlertService, private router: Router) {
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required],
      personalized: ['', Validators.required]
    })
  }

  ngOnInit() {
  }
  selectPersonalized(event) {
    this.formCreate.value.personalized = event;
  }

  get f() {
    return this.formCreate.controls;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      var newClass = new Class();
      newClass.name = this.formCreate.value.name;
      newClass.personalized = this.formCreate.value.personalized;
      this.classService.add(newClass).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/plan-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Clases", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Clases", ["No se pudo guardar la clase."]);
          }
        })
    }
  }

}
