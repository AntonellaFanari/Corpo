import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RoleAcces } from '../domain/role-acces';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getRoleAcces() {
    return this.http.get<any>(this.url + 'api/settings/getRoleAcces');
  }

  public saveAcces(acces: RoleAcces[]): Promise<void> {
    console.log(acces);
    return this.http.post<void>(this.url + 'api/settings/saveAcces', acces, httpOptions).toPromise();
  }
}
