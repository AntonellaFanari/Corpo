import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CreditExpiration } from '../domain/credit-expiration';
import { DomainResponse } from '../domain/domain-response';
import { Injury } from '../domain/injury';
import { MedicalHistory } from '../domain/medical-history';
import { Member } from '../domain/member';
import { MemberView } from '../domain/member-view';
import { Plan } from '../domain/plan';
import { PhysicalLevel } from '../domain/wod/physical-level';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  // member

  public getAll() {
    return this.http.get<DomainResponse<any>>(this.url + 'api/member/getAll');
  }

  public getAllActivePersonalized() {
    return this.http.get<MemberView[]>(this.url + 'api/member/personalized');
  }

  public getById(id: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/member/getById?id=' + id);
  }
  public add(newMember: Member) {
    console.log(newMember);
    return this.http.post<any>(this.url + 'api/member/add', newMember, httpOptions);
  }

  public update(id: number, memberUpdate: Member) {
    console.log(memberUpdate);
    return this.http.put<any>(this.url + 'api/member/update?id=' + id, memberUpdate, httpOptions);
  }

  public delete(id: number) {
    return this.http.delete(this.url + 'api/member/delete?id=' + id);
  }

  public updateDueDate(expiration: CreditExpiration) {
    return this.http.put(this.url + 'api/member/updateDueDate', expiration, httpOptions);
  }

  public getByDateExpiration(from: string, to: string) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/member/by-date-expiration?from=' + from + '&to=' + to);
  }

  //medicalHistory
  public addMedicalHistory(memberId: number, medicalHistory: MedicalHistory) {
    console.log(medicalHistory);
    return this.http.post<any>(this.url + 'api/member/addMedicalHistory?memberId=' + memberId, medicalHistory, httpOptions);
  }

  public updateMedicalHistory(id: number, medicalHistory: MedicalHistory) {
    return this.http.put<any>(this.url + 'api/member/updateMedicalHistory?id=' + id, medicalHistory, httpOptions);
  }

  public getMedicalHistoryByIdMember(id: number) {
    return this.http.get<DomainResponse<any>>(this.url + 'api/member/getMedicalHistoryByIdMember?id=' + id);
  }
  
  public getMedicalHistoryById(id: number) {
    return this.http.get<any>(this.url + 'api/member/getMedicalHistoryById?id=' + id);
  }

  public getAge(id: number) {
    return this.http.get<any>(this.url + 'api/member/getAge?id=' + id);
  }

  //injury

  public addInjury(injury: Injury) {
    return this.http.post<any>(this.url + 'api/member/addInjury', injury,  httpOptions);
  }

  public addFile(id: number, files: File[]) {
    console.log(files);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
      console.log(formData);
    })
    return this.http.post<any>(this.url + `api/member/${id}/addFile`, formData);
  }

  public getAllInjuries(id: number) {
    return this.http.get<Injury[]>(this.url + 'api/member/getAllInjuries?id='+ id);
  }

  public getAllFiles(id: number) {
    return this.http.get<any>(this.url + 'api/member/getAllFiles?id='+ id);
  }

  public deleteFile(id: number) {
    return this.http.delete(this.url + 'api/member/deleteFile?id=' + id);
  }

  //public download(file: string) {
  //  var body = { fileName: file };
  //  return this.http.post(this.url + 'api/member/download', body, {
  //    responseType: 'blob',
  //    headers: new HttpHeaders().append('Content-Type', 'application/json')
  //  });
  //}

  public download(fileName: string) {
    return this.http.get(this.url + 'api/member/download?fileName=' + fileName, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  //public getPlanExists(id, idPlan) {
  //  return this.http.get(this.url + 'api/member/getPlanExists?id=' + id, idPlan);
  //}

  public getLevel(id: number) {
    return this.http.get <DomainResponse<PhysicalLevel>>(this.url + 'api/member/level?id=' + id);
  }

  public getLevelsHistory(id: number) {
    return this.http.get<DomainResponse<PhysicalLevel[]>>(this.url + 'api/member/levels-history?id=' + id);
  }
}
