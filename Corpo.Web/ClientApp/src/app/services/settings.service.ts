import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { GeneralSetting } from '../domain/general-setting';
import { RoleAccess } from '../domain/role-access';

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

  public getRoleAccess() {
    return this.http.get<any>(this.url + 'api/settings/getRoleAccess');
  }

  public saveAccess(access: RoleAccess[]): Promise<void> {
    console.log(access);
    return this.http.post<void>(this.url + 'api/settings/saveAccess', access, httpOptions).toPromise();
  }

  public getAll() {
    return this.http.get<DomainResponse<Array<GeneralSetting>>>(this.url + 'api/settings');
  }

  public update(settings: GeneralSetting[]) {
    return this.http.put<DomainResponse<void>>(this.url + 'api/settings', settings, httpOptions);
  }
}
