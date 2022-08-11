import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberView } from '../../../domain/member-view';
import { Wod, WodGroup, WodTemplate, wodTemplateResponse } from '../../../domain/wod';
import { WodMember } from '../../../domain/wod-member';
import { Periodization } from '../../../domain/wod/periodization';
import { AnamnesisService } from '../../../services/anamnesis.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { PeriodizationService } from '../../../services/wod/periodization.service';
import { WodMemberService } from '../../../wod/wod-member.service';
import { WodTemplateService } from '../../../wod/wod-template.service';

@Component({
  selector: 'app-assignment-template-edit',
  templateUrl: './assignment-template-edit.component.html',
  styleUrls: ['./assignment-template-edit.component.css']
})
export class AssignmentTemplateEditComponent implements OnInit {
  id: number;
  weekNumber: number;
  memberId: number;
  wods: any[] = [];
  periodization: Periodization;
  requestingPeriodization: boolean;
  selectedWeekNumber: number;
  wodTemplate: wodTemplateResponse;
  requestingAssignment: boolean;
  member: MemberView;
  display = true;
  level: number;

  constructor(private route: ActivatedRoute,
    private wodMemberService: WodMemberService,
    private periodizationService: PeriodizationService,
    private router: Router,
    private wodTemplateService: WodTemplateService,
    private memberService: MemberService,
    private customAlertService: CustomAlertService,
    private anamnesisService: AnamnesisService) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']);
      this.weekNumber = parseInt(params['week']);
      this.memberId = parseInt(params['memberId'])
      console.log(this.id);
      console.log(this.weekNumber);
      this.getMember(this.memberId);
      this.getLevel();

    });

  }

  getMember(id) {
    this.memberService.getById(id).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response;
      },
      error => console.error(error)
    )
  }

  getLevel() {
    this.memberService.getLevel(this.memberId).subscribe(
      response => this.level = response.result.level,
      error => console.error(error)
    )
  }

  ngOnInit() {

    this.getPeriodization();
  }

  getPeriodization() {
    this.requestingAssignment = true;
    this.periodizationService.getById(this.id).subscribe(
      response => {
        console.log("periodización: ", response.result);
        this.requestingAssignment = false;
        this.periodization = response.result;
        this.display = false;
        this.memberId = this.periodization.memberId;
        this.getWeekPlanned();
        this.getWodMember();
      },
      error => this.requestingAssignment = false
    )
  }

  getWeekPlanned() {
    let weeksPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true");
    if (weeksPlanned.length > 0) {
      this.setClassSelect(weeksPlanned);
    }

  }


  setClassSelect(weeks) {
    console.log("select: ", document.getElementById("select-week"));
    let select = document.getElementsByClassName('week-option');
    console.log("options: ", select);
    for (let i = 0; i < select.length; i++) {
      console.log("option: ", select[i].textContent);
      let plannedWeek = weeks.find(x => x.weekNumber == select[i].textContent);
      if (plannedWeek) {
        select[i].classList.remove("week-not-planned");
        select[i].classList.add("week-planned");
      } else {
        select[i].classList.remove("week-planned");
        select[i].classList.add("week-not-planned");
      }
    }
  }

  getWodMember() {
    this.wods = [];
    this.wodMemberService.getByPeriodizationId(this.id, this.weekNumber).subscribe(
      response => {
        console.log("wods: ", response.result);
        var wodMembers = response.result;
        wodMembers.forEach(w => {
          this.wods.push({
            wod: this.getWod(w),
            date: "",
            wodNumber: w.wodNumber
          });
          console.log("wodMember:", w)
        })

        if (this.periodization.trainings < wodMembers.length) {
          this.customAlertService.displayAlert("Gestión de Wods", ["Debe eliminar un wod ya que modifico el nº de entrenamientos semanales."]);
        }

        console.log("wods:", this.wods)

      },
      error => console.error(error)
    )
  }

  cancel() { }

  getWod(wodMember): Wod {
    var wod = new Wod();
    wod.id = wodMember.id;
    var indexes = wodMember.wodGroupsMember.map(x => x.groupIndex);
    indexes = indexes.filter((x, i, a) => a.indexOf(x) == i)
    wod.goal = wodMember.goal;
    wod.intensityType = wodMember.intensityType;
    wod.intensity = wodMember.intensity;

    indexes.forEach(i => {
      var wodGroup = new WodGroup();
      var exercises = wodMember.wodGroupsMember.filter(x => x.groupIndex == i).map(e => {
        return {

          exercise: e.exercise,
          modality: e.modality,
          units: e.units,
          mode: e.mode,
          value: e.value
        }
      });
      wodGroup.exercises = exercises;
      wodGroup.detail = wodMember.wodGroupsMember.find(x => x.groupIndex == i).detail;
      wod.addGroup(wodGroup)
      // wod.wodNumber = wodMember.wodNumber;

    })
    return wod;
  }

  selectWeekNumber(weekNumber) {
    this.selectedWeekNumber = weekNumber;
    this.weekNumber = weekNumber;
    let weeksPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true" && x.weekNumber == weekNumber);
    if (weeksPlanned.length > 0) {
      this.getWodMember();
      //this.ngOnInit();
    } else {
      this.router.navigate(['/asignacion-plantilla'], { queryParams: { memberId: this.memberId, week: this.selectedWeekNumber } });

    }

  }

  deleteWods() {
    this.customAlertService.displayAlert("Gestion de Wods", ["¿Seguro que desea eliminar los wods?"], () => {
      this.requestingAssignment = true;
      this.display = true;
      this.wodMemberService.deleteWods(this.periodization.id, this.weekNumber).subscribe(
        response => {
          this.requestingAssignment = false;
          this.display = false;
          console.log("wods eliminados");
          this.periodization = response.result;
          let weeksPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true");
          this.setClassSelect(weeksPlanned);
          if (weeksPlanned.length > 0) {
            this.selectWeekNumber(weeksPlanned[weeksPlanned.length - 1].weekNumber);
          } else {
            this.router.navigate(['/asignacion-plantilla'], { queryParams: { memberId: this.memberId, week: 0 } });

          }
        },
        error => this.requestingAssignment = false
      )
    }, true)
  }
}
