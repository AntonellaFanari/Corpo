import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

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
}
