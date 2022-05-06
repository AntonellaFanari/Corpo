import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberView } from '../../../domain/member-view';
import { TestMember } from '../../../domain/test/test-member';
import { TestTemplate } from '../../../domain/test/test-template';
import { TestTemplateList } from '../../../domain/test/test-template-list';
import { MemberService } from '../../../services/member.service';
import { TestMemberService } from '../../../services/test-member.service';
import { TestTemplateService } from '../../../services/test-template.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  members: MemberView[] = [];
  filterMember = "";
  dueDate: string;
  id: number;
  currentDate: string;
  from: string;
  to: string;
  requestingList: boolean;
  display = true;
  testTemplates: TestTemplateList[] = [];
  filterName = "";
  memberId: number;
  testsMember: TestMember[] = [];
  member: MemberView;

  constructor(private memberService: MemberService,
    private dp: DatePipe,
    private router: Router,
    private testTemplateService: TestTemplateService,
    private testMemberService: TestMemberService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      params => {
         this.display = Boolean(params['display']);
        console.log(this.display);
        if (!this.display) {
          this.display = false;
          this.getTestAssignment(this.testMemberService.selectedMember);
        }})
    this.dueDate = this.dp.transform(new Date(), 'yyyy-MM-dd');
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    let date = new Date();
    this.to = this.dp.transform(date.setDate(date.getDate() + 31), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requestingList = true;
    this.memberService.getAllActivePersonalized().subscribe(
      (result) => {
        this.requestingList = false;
        console.log(result);
        this.members = result;
        this.getStatusMember();
      },
      error => {
        this.requestingList = false;
        console.error(error)
      }
    );
  }

  getStatusMember() {
    this.currentDate = this.dp.transform(new Date(), 'yyy-MM-dd, hh:mm:ss a');
    for (var i = 0; i < this.members.length; i++) {
      let member = this.members[i];
      if (member.expiration >= this.currentDate) {
        member.status = "Activo"
      } else {
        member.status = "No Activo"
      }
    }
  }

  getAllTest() {
    this.requestingList = true;
    this.testTemplateService.getAll().subscribe(
      response => {
        this.requestingList = false;
        console.log(response.result);
        this.getTestTemplatesList(response.result);
      },
      error => {
        console.error(error);
        this.requestingList = false;
      }
    )
  }

  getTestTemplatesList(tests) {
    this.testTemplates = [];
    tests.forEach(x => { 
        this.testTemplates.push({
          id: x.id,
          name: x.name,
          testExercises: x.testExercises
        } as TestTemplateList);
    });
    console.log("test-list: ", this.testTemplates);

    this.getAllByMemberId();
  }

  getTestAssignment(id) {
    this.testMemberService.selectedMember = id;
    this.display = false;
    this.getAllTest();
    this.memberId = this.testMemberService.selectedMember;
    this.member = this.members.find(x => x.id == this.memberId);

  }


  getAllByMemberId() {
    this.testMemberService.getAllByMemberId(this.memberId).subscribe(
      response => {
        console.log(response.result);
        this.testsMember = response.result;
        this.testTemplates.forEach(x => {
          let assignment = this.testsMember.find(y => y.testTemplateId == x.id)
          if (assignment != null) {
            x.assignment = true;
          } else {
            x.assignment = false
          }
        })
        
      }, error => console.error(error)
    )
  }

  return() {
    this.display = true;
  }

}
