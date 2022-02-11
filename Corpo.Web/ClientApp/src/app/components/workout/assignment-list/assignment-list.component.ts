import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MemberView } from '../../../domain/member-view';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  members: MemberView[] = [];
  filterMember = "";
  dueDate: string;
  id: number;
  currentDate: string;
  from: string;
  to: string;
  requestingList: boolean;

  constructor(private memberService: MemberService, private dp: DatePipe) {
    this.dueDate = this.dp.transform(new Date(), 'yyyy-MM-dd');
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    let date = new Date();
    this.to = this.dp.transform(date.setDate(date.getDate() + 31), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requestingList = true;
    this.memberService.getAllActivePersonalized().subscribe(
      (result) => {
        this.requestingList = false;
        console.log(result);
        this.members = result;
        this.getStatusMember();
      },
      error => {
        this.requestingList = false;
        console.error(error)
      }
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
}
