import { Component, OnInit } from '@angular/core';
import { MemberView } from '../../../domain/member-view';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-charge-fee',
  templateUrl: './charge-fee.component.html',
  styleUrls: ['./charge-fee.component.css']
})
export class ChargeFeeComponent implements OnInit {

  members: MemberView[] = [];
  constructor(private membersService: MemberService) { }

  ngOnInit() {
    this.membersService.getAll().subscribe(
      result => {
        this.members = result;
      },
      error => console.error(error))
  }

}
