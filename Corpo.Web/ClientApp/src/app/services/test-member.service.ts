import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { TestMember } from '../domain/test/test-member';
import { TestResult } from '../domain/test/test-result';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TestMemberService {
  url: string;
  selectedMember: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<DomainResponse<Array<TestMember>>>(this.url + 'api/test-member');
  }

  public getAllByMemberId(id: number) {
    return this.http.get<DomainResponse<Array<TestMember>>>(this.url + 'api/test-member/all-by-memberId/'+ id);
  }

  public delete(id: number) {
    return this.http.delete<DomainResponse<any>>(this.url + 'api/test-member/' + id);
  }

  public add(test: TestMember) {
    return this.http.post<DomainResponse<any>>(this.url + 'api/test-member/', test, httpOptions);
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<TestMember>>(this.url + 'api/test-member/' + id);
  }

  public getDetailById(id: number) {
    return this.http.get<DomainResponse<TestMember>>(this.url + 'api/test-member/detail-by-id?id=' + id);
  }

  public update(test: TestMember) {
    return this.http.put<DomainResponse<any>>(this.url + 'api/test-member/', test, httpOptions);
  }

  public getResult(id: number) {
    return this.http.get<DomainResponse<Array<TestResult>>>(this.url + 'api/test-member/result?id=' + id);
  }
}
