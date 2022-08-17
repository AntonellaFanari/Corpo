import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceReservation } from '../../../domain/attendance-reservation';
import { MemberView } from '../../../domain/member-view';
import { Reservation } from '../../../domain/reservation';
import { AttendanceService } from '../../../services/attendance.service';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  id: number;
  member: MemberView;
  requesting: boolean;

  constructor(private route: ActivatedRoute,
    private attendanceService: AttendanceService,
    private memberService: MemberService) {
    this.route.queryParams.subscribe(params => { this.id = parseInt(params['id']) })
  }

  ngOnInit() {
    this.getMember();

  }

  getMember() {
    this.requesting = true;
    this.memberService.getById(this.id).subscribe(
      result => {
        this.requesting = false;
        this.member = result.result;
        this.getAttendances();
      },
      error => this.requesting = false
    );
  }

  getAttendances() {
    this.attendanceService.getAllReservationsDetail(this.id).subscribe(
      result => {
        console.log("reservaciones: ", result.result);
        this.reservations = result.result;
        this.getCovertReservationsDate(this.reservations);
      },
      error => console.error(error)
    )
  }

  getCovertReservationsDate(reservations) {
    for (var i = 0; i < reservations.length; i++) {
      console.log(reservations[i]);
      reservations[i].entryDate = this.getDayShift(reservations[i].entryDate) + " " + this.getDate(reservations[i].entryDate);
      reservations[i].feeDate = this.getDayShift(reservations[i].feeDate) + " " + this.getDate(reservations[i].feeDate);
      reservations[i].expiration = this.getDayShift(reservations[i].expiration) + " " + this.getDate(reservations[i].expiration);
      for (var j = 0; j < reservations[i].reservations.length; j++) {
        let reservation = reservations[i].reservations[j];
        reservation.dateShift = this.getDayShift(reservation.dateShift) + " " + this.getDate(reservation.dateShift);
        reservation.dateReservation = this.getDayShift(reservation.dateReservation) + " " + this.getDate(reservation.dateReservation);
        if (reservation.dateCancellation !== null) {
         reservation.dateCancellation = this.getDayShift(reservation.dateCancellation) + " " + this.getDate(reservation.dateCancellation);
        };
      }
    }
  }

  getDate(date) {
    let day = date.substr(8, 2);
    let month = date.substr(5, 2);
    let year = date.substr(0, 4);
    let hour = date.substr(11, 5);
    return day + "/" + month + "/" + year + "-" + hour;
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

}
