import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Credit } from '../domain/credit';
import { FeeDto } from '../domain/fee-dto';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}


@Injectable({
  providedIn: 'root'
})
export class CreditService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public add(feeDto: FeeDto) {
    return this.http.post<any>(this.url + 'api/credit/add', feeDto, httpOptions);
  }
}
