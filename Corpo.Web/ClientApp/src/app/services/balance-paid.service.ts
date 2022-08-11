import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BalancePaid } from '../domain/balance-paid';
import { CancelBalancePaid } from '../domain/cancel-balance-paid';
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
export class BalancePaidService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll(id: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/balance-paid?id=' + id);
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<BalancePaid>>(this.url + 'api/balance-paid/by-id?id=' + id);
  }

  public cancel(id, cancelPay) {
    console.log(cancelPay);
    return this.http.post(this.url + 'api/balance-paid/cancel?id=' + id, cancelPay, httpOptions);
  }

  public getCancelBalancePaid(id) {
    return this.http.get<DomainResponse<CancelBalancePaid>>(this.url + 'api/balance-paid/cancel-by-id?id=' + id);
  }
}
