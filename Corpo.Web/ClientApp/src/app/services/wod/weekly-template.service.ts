import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../../domain/domain-response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class WeeklyTemplateService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }


  public add(weeklyTemplate) {
    return this.http.post(this.url + 'api/weekly-template', weeklyTemplate, httpOptions);
  }

  public getAll() {
    return this.http.get<DomainResponse<any>>(this.url + 'api/weekly-template');
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/weekly-template/' + id);
  }

}
