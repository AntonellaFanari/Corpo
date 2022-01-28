import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Attendance } from '../domain/attendance';
import { AttendanceRegister } from '../domain/attendance-register';
import { Credit } from '../domain/credit';
import { MemberAttendance } from '../domain/member-attendance';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAllByIdShift(id: number) {
    return this.http.get<any>(this.url + 'api/attendance/getAllByIdShift?id=' + id);
  }

  public add(attendance: Attendance) {
    return this.http.post<any>(this.url + 'api/attendance/add', attendance, httpOptions);
  }

  public cancelReservation(id: number, credit: Credit) {
    return this.http.put(this.url + 'api/attendance/cancelReservation?id=' + id, credit, httpOptions);
  }

  public getAllReservations(id: number) {
    return this.http.get<any>(this.url + 'api/attendance/getAllReservations?id=' + id);
  }

  public update(attendances: MemberAttendance[], shiftId: number) {
    return this.http.put(this.url + 'api/attendance/update-attended?id=' + shiftId, attendances, httpOptions);
  }

  public getAllReservationsDetail(id: number) {
    return this.http.get<any>(this.url + 'api/attendance/all-reservations-detail?id=' + id);
  }
}
