import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { timeStamp } from 'console';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Member } from 'src/app/domain/member';
import { MemberView } from 'src/app/domain/member-view';
import { IntensityType, Periodization, PeriodizationWeek } from 'src/app/domain/wod/periodization';
import { MemberService } from 'src/app/services/member.service';
import { PeriodizationService } from 'src/app/services/wod/periodization.service';
import 'zone.js/dist/long-stack-trace-zone';
import { MonthlyGoal } from '../../../domain/wod/monthly-goal';
import { TrainingSystem } from '../../../domain/wod/training-system';
import { WeeklyGoal } from '../../../domain/wod/weekly-goal';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MonthlyGoalService } from '../../../services/monthly-goal.service';
import { WeeklyGoalService } from '../../../services/weekly-goal.service';
import { TrainingSystemService } from '../../../services/wod/training-system.service';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

export class Week {
  weekNumber?: string;
  m?: string;
  s?: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  goal?: string;
  planned: string;
  volume: string;
  intensityType: IntensityType;
  intensity: number;
  trainingSystem: string;
}


export class Total {
  type: string;
  value: number;
}

@Component({
  selector: 'app-workout-periodization',
  templateUrl: './workout-periodization.component.html',
  styleUrls: ['./workout-periodization.component.css']
})
export class WorkoutPeriodizationComponent implements OnInit {
  canvas: any;
  ctx: any;
  metabolic: number = 25;
  gymnastic: number = 25;
  strength: number = 25;
  weightlifting: number = 25;
  week1: Week = { weekNumber: "1", m: "", s: "", monday: "M", tuesday: "GW", wednesday: "WS", thursday: "SM", friday: "MGWS", saturday: "Libre", sunday: "Libre", goal: "", planned: "false", volume: "", intensity: 0, intensityType: 0, trainingSystem: "" };
  week2: Week = { weekNumber: "2", m: "", s: "", monday: "G", tuesday: "WS", wednesday: "MG", thursday: "GW", friday: "", saturday: "Libre", sunday: "Libre", planned: "false", volume: "", intensity: 0, intensityType: 0, trainingSystem: "" };
  week3: Week = { weekNumber: "3", m: "", s: "", monday: "W", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "Libre", sunday: "Libre", planned: "false", volume: "", intensity: 0, intensityType: 0, trainingSystem: "" };
  week4: Week = { weekNumber: "4", m: "", s: "", monday: "S", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "Libre", sunday: "Libre", planned: "false", volume: "", intensity: 0, intensityType: 0, trainingSystem: "" };
  chartweek1: any;
  chartweek2: any;
  chartweek3: any;
  chartweek4: any;
  week: string;
  day: string;
  cbMetabolic = false;
  cbGymnastic = false;
  cbStrength = false;
  cbWeightlifting = false;
  values: Array<number> = [];
  totals: Array<Total> = [];
  colors = {
    W: 'rgba(255, 99, 132)',
    S: 'rgba(255, 159, 64)',
    M: 'rgba(255, 205, 86)',
    G: 'rgba(54, 162, 235)'
  }
  types = ["M", "G", "W", "S"]
  index: number = 0;
  periodizationInit: string = "M";
  selectedWeek: string;
  init: string;
  type: string;
  memberId: number;
  member: MemberView;
  monthlyGoal = "";
  monthlyGoalsList: MonthlyGoal[] = [];
  monthlyGoals: MonthlyGoal[] = [];
  monthlyGoalsDropdownSettings: IDropdownSettings = {};
  week1GoalsList: WeeklyGoal[] = [];
  week2GoalsList: WeeklyGoal[] = [];
  week3GoalsList: WeeklyGoal[] = [];
  week4GoalsList: WeeklyGoal[] = [];
  weeklyGoals: WeeklyGoal[] = [];
  weeklyGoalsDropdownSettings: IDropdownSettings = {};
  trainings: number;
  year: number;
  month: number;
  months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  trainingSystems: TrainingSystem[] = [];
  trainingSystemMonthly = "";
  selectedTrainingSystemMonthly = 0;
  selectedTrainingSystemWeek1 = 0;
  selectedTrainingSystemWeek2 = 0;
  selectedTrainingSystemWeek3 = 0;
  selectedTrainingSystemWeek4 = 0;
  volumeMonthly = "";
  selectedIntensityTypeWeek1 = 0;
  selectedIntensityTypeWeek2 = 0;
  selectedIntensityTypeWeek3 = 0;
  selectedIntensityTypeWeek4 = 0;
  hidePercentageWeek1 = true;
  hidePercentageWeek2 = true;
  hidePercentageWeek3 = true;
  hidePercentageWeek4 = true;

