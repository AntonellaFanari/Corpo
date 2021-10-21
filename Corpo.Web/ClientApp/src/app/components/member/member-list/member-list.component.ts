import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members = [];
  constructor(private memberService: MemberService) { }

  ngOnInit() {
    //this.memberService.getAll().subscribe(
    //  result => {
    //    this.members = [];
    //    this.members.push(result);
    //    console.log(this.members);
    //  },
    //  error => console.error(error)
    //);
  }

}
