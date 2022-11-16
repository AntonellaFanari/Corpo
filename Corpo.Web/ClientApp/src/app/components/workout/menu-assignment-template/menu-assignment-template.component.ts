import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberView } from '../../../domain/member-view';
import { Wod, WodGroup, wodTemplateResponse } from '../../../domain/wod';
import { Periodization } from '../../../domain/wod/periodization';
import { WeeklyTemplate } from '../../../domain/wod/weekly-template';
import { AnamnesisService } from '../../../services/anamnesis.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { PeriodizationService } from '../../../services/wod/periodization.service';
import { WeeklyTemplateService } from '../../../services/wod/weekly-template.service';
import { WodMemberService } from '../../../wod/wod-member.service';
import { WodTemplateService } from '../../../wod/wod-template.service';
import { MemberViewComponent } from '../../member/member-view/member-view.component';
import { AssignmentCalendarComponent } from '../assignment-calendar/assignment-calendar.component';

@Component({
  selector: 'app-menu-assignment-template',
  templateUrl: './menu-assignment-template.component.html',
  styleUrls: ['./menu-assignment-template.component.css']
})
export class MenuAssignmentTemplateComponent implements OnInit {


  @ViewChild(AssignmentCalendarComponent, { static: false }) calendar: AssignmentCalendarComponent;
  @ViewChild(MemberViewComponent, { static: true }) informationMember: MemberViewComponent;
  weeklyTemplates: WeeklyTemplate[] = [];
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
  weeklyTemplateId: number;
  requestingAssignment: boolean;
  @ViewChild('wod-template-table', { static: false }) wodsTable: ElementRef;
  level: number;
  weekValid = true;
  selectedWeeklyTemplateId: number;
  selects: HTMLCollectionOf<Element>;

  constructor(private wodTemplateService: WodTemplateService,
    private route: ActivatedRoute,
    private memberService: MemberService,
    private periodizationService: PeriodizationService,
    private wodMemberService: WodMemberService,
    private render2: Renderer2,
    private router: Router,
    private customAlertService: CustomAlertService,
    private anamnesisService: AnamnesisService,
    private weeklyTemplateService: WeeklyTemplateService) { }

  ngOnInit() {
    this.selects = document.getElementsByClassName("week-option");
    this.requestingAssignment = true;
    this.route.queryParams.subscribe(params => {
      this.memberId = parseInt(params['memberId']);
      this.weekNumber = parseInt(params['week']);
      console.log(this.memberId);
      this.getWodsTemplates();
    });



    console.log("length: ", this.newWods.length)
  }

  getWodsTemplates() {
    this.weeklyTemplateService.getAll().subscribe((data) => {
      this.weeklyTemplates = data.result;
      this.getMember();
    }, e => {
      this.requestingList = false;
    })
  }

  getMember() {
    this.memberService.getById(this.memberId).subscribe(
      result => {
        this.member = result.result;

        this.getLevel();
        this.getPeriodization();
      },
      error => console.error(error)
    )
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
        this.getPeriodizationWeekValid();
        //this.weekNumber = parseInt(this.periodization.periodizationWeeks.find(x => x.planned == "false").weekNumber);


        this.requestingAssignment = false;


      } else {
        this.requestingAssignment = false;
      }

    }, error => {

      this.requestingAssignment = false;
    })
  }

  getPeriodizationWeekValid() {
    this.wodMemberService.getAll(this.memberId).subscribe(
      response => {
        console.log("wods vigentes: ", response.result);
        if (response.result) this.weekValid = false;
        this.getWeekPlanned();
      },
      error => console.error(error)
    )
  }

  getWeekPlanned() {
    let weeksPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true");
    if (weeksPlanned.length > 0) {
      this.setClassSelect(weeksPlanned);

    }

  }


  setClassSelect(weeks) {

    console.log("options: ", this.selects);
    for (var i = 0; i < this.selects.length; i++) {
      console.log("option: ", this.selects[i].textContent);
      let plannedWeek = weeks.find(x => x.weekNumber == this.selects[i].textContent);
      if (plannedWeek) {
        this.selects[i].classList.remove("week-not-planned");
        this.selects[i].classList.add("week-planned");
      }
    }
  }


  getById(id: number) {
    console.log(this.weekNumber);
    if (this.periodization && this.weekNumber > 0) {
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

  selectWeeklyTemplate(id) {
    this.selectedWeeklyTemplateId = id;
  }

  goToPlanning() {
    if (this.weekNumber) {
      let weekPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true" && x.weekNumber == this.weekNumber.toString());
      if (weekPlanned.length > 0) {
        this.router.navigate(['/editar-asignacion-wod'], { queryParams: { id: this.periodization.id, memberId: this.memberId, week: this.weekNumber } });
      } else {
        if (this.selectedWeeklyTemplateId) {
          this.router.navigate(['/asignacion-plantilla'], { queryParams: { id: this.periodization.id, week: this.weekNumber, memberId: this.memberId, weeklyTemplateId: this.selectedWeeklyTemplateId } });
        } else {
          this.customAlertService.displayAlert("Gestion de Periodizacioness", ["Debe seleccionar una plantilla."]);
        }
      }

    } else {
      this.customAlertService.displayAlert("Gestion de Periodizacioness", ["Debe seleccionar una semana."]);
    }
  }

  selectWeekNumber(weekNumber) {
    this.weekNumber = weekNumber;

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
          unitType: e.unitType,
          units: e.units,
          intensityType: e.intensityType,
          intensityValue: e.intensityValue
        }
      });
      wodGroup.exercises = exercises;
      wodGroup.detail = wodTemplate.wodGroups.find(x => x.groupIndex == i).detail;
      wod.addGroup(wodGroup)

    })
    return wod;
  }

}
