import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Class } from '../domain/class';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string ){
    this.url = url;
  }

  public getAll() {
    return this.http.get<any>(this.url + 'api/class/getAll');
  }

  public getById(id: number) {
    return this.http.get<any>(this.url + 'api/class/getById?id=' + id);
  }
  public add(newClass: Class) {
    console.log(newClass);
    return this.http.post(this.url + 'api/class/add', newClass, httpOptions);
  }

  public delete(id: number) {
    return this.http.delete<any>(this.url + 'api/class/delete?id=' + id);
  }

  public update(id: number, classEdit: Class) {
    return this.http.put<any>(this.url + 'api/class/update?id=' + id, classEdit, httpOptions);
  }
}
