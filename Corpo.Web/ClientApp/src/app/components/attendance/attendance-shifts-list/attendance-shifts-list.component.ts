import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Class } from '../../../domain/class';
import { Shift } from '../../../domain/shift';
import { ShiftList } from '../../../domain/shift-list';
import { ClassService } from '../../../services/class.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ShiftService } from '../../../services/shift.service';
import { AttendanceComponent } from '../attendance/attendance.component';

@Component({
  selector: 'app-attendance-shifts-list',
  templateUrl: './attendance-shifts-list.component.html',
  styleUrls: ['./attendance-shifts-list.component.css']
})
export class AttendanceShiftsListComponent implements OnInit {
  shifts: ShiftList[] = [];
  from: string;
  to: string;
  requestingList: boolean;
  classes: Class[] = [];
  selectedClass: number = 0;

  constructor(private shiftService: ShiftService,
    private dp: DatePipe,
    private customAlertService: CustomAlertService,
    private classService: ClassService) {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 7), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.requestingList = true;
    this.getAll()
    this.getClass();
  }

  getClass() {
    this.classService.getAll().subscribe(
      result => {
        console.log(result);
        this.classes = result;
      },
      error => console.error(error)
    );
  }


  getAll() {
    this.requestingList = true;
    this.shifts = [];
    this.shiftService.getAll(this.from, this.to, this.selectedClass).subscribe(
      response => {
        this.requestingList = false;
        this.getShiftsList(response.result);
      },
      error => {
        this.requestingList = false;
      }
    )
  }

  getShiftsList(result) {
    for (var i = 0; i < result.length; i++) {
      var shiftList = new ShiftList();
      const shift = result[i];
      shiftList.id = shift.id;
      shiftList.checked = false;
      shiftList.day = this.getDayShift(shift.day) + " " + shift.day.substr(8, 2) + "/" + shift.day.substr(5, 2);
      shiftList.hour = shift.hour.substr(0, 5);
      shiftList.quota = shift.quota;
      shiftList.available = shift.available;
      shiftList.classId = shift.class.id;
      shiftList.className = shift.class.name;
      shiftList.userId = shift.user.id;
      shiftList.userName = shift.user.lastName + " " + shift.user.name;
      console.log(shiftList);
      this.shifts.push(shiftList);
    }
    console.log(this.shifts);
  }

  getDayShift(date) {
    let dayShift = '';
    const day = new Date(date).getDay();
    switch (day) {
      case 0: dayShift = "Domingo";
        break;
      case 1: dayShift = "Lunes";
        break;
      case 2: dayShift = "Martes";
        break;
      case 3: dayShift = "Miercoles";
        break;
      case 4: dayShift = "Jueves";
        break;
      case 5: dayShift = "Viernes";
        break;
      case 6: dayShift = "Sábado";
        break;
      default:
    }
    return dayShift;
  }


  selectClass(event) {
    this.selectedClass = event;
  }
}
