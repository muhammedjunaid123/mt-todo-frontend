import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IProject } from '../../../types/project.interface';
import { IApiResponse } from '../../../types/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }
  project_create(title: object):Observable< IApiResponse<any>> {
    return this._http.post< IApiResponse<any>>('/project/create', title)
  }
  user_project(): Observable<IApiResponse<IProject[]>> {
    return this._http.get<IApiResponse<IProject[]>>('/project/getUserProject')
  }
  get_project(id: string): Observable<IApiResponse<IProject[]>> {
    return this._http.get<IApiResponse<IProject[]>>(`/project/getProject?id=${id}`)
  }
  Project_title(newTitle: string, projectId: string): Observable<IApiResponse<any>> {
    return this._http.patch<IApiResponse<any>>('/project/titleUpdate', { id: projectId, Title: newTitle })
  }
  GistExport(id: string) {
    return this._http.get(`/project/exportToGist?id=${id}`)
  }
}
