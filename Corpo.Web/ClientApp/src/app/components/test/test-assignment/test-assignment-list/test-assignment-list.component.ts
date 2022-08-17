import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberView } from '../../../../domain/member-view';
import { TestMember } from '../../../../domain/test/test-member';
import { TestTemplate } from '../../../../domain/test/test-template';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { MemberService } from '../../../../services/member.service';
import { TestMemberService } from '../../../../services/test-member.service';
import { TestTemplateService } from '../../../../services/test-template.service';

@Component({
  selector: 'app-test-assignment-list',
  templateUrl: './test-assignment-list.component.html',
  styleUrls: ['./test-assignment-list.component.css']
})
export class TestAssignmentListComponent implements OnInit {
  filterName = "";
  id: number;
  testsMember: TestMember[] = [];
  requestingList: boolean;
  member: MemberView;

  constructor(private testMemberService: TestMemberService,
    private route: ActivatedRoute,
    private memberService: MemberService,
    private customAlertService: CustomAlertService) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']);
      this.getMember();
    });
    this.getAllTestMemberByMember();
  }

  ngOnInit() {
  }

  getMember() {
    this.memberService.getById(this.id).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response.result;
      },
      error => console.error(error)
    )
  }

  getAllTestMemberByMember() {
    this.requestingList = true;
    this.testMemberService.getAllByMemberId(this.id).subscribe(
      response => {
        this.requestingList = false;
        console.log("test: ", response.result);
        this.testsMember = response.result;
      },
      error => this.requestingList = false
    )
  }


  delete(id) {
    this.customAlertService.displayAlert("Gestión de Test", ["¿Está seguro que desea eliminar este test?"], () => {
      this.testMemberService.delete(id).subscribe(
        result => {
          this.getAllTestMemberByMember();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el test."]);
        })
    }, true);
  }

}
