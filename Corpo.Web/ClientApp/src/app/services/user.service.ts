import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Account } from '../domain/account';
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

  public getById(id: number) {
    return this.http.get<UserView>(this.url + 'api/user/getById?id=' + id);
  }

  public add(newUser: User): Promise<void> {
    console.log(newUser);
    return this.http.post<void>(this.url + 'api/user/add', newUser, httpOptions).toPromise();
  }

  public update(id: number, userUpdate: User) {
    console.log(userUpdate);
    return this.http.put(this.url + 'api/user/update?id=' + id, userUpdate, httpOptions);
  }

  public delete(id: number, email: string){
    console.log(id);
    return this.http.delete(this.url + 'api/user/delete?id=' + id + '&&email=' + email);
  }

}
