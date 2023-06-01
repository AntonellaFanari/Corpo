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
  quota: number = 1;
  selectedClass: number;
  shifts: Shift[] = [];
  monday: boolean = false;
  tuesday: boolean = false;
  wednesday: boolean = false;
  thursday: boolean = false;
  friday: boolean = false;
  saturday: boolean = false;
  requesting = false;
  disabledBtnSave = true;
  errorSelectedDays: boolean;
  errorQuota: boolean;
  errorSelectedClass: boolean;
  errorSelectedUser: boolean;

  constructor(private dp: DatePipe, private userService: UserService, private classService: ClassService,
    private shiftService: ShiftService, private router: Router, private customAlertService: CustomAlertService) {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.from);
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 31), 'yyyy-MM-dd');
    console.log(this.to);
  }

  ngOnInit() {
    this.getClass();

  }

  getClass() {
    this.requesting = true;
    this.classService.getAll().subscribe(
      result => {
        console.log(result);
        this.classes = result;
        this.getTeachers();
      },
      error => this.requesting = false
    )
  }

  getTeachers() {
    this.userService.getAllByNameRole("Profesor").subscribe(
      result => {
        this.users = result.result;
        console.log(this.users);
        this.requesting = false;
      },
      error => this.requesting = false
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
    this.errorSelectedClass = false;
  }

  selectUser(event, i) {
    console.log(event, i);
    this.schedules[i].userId = event
    this.errorSelectedUser = false;
  }

  selectDay(day) {
    switch (day) {
      case 'monday':
        this.monday = !this.monday;
        if (this.monday) this.errorSelectedDays = false;
        console.log("monday: ", this.monday);
        break;
      case 'tuesday':
        this.tuesday = !this.tuesday;
        if (this.tuesday) this.errorSelectedDays = false;
        break;
      case 'wednesday':
        this.wednesday = !this.wednesday;
        if (this.wednesday) this.errorSelectedDays = false;
        break;
      case 'thursday':
        this.thursday = !this.thursday;
        if (this.thursday) this.errorSelectedDays = false;
        break;
      case 'friday':
        this.friday = !this.friday;
        if (this.friday) this.errorSelectedDays = false;
        break;
      case 'saturday':
        this.saturday = !this.saturday;
        if (this.saturday) this.errorSelectedDays = false;
        break;
    }
  }

  validationQuota() {
    console.log("cambiando valor de cupo");
    this.errorQuota = (this.quota > 0) ? false : true;
  }

  validationSchedules() {
    let currentSchedule = this.schedules[this.schedules.length - 1];
    console.log("horario actual: ", currentSchedule);
    if (!currentSchedule.monday && !currentSchedule.saturday && !currentSchedule.thursday && !currentSchedule.tuesday
      && !currentSchedule.wednesday && !currentSchedule.friday && !currentSchedule.saturday)
      this.errorSelectedDays = true;
    console.log("profesor seleccionado: ", currentSchedule.userId);
    if (!currentSchedule.userId) this.errorSelectedUser = true;
  }

  addSchedule() {
    let schedule = this.createSchedule();
    schedule.hour = this.dp.transform(new Date(), '00:00:00')
    this.schedules.push(schedule);
    console.log("turno: ", this.schedules);
  }

  addRow() {
    if (this.schedules.length == 0) {
      this.addSchedule();
    } else {
      this.validationSchedules();
      if (!this.errorSelectedDays && !this.errorSelectedUser) this.addSchedule();
    }

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
    if (this.quota > 0 && this.selectedClass && this.schedules.length > 0) {
      console.log("schedules: ", this.schedules.length);
      if (this.schedules.length > 0) this.validationSchedules();

      console.log("error dias: ", this.errorSelectedDays);
      console.log("error profesor: ", this.errorSelectedUser);
      if (!this.errorSelectedDays && !this.errorSelectedUser) {
        this.createShift();
        this.requesting = true;
        this.shiftService.add(this.shifts).subscribe(
          result => {
            console.log(result);
            this.router.navigate(['/turnos-list'], { queryParams: {displayList: true} });
          },
          error => {
            this.requesting = false;
            console.error(error);
            if (error.status === 400) {
              this.customAlertService.displayAlert("Gestión de Turnos", error.error.errores);
            }
            if (error.status === 500) {
              this.customAlertService.displayAlert("Gestión de Turnos", ["Hubo un problema al intentar crear los turnos."]);
            }
          })
      }
    } else {
      console.log("error validation: ", this.selectedClass);
      if (this.quota == 0) this.errorQuota = true;
      if (!this.selectedClass) this.errorSelectedClass = true;
      if (this.schedules.length == 0) this.customAlertService.displayAlert("Gestión de Turnos", ["No agregó turnos."]);
    }

  }
}
