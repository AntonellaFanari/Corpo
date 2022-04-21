import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { TestTemplate } from '../domain/test/test-template';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TestTemplateService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<DomainResponse<Array<TestTemplate>>>(this.url + 'api/test-template');
  }

  public delete(id: number) {
    return this.http.delete<DomainResponse<any>>(this.url + 'api/test-template/' + id);
  }

  public add(test: TestTemplate) {
    return this.http.post<DomainResponse<any>>(this.url + 'api/test-template/', test, httpOptions);
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<TestTemplate>>(this.url + 'api/test-template/' + id);
  }

  public update(test: TestTemplate) {
    return this.http.put<DomainResponse<any>>(this.url + 'api/test-template/', test, httpOptions);
  }
}