  constructor(private periodizacionService: PeriodizationService,
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private monthlyGoalService: MonthlyGoalService,
    private weeklyGoalService: WeeklyGoalService,
    private trainingSystemService: TrainingSystemService,
private customAlertService: CustomAlertService  ) {
    this.route.queryParams.subscribe(params => {
      this.memberId = parseInt(params['memberId'])
      memberService.getById(this.memberId).subscribe(data => {
        this.member = data;
      })
    });
    this.getPeriodization();
    this.year = new Date().getFullYear();
    this.month = new Date().getMonth()+1;
  }


  getPeriodization() {
    this.index = this.types.indexOf(this.periodizationInit)
    this.index = this.index > 0 ? this.index : 0;

    var previousIndex = this.index;
    console.log("index: ", this.index)

    this.week1 = this.getPeriodization1(this.index);
    this.week1.weekNumber = "1";
    this.incrementIndex();


    this.week2 = this.getPeriodization1(this.index);
    this.week2.weekNumber = "2";
    this.incrementIndex();


    this.week3 = this.getPeriodization1(this.index);
    this.week3.weekNumber = "3";
    this.incrementIndex();

    this.week4 = this.getPeriodization1(this.index);
    this.week4.weekNumber = "4";
  }

  getPeriodization1(index: number) {
    this.index = index;
    var previousIndex = index;

    var monday = this.getType();
    var tuesday = this.getDoubleType();
    var wednesday = this.getDoubleType();
    var thursday = this.getDoubleType();

    this.index = index
    var friday = this.getType() + this.getType() + this.getType() + this.getType()

    this.index = previousIndex;

    return {
      goal: "",
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: "Libre",
      sunday: "Libre",
      planned: "false",
      volume: "",
      intensity: 0,
      intensityType: 0,
      trainingSystem: ""
    };


  }

  getTrainingSystems() {
    this.trainingSystemService.getAll().subscribe(
      response => {
        this.trainingSystems = response.result;
      },
      error => console.error(error)
    )
  }

  selectTrainingSystem(id, type) {
    let trainingSystem = this.trainingSystems.find(x => x.id == id);
    switch (type) {
      case 0:
        this.selectedTrainingSystemMonthly = id;
        this.trainingSystemMonthly = trainingSystem.up + "x" + trainingSystem.down;
        console.log(this.trainingSystemMonthly);
        break;
      case 1:
        this.selectedTrainingSystemWeek1 = id;
        this.week1.trainingSystem = trainingSystem.up + "x" + trainingSystem.down;
        console.log(this.week1.trainingSystem);
        break;
      case 2:
        this.selectedTrainingSystemWeek2 = id;
        this.week2.trainingSystem = trainingSystem.up + "x" + trainingSystem.down;
        console.log(this.week2.trainingSystem);
        break;
      case 3:
        this.selectedTrainingSystemWeek3 = id;
        this.week3.trainingSystem = trainingSystem.up + "x" + trainingSystem.down;
        console.log(this.week3.trainingSystem);
        break;
      case 4:
        this.selectedTrainingSystemWeek4 = id;
        this.week4.trainingSystem = trainingSystem.up + "x" + trainingSystem.down;
        console.log(this.week4.trainingSystem);
        break;
      default:
    }
  }

