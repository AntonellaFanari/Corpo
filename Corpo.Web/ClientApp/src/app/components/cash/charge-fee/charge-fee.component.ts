import { Component, OnInit } from '@angular/core';
import { MemberView } from '../../../domain/member-view';
import { Plan } from '../../../domain/plan';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-charge-fee',
  templateUrl: './charge-fee.component.html',
  styleUrls: ['./charge-fee.component.css']
})
export class ChargeFeeComponent implements OnInit {

  members: MemberView[] = [];
  plans: Plan[] = []
  constructor(private membersService: MemberService) { }

  ngOnInit() {
    this.membersService.getAll().subscribe(
      result => {
        this.members = result;
      },
      error => console.error(error));

    this.plans = [{ id: 2, name: 'Personalizado-8', credits: 8, price: 1200 },
      { id: 1, name: 'Personalizado-20', credits: 20, price: 2500 },
      { id: 3, name: 'Grupal-Libre', credits: 24, price: 3000 }    ]
  }

}
