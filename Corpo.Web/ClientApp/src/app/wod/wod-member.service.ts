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
export class WodMemberService {

  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<any>(this.url + 'api/wod-member/');
  }

  public add(wodMember) {
    return this.http.post(this.url + 'api/wod-member', wodMember, httpOptions);
  }

  public update(wodTemplate) {
    console.log("wodTemplate", wodTemplate);
    return this.http.put(this.url + 'api/wod-member', wodTemplate, httpOptions);
  }

  public delete(id) {
    return this.http.delete(this.url + 'api/sale/wod-member/' + id);
  }

  public getById(id: number) {
    return this.http.get<any>(this.url + 'api/wod-member/' + id);
  }
}
