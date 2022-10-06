import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WodTemplate, wodTemplateResponse } from '../domain/wod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class WodTemplateService {

  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<any>(this.url + 'api/wodTemplate/');
  }

  public add(wodTemplate) {
    console.log("wodTemplate servicio: ", wodTemplate);
    return this.http.post(this.url + 'api/wodTemplate', wodTemplate, httpOptions);
  }

  public update(wodTemplate) {
    console.log("wodTemplate", wodTemplate);
    return this.http.put(this.url + 'api/wodtemplate', wodTemplate, httpOptions);
  }

  public delete(id) {
    return this.http.delete(this.url + 'api/sale/wodtemplate/' + id);
  }

  public getById(id: number) {
    return this.http.get<any>(this.url + 'api/wodtemplate/' + id);
  }
}
