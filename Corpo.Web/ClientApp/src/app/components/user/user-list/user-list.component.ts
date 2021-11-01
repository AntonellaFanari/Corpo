import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserView } from '../../../domain/user-view';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserView[] = [];
  constructor(private userService: UserService, private customAlertService: CustomAlertService, private router: Router) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.userService.getAll().subscribe(
      result => {
        console.log(result);
        this.users = result;
        console.log(this.users);
      },
      error => console.error(error)
    );
  }

  async delete(id) {
    console.log("delete");
    this.customAlertService.displayAlert("Gestión de usuarios", ["¿Está seguro que desea eliminar este usuario?"], async () => {
      await this.userService.delete(id)
        .then(() => {
          this.getAll();
        })
        .catch((error) => {
          console.log(error)
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el usuario."]);
        });
    }, true);
  }

}
