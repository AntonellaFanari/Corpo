import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'protractor';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  @ViewChild(UserFormComponent, { static: false }) formUser: UserFormComponent;

  constructor(private userService: UserService, private router: Router, private customAlertService: CustomAlertService) { }

  ngOnInit() {
  }

  //public async submit(): Promise<void>{
  //  var newUser = this.formUser.createUser();
  //  console.log(newUser);
  //  await this.userService.add(newUser);
  //  this.router.navigate(["/user-list"])
  //}

  public async submit(): Promise<void> {
    let newUser = this.formUser.createUser();
    await this.userService.add(newUser)
      .then(() => {
        this.router.navigate(["/user-list"])
      })
      .catch((response) => {
        if (response.status === 400) {
          this.customAlertService.displayAlert("Gestión de Usuarios", response.error.errores);
        }
        if (response.status === 500) {
          this.customAlertService.displayAlert("Gestión de Usuarios", ["No se pudo guardar el usuario."]);
        }

      });

  }

}
