import { Component, OnInit } from '@angular/core';
import { TestTemplate } from '../../../../domain/test/test-template';
import { CustomAlertService } from '../../../../services/custom-alert.service';
import { TestTemplateService } from '../../../../services/test-template.service';

@Component({
  selector: 'app-test-template-list',
  templateUrl: './test-template-list.component.html',
  styleUrls: ['./test-template-list.component.css']
})
export class TestTemplateListComponent implements OnInit {
  testTemplates: TestTemplate[] = [];
  filterName = "";
  requestingList: boolean;

  constructor(private testTemplateService: TestTemplateService,
    private customAlertService: CustomAlertService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requestingList = true;
    this.testTemplateService.getAll().subscribe(
      response => {
        this.requestingList = false;
        console.log(response.result);
        this.testTemplates = response.result;
      },
      error => {
        console.error(error);
        this.requestingList = false;
      }
    )
  }

  delete(id) {
    this.customAlertService.displayAlert("Gestión de Test", ["¿Está seguro que desea eliminar este test?"], () => {
      this.testTemplateService.delete(id).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar el test."]);
        })
    }, true);
  }
}
