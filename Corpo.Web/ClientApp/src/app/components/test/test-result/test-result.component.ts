import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from '../../../domain/test/test-result';
import { MemberService } from '../../../services/member.service';
import { TestMemberService } from '../../../services/test-member.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {
  memberId: number;
  id: number;
  testResults: TestResult[] = [];
  requestingResult: boolean;
  urlBase: string;
  member: string;
  level: number;

  constructor(private route: ActivatedRoute,
    private testMemberService: TestMemberService,
    private memberService: MemberService) {
    this.route.queryParams.subscribe(
      params => {
        this.id = parseInt(params['id']);
        this.memberId = parseInt(params['memberId']);
        this.level = parseInt(params['level']);
        this.getMember();

      });
    this.urlBase = this.testMemberService.url;
  }

  ngOnInit() {
  }

  getMember() {
    this.requestingResult = true;
    this.memberService.getById(this.memberId).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response.result.lastName + " " + response.result.name;
        this.getResult();
      },
      error => console.error)
  }

  getResult() {
    this.requestingResult = true;
    this.testMemberService.getResult(this.id).subscribe(
      response => {
        this.requestingResult = false;
        console.log("resultados: ", response.result);
        this.testResults = response.result;
      },
      error => this.requestingResult = false
    )
  }
}
