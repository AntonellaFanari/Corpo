import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DetailPurchase } from '../domain/detail-purchase';
import { Purchase } from '../domain/purchase';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<Purchase[]>(this.url + 'api/purchase/getAll');
  }

  public delete(id: number) {
    return this.http.delete(this.url + 'api/purchase/delete?id=' + id);
  }

  public getDetailPurchase(id: number) {
    return this.http.get<DetailPurchase[]>(this.url + 'api/purchase/getDetailPurchase?id=' + id);
  }

  public add(purchase: Purchase) {
    console.log(purchase)
    return this.http.post(this.url + 'api/purchase/add', purchase, httpOptions);
  }
}
