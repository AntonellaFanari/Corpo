import { Component, OnInit } from '@angular/core';
import { MemberView } from '../../../domain/member-view';
import { Plan } from '../../../domain/plan';
import { MemberService } from '../../../services/member.service';
import { PlanService } from '../../../services/plan.service';

@Component({
  selector: 'app-charge-fee',
  templateUrl: './charge-fee.component.html',
  styleUrls: ['./charge-fee.component.css']
})
export class ChargeFeeComponent implements OnInit {

  members: MemberView[] = [];
  plans: Plan[] = []
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
