import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Periodization } from 'src/app/domain/wod/periodization';
import { PeriodizationService } from 'src/app/services/wod/periodization.service';
import { MemberView } from '../../../domain/member-view';
import { Wod, WodGroup, WodTemplate, wodTemplateResponse } from '../../../domain/wod';
import { WodGroupMember } from '../../../domain/wod-group-member';
import { WodMember } from '../../../domain/wod-member';
import { MemberService } from '../../../services/member.service';
import { WodTemplateService } from '../../../wod/wod-template.service';
import { MemberViewComponent } from '../../member/member-view/member-view.component';
import { AssignmentCalendarComponent } from '../assignment-calendar/assignment-calendar.component';

@Component({
  selector: 'app-assignment-template',
  templateUrl: './assignment-template.component.html',
  styleUrls: ['./assignment-template.component.css']
})
export class AssignmentTemplateComponent implements OnInit {

  @ViewChild(AssignmentCalendarComponent, { static: false }) calendar: AssignmentCalendarComponent;
  @ViewChild(MemberViewComponent, { static: true }) informationMember: MemberViewComponent;
  wodTemplates: WodTemplate[] = [];
  filterName: string = "";
  selectedWod: wodTemplateResponse;
  wod: Wod;
  requestingWod: boolean;
  requestingList: boolean;
  memberId: number;
  member: MemberView;
  newWods: Array<{ date: string, wod: Wod }> = [];
  periodization: Periodization;
  requestingPeriodization: boolean;
  diplayMedicalHistory: boolean = false;

  constructor(private wodTemplateService: WodTemplateService, private route: ActivatedRoute,
    private memberService: MemberService,
    private periodizationService: PeriodizationService) {

  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.memberId = parseInt(params['memberId'])
      console.log(this.memberId)

    });

    this.requestingPeriodization = true;

    this.periodizationService.getById(this.memberId).subscribe(data => {
      console.log("periodization", data)
      this.requestingPeriodization = false;
      this.periodization = data.result;
    }, error => {
      this.requestingPeriodization = false;
    })

    this.requestingList = true;
    this.wodTemplateService.getAll().subscribe((data) => {
      this.requestingList = false;
      this.wodTemplates = data.result;
      this.getMember();
    }, e => {
      this.requestingList = false;
    })

    console.log("length: ", this.newWods.length)
  }

  getMember() {
    this.memberService.getById(this.memberId).subscribe(
      result => {
        this.member = result;
      },
      error => console.error(error)
    )
  }

  getById(id: number) {
    this.requestingWod = true;
    this.wodTemplateService.getById(id).subscribe((data) => {
      this.selectedWod = (data.result as wodTemplateResponse);
      this.calendar.selectedDates.forEach(d => {
        this.newWods.push({ date: d, wod: this.getWod(this.selectedWod) })
      })
      this.wod = this.getWod(this.selectedWod)
      this.requestingWod = false;
    }, e => {
      this.requestingWod = false;
    })
  }

  cancel() {
    this.newWods = [];
  }

  cancelWod() {
    this.wod = null;
  }

  deleteWod(date) {
    console.log(date)
  }

  getWod(wodTemplate: wodTemplateResponse): Wod {
    var wod = new Wod();
    wod.id = wodTemplate.id;
    var indexes = wodTemplate.wodGroups.map(x => x.groupIndex);
    indexes = indexes.filter((x, i, a) => a.indexOf(x) == i)
    wod.name = wodTemplate.name;
    wod.goal = wodTemplate.goal;

    indexes.forEach(i => {
      var wodGroup = new WodGroup();
      var exercises = wodTemplate.wodGroups.filter(x => x.groupIndex == i).map(e => {
        return {

          exercise: e.exercise,
          modality: e.modality,
          units: e.units,
          mode: e.mode,
          value: e.value
        }
      });
      wodGroup.exercises = exercises;
      wodGroup.detail = wodTemplate.wodGroups.find(x => x.groupIndex == i).detail;
      wod.addGroup(wodGroup)

    })
    return wod;
  }

}
