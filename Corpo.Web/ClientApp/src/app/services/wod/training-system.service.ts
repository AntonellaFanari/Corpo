import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DomainResponse } from '../../domain/domain-response';
import { TrainingSystem } from '../../domain/wod/training-system';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TrainingSystemService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<DomainResponse<Array<TrainingSystem>>>(this.url + 'api/training-system/');
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<TrainingSystem>>(this.url + 'api/training-system/' + id);
  }

  public add(trainingSystem: TrainingSystem) {
    console.log(trainingSystem);
    return this.http.post(this.url + 'api/training-system/', trainingSystem, httpOptions);
  }

  public delete(id: number) {
    return this.http.delete<any>(this.url + 'api/training-system/' + id);
  }

  public update(id: number, trainingSystem: TrainingSystem) {
    return this.http.put<any>(this.url + 'api/training-system/?id=' + id, trainingSystem, httpOptions);
  }
}
