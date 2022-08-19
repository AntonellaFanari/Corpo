import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedUser } from '../../../domain/logged-user';
import { User } from '../../../domain/user';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent{
  user: LoggedUser;
  id: number;
  modifyingPersonalInformation: boolean = false;
  @ViewChild(UserFormComponent, { static: true }) formUser: UserFormComponent;
  requesting: boolean;

  constructor(private accountService: AccountService, private userService: UserService, private route: ActivatedRoute, private router: Router, private customAlertService: CustomAlertService) {
    this.user = this.accountService.getLoggedUser();
    if (this.user.userType == 1 && this.user.roleName == "Administrador") {
      this.id = this.user.id;
      this.modifyingPersonalInformation = true;
    } else {
      this.route.queryParams.subscribe(params => {
        this.id = parseInt(params['id'])
      });
    }
  }

  ngOnInit() {
    this.getFormEdit();
  }

  getFormEdit() {
    this.requesting = true;
    this.formUser.getUserUpdate(this.id);
  }

  finishRequesting() {
    this.requesting = false;
  }

  public submit(){
    var userUpdate = this.formUser.createUser();
    console.log(userUpdate);
    this.userService.update(this.id, userUpdate).subscribe(
      result => {
        console.log(result);
        if (this.modifyingPersonalInformation) {
          this.router.navigate(['/datos-personales']);
        } else {
          this.router.navigate(['/user-list']);
        }
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Usuarios", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Usuarios", ["No se pudo guardar el usuario."]);
        }
      });
  }
}
