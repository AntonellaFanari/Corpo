import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../../../domain/role';
import { RoleAcces } from '../../../domain/role-acces';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { SettingsService } from '../../../services/settings.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-settings-acces',
  templateUrl: './settings-acces.component.html',
  styleUrls: ['./settings-acces.component.css']
})
export class SettingsAccesComponent implements OnInit {
  roles: Role[];
  idRoleSelect: number;
  roleAcces: RoleAcces[] = [];
  roleAccesExist: RoleAcces[] = [];
  checkboxToAccesAdmin = this.getAccesModel();
  checkboxToAccesCoach = this.getAccesModel();
  checkboxToAccesMarketing = this.getAccesModel();

  constructor(private userService: UserService, private settingService: SettingsService, private router: Router, private customAlertService: CustomAlertService) {
  }

  getAccesModel() {
    return [
      { acces: 'Caja', checked: false },
      { acces: 'Usuarios', checked: false },
      { acces: 'Socios', checked: false },
      { acces: 'Asistencias', checked: false },
      { acces: 'Deudas', checked: false },
      { acces: 'Comunicación', checked: false },
      { acces: 'Informes', checked: false },
      { acces: 'ABM', checked: false },
      { acces: 'Ajustes', checked: false }
    ];
  }

  getAcces(roleAcces) {
    for ( let i = 0; i < roleAcces.length; i++) {
      let role = roleAcces[i];
      if (role.roleId == 1) {
        let nameAcces = role.acces;
        this.checkboxToAccesAdmin = this.getCheckboxToAcces(this.checkboxToAccesAdmin, nameAcces);
       }
      if (role.roleId == 2) {
        let nameAcces = role.acces;
        this.checkboxToAccesCoach = this.getCheckboxToAcces(this.checkboxToAccesCoach, nameAcces);
      } if (role.roleId == 3) {
        let nameAcces = role.acces;
        this.checkboxToAccesMarketing = this.getCheckboxToAcces(this.checkboxToAccesMarketing, nameAcces);
      }
    } 
  }

  getCheckboxToAcces(acces, nameAcces) {
    for (let j = 0; j < acces.length; j++) {
      const ac = acces[j].acces;
      if (ac === nameAcces) {
        acces[j].checked = true;
      }
    }
    return acces;
  }

  ngOnInit() {
    this.userService.getRoles().subscribe(
      result => {
        this.roles = result;
      },
      error => console.log(error)
    );

    this.settingService.getRoleAcces().subscribe(
      result => {
        this.roleAcces = result.result;
        console.log(this.roleAcces);
        if (this.roleAcces.length != 0) {
          this.getAcces(this.roleAcces);
        }
      },
      error => console.log(error)
    );
  }

  selectRole(event) {
    this.idRoleSelect = event;
  }

  createRoleAccess(checkboxAcces, idRole) {
    for (var i = 0; i < checkboxAcces.length; i++) {
      var checked = checkboxAcces[i].checked;
      if (checked) {
        var newAcces = new RoleAcces();
        newAcces.roleId = idRole;
        newAcces.acces = checkboxAcces[i].acces;
        this.roleAcces.push(newAcces);
        console.log(this.roleAcces);
      }
    }
  }


  public async submit(): Promise<void> {
    this.roleAcces = [];
    this.createRoleAccess(this.checkboxToAccesAdmin, 1);
    this.createRoleAccess(this.checkboxToAccesCoach, 2);
    this.createRoleAccess(this.checkboxToAccesMarketing, 3);
    await this.settingService.saveAcces(this.roleAcces)
      .then(() => {
        this.router.navigate(["/"])
      })
      .catch((response) => {
        if (response.status === 400) {
          this.customAlertService.displayAlert("Gestión de Configuraciones", response.error.errores);
        }
        if (response.status === 500) {
          this.customAlertService.displayAlert("Gestión de Configuraciones", ["No se guardaron las configuraciones."]);
        }

      });

  }

}
