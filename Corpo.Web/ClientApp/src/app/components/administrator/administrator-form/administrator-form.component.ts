import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-administrator-form',
  templateUrl: './administrator-form.component.html',
  styleUrls: ['./administrator-form.component.css']
})
export class AdministratorFormComponent implements OnInit {
  formCreate: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.formCreate = this.formBuilder.group({
      lastName: '',
      name: '',
      birthDate: '',
      mobile: '',
      email: '',
      password: '',
      repeatPassword: '',
      address: '',
      category: 'Administrador'
    })
  }

  ngOnInit() {
  }

  //createAdministrator() {
  //  var newAdministrator = new Administrator();
  //  newAdministrator.category = this.formCreate.value.category;
  //  newAdministrator.lastName = this.formCreate.value.lastName;
  //  newAdministrator.name = this.formCreate.value.name;
  //  newAdministrator.birthDate = this.formCreate.value.birthDate;
  //  newAdministrator.address = this.formCreate.value.address;
  //  newAdministrator.email = this.formCreate.value.email;
  //  newAdministrator.password = this.formCreate.value.password;
  //  return newAdministrator;
  //}


}
