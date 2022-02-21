import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Cash } from '../domain/cash';
import { DomainResponse } from '../domain/domain-response';
import { MembersActivesPlan } from '../domain/members-actives-plan';
import { MonthlyCash } from '../domain/monthly-cash';
import { RecordCash } from '../domain/record-cash';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getReports() {
    return this.http.get<any>(this.url + 'api/report/members-statistics');
  }

  public getDetail(reportType: string) {
    return this.http.get<any>(this.url + 'api/report/members-statistics-detail?reportType=' + reportType);
  }

  public getCashCurrentMonth() {
    return this.http.get<any>(this.url + 'api/report/current-month');
  }

  public getCash(from: string, to: string) {
    console.log(from, to);
    return this.http.get<any>(this.url + 'api/report/cash?from=' + from + '&to=' + to);
  }

  public getCashDetailed(opening: string, closing: string) {
    return this.http.get<any>(this.url + 'api/report/cash-detailed?opening=' + opening + '&closing=' + closing);
  }

  public getCashDate(date: string) {
    return this.http.get<DomainResponse<Cash>>(this.url + 'api/report/cash-by-date?date=' + date);
  }

  public getRecordsCashByMonth(month: number) {
    return this.http.get<DomainResponse<RecordCash[]>>(this.url + 'api/report/record-cash-by-month?month=' + month);
  }


  public getAllMonthlyCash() {
    return this.http.get<DomainResponse<Array<any>>>(this.url + 'api/report/all-monthly-cash');
  }

  public getActiveMemberByPlan(planName: string) {
    return this.http.get<DomainResponse<Array<MembersActivesPlan>>>(this.url + 'api/report/members-actives-by-plan?planName=' + planName);
  }
}
