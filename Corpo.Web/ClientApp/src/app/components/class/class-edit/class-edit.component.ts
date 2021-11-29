import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import el from 'date-fns/esm/locale/el/index.js';
import { Class } from '../../../domain/class';
import { ClassService } from '../../../services/class.service';
import { CustomAlertService } from '../../../services/custom-alert.service';

@Component({
  selector: 'app-class-edit',
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {
  class: Class;
  formEdit: FormGroup;
  id: number;
  sendForm: boolean = false;

  constructor(private classService: ClassService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required],
      personalized: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.classService.getById(this.id).subscribe(
      result => {
        console.log(result.resul);
        this.class = result.result;
        this.toCompleteForm();
      },
      error => console.error(error)
    );
   
  }

  get f() {
    return this.formEdit.controls;
  }

  toCompleteForm() {
    console.log(this.class.name);
    this.formEdit.patchValue({
      name: this.class.name,
      personalized: this.class.personalized
    })
  }

  createClassEdit() {
    var classEdit = new Class();
    classEdit.name = this.formEdit.value.name;
    classEdit.personalized = this.formEdit.value.personalized;
    return classEdit;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      var classEdit = this.createClassEdit();
      this.classService.update(this.id, classEdit).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/clases-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Clases", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Clases", ["No se pudo modificar la clase."]);
          }
        })
    }
  }

}
