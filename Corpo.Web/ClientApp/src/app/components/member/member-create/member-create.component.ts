import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../../domain/account';
import { AccountService } from '../../../services/account.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { MedicalHistoryCreateComponent } from '../medical-history/medical-history-create/medical-history-create.component';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  id: number;
  @ViewChild(MemberFormComponent, { static: false }) formMember: MemberFormComponent;
  constructor(private memberService: MemberService, private router: Router, private customAlertService: CustomAlertService, private accountService: AccountService) { }

  ngOnInit() {
  }

  return() {
    if (this.accountService.isAuthenticated()) {
      this.router.navigate(['/member-list']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  submit() {
    const newMember = this.formMember.createMember();
    if (newMember !== null) {
      this.memberService.add(newMember).subscribe(
        result => {
          console.log(result.result.id);
          let id = result.result.id;
          this.customAlertService.displayAlert("Gestión de Socios", ["¿Desea cargar la historia médica?"], () => {
            this.router.navigate(["/historia-médica-crear"], { queryParams: { id: id } })
          }, true, () => { this.router.navigate(["/member-list"]); })
        },
        error => {
          console.error(error);
          if (error.status === 400) {
            this.customAlertService.displayAlert("Gestión de Socios", error.error.errores);
          }
          if (error.status === 500) {
            this.customAlertService.displayAlert("Gestión de Socios", ["No se pudo guardar el socio."]);
          }
        })
    }
  }
}
