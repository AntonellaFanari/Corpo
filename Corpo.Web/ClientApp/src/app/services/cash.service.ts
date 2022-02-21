import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Cash } from '../domain/cash';
import { DomainResponse } from '../domain/domain-response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CashService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getLastCash() {
    return this.http.get<any>(this.url + 'api/cash/last')
  }

  public getCashById(id: number) {
    return this.http.get<any>(this.url + 'api/cash/' + id);
  }

  public toOpen() {
    return this.http.post<any>(this.url + 'api/cash/', httpOptions);
  }

  public getMonthlyCash() {
    return this.http.get<any>(this.url + 'api/cash/monthly-cash');
  }

  public toClose(id: number, cash: Cash) {
    console.log(cash);
    return this.http.put<any>(this.url + 'api/cash/'+ id , cash, httpOptions);
  }

}
