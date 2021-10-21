import { Component, OnInit } from '@angular/core';
import { UserView } from '../../../domain/user-view';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserView[] = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      result => {
        this.users = result;
        console.log(this.users);
      },
      error => console.error(error)
    );
  }

}
