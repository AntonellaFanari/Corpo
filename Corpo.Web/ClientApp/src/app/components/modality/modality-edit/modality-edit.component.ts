import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modality } from '../../../domain/wod/modality';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ModalityService } from '../../../services/modality.service';

@Component({
  selector: 'app-modality-edit',
  templateUrl: './modality-edit.component.html',
  styleUrls: ['./modality-edit.component.css']
})
export class ModalityEditComponent implements OnInit {
  formEdit: FormGroup;
  sendForm: boolean = false;
  id: number;
  modality: Modality;
  requesting: boolean;

  constructor(private formBuilder: FormBuilder, private modalityService: ModalityService,
    private router: Router, private customAlertService: CustomAlertService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
    this.formEdit = this.formBuilder.group({
      name: ['', Validators.required],
      unit: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.requesting = true;
    this.modalityService.getById(this.id).subscribe(
      response => {
        console.log(response);
        this.modality = response.result;
        this.toCompleteForm();
        this.requesting = false;
      },
      error => this.requesting = false
    )
  }

  get f() {
    return this.formEdit.controls;
  }

  toCompleteForm() {
    this.formEdit.patchValue({
      name: this.modality.name,
      unit: this.modality.unit
    })
  }

  createModalityEdit() {
    var modality = new Modality();
    modality.name = this.formEdit.value.name;
    modality.unit = this.formEdit.value.unit;
    return modality;
  }

  submit() {
    this.sendForm = true;
    if (this.formEdit.valid) {
      let modality = this.createModalityEdit();
      this.modalityService.update(this.id, modality).subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/modalidades-list']);
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Modalidades", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Modalidades", ["No se pudo modificar la modalidad."]);
          }
        })
    }
  }
}
