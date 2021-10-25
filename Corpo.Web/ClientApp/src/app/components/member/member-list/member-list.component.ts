import { Component, OnInit } from '@angular/core';
import { Member } from '../../../domain/member';
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
    this.memberService.getAll().subscribe(
      (result) => {
        console.log(result.result);
        this.members = result.result;
      },
      error => console.error(error)
    );
  }

}