  selectIntensityType(type, week) {
    switch (week) {
      case 1:
        this.selectedIntensityTypeWeek1 = type;
        console.log(this.selectedIntensityTypeWeek1);
        this.hidePercentageWeek1 = this.hidePercentage(type);
        break;
      case 2:
        this.selectedIntensityTypeWeek2 = type;
        console.log(this.selectedIntensityTypeWeek2);
        this.hidePercentageWeek2 = this.hidePercentage(type);
        break;
      case 3:
        this.selectedIntensityTypeWeek3 = type;
        console.log(this.selectedIntensityTypeWeek3);
        this.hidePercentageWeek3 = this.hidePercentage(type);
        break;
      case 4:
        //this.selectedIntensityTypeWeek4 = type;
        //console.log(this.selectedIntensityTypeWeek4);
        this.hidePercentageWeek4 = this.hidePercentage(type);
        break;
      default:
    }
  }

  hidePercentage(type) {
    if (type == 1) { return true } else { return false};
  }

 

  getType() {
    if (this.index >= 4) this.index = 0;
    var res = this.types[this.index];
    this.index++;
    return res;
  }

  getDoubleType() {
    if (this.index >= 4) this.index = 0;
    var res = this.types[this.index] + this.types[this.incrementIndex()];

    return res;
  }

  incrementIndex() {
    this.index++;
    this.index = (this.index < 4) ? this.index : this.index = 0
    return this.index;
  }

  openPredominance() {
    document.getElementById('modal-predominance').click();
  }

  ngOnInit() {
    this.getTrainingSystems();
    this.getMonthlyGoals();
    this.monthlyGoalsDropdownSettings = {
      idField: 'id',
      textField: 'goal',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      allowSearchFilter: true,
      searchPlaceholderText: "Buscar",
      noDataAvailablePlaceholderText: "No hay objetivos cargados"
    };
    this.getWeeklyGoals();
    this.weeklyGoalsDropdownSettings = {
      idField: 'id',
      textField: 'goal',
      enableCheckAll: true,
      selectAllText: "Seleccionar todos",
      unSelectAllText: "Deseleccionar todos",
      allowSearchFilter: true,
      searchPlaceholderText: "Buscar",
      noDataAvailablePlaceholderText: "No hay objetivos cargados"
    };
    //Chart.register(ChartDataLabels);

    document.querySelectorAll('.periodization td:not(.first-td)')
      .forEach(e => e.addEventListener("click", this.clickModalHandler.bind(this)));
    this.render();
    //document.querySelectorAll(".predominance th")
    //  .forEach(e => e.addEventListener("click", () => document.getElementById('modal-predominance').click()));
    //this.render();

    var tds = document.querySelectorAll(".predominance td");
    for (var i = 0; i < tds.length; i++) {
      (tds[i] as HTMLTableDataCellElement).contentEditable = 'true';
      tds[i].addEventListener("blur", (x) => {

        console.log("entra");
        var value = (x.target as HTMLTableDataCellElement).innerHTML;
        (x.target as HTMLTableDataCellElement).innerHTML = (value.includes("%") || value == "") ? value : value + "%"

        var weekName = (x.target as HTMLTableDataCellElement).getAttribute("week")
        console.log(weekName);
        var typeName = (x.target as HTMLTableDataCellElement).getAttribute("type")
        console.log(typeName);
        this[weekName][typeName] = value;

        console.log(this[weekName]);
      })
    }

    var types = ["M", "G"];
    //this.renderExpectedChart(types, [50, 50])
  }

  getMonthlyGoals() {
    this.monthlyGoalService.getAll().subscribe(
      response => this.monthlyGoals = response.result,
      error => console.error(error))
  }

  getWeeklyGoals() {
    this.weeklyGoalService.getAll().subscribe(
      response => this.weeklyGoals = response.result,
      error => console.error(error))
  }

