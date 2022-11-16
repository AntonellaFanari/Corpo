import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestMember } from '../../../../domain/test/test-member';
import { TestTemplate } from '../../../../domain/test/test-template';
import { TestMemberService } from '../../../../services/test-member.service';
import { TestTemplateService } from '../../../../services/test-template.service';

@Component({
  selector: 'app-test-assignment-detail',
  templateUrl: './test-assignment-detail.component.html',
  styleUrls: ['./test-assignment-detail.component.css']
})
export class TestAssignmentDetailComponent implements OnInit {
  test: TestMember;
  id: number;
  requesting = false;

  constructor(private testMemberService: TestMemberService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      params => { this.id = parseInt(params['id']) }
    );
    this.getTest();
  }

  ngOnInit() {

  }

  getTest() {
    this.requesting = true;
    this.testMemberService.getDetailById(this.id).subscribe(
      response => {
        console.log(response.result);
        this.test = response.result;
        this.requesting = false;
      },
      error => this.requesting = false
    )
  }




}
