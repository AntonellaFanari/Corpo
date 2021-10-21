import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Role } from '../domain/role';
import { User } from '../domain/user';
import { UserView } from '../domain/user-view';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getRoles() {
    return this.http.get<Role[]>(this.url + 'api/user/getRoles');
  }

  public getAll() {
    return this.http.get<UserView[]>(this.url + 'api/user/getAll');
  }

  public add(newUser: User) {
    console.log(newUser);
    return this.http.post(this.url + 'api/user/add', newUser, httpOptions).
      subscribe(
        result => {
          console.log(result);
        },
        error => console.error(error)
      )
  }

}