  onItemSelect(goal, number) {
    switch (number) {
      case 0:
        console.log(goal);
        if (this.monthlyGoal.length == 0) {
          this.monthlyGoal = goal.goal;
        } else {
          this.monthlyGoal = this.monthlyGoal + "-" + goal.goal;
        }
        this.monthlyGoalsList.push(goal);
        console.log(this.monthlyGoalsList);
        break;
      case 1:
        if (this.week1.goal.length == 0) {
          this.week1.goal = goal.goal;
        } else {
          this.week1.goal = this.week1.goal + "-" + goal.goal;
          console.log(this.week1.goal);
        }
        this.week1GoalsList.push(goal);
        console.log(this.week1GoalsList);
        break;
      case 2:
        if (this.week2.goal.length == 0) {
          this.week2.goal = goal.goal;
        } else {
          this.week2.goal = this.week2.goal + "-" + goal.goal;
        }
        this.week2GoalsList.push(goal);
        console.log(this.week2GoalsList);
        break;
      case 3:
        if (this.week3.goal.length == 0) {
          this.week3.goal = goal.goal;
        } else {
          this.week3.goal = this.week3.goal + "-" + goal.goal;
        }
        this.week3GoalsList.push(goal);
        console.log(this.week3GoalsList);
        break;
      case 4:
        if (this.week4.goal.length == 0) {
          this.week4.goal = goal.goal;
        } else {
          this.week4.goal = this.week4.goal + "-" + goal.goal;
        }
        this.week4GoalsList.push(goal);
        console.log(this.week4GoalsList);
        break;
      default:
    }
  }

  onSelectAll(goals, number) {
    switch (number) {
      case 0:
        this.monthlyGoalsList = [];
        console.log(goals);
        this.monthlyGoal = "";
        for (var i = 0; i < goals.length; i++) {
          this.monthlyGoalsList.push(goals[i])
          if (this.monthlyGoal.length == 0) {
            this.monthlyGoal = this.monthlyGoalsList[i].goal;
          } else {
            this.monthlyGoal = this.monthlyGoal + "-" + this.monthlyGoalsList[i].goal;
          }
        };
        console.log(this.monthlyGoalsList);
        break;
      case 1:
        this.week1GoalsList = [];
        console.log(goals);
        this.week1.goal = "";
        for (var i = 0; i < goals.length; i++) {
          this.week1GoalsList.push(goals[i]);
          if (this.week1.goal.length == 0) {
            this.week1.goal = this.week1GoalsList[i].goal;
          } else {
            this.week1.goal = this.week1.goal + "-" + this.week1GoalsList[i].goal;
          }
        };
        console.log(this.week1GoalsList);
        break;
      case 2:
        this.week2GoalsList = [];
        console.log(goals);
        this.week2.goal = "";
        for (var i = 0; i < goals.length; i++) {
          this.week2GoalsList.push(goals[i]);
          if (this.week2.goal.length == 0) {
            this.week2.goal = this.week2GoalsList[i].goal;
          } else {
            this.week2.goal = this.week2.goal + "-" + this.week2GoalsList[i].goal;
          }
        };
        console.log(this.week2GoalsList);
        break;
      case 3:
        this.week3GoalsList = [];
        console.log(goals);
        this.week3.goal = "";
        for (var i = 0; i < goals.length; i++) {
          this.week3GoalsList.push(goals[i]);
          if (this.week3.goal.length == 0) {
            this.week3.goal = this.week3GoalsList[i].goal;
          } else {
            this.week3.goal = this.week3.goal + "-" + this.week3GoalsList[i].goal;
          }
        };
        console.log(this.week3GoalsList);
        break;
      case 4:
        this.week4GoalsList = [];
        console.log(goals);
        this.week4.goal = "";
        for (var i = 0; i < goals.length; i++) {
          this.week4GoalsList.push(goals[i]);
          if (this.week4.goal.length == 0) {
            this.week4.goal = this.week4GoalsList[i].goal;
          } else {
            this.week4.goal = this.week4.goal + "-" + this.week4GoalsList[i].goal;
          }
        };
        console.log(this.week4GoalsList);
        break;
      default:
    }
  }

