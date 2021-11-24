import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Product } from '../domain/product';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<Product[]>(this.url + 'api/product/getAll');
  }

  public getById(id: number) {
    return this.http.get<Product>(this.url + 'api/product/getById?id=' + id);
  }
  public add(product: Product) {
    console.log(product);
    return this.http.post(this.url + 'api/product/add', product, httpOptions);
  }

  public delete(id: number) {
    console.log(id);
    return this.http.delete(this.url + 'api/product/delete?id=' + id);
  }

  public update(id: number, product: Product) {
    return this.http.put(this.url + 'api/product/update?id='+ id, product, httpOptions);
  }


}
