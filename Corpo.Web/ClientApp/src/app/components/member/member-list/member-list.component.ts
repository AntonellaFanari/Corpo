import { Component, OnInit } from '@angular/core';
import { MemberView } from '../../../domain/member-view';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: MemberView[] = [];
  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.memberService.getAll().subscribe(
      (result) => {
        console.log(result);
        this.members = result;
      },
      error => console.error(error)
    );
  }

}
