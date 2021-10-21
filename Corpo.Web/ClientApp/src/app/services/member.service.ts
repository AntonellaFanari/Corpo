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
    return this.http.get("https://run.mocky.io/v3/9fa1482c-5bac-46b9-b16d-a30268a76234");
  }

  public add(newMember: Member) {
    console.log(newMember);
    return this.http.post(this.url + 'api/member/add', newMember, httpOptions).
      subscribe(
        result => {
          console.log(result);
        },
        error => console.error(error)
      )
  }
}
