import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tag } from '../../../domain/tag';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-tag-create',
  templateUrl: './tag-create.component.html',
  styleUrls: ['./tag-create.component.css']
})
export class TagCreateComponent implements OnInit {
  formCreate: FormGroup;
  sendForm: boolean = false;

  constructor(private formBuilder: FormBuilder, private customAlertService: CustomAlertService,
    private router: Router, private exerciseService: ExerciseService, private location: Location) {
    this.formCreate = this.formBuilder.group({
      name: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  get f() {
    return this.formCreate.controls;
  }

  submit() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      var newTag = new Tag();
      newTag.name = this.formCreate.value.name;
      this.exerciseService.addTag(newTag).subscribe(
        result => {
          console.log(result);
          this.return();
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Tags", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Tags", ["No se pudo guardar el tag."]);
          }
        })
    }
  }

  return() {
    this.location.back();
  }

}
