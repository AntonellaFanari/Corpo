import { ViewChildren } from '@angular/core';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fi } from 'date-fns/locale';
import * as moment from 'moment';
import { Periodization } from 'src/app/domain/wod/periodization';
import { PeriodizationService } from 'src/app/services/wod/periodization.service';
import { MemberView } from '../../../domain/member-view';
import { Wod, WodGroup, WodTemplate, wodTemplateResponse } from '../../../domain/wod';
import { WodMember } from '../../../domain/wod-member';
import { AnamnesisService } from '../../../services/anamnesis.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { WodMemberService } from '../../../wod/wod-member.service';
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
  newWods: Array<{ wodNumber: number, wod: Wod }> = [];
  periodization: Periodization;
  requestingPeriodization: boolean;
  diplayMedicalHistory: boolean = false;
  weekNumber: number;
  wodNumber: number;
  wods: wodTemplateResponse[] = [];
  selectedWeekNumber: number;
  modeCreate: boolean;
  mode = "None";
  wodTemplateId: number;
  requestingAssignment: boolean;
  @ViewChild('wod-template-table', { static: false }) wodsTable: ElementRef;
  level: number;

  constructor(private wodTemplateService: WodTemplateService, private route: ActivatedRoute,
    private memberService: MemberService,
    private periodizationService: PeriodizationService,
    private wodMemberService: WodMemberService,
    private render2: Renderer2,
    private router: Router,
    private customAlertService: CustomAlertService,
    private anamnesisService: AnamnesisService) {

  }


  ngOnInit() {
    this.requestingAssignment = true;
    this.route.queryParams.subscribe(params => {
      this.memberId = parseInt(params['memberId']);
      this.weekNumber = parseInt(params['week']);
      console.log(this.memberId)

    });
    this.getLevel();
    this.getPeriodization();

    this.wodTemplateService.getAll().subscribe((data) => {
      this.wodTemplates = data.result;
      this.getMember();
    }, e => {
      this.requestingList = false;
    })

    console.log("length: ", this.newWods.length)
  }

  getLevel() {
    this.memberService.getLevel(this.memberId).subscribe(
      response => {
        console.log("nivel fisico: ", response.result);
        (response.result != null) ? this.level = response.result.level : this.level = null;
      },
      error => console.error(error)
    )
  }

  getPeriodization() {

    this.periodizationService.getByMemberId(this.memberId).subscribe(data => {
      console.log("periodization", data.result);
      if (data.result != null) {
        this.periodization = data.result;
        //this.weekNumber = parseInt(this.periodization.periodizationWeeks.find(x => x.planned == "false").weekNumber);
        this.getWeekPlanned();
      }

      this.requestingAssignment = false;

    }, error => {

      this.requestingAssignment = false;
    })
  }

  getWeekPlanned() {
      let weeksPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true");
      if (weeksPlanned.length > 0 ) {
        this.setClassSelect(weeksPlanned);
        if (this.weekNumber !=0) {
          this.selectWeekNumber(this.weekNumber);
        } else {
          this.selectWeekNumber(weeksPlanned[weeksPlanned.length - 1].weekNumber);
        }
      }

  }


  setClassSelect(weeks) {
    var select = document.getElementsByClassName("week-option");
    console.log("options: ", select);
    for (var i = 0; i < select.length; i++) {
      console.log("option: ", select[i].textContent);
      let plannedWeek = weeks.find(x => x.weekNumber == select[i].textContent);
      if (plannedWeek) {
        select[i].classList.remove("week-not-planned");
        select[i].classList.add("week-planned");
      }
    }
  }

  getMember() {
    this.memberService.getById(this.memberId).subscribe(
      result => {
        this.member = result.result;
      },
      error => console.error(error)
    )
  }

  //getWodMember(id) {
  //  this.wodMemberService.getByPeriodizationId(id, this.selectedWeekNumber).subscribe(
  //    response => {
  //      console.log("wods: ", response.result);
  //      this.wods = (response.result as wodTemplateResponse[]);
  //      this.modeCreate = true;
  //      if (this.wods.length > 0) {
  //        for (var i = 1; i < this.wods.length + 1; i++) {
  //          this.newWods.push({ wodNumber: i, wod: this.getWod(this.wods[i]) })
  //        }
  //      }
  //    },
  //    error => console.error(error)
  //  )
  //}

  getById(id: number) {
    console.log(this.weekNumber);
    if (this.periodization && this.weekNumber>0) {
      this.requestingAssignment = true;
      this.wodMemberService.add(id, this.weekNumber, this.periodization).subscribe(
        response => {
          this.requestingAssignment = false;
          console.log("wods guardados");
          this.router.navigate(['/editar-asignacion-wod'], { queryParams: { id: this.periodization.id, week: this.weekNumber, memberId: this.periodization.memberId } });
        },
        error => console.error(error)
      )
    } else {
      if (!this.periodization) {
        this.customAlertService.displayAlert("Gestion de Periodizacioness", ["Debe crear la periodización."]);
      } else {
        this.customAlertService.displayAlert("Gestion de Periodizacioness", ["Debe seleccionar una semana."]);
      }
     
    }
   

  }

  selectWeekNumber(weekNumber) {
    this.weekNumber = weekNumber;
    let weeksPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true" && x.weekNumber == weekNumber);
    if (weeksPlanned.length > 0) {
      this.router.navigate(['/editar-asignacion-wod'], { queryParams: { id: this.periodization.id, week: this.weekNumber, memberId: this.periodization.memberId } });
    }
  }

  updateWeek() {
    this.ngOnInit();
  }

  cancel() {
    this.newWods = [];
  }

  cancelWod() {
    this.wod = null;
  }

  deleteWod(wodNumber) {
    console.log(wodNumber)
  }

  getWod(wodTemplate: wodTemplateResponse): Wod {
    var wod = new Wod();
    wod.id = wodTemplate.id;
    var indexes = wodTemplate.wodGroups.map(x => x.groupIndex);
    indexes = indexes.filter((x, i, a) => a.indexOf(x) == i)
    wod.name = wodTemplate.name;
    wod.goal = wodTemplate.goal;
    wod.mode = "None";

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
