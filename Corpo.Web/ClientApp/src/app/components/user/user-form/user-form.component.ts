import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../domain/role';
import { User } from '../../../domain/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles: Role[] = [];
  formCreate: FormGroup;
  sendForm: boolean = false;
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.formCreate = this.formBuilder.group({
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.min(8), Validators.max(15)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      address: ['', Validators.required],
      role: ['', Validators.required]
    })
  }
  ngOnInit() {
    this.userService.getRoles().
      subscribe(
        result => {
          this.roles = result;
          console.log(this.roles);
        },
        error => console.error(error)
      )
  }
  get f() {

    return this.formCreate.controls;

  }
  createUser() {
    this.sendForm = true;
    if (this.formCreate.valid) {
      var newUser = new User();
      newUser.role = this.formCreate.value.role;
      newUser.lastName = this.formCreate.value.lastName;
      newUser.name = this.formCreate.value.name;
      newUser.birthDate = this.formCreate.value.birthDate;
      newUser.phone = this.formCreate.value.phone;
      newUser.address = this.formCreate.value.address;
      newUser.email = this.formCreate.value.email;
      newUser.password = this.formCreate.value.password;
      return newUser;
    }
   
  }
}
