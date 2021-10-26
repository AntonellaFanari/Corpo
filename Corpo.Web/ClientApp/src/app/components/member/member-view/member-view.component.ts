import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../domain/member';
import { MemberService } from '../../../services/member.service';
@Component({
  selector: 'app-member-view',
  templateUrl: './member-view.component.html',
  styleUrls: ['./member-view.component.css']
})
export class MemberViewComponent implements OnInit {
  id: number;
  role: string;
  member: Member;
  constructor(private memberService: MemberService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']),
        this.role = params['role'];
    });
  }

  ngOnInit() {
    this.memberService.getById(this.id).subscribe(
      result => {
        this.member = result;
        console.log(this.member);
      },
      error => console.error(error)
    );
  }

}
