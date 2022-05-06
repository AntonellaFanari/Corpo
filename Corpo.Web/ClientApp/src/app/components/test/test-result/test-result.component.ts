import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestResult } from '../../../domain/test/test-result';
import { TestMemberService } from '../../../services/test-member.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {
  memberId: number;
  id: number;
  url = 'https://www.youtube.com/watch?v=KtZsQrYAJ0Y';
  testResults: TestResult[] = [];
  requestingResult: boolean;
  urlBase: string;

  constructor(private route: ActivatedRoute,
    private testMemberService: TestMemberService) {
    this.route.queryParams.subscribe(
      params => {
        this.id = parseInt(params['id']);
        this.memberId = parseInt(params['memberId']);
        this.getResult();
      });
    this.urlBase = this.testMemberService.url;
  }

  ngOnInit() {
  }


  getResult() {
    this.requestingResult = true;
    this.testMemberService.getResult(this.id).subscribe(
      response => {
        this.requestingResult = false;
        console.log("resultados: ", response.result);
        this.testResults = response.result;
      },
      error => console.error(error)
    )
  }
}
