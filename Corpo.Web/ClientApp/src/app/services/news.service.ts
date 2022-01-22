import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { News } from '../domain/news';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

  public getAll() {
    return this.http.get<any>(this.url + 'api/news/getAll');
  }

  public download(fileName: string) {
    return this.http.get(this.url + 'api/news/download?fileName=' + fileName, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  public add(news: News) {
    const formData = new FormData();
    formData.append('files', news.file);
    formData.append('title', news.title);
    formData.append('from', news.from);
    formData.append('to', news.to);
    console.log(formData);
    return this.http.post(this.url + 'api/news/add', formData);

  }

  public getById(id: number) {
    return this.http.get<any>(this.url + 'api/news/getById?id=' + id);
  }

  public update(id: number, news: News) {
    const formData = new FormData();
    formData.append('files', news.file);
    formData.append('title', news.title);
    formData.append('from', news.from);
    formData.append('to', news.to);
    console.log(formData);
    return this.http.put(this.url + 'api/news/update?id='+ id , formData);

  }

  public delete(id: number) {
    return this.http.delete(this.url + 'api/news/delete?id=' + id);
  }
}
