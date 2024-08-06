import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../../types/api.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private _http: HttpClient) { }
  todoCreate(data: any): Observable<IApiResponse<any>> {
    return this._http.post<IApiResponse<any>>('/todo/create', data)
  }
  todoUpdate(data: any): Observable<IApiResponse<any>> {
    return this._http.patch<IApiResponse<any>>('/todo/update', data)
  }
  todoRemove(id: string, projectId: string) {
    return this._http.delete(`/todo/remove?id=${id}&projectId=${projectId}`)
  }
}
