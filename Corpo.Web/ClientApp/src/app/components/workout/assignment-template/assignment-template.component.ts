import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberView } from '../../../domain/member-view';
import { Wod, WodGroup, WodTemplate, wodTemplateResponse } from '../../../domain/wod';
import { WodGroupMember } from '../../../domain/wod-group-member';
import { WodMember } from '../../../domain/wod-member';
import { MemberService } from '../../../services/member.service';
import { WodTemplateService } from '../../../wod/wod-template.service';

@Component({
  selector: 'app-assignment-template',
  templateUrl: './assignment-template.component.html',
  styleUrls: ['./assignment-template.component.css']
})
export class AssignmentTemplateComponent implements OnInit {
  wodTemplates: WodTemplate[] = [];
  filterName: string = "";
  selectedWod: wodTemplateResponse;
  wod: Wod;
  requestingWod: boolean;
  requestingList: boolean;
  id: number;
  member: MemberView;

  constructor(private wodTemplateService: WodTemplateService, private route: ActivatedRoute, private memberService: MemberService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) });
  }

  ngOnInit() {
    this.requestingList = true;
    this.wodTemplateService.getAll().subscribe((data) => {
      this.requestingList = false;
      this.wodTemplates = data.result;
      this.getMember();
    }, e => {
      this.requestingList = false;
    })
  }

  getMember() {
    this.memberService.getById(this.id).subscribe(
      result => {
        console.log(result);
        this.member = result;
      },
      error => console.error(error)
    )
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
