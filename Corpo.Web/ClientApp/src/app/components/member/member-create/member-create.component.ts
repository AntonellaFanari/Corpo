import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../../domain/account';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  id: number;
  @ViewChild(MemberFormComponent, { static: false }) formMember: MemberFormComponent;
  constructor(private memberService: MemberService, private router: Router, private customAlertService: CustomAlertService) { }

  ngOnInit() {
  }

  public async submit(): Promise<any> {
    const newMember = this.formMember.createMember();
    if (newMember !== null) {
      await this.memberService.add(newMember)
        .then((resp) => {
          let id = resp.result;
          this.router.navigate([""], { queryParams: { id: id } });
        })
        .catch((response) => {
          if (response.status === 400) {
            this.customAlertService.displayAlert("Gestión de Socios", response.error.errores);
          }
          if (response.status === 500) {
            this.customAlertService.displayAlert("Gestión de Socios", ["No se pudo guardar el socio."]);
          }
        });
    }
  }

}
