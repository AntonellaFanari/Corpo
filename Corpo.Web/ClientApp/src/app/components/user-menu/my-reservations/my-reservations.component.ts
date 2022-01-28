import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Attendance} from '../../../domain/attendance';
import { AttendanceReservation } from '../../../domain/attendance-reservation';
import { Credit } from '../../../domain/credit';
import { ShiftList } from '../../../domain/shift-list';
import { StatusAttendance } from '../../../domain/status-attendance';
import { AccountService } from '../../../services/account.service';
import { AttendanceService } from '../../../services/attendance.service';
import { CreditService } from '../../../services/credit.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { ShiftService } from '../../../services/shift.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  attendances: AttendanceReservation[] = [];
  idMember: number;
  diplayReserve: boolean = false;
  shifts: ShiftList[] = [];
  from: string;
  to: string;
  creditId: number;
  credit: Credit;
  className = "";
  currentDate = new Date(Date.now());
  currentCredit: number;
  availableNegative = 5;
  selectedShiftId: number;

  constructor(private attendanceService: AttendanceService, private accountService: AccountService,
    private shiftService: ShiftService, private dp: DatePipe, private creditService: CreditService,
    private customAlertService: CustomAlertService) {
    this.idMember = this.accountService.getLoggedUser().id;
    this.creditId = this.accountService.getLoggedUser().creditId;
    this.currentCredit = this.accountService.getLoggedUser().credit;
    this.from = this.dp.transform(new Date(), 'yyyy-MM-dd');
    console.log(this.from);
    let to = new Date();
    this.to = this.dp.transform(to.setDate(to.getDate() + 30), 'yyyy-MM-dd');
    console.log(this.to);
  }

  ngOnInit() {
    this.getAll();
    this.getCreditMember();
  }

  getAll() {
    this.attendanceService.getAllReservations(this.idMember).subscribe(
      result => {
        console.log(result.result);
        this.attendances = result.result;
        this.getAttendanceShiftsList(this.attendances);
      },
      error => console.error(error)
    )
  }

  getAttendanceShiftsList(attendances) {
    for (var i = 0; i < attendances.length; i++) {
      var shiftList = new ShiftList();
      const shift = attendances[i].shift;
      shiftList.id = shift.id;
      shiftList.day = this.getDayShift(shift.day) + " " + shift.day.substr(8, 2) + "/" + shift.day.substr(5, 2);
      shiftList.hour = shift.hour.substr(0, 5);
      shiftList.quota = shift.quota;
      shiftList.available = shift.available;
      shiftList.className = shift.class.name;
      console.log(shiftList);
      this.attendances[i].shift = shiftList;
    }
    console.log(this.attendances);
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

  getShiftsList(result) {
    for (var i = 0; i < result.length; i++) {
      var shiftList = new ShiftList();
      const shift = result[i];
      shiftList.id = shift.id;
      shiftList.day = this.getDayShift(shift.day) + " " + shift.day.substr(8, 2) + "/" + shift.day.substr(5, 2);
      shiftList.hour = shift.hour.substr(0, 5);
      shiftList.quota = shift.quota;
      shiftList.available = shift.available;
      shiftList.classId = shift.class.id;
      shiftList.className = shift.class.name;
      let reserved = this.attendances.find(x => x.shiftId == shift.id);
      if (reserved) { shiftList.reserved = true } else { shiftList.reserved = false };
      console.log(shiftList);
      this.shifts.push(shiftList);
    }
    console.log(this.shifts);
  }

  viewReserve() {
    this.diplayReserve = true;
    this.getAllShift();
  }

  getAllShift() {
    this.shifts = [];
    this.shiftService.getAll(this.from, this.to, 0).subscribe(
      result => {
        console.log(result);
        this.getShiftsList(result);
      },
      error => {
        console.error(error);
      }
    )
  }

  reserve(id, className) {
    this.selectedShiftId = id;
    this.className = className;

  }

  getCreditMember() {
    let negatives = 5;
    this.creditService.getById(this.creditId).subscribe(
      result => {
        console.log(result);
        this.credit = result.result;
        console.log(this.credit.negative);
        this.availableNegative = (negatives - this.credit.negative);
        console.log(this.availableNegative);
      },
      error => console.error(error)
    )
  }


  createAttendance() {
    let newAttendance = new Attendance();
    newAttendance.memberId = this.idMember;
    newAttendance.shiftId = this.selectedShiftId;
    newAttendance.status = StatusAttendance.reserved;
    return newAttendance;
  }

  confirmReserve() {
    let attendance = this.createAttendance();
    this.attendanceService.add(attendance).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Asistencias", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Asistencias", ["Hubo un problema al reservar el turno."]);
        }
      })
  }

  cancell(id) {
    this.customAlertService.displayAlert("Gestión de Asistencias", ["¿Está seguro que desea cancelar la reserva del turno?"], () => {
      this.attendanceService.cancelReservation(id, this.credit).subscribe(
        result => {
          this.getAll();
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar cancelar la reserva del turno."]);
        })
    }, true);
  }
}
