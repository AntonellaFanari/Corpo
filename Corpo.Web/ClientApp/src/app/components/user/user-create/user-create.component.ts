import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  @ViewChild(UserFormComponent, { static: false }) formUser: UserFormComponent;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  submit() {
    var newUser = this.formUser.createUser();
    console.log(newUser);
    this.userService.add(newUser);
  }

}
