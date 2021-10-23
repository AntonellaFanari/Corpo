import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../../domain/role';
import { User } from '../../../domain/user';
import { UserService } from '../../../services/user.service';
import { Password } from '../../validations/password';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  roles: Role[] = [];
  formCreate: FormGroup;
  sendForm: boolean = false;
  dt: Date = new Date();
  user: User;
  modeCreate: boolean = true;
  unamePattern = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,15}$";
  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.formCreate = this.formBuilder.group({
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      birthDate: [this.dt, Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.pattern(this.unamePattern)],
      repeatPassword: '',
      address: ['', Validators.required],
      roleId: ['', Validators.required]
    }, { validators: Password.mustMatch('password', 'repeatPassword') })
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
      newUser.roleId = parseInt(this.formCreate.value.roleId);
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

  getUserUpdate(id) {
    this.userService.getById(id).subscribe(
      result => {
        this.user = result;
        console.log(this.user);
        this.toCompleteForm();
      },
      error => console.error(error)
    )
  }

  toCompleteForm() {
    this.modeCreate = false;
      this.dt = new Date(this.user.birthDate);
      this.formCreate.patchValue({
        lastName: this.user.lastName,
        name: this.user.name,
        birthDate: new Date(this.user.birthDate),
        phone: this.user.phone,
        email: this.user.email,
        password: this.user.password,
        repeatPassword: this.user.password,
        address: this.user.address,
        roleId: this.user.roleId,
      })

    }

   
 }
