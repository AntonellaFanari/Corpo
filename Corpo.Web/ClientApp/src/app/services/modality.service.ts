import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { Modality } from '../domain/wod/modality';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class ModalityService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<DomainResponse<Modality[]>>(this.url + 'api/modality/');
  }

  public delete(id: number) {
    return this.http.delete<DomainResponse<void>>(this.url + 'api/modality/' + id);
  }

  public add(modality: Modality) {
    return this.http.post<DomainResponse<void>>(this.url + 'api/modality', modality, httpOptions);
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<Modality>>(this.url + 'api/modality/' + id);
  }

  public update(id: number, modality: Modality) {
    return this.http.put<DomainResponse<void>>(this.url + 'api/modality/' + id, modality, httpOptions);
  }
}
