import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberService } from '../../../services/member.service';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {
  @ViewChild(MemberFormComponent, { static: false }) formMember: MemberFormComponent;
  constructor(private memberService: MemberService) { }

  ngOnInit() {
  }

  submit() {
    var newMember = this.formMember.createMember();
    console.log(newMember);
    this.memberService.add(newMember);
  }

}