  onItemDeSelect(goal, number) {
    switch (number) {
      case 0:
        console.log(goal);
        let index = this.monthlyGoalsList.findIndex(x => x.id == goal.id);
        this.monthlyGoalsList.splice(index, 1);
        break;
      case 1:
        console.log(goal);
        let index1 = this.week1GoalsList.findIndex(x => x.id == goal.id);
        this.week1GoalsList.splice(index1, 1);
        break;
      case 2:
        console.log(goal);
        let index2 = this.week2GoalsList.findIndex(x => x.id == goal.id);
        this.week2GoalsList.splice(index2, 1);
        break;
      case 3:
        console.log(goal);
        let index3 = this.week3GoalsList.findIndex(x => x.id == goal.id);
        this.week3GoalsList.splice(index3, 1);
        break;
      case 4:
        console.log(goal);
        let index4 = this.week4GoalsList.findIndex(x => x.id == goal.id);
        this.week4GoalsList.splice(index4, 1);
        break;
      default:
    }
  }

  onDeSelectAll(number) {
    switch (number) {
      case 0:
        this.monthlyGoalsList = [];
        this.monthlyGoal = "";
        break;
      case 1:
        this.week1GoalsList = [];
        this.week1.goal = "";
        break;
      case 2:
        this.week2GoalsList = [];
        this.week2.goal = "";
        break;
      case 3:
        this.week3GoalsList = [];
        this.week3.goal = "";
        break;
      case 4:
        this.week4GoalsList = [];
        this.week4.goal = "";
        break;
      default:
    }
  }

  selectMonth(month) {
    this.month = month;
  }

  validate(week) {
    switch (week) {
      case 1:        
        this.resetClass(1, this.hidePercentageWeek1, this.week1);
        break;
      case 2:
        this.resetClass(2, this.hidePercentageWeek2, this.week2);
        break;
      case 3:
        this.resetClass(3, this.hidePercentageWeek3, this.week3);
        break;
      case 4:
        this.resetClass(4, this.hidePercentageWeek4, this.week4);
        break;
      default:
    }
  }


  resetClass(i, hidePercentage, week) {
    let className = "validators-week" + i;
    let p = document.getElementsByClassName(className);
    if (hidePercentage) {
      if (week.intensity > 10 || week.intensity < 0) {
        p[0].classList.remove("hide-validators");
        p[0].classList.add("validators");
      } else {
        p[0].classList.remove("validators");
        p[0].classList.add("hide-validators");
      }
    } else {
      if (week.intensity > 100 || week.intensity < 0) {
        let p = document.getElementsByClassName("validators-week1");
        p[1].classList.remove("hide-validators");
        p[1].classList.add("validators");
      } else {
        p[1].classList.remove("validators");
        p[1].classList.add("hide-validators");
      }
    }
  }

