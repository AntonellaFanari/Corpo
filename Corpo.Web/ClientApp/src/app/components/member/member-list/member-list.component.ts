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
  currentDate: string;
  from: string;
  to: string;
  filterUser = "";
  requestingList: boolean;
  requestingFees: boolean;

  constructor(private memberService: MemberService, private customAlertService: CustomAlertService,
    private feeService: FeeService, private dp: DatePipe) {
    this.dueDate = this.dp.transform(new Date(), 'yyyy-MM-dd');
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    let date = new Date();
    this.to = this.dp.transform(date.setDate(date.getDate() + 31), 'yyyy-MM-dd');

  }

  ngOnInit() {
    this.requestingList = true;
    this.requestingFees = true;
    this.getAll();
  }

  getAll() {
    this.memberService.getAll().subscribe(
      (result) => {
        this.requestingList = false;
        this.members = result;
        this.getStatusMember();
      },
      error => this.requestingList = false
    );
  }

  getStatusMember() {
    this.currentDate = this.dp.transform(new Date(), 'yyy-MM-dd, hh:mm:ss a');
    for (var i = 0; i < this.members.length; i++) {
      let member = this.members[i];
      if (member.expiration >= this.currentDate) {
        member.status = "Activo"
      } else {
        member.status = "No Activo"
      }
    }
  }


  viewChangeDueDate() {
    this.viewDueDate = !this.viewDueDate;
  }

  closeChangeDueDate() {
    this.viewDueDate = false;
  }

  getDetailsFee(id) {
    this.id = id;
    this.feeService.getAllByIdMember(this.id).subscribe(
      result => {
        this.requestingFees = false;
        this.fees = result;
      },
      error => this.requestingFees = false
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
    this.customAlertService.displayAlert("Gesti??n de Socios", ["??Est?? seguro que desea eliminar este socio?"], () => {
      this.memberService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminaci??n", ["Error al intentar eliminar el socio."]);
        })
    }, true);
  }

  filter() {
    this.memberService.getByDateExpiration(this.from, this.to).subscribe(
      result => {
        console.log(result);
        this.members = result;
        this.getStatusMember();
      },
      error => console.error(error)
    )
  }

  deleteFilter() {
    this.getAll();
  }

}
