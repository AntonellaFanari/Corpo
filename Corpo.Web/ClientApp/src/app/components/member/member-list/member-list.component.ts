import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreditExpiration } from '../../../domain/credit-expiration';
import { Fee } from '../../../domain/fee';
import { MemberView } from '../../../domain/member-view';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { FeeService } from '../../../services/fee.service';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: MemberView[] = [];
  filterMember = "";
  fees: Fee[] = [];
  viewDueDate: boolean = false;
  dueDate: string;
  id: number;
  currentDate:string;
  constructor(private memberService: MemberService, private customAlertService: CustomAlertService,
    private feeService: FeeService, private dp: DatePipe) {
    this.dueDate = this.dp.transform(new Date(), 'yyyy-MM-dd');
    
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.memberService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.members = result;
        this.currentDate = this.dp.transform(new Date(), 'yyy-MM-dd, hh:mm:ss a');
        for (var i = 0; i < this.members.length; i++) {
          let member = this.members[i];
          if (member.expiration >= this.currentDate) {
            member.status = "Activo"
          } else {
            member.status = "No Activo"
          }
        }
      },
      error => console.error(error)
    );
  }

  //getAllFee() {
  //  this.feeService.getAllByIdMember()
  //}

  viewChangeDueDate() {
    this.viewDueDate = !this.viewDueDate;
  }

  getDetailsFee(id) {
    this.id = id;
    this.feeService.getAllByIdMember(this.id).subscribe(
      result => {
        console.log(result);
        this.fees = result;
      },
      error => console.error(error)
    )
  }

  changeDueDate() {
    let expiration = new CreditExpiration();
    expiration.id = this.id;
    expiration.expiration = this.dueDate;
    this.memberService.updateDueDate(expiration).subscribe(
      result => {
        console.log(result);
        this.viewDueDate = false;
        this.getAll();
      },
      error => console.error(error)
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Socios", ["¿Está seguro que desea eliminar este socio?"], () => {
      this.memberService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el socio."]);
        })
    }, true);
  }

}