  render() {
    const labels = ["Weightlifting", "Strength", "Metabolic", "Gymnastic"];
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [this.weightlifting, this.strength, this.metabolic, this.gymnastic],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(255, 159, 64)',
          'rgba(255, 205, 86)',
          'rgba(54, 162, 235)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      }]
    };
    const config = {
      type: 'doughnut',
      data: data,
      //plugins: [ChartDataLabels]
    };

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, config);
  }

  openModal() {
    document.getElementById('modal-detail').click();
  }

  updateInit() {

    this.index = this.types.indexOf(this.init);
    this.index = this.index > 0 ? this.index : 0;
    console.log(this.getPeriodization1(this.index))
    this[this.selectedWeek] = this.getPeriodization1(this.index);
    document.getElementById('modal-init-button').click();
    this.init = "";
  }

  initWeek(weekName: string, selectedTd) {

    console.log("weekName: ", weekName)
    console.log("week: ", this[weekName])
    this.init = selectedTd;
    document.getElementById('modal-init-button').click();
    this.selectedWeek = weekName;

  }
  clickHandler(td) {
    this.week = td.target.closest('table').getAttribute("week")
    this.day = td.target.getAttribute("day");
    var selected = td.target.innerHTML.split("");
    this.cbMetabolic = selected.indexOf("M") >= 0;
    this.cbGymnastic = selected.indexOf("G") >= 0;
    this.cbStrength = selected.indexOf("S") >= 0;
    this.cbWeightlifting = selected.indexOf("W") >= 0;
    document.getElementById('modal-detail').click();
  }

  clickModalHandler(td) {
    this.week = td.target.closest('table').getAttribute("week")
    this.day = td.target.getAttribute("day");
    var selected = td.target.innerHTML.split("");
    this.cbMetabolic = selected.indexOf("M") >= 0;
    this.cbGymnastic = selected.indexOf("G") >= 0;
    this.cbStrength = selected.indexOf("S") >= 0;
    this.cbWeightlifting = selected.indexOf("W") >= 0;
    document.getElementById('modal-button').click();
  }

  updateValue() {
    this[this.week][this.day] = this.getCheckedCheckboxes();
    var td = document.querySelector("#" + this.week + " td[day='" + this.day + "']");
    td.innerHTML = this[this.week][this.day];
    var res = this.getWeekPercentage(this[this.week], this.week)

    document.getElementById('modal-detail').click();
  }

  updateType() {
    this[this.week][this.day] = this.getCheckedCheckboxes();
    var td = document.querySelector("#" + this.week + " td[day='" + this.day + "']");
    td.innerHTML = this[this.week][this.day];
/*    var res = this.getWeekPercentage(this[this.week], this.week)*/

    document.getElementById('modal-button').click();
    this.type = "";
  }

  getCheckedCheckboxes() {
    var res = "";
    res += this.cbMetabolic ? "M" : "";
    res += this.cbGymnastic ? "G" : "";
    res += this.cbStrength ? "S" : "";
    res += this.cbWeightlifting ? "W" : "";
    return res;
  }


  calculatePercentages() {

  }

  getWeekPercentage(week: Week, name: string) {
    var res = {};
    var typeCount = 0;
    var types: Array<string> = [];
    Object.entries(week).forEach(([key, value]) => {
      if ((value != "Libre") && (value != "")) {
        var exercices = value.split("");
        exercices.forEach(x => {
          res[x] = res[x] ? res[x] + (1 / (exercices.length)) : (1 / (exercices.length));
          if (types.indexOf(x) < 0)
            types.push(x);
        });
        typeCount += 1;
      }
    });
    this.values = [];
    Object.entries(res).forEach(([key]) => {
      var percentage = res[key] / typeCount * 100;
      this.values.push(percentage);
    })
    this.renderTableChart(types, this.values, name);

    return res;
  }

  calculate() {
    this.totals = [];
    var res1 = this.getWeekPercentage(this.week1, "week1");
    var res2 = this.getWeekPercentage(this.week2, "week2");
    var res3 = this.getWeekPercentage(this.week3, "week3");
    var res4 = this.getWeekPercentage(this.week4, "week4");


    this.calculateWeek(res1, this.week1);
    this.calculateWeek(res2, this.week2);
    this.calculateWeek(res3, this.week3);
    this.calculateWeek(res4, this.week4);
    this.renderActualChart(this.totals.map(x => x.type), this.totals.map(x => x.value))
    //this.renderExpectedChart(types, [50, 50])
  }

  calculateWeek(weekTotal, week) {
    var propertyCount = 0;
    Object.entries(week).forEach(([key, value]) => {
      if ((value != "Libre") && (value != "")) {
        propertyCount += 1;
      }
    });
    Object.entries(weekTotal).forEach(([key]) => {
      var position = this.totals.findIndex(x => x.type == key);
      var percentage = weekTotal[key] / propertyCount * 100;
      if (position >= 0) {
        this.totals[position].value = this.totals[position].value + (percentage / 4);
      }
      else
        this.totals.push({ type: key, value: (percentage / 4) });
    })

  }



  renderTableChart(types: Array<string>, values: Array<number>, name: string) {
    console.log("table")
    var canvas;
    var ctx;
    const labels = types;
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: values,
        backgroundColor: this.getColors(types),
        borderColor: this.getColors(types),
        borderWidth: 1
      }]
    };
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
          datalabels: {
            display: true,
            backgroundColor: '#ccc',
            borderRadius: 3,
            font: {
              color: 'red',
              weight: 'bold',
            }
          },
          doughnutlabel: {
            labels: [{
              text: '550',
              font: {
                size: 20,
                weight: 'bold'
              }
            }, {
              text: 'total'
            }]
          }
        }
      }
    };

    canvas = document.getElementById(name + '-chart');
    if (canvas) {
      ctx = canvas.getContext('2d');
      var oldScrollPosition = this.getScrollPosition();
      if (this["chart" + name])
        this["chart" + name].destroy();
      this["chart" + name] = new Chart(ctx, config);


      var x: ScrollToOptions = {};
      x.left = oldScrollPosition.x;
      x.top = oldScrollPosition.y;
      window.scrollTo(x);
    }
  }

  renderExpectedChart(types: Array<string>, values: Array<number>) {
    var canvas;
    var ctx;
    const labels = types;
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: values,
        backgroundColor: this.getColors(types),
        borderColor: this.getColors(types),
        borderWidth: 1
      }]
    };
    const config = {
      type: 'doughnut',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };

    canvas = document.getElementById('expected-chart');
    ctx = canvas.getContext('2d');
    if (this["expected-chart"])
      this["expected-chart"].destroy();
    this["expected-chart"] = new Chart(ctx, config);
  }

  renderActualChart(types: Array<string>, values: Array<number>) {
    var canvas;
    var ctx;
    const labels = types;
    const data = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: values,
        backgroundColor: this.getColors(types),
        borderColor: this.getColors(types),
        borderWidth: 1
      }]
    };
    const config = {
      type: 'doughnut',
      data: data,
    };

    canvas = document.getElementById('actual-chart');
    ctx = canvas.getContext('2d');
    if (this["actual-chart"])
      this["actual-chart"].destroy();
    this["actual-chart"] = new Chart(ctx, config);
  }

  getScrollPosition() {
    return {
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }

  getColors(colors: Array<string>) {
    var res = [];
    colors.forEach(x => {
      res.push(this.colors[x])
    });
    return res;
  }

  save() {
    var periodization = new Periodization();
    periodization.memberId = this.memberId;
    periodization.trainings = this.trainings;
    periodization.month = this.month;
    periodization.year = this.year;
    periodization.volume = this.volumeMonthly;
    periodization.trainingSystem = this.trainingSystemMonthly;
    console.log("week1: ", this.week1);
    periodization.periodizationWeeks.push(new PeriodizationWeek(this.week1));
    periodization.periodizationWeeks.push(new PeriodizationWeek(this.week2));
    periodization.periodizationWeeks.push(new PeriodizationWeek(this.week3));
    periodization.periodizationWeeks.push(new PeriodizationWeek(this.week4));
    periodization.goal = this.monthlyGoal;
    console.log(periodization)
    this.periodizacionService.add(periodization).subscribe(() => {
      console.log("success")
      this.router.navigate(['/asignacion-plantilla'], { queryParams: { memberId: this.memberId } });
    },
      error => {
        if (error.status == 400) {
          this.customAlertService.displayAlert("Gestión de Periodizaciones", error.error.errores);
        }
      })
  }


}
