import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PeriodizationService {

  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<any>(this.url + 'api/periodization/');
  }

  public add(periodization) {
    return this.http.post(this.url + 'api/periodization', periodization, httpOptions);
  }

  public update(periodization) {
    return this.http.put(this.url + 'api/periodization', periodization, httpOptions);
  }

  public delete(id) {
    return this.http.delete(this.url + 'api/periodization/' + id);
  }

  public getById(id: number) {
    return this.http.get<any>(this.url + 'api/periodization?memberId=' + id);
  }
}
