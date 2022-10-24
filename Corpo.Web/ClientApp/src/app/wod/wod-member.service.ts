import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { WodTemplate, wodTemplateResponse } from '../domain/wod';
import { WodMember } from '../domain/wod-member';
import { Periodization } from '../domain/wod/periodization';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class WodMemberService {

  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll(id: number) {
    return this.http.get<any>(this.url + 'api/wod-member/by-week-valid?id='+ id);
  }

  public add(id, weekNumber, periodization: Periodization) {
    return this.http.post<any>(this.url + 'api/wod-member?id=' + id + '&weekNumber=' + weekNumber, periodization, httpOptions);
  }

  public update(wodTemplate) {
    console.log("wodTemplate", wodTemplate);
    return this.http.put(this.url + 'api/wod-member', wodTemplate, httpOptions);
  }

  public delete(id) {
    return this.http.delete(this.url + 'api/sale/wod-member/' + id);
  }

  public getById(id: number) {
    return this.http.get<any>(this.url + 'api/wod-member/by-id?id=' + id);
  }

  public getByPeriodizationId(id: number, weekNumber: number) {
    return this.http.get<any>(this.url + 'api/wod-member/by-week?id=' + id + '&weekNumber=' + weekNumber);
  }

  public deleteWods(periodizationId: number, weekNumber: number) {
    return this.http.delete<DomainResponse<any>>(this.url + 'api/wod-member/delete-wods?periodizationId=' + periodizationId + '&weekNumber=' + weekNumber);
  }

  public getAttended(periodizationId: number, memberId: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/wod-member/attended/' + periodizationId + '?memberId=' + memberId);
  }

  public getAttendancesByYear(year: number, memberId: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/wod-member/attendance-by-year?year=' + year + '&memberId=' + memberId);
  }

  public getResults(id: number, weekumber: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/results-wod-group-member/results?id=' + id + '&weekNumber=' + weekumber);
  }

}
