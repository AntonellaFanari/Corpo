import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedUser } from '../../../domain/logged-user';
import { Member } from '../../../domain/member';
import { User } from '../../../domain/user';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  id: number;
  user: LoggedUser;
  @ViewChild(MemberFormComponent, { static: true }) formMember: MemberFormComponent;
  requesting: boolean;

  constructor(private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router,
    private customAlertService: CustomAlertService,
    private accountService: AccountService) {
    this.user = this.accountService.getLoggedUser();
    if (this.user.userType == 2) {
      this.id = this.user.id;
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
    this.formMember.getMemberUpdate(this.id);
  }

  finishRequesting() {
    this.requesting = false;
  }

  public submit() {
    var memberUpdate = this.formMember.createMember();
    console.log(memberUpdate);
    this.memberService.update(this.id, memberUpdate).subscribe(
      result => {
        console.log(result);
        if (this.user.userType == 2) {
          this.router.navigate(['/datos-personales']);
        } else {
          this.router.navigate(['/member-list']);
        }
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Socios", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Socios", ["No se pudo modificar el socio."]);
        }
      });
  }

}
