import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberView } from '../../../domain/member-view';
import { Wod, WodGroup, WodTemplate, wodTemplateResponse } from '../../../domain/wod';
import { WodMember } from '../../../domain/wod-member';
import { Periodization } from '../../../domain/wod/periodization';
import { WeeklyTemplate } from '../../../domain/wod/weekly-template';
import { AnamnesisService } from '../../../services/anamnesis.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { PeriodizationService } from '../../../services/wod/periodization.service';
import { WeeklyTemplateService } from '../../../services/wod/weekly-template.service';
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
  selectedWeekNumber = 0;
  wodTemplate: wodTemplateResponse;
  requestingAssignment: boolean;
  member: MemberView;
  display = true;
  level: number;
  modeWodMember = true;
  weeklyTemplate: WeeklyTemplate;
  displayIconWodRemoving = false;

  constructor(private route: ActivatedRoute,
    private wodMemberService: WodMemberService,
    private periodizationService: PeriodizationService,
    private router: Router,
    private wodTemplateService: WodTemplateService,
    private memberService: MemberService,
    private customAlertService: CustomAlertService,
    private anamnesisService: AnamnesisService,
    private weeklyTemplateService: WeeklyTemplateService) {
    this.route.queryParams.subscribe(params => {
      this.id = parseInt(params['id']);
      this.weekNumber = parseInt(params['week']);
      this.memberId = parseInt(params['memberId'])
      console.log(this.id);
      console.log(this.weekNumber);
      this.getMember(this.memberId);

    });

  }

  getMember(id) {
    this.requestingAssignment = true;
    this.memberService.getById(id).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response.result;
        this.getLevel();
        this.getPeriodization();
      },
      error => this.requestingAssignment = false
    )
  }

  getLevel() {
    this.memberService.getLevel(this.memberId).subscribe(
      response => { (response.result != null) ? this.level = response.result.level : this.level = null },
      error => console.error(error)
    )
  }

  ngOnInit() {

  }



  getPeriodization() {
    this.periodizationService.getById(this.id).subscribe(
      response => {
        console.log("periodización: ", response.result);
        this.periodization = response.result;
        this.display = false;
        this.memberId = this.periodization.memberId;
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
    console.log("display: ", this.display);
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

        this.requestingAssignment = false;
        console.log("wods1: ", response.result);
        var wodMembers = response.result;
        this.getWeeklyTemplate(wodMembers[0].weeklyTemplateId);
        wodMembers.forEach(w => {
          this.wods.push({
            wod: this.getWod(w),
            date: "",
            wodNumber: w.wodNumber,
            attended: w.attended
          });
          console.log("wodMember:", w)
        })

        console.log("wods2: ", this.wods);
        console.log("requesting: ", this.requestingAssignment);
        console.log("display: ", this.display);
        console.log("periodization: ", this.periodization);
        this.getWeekPlanned();
        if (this.periodization.trainings < wodMembers.length) {
          this.displayIconWodRemoving = true;
          let difference = wodMembers.length - this.periodization.trainings;
          this.customAlertService.displayAlert("Gestión de Wods", [`Debe eliminar ${difference} wods. El nº de entrenamientos semanales del socio es menor al nº de wods que tiene la plantilla semanal.`]);
        }

        console.log("wods:", this.wods)

      },
      error => console.error(error)
    )
  }

  getWeeklyTemplate(id) {
    this.weeklyTemplateService.getById(id).subscribe(
      response => {
        console.log("plantilla semanal: ", response.result);
        this.weeklyTemplate = response.result;
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
        console.log("wodGroup: ", e);
        return {
          id: e.id,
          exercise: e.exercise,
          modality: e.modality.name,
          unitType: e.unitType,
          units: e.units,
          intensityType: e.intensityType,
          intensityValue: e.intensityValue,
          timeWork: e.timeWork,
          timeRest: e.timeRest
        }
      });
      wodGroup.exercises = exercises;
      wodGroup.detail = wodMember.wodGroupsMember.find(x => x.groupIndex == i).detail;
      wodGroup.rounds = wodMember.wodGroupsMember.find(x => x.groupIndex == i).rounds;
      wodGroup.series = wodMember.wodGroupsMember.find(x => x.groupIndex == i).series;
      wodGroup.modality = wodMember.wodGroupsMember.find(x => x.groupIndex == i).modality.name;
      wodGroup.modalityId = wodMember.wodGroupsMember.find(x => x.groupIndex == i).modality.id;
      wodGroup.staggeredType = wodMember.wodGroupsMember.find(x => x.groupIndex == i).staggeredType;
      wodGroup.staggeredValue = wodMember.wodGroupsMember.find(x => x.groupIndex == i).staggeredValue;
      wodGroup.time = wodMember.wodGroupsMember.find(x => x.groupIndex == i).time;
      wodGroup.pauseBetweenRounds = wodMember.wodGroupsMember.find(x => x.groupIndex == i).pauseBetweenRounds;
      wodGroup.pauseBetweenExercises = wodMember.wodGroupsMember.find(x => x.groupIndex == i).pauseBetweenExercises;
      wod.addGroup(wodGroup)
      // wod.wodNumber = wodMember.wodNumber;

    })
    return wod;
  }


  goToPlanning() {
    this.weekNumber = this.selectedWeekNumber;
    let weekPlanned = this.periodization.periodizationWeeks.filter(x => x.planned == "true" && x.weekNumber == this.weekNumber.toString());
    if (weekPlanned.length > 0) {
      this.router.navigate(['/editar-asignacion-wod'], { queryParams: { id: this.periodization.id, memberId: this.memberId, week: this.weekNumber } });

    } else {
      this.router.navigate(['/asignacion-plantilla'], {
        queryParams: { memberId: this.member.id, week: '0' }
      })
    }
  }

  selectWeekNumber(weekNumber) {
    this.selectedWeekNumber = weekNumber;

  }

  deleteWod(id) {
    this.customAlertService.displayAlert("Gestion de Wods", ["¿Seguro que desea eliminar este wod? Una vez eliminado no podrá recuperarlo."], () => {
      this.requestingAssignment = true;
      this.wodMemberService.delete(id).subscribe(
        response => this.getWodMember(),
        error => console.error(error)
      )
    }, true)

  }

  deleteWods() {
    this.customAlertService.displayAlert("Gestion de Wods", [`"¿Seguro que desea eliminar la planificación para la semana ${this.weekNumber}?"`], () => {
      this.requestingAssignment = true;
      this.display = true;
      this.wodMemberService.deleteWods(this.periodization.id, this.weekNumber).subscribe(
        response => {
          this.requestingAssignment = false;
          this.router.navigate(['/asignacion-plantilla'], { queryParams: { memberId: this.memberId, week: 0 } });

        },
        error => this.requestingAssignment = false
      )
    }, true)
  }

  getGoals(goals) {
    return goals.split("-");
  }
}
