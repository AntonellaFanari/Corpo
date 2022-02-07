import { Component, OnInit } from '@angular/core';
import { Wod, WodGroup, WodTemplate, wodTemplateResponse } from 'src/app/domain/wod';
import { WodTemplateService } from 'src/app/wod/wod-template.service';

@Component({
  selector: 'app-wod-template-list',
  templateUrl: './wod-template-list.component.html',
  styleUrls: ['./wod-template-list.component.css']
})
export class WodTemplateListComponent implements OnInit {

  wodTemplates: WodTemplate[] = [];
  filterName: string = "";
  selectedWod: wodTemplateResponse;
  wod: Wod;
  requestingWod: boolean;
  requestingList: boolean;

  constructor(private wodTemplateService: WodTemplateService) { }

  ngOnInit() {
    this.requestingList = true;
    this.wodTemplateService.getAll().subscribe((data) => {
      this.requestingList = false;
      this.wodTemplates = data.result;
    }, e => {
      this.requestingList = false;
    })
  }

  getById(id: number) {
    this.requestingWod = true;
    this.wodTemplateService.getById(id).subscribe((data) => {
      this.selectedWod = (data.result as wodTemplateResponse);
      this.wod = this.getWod(this.selectedWod)
      this.requestingWod = false;
    }, e => {
      this.requestingWod = false;
    })
  }


  cancelWod() {
    this.wod = null;
  }
  getWod(wodTemplate: wodTemplateResponse): Wod {
    var wod = new Wod();
    wod.id = wodTemplate.id;
    var indexes = wodTemplate.wodGroups.map(x => x.groupIndex);
    indexes = indexes.filter((x, i, a) => a.indexOf(x) == i)
    wod.name = wodTemplate.name;

    indexes.forEach(i => {
      var wodGroup = new WodGroup();
      var exercises = wodTemplate.wodGroups.filter(x => x.groupIndex == i).map(e => {
        console.log("modality", e.modality)
        return {

          exercise: e.exercise,
          modality: e.modality,
          units: e.units
        }
      });
      wodGroup.exercises = exercises;
      wodGroup.detail = wodTemplate.wodGroups.find(x => x.groupIndex == i).detail;
      wod.addGroup(wodGroup)

    })
    return wod;
  }

}
