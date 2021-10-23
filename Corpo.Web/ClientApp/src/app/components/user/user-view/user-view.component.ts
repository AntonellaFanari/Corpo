import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../domain/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  id: number;
  role: string;
  user: User;
  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']),
        this.role = params['role'];
    });
  }

  ngOnInit() {
    this.userService.getById(this.id).subscribe(
      result => {
        this.user = result;
        console.log(this.user);
      },
      error => console.error(error)
    );
  }

}
