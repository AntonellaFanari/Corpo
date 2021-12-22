import { Component, OnInit } from '@angular/core';
import { MemberView } from '../../../domain/member-view';
import { Plan } from '../../../domain/plan';
import { MemberService } from '../../../services/member.service';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-fee-create',
  templateUrl: './fee-create.component.html',
  styleUrls: ['./fee-create.component.css']
})
export class FeeCreateComponent implements OnInit {
  members: MemberView[] = [];
  plans: Plan[] = [];
  filterMember = "";

  constructor(private membersService: MemberService, private planService: PlanService) { }

  ngOnInit() {
    this.membersService.getAll().subscribe(
      result => {
        this.members = result;
      },
      error => console.error(error));
    this.planService.getAll().subscribe(
      result => {
        console.log(result);
        this.plans = result;
      },
      error => console.error(error)
    )
  }

}
