import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseFms } from '../../../domain/test/exercise-fms';
import { TestTemplate } from '../../../domain/test/test-template';
import { TestTemplateService } from '../../../services/test-template.service';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {
  testTemplate: TestTemplate;
  id: number;
  memberId: number;
  exercisesFms: ExerciseFms[] = [];
  baseUrl: string;

  constructor(private testTemplateService: TestTemplateService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      params => {
        this.id = parseInt(params['id']);
        this.memberId = parseInt(params['memberId']);
        this.getTest();
      }
    );
    this.baseUrl = this.testTemplateService.url;
  }

  ngOnInit() {

  }

  getTest() {
    this.testTemplateService.getDetailById(this.id).subscribe(
      response => {
        console.log("test: ", response.result);
        this.testTemplate = response.result;
      },
      error => console.error(error)
    )
  }

}
