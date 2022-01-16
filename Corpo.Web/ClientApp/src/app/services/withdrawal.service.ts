import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Withdrawal } from '../domain/withdrawal';
import { WithdrawalName } from '../domain/withdrawal-name';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

   //withdrawalName
  public getAllWithdrawalName() {
    return this.http.get<WithdrawalName[]>(this.url + 'api/withdrawal/getAllWithdrawalName');
  }

  public getWithdrawalNameById(id: number) {
    return this.http.get<any>(this.url + 'api/withdrawal/getWithdrawalNameById?id=' + id);
  }

  public deleteWithdrawalName(id: number) {
    return this.http.delete(this.url + 'api/withdrawal/deleteWithdrawalName?id=' + id);
  }

  public addWithdrawalName(withdrawalName: WithdrawalName) {
    return this.http.post(this.url + 'api/withdrawal/addWithdrawalName', withdrawalName, httpOptions);
  }

  public updateWithdrawalName(id: number, withdrawalName: WithdrawalName) {
    return this.http.put(this.url + 'api/withdrawal/updateWithdrawalName?id=' + id, withdrawalName, httpOptions);
  }

  //withdrawal
  public getAllWithdrawal() {
    return this.http.get<Withdrawal[]>(this.url + 'api/withdrawal/getAllWithdrawal');
  }

  public addWithdrawal(withdrawal: Withdrawal) {
    return this.http.post(this.url + 'api/withdrawal/addWithdrawal', withdrawal, httpOptions);
  }

  public getWithdrawalById(id: number) {
    return this.http.get<any>(this.url + 'api/withdrawal/getWithdrawalById?id=' + id);
  }
  public deleteWithdrawal(id: number) {
    return this.http.delete(this.url + 'api/withdrawal/deleteWithdrawal?id=' + id);
  }
}
