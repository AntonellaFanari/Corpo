import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberView } from '../../../../domain/member-view';
import { MemberService } from '../../../../services/member.service';

@Component({
  selector: 'app-statistics-menu',
  templateUrl: './statistics-menu.component.html',
  styleUrls: ['./statistics-menu.component.css']
})
export class StatisticsMenuComponent implements OnInit {
  memberId: number;
  member: MemberView;

  constructor(private route: ActivatedRoute,
    private memberService: MemberService) {
    this.route.queryParams.subscribe(params => { this.memberId = parseInt(params['id']) });
    this.getMember();
  }


  ngOnInit() {
  }

  getMember() {
    this.memberService.getById(this.memberId).subscribe(
      response => this.member = response,
      error => console.error(error)
    )
  }
}
