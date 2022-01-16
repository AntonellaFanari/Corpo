import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CategoryExercises } from '../domain/category-exercises';
import { Exercise } from '../domain/exercise';
import { Tag } from '../domain/tag';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  url: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') url: string) {
    this.url = url;
  }

/*  exercises*/
  public getAll() {
    return this.http.get<Exercise[]>(this.url + 'api/exercise/getAllExercises');
  }

  public getExerciseById(id: number) {
    return this.http.get<any>(this.url + 'api/exercise/getExerciseById?id=' + id);
  }

  public deleteExercise(id: number) {
    return this.http.delete(this.url + 'api/exercise/deleteExercise?id=' + id);
  }

  public addExercise(exercise: Exercise) {
    console.log(exercise);
    return this.http.post(this.url + 'api/exercise/addExercise', exercise, httpOptions);
  }
  public updateExercise(id: number, exercise: Exercise) {
    console.log(exercise);
    return this.http.put(this.url + 'api/exercise/updateExercise?id=' + id, exercise, httpOptions);
  }

  /*  category*/

  public addCategory(category: CategoryExercises) {
    console.log(category);
    return this.http.post(this.url + 'api/exercise/addCategory', category, httpOptions);
  }

  public deleteCategory(id: number) {
    return this.http.delete(this.url + 'api/exercise/deleteCategory?id=' + id);
  }

  public updateCategory(id: number, category: CategoryExercises) {
    return this.http.put(this.url + 'api/exercise/updateCategory?id=' + id, category, httpOptions);
  }

  public getCategoryById(id: number) {
    return this.http.get<any>(this.url + 'api/exercise/getCategoryById?id=' + id);
  }

  public getAllCategories() {
    return this.http.get<CategoryExercises[]>(this.url + 'api/exercise/getAllCategories');
  }

  /*  tags*/

  public getAllTags() {
    return this.http.get<Tag[]>(this.url + 'api/exercise/getAllTags');
  }

  public deleteTag(id: number) {
    return this.http.delete(this.url + 'api/exercise/deleteTag?id=' + id);
  }

  public updateTag(tag: Tag, id: number) {
    return this.http.put(this.url + 'api/exercise/updateTag?id=' + id, tag, httpOptions);
  }

  public getTagById(id: number) {
    return this.http.get<any>(this.url + 'api/exercise/getTagById?id=' + id);
  }

  public addTag(tag: Tag) {
    console.log(tag);
    return this.http.post(this.url + 'api/exercise/addTag', tag, httpOptions);
  }
 
}
