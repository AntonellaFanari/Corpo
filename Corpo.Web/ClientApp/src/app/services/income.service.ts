import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Income } from '../domain/income';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public add(income: Income) {
    console.log(income);
    return this.http.post(this.url + 'api/income/', income, httpOptions);
  }

  public getAll(id: number) {
    return this.http.get<Income[]>(this.url + 'api/income/?id=' + id);
  }

  public getById(id: number) {
    return this.http.get<any>(this.url + 'api/income/' + id);
  }


  public delete(id: number) {
    return this.http.delete<any>(this.url + 'api/income/' + id);
  }
}
