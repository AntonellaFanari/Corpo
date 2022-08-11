import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../domain/domain-response';
import { Fee } from '../domain/fee';
import { FeeDto } from '../domain/fee-dto';
import { FeeView } from '../domain/fee-view';
import { SaleFeeIncome } from '../domain/sale-fee-income';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FeeService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll(id: number) {
    return this.http.get<DomainResponse<SaleFeeIncome[]>>(this.url + 'api/fee/getAll?id=' + id);
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/fee/getById?id=' + id);
  }

  public add(feeDto: FeeDto) {
    console.log(feeDto);
    return this.http.post<any>(this.url + 'api/fee/add', feeDto, httpOptions);
  }

  public delete(id: number) {
    return this.http.delete(this.url + 'api/fee/' + id);
  }

  getAllByIdMember(id: number) {
    return this.http.get<Fee[]>(this.url + 'api/fee/getAllByIdMember?id=' + id);
  }
}
