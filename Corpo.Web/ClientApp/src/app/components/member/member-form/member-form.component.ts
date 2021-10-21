import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Member } from '../../../domain/member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
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
      emergencyPhone: '',
      emergencyContact: '',
      instagram: ''
    })
  }
  ngOnInit() {
  }

  createMember() {
    var newMember = new Member();
    newMember.lastName = this.formCreate.value.lastName;
    newMember.name = this.formCreate.value.name;
    newMember.birthDate = this.formCreate.value.birthDate;
    newMember.address = this.formCreate.value.address;
    newMember.email = this.formCreate.value.email;
    newMember.password = this.formCreate.value.password;
    newMember.emergencyPhone = this.formCreate.value.emergencyPhone;
    newMember.emergencyContact = this.formCreate.value.emergencyContact;
    newMember.instagram = this.formCreate.value.instagram;
    return newMember;
  }

}
