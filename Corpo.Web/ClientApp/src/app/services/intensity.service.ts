import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { Intensity } from '../domain/wod/intensity';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class IntensityService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<DomainResponse<Array<Intensity>>>(this.url + 'api/intensity/');
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<Intensity>>(this.url + 'api/intensity/' + id);
  }

  public add(intensity: Intensity) {
    console.log(intensity);
    return this.http.post(this.url + 'api/intensity/', intensity, httpOptions);
  }

  public delete(id: number) {
    return this.http.delete<any>(this.url + 'api/intensity/' + id);
  }

  public update(id: number, intensity: Intensity) {
    return this.http.put<any>(this.url + 'api/intensity/?id=' + id, intensity, httpOptions);
  }
}
