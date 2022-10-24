import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Wod, WodGroup } from '../../../domain/wod';
import { ResultsWodGroupMember } from '../../../domain/wod/results-wod-group-member';
import { WodMemberService } from '../../../wod/wod-member.service';

@Component({
  selector: 'app-result-wod',
  templateUrl: './result-wod.component.html',
  styleUrls: ['./result-wod.component.css']
})
export class ResultWodComponent implements OnInit {
  wod: Wod;

  constructor(private wodMemberService: WodMemberService) {
   
  }

  @Input() wodId: number;
  @Input() results: ResultsWodGroupMember[] = [];

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("wod recibido:", this.wodId);
    console.log("resultados recibidos: ", this.results);
    if (this.wodId && this.results) {
      this.getAllWod();
    }
  }



  getAllWod() {
    this.wodMemberService.getById(this.wodId).subscribe((data: any) => {
      if (data.result != null) {
        console.log("wod recibido: ", data.result);
        this.wod = this.getWodMember(data.result);
        console.log("wod transformado: ", this.wod);
      }

    }, error => {
      console.error(error)
    })
  }

  getWodMember(wodMember): Wod {
    console.log("wod a transformar: ", wodMember);
    var wod = new Wod();
    wod.id = wodMember.id;
    var indexes = wodMember.wodGroupsMember.map(x => x.groupIndex);
    indexes = indexes.filter((x, i, a) => a.indexOf(x) == i)
    wod.goal = wodMember.goal;
    wod.intensityType = wodMember.intensityType;
    wod.intensity = wodMember.intensity;
    wod.rate = wodMember.rate;
    wod.weekNumber = wodMember.weekNumber;
    wod.rest = wodMember.rest;
    wod.attended = wodMember.attended;
    wod.wodNumber = wodMember.wodNumber;

    indexes.forEach(i => {
      var wodGroup = new WodGroup();
      var exercises = wodMember.wodGroupsMember.filter(x => x.groupIndex == i).map(e => {
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
      wodGroup.id = wodMember.wodGroupsMember.find(x => x.groupIndex == i).id;
      wodGroup.groupIndex = i,
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
    console.log("wod transformado: ", wod);
    return wod;
  }

  getGoals(goals) {
    return goals.split("-");
  }

  getResultGroup(groupIndex, data) {

    let result = this.results.find(x => x.groupIndex == groupIndex);

    if (result) {
      switch (data) {
        case 'rounds':
          return result.rounds;
          break;
        case 'repetitions':
          return result.repetitions;
          break;
        case 'time':
          return result.time;
          break;
        default:
      }
    }

  }

  getResultExercise(groupIndex, exerciseId, data, round) {
    let result = this.results.find(x => x.groupIndex == groupIndex).resultsWodGroupMemberExercise.find(x => x.wodGroupMemberId == exerciseId);

    if (result) {
      switch (data) {
        case 'rounds':
          return result.rounds;
          break;
        case 'amount':
          return result.amount;
          break;
        case 'time':
          return this.getTimeByRound(result.times, round);
          break;
        default:
      }
    }

  }

  getRounds(rounds) {
    let roundList = [];
    for (let i = 0; i < rounds; i++) {
      roundList.push(i + 1);
    }
    return roundList;
  }

  getTimeByRound(times, round) {
    return times[round - 1];
  }
}
