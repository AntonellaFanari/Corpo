import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Member } from '../domain/member';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  //public getAll() {
  //  return this.http.get<Member[]>(this.url + 'api/member/getAll');
  //}

  public getAll() {
    return this.http.get<any>(this.url + 'api/member/getAll');
  }
  public getById(id: number) {
    return this.http.get<Member>(this.url + 'api/member/getById?id=' + id);
  }
  public add(newMember: Member): Promise<any> {
    console.log(newMember);
    return this.http.post<number>(this.url + 'api/member/add', newMember, httpOptions).toPromise();
  }
}
