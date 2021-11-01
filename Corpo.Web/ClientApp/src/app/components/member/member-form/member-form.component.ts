import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../../../domain/account';
import { Member } from '../../../domain/member';
import { MemberService } from '../../../services/member.service';
import { Password } from '../../validations/password';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  formCreate: FormGroup;
  dt: Date = new Date();
  unamePattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,15}$";
  following: boolean = false;

  constructor(private formBuilder: FormBuilder, private memberService: MemberService, private router: Router) {
    this.formCreate = this.formBuilder.group({
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      birthDate: [this.dt, Validators.required],
      phone: ['', Validators.required],
      socialSecurity: '',
      address: ['', Validators.required],
      emergencyPhone: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      instagram: '',
      facebook: '',
      planId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.unamePattern)]],
      repeatPassword: '',
    }, { validators: Password.mustMatch('password', 'repeatPassword') })
  }
  ngOnInit() {
  }

  get f() {

    return this.formCreate.controls;

  }

  selectPlan(event) {
    console.log(event);
    this.formCreate.value.planId = event;
    console.log(this.formCreate.value.planId);
  }

  fillInEmptyFormFields() {
    let form = this.formCreate.value;
    for (const control in form) {
      if (form[control] =='' || "") {
        form[control] = "-";
      }
    }
  }

  createMember() {
    this.following = true;
    if (this.formCreate.valid) {
      this.fillInEmptyFormFields();
      let newMember = new Member();
      newMember.lastName = this.formCreate.value.lastName;
      newMember.name = this.formCreate.value.name;
      newMember.birthDate = this.formCreate.value.birthDate;
      newMember.address = this.formCreate.value.address;
      newMember.phone = this.formCreate.value.phone;
      newMember.socialSecurity = this.formCreate.value.socialSecurity;
      newMember.emergencyPhone = this.formCreate.value.emergencyPhone;
      newMember.emergencyContact = this.formCreate.value.emergencyContact;
      newMember.instagram = this.formCreate.value.instagram;
      newMember.facebook = this.formCreate.value.facebook;
      newMember.planId = this.formCreate.value.planId;
      newMember.email = this.formCreate.value.email;
      newMember.password = this.formCreate.value.password;
      console.log(newMember);
      return newMember;
    } else {
      return null;
    }
  }

}
