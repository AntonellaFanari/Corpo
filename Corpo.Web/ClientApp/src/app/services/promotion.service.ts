import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Promotion } from '../domain/promotion';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<Promotion[]>(this.url + 'api/promotion/getAll');
  }

  public delete(id: number) {
    console.log(id);
    return this.http.delete(this.url + 'api/promotion/delete?id=' + id);
  }

  public add(promotion) {
    console.log(promotion);
    return this.http.post(this.url + 'api/promotion/add', promotion, httpOptions);
  }

  public getById(id: number) {
    console.log(id);
    return this.http.get<any>(this.url + 'api/promotion/getById?id=' + id);
  }

  public update(id: number, promotion: Promotion) {
    console.log(promotion);
    return this.http.put(this.url + 'api/promotion/update?id=' + id, promotion, httpOptions);
  }
}
