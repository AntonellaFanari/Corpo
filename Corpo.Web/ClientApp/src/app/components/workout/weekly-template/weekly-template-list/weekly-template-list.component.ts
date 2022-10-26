import { Component, OnInit } from '@angular/core';
import { WeeklyTemplate } from '../../../../domain/wod/weekly-template';
import { WeeklyTemplateService } from '../../../../services/wod/weekly-template.service';

@Component({
  selector: 'app-weekly-template-list',
  templateUrl: './weekly-template-list.component.html',
  styleUrls: ['./weekly-template-list.component.css']
})
export class WeeklyTemplateListComponent implements OnInit {
  requesting = false;
  weeklyTemplates: WeeklyTemplate[] = [];
  filterName = "";

  constructor(private weeklyTemplateService: WeeklyTemplateService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.requesting = true;
    this.weeklyTemplateService.getAll().subscribe(
      response => {
        console.log("plantillas semanales: ", response.result);
        this.weeklyTemplates = response.result;
        this.requesting = false;
      },
      error => {
        console.error(error);
        this.requesting = false;
      }    )
  }

}
