import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }
  project_create(title: object) {
    return this._http.post('/project/create', title)
  }
  user_project() {
    return this._http.get('/project/getUserProject')
  }
  get_project(id:string) {
    return this._http.get(`/project/getProject?id=${id}`)
  }
}
