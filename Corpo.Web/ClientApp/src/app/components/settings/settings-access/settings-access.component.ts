import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Role } from '../../../domain/role';
import { RoleAccess } from '../../../domain/role-access';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { SettingsService } from '../../../services/settings.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-settings-access',
  templateUrl: './settings-access.component.html',
  styleUrls: ['./settings-access.component.css']
})
export class SettingsAccessComponent implements OnInit {
  roles: Role[];
  idRoleSelect: number;
  roleAccess: RoleAccess[] = [];
  roleAccessExist: RoleAccess[] = [];
  checkboxToAccessAdmin = this.getAccessModel();
  checkboxToAccessCoach = this.getAccessModel();
  checkboxToAccessMarketing = this.getAccessModel();
  requesting = false;

  constructor(private userService: UserService,
    private settingService: SettingsService,
    private router: Router,
    private customAlertService: CustomAlertService) {
  }

  ngOnInit() {
    this.requesting = true;
    this.userService.getRoles().subscribe(
      response => {
        this.roles = response.result;
        this.getRolesAccess();
      },
      error => console.log(error)
    );
  }

  getRolesAccess() {
    this.settingService.getRoleAccess().subscribe(
      result => {
        this.roleAccess = result.result;
        console.log("accesos: ", this.roleAccess);
 
        if (this.roleAccess.length > 0) {
          this.checkboxToAccessAdmin = this.getAccessModel();
          this.checkboxToAccessCoach = this.getAccessModel();
          this.checkboxToAccessMarketing = this.getAccessModel();
          this.getAccess(this.roleAccess);
        }
        this.requesting = false;
      },
      error => this.requesting = false
    );
  }

  getAccessModel() {
    var access = [];
    if (this.roleAccess.length > 0) {
      this.roleAccess.forEach(x => {
        let ac = { access: '', checked: false };
        ac.access = x.access;
        ac.checked = false;
        access.push(ac);
      });
    }
    console.log("accesos cargados: ", access);
    return access;
  }

  getAccess(roleAccess) {
    for (let i = 0; i < roleAccess.length; i++) {
      let role = roleAccess[i];
      if (role.roleId == this.roles[0].id) {
        let nameAccess = role.access;
        this.checkboxToAccessAdmin = this.getCheckboxToAccess(this.checkboxToAccessAdmin, nameAccess);
      }
      if (role.roleId == this.roles[1].id) {
        let nameAccess = role.access;
        this.checkboxToAccessCoach = this.getCheckboxToAccess(this.checkboxToAccessCoach, nameAccess);
      } if (role.roleId == this.roles[2].id) {
        let nameAccess = role.access;
        this.checkboxToAccessMarketing = this.getCheckboxToAccess(this.checkboxToAccessMarketing, nameAccess);
      }
    }
  }

  getCheckboxToAccess(access, nameAccess) {
    for (let j = 0; j < access.length; j++) {
      const ac = access[j].access;
      if (ac === nameAccess) {
        access[j].checked = true;
      }
    }
    return access;
  }





  selectRole(event) {
    this.idRoleSelect = event;
  }

  createRoleAccess(checkboxAccess, idRole) {
    for (var i = 0; i < checkboxAccess.length; i++) {
      var checked = checkboxAccess[i].checked;
      if (checked) {
        var newAccess = new RoleAccess();
        newAccess.roleId = idRole;
        newAccess.access = checkboxAccess[i].access;
        this.roleAccess.push(newAccess);
        console.log(this.roleAccess);
      }
    }
  }


  public async submit() {
    this.roleAccess = [];
    this.createRoleAccess(this.checkboxToAccessAdmin, this.roles[0].id);
    this.createRoleAccess(this.checkboxToAccessCoach, this.roles[1].id);
    this.createRoleAccess(this.checkboxToAccessMarketing, this.roles[2].id);
    this.requesting = true;
    this.settingService.saveAccess(this.roleAccess)
      .then(() => {
        this.router.navigate(["/configuraciones"])
      })
      .catch((response) => {
        this.requesting = false;
        if (response.status === 400) {
          this.customAlertService.displayAlert("Gestión de Configuraciones", response.error.errores);
        }
        if (response.status === 500) {
          this.customAlertService.displayAlert("Gestión de Configuraciones", ["No se guardaron las configuraciones."]);
        }

      });

  }

}
