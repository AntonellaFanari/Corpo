import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '../../../domain/tag';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ExerciseService } from '../../../services/exercise.service';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {
  tag: Tag;
  formEdit: FormGroup;
  id: number;
  sendForm: boolean = false;
  requesting: boolean;

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private router: Router, private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.requesting = true;
    this.exerciseService.getTagById(this.id).subscribe(
      result => {
        console.log(result.result);
        this.tag = result.result;
        this.toCompleteForm();
        this.requesting = false;
      },
      error => this.requesting = false
    );

  }

  get f() {
    return this.formEdit.controls;
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      name: this.tag.name
    })
  }

  createTagEdit() {
    var tagEdit = new Tag();
    tagEdit.name = this.formEdit.value.name;
    return tagEdit;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      var tagEdit = this.createTagEdit();
      this.exerciseService.updateTag(tagEdit, this.id).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/tags-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Tags", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Tags", ["No se pudo modificar el tag."]);
          }
        })
    }
  }

}
