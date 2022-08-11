import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Anamnesis } from '../domain/anamnesis/anamnesis';
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
export class AnamnesisService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getByMemberId(id: number) {
    return this.http.get<DomainResponse<Anamnesis>>(this.url + 'api/anamnesis?id=' + id);

  }
}
