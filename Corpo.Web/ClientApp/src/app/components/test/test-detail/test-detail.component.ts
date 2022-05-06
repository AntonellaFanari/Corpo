import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private testTemplateService: TestTemplateService,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(
      params => {
        this.id = parseInt(params['id']);
        this.getTest();
      }
    )
  }

  ngOnInit() {

  }

  getTest() {
    this.testTemplateService.getById(this.id).subscribe(
      response => {
        console.log("test: ", response.result);
        this.testTemplate = response.result;
      },
      error => console.error(error)
    )
  }

}
