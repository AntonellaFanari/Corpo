import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Outflow } from '../domain/outflow';
import { OutflowType } from '../domain/outflowType';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class OutflowService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAllOutflowType() {
    return this.http.get<OutflowType[]>(this.url + 'api/outflow/getAllOutflowType');
  }

  public deleteOutflowType(id: number) {
    return this.http.delete(this.url + 'api/outflow/deleteOutflowType?id=' + id);
  }

  public addOutflowType(outflowType: OutflowType) {
    console.log(outflowType);
    return this.http.post(this.url + 'api/outflow/addOutflowType', outflowType, httpOptions);
  }

  public updateOutflowType(id: number, outflowType: OutflowType) {
    console.log(outflowType);
    return this.http.put(this.url + 'api/outflow/updateOutflowType', outflowType, httpOptions);
  }

  public getOutflowTypeById(id: number) {
    return this.http.get<OutflowType>(this.url + 'api/outflow/getOutflowTypeById?id=' + id);
  }

  public addOutflow(outflow: Outflow) {
    console.log(outflow);
    return this.http.post(this.url + 'api/outflow/addOutflow', outflow, httpOptions);
  }

  public getAllOutflow(id: number) {
    return this.http.get<Outflow[]>(this.url + 'api/outflow/getAllOutflow?id='+ id);
  }

  public getOutflowById(id: number) {
    return this.http.get<Outflow>(this.url + 'api/outflow/getOutflowById?id=' + id);
  }


  public deleteOutflow(id: number) {
    return this.http.delete(this.url + 'api/outflow/deleteOutflow?id=' + id);
  }

}
