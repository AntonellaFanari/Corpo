import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { timeStamp } from 'console';
import 'zone.js/dist/long-stack-trace-zone';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';

export class Week {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
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
  week1: Week = { monday: "M", tuesday: "GW", wednesday: "WS", thursday: "SM", friday: "MGWS", saturday: "Libre", sunday: "Libre" };
  week2: Week = { monday: "G", tuesday: "WS", wednesday: "MG", thursday: "GW", friday: "", saturday: "Libre", sunday: "Libre" };
  week3: Week = { monday: "W", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "Libre", sunday: "Libre" };
  week4: Week = { monday: "S", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "Libre", sunday: "Libre" };
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

  //public barChartPlugins = [pluginDataLabels];
  constructor() {
    this.getPeriodization();
  }

  getPeriodization() {
    this.index = this.types.indexOf(this.periodizationInit)
    this.index = this.index > 0 ? this.index : 0;

    var previousIndex = this.index;
    console.log("index: ", this.index)

    this.week1 = this.getPeriodization1(this.index);
    this.incrementIndex();


    this.week2 = this.getPeriodization1(this.index);

    this.incrementIndex();


    this.week3 = this.getPeriodization1(this.index);
    this.incrementIndex();

    this.week4 = this.getPeriodization1(this.index);
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
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: "Libre",
      sunday: "Libre"
    };


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

  ngOnInit() {
    //Chart.register(ChartDataLabels);
    /*
    document.querySelectorAll('td')
      .forEach(e => e.add9ºListener("click", this.clickHandler.bind(this)));
    this.render();
*/
    var types = ["M", "G"];
    this.renderExpectedChart(types, [50, 50])
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

  updateValue() {
    this[this.week][this.day] = this.getCheckedCheckboxes();
    var td = document.querySelector("#" + this.week + " td[day='" + this.day + "']");
    td.innerHTML = this[this.week][this.day];
    var res = this.getWeekPercentage(this[this.week], this.week)

    document.getElementById('modal-detail').click();
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
}
