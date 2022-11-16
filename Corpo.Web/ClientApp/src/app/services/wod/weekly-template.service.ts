import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../../domain/domain-response';
import { WeeklyTemplate } from '../../domain/wod/weekly-template';

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


  public add(weeklyTemplate: WeeklyTemplate) {
    return this.http.post(this.url + 'api/weekly-template', weeklyTemplate, httpOptions);
  }

  public getAll() {
    return this.http.get<DomainResponse<any>>(this.url + 'api/weekly-template');
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/weekly-template/' + id);
  }

  public update(weeklyTemplate: WeeklyTemplate, id: number) {
    return this.http.put<DomainResponse<any>>(this.url + 'api/weekly-template?id='+ id, weeklyTemplate, httpOptions);
  }

  public delete(id: number) {
    return this.http.delete<DomainResponse<any>>(this.url + 'api/weekly-template/' + id);
  }

}
