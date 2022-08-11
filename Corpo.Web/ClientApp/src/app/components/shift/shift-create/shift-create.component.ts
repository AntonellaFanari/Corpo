import { DatePipe } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { time } from 'console';
import * as moment from 'moment';
import { User } from 'oidc-client';
import { Class } from '../../../domain/class';
import { Shift } from '../../../domain/shift';
import { ClassService } from '../../../services/class.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ShiftService } from '../../../services/shift.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {
  schedules: any[] = [];
  users: User[] = [];
  classes: Class[] = [];
  from: string;
  to: string;
  quota: number = 0;
  selectedClass: number;
  shifts: Shift[] = [];
  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;

  constructor(private dp: DatePipe, private userService: UserService, private classService: ClassService,
    private shiftService: ShiftService, private router: Router, private customAlertService: CustomAlertService) {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.from);
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 31), 'yyyy-MM-dd');
    console.log(this.to);
  }

  ngOnInit() {
    this.userService.getAllByNameRole("Profesor").subscribe(
      result => {
        this.users = result.result;
        console.log(this.users);
      },
      error => console.error(error)
    );
    this.classService.getAll().subscribe(
      result => {
        console.log(result);
        this.classes = result;
      },
      error => console.error(error)
    );
  }

  createSchedule() {
    return {
      hour: '', monday: false, tuesday: false,
      wednesday: false, thursday: false, friday: false,
      saturday: false, userId: null
    };
  }

  selectClass(event) {
    this.selectedClass = event;
  }

  selectUser(event, i) {
    console.log(event, i);
    this.schedules[i].userId = event
  }


  selectMonday(i) {
    this.monday = !this.monday;
  }

  selectTuesday(i) {
    this.tuesday = !this.tuesday;
  }

  selectWednesday(i) {
    this.wednesday = !this.wednesday;
  }

  selectThursday(i) {
    this.thursday = !this.thursday;
  }

  selectFriday(i) {
    this.friday = !this.friday;
  }

  selectSaturday(i) {
    this.saturday = !this.saturday;
  }


  addRow() {
    let schedule = this.createSchedule();
    schedule.hour = this.dp.transform(new Date(), '00:00:00')
    this.schedules.push(schedule);
    console.log(this.schedules);

  }

  delete(i) {
    this.schedules.splice(i, 1);
  }

  selectHour(event, i) {
    this.schedules[i].hour = event;
  }

  createShift() {
    this.shifts = [];
    for (var i = 0; i < this.schedules.length; i++) {
      let schedule = this.schedules[i];
      let shiftDates = [];
      if (schedule.monday) shiftDates = shiftDates.concat(this.getDatesOfDay(moment(this.from), moment(this.to), 1, schedule.hour));
      if (schedule.tuesday) shiftDates = shiftDates.concat(this.getDatesOfDay(moment(this.from), moment(this.to), 2, schedule.hour));
      if (schedule.wednesday) shiftDates = shiftDates.concat(this.getDatesOfDay(moment(this.from), moment(this.to), 3, schedule.hour));
      if (schedule.thursday) shiftDates = shiftDates.concat(this.getDatesOfDay(moment(this.from), moment(this.to), 4, schedule.hour));
      if (schedule.friday) shiftDates = shiftDates.concat(this.getDatesOfDay(moment(this.from), moment(this.to), 5, schedule.hour));
      if (schedule.saturday) shiftDates = shiftDates.concat(this.getDatesOfDay(moment(this.from), moment(this.to), 6, schedule.hour));
      console.log(shiftDates);
      for (var j = 0; j < shiftDates.length; j++) {
        let newShift = this.getNewShift(schedule);
        newShift.day = shiftDates[j];
        this.shifts.push(newShift);
      };
    };
    console.log(this.shifts);
  }


  getNewShift(schedule) {
    let newShift = new Shift();
    newShift.from = this.from;
    newShift.to = this.to;
    newShift.quota = this.quota;
    newShift.available = this.quota;
    newShift.classId = this.selectedClass;
    newShift.hour = schedule.hour;
    newShift.userId = schedule.userId;
    return newShift;
  }


  getDatesOfDay(start, end, day, hour) {
    let shift = moment(start._i + "T" + hour);
    let newStart = shift.clone().weekday(day);
    let newtmp = newStart.add(-1, 'days');
    var shiftDay = [];
    let now = moment();
    console.log(start);
    console.log(end);
    let tmp = newtmp.clone().weekday(day);
    if (now < tmp) {
      var d = tmp.isAfter(newStart, 'd')
      if (tmp.isAfter(newStart, 'd')) {
        shiftDay.push(tmp.format('YYYY-MM-DD'));
      }
      tmp.add(7, 'days');
      while (tmp.isBefore(end) || tmp.isSame(end)) {

        shiftDay.push(tmp.format('YYYY-MM-DD'));
        tmp.add(7, 'days');
      }
      console.log(shiftDay);
      return shiftDay;
    } else {
      tmp.add(7, 'days');
      while (tmp.isBefore(end) || tmp.isSame(end)) {

        shiftDay.push(tmp.format('YYYY-MM-DD'));
        tmp.add(7, 'days');
      }
      return shiftDay;
    }

  }

  submit() {
    this.createShift();
    this.shiftService.add(this.shifts).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/turnos-list']);
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Turnos", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Turnos", ["Hubo un problema al intentar crear los turnos."]);
        }
      })
  }

}
