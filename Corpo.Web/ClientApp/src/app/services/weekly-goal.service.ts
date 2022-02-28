import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { WeeklyGoal } from '../domain/wod/weekly-goal';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class WeeklyGoalService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public add(weeklyGoal: WeeklyGoal) {
    console.log(weeklyGoal);
    return this.http.post<DomainResponse<any>>(this.url + 'api/weekly-goal/', weeklyGoal, httpOptions);
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<WeeklyGoal>>(this.url + 'api/weekly-goal/' + id);
  }

  public update(weeklyGoal: WeeklyGoal) {
    return this.http.put<DomainResponse<any>>(this.url + 'api/weekly-goal/', weeklyGoal, httpOptions);
  }

  public getAll() {
    return this.http.get<DomainResponse<Array<WeeklyGoal>>>(this.url + 'api/weekly-goal/');
  }

  public delete(id: number) {
    return this.http.delete<DomainResponse<any>>(this.url + 'api/weekly-goal/' + id);
  }
}
