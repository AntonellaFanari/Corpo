import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Attendance } from '../../../domain/attendance';
import { AttendanceRegister } from '../../../domain/attendance-register';
import { Credit } from '../../../domain/credit';
import { MemberAttendance } from '../../../domain/member-attendance';
import { MemberView } from '../../../domain/member-view';
import { Shift } from '../../../domain/shift';
import { StatusAttendance } from '../../../domain/status-attendance';
import { AttendanceService } from '../../../services/attendance.service';
import { CreditService } from '../../../services/credit.service';
import { CustomAlertService } from '../../../services/custom-alert.service';
import { MemberService } from '../../../services/member.service';
import { SettingsService } from '../../../services/settings.service';
import { ShiftService } from '../../../services/shift.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendances: MemberAttendance[] = [];
  shiftId: number;
  viewSelectAddMember: boolean = false;
  filterMember = "";
  member: MemberView;
  members: MemberView[] = [];
  viewBtnAddMember = true;
  credit: Credit;
  shift: Shift;
  quotaAvailable: number;
  currentDate = new Date(Date.now());
  @Output() getAllShifts = new EventEmitter();
  viewList: boolean = false;
  checkedAllAttendances = true;
  attendancesRegister: AttendanceRegister[] = [];
  maxNegatives: number;
  requestingList: boolean;

  constructor(private attendanceService: AttendanceService, private memberService: MemberService,
    private customAlertService: CustomAlertService, private creditService: CreditService, private shiftService: ShiftService,
    private dp: DatePipe, private route: ActivatedRoute, private settingsService: SettingsService) {

  }

  ngOnInit() {
    this.requestingList = true;
    this.getAllMembers();
    this.settingsService.getAll().subscribe(
      response => {
        this.maxNegatives = parseInt(response.result.find(x => x.name == "maxNegative").value);
      },
      error => console.error(error))

  }

  modalClick() {
    document.getElementById("modal-attendance").click();
    this.viewBtnAddMember = true;
  }

  getShift(id) {
    this.shiftId = id;
    this.shiftService.getById(id).subscribe(
      result => {
        this.shift = result.result;
        this.shift.day = this.getDayShift(this.shift.day) + " " + this.shift.day.substr(8, 2) + "/" + this.shift.day.substr(5, 2);
        this.shift.hour = this.shift.hour.substr(0, 5);
        this.getAll(id);
      },
      error => console.error(error)
    )
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

  getAll(id) {
    this.shiftId = id;
    this.attendanceService.getAllByIdShift(id).subscribe(
      result => {
        this.requestingList = false;
        this.attendances = result.result;
        for (var i = 0; i < this.attendances.length; i++) {
          let attendance = this.attendances[i];
          if (attendance.status == StatusAttendance.reserved) {
            attendance.attended = true;
          } else {
            attendance.attended == false;
          }
        }
        var absences = this.attendances.find(x => x.status == StatusAttendance.notAttended || x.status == StatusAttendance.cancelled);
        if (absences) {
          this.checkedAllAttendances = false
        }
        this.quotaAvailable = this.shift.quota - this.attendances.length;
      },
      error => this.requestingList = false
    )
  }

  getAllMembers() {
    this.memberService.getAll().subscribe(
      result => {
        this.members = result;
      },
      error => console.error(error)
    )
  }

  viewSelectListMember() {
    this.viewSelectAddMember = !this.viewSelectAddMember;
    this.viewBtnAddMember = !this.viewBtnAddMember;
    this.member = null;
    this.clearInput();

  }

  checkedAll() {
    this.checkedAllAttendances = !this.checkedAllAttendances;
    if (this.checkedAllAttendances) {
      for (var i = 0; i < this.attendances.length; i++) {
        this.attendances[i].attended = true;
      }
    }
  }


  selectMember(event) {
    this.member = event;
    console.log(this.member);
    this.filterMember = this.member.lastName + " " + this.member.name;
    this.getCreditMember(this.member.creditId);
  }

  getCreditMember(id) {
    this.creditService.getById(id).subscribe(
      result => {
        this.credit = result.result;
      },
      error => console.error(error)
    )
  }

  clearInput() {
    this.filterMember = "";
  }

  //completeInput() {
  //  this.filterMember = this.member.lastName + " " + this.member.name;
  //}

  createAttendance() {
    let newAttendance = new Attendance();
    newAttendance.memberId = this.member.id;
    newAttendance.shiftId = this.shiftId;
    newAttendance.status = StatusAttendance.reserved;
    return newAttendance;
  }


  addMember() {
    if (this.credit.negative > this.maxNegatives && this.credit.firstDay =="false") {
      this.customAlertService.displayAlert("Gestión de Asistencias", ["El socio superó la cantidad de negativos permitidos."]);
    } if (this.credit.firstDay == "true" || this.credit.negative < this.maxNegatives) {
      let attendance = this.createAttendance();
      this.attendanceService.add(attendance).subscribe(
        result => {
          this.getAll(this.shiftId);
          this.viewSelectAddMember = false;
          this.viewBtnAddMember = true;
          this.getAllShifts.emit();
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

  }

  return() {
    this.getAllShifts.emit();
  }

  cancell(id, memberId) {
    let creditId = this.members.find(x => x.id == memberId).creditId;
    this.getCreditMember(creditId);
    this.customAlertService.displayAlert("Gestión de Asistencias", ["¿Está seguro que desea cancelar la reserva del turno?"], () => {
      this.attendanceService.cancelReservation(id, this.credit).subscribe(
        result => {
          this.getAll(this.shiftId);
        },
        error => {
          console.error(error);
          this.customAlertService.displayAlert("Eliminación", ["Error al intentar cancelar la reserva del turno."]);
        })
    }, true);
  }

  attendedRegister() {
    for (var i = 0; i < this.attendances.length; i++) {
      if (this.attendances[i].attended) {
        this.attendances[i].status = StatusAttendance.attended
      } else {
        this.attendances[i].status = StatusAttendance.notAttended;
      }
    }
  }

  registerAttendance() {
    this.attendedRegister();
    this.attendanceService.update(this.attendances, this.shiftId).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.error(error);
        if (error.status === 400) {
          this.customAlertService.displayAlert("Gestión de Asistencias", error.error.errores);
        }
        if (error.status === 500) {
          this.customAlertService.displayAlert("Gestión de Asistencias", ["Hubo un problema al registrar las asistencias."]);
        }
      })
  }
}
