import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { MonthlyGoal } from '../domain/wod/monthly-goal';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class MonthlyGoalService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public add(monthlyGoal: MonthlyGoal) {
    console.log(monthlyGoal);
    return this.http.post<DomainResponse<any>>(this.url + 'api/monthly-goal/', monthlyGoal, httpOptions);
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<MonthlyGoal>>(this.url + 'api/monthly-goal/' + id);
  }

  public update(monthlyGoal: MonthlyGoal) {
    return this.http.put<DomainResponse<any>>(this.url + 'api/monthly-goal/', monthlyGoal, httpOptions);
  }

  public getAll() {
    return this.http.get<DomainResponse<Array<MonthlyGoal>>>(this.url + 'api/monthly-goal/');
  }

  public delete(id: number) {
    return this.http.delete<DomainResponse<any>>(this.url + 'api/monthly-goal/' + id);
  }

}
