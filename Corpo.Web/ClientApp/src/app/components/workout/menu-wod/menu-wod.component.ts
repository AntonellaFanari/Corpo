import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberView } from '../../../domain/member-view';
import { Wod, WodGroup } from '../../../domain/wod';
import { Periodization, PeriodizationWeek } from '../../../domain/wod/periodization';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { PeriodizationService } from '../../../services/wod/periodization.service';
import { WodMemberService } from '../../../wod/wod-member.service';

@Component({
  selector: 'app-menu-wod',
  templateUrl: './menu-wod.component.html',
  styleUrls: ['./menu-wod.component.css']
})
export class MenuWodComponent implements OnInit {
  member: MemberView;
  id: number;
  years = [];
  periodizations: Periodization[] = [];
  selectedYear = false;
  selectedPeriodization = false;
  year: number;
  periodizationId: number;
  periodizationWeekId: number;
  periodizationsWeek: PeriodizationWeek[] = [];
  selectedWeek = false;
  weekNumber = 0;
  wods: any[] = [];
  modeQuery = true;
  resultsWods = [];
  filter = "";
  requesting = false;

  constructor(private route: ActivatedRoute,
    private memberService: MemberService,
    private customAlertService: CustomAlertService,
    private periodizationService: PeriodizationService,
    private wodMemberService: WodMemberService,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.filter = (params['filter']);
      this.id = parseInt(params['id']);
      this.getMember();
    });
    ////this.route.queryParams.subscribe(params => {
    ////  this.id = parseInt(params['id']);
    ////  this.getMember();
    ////});
  }

  ngOnInit() {
    this.getYears();
  }


  getMember() {
    this.requesting = true;
    this.memberService.getById(this.id).subscribe(
      response => {
        console.log("socio: ", response);
        this.member = response.result;
        this.requesting = false;
      },
      error => this.requesting = false
    )
  }

  getYears() {
    this.periodizationService.getYears(this.id).subscribe(
      response => {
        this.years = response.result;
        console.log("años: ", response.result);
      },
      error => console.error(error)
    );
  }

  selectYear(year) {
    this.year = year;
    this.periodizationService.getByYear(year, this.id).subscribe(
      response => {
        console.log("periodizaciones del año seleccionado: ", response.result);
        this.periodizations = response.result;
        this.selectedYear = true;
      },
      error => console.error(error)
    )
  }

  selectPeriodization(periodizationId) {
    this.periodizationId = periodizationId;
    this.periodizationService.getById(this.periodizationId).subscribe(
      response => {
        console.log("Semanas de la periodización seleccionada: ", response.result);
        this.periodizationsWeek = response.result.periodizationWeeks;
        this.selectedPeriodization = true;
      },
      error => console.error(error)
    )
  }

  selectWeek(week) {
    this.selectedWeek = true;
    this.weekNumber = week;
  }

  getMonth(month) {
    switch (month) {
      case 1:
        return 'Enero';
        break;
      case 2:
        return 'Febrero';
        break;
      case 3:
        return 'Marzo';
        break;
      case 4:
        return 'Abril';
        break;
      case 5:
        return 'Mayo';
        break;
      case 6:
        return 'Junio';
        break;
      case 7:
        return 'Julio';
        break;
      case 8:
        return 'Agosto';
        break;
      case 9:
        return 'Septiembre';
        break;
      case 10:
        return 'Octubre';
        break;
      case 11:
        return 'Noviembre';
        break;
      case 12:
        return 'Diciembre';
        break;
      default:
    }
  }

  search() {
    (this.filter == "wods") ? this.getWods() : this.getResults();
  }

  getResults() {
    this.requesting = true;
    this.wodMemberService.getResults(this.periodizationId, this.weekNumber).subscribe(
      response => {
        this.requesting = false;
        console.log("resultados wods: ", response.result);
        response.result.forEach(w => {
          this.resultsWods.push({
            results: w.resultsWods,
            date: "",
            wodId: w.id,
            wodNumber: w.wodNumber
          });
        })
      },
      error => this.requesting = false
    )
  }

  getWods() {
    this.requesting = true;
    this.wods = [];
    this.wodMemberService.getByPeriodizationId(this.periodizationId, this.weekNumber).subscribe(
      response => {
        this.requesting = false;
        console.log("wods1: ", response.result);
        var wodMembers = response.result;
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
    

        console.log("wods:", this.wods)

      },
      error => this.requesting = false
    )
  }

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

  goBack() {
    if (this.filter == "wods" && this.wods.length > 0) {
      this.wods = [];
    }else if (this.filter == "results" && this.resultsWods.length > 0) {
      this.resultsWods = [];
    } else {
      this.router.navigate(['/asignacion-plantilla'], { queryParams: { memberId: this.member.id, week: '0' } });
    }
  }
}
