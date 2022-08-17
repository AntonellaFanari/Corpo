import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedUser } from '../../../domain/logged-user';
import { MemberView } from '../../../domain/member-view';
import { UserView } from '../../../domain/user-view';
import { AccountService } from '../../../services/account.service';
import { MemberService } from '../../../services/member.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  user: User;
  id: number;
  userLogged: LoggedUser;
  userType: number;
  constructor(private userService: UserService, private memberService: MemberService, private router: Router, private accountService: AccountService) {
    this.userLogged = this.accountService.getLoggedUser();
    this.id = this.userLogged.id;
    this.userType = this.userLogged.userType
  }

  ngOnInit() {
    if (this.userType == 1) {
      this.userService.getById(this.id).subscribe(
        result => {
          console.log(result);
          this.user = result;
        },
        error => console.error(error)
      );
    } else {
      this.memberService.getById(this.id).subscribe(
        result => {
          console.log(result);
          this.user = result.result;
        },
        error => console.error(error)
      );
    };   
  }

  modifyPersonalInformation() {
    if (this.userType == 1) {
      this.router.navigate(['/user-edit']);
    } else {
      this.router.navigate(['/member-edit']);
    }
  }

  modifyMedicalHistory() {
    this.router.navigate(['/historia-médica-editar']);
  }

  modifyEmail() {
    this.router.navigate(['/modificar-email']);
  }

}
