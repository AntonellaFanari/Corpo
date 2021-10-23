import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../domain/user';
import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent{
  user: User;
  id: number;
  @ViewChild(UserFormComponent, { static: true }) formUser: UserFormComponent;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id'])
    });
  }

  ngOnInit() {
    this.formUser.getUserUpdate(this.id);
  }

  

  public submit(){
    var userUpdate = this.formUser.createUser();
    console.log(userUpdate);
    this.userService.update(this.id, userUpdate);
    console.log("pase por aqui");
    this.router.navigate(['/user-list']);
  }
}
