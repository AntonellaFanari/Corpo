import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'oidc-client';
import { Class } from '../../../domain/class';
import { Shift } from '../../../domain/shift';
import { ShiftList } from '../../../domain/shift-list';
import { ShiftSchedule } from '../../../domain/shift-schedule';
import { ClassService } from '../../../services/class.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ShiftService } from '../../../services/shift.service';
import { UserService } from '../../../services/user.service';
import { AttendanceComponent } from '../../attendance/attendance/attendance.component';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent implements OnInit {
  shifts: ShiftList[] = [];
  from: string;
  to: string;
  toList: boolean = false;
  filterShift = '';
  classes: Class[] = [];
  selectedClass: number = 0;
  shiftToModify: Shift[] = [];
  users: User[] = [];
  selectedUser: number;
  quota: number;
  disabled: boolean = true;
  checkedAllShifts: boolean = false;
  @ViewChild(AttendanceComponent, { static: true }) attendancesComponent: AttendanceComponent;

  constructor(private shiftService: ShiftService, private dp: DatePipe, private classService: ClassService,
    private userService: UserService, private customAlertService: CustomAlertService) {
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.from);
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 30), 'yyyy-MM-dd');
    console.log(this.to);
  }

  ngOnInit() {
    this.classService.getAll().subscribe(
      result => {
        console.log(result);
        this.classes = result;
      },
      error => console.error(error)
    );
    this.getAll();
 
  }

  getUsers() {
    this.userService.getAllByNameRole("Profesor").subscribe(
      result => {
        console.log(result);
        this.users = result.result;
      },
      error => console.error(error)
    );
  }

  getAll() {
    this.shifts = [];
    this.shiftService.getAll(this.from, this.to, this.selectedClass).subscribe(
      result => {
        console.log(result);
        this.getShiftsList(result);
        this.getUsers();
      },
      error => console.error(error)
    )
  }

  getShiftsList(result) {
    for (var i = 0; i < result.length; i++) {
      var shiftList = new ShiftList();
      const shift = result[i];
      shiftList.id = shift.id;
      shiftList.checked = false;
      shiftList.day = this.getDayShift(shift.day) + " " +shift.day.substr(8, 2) + "/" + shift.day.substr(5, 2);
      shiftList.hour = shift.hour.substr(0, 5);
      shiftList.quota = shift.quota;
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

  checkedAll() {
    this.checkedAllShifts = !this.checkedAllShifts;
    if (this.checkedAllShifts) {
      for (var i = 0; i < this.shifts.length; i++) {
        this.shifts[i].checked = true;
      };
      this.disabled = false;
    } else {
      for (var i = 0; i < this.shifts.length; i++) {
        this.shifts[i].checked = false;
      };
      this.disabled = true;
    }
    
  }

  checked(shift) {
    shift.checked = !shift.checked;
    if (this.getShiftChecked().length > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  getShiftChecked() {
    var shiftsChecked = [];
    for (var i = 0; i < this.shifts.length; i++) {
      let shift = this.shifts[i];
      if (shift.checked) {
        shiftsChecked.push(shift);
      }; 
    };
    return shiftsChecked;
  }

    createShiftToModify() {
      let shiftsChecked = this.getShiftChecked();
      for (var i = 0; i < shiftsChecked.length; i++) {
        let shift = shiftsChecked[i];
      if (shift.checked) {
        let newShiftToModify = new Shift();
        newShiftToModify.id = shift.id;
        newShiftToModify.hour = shift.hour;
        newShiftToModify.quota = shift.quota;
        newShiftToModify.classId = shift.classId;
        newShiftToModify.userId = shift.userId;
        this.shiftToModify.push(newShiftToModify);
      }
    };
    console.log(this.shiftToModify);
  }

  toListShift() {
    this.toList = true;
    this.getAll();
  }

  selectUser(event) {
    this.selectedUser = event;
  }

  assignTeacher() {
    for (var i = 0; i < this.shiftToModify.length; i++) {
      let shift = this.shiftToModify[i];
      shift.userId = this.selectedUser;
    };
    this.modify("profesor");
    this.selectedUser;
    this.shiftToModify = [];
  }

  assignQuota() {
    for (var i = 0; i < this.shiftToModify.length; i++) {
      let shift = this.shiftToModify[i];
      shift.quota = this.quota;
    };
    this.modify("cupo");
    this.shiftToModify = [];
  }

  modify(data) {
    let dataToModify = data;
    this.shiftService.update(this.shiftToModify).subscribe(
      result => {
        console.log(result);
        this.getAll();
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Turnos", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Turnos", ["Hubo un problema al intentar asignar un nuevo " + dataToModify]);
        }
      });
  }

  getShiftsDelete() {
    let idShiftsDelete = [];
    let shiftsDelete = this.getShiftChecked();
    for (var i = 0; i < shiftsDelete.length; i++) {
      let shiftDelete = shiftsDelete[i];
      idShiftsDelete.push(shiftDelete.id);
    };
    return idShiftsDelete;
  }

  delete() {
    let idShiftsDelete = this.getShiftsDelete();
    console.log("delete");
    this.customAlertService.displayAlert("Gestión de Turnos", ["¿Está seguro que desea eliminar los turnos seleccionados?"], () => {
      this.shiftService.delete(idShiftsDelete).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar eliminar turnos."]);
        })
    }, true);
  }

  goToAttendances(id) {
    this.attendancesComponent.modalClick();
    this.attendancesComponent.getShift(id);
  }
}
